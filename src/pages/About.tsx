import * as React from "react"
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Code, Cpu, Layout, Users, BarChart3, Palette, Calendar, MapPin, Star, ArrowRight, Download, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TextReveal } from "../components/effects/TextReveal";
import { NumberTicker } from "../components/effects/NumberTicker";
import myPhoto from "../images/my-photo2.png";

const education = [
  {
    institution: "IIT Madras",
    degree: "BS in Management & Data Science",
    year: "2029 (Ongoing)",
    highlight: "Double Degree focus. Cumulative GPA: 7.0 (Current).",
    location: "Chennai, India",
    type: "current"
  },
  {
    institution: "SRM Institute of Science & Technology, Ghaziabad",
    degree: "B.Tech in CSE - Data Science",
    year: "2028 (Ongoing)",
    highlight: "Specialization in AI/ML. 9.21 CGPA (Current).",
    location: "Ghaziabad, India",
    type: "current"
  },
  {
    institution: "St. Xavier's World School, Meerut",
    degree: "Class XII: CBSE (A.I.S.S.C.E)",
    year: "2024",
    highlight: "Percentage: 80.4%",
    location: "Meerut, India",
    type: "completed"
  },
  {
    institution: "St. Xavier's World School, Meerut",
    degree: "Class X: CBSE (A.I.S.S.E)",
    year: "2022",
    highlight: "Percentage: 91.6%",
    location: "Meerut, India",
    type: "completed"
  }
];

