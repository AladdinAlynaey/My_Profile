/**
 * AI Chat Widget
 * Floating chat interface with webhook integration
 */

class ChatWidget {
    constructor() {
        this.webhookUrl = 'https://alaadin8n.duckdns.org/webhook/992fa062-f1e3-4e46-a36b-00a82f251385';
        this.sessionId = this.getOrCreateSession();
        this.isOpen = false;
        this.isTyping = false;

        this.init();
    }

    // Generate or retrieve session ID for conversation memory
    getOrCreateSession() {
        let session = localStorage.getItem('chat-session-id');
        if (!session) {
            session = this.generateUUID();
            localStorage.setItem('chat-session-id', session);
        }
        return session;
    }

    // Generate UUID v4
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    init() {
        this.createWidget();
        this.setupEventListeners();
    }

    createWidget() {
        // Create floating button
        const btn = document.createElement('button');
        btn.className = 'chat-widget-btn';
        btn.innerHTML = '<i class="fas fa-comments"></i>';
        btn.setAttribute('title', 'Chat with AI');
        btn.setAttribute('aria-label', 'Open chat');

        // Create chat panel
        const panel = document.createElement('div');
        panel.className = 'chat-widget-panel';
        panel.innerHTML = `
            <div class="chat-widget-header">
                <div class="chat-widget-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="chat-widget-info">
                    <h4>AI Assistant</h4>
                    <span>Ask me anything</span>
                </div>
                <button class="chat-widget-close" aria-label="Close chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-widget-messages">
                <div class="chat-welcome">
                    <i class="fas fa-sparkles"></i>
                    <h5>Welcome!</h5>
                    <p>I'm Alaadin's AI assistant. Feel free to ask me anything about his work, skills, or projects!</p>
                </div>
            </div>
            <div class="chat-widget-input">
                <input type="text" placeholder="Type your message..." aria-label="Chat message">
                <button type="button" aria-label="Send message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;

        document.body.appendChild(btn);
        document.body.appendChild(panel);

        this.btn = btn;
        this.panel = panel;
        this.messagesContainer = panel.querySelector('.chat-widget-messages');
        this.input = panel.querySelector('.chat-widget-input input');
        this.sendBtn = panel.querySelector('.chat-widget-input button');
        this.closeBtn = panel.querySelector('.chat-widget-close');
    }

    setupEventListeners() {
        // Toggle chat
        this.btn.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.close());

        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen &&
                !this.panel.contains(e.target) &&
                !this.btn.contains(e.target)) {
                this.close();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.panel.classList.add('active');
        this.btn.classList.add('active');
        this.btn.innerHTML = '<i class="fas fa-times"></i>';
        setTimeout(() => this.input.focus(), 300);
    }

    close() {
        this.isOpen = false;
        this.panel.classList.remove('active');
        this.btn.classList.remove('active');
        this.btn.innerHTML = '<i class="fas fa-comments"></i>';
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;

        // Clear welcome message on first send
        const welcome = this.messagesContainer.querySelector('.chat-welcome');
        if (welcome) welcome.remove();

        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await this.callWebhook(message);
            this.hideTypingIndicator();

            if (response) {
                await this.typeMessage(response, 'ai');
            } else {
                this.addMessage('Sorry, I couldn\'t get a response. Please try again.', 'ai error');
            }
        } catch (error) {
            console.error('Chat webhook error:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, something went wrong. Please try again later.', 'ai error');
        }
    }

    async callWebhook(question) {
        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question,
                session: this.sessionId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        return data;
    }

    addMessage(content, className) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${className}`;

        if (className.includes('ai') && !className.includes('error')) {
            msg.innerHTML = this.parseMarkdown(content);
        } else {
            msg.textContent = content;
        }

        this.messagesContainer.appendChild(msg);
        this.scrollToBottom();
        return msg;
    }

    async typeMessage(content, className) {
        this.isTyping = true;
        const msg = document.createElement('div');
        msg.className = `chat-message ${className}`;
        this.messagesContainer.appendChild(msg);

        const parsedContent = this.parseMarkdown(content);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = parsedContent;
        const textContent = tempDiv.textContent || tempDiv.innerText;

        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';

        let charIndex = 0;
        const typeSpeed = 15; // ms per character

        return new Promise((resolve) => {
            const typeChar = () => {
                if (charIndex < textContent.length) {
                    // Build content progressively
                    const currentText = textContent.substring(0, charIndex + 1);
                    msg.innerHTML = this.parseMarkdown(this.findOriginalSubstring(content, currentText));
                    msg.appendChild(cursor);
                    charIndex++;
                    this.scrollToBottom();
                    setTimeout(typeChar, typeSpeed);
                } else {
                    // Remove cursor and show full parsed content
                    msg.innerHTML = parsedContent;
                    this.isTyping = false;
                    this.scrollToBottom();
                    resolve();
                }
            };
            typeChar();
        });
    }

    // Find the original markdown substring that produces the given plain text length
    findOriginalSubstring(original, plainTextSubstring) {
        // Simple approach: return characters from original until we have enough visible chars
        let visibleCount = 0;
        let originalIndex = 0;
        const targetLength = plainTextSubstring.length;

        while (visibleCount < targetLength && originalIndex < original.length) {
            const char = original[originalIndex];
            // Skip markdown syntax characters in counting
            if (!'*_`#[]()'.includes(char)) {
                visibleCount++;
            }
            originalIndex++;
        }

        return original.substring(0, originalIndex);
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message ai typing';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    // Simple markdown parser
    parseMarkdown(text) {
        if (!text) return '';

        let html = text
            // Escape HTML first
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Code blocks (```)
            .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            // Inline code (`)
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Bold (**text** or __text__)
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/__([^_]+)__/g, '<strong>$1</strong>')
            // Italic (*text* or _text_)
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            .replace(/_([^_]+)_/g, '<em>$1</em>')
            // Links [text](url)
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            // Line breaks
            .replace(/\n/g, '<br>');

        // Simple list handling
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        return html;
    }
}

// Initialize chat widget when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ChatWidget());
} else {
    new ChatWidget();
}
