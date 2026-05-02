import * as React from "react"
import { AnimatePresence, motion, useScroll, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, GraduationCap, Briefcase, Youtube, Globe, Award, Star, Linkedin, Github, FileText, ArrowUpRight, Cpu, Zap, Bot, Layers, Activity, Target, Rocket, Milestone, TrendingUp, BarChart3, Users, Fingerprint, Database, Shield, Settings } from "lucide-react";
import { TextReveal } from "../components/effects/TextReveal";
import { Magnetic } from "../components/effects/Magnetic";
import { ScrollReveal } from "../components/effects/ScrollReveal";
import { ThoughtsSection } from "../components/ThoughtsSection";

const achievements = [
  { title: "Winner - Thrust Tech Expo", org: "IIT Hyderabad", icon: Trophy, color: "text-yellow-500" },
  { title: "Winner - Innovathon 1.0", org: "University of Jammu", icon: Star, color: "text-primary" },
  { title: "Guinness World Record", org: "Painting by Numbers", icon: Globe, color: "text-blue-500" },
  { title: "Appreciation Prize", org: "Anveshana, New Delhi", icon: Award, color: "text-purple-500" },
  { title: "YouTube Creator", org: "2.1K+ Subscribers", icon: Youtube, color: "text-red-500" },
  { title: "Hackathon Finalist", org: "Multiple AI Logistics", icon: Briefcase, color: "text-green-500" }
];

const heroHighlights = [
  { label: "AI Product Strategy", icon: Target },
  { label: "Robotics Systems", icon: Bot },
  { label: "GTM Execution", icon: Rocket },
  { label: "Data-Driven Design", icon: Database }
];

