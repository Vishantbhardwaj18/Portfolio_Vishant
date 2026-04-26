import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const logs = [
  "SYSTEM INIT", "LOADING MODULES...", "HEURISTICS ACTIVE", 
  "PARSING PRODUCT DATA", "OPTIMIZING LOGIC", "ROBOTICS PROTOCOL SET",
  "SAAS PIPELINES SECURE", "0 TO 1 READY", "LATENCY 1.2MS",
  "INTERACTIVE MODE ON", "GRID SYNCED", "METRICS CALIBRATED"
];

export function TechnicalLog() {
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = logs[Math.floor(Math.random() * logs.length)];
      setCurrentLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-[60] pointer-events-none hidden lg:block">
      <div className="font-mono text-[8px] space-y-1 text-gold/30">
        <AnimatePresence mode="popLayout">
          {currentLogs.map((log, i) => (
            <motion.div
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5 }}
            >
              {`> ${log}`}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
