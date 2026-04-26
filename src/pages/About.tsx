import * as React from "react"
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Code, Cpu, Layout, Users, BarChart3, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TextReveal } from "../components/effects/TextReveal";
import myPhoto from "../images/my-photo2.png";

const education = [
  {
    institution: "IIT Madras",
    degree: "BS in Management & Data Science",
    year: "2029 (Ongoing)",
    highlight: "Double Degree focus. Cumulative GPA: 7.0 (Current)."
  },
  {
    institution: "SRM Institute of Science & Technology, Ghaziabad",
    degree: "B.Tech in CSE - Data Science",
    year: "2028 (Ongoing)",
    highlight: "Specialization in AI/ML. 9.21 CGPA (Current)."
  },
  {
    institution: "St. Xavier's World School, Meerut",
    degree: "Class XII: CBSE (A.I.S.S.C.E)",
    year: "2024",
    highlight: "Percentage: 80.4%"
  },
  {
    institution: "St. Xavier's World School, Meerut",
    degree: "Class X: CBSE (A.I.S.S.E)",
    year: "2022",
    highlight: "Percentage: 91.6%"
  }
];

const certifications = [
  {
    title: "BS in Data Science & Applications (Foundation Level Completed)",
    org: "IIT Madras",
    icon: GraduationCap
  },
  {
    title: "Product Management Certification",
    org: "Great Learning",
    icon: Award
  }
];

const skills = [
  { 
    category: "Product & Strategy", 
    items: ["Product Thinking", "GTM Strategy", "Market Analysis", "MVP Lifecycle", "Agile Leadership", "A/B Testing", "Stakeholder Mgmt"], 
    icon: Layout,
    description: "Executing 0-to-1 product roadmaps with a focus on market fit and scalable value."
  },
  { 
    category: "Data & Decision Making", 
    items: ["Statistical Analysis", "KPI Frameworks", "Funnel Analytics", "Predictive Modeling", "Pandas", "SQL", "BigQuery"], 
    icon: BarChart3,
    description: "Leveraging data-driven insights to mitigate risk and optimize product performance."
  },
  { 
    category: "Design & Interaction", 
    items: ["Figma Prototyping", "UX Research", "Identity Design", "Information Arch.", "User Mapping", "Design Systems"], 
    icon: Users,
    description: "Crafting intuitive user journeys that bridge the gap between complex tech and human needs."
  },
  { 
    category: "AI & Robotics", 
    items: ["Computer Vision", "Autonomous Navigation", "Hardware-Software Int.", "Robot Operating Sys.", "Machine Learning"], 
    icon: Cpu,
    description: "Engineering intelligent physical systems for industrial and logistics automation."
  }
];

const extraCurriculars = [
  "Debate & Public Speaking",
  "Chess Enthusiast",
  "Tech Community Volunteer",
  "Blogger (Blogspot)"
];

