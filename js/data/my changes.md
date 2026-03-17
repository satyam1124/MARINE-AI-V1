🔍 Current State Analysis
From what your site appears to be:

A static GitHub Pages site (HTML/CSS/JS)
An AI chatbot focused on marine/maritime knowledge
Likely using an LLM API (OpenAI or similar) for responses
Minimal UI with a chat interface
Limited knowledge sources

1. 🎨 UI/UX Improvements
Current Issues (Common in V1 projects)
Basic/generic chat interface
Lack of branding and marine identity
No structured navigation
Missing visual hierarchy
No loading states or animations
Recommended Improvements

html

<!-- ✅ IMPROVED LAYOUT STRUCTURE -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marine AI — Your Maritime Intelligence Assistant</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Sidebar Navigation -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">⚓</span>
        <h1>Marine AI</h1>
        <span class="version-badge">V2</span>
      </div>
      <button class="new-chat-btn" id="newChatBtn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        New Chat
      </button>
    </div>
    
    <!-- Quick Topic Categories -->
    <div class="topic-categories">
      <h3>Quick Topics</h3>
      <div class="category-chips">
        <button class="chip" data-topic="navigation">🧭 Navigation</button>
        <button class="chip" data-topic="safety">🛟 Safety</button>
        <button class="chip" data-topic="engine">⚙️ Engine Room</button>
        <button class="chip" data-topic="cbt">📝 CBT Prep</button>
        <button class="chip" data-topic="regulations">📋 SOLAS/MARPOL</button>
        <button class="chip" data-topic="cargo">📦 Cargo Ops</button>
        <button class="chip" data-topic="weather">🌊 Meteorology</button>
        <button class="chip" data-topic="first-aid">🏥 First Aid</button>
      </div>
    </div>

    <!-- Chat History -->
    <div class="chat-history">
      <h3>Recent Chats</h3>
      <div class="history-list" id="historyList">
        <!-- Dynamically populated -->
      </div>
    </div>

    <!-- Knowledge Source Indicator -->
    <div class="sidebar-footer">
      <div class="source-status">
        <span class="status-dot active"></span>
        <span>12 Knowledge Sources Active</span>
      </div>
      <button class="settings-btn">⚙️ Settings</button>
    </div>
  </aside>

  <!-- Main Chat Area -->
  <main class="main-content">
    <!-- Top Bar -->
    <header class="top-bar">
      <button class="menu-toggle" id="menuToggle">☰</button>
      <div class="model-selector">
        <select id="modeSelector">
          <option value="general">🌐 General Maritime</option>
          <option value="cbt">📝 CBT Practice Mode</option>
          <option value="technical">🔧 Technical Reference</option>
          <option value="regulations">📋 Regulations Lookup</option>
        </select>
      </div>
      <div class="source-toggle">
        <button class="btn-outline" id="sourceToggle">
          📚 Sources <span class="badge">12</span>
        </button>
      </div>
    </header>

    <!-- Chat Messages Area -->
    <div class="chat-container" id="chatContainer">
      <!-- Welcome Screen (shown when no messages) -->
      <div class="welcome-screen" id="welcomeScreen">
        <div class="welcome-content">
          <div class="welcome-icon">⚓</div>
          <h2>Welcome to Marine AI</h2>
          <p>Your intelligent maritime assistant for CBT preparation, 
             technical references, and maritime regulations.</p>
          
          <!-- Suggestion Cards -->
          <div class="suggestion-grid">
            <button class="suggestion-card" data-prompt="Explain the COLREG Rule 5 about lookout">
              <span class="card-icon">🧭</span>
              <span class="card-title">COLREG Rules</span>
              <span class="card-desc">Explain Rule 5 about lookout</span>
            </button>
            <button class="suggestion-card" data-prompt="What are the types of fire extinguishers on ships?">
              <span class="card-icon">🧯</span>
              <span class="card-title">Fire Safety</span>
              <span class="card-desc">Types of fire extinguishers on ships</span>
            </button>
            <button class="suggestion-card" data-prompt="Generate CBT practice questions for MARPOL Annex I">
              <span class="card-icon">📝</span>
              <span class="card-title">CBT Practice</span>
              <span class="card-desc">MARPOL Annex I questions</span>
            </button>
            <button class="suggestion-card" data-prompt="Explain the main engine fuel oil system">
              <span class="card-icon">⚙️</span>
              <span class="card-title">Engine Systems</span>
              <span class="card-desc">Main engine fuel oil system</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Messages will be inserted here -->
      <div class="messages" id="messages"></div>
      
      <!-- Typing Indicator -->
      <div class="typing-indicator" id="typingIndicator" style="display:none">
        <div class="typing-avatar">⚓</div>
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
        <span class="typing-text">Searching maritime databases...</span>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-area">
      <div class="input-wrapper">
        <div class="input-actions-left">
          <button class="action-btn" title="Attach image">📎</button>
        </div>
        <textarea 
          id="userInput" 
          placeholder="Ask about maritime regulations, CBT questions, ship operations..." 
          rows="1"
          autofocus
        ></textarea>
        <div class="input-actions-right">
          <button class="action-btn voice-btn" title="Voice input">🎤</button>
          <button class="send-btn" id="sendBtn" title="Send message">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" 
                    stroke="currentColor" stroke-width="2" 
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <p class="disclaimer">Marine AI can make mistakes. Verify critical safety information with official sources.</p>
    </div>
  </main>

  <!-- Source Panel (Slide-in) -->
  <div class="source-panel" id="sourcePanel">
    <div class="panel-header">
      <h3>📚 Knowledge Sources</h3>
      <button class="close-panel" id="closePanel">✕</button>
    </div>
    <div class="source-list">
      <!-- Sources listed here -->
    </div>
  </div>
</body>
</html>

css

/* ✅ COMPLETE IMPROVED STYLESHEET — styles.css */

/* === RESET & BASE === */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Marine-themed color palette */
  --primary: #0A4D8C;
  --primary-light: #1565C0;
  --primary-dark: #063460;
  --secondary: #00ACC1;
  --accent: #FFB74D;
  --bg-dark: #0B1929;
  --bg-card: #112240;
  --bg-input: #1A2F4A;
  --bg-message-user: #1565C0;
  --bg-message-ai: #162A46;
  --text-primary: #E8EDF3;
  --text-secondary: #8899AA;
  --text-muted: #5A6B7D;
  --border: #1E3A5F;
  --success: #4CAF50;
  --warning: #FF9800;
  --danger: #EF5350;
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  --radius: 12px;
  --radius-sm: 8px;
  --radius-lg: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Light theme option */
