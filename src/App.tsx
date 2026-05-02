import * as React from "react"
import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider, useTheme } from "./components/theme-provider";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Lenis from "lenis";
import { CursorParticles } from "./components/effects/CursorParticles";
import Chatbot from "./components/Chatbot";

function SmoothScrollController() {
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, {
          duration: 0.75,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 60);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

function GlobalEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorCurrentPos = useRef({ x: 0, y: 0 });
  const followerCurrentPos = useRef({ x: 0, y: 0 });
  const lastMouseUpdateRef = useRef(0);
  const hoveredElementRef = useRef<HTMLElement | null>(null);

  // Check if device is mobile/touch
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   ('ontouchstart' in window) || 
                   (window.innerWidth <= 768);

  useEffect(() => {
    if (isMobile) return; // Disable custom cursor on mobile

    // Debounced mouse move handler (update cursor position more efficiently)
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // Throttle to ~60fps
      if (now - lastMouseUpdateRef.current > 16) {
        mousePos.current = { x: e.clientX, y: e.clientY };
        lastMouseUpdateRef.current = now;
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) cursorRef.current.classList.add("clicking");
    };;

    const handleMouseUp = () => {
      if (cursorRef.current) cursorRef.current.classList.remove("clicking");
    };

    // Optimized mouse over handler with element caching
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Only update if we've moved to a different element
      if (hoveredElementRef.current === target) return;
      hoveredElementRef.current = target;
      
      const isInteractive = target.closest('button, a, [role="button"], input, textarea, [data-magnetic]');
      
      if (isInteractive) {
        cursorRef.current?.classList.add("active", "interactive");
        followerRef.current?.classList.add("hovering", "interactive");
        cursorRef.current?.classList.remove("text-hover");
        followerRef.current?.classList.remove("text-hover");
      } else {
        cursorRef.current?.classList.remove("active", "interactive", "text-hover");
        followerRef.current?.classList.remove("hovering", "interactive", "text-hover");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    // Smooth movement loop
    let rafId: number;
    const updatePositions = () => {
      // Lerp for inner cursor (fast)
      cursorCurrentPos.current.x += (mousePos.current.x - cursorCurrentPos.current.x) * 0.25;
      cursorCurrentPos.current.y += (mousePos.current.y - cursorCurrentPos.current.y) * 0.25;

      // Lerp for follower (slower trailing)
      followerCurrentPos.current.x += (mousePos.current.x - followerCurrentPos.current.x) * 0.15;
      followerCurrentPos.current.y += (mousePos.current.y - followerCurrentPos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorCurrentPos.current.x}px, ${cursorCurrentPos.current.y}px, 0)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerCurrentPos.current.x}px, ${followerCurrentPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(updatePositions);
    };
    updatePositions();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [theme]);

  return (
    <>
      {!isMobile && (
        <>
          <div ref={cursorRef} className="custom-cursor" />
          <div ref={followerRef} className="cursor-follower" />
          <CursorParticles count={4} color="var(--color-gold)" size={3} />
        </>
      )}
    </>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="route-page min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <Router>
        <SmoothScrollController />
        <div className="site-shell flex flex-col min-h-screen text-foreground selection:bg-gold/30 selection:text-gold">
          <div className="animated-page-bg" aria-hidden="true">
            <span className="animated-page-bg__orb animated-page-bg__orb--one" />
            <span className="animated-page-bg__orb animated-page-bg__orb--two" />
            <span className="animated-page-bg__orb animated-page-bg__orb--three" />
            <span className="animated-page-bg__orb animated-page-bg__orb--four" />
            <span className="animated-page-bg__beam" />
          </div>
          <GlobalEffects />
          <Navbar />
          <main className="flex-grow pt-20">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/experience" element={<PageWrapper><Experience /></PageWrapper>} />
                <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}
