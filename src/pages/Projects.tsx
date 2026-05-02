import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Bot,
  Box,
  Briefcase,
  CheckCircle2,
  Cpu,
  Database,
  Eye,
  Filter,
  Gauge,
  Github,
  Layers,
  Plane,
  Radio,
  Rocket,
  Search,
  Shield,
  Target,
  Thermometer,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TextReveal } from "../components/effects/TextReveal";
import { Magnetic } from "../components/effects/Magnetic";

const projects = [
  {
    title: "Military Health-Care Supply Drone — Autonomous UAV System",
    role: "Author | System Designer",
    date: "Nov 2025",
    description:
      "Designed a rapid medical supply UAV for military zones, GPS-denied terrain, cold-chain payloads, and high-risk logistics corridors.",
    longDescription:
      "The MHCSD technical report defines a hybrid autonomous UAV system for rapid medical support in military zones. It covers airframe design, propulsion, power distribution, sensor fusion, encrypted communication, thermal payload handling, field operations, testing, regulatory compliance, and deployment strategy.",
    problem:
      "Forward medical teams lose critical time to terrain barriers, hostile corridors, GPS denial, weather, fragile payload handling, and expensive ground evacuation.",
    solution:
      "A lightweight autonomous UAV with LiDAR/visual/IMU sensor fusion, AES-256 telemetry, thermally insulated medical payload bay, shock isolation, precision delivery, and rapid deployment workflow.",
    impact:
      "47 test missions demonstrated 98.6% delivery success, 18.2 minute mean delivery time, 99.2% payload integrity, and 75-80% mission cost reduction versus ground logistics.",
    architecture: [
      "Pixhawk 4 flight controller with ArduCopter/PX4 autonomous modes",
      "LiDAR SLAM, optical flow, GPS, IMU, compass, and barometer sensor fusion",
      "Carbon fiber quadcopter frame with 2.5 kg medical payload capacity",
      "Passive cold-chain bay with aerogel/EPS insulation and elastomer shock isolation",
      "Frequency-hopping telemetry, AES-256 communication, geofence, RTH, and parachute safety layers",
    ],
    tech: ["Autonomous UAV", "AI", "Robotics", "SLAM", "Military Medical Logistics", "GPS-Denied Navigation"],
    systemTag: "DEFENSE MEDTECH",
    status: "RESEARCH",
    icon: Plane,
    link: "#",
    github: "#",
    metric: "98.6% Mission Success",
    stats: { value: "98.6%", label: "Delivery Success" },
    metrics: [
      { value: "18.2m", label: "Mean Delivery" },
      { value: "2.5kg", label: "Medical Payload" },
      { value: "75-80%", label: "Cost Reduction" },
    ],
  },
  {
    title: "ARAK-1: Robotic System for Pipeline Monitoring and Repair",
    role: "Team Leader | System Architect",
    date: "Thrust Tech Expo 2026",
    description:
      "Led MaVionix in building ARAK-1, a hybrid spider-wheel robotic inspection system for pipeline monitoring, AI-assisted damage detection, and UV/resin-based emergency micro-repair.",
    longDescription:
      "ARAK-1 is an autonomous robotic system for pipeline inspection and preliminary repair, developed for THRUST Tech Expo 2026 at IIT Hyderabad. The platform combines spider-inspired articulated legs with wheel-based mobility, real-time camera monitoring, gas/temperature/pressure/vibration sensing, AI-based surface damage detection, and a compact repair mechanism for resin injection and UV patch curing.",
    problem:
      "Pipeline networks can develop corrosion, cracks, gas leaks, pressure anomalies, and structural weakening while remaining difficult or unsafe for humans to inspect in confined, hazardous, or irregular industrial environments.",
    solution:
      "A modular robotic platform using Arduino Mega control, servo-driven spider-leg articulation, wheel-assisted locomotion, ESP32-CAM visual monitoring, environmental sensors, OpenCV/TensorFlow defect detection, and a servo-positioned nozzle with micro-pump repair capability.",
    impact:
      "Reduces human exposure during inspection, supports early-stage damage detection, merges inspection with temporary repair, and provides a cost-effective, reproducible robotics platform for industrial infrastructure monitoring.",
    architecture: [
      "Control layer: Arduino Mega 2560 coordinates servo PWM, DC motor control, sensor acquisition, camera communication, and repair actuation",
      "Locomotion system: SG90 servo-driven spider-leg joints combined with DC geared wheel motors and L298N H-bridge control for hybrid crawling-wheel mobility",
      "Sensing layer: ESP32-CAM, MQ gas sensors, DHT/LM35 temperature sensing, pressure modules, HC-SR04 ultrasonic ranging, and SW-420 vibration detection",
      "AI inspection layer: Python, OpenCV, and TensorFlow pipeline for image acquisition, preprocessing, crack/corrosion detection, and severity classification",
      "Repair subsystem: servo-positioned robotic arm, nozzle alignment, resin injection through a micro-pump, and UV curing for temporary crack sealing",
      "Monitoring stack: ROS/Gazebo simulation pathway, IoT dashboard, wireless telemetry, cloud logging, and remote visual/sensor data review",
    ],
    tech: [
      "Robotics",
      "AI",
      "IoT",
      "Pipeline Monitoring",
      "Computer Vision",
      "Arduino Mega",
      "ESP32-CAM",
      "OpenCV",
      "TensorFlow",
      "ROS",
      "Gazebo",
      "Fusion 360",
    ],
    systemTag: "ROBOTIC INSPECTION",
    status: "PROTOTYPE",
    icon: Shield,
    link: "#",
    github: "#",
    metric: "Hybrid Spider-Wheel + Micro-Repair",
    stats: { value: "Hybrid", label: "Spider-Wheel Mobility" },
    metrics: [
      { value: "6+", label: "Sensor Domains" },
      { value: "UV", label: "Patch Repair" },
      { value: "IIT-H", label: "Expo Track" },
    ],
  },
  {
    title: "Noikix — Rental Business SaaS",
    role: "Product Lead",
    date: "Dec 2024",
    description:
      "Built a rental SaaS platform enabling small businesses to digitize their operations. Managed the MVP roadmap and led a 3-member development team through a successful launch.",
    longDescription:
      "Noikix addresses inefficiencies in manual equipment rental tracking through availability calendars, digital inventory workflows, and secure deposit management. The MVP reduced inventory conflict by 40% for pilot users.",
    problem:
      "Small rental businesses often run on notebooks, calls, and fragmented spreadsheets, causing inventory clashes, deposit confusion, and delayed customer handling.",
    solution:
      "A SaaS MVP with real-time availability views, rental lifecycle tracking, digital deposit workflows, and a focused roadmap built around operational clarity.",
    impact:
      "Reduced inventory conflicts by 40% for pilot users while giving the team a validated foundation for recurring SaaS workflows.",
    architecture: [
      "React front-end with reusable rental workflow components",
      "Firebase-backed availability and customer data flows",
      "MVP roadmap prioritizing inventory clarity and deposit trust",
      "Operator-focused dashboards for repeated daily use",
    ],
    tech: ["React", "Firebase", "Product Management", "SaaS"],
    systemTag: "SAAS PRODUCT",
    status: "LIVE SYSTEM",
    icon: Rocket,
    link: "#",
    github: "https://github.com/Vishantbhardwaj18",
    metric: "3-dev Team Lead",
    stats: { value: "40%", label: "Conflict Reduction" },
    metrics: [
      { value: "3", label: "Dev Team" },
      { value: "MVP", label: "Launch Scope" },
      { value: "40%", label: "Conflict Drop" },
    ],
  },
  {
    title: "MaVionix — AI SaaS Platform for SMEs",
    role: "Co-Founder | Product Management Intern",
    date: "July 2025 - Present",
    description:
      "Contributed to 0-to-1 product development for an AI SaaS platform focused on helping SMEs improve digital workflows, product operations, and decision-making.",
    longDescription:
      "As part of MaVionix, this initiative focused on early-stage AI SaaS product strategy for small and medium businesses. The work included market research, problem analysis, MVP scoping, user-flow design, product documentation, feature prioritization, and roadmap planning across a cross-functional product-development cycle.",
    problem:
      "Small and medium businesses often lack affordable AI-enabled tools for digitizing operations, clarifying workflows, and turning business data into actionable product decisions.",
    solution:
      "A structured AI SaaS product initiative combining user research, MVP definition, workflow mapping, wireframes, roadmap planning, and agile feature prioritization for SME-focused digital solutions.",
    impact:
      "Supported faster product alignment through clearer user flows, sharper requirements, and product documentation that reduced turnaround time for early development cycles.",
    architecture: [
      "Discovery layer: market research, problem analysis, user requirements, and SME workflow mapping",
      "Product layer: MVP scope, feature prioritization, roadmap planning, and agile iteration cycles",
      "Experience layer: user flows, wireframes, journey mapping, and product documentation for development handoff",
      "Collaboration layer: cross-functional coordination across product, design, and engineering workflows",
      "Execution layer: early-stage validation across digital solutions, AI SaaS, and robotics-adjacent product initiatives",
    ],
    tech: ["AI SaaS", "Product Management", "MVP Development", "User Research", "Roadmapping", "Wireframing"],
    systemTag: "AI SAAS",
    status: "LIVE INITIATIVE",
    icon: Database,
    link: "#",
    github: "https://github.com/Vishantbhardwaj18",
    metric: "0-to-1 Product Development",
    stats: { value: "0-1", label: "Product Build" },
    metrics: [
      { value: "SME", label: "Target Users" },
      { value: "MVP", label: "Scope Defined" },
      { value: "TAT", label: "Workflow Gains" },
    ],
  },
  {
    title: "SRM Campus Delivery — Logistics MVP",
    role: "Product Member",
    date: "Sept 2024",
    description:
      "Developed a real-time campus logistics solution during a major hackathon. Focused on persona mapping, user workflows, and defining the initial MVP scope for on-campus deliveries.",
    longDescription:
      "During a 48-hour hackathon, the team designed a last-mile delivery system for campus hostels using an Uber-like delivery partner model. The MVP reduced expected wait times from roughly an hour to under 15 minutes.",
    problem:
      "Campus delivery demand is dense but fragmented, with students losing time to manual coordination and inconsistent delivery availability.",
    solution:
      "A logistics MVP that maps student personas, request flows, delivery partner matching, and quick handoff loops for hostel-scale operations.",
    impact:
      "Created a focused hackathon product concept with a 75% time-saving target and a workflow clear enough for rapid prototyping.",
    architecture: [
      "Persona-led product discovery and workflow mapping",
      "Student delivery partner model for distributed fulfillment",
      "Real-time delivery status and request flow planning",
      "Hackathon MVP scope optimized for fast validation",
    ],
    tech: ["Product Design", "Hackathon", "Workflow Optimization", "Logistics"],
    systemTag: "LOGISTICS MVP",
    status: "PROTOTYPE",
    icon: Box,
    link: "#",
    github: "#",
    metric: "Hackathon Winner",
    stats: { value: "75%", label: "Time Saved" },
    metrics: [
      { value: "48h", label: "Build Sprint" },
      { value: "15m", label: "Target Wait" },
      { value: "75%", label: "Time Saved" },
    ],
  },
  {
    title: "Smart Robotic Pipeline Maintenance Device — Design Registration",
    role: "Applicant | Design Contributor",
    date: "Apr 16, 2026",
    description:
      "Contributed as an applicant to the registered design representation for a Smart Robotic Pipeline Maintenance Device, focused on the device's shape, configuration, and industrial robotics form factor.",
    longDescription:
      "This design registration documents the perspective-view representation of a Smart Robotic Pipeline Maintenance Device. Novelty resides in the shape and configuration of the article as illustrated across the submitted design sheets. The applicant group includes Dr. Amit Kukker, Gaurav Pandey, Vishant Bhardwaj, Maanya Tyagi, and Sweta Gupta.",
    problem:
      "Pipeline maintenance robotics requires not only functional capability, but also a distinct physical configuration that communicates inspection, access, and maintenance intent within constrained industrial environments.",
    solution:
      "A formally documented smart robotic pipeline maintenance device design, emphasizing the external shape, configuration, and article-level visual identity of the robotic system.",
    impact:
      "Strengthens the intellectual-property foundation around the robotic pipeline maintenance concept and captures the industrial design contribution of the applicant team.",
    architecture: [
      "Registration scope: novelty claimed in the shape and configuration of the smart robotic pipeline maintenance device",
      "Representation package: 7 total sheets, with Sheet 1 presenting the perspective view",
      "Applicant group: Dr. Amit Kukker, Gaurav Pandey, Vishant Bhardwaj, Maanya Tyagi, and Sweta Gupta",
      "Registration note: no claim made over mechanical action, construction principle, trademarks, symbols, or illustrative dotted lines/shading",
      "IP representation: filed through Ajay Kaushik, Agent for the Applicant, AKSH IP Associates",
    ],
    tech: ["Robotics", "Industrial Design", "IP", "Pipeline Maintenance", "Product Design"],
    systemTag: "DESIGN IP",
    status: "REGISTERED DESIGN",
    icon: Shield,
    link: "#",
    github: "#",
    metric: "7 Design Sheets",
    stats: { value: "IP", label: "Design Registration" },
    metrics: [
      { value: "07", label: "Total Sheets" },
      { value: "5", label: "Applicants" },
      { value: "2026", label: "Dated Filing" },
    ],
  },
];

