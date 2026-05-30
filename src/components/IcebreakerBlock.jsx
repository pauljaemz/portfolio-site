import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export default function IcebreakerBlock({ customTransformY, colorClass, isGravityActive, sectionRef }) {
  const localRef = React.useRef(null);
  const activeRef = sectionRef || localRef;
  const [hoveredIcebreaker, setHoveredIcebreaker] = React.useState(null);

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Setup self-contained viewport scroll progress observer
  const { scrollYProgress: localProgress } = useScroll({
    target: activeRef,
    offset: ["start end", "end start"]
  });

  // Dynamically map independent viewport translations (lagging spring-driven scrolling)
  const mappedProgress = useTransform(customTransformY || new useMotionValue(0), (y) => {
    if (customTransformY) {
      const scrollY = -y;
      const start = 180; // Calibrated to drop before middle of screen
      const end = 1100;
      const progress = (scrollY - start) / (end - start);
      return Math.max(0, Math.min(progress, 1));
    }
    return 0;
  });

  const scrollYProgress = customTransformY ? mappedProgress : localProgress;

  // Smooth out card drops using a slow, premium spring so they glide down gracefully even during snapping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 18,
    mass: 1.5
  });

  // Scroll-linked parachuting card drops in order as the plane flies right-to-left
  // Synchronized to match the B747's spring-glide overhead sweep with a premium Y height
  const dropOffset = isMobile ? -40 : -300;
  const card3DropY = useTransform(smoothProgress, [0.25, 0.45], [dropOffset, 0]);
  const card3DropOpacity = useTransform(smoothProgress, [0.25, 0.40], [0, 1]);
  const card3DropScale = useTransform(smoothProgress, [0.25, 0.45], [0.75, 1]);

  const card2DropY = useTransform(smoothProgress, [0.35, 0.55], [dropOffset, 0]);
  const card2DropOpacity = useTransform(smoothProgress, [0.35, 0.50], [0, 1]);
  const card2DropScale = useTransform(smoothProgress, [0.35, 0.55], [0.75, 1]);

  const card1DropY = useTransform(smoothProgress, [0.45, 0.65], [dropOffset, 0]);
  const card1DropOpacity = useTransform(smoothProgress, [0.45, 0.60], [0, 1]);
  const card1DropScale = useTransform(smoothProgress, [0.45, 0.65], [0.75, 1]);

  return (
    <section 
      ref={activeRef}
      className="py-32 relative z-10 overflow-hidden bg-transparent w-full"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12 w-full relative z-10">
        <div className="text-center mb-16 select-none pointer-events-none flex flex-col items-center">
          <h2 className={`font-mono text-sm tracking-widest mb-3 font-black uppercase ${colorClass}`}>
            // START A CONVERSATION
          </h2>
          <h3 className={`text-4xl md:text-6xl font-display font-black tracking-tight mb-4 ${colorClass}`}>
            The Icebreakers.
          </h3>
          <p className={`text-sm md:text-base max-w-2xl font-light leading-relaxed opacity-75 mx-auto ${colorClass}`}>
            If we haven't met yet, bypassing the awkward small talk is incredibly simple. Just bring up any of these three topics and I'll open up.
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 md:gap-8 items-stretch">
          {/* Card 1: Car Talk (Left Column) - Drops 3rd */}
          <div className="relative overflow-visible h-full">
            <motion.div
              style={{ y: card1DropY, opacity: card1DropOpacity, scale: card1DropScale }}
              className="w-full h-full"
            >
              <motion.div
                onMouseEnter={() => setHoveredIcebreaker(1)}
                onMouseLeave={() => setHoveredIcebreaker(null)}
                animate={{
                  y: hoveredIcebreaker === 1 ? -8 : 0,
                  boxShadow: hoveredIcebreaker === 1
                    ? '0 15px 35px rgba(255, 255, 255, 0.08)'
                    : '0px 0px 0px rgba(0,0,0,0)'
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col gap-3 sm:gap-6 p-3 sm:p-6 md:p-8 white-shaded-panel rounded-2xl sm:rounded-3xl transition-all duration-300 relative overflow-hidden group min-h-[220px] sm:min-h-[260px] md:min-h-[300px] justify-between text-left h-full border-white ${colorClass}`}
              >
                <div className="flex flex-col gap-3 sm:gap-5">
                  <svg className={`w-10 h-6 sm:w-16 sm:h-10 stroke-[1.5] fill-none graphic-asset design-asset ${colorClass}`} viewBox="0 0 200 80">
                    <path d="M 10 52 C 10 52, 15 48, 25 48 L 48 43 C 58 35, 70 24, 95 24 C 120 24, 145 28, 160 38 L 178 44 C 188 47, 195 52, 195 56 L 192 60 L 174 60 C 172 48, 148 48, 146 60 L 54 60 C 52 48, 28 48, 26 60 L 8 60 Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 45 43 C 55 35, 68 28, 92 28 C 115 28, 138 32, 148 40 M 80 28 L 82 46 M 115 28 L 110 46" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.6" />
                    <path d="M 12 50 L 22 50 M 188 48 L 194 52" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="40" cy="60" r="12" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="40" cy="60" r="10" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,1" />
                    <circle cx="40" cy="60" r="3" stroke="currentColor" fill="currentColor" />
                    <path d="M 40 48 L 40 72 M 28 60 L 52 60 M 31.5 51.5 L 48.5 68.5 M 31.5 68.5 L 48.5 51.5" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
                    <circle cx="160" cy="60" r="12" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="160" cy="60" r="10" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,1" />
                    <circle cx="160" cy="60" r="3" stroke="currentColor" fill="currentColor" />
                    <path d="M 160 48 L 160 72 M 148 60 L 172 60 M 151.5 51.5 L 168.5 68.5 M 151.5 68.5 L 168.5 51.5" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
                  </svg>
                  <div>
                    <div className="font-mono text-[7px] sm:text-[9px] uppercase tracking-widest mb-1 sm:mb-1.5 font-bold opacity-85">
                      ICEBREAKER_01 // CARS
                    </div>
                    <h4 className="text-sm sm:text-lg md:text-xl font-display font-black mb-1 sm:mb-2">Car Talk</h4>
                    <p className="opacity-70 text-[9px] sm:text-xs md:text-sm leading-normal sm:leading-relaxed font-light">
                      Want to skip the standard introduction? I love talking about all cars, from favorite road trip drives to classic station wagons and mechanical differentials.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-2 sm:pt-4 flex items-center justify-between">
                  <span className="text-[7px] sm:text-[9px] font-mono opacity-50 uppercase"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Card 2: Aircraft Spotting (Middle Column) - Drops 2nd */}
          <div className="relative overflow-visible h-full">
            <motion.div
              style={{ y: card2DropY, opacity: card2DropOpacity, scale: card2DropScale }}
              className="w-full h-full"
            >
              <motion.div
                onMouseEnter={() => setHoveredIcebreaker(2)}
                onMouseLeave={() => setHoveredIcebreaker(null)}
                animate={{
                  y: hoveredIcebreaker === 2 ? -8 : 0,
                  boxShadow: hoveredIcebreaker === 2
                    ? '0 15px 35px rgba(229, 91, 109, 0.08)'
                    : '0px 0px 0px rgba(0,0,0,0)'
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col gap-3 sm:gap-6 p-3 sm:p-6 md:p-8 white-shaded-panel rounded-2xl sm:rounded-3xl transition-all duration-300 relative overflow-hidden group min-h-[220px] sm:min-h-[260px] md:min-h-[300px] justify-between text-left h-full border-white ${colorClass}`}
              >
                <div className="flex flex-col gap-3 sm:gap-5">
                  <svg className={`w-10 h-6 sm:w-16 sm:h-10 stroke-[1.5] fill-none graphic-asset design-asset ${colorClass}`} viewBox="0 0 200 80">
                    {/* Symmetrical Wings */}
                    <path d="M 100 35 L 20 32 C 16 32, 16 35, 20 36 L 86 38" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 100 35 L 180 32 C 184 32, 184 35, 180 36 L 114 38" stroke="currentColor" strokeWidth="1.5" />
                    {/* Wing structural details */}
                    <line x1="50" y1="33" x2="50" y2="37" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                    <line x1="80" y1="34" x2="80" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                    <line x1="120" y1="38" x2="120" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                    <line x1="150" y1="37" x2="150" y2="33" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                    {/* Symmetrical Wing Struts */}
                    <line x1="50" y1="37" x2="90" y2="48" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="150" y1="37" x2="110" y2="48" stroke="currentColor" strokeWidth="1.2" />
                    {/* Main Fuselage */}
                    <path d="M 86 38 C 86 30, 114 30, 114 38 L 110 52 C 108 56, 92 56, 90 52 Z" stroke="currentColor" strokeWidth="1.5" />
                    {/* Cockpit Windshield */}
                    <path d="M 89 38 L 94 28 L 106 28 L 111 38 Z" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="100" y1="28" x2="100" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
                    {/* Engine Cowling details */}
                    <path d="M 92 42 C 92 48, 108 48, 108 42" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                    <rect x="94" y="44" width="4" height="2" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
                    <rect x="102" y="44" width="4" height="2" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
                    {/* Main Landing Gear & Wheels */}
                    <line x1="92" y1="52" x2="80" y2="68" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="80" cy="70" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="80" cy="70" r="1.5" fill="currentColor" stroke="currentColor" />
                    <line x1="108" y1="52" x2="120" y2="68" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="120" cy="70" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="120" cy="70" r="1.5" fill="currentColor" stroke="currentColor" />
                    {/* Tail Fin */}
                    <line x1="100" y1="28" x2="100" y2="18" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 100 18 L 96 24" stroke="currentColor" strokeWidth="1.2" />
                    {/* Propeller Spinner (Hub) */}
                    <circle cx="100" cy="42" r="4" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                    {/* Spinning Propeller Disk (Faint overlay) */}
                    <ellipse cx="100" cy="42" rx="30" ry="30" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,8" opacity="0.25" className="animate-spin" style={{ transformOrigin: '100px 42px', animationDuration: '3s' }} />
                    {/* Two-Blade Propeller */}
                    <path d="M 100 38 C 100 38, 97 22, 97 14 C 97 12, 103 12, 103 14 C 103 22, 100 38, 100 38 Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M 100 46 C 100 46, 103 62, 103 70 C 103 72, 97 72, 97 70 C 97 62, 100 46, 100 46 Z" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <div>
                    <div className="font-mono text-[7px] sm:text-[9px] uppercase tracking-widest mb-1 sm:mb-1.5 font-bold opacity-85">
                      ICEBREAKER_02 // AIRCRAFT
                    </div>
                    <h4 className="text-sm sm:text-lg md:text-xl font-display font-black mb-1 sm:mb-2">Aircraft Spotting</h4>
                    <p className="opacity-75 text-[9px] sm:text-xs md:text-sm leading-normal sm:leading-relaxed font-light">
                      I just drop whatever I'm up to and watch them land.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-2 sm:pt-4 flex items-center justify-between">
                  <span className="text-[7px] sm:text-[9px] font-mono opacity-50 uppercase"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Card 3: AI & Machine Learning (Right Column) - Drops 1st */}
          <div className="relative overflow-visible h-full">
            <motion.div
              style={{ y: card3DropY, opacity: card3DropOpacity, scale: card3DropScale }}
              className="w-full h-full"
            >
              <motion.div
                onMouseEnter={() => setHoveredIcebreaker(3)}
                onMouseLeave={() => setHoveredIcebreaker(null)}
                animate={{
                  y: hoveredIcebreaker === 3 ? -8 : 0,
                  boxShadow: hoveredIcebreaker === 3
                    ? '0 15px 35px rgba(255, 255, 255, 0.08)'
                    : '0px 0px 0px rgba(0,0,0,0)'
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col gap-3 sm:gap-6 p-3 sm:p-6 md:p-8 white-shaded-panel rounded-2xl sm:rounded-3xl transition-all duration-300 relative overflow-hidden group min-h-[220px] sm:min-h-[260px] md:min-h-[300px] justify-between text-left h-full border-white ${colorClass}`}
              >
                <div className="flex flex-col gap-3 sm:gap-5">
                  <svg className={`w-10 h-6 sm:w-16 sm:h-10 stroke-[1.5] fill-none graphic-asset design-asset ${colorClass}`} viewBox="0 0 200 80">
                    <circle cx="100" cy="40" r="10" stroke="currentColor" strokeWidth="2" />
                    <circle cx="100" cy="40" r="5" fill="currentColor" stroke="currentColor" className="animate-pulse" />
                    <circle cx="100" cy="40" r="24" stroke="currentColor" strokeWidth="1" strokeDasharray="3,4" opacity="0.7" />
                    <circle cx="100" cy="40" r="34" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1,2" opacity="0.4" />
                    <circle cx="50" cy="20" r="3" stroke="currentColor" fill="currentColor" />
                    <circle cx="50" cy="60" r="3" stroke="currentColor" fill="currentColor" />
                    <circle cx="150" cy="20" r="3" stroke="currentColor" fill="currentColor" />
                    <circle cx="150" cy="60" r="3" stroke="currentColor" fill="currentColor" />
                    <circle cx="100" cy="12" r="2.5" stroke="currentColor" />
                    <circle cx="100" cy="68" r="2.5" stroke="currentColor" />
                    <path d="M 50 20 L 100 40 L 150 20 M 50 60 L 100 40 L 150 60 M 100 12 L 100 68 M 50 20 L 50 60 L 100 68 L 150 60 L 150 20 L 100 12 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                  </svg>
                  <div>
                    <div className="font-mono text-[7px] sm:text-[9px] uppercase tracking-widest mb-1 sm:mb-1.5 font-bold opacity-85">
                      ICEBREAKER_03 // MACHINE_LEARNING
                    </div>
                    <h4 className="text-sm sm:text-lg md:text-xl font-display font-black mb-1 sm:mb-2">AI</h4>
                    <p className="opacity-70 text-[9px] sm:text-xs md:text-sm leading-normal sm:leading-relaxed font-light">
                      Let's skip the math and discuss our tactical survival plans for when the bots inevitably go rogue in the AI apocalypse. Just promise to let me drive.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-2 sm:pt-4 flex items-center justify-between">
                  <span className="text-[7px] sm:text-[9px] font-mono opacity-50 uppercase"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