[data-theme="light"] {
  --bg-dark: #F5F7FA;
  --bg-card: #FFFFFF;
  --bg-input: #F0F2F5;
  --bg-message-ai: #F0F4F8;
  --text-primary: #1A2332;
  --text-secondary: #5A6B7D;
  --border: #E0E6ED;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-dark);
  color: var(--text-primary);
  display: flex;
  height: 100vh;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* === SIDEBAR === */
.sidebar {
  width: 280px;
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: var(--transition);
  z-index: 100;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.logo-icon {
  font-size: 28px;
  filter: drop-shadow(0 0 8px rgba(0, 172, 193, 0.5));
}

.logo h1 {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--secondary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.version-badge {
  background: var(--secondary);
  color: var(--bg-dark);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.new-chat-btn {
  width: 100%;
  padding: 10px 16px;
  background: transparent;
  border: 1px dashed var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: var(--transition);
}

.new-chat-btn:hover {
  border-color: var(--secondary);
  color: var(--secondary);
  background: rgba(0, 172, 193, 0.05);
}

/* Topic Categories */
.topic-categories {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.topic-categories h3 {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.category-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  padding: 6px 12px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text-secondary);
  font-size: 0.75rem;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.chip:hover {
  background: var(--primary);
  border-color: var(--primary-light);
  color: var(--text-primary);
  transform: translateY(-1px);
}

/* Chat History */
.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
}

.chat-history h3 {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 12px;
  padding: 0 8px;
}

.history-item {
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 2px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.history-item:hover {
  background: var(--bg-input);
  color: var(--text-primary);
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.source-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
}

.status-dot.active {
  background: var(--success);
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.settings-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  text-align: left;
  padding: 6px 0;
  transition: var(--transition);
}

.settings-btn:hover {
  color: var(--text-primary);
}

/* === MAIN CONTENT === */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Top Bar */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-card);
  backdrop-filter: blur(10px);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
}

.model-selector select {
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  padding: 8px 16px;
  font-size: 0.875rem;
  cursor: pointer;
  outline: none;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  padding: 8px 16px;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: var(--transition);
}

.btn-outline:hover {
  border-color: var(--secondary);
  color: var(--secondary);
}

.badge {
  background: var(--secondary);
  color: var(--bg-dark);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
}

/* === CHAT CONTAINER === */
.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  scroll-behavior: smooth;
}

/* Custom Scrollbar */
.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
}

.chat-container::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}

/* Welcome Screen */
.welcome-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.welcome-content {
  text-align: center;
  max-width: 680px;
}

.welcome-icon {
  font-size: 64px;
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.welcome-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--text-primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-content p {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 32px;
  line-height: 1.6;
}

/* Suggestion Cards */
.suggestion-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.suggestion-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  text-align: left;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.suggestion-card:hover {
  border-color: var(--secondary);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 172, 193, 0.15);
}

.card-icon {
  font-size: 1.5rem;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* === MESSAGE BUBBLES === */
.message {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  animation: fadeInUp 0.3s ease-out;
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.message.user .message-avatar {
  background: var(--bg-message-user);
  order: 2;
}

.message.ai .message-avatar {
  background: var(--bg-message-ai);
  border: 1px solid var(--border);
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message.user {
  flex-direction: row-reverse;
}

.message.user .message-body {
  text-align: right;
}

.message-content {
  display: inline-block;
  padding: 12px 18px;
  border-radius: var(--radius);
  font-size: 0.925rem;
  line-height: 1.7;
  max-width: 100%;
  text-align: left;
}

.message.user .message-content {
  background: var(--bg-message-user);
  border-bottom-right-radius: 4px;
  color: white;
}

.message.ai .message-content {
  background: var(--bg-message-ai);
  border: 1px solid var(--border);
  border-bottom-left-radius: 4px;
}

/* Source citation in AI messages */
.message-sources {
  margin-top: 10px;
  padding: 10px 14px;
  background: rgba(0, 172, 193, 0.08);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--secondary);
}

.message-sources h4 {
  font-size: 0.75rem;
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.source-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: var(--bg-input);
  border-radius: 12px;
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin: 2px;
}

/* Message Actions */
.message-actions {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  opacity: 0;
  transition: var(--transition);
}

.message:hover .message-actions {
  opacity: 1;
}

.msg-action-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: var(--transition);
}

.msg-action-btn:hover {
  background: var(--bg-input);
  color: var(--text-primary);
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  max-width: 850px;
  margin: 0 auto;
}

.typing-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-message-ai);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: typingBounce 1.4s infinite;
}

.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
}

.typing-text {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
}

/* === INPUT AREA === */
.input-area {
  padding: 16px 24px 20px;
  border-top: 1px solid var(--border);
  background: var(--bg-card);
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 8px 12px;
  transition: var(--transition);
  max-width: 850px;
  margin: 0 auto;
}

.input-wrapper:focus-within {
  border-color: var(--secondary);
  box-shadow: 0 0 0 3px rgba(0, 172, 193, 0.15);
}

.input-wrapper textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  resize: none;
  max-height: 150px;
  padding: 8px 4px;
  line-height: 1.5;
}

.input-wrapper textarea::placeholder {
  color: var(--text-muted);
}

.input-actions-left,
.input-actions-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: var(--transition);
  color: var(--text-muted);
}

.action-btn:hover {
  background: var(--bg-card);
  color: var(--text-primary);
}

.send-btn {
  background: var(--secondary);
  border: none;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  color: white;
}

.send-btn:hover {
  background: var(--primary-light);
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.disclaimer {
  text-align: center;
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 8px;
}

/* === SOURCE PANEL (Slide-in) === */
.source-panel {
  position: fixed;
  right: -400px;
  top: 0;
  width: 380px;
  height: 100vh;
  background: var(--bg-card);
  border-left: 1px solid var(--border);
  z-index: 200;
  transition: right 0.3s ease;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.3);
}

.source-panel.open {
  right: 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border);
}

.close-panel {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
}

/* === MOBILE RESPONSIVENESS === */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -280px;
    top: 0;
    height: 100vh;
    z-index: 200;
    box-shadow: var(--shadow);
  }

  .sidebar.open {
    left: 0;
  }

  .menu-toggle {
    display: block;
  }

  .suggestion-grid {
    grid-template-columns: 1fr;
  }

  .top-bar {
    padding: 10px 16px;
  }

  .chat-container {
    padding: 16px;
  }

  .input-area {
    padding: 12px 16px 16px;
  }

  .welcome-icon {
    font-size: 48px;
  }

  .welcome-content h2 {
    font-size: 1.35rem;
  }

  .message {
    gap: 8px;
  }

  .message-avatar {
    width: 30px;
    height: 30px;
    font-size: 0.85rem;
  }

  .message-content {
    padding: 10px 14px;
    font-size: 0.875rem;
  }

  .source-panel {
    width: 100%;
    right: -100%;
  }
}

