import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, MessageCircle, RefreshCcw, Sparkles, UserRound, ArrowUpRight, BriefcaseBusiness, Cpu, WandSparkles, FileText, Mail, Trophy, Radar } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const compactPrompts = [
  'Best project?',
  'AI skills',
  'Robotics work',
  'Availability',
  'Contact',
  'Resume'
];

const defaultActions = [
  'Show your top projects',
  'Tell me about your experience',
  'How can I contact you?',
  'What technologies do you use?',
  'Open contact page'
];

const actionRoutes: Record<string, string> = {
  'Show your top projects': '/projects',
  'Recommend a project': '/projects',
  'Tell me about your experience': '/experience',
  'How can I contact you?': '/contact',
  'Open contact page': '/contact',
  'View resume': '/resume',
  'Resume': '/resume',
  'Contact': '/contact',
};

const createBotMessage = (text: string, actions: string[] = defaultActions): Message => ({
  id: `bot-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  type: 'bot',
  text,
  actions,
  timestamp: Date.now()
});

const synonymMap: Record<string, string> = {
  birthdate: 'birthday',
  birthplace: 'location',
  enquiry: 'inquiry',
  enquires: 'inquiry',
  enquire: 'inquiry',
  availablity: 'availability',
  avilable: 'available',
  experiance: 'experience',
  exprience: 'experience',
  projet: 'project',
  projects: 'project',
  tech: 'technology',
  technologies: 'technology',
  robot: 'robotics',
  robots: 'robotics',
  saas: 'software',
  startup: 'founder',
  startups: 'founder',
};

const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) age -= 1;
  return age;
};

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => synonymMap[word] ?? word)
    .join(' ')
    .trim();

const tokenize = (text: string) => Array.from(new Set(normalizeText(text).split(/\s+/).filter((word) => word.length > 1)));

const scoreKeywords = (normalized: string, keywords: string[]) => {
  const messageTokens = tokenize(normalized);
  return keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    const keywordTokens = tokenize(normalizedKeyword);
    const phraseScore = normalized.includes(normalizedKeyword) ? 4 + keywordTokens.length : 0;
    const tokenScore = keywordTokens.reduce((total, token) => total + (messageTokens.includes(token) ? 1 : 0), 0);
    return score + phraseScore + tokenScore;
  }, 0);
};

const filterActions = (actions: string[], messageText: string): string[] => {
  const normalizedMessage = normalizeText(messageText);
  const filtered = actions.filter((action) => normalizeText(action) !== normalizedMessage);
  return filtered.length > 0 ? filtered : defaultActions.filter((action) => normalizeText(action) !== normalizedMessage);
};

const profileFacts = [
  {
    keywords: ['dob', 'date of birth', 'birthday', 'born', 'birth'],
    response: () =>
      `Vishant Bhardwaj's date of birth is 18 September 2006. He is ${calculateAge(new Date(2006, 8, 18))} years old.`,
    actions: ['View resume', 'Tell me about your experience', 'How can I contact you?']
  },
  {
    keywords: ['age', 'how old'],
    response: () =>
      `Vishant is ${calculateAge(new Date(2006, 8, 18))} years old. His date of birth is 18 September 2006.`,
    actions: ['View resume', 'Tell me about your experience', 'How can I contact you?']
  },
  {
    keywords: ['full name', 'name', 'who is vishant', 'about vishant', 'profile'],
    response: () =>
      'His full name is Vishant Bhardwaj. He is a product-focused AI, SaaS, and robotics builder, currently leading MaVionix work while studying at IIT Madras and SRM IST.',
    actions: ['View resume', 'Tell me about your experience', 'Show your top projects']
  },
  {
    keywords: ['email', 'mail', 'contact email', 'gmail'],
    response: () =>
      'Vishant\'s primary email is vishantbhardwaj06@gmail.com. For professional inquiries, the Contact page is the best place to send a focused brief.',
    actions: ['Open contact page', 'View resume', 'Show your top projects']
  },
  {
    keywords: ['location', 'based', 'city', 'meerut', 'where does he live', 'where is vishant from'],
    response: () =>
      'Vishant is based in Meerut, Uttar Pradesh, India, and works with founder teams in remote, hybrid, and global collaboration formats.',
    actions: ['How can I contact you?', 'Tell me about your experience', 'View resume']
  },
  {
    keywords: ['education', 'college', 'degree', 'iit', 'srm', 'school', 'study', 'studying'],
    response: () =>
      'Education: IIT Madras, BS in Management & Data Science, ongoing toward 2029 with current GPA 7.0; SRM Institute of Science & Technology, B.Tech CSE Data Science, ongoing toward 2028 with current CGPA 9.21. He completed Class XII at St. Xavier\'s World School, Meerut with 80.4% and Class X with 91.6%.',
    actions: ['View resume', 'Tell me about your experience', 'What technologies do you use?']
  },
  {
    keywords: ['cgpa', 'gpa', 'marks', 'percentage', 'grades', 'score'],
    response: () =>
      'Current academic scores listed in the portfolio: SRM IST B.Tech CSE Data Science CGPA 9.21, IIT Madras BS Management & Data Science GPA 7.0, Class XII 80.4%, and Class X 91.6%.',
    actions: ['View resume', 'Tell me about your experience', 'What technologies do you use?']
  },
  {
    keywords: ['resume', 'cv', 'download resume', 'download cv'],
    response: () =>
      'You can view or download Vishant\'s resume from the Resume page. It summarizes his education, experience, projects, and technical/product profile.',
    actions: ['View resume', 'How can I contact you?', 'Show your top projects']
  },
  {
    keywords: ['current work', 'working on', 'working now', 'present work', 'currently building', 'currently working'],
    response: () =>
      'Right now, Vishant is focused on MaVionix, AI SaaS workflows for SMEs, robotics/product systems such as ARAK-1, and ongoing academic work at IIT Madras and SRM IST.',
    actions: ['Show your top projects', 'Tell me about your experience', 'How can I contact you?']
  },
  {
    keywords: ['github', 'repo', 'repository', 'code'],
    response: () =>
      'Vishant\'s GitHub profile is github.com/Vishantbhardwaj18. Featured project links are also available on the Projects page.',
    actions: ['Show your top projects', 'How can I contact you?', 'View resume']
  }
];

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
  },
  {
    keywords: ['award', 'awards', 'achievement', 'recognition', 'winner', 'guinness', 'iit hyderabad', 'innovathon'],
    response:
      'Notable recognitions include winning THRUST Tech Expo at IIT Hyderabad, winning Innovathon 1.0 at the University of Jammu, a Guinness World Record contribution, and multiple innovation/showcase recognitions.',
    actions: ['Show your top projects', 'Tell me about your experience', 'View resume']
  },
  {
    keywords: ['service', 'services', 'consulting', 'build for me', 'what can he build', 'founder', 'startup'],
    response:
      'Vishant is strongest when helping founder teams clarify a product idea, shape an MVP, map user workflows, and build AI, SaaS, robotics, or automation systems with measurable outcomes.',
    actions: ['How can I contact you?', 'Show your top projects', 'What technologies do you use?']
  }
];

