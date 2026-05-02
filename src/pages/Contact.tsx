import * as React from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TextReveal } from "../components/effects/TextReveal";
import { Magnetic } from "../components/effects/Magnetic";

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/vishant-bhardwaj/",
    details: "Professional Network",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Vishantbhardwaj18",
    details: "Code Repositories",
  },
  {
    icon: Globe,
    label: "Website",
    href: "https://www.vishantbhardwaj.in",
    details: "Digital Portfolio",
  },
  {
    icon: FileText,
    label: "Resume",
    href: "/images/vishantbhardwajresume.pdf",
    details: "Technical CV",
  },
];

const faqs = [
  {
    q: "What is your current availability?",
    a: "I am open for strategic product partnerships and a limited number of 0-to-1 launches. I do not take hourly maintenance or low-budget work.",
  },
  {
    q: "Do you offer tech-stack advising?",
    a: "Yes, especially for startups bridging AI and robotics with scalable SaaS backends and product-led growth.",
  },
  {
    q: "Where are you based?",
    a: "I am based in Meerut, UP, and work globally with founder teams in hybrid and remote formats.",
  },
];

const onboardingSteps = [
  { title: "Analysis", desc: "Validate the opportunity, risk, and product advantage.", icon: Target },
  { title: "Strategy", desc: "Define scope, roadmap, and a launch-ready plan.", icon: Shield },
  { title: "Execution", desc: "Build fast with product discipline and weekly alignment.", icon: Zap },
  { title: "Deployment", desc: "Launch, scale, and hand over a system that runs.", icon: CheckCircle2 },
];

const focusOptions = [
  "0-to-1 product launch",
  "AI SaaS / platform",
  "Robotics / automation",
  "Growth & systems scaling",
  "Technical strategy",
];

const timelineOptions = [
  "Now to next 4 weeks",
  "MVP build, 2-3 months",
  "Product roadmap, 4-6 months",
  "Long-term systems",
];

const budgetOptions = [
  "INR 20L+ / $25k-$50k",
  "INR 40L+ / $50k-$150k",
  "INR 1Cr+ / $150k+",
  "Equity / partnership",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const fieldVariants = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)", borderColor: "transparent" },
  active: {
    y: -1,
    boxShadow: "0 24px 48px rgba(198,161,74,0.08)",
    borderColor: "rgba(198,161,74,0.25)",
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
      <span className="mr-4 h-px w-8 bg-muted-foreground/30" />
      {children}
    </h2>
  );
}

