import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, MessageCircle, RefreshCcw } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: number;
  actions?: string[];
}

const quickPrompts = [
  'Show your top projects',
  'Tell me about your experience',
  'How can I contact you?',
  'What technologies do you use?'
];

const createBotMessage = (text: string, actions?: string[]): Message => ({
  id: `bot-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  type: 'bot',
  text,
  actions,
  timestamp: Date.now()
});

const normalizeText = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, '');

const getBotReply = (messageText: string): Message => {
  const normalized = normalizeText(messageText);

  const fallbackActions = [
    'Show your top projects',
    'Tell me about your experience',
    'How can I contact you?'
  ];

  if (/\b(thank you|thanks|thank|appreciate|awesome|great)\b/.test(normalized)) {
    return createBotMessage('You\'re welcome! If you want, I can also walk you through Vishant\'s best projects or experience.', fallbackActions);
  }

  if (/\b(help|what can you do|how can you help|what do you do|assist)\b/.test(normalized)) {
    return createBotMessage(
      'I can help you explore Vishant\'s portfolio, explain his experience, recommend projects, and show how to connect with him.',
      fallbackActions
    );
  }

  const intents = [
    {
      keywords: ['project', 'work', 'portfolio', 'case study', 'demo'],
      response:
        'Vishant builds AI, SaaS, and robotics products with a focus on logistics, automation, and growth strategy. The Projects page highlights his top case studies and technical demos.',
      actions: ['Show your top projects', 'Tell me about your experience', 'How can I contact you?']
    },
    {
      keywords: ['experience', 'background', 'career', 'journey', 'resume', 'cv'],
      response:
        'He has built product-led AI and robotics experiences across SaaS, logistics, and automation. The Experience page shows his timeline, leadership work, and technical strengths.',
      actions: ['Tell me about your experience', 'Show your top projects', 'How can I contact you?']
    },
    {
      keywords: ['contact', 'hire', 'connect', 'collaborate', 'available'],
      response:
        'The best way to reach him is through the Contact page or his LinkedIn profile. He\'s open to new product, AI, and robotics collaborations.',
      actions: ['How can I contact you?', 'Show your top projects', 'Tell me about your experience']
    },
    {
      keywords: ['skill', 'skills', 'expertise', 'technology', 'tech', 'stack'],
      response:
        'He specializes in AI/ML, product strategy, robotics systems, GTM execution, and data-driven decision making. He loves turning complex systems into usable products.',
      actions: ['What technologies do you use?', 'Tell me about your experience', 'Show your top projects']
    },
    {
      keywords: ['education', 'school', 'college', 'iit', 'degree'],
      response:
        'Vishant is currently studying at IIT Madras with a strong emphasis on product management, AI, and analytics. Education supports his product and engineering mindset.',
      actions: ['Tell me about your experience', 'How can I contact you?', 'Show your top projects']
    },
    {
      keywords: ['github', 'code', 'open source', 'repo'],
      response:
        'He shares code and technical experiments in public repositories. The Projects page has links to his featured work and open source contributions.',
      actions: ['Show your top projects', 'How can I contact you?', 'Tell me about your experience']
    },
    {
      keywords: ['linkedin'],
      response:
        'LinkedIn is the best place to connect professionally with Vishant. You can find his profile link on the Contact page.',
      actions: ['How can I contact you?', 'Tell me about your experience', 'Show your top projects']
    }
  ];

  const matchedIntent = intents.find((intent) => intent.keywords.some((keyword) => normalized.includes(keyword)));

  if (matchedIntent) {
    return createBotMessage(matchedIntent.response, matchedIntent.actions);
  }

  return createBotMessage(
    'That\'s a great question. I can help you explore Vishant\'s portfolio, share his experience, or point you to his contact details.',
    fallbackActions
  );
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('portfolio-chat-open');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [isAtBottom, setIsAtBottom] = React.useState(true);
  const [showSuggestions, setShowSuggestions] = React.useState(true);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const createWelcomeMessage = (): Message => ({
    id: `welcome-${Date.now()}`,
    type: 'bot',
    text: 'Hi! 👋 I\'m Vishant\'s AI assistant. Ask me about his projects, experience, or how to connect with him.',
    actions: quickPrompts,
    timestamp: Date.now()
  });

  // Load chat history from localStorage
  React.useEffect(() => {
    const savedMessages = localStorage.getItem('portfolio-chat-history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
      } catch (error) {
        console.error('Failed to load chat history:', error);
        setMessages([createWelcomeMessage()]);
      }
    } else {
      setMessages([createWelcomeMessage()]);
    }
  }, []);

  // Persist chat open state and history
  React.useEffect(() => {
    localStorage.setItem('portfolio-chat-open', JSON.stringify(isOpen));
  }, [isOpen]);

  // Save chat history to localStorage
  React.useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('portfolio-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isAtBottom]);

  // Increment unread count when new bot messages arrive and chat is closed
  React.useEffect(() => {
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].type === 'bot') {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, isOpen]);

  const clearChat = () => {
    setMessages([createWelcomeMessage()]);
    setInput('');
    localStorage.removeItem('portfolio-chat-history');
    setIsTyping(false);
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type: 'user',
      text: messageText,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const normalized = normalizeText(messageText);
    if (/\b(clear chat|reset chat|start over|new conversation)\b/.test(normalized)) {
      setTimeout(() => {
        clearChat();
      }, 600);
      return;
    }

    setTimeout(() => {
      const botMessage = getBotReply(messageText);
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 800 + Math.random() * 900);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      // Focus input when opening
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <motion.div
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Vishant's AI</h3>
                  <p className="text-xs text-muted-foreground">Smart portfolio assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Reset chat"
                >
                  <RefreshCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleChat}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="relative flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" onScroll={(e) => {
              const target = e.currentTarget;
              const atBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 40;
              setIsAtBottom(atBottom);
            }} ref={messagesContainerRef}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background/95 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/95 to-transparent" />

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div
                    whileHover={{ scale: msg.type === 'user' ? 1.02 : 1.01 }}
                    className={`max-w-[78%] break-words whitespace-pre-wrap px-4 py-3 rounded-3xl text-sm ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-surface text-foreground rounded-bl-sm border border-border/50 shadow-sm'
                    }`}
                  >
                    {msg.text}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.actions.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleSendMessage(action)}
                            className="rounded-full px-3 py-1 text-[11px] bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface text-foreground px-4 py-2 rounded-2xl rounded-bl-sm text-sm border border-border/50 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                          className="w-1 h-1 bg-current rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                          className="w-1 h-1 bg-current rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                          className="w-1 h-1 bg-current rounded-full"
                        />
                      </div>
                      <span>Typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />

              <AnimatePresence>
                {!isAtBottom && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="absolute right-4 bottom-20 rounded-full bg-primary text-primary-foreground px-3 py-2 text-xs shadow-xl hover:bg-primary/90 focus:outline-none"
                  >
                    Scroll to latest
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Prompts */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-2 border-b border-border/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">Suggested questions</p>
                    <button
                      onClick={() => setShowSuggestions(false)}
                      className="rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Close suggestions"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="px-3 py-1 text-xs bg-surface/90 text-foreground hover:bg-surface transition-colors border border-border/50 rounded-full shadow-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="border-t border-border/50 p-4 bg-background/50">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full bg-surface text-foreground placeholder-muted-foreground border border-border/50 focus:border-primary focus:outline-none transition-colors text-sm"
                  aria-label="Chat message input"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="relative h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-white"
        aria-label="Open chat"
      >
        {isOpen ? (
          <motion.div
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="h-6 w-6" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <MessageCircle className="h-6 w-6" />
          </motion.div>
        )}

        {/* Unread badge */}
        {unreadCount > 0 && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;