export default function Home() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [cgpa, setCgpa] = React.useState(0);
  const [productsBuilt, setProductsBuilt] = React.useState(0);
  const [subscribers, setSubscribers] = React.useState(0);
  const [showcaseIndex, setShowcaseIndex] = React.useState(0);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const tiltState = React.useRef({
    currentX: 0,
    currentY: 0,
    currentScale: 1,
    targetX: 0,
    targetY: 0,
    targetScale: 1,
    raf: 0,
    isHovering: false,
  });

  React.useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersFinePointer = window.matchMedia?.("(pointer: fine)").matches ?? true;
    if (!prefersFinePointer) return;

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const updateFrame = () => {
      const state = tiltState.current;
      state.currentX += (state.targetX - state.currentX) * 0.14;
      state.currentY += (state.targetY - state.currentY) * 0.14;
      state.currentScale += (state.targetScale - state.currentScale) * 0.12;

      card.style.transform = `perspective(1000px) rotateX(${state.currentX}deg) rotateY(${state.currentY}deg) scale3d(${state.currentScale},${state.currentScale},${state.currentScale})`;

      state.raf = requestAnimationFrame(updateFrame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      tiltState.current.targetX = clamp((0.5 - py) * 18, -10, 10);
      tiltState.current.targetY = clamp((px - 0.5) * 18, -10, 10);
      tiltState.current.targetScale = 1.04;
    };

    const handlePointerEnter = () => {
      tiltState.current.isHovering = true;
      tiltState.current.targetScale = 1.04;
      card.style.boxShadow = "0 20px 60px rgba(6,182,212,0.25)";
    };

    const handlePointerLeave = () => {
      tiltState.current.isHovering = false;
      tiltState.current.targetX = 0;
      tiltState.current.targetY = 0;
      tiltState.current.targetScale = 1;
      card.style.boxShadow = "0 30px 80px rgba(0,0,0,0.16)";
    };

    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointerleave", handlePointerLeave);

    updateFrame();

    return () => {
      cancelAnimationFrame(tiltState.current.raf);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  React.useEffect(() => {
    const cgpaAnim = animate(0, 9.21, {
      duration: 1,
      ease: "easeOut",
      onUpdate(latest) {
        setCgpa(Number(latest.toFixed(2)));
      }
    });

    const productsAnim = animate(0, 3, {
      duration: 1,
      ease: "easeOut",
      onUpdate(latest) {
        setProductsBuilt(Math.round(latest));
      }
    });

    const subsAnim = animate(0, 2100, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(latest) {
        setSubscribers(Math.round(latest));
      }
    });

    return () => {
      cgpaAnim.stop();
      productsAnim.stop();
      subsAnim.stop();
    };
  }, []);

  const showcaseImages = [
    "/images/arak-1.jpg",
    "/images/arak-2.jpg"
  ];

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setShowcaseIndex((current) => (current + 1) % showcaseImages.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  const marqueeItemsTop = [
    { label: "Product Management", icon: Target },
    { label: "Market Intelligence", icon: TrendingUp },
    { label: "KPI Intelligence", icon: BarChart3 },
    { label: "Data-Driven Decisions", icon: Database },
    { label: "AI GTM Signals", icon: Rocket },
    { label: "Robotics Systems", icon: Briefcase },
  ];

  const marqueeItemsBottom = [
    { label: "GTM Orchestration", icon: Rocket },
    { label: "Roadmap Prioritization", icon: Milestone },
    { label: "Stakeholder Alignment", icon: Users },
    { label: "Agile Delivery", icon: Zap },
    { label: "User Centricity", icon: Fingerprint },
    { label: "Risk Mitigation", icon: Shield },
  ];

  const marqueeRepeat = (items: Array<{ label: string; icon: typeof Target }>) => [...items, ...items];

  return (
    <div ref={containerRef} className="relative overflow-hidden pt-6">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Hero Section */}
        <motion.section 
          style={{ y: heroY, scale: heroScale }}
          className="relative py-8 lg:py-16 min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          {/* Enhanced Background Effects */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                x: [0, 12, 0], 
                y: [0, 8, 0], 
                scale: [1, 1.02, 1],
                rotate: [0, 1, 0]
              }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl opacity-70"
            />
            <motion.div
              animate={{ 
                x: [0, -12, 0], 
                y: [0, -8, 0], 
                scale: [1, 1.03, 1],
                rotate: [0, -1, 0]
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl opacity-60"
            />
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + i * 0.5,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="absolute w-2 h-2 bg-primary/40 rounded-full blur-sm"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`
                }}
              />
            ))}
          </div>
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] glass shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.25)] transition-all duration-300 hover:scale-105"
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-primary mr-3 shadow-[0_0_10px_var(--primary)]"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
              <span className="relative">
                Open to Senior Product Roles
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display text-responsive-hero leading-[0.82] tracking-tight relative whitespace-nowrap"
              >
                <TextReveal text="VISHANT" className="inline-flex text-foreground" />
                <br />
                <TextReveal text="BHARDWAJ" className="text-primary [text-shadow:0_0_40px_var(--primary-20)] relative whitespace-nowrap" delay={0.2} />
                {/* Enhanced glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-2xl blur-3xl -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-2xl text-base md:text-lg font-heading text-muted-foreground/75 leading-8 tracking-tight font-light"
              >
                Product Leader building AI, SaaS & Robotics systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="flex flex-wrap items-center gap-3 pt-4"
              >
                {heroHighlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/80 px-4 py-2 text-xs uppercase tracking-[0.28em] font-black text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/25 hover:bg-primary/10 hover:text-primary"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      <span>{item.label}</span>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <Magnetic strength={0.2}>
                  <motion.a
                    whileHover={{ 
                      y: -3, 
                      scale: 1.05,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    href="https://linkedin.com/in/vishant-bhardwaj/"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative p-3 block rounded-2xl border border-primary/10 bg-surface/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(var(--primary-rgb),0.15)]"
                  >
                    <Linkedin className="h-5 w-5 text-subtext group-hover:text-primary transition-colors" />
                    <span className="sr-only">LinkedIn</span>
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                      initial={false}
                    />
                  </motion.a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <motion.a
                    whileHover={{ 
                      y: -3, 
                      scale: 1.05,
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    href="https://github.com/Vishantbhardwaj18"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative p-3 block rounded-2xl border border-primary/10 bg-surface/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(var(--primary-rgb),0.15)]"
                  >
                    <Github className="h-5 w-5 text-subtext group-hover:text-primary transition-colors" />
                    <span className="sr-only">GitHub</span>
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                      initial={false}
                    />
                  </motion.a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <motion.a
                    whileHover={{ 
                      y: -3, 
                      scale: 1.05,
                      rotate: [0, -3, 3, 0]
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    href="https://www.vishantbhardwaj.in"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative p-3 block rounded-2xl border border-primary/10 bg-surface/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(var(--primary-rgb),0.15)]"
                  >
                    <Globe className="h-5 w-5 text-subtext group-hover:text-primary transition-colors" />
                    <span className="sr-only">Website</span>
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                      initial={false}
                    />
                  </motion.a>
                </Magnetic>
                <div className="h-6 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                <Magnetic strength={0.1}>
                  <motion.a 
                    href="/images/vishantbhardwajresume.pdf" 
                    download="Vishant_Bhardwaj_CV.pdf"
                    className="group relative flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-primary hover:text-primary-foreground transition-all duration-300 p-3 rounded-2xl border border-primary/20 bg-primary/5 hover:bg-primary hover:border-primary shadow-[0_4px_20px_rgba(var(--primary-rgb),0.1)] hover:shadow-[0_8px_30px_rgba(var(--primary-rgb),0.2)]"
                    whileHover={{ y: -2, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Download CV</span>
                    <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                      initial={false}
                    />
                  </motion.a>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.35, duration: 0.5 }}
               className="flex flex-wrap gap-4"
            >
              <Magnetic strength={0.15}>
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button asChild size="lg" className="group relative bg-gradient-to-r from-primary via-primary to-accent text-white shadow-[0_24px_80px_rgba(6,182,212,0.16)] hover:shadow-[0_28px_100px_rgba(6,182,212,0.2)] transition-all duration-300 transform-gpu hover:-translate-y-0.5 h-16 px-12 text-sm font-black uppercase tracking-[0.18em] rounded-[1.5rem] overflow-hidden">
                    <Link to="/projects" className="relative z-10 flex items-center gap-2 overflow-hidden">
                      <span className="relative z-10">View Projects</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="relative z-10"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </Link>
                  </Button>
                </motion.div>
              </Magnetic>
              <Magnetic strength={0.15}>
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button asChild variant="outline" size="lg" className="group relative border border-primary/20 bg-surface/10 text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5 h-16 px-12 text-sm font-black uppercase tracking-[0.18em] rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(var(--primary-rgb),0.15)]">
                    <Link to="/contact" className="relative z-10 flex items-center justify-center gap-2 overflow-hidden">
                      <motion.div className="relative z-10">
                        <motion.span
                          initial={{ opacity: 1 }}
                          whileHover={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          Contact Me
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          Let's Talk
                        </motion.span>
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </Link>
                  </Button>
                </motion.div>
              </Magnetic>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
            >
              <motion.div 
                className="group relative rounded-3xl border border-primary/10 bg-surface/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(6,182,212,0.1)] hover:border-primary/20 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <motion.p 
                  className="text-primary font-display text-4xl relative z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {cgpa.toFixed(2)}
                </motion.p>
                <p className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.28em] font-black mt-2 relative z-10">SRM CGPA</p>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.div>
              <motion.div 
                className="group relative rounded-3xl border border-primary/10 bg-surface/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(6,182,212,0.1)] hover:border-primary/20 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <motion.p 
                  className="text-primary font-display text-4xl relative z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                >
                  {productsBuilt > 0 ? `${productsBuilt}+` : "0+"}
                </motion.p>
                <p className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.28em] font-black mt-2 relative z-10">Products Built</p>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.85, duration: 0.8 }}
                />
              </motion.div>
              <motion.div 
                className="group relative rounded-3xl border border-primary/10 bg-surface/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(6,182,212,0.1)] hover:border-primary/20 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <motion.p 
                  className="text-primary font-display text-4xl relative z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  GWR
                </motion.p>
                <p className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.28em] font-black mt-2 relative z-10">World Record</p>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                />
              </motion.div>
              <motion.div 
                className="group relative rounded-3xl border border-primary/10 bg-surface/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(6,182,212,0.1)] hover:border-primary/20 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <motion.p 
                  className="text-primary font-display text-4xl relative z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                >
                  {subscribers >= 1000 ? `${(subscribers / 1000).toFixed(1)}K` : subscribers}
                </motion.p>
                <p className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.28em] font-black mt-2 relative z-10">YouTube Subs</p>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.95, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[460px] overflow-visible group/card"
            >
              {/* Enhanced background effects */}
              <div className="absolute -inset-10 pointer-events-none rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.28),transparent_45%)] blur-3xl opacity-80 scale-[1.03] animate-float-slow" />
              <div className="absolute -inset-8 pointer-events-none rounded-[3rem] bg-[radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.22),transparent_45%)] blur-3xl opacity-70 scale-[1.05] animate-float-reverse" />
              <div className="absolute -inset-1 rounded-[2.25rem] bg-gradient-to-br from-primary/45 via-accent/20 to-transparent opacity-75 blur-xl transition-opacity duration-500 group-hover/card:opacity-100" />

              {/* Floating accent elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 20, ease: "linear" },
                  scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                className="absolute -top-8 -right-8 w-16 h-16 border border-primary/20 bg-surface/80 rounded-full flex items-center justify-center shadow-xl backdrop-blur-xl"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(80px)" }}
              >
                <div className="w-8 h-8 border-2 border-primary/40 rounded-full animate-spin-slow" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 border border-accent/20 bg-surface/80 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-xl"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(70px)" }}
              >
                <div className="w-6 h-6 bg-accent/60 rounded-lg animate-pulse" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={{
                  rotateX: [58, 72, 58],
                  rotateZ: [0, 360],
                  scale: [1, 1.06, 1],
                }}
                transition={{
                  rotateZ: { repeat: Infinity, duration: 18, ease: "linear" },
                  rotateX: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                  scale: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                }}
                className="absolute -left-20 top-16 hidden h-44 w-44 rounded-full border border-primary/25 shadow-[0_0_70px_rgba(var(--primary-rgb),0.18)] md:block"
                style={{
                  transformStyle: "preserve-3d",
                  background:
                    "conic-gradient(from 90deg, transparent, rgba(var(--primary-rgb),0.22), transparent 42%, rgba(var(--accent-rgb),0.18), transparent)",
                }}
              >
                <div className="absolute inset-5 rounded-full border border-primary/20" />
                <div className="absolute inset-12 rounded-full border border-accent/20" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={{
                  rotateY: [0, 360],
                  rotateX: [18, -18, 18],
                  y: [0, -10, 0],
                }}
                transition={{
                  rotateY: { repeat: Infinity, duration: 14, ease: "linear" },
                  rotateX: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                }}
                className="absolute -right-14 top-24 hidden h-24 w-24 rounded-[1.5rem] border border-accent/25 bg-accent/10 shadow-[0_0_60px_rgba(var(--accent-rgb),0.22)] backdrop-blur-xl md:block"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-primary/25 bg-primary/10" />
                <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-primary/25" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="absolute -right-16 bottom-24 hidden grid h-28 w-28 grid-cols-3 gap-2 rounded-[1.5rem] border border-primary/15 bg-surface/30 p-3 shadow-[0_24px_70px_rgba(var(--primary-rgb),0.14)] backdrop-blur-xl md:grid"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <motion.span
                    key={item}
                    className="rounded-md bg-primary/25"
                    animate={{ opacity: [0.25, 0.85, 0.25], scale: [0.85, 1.08, 0.85] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: item * 0.08, ease: "easeInOut" }}
                  />
                ))}
              </motion.div>

              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-[2.25rem] border border-primary/25 bg-surface shadow-[0_34px_120px_rgba(6,182,212,0.18)] aspect-[3/4] transition-shadow duration-300 will-change-transform premium-border-card group"
                style={{ transformStyle: "preserve-3d", transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)", "--mx": "50%", "--my": "50%" } as React.CSSProperties}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_32%)] blur-3xl opacity-75"
                  style={{ transform: "translateZ(8px)" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[2.25rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                  style={{ transform: "translateZ(58px)", background: "radial-gradient(circle at var(--mx) var(--my), rgba(34,211,238,0.32), transparent 28%)" }}
                />
                {/* Enhanced gradient overlays for image depth */}
                <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/15 opacity-60 mix-blend-overlay pointer-events-none" style={{ transform: "translateZ(20px)" }} />
                <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-t from-black/65 via-black/5 to-transparent pointer-events-none" style={{ transform: "translateZ(15px)" }} />
                <div className="absolute inset-0 opacity-[0.16] mix-blend-screen pointer-events-none" style={{ transform: "translateZ(34px)", backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "100% 18px" }} />
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/30 via-accent/10 to-transparent mix-blend-screen pointer-events-none"
                  animate={{ y: ["-35%", "420%"] }}
                  transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                  style={{ transform: "translateZ(56px)" }}
                />
                
                <div className="relative h-full w-full [transform-style:preserve-3d]">
                  <div className="absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_top,_rgba(var(--primary-rgb),0.14),transparent_28%)]"
                    style={{ transform: "translateZ(14px)" }}
                  />
                  <motion.img
                    animate={{
                      scale: [1.02, 1.06, 1.02],
                      rotateZ: [0, 0.45, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    src="/images/my-photo2.png"
                    alt="Vishant Bhardwaj"
                    className="relative h-full w-full object-cover premium-border-card__image brightness-110 saturate-125 contrast-105"
                    style={{ transform: "translateZ(40px)" }}
                  />
                </div>

                {/* Enhanced top-right corner accent */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_30px_rgba(6,182,212,0.65)]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
                />

                {/* Gloss effect */}
                <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-70 pointer-events-none" style={{ transform: "translateZ(45px)" }} />
                <div className="absolute inset-x-8 bottom-32 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" style={{ transform: "translateZ(60px)" }} />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mt-8 mb-8"
        >
          <div className="flex flex-col items-center text-[10px] uppercase tracking-[0.35em] text-muted-foreground/80 font-black">
            <span>Scroll to explore</span>
            <span className="mt-3 flex h-12 w-6 items-start justify-center rounded-full border border-primary/20 p-1">
              <span className="block h-2 w-2 rounded-full bg-primary animate-bounce" />
            </span>
          </div>
        </motion.div>

        {/* Enhanced 3D System Marquee Separator - Market & KPI Intelligence */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-14 border-y border-primary/30 bg-primary/6 dark:bg-primary/12 backdrop-blur-3xl mb-20 skew-y-[-1.5deg] perspective-[2000px] shadow-[inset_0_1px_0_rgba(6,182,212,0.1)]">
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background dark:from-background/90 via-background/50 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background dark:from-background/90 via-background/50 to-transparent pointer-events-none" />

          {/* Floating accent elements */}
          <motion.div
            animate={{ 
              x: [0, 20, 0],
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8, 
              ease: "easeInOut" 
            }}
            className="absolute top-4 left-1/4 w-8 h-8 border border-primary/20 bg-surface/60 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
          >
            <div className="w-3 h-3 bg-primary/60 rounded-full animate-pulse" />
          </motion.div>

          <motion.div
            animate={{ 
              x: [0, -15, 0],
              y: [0, 8, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 6, 
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-4 right-1/4 w-6 h-6 border border-accent/20 bg-surface/60 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-accent/60 rounded animate-pulse" />
          </motion.div>
          <div className="relative overflow-hidden px-4 md:px-10">
            <div className="marquee-container group mb-4">
              <div className="marquee-track animate-marquee whitespace-nowrap [transform-style:preserve-3d] flex items-center gap-6">
                {marqueeRepeat(marqueeItemsTop).map((item, idx) => (
                  <span
                    key={`top-${idx}`}
                    className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-background/85 dark:bg-surface/15 px-6 py-3 text-[11px] uppercase tracking-[0.45em] font-black shadow-primary-50"
                    aria-hidden="true"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span>{item.label}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="marquee-container group">
              <div className="marquee-track marquee-reverse animate-marquee-reverse whitespace-nowrap [transform-style:preserve-3d] flex items-center gap-6">
                {marqueeRepeat(marqueeItemsBottom).map((item, idx) => (
                  <span
                    key={`bottom-${idx}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-background/90 dark:bg-surface/10 px-5 py-2 text-[10px] uppercase tracking-[0.4em] font-black shadow-primary-50"
                    aria-hidden="true"
                  >
                    <item.icon className="w-4 h-4 text-primary/80" />
                    <span>{item.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced ARAK-1 Product Showcase */}
        <ScrollReveal direction="up" delay={0.2}>
          <section className="py-24 lg:py-32 relative">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl blur-3xl opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03),transparent_70%)] rounded-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-muted/10 bg-background/70 dark:bg-surface/70 shadow-[0_40px_100px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent dark:from-primary/20 opacity-80" />

              {/* Floating accent elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 25, ease: "linear" },
                  scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                className="absolute top-8 right-8 w-12 h-12 border border-primary/20 bg-surface/80 rounded-full flex items-center justify-center shadow-xl backdrop-blur-xl"
              >
                <div className="w-6 h-6 border-2 border-primary/40 rounded-full animate-spin-slow" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  x: [0, 4, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-8 left-8 w-8 h-8 border border-accent/20 bg-surface/80 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-xl"
              >
                <div className="w-4 h-4 bg-accent/60 rounded animate-pulse" />
              </motion.div>
              <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 space-y-10">
                    <div className="inline-flex items-center gap-3 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-primary font-black shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] transition-all duration-300 hover:scale-105">
                      <motion.span
                        className="inline-flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.6, 1]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          ease: "easeInOut"
                        }}
                      />
                      Premium Product Showcase
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </div>

                    <div className="space-y-6">
                      <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.88] text-foreground"
                      >
                        ARAK-1
                        <span className="block text-primary">Pipeline Monitoring System</span>
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="max-w-2xl text-lg md:text-xl text-muted-foreground/85 font-light leading-relaxed"
                      >
                        A high-performance hybrid robotic platform for autonomous pipeline inspection, AI-driven damage detection, and emergency micro-repair with spider-wheel mobility.
                      </motion.p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span className="glass-panel border-primary/20 bg-surface/85 text-primary px-4 py-2 text-[10px] uppercase tracking-[0.35em] font-black transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(var(--primary-rgb),0.18)]">
                        Hybrid
                      </span>
                      <span className="glass-panel border-accent/20 bg-surface/85 text-accent px-4 py-2 text-[10px] uppercase tracking-[0.35em] font-black transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(var(--accent-rgb),0.18)]">
                        MaVionix
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="glass-panel border-primary/15 bg-primary/5 dark:bg-primary/15 p-6">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-black">Role</p>
                        <p className="mt-3 text-2xl font-semibold text-foreground">Team Leader</p>
                      </div>
                      <div className="glass-panel border-primary/15 bg-primary/5 dark:bg-primary/15 p-6">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-black">Event</p>
                        <p className="mt-3 text-2xl font-semibold text-foreground">Thrust Tech Expo 2026</p>
                      </div>
                    </div>

                    <Magnetic strength={0.22}>
                      <motion.div
                        whileHover={{ 
                          scale: 1.02,
                          y: -2
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button className="group relative pulse-cta bg-primary text-primary-foreground rounded-[1.5rem] px-10 py-4 text-sm font-black uppercase tracking-[0.25em] shadow-[0_30px_80px_rgba(6,182,212,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_36px_90px_rgba(6,182,212,0.28)] overflow-hidden">
                          <span className="relative z-10">Read Project Report</span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                          />
                          <motion.div
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    </Magnetic>
                  </div>

                  <div className="lg:col-span-7">
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15, duration: 0.75 }}
                      className="relative overflow-hidden rounded-[2rem] border border-transparent futuristic-showcase glass shadow-[0_40px_90px_rgba(15,23,42,0.16)] min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem] transition-shadow duration-500 hover:shadow-[0_48px_120px_rgba(var(--primary-rgb),0.24)] group"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(var(--primary-rgb),0.2),transparent_20%)] opacity-70 pointer-events-none" />
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={showcaseIndex}
                          src={showcaseImages[showcaseIndex]}
                          alt="ARAK-1 Robotic System"
                          initial={{ opacity: 0, scale: 1.02 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.85, ease: "easeInOut" }}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
                      <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4">
                        <div className="flex flex-wrap gap-4">
                          <div className="glass-panel border-primary/20 bg-surface/95 px-5 py-4 shadow-[0_18px_45px_rgba(var(--primary-rgb),0.08)]">
                            <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-black">AI Pipeline</p>
                            <p className="mt-2 text-sm font-semibold text-foreground">Real-time defect scoring</p>
                          </div>
                          <div className="glass-panel border-accent/20 bg-surface/95 px-5 py-4 shadow-[0_18px_45px_rgba(var(--accent-rgb),0.08)]">
                            <p className="text-[10px] uppercase tracking-[0.35em] text-accent font-black">Telemetry</p>
                            <p className="mt-2 text-sm font-semibold text-foreground">Sensor fusion engine</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          {showcaseImages.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setShowcaseIndex(idx)}
                              className={`h-3 w-3 rounded-full transition-all ${idx === showcaseIndex ? "bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.16)] dark:shadow-[0_0_0_8px_rgba(255,255,255,0.12)]" : "bg-white/40 hover:bg-white/70 dark:bg-white/30 dark:hover:bg-white/60"}`}
                              aria-label={`Show slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Enhanced Complex Problem Solving Section - Premium & Sophisticated */}
        <section className="py-20 lg:py-28 border-t border-muted/10 relative overflow-hidden">
          {/* Advanced background gradient system */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 -left-1/3 w-full h-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_50%)] blur-3xl"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1.2, 1, 1.2]
              }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 -right-1/3 w-full h-full bg-[radial-gradient(circle,rgba(20,184,166,0.1),transparent_50%)] blur-3xl"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content - Premium Text Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                {/* Animated accent bar */}
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="h-1 w-16 bg-gradient-to-r from-primary via-accent to-primary rounded-full origin-left"
                  />
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[10px] font-mono text-primary/60 tracking-[0.25em] uppercase font-black"
                  >
                    Vision & Expertise
                  </motion.span>
                </div>

                {/* Main heading with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="space-y-4"
                >
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                    I turn{" "}
                    <span className="relative inline-block">
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent opacity-0 group-hover:opacity-100"
                        animate={{
                          backgroundPosition: ["0%", "100%", "0%"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <span className="relative">complex</span>
                    </span>{" "}
                    problems into{" "}
                    <motion.span
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="relative inline-block"
                    >
                      <motion.span
                        className="absolute -inset-2 bg-primary/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      />
                      <span className="relative italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        elegant
                      </span>
                    </motion.span>{" "}
                    solutions that scale.
                  </h2>
                </motion.div>

                {/* Status indicator with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 backdrop-blur-md bg-primary/5 border border-primary/20 rounded-full px-4 py-3 w-fit shadow-[0_8px_32px_rgba(6,182,212,0.1)]"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.6, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                  />
                  <span className="text-[11px] font-mono text-primary/70 tracking-widest uppercase font-black">
                    System Status: Optimized
                  </span>
                </motion.div>

                {/* Description with enhanced typography */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6 pt-4"
                >
                  <p className="text-base md:text-lg leading-relaxed font-light text-muted-foreground/80">
                    Co-founder of <motion.span className="font-semibold text-foreground relative" whileHover={{ scale: 1.05 }}>MaVionix</motion.span>, orchestrating the convergence of AI, Robotics, and SaaS. I architect the 0 to 1 journey with obsessive focus on user-centric design and scalable engineering principles.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed font-light text-muted-foreground/80">
                    Bridging technical excellence from <motion.span className="font-semibold text-primary relative" whileHover={{ scale: 1.05 }}>IIT Madras</motion.span> and <motion.span className="font-semibold text-primary relative" whileHover={{ scale: 1.05 }}>SRM IST</motion.span>, I synthesize data-driven strategy with full-stack technical expertise to build products that matter.
                  </p>
                </motion.div>

                {/* Expertise highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-3 pt-6"
                >
                  {[
                    { label: "AI/ML", icon: "🤖", color: "from-primary to-cyan-400" },
                    { label: "Robotics", icon: "🦾", color: "from-accent to-teal-400" },
                    { label: "SaaS", icon: "☁️", color: "from-primary to-accent" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ y: -4, scale: 1.05 }}
                      className={`group relative p-4 rounded-xl backdrop-blur-md bg-gradient-to-br ${item.color} opacity-10 border border-white/20 hover:border-white/40 transition-all cursor-pointer overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="text-3xl mb-2 group-hover:scale-110 transition-transform origin-left">{item.icon}</p>
                      <p className="text-xs font-black uppercase tracking-widest text-foreground/80 group-hover:text-foreground transition-colors">{item.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Content - Enhanced Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative perspective-1000"
              >
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {[
                    { 
                      img: "/images/arak-2.jpg", 
                      title: "Robotics AI", 
                      desc: "Autonomous Systems",
                      position: "top-left",
                      delay: 0
                    },
                    { 
                      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000", 
                      title: "Data Science", 
                      desc: "ML Engineering",
                      position: "top-right",
                      delay: 0.1
                    },
                    { 
                      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000", 
                      title: "Product Strategy", 
                      desc: "GTM Planning",
                      position: "bottom-left",
                      delay: 0.2
                    },
                    { 
                      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000", 
                      title: "Full Stack", 
                      desc: "Web Development",
                      position: "bottom-right",
                      delay: 0.3
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ delay: item.delay + 0.3, duration: 0.6 }}
                      whileHover={{
                        scale: 1.08,
                        rotateY: -15,
                        z: 100,
                        boxShadow: "0 20px 60px rgba(6,182,212,0.3)"
                      }}
                      className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
                      style={{ perspective: "1000px" }}
                    >
                      {/* Layered background effects */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                      
                      {/* Main image */}
                      <motion.img
                        animate={{
                          scale: [1, 1.08, 1],
                          rotate: [0, 1, 0]
                        }}
                        transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
                        src={item.img}
                        loading="lazy"
                        alt={item.title}
                        className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Gloss effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Border glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300"
                        whileHover={{
                          boxShadow: "inset 0 0 20px rgba(6,182,212,0.2)"
                        }}
                      />

                      {/* Content overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-30"
                        initial={false}
                      >
                        <motion.h3
                          className="text-white font-bold text-base mb-2 font-display"
                          initial={{ y: 30, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p
                          className="text-white/70 text-xs font-light"
                          initial={{ y: 30, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.15 }}
                        >
                          {item.desc}
                        </motion.p>
                      </motion.div>

                      {/* Floating corner indicator */}
                      <motion.div
                        className="absolute top-4 right-4 w-3 h-3 bg-primary/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-40"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Floating accent elements behind gallery */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 6 }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 8, delay: 1 }}
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mt-32 relative overflow-hidden">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/90 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-surface/70">
            <div className="absolute inset-0 awards-grid-bg-light dark:awards-grid-bg opacity-20 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(var(--primary-rgb),0.12),transparent)] pointer-events-none" />
            <div className="relative px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="relative flex flex-col gap-6 border-b border-border pb-7 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl space-y-4">
                    <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                      Awards & Honors
                    </p>
                    <h3 className="font-display text-4xl font-black tracking-normal text-foreground md:text-5xl">
                      Recognition
                    </h3>
                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                      Selected milestones across robotics, innovation programs, public recognition, and creator work.
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="relative inline-flex min-w-[15rem] items-center gap-4 rounded-2xl border border-border bg-background/60 px-5 py-4 text-left shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                      <span className="text-xl font-black text-primary">{achievements.length}+</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-black">Recognitions</p>
                      <p className="text-sm font-semibold text-foreground">Verified achievements</p>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="grid grid-cols-1 gap-4 pt-7 md:grid-cols-2 lg:grid-cols-3">
                  {achievements.map((item, idx) => {
                    const Icon = item.icon;
                    const badge = item.title.includes("Winner")
                      ? "Winner"
                      : item.title.includes("Guinness")
                        ? "Record"
                        : item.title.includes("Finalist")
                          ? "Finalist"
                          : item.title.includes("Creator")
                            ? "Creator"
                            : "Honor";
                    const caption = item.title.includes("Winner")
                      ? "Competition achievement"
                      : item.title.includes("Guinness")
                        ? "Global recognition"
                        : item.title.includes("Creator")
                          ? "Audience milestone"
                          : item.title.includes("Finalist")
                            ? "Selected finalist"
                            : "Recognized contribution";
                    const accents = [
                      {
                        label: "border-amber-400/25 bg-amber-400/10 text-amber-600 dark:text-amber-300",
                        icon: "bg-amber-400/10 text-amber-600 border-amber-400/20 dark:text-amber-300",
                        bar: "from-amber-400 via-yellow-300 to-primary",
                        wash: "bg-amber-400/5",
                      },
                      {
                        label: "border-cyan-400/25 bg-cyan-400/10 text-cyan-600 dark:text-cyan-300",
                        icon: "bg-cyan-400/10 text-cyan-600 border-cyan-400/20 dark:text-cyan-300",
                        bar: "from-cyan-400 via-primary to-accent",
                        wash: "bg-cyan-400/5",
                      },
                      {
                        label: "border-sky-400/25 bg-sky-400/10 text-sky-600 dark:text-sky-300",
                        icon: "bg-sky-400/10 text-sky-600 border-sky-400/20 dark:text-sky-300",
                        bar: "from-sky-400 via-blue-400 to-primary",
                        wash: "bg-sky-400/5",
                      },
                      {
                        label: "border-violet-400/25 bg-violet-400/10 text-violet-600 dark:text-violet-300",
                        icon: "bg-violet-400/10 text-violet-600 border-violet-400/20 dark:text-violet-300",
                        bar: "from-violet-400 via-fuchsia-400 to-primary",
                        wash: "bg-violet-400/5",
                      },
                      {
                        label: "border-rose-400/25 bg-rose-400/10 text-rose-600 dark:text-rose-300",
                        icon: "bg-rose-400/10 text-rose-600 border-rose-400/20 dark:text-rose-300",
                        bar: "from-rose-400 via-pink-400 to-primary",
                        wash: "bg-rose-400/5",
                      },
                      {
                        label: "border-emerald-400/25 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300",
                        icon: "bg-emerald-400/10 text-emerald-600 border-emerald-400/20 dark:text-emerald-300",
                        bar: "from-emerald-400 via-teal-400 to-accent",
                        wash: "bg-emerald-400/5",
                      },
                    ];
                    const accent = accents[idx % accents.length];

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08, duration: 0.45 }}
                        className="group h-full"
                      >
                        <Magnetic strength={0.1}>
                          <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="relative h-full overflow-hidden rounded-2xl border border-border bg-background/55 p-5 shadow-sm transition-all duration-300 hover:border-primary/25 hover:bg-surface"
                          >
                            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.bar}`} />
                            <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${accent.wash} blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />
                            <div className="mb-5 flex items-start justify-between gap-4">
                              <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] ${accent.label}`}>
                                {badge}
                              </span>
                              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${accent.icon}`}>
                                <Icon className="h-5 w-5" />
                              </div>
                            </div>

                            <h4 className="font-heading text-xl font-bold leading-tight tracking-normal text-foreground transition-colors duration-300 group-hover:text-primary">{item.title}</h4>
                            <p className="mt-3 text-xs font-black uppercase leading-5 tracking-[0.22em] text-muted-foreground">{item.org}</p>

                            <div className="mt-5 border-t border-border pt-4">
                              <p className="text-[11px] font-semibold text-muted-foreground">{caption}</p>
                            </div>
                          </motion.div>
                        </Magnetic>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Thoughts & Insights */}
        <ThoughtsSection />
      </section>
    </div>
  );
}