const gallerySlides = [
  {
    src: myPhoto,
    title: "Product Leadership in Motion",
    description: "A visual snapshot of product strategy, design systems, and launch-ready thinking."
  },
  {
    src: "/images/arak-1.jpg",
    title: "Innovative Product Moments",
    description: "Real-world product experiences and team-driven solutions captured with clarity."
  },
  {
    src: "/images/arak-2.jpg",
    title: "Creative Systems & Solutions",
    description: "A showcase of technology, design, and work that speaks to impact and craft."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};

const hoverCard = {
  rest: { y: 0, boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)" },
  hover: { y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)" },
};

export default function About() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const slide = gallerySlides[activeSlide];

  return (
    <div className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <header className="mb-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-stretch"
          >
            <motion.section
              variants={fadeUp}
              className="overflow-hidden rounded-[2rem] border border-border/50 bg-surface/90 shadow-[0_40px_120px_rgba(15,23,42,0.12)]"
            >
              <div className="relative h-[420px] sm:h-[520px] lg:h-[520px]">
                <motion.img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold/90">
                    Visual Storytelling
                  </span>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {slide.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                    {slide.description}
                  </p>
                </div>
              </div>

              <div className="border-t border-border/60 bg-surface/95 px-5 py-4 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    {gallerySlides.map((item, idx) => (
                      <button
                        key={item.src}
                        aria-label={`Go to ${item.title}`}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-gold" : "bg-muted/50 hover:bg-gold/70"}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveSlide((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length)}
                      className="rounded-full border border-border/70 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSlide((prev) => (prev + 1) % gallerySlides.length)}
                      className="rounded-full border border-border/70 bg-gold px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-gold/95"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="space-y-12 lg:max-w-lg">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.25em] text-gold">
                  About Me
                </span>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none">
                  <TextReveal text="About" /> <span className="text-gold"><TextReveal text="Me" delay={0.2} /></span>
                </h1>
                <p className="text-lg leading-8 text-muted-foreground">
                  I am a results-driven entrepreneur and product leader who blends technical rigor with creative problem solving. My work centers on building high-impact products, guiding data-driven decisions, and designing experiences people love.
                </p>
              </div>

              <div className="mx-auto max-w-[28rem] rounded-[2rem] border border-gold/15 bg-gold/5 p-8 shadow-[0_30px_80px_rgba(6,182,212,0.08)]">
                <p className="text-sm uppercase tracking-[0.3em] text-gold/90 mb-4">Fast facts</p>
                <div className="grid gap-4">
                  <motion.div whileHover={{ y: -5, scale: 1.01 }} className="rounded-3xl bg-white/80 p-5 border border-gold/10 shadow-sm transition-transform duration-300">
                    <p className="text-3xl font-semibold text-foreground">2x</p>
                    <p className="mt-2 text-sm text-muted-foreground">Dual degree focus in management & data science</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5, scale: 1.01 }} className="rounded-3xl bg-white/80 p-5 border border-gold/10 shadow-sm transition-transform duration-300">
                    <p className="text-3xl font-semibold text-foreground">50+</p>
                    <p className="mt-2 text-sm text-muted-foreground">Cross-discipline projects spanning AI, product, and UX</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5, scale: 1.01 }} className="rounded-3xl bg-white/80 p-5 border border-gold/10 shadow-sm transition-transform duration-300">
                    <p className="text-3xl font-semibold text-foreground">4+</p>
                    <p className="mt-2 text-sm text-muted-foreground">Years leading startups, product teams, and growth strategy</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="grid gap-20 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-16">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-8 rounded-[2rem] border border-border/50 bg-surface/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">My Journey</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">From curiosity to product impact.</h2>
                </div>
                <Button asChild variant="secondary" className="w-full sm:w-auto rounded-full px-5 py-3 transition-transform duration-300 hover:-translate-y-0.5">
                  <a href="/resume">View Resume</a>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <motion.div whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)" }} className="rounded-3xl border border-gold/10 bg-gold/5 p-5 transition-all">
                  <p className="text-sm uppercase tracking-[0.25em] text-gold">Founder Mindset</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Co-founded MaVionix and shaped product strategy with a focus on launching real business value.</p>
                </motion.div>
                <motion.div whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)" }} className="rounded-3xl border border-gold/10 bg-gold/5 p-5 transition-all">
                  <p className="text-sm uppercase tracking-[0.25em] text-gold">Technical Leadership</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Combining AI, data engineering and systems design to create scalable product experiences.</p>
                </motion.div>
                <motion.div whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)" }} className="rounded-3xl border border-gold/10 bg-gold/5 p-5 transition-all">
                  <p className="text-sm uppercase tracking-[0.25em] text-gold">Design-led Thinking</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Translating user insights into polished interfaces, flows, and frictionless digital journeys.</p>
                </motion.div>
                <motion.div whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)" }} className="rounded-3xl border border-gold/10 bg-gold/5 p-5 transition-all">
                  <p className="text-sm uppercase tracking-[0.25em] text-gold">Data-first Execution</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Using metrics, experimentation and analytics to validate product decisions and accelerate growth.</p>
                </motion.div>
              </div>
            </motion.section>

            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-6">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-gold" />
                <h2 className="font-heading text-xl uppercase tracking-[0.25em] text-gold">Certifications</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert, idx) => (
                  <motion.div key={idx} whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.12)" }} className="rounded-3xl border border-gold/10 bg-surface/95 p-6 shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="rounded-2xl bg-gold/10 p-3">
                        <cert.icon className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{cert.title}</p>
                        <p className="text-xs text-muted-foreground">{cert.org}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">Verified training and formal certification in product strategy and data science fundamentals.</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-gold" />
                <h2 className="font-heading text-xl uppercase tracking-[0.25em]">Education</h2>
              </div>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <motion.div key={idx} whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.12)" }} className="group overflow-hidden rounded-[1.75rem] border border-border/50 bg-surface/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold text-foreground">{edu.institution}</h3>
                      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{edu.year}</span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-gold">{edu.degree}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{edu.highlight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          <aside className="space-y-16">
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="rounded-[2rem] border border-border/50 bg-surface/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3 mb-6">
                <Code className="h-5 w-5 text-gold" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Core Strengths</p>
                  <h2 className="text-2xl font-semibold text-foreground">Skillset</h2>
                </div>
              </div>
              <div className="grid gap-4">
                {skills.map((skill, idx) => (
                  <motion.div key={idx} whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.12)" }} className="rounded-3xl border border-muted/20 bg-white/80 p-5 shadow-sm hover:border-gold/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <skill.icon className="h-5 w-5 text-gold" />
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-foreground">{skill.category}</h3>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground mb-4">{skill.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <Badge key={i} variant="secondary" className="bg-gold/10 text-gold border-gold/20 cursor-default">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="rounded-[2rem] border border-border/50 bg-surface/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-5 w-5 text-gold" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Beyond work</p>
                  <h2 className="text-2xl font-semibold text-foreground">Extra Curricular</h2>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {extraCurriculars.map((activity, idx) => (
                  <motion.div key={idx} whileHover={{ y: -3, scale: 1.01 }} className="rounded-3xl border border-muted/20 bg-white/80 px-5 py-4 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:border-gold/30">
                    {activity}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <section className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-br from-gold/10 via-surface/90 to-gold/5 p-8 shadow-[0_30px_80px_rgba(6,182,212,0.12)]">
              <div className="absolute inset-y-0 right-0 w-32 opacity-20">
                <Palette className="h-full w-full" />
              </div>
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Philosophy</p>
                <blockquote className="text-xl font-semibold leading-relaxed text-foreground">
                  “Product management isn't just about managing features; it's about managing value and outcomes. My goal is to build things that matter.”
                </blockquote>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