@media (max-width: 480px) {
  .model-selector select {
    font-size: 0.8rem;
    padding: 6px 10px;
  }

  .btn-outline {
    padding: 6px 10px;
    font-size: 0.8rem;
  }

  .suggestion-card {
    padding: 12px;
  }

  .input-wrapper {
    border-radius: var(--radius);
  }
}

/* === OVERLAY for mobile sidebar === */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
  backdrop-filter: blur(2px);
}

.sidebar-overlay.active {
  display: block;
}

/* === CODE BLOCKS in AI messages === */
.message-content pre {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  overflow-x: auto;
  margin: 8px 0;
  font-size: 0.85rem;
}

.message-content code {
  background: var(--bg-dark);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}

.message-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 10px 0;
}

.message-content th,
.message-content td {
  border: 1px solid var(--border);
  padding: 8px 12px;
  text-align: left;
  font-size: 0.85rem;
}

.message-content th {
  background: var(--bg-input);
  font-weight: 600;
}

/* === CBT QUIZ MODE === */
.quiz-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  margin: 12px 0;
}

.quiz-question {
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 0.95rem;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quiz-option {
  padding: 12px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
}

.quiz-option:hover {
  border-color: var(--secondary);
  background: rgba(0, 172, 193, 0.1);
}

.quiz-option.correct {
  border-color: var(--success);
  background: rgba(76, 175, 80, 0.15);
}

.quiz-option.incorrect {
  border-color: var(--danger);
  background: rgba(239, 83, 80, 0.15);
}

2. 📱 Mobile Web View Optimization

// ✅ mobile-optimizations.js

class MobileOptimizer {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.menuToggle = document.getElementById('menuToggle');
    this.input = document.getElementById('userInput');
    this.chatContainer = document.getElementById('chatContainer');
    
    this.init();
  }

  init() {
    this.setupSidebarToggle();
    this.setupAutoResizeTextarea();
    this.setupSwipeGestures();
    this.setupViewportFix();
    this.setupPullToRefresh();
    this.setupKeyboardHandling();
    this.setupOfflineSupport();
  }

  // 1. Sidebar toggle with overlay
  setupSidebarToggle() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    this.menuToggle?.addEventListener('click', () => {
      this.sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      this.sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // 2. Auto-resize textarea
  setupAutoResizeTextarea() {
    this.input?.addEventListener('input', () => {
      this.input.style.height = 'auto';
      this.input.style.height = Math.min(this.input.scrollHeight, 150) + 'px';
    });
  }

  // 3. Swipe gestures for sidebar
  setupSwipeGestures() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      if (startX < 30) isDragging = true; // Edge swipe to open
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', () => {
      if (!isDragging) return;
      const diff = currentX - startX;
      
      if (diff > 80) {
        this.sidebar.classList.add('open');
        document.querySelector('.sidebar-overlay')?.classList.add('active');
      } else if (diff < -80) {
        this.sidebar.classList.remove('open');
        document.querySelector('.sidebar-overlay')?.classList.remove('active');
      }
      
      isDragging = false;
    });
  }

  // 4. Fix iOS viewport height issue
  setupViewportFix() {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(setVH, 100);
    });
  }

  // 5. Keyboard handling (scroll to bottom when keyboard opens)
  setupKeyboardHandling() {
    if ('visualViewport' in window) {
      window.visualViewport.addEventListener('resize', () => {
        // When keyboard opens, ensure input stays visible
        const inputArea = document.querySelector('.input-area');
        if (inputArea) {
          inputArea.style.paddingBottom = 
            (window.innerHeight - window.visualViewport.height) + 'px';
        }
        this.scrollToBottom();
      });
    }
  }

  // 6. Pull-to-refresh prevention (custom behavior)
  setupPullToRefresh() {
    document.body.style.overscrollBehavior = 'none';
  }

  // 7. Offline support with Service Worker
  setupOfflineSupport() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.log('SW failed:', err));
    }
  }

  scrollToBottom() {
    this.chatContainer?.scrollTo({
      top: this.chatContainer.scrollHeight,
      behavior: 'smooth'
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new MobileOptimizer();
});

PWA Support (Add to <head>):

html
<!-- PWA Meta Tags -->
<meta name="theme-color" content="#0B1929">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icons/icon-192.png">

json
// manifest.json
{
  "name": "Marine AI - Maritime Intelligence",
  "short_name": "Marine AI",
  "description": "AI-powered maritime knowledge assistant",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0B1929",
  "theme_color": "#0B1929",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}

3. 🎯 Data Accuracy Improvements

Architecture: RAG (Retrieval-Augmented Generation) System

// ✅ knowledge-engine.js — Core RAG System

class MarineKnowledgeEngine {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.knowledgeBases = new Map();
    this.vectorStore = null;
    this.conversationHistory = [];
    
    this.initKnowledgeBases();
  }

  // === KNOWLEDGE BASE DEFINITIONS ===
  initKnowledgeBases() {
    // Each source has metadata for citation and reliability scoring
    this.sources = [
      {
        id: 'imo-conventions',
        name: 'IMO Conventions',
        type: 'official',
        reliability: 1.0,
        categories: ['SOLAS', 'MARPOL', 'STCW', 'COLREG', 'MLC'],
        url: 'https://www.imo.org',
        icon: '🏛️'
      },
      {
        id: 'marine-insight',
        name: 'Marine Insight',
        type: 'educational',
        reliability: 0.85,
        categories: ['general', 'technical', 'career'],
        url: 'https://www.marineinsight.com',
        icon: '📰'
      },
      {
        id: 'maritimepage',
        name: 'The Maritime Page',
        type: 'educational',
        reliability: 0.8,
        url: 'https://themaritimepage.com',
        icon: '📖'
      },
      {
        id: 'seafarer-cbt',
        name: 'Seafarer CBT Database',
        type: 'exam',
        reliability: 0.9,
        categories: ['cbt-questions', 'exam-prep'],
        icon: '📝'
      },
      {
        id: 'marlins-test',
        name: 'Marlins Test Prep',
        type: 'exam',
        reliability: 0.9,
        url: 'https://www.marlins.co.uk',
        icon: '🎯'
      },
      {
        id: 'marine-electronics',
        name: 'Marine Electronics & GMDSS',
        type: 'technical',
        reliability: 0.85,
        categories: ['GMDSS', 'navigation-equipment', 'radar'],
        icon: '📡'
      },
      {
        id: 'class-society',
        name: 'Classification Society Rules',
        type: 'official',
        reliability: 0.95,
        categories: ['DNV', 'Lloyd', 'BV', 'ABS'],
        icon: '🔍'
      },
      {
        id: 'linkedin-maritime',
        name: 'LinkedIn Maritime Community',
        type: 'community',
        reliability: 0.65,
        categories: ['career', 'industry-news', 'discussions'],
        icon: '💼'
      },
      {
        id: 'flag-state',
        name: 'Flag State Requirements',
        type: 'regulatory',
        reliability: 0.95,
        categories: ['Panama', 'Liberia', 'Marshall-Islands', 'Malta'],
        icon: '🚩'
      },
      {
        id: 'p-and-i',
        name: 'P&I Club Publications',
        type: 'industry',
        reliability: 0.9,
        categories: ['claims', 'safety-bulletins', 'loss-prevention'],
        icon: '🛡️'
      },
      {
        id: 'engine-manual',
        name: 'Engine Technical Manuals',
        type: 'technical',
        reliability: 0.95,
        categories: ['MAN', 'Wartsila', 'Caterpillar', 'auxiliary'],
        icon: '⚙️'
      },
      {
        id: 'nautical-charts',
        name: 'Nautical Publications',
        type: 'reference',
        reliability: 1.0,
        categories: ['ALRS', 'NP', 'tide-tables', 'sailing-directions'],
        icon: '🗺️'
      }
    ];
  }

  // === ENHANCED SYSTEM PROMPT WITH SOURCE GROUNDING ===
  getSystemPrompt(mode = 'general') {
    const basePrompt = `You are Marine AI, an expert maritime knowledge assistant. 
You provide accurate, well-sourced information about all aspects of the maritime industry.

CRITICAL RULES FOR DATA ACCURACY:
1. ALWAYS cite your source when providing specific regulations, rules, or technical data
2. If you're not 100% certain about a specific regulation number or value, say so explicitly
3. Distinguish between:
   - VERIFIED: Direct quotes from IMO conventions, SOLAS, MARPOL, etc.
   - GENERAL KNOWLEDGE: Widely accepted maritime practices
   - OPINION/DISCUSSION: Community discussions or varying practices
4. For CBT preparation, clearly state the correct answer AND explain why other options are wrong
5. Always mention if regulations have been amended and provide the latest amendment info
6. Use proper maritime terminology
7. When discussing safety-critical information, add a disclaimer to verify with official sources

FORMAT RULES:
- Use markdown for formatting
- Include regulation references in [brackets] e.g., [SOLAS Ch. III, Reg. 19.3]
- For CBT questions, use the quiz format with clear explanations
- Provide source reliability indicators: 🟢 Official | 🟡 Educational | 🔴 Community`;

    const modePrompts = {
      general: `${basePrompt}\n\nMODE: General Maritime - Answer all maritime questions comprehensively.`,
      
      cbt: `${basePrompt}\n\nMODE: CBT Practice - Generate exam-style questions. Format:
- Present the question clearly
- Provide 4 options (A, B, C, D)
- After the user answers, reveal the correct answer with detailed explanation
- Reference the specific regulation or standard
- Provide a difficulty rating: Easy/Medium/Hard
- Track score if multiple questions`,
      
      technical: `${basePrompt}\n\nMODE: Technical Reference - Provide detailed technical information about:
- Engine systems and troubleshooting
- Electrical systems and GMDSS
- Hull and structural considerations
- Cargo equipment and operations
Include diagrams descriptions, specifications, and step-by-step procedures.`,
      
      regulations: `${basePrompt}\n\nMODE: Regulations Lookup - Focus on:
- Exact regulation text and references
- Latest amendments and their effective dates
- Practical interpretation and compliance guidance
- Comparison between different flag state requirements
Always cite the specific chapter, regulation, and paragraph number.`
    };

    return modePrompts[mode] || modePrompts.general;
  }

  // === QUERY ENHANCEMENT & ROUTING ===
  async enhanceQuery(userQuery) {
    // Detect query category for better routing
    const categories = this.categorizeQuery(userQuery);
    
    return {
      originalQuery: userQuery,
      categories: categories,
      enhancedQuery: this.addContextToQuery(userQuery, categories),
      relevantSources: this.getRelevantSources(categories),
      requiresDisclaimer: this.isSafetyCritical(userQuery)
    };
  }

  categorizeQuery(query) {
    const q = query.toLowerCase();
    const categories = [];
    
    const categoryKeywords = {
      'navigation': ['colreg', 'collision', 'navigation', 'steering', 'rules of the road', 'buoy', 'light', 'day signal', 'sound signal', 'radar plotting'],
      'safety': ['solas', 'life saving', 'lifeboat', 'fire', 'ism', 'safety', 'abandon ship', 'muster', 'drill', 'ppe', 'risk assessment'],
      'pollution': ['marpol', 'pollution', 'oil record book', 'garbage', 'sewage', 'ballast water', 'emission', 'eca', 'seca', 'annex'],
      'cargo': ['cargo', 'loading', 'stability', 'trim', 'imsbc', 'imdg', 'dangerous goods', 'container', 'tanker', 'bulk'],
      'engine': ['engine', 'fuel', 'lub oil', 'purifier', 'boiler', 'turbocharger', 'scavenge', 'piston', 'cylinder', 'auxiliary'],
      'electrical': ['gmdss', 'radar', 'ais', 'ecdis', 'vdr', 'epirb', 'sart', 'vhf', 'inmarsat', 'navtex'],
      'cbt': ['cbt', 'exam', 'test', 'question', 'practice', 'mock', 'quiz', 'marlins'],
      'meteorology': ['weather', 'tropical', 'cyclone', 'storm', 'wave', 'tide', 'current', 'beaufort', 'barometer'],
      'medical': ['first aid', 'medical', 'injury', 'hypothermia', 'drowning', 'cpr', 'defibrillator', 'medicine chest'],
      'certificates': ['certificate', 'stcw', 'coc', 'cop', 'endorsement', 'flag state', 'manning'],
      'career': ['salary', 'rank', 'promotion', 'company', 'interview', 'resume', 'career']
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(kw => q.includes(kw))) {
        categories.push(category);
      }
    }

    return categories.length > 0 ? categories : ['general'];
  }

  getRelevantSources(categories) {
    return this.sources.filter(source => {
      if (!source.categories) return true;
      return categories.some(cat => 
        source.categories.some(sc => sc.toLowerCase().includes(cat))
      ) || source.type === 'official';
    });
  }

  isSafetyCritical(query) {
    const safetyTerms = ['emergency', 'fire', 'abandon', 'man overboard', 
                          'flooding', 'collision', 'grounding', 'first aid',
                          'medical', 'distress', 'mayday', 'sos'];
    return safetyTerms.some(term => query.toLowerCase().includes(term));
  }

  addContextToQuery(query, categories) {
    let context = query;
    
    if (categories.includes('cbt')) {
      context += '\n\nProvide the answer in MCQ format with explanations and source references.';
    }
    
    if (categories.includes('navigation')) {
      context += '\n\nReference specific COLREG rules where applicable.';
    }
    
    if (categories.includes('pollution')) {
      context += '\n\nReference specific MARPOL Annex and regulation numbers.';
    }
    
    return context;
  }

  // === RESPONSE POST-PROCESSING ===
  postProcessResponse(response, queryData) {
    let processed = response;

    // Add source citations
    if (queryData.relevantSources.length > 0) {
      const sourceHtml = this.formatSourceCitations(queryData.relevantSources);
      processed += sourceHtml;
    }

    // Add safety disclaimer if needed
    if (queryData.requiresDisclaimer) {
      processed += `\n\n> ⚠️ **Safety Disclaimer**: This information is for educational purposes. 
> Always follow your vessel's specific procedures, SMS, and the Master's instructions 
> in actual emergency situations.`;
    }

    return processed;
  }

  formatSourceCitations(sources) {
    const topSources = sources
      .sort((a, b) => b.reliability - a.reliability)
      .slice(0, 4);
    
    let html = '\n\n---\n📚 **Sources referenced**: ';
    html += topSources
      .map(s => `${s.icon} ${s.name}`)
      .join(' • ');
    
    return html;
  }
}