const getContextTopic = (messages: Message[]) => {
  const recentText = messages
    .slice(-4)
    .map((message) => message.text)
    .join(' ');
  const normalizedRecent = normalizeText(recentText);
  const match = knowledgeEntries
    .map((entry) => ({ entry, score: scoreKeywords(normalizedRecent, entry.keywords) }))
    .sort((a, b) => b.score - a.score)[0];

  return match && match.score >= 4 ? match.entry.keywords[0] : '';
};

const getKnowledgeResponse = (normalized: string, messageText: string): Message | null => {
  const match = knowledgeEntries
    .map((entry) => ({ entry, score: scoreKeywords(normalized, entry.keywords) }))
    .sort((a, b) => b.score - a.score)[0];

  if (!match || match.score < 3) return null;

  return createBotMessage(match.entry.response, filterActions(match.entry.actions, messageText));
};

const getProfileResponse = (normalized: string, messageText: string): Message | null => {
  const match = profileFacts
    .map((entry) => ({ entry, score: scoreKeywords(normalized, entry.keywords) }))
    .sort((a, b) => b.score - a.score)[0];

  if (!match || match.score < 3) return null;

  return createBotMessage(match.entry.response(), filterActions(match.entry.actions, messageText));
};

const getSmartSuggestions = (input: string, messages: Message[]) => {
  const normalized = normalizeText(input);
  const recentBotActions = messages
    .slice()
    .reverse()
    .find((message) => message.type === 'bot' && message.actions?.length)?.actions;

  if (normalized.includes('contact') || normalized.includes('hire') || normalized.includes('available')) {
    return ['Contact', 'Availability', 'Resume', 'Top projects'];
  }

  if (normalized.includes('age') || normalized.includes('birthday') || normalized.includes('dob') || normalized.includes('education')) {
    return ['Resume', 'Experience', 'Contact', 'Top projects'];
  }

  if (normalized.includes('robotics') || normalized.includes('arak') || normalized.includes('drone')) {
    return ['Robotics work', 'Best project?', 'Experience', 'Contact'];
  }

  if (normalized.includes('ai') || normalized.includes('technology') || normalized.includes('skill')) {
    return ['AI skills', 'AI SaaS work', 'Top projects', 'Experience'];
  }

  return (recentBotActions?.slice(0, 4) ?? compactPrompts).map((prompt) => {
    if (prompt === 'Show your top projects') return 'Top projects';
    if (prompt === 'Tell me about your experience') return 'Experience';
    if (prompt === 'How can I contact you?') return 'Contact';
    if (prompt === 'What technologies do you use?') return 'AI skills';
    if (prompt === 'View resume') return 'Resume';
    return prompt;
  });
};

