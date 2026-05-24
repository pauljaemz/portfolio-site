import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High performance mouse tracking values that bypass standard React renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring configurations for inertia/trail effect
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Move custom cursor to current viewport coordinates
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // 2. Global event delegation to capture hover triggers dynamically
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-hover'))
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-hover'))
      ) {
        setIsHovered(false);
      }
    };

    // 3. Hide cursor when leaving window viewport
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // If the device does not support hovering (like touchscreens), do not render
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Trailing Fluid Glassmorphic Orb */}
      <motion.div
        style={{
          x: orbX,
          y: orbY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1.0,
          borderColor: isHovered ? 'rgba(245, 158, 11, 0.7)' : 'rgba(0, 255, 204, 0.4)', // Amber vs Cyan
          backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 255, 204, 0.05)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-10 h-10 rounded-full border border-solid backdrop-blur-[2px] shadow-[0_0_15px_rgba(0,255,204,0.1)] mix-blend-screen flex items-center justify-center"
      >
        {/* Glowing aura inside orb */}
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1.0,
            opacity: isHovered ? 0.4 : 0.2,
          }}
          className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-[#00ffcc] to-[#4f46e5] blur-[4px]"
        />
      </motion.div>

      {/* Pinpoint Inner Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.3 : 1.0,
          backgroundColor: isHovered ? '#f59e0b' : '#ffffff', // Amber vs White
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] z-10 bg-white"
      />
    </div>
  );
}
