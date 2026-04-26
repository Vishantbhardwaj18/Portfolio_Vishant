import * as React from "react";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  className?: string;
  suffix?: string;
}

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
  suffix = ""
}: NumberTickerProps) {
  const [currentValue, setCurrentValue] = useState(0);
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
  });

  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      spring.set(value);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [value, spring, delay]);

  return (
    <span className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
