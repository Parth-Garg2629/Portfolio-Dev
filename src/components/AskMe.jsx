import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Send } from 'lucide-react';
import Terminal from './Terminal';

const starterChips = [
  "What's your main project?",
  "What tech stack do you use?",
  "Are you open to internships?",
  "Tell me about SupportSense AI",
  "How can I contact Raghvendra?"
];

function AskMe() {
  const [activeTab, setActiveTab] = useState('echo'); // 'echo' | 'terminal'
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm ECHO, Raghvendra's Portfolio AI. Ask me anything about his projects, technical stack, or availability!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'echo') {
      const area = messagesEndRef.current?.closest('.chat-messages-area');
      if (area) {
        area.scrollTop = area.scrollHeight;
      }
    }
  }, [messages, isLoading, activeTab]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text.trim(),
          history: updatedMessages
        })
      });

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data?.reply || "Hmm, the AI assistant is temporarily unavailable. Try the contact form below instead!";
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Hmm, the AI assistant is temporarily unavailable. Try the contact form below instead!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm ECHO, Raghvendra's Portfolio AI. Ask me anything about his projects, technical stack, or availability!"
      }
    ]);
    setInput('');
  };

  return (
    <section className="section" id="ask-me">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-label">06.</span>
          <h2 className="section-title">Ask Me</h2>
        </div>

        <p className="section-intro reveal">
          Direct questions via ECHO or bash emulation in the terminal.
        </p>

        {/* Mode Toggle: Plain mono text, active tab gets amber underline, no pills */}
        <div className="askme-text-tabs reveal">
          <button
            type="button"
            className={`askme-tab-link ${activeTab === 'echo' ? 'active' : ''}`}
            onClick={() => setActiveTab('echo')}
          >
            [ ECHO AI ]
          </button>
          <button
            type="button"
            className={`askme-tab-link ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            [ Terminal ]
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'terminal' ? (
          <div className="reveal">
            <Terminal />
          </div>
        ) : (
          <div className="chat-container reveal">
            <div className="chat-header">
              <div className="chat-header-info">
                <span className="chat-name">ECHO &middot; Portfolio AI</span>
              </div>
              <button
                type="button"
                className="chat-header-btn"
                onClick={handleReset}
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            <div className="chat-messages-area">
              {messages.map((msg, idx) => (
                <div className={`message-bubble-wrapper ${msg.role}`} key={idx}>
                  <div className="msg-author-tag">
                    {msg.role === 'assistant' ? 'echo:' : 'you:'}
                  </div>
                  <div className="message-bubble">{msg.content}</div>
                </div>
              ))}

              {isLoading && (
                <div className="message-bubble-wrapper assistant">
                  <div className="msg-author-tag">echo:</div>
                  <div className="message-bubble">
                    <span className="chat-loading-dots">thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && !isLoading && (
              <div className="starter-chips-container">
                {starterChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="starter-chip"
                    onClick={() => handleSend(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="chat-input-bar"
            >
              <input
                type="text"
                placeholder="Ask about projects, skills, or background..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="chat-input"
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default AskMe;
