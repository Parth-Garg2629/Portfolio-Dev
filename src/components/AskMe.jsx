import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, RefreshCw, Send, User, Bot, Terminal as TerminalIcon, MessageSquare } from 'lucide-react';
import Terminal from './Terminal';
import config from '../config';

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

        <p className="askme-subtext reveal stagger-1">
          Explore my background via natural language conversation with ECHO or execute commands inside the unix terminal.
        </p>

        {/* Mode Toggle: ECHO AI vs Terminal */}
        <div className="askme-mode-tabs reveal stagger-1">
          <button
            type="button"
            className={`askme-tab-btn ${activeTab === 'echo' ? 'active' : ''}`}
            onClick={() => setActiveTab('echo')}
          >
            <MessageSquare size={16} />
            <span>ECHO AI</span>
            <span className="tab-pill">Gemini</span>
          </button>
          <button
            type="button"
            className={`askme-tab-btn ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            <TerminalIcon size={16} />
            <span>Terminal</span>
            <span className="tab-pill">CLI</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'terminal' ? (
          <div className="reveal stagger-2">
            <Terminal />
          </div>
        ) : (
          <div className="chat-container reveal stagger-2">
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="chat-avatar-badge">
                  <Sparkles size={14} />
                </div>
                <div className="chat-header-info">
                  <span className="chat-name">ECHO</span>
                  <div className="chat-status">
                    <span className="chat-status-dot"></span>
                    <span className="chat-status-text">Powered by Gemini</span>
                  </div>
                </div>
              </div>
              <div className="chat-header-right">
                <button
                  type="button"
                  className="chat-header-btn"
                  onClick={handleReset}
                  title="Reset Chat"
                  aria-label="Reset conversation"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            <div className="chat-messages-area">
              {messages.map((msg, idx) => (
                <div className={`message-bubble-wrapper ${msg.role}`} key={idx}>
                  {msg.role === 'assistant' && (
                    <div className="msg-avatar assistant">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className="message-bubble">{msg.content}</div>
                  {msg.role === 'user' && (
                    <div className="msg-avatar user">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="message-bubble-wrapper assistant">
                  <div className="msg-avatar assistant">
                    <Bot size={16} />
                  </div>
                  <div className="message-bubble">
                    <div className="typing-dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
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
                placeholder="Ask me anything about Raghvendra..."
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
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default AskMe;
