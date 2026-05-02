import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Linkedin, Github, Globe, Mail, ArrowUp, Zap, Clock, MapPin, 
  ChevronRight, Binary, Sparkles, Send, ExternalLink, 
  Layout, LineChart, Target, UserSearch, Rocket, Microscope,
  ArrowUpRight
} from "lucide-react";
import { Magnetic } from "../effects/Magnetic";
import { TextReveal } from "../effects/TextReveal";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState({
    latency: "1.2ms",
    signal: 98,
    uptime: "00:00:00",
    time: new Date().toLocaleTimeString()
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Live Telemetry System
    const start = Date.now();
    const timer = setInterval(() => {
      const diff = Date.now() - start;
      const hours = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const mins = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      
      setTelemetry({
        latency: `${(Math.random() * 0.5 + 1.1).toFixed(1)}ms`,
        signal: Math.floor(Math.random() * 5 + 95),
        uptime: `${hours}:${mins}:${secs}`,
        time: new Date().toLocaleTimeString()
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Case Studies", href: "/projects" }, // Assuming Case Studies maps to Projects
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  const skills = [
    { label: "Product Strategy", icon: Target },
    { label: "User Research", icon: UserSearch },
    { label: "MVP Development", icon: Rocket },
    { label: "Roadmapping", icon: Layout },
    { label: "Data Analytics", icon: LineChart },
    { label: "A/B Testing", icon: Microscope },
  ];

  const featuredWork = [
    { label: "AI SaaS for SMEs", href: "/projects" },
    { label: "ARAK-1 Quadruped Robot", href: "/projects" },
    { label: "Drone Delivery System", href: "/projects" },
  ];

  return (
    <footer className="mt-24 md:mt-40 pb-16 selection:bg-primary/30 selection:text-primary relative overflow-hidden bg-surface/25 backdrop-blur-xl border-t border-primary/10 shadow-[0_0_40px_rgba(var(--primary-rgb),0.08)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(var(--violet-rgb),0.12),transparent_24%),radial-gradient(circle_at_88%_12%,rgba(var(--rose-rgb),0.1),transparent_22%),radial-gradient(circle_at_82%_84%,rgba(var(--emerald-rgb),0.1),transparent_24%)]" />
      {/* Animated Snake Separator */}
      <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden bg-primary/10">
        <motion.div 
          className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-rose-400 to-transparent"
          animate={{ 
            x: ["-100%", "300%"] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full px-6 lg:px-12 relative pt-16 md:pt-24"
      >
        {/* Background Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        {/* Strong Final CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center py-16 mb-20 relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Let's build something <span className="gradient-text-spectrum">impactful</span>.
          </h2>
          <p className="text-muted-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Ready to transform ideas into products that matter. Let's collaborate on your next big thing.
          </p>
          <Magnetic strength={0.1}>
            <Link to="/contact">
              <button className="inline-flex items-center gap-3 px-8 py-4 gradient-spectrum text-primary-foreground font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25">
                <Mail className="w-5 h-5" />
                Contact Me
              </button>
            </Link>
          </Magnetic>
        </motion.div>

        {/* Decorative Vertical Grid Lines */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent hidden xl:block" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent hidden xl:block" />

        {/* JS Driven Background Effect (Integrated into page flow) */}
        <div 
          onMouseMove={handleMouseMove}
          className="relative group/radar"
        >
          {/* JS Driven Radar - Now full width background of footer section */}
          <div 
            className="absolute pointer-events-none opacity-0 group-hover/radar:opacity-100 transition-opacity duration-700 -inset-x-4 -inset-y-16 lg:-inset-x-24"
            style={{
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.02), transparent 50%)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 relative z-10">
            {/* 1. Personal Branding (Col-span 4) */}
            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <Link to="/" className="inline-block group/logo">
                   <h3 className="font-display text-4xl tracking-tighter text-white group-hover/logo:text-primary transition-colors">
                     Vishant <span className="text-primary">Bhardwaj</span>
                   </h3>
                </Link>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/15 rounded-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">SYSTEM STATUS: LIVE</p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-none">
                    <Binary className="w-3 h-3 text-white/40" />
                    <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest leading-none">UPTIME: {telemetry.uptime}</p>
                  </div>
                </div>
                <p className="text-muted-foreground/90 text-xs leading-relaxed font-normal max-w-sm">
                  Strategic Product Orchestrator utilizing data-driven insights and AI logic to solve high-complexity engineering challenges.
                </p>
              </div>

              {/* Newsletter / Product Insights Placeholder */}
              <div className="p-6 bg-surface/90 border border-primary/15 rounded-xl space-y-4 group/box transition-all duration-300 hover:bg-surface/95 hover:border-primary/25 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.07)] hover:-translate-y-1">
                 <div className="flex justify-between items-center">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                       <Sparkles className="w-3 h-3 animate-spin-slow" /> Product Insights
                    </h5>
                    <span className="text-[8px] font-mono text-primary/40">SIGNAL: {telemetry.signal}%</span>
                 </div>
                 <p className="text-[11px] text-muted-foreground/70 leading-relaxed">Subscribe for concise product strategy notes, engineering rhythms, and launch playbook updates.</p>
                 <div className="flex gap-0 relative">
                    <Input 
                      placeholder="email@domain.com" 
                      className="bg-surface/90 border-primary/20 text-[10px] h-10 rounded-l-xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 font-mono transition-all focus:pl-4 flex-1" 
                    />
                    <Button 
                      variant="secondary" 
                      className="h-10 rounded-r-xl px-4 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 border-none group/btn transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                 </div>
              </div>
            </motion.div>

            {/* Middle Content Grid (Col-span 8) */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-12">
              
              {/* 2. Quick Links */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-subtext flex items-center gap-3">
                   <div className="w-1 h-1 bg-primary rounded-full" /> Structure
                </h4>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.href}
                        onMouseEnter={() => setIsHovered(link.label)}
                        onMouseLeave={() => setIsHovered(null)}
                        className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 hover:text-primary transition-all relative flex items-center group/item"
                      >
                         <span className="group-hover/item:pl-2 transition-all duration-300">{link.label}</span>
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: isHovered === link.label ? '100%' : 0 }}
                           className="absolute -bottom-1 left-0 h-px bg-primary"
                         />
                         <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover/item:opacity-100 transition-all -translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 3. Core Skills */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-subtext flex items-center gap-3">
                   <div className="w-1 h-1 bg-primary rounded-full" /> Expertise
                </h4>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.label} className="flex items-center gap-3 group/skill cursor-default p-2 rounded-lg hover:bg-surface/30 transition-all duration-300">
                       <div className="relative overflow-hidden">
                          <skill.icon className="w-3.5 h-3.5 text-primary/30 group-hover/skill:text-primary transition-colors" />
                          <motion.div 
                            className="absolute inset-0 bg-primary/20"
                            animate={{ x: ['100%', '-100%'] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          />
                       </div>
                       <span className="text-[11px] font-medium text-muted-foreground/80 group-hover/skill:text-foreground transition-colors">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 4. Featured Work */}
              <motion.div variants={itemVariants} className="space-y-6 col-span-2 sm:col-span-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-subtext flex items-center gap-3">
                   <div className="w-1 h-1 bg-primary rounded-full" /> Benchmarks
                </h4>
                <div className="space-y-3">
                  {featuredWork.map((work) => (
                    <Link 
                      key={work.label}
                      to={work.href}
                      className="block p-3 bg-surface/80 border border-primary/10 rounded-xl hover:bg-surface/95 hover:border-primary/25 hover:shadow-[0_0_18px_rgba(var(--primary-rgb),0.1)] hover:-translate-y-0.5 transition-all duration-300 group/work relative overflow-hidden"
                    >
                      <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground/70 group-hover/work:text-primary transition-colors relative z-10">{work.label}</span>
                      <motion.div 
                        className="absolute inset-0 bg-primary/5"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

          {/* 6. Contact & Social Wrapper */}
          <motion.div 
            variants={itemVariants}
            className="pt-12 border-t border-primary/15 flex flex-col items-center lg:flex-row lg:justify-between gap-10 lg:gap-12 relative z-10"
          >
            
            {/* Contact Details & Socials */}
            <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-16 w-full lg:w-auto">
               <div className="flex items-center gap-4 group/email cursor-pointer w-full sm:w-auto justify-center sm:justify-start">
                  <div className="h-12 w-12 rounded-xl bg-surface/50 flex items-center justify-center border border-primary/15 group-hover/email:border-primary group-hover/email:bg-primary group-hover/email:shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)] group-hover/email:-translate-y-1 transition-all overflow-hidden relative">
                    <Mail className="w-6 h-6 text-primary group-hover/email:text-primary-foreground transition-colors relative z-10" strokeWidth={2.5} />
                    <motion.div 
                      className="absolute inset-0 bg-white/10"
                      initial={{ y: '100%' }}
                      whileHover={{ y: 0 }}
                    />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Enquiry Channel</p>
                    <a href="mailto:vishantbhardwaj06@gmail.com" className="text-xs font-bold text-foreground group-hover/email:text-primary transition-colors block">
                      <span className="opacity-40 font-mono text-[10px] mr-2">{telemetry.latency} //</span>
                      vishantbhardwaj06@gmail.com
                    </a>
                  </div>
               </div>

               <a 
                 href="https://www.google.com/maps/search/?api=1&query=Meerut+Uttar+Pradesh+India" 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start group/loc cursor-pointer"
               >
                  <div className="h-12 w-12 rounded-xl bg-surface/50 flex items-center justify-center border border-primary/15 group-hover/loc:border-primary group-hover/loc:bg-primary group-hover/loc:-translate-y-1 transition-all">
                    <MapPin className="w-6 h-6 text-primary animate-bounce-slow group-hover/loc:text-primary-foreground transition-colors" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Base Operations</p>
                    <p className="text-xs font-bold text-foreground uppercase tracking-wider group-hover/loc:text-primary transition-colors leading-tight">
                      <span className="opacity-40 font-mono text-[10px] block sm:inline mr-2">{telemetry.time} //</span>
                      Meerut, UP, IND
                    </p>
                  </div>
               </a>

               {/* Integrated Social Hub */}
               <div className="flex items-center justify-center gap-6 pt-6 sm:pt-0 sm:ml-4 sm:pl-8 sm:border-l sm:border-primary/15 w-full sm:w-auto">
                  {[
                    { icon: Linkedin, href: "https://linkedin.com/in/vishant-bhardwaj/", label: "LinkedIn" },
                    { icon: Github, href: "https://github.com/Vishantbhardwaj18", label: "GitHub" },
                    { icon: Globe, href: "https://www.vishantbhardwaj.in", label: "Website" }
                  ].map((social, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <Magnetic strength={0.2}>
                        <a 
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="h-12 w-12 rounded-xl border border-primary/15 flex items-center justify-center group/social hover:bg-primary/10 hover:border-primary/25 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)] hover:-translate-y-1 hover:scale-110 transition-all duration-300 relative overflow-hidden"
                          title={social.label}
                        >
                          <social.icon className="w-6 h-6 text-primary group-hover/social:text-primary-foreground transition-colors relative z-20" strokeWidth={2.5} />
                          <motion.div 
                            className="absolute inset-0 bg-primary/10 group-hover/social:bg-transparent"
                          />
                        </a>
                      </Magnetic>
                      <span className="text-[8px] font-mono text-primary/40 uppercase tracking-widest hidden md:block">{social.label}</span>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>

          {/* Enhanced Bottom Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 md:mt-20 pt-8 border-t border-primary/15 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Availability Status */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-green-400">Available for opportunities</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 mb-1">Direct Contact</p>
                <a href="mailto:vishantbhardwaj06@gmail.com" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
                  vishantbhardwaj06@gmail.com
                </a>
              </div>

              {/* Copyright & Version */}
              <div className="text-center md:text-right">
                <div className="flex items-center gap-3 justify-center md:justify-end">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-30">© {new Date().getFullYear()} Vishant Bhardwaj</p>
                  <span className="w-1 h-1 rounded-full bg-primary/20" />
                  <p className="text-[9px] font-mono tracking-wider uppercase text-primary/40">VB_CORE_v4.2.1</p>
                </div>
                <p className="text-[8px] font-mono tracking-wider uppercase opacity-20 mt-1">
                  Encrypted Product Protocol
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
