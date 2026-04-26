import * as React from "react"
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Globe, Send, Clock, ChevronDown, CheckCircle2, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TextReveal } from "../components/effects/TextReveal";
import { Magnetic } from "../components/effects/Magnetic";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/vishant-bhardwaj/", details: "Professional Network" },
  { icon: Github, label: "GitHub", href: "https://github.com/Vishantbhardwaj18", details: "Code Repositories" },
  { icon: Globe, label: "Website", href: "https://www.vishantbhardwaj.in", details: "Digital Portfolio" },
  { icon: FileText, label: "Resume", href: "/images/vishantbhardwajresume.pdf", details: "Technical CV" }
];

const faqs = [
  { q: "What is your current availability?", a: "I’m open for strategic product partnerships and a limited number of 0→1 launches. I do not take hourly maintenance or low-budget work." },
  { q: "Do you offer tech-stack advising?", a: "Yes — especially for startups bridging AI and robotics with scalable SaaS backends and product-led growth." },
  { q: "Where are you based?", a: "I’m based in Meerut, UP, and work globally with founder teams in hybrid and remote formats." }
];

const onboardingSteps = [
  { title: "Analysis", desc: "Validate the opportunity, risk, and product advantage." },
  { title: "Strategy", desc: "Define scope, roadmap, and a launch-ready plan." },
  { title: "Execution", desc: "Build fast with product discipline and weekly alignment." },
  { title: "Deployment", desc: "Launch, scale, and hand over a system that runs." }
];

