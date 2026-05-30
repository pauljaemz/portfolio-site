import React from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

export default function ProblemSolverBlock({ customTransformY }) {
  const containerRef = React.useRef(null);
  
  // Track currently hovered term in the copywriting below to connect with visual elements above
  const [hoveredTerm, setHoveredTerm] = React.useState(null);
  
  // Setup self-contained viewport scroll progress observer
  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dynamically map independent viewport translations (lagging spring-driven scrolling)
  const mappedProgress = useTransform(customTransformY || new useMotionValue(0), (y) => {
    if (customTransformY) {
      const scrollY = -y;
      const start = 800;
      const end = 2100;
      const progress = (scrollY - start) / (end - start);
      return Math.max(0, Math.min(progress, 1));
    }
    return 0;
  });

  const scrollYProgress = customTransformY ? mappedProgress : localProgress;

  // 1. Box Lid Transforms: slides up and fades as the box opens (starts earlier at 0.15)
  const lidY = useTransform(scrollYProgress, [0.15, 0.38], [0, -45]);
  const lidOpacity = useTransform(scrollYProgress, [0.15, 0.38], [1, 0.15]);

  // 2. The Letter E Breaks out: emerges from inside the box (-140% vertical offset) and lands at baseline (0%)
  // Fine-tuned to a gold-pocket timing (starts at 0.20 and locks in by 0.46 progress)
  const eY = useTransform(scrollYProgress, [0.20, 0.46], ["-140%", "0%"]);
  const eScale = useTransform(scrollYProgress, [0.20, 0.43], [0.4, 1]);
  const eRotate = useTransform(scrollYProgress, [0.20, 0.46], [90, 0]);
  const eOpacity = useTransform(scrollYProgress, [0.16, 0.28], [0, 1]);

  const renderColossalTypography = (themeClass) => {
    return (
      <div className={`w-full max-w-[95%] mx-auto px-4 flex flex-col items-center justify-center relative select-none ${themeClass}`}>
        {/* Line 1: THE */}
        <h2 className="text-[12vw] font-display font-black leading-[0.85] tracking-tighter opacity-15 uppercase mb-2">
          THE
        </h2>
        
        {/* Line 2: PROBLEM */}
        <motion.h2 
          animate={hoveredTerm === 'problems' ? { 
            x: [0, -4, 4, -4, 4, 0],
            textShadow: '0 0 25px currentColor'
          } : { 
            x: 0,
            textShadow: 'none'
          }}
          transition={hoveredTerm === 'problems' ? {
            x: { repeat: Infinity, duration: 0.15 }
          } : {}}
          className="text-[12vw] font-display font-black leading-[0.85] tracking-tighter uppercase mb-4 opacity-40"
        >
          PROBLEM
        </motion.h2>
        
        {/* Line 3: SOLVER */}
        <h2 className="text-[12vw] font-display font-black leading-[0.85] tracking-tighter uppercase flex items-center justify-center">
          SOLV
          
          {/* Animated Letter Slot */}
          <span className="relative inline-block w-[1.05ch] h-[1ch] overflow-visible mx-1 exclude-physics">
            
            {/* Dotted target box indicator */}
            <span className={`absolute inset-0 border border-dashed rounded-2xl scale-[0.85] flex items-center justify-center text-[4vw] font-mono font-light select-none transition-all duration-500 ${
              hoveredTerm === 'solution' 
                ? 'border-current bg-current/10 opacity-70' 
                : 'border-current/25 opacity-30'
            }`}>
              [ ]
            </span>
            
            {/* The Closed 3D Isometric Wireframe Box */}
            <motion.div 
              animate={{ 
                y: hoveredTerm === 'box' ? -18 : 0, 
                scale: hoveredTerm === 'box' ? 1.15 : 1 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[1.05em] w-[2.2ch] h-[2.2ch] flex items-center justify-center pointer-events-none select-none z-20 overflow-visible"
            >
              <svg className="w-full h-full fill-none stroke-[1.4]" viewBox="0 0 100 100">
                {/* Dotted footprint shadow */}
                <ellipse cx="50" cy="80" rx="22" ry="7" stroke="currentColor" strokeDasharray="2,2" strokeOpacity="0.25" />
                
                {/* 3D isometric far corners */}
                <path d="M 50 25 L 22 39 L 22 67 M 50 25 L 78 39 L 78 67" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="1.5,1.5" />
                <line x1="50" y1="25" x2="50" y2="53" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="1.5,1.5" />

                {/* Front facing corners and faces */}
                <path d="M 22 67 L 50 81 L 78 67 L 78 39 L 50 53 L 22 39 Z" stroke="currentColor" strokeOpacity="0.75" />
                <line x1="50" y1="53" x2="50" y2="81" stroke="currentColor" strokeOpacity="0.75" />

                {/* Openable Top Lid */}
                <motion.path 
                  d="M 22 39 L 50 25 L 78 39 L 50 53 Z" 
                  stroke="currentColor" 
                  strokeWidth="1.8"
                  fill="currentColor"
                  fillOpacity="0.1"
                  style={{ y: lidY, opacity: lidOpacity }}
                />
              </svg>
            </motion.div>

            {/* The letter 'E' */}
            <motion.span 
              animate={{
                scale: hoveredTerm === 'solution' ? 1.15 : 1,
                filter: hoveredTerm === 'solution' 
                  ? 'drop-shadow(0 0 25px currentColor)' 
                  : 'drop-shadow(0 0 10px currentColor)'
              }}
              className="absolute inset-0 flex items-center justify-center font-display font-black"
              style={{ y: eY, scale: eScale, rotate: eRotate, opacity: eOpacity }}
            >
              E
            </motion.span>
          </span>
          
          R
        </h2>
      </div>
    );
  };

  const renderDescriptionBlock = (colorClass) => {
    return (
      <div className={`max-w-3xl mx-auto px-6 w-full text-center text-base md:text-lg font-light leading-relaxed select-none ${colorClass}`}>
        The heaviest{" "}
        <span 
          onMouseEnter={() => setHoveredTerm('problems')}
          onMouseLeave={() => setHoveredTerm(null)}
          className="hover:text-white hover:border-white border-b border-current/20 pb-0.5 cursor-help transition-all duration-300 text-[1.14em] font-extrabold tracking-tight px-1"
        >
          problems
        </span>{" "}
        tend to crack under a ridiculously{" "}
        <span 
          onMouseEnter={() => setHoveredTerm('solution')}
          onMouseLeave={() => setHoveredTerm(null)}
          className="hover:text-white hover:border-white border-b border-current/20 pb-0.5 cursor-help transition-all duration-300 text-[1.14em] font-extrabold tracking-tight px-1"
        >
          simple solution
        </span>
        , pulled completely{" "}
        <span 
          onMouseEnter={() => setHoveredTerm('box')}
          onMouseLeave={() => setHoveredTerm(null)}
          className="hover:text-white hover:border-white border-b border-current/20 pb-0.5 cursor-help transition-all duration-300 text-[1.14em] font-extrabold tracking-tight px-1"
        >
          out of the box
        </span>
        . It's almost funny how well it works.
      </div>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="pt-24 pb-32 relative z-10 border-t border-b border-white/10 overflow-hidden w-full bg-transparent"
    >
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      {/* RENDER DUAL COLLATERAL LAYERS */}
      <div className="w-full relative min-h-[38vw]">
        {/* Invisible driver to preserve normal layout bounds */}
        <div className="opacity-0 pointer-events-none select-none w-full">
          {renderColossalTypography("")}
        </div>

        {/* Left half: Light Pink */}
        <div className="absolute left-0 top-0 bottom-0 w-[50vw] overflow-hidden text-light-pink stroke-light-pink fill-light-pink pointer-events-none select-none">
          <div className="w-screen h-full text-inherit fill-inherit stroke-inherit relative">
            {renderColossalTypography("text-light-pink")}
          </div>
        </div>

        {/* Right half: Dark Coral */}
        <div className="absolute left-[50vw] top-0 bottom-0 w-[50vw] overflow-hidden text-dark-coral stroke-dark-coral fill-dark-coral pointer-events-none select-none">
          <div 
            className="w-screen h-full text-inherit fill-inherit stroke-inherit relative"
            style={{ left: '-50vw' }}
          >
            {renderColossalTypography("text-dark-coral")}
          </div>
        </div>
      </div>

      {/* DESCRIPTION BLOCK: split vertically down the middle */}
      <div className="w-full relative min-h-[140px] pt-16 pb-8">
        {/* Invisible driver (SITS ON TOP to capture mouse hover events cleanly!) */}
        <div className="relative z-20 opacity-0 w-full cursor-help">
          {renderDescriptionBlock("")}
        </div>

        {/* Left half: Light Pink */}
        <div className="absolute left-0 top-0 bottom-0 w-[50vw] overflow-hidden text-light-pink stroke-light-pink fill-light-pink pointer-events-none select-none z-10">
          <div className="w-screen h-full text-inherit fill-inherit stroke-inherit relative">
            {renderDescriptionBlock("text-light-pink")}
          </div>
        </div>

        {/* Right half: Dark Coral */}
        <div className="absolute left-[50vw] top-0 bottom-0 w-[50vw] overflow-hidden text-dark-coral stroke-dark-coral fill-dark-coral pointer-events-none select-none z-10">
          <div 
            className="w-screen h-full text-inherit fill-inherit stroke-inherit relative"
            style={{ left: '-50vw' }}
          >
            {renderDescriptionBlock("text-dark-coral")}
          </div>
        </div>
      </div>
    </section>
  );
}
