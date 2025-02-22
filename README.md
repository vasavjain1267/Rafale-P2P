# Virtual Environment Setup

## Creating a Virtual Environment
To create a virtual environment, follow these steps:

1. Open a terminal and navigate to your project directory:
   ```bash
   cd /path/to/your/project
   ```

2. Create a virtual environment named `venv`:
   ```bash
   python3 -m venv venv
   ```

3. Activate the virtual environment:
   - **On macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```
   - **On Windows (Command Prompt):**
     ```cmd
     venv\Scripts\activate
     ```
   - **On Windows (PowerShell):**
     ```powershell
     venv\Scripts\Activate
     ```

Once activated, your terminal prompt should show `(venv)`, indicating the virtual environment is active.

## Installing Dependencies
To install the necessary dependencies, run:
```bash
pip install -r requirements.txt
```

## Running Your Application
After installing dependencies, you can run your application using:
```bash
python app.py
```

## Deactivating the Virtual Environment
To exit the virtual environment, simply run:
```bash
deactivate
```

---

# `requirements.txt`
```
flask
flask-cors
flask-socketio
```
