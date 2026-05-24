import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function CardTableCapabilities() {
  const containerRef = React.useRef(null);
  const [focusedMobileCard, setFocusedMobileCard] = React.useState(null);

  // Track scroll progress as the section moves from bottom-of-screen to center-of-screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

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

  return (
    <section 
      ref={containerRef} 
      className="pt-24 pb-12 relative bg-[#020202] border-t border-white/5 overflow-hidden"
      onClick={handleTabletopClick}
    >
      {/* Table Felt Backdrops & Blueprint Grid Overlay */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00ffcc]/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Table Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-16 relative z-20">
        
        {/* Section Header */}
        <div className="w-full text-left flex items-center justify-between pointer-events-none select-none">
          <div>
            <h2 className="text-[#00ffcc] font-mono text-xs tracking-widest font-black uppercase mb-2">
              // OPERATING_CAPABILITIES // DEALT_HAND
            </h2>
            <h3 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white">
              What I actually do.
            </h3>
          </div>
          <span className="hidden md:inline-block font-mono text-[9px] text-white/20 tracking-widest uppercase">
            SCROLL_TO_DEAL_CARDS
          </span>
        </div>

        {/* ========================================================
            DESKTOP VIEWPORT: Cards deal into their grid blueprint slots
            ======================================================== */}
        <div className="hidden lg:grid grid-cols-12 gap-8 w-full relative p-2 items-stretch">
          
          {/* Card 1: Freelancer / Web Dev */}
          <motion.div
            style={{ x: x1, y: y1, rotate: rotate1, scale: scale1, opacity: opacity1 }}
            className="col-span-6 glass-panel p-8 rounded-3xl border-white/5 hover:border-[#00ffcc]/30 hover:bg-[#00ffcc]/[0.01] transition-all duration-300 group flex flex-col justify-between min-h-[240px] relative shadow-lg"
          >
            <div>
              <span className="text-[9px] text-white/30 font-mono tracking-widest block uppercase mb-3">
                CAPABILITY_01 // VISUAL
              </span>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-display font-black tracking-tight text-white group-hover:text-[#00ffcc] transition-colors">
                  Freelancer / Web Dev
                </h4>
                <svg className="w-8 h-8 text-[#00ffcc] stroke-[1.2] fill-none filter drop-shadow-[0_0_8px_rgba(0,255,204,0.2)] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" />
                  <path d="M 6 8 L 10 12 L 6 16" stroke="currentColor" />
                  <line x1="12" y1="16" x2="18" y2="16" stroke="#00ffcc" strokeWidth="1.8" />
                </svg>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                Turning caffeine and vague "make it pop" requests into functional architecture.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="font-mono text-[10px] text-white/20">Figma & React Stack</span>
              <a
                href="https://www.softleaf.co"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-white/60 hover:bg-[#00ffcc]/10 hover:text-[#00ffcc] hover:border-[#00ffcc]/30 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                WWW.SOFTLEAF.CO →
              </a>
            </div>
          </motion.div>

          {/* Card 2: Backend Developer */}
          <motion.div
            style={{ x: x2, y: y2, rotate: rotate2, scale: scale2, opacity: opacity2 }}
            className="col-span-6 glass-panel p-8 rounded-3xl border-white/5 hover:border-[#00ffcc]/30 hover:bg-[#00ffcc]/[0.01] transition-all duration-300 group flex flex-col justify-between min-h-[240px] relative shadow-lg"
          >
            <div>
              <span className="text-[9px] text-white/30 font-mono tracking-widest block uppercase mb-3">
                CAPABILITY_02 // SYSTEM
              </span>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-display font-black tracking-tight text-white group-hover:text-white/90 transition-colors">
                  Backend Developer
                </h4>
                <svg className="w-8 h-8 text-[#00ffcc] stroke-[1.2] fill-none filter drop-shadow-[0_0_8px_rgba(0,255,204,0.2)] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" />
                  <path d="M 4 6 L 4 12 A 8 3 0 0 0 20 12 L 20 6" stroke="currentColor" />
                  <path d="M 4 12 L 4 18 A 8 3 0 0 0 20 18 L 20 12" stroke="currentColor" />
                  <line x1="12" y1="9" x2="12" y2="15" stroke="#00ffcc" strokeDasharray="2,2" />
                </svg>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                I do the dark, unglamorous magic in the shadows so your front-end buttons actually do something.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="font-mono text-[10px] text-white/20">Node, Rust & Database Stack</span>
              <span className="font-mono text-[9px] text-[#00ffcc] bg-[#00ffcc]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                PRODUCTION_STABLE
              </span>
            </div>
          </motion.div>

          {/* Card 3: Roller Skating */}
          <motion.div
            style={{ x: x3, y: y3, rotate: rotate3, scale: scale3, opacity: opacity3 }}
            className="col-span-6 glass-panel p-8 rounded-3xl border-white/5 hover:border-[#00ffcc]/30 hover:bg-[#00ffcc]/[0.01] transition-all duration-300 group flex flex-col justify-between min-h-[240px] relative shadow-lg"
          >
            <div>
              <span className="text-[9px] text-white/30 font-mono tracking-widest block uppercase mb-3">
                CAPABILITY_03 // KINETIC
              </span>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-display font-black tracking-tight text-white group-hover:text-[#00ffcc] transition-colors">
                  Roller Skating
                </h4>
                <svg className="w-8 h-8 text-[#00ffcc] stroke-[1.2] fill-none filter drop-shadow-[0_0_8px_rgba(0,255,204,0.2)] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <circle cx="6" cy="18" r="3" stroke="currentColor" />
                  <circle cx="12" cy="18" r="3" stroke="currentColor" />
                  <circle cx="18" cy="18" r="3" stroke="currentColor" />
                  <path d="M 3 15 L 21 15 L 18 10 L 6 10 Z" stroke="currentColor" />
                  <path d="M 6 10 L 8 4 L 14 4 L 14 10" stroke="#00ffcc" />
                </svg>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                Speed, balance, and carving high-velocity corners on wheels. Subdistrict 2nd place winner, proving my speed is stable on concrete as well as in production.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="font-mono text-[10px] text-white/20">Speed & Inline Chassis Stack</span>
              <span className="font-mono text-[9px] text-[#00ffcc] bg-[#00ffcc]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                SUBDISTRICT_2ND
              </span>
            </div>
          </motion.div>

          {/* Card 4: Music Mixing */}
          <motion.div
            style={{ x: x4, y: y4, rotate: rotate4, scale: scale4, opacity: opacity4 }}
            className="col-span-6 glass-panel p-8 rounded-3xl border-white/5 hover:border-[#00ffcc]/30 hover:bg-[#00ffcc]/[0.01] transition-all duration-300 group flex flex-col justify-between min-h-[240px] relative shadow-lg"
          >
            <div>
              <span className="text-[9px] text-white/30 font-mono tracking-widest block uppercase mb-3">
                CAPABILITY_04 // ACOUSTIC
              </span>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-display font-black tracking-tight text-white group-hover:text-[#00ffcc] transition-colors">
                  Music Mixing
                </h4>
                <svg className="w-8 h-8 text-[#00ffcc] stroke-[1.2] fill-none filter drop-shadow-[0_0_8px_rgba(0,255,204,0.2)] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <circle cx="7" cy="12" r="5" stroke="currentColor" />
                  <circle cx="7" cy="12" r="1.5" stroke="#00ffcc" />
                  <circle cx="17" cy="12" r="5" stroke="currentColor" />
                  <circle cx="17" cy="12" r="1.5" stroke="#00ffcc" />
                  <path d="M 11 6 L 13 6 M 11 18 L 13 18" stroke="currentColor" />
                </svg>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                Layering frequencies and beatmatching. mixing tracks together is just real-time compilation: combining distinct audio signals into a perfect harmony.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="font-mono text-[10px] text-white/20">Turntables & Faders Stack</span>
              <span className="font-mono text-[9px] text-[#00ffcc] bg-[#00ffcc]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                MIX_ACTIVE
              </span>
            </div>
          </motion.div>

          {/* Card 5: Videography */}
          <motion.div
            style={{ x: x5, y: y5, rotate: rotate5, scale: scale5, opacity: opacity5 }}
            className="col-span-12 glass-panel p-8 rounded-3xl border-white/5 hover:border-[#00ffcc]/30 transition-all duration-300 group shadow-xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Details */}
              <div className="lg:col-span-5 text-left flex flex-col justify-between h-full min-h-[180px]">
                <div>
                  <span className="text-[9px] text-white/30 font-mono tracking-widest block uppercase mb-3">
                    CAPABILITY_05 // CINEMATIC
                  </span>
                  <h4 className="text-3xl font-display font-black tracking-tight text-white mb-4">
                    Videography
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                    I make reality look significantly better than it actually is. Ugly interfaces physically offend me.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-white/20">
                  4K DCI / 60 FPS / Color Grading / CSS Blueprints
                </span>
              </div>

              {/* Right Viewport Screen */}
              <div className="lg:col-span-7 w-full h-full flex items-center justify-center">
                <div className="relative w-full aspect-video rounded-2xl z-10 group-hover:shadow-[0_0_40px_rgba(0,255,204,0.1)] transition-shadow duration-500">
                  <div className="absolute -inset-2 bg-gradient-to-b from-[#00ffcc]/5 to-transparent blur-[20px] opacity-40 rounded-[2rem] -z-10" />
                  <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden relative shadow-2xl flex flex-col">
                    {/* Toolbar */}
                    <div className="h-8 border-b border-white/10 flex items-center px-3 gap-1.5 bg-white/[0.01] z-20">
                      <div className="w-2 h-2 rounded-full bg-red-500/80" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <div className="w-2 h-2 rounded-full bg-[#00ffcc]" />
                      <div className="mx-auto font-mono text-[9px] text-white/20 tracking-widest">
                        VIEWPORT_01_RAW_REC.mov
                      </div>
                    </div>
                    {/* Viewport Screen */}
                    <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                      <video 
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:opacity-75 transition-opacity duration-500"
                        src="/raw_rec.mp4"
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                      />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] mix-blend-overlay z-10 pointer-events-none"></div>
                      <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/10 -translate-x-1/2 pointer-events-none z-10" />
                      <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/10 -translate-y-1/2 pointer-events-none z-10" />
                      <div className="w-16 h-16 border border-white/20 flex items-center justify-center relative z-20 pointer-events-none">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#00ffcc]" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#00ffcc]" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#00ffcc]" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#00ffcc]" />
                      </div>
                      <div className="absolute bottom-3 right-4 font-mono text-[8px] text-[#00ffcc]/70 tracking-widest z-10">16:9 / 4K / 60FPS</div>
                      <div className="absolute bottom-3 left-4 font-mono text-[8px] text-white/30 tracking-widest z-10">LENS: 35MM / ISO: 400</div>
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
          {/* Centered Stacking Card Deck Anchor */}
          <div className="relative w-full max-w-[340px] h-[340px] flex items-center justify-center">
            
            {/* Card 1: Freelancer / Web Dev */}
            <motion.div
              style={{ x: x1, y: y1, rotate: rotate1, scale: scale1, opacity: opacity1 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 1 ? null : 1);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white/5 flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer ${
                focusedMobileCard === 1
                  ? 'z-50 scale-105 border-[#00ffcc]/60 shadow-[0_0_30px_rgba(0,255,204,0.25)] shadow-[0_0_30px_rgba(0,255,204,0.35)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-10 translate-x-[-12px] translate-y-[-10px] -rotate-6 hover:translate-y-[-18px]'
              }`}
            >
              <div>
                <span className="text-[8px] text-[#00ffcc] font-mono tracking-widest block uppercase mb-1">
                  01 // VISUAL
                </span>
                <h4 className="text-xl font-display font-black text-white mb-2">
                  Freelancer / Web Dev
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  Turning caffeine and vague "make it pop" requests into functional architecture.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
                <span>Figma & React Stack</span>
                <span className="text-[#00ffcc]">TAP TO ZOOM</span>
              </div>
            </motion.div>

            {/* Card 2: Backend Developer */}
            <motion.div
              style={{ x: x2, y: y2, rotate: rotate2, scale: scale2, opacity: opacity2 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 2 ? null : 2);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white/5 flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer ${
                focusedMobileCard === 2
                  ? 'z-50 scale-105 border-[#00ffcc]/60 shadow-[0_0_30px_rgba(0,255,204,0.25)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-20 translate-x-[-4px] translate-y-[-5px] -rotate-3 hover:translate-y-[-12px]'
              }`}
            >
              <div>
                <span className="text-[8px] text-[#00ffcc] font-mono tracking-widest block uppercase mb-1">
                  02 // SYSTEM
                </span>
                <h4 className="text-xl font-display font-black text-white mb-2">
                  Backend Developer
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  I do the dark, unglamorous magic in the shadows so your front-end buttons actually do something.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
                <span>Node & Rust Stack</span>
                <span className="text-[#00ffcc]">TAP TO ZOOM</span>
              </div>
            </motion.div>

            {/* Card 3: Roller Skating */}
            <motion.div
              style={{ x: x3, y: y3, rotate: rotate3, scale: scale3, opacity: opacity3 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 3 ? null : 3);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white/5 flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer ${
                focusedMobileCard === 3
                  ? 'z-50 scale-105 border-[#00ffcc]/60 shadow-[0_0_30px_rgba(0,255,204,0.25)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-30 translate-x-0 translate-y-0 rotate-0 hover:translate-y-[-8px]'
              }`}
            >
              <div>
                <span className="text-[8px] text-[#00ffcc] font-mono tracking-widest block uppercase mb-1">
                  03 // KINETIC
                </span>
                <h4 className="text-xl font-display font-black text-white mb-2">
                  Roller Skating
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  Speed, balance, and carving corners on wheels. Subdistrict 2nd place winner, proving concrete speed is stable.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
                <span>Speed Inline Chassis</span>
                <span className="text-[#00ffcc]">TAP TO ZOOM</span>
              </div>
            </motion.div>

            {/* Card 4: Music Mixing */}
            <motion.div
              style={{ x: x4, y: y4, rotate: rotate4, scale: scale4, opacity: opacity4 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 4 ? null : 4);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white/5 flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer ${
                focusedMobileCard === 4
                  ? 'z-50 scale-105 border-[#00ffcc]/60 shadow-[0_0_30px_rgba(0,255,204,0.25)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-40 translate-x-[4px] translate-y-[-5px] rotate-3 hover:translate-y-[-12px]'
              }`}
            >
              <div>
                <span className="text-[8px] text-[#00ffcc] font-mono tracking-widest block uppercase mb-1">
                  04 // ACOUSTIC
                </span>
                <h4 className="text-xl font-display font-black text-white mb-2">
                  Music Mixing
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  Layering frequencies and beatmatching. Mixing tracks is just real-time compilation: perfect harmony.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
                <span>Turntables & Faders</span>
                <span className="text-[#00ffcc]">TAP TO ZOOM</span>
              </div>
            </motion.div>

            {/* Card 5: Videography */}
            <motion.div
              style={{ x: x5, y: y5, rotate: rotate5, scale: scale5, opacity: opacity5 }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedMobileCard(focusedMobileCard === 5 ? null : 5);
              }}
              className={`absolute inset-0 glass-panel p-6 rounded-2xl border-white/5 flex flex-col justify-between shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                focusedMobileCard === 5
                  ? 'z-50 scale-105 border-[#00ffcc]/60 shadow-[0_0_30px_rgba(0,255,204,0.25)]'
                  : focusedMobileCard !== null
                  ? 'opacity-20 scale-95 pointer-events-none filter blur-[0.5px] z-10'
                  : 'z-45 translate-x-[12px] translate-y-[-10px] rotate-6 hover:translate-y-[-18px]'
              }`}
            >
              {focusedMobileCard === 5 ? (
                // Full view when focused on mobile
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="text-[8px] text-[#00ffcc] font-mono tracking-widest block uppercase mb-1">
                      05 // CINEMATIC
                    </span>
                    <h4 className="text-xl font-display font-black text-white mb-2">
                      Videography
                    </h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light mb-3">
                      I make reality look significantly better than it actually is.
                    </p>
                  </div>
                  {/* Viewport Screen */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex flex-col border border-white/10 mb-2">
                    <div className="h-6 border-b border-white/10 flex items-center px-2 bg-white/[0.01] z-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00ffcc]" />
                      <div className="mx-auto font-mono text-[7px] text-white/20 tracking-widest">
                        RAW_REC.mov
                      </div>
                    </div>
                    <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                      <video 
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
                        src="/raw_rec.mp4"
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                      />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] mix-blend-overlay z-10 pointer-events-none"></div>
                      <div className="w-8 h-8 border border-white/20 flex items-center justify-center relative z-20">
                        <div className="w-1 h-1 bg-red-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
                    <span>4K / 60 FPS</span>
                    <span className="text-[#00ffcc]">TAP TO RESET</span>
                  </div>
                </div>
              ) : (
                // Stack preview view
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="text-[8px] text-[#00ffcc] font-mono tracking-widest block uppercase mb-1">
                      05 // CINEMATIC
                    </span>
                    <h4 className="text-xl font-display font-black text-white mb-2">
                      Videography
                    </h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      I make reality look significantly better than it actually is.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/30">
                    <span>4K / 60 FPS</span>
                    <span className="text-[#00ffcc]">TAP TO PLAY</span>
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        </div>

        {/* Technical Status Indicator Footer */}
        <div className="w-full border-t border-white/5 pt-4 flex items-center justify-between font-mono text-[9px] text-white/30 uppercase tracking-widest pointer-events-none select-none z-20">
          <span>STATUS: REALTIME_CARD_TABLE_DEALT</span>
          <span className="text-[#00ffcc]/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse"></span>
            ACTIVE_HAND
          </span>
        </div>
      </div>
    </section>
  );
}
