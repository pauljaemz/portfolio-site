import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FloatingAsset = React.memo(function FloatingAsset({ children, initialLeft, initialTop, className, isGravityActive }) {
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
      initial={{
        left: "50%",
        top: "50%",
        scale: 0.15,
        opacity: 0
      }}
      animate={{
        left: initialLeft,
        top: initialTop,
        scale: 1,
        opacity: 1
      }}
      transition={{
        type: "spring",
        stiffness: 55,
        damping: 13,
        mass: 1.1,
        delay: 0.15 + Math.random() * 0.3
      }}
      style={isGravityActive ? {
        left: initialLeft,
        top: initialTop,
      } : {
        x,
        y,
        left: initialLeft,
        top: initialTop,
      }}
      className={`absolute z-10 select-none pointer-events-none ${className}`}
    >
      {/* Drifting float loop animation applied to inner container */}
      <div className="animate-float">{children}</div>
    </motion.div>
  );
});

export default FloatingAsset;
