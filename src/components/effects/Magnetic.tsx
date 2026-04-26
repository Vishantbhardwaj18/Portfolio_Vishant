import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  range?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.5, range = 100, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distance = Math.sqrt((clientX - centerX) ** 2 + (clientY - centerY) ** 2);
    
    if (distance < range) {
      const x = (clientX - centerX) * strength;
      const y = (clientY - centerY) * strength;
      setPosition({ x, y });
      setIsHovered(true);
    } else {
      setPosition({ x: 0, y: 0 });
      setIsHovered(false);
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20, 
        mass: 0.1,
        duration: 0.3
      }}
      className={`${isHovered ? 'magnetic-active' : ''} ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
