Uploading Screen Recording 2025-02-24 at 6.53.06 PM.mp4…

# Peer-to-Peer Chat Application

## Goal
This project aims to develop a peer-to-peer (P2P) chat application that enables users to:
- Send and receive messages simultaneously.
- Support multiple peers.
- Query and retrieve a list of peers they have communicated with.

## Team Members
- **Vasav Jain** (230001081)
- **Yash Vardhan Solanki** (230005052)
- **Rudra Jadon** (230004043)

---
# SETUP GUIDE
## 1. Backend Setup (Flask)

## Virtual Environment Setup

### Creating a Virtual Environment
To create a virtual environment, follow these steps:

1. Open a terminal and navigate to your project directory:
   
bash
``` sh
   cd /path/to/your/project
```

2. Create a virtual environment named venv:
   
bash
``` sh
   python3 -m venv venv
```

3. Activate the virtual environment:
   - **On macOS/Linux:**
     
bash
``` sh
     source venv/bin/activate
```

   - **On Windows (Command Prompt):**
     
cmd
``` sh
     venv\Scripts\activate
```

   - **On Windows (PowerShell):**
     
powershell
``` sh
     venv\Scripts\Activate
```


Once activated, your terminal prompt should show (venv), indicating the virtual environment is active.

### Installing Dependencies
To install the necessary dependencies, run:
bash
``` sh
pip install -r requirements.txt
```


### Running Your Application
After installing dependencies, you can run your application using:
bash
``` sh
python app.py
```

### Deactivating the Virtual Environment
To exit the virtual environment, simply run:
bash
``` sh
deactivate
```

---

## 2. Frontend Setup (Next.js)

#### Step 1: Install Dependencies
Navigate to the frontend directory and run:
```sh
npm install
```

#### Step 2: Start the Next.js App
```sh
npm run dev
```
The application will be available at: [http://localhost:3000/](http://localhost:3000/)

---

## Usage
1. Start the backend server.
2. Start the frontend application.
3. Enter the required ports as prompted.
4. Start chatting with peers in a decentralized manner! 🚀

---

## Technologies Used
- **Backend:** Flask (Python)
- **Frontend:** Next.js (React)
- **Networking:** WebSockets for real-time messaging

---

## Contributing
If you wish to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request.

---

## License
This project is licensed under the MIT License.

