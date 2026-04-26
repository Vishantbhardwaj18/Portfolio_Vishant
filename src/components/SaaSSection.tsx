import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Cpu, BarChart3, Cloud, Shield, 
  Workflow, Database, Beaker, Layers, 
  Settings, Zap, Code2, Sparkles,
  Search, AppWindow, Network, Bot,
  Terminal, Globe2, Infinity as InfinityIcon
} from "lucide-react";

const sectionData = [
  {
    id: "01",
    title: "Intelligence Layer",
    description: "Architecting proprietary LLM wrappers and neural orchestration layers that automate decision vectors across distributed product ecosystems.",
    icon: Bot,
    stats: "99.2% Logic Fidelity"
  },
  {
    id: "02",
    title: "SaaS Infrastructure",
    description: "Engineering multi-variant tenant architectures with recursive auto-scaling and high-concurrency data streams for global logistics.",
    icon: Cloud,
    stats: "0 ms Cluster Drift"
  },
  {
    id: "03",
    title: "System Orchestration",
    description: "Bridging physical actuators with digital logic streams through event-driven paradigms and high-frequency telemetry protocols.",
    icon: Workflow,
    stats: "1TB/hr Throughput"
  }
];

export function SaaSSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden bg-black/60 border-y border-gold/10">
      {/* 3D Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0c04005_1px,transparent_1px),linear-gradient(to_bottom,#f0c04005_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Left Side: Technical Narrative */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-4 px-5 py-2 bg-gold/5 border border-gold/20 rounded-none overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 h-full w-1 bg-gold animate-pulse" />
                <Terminal className="w-3 h-3 text-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold/80">Operative Logic Matrix v4.0</span>
              </motion.div>
              
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-5xl lg:text-7xl font-display leading-[0.8] tracking-tighter"
                >
                  ENGINEERING <br />
                  <span className="text-gold italic font-serif">SENSORY</span> <br />
                  SOFTWARE.
                </motion.h2>
                <p className="text-[10px] font-mono text-gold/30 uppercase tracking-[0.3em]">Codebase Reliability: 99.997% // AI Integration: Active</p>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed font-light"
              >
                Beyond standard development, I engineer <span className="text-white font-medium">Product-First Intelligence</span>. Utilizing my background in Robotics and Product Management, I build SaaS ecosystems that don't just store data—they orchestrate value.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-gold/10 relative">
               <motion.div style={{ scaleX: lineScale }} className="absolute -top-[1px] left-0 h-[1px] w-full bg-gold origin-left" />
               
               <div className="space-y-4">
                  <Globe2 className="w-6 h-6 text-gold/40" />
                  <div className="space-y-1">
                    <p className="text-3xl font-display text-gold">GLOBAL</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40 leading-none">Cluster Deployment</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">Multi-region SaaS logic built for zero-downtime scalability across diverse markets.</p>
               </div>

               <div className="space-y-4">
                  <InfinityIcon className="w-6 h-6 text-gold/40" />
                  <div className="space-y-1">
                    <p className="text-3xl font-display text-white">RECURSIVE</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40 leading-none">Feedback Optimization</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">Closed-loop AI systems that learn from operational telemetry to refine UX and efficiency.</p>
               </div>
            </div>
          </div>

          {/* Right Side: 3D System Matrix */}
          <div className="lg:col-span-7 relative flex justify-center perspective-2000">
            <motion.div 
              style={{ rotateX, y }}
              className="w-full max-w-[500px] grid grid-cols-1 gap-6 relative z-10"
            >
              {sectionData.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50, z: -100 }}
                  whileInView={{ opacity: 1, x: 0, z: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.8 }}
                  whileHover={{ scale: 1.05, translateZ: 50 }}
                  className="group relative p-8 bg-black/80 border border-gold/10 hover:border-gold/40 transition-all cursor-crosshair overflow-hidden preserve-3d"
                >
                  {/* Digital ID */}
                  <div className="absolute top-4 right-4 text-[10px] font-mono text-gold/20 flex items-center gap-2">
                    <span className="w-1 h-px bg-gold/20" />
                    OBJ_ID_00{idx + 1}
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-gold/5 border border-gold/10 group-hover:bg-gold group-hover:text-black transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-4">
                        <span className="text-[10px] font-black text-gold/40">{item.id}</span>
                        <h4 className="text-lg font-bold tracking-tight uppercase group-hover:text-gold transition-colors">{item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.description}</p>
                      
                      <div className="pt-4 flex items-center gap-6">
                         <div className="flex items-center gap-2">
                           <Zap className="w-3 h-3 text-gold" />
                           <span className="text-[10px] font-mono text-gold uppercase tracking-tighter">{item.stats}</span>
                         </div>
                         <div className="h-px flex-1 bg-gold/10 group-hover:bg-gold/30 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Scanline Animation */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent h-12 w-full"
                    animate={{ y: ['-100%', '300%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                </motion.div>
              ))}
              
              {/* Floating 3D Metadata */}
              <motion.div 
                className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:block"
                animate={{ y: [-10, 10] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "mirror" }}
              >
                <div className="p-4 bg-white/5 border border-white/10 backdrop-blur-xl rotate-90 origin-center">
                   <p className="text-[8px] font-mono whitespace-nowrap tracking-[0.5em] text-white/30">SYSTEM_UPTIME_CONNECTED_VB_CORE</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gold/10 blur-[120px] -z-10 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
