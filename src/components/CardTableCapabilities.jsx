import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

function AsyncVideo({ src, className, isGravityActive }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  return (
    <div className="absolute inset-0 w-full h-full bg-black/40 overflow-hidden relative">
      {hasError ? (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#1e1e24] text-white/40 select-none">
          <svg className="w-10 h-10 mb-2 stroke-[1.5] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <span className="font-mono text-[9px] tracking-widest uppercase">// SOURCE_OFFLINE //</span>
        </div>
      ) : (
        <video 
          ref={videoRef}
          className={`${className} transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-70 group-hover:opacity-90'}`}
          src={src}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onCanPlay={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      )}

      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 backdrop-blur-[2px] z-20 pointer-events-none select-none">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border border-dashed border-[#E55B6C]/50 rounded-xl flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
              <div className="w-4 h-4 border border-[#FFD1DC]/40 rounded-lg animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-[8px] text-[#E55B6C]/80 tracking-[0.25em] uppercase animate-pulse">
                STREAMING_ASSET
              </span>
              <span className="font-mono text-[7px] text-white/30 tracking-[0.2em]">
                // BUFFERING //
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CardTableCapabilities({ isGravityActive, customTransformY }) {
  const containerRef = React.useRef(null);
  const [focusedMobileCard, setFocusedMobileCard] = React.useState(null);

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress as the section moves from bottom-of-screen to center-of-screen
  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Dynamically map independent viewport translations (lagging spring-driven scrolling)
  const mappedProgress = useTransform(customTransformY || new useMotionValue(0), (y) => {
    if (customTransformY) {
      const scrollY = -y;
      const start = 1700;
      const end = 2900;
      const progress = (scrollY - start) / (end - start);
      return Math.max(0, Math.min(progress, 1));
    }
    return 0;
  });

  const scrollYProgress = customTransformY ? mappedProgress : localProgress;

  // Smooth out raw scroll port event ticks into buttery spring movements
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,    // Lower stiffness for a luxurious, gliding inertia feel
    damping: 24,      // Strong damping to prevent card oscillations on landing
    restDelta: 0.001
  });

  // ==========================================
  // SCROLL TRANSFORM MAPPINGS (STAGGERED SMOOTH DEALS)
  // Cards fly in and land in sequence as the section scrolls into view!
  // ==========================================

  // Card 1: Freelancer / Web Dev [0.0 - 0.5]
  const x1 = useTransform(smoothProgress, [0.0, 0.5], ["-50vw", "0vw"]);
  const y1 = useTransform(smoothProgress, [0.0, 0.5], ["-20vh", "0vh"]);
  const rotate1 = useTransform(smoothProgress, [0.0, 0.5], [-25, -1.5]);
  const scale1 = useTransform(smoothProgress, [0.0, 0.5], [1.1, 1]);
  const opacity1 = useTransform(smoothProgress, [0.0, 0.1, 0.5], [0, 1, 1]);

  // Card 2: Backend Developer [0.15 - 0.65]
  const x2 = useTransform(smoothProgress, [0.15, 0.65], ["50vw", "0vw"]);
  const y2 = useTransform(smoothProgress, [0.15, 0.65], ["-20vh", "0vh"]);
  const rotate2 = useTransform(smoothProgress, [0.15, 0.65], [25, 2]);
  const scale2 = useTransform(smoothProgress, [0.15, 0.65], [1.1, 1]);
  const opacity2 = useTransform(smoothProgress, [0.15, 0.25, 0.65], [0, 1, 1]);

  // Card 3: Roller Skating [0.3 - 0.8]
  const x3 = useTransform(smoothProgress, [0.3, 0.8], ["-50vw", "0vw"]);
  const y3 = useTransform(smoothProgress, [0.3, 0.8], ["20vh", "0vh"]);
  const rotate3 = useTransform(smoothProgress, [0.3, 0.8], [-20, -2]);
  const scale3 = useTransform(smoothProgress, [0.3, 0.8], [1.1, 1]);
  const opacity3 = useTransform(smoothProgress, [0.3, 0.4, 0.8], [0, 1, 1]);

  // Card 4: Music Mixing [0.45 - 0.95]
  const x4 = useTransform(smoothProgress, [0.45, 0.95], ["50vw", "0vw"]);
  const y4 = useTransform(smoothProgress, [0.45, 0.95], ["20vh", "0vh"]);
  const rotate4 = useTransform(smoothProgress, [0.45, 0.95], [20, 1.5]);
  const scale4 = useTransform(smoothProgress, [0.45, 0.95], [1.1, 1]);
  const opacity4 = useTransform(smoothProgress, [0.45, 0.55, 0.95], [0, 1, 1]);

  // Card 5: Videography [0.6 - 1.0]
  const x5 = useTransform(smoothProgress, [0.6, 1.0], ["0vw", "0vw"]);
  const y5 = useTransform(smoothProgress, [0.6, 1.0], ["40vh", "0vh"]);
  const rotate5 = useTransform(smoothProgress, [0.6, 1.0], [10, -0.5]);
  const scale5 = useTransform(smoothProgress, [0.6, 1.0], [1.08, 1]);
  const opacity5 = useTransform(smoothProgress, [0.6, 0.7, 1.0], [0, 1, 1]);

  const handleTabletopClick = () => {
    setFocusedMobileCard(null);
  };

  const renderTableContent = (colorClass) => {
    return (
      <div className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-16 relative z-20 ${colorClass}`}>
        
        {/* Section Header */}
        <div className="w-full text-center mb-12 pointer-events-none select-none flex flex-col items-center">
          <h2 className="font-mono text-xs tracking-widest font-black uppercase mb-3">
            // OPERATING_CAPABILITIES // DEALT_HAND
          </h2>
          <h3 className="text-4xl md:text-6xl font-display font-black tracking-tighter">
            What I actually do.
          </h3>
        </div>

        {/* ========================================================
            DESKTOP VIEWPORT: Cards deal into their grid blueprint slots
            ======================================================== */}
        <div className="hidden lg:grid grid-cols-12 gap-8 w-full relative p-2 items-stretch">
          
          {/* Card 1: Freelancer / Web Dev */}
          <motion.div
            style={{ x: x1, y: y1, rotate: rotate1, scale: scale1, opacity: opacity1 }}
            className="col-span-6 glass-panel p-8 rounded-3xl border-white hover:bg-white/5 transition-all duration-300 group flex flex-col justify-between min-h-[240px] relative text-inherit"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-display font-black tracking-tight">
                  Freelancer / Web Dev<span className="font-mono select-none ml-1 animate-pulse font-bold">_</span>
                </h4>
                <svg className="w-8 h-8 stroke-[1.2] fill-none" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" />
                  <path d="M 6 8 L 10 12 L 6 16" stroke="currentColor" />
                  <line x1="12" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <p className="opacity-70 text-sm leading-relaxed font-light mb-6">
                Helping businesses design a creative online front desk that makes visitors actually want to stick around. I build custom digital lobbies that are super friendly, extremely smooth, and totally jargon-free.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-mono text-[10px] font-bold">check out</span>
              <a
                href="https://www.softleaf.co"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-current bg-transparent font-mono text-[10px] hover:bg-white/10 transition-all duration-300 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                WWW.SOFTLEAF.CO →
              </a>
            </div>
          </motion.div>

          {/* Card 2: Backend Developer */}
          <motion.div
            style={{ x: x2, y: y2, rotate: rotate2, scale: scale2, opacity: opacity2 }}
            className="col-span-6 glass-panel p-8 rounded-3xl border-white hover:bg-white/5 transition-all duration-300 group flex flex-col justify-between min-h-[240px] relative text-inherit"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-display font-black tracking-tight">
                  Backend Developer
                </h4>
                <div className="flex gap-1.5 items-center">
                  <svg className="w-8 h-8 stroke-[1.2] fill-none" viewBox="0 0 24 24">
                    <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" />
                    <path d="M 4 6 L 4 12 A 8 3 0 0 0 20 12 L 20 6" stroke="currentColor" />
                    <path d="M 4 12 L 4 18 A 8 3 0 0 0 20 18 L 20 12" stroke="currentColor" />
                    <line x1="12" y1="9" x2="12" y2="15" stroke="currentColor" strokeDasharray="2,2" />
                  </svg>
                </div>
              </div>
              <p className="opacity-70 text-sm leading-relaxed font-light mb-6">
                I designed and built the backend of HustleIt systems. It's production stable, fast, and engineered to scale seamlessly.
              </p>
            </div>
            
            <div className="absolute right-6 bottom-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <svg className="w-10 h-10 text-current opacity-50" viewBox="0 0 40 40" fill="none">
                <path d="M 5 10 C 5 7, 35 7, 35 10 L 35 15 C 35 18, 5 18, 5 15 Z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M 5 20 C 5 17, 35 17, 35 20 L 35 25 C 35 28, 5 28, 5 25 Z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M 5 30 C 5 27, 35 27, 35 30 L 35 35 C 35 38, 5 38, 5 35 Z" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="9" cy="12.5" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDuration: '0.8s' }} />
                <circle cx="9" cy="22.5" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDuration: '0.8s', animationDelay: '0.25s' }} />
                <circle cx="9" cy="32.5" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDuration: '0.8s', animationDelay: '0.5s' }} />
              </svg>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-mono text-[10px] font-bold">Node, Rust & Database</span>
              <span className="font-mono text-[9px] bg-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                PRODUCTION_STABLE
              </span>
            </div>
          </motion.div>

          {/* Card 3: Roller Skating */}
          <motion.div
            style={{ x: x3, y: y3, rotate: rotate3, scale: scale3, opacity: opacity3 }}
            className="col-span-6 glass-panel p-8 rounded-3xl border-white hover:bg-white/5 transition-all duration-300 group flex flex-col justify-between min-h-[240px] relative text-inherit"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-display font-black tracking-tight">
                  Roller Skating
                </h4>
                <svg className="w-8 h-8 stroke-[1.2] fill-none" viewBox="0 0 24 24">
                  <circle cx="6" cy="18" r="3" stroke="currentColor" />
                  <circle cx="12" cy="18" r="3" stroke="currentColor" />
                  <circle cx="18" cy="18" r="3" stroke="currentColor" />
                  <path d="M 3 15 L 21 15 L 18 10 L 6 10 Z" stroke="currentColor" />
                  <path d="M 6 10 L 8 4 L 14 4 L 14 10" stroke="currentColor" />
                </svg>
              </div>
              <p className="opacity-70 text-sm leading-relaxed font-light mb-6">
                Carving high-velocity corners on eight wheels because flying fast on concrete is the ultimate freedom. Plus, if the AI apocalypse does happen, I can easily glide away from the slow-moving metal bots.
              </p>
            </div>

            <div className="absolute bottom-16 left-0 right-0 h-8 opacity-80 pointer-events-none overflow-hidden">
              <div className="absolute left-1/4 top-0 animate-skate">
                <svg className="w-10 h-7 stroke-[1.5] fill-none" viewBox="0 0 24 16">
                  <path d="M 2 10 L 4 4 C 5 3, 10 3, 11 4 L 12 7 L 16 8 C 18 9, 20 9, 21 11 L 22 12 L 21 13 L 2 13 Z" stroke="currentColor" />
                  <circle cx="6" cy="14" r="2" stroke="currentColor" fill="currentColor" />
                  <circle cx="16" cy="14" r="2" stroke="currentColor" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-mono text-[10px] font-bold">quad roller skates</span>
              <span className="font-mono text-[9px] bg-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                SUBDISTRICT_2ND
              </span>
            </div>
          </motion.div>

          {/* Card 4: Music Mixing */}
          <motion.div
            style={{ x: x4, y: y4, rotate: rotate4, scale: scale4, opacity: opacity4 }}
            className="col-span-6 glass-panel p-8 rounded-3xl border-white hover:bg-white/5 transition-all duration-300 group flex flex-col justify-between min-h-[240px] relative text-inherit"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-display font-black tracking-tight">
                  Music Mixing
                </h4>
                <svg className="w-8 h-8 stroke-[1.2] fill-none" viewBox="0 0 24 24">
                  <circle cx="7" cy="12" r="5" stroke="currentColor" />
                  <circle cx="7" cy="12" r="1.5" stroke="currentColor" />
                  <circle cx="17" cy="12" r="5" stroke="currentColor" />
                  <circle cx="17" cy="12" r="1.5" stroke="currentColor" />
                  <path d="M 11 6 L 13 6 M 11 18 L 13 18" stroke="currentColor" />
                </svg>
              </div>
              <p className="opacity-70 text-sm leading-relaxed font-light mb-6">
                Finding the absolute sweet spot between two different songs and blending them into a single, seamless groove. Because life is better when good beats come together perfectly.
              </p>
            </div>

            <div className="absolute right-6 bottom-16 opacity-80 pointer-events-none flex gap-2">
              <svg className="w-7 h-7 animate-spin" style={{ animationDuration: '4s' }} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              </svg>
              <svg className="w-7 h-7 animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              </svg>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-mono text-[10px] font-bold">VirtualDJ</span>
              <span className="font-mono text-[9px] bg-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                MIX_ACTIVE
              </span>
            </div>
          </motion.div>

          {/* Card 5: Videography */}
          <motion.div
            style={{ x: x5, y: y5, rotate: rotate5, scale: scale5, opacity: opacity5 }}
            className="col-span-12 glass-panel p-8 rounded-3xl border-white hover:bg-white/[0.01] transition-all duration-300 group shadow-xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Details */}
              <div className="text-right pr-6 md:pr-12 flex flex-col justify-between h-full min-h-[180px]">
                <div>
                  <h4 className="text-3xl font-display font-black tracking-tight mb-4">
                    Videography
                  </h4>
                  <p className="opacity-70 text-sm leading-relaxed font-light mb-6">
                    I make reality look significantly better than it actually is. Ugly interfaces physically offend me.
                  </p>
                </div>
                <span className="font-mono text-[10px] opacity-40">
                  4K DCI / 60 FPS / Color Grading / CSS Blueprints
                </span>
              </div>

              {/* Right Viewport Screen */}
              <div className="w-full h-full flex items-center justify-center pl-6 md:pl-12">
                <div className="relative w-full aspect-video rounded-2xl z-10">
                  <div className="w-full h-full bg-black rounded-xl border border-white/20 overflow-hidden relative shadow-2xl flex flex-col">
                    {/* Toolbar */}
                    <div className="h-8 border-b border-white/10 flex items-center px-3 gap-1.5 bg-white/[0.01] z-20">
                      <div className="w-2 h-2 rounded-full bg-red-500/80" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <div className="w-2 h-2 rounded-full bg-green-500/80" />
                      <div className="mx-auto font-mono text-[9px] text-white/30 tracking-widest">
                        VIEWPORT_01_RAW_REC.mov
                      </div>
                    </div>
                    {/* Screen content */}
                    <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                      <AsyncVideo 
                        src="https://res.cloudinary.com/doqzzziw0/video/upload/q_auto/f_auto/v1780165372/InShot_20260530_232946203_m3qsgb.mp4"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        isGravityActive={isGravityActive}
                      />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] mix-blend-overlay z-10 pointer-events-none"></div>
                      
                      {/* Dynamic Old-TV Static Snow Overlay Easter Egg */}
                      <div className={`tv-static absolute inset-0 pointer-events-none transition-all duration-700 ${isGravityActive ? 'opacity-90 bg-black z-30' : 'opacity-[0.08] z-10'}`} />

                      <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/10 -translate-x-1/2 pointer-events-none z-10" />
                      <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/10 -translate-y-1/2 pointer-events-none z-10" />
                      <div className="w-16 h-16 border border-white/20 flex items-center justify-center relative z-20 pointer-events-none">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/40" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/40" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/40" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/40" />
                      </div>
                      <div className="absolute bottom-3 right-4 font-mono text-[8px] text-white/90 tracking-widest z-10">16:9 / 4K / 60FPS</div>
                      <div className="absolute bottom-3 left-4 font-mono text-[8px] text-white/40 tracking-widest z-10">LENS: 35MM / ISO: 400</div>
                      <div className="absolute top-3 right-4 font-mono text-[8px] text-red-500 flex items-center gap-1 tracking-wider z-10">
                        <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></span>REC
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================
            MOBILE VIEWPORT: Fanned overlapping cards pile in center
            ======================================================== */}
        <div 
          className="lg:hidden relative w-full flex items-center justify-center"
          style={{ minHeight: "360px" }}
        >
          <div className="relative w-full max-w-[340px] h-[340px] flex items-center justify-center">
            
            {/* Card 1: Freelancer / Web Dev */}
            <motion.div
              style={{ x: x1, y: y1, rotate: rotate1, scale: scale1, opacity: opacity1 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 1 ? null : 1);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer ${
                focusedMobileCard === 1
                  ? 'z-50 scale-105 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-10 translate-x-[-12px] translate-y-[-10px] -rotate-6 hover:translate-y-[-18px]'
              }`}
            >
              <div>
                <h4 className="text-xl font-display font-black mb-2">
                  Freelancer / Web Dev
                </h4>
                <p className="opacity-70 text-xs leading-relaxed font-light">
                  Helping businesses design a creative online front desk that makes visitors actually want to stick around. I build custom digital lobbies that are super friendly, extremely smooth, and totally jargon-free.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[9px] font-mono opacity-80">
                <span className="font-bold">check out</span>
                <span>TAP TO ZOOM</span>
              </div>
            </motion.div>

            {/* Card 2: Backend Developer */}
            <motion.div
              style={{ x: x2, y: y2, rotate: rotate2, scale: scale2, opacity: opacity2 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 2 ? null : 2);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer ${
                focusedMobileCard === 2
                  ? 'z-50 scale-105 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-20 translate-x-[-4px] translate-y-[-5px] -rotate-3 hover:translate-y-[-12px]'
              }`}
            >
              <div>
                <h4 className="text-xl font-display font-black mb-2">
                  Backend Developer
                </h4>
                <p className="opacity-70 text-xs leading-relaxed font-light">
                  I designed and built the backend of HustleIt systems. It's production stable, fast, and engineered to scale seamlessly.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[9px] font-mono opacity-80">
                <span className="font-bold">Node, Rust & Database</span>
                <span>TAP TO ZOOM</span>
              </div>
            </motion.div>

            {/* Card 3: Roller Skating */}
            <motion.div
              style={{ x: x3, y: y3, rotate: rotate3, scale: scale3, opacity: opacity3 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 3 ? null : 3);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer ${
                focusedMobileCard === 3
                  ? 'z-50 scale-105 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-30 translate-x-0 translate-y-0 rotate-0 hover:translate-y-[-8px]'
              }`}
            >
              <div>
                <h4 className="text-xl font-display font-black mb-2">
                  Roller Skating
                </h4>
                <p className="opacity-70 text-xs leading-relaxed font-light">
                  Carving high-velocity corners on eight wheels because flying fast on concrete is the ultimate freedom. Plus, if the AI apocalypse does happen, I can easily glide away from the slow-moving metal bots.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[9px] font-mono opacity-80">
                <span className="font-bold">quad roller skates</span>
                <span>TAP TO ZOOM</span>
              </div>
            </motion.div>

            {/* Card 4: Music Mixing */}
            <motion.div
              style={{ x: x4, y: y4, rotate: rotate4, scale: scale4, opacity: opacity4 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 4 ? null : 4);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer ${
                focusedMobileCard === 4
                  ? 'z-50 scale-105 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-40 translate-x-[4px] translate-y-[-5px] rotate-3 hover:translate-y-[-12px]'
              }`}
            >
              <div>
                <h4 className="text-xl font-display font-black mb-2">
                  Music Mixing
                </h4>
                <p className="opacity-70 text-xs leading-relaxed font-light">
                  Finding the absolute sweet spot between two different songs and blending them into a single, seamless groove. Because life is better when good beats come together perfectly.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[9px] font-mono opacity-80">
                <span className="font-bold">VirtualDJ</span>
                <span>TAP TO ZOOM</span>
              </div>
            </motion.div>

            {/* Card 5: Videography */}
            <motion.div
              style={{ x: x5, y: y5, rotate: rotate5, scale: scale5, opacity: opacity5 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 5 ? null : 5);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                focusedMobileCard === 5
                  ? 'z-50 scale-105 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-45 translate-x-[12px] translate-y-[-10px] rotate-6 hover:translate-y-[-18px]'
              }`}
            >
              {focusedMobileCard === 5 ? (
                // Full view when focused on mobile
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h4 className="text-xl font-display font-black mb-2">
                      Videography
                    </h4>
                    <p className="opacity-70 text-xs leading-relaxed font-light mb-3">
                      I make reality look significantly better than it actually is.
                    </p>
                  </div>
                  {/* Viewport Screen */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex flex-col border border-white/20 mb-2">
                    <div className="h-6 border-b border-white/10 flex items-center px-2 bg-white/[0.01] z-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                      <div className="mx-auto font-mono text-[7px] text-white/30 tracking-widest">
                        RAW_REC.mov
                      </div>
                    </div>
                    <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                      <AsyncVideo 
                        src="https://res.cloudinary.com/doqzzziw0/video/upload/q_auto/f_auto/v1780165372/InShot_20260530_232946203_m3qsgb.mp4"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        isGravityActive={isGravityActive}
                      />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] mix-blend-overlay z-10 pointer-events-none"></div>
                      
                      {/* Dynamic Old-TV Static Snow Overlay Easter Egg on Mobile */}
                      <div className={`tv-static absolute inset-0 pointer-events-none transition-all duration-700 ${isGravityActive ? 'opacity-90 bg-black z-30' : 'opacity-[0.08] z-10'}`} />

                      <div className="w-8 h-8 border border-white/20 flex items-center justify-center relative z-20">
                        <div className="w-1 h-1 bg-red-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[9px] font-mono opacity-80">
                    <span>4K / 60 FPS</span>
                    <span>TAP TO RESET</span>
                  </div>
                </div>
              ) : (
                // Stack preview view
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h4 className="text-xl font-display font-black mb-2">
                      Videography
                    </h4>
                    <p className="opacity-70 text-xs leading-relaxed font-light">
                      I make reality look significantly better than it actually is.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[9px] font-mono opacity-80">
                    <span>4K / 60 FPS</span>
                    <span>TAP TO PLAY</span>
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        </div>

        {/* Technical Status Indicator Footer */}
        <div className="w-full border-t border-white/10 pt-4 flex items-center justify-between font-mono text-[9px] opacity-30 uppercase tracking-widest pointer-events-none select-none z-20">
          <span></span>
          <span className="flex items-center gap-1.5">
          </span>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <section 
        ref={containerRef} 
        className="pt-16 pb-12 relative bg-transparent overflow-hidden"
        onClick={handleTabletopClick}
      >
        {/* Table Felt Backdrops & Blueprint Grid Overlay */}
        <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
        <div className="w-full px-4 text-light-pink fill-light-pink stroke-light-pink">
          {renderTableContent("text-light-pink")}
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef} 
      className="pt-24 pb-12 relative bg-transparent overflow-hidden"
      onClick={handleTabletopClick}
    >
      {/* Table Felt Backdrops & Blueprint Grid Overlay */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      <div className="relative w-full">
        {/* Layout Driver (Invisible) */}
        <div className="opacity-0 pointer-events-none select-none w-full">
          {renderTableContent("")}
        </div>

        {/* Left Column Layer (Light Pink on Dark Coral) */}
        <div className="absolute left-0 top-0 bottom-0 w-[50vw] overflow-hidden text-light-pink fill-light-pink stroke-light-pink z-10">
          <div className="w-screen h-full text-inherit fill-inherit stroke-inherit relative">
            {renderTableContent("text-light-pink")}
          </div>
        </div>

        {/* Right Column Layer (Dark Coral on Light Pink) */}
        <div className="absolute left-[50vw] top-0 bottom-0 w-[50vw] overflow-hidden text-dark-coral fill-dark-coral stroke-dark-coral z-10">
          <div 
            className="w-screen h-full text-inherit fill-inherit stroke-inherit relative"
            style={{ left: '-50vw' }}
          >
            {renderTableContent("text-dark-coral")}
          </div>
        </div>
      </div>
    </section>
  );
}
