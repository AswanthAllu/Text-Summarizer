# Text Summarizer

A full-stack application that takes messy, unstructured text and turns it into a structured summary using Google's Gemini AI. The application features a clean, chat-like React UI and a secure Node.js/Express backend that handles the AI generation.

## Features
- **Intelligent Summarization**: Powered by the highly capable `gemini-2.5-flash` model.
- **Structured Output**: Generates a unified JSON payload containing a direct summary, key points, and the overall sentiment of the text.
- **Conversational UI**: A fast and simple React frontend (built with Vite) that feels like chatting with an AI assistant.
- **Secure Backend**: The API key is safely stored on the backend, preventing it from leaking to the browser.

## Tech Stack
- **Frontend**: React, Vite
- **Backend**: Node.js, Express, `cors`, `dotenv`
- **AI Integration**: `@google/generative-ai` SDK

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.
- A [Gemini API Key](https://aistudio.google.com/app/apikey) from Google AI Studio.

### 1. Backend Setup

First, set up and run the Node.js server. Open your terminal and navigate to the `server` directory:

```bash
cd server
npm install
```

**Configure Environment Variables**:
Duplicate the `.env.example` file in the `server` directory and rename it to `.env`. Open the `.env` file and add your Gemini API Key:

```env
GEMINI_API_KEY="your_api_key_here"
PORT=5000
```

**Run the Server**:
```bash
npm start
```
The backend API will start running on `http://localhost:5000`.

### 2. Frontend Setup

Open a **new** terminal tab/window and navigate to the `client` directory:

```bash
cd client
npm install
```

**Run the Frontend Development Server**:
```bash
npm run dev
```

### 3. Usage
- After running the frontend, open the `http://localhost:5173` (or the URL provided by Vite in your terminal) in your browser.
- Paste any large, unstructured block of text or article into the text area.
- Click the Summarize button and watch the AI seamlessly extract the crucial takeaways in the chat interface!