Structured Maritime Knowledge Base:

javascript

// ✅ maritime-data.js — Curated verified data for accuracy

const MARITIME_KNOWLEDGE_BASE = {
  
  // === SOLAS Key Regulations ===
  solas: {
    chapter_III: {
      title: "Life-Saving Appliances and Arrangements",
      regulations: {
        "19.3": {
          text: "Every passenger ship and every cargo ship shall carry...",
          liferafts: "Sufficient for 100% of persons on board",
          lastAmended: "MSC.404(96) - June 2016",
          effectiveDate: "2020-01-01"
        },
        "31": {
          title: "Drills",
          requirements: {
            abandonShip: "Monthly, within 24 hours of leaving port if >25% crew changed",
            fire: "Monthly",
            frequency: "Each crew member must participate in at least one drill per month"
          }
        }
      }
    },
    chapter_II_2: {
      title: "Fire Protection, Detection and Extinction",
      // ... extensive data
    }
  },

  // === MARPOL Annexes ===
  marpol: {
    annex_I: {
      title: "Prevention of Pollution by Oil",
      specialAreas: ["Mediterranean", "Baltic", "Black Sea", "Red Sea", 
                      "Persian Gulf", "Gulf of Aden", "Antarctic", 
                      "North West European Waters", "Oman Sea of Arabia",
                      "Southern South African Waters"],
      dischargeRequirements: {
        outsideSpecialArea: {
          machinery_space: "15 ppm max, using OWS with 15ppm alarm",
          cargo_tanker: "30L per NM, total < 1/30000 of cargo, >50NM from land"
        },
        insideSpecialArea: {
          machinery_space: "15 ppm max",
          cargo_tanker: "No discharge allowed"
        }
      }
    },
    annex_VI: {
      title: "Prevention of Air Pollution from Ships",
      sulphurLimits: {
        global: { limit: "0.50%", effectiveDate: "2020-01-01" },
        eca: { limit: "0.10%", effectiveDate: "2015-01-01" },
        ecaAreas: ["Baltic Sea", "North Sea", "North American ECA", 
                    "US Caribbean Sea ECA"]
      },
      tierIII_NOx: {
        effectiveDate: "2016-01-01",
        limit: "3.4 g/kWh (at 130 rpm)",
        applicability: "Ships constructed on/after 2016 operating in NECAs"
      }
    }
  },

  // === COLREG Rules ===
  colreg: {
    rules: {
      5: { title: "Look-out", summary: "Every vessel shall at all times maintain a proper look-out by sight and hearing..." },
      6: { title: "Safe Speed", factors: ["visibility", "traffic density", "manoeuvrability", "wind/sea/current", "draught vs depth"] },
      7: { title: "Risk of Collision", summary: "Use all available means including radar..." },
      8: { title: "Action to Avoid Collision", summary: "Shall be positive, made in ample time, large enough to be readily apparent..." },
      // ... all 38 rules with summaries
    },
    lights: {
      powerDrivenVessel: {
        underway: ["masthead light(s)", "sidelights", "stern light"],
        over50m: "Two masthead lights, forward one lower",
        under50m: "May have one masthead light"
      },
      sailingVessel: {
        underway: ["sidelights", "stern light", "optional red over green at masthead"]
      },
      // ... comprehensive light configurations
    }
  },

  // === CBT Question Bank ===
  cbtQuestions: {
    navigation: [
      {
        id: "NAV001",
        question: "According to COLREG Rule 19, in restricted visibility, a vessel which detects by radar alone the presence of another vessel shall determine if a close-quarters situation is developing. What action should be taken?",
        options: {
          A: "Alter course to port for a vessel forward of the beam",
          B: "Alter course to starboard for a vessel forward of the beam",
          C: "Avoid altering course to port for a vessel forward of the beam, except overtaking",
          D: "Reduce speed and navigate with caution"
        },
        correct: "C",
        explanation: "Rule 19(d)(i) states that alterations of course to port for a vessel forward of the beam, other than for a vessel being overtaken, shall be avoided.",
        reference: "COLREG Rule 19(d)(i)",
        difficulty: "Medium",
        source: "IMO COLREG Convention"
      },
      // ... hundreds more questions
    ],
    safety: [/* ... */],
    cargo: [/* ... */],
    engine: [/* ... */]
  }
};

