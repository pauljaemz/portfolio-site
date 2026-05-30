import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';

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

  const t = stage.x / 1000;

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


export default function EvolutionPath({ customTransformY, isSnapping }) {
  const containerRef = React.useRef(null);
  const boundsRef = React.useRef({ start: 2700, end: 4000 });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        const offsetTop = containerRef.current.offsetTop;
        const height = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight || 900;
        
        // Calibrate start and end dynamically based on element position
        boundsRef.current = {
          start: offsetTop - viewportHeight, // starts exactly as it enters the viewport
          end: offsetTop + height - 200
        };
      }
    };
    
    updateBounds();
    window.addEventListener('resize', updateBounds);
    const t1 = setTimeout(updateBounds, 500);
    const t2 = setTimeout(updateBounds, 1500);
    return () => {
      window.removeEventListener('resize', updateBounds);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  
  // Track scroll progress of this timeline section
  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dynamically map independent viewport translations (lagging spring-driven scrolling)
  const mappedProgress = useTransform(customTransformY || new useMotionValue(0), (y) => {
    if (customTransformY) {
      const scrollY = -y;
      const { start, end } = boundsRef.current;
      const progress = (scrollY - start) / (end - start);
      return Math.max(0, Math.min(progress, 1));
    }
    return 0;
  });

  const scrollYProgress = customTransformY ? mappedProgress : localProgress;

  // Holographic 3D Pitch Tilt
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1.0], [!isMobile ? 22 : 0, 0, 0]);
  
  // Timeline Line Growth (Reduced starting delay to 0.25)
  const pathLength = useTransform(scrollYProgress, [0.25, 0.60, 1.0], [0, 1, 1]);
  const futurePathLength = useTransform(scrollYProgress, [0.60, 0.85], [0, 1]);

  const renderTimelineSVG = (colorClass = '') => {
    const suffix = colorClass.trim().replace(/[^a-zA-Z0-9-]/g, '-') || 'layout';
    const stripesId = `stripes-${suffix}`;

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
          {/* Pattern for dark coral pink and light pink stripes */}
          <pattern id={stripesId} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="16" fill="#E55B6C" />
            <rect x="8" width="8" height="16" fill="#FFD1DC" />
          </pattern>
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
                stroke="currentColor"
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

        {/* 1. Faint Background Dotted Curved Path - Entire Infinite Line */}
        <path
          d="M 0 110 C 20 110, 40 100, 55 95 C 70 90, 85 70, 100 70 C 120 70, 150 105, 170 95 C 190 85, 220 130, 260 130 C 280 130, 310 95, 330 105 C 350 115, 390 50, 420 50 C 440 50, 470 100, 490 90 C 510 80, 550 150, 580 150 C 600 150, 630 105, 650 115 C 670 125, 710 65, 740 65 C 760 65, 790 105, 810 95 C 830 85, 870 135, 900 135 C 915 135, 930 110, 940 115 C 970 120, 980 100, 1000 100"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.15"
          strokeDasharray="4,6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 2. Soft Ambient Glow Path (Animates pathLength directly) */}
        <motion.path
          d="M 0 110 C 20 110, 40 100, 55 95 C 70 90, 85 70, 100 70 C 120 70, 150 105, 170 95 C 190 85, 220 130, 260 130 C 280 130, 310 95, 330 105 C 350 115, 390 50, 420 50 C 440 50, 470 100, 490 90 C 510 80, 550 150, 580 150 C 600 150, 630 105, 650 115 C 670 125, 710 65, 740 65 C 760 65, 790 105, 810 95 C 830 85, 870 135, 900 135"
          stroke="currentColor"
          strokeWidth="8"
          strokeOpacity="0.12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pathLength }}
        />

        {/* 3. Thick Main Core Path (Animates pathLength directly) */}
        <motion.path
          d="M 0 110 C 20 110, 40 100, 55 95 C 70 90, 85 70, 100 70 C 120 70, 150 105, 170 95 C 190 85, 220 130, 260 130 C 280 130, 310 95, 330 105 C 350 115, 390 50, 420 50 C 440 50, 470 100, 490 90 C 510 80, 550 150, 580 150 C 600 150, 630 105, 650 115 C 670 125, 710 65, 740 65 C 760 65, 790 105, 810 95 C 830 85, 870 135, 900 135"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pathLength }}
        />

        {/* 4. Thinner Stripes Pattern Path (Animates pathLength directly) */}
        <motion.path
          d="M 0 110 C 20 110, 40 100, 55 95 C 70 90, 85 70, 100 70 C 120 70, 150 105, 170 95 C 190 85, 220 130, 260 130 C 280 130, 310 95, 330 105 C 350 115, 390 50, 420 50 C 440 50, 470 100, 490 90 C 510 80, 550 150, 580 150 C 600 150, 630 105, 650 115 C 670 125, 710 65, 740 65 C 760 65, 790 105, 810 95 C 830 85, 870 135, 900 135"
          stroke={`url(#${stripesId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pathLength }}
        />

        {/* 5. Undefined Dashed Future Path (Animates futurePathLength directly) */}
        <motion.path
          d="M 900 135 C 915 135, 930 110, 940 115 C 970 120, 980 100, 1000 100"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeOpacity="0.45"
          strokeDasharray="4,6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pathLength: futurePathLength }}
        />

        {/* Vector arrowhead pointing into the future (white) */}
        <polygon
          points="979,96 979,104 987,100"
          fill="currentColor"
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

        {/* Responsive Horizontal SVG Viewport Container (Horizontal swiping on mobile, fit on desktop) */}
        <div className="w-full relative px-4 md:px-12 lg:px-24 select-none overflow-x-auto scrollbar-none py-4 h-[280px]">
          <div className="min-w-[760px] md:min-w-0 w-full h-full">
            {renderTimelineSVG(colorClass)}
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <section 
        ref={containerRef}
        className="w-full flex flex-col justify-center items-center relative bg-transparent overflow-hidden pt-12 pb-24 px-0"
      >
        <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />
        <div className="w-full max-w-none flex flex-col items-center justify-center bg-transparent py-12 px-0 relative">
          <div className="w-full px-4 text-light-pink stroke-light-pink fill-light-pink">
            {renderTimelineContent("text-light-pink")}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="w-full flex flex-col justify-center items-center relative bg-transparent overflow-hidden pt-12 pb-24 px-0"
    >
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      {/* Unified 3D Holographic Control Deck */}
      <motion.div 
        style={{ 
          transformPerspective: 1200,
          rotateX,
          transformStyle: "preserve-3d"
        }}
        className="w-full max-w-none flex flex-col items-center justify-center bg-transparent py-12 px-0 relative"
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
