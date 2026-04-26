import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Layers, GraduationCap } from "lucide-react";

const thoughts = [
  {
    title: "The 0 to 1 Framework for Robotic Startups",
    date: "April 2026",
    readTime: "5 min read",
    tag: "Strategy",
    progress: "58%",
    preview: "AI systems, data flow, and product motion",
    icon: Zap,
    colorVariant: "blue-teal",
  },
  {
    title: "Building SaaS for Domain-Specific Logistics",
    date: "March 2026",
    readTime: "8 min read",
    tag: "Product",
    progress: "74%",
    preview: "Smart logistics dashboards and predictive pipelines",
    icon: Layers,
    colorVariant: "purple-pink",
  },
  {
    title: "Why IIT Madras + SRM is My Power Move",
    date: "Feb 2026",
    readTime: "4 min read",
    tag: "Personal",
    progress: "42%",
    preview: "Future-proofing growth through academic strategy",
    previewImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzAYwPM0Ud5tVZ5a5AvmDvuXhbbKvigU2t_zybnzE8Ce6y1xQaNqL0jsJLCWWdNOspuxTYmZ5k6eWmT2WPQhW-IkA7WIkEqYDsdUdQTY52v4WuZfWGUr9Yr7iI_JILadCrwLGYPy8aqC8o6R6EvIjpowMZhzcu97fU8QLs-HocjEbncBIPbAj5ZBXX1w/w354-h247/Gemini_Generated_Image_b1uxk1b1uxk1b1ux%20(1).png",
    url: "https://vishantbhardwaj.blogspot.com/2026/04/why-iit-madras-management-data-science.html",
    icon: GraduationCap,
    colorVariant: "amber-orange",
  },
];

const cardTransition: { duration: number; ease: [number, number, number, number] } = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };
const blogUrl = "https://vishantbhardwaj.blogspot.com";

const redirectToBlog = (button?: HTMLButtonElement) => {
  if (button) button.style.transform = "scale(0.95)";

  setTimeout(() => {
    window.open(blogUrl, "_blank");
    if (button) button.style.transform = "";
  }, 150);
};

function ThoughtCard({ post, index }: { post: typeof thoughts[number]; index: number }) {
  const cardRef = React.useRef<HTMLElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !cardRef.current) return;

    const x = Math.max(6, Math.min(94, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(6, Math.min(94, ((event.clientY - rect.top) / rect.height) * 100));

    cardRef.current.style.setProperty("--glow-left", `${x}%`);
    cardRef.current.style.setProperty("--glow-top", `${y}%`);
    cardRef.current.style.setProperty("--glow-opacity", "1");
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--glow-opacity", "0");
  };

  React.useEffect(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--progress", post.progress);
  }, [post.progress]);

  const handleRedirectClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (post.url) {
      window.open(post.url, "_blank");
      return;
    }

    redirectToBlog(event.currentTarget);
  };

  return (
    <motion.article
      ref={cardRef}
      className={`thought-card group thought-card--${post.colorVariant}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...cardTransition, delay: index * 0.12 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="thought-card-cursor-glow" />
      <div className="thought-card-bg-icon">
        <post.icon className="h-full w-full" style={{ opacity: 0.08 }} />
      </div>
      <div className="thought-card-content">
        <div className="thought-card-preview">
          {post.previewImage ? (
            <img
              src={post.previewImage}
              alt={`${post.title} preview`}
              className="h-full w-full object-cover"
            />
          ) : null}
          <div className="thought-card-preview-label">AI Preview</div>
        </div>

        <div className="space-y-3 mt-4">
          <span className="thought-card-badge">{post.tag}</span>
          <h3 className="thought-card-title text-2xl">{post.title}</h3>
          <p className="text-sm text-(--text-secondary) max-w-md">{post.preview}</p>
        </div>

        <div className="mt-auto pt-6">
          <button
            type="button"
            className="read-article-btn inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em]"
            aria-label="Read full article"
            onClick={handleRedirectClick}
          >
            Read Article <ArrowRight className="h-4 w-4 transition-transform duration-300" />
          </button>
          <div className="thought-card-progress" aria-hidden="true">
            <div className="thought-card-progress-fill" />
          </div>
          <div className="mt-4 text-[0.69rem] uppercase tracking-[0.22em] text-(--text-secondary)">
            {post.date} · {post.readTime}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ThoughtsSection() {
  const handleReadAllClick = () => redirectToBlog();

  return (
    <section className="thoughts-section relative py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <h2 className="thoughts-heading-title text-5xl sm:text-6xl lg:text-7xl">THOUGHTS</h2>
            <p className="thoughts-copy uppercase tracking-[0.34em] text-xs font-black">Digital Garden & Insights</p>
          </div>
          <button
            id="read-all-btn"
            type="button"
            aria-label="Read full article"
            className="read-all-btn inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-primary"
            onClick={handleReadAllClick}
          >
            Read all articles <ArrowRight className="h-4 w-4 transition-transform duration-300" />
          </button>
        </div>

        <div className="thoughts-grid">
          {thoughts.map((post, index) => (
            <ThoughtCard key={post.title} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