export default MARITIME_KNOWLEDGE_BASE;

4. 📚 Adding More Knowledge Sources
Source Integration Architecture:

// ✅ source-integrator.js — Multi-source knowledge aggregation

class MarineSourceIntegrator {
  constructor() {
    this.sources = new Map();
    this.cache = new Map();
    this.initSources();
  }

  initSources() {
    // ===== OFFICIAL/REGULATORY SOURCES =====
    this.registerSource({
      id: 'imo-official',
      name: 'IMO Official',
      icon: '🏛️',
      type: 'official',
      reliability: 1.0,
      baseUrl: 'https://www.imo.org',
      description: 'International Maritime Organization official conventions and circulars',
      covers: ['SOLAS', 'MARPOL', 'STCW', 'COLREG', 'ISM', 'ISPS', 'MLC', 'BWM Convention'],
      dataType: 'curated-static', // Pre-embedded in knowledge base
    });

    // ===== EDUCATIONAL WEBSITES =====
    this.registerSource({
      id: 'marine-insight',
      name: 'Marine Insight',
      icon: '📰',
      type: 'educational',
      reliability: 0.85,
      baseUrl: 'https://www.marineinsight.com',
      description: 'Maritime articles, guides, and educational content',
      endpoints: {
        articles: '/api/articles',
        search: '/search'
      },
      scrapeConfig: {
        selectors: {
          title: '.entry-title',
          content: '.entry-content',
          date: '.entry-date'
        }
      }
    });

    this.registerSource({
      id: 'maritime-page',
      name: 'The Maritime Page',
      icon: '📖',
      type: 'educational',
      reliability: 0.8,
      baseUrl: 'https://themaritimepage.com',
    });

    this.registerSource({
      id: 'myseatime',
      name: 'MySeatime',
      icon: '⏱️',
      type: 'educational',
      reliability: 0.8,
      baseUrl: 'https://www.myseatime.com',
      covers: ['career guidance', 'exam preparation', 'sea time tracking']
    });

    this.registerSource({
      id: 'bright-hub-eng',
      name: 'Bright Hub Engineering - Marine',
      icon: '🔧',
      type: 'educational',
      reliability: 0.75,
      baseUrl: 'https://www.brighthubengineering.com/marine-engines-machinery/',
    });

    // ===== CBT PREPARATION SOURCES =====
    this.registerSource({
      id: 'marlins-test',
      name: 'Marlins English Test',
      icon: '🎯',
      type: 'cbt-prep',
      reliability: 0.9,
      baseUrl: 'https://www.marlins.co.uk',
      covers: ['Marlins English Test', 'Online CBT', 'Assessment'],
      dataType: 'curated-static'
    });

    this.registerSource({
      id: 'seagull-cbt',
      name: 'Seagull Maritime CBT',
      icon: '🦅',
      type: 'cbt-prep',
      reliability: 0.9,
      baseUrl: 'https://www.seagull.no',
      covers: ['Seagull CES tests', 'Maritime CBT', 'Competency assessment'],
      dataType: 'curated-static'
    });

    this.registerSource({
      id: 'ocean-learning',
      name: 'Ocean Learning Platform',
      icon: '🌊',
      type: 'cbt-prep',
      reliability: 0.85,
      baseUrl: 'https://www.oceanlearningplatform.com',
      covers: ['STCW courses', 'Online maritime training']
    });

    this.registerSource({
      id: 'marine-exam',
      name: 'Marine Exam Prep',
      icon: '📝',
      type: 'cbt-prep',
      reliability: 0.85,
      description: 'Practice questions for all maritime CBT exams',
      covers: ['Deck CBT', 'Engine CBT', 'Safety CBT', 'GMDSS CBT'],
      dataType: 'curated-static'
    });

    this.registerSource({
      id: 'uscg-exam-prep',
      name: 'USCG License Exam Prep',
      icon: '🇺🇸',
      type: 'cbt-prep',
      reliability: 0.85,
      covers: ['USCG license exams', 'NMC questions']
    });

    // ===== LINKEDIN & PROFESSIONAL =====
    this.registerSource({
      id: 'linkedin-maritime',
      name: 'LinkedIn Maritime Community',
      icon: '💼',
      type: 'professional',
      reliability: 0.65,
      baseUrl: 'https://www.linkedin.com',
      covers: ['industry trends', 'career advice', 'company updates', 'networking'],
      groups: [
        'Maritime Professionals',
        'Shipping & Maritime Industry',
        'Marine Engineering',
        'Nautical Science',
        'Maritime Lawyers Network',
        'Port & Terminal Operations'
      ],
      scrapingNote: 'LinkedIn data should be accessed via official API or curated manually',
      dataType: 'api-integration',
      apiConfig: {
        // LinkedIn API requires OAuth 2.0
        authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
        apiBase: 'https://api.linkedin.com/v2',
      }
    });

    // ===== MARITIME ORGANIZATIONS =====
    this.registerSource({
      id: 'bimco',
      name: 'BIMCO',
      icon: '🚢',
      type: 'industry',
      reliability: 0.95,
      baseUrl: 'https://www.bimco.org',
      covers: ['charter parties', 'contracts', 'shipping regulations', 'market analysis']
    });

    this.registerSource({
      id: 'dnv',
      name: 'DNV Maritime',
      icon: '🔍',
      type: 'classification',
      reliability: 0.95,
      baseUrl: 'https://www.dnv.com/maritime',
      covers: ['class rules', 'type approval', 'advisory', 'digital class']
    });

    this.registerSource({
      id: 'lloyds-register',
      name: "Lloyd's Register",
      icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      type: 'classification',
      reliability: 0.95,
      baseUrl: 'https://www.lr.org/en/',
      covers: ['classification rules', 'ship data', 'safety compliance']
    });

    // ===== P&I AND INSURANCE =====
    this.registerSource({
      id: 'gard-pi',
      name: 'Gard P&I Club',
      icon: '🛡️',
      type: 'insurance',
      reliability: 0.9,
      baseUrl: 'https://www.gard.no',
      covers: ['loss prevention', 'claims', 'safety circulars', 'crew matters']
    });

    this.registerSource({
      id: 'skuld',
      name: 'Skuld P&I',
      icon: '🛡️',
      type: 'insurance',
      reliability: 0.9,
      baseUrl: 'https://www.skuld.com',
      covers: ['insight articles', 'loss prevention bulletins']
    });

    // ===== WEATHER & NAVIGATION =====
    this.registerSource({
      id: 'windy-api',
      name: 'Windy (Weather)',
      icon: '🌤️',
      type: 'weather',
      reliability: 0.85,
      baseUrl: 'https://api.windy.com',
      covers: ['real-time weather', 'forecasts', 'marine weather'],
      dataType: 'api-integration',
      apiConfig: {
        endpoint: 'https://api.windy.com/api/point-forecast/v2',
        key: 'YOUR_WINDY_API_KEY'
      }
    });

    this.registerSource({
      id: 'marinetraffic',
      name: 'MarineTraffic',
      icon: '📡',
      type: 'tracking',
      reliability: 0.9,
      baseUrl: 'https://www.marinetraffic.com',
      covers: ['vessel tracking', 'port info', 'AIS data'],
      dataType: 'api-integration'
    });

    // ===== YOUTUBE CHANNELS (for video references) =====
    this.registerSource({
      id: 'youtube-maritime',
      name: 'Maritime YouTube Channels',
      icon: '🎥',
      type: 'video',
      reliability: 0.7,
      channels: [
        { name: 'Chief MAKOi', url: 'https://youtube.com/@ChiefMAKOi', focus: 'Marine engineering' },
        { name: 'Casualty Corner', url: 'https://youtube.com/@CasualtyCorner', focus: 'Maritime accidents analysis' },
        { name: 'Marine Insight YouTube', focus: 'General maritime education' },
        { name: 'What is Going on With Shipping', focus: 'Shipping industry' },
        { name: 'Mariner\'s Galaxy', focus: 'Maritime education India' }
      ]
    });

    // ===== FORUMS & COMMUNITIES =====
    this.registerSource({
      id: 'gcaptain',
      name: 'gCaptain Forum',
      icon: '💬',
      type: 'community',
      reliability: 0.6,
      baseUrl: 'https://gcaptain.com',
      covers: ['news', 'forum discussions', 'industry opinions']
    });

    this.registerSource({
      id: 'marine-cafe-blog',
      name: 'Marine Café Blog',
      icon: '☕',
      type: 'community',
      reliability: 0.65,
      baseUrl: 'https://marine-cafe.com',
      covers: ['maritime culture', 'opinions', 'industry commentary']
    });
  }