const experience = [
  {
    role: "Co-Founder & Product Lead",
    company: "MaVionix",
    period: "2023 - Present",
    description: "Leading product strategy and development for AI-powered solutions in manufacturing and logistics.",
    achievements: ["Launched MVP with 40% user engagement", "Secured seed funding", "Built cross-functional team"],
    type: "current"
  },
  {
    role: "Product Management Intern",
    company: "Tech Startup",
    period: "2022 - 2023",
    description: "Managed product lifecycle from ideation to launch, focusing on user research and data-driven decisions.",
    achievements: ["Increased conversion by 25%", "Conducted 50+ user interviews", "Designed 3 product features"],
    type: "past"
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

const achievements = [
  {
    metric: "50+",
    label: "Projects Completed",
    description: "Cross-discipline projects in AI, product, and UX"
  },
  {
    metric: "4+",
    label: "Years Experience",
    description: "Leading startups and product teams"
  },
  {
    metric: "2x",
    label: "Degrees Pursuing",
    description: "Management & Data Science at IIT Madras"
  },
  {
    metric: "25%",
    label: "Conversion Increase",
    description: "Through data-driven product decisions"
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
    src: "/images/image1.jpeg",
    title: "Innovation & Creativity",
    description: "Exploring new ideas and pushing boundaries in product development."
  },
  {
    src: "/images/arak-1.jpg",
    title: "Speaking & Thought Leadership",
    description: "Sharing insights and engaging with industry leaders on product innovation and technology."
  },
  {
    src: "/images/image2.jpg",
    title: "Technical Excellence",
    description: "Building robust solutions with cutting-edge technology and best practices."
  },
  {
    src: "/images/image3.jpg",
    title: "Team Collaboration",
    description: "Working together to achieve remarkable results and shared success."
  },
  {
    src: "/images/image4.jpg",
    title: "Design Thinking",
    description: "User-centered design approaches that create meaningful experiences."
  },
  {
    src: "/images/image5.jpg",
    title: "Data-Driven Insights",
    description: "Leveraging analytics and data to make informed product decisions."
  },
  {
    src: "/images/image6.jpg",
    title: "Agile Development",
    description: "Iterative processes that deliver value quickly and efficiently."
  },
  {
    src: "/images/image7.jpg",
    title: "Strategic Vision",
    description: "Long-term planning and roadmap execution for sustainable growth."
  },
  {
    src: "/images/image8.jpg",
    title: "Quality Assurance",
    description: "Ensuring excellence through rigorous testing and validation."
  },
  {
    src: "/images/image9.jpg",
    title: "Continuous Learning",
    description: "Staying ahead with ongoing education and skill development."
  },
  {
    src: "/images/image10.jpg",
    title: "Impactful Solutions",
    description: "Creating products that solve real problems and drive change."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
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
  const slide = gallerySlides[activeSlide] ?? gallerySlides[0];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => gallerySlides.length ? (prev + 1) % gallerySlides.length : 0);
    }, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-stretch"
          >
            <motion.section
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden rounded-4xl border border-border/50 bg-surface/90 shadow-[0_40px_120px_rgba(15,23,42,0.12)]"
            >
              <div className="relative h-[420px] sm:h-[520px] lg:h-[520px] overflow-hidden">
                <motion.div
                  className="absolute inset-0 border-4 border-accent/40 rounded-4xl p-3"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(59, 130, 246, 0)",
                      "0 0 30px rgba(59, 130, 246, 0.4)",
                      "0 0 0 rgba(59, 130, 246, 0)"
                    ],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <motion.img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.title}
                    initial={{ opacity: 0, scale: 1.1, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{
                      opacity: { duration: 0.8, ease: "easeOut" },
                      scale: { duration: 0.8, ease: "easeOut" },
                      y: { duration: 0.8, ease: "easeOut" },
                      rotate: { duration: 0.3 }
                    }}
                    className="absolute inset-0 h-full w-full object-cover block rounded-4xl"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent rounded-4xl" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent-foreground">
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
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-accent" : "bg-muted/50 hover:bg-accent/70"}`}
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
                      className="rounded-full border border-border/70 bg-accent px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-accent/95"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="space-y-12 lg:max-w-lg">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.25em] text-accent">
                  About Me
                </span>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none">
                  <TextReveal text="About" /> <span className="text-accent"><TextReveal text="Me" delay={0.2} /></span>
                </h1>
                <p className="text-lg leading-8 text-muted-foreground">
                  I am a results-driven entrepreneur and product leader who blends technical rigor with creative problem solving. My work centers on building high-impact products, guiding data-driven decisions, and designing experiences people love.
                </p>
              </div>

              <div className="mx-auto max-w-[28rem] rounded-4xl border border-accent/15 bg-accent/5 p-6 shadow-[0_30px_80px_rgba(6,182,212,0.08)] dark:border-accent/20 dark:bg-accent/10">
                <p className="text-sm uppercase tracking-[0.3em] text-accent-foreground mb-4">Key Achievements</p>
                <div className="grid grid-cols-4 gap-4">
                  {achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="rounded-3xl bg-card/80 p-4 border border-accent/10 shadow-sm transition-transform duration-300 dark:border-accent/30 dark:bg-black/20"
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="text-2xl font-semibold text-foreground dark:text-foreground">
                          <NumberTicker value={parseInt(achievement.metric)} />
                          {achievement.metric.includes('+') ? '+' : achievement.metric.includes('%') ? '%' : ''}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-foreground">{achievement.label}</p>
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground/75">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
</motion.header>

        <div className="grid gap-20 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-16">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-8 rounded-4xl border border-border/50 bg-surface/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]"
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
                <motion.div whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)" }} className="rounded-3xl border border-accent/10 bg-accent/5 p-5 transition-all">
                  <p className="text-sm uppercase tracking-[0.25em] text-accent">Founder Mindset</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Co-founded MaVionix and shaped product strategy with a focus on launching real business value.</p>
                </motion.div>
                <motion.div whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)" }} className="rounded-3xl border border-accent/10 bg-accent/5 p-5 transition-all">
                  <p className="text-sm uppercase tracking-[0.25em] text-accent">Technical Leadership</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Combining AI, data engineering and systems design to create scalable product experiences.</p>
                </motion.div>
                <motion.div whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)" }} className="rounded-3xl border border-accent/10 bg-accent/5 p-5 transition-all">
                  <p className="text-sm uppercase tracking-[0.25em] text-accent">Design-led Thinking</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Translating user insights into polished interfaces, flows, and frictionless digital journeys.</p>
                </motion.div>
                <motion.div whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)" }} className="rounded-3xl border border-accent/10 bg-accent/5 p-5 transition-all">
                  <p className="text-sm uppercase tracking-[0.25em] text-accent">Data-first Execution</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">Using metrics, experimentation and analytics to validate product decisions and accelerate growth.</p>
                </motion.div>
              </div>
            </motion.section>

            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-6">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-accent" />
                <h2 className="font-heading text-xl uppercase tracking-[0.25em] text-accent">Experience</h2>
              </div>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.12)" }}
                    className="group overflow-hidden rounded-[1.75rem] border border-border/50 bg-surface/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                        <p className="text-sm font-medium text-accent">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <Badge key={i} variant="outline" className="bg-accent/5 text-accent border-accent/20">
                          <Star className="h-3 w-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-6">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-accent" />
                <h2 className="font-heading text-xl uppercase tracking-[0.25em] text-accent">Certifications</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert, idx) => (
                  <motion.div key={idx} whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.12)" }} className="rounded-3xl border border-accent/10 bg-surface/95 p-6 shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="rounded-2xl bg-accent/10 p-3">
                        <cert.icon className="h-5 w-5 text-accent" />
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
                <GraduationCap className="h-5 w-5 text-accent" />
                <h2 className="font-heading text-xl uppercase tracking-[0.25em]">Education</h2>
              </div>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.12)" }}
                    className="group overflow-hidden rounded-[1.75rem] border border-border/50 bg-surface/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-lg font-semibold text-foreground">{edu.institution}</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {edu.location}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          edu.type === 'current'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        }`}>
                          {edu.type === 'current' ? 'Current' : 'Completed'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-accent mb-2">{edu.degree}</p>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      {edu.year}
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{edu.highlight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          <aside className="space-y-16">
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="rounded-4xl border border-border/50 bg-surface/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3 mb-6">
                <Code className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Core Strengths</p>
                  <h2 className="text-2xl font-semibold text-foreground">Skillset</h2>
                </div>
              </div>
              <div className="grid gap-4">
                {skills.map((skill, idx) => (
                  <motion.div key={idx} whileHover={{ y: -6, boxShadow: "0 28px 70px rgba(15, 23, 42, 0.12)" }} className="rounded-3xl border border-muted/20 bg-card/80 p-5 shadow-sm hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <skill.icon className="h-5 w-5 text-accent" />
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-foreground">{skill.category}</h3>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground mb-4">{skill.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <Badge key={i} variant="secondary" className="bg-accent/10 text-accent border-accent/20 cursor-default">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="rounded-4xl border border-border/50 bg-surface/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Beyond work</p>
                  <h2 className="text-2xl font-semibold text-foreground">Extra Curricular</h2>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {extraCurriculars.map((activity, idx) => (
                  <motion.div key={idx} whileHover={{ y: -3, scale: 1.01 }} className="rounded-3xl border border-muted/20 bg-card/80 px-5 py-4 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:border-accent/30">
                    {activity}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <section className="relative overflow-hidden rounded-4xl border border-accent/20 bg-linear-to-br from-accent/10 via-surface/90 to-accent/5 p-8 shadow-[0_30px_80px_rgba(6,182,212,0.12)]">
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
