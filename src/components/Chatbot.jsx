'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! Welcome to SkillJobs NextGen (in collaboration with DIU). I am your virtual assistant. How can I help you today?',
      time: 'Just now',
      quickActions: true
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setMenuOpen(false);
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    // Simulate bot thinking state and respond
    setTimeout(() => {
      let botResponse = '';
      const lowercase = text.toLowerCase();

      if (lowercase.includes('join') || lowercase.includes('apply') || lowercase.includes('register')) {
        botResponse = 'To join SkillJobs NextGen, simply click the "Get Started" button in the navigation bar at the top of the page. Select the Student registration tab, complete the required details, and upload your academic CV (in PDF format, under 2MB) to submit your application.';
      } else if (lowercase.includes('ambassador') || lowercase.includes('benefit') || lowercase.includes('role')) {
        botResponse = 'As a Campus Ambassador for SkillJobs, you will receive official leadership certification and executive letters of recommendation. You also gain direct priority referrals to internship roles and job placements at our partner companies, free access to premium soft-skills training workshops, and the opportunity to lead youth development events right on your campus.';
      } else if (lowercase.includes('event') || lowercase.includes('seminar') || lowercase.includes('workshop')) {
        botResponse = 'We organize regular career development seminars, resume writing workshops, and mock interview bootcamps on campus. Check out the Announcements section on our homepage to see details of all upcoming schedules.';
      } else if (lowercase.includes('blog') || lowercase.includes('article') || lowercase.includes('read')) {
        botResponse = 'We publish helpful guides and articles regularly. You can find our complete collection by visiting the Blogs section of our website, where we write about career growth, interview preparation, and key employability skills.';
      } else if (lowercase.includes('skill') || lowercase.includes('employability') || lowercase.includes('career')) {
        botResponse = 'Based on current corporate hiring trends, employers highly value soft skills like clear communication, collaborative leadership, digital content creation, and project management. We offer active training programs to help DIU students master these fields.';
      } else if (lowercase.includes('hello') || lowercase.includes('hi') || lowercase.includes('hey')) {
        botResponse = 'Hello! How can I assist you with your Campus Ambassador questions or student registration today? Feel free to ask me anything.';
      } else {
        botResponse = 'I would be happy to help with that! For specific admissions questions, coordinator support, or other general inquiries, please email us directly at nextgen@skill.jobs or visit our office on campus.';
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const restartChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'Chat session restarted. How can I help you today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: true
      }
    ]);
    setMenuOpen(false);
  };

  return (
    <div className="chatbot-wrapper">
      <style jsx>{`
        .chatbot-wrapper {
          position: fixed;
          bottom: 0;
          right: 0;
          z-index: 9999;
          font-family: var(--font-inter), sans-serif;
        }

        /* Launcher Circular Button (Matches DIU CAI Launcher Style) */
        .chat-launcher {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #1b4d9b;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.18);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10000;
        }

        .chat-launcher:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.25);
        }

        .launcher-icon {
          width: 30px;
          height: 30px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        /* Chat Window Card (Matches DIU Window dimensions and border radius) */
        .chat-window {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 360px;
          height: ${isFullscreen ? 'calc(100vh - 120px)' : '550px'};
          max-height: 80vh;
          background: #f3f4f6;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(226, 232, 240, 0.8);
          z-index: 9999;
          
          /* Smooth Animation properties */
          opacity: ${isOpen ? '1' : '0'};
          transform: ${isOpen ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.92)'};
          pointer-events: ${isOpen ? 'auto' : 'none'};
          visibility: ${isOpen ? 'visible' : 'hidden'};
          transform-origin: bottom right;
          transition: opacity 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1),
                      visibility 0.32s;
        }

        @media (max-width: 400px) {
          .chat-window {
            width: calc(100vw - 30px);
            right: 15px;
            bottom: 85px;
          }
        }

        /* Header (DIU Royal Blue #1b4d9b Theme) */
        .chat-header {
          background: #1b4d9b;
          color: #ffffff;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1b4d9b;
          font-size: 16px;
          font-weight: 900;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.2px;
        }

        .brand-status {
          font-size: 10px;
          color: #86efac;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background-color: #22c55e;
          border-radius: 50%;
          display: inline-block;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .control-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover {
          color: #ffffff;
        }

        /* Dropdown Menu */
        .more-dropdown {
          position: absolute;
          top: 30px;
          right: 25px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          padding: 6px 0;
          width: 140px;
          z-index: 10001;
          display: ${menuOpen ? 'block' : 'none'};
        }

        .dropdown-item {
          padding: 8px 12px;
          font-size: 12px;
          color: #334155;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.15s;
        }

        .dropdown-item:hover {
          background: #f1f5f9;
          color: #1b4d9b;
        }

        /* Messages Body (Light Gray Background) */
        .chat-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scrollbar-width: thin;
        }

        .message-group {
          display: flex;
          flex-direction: column;
          max-width: 80%;
        }

        .message-group.bot {
          align-self: flex-start;
          align-items: flex-start;
        }

        .message-group.user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .sender-name {
          font-size: 10px;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .message-bubble {
          padding: 10px 14px;
          font-size: 13px;
          line-height: 1.45;
          border-radius: 12px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
        }

        .bot .message-bubble {
          background: #ffffff;
          color: #334155;
          border-bottom-left-radius: 4px;
          border: 1px solid #e2e8f0;
        }

        .user .message-bubble {
          background: #1b4d9b;
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }

        .message-time {
          font-size: 9px;
          color: #94a3b8;
          margin-top: 4px;
          font-weight: 600;
        }

        /* Quick Action Tags list */
        .quick-actions-box {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

        .quick-btn {
          background: #ffffff;
          border: 1px solid #1b4d9b;
          color: #1b4d9b;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-btn:hover {
          background: rgba(27, 77, 155, 0.08);
        }

        /* Input Area & Footer */
        .chat-footer-wrapper {
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .input-bar {
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .input-pill {
          flex: 1;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 4px 6px 4px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chat-input {
          border: none;
          background: none;
          outline: none;
          width: 80%;
          font-size: 13px;
          color: #334155;
          font-family: var(--font-inter), sans-serif;
          padding: 6px 0;
        }

        .send-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1b4d9b;
          color: #ffffff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          font-size: 12px;
        }

        .send-btn:hover {
          background: #e11d48;
        }

        .powered-label {
          font-size: 9px;
          color: #94a3b8;
          text-align: center;
          padding-bottom: 6px;
          font-weight: 700;
          letter-spacing: 0.2px;
          text-transform: uppercase;
        }
      `}</style>

      {/* Floating launcher bubble */}
      <button 
        className="chat-launcher" 
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <span className="launcher-icon">
          {isOpen ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-regular fa-message" style={{ fontSize: '22px' }}></i>
          )}
        </span>
      </button>

      {/* Chat Window Container */}
      <div className="chat-window">
        {/* Header (DIU Theme) */}
        <div className="chat-header">
          <div className="header-brand">
            <div className="brand-avatar">
              <i className="fa-regular fa-message"></i>
            </div>
            <div className="brand-text">
              <span className="brand-name">SkillJobs Nextgen</span>
              <span className="brand-status">
                <span className="status-dot"></span> Online
              </span>
            </div>
          </div>

          <div className="header-controls">
            <button 
              className="control-btn" 
              onClick={() => setIsFullscreen(!isFullscreen)} 
              title={isFullscreen ? "Restore window" : "Expand window"}
            >
              <i className={isFullscreen ? "fa-solid fa-minimize" : "fa-solid fa-expand"}></i>
            </button>
            <button 
              className="control-btn" 
              onClick={() => setMenuOpen(!menuOpen)} 
              title="More actions"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <button 
              className="control-btn" 
              onClick={toggleChat} 
              title="Close chat"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Ellipsis menu dropdown */}
            <div className="more-dropdown">
              <div className="dropdown-item" onClick={restartChat}>
                <i className="fa-solid fa-rotate-left"></i> Start New Chat
              </div>
              <div className="dropdown-item" onClick={() => alert('No active sessions found')}>
                <i className="fa-solid fa-clock-rotate-left"></i> All Sessions
              </div>
            </div>
          </div>
        </div>

        {/* Message history list */}
        <div className="chat-body">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-group ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <span className="sender-name">
                  <i className="fa-regular fa-message" style={{ fontSize: '9px' }}></i> SkillJobs Nextgen
                </span>
              )}
              <div 
                className="message-bubble"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              ></div>
              <span className="message-time">{msg.time}</span>

              {/* Bot Welcome Quick Action recommendations */}
              {msg.quickActions && (
                <div className="quick-actions-box">
                  <button className="quick-btn" onClick={() => handleSend('How do I join NextGen?')}>Apply Now</button>
                  <button className="quick-btn" onClick={() => handleSend('What are the Ambassador benefits?')}>Ambassador benefits</button>
                  <button className="quick-btn" onClick={() => handleSend('What are the upcoming events?')}>Upcoming events</button>
                  <button className="quick-btn" onClick={() => handleSend('Show latest career blogs')}>Read blogs</button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer & Input bar */}
        <div className="chat-footer-wrapper" style={{ paddingBottom: '6px' }}>
          <div className="input-bar">
            <div className="input-pill">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="chat-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button className="send-btn" onClick={() => handleSend()} aria-label="Send message">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
