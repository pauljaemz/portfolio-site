import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// 6-Stage Evolution Configuration (Omitting Years & Descriptions)
const STAGES = [
  {
    index: "01",
    name: "DON BOSCO",
    sub: "Inception",
    x: 100,
    y: 70
  },
  {
    index: "02",
    name: "NAIPUNNYA COLLEGE",
    sub: "Foundations",
    x: 260,
    y: 130
  },
  {
    index: "03",
    name: "TCS",
    sub: "Scale Lead",
    x: 420,
    y: 50
  },
  {
    index: "04",
    name: "CUSAT",
    sub: "AI Specialist",
    x: 580,
    y: 150
  },
  {
    index: "05",
    name: "dreamsmith",
    sub: "Founder / Incubator",
    x: 740,
    y: 65
  },
  {
    index: "06",
    name: "THE FUTURE",
    sub: "Infinite Stream",
    isFuture: true,
    x: 900,
    y: 135
  }
];

// Alternate Unrealized Destinies
const ALTERNATE_STAGES = [
  {
    index: "01_ALT",
    name: "B.H.S",
    sub: "[DIVERGED]",
    x: 180,
    y: 20,
    labelPosition: "up",
    pathD: "M 100 70 C 120 70, 140 40, 160 30 C 170 25, 175 20, 180 20"
  },
  {
    index: "02_ALT",
    name: "FISAT",
    sub: "[DIVERGED]",
    x: 340,
    y: 190,
    labelPosition: "down",
    pathD: "M 260 130 C 280 130, 295 165, 310 175 C 320 180, 330 190, 340 190"
  },
  {
    index: "03_ALT",
    name: "infy",
    sub: "[UNREALIZED]",
    x: 500,
    y: 5,
    labelPosition: "up",
    pathD: "M 420 50 C 440 50, 460 25, 480 15 C 490 10, 495 5, 500 5"
  },
  {
    index: "04_ALT",
    name: "SASTRA",
    sub: "[DIVERGED]",
    x: 660,
    y: 195,
    labelPosition: "down",
    pathD: "M 580 150 C 600 150, 615 175, 630 185 C 642 190, 650 195, 660 195"
  },
  {
    index: "05_ALT",
    name: "IBM",
    sub: "[UNREALIZED]",
    x: 820,
    y: 20,
    labelPosition: "up",
    pathD: "M 740 65 C 760 65, 780 40, 800 30 C 810 25, 815 20, 820 20"
  }
];

// MilestoneNode sub-component to link each node reveal directly to scroll-driven line growth
function MilestoneNode({ stage, pathLength }) {
  const nodeX = stage.x;
  const nodeY = stage.y;
  const isUp = stage.y < 100;

  // The active path starts at the right (x = 1000) and grows leftward to x = 0.
  // The progress along the line is t = (1000 - stage.x) / 1000.
  const t = (1000 - stage.x) / 1000;

  // Directly link opacity, scale, and vertical float offsets to path progress
  const opacity = useTransform(pathLength, [t - 0.05, t], [0, 1]);
  const scale = useTransform(pathLength, [t - 0.05, t], [0, 1]);
  const yOffset = useTransform(pathLength, [t - 0.05, t], [isUp ? -12 : 12, 0]);

  return (
    <g>
      {/* Glowing circular node stop */}
      <motion.circle
        cx={nodeX}
        cy={nodeY}
        r="6.5"
        fill={stage.isFuture ? "transparent" : "#7B61FF"}
        stroke="#7B61FF"
        strokeWidth="2.5"
        style={{
          scale,
          opacity,
          filter: stage.isFuture 
            ? "drop-shadow(0 0 8px rgba(123,97,255,0.6))" 
            : "drop-shadow(0 0 12px rgba(123,97,255,0.4))"
        }}
        className={stage.isFuture ? "animate-pulse" : ""}
      />
      <motion.circle
        cx={nodeX}
        cy={nodeY}
        r="13"
        stroke="var(--color-dark-navy)"
        strokeWidth="1"
        strokeOpacity="0.08"
        style={{
          scale,
          opacity
        }}
      />

      {/* Alternating Labels Group */}
      <motion.g style={{ opacity, y: yOffset }}>
        {/* Large Stage Station Name */}
        <text
          x={nodeX}
          y={isUp ? nodeY - 16 : nodeY + 28}
          textAnchor="middle"
          className="font-display font-black text-[12px] md:text-[14px] fill-dark-navy tracking-wider md:tracking-widest uppercase hover:fill-[#7B61FF] transition-colors duration-300 select-none cursor-pointer"
        >
          {stage.name}
        </text>
      </motion.g>
    </g>
  );
}