const expandCompactPrompt = (prompt: string) => {
  const promptMap: Record<string, string> = {
    'Best project?': 'Recommend the strongest project',
    'Top projects': 'Show your top projects',
    'AI skills': 'What technologies do you use?',
    'AI SaaS work': 'Tell me about MaVionix AI SaaS work',
    'Robotics work': 'Tell me about ARAK-1 and robotics work',
    Availability: 'Is Vishant available?',
    Contact: 'How can I contact you?',
    Experience: 'Tell me about your experience',
    Resume: 'View resume',
  };

  return promptMap[prompt] ?? prompt;
};

const getSuggestionMeta = (prompt: string) => {
  const normalized = normalizeText(prompt);

  if (normalized.includes('resume')) return { icon: FileText, label: 'Resume' };
  if (normalized.includes('contact') || normalized.includes('availability')) return { icon: Mail, label: prompt };
  if (normalized.includes('project') || normalized.includes('top') || normalized.includes('best')) return { icon: Trophy, label: prompt };
  if (normalized.includes('robotics') || normalized.includes('arak')) return { icon: Radar, label: prompt };
  if (normalized.includes('ai') || normalized.includes('skill') || normalized.includes('technology')) return { icon: Cpu, label: prompt };
  if (normalized.includes('experience')) return { icon: BriefcaseBusiness, label: prompt };

  return { icon: WandSparkles, label: prompt };
};

