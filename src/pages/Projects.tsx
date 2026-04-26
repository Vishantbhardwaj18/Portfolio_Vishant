import * as React from "react"
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Box, Rocket, Shield, ArrowUpRight, Cpu, X, Menu, Search, Filter, Layers, Briefcase, ChevronRight, Share2, Eye } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TextReveal } from "../components/effects/TextReveal";
import { Magnetic } from "../components/effects/Magnetic";

const projects = [
  {
    title: "ARAK-1: Robotic System for Pipeline Monitoring and Repair",
    role: "Team Leader | System Architect",
    date: "Thrust Tech Expo 2026",
    description: "Led development of ARAK-1, a hybrid spider-wheel robot for pipeline inspection, AI-assisted damage detection, and emergency micro-repair in hazardous infrastructure settings.",
    longDescription: "This project presents ARAK-1, a hybrid spider-wheel robotic platform combining multi-sensor pipeline monitoring, autonomous mobility, and micro-repair capabilities. The system integrates vision, gas, temperature, and vibration sensing to inspect pipelines and initiate temporary repair actions using a compact robotic arm.",
    tech: ["Robotics", "AI", "IoT", "Pipeline Monitoring", "Autonomous Systems"],
    icon: Shield,
    link: "#",
    github: "#",
    metric: "Thrust Tech Expo",
    stats: { value: "Hybrid", label: "Spider-Wheel Mobility" }
  },
  {
    title: "Noikix — Rental Business SaaS",
    role: "Product Lead",
    date: "Dec 2024",
    description: "Built a rental SaaS platform enabling small businesses to digitize their operations. Managed the MVP roadmap and led a 3-member development team through a successful launch.",
    longDescription: "Noikix addresses the inefficiencies in manual equipment rental tracking. We implemented real-time availability calendars and secure deposit management. The platform reduced inventory conflict by 40% for our pilot users.",
    tech: ["React", "Firebase", "Product Management", "SaaS"],
    icon: Rocket,
    link: "#",
    github: "https://github.com/Vishantbhardwaj18",
    metric: "3-dev Team Lead",
    stats: { value: "40%", label: "Conflict Reduction" }
  },
  {
    title: "SRM Campus Delivery — Logistics MVP",
    role: "Product Member",
    date: "Sept 2024",
    description: "Developed a real-time campus logistics solution during a major hackathon. Focused on persona mapping, user workflows, and defining the initial MVP scope for on-campus deliveries.",
    longDescription: "During a 48-hour hackathon, we designed a last-mile delivery system for campus hostels. It uses an Uber-like model for student delivery partners, significantly reducing wait times from an hour to under 15 minutes.",
    tech: ["Product Design", "Hackathon", "Workflow Optimization"],
    icon: Box,
    link: "#",
    github: "#",
    metric: "Hackathon Winner",
    stats: { value: "75%", label: "Time Saved" }
  },
  {
    title: "ARAK-1 Quadruped — Pipeline Inspection",
    role: "Product Manager",
    date: "2024",
    description: "Spearheaded requirements gathering for a quadruped robot designed for pipeline inspection and crack detection. Focused on hardware-software integration for industrial use cases.",
    longDescription: "The ARAK-1 is a specialized robotic platform designed for treacherous industrial environments. As PM, I bridged the gap between vision systems and locomotion engineering to ensure stability during high-res imaging.",
    tech: ["Robotics", "AI", "MVP Development", "Inspection"],
    icon: Cpu,
    link: "#",
    github: "#",
    metric: "Pipeline PM",
    stats: { value: "88%", label: "Detection Accuracy" }
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = React.useState<typeof projects[0] | null>(null);
  const [activeFilter, setActiveFilter] = React.useState("All");

  const filters = ["All", "AI", "Robotics", "SaaS", "Product"];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === "All") return true;
    return project.tech.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())) || 
           project.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
           project.description.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decor */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold/5 blur-[120px] rounded-full -z-10" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.06, 0.03] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gold/5 blur-[120px] rounded-full -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-20 text-center relative overflow-hidden p-20 border border-muted/20 bg-muted/5 glass">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Rocket className="h-64 w-64 text-gold rotate-12" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <h1 className="font-display text-responsive-title leading-none tracking-tighter mb-6 uppercase flex flex-col items-center">
              <TextReveal text="SELECTED" />
              <div className="flex items-center gap-4">
                <span className="h-px w-20 bg-gold/30 hidden md:block" />
                <TextReveal text="WORK." className="text-gold text-glow" delay={0.2} />
                <span className="h-px w-20 bg-gold/30 hidden md:block" />
              </div>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-light uppercase tracking-[0.5em] text-[10px] bg-background/50 backdrop-blur-sm inline-block px-4 py-2 border border-gold/10">
              Product Engineering • Logic & Hardware • 0 to 1
            </p>
          </motion.div>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20 px-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 md:px-8 py-2 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border ${
                activeFilter === filter 
                ? 'bg-gold text-black border-gold shadow-[0_0_20px_var(--gold)]' 
                : 'bg-transparent text-muted-foreground border-muted/20 hover:border-gold/50 hover:text-gold'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-24 mt-20">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              {/* Technical Grid Background */}
              <div className="absolute -inset-4 md:-inset-8 border border-muted/5 -z-10 group-hover:border-gold/10 transition-colors" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-muted/5 -z-10" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-muted/5 -z-10" />

              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:col-span-7 space-y-8 ${idx % 2 !== 0 ? 'lg:order-2' : ''} px-4 md:px-0`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <span className="text-gold font-display text-3xl md:text-4xl opacity-20">0{idx + 1}</span>
                       <div className="h-px flex-grow bg-gold/10" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gold/60">{project.date}</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">{project.role}</p>
                      <h3 className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-none group-hover:text-gold transition-colors">
                        {project.title.split('—')[0]}
                        {project.title.includes('—') && <span className="block italic font-serif text-xl md:text-2xl lg:text-3xl text-muted-foreground mt-2">— {project.title.split('—')[1]}</span>}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-muted/5 border border-muted/10 glass space-y-2 group-hover:border-gold/30 transition-all">
                       <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Impact Asset</p>
                       <p className="text-xl font-display text-gold">{project.stats.value}</p>
                       <p className="text-[8px] uppercase font-bold text-muted-foreground/60">{project.stats.label}</p>
                    </div>
                    <div className="p-6 bg-muted/5 border border-muted/10 glass space-y-2 group-hover:border-gold/30 transition-all">
                       <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Mission Profile</p>
                       <p className="text-xs font-black uppercase tracking-widest leading-tight">{project.metric.split(' ')[0]} <br/> {project.metric.split(' ')[1]}</p>
                    </div>
                    <div className="hidden md:block p-6 bg-muted/5 border border-muted/10 glass space-y-4 group-hover:border-gold/30 transition-all">
                       <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Tech Stack</p>
                       <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[8px] uppercase font-bold text-gold/60 bg-gold/5 px-2 py-0.5 border border-gold/10">{t}</span>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Magnetic strength={0.2}>
                      <Button onClick={() => setSelectedProject(project)} size="lg" className="bg-gold text-black hover:bg-white rounded-none h-14 px-10 uppercase text-[10px] font-black tracking-widest">
                        Deep Inquiry
                      </Button>
                    </Magnetic>
                    <Magnetic strength={0.1}>
                      <Button asChild variant="outline" size="lg" className="border-gold/30 hover:border-gold hover:bg-gold/5 rounded-none h-14 px-10 uppercase text-[10px] font-black tracking-widest glass">
                         <a href={project.github} target="_blank" rel="noreferrer">Review Core</a>
                      </Button>
                    </Magnetic>
                  </div>
                </div>

                <div className={`lg:col-span-5 relative group/img ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square md:aspect-video lg:aspect-[4/5] overflow-hidden border border-muted/10 glass shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gold/20 mix-blend-overlay opacity-0 group-hover/img:opacity-100 transition-opacity z-10" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all z-20">
                       <project.icon className="w-24 h-24 text-gold drop-shadow-[0_0_20px_var(--gold)]" />
                    </div>
                    <img 
                      src={`https://picsum.photos/seed/${project.title.split(' ')[0].toLowerCase()}/1200/1500`}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale brightness-75 group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_var(--color-gold)]" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Active Protocol</span>
                        </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-gold/20 glass overflow-y-auto"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 hover:bg-gold/10 text-gold transition-colors z-10"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-auto bg-gold/5 flex items-center justify-center border-b md:border-b-0 md:border-r border-gold/10">
                    <selectedProject.icon className="h-32 w-32 text-gold animate-pulse-slow" />
                  </div>
                  <div className="p-10 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-gold/30 text-gold uppercase text-[10px] font-black tracking-[0.2em]">
                          {selectedProject.date}
                        </Badge>
                        <span className="text-[10px] uppercase font-black text-gold/60 tracking-widest">{selectedProject.metric}</span>
                      </div>
                      <p className="text-xs font-black text-gold uppercase tracking-[0.4em]">{selectedProject.role}</p>
                      <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">{selectedProject.title}</h2>
                    </div>

                    <div className="space-y-6">
                      <p className="text-base text-foreground/80 font-light leading-relaxed">
                        {selectedProject.description}
                      </p>
                      <p className="text-muted-foreground font-light leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {selectedProject.stats && (
                      <div className="flex items-center gap-8 py-6 border-y border-gold/10">
                        <div>
                          <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">{selectedProject.stats.label}</p>
                          <p className="text-3xl font-display text-gold neon-gold">{selectedProject.stats.value}</p>
                        </div>
                        <div className="h-10 w-px bg-gold/10" />
                        <div>
                          <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Status</p>
                          <p className="text-sm font-black text-foreground uppercase tracking-widest">Completed</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Technologies & Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t, i) => (
                          <Badge key={i} variant="secondary" className="bg-gold/10 text-gold border-gold/20 text-[10px] uppercase font-bold rounded-none px-3 py-1">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gold/10">
                      <Button asChild className="bg-gold text-black hover:bg-white rounded-none uppercase text-xs font-black tracking-widest px-8">
                        <a href={selectedProject.link} target="_blank" rel="noreferrer">Project Link <ArrowUpRight className="ml-2 h-4 w-4" /></a>
                      </Button>
                      <Button asChild variant="outline" className="border-gold/30 hover:border-gold hover:bg-gold/5 rounded-none uppercase text-xs font-black tracking-widest px-8">
                        <a href={selectedProject.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4 mr-2" /> Code</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
