import { useState, useRef, useEffect } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const payloadText = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', content: payloadText }]);
    setInputText('');
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: payloadText }),
      });

      const parsedData = await res.json();

      if (!res.ok) {
        throw new Error(parsedData.error || 'Server rejected the request.');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: parsedData }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'error', content: err.message }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Text Summarizer</h1>
        <p>Send unstructured text to get a structured summary.</p>
      </header>

      <main className="chat-container">
        <div className="chat-history">
          {messages.length === 0 && (
            <div className="empty-state">
              <p>No messages yet. Paste your text below to begin.</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-row ${msg.role}-row`}>
              <ChatMessage message={msg} />
            </div>
          ))}
          
          {loading && (
            <div className="chat-row assistant-row">
              <div className="chat-bubble assistant-bubble loading-bubble">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="input-section">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type or paste text here... (Press Enter to send)"
            rows={3}
            className="text-input"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !inputText.trim()} className="submit-btn">
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
