import React from 'react';

const ChatMessage = ({ message }) => {
  const { role, content } = message;

  if (role === 'error') {
    return (
      <div className="chat-bubble error-bubble">
        <p><strong>Oops!</strong> {content}</p>
      </div>
    );
  }

  if (role === 'user') {
    return (
      <div className="chat-bubble user-bubble">
        <p className="user-text">{content}</p>
      </div>
    );
  }

  // Must be assistant
  const { summary, keyPoints, sentiment } = content;
  const sentClass = sentiment ? sentiment.toLowerCase() : 'neutral';

  return (
    <div className="chat-bubble assistant-bubble result-card">
      <div className="result-group">
        <span className="label">TL;DR:</span>
        <p className="summary-text">{summary || 'No summary available'}</p>
      </div>
      
      {keyPoints && keyPoints.length > 0 && (
        <div className="result-group">
          <span className="label">Takeaways:</span>
          <ul className="key-points-list">
            {keyPoints.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="result-group sentiment-group">
        <span className="label">Vibe check:</span>
        <span className={`sentiment-badge ${sentClass}`}>
          {sentiment || 'Neutral'}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
