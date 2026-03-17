/* MarineIQ — Chat History Manager: Persistent conversation storage
   Stores Q&A sessions in localStorage with timestamps, titles, and recall
   Deps: config.js (APP state)
   ═══════════════════════════════════════════════════════════════════════ */

const ChatHistoryManager = (function () {

  const STORAGE_KEY = 'miq_chat_history';
  const MAX_CONVERSATIONS = 50;

  /* ═══════════════════════════════════════
     Data access
     ═══════════════════════════════════════ */
  function _load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Chat history load failed:', e);
      return [];
    }
  }

  function _save(conversations) {
    try {
      // Keep only the most recent MAX_CONVERSATIONS
      var trimmed = conversations.slice(0, MAX_CONVERSATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.warn('Chat history save failed:', e);
    }
  }

  /* ═══════════════════════════════════════
     Generate a short title from the query
     ═══════════════════════════════════════ */
  function _makeTitle(query) {
    // Remove special characters and truncate
    var clean = query.replace(/[^\w\s?]/g, '').trim();
    if (clean.length > 60) clean = clean.slice(0, 57) + '…';
    return clean || 'Untitled question';
  }

  /* ═══════════════════════════════════════
     Save a conversation
     ═══════════════════════════════════════ */
  function saveConversation(query, answer, mode, sources) {
    var conversations = _load();

    var entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: _makeTitle(query),
      query: query,
      answer: answer,
      mode: mode || 'bal',
      sources: sources || [],
      timestamp: Date.now(),
      topic: (typeof APP !== 'undefined' && APP.currentTopic) ? APP.currentTopic : null,
      level: (typeof APP !== 'undefined' && APP.currentLevel) ? APP.currentLevel.id : null
    };

    // Prepend (most recent first)
    conversations.unshift(entry);
    _save(conversations);

    // Update sidebar UI
    renderSidebarHistory();

    return entry;
  }

  /* ═══════════════════════════════════════
     Retrieve all conversations
     ═══════════════════════════════════════ */
  function getConversations() {
    return _load();
  }

  /* ═══════════════════════════════════════
     Get a single conversation by ID
     ═══════════════════════════════════════ */
  function getConversation(id) {
    var conversations = _load();
    return conversations.find(function (c) { return c.id === id; }) || null;
  }

  /* ═══════════════════════════════════════
     Delete a conversation
     ═══════════════════════════════════════ */
  function deleteConversation(id) {
    var conversations = _load();
    conversations = conversations.filter(function (c) { return c.id !== id; });
    _save(conversations);
    renderSidebarHistory();
  }

  /* ═══════════════════════════════════════
     Clear all history
     ═══════════════════════════════════════ */
  function clearAll() {
    _save([]);
    renderSidebarHistory();
  }

  /* ═══════════════════════════════════════
     Format timestamp for display
     ═══════════════════════════════════════ */
  function _formatTime(ts) {
    var now = Date.now();
    var diff = now - ts;
    var mins = Math.floor(diff / 60000);
    var hours = Math.floor(diff / 3600000);
    var days = Math.floor(diff / 86400000);

    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    if (hours < 24) return hours + 'h ago';
    if (days < 7) return days + 'd ago';
    return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  /* ═══════════════════════════════════════
     Mode badge label
     ═══════════════════════════════════════ */
  function _modeIcon(mode) {
    var icons = { fast: '⚡', bal: '🧠', deep: '🔬', live: '🌐' };
    return icons[mode] || '🧠';
  }

  /* ═══════════════════════════════════════
     Recall a past conversation — display in answer card
     ═══════════════════════════════════════ */
  function recallConversation(id) {
    var c = getConversation(id);
    if (!c) return;

    // Use existing UI rendering if available
    var ansQuery = document.getElementById('ansQuery');
    var ansBody = document.getElementById('ansBody');
    var ansCard = document.getElementById('answerCard');
    var topicZone = document.getElementById('topicZone');

    if (!ansQuery || !ansBody || !ansCard) return;

    ansQuery.textContent = c.query;
    ansBody.innerHTML = typeof renderAnswerBody === 'function'
      ? renderAnswerBody(c.answer)
      : c.answer;

    // Show the answer card area
    ansCard.style.display = '';
    ansCard.classList.add('visible');
    if (topicZone) topicZone.style.display = '';

    // Render source badges
    var ansBadges = document.getElementById('ansBadges');
    if (ansBadges) {
      ansBadges.innerHTML =
        '<span class="abadge ' + (c.mode === 'live' ? 'abadge-live' : 'abadge-' + c.mode) + '">' +
        _modeIcon(c.mode) + ' ' + (c.mode || 'bal').toUpperCase() +
        '</span>' +
        '<span class="abadge abadge-time">📜 ' + _formatTime(c.timestamp) + '</span>';
    }

    // Render KaTeX if available
    if (typeof renderKaTeX === 'function') {
      setTimeout(function () { renderKaTeX(ansBody); }, 80);
    }

    // Scroll to answer
    ansCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Close sidebar on mobile
    if (window.innerWidth <= 768 && typeof closeSidebar === 'function') {
      closeSidebar();
    }
  }

  /* ═══════════════════════════════════════
     Render chat history in sidebar
     ═══════════════════════════════════════ */
  function renderSidebarHistory() {
    var container = document.getElementById('chatHistoryList');
    if (!container) return;

    var conversations = _load();

    if (conversations.length === 0) {
      container.innerHTML = '<div class="ch-empty">No recent questions yet</div>';
      // Update count
      var countEl = document.getElementById('chatHistoryCount');
      if (countEl) countEl.textContent = '0';
      return;
    }

    // Show max 15 in sidebar
    var toShow = conversations.slice(0, 15);
    var html = '';

    toShow.forEach(function (c) {
      html += '<div class="ch-item" onclick="ChatHistoryManager.recallConversation(\'' + c.id + '\')" title="' + (c.query || '').replace(/"/g, '&quot;').slice(0, 100) + '">';
      html += '  <span class="ch-icon">' + _modeIcon(c.mode) + '</span>';
      html += '  <div class="ch-text">';
      html += '    <div class="ch-title">' + (c.title || 'Question') + '</div>';
      html += '    <div class="ch-time">' + _formatTime(c.timestamp) + '</div>';
      html += '  </div>';
      html += '  <button class="ch-delete" onclick="event.stopPropagation();ChatHistoryManager.deleteConversation(\'' + c.id + '\')" title="Delete">✕</button>';
      html += '</div>';
    });

    if (conversations.length > 15) {
      html += '<div class="ch-more">' + (conversations.length - 15) + ' more conversations</div>';
    }

    container.innerHTML = html;

    // Update count
    var countEl = document.getElementById('chatHistoryCount');
    if (countEl) countEl.textContent = conversations.length.toString();
  }

  /* ═══════════════════════════════════════
     Init: render on page load
     ═══════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function () {
    renderSidebarHistory();
  });

  /* ═══════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════ */
  return {
    saveConversation: saveConversation,
    getConversations: getConversations,
    getConversation: getConversation,
    deleteConversation: deleteConversation,
    clearAll: clearAll,
    recallConversation: recallConversation,
    renderSidebarHistory: renderSidebarHistory
  };

})();

/* Make globally accessible */
if (typeof window !== 'undefined') window.ChatHistoryManager = ChatHistoryManager;
