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
    <nav className="sticky top-0 left-0 right-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm transition-transform duration-500 group-hover:-translate-y-0.5">
              <span className="font-heading text-lg font-semibold">VB</span>
            </div>
            <span className="font-semibold uppercase tracking-[0.2em] text-subtext text-xs hidden sm:inline">Vishant Bhardwaj</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm uppercase tracking-[0.2em] transition-colors duration-200 py-1",
                  location.pathname === item.path
                    ? "text-primary font-semibold"
                    : "text-subtext hover:text-text"
                )}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
            <div className="flex items-center space-x-3 pl-4 border-l border-border/70">
              <Button asChild variant="default" size="sm" className="hidden lg:inline-flex rounded-2xl border border-border bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold tracking-[0.16em]">
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
             className="md:hidden bg-background border-b border-border"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
