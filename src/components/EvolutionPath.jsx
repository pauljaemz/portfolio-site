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

// MilestoneNode sub-component
function MilestoneNode({ stage, pathLength }) {
  const nodeX = stage.x;
  const nodeY = stage.y;
  const isUp = stage.y < 100;

  const t = (1000 - stage.x) / 1000;

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
        fill={stage.isFuture ? "transparent" : "currentColor"}
        stroke="currentColor"
        strokeWidth="2.5"
        style={{
          scale,
          opacity
        }}
        className={stage.isFuture ? "animate-pulse" : ""}
      />
      <motion.circle
        cx={nodeX}
        cy={nodeY}
        r="13"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.15"
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
          className="font-display font-black text-[12px] md:text-[14px] fill-current tracking-wider md:tracking-widest uppercase select-none cursor-pointer"
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

  // Holographic 3D Pitch Tilt
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1.0], [22, 0, 0]);
  
  // Timeline Line Growth
  const pathLength = useTransform(scrollYProgress, [0.15, 0.5, 1.0], [0, 1, 1]);

  const renderTimelineSVG = () => {
    return (
      <svg 
        className="w-full h-[260px] overflow-visible evolution-svg"
        viewBox="0 0 1000 240" 
        fill="none"
        preserveAspectRatio="none"
      >
        <style>{`
          .route-pulse-line {
            stroke-dasharray: 8, 15;
          }
        `}</style>

        <defs>
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
                stroke="currentColor"
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
                {/* Alternate Stage Name */}
                <text
                  x={nodeX}
                  y={isUp ? nodeY - 14 : nodeY + 24}
                  textAnchor="middle"
                  className="font-display font-bold text-[10px] md:text-[10px] fill-current opacity-40 tracking-wider md:tracking-widest uppercase select-none cursor-help hover:opacity-75 transition-opacity"
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
          strokeOpacity="0.15"
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

        {/* 4. Milestone Station Nodes & Alternating Typography */}
        {STAGES.map((stage) => (
          <MilestoneNode key={stage.name} stage={stage} pathLength={pathLength} />
        ))}
      </svg>
    );
  };

  const renderTimelineContent = (colorClass) => {
    return (
      <div className={`w-full flex flex-col items-center justify-center ${colorClass}`}>
        {/* Section Header - Centered */}
        <div className="mb-12 w-full text-center select-none pointer-events-none flex flex-col items-center">
          <h2 className="font-mono text-xs tracking-widest font-black uppercase mb-3">
            // TIMELINE // EVOLUTION_LOG
          </h2>
          <h3 className="text-4xl md:text-6xl font-display font-black tracking-tight">
            The Destiny.
          </h3>
        </div>

        {/* Responsive Horizontal SVG Viewport Container (Perfect scale-to-fit on all screens, no swiping) */}
        <div className="w-full relative px-4 md:px-12 lg:px-24 select-none overflow-visible py-4 h-[280px]">
          {renderTimelineSVG()}
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="w-full flex flex-col justify-center items-center relative bg-transparent border-t border-white/10 overflow-hidden pt-12 pb-24 px-0"
    >
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      {/* Unified 3D Holographic Control Deck */}
      <motion.div 
        style={{ 
          transformPerspective: 1200,
          rotateX,
          transformStyle: "preserve-3d"
        }}
        className="w-full max-w-none flex flex-col items-center justify-center bg-transparent py-12 px-0 border-y border-white/10 relative"
      >
        <div className="relative w-full">
          {/* Layout Driver (Invisible) */}
          <div className="opacity-0 pointer-events-none select-none w-full">
            {renderTimelineContent("")}
          </div>

          {/* Left Column Layer: Light Pink */}
          <div className="absolute left-0 top-0 bottom-0 w-[50vw] overflow-hidden text-light-pink stroke-light-pink fill-light-pink pointer-events-none select-none z-10">
            <div className="w-screen h-full text-inherit fill-inherit stroke-inherit relative">
              {renderTimelineContent("text-light-pink")}
            </div>
          </div>

          {/* Right Column Layer: Dark Coral */}
          <div className="absolute left-[50vw] top-0 bottom-0 w-[50vw] overflow-hidden text-dark-coral stroke-dark-coral fill-dark-coral pointer-events-none select-none z-10">
            <div 
              className="w-screen h-full text-inherit fill-inherit stroke-inherit relative"
              style={{ left: '-50vw' }}
            >
              {renderTimelineContent("text-dark-coral")}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