export default function EvolutionPath() {
  const containerRef = React.useRef(null);
  
  // Track scroll progress of this timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 1. Luxury Cinematic Title entrance: slide, fade, scale, and character-assembly
  const headerY = useTransform(scrollYProgress, [0.1, 0.35, 1.0], [30, 0, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.3, 1.0], [0, 1, 1]);
  const headerScale = useTransform(scrollYProgress, [0.1, 0.35, 1.0], [0.92, 1.0, 1.0]);
  const letterSpacing = useTransform(scrollYProgress, [0.1, 0.35, 1.0], ["0.1em", "-0.025em", "-0.025em"]);

  // 2. Holographic 3D Pitch Tilt (Tilts panel forward/backward, locks flat in center)
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1.0], [22, 0, 0]);
  
  // 3. Dynamic Ambient Glow scale & color warp (locks in center)
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1.0], [0.9, 1.15, 1.15]);

  // 4. Causal Timeline Line Growth (grows as you scroll, then locks fully grown)
  const pathLength = useTransform(scrollYProgress, [0.15, 0.5, 1.0], [0, 1, 1]);

  return (
    <section 
      ref={containerRef}
      className="w-full flex flex-col justify-center items-center relative bg-transparent border-t border-dark-navy/5 overflow-hidden pt-12 pb-24 px-0"
    >
      {/* Ambient background backglows (Linked to scroll scale) */}
      <motion.div 
        style={{ scale: glowScale }}
        className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#FF6B35]/[0.03] rounded-full blur-[110px] pointer-events-none -z-10" 
      />
      <motion.div 
        style={{ scale: glowScale }}
        className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-[#7B61FF]/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" 
      />

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none -z-10" />

      {/* Unified 3D Holographic Control Deck */}
      <motion.div 
        style={{ 
          transformPerspective: 1200,
          rotateX,
          transformStyle: "preserve-3d"
        }}
        className="w-full max-w-none flex flex-col items-center justify-center bg-transparent py-12 px-0 border-y border-dark-navy/5 relative"
      >
        
        {/* Section Header */}
        <div className="mb-12 text-center pointer-events-none select-none px-6 md:px-12 lg:px-24">
          <motion.h3 
            style={{ 
              y: headerY,
              opacity: headerOpacity,
              scale: headerScale,
              letterSpacing
            }}
            className="text-4xl md:text-6xl font-display font-black mb-2 text-dark-navy origin-center"
          >
            The Destiny
          </motion.h3>
        </div>

        {/* Responsive Horizontal SVG Viewport Container (Perfect scale-to-fit on all screens, no swiping) */}
        <div className="w-full relative px-4 md:px-12 lg:px-24 select-none overflow-visible py-4">
            
            {/* SVG Horizontal Route Map */}
            <svg 
              className="w-full h-[260px] overflow-visible evolution-svg"
              viewBox="0 0 1000 240" 
              fill="none"
              preserveAspectRatio="none"
              style={{ filter: "drop-shadow(0px 3px 8px rgba(26,26,46,0.12))" }}
            >
              <style>{`
                .route-pulse-line {
                  stroke-dasharray: 8, 15;
                }
              `}</style>

              <defs>
                {/* Neon Glow Filter */}
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                {/* Fade out gradient for the future dashed path */}
                <linearGradient id="fadeRight" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.0" />
                </linearGradient>

                {/* SVG Mask for smooth right-to-left draw reveal of active path */}
                <mask id="drawMask">
                  <motion.path
                    d="M 1000 100 C 980 100, 970 120, 940 115 C 930 110, 915 135, 900 135 C 870 135, 830 85, 810 95 C 790 105, 760 65, 740 65 C 710 65, 670 125, 650 115 C 630 105, 600 150, 580 150 C 550 150, 510 80, 490 90 C 470 100, 440 50, 420 50 C 390 50, 350 115, 330 105 C 310 95, 280 130, 260 130 C 220 130, 190 85, 170 95 C 150 105, 120 70, 100 70 C 85 70, 70 90, 55 95 C 40 100, 20 110, 0 110"
                    stroke="white"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    style={{ pathLength }}
                  />
                </mask>
              </defs>

              {/* Alternate Faded Timelines (Unrealized Destinies) */}
              {ALTERNATE_STAGES.map((altStage, idx) => {
                const delay = 0.8 + idx * 0.3; // Staggered delay for alternate paths
                const nodeX = altStage.x;
                const nodeY = altStage.y;
                const isUp = altStage.labelPosition === "up";

                return (
                  <g key={altStage.name}>
                    {/* Branch Curve Line */}
                    <motion.path
                      d={altStage.pathD}
                      stroke="white"
                      strokeWidth="1.2"
                      strokeOpacity="0.4"
                      strokeDasharray="3,4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: delay - 0.2 }}
                    />

                    {/* Dim alternate circular node */}
                    <motion.circle
                      cx={nodeX}
                      cy={nodeY}
                      r="4.5"
                      fill="transparent"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeOpacity="0.65"
                      strokeDasharray="2,2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 120, damping: 14, delay }}
                      className="animate-pulse"
                      style={{ animationDuration: "3s" }}
                    />

                    {/* Faded label groups */}
                    <motion.g
                      initial={{ opacity: 0, y: isUp ? -10 : 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.1 }}
                    >
                      {/* Alternate Stage Name (faded white/grey) */}
                      <text
                        x={nodeX}
                        y={isUp ? nodeY - 14 : nodeY + 24}
                        textAnchor="middle"
                        className="font-display font-bold text-[10px] md:text-[10px] fill-dark-navy/40 tracking-wider md:tracking-widest uppercase select-none cursor-help hover:fill-dark-navy/60 transition-colors"
                      >
                        {altStage.name}
                      </text>
                    </motion.g>
                  </g>
                );
              })}

              {/* 1. Faint Background Dotted Curved Path */}
              <path
                d="M 1000 100 C 980 100, 970 120, 940 115 C 930 110, 915 135, 900 135 C 870 135, 830 85, 810 95 C 790 105, 760 65, 740 65 C 710 65, 670 125, 650 115 C 630 105, 600 150, 580 150 C 550 150, 510 80, 490 90 C 470 100, 440 50, 420 50 C 390 50, 350 115, 330 105 C 310 95, 280 130, 260 130 C 220 130, 190 85, 170 95 C 150 105, 120 70, 100 70 C 85 70, 70 90, 55 95 C 40 100, 20 110, 0 110"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.15"
                strokeDasharray="4,6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* 2. Soft Ambient White Glow Path underneath (masked) */}
              <path
                d="M 1000 100 C 980 100, 970 120, 940 115 C 930 110, 915 135, 900 135 C 870 135, 830 85, 810 95 C 790 105, 760 65, 740 65 C 710 65, 670 125, 650 115 C 630 105, 600 150, 580 150 C 550 150, 510 80, 490 90 C 470 100, 440 50, 420 50 C 390 50, 350 115, 330 105 C 310 95, 280 130, 260 130 C 220 130, 190 85, 170 95 C 150 105, 120 70, 100 70 C 85 70, 70 90, 55 95 C 40 100, 20 110, 0 110"
                stroke="white"
                strokeWidth="6"
                strokeOpacity="0.2"
                filter="url(#neonGlow)"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                mask="url(#drawMask)"
              />

              {/* 3. Crisp White Core Path (masked) */}
              <path
                d="M 1000 100 C 980 100, 970 120, 940 115 C 930 110, 915 135, 900 135 C 870 135, 830 85, 810 95 C 790 105, 760 65, 740 65 C 710 65, 670 125, 650 115 C 630 105, 600 150, 580 150 C 550 150, 510 80, 490 90 C 470 100, 440 50, 420 50 C 390 50, 350 115, 330 105 C 310 95, 280 130, 260 130 C 220 130, 190 85, 170 95 C 150 105, 120 70, 100 70 C 85 70, 70 90, 55 95 C 40 100, 20 110, 0 110"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                mask="url(#drawMask)"
              />

              {/* 4. Elegant Static White Dashed Core Path (masked) */}
              <path
                d="M 1000 100 C 980 100, 970 120, 940 115 C 930 110, 915 135, 900 135 C 870 135, 830 85, 810 95 C 790 105, 760 65, 740 65 C 710 65, 670 125, 650 115 C 630 105, 600 150, 580 150 C 550 150, 510 80, 490 90 C 470 100, 440 50, 420 50 C 390 50, 350 115, 330 105 C 310 95, 280 130, 260 130 C 220 130, 190 85, 170 95 C 150 105, 120 70, 100 70 C 85 70, 70 90, 55 95 C 40 100, 20 110, 0 110"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.8"
                className="route-pulse-line"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                mask="url(#drawMask)"
              />

              {/* Vector arrowhead pointing into the future (white) */}
              <polygon
                points="979,96 979,104 987,100"
                fill="white"
                opacity="0.3"
              />

              {/* 4. Milestone Station Nodes & Alternating Typography (Linked to scroll growth) */}
              {STAGES.map((stage) => (
                <MilestoneNode key={stage.name} stage={stage} pathLength={pathLength} />
              ))}
            </svg>
        </div>

      </motion.div>
    </section>
  );
}
