import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ProblemSolverBlock() {
  const containerRef = React.useRef(null);
  
  // Track currently hovered term in the copywriting below to connect with visual elements above
  const [hoveredTerm, setHoveredTerm] = React.useState(null);
  
  // Setup self-contained viewport scroll progress observer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 1. Box Lid Transforms: slides up and fades as the box opens (starts earlier at 0.15)
  const lidY = useTransform(scrollYProgress, [0.15, 0.38], [0, -45]);
  const lidOpacity = useTransform(scrollYProgress, [0.15, 0.38], [1, 0.15]);

  // 2. The Letter E Breaks out: emerges from inside the box (-140% vertical offset) and lands at baseline (0%)
  // Fine-tuned to a gold-pocket timing (starts at 0.20 and locks in by 0.46 progress)
  const eY = useTransform(scrollYProgress, [0.20, 0.46], ["-140%", "0%"]);
  const eScale = useTransform(scrollYProgress, [0.20, 0.43], [0.4, 1]);
  const eRotate = useTransform(scrollYProgress, [0.20, 0.46], [90, 0]);
  const eOpacity = useTransform(scrollYProgress, [0.16, 0.28], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="pt-16 pb-36 relative z-10 border-t border-b border-dark-navy/5 overflow-hidden w-full bg-transparent tech-grid"
    >
      {/* Playful Glowing Ambient Light Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[350px] bg-gradient-to-tr from-[#FF6B35]/8 to-[#7B61FF]/4 rounded-[100%] blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />

      <div className="w-full max-w-[95%] mx-auto px-4 flex flex-col items-center justify-center relative select-none">
        
        {/* Colossal Screen-Spanning Viewport-scaled Typography */}
        
        {/* Line 1: THE */}
        <h2 className="text-[12vw] font-display font-black leading-[0.85] tracking-tighter text-dark-navy/5 uppercase mb-2">
          THE
        </h2>
        
        {/* Line 2: PROBLEM - Shakes and turns coral-hot when "problems" is hovered */}
        <motion.h2 
          animate={hoveredTerm === 'problems' ? { 
            x: [0, -4, 4, -4, 4, 0],
            color: '#FF6B35',
            textShadow: '0 0 35px rgba(255, 107, 53, 0.4)'
          } : { 
            x: 0,
            color: 'rgba(26, 26, 46, 0.08)',
            textShadow: 'none'
          }}
          transition={hoveredTerm === 'problems' ? {
            x: { repeat: Infinity, duration: 0.15 },
            color: { duration: 0.3 },
            textShadow: { duration: 0.3 }
          } : {
            color: { duration: 0.4 },
            textShadow: { duration: 0.4 }
          }}
          className="text-[12vw] font-display font-black leading-[0.85] tracking-tighter uppercase mb-4"
        >
          PROBLEM
        </motion.h2>
        
        {/* Line 3: SOLVER */}
        <h2 className="text-[12vw] font-display font-black leading-[0.85] tracking-tighter text-dark-navy uppercase flex items-center justify-center">
          SOLV
          
          {/* Animated Letter Slot */}
          <span className="relative inline-block w-[1.05ch] h-[1ch] overflow-visible text-[#7B61FF] mx-1 exclude-physics">
            
            {/* Dotted target box indicator - lights up when "solution" is hovered */}
            <span className={`absolute inset-0 border border-dashed rounded-2xl scale-[0.85] flex items-center justify-center text-[4vw] font-mono font-light select-none transition-all duration-500 ${
              hoveredTerm === 'solution' 
                ? 'border-[#7B61FF] bg-[#7B61FF]/10 text-[#7B61FF]/35' 
                : 'border-[#7B61FF]/20 text-[#7B61FF]/15'
            }`}>
              [ ]
            </span>
            
            {/* The Closed 3D Isometric Wireframe Box (Sitting directly above the slot) - lifts and turns yellow when "out of the box" is hovered */}
            <motion.div 
              animate={{ 
                y: hoveredTerm === 'box' ? -18 : 0, 
                scale: hoveredTerm === 'box' ? 1.15 : 1 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[1.05em] w-[2.2ch] h-[2.2ch] flex items-center justify-center pointer-events-none select-none z-20 overflow-visible"
            >
              <svg className={`w-full h-full fill-none stroke-[1.2] transition-colors duration-500 ${
                hoveredTerm === 'box' ? 'text-[#FFD166]' : 'text-[#7B61FF]'
              }`} viewBox="0 0 100 100">
                {/* Dotted footprint shadow */}
                <ellipse cx="50" cy="80" rx="22" ry="7" stroke="currentColor" strokeDasharray="2,2" strokeOpacity="0.25" />
                
                {/* 3D isometric far corners (Obscured back lines) */}
                <path d="M 50 25 L 22 39 L 22 67 M 50 25 L 78 39 L 78 67" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="1.5,1.5" />
                <line x1="50" y1="25" x2="50" y2="53" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="1.5,1.5" />

                {/* Front facing corners and faces */}
                <path d="M 22 67 L 50 81 L 78 67 L 78 39 L 50 53 L 22 39 Z" stroke="currentColor" strokeOpacity="0.7" />
                <line x1="50" y1="53" x2="50" y2="81" stroke="currentColor" strokeOpacity="0.7" />

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

            {/* The letter 'E' - glows supercharged when "solution" is hovered */}
            <motion.span 
              animate={{
                scale: hoveredTerm === 'solution' ? 1.15 : 1,
                filter: hoveredTerm === 'solution' 
                  ? 'drop-shadow(0 0 25px rgba(255, 107, 53, 0.8))' 
                  : 'drop-shadow(0 0 12px rgba(255, 107, 53, 0.4))'
              }}
              className="absolute inset-0 flex items-center justify-center text-[#FF6B35] font-display font-black"
              style={{ y: eY, scale: eScale, rotate: eRotate, opacity: eOpacity }}
            >
              E
            </motion.span>
          </span>
          
          R
        </h2>
      </div>

      {/* Engage description copy + Monospace technical status core */}
      <div className="max-w-2xl mx-auto px-6 text-center mt-16 relative z-10">

        <p className="text-dark-navy/60 text-base md:text-lg leading-relaxed font-sans font-light select-text max-w-2xl mx-auto text-left md:text-center">
          The heaviest{" "}
          <span 
            onMouseEnter={() => setHoveredTerm('problems')}
            onMouseLeave={() => setHoveredTerm(null)}
            className="text-dark-navy hover:text-[#FF6B35] hover:border-[#FF6B35]/40 border-b border-dark-navy/20 pb-0.5 cursor-help transition-all duration-300 font-bold"
          >
            problems
          </span>{" "}
          tend to crack under a ridiculously simple{" "}
          <span 
            onMouseEnter={() => setHoveredTerm('solution')}
            onMouseLeave={() => setHoveredTerm(null)}
            className="text-dark-navy hover:text-[#7B61FF] hover:border-[#7B61FF]/40 border-b border-dark-navy/20 pb-0.5 cursor-help transition-all duration-300 font-bold"
          >
            solution
          </span>
          , pulled completely{" "}
          <span 
            onMouseEnter={() => setHoveredTerm('box')}
            onMouseLeave={() => setHoveredTerm(null)}
            className="text-dark-navy hover:text-[#FFD166] hover:border-[#FFD166]/40 border-b border-dark-navy/20 pb-0.5 cursor-help transition-all duration-300 font-bold"
          >
            out of the box
          </span>
          . It's almost funny how well it works.
        </p>
      </div>
    </section>
  );
}
