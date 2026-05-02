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
  'What technologies do you use?',
  'Recommend a project',
  'What is Vishant working on now?'
];

const defaultActions = [
  'Show your top projects',
  'Tell me about your experience',
  'How can I contact you?',
  'What technologies do you use?'
];

const createBotMessage = (text: string, actions: string[] = defaultActions): Message => ({
  id: `bot-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  type: 'bot',
  text,
  actions,
  timestamp: Date.now()
});

const normalizeText = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, '').trim();

const filterActions = (actions: string[], messageText: string): string[] => {
  const normalizedMessage = normalizeText(messageText);
  const filtered = actions.filter((action) => normalizeText(action) !== normalizedMessage);
  return filtered.length > 0 ? filtered : defaultActions.filter((action) => normalizeText(action) !== normalizedMessage);
};

const knowledgeEntries = [
  {
    keywords: ['arak 1', 'arak-1', 'pipeline inspection', 'robotic inspection', 'micro repair', 'ai inspection'],
    response:
      'ARAK-1 is a hybrid spider-wheel robotic inspection system for pipeline monitoring and micro-repair, built with AI-assisted damage detection, ROS simulation, and a compact repair nozzle. It was showcased at THRUST Tech Expo 2026.',
    actions: ['Show your top projects', 'Recommend a project', 'Tell me about your experience']
  },
  {
    keywords: ['military drone', 'medical supply', 'uav', 'uav system', 'mhcsd', 'medical logistics', 'defense medtech'],
    response:
      'The Military Health-Care Supply Drone is a GPS-denied autonomous UAV system designed for rapid medical payload delivery in hostile zones. It combines LiDAR, vision, AES-256 telemetry, and a thermally insulated payload bay for reliable cold-chain medical logistics.',
    actions: ['Show your top projects', 'Recommend a project', 'Tell me about your experience']
  },
  {
    keywords: ['noikix', 'rental saas', 'rental business', 'equipment rental'],
    response:
      'Noikix is a rental SaaS MVP that digitizes equipment rental workflows, availability calendars, and deposit management. It reduced inventory conflicts by 40% for pilot users and was built with React and Firebase.',
    actions: ['Show your top projects', 'Tell me about your experience', 'What technologies do you use?']
  },
  {
    keywords: ['maVionix', 'mavionix', 'ai saas', 'sme ai', 'sme platform'],
    response:
      'MaVionix is an AI SaaS initiative for SMEs, where Vishant helped define MVP scope, user flows, and product documentation. The focus is on workflow clarity, feature prioritization, and agile delivery for small business digital systems.',
    actions: ['Tell me about your experience', 'Show your top projects', 'How can I contact you?']
  },
  {
    keywords: ['srm campus delivery', 'campus logistics', 'campus delivery', 'hackathon'],
    response:
      'The SRM Campus Delivery project is a logistics MVP designed for on-campus deliveries with fast partner matching and real-time status. It targeted a 75% reduction in wait times and was built during a 48-hour hackathon.',
    actions: ['Show your top projects', 'Recommend a project', 'Tell me about your experience']
  },
  {
    keywords: ['pipeline maintenance', 'design registration', 'registered design', 'industrial design', 'ip'],
    response:
      'Vishant contributed to a registered design for a smart robotic pipeline maintenance device, documenting the device shape and configuration for industrial robotics applications.',
    actions: ['Tell me about your experience', 'Show your top projects', 'How can I contact you?']
  },
  {
    keywords: ['experience', 'background', 'career', 'journey', 'timeline', 'leadership', 'founder'],
    response:
      'He currently serves as Co-Founder and Product Lead at MaVionix, leading AI and robotics product strategy. His experience includes product lifecycle management, user research, and launching early-stage systems.',
    actions: ['Tell me about your experience', 'What technologies do you use?', 'How can I contact you?']
  },
  {
    keywords: ['education', 'library', 'iit', 'degree', 'college', 'study'],
    response:
      'Vishant is studying at IIT Madras in Management & Data Science while also pursuing a B.Tech in Computer Science and Data Science. He blends rigorous academics with hands-on AI and robotics product work.',
    actions: ['Tell me about your experience', 'What technologies do you use?', 'Show your top projects']
  },
  {
    keywords: ['skills', 'technology', 'tech stack', 'expertise', 'ai', 'ml', 'robotics', 'data'],
    response:
      'His core strengths include AI/ML, robotics systems, product strategy, data-driven decision making, GTM execution, and UX-driven product design. He builds systems that connect complex tech to practical business outcomes.',
    actions: ['What technologies do you use?', 'Tell me about your experience', 'Show your top projects']
  },
  {
    keywords: ['contact', 'connect', 'hire', 'reach', 'email', 'linkedin', 'github', 'website', 'resume'],
    response:
      'You can reach Vishant through his Contact page, LinkedIn, GitHub, or by downloading his resume. He is open to strategic product, AI, and robotics collaborations.',
    actions: ['How can I contact you?', 'Show your top projects', 'Tell me about your experience']
  },
  {
    keywords: ['availability', 'available', 'open for', 'open to', 'engagement', 'take on', 'project work'],
    response:
      'He is selective and available for founder-led AI, robotics, and product system engagements. He prefers 0-to-1 launches and strategic partnerships over low-budget maintenance work.',
    actions: ['How can I contact you?', 'Tell me about your experience', 'Show your top projects']
  },
  {
    keywords: ['based', 'location', 'where are you', 'location', 'meerut'],
    response:
      'Vishant is based in Meerut, Uttar Pradesh, India, and works globally with founder teams in hybrid and remote formats.',
    actions: ['How can I contact you?', 'Tell me about your experience', 'Show your top projects']
  },
  {
    keywords: ['price', 'budget', 'cost', 'investment', 'equity', 'partnership'],
    response:
      'His preferred engagements are structured around strategic product outcomes. Typical budgets start at INR 20L / $25k for meaningful AI and robotics work, with larger systems scoped for higher investment or equity partnerships.',
    actions: ['How can I contact you?', 'Tell me about your experience', 'Show your top projects']
  },
  {
    keywords: ['faq', 'question', 'q&a', 'helpful'],
    response:
      'You can ask me about his projects, experience, skills, contact information, or current product focus. I also know his availability, education, and the business outcomes he delivers.',
    actions: ['What technologies do you use?', 'How can I contact you?', 'Tell me about your experience']
  }
];

const getKnowledgeResponse = (normalized: string, messageText: string): Message | null => {
  const match = knowledgeEntries.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
  return match ? createBotMessage(match.response, filterActions(match.actions, messageText)) : null;
};

const getBotReply = (messageText: string): Message => {
  const normalized = normalizeText(messageText);

  const fallbackActions = [
    'Show your top projects',
    'Tell me about your experience',
    'How can I contact you?',
    'What technologies do you use?'
  ];

  if (normalized.length === 0) {
    return createBotMessage('Try typing a question about Vishant\'s projects, experience, or how to connect with him.', fallbackActions);
  }

  const knowledgeResponse = getKnowledgeResponse(normalized, messageText);
  if (knowledgeResponse) {
    return knowledgeResponse;
  }

  if (/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/.test(normalized)) {
    return createBotMessage(
      'Hello! I\'m Vishant\'s AI assistant. I can share his top work, experience, technology stack, and contact details.',
      fallbackActions
    );
  }

  if (/\b(thank you|thanks|thank|appreciate|awesome|great|nice)\b/.test(normalized)) {
    return createBotMessage(
      'You\'re welcome! Let me know if you want a recommendation from his Projects or a summary of his Experience.',
      filterActions(fallbackActions, messageText)
    );
  }

  if (/\b(help|what can you do|how can you help|what do you do|assist|capabilities|tell me about yourself)\b/.test(normalized)) {
    return createBotMessage(
      'I can help you explore Vishant\'s portfolio, explain his experience, recommend strong projects, and point you to his contact or social links.',
      filterActions(fallbackActions, messageText)
    );
  }

  const intents = [
    {
      keywords: ['project', 'projects', 'work', 'portfolio', 'case study', 'demo', 'product engineering', 'solution', 'startup'],
      response:
        'Vishant focuses on AI, robotics, and product-led software. His Projects page showcases the best case studies, including automation, logistics, and growth systems.',
      actions: ['Show your top projects', 'Recommend a project', 'Tell me about your experience']
    },
    {
      keywords: ['experience', 'background', 'career', 'journey', 'resume', 'cv', 'timeline', 'leadership'],
      response:
        'He has built AI and robotics products from concept to launch, with strengths in product strategy, engineering leadership, and analytics-driven decisions.',
      actions: ['Tell me about your experience', 'What technologies do you use?', 'How can I contact you?']
    },
    {
      keywords: ['contact', 'hire', 'connect', 'collaborate', 'available', 'reach', 'email', 'linkedin', 'proposal'],
      response:
        'The Contact page is the best way to reach Vishant professionally. He\'s open to product, AI, robotics, and systems collaborations.',
      actions: ['How can I contact you?', 'Show your top projects', 'Tell me about your experience']
    },
    {
      keywords: ['skill', 'skills', 'expertise', 'technology', 'tech', 'stack', 'ai', 'ml', 'robotics', 'data', 'backend', 'frontend'],
      response:
        'His strengths include AI/ML, robotics systems, product design, analytics, automation, and modern web engineering. He builds practical solutions for real business challenges.',
      actions: ['What technologies do you use?', 'Tell me about your experience', 'Show your top projects']
    },
    {
      keywords: ['education', 'school', 'college', 'iit', 'degree', 'study', 'student'],
      response:
        'Vishant is studying at IIT Madras and blends academic rigor with real-world product experience in AI and engineering.',
      actions: ['Tell me about your experience', 'How can I contact you?', 'Show your top projects']
    },
    {
      keywords: ['github', 'code', 'open source', 'repo', 'repository'],
      response:
        'He shares code and technical experiments publicly, and his Projects page includes links to featured repositories and demo apps.',
      actions: ['Show your top projects', 'How can I contact you?', 'Tell me about your experience']
    },
    {
      keywords: ['linkedin'],
      response:
        'LinkedIn is the best place to connect professionally with Vishant. You can find the link on the Contact page.',
      actions: ['How can I contact you?', 'Tell me about your experience', 'Show your top projects']
    },
    {
      keywords: ['recommend', 'suggest', 'best', 'top', 'priority'],
      response:
        'I can recommend a few of Vishant\'s most impressive projects. Start with his AI, automation, and product strategy work on the Projects page.',
      actions: ['Recommend a project', 'Show your top projects', 'Tell me about your experience']
    }
  ];

  const matchedIntent = intents.find((intent) => intent.keywords.some((keyword) => normalized.includes(keyword)));

  if (matchedIntent) {
    return createBotMessage(matchedIntent.response, filterActions(matchedIntent.actions, messageText));
  }

  if (/\b(what|where|how|when|who|why)\b/.test(normalized)) {
    return createBotMessage(
      'I can answer questions about Vishant\'s portfolio, experience, technologies, and contact details. Try asking about one of those topics.',
      fallbackActions
    );
  }

  return createBotMessage(
    'That\'s an interesting question. I can help you learn more about Vishant\'s work, experience, or how to connect with him.',
    filterActions(fallbackActions, messageText)
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