export default function Contact() {
  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [selectedProjectFocus, setSelectedProjectFocus] = React.useState("0→1 product launch");
  const [selectedTimeline, setSelectedTimeline] = React.useState("Now → next 4 weeks");
  const [selectedBudget, setSelectedBudget] = React.useState("₹20L+ / $25k–$50k");
  const [expandedFaq, setExpandedFaq] = React.useState<boolean[]>(new Array(faqs.length).fill(false));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decor */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-gold/5 blur-[120px] rounded-full -z-10" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gold/5 blur-[120px] rounded-full -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase font-black tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mr-2 animate-pulse" />
              Selective intake • founder-led engagements
            </div>
            <h1 className="font-display text-responsive-title leading-[0.85] tracking-tighter">
              <TextReveal text="Build the AI product" /> <br />
              <span className="text-gold text-glow"><TextReveal text="that defines your category" delay={0.2} /></span>
            </h1>
            <p className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
              For founders and product leaders who need a strategic partner to move from idea to a scalable product system — not another execution vendor.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button asChild size="sm" variant="outline" className="border-gold/30 hover:border-gold hover:bg-gold/5 rounded-none glass text-[10px] font-black uppercase tracking-widest px-6 h-10">
                <a href="/images/vishantbhardwajresume.pdf" target="_blank" rel="noreferrer">
                  <FileText className="w-3 h-3 mr-2" /> Founder profile
                </a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:w-1/3 space-y-4"
          >
            <p className="text-muted-foreground text-base font-light leading-relaxed">
              I build AI SaaS, robotics systems, and 0→1 products with founder teams who want clarity, speed, and market impact.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-gold">
                <Clock className="w-4 h-4 mr-2" /> Avg. response: &lt; 24 hours
              </div>
              <p className="text-xs uppercase tracking-[0.3em] font-black text-muted-foreground">Founder, MaVionix • AI SaaS, robotics, and product strategy • IIT alumnus</p>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-16">
            <section className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center">
                <span className="w-8 h-px bg-muted-foreground/30 mr-4" /> Essential channels
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => copyToClipboard("vishantbhardwaj06@gmail.com")}
                  className="p-6 border border-border bg-muted/5 glass hover:border-gold/30 transition-all group flex items-center justify-between text-left w-full"
                >
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary email</p>
                    <p className="font-heading font-medium text-base">vishantbhardwaj06@gmail.com</p>
                  </div>
                  <Mail className="w-5 h-5 text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </button>
                <button
                  onClick={() => copyToClipboard("+917818037404")}
                  className="p-6 border border-border bg-muted/5 glass hover:border-gold/30 transition-all group flex items-center justify-between text-left w-full"
                >
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Direct line</p>
                    <p className="font-heading font-medium text-base">+91 7818037404</p>
                  </div>
                  <Phone className="w-5 h-5 text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center">
                  <span className="w-8 h-px bg-muted-foreground/30 mr-4" /> Onboarding process
                </h2>
                <span className="text-[10px] uppercase tracking-[0.35em] font-black text-gold/80">Founder-first flow</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {onboardingSteps.map((step, i) => (
                  <div key={i} className="p-6 border border-border bg-muted/5 glass space-y-3 hover:bg-gold/5 transition-colors">
                    <p className="text-gold font-display text-xl">0{i + 1}</p>
                    <h4 className="font-heading font-bold text-xs uppercase tracking-widest">{step.title}</h4>
                    <p className="text-[10px] text-muted-foreground leading-tight font-light">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-8 border border-gold/20 bg-gold/5 glass space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.35em] font-black text-muted-foreground">Before you reach out</p>
                <h3 className="text-2xl font-display">Only reach out if this is the right fit</h3>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Contact me only if you are building a product, launching an AI-enabled system, or seeking a senior product partner.</p>
                <p className="font-medium text-white">Not a fit for brochure sites, hourly support, or basic marketing work.</p>
              </div>
              <ul className="space-y-2 text-[10px] uppercase tracking-[0.2em] font-black text-gold">
                <li>• Founder-led teams</li>
                <li>• AI, SaaS, robotics, product strategy</li>
                <li>• Limited strategic intake</li>
              </ul>
            </section>

            <section className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center">
                <span className="w-8 h-px bg-muted-foreground/30 mr-4" /> Quick answers
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => {
                  const isExpanded = expandedFaq[i];

                  return (
                    <div key={i} className="border border-border bg-muted/5 glass overflow-hidden transition-all hover:border-gold/30">
                      <button
                        onClick={() => setExpandedFaq((prev) => prev.map((value, index) => index === i ? !value : value))}
                        className="w-full p-6 flex items-center justify-between text-left group"
                      >
                        <h4 className={`font-heading font-bold text-sm uppercase tracking-wider transition-colors ${isExpanded ? 'text-gold' : 'group-hover:text-gold'}`}>
                          {faq.q}
                        </h4>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        >
                          <ChevronDown className={`w-4 h-4 transition-colors ${isExpanded ? 'text-gold' : 'text-muted-foreground group-hover:text-gold'}`} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                          >
                            <div className="px-6 pb-6 pt-0 border-t border-gold/10">
                              <p className="text-sm text-muted-foreground leading-relaxed font-light mt-4">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 border border-border bg-muted/5 glass relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles className="w-48 h-48 text-gold rotate-12" />
              </div>

              <div className="space-y-12 relative z-10">
                <div className="space-y-4">
                  <h2 className="font-display text-5xl leading-none">Founder's intake</h2>
                  <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-black">Guided application for strategic product partnerships</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <input type="hidden" name="project_focus" value={selectedProjectFocus} />
                  <input type="hidden" name="timeline" value={selectedTimeline} />
                  <input type="hidden" name="budget" value={selectedBudget} />
                  <div className="rounded-2xl border border-gold/20 bg-background/70 p-5 shadow-[0_0_40px_rgba(255,214,90,0.06)]">
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground">Application progress</p>
                        <p className="text-sm font-semibold">Step 1 of 4 — founder intake</p>
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.35em] font-black text-gold">Selective intake</div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted/10 overflow-hidden">
                      <div className="w-1/4 h-full rounded-full bg-gold/80" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gold/60">Founder / lead</label>
                      <Input required name="from_name" placeholder="Vishant / Head of Product" className="bg-transparent border-0 border-b border-border focus:border-gold rounded-none px-0 py-6 text-lg placeholder:text-muted-foreground/30 font-light" />
                      <p className="text-[11px] text-muted-foreground/80">Your role and decision authority help speed the next step.</p>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gold/60">Primary contact</label>
                      <Input required name="reply_to" type="email" placeholder="founder@startup.com" className="bg-transparent border-0 border-b border-border focus:border-gold rounded-none px-0 py-6 text-lg placeholder:text-muted-foreground/30 font-light" />
                      <p className="text-[11px] text-muted-foreground/80">I use this for the assessment, proposal, and next-step invite.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gold/60">Project focus</label>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/70">Choose the strongest fit</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {["0→1 product launch", "AI SaaS / platform", "Robotics / automation", "Growth & systems scaling", "Technical strategy"].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSelectedProjectFocus(tag)}
                          className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all border ${
                            selectedProjectFocus === tag ? "bg-gold text-black border-gold" : "bg-transparent border-muted/20 text-muted-foreground hover:border-gold/40"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground/80">I prioritize work that needs product direction, market clarity, and execution discipline.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between gap-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gold/60">Launch horizon</label>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/70">Timeline</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {["Now → next 4 weeks", "MVP build → 2–3 months", "Product roadmap → 4–6 months", "Long-term systems"].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTimeline(time)}
                            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all border ${
                              selectedTimeline === time ? "bg-gold text-black border-gold" : "bg-transparent border-muted/20 text-muted-foreground hover:border-gold/40"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] text-muted-foreground/80">Fast launch, MVP build, or longer strategic systems — choose the right tempo.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between gap-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gold/60">Investment range</label>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/70">Budget</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {["₹20L+ / $25k–$50k", "₹40L+ / $50k–$150k", "₹1Cr+ / $150k+", "Equity / partnership"].map((budget) => (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => setSelectedBudget(budget)}
                            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all border ${
                              selectedBudget === budget ? "bg-gold text-black border-gold" : "bg-transparent border-muted/20 text-muted-foreground hover:border-gold/40"
                            }`}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] text-muted-foreground/80">I engage where outcome, effort, and investment are aligned with ambition.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gold/60">Outcome statement</label>
                    <Textarea required name="message" placeholder="Building an AI workflow for enterprise approvals with automation and adoption as the priority…" className="bg-transparent border-0 border-b border-border focus:border-gold rounded-none px-0 py-6 min-h-40 text-lg placeholder:text-muted-foreground/30 font-light resize-none transition-all" />
                    <p className="text-[11px] text-muted-foreground/80">Brief the problem, target outcome, and the biggest risk in one paragraph.</p>
                  </div>

                  <div className="space-y-6">
                    <Button
                      type="submit"
                      disabled={formStatus !== "idle"}
                      className={`w-full h-16 rounded-none text-sm font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden ${
                        formStatus === "success" ? "bg-green-600 text-white" : "bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-lg"
                      }`}
                    >
                      <div className="flex items-center justify-center relative z-10">
                        {formStatus === "idle" && <><Send className="w-4 h-4 mr-3" /> Submit application</>}
                        {formStatus === "submitting" && "Encoding launch plan..."}
                        {formStatus === "success" && <><CheckCircle2 className="w-5 h-5 mr-3" /> Submission received</>}
                      </div>
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground/40 font-light italic">
                      I review every inquiry personally. If there’s a strong fit, you’ll receive a clear engagement outline within 48 hours.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>

            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center mb-8 justify-center">
                <span className="w-8 h-px bg-muted-foreground/30 mr-4" /> Professional ecosystem
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialLinks.map((link, i) => (
                  <div key={i}>
                    <Magnetic strength={0.1}>
                      <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="p-8 border border-border bg-muted/5 glass hover:border-gold/50 transition-all group flex flex-col items-center text-center space-y-6 relative overflow-hidden h-full"
                      >
                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="h-16 w-16 rounded-none bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all group-hover:shadow-[0_0_20px_rgba(240,192,64,0.3)]">
                          <link.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="space-y-2 relative z-10">
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-gold transition-colors">{link.label}</p>
                          <p className="text-[10px] text-muted-foreground/40 font-light italic leading-tight px-2">{link.details}</p>
                        </div>
                      </motion.a>
                    </Magnetic>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