export default function Contact() {
  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [selectedProjectFocus, setSelectedProjectFocus] = React.useState(focusOptions[0]);
  const [selectedTimeline, setSelectedTimeline] = React.useState(timelineOptions[0]);
  const [selectedBudget, setSelectedBudget] = React.useState(budgetOptions[0]);
  const [expandedFaq, setExpandedFaq] = React.useState<boolean[]>(new Array(faqs.length).fill(false));
  const [copiedValue, setCopiedValue] = React.useState<string | null>(null);
  const [activeField, setActiveField] = React.useState<string | null>(null);
  const heroRef = React.useRef<HTMLElement | null>(null);
  const formRef = React.useRef<HTMLDivElement | null>(null);
const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.35 });
  const sidebarY = useTransform(pageProgress, [0, 1], [0, -32]);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(heroProgress, [0, 0.9], [1, 0.62]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedValue(text);
    window.setTimeout(() => setCopiedValue(null), 1600);
  };


  return (
    <div className="relative overflow-hidden py-20 lg:py-32">
      <AnimatePresence>
        {copiedValue && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            className="fixed right-5 top-6 z-[80] border border-gold/20 bg-background/85 px-4 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-gold shadow-[0_18px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:bg-black/70"
          >
            Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ scaleX: pageProgress }}
        className="fixed left-0 top-0 z-50 h-px w-full origin-left bg-gold shadow-[0_0_20px_var(--color-gold)]"
      />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_8%,rgba(198,161,74,0.14),transparent_30%),radial-gradient(circle_at_14%_52%,rgba(198,161,74,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.075] bg-[linear-gradient(rgba(198,161,74,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(198,161,74,0.28)_1px,transparent_1px)] bg-[size:76px_76px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.55)_1px,transparent_0)] bg-[size:4px_4px]" />

      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-10%] top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[150px]"
      />
      <motion.div
        animate={{ scale: [1, 1.24, 1], opacity: [0.04, 0.11, 0.04] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-0 left-[-12%] -z-10 h-[32rem] w-[32rem] rounded-full bg-gold/10 blur-[160px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity }}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative mb-20 overflow-hidden rounded-3xl border border-gold/15 bg-card/75 p-6 shadow-[0_40px_140px_rgba(15,23,42,0.12)] glass dark:bg-black/20 dark:shadow-[0_40px_140px_rgba(0,0,0,0.35)] sm:p-8 md:p-10 lg:mb-24 lg:p-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_34%,rgba(198,161,74,0.2),transparent_34%)]" />
          <motion.div
            animate={{ rotate: [0, 5, 0], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-0 p-8"
          >
            <Sparkles className="h-56 w-56 text-gold" />
          </motion.div>

          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:items-center xl:gap-14">
            <motion.div variants={fadeUp} className="max-w-[58rem] space-y-7">
              <div className="inline-flex max-w-full items-center border border-gold/20 bg-gold/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-gold sm:tracking-[0.28em]">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_18px_var(--color-gold)]" />
                Selective intake / founder-led engagements
              </div>
              <h1 className="max-w-[12ch] font-display text-[clamp(2.4rem,4.5vw,4rem)] font-black leading-[0.96] tracking-[-0.04em] sm:max-w-[13ch] lg:max-w-[14ch]">
                <TextReveal text="Build the AI product" /> <br />
                <span className="text-gold text-glow">
                  <TextReveal text="that defines your category" delay={0.2} />
                </span>
              </h1>
              <p className="max-w-2xl text-base font-light leading-8 text-muted-foreground md:text-lg">
                For founders and product leaders who need a strategic partner to move from idea to a scalable product
                system, with clear thinking, fast execution, and strong product taste.
              </p>
              <div className="flex flex-wrap gap-4">
                <Magnetic strength={0.12}>
                  <Button
                    asChild
                    size="sm"
                    className="h-11 rounded-2xl bg-gold px-6 text-[10px] font-black uppercase tracking-[0.22em] text-black hover:bg-foreground hover:text-background"
                  >
                    <a href="#founder-intake">
                      Start intake <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </Magnetic>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-11 rounded-2xl border-gold/30 px-6 text-[10px] font-black uppercase tracking-[0.22em] glass hover:border-gold hover:bg-gold/5"
                >
                  <a href="/images/vishantbhardwajresume.pdf" target="_blank" rel="noreferrer">
                    <FileText className="mr-2 h-3.5 w-3.5" /> Founder profile
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="w-full max-w-[29rem] space-y-5 justify-self-start rounded-3xl border border-gold/15 bg-background/60 p-5 glass dark:bg-black/20 sm:p-6 lg:justify-self-end">
              <p className="text-sm font-light leading-7 text-muted-foreground">
                I build AI SaaS, robotics systems, and 0-to-1 products with founder teams who want clarity, speed, and
                market impact.
              </p>
              <div className="grid gap-3">
                {[
                  { icon: Clock, label: "Avg. response", value: "< 24 hours" },
                  { icon: MapPin, label: "Base", value: "Meerut, India / Global" },
                  { icon: Shield, label: "Focus", value: "AI SaaS, Robotics, Product Strategy" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-3xl border border-muted/15 bg-card/60 p-3 dark:bg-black/20">
                    <item.icon className="h-4 w-4 text-gold" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-muted-foreground">{item.label}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <motion.aside
            style={{ y: sidebarY }}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="space-y-14 lg:col-span-5"
          >
            <motion.section variants={fadeUp} className="space-y-6">
              <SectionLabel>Essential channels</SectionLabel>
              <div className="grid gap-4">
                {[
                  { icon: Mail, label: "Primary email", value: "vishantbhardwaj06@gmail.com", copy: "vishantbhardwaj06@gmail.com" },
                  { icon: Phone, label: "Direct line", value: "+91 7818037404", copy: "+917818037404" },
                ].map((channel) => {
                  const isCopied = copiedValue === channel.copy;

                  return (
                    <motion.button
                      key={channel.label}
                      onClick={() => copyToClipboard(channel.copy)}
                      whileTap={{ scale: 0.985 }}
                      className="group relative flex w-full items-center justify-between overflow-hidden rounded-3xl border border-border bg-card/70 p-6 text-left transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_22px_70px_rgba(198,161,74,0.1)] glass dark:bg-black/20"
                    >
                      <div className="absolute inset-0 bg-gold/[0.04] opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground">
                          {channel.label}
                        </p>
                        <p className="font-heading text-sm font-semibold sm:text-base">{channel.value}</p>
                      </div>
                      <div className="relative flex h-10 w-10 items-center justify-center border border-gold/20 bg-gold/[0.05] text-gold">
                        <AnimatePresence mode="wait">
                          {isCopied ? (
                            <motion.span key="check" initial={{ scale: 0.6 }} animate={{ scale: 1 }} exit={{ scale: 0.6 }}>
                              <Check className="h-4 w-4" />
                            </motion.span>
                          ) : (
                            <motion.span key="copy" initial={{ scale: 0.6 }} animate={{ scale: 1 }} exit={{ scale: 0.6 }}>
                              <Copy className="h-4 w-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>

            <motion.section variants={fadeUp} className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <SectionLabel>Onboarding process</SectionLabel>
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-gold/80">Founder-first</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {onboardingSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="rounded-3xl border border-border bg-card/70 p-6 glass transition-colors hover:border-gold/30 hover:bg-gold/[0.04] dark:bg-black/20"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <p className="font-display text-2xl text-gold">0{index + 1}</p>
                      <step.icon className="h-4 w-4 text-gold/60" />
                    </div>
                    <h4 className="font-heading text-xs font-bold uppercase tracking-[0.22em]">{step.title}</h4>
                    <p className="mt-3 text-xs font-light leading-6 text-muted-foreground">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp} className="space-y-6 rounded-3xl border border-gold/20 bg-gold/[0.04] p-8 glass">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-muted-foreground">
                  Before you reach out
                </p>
                <h3 className="font-display text-3xl leading-none">Only reach out if this is the right fit</h3>
              </div>
              <div className="space-y-3 text-sm leading-7 text-muted-foreground">
                <p>
                  Contact me if you are building a product, launching an AI-enabled system, or seeking a senior product
                  partner.
                </p>
                <p className="font-medium text-foreground">Not a fit for brochure sites, hourly support, or basic marketing work.</p>
              </div>
              <ul className="space-y-2 text-[10px] font-black uppercase tracking-[0.2em] text-gold">
                <li>Founder-led teams</li>
                <li>AI, SaaS, robotics, product strategy</li>
                <li>Limited strategic intake</li>
              </ul>
            </motion.section>

            <motion.section variants={fadeUp} className="space-y-6">
              <SectionLabel>Quick answers</SectionLabel>
              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isExpanded = expandedFaq[index];

                  return (
                    <div
                      key={faq.q}
                      className="overflow-hidden rounded-3xl border border-border bg-card/70 glass transition-all hover:border-gold/30 dark:bg-black/20"
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq((prev) => prev.map((value, itemIndex) => (itemIndex === index ? !value : value)))
                        }
                        className="group flex w-full items-center justify-between gap-4 rounded-3xl p-6 text-left"
                      >
                        <h4
                          className={`font-heading text-sm font-bold uppercase tracking-[0.18em] transition-colors ${
                            isExpanded ? "text-gold" : "group-hover:text-gold"
                          }`}
                        >
                          {faq.q}
                        </h4>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                          <ChevronDown
                            className={`h-4 w-4 transition-colors ${
                              isExpanded ? "text-gold" : "text-muted-foreground group-hover:text-gold"
                            }`}
                          />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                          >
                            <div className="border-t border-gold/10 px-6 pb-6 pt-4">
                              <p className="text-sm font-light leading-7 text-muted-foreground">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          </motion.aside>

          <div className="lg:col-span-7" id="founder-intake">
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.003 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card/75 p-6 shadow-[0_35px_120px_rgba(15,23,42,0.12)] glass dark:bg-black/20 dark:shadow-[0_35px_120px_rgba(0,0,0,0.35)] md:p-10 lg:p-12"
            >

              <div className="absolute right-0 top-0 p-8 opacity-5">
                <Sparkles className="h-48 w-48 rotate-12 text-gold" />
              </div>

              <div className="relative z-10 space-y-12">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gold">Founder intake</p>
                  <h2 className="font-display text-4xl leading-none md:text-5xl">Strategic fit signal</h2>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    Share the essential project details so the first conversation is focused and productive.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <motion.div
                      variants={fieldVariants}
                      animate={activeField === "from_name" ? "active" : "rest"}
                      transition={{ type: "spring", stiffness: 240, damping: 20 }}
                      className="space-y-3 rounded-none border border-transparent bg-card/70 p-0"
                    >
                      <label className="text-[10px] font-black uppercase tracking-[0.28em] text-gold/70" htmlFor="from_name">
                        Founder / lead
                      </label>
                      <Input
                        required
                        id="from_name"
                        name="from_name"
                        placeholder="Vishant / Head of Product"
                        onFocus={() => setActiveField("from_name")}
                        onBlur={() => setActiveField(null)}
                        className="rounded-none border-0 border-b border-border bg-transparent px-0 py-6 text-lg font-light placeholder:text-muted-foreground/35 focus:border-gold"
                      />
                      <p className="text-[11px] text-muted-foreground/80">Your role and decision authority help speed the next step.</p>
                    </motion.div>
                    <motion.div
                      variants={fieldVariants}
                      animate={activeField === "reply_to" ? "active" : "rest"}
                      transition={{ type: "spring", stiffness: 240, damping: 20 }}
                      className="space-y-3 rounded-none border border-transparent bg-card/70 p-0"
                    >
                      <label className="text-[10px] font-black uppercase tracking-[0.28em] text-gold/70" htmlFor="reply_to">
                        Primary contact
                      </label>
                      <Input
                        required
                        id="reply_to"
                        name="reply_to"
                        type="email"
                        placeholder="founder@startup.com"
                        onFocus={() => setActiveField("reply_to")}
                        onBlur={() => setActiveField(null)}
                        className="rounded-none border-0 border-b border-border bg-transparent px-0 py-6 text-lg font-light placeholder:text-muted-foreground/35 focus:border-gold"
                      />
                      <p className="text-[11px] text-muted-foreground/80">I use this for the assessment and next-step invite.</p>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={fieldVariants}
                    animate={activeField === "project_focus" ? "active" : "rest"}
                    transition={{ type: "spring", stiffness: 240, damping: 20 }}
                    className="space-y-4 rounded-none border border-transparent bg-card/70 p-0"
                  >
                    <label className="text-[10px] font-black uppercase tracking-[0.28em] text-gold/70" htmlFor="project_focus">
                      Project focus
                    </label>
                    <select
                      id="project_focus"
                      name="project_focus"
                      value={selectedProjectFocus}
                      onChange={(event) => setSelectedProjectFocus(event.target.value)}
                      onFocus={() => setActiveField("project_focus")}
                      onBlur={() => setActiveField(null)}
                      className="w-full rounded-none border border-border bg-card/70 px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-foreground outline-none transition-all focus:border-gold focus:ring-0"
                    >
                      {focusOptions.map((tag) => (
                        <option key={tag} value={tag} className="text-[10px] uppercase">
                          {tag}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-muted-foreground/80">
                      Select the option that best describes your project focus.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <motion.div
                      variants={fieldVariants}
                      animate={activeField === "timeline" ? "active" : "rest"}
                      transition={{ type: "spring", stiffness: 240, damping: 20 }}
                      className="space-y-6 rounded-none border border-transparent bg-card/70 p-0"
                    >
                      <label className="text-[10px] font-black uppercase tracking-[0.28em] text-gold/70" htmlFor="timeline">
                        Launch horizon
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={selectedTimeline}
                        onChange={(event) => setSelectedTimeline(event.target.value)}
                        onFocus={() => setActiveField("timeline")}
                        onBlur={() => setActiveField(null)}
                        className="w-full rounded-none border border-border bg-card/70 px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-foreground outline-none transition-all focus:border-gold focus:ring-0"
                      >
                        {timelineOptions.map((time) => (
                          <option key={time} value={time} className="text-[10px] uppercase">
                            {time}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-muted-foreground/80">Select your expected launch horizon.</p>
                    </motion.div>
                    <motion.div
                      variants={fieldVariants}
                      animate={activeField === "budget" ? "active" : "rest"}
                      transition={{ type: "spring", stiffness: 240, damping: 20 }}
                      className="space-y-6 rounded-none border border-transparent bg-card/70 p-0"
                    >
                      <label className="text-[10px] font-black uppercase tracking-[0.28em] text-gold/70" htmlFor="budget">
                        Investment range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={selectedBudget}
                        onChange={(event) => setSelectedBudget(event.target.value)}
                        onFocus={() => setActiveField("budget")}
                        onBlur={() => setActiveField(null)}
                        className="w-full rounded-none border border-border bg-card/70 px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-foreground outline-none transition-all focus:border-gold focus:ring-0"
                      >
                        {budgetOptions.map((budget) => (
                          <option key={budget} value={budget} className="text-[10px] uppercase">
                            {budget}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-muted-foreground/80">Select the budget range that fits your project.</p>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={fieldVariants}
                    animate={activeField === "message" ? "active" : "rest"}
                    transition={{ type: "spring", stiffness: 240, damping: 20 }}
                    className="space-y-3 rounded-none border border-transparent bg-card/70 p-0"
                  >
                    <label className="text-[10px] font-black uppercase tracking-[0.28em] text-gold/70">Outcome statement</label>
                    <Textarea
                      required
                      name="message"
                      placeholder="Building an AI workflow for enterprise approvals with automation and adoption as the priority..."
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      className="min-h-40 resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-6 text-lg font-light transition-all placeholder:text-muted-foreground/35 focus:border-gold"
                    />
                    <p className="text-[11px] text-muted-foreground/80">
                      Describe the problem, desired outcome, and the primary risk in one paragraph.
                    </p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} className="space-y-6">
                    <Button
                      type="submit"
                      disabled={formStatus !== "idle"}
                      className={`relative h-16 w-full overflow-hidden rounded-2xl text-sm font-black uppercase tracking-[0.26em] transition-all ${
                        formStatus === "success"
                          ? "bg-green-600 text-white"
                          : "bg-gold text-black hover:bg-foreground hover:text-background"
                      }`}
                    >
                      <motion.span
                        animate={{ x: ["-120%", "130%"] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-y-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      />
                      <span className="relative z-10 flex items-center justify-center">
                        {formStatus === "idle" && (
                          <>
                            <Send className="mr-3 h-4 w-4" /> Submit application
                          </>
                        )}
                        {formStatus === "submitting" && "Encoding launch plan..."}
                        {formStatus === "success" && (
                          <>
                            <CheckCircle2 className="mr-3 h-5 w-5" /> Submission received
                          </>
                        )}
                      </span>
                    </Button>
                    <p className="text-center text-[10px] font-light italic text-muted-foreground/50">
                      Every inquiry is reviewed personally. If there is a fit, you will receive an engagement outline within 48 hours.
                    </p>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-16 border-t border-border pt-16"
            >
              <SectionLabel>Professional ecosystem</SectionLabel>
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {socialLinks.map((link) => (
                  <Magnetic key={link.label} strength={0.1}>
                    <motion.a
                      variants={fadeUp}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative flex h-full flex-col items-center space-y-5 overflow-hidden rounded-3xl border border-border bg-card/70 p-6 text-center transition-all hover:border-gold/50 glass dark:bg-black/20"
                    >
                      <div className="absolute inset-0 bg-gold/[0.04] opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative flex h-14 w-14 items-center justify-center border border-gold/15 bg-gold/10 transition-all group-hover:bg-gold/20 group-hover:shadow-[0_0_24px_rgba(198,161,74,0.24)]">
                        <link.icon className="h-5 w-5 text-gold transition-transform group-hover:scale-110" />
                      </div>
                      <div className="relative space-y-2">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-gold">
                          {link.label}
                        </p>
                        <p className="px-2 text-[10px] font-light leading-tight text-muted-foreground/50">{link.details}</p>
                      </div>
                    </motion.a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
