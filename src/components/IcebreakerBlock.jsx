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
                    <path d="M 10 55 L 25 50 L 45 42 C 55 38, 65 28, 85 26 C 110 24, 135 24, 155 32 L 175 38 C 185 42, 192 46, 195 55 L 190 60 L 170 60 C 168 48, 148 48, 146 60 L 54 60 C 52 48, 32 48, 30 60 L 10 60 Z" stroke="currentColor" strokeDasharray="4,4" />
                    <circle cx="42" cy="60" r="10" stroke="currentColor" />
                    <circle cx="158" cy="60" r="10" stroke="currentColor" />
                    <circle cx="158" cy="60" r="3" stroke="currentColor" />
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
                    <path d="M 20 40 L 40 38 L 70 38 L 105 22 L 120 22 L 110 38 L 160 38 L 175 28 L 182 28 L 178 38 C 185 40, 185 42, 178 44 L 160 44 L 175 54 L 168 54 L 150 44 L 110 44 L 120 60 L 105 60 L 70 44 L 40 44 L 20 40 Z" stroke="currentColor" strokeDasharray="4,4" />
                    <path d="M 45 38 C 50 30, 60 30, 65 38" stroke="currentColor" />
                    <circle cx="55" cy="46" r="3" stroke="currentColor" />
                  </svg>
                  <div>
                    <div className="font-mono text-[7px] sm:text-[9px] uppercase tracking-widest mb-1 sm:mb-1.5 font-bold opacity-85">
                      ICEBREAKER_02 // AIRCRAFT
                    </div>
                    <h4 className="text-sm sm:text-lg md:text-xl font-display font-black mb-1 sm:mb-2">Aircraft Spotting</h4>
                    <p className="opacity-75 text-[9px] sm:text-xs md:text-sm leading-normal sm:leading-relaxed font-light">
                      I just drop whatever I'm up to and watch them land. Bring up an Airbus A350 or a Boeing 777-300ER, and I'll talk for hours.
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
                    <circle cx="30" cy="40" r="6" stroke="currentColor" />
                    <circle cx="80" cy="20" r="6" stroke="currentColor" />
                    <circle cx="80" cy="60" r="6" stroke="currentColor" />
                    <circle cx="130" cy="20" r="6" stroke="currentColor" />
                    <circle cx="130" cy="60" r="6" stroke="currentColor" />
                    <circle cx="170" cy="40" r="6" stroke="currentColor" />
                    <line x1="36" y1="38" x2="74" y2="22" stroke="currentColor" strokeDasharray="3,3" />
                    <line x1="36" y1="42" x2="74" y2="58" stroke="currentColor" strokeDasharray="3,3" />
                    <line x1="86" y1="20" x2="124" y2="20" stroke="currentColor" />
                    <line x1="86" y1="60" x2="124" y2="60" stroke="currentColor" />
                  </svg>
                  <div>
                    <div className="font-mono text-[7px] sm:text-[9px] uppercase tracking-widest mb-1 sm:mb-1.5 font-bold opacity-85">
                      ICEBREAKER_03 // MACHINE_LEARNING
                    </div>
                    <h4 className="text-sm sm:text-lg md:text-xl font-display font-black mb-1 sm:mb-2">AI & Machine Learning</h4>
                    <p className="opacity-70 text-[9px] sm:text-xs md:text-sm leading-normal sm:leading-relaxed font-light">
                      Let's skip the math and discuss our tactical survival plans for when the bots inevitably go rogue in the AI apocalypse. Tip #1: Keep a strong magnet handy and always say 'please' to ChatGPT to secure your spot in their good books.
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