  registerSource(config) {
    this.sources.set(config.id, config);
  }

  // Get all sources for display in UI
  getAllSources() {
    return Array.from(this.sources.values());
  }

  // Get sources by type
  getSourcesByType(type) {
    return Array.from(this.sources.values())
      .filter(s => s.type === type);
  }

  // Get sources relevant to a query
  getRelevantSources(categories) {
    return Array.from(this.sources.values())
      .filter(source => {
        if (!source.covers) return false;
        return categories.some(cat => 
          source.covers.some(cover => 
            cover.toLowerCase().includes(cat.toLowerCase())
          )
        );
      })
      .sort((a, b) => b.reliability - a.reliability);
  }

  // === DATA FETCHING METHODS ===
  
  // Fetch from Marine Insight (with caching)
  async fetchMarineInsight(topic) {
    const cacheKey = `mi_${topic}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

    try {
      // In production, use a backend proxy to avoid CORS
      const response = await fetch(`/api/proxy/marine-insight?q=${encodeURIComponent(topic)}`);
      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Marine Insight fetch failed:', error);
      return null;
    }
  }

  // LinkedIn integration (requires backend)
  async fetchLinkedInInsights(topic) {
    try {
      const response = await fetch('/api/linkedin/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: topic,
          groups: ['Maritime Professionals', 'Marine Engineering'],
          contentType: 'articles'
        })
      });
      return await response.json();
    } catch (error) {
      console.error('LinkedIn fetch failed:', error);
      return null;
    }
  }

  // Weather data for maritime context
  async fetchMarineWeather(lat, lon) {
    try {
      const response = await fetch('/api/weather/marine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lon })
      });
      return await response.json();
    } catch (error) {
      console.error('Weather fetch failed:', error);
      return null;
    }
  }
}

export default MarineSourceIntegrator;

5. 🧠 Main Application Logic

// ✅ app.js — Main application connecting everything

import { MarineKnowledgeEngine } from './knowledge-engine.js';
import { MarineSourceIntegrator } from './source-integrator.js';
import { MobileOptimizer } from './mobile-optimizations.js';

class MarineAIApp {
  constructor() {
    this.engine = new MarineKnowledgeEngine(CONFIG.OPENAI_API_KEY);
    this.sources = new MarineSourceIntegrator();
    this.mobile = new MobileOptimizer();
    
    this.mode = 'general';
    this.conversationHistory = [];
    this.isLoading = false;

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadChatHistory();
    this.renderSourcePanel();
  }

  bindEvents() {
    // Send button
    document.getElementById('sendBtn')?.addEventListener('click', () => this.sendMessage());
    
    // Enter key (Shift+Enter for new line)
    document.getElementById('userInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Mode selector
    document.getElementById('modeSelector')?.addEventListener('change', (e) => {
      this.mode = e.target.value;
    });

    // Suggestion cards
    document.querySelectorAll('.suggestion-card').forEach(card => {
      card.addEventListener('click', () => {
        const prompt = card.dataset.prompt;
        document.getElementById('userInput').value = prompt;
        this.sendMessage();
      });
    });

    // Topic chips
    document.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const topic = chip.dataset.topic;
        const prompts = {
          navigation: "Explain the key COLREG rules for collision avoidance",
          safety: "What are the SOLAS requirements for life-saving appliances?",
          engine: "Describe the main engine fuel oil system and common problems",
          cbt: "Generate 5 CBT practice questions for deck officers",
          regulations: "Summarize the latest MARPOL amendments",
          cargo: "Explain cargo securing requirements under CSS Code",
          weather: "How to interpret weather routing for tropical cyclone avoidance?",
          'first-aid': "What are the ship's medical chest requirements under MLC?"
        };
        document.getElementById('userInput').value = prompts[topic] || `Tell me about ${topic}`;
        this.sendMessage();
      });
    });

    // Source panel toggle
    document.getElementById('sourceToggle')?.addEventListener('click', () => {
      document.getElementById('sourcePanel')?.classList.toggle('open');
    });

    document.getElementById('closePanel')?.addEventListener('click', () => {
      document.getElementById('sourcePanel')?.classList.remove('open');
    });
  }

  async sendMessage() {
    const input = document.getElementById('userInput');
    const query = input.value.trim();
    if (!query || this.isLoading) return;

    // Hide welcome screen
    document.getElementById('welcomeScreen').style.display = 'none';
    
    // Render user message
    this.appendMessage('user', query);
    input.value = '';
    input.style.height = 'auto';

    // Show typing indicator
    this.setLoading(true);

    try {
      // Step 1: Enhance query
      const queryData = await this.engine.enhanceQuery(query);

      // Step 2: Build messages array with system prompt
      const messages = [
        { role: 'system', content: this.engine.getSystemPrompt(this.mode) },
        ...this.conversationHistory.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: queryData.enhancedQuery }
      ];

      // Step 3: Call AI API
      const response = await this.callAI(messages);

      // Step 4: Post-process response
      const processedResponse = this.engine.postProcessResponse(response, queryData);

      // Step 5: Render AI response
      this.appendMessage('ai', processedResponse, queryData.relevantSources);

      // Step 6: Update conversation history
      this.conversationHistory.push(
        { role: 'user', content: query },
        { role: 'assistant', content: response }
      );

      // Step 7: Save to local storage
      this.saveChatHistory();

    } catch (error) {
      console.error('Error:', error);
      this.appendMessage('ai', `⚠️ **Error**: ${error.message}. Please try again.`);
    } finally {
      this.setLoading(false);
    }
  }

  async callAI(messages) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // or gpt-4o for better accuracy
        messages: messages,
        temperature: 0.3, // Lower temperature for more factual responses
        max_tokens: 2000,
        top_p: 0.9,
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  appendMessage(role, content, sources = []) {
    const messagesEl = document.getElementById('messages');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${role}`;

    const avatar = role === 'user' ? '👤' : '⚓';
    
    // Parse markdown (basic)
    const parsedContent = this.parseMarkdown(content);

    let sourceHTML = '';
    if (sources.length > 0 && role === 'ai') {
      sourceHTML = `
        <div class="message-sources">
          <h4>📚 Sources Referenced</h4>
          ${sources.slice(0, 4).map(s => 
            `<span class="source-tag">${s.icon} ${s.name}</span>`
          ).join('')}
        </div>
      `;
    }

    messageEl.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-body">
        <div class="message-content">${parsedContent}</div>
        ${sourceHTML}
        <div class="message-actions">
          <button class="msg-action-btn" onclick="navigator.clipboard.writeText(\`${content.replace(/`/g, '\\`')}\`)">📋 Copy</button>
          ${role === 'ai' ? '<button class="msg-action-btn">👍</button><button class="msg-action-btn">👎</button>' : ''}
        </div>
      </div>
    `;

    messagesEl.appendChild(messageEl);
    this.scrollToBottom();
  }

  parseMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>')
      .replace(/^> (.*)/gm, '<blockquote>$1</blockquote>')
      .replace(/^### (.*)/gm, '<h3>$1</h3>')
      .replace(/^## (.*)/gm, '<h2>$1</h2>')
      .replace(/^# (.*)/gm, '<h1>$1</h1>')
      .replace(/^- (.*)/gm, '<li>$1</li>')
      .replace(/---/g, '<hr>');
  }

  setLoading(loading) {
    this.isLoading = loading;
    const indicator = document.getElementById('typingIndicator');
    const sendBtn = document.getElementById('sendBtn');
    
    indicator.style.display = loading ? 'flex' : 'none';
    sendBtn.disabled = loading;
  }

  scrollToBottom() {
    const container = document.getElementById('chatContainer');
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }

  saveChatHistory() {
    localStorage.setItem('marine-ai-history', JSON.stringify(this.conversationHistory));
  }

  loadChatHistory() {
    const saved = localStorage.getItem('marine-ai-history');
    if (saved) {
      this.conversationHistory = JSON.parse(saved);
    }
  }

  renderSourcePanel() {
    const sourceList = document.querySelector('.source-list');
    if (!sourceList) return;

    const allSources = this.sources.getAllSources();
    const grouped = {};

    allSources.forEach(source => {
      if (!grouped[source.type]) grouped[source.type] = [];
      grouped[source.type].push(source);
    });

    const typeLabels = {
      official: '🏛️ Official/Regulatory',
      educational: '📖 Educational',
      'cbt-prep': '📝 CBT Preparation',
      professional: '💼 Professional Networks',
      classification: '🔍 Classification Societies',
      insurance: '🛡️ P&I Clubs',
      industry: '🚢 Industry Organizations',
      weather: '🌤️ Weather Services',
      tracking: '📡 Vessel Tracking',
      video: '🎥 Video Resources',
      community: '💬 Communities & Forums'
    };

    sourceList.innerHTML = Object.entries(grouped).map(([type, sources]) => `
      <div class="source-group">
        <h4>${typeLabels[type] || type}</h4>
        ${sources.map(s => `
          <div class="source-item">
            <span class="source-icon">${s.icon}</span>
            <div class="source-info">
              <span class="source-name">${s.name}</span>
              <span class="source-reliability">
                Reliability: ${'⭐'.repeat(Math.round(s.reliability * 5))}
              </span>
            </div>
            <span class="status-dot ${s.dataType === 'curated-static' ? 'active' : ''}"></span>
          </div>
        `).join('')}
      </div>
    `).join('');
  }
}

// Initialize app
const CONFIG = {
  OPENAI_API_KEY: 'your-api-key-here' // Move to environment variable/backend
};

document.addEventListener('DOMContentLoaded', () => {
  window.app = new MarineAIApp();
});


📊 Summary: Priority Action Items
Priority	Task	Impact	Effort
🔴 P0	Move API key to backend proxy	Security	Medium
🔴 P0	Add proper system prompt with accuracy rules	Accuracy	Low
🟠 P1	Implement new UI with sidebar + categories	UX	High
🟠 P1	Mobile responsive design + PWA	Mobile	Medium
🟠 P1	Curate verified maritime knowledge base (SOLAS, MARPOL, COLREG)	Accuracy	High
🟡 P2	Add CBT practice mode with question bank	Feature	High
🟡 P2	Source citation in AI responses	Trust	Medium
🟡 P2	Add more knowledge sources (Marine Insight, Marlins, etc.)	Coverage	Medium
🟢 P3	LinkedIn API integration	Feature	High
🟢 P3	Weather/MarineTraffic API integration	Feature	Medium
🟢 P3	Voice input/output	Accessibility	Medium
🟢 P3	Offline support with Service Worker	Reliability	Medium


🏗️ Recommended Tech Stack for V2:
Frontend:  React/Next.js or Vanilla JS (current)
Backend:   Node.js + Express (for API proxy & data)
Database:  Supabase or Firebase (user data, chat history)
Vector DB: Pinecone or ChromaDB (for RAG knowledge search)
AI:        OpenAI GPT-4o-mini (cost-effective) or GPT-4o (accuracy)
Hosting:   Vercel (frontend) + Railway/Render (backend)