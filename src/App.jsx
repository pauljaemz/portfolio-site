import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import ProblemSolverBlock from './components/ProblemSolverBlock';
import FloatingAsset from './components/FloatingAsset';
import EvolutionPath from './components/EvolutionPath';
import CardTableCapabilities from './components/CardTableCapabilities';
import GravitySandbox from './components/GravitySandbox';
import './index.css';

// Reusable animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1.0, ease: 'easeOut' },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { staggerChildren: 0.2 },
};

const fadeItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function App() {
  const sectionRef = React.useRef(null);
  const [isGravityActive, setIsGravityActive] = React.useState(false);
  const [isGravityResetting, setIsGravityResetting] = React.useState(false);

  // Sync isGravityResetting when gravity activates
  React.useEffect(() => {
    if (isGravityActive) {
      setIsGravityResetting(true);
    }
  }, [isGravityActive]);

  // Scroll automatic triggers: bottom engages collapse, absolute top resets everything
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 1. Scroll to the absolute bottom triggers gravity collapse (within 150px threshold)
      if (windowHeight + currentScrollY >= documentHeight - 150) {
        if (!isGravityActive) {
          setIsGravityActive(true);
          setIsGravityResetting(true); // Synchronously batch state update to prevent layout race conditions
        }
      }
      
      // 2. Scroll back to the absolute top of the website resets everything snap back
      if (currentScrollY <= 8 && isGravityActive) {
        setIsGravityActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isGravityActive]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to horizontal coordinates (moves right-to-left as user scrolls past)
  const planeX = useTransform(scrollYProgress, [0, 1], ["90vw", "-120vw"]);

  // Scroll-linked parachuting card drops in order as the plane flies right-to-left
  // Card 3 (Right column) drops first
  const card3DropY = useTransform(scrollYProgress, [0.08, 0.28], [-220, 0]);
  const card3DropOpacity = useTransform(scrollYProgress, [0.08, 0.24], [0, 1]);
  const card3DropScale = useTransform(scrollYProgress, [0.08, 0.28], [0.75, 1]);

  // Card 2 (Middle column) drops second
  const card2DropY = useTransform(scrollYProgress, [0.16, 0.36], [-220, 0]);
  const card2DropOpacity = useTransform(scrollYProgress, [0.16, 0.32], [0, 1]);
  const card2DropScale = useTransform(scrollYProgress, [0.16, 0.36], [0.75, 1]);

  // Card 1 (Left column) drops third (locks in by 0.44 progress)
  const card1DropY = useTransform(scrollYProgress, [0.24, 0.44], [-220, 0]);
  const card1DropOpacity = useTransform(scrollYProgress, [0.24, 0.40], [0, 1]);
  const card1DropScale = useTransform(scrollYProgress, [0.24, 0.44], [0.75, 1]);
  return (
    <main className={`min-h-screen bg-[#050505] text-white selection:bg-[#00ffcc]/30 font-sans overflow-x-hidden relative ${isGravityActive ? 'gravity-active' : ''}`}>
      <CustomCursor />

      {/* SECTION 1: THE INTRO / HERO (MASSIVE SCREEN-SPANNING TYPOGRAPHY & PHYSICS-BASED FLOATING ASSETS) */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 overflow-hidden py-16">
        {/* Animated, Drifting Gradient Color Spheres */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-[#00ffcc]/20 to-[#6366f1]/20 rounded-full blur-[110px] -z-10 mix-blend-screen pointer-events-none animate-drift-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#f59e0b]/15 to-[#4f46e5]/10 rounded-full blur-[130px] -z-10 mix-blend-screen pointer-events-none animate-drift-slower" />

        {/* Technical Dotted Grid Backdrop */}
        <div className="absolute inset-0 tech-grid opacity-50 -z-10 pointer-events-none" />

        {/* Spacing Anchor (Top) */}
        <div className="w-full pt-6 z-30" />

        {/* 6 Floating, Proximity-Repelling Background Assets (z-10, behind text) */}
        <div key={isGravityResetting ? 'active' : 'idle'} className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {/* Asset 1: Normal Car Outline */}
          <FloatingAsset initialLeft="12%" initialTop="14%" className="design-asset" isGravityActive={isGravityResetting}>
            <svg
              className="w-36 h-20 text-[#00ffcc]/35 stroke-[1.5] fill-none filter drop-shadow-[0_0_10px_rgba(0,255,204,0.1)]"
              viewBox="0 0 200 80"
            >
              <path
                d="M 10 55 L 25 50 L 45 42 C 55 38, 65 28, 85 26 C 110 24, 135 24, 155 32 L 175 38 C 185 42, 192 46, 195 55 L 190 60 L 170 60 C 168 48, 148 48, 146 60 L 54 60 C 52 48, 32 48, 30 60 L 10 60 Z"
                stroke="currentColor"
                strokeDasharray="4,4"
              />
              <path d="M 85 30 L 115 30 L 128 38 L 85 38 Z" stroke="currentColor" />
              <circle cx="42" cy="60" r="10" stroke="currentColor" />
              <circle cx="42" cy="60" r="3" stroke="#00ffcc" />
              <circle cx="158" cy="60" r="10" stroke="currentColor" />
              <circle cx="158" cy="60" r="3" stroke="#00ffcc" />
            </svg>
          </FloatingAsset>

          {/* Asset 2: Single-engine plane */}
          <FloatingAsset initialLeft="74%" initialTop="16%" className="design-asset" isGravityActive={isGravityActive}>
            <svg
              className="w-36 h-20 text-[#00ffcc]/35 stroke-[1.5] fill-none filter drop-shadow-[0_0_10px_rgba(0,255,204,0.1)]"
              viewBox="0 0 160 80"
            >
              <path
                d="M 20 40 L 30 36 L 50 34 L 75 35 L 125 44 L 140 44 L 145 28 L 150 28 L 146 46 L 148 48 L 144 50 L 115 50 L 70 48 L 40 46 L 25 44 L 20 40 Z"
                stroke="currentColor"
                strokeDasharray="4,4"
              />
              <path d="M 20 40 L 16 38 L 16 42 Z M 16 25 L 16 55" stroke="currentColor" />
              <path d="M 50 34 L 52 30 L 95 30 L 90 34 M 68 34 L 74 46" stroke="currentColor" />
              <path d="M 40 35 L 45 42 L 58 42 L 68 35 Z" stroke="#00ffcc" />
              <path d="M 60 48 L 56 58 M 32 45 L 32 58" stroke="currentColor" />
              <circle cx="56" cy="58" r="3" stroke="currentColor" />
              <circle cx="32" cy="58" r="3" stroke="currentColor" />
            </svg>
          </FloatingAsset>

          {/* Asset 3: Compact Front-View Digital Camera */}
          <FloatingAsset initialLeft="8%" initialTop="48%" className="design-asset" isGravityActive={isGravityActive}>
            <svg
              className="w-24 h-16 text-[#00ffcc]/35 stroke-[1.5] fill-none filter drop-shadow-[0_0_10px_rgba(0,255,204,0.1)]"
              viewBox="0 0 100 70"
            >
              <rect x="10" y="20" width="80" height="42" rx="4" stroke="currentColor" strokeDasharray="3,3" />
              <circle cx="50" cy="41" r="16" stroke="currentColor" />
              <circle cx="50" cy="41" r="9" stroke="#00ffcc" />
              <path d="M 44 35 A 8 8 0 0 1 56 35" stroke="currentColor" />
              <rect x="18" y="26" width="12" height="6" rx="1" stroke="currentColor" />
              <rect x="70" y="26" width="12" height="6" rx="1" stroke="#f59e0b" />
              <rect x="22" y="16" width="10" height="4" rx="1" stroke="currentColor" />
              <rect x="68" y="16" width="12" height="4" rx="1" stroke="currentColor" />
            </svg>
          </FloatingAsset>

          {/* Asset 4: Skating Shoes */}
          <FloatingAsset initialLeft="78%" initialTop="45%" className="design-asset" isGravityActive={isGravityActive}>
            <svg
              className="w-32 h-20 text-[#00ffcc]/35 stroke-[1.5] fill-none filter drop-shadow-[0_0_10px_rgba(0,255,204,0.1)]"
              viewBox="0 0 140 80"
            >
              <path
                d="M 25 50 L 30 20 C 35 15, 52 15, 55 20 L 58 35 L 75 42 C 85 45, 105 45, 110 52 L 115 54 L 110 58 L 25 58 Z"
                stroke="currentColor"
                strokeDasharray="4,4"
              />
              <path d="M 40 22 Q 48 30, 52 38" stroke="#00ffcc" />
              <path d="M 30 28 L 56 28 M 31 38 L 57 38" stroke="currentColor" />
              <rect x="22" y="58" width="94" height="6" rx="2" stroke="currentColor" />
              <circle cx="34" cy="69" r="8" stroke="currentColor" />
              <circle cx="34" cy="69" r="2" stroke="#00ffcc" />
              <circle cx="56" cy="69" r="8" stroke="currentColor" />
              <circle cx="56" cy="69" r="2" stroke="#00ffcc" />
              <circle cx="78" cy="69" r="8" stroke="currentColor" />
              <circle cx="78" cy="69" r="2" stroke="#00ffcc" />
              <circle cx="100" cy="69" r="8" stroke="currentColor" />
              <circle cx="100" cy="69" r="2" stroke="#00ffcc" />
            </svg>
          </FloatingAsset>

          {/* Asset 5: Open Laptop Outline */}
          <FloatingAsset initialLeft="42%" initialTop="78%" className="transform -translate-x-1/2 design-asset" isGravityActive={isGravityActive}>
            <svg
              className="w-32 h-20 text-[#00ffcc]/35 stroke-[1.5] fill-none filter drop-shadow-[0_0_10px_rgba(0,255,204,0.1)]"
              viewBox="0 0 140 80"
            >
              <path d="M 25 15 L 115 15 L 110 52 L 30 52 Z" stroke="currentColor" strokeDasharray="4,4" />
              <path d="M 38 22 L 58 22 M 38 30 L 78 30 M 38 38 L 68 38" stroke="#00ffcc" strokeOpacity="0.8" />
              <path d="M 38 46 L 50 46" stroke="#f59e0b" />
              <path d="M 30 52 L 15 62 L 125 62 L 110 52" stroke="currentColor" />
              <path d="M 15 62 C 15 65, 20 66, 25 66 L 115 66 C 120 66, 125 65, 125 62" stroke="currentColor" />
              <rect x="35" y="55" width="70" height="4" rx="1" stroke="currentColor" strokeOpacity="0.4" />
              <rect x="58" y="60" width="24" height="4" rx="1" stroke="currentColor" />
            </svg>
          </FloatingAsset>

          {/* Asset 6: 'hustleit' Text */}
          <FloatingAsset initialLeft="44%" initialTop="26%" className="transform -translate-x-1/2 design-asset" isGravityActive={isGravityActive}>
            <div className="px-5 py-2.5 border border-[#00ffcc]/10 bg-black/45 backdrop-blur-md rounded-2xl filter drop-shadow-[0_0_15px_rgba(0,255,204,0.12)]">
              <h4
                className="font-mono text-xl md:text-2xl font-black uppercase text-transparent tracking-[0.25em]"
                style={{ WebkitTextStroke: '1px rgba(0, 255, 204, 0.6)' }}
              >
                hustleit
              </h4>
            </div>
          </FloatingAsset>
        </div>

        {/* Center Screen: Massive Screen-Spanning Header (z-20, in front of assets) */}
        <div className="flex-1 flex flex-col justify-center items-center select-none pointer-events-none z-20 my-auto relative">
          <motion.h1
            key={isGravityResetting ? 'active' : 'idle'}
            initial={{ opacity: 0, scale: 0.95, y: 35, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 1.3,
              ease: [0.16, 1, 0.3, 1], // Cinematic ultra-premium ease-out curve
            }}
            className="text-[12vw] sm:text-[14vw] md:text-[15vw] font-display font-black leading-none tracking-tighter uppercase text-center text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/[0.08] drop-shadow-[0_0_40px_rgba(0,255,204,0.22)] select-none exclude-sandbox-fade"
          >
            PAUL JAMES.
          </motion.h1>
          <motion.h2
            key={isGravityResetting ? 'active' : 'idle'}
            initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 1.3,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.12, // Cinematic staggered reveal
            }}
            className="text-xl md:text-3xl font-display font-black tracking-[0.15em] text-[#00ffcc] uppercase mt-6 drop-shadow-[0_0_16px_rgba(0,255,204,0.6)] text-center exclude-sandbox-fade"
          >
            FOUNDER OF DREAMSMITH. MY LIFE'S WORK.
          </motion.h2>
        </div>
      </section>

      {/* SECTION 2: THE ICEBREAKERS (DYNAMIC ENTRANCE BLUEPRINTS + STATIC CONVERSATION CARDS) */}
      <section 
        ref={sectionRef}
        className="py-32 relative z-10 border-t border-white/5 overflow-hidden bg-black/[0.15]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[320px] bg-gradient-to-tr from-amber-500/5 to-[#00ffcc]/5 rounded-[100%] blur-[120px] -z-10 mix-blend-screen pointer-events-none" />

        {/* Huge Aircraft Blueprint - Scroll-linked Flyby */}
        <motion.div
          style={isGravityActive ? { display: 'none' } : { x: planeX }}
          className="absolute left-0 top-[12%] pointer-events-none select-none -z-10"
        >
          <svg className="w-[300px] md:w-[500px] h-auto text-[#00ffcc] stroke-[1] fill-none filter drop-shadow-[0_0_20px_rgba(0,255,204,0.15)]" viewBox="0 0 500 250">
            {/* Boeing 747 Fuselage Silhouette with Double-Decker Cockpit Hump */}
            <path 
              d="M 40 140 C 40 130, 55 115, 80 105 L 160 105 C 185 105, 195 120, 210 120 L 400 120 C 425 120, 445 130, 460 138 C 445 145, 420 150, 400 150 L 70 150 C 48 150, 40 145, 40 140 Z" 
              stroke="currentColor" 
            />
            {/* Swept-back Vertical Tail Fin (Stabilizer) */}
            <path d="M 380 120 L 430 45 L 450 45 L 458 135 Z" stroke="currentColor" />
            {/* Horizontal Tail Wing (Stabilizer) */}
            <path d="M 425 138 L 465 160 L 472 160 L 455 138 Z" stroke="currentColor" />
            {/* Near-Side Swept Wing (angled downwards and backwards in perspective) */}
            <path d="M 180 148 L 280 205 L 295 205 L 240 148 Z" stroke="currentColor" />
            {/* Far-Side Swept Wing (angled upwards and backwards in perspective) */}
            <path d="M 190 120 L 260 80 L 272 80 L 230 120 Z" stroke="currentColor" />
            
            {/* Four Wing-Suspended Turbine Engine Pods with Connecting Pylons */}
            {/* Near Wing Inboard Engine (Engine 2) */}
            <line x1="210" y1="165" x2="210" y2="178" stroke="currentColor" />
            <path d="M 195 174 L 222 174 L 228 178 L 222 182 L 195 182 Z" stroke="currentColor" />
            <line x1="195" y1="174" x2="195" y2="182" stroke="currentColor" strokeOpacity="0.6" />
            {/* Near Wing Outboard Engine (Engine 1) */}
            <line x1="255" y1="190" x2="255" y2="201" stroke="currentColor" />
            <path d="M 242 197 L 264 197 L 269 201 L 264 205 L 242 205 Z" stroke="currentColor" />
            <line x1="242" y1="197" x2="242" y2="205" stroke="currentColor" strokeOpacity="0.6" />
            {/* Far Wing Inboard Engine (Engine 3) */}
            <line x1="215" y1="106" x2="215" y2="96" stroke="currentColor" />
            <path d="M 204 93 L 224 93 L 228 97 L 224 101 L 204 101 Z" stroke="currentColor" />
            <line x1="204" y1="93" x2="204" y2="101" stroke="currentColor" strokeOpacity="0.6" />
            {/* Far Wing Outboard Engine (Engine 4) */}
            <line x1="245" y1="88" x2="245" y2="79" stroke="currentColor" />
            <path d="M 236 76 L 252 76 L 256 80 L 252 84 L 236 84 Z" stroke="currentColor" />
            <line x1="236" y1="76" x2="236" y2="84" stroke="currentColor" strokeOpacity="0.6" />

            {/* Cabin Window Detailing for 747 Aesthetic */}
            {/* Upper Deck Passenger Windows */}
            <line x1="100" y1="114" x2="165" y2="114" stroke="currentColor" strokeDasharray="2,2" strokeOpacity="0.6" />
            {/* Main Deck Passenger Windows */}
            <line x1="80" y1="135" x2="390" y2="135" stroke="currentColor" strokeDasharray="2,3" strokeOpacity="0.6" />
            {/* Cockpit Windshield */}
            <polygon points="74,114 81,110 85,114" fill="currentColor" fillOpacity="0.8" stroke="currentColor" />
            {/* Nose Cone (Radome) Cut Line */}
            <path d="M 52 133 C 52 135, 51 142, 51 145" stroke="currentColor" strokeOpacity="0.5" />

            {/* Technical grid markings & callouts */}
            <line x1="20" y1="140" x2="480" y2="140" stroke="currentColor" strokeDasharray="3,6" strokeOpacity="0.3" />
            <line x1="180" y1="40" x2="180" y2="220" stroke="currentColor" strokeDasharray="3,6" strokeOpacity="0.3" />
            {/* Measurements text */}
            <text x="30" y="70" className="font-mono text-[9px] fill-[#00ffcc]/40" stroke="none">L: 76.3m (B747-8)</text>
            <text x="30" y="82" className="font-mono text-[9px] fill-[#00ffcc]/40" stroke="none">SPAN: 68.4m</text>
            <text x="30" y="55" className="font-mono text-[10px] fill-[#00ffcc] font-bold tracking-wider" stroke="none">BOEING 747-8 SCHEMATIC</text>
            
            <circle cx="210" cy="178" r="5" stroke="currentColor" strokeDasharray="1,1" strokeOpacity="0.5" />
            <circle cx="255" cy="201" r="5" stroke="currentColor" strokeDasharray="1,1" strokeOpacity="0.5" />
          </svg>
        </motion.div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16 relative">
          <motion.div {...fadeIn}>
            <h2 className="text-[#00ffcc] font-mono text-sm tracking-widest mb-4 font-black uppercase">
              // START A CONVERSATION
            </h2>
            <h3 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white mb-6">
              The Icebreakers
            </h3>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              If we haven't met yet, bypassing the awkward small talk is incredibly simple. Just bring up any of these three topics and I'll immediately open up.
            </p>
          </motion.div>
        </div>

        {/* 3-COLUMN GLASSMORPHIC GRID (STATIC CARDS WITH GLOWING INTERACTIVE HOVERS) */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Cars */}
          <div className="relative overflow-visible">
            <motion.div
              style={{ y: card1DropY, opacity: card1DropOpacity, scale: card1DropScale }}
              className="w-full h-full"
            >
              <motion.div
                whileHover={{ y: -8, border: '1px solid rgba(0, 255, 204, 0.4)', boxShadow: '0 0 30px rgba(0, 255, 204, 0.1)' }}
                className="flex flex-col gap-6 p-8 glass-panel rounded-3xl transition-all duration-300 relative overflow-hidden group min-h-[300px] justify-between text-left h-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00ffcc]/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex flex-col gap-5">
                  <svg className="w-16 h-10 text-[#00ffcc] stroke-[1.5] fill-none filter drop-shadow-[0_0_8px_rgba(0,255,204,0.2)]" viewBox="0 0 200 80">
                    <path d="M 10 55 L 25 50 L 45 42 C 55 38, 65 28, 85 26 C 110 24, 135 24, 155 32 L 175 38 C 185 42, 192 46, 195 55 L 190 60 L 170 60 C 168 48, 148 48, 146 60 L 54 60 C 52 48, 32 48, 30 60 L 10 60 Z" stroke="currentColor" strokeDasharray="4,4" />
                    <circle cx="42" cy="60" r="10" stroke="currentColor" />
                    <circle cx="158" cy="60" r="10" stroke="currentColor" />
                    <circle cx="158" cy="60" r="3" stroke="#00ffcc" />
                  </svg>
                  <div>
                    <div className="font-mono text-[9px] text-[#00ffcc] uppercase tracking-widest mb-1.5 font-bold">
                      ICEBREAKER_01 // CARS
                    </div>
                    <h4 className="text-xl font-display font-black text-white mb-2">High-Performance Cars</h4>
                    <p className="text-zinc-300 text-sm leading-relaxed font-light">
                      Want to skip the standard introduction? Start discussing track lap times, mechanical differentials, or the carbon fiber weight reduction specs on modern GT3s.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 uppercase">Cognitive Leak</span>
                  <span className="w-2 h-2 rounded-full bg-[#00ffcc]" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Card 2: Aircraft */}
          <div className="relative overflow-visible">
            <motion.div
              style={{ y: card2DropY, opacity: card2DropOpacity, scale: card2DropScale }}
              className="w-full h-full"
            >
              <motion.div
                whileHover={{ y: -8, border: '1px solid rgba(0, 255, 204, 0.4)', boxShadow: '0 0 30px rgba(0, 255, 204, 0.1)' }}
                className="flex flex-col gap-6 p-8 glass-panel rounded-3xl transition-all duration-300 relative overflow-hidden group min-h-[300px] justify-between text-left h-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00ffcc]/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex flex-col gap-5">
                  <svg className="w-16 h-10 text-[#00ffcc] stroke-[1.5] fill-none filter drop-shadow-[0_0_8px_rgba(0,255,204,0.2)]" viewBox="0 0 200 80">
                    <path d="M 20 40 L 40 38 L 70 38 L 105 22 L 120 22 L 110 38 L 160 38 L 175 28 L 182 28 L 178 38 C 185 40, 185 42, 178 44 L 160 44 L 175 54 L 168 54 L 150 44 L 110 44 L 120 60 L 105 60 L 70 44 L 40 44 L 20 40 Z" stroke="currentColor" strokeDasharray="4,4" />
                    <path d="M 45 38 C 50 30, 60 30, 65 38" stroke="#00ffcc" />
                    <circle cx="55" cy="46" r="3" stroke="currentColor" />
                  </svg>
                  <div>
                    <div className="font-mono text-[9px] text-[#00ffcc] uppercase tracking-widest mb-1.5 font-bold">
                      ICEBREAKER_02 // AIRCRAFT
                    </div>
                    <h4 className="text-xl font-display font-black text-white mb-2">Aircraft Spotting</h4>
                    <p className="text-zinc-300 text-sm leading-relaxed font-light">
                      Mention a Boeing 777-300ER or a rare registration prefix, and I will completely drop whatever critical system deployment task I am doing to analyze its flight path.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 uppercase">Cognitive Leak</span>
                  <span className="w-2 h-2 rounded-full bg-[#00ffcc]" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Card 3: Machine Learning */}
          <div className="relative overflow-visible">
            <motion.div
              style={{ y: card3DropY, opacity: card3DropOpacity, scale: card3DropScale }}
              className="w-full h-full"
            >
              <motion.div
                whileHover={{ y: -8, border: '1px solid rgba(0, 255, 204, 0.4)', boxShadow: '0 0 30px rgba(0, 255, 204, 0.1)' }}
                className="flex flex-col gap-6 p-8 glass-panel rounded-3xl transition-all duration-300 relative overflow-hidden group min-h-[300px] justify-between text-left h-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00ffcc]/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex flex-col gap-5">
                  <svg className="w-16 h-10 text-[#00ffcc] stroke-[1.5] fill-none filter drop-shadow-[0_0_8px_rgba(0,255,204,0.2)]" viewBox="0 0 200 80">
                    <circle cx="30" cy="40" r="6" stroke="currentColor" />
                    <circle cx="80" cy="20" r="6" stroke="currentColor" />
                    <circle cx="80" cy="60" r="6" stroke="currentColor" />
                    <circle cx="130" cy="20" r="6" stroke="currentColor" />
                    <circle cx="130" cy="60" r="6" stroke="currentColor" />
                    <circle cx="170" cy="40" r="6" stroke="#00ffcc" />
                    <line x1="36" y1="38" x2="74" y2="22" stroke="currentColor" strokeDasharray="3,3" />
                    <line x1="36" y1="42" x2="74" y2="58" stroke="currentColor" strokeDasharray="3,3" />
                    <line x1="86" y1="20" x2="124" y2="20" stroke="currentColor" />
                    <line x1="86" y1="60" x2="124" y2="60" stroke="currentColor" />
                  </svg>
                  <div>
                    <div className="font-mono text-[9px] text-[#00ffcc] uppercase tracking-widest mb-1.5 font-bold">
                      ICEBREAKER_03 // MACHINE_LEARNING
                    </div>
                    <h4 className="text-xl font-display font-black text-white mb-2">AI & Machine Learning</h4>
                    <p className="text-zinc-300 text-sm leading-relaxed font-light">
                      Ask me about model weight collapse, training losses of multi-billion parameter networks, or whether gradient descent is just premium guessing. I will talk for hours.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 uppercase">Cognitive Leak</span>
                  <span className="w-2 h-2 rounded-full bg-[#00ffcc]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE PROBLEM SOLVER */}
      <ProblemSolverBlock />

      {/* SECTION 4: OPERATING CAPABILITIES (SCROLL-DRIVEN CARD TABLE) */}
      <CardTableCapabilities />

      {/* SECTION 5: THE TIMELINE (CURVED S-CURVE PATH) */}
      <EvolutionPath />

      {/* SECTION 6: AI ENGINEER (GRAND FINALE) */}
      <section className="py-40 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#050505] to-[#02100d] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGZmY2MiIHN0cm9rZS1vcGFjaXR5PSIwLjA0Ii8+Cjwvc3ZnPg==')] opacity-30 mix-blend-screen pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00ffcc]/10 rounded-[100%] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="mb-20 text-center md:text-left">
            <h2 className="text-[#00ffcc] font-mono text-sm tracking-widest mb-4 font-black uppercase">
              // EXPERIMENTAL LABS
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-white mb-6">
              Oh, and by the way...
            </h3>
            <h4 className="text-4xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-indigo-400 drop-shadow-[0_0_30px_rgba(0,255,204,0.3)]">
              I'm an AI Engineer.
            </h4>
            <p className="text-zinc-400 text-lg md:text-xl mt-6 max-w-2xl font-light">
              Because standard logic variables were too straightforward, I also teach models how to
              synthesize intelligence and process high-dimensional matrices.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {/* Phineas AI */}
            <motion.div
              variants={fadeItem}
              className="glass-panel p-10 rounded-3xl border-white/5 hover:border-[#00ffcc]/40 hover:bg-[#00ffcc]/5 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ffcc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-left">
                <h4 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-[#00ffcc] transition-colors">
                  Phineas AI
                </h4>
                <p className="text-zinc-400 text-base leading-relaxed font-light mb-6">
                  LLaMA3-70B + Whisper. Award-winning lecture transcription.
                </p>
              </div>
              <span className="font-mono text-[9px] text-[#00ffcc]/60 tracking-wider font-bold">
                LLAMA3 // WHISPER // CONTEXT_ENGINE
              </span>
            </motion.div>

            {/* Visionary Model */}
            <motion.div
              variants={fadeItem}
              className="glass-panel p-10 rounded-3xl border-white/5 hover:border-[#00ffcc]/40 hover:bg-[#00ffcc]/5 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ffcc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-left">
                <h4 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-[#00ffcc] transition-colors">
                  Visionary Model
                </h4>
                <p className="text-zinc-400 text-base leading-relaxed font-light mb-6">
                  Neural ODEs + Transformers. Forecasting the Indian economy using 36 critical indicators.
                </p>
              </div>
              <span className="font-mono text-[9px] text-[#00ffcc]/60 tracking-wider font-bold">
                NEURAL_ODES // INFORMER // STATS
              </span>
            </motion.div>

            {/* Medical Imaging */}
            <motion.div
              variants={fadeItem}
              className="glass-panel p-10 rounded-3xl border-white/5 hover:border-[#00ffcc]/40 hover:bg-[#00ffcc]/5 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ffcc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-left">
                <h4 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-[#00ffcc] transition-colors">
                  Medical Imaging
                </h4>
                <p className="text-zinc-400 text-base leading-relaxed font-light mb-6">
                  CycleGANs + U-Nets. Synthesizing PET scans from CT images. Teaching machines to see inside us.
                </p>
              </div>
              <span className="font-mono text-[9px] text-[#00ffcc]/60 tracking-wider font-bold">
                CYCLEGANS // U-NETS // SYNTHESIS
              </span>
            </motion.div>

            {/* Fake News AI */}
            <motion.div
              variants={fadeItem}
              className="glass-panel p-10 rounded-3xl border-white/5 hover:border-[#00ffcc]/40 hover:bg-[#00ffcc]/5 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ffcc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-left">
                <h4 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-[#00ffcc] transition-colors">
                  Fake News AI
                </h4>
                <p className="text-zinc-400 text-base leading-relaxed font-light mb-6">
                  Fine-tuned BERT LLM. Multi-agent system hunting down political bias.
                </p>
              </div>
              <span className="font-mono text-[9px] text-[#00ffcc]/60 tracking-wider font-bold">
                BERT // MULTI_AGENT // CLASSIFICATION
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer 
        className="py-24 px-6 md:px-12 border-t border-white/10 bg-[#020504] relative transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
          {/* Deliberate Break Playful Tagline */}
          <p className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-12 text-center select-none drop-shadow-[0_0_6px_rgba(0,255,204,0.15)] animate-pulse">
            // IF THE SITE BREAKS, IT'S DELIBERATE.
          </p>

          {/* Core Footer Info */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-8">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h4 className="text-white font-display font-black text-xl tracking-tighter">
                PAUL JAMES
              </h4>
              <p className="text-white/30 font-mono text-xs tracking-wider">
                © {new Date().getFullYear()} PAUL JAMES. CREATIVE DEVELOPER & AI ENGINEER.
              </p>
            </div>
            <div className="flex gap-8 font-mono">
              <a
                href="#"
                className="text-white/30 hover:text-[#00ffcc] transition-colors text-xs tracking-widest"
              >
                GITHUB
              </a>
              <a
                href="#"
                className="text-white/30 hover:text-[#00ffcc] transition-colors text-xs tracking-widest"
              >
                LINKEDIN
              </a>
              <a
                href="#"
                className="text-white/30 hover:text-[#00ffcc] transition-colors text-xs tracking-widest"
              >
                TWITTER
              </a>
            </div>
          </div>
        </div>
      </footer>
      <GravitySandbox 
        isGravityActive={isGravityActive} 
        setIsGravityActive={setIsGravityActive} 
        onResetComplete={() => setIsGravityResetting(false)}
      />
    </main>
  );
}
