import * as React from "react"
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Rocket } from "lucide-react";
import { useTheme } from "@/src/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[90] border-b-2 border-primary/35 bg-background/90 backdrop-blur-xl shadow-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gradient-spectrum opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-2px] h-1 gradient-spectrum opacity-95 shadow-[0_0_18px_rgba(var(--primary-rgb),0.35)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl colorful-border text-primary shadow-sm transition-transform duration-500 group-hover:-translate-y-0.5">
              <span className="font-heading text-lg font-semibold">VB</span>
            </div>
            <span className="font-semibold uppercase tracking-[0.2em] text-subtext text-xs hidden sm:inline group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-violet-500 group-hover:to-rose-500 group-hover:bg-clip-text group-hover:text-transparent">Vishant Bhardwaj</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative text-sm uppercase tracking-[0.2em] transition-colors duration-200 py-1",
                  location.pathname === item.path
                    ? "text-primary font-semibold"
                    : "text-subtext hover:text-text"
                )}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full gradient-spectrum"
                  />
                )}
              </Link>
            ))}
            <div className="flex items-center space-x-3 pl-4 border-l border-border/70">
              <Button asChild variant="default" size="sm" className="hidden lg:inline-flex rounded-2xl border border-border gradient-spectrum text-primary-foreground px-4 py-2 text-xs font-semibold tracking-[0.16em] shadow-[0_14px_40px_rgba(var(--primary-rgb),0.16)]">
                <Link to="/resume">
                  <Rocket className="h-3 w-3" /> Resume
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl border border-border/70 bg-surface/80 text-subtext hover:bg-surface hover:text-text"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" || theme === "system" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
             <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl border border-border/70 bg-surface/80 text-subtext hover:bg-surface hover:text-text"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" || theme === "system" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            <Button variant="ghost" size="icon" className="rounded-2xl border border-border/70 bg-surface/80 text-subtext hover:bg-surface hover:text-text" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             exit={{ opacity: 0, height: 0 }}
             className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-4 text-xs font-black uppercase tracking-[0.4em] transition-all",
                    location.pathname === item.path ? "text-primary bg-primary/10 border-l-4 border-primary" : "text-subtext hover:text-primary hover:bg-surface"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/resume"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-4 text-xs font-black uppercase tracking-[0.4em] transition-all",
                  location.pathname === "/resume" ? "text-primary bg-primary/10 border-l-4 border-primary" : "text-subtext hover:text-primary hover:bg-surface"
                )}
              >
                Resume
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