const filters = [
  { label: "All", icon: Layers },
  { label: "AI", icon: Bot },
  { label: "Robotics", icon: Cpu },
  { label: "SaaS", icon: Briefcase },
  { label: "Product", icon: Workflow },
];

const heroMetrics = [
  { value: "6", label: "Case Studies", icon: Database },
  { value: "47", label: "Field Missions", icon: Plane },
  { value: "98.6%", label: "Peak Success Rate", icon: Target },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type Project = (typeof projects)[number];

function splitTitle(title: string) {
  const [lead, detail] = title.split("—").map((part) => part.trim());
  return { lead, detail };
}

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const visualRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const iconY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const gridY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.12, 0.96]);
  const scanlineY = useTransform(scrollYProgress, [0, 1], ["-18%", "118%"]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-1.2, 0, 1.2]);

  return (
    <motion.div
      ref={visualRef}
      whileHover={{
        y: -12,
        rotateX: 1.8,
        rotateY: index % 2 === 0 ? -1.8 : 1.8,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="project-visual-card relative aspect-square overflow-hidden rounded-xl border shadow-[0_35px_140px_rgba(15,23,42,0.16)] dark:shadow-[0_35px_140px_rgba(0,0,0,0.5)] lg:aspect-4/5"
    >
      <motion.div
        style={{ y: gridY, rotate: cardRotate }}
        className="absolute -inset-8 bg-[linear-gradient(rgba(198,161,74,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(198,161,74,0.1)_1px,transparent_1px)] bg-[size:34px_34px]"
      />
      <motion.div
        style={{ scale: glowScale }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,161,74,0.4),transparent_40%)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/95 dark:via-black/30 dark:to-black/95" />
      <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.5)_1px,transparent_0)] bg-[size:4px_4px]" />
      <motion.div
        style={{ y: scanlineY }}
        className="absolute left-0 right-0 z-10 h-24 bg-gradient-to-b from-transparent via-gold/20 to-transparent blur-sm"
      />
      <motion.div
        animate={{ x: ["-120%", "130%"] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
        className="absolute inset-y-0 z-10 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent dark:via-white/8"
      />

      <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-gold/30 bg-surface/90 px-3 py-2 backdrop-blur-lg dark:bg-surface/80">
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-2 w-2 rounded-full bg-gold shadow-[0_0_20px_var(--color-gold)]" 
        />
        <span className="text-[9px] font-black uppercase tracking-[0.28em] text-gold">{project.status}</span>
      </div>

      <div className="absolute right-5 top-5 z-20 rounded-full border border-gold/20 bg-surface/90 px-3 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-muted-foreground backdrop-blur-lg dark:bg-surface/75">
        SYS-0{index + 1}
      </div>

      <motion.div style={{ y: iconY }} className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-48 w-48 items-center justify-center rounded-3xl border border-gold/25 bg-gold/[0.06] shadow-[0_0_110px_rgba(198,161,74,0.24)]"
        >
          <span className="absolute -inset-8 border border-gold/8" />
          <span className="absolute h-px w-[150%] bg-gold/20" />
          <span className="absolute h-[150%] w-px bg-gold/20" />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <project.icon className="h-24 w-24 text-gold drop-shadow-[0_0_32px_var(--color-gold)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-background/95 to-transparent p-6">
        <div className="grid grid-cols-3 gap-2">
          {project.metrics.slice(0, 3).map((metric) => (
            <motion.div
              key={metric.label}
              whileHover={{ y: -4, scale: 1.05 }}
              className="project-inner-card rounded-2xl border p-3 backdrop-blur-lg hover:border-gold/40 transition-all"
            >
              <p className="font-display text-lg text-gold">{metric.value}</p>
              <p className="mt-1 text-[8px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const { lead, detail } = splitTitle(project.title);
  const cardRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "end 20%"],
  });
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [26, -18]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18, 0.88, 1], [0.78, 1, 1, 0.86]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.04, 0.16, 0.06]);

  return (
    <motion.article
      ref={cardRef}
      layout
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        style={{ opacity: haloOpacity }}
        className="absolute -inset-10 -z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(198,161,74,0.5),transparent_52%)] blur-2xl"
      />
      <div className="absolute -inset-5 -z-10 border border-muted/10 bg-muted/[0.015] transition-all duration-500 group-hover:border-gold/20 group-hover:bg-gold/[0.025] group-hover:shadow-[0_0_90px_rgba(198,161,74,0.08)] md:-inset-8" />
      <div className="absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-gold/5" />
      <div className="absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-gold/5" />
      <div className="absolute -left-4 top-0 hidden h-full w-px overflow-hidden bg-gold/10 md:block">
        <motion.span
          style={{ scaleY: progressScale }}
          className="block h-full w-full origin-top bg-gold shadow-[0_0_18px_var(--color-gold)]"
        />
      </div>

      <div
        className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
          index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="space-y-8 px-1 lg:col-span-7"
          whileHover={{ x: index % 2 === 0 ? 3 : -3 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        >
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-display text-4xl text-gold/20 md:text-5xl">0{index + 1}</span>
              <div className="h-px min-w-16 flex-1 bg-gold/10" />
              <Badge
                variant="outline"
                className="rounded-lg border-gold/25 bg-gold/5 px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-gold"
              >
                {project.systemTag}
              </Badge>
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-muted-foreground">
                {project.date}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.42em] text-gold/80">{project.role}</p>
              <h3 className="relative inline-block font-heading text-3xl font-bold leading-none tracking-tighter text-foreground transition-colors group-hover:text-gold md:text-5xl lg:text-6xl">
                {lead}
                <span className="absolute -bottom-3 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                {detail && (
                  <span className="mt-3 block font-serif text-xl italic leading-tight tracking-tight text-muted-foreground md:text-2xl lg:text-3xl">
                    — {detail}
                  </span>
                )}
              </h3>
            </div>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-muted-foreground md:text-lg">
            {project.description}
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {[
              { label: "Problem", value: project.problem, icon: Target },
              { label: "Solution", value: project.solution, icon: Zap },
              { label: "Impact", value: project.impact, icon: Gauge },
            ].map(({ label, value, icon: Icon }) => (
              <motion.div
                key={label}
                variants={cardReveal}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 50px rgba(198,161,74,0.1)" }}
                className="project-inner-card rounded-3xl border p-6 transition-all group-hover:border-gold/30 hover:border-gold/40"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-all">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <p className="mb-3 text-[9px] font-black uppercase tracking-[0.28em] text-gold">{label}</p>
                <p className="text-xs leading-6 text-muted-foreground group-hover:text-foreground transition-colors">{value}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 30px_80px_rgba(198,161,74,0.16)" }}
              className="project-inner-card rounded-3xl border p-6 transition-all"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-muted-foreground">
                Primary Metric
              </p>
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-4"
              >
                <p className="font-display text-5xl font-bold text-gold">{project.stats.value}</p>
              </motion.div>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
                {project.stats.label}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 30px_80px_rgba(15,23,42,0.12)" }}
              className="project-inner-card rounded-3xl border p-6 transition-all"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-muted-foreground">Tech Stack</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {project.tech.slice(0, 6).map((tech, i) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -3, scale: 1.08 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-full border border-gold/20 bg-gold/8 px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-gold hover:border-gold/40 hover:bg-gold/12 transition-all"
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.tech.length > 6 && (
                  <span className="rounded-full border border-gold/15 bg-gold/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-gold/60">
                    +{project.tech.length - 6} more
                  </span>
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Magnetic strength={0.18}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button
                  onClick={() => onOpen(project)}
                  size="lg"
                  className="h-14 rounded-lg bg-gradient-to-r from-gold to-gold/90 px-8 text-[10px] font-black uppercase tracking-[0.26em] text-black hover:shadow-[0_20px_60px_rgba(198,161,74,0.3)] transition-all"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Deep Inquiry
                </Button>
              </motion.div>
            </Magnetic>
            <Magnetic strength={0.1}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-lg border-gold/40 px-8 text-[10px] font-black uppercase tracking-[0.26em] glass hover:border-gold hover:bg-gold/10 transition-all"
                >
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Review Core
                  </a>
                </Button>
              </motion.div>
            </Magnetic>
          </div>
        </motion.div>

        <div className={`lg:col-span-5 ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
          <ProjectVisual project={project} index={index} />
        </div>
      </div>
    </motion.article>
  );
}

function DossierModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const modalScrollRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: modalScrollRef });
  const dossierProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 130, damping: 24, mass: 0.35 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 130, damping: 24, mass: 0.35 });
  const leftPanelY = useTransform(smoothMouseY, [-0.5, 0.5], [-18, 18]);
  const rightPanelY = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);
  const iconFloatY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);
  const modalRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [0.8, -0.8]);
  const modalRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-0.8, 0.8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const scrollContainer = modalScrollRef.current;

    if (!scrollContainer) return;

    event.preventDefault();
    scrollContainer.scrollBy({
      top: event.deltaY,
      left: event.deltaX,
      behavior: "auto",
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/82 backdrop-blur-2xl dark:bg-black/92"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX: modalRotateX, rotateY: modalRotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        className="project-section-card relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-xl border shadow-[0_40px_160px_rgba(15,23,42,0.24)] dark:shadow-[0_40px_160px_rgba(0,0,0,0.65)]"
      >
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(198,161,74,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(198,161,74,0.045)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute left-0 right-0 top-0 z-30 h-px bg-gold/10">
          <motion.span
            style={{ scaleX: dossierProgress }}
            className="block h-full origin-left bg-gold shadow-[0_0_18px_var(--color-gold)]"
          />
        </div>
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 rounded-lg border border-gold/20 bg-surface/90 p-3 text-gold transition-colors hover:bg-gold/10 dark:bg-surface/80"
          aria-label="Close dossier"
        >
          <X className="h-5 w-5" />
        </button>

        <div ref={modalScrollRef} className="relative grid max-h-[92vh] overflow-y-auto lg:grid-cols-[0.72fr_1fr]">
          <motion.aside
            style={{ y: leftPanelY }}
            className="border-b border-gold/10 bg-surface/70 p-8 dark:bg-surface/55 lg:border-b-0 lg:border-r"
          >
            <div className="sticky top-8 space-y-8">
              <div className="project-inner-card flex h-52 items-center justify-center rounded-3xl border">
                <motion.div
                  style={{ y: iconFloatY }}
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-32 w-32 items-center justify-center rounded-full border border-gold/20"
                >
                  <span className="absolute -inset-8 border border-gold/5" />
                  <project.icon className="h-16 w-16 text-gold drop-shadow-[0_0_24px_var(--color-gold)]" />
                </motion.div>
              </div>

              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="rounded-lg border-gold/30 bg-gold/5 text-[10px] font-black uppercase tracking-[0.25em] text-gold"
                >
                  Technical Dossier
                </Badge>
                <h2 className="font-heading text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
                  {project.title}
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gold/70">{project.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[project.stats, ...project.metrics].slice(0, 4).map((metric) => (
                  <div key={metric.label} className="project-inner-card rounded-lg border p-4">
                    <p className="font-display text-2xl text-gold">{metric.value}</p>
                    <p className="mt-1 text-[8px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>

          <motion.main
            style={{ y: rightPanelY }}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-8 p-8 md:p-10"
          >
            <motion.section variants={fadeUp} className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-lg border border-gold/20 bg-gold/4 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.24em] text-gold">
                  {project.systemTag}
                </span>
                <span className="rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.24em] text-muted-foreground dark:border-white/10 dark:bg-white/3">
                  {project.status}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-muted-foreground">
                  {project.date}
                </span>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-gold">Overview</h3>
              <p className="text-lg font-light leading-8 text-foreground/82">{project.longDescription}</p>
            </motion.section>

            <motion.section variants={fadeUp} className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Target, title: "Problem", body: project.problem },
                { icon: Zap, title: "Solution", body: project.solution },
                { icon: Gauge, title: "Impact", body: project.impact },
              ].map((item) => (
                <div key={item.title} className="project-inner-card rounded-2xl border p-5">
                  <item.icon className="mb-5 h-5 w-5 text-gold" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.28em] text-gold">{item.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </motion.section>

            <motion.section variants={fadeUp} className="space-y-4">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-gold" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-gold">System Architecture</h3>
              </div>
              <div className="grid gap-3">
                {project.architecture.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * index }}
                    className="project-inner-card flex gap-4 rounded-xl border p-4"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp} className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Activity, label: "Primary Signal", value: project.metric },
                { icon: Radio, label: "System State", value: project.status },
                { icon: Thermometer, label: "Operating Layer", value: project.systemTag },
              ].map((item) => (
                <div key={item.label} className="project-inner-card rounded-xl border p-5">
                  <item.icon className="mb-4 h-5 w-5 text-gold" />
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-foreground">{item.value}</p>
                </div>
              ))}
            </motion.section>

            <motion.section variants={fadeUp} className="space-y-4 border-t border-gold/10 pt-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-gold">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="rounded-lg border border-gold/15 bg-gold/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.section>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 border-t border-gold/10 pt-8">
              <Button
                asChild
                className="rounded-lg bg-gold px-8 text-xs font-black uppercase tracking-[0.22em] text-black hover:bg-foreground hover:text-background"
              >
                <a href={project.link} target="_blank" rel="noreferrer">
                  Project Link <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-lg border-gold/30 px-8 text-xs font-black uppercase tracking-[0.22em] hover:border-gold hover:bg-gold/5"
              >
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Code
                </a>
              </Button>
            </motion.div>
          </motion.main>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [activeTag, setActiveTag] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const heroRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
  });
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 72]);
  const heroOpacity = useTransform(heroScroll, [0, 0.82], [1, 0.58]);
  const heroIconY = useTransform(heroScroll, [0, 1], [0, -70]);
  const heroGlowScale = useTransform(heroScroll, [0, 1], [1, 1.28]);

  const tags = React.useMemo(
    () => ["All", ...Array.from(new Set(projects.flatMap((project) => project.tech))).slice(0, 12)],
    []
  );

  const filteredProjects = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "All" ||
        project.tech.some((tech) => tech.toLowerCase().includes(activeFilter.toLowerCase())) ||
        project.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
        project.description.toLowerCase().includes(activeFilter.toLowerCase()) ||
        project.systemTag.toLowerCase().includes(activeFilter.toLowerCase());

      const matchesTag = activeTag === "All" || project.tech.includes(activeTag);
      const searchable = [
        project.title,
        project.role,
        project.description,
        project.longDescription,
        project.problem,
        project.solution,
        project.impact,
        project.systemTag,
        project.status,
        ...project.tech,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && matchesTag && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeFilter, activeTag, query]);

  return (
    <div className="relative overflow-hidden py-20 lg:py-32">
      <div className="fixed right-4 top-1/2 z-40 hidden h-48 w-px -translate-y-1/2 overflow-hidden bg-gold/10 lg:block">
        <motion.span
          style={{ scaleY: pageProgress }}
          className="block h-full w-full origin-top bg-gold shadow-[0_0_18px_var(--color-gold)]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_0%,rgba(198,161,74,0.12),transparent_34%),radial-gradient(circle_at_18%_42%,rgba(198,161,74,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.08] bg-[linear-gradient(rgba(198,161,74,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(198,161,74,0.3)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.5)_1px,transparent_0)] bg-[size:4px_4px]" />

      <motion.div
        animate={{ scale: [1, 1.16, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-12%] top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-[150px]"
      />
      <motion.div
        animate={{ scale: [1, 1.24, 1], opacity: [0.05, 0.13, 0.05] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[10%] left-[-12%] -z-10 h-[36rem] w-[36rem] rounded-full bg-gold/10 blur-[160px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity }}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="project-section-card relative mb-8 overflow-hidden rounded-3xl border p-5 text-center md:p-8 lg:mb-10 lg:p-9"
        >
          <motion.div
            style={{ scale: heroGlowScale }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(198,161,74,0.32),transparent_38%)]"
          />
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <motion.div
            style={{ y: heroIconY }}
            animate={{ rotate: [0, 5, 0], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-0"
          >
            <Rocket className="h-56 w-56 text-gold/20" />
          </motion.div>

          <motion.div variants={fadeUp} className="relative z-10 mx-auto max-w-5xl text-center">
            <motion.div 
              className="mb-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/30 bg-gold/8 px-4 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-gold backdrop-blur-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.span 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-gold shadow-[0_0_20px_var(--color-gold)]" 
              />
              Product Engineering Showcase
            </motion.div>

            <h1 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="block"
              >
                SELECTED
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12, duration: 0.6, ease: "easeOut" }}
                className="mt-1 block bg-gradient-to-r from-gold via-gold/80 to-gold bg-clip-text text-transparent text-glow"
              >
                WORK.
              </motion.span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-7 text-foreground/90 md:text-lg">
              Building Autonomous Systems, AI Products & Real-World Engineering Solutions
            </p>
            <p className="mx-auto mt-2 max-w-xl text-[10px] font-black uppercase leading-5 tracking-[0.22em] text-gold/70">
              Logic & Hardware / 0 to 1 Systems / Field-Tested Product Thinking
            </p>

            <div className="mx-auto mt-5 grid max-w-2xl gap-2.5 sm:grid-cols-3">
              {heroMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <motion.div 
                    key={metric.label}
                    whileHover={{ y: -8, scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="project-inner-card group rounded-2xl border p-3 hover:border-gold/40 hover:shadow-[0_20px_60px_rgba(198,161,74,0.15)] transition-all"
                  >
                    <motion.div 
                      animate={{ rotate: [0, 6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="mb-1.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15 group-hover:bg-gold/25 transition-all"
                    >
                      <Icon className="h-4 w-4 text-gold" />
                    </motion.div>
                    <p className="font-display text-2xl font-bold text-gold">{metric.value}</p>
                    <p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground transition-colors">
                      {metric.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.header>

        <section className="project-section-card sticky top-20 z-30 mb-20 space-y-5 rounded-3xl border p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, metrics, tech stacks..."
                className="h-13 w-full rounded-2xl border border-gold/25 bg-surface/90 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-gold/50 focus:shadow-[0_0_50px_rgba(198,161,74,0.12)] dark:border-gold/20 dark:bg-surface/80 dark:focus:shadow-[0_0_50px_rgba(198,161,74,0.08)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.label;

                return (
                  <motion.button
                    key={filter.label}
                    onClick={() => setActiveFilter(filter.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative inline-flex h-13 items-center gap-2 overflow-hidden border px-4 text-[10px] font-black uppercase tracking-[0.22em] transition-all md:px-5 ${
                      isActive
                        ? "border-gold bg-gradient-to-r from-gold to-gold/90 text-black shadow-[0_0_40px_rgba(198,161,74,0.4)]"
                        : "border-gold/25 bg-surface/80 text-muted-foreground hover:border-gold/50 hover:text-gold hover:bg-gold/8 dark:bg-surface/70 dark:border-gold/20"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-project-filter"
                        className="absolute inset-0 bg-gradient-to-r from-gold to-gold/90"
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {filter.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex shrink-0 items-center gap-2 text-[9px] font-black uppercase tracking-[0.26em] text-gold">
              <Filter className="h-4 w-4" />
              Skills
            </div>
            {tags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setActiveTag(tag)}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`shrink-0 border px-4 py-2 text-[9px] font-black uppercase tracking-[0.18em] transition-all ${
                  activeTag === tag
                    ? "border-gold bg-gradient-to-r from-gold/20 to-gold/10 text-gold shadow-[0_0_30px_rgba(198,161,74,0.1)]"
                    : "border-gold/20 bg-surface/80 text-muted-foreground hover:border-gold/50 hover:text-gold hover:bg-gold/8 dark:border-gold/15 dark:bg-surface/70 dark:hover:bg-gold/5"
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
          
          {filteredProjects.length > 0 && (
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
              <span className="inline-flex h-2 w-2 rounded-full bg-gold" />
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found
            </div>
          )}
        </section>

        <motion.div layout className="grid grid-cols-1 gap-28">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} onOpen={setSelectedProject} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="project-section-card rounded-3xl border p-12 text-center"
          >
            <Search className="mx-auto mb-4 h-8 w-8 text-gold/40" />
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-gold">No matching systems</p>
            <p className="mt-3 text-sm text-muted-foreground">Try adjusting your search terms or filters to explore more projects.</p>
          </motion.div>
        )}

        <AnimatePresence>{selectedProject && <DossierModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
      </div>
    </div>
  );
}
