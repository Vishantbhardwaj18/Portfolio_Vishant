import * as React from "react"
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, Zap, Target, TrendingUp } from "lucide-react";
import { NumberTicker } from "../components/effects/NumberTicker";
import { TextReveal } from "../components/effects/TextReveal";

const experiences = [
  {
    company: "MaVionix",
    role: "Co-Founder | Product Management Intern",
    location: "Ghaziabad, India (Hybrid)",
    duration: "July 2025 — Present",
    description: "Leading 0→1 product development across robotics and SaaS domains.",
    points: [
      "Co-founded MaVionix and led early-stage product strategy and execution for multiple domains including AI SaaS and Robotics.",
      "Managed development of ARAK-1 (quadruped robot for pipeline inspection) and a drone-based delivery system for remote logistics.",
      "Conducted deep market research and problem analysis to define MVP scope, user requirements, and product roadmaps.",
      "Collaborated with cross-functional teams to support product development, feature prioritization, and rapid iteration cycles.",
      "Designed detailed user flows, wireframes, and product documentation, improving dev efficiency and reducing TAT."
    ],
    stats: [
      { label: "Products", value: "3+", icon: Target },
      { label: "Team Size", value: "8+", icon: Zap },
      { label: "Efficiency", value: "25% ↑", icon: TrendingUp }
    ]
  }
];

export default function Experience() {
  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
             <h1 className="font-display text-responsive-huge leading-none tracking-tighter flex flex-wrap gap-x-6">
                <TextReveal text="THE" /> <TextReveal text="TREK." className="text-gold" delay={0.1} />
             </h1>
             <p className="text-xl text-muted-foreground max-w-2xl font-light font-heading uppercase tracking-widest text-sm">Professional Journey & Impact</p>
          </motion.div>
        </header>

        <div className="space-y-32">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-muted/5 border border-muted/10 -z-10 group-hover:bg-gold/[0.02] group-hover:border-gold/20 transition-all rounded-xl" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-6">
                  <div className="p-8 bg-muted/5 border border-muted/20 glass space-y-4">
                    <div className="h-16 w-16 bg-gold/10 rounded-full flex items-center justify-center">
                      <Briefcase className="h-8 w-8 text-gold" />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-bold">{exp.company}</h2>
                      <p className="text-gold font-medium">{exp.role}</p>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-muted/20">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-gold/50" /> {exp.duration}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-gold/50" /> {exp.location}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {exp.stats.map((stat, i) => (
                      <div key={i} className="p-4 bg-muted/5 border border-muted/20 flex items-center justify-between">
                        <div className="flex items-center">
                          <stat.icon className="h-4 w-4 mr-3 text-gold/60" />
                          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</span>
                        </div>
                        <span className="font-display text-xl text-gold">
                          <NumberTicker 
                            value={parseFloat(stat.value.replace(/[^0-9.]/g, ''))} 
                            suffix={stat.value.replace(/[0-9.]/g, '')} 
                            delay={idx * 0.2}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-8">
                  <div className="max-w-none">
                     <p className="text-xl font-light leading-relaxed text-foreground/90 italic border-l-4 border-gold pl-6">
                        "{exp.description}"
                     </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {exp.points.map((point, i) => (
                      <div key={i} className="flex items-start p-6 bg-muted/5 border border-muted/20 hover:border-gold/30 transition-all rounded-lg group/point">
                        <CheckCircle2 className="h-5 w-5 mr-4 text-gold shrink-0 mt-1" />
                        <p className="text-muted-foreground leading-relaxed font-light">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
