'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  // State variables for form inputs and API responses.
  const [userPort, setUserPort] = useState(''); // Port for P2P messaging (socket)
  // pendingApiPort holds the value from the input field, while apiPort is used for API calls.
  const [pendingApiPort, setPendingApiPort] = useState('');
  const [apiPort, setApiPort] = useState(''); // Port for Flask API (HTTP)
  const [targetIp, setTargetIp] = useState('');
  const [targetPort, setTargetPort] = useState('');
  const [message, setMessage] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [peers, setPeers] = useState({});
  const [messages, setMessages] = useState([]);
  // New state for peer selection modal.
  const [showPeerSelection, setShowPeerSelection] = useState(false);
  const [peerAction, setPeerAction] = useState(''); // Either 'connect' or 'disconnect'

  // Debounce the API port update so that we update apiPort only after 500ms of no changes.
  useEffect(() => {
    const timer = setTimeout(() => {
      setApiPort(pendingApiPort);
    }, 500);
    return () => clearTimeout(timer);
  }, [pendingApiPort]);

  // Build backend URL using the dynamic API port.
  const backendUrl = `http://localhost:${apiPort}`;

  // Function to send a message.
  const sendMessage = async () => {
    const res = await fetch(`${backendUrl}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_ip: targetIp,
        target_port: targetPort,
        message: message,
      }),
    });
    const data = await res.json();
    setApiResponse(JSON.stringify(data, null, 2));
    if (res) {
      setMessage('');
    }
  };

  const handleApiPortChange = (e) => {
    setPendingApiPort(e.target.value);
    setApiPort(e.target.value);
  };

  // Function to query active peers.
  const queryPeers = async () => {
    const res = await fetch(`${backendUrl}/api/query`);
    const data = await res.json();
    setPeers(data);
  };

  // Function to query messages for the user's port.
  const queryMessages = async () => {
    if (!userPort) return;
    const res = await fetch(`${backendUrl}/api/messages?port=${userPort}`);
    const data = await res.json();
    setMessages(data);
  };

  // Poll for new messages every 3 seconds if userPort is set.
  useEffect(() => {
    if (userPort) {
      queryMessages();
    }
  }, [userPort]);

  // Handle peer selection from the modal.
  const handlePeerSelection = async (peerKey) => {
    const [ip, port] = peerKey.split(':');
    setShowPeerSelection(false);
    if (peerAction === 'connect') {
      const res = await fetch(`${backendUrl}/api/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_ip: ip,
          target_port: port,
        }),
      });
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } else if (peerAction === 'disconnect') {
      const res = await fetch(`${backendUrl}/api/disconnect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disconnect_ip: ip,
          disconnect_port: port,
        }),
      });
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <header className="bg-blue-600 text-white p-6 rounded-t-lg">
        <h1 className="text-3xl font-bold">P2P Chat</h1>
      </header>

      <main className="bg-gray-100 p-6 rounded-b-lg shadow-lg">
        {/* Configuration Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="userPort" className="block text-gray-700 mb-2">
                Your Port:
              </label>
              <input
                id="userPort"
                type="text"
                placeholder="Enter your port"
                value={userPort}
                onChange={(e) => setUserPort(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="apiPort" className="block text-gray-700 mb-2">
                API Port:
              </label>
              <input
                id="apiPort"
                type="text"
                placeholder="Enter Flask API port"
                value={pendingApiPort}
                onChange={(e) => handleApiPortChange(e)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <p className="bg-gray-200 p-2 rounded text-sm font-mono">
            Current API URL: http://localhost:{apiPort}
          </p>
        </section>

        {/* Send Message Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Send Message</h2>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <input
                type="text"
                placeholder="Target IP"
                value={targetIp}
                onChange={(e) => setTargetIp(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <input
                type="text"
                placeholder="Target Port"
                value={targetPort}
                onChange={(e) => setTargetPort(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </section>

        {/* Peer Management Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Peer Management</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => {
                queryPeers();
                setPeerAction('connect');
                setShowPeerSelection(true);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            >
              Connect to Peer
            </button>
            <button
              onClick={() => {
                queryPeers();
                setPeerAction('disconnect');
                setShowPeerSelection(true);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Disconnect from Peer
            </button>
            <button
              onClick={queryPeers}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
            >
              Query Peers
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Active Peers</h3>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(peers, null, 2)}
            </pre>
          </div>
        </section>

        {/* Received Messages Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Received Messages</h2>
          <button
            onClick={queryMessages}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mb-4"
          >
            Refresh Messages
          </button>
          <ul className="space-y-2">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <li key={index} className="bg-blue-100 p-3 rounded">
                  <span className="font-bold mr-2">From {msg.from}:</span>
                  <span>{msg.message}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No messages received yet.</li>
            )}
          </ul>
        </section>

        {/* API Response Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">API Response</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {apiResponse}
          </pre>
        </section>

        {/* Peer Selection Modal */}
        {showPeerSelection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">
                {peerAction === 'connect'
                  ? 'Select a peer to connect'
                  : 'Select a peer to disconnect'}
              </h3>
              <ul className="max-h-64 overflow-y-auto">
                {Object.entries(peers).map(([key, status]) => (
                  <li
                    key={key}
                    className="border p-2 my-2 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => handlePeerSelection(key)}
                  >
                    {key} - {status}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowPeerSelection(false)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}