const getBotReply = (messageText: string, previousMessages: Message[] = []): Message => {
  const contextTopic = /\b(it|that|this|project|system|one)\b/i.test(messageText) ? getContextTopic(previousMessages) : '';
  const normalized = normalizeText(`${messageText} ${contextTopic}`);

  const fallbackActions = [
    'Show your top projects',
    'Tell me about your experience',
    'How can I contact you?',
    'What technologies do you use?'
  ];

  if (normalized.length === 0) {
    return createBotMessage('Try typing a question about Vishant\'s projects, experience, or how to connect with him.', fallbackActions);
  }

  const profileResponse = getProfileResponse(normalized, messageText);
  if (profileResponse) {
    return profileResponse;
  }

  if (/\b(compare|difference|versus|vs|which one|better)\b/.test(normalized)) {
    return createBotMessage(
      'For technical depth, ARAK-1 is the strongest robotics case study. For product strategy, MaVionix and Noikix show clearer SaaS and MVP leadership. For high-risk systems thinking, the autonomous medical UAV is the most ambitious.',
      ['Recommend a project', 'Show your top projects', 'How can I contact you?']
    );
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
        'Best starting point: ARAK-1 for robotics depth, the autonomous medical UAV for systems engineering, and Noikix or MaVionix for product/SaaS leadership. If you only view one, start with ARAK-1.',
      actions: ['Recommend a project', 'Show your top projects', 'Tell me about your experience']
    }
  ];

  const matchedIntent = intents
    .map((intent) => ({ intent, score: scoreKeywords(normalized, intent.keywords) }))
    .sort((a, b) => b.score - a.score)[0];

  if (matchedIntent && matchedIntent.score >= 3) {
    return createBotMessage(matchedIntent.intent.response, filterActions(matchedIntent.intent.actions, messageText));
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

const formatTime = (timestamp: number) =>
  new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(timestamp);

const Chatbot: React.FC = () => {
  const navigate = useNavigate();
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
  const smartSuggestions = React.useMemo(() => getSmartSuggestions(input, messages), [input, messages]);
  const visibleSuggestions = React.useMemo(() => Array.from(new Set(smartSuggestions)).slice(0, 5), [smartSuggestions]);

  const createWelcomeMessage = (): Message => ({
    id: `welcome-${Date.now()}`,
    type: 'bot',
    text: 'Hi! 👋 I\'m Vishant\'s AI assistant. Ask me about his projects, experience, or how to connect with him.',
    actions: quickPrompts,
    timestamp: Date.now()
  });

  const createFreshWelcomeMessage = (): Message => ({
    id: `welcome-${Date.now()}`,
    type: 'bot',
    text: 'Hi! I am Vishant\'s portfolio assistant. I can summarize his best projects, explain his product and robotics experience, or help you contact him.',
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
        setMessages([createFreshWelcomeMessage()]);
      }
    } else {
      setMessages([createFreshWelcomeMessage()]);
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
    setMessages([createFreshWelcomeMessage()]);
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

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
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
      const botMessage = getBotReply(messageText, nextMessages);
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 520 + Math.random() * 520);
  };

  const handleAction = (action: string) => {
    const route = actionRoutes[action];

    if (route) {
      navigate(route);
      setIsOpen(true);
      setUnreadCount(0);

      const userMessage: Message = {
        id: `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type: 'user',
        text: action,
        timestamp: Date.now()
      };

      const botMessage = createBotMessage(
        route === '/contact'
          ? 'I opened the Contact page. You can send Vishant a focused project inquiry there.'
          : route === '/projects'
            ? 'I opened the Projects page. Start with ARAK-1, the UAV system, or Noikix for the strongest case studies.'
            : route === '/experience'
              ? 'I opened the Experience page so you can see his product leadership and MaVionix work in context.'
              : 'I opened the Resume page for a compact professional summary.',
        filterActions(defaultActions, action)
      );

      setMessages((prev) => [...prev, userMessage, botMessage]);
      return;
    }

    handleSendMessage(action);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleAction(expandCompactPrompt(prompt));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const updateScrollState = (container: HTMLDivElement) => {
    const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 40;
    setIsAtBottom(atBottom);
  };

  const handleMessagesWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const canScroll = container.scrollHeight > container.clientHeight;
    if (!canScroll) return;

    event.preventDefault();
    event.stopPropagation();

    container.scrollBy({
      top: event.deltaY,
      left: event.deltaX,
      behavior: 'auto',
    });
    updateScrollState(container);
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
    <div className="fixed bottom-5 right-4 z-[95] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex h-[min(600px,calc(100vh-6.5rem))] w-[calc(100vw-1.5rem)] max-w-[26rem] flex-col overflow-hidden rounded-2xl border border-primary/20 bg-background/96 shadow-[0_30px_120px_rgba(15,23,42,0.28)] backdrop-blur-2xl dark:shadow-[0_30px_130px_rgba(0,0,0,0.62)] sm:w-[26rem]"
          >
            <div className="relative overflow-hidden border-b border-border/50 bg-gradient-to-r from-primary/12 via-surface/80 to-accent/12 p-3.5">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px gradient-spectrum" />
              <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/15 shadow-[0_0_30px_rgba(var(--primary-rgb),0.16)]">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <motion.div
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-foreground">Vishant AI</h3>
                    <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-green-600 dark:text-green-300">Smart</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Projects, experience, contact</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="rounded-lg border border-border/50 bg-surface/70 p-2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Reset chat"
                >
                  <RefreshCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleChat}
                  className="rounded-lg border border-border/50 bg-surface/70 p-2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              </div>
              <div className="relative mt-3 grid grid-cols-3 gap-1.5">
                {[
                  { label: 'AI SaaS', icon: Cpu },
                  { label: 'Robotics', icon: Sparkles },
                  { label: 'Product', icon: BriefcaseBusiness },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-center gap-1 rounded-lg border border-border/40 bg-surface/55 px-2 py-1.5 text-[9px] font-semibold text-muted-foreground">
                    <item.icon className="h-3 w-3 text-primary" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div
              className="relative flex-1 space-y-3 overflow-y-auto overscroll-contain p-3.5 scroll-smooth"
              onWheel={handleMessagesWheel}
              onScroll={(e) => updateScrollState(e.currentTarget)}
              ref={messagesContainerRef}
            >
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
                    className={`max-w-[84%] break-words whitespace-pre-wrap px-3.5 py-2.5 text-[13px] leading-6 shadow-sm ${
                      msg.type === 'user'
                        ? 'rounded-2xl rounded-br-sm bg-primary text-primary-foreground'
                        : 'rounded-2xl rounded-bl-sm border border-border/50 bg-surface/95 text-foreground'
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] opacity-70">
                      {msg.type === 'user' ? <UserRound className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                      <span>{msg.type === 'user' ? 'You' : 'Assistant'}</span>
                      <span>{formatTime(msg.timestamp)}</span>
                    </div>
                    {msg.text}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {msg.actions.slice(0, 3).map((action) => (
                          <button
                            key={action}
                            onClick={() => handleAction(action)}
                            className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary transition-colors hover:bg-primary/20"
                          >
                            {action}
                            {actionRoutes[action] && <ArrowUpRight className="h-3 w-3" />}
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
                  <div className="rounded-2xl rounded-bl-sm border border-border/50 bg-surface px-3.5 py-2 text-sm text-foreground shadow-sm">
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
                      <span>Thinking...</span>
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
                  className="border-b border-border/50 bg-gradient-to-r from-primary/8 via-surface/50 to-accent/8 px-3.5 py-2.5"
                >
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                        <WandSparkles className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black uppercase leading-none tracking-[0.22em] text-primary">Suggested</p>
                        <p className="mt-1 truncate text-[10px] leading-none text-muted-foreground">Tap a shortcut or keep typing</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowSuggestions(false)}
                      className="rounded-lg border border-border/40 bg-surface/70 p-1.5 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                      aria-label="Close suggestions"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                    {visibleSuggestions.map((prompt, index) => {
                      const meta = getSuggestionMeta(prompt);
                      const Icon = meta.icon;

                      return (
                        <motion.button
                          key={prompt}
                          type="button"
                          onClick={() => handleQuickPrompt(prompt)}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.035 }}
                          className="group flex min-h-9 items-center gap-2 rounded-xl border border-border/50 bg-surface/82 px-2.5 py-1.5 text-left text-[10px] font-bold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10 hover:text-primary hover:shadow-[0_12px_30px_rgba(var(--primary-rgb),0.12)]"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="h-3 w-3" />
                          </span>
                          <span className="min-w-0 truncate">{meta.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="border-t border-border/50 bg-background/65 p-3.5">
              {!showSuggestions && (
                <button
                  type="button"
                  onClick={() => setShowSuggestions(true)}
                  className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[10px] font-bold text-primary transition-colors hover:bg-primary/14"
                >
                  <WandSparkles className="h-3 w-3" />
                  Show suggestions
                </button>
              )}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about projects, skills, or contact..."
                  className="min-w-0 flex-1 rounded-xl border border-border/50 bg-surface px-3.5 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                  aria-label="Chat message input"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="rounded-xl bg-primary p-3 text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
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
        className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-accent to-primary text-white shadow-[0_18px_55px_rgba(var(--primary-rgb),0.35)] transition-shadow hover:shadow-[0_24px_70px_rgba(var(--primary-rgb),0.45)]"
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
