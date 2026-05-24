import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function FloatingAsset({ children, initialLeft, initialTop, className, isGravityActive }) {
  const ref = useRef(null);

  // Baseline coordinates representing mouse repulsion displacement offsets
  const repelX = useMotionValue(0);
  const repelY = useMotionValue(0);

  // Spring animations for clean natural inertia/return physics
  const springConfig = { damping: 22, stiffness: 100, mass: 0.9 };
  const x = useSpring(repelX, springConfig);
  const y = useSpring(repelY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();

      // Calculate center coordinate of this floating asset on the screen
      const assetCenterX = rect.left + rect.width / 2;
      const assetCenterY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Vector displacement from cursor to asset center
      const dx = assetCenterX - mouseX;
      const dy = assetCenterY - mouseY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const threshold = 220; // Proximity threshold to trigger repulsion

      if (distance < threshold) {
        // Normalize displacement vector
        const dirX = dx / (distance || 1);
        const dirY = dy / (distance || 1);

        // Repel force increases exponentially the closer the cursor gets
        const force = (threshold - distance) * 0.75; // Sensitivity factor

        repelX.set(dirX * force);
        repelY.set(dirY * force);
      } else {
        // Smoothly spring back to baseline
        repelX.set(0);
        repelY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [repelX, repelY]);

  return (
    <motion.div
      ref={ref}
      initial={{ left: '50%', top: '50%', opacity: 0, scale: 0.4 }}
      animate={isGravityActive ? {} : {
        left: initialLeft,
        top: initialTop,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: 'spring',
        damping: 18,
        stiffness: 75,
        mass: 1.1,
        delay: Math.random() * 0.18, // Organically staggered delay
      }}
      style={isGravityActive ? {
        left: initialLeft,
        top: initialTop,
      } : {
        x,
        y,
        // left and top are handled by the animate prop for spring entrance
      }}
      className={`absolute z-10 select-none pointer-events-none ${className}`}
    >
      {/* Drifting float loop animation applied to inner container */}
      <div className="animate-float">{children}</div>
    </motion.div>
  );
}
