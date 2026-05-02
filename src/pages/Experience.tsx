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
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-muted/15 bg-muted/5 px-4 py-2 text-xs uppercase tracking-[0.32em] font-black text-muted-foreground">
              <Briefcase className="h-4 w-4 text-gold" /> Experience
            </div>
            <div className="space-y-4">
              <h1 className="font-display text-responsive-huge leading-none tracking-tighter flex flex-wrap gap-x-6">
                <TextReveal text="THE" /> <TextReveal text="TREK." className="text-gold" delay={0.1} />
              </h1>
              <p className="max-w-2xl text-lg font-light leading-8 text-muted-foreground/90">A concise view of product leadership, AI & robotics impact, and the systems I build with founder teams.</p>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-muted/15 bg-muted/5 p-6 shadow-sm transition hover:border-gold/30 hover:bg-gold/5">
              <p className="text-xs uppercase tracking-[0.3em] font-black text-muted-foreground">Focus area</p>
              <p className="mt-4 text-2xl font-semibold text-foreground">AI & Robotics</p>
            </div>
            <div className="rounded-3xl border border-muted/15 bg-muted/5 p-6 shadow-sm transition hover:border-gold/30 hover:bg-gold/5">
              <p className="text-xs uppercase tracking-[0.3em] font-black text-muted-foreground">Company stage</p>
              <p className="mt-4 text-2xl font-semibold text-foreground">0→1 product launches</p>
            </div>
            <div className="rounded-3xl border border-muted/15 bg-muted/5 p-6 shadow-sm transition hover:border-gold/30 hover:bg-gold/5">
              <p className="text-xs uppercase tracking-[0.3em] font-black text-muted-foreground">Leadership</p>
              <p className="mt-4 text-2xl font-semibold text-foreground">Founder-led teams</p>
            </div>
          </div>
        </header>

        <div className="space-y-24">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 rounded-4xl bg-muted/5 border border-muted/10 -z-10 group-hover:bg-gold/6 group-hover:border-gold/20 transition-all" />

              <div className="overflow-hidden rounded-4xl border border-muted/10 bg-card/95 shadow-[0_35px_90px_rgba(15,23,42,0.08)] transition-all duration-500 hover:shadow-[0_45px_120px_rgba(15,23,42,0.12)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 lg:p-10">
                  <div className="lg:col-span-4 space-y-6">
                    <div className="rounded-4xl border border-muted/20 bg-muted/5 glass p-8 space-y-5 shadow-sm dark:bg-white/5">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold shadow-[0_8px_30px_rgba(198,161,74,0.08)]">
                        <Briefcase className="h-8 w-8" />
                      </div>
                      <div>
                        <h2 className="font-heading text-3xl font-bold text-foreground">{exp.company}</h2>
                        <p className="mt-2 text-base font-semibold text-gold">{exp.role}</p>
                      </div>
                      <div className="space-y-3 pt-4 border-t border-muted/20">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-gold/60" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-gold/60" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {exp.stats.map((stat, i) => (
                        <div key={i} className="rounded-3xl border border-muted/20 bg-muted/5 p-4 shadow-sm transition hover:border-gold/30 hover:bg-gold/5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <stat.icon className="h-5 w-5 text-gold" />
                              <span className="text-xs uppercase tracking-[0.3em] font-black text-muted-foreground">{stat.label}</span>
                            </div>
                            <span className="text-2xl font-semibold text-foreground">{stat.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-8">
                    <div className="rounded-3xl border border-muted/20 bg-muted/5 p-8 shadow-sm dark:bg-black/20">
                      <p className="text-xl font-light leading-relaxed text-foreground/90 italic border-l-4 border-gold pl-6">"{exp.description}"</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {exp.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-4 rounded-3xl border border-muted/20 bg-muted/5 p-6 transition hover:border-gold/30 hover:bg-gold/6 shadow-sm dark:bg-black/20">
                          <div className="mt-1 rounded-2xl bg-gold/10 p-2 text-gold shadow-[0_10px_30px_rgba(198,161,74,0.08)]">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          <p className="text-muted-foreground leading-relaxed font-light">{point}</p>
                        </div>
                      ))}
                    </div>
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
