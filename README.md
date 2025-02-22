This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


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
