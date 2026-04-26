import * as React from "react";
import { useRef, useEffect } from "react";

interface CursorParticlesProps {
  count?: number;
  color?: string;
  size?: number;
}

export function CursorParticles({ count = 4, color = 'var(--color-gold)', size = 2 }: CursorParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const particlePositions = useRef<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     ('ontouchstart' in window) ||
                     (window.innerWidth <= 768);
    
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles
    particlePositions.current = Array.from({ length: count }, (_, i) => ({
      x: mousePos.current.x,
      y: mousePos.current.y,
      delay: i * 0.05
    }));

    const updateParticles = () => {
      particlePositions.current.forEach((particle, i) => {
        const delay = particle.delay;
        const targetX = mousePos.current.x;
        const targetY = mousePos.current.y;

        particle.x += (targetX - particle.x) * (0.1 - delay * 0.02);
        particle.y += (targetY - particle.y) * (0.1 - delay * 0.02);

        if (particlesRef.current[i]) {
          particlesRef.current[i].style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
        }
      });

      requestAnimationFrame(updateParticles);
    };

    updateParticles();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [count]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9998]">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el;
          }}
          className="absolute rounded-full opacity-60"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: color,
            boxShadow: `0 0 ${size * 2}px ${color}`,
            transform: 'translate3d(-50%, -50%, 0)',
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  );
}