import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import FloatingAsset from './components/FloatingAsset';
import CalibrationScale from './components/CalibrationScale';
import './index.css';

// Dynamically import below-the-fold heavy components for bundle size & network optimizations
const ProblemSolverBlock = React.lazy(() => import('./components/ProblemSolverBlock'));
const CardTableCapabilities = React.lazy(() => import('./components/CardTableCapabilities'));
const EvolutionPath = React.lazy(() => import('./components/EvolutionPath'));
const GravitySandbox = React.lazy(() => import('./components/GravitySandbox'));
const IcebreakerBlock = React.lazy(() => import('./components/IcebreakerBlock'));
import B747Schematic from './components/B747Schematic';

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

// Glowing cyberpunk tech skeleton loader for dynamic imports
function TechSkeleton({ height = '400px', label = 'LOADING SYSTEM CAPABILITIES' }) {
  return (
    <div 
      style={{ height }} 
      className="w-full flex flex-col justify-center items-center bg-transparent border-t border-b border-white/10 relative overflow-hidden select-none"
    >
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-16 h-16 border border-dashed border-[#E55B6C]/50 rounded-2xl flex items-center justify-center">
          <span className="font-mono text-xs text-[#E55B6C]/60">[...]</span>
        </div>
        <span className="font-mono text-[10px] text-[#E55B6C]/85 tracking-[0.3em] uppercase">
          // {label} //
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [isGravityActive, setIsGravityActive] = React.useState(false);
  const [resetCounter, setResetCounter] = React.useState(0);

  // Refs and motion values for independent split scroll gravity physics
  const targetScrollY = React.useRef(0);
  const leftYRef = React.useRef(0);
  const rightYRef = React.useRef(0);
  const leftVelocity = React.useRef(0);
  const rightVelocity = React.useRef(0);

  const leftTransformY = useMotionValue(0);
  const rightTransformY = useMotionValue(0);

  // Column mouse tracking state ('left' or 'right')
  const [hoveredColumn, setHoveredColumn] = React.useState('left');

  // Unified document height tracking for lazy-loaded element scrollbar syncing
  const [documentHeight, setDocumentHeight] = React.useState(5200); // stable desktop placeholder
  const contentRef = React.useRef(null);



  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < window.innerWidth / 2) {
        setHoveredColumn('left');
      } else {
        setHoveredColumn('right');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update document height after mount & lazy imports settle
  React.useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setDocumentHeight(contentRef.current.scrollHeight);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    const t1 = setTimeout(updateHeight, 500);
    const t2 = setTimeout(updateHeight, 1500);
    const t3 = setTimeout(updateHeight, 3000);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Wheel Scroll Intercept (instant reduced-speed + dynamic edge boundary cushioning)
  React.useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(hover: none)').matches) {
      return;
    }

    const handleWheel = (e) => {
      e.preventDefault();
      const currentScroll = targetScrollY.current;
      const maxScroll = documentHeight - window.innerHeight;
      
      const distToEdge = Math.min(currentScroll, maxScroll - currentScroll);
      let speedMultiplier = 0.55;

      if (distToEdge < 300) {
        const ratio = Math.max(0, distToEdge / 300);
        speedMultiplier = 0.15 + 0.40 * ratio; // slow deceleration cushioning
      }

      const step = e.deltaY * speedMultiplier;
      targetScrollY.current = Math.max(0, Math.min(currentScroll + step, maxScroll));
      
      window.scrollTo(0, targetScrollY.current);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [documentHeight]);

  // Sync target Y when scrollbar dragging or key presses scroll the window
  React.useEffect(() => {
    const handleScrollSync = () => {
      targetScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScrollSync, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSync);
  }, []);

  // Newtonian Mass-Spring Physics Euler Loop (runs inside requestAnimationFrame)
  React.useEffect(() => {
    let active = true;
    
    const physicsLoop = () => {
      if (!active) return;
      
      const target = targetScrollY.current;
      
      const stiffness = 0.035;  
      const damping = 0.125;    
      const drag = 0.830;       
      
      const activeLerp = 0.15;  
      
      if (hoveredColumn === 'left') {
        leftYRef.current += (target - leftYRef.current) * activeLerp;
        leftVelocity.current = 0; 
        
        const diff = leftYRef.current - rightYRef.current;
        const accel = diff * stiffness - rightVelocity.current * damping;
        rightVelocity.current += accel;
        rightVelocity.current *= drag;
        rightYRef.current += rightVelocity.current;
      } else {
        rightYRef.current += (target - rightYRef.current) * activeLerp;
        rightVelocity.current = 0; 
        
        const diff = rightYRef.current - leftYRef.current;
        const accel = diff * stiffness - leftVelocity.current * damping;
        leftVelocity.current += accel;
        leftVelocity.current *= drag;
        leftYRef.current += leftVelocity.current;
      }
      
      leftTransformY.set(-leftYRef.current);
      rightTransformY.set(-rightYRef.current);
      
      requestAnimationFrame(physicsLoop);
    };
    
    requestAnimationFrame(physicsLoop);
    return () => {
      active = false;
    };
  }, [hoveredColumn]);

  const renderFloatingAssets = (colorClass) => {
    return (
      <>
        {/* Asset 1: Normal Car Outline */}
        <FloatingAsset initialLeft="12%" initialTop="14%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-36 h-20 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 200 80"
          >
            <path
              d="M 10 55 L 25 50 L 45 42 C 55 38, 65 28, 85 26 C 110 24, 135 24, 155 32 L 175 38 C 185 42, 192 46, 195 55 L 190 60 L 170 60 C 168 48, 148 48, 146 60 L 54 60 C 52 48, 32 48, 30 60 L 10 60 Z"
              stroke="currentColor"
              strokeDasharray="4,4"
            />
            <path d="M 85 30 L 115 30 L 128 38 L 85 38 Z" stroke="currentColor" />
            <circle cx="42" cy="60" r="10" stroke="currentColor" />
            <circle cx="42" cy="60" r="3" stroke="currentColor" />
            <circle cx="158" cy="60" r="10" stroke="currentColor" />
            <circle cx="158" cy="60" r="3" stroke="currentColor" />
          </svg>
        </FloatingAsset>

        {/* Asset 2: Single-engine plane */}
        <FloatingAsset initialLeft="74%" initialTop="16%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-36 h-20 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 160 80"
          >
            <path
              d="M 20 40 L 30 36 L 50 34 L 75 35 L 125 44 L 140 44 L 145 28 L 150 28 L 146 46 L 148 48 L 144 50 L 115 50 L 70 48 L 40 46 L 25 44 L 20 40 Z"
              stroke="currentColor"
              strokeDasharray="4,4"
            />
            <path d="M 20 40 L 16 38 L 16 42 Z M 16 25 L 16 55" stroke="currentColor" />
            <path d="M 50 34 L 52 30 L 95 30 L 90 34 M 68 34 L 74 46" stroke="currentColor" />
            <path d="M 40 35 L 45 42 L 58 42 L 68 35 Z" stroke="currentColor" />
            <path d="M 60 48 L 56 58 M 32 45 L 32 58" stroke="currentColor" />
            <circle cx="56" cy="58" r="3" stroke="currentColor" />
            <circle cx="32" cy="58" r="3" stroke="currentColor" />
          </svg>
        </FloatingAsset>

        {/* Asset 3: Compact Front-View Digital Camera */}
        <FloatingAsset initialLeft="8%" initialTop="48%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-24 h-16 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 100 70"
          >
            <rect x="10" y="20" width="80" height="42" rx="4" stroke="currentColor" strokeDasharray="3,3" />
            <circle cx="50" cy="41" r="16" stroke="currentColor" />
            <circle cx="50" cy="41" r="9" stroke="currentColor" />
            <path d="M 44 35 A 8 8 0 0 1 56 35" stroke="currentColor" />
            <rect x="18" y="26" width="12" height="6" rx="1" stroke="currentColor" />
            <rect x="70" y="26" width="12" height="6" rx="1" stroke="currentColor" />
            <rect x="22" y="16" width="10" height="4" rx="1" stroke="currentColor" />
            <rect x="68" y="16" width="12" height="4" rx="1" stroke="currentColor" />
          </svg>
        </FloatingAsset>

        {/* Asset 4: Skating Shoes */}
        <FloatingAsset initialLeft="64%" initialTop="80%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-32 h-20 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 140 80"
          >
            <path
              d="M 25 50 L 30 20 C 35 15, 52 15, 55 20 L 58 35 L 75 42 C 85 45, 105 45, 110 52 L 115 54 L 110 58 L 25 58 Z"
              stroke="currentColor"
              strokeDasharray="4,4"
            />
            <path d="M 40 22 Q 48 30, 52 38" stroke="currentColor" />
            <path d="M 30 28 L 56 28 M 31 38 L 57 38" stroke="currentColor" />
            <rect x="22" y="58" width="94" height="6" rx="2" stroke="currentColor" />
            <circle cx="34" cy="69" r="8" stroke="currentColor" />
            <circle cx="34" cy="69" r="2" stroke="currentColor" />
            <circle cx="56" cy="69" r="8" stroke="currentColor" />
            <circle cx="56" cy="69" r="2" stroke="currentColor" />
            <circle cx="78" cy="69" r="8" stroke="currentColor" />
            <circle cx="78" cy="69" r="2" stroke="currentColor" />
            <circle cx="100" cy="69" r="8" stroke="currentColor" />
            <circle cx="100" cy="69" r="2" stroke="currentColor" />
          </svg>
        </FloatingAsset>

        {/* Asset 5: Open Laptop Outline */}
        <FloatingAsset initialLeft="42%" initialTop="78%" className="transform -translate-x-1/2 design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-32 h-20 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 140 80"
          >
            <path d="M 25 15 L 115 15 L 110 52 L 30 52 Z" stroke="currentColor" strokeDasharray="4,4" />
            <path d="M 38 22 L 58 22 M 38 30 L 78 30 M 38 38 L 68 38" stroke="currentColor" strokeOpacity="0.8" />
            <path d="M 38 46 L 50 46" stroke="currentColor" />
            <path d="M 30 52 L 15 62 L 125 62 L 110 52" stroke="currentColor" />
            <path d="M 15 62 C 15 65, 20 66, 25 66 L 115 66 C 120 66, 125 65, 125 62" stroke="currentColor" />
            <rect x="35" y="55" width="70" height="4" rx="1" stroke="currentColor" strokeOpacity="0.4" />
            <rect x="58" y="60" width="24" height="4" rx="1" stroke="currentColor" />
          </svg>
        </FloatingAsset>

        {/* Asset 6: 'hustleit' Text */}
        <FloatingAsset initialLeft="44%" initialTop="26%" className="transform -translate-x-1/2 design-asset" isGravityActive={isGravityActive}>
          <div className={`px-5 py-2.5 border bg-transparent rounded-2xl border-current/20 ${colorClass}`}>
            <h4 className="font-mono text-xl md:text-2xl font-black uppercase tracking-[0.25em]">
              hustleit
            </h4>
          </div>
        </FloatingAsset>

        {/* Asset 7: Basketball (NEW) */}
        <FloatingAsset initialLeft="14%" initialTop="66%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-20 h-20 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="40" stroke="currentColor" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" />
            <path d="M 21.7 21.7 Q 50 50 21.7 78.3" stroke="currentColor" />
            <path d="M 78.3 21.7 Q 50 50 78.3 78.3" stroke="currentColor" />
          </svg>
        </FloatingAsset>

        {/* Asset 8: Spectacles (NEW) */}
        <FloatingAsset initialLeft="22%" initialTop="32%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-28 h-16 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 100 60"
          >
            {/* Left Lens Teardrop */}
            <path d="M 18 24 L 42 24 C 46 24, 46 44, 32 44 C 18 44, 14 36, 18 24 Z" stroke="currentColor" />
            <path d="M 21 27 L 39 27 C 42 27, 42 41, 32 41 C 22 41, 18 35, 21 27 Z" stroke="currentColor" strokeDasharray="2,1" opacity="0.6" />
            {/* Right Lens Teardrop */}
            <path d="M 82 24 L 58 24 C 54 24, 54 44, 68 44 C 82 44, 86 36, 82 24 Z" stroke="currentColor" />
            <path d="M 79 27 L 61 27 C 58 27, 58 41, 68 41 C 78 41, 82 35, 79 27 Z" stroke="currentColor" strokeDasharray="2,1" opacity="0.6" />
            {/* Structural hinges */}
            <circle cx="15" cy="24" r="1" fill="currentColor" stroke="currentColor" />
            <circle cx="85" cy="24" r="1" fill="currentColor" stroke="currentColor" />
            {/* Top Straight Bridge Bar */}
            <line x1="42" y1="24" x2="58" y2="24" stroke="currentColor" />
            {/* Bottom Curved Bridge Bar */}
            <path d="M 43 29 Q 50 33 57 29" stroke="currentColor" />
            {/* Left Temple arm */}
            <path d="M 15 24 L 4 24 Q 2 24 2 30" stroke="currentColor" />
            {/* Right Temple arm */}
            <path d="M 85 24 L 96 24 Q 98 24 98 30" stroke="currentColor" />
          </svg>
        </FloatingAsset>

        {/* Asset 9: Compass (NEW) */}
        <FloatingAsset initialLeft="76%" initialTop="74%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-24 h-24 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="40" stroke="currentColor" />
            <circle cx="50" cy="50" r="36" stroke="currentColor" strokeDasharray="3,3" opacity="0.6" />
            {/* Watch hook at top */}
            <path d="M 45 10 A 6 6 0 0 1 55 10" stroke="currentColor" />
            <circle cx="50" cy="4" r="3" stroke="currentColor" />
            {/* Needle pivot */}
            <circle cx="50" cy="50" r="3" stroke="currentColor" />
            {/* Compass Needle */}
            <polygon points="50,16 54,46 50,50 46,46" stroke="currentColor" />
            <polygon points="50,84 54,54 50,50 46,54" stroke="currentColor" strokeDasharray="2,2" />
            {/* Dial Markings */}
            <line x1="50" y1="10" x2="50" y2="16" stroke="currentColor" />
            <line x1="50" y1="90" x2="50" y2="84" stroke="currentColor" />
            <line x1="10" y1="50" x2="16" y2="50" stroke="currentColor" />
            <line x1="90" y1="50" x2="84" y2="50" stroke="currentColor" />
          </svg>
        </FloatingAsset>

        {/* Asset 10: Modern Wireless Headset */}
        <FloatingAsset initialLeft="58%" initialTop="22%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-24 h-24 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 100 100"
          >
            {/* Seamless Modern Headband Arch */}
            <path d="M 20 48 A 30 30 0 0 1 80 48" stroke="currentColor" strokeWidth="2.5" />
            {/* Inner Headband Cushion */}
            <path d="M 24 48 A 26 26 0 0 1 76 48" stroke="currentColor" opacity="0.8" />
            
            {/* Sleek Telescopic Slider Arms */}
            <line x1="20" y1="48" x2="20" y2="58" stroke="currentColor" strokeWidth="1.5" />
            <line x1="80" y1="48" x2="80" y2="58" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Modern U-shaped pivot hangers */}
            <path d="M 16 58 L 24 58 M 20 58 L 20 62" stroke="currentColor" />
            <path d="M 76 58 L 84 58 M 80 58 L 80 62" stroke="currentColor" />
            
            {/* Modern Rounded Rectangular Ear Cups (Sony/AirPods Max style) */}
            <rect x="10" y="62" width="20" height="24" rx="6" stroke="currentColor" transform="rotate(-6, 20, 74)" />
            <rect x="70" y="62" width="20" height="24" rx="6" stroke="currentColor" transform="rotate(6, 80, 74)" />
            
            {/* Deep Ergonomic Cushion Pads */}
            <path d="M 25 64 Q 28 74 25 84" stroke="currentColor" />
            <path d="M 75 64 Q 72 74 75 84" stroke="currentColor" />
            
            {/* Charger Port & Accent Details */}
            <circle cx="20" cy="80" r="1.5" stroke="currentColor" opacity="0.7" />
            <circle cx="80" cy="80" r="1.5" stroke="currentColor" opacity="0.7" />
          </svg>
        </FloatingAsset>

        {/* Asset 11: Classic Cafe Racer Bike */}
        <FloatingAsset initialLeft="82%" initialTop="58%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-36 h-24 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 100 60"
          >
            {/* Front Wheel (Left) - Vintage Wire Spokes */}
            <circle cx="25" cy="42" r="13" stroke="currentColor" />
            <circle cx="25" cy="42" r="11" stroke="currentColor" strokeDasharray="2,2" opacity="0.6" />
            <line x1="25" y1="42" x2="25" y2="29" stroke="currentColor" opacity="0.7" />
            <line x1="25" y1="42" x2="25" y2="55" stroke="currentColor" opacity="0.7" />
            <line x1="25" y1="42" x2="12" y2="42" stroke="currentColor" opacity="0.7" />
            <line x1="25" y1="42" x2="38" y2="42" stroke="currentColor" opacity="0.7" />
            <line x1="25" y1="42" x2="16" y2="33" stroke="currentColor" opacity="0.7" />
            <line x1="25" y1="42" x2="34" y2="51" stroke="currentColor" opacity="0.7" />
            <line x1="25" y1="42" x2="34" y2="33" stroke="currentColor" opacity="0.7" />
            <line x1="25" y1="42" x2="16" y2="51" stroke="currentColor" opacity="0.7" />
            <circle cx="25" cy="42" r="2.5" stroke="currentColor" />
            
            {/* Retro Front Mudguard */}
            <path d="M 12 39 C 14 32, 22 30, 29 33" stroke="currentColor" />
            
            {/* Rear Wheel (Right) - Vintage Wire Spokes */}
            <circle cx="75" cy="42" r="13" stroke="currentColor" />
            <circle cx="75" cy="42" r="11" stroke="currentColor" strokeDasharray="2,2" opacity="0.6" />
            <line x1="75" y1="42" x2="75" y2="29" stroke="currentColor" opacity="0.7" />
            <line x1="75" y1="42" x2="75" y2="55" stroke="currentColor" opacity="0.7" />
            <line x1="75" y1="42" x2="62" y2="42" stroke="currentColor" opacity="0.7" />
            <line x1="75" y1="42" x2="88" y2="42" stroke="currentColor" opacity="0.7" />
            <line x1="75" y1="42" x2="66" y2="33" stroke="currentColor" opacity="0.7" />
            <line x1="75" y1="42" x2="84" y2="51" stroke="currentColor" opacity="0.7" />
            <line x1="75" y1="42" x2="84" y2="33" stroke="currentColor" opacity="0.7" />
            <line x1="75" y1="42" x2="66" y2="51" stroke="currentColor" opacity="0.7" />
            <circle cx="75" cy="42" r="2.5" stroke="currentColor" />
            
            {/* Retro Rear Mudguard */}
            <path d="M 75 29 C 79 30, 83 34, 85 39" stroke="currentColor" />
            
            {/* Front Forks & Low Handlebars with Bar-End Mirror */}
            <line x1="25" y1="42" x2="35" y2="18" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 33 18 L 30 18" stroke="currentColor" strokeWidth="2" />
            <circle cx="29" cy="15" r="2" stroke="currentColor" />
            <line x1="29" y1="17" x2="30" y2="18" stroke="currentColor" />
            {/* Classic Round Headlight & Mini Flyscreen */}
            <circle cx="21" cy="23" r="3.5" stroke="currentColor" />
            <path d="M 23 17 C 26 15, 29 17, 30 20" stroke="currentColor" />
            
            {/* Vintage Teardrop Fuel Tank & Tank Strap */}
            <path d="M 35 22 C 42 16, 50 17, 56 25 L 35 25 Z" stroke="currentColor" />
            <line x1="45" y1="18" x2="45" y2="25" stroke="currentColor" opacity="0.6" />
            
            {/* Classic Ribbed Cafe Racer Seat & Rear Hump Cowl */}
            <path d="M 70 25 C 70 20, 77 20, 77 25 Z" stroke="currentColor" />
            <rect x="56" y="22" width="14" height="3" rx="0.5" stroke="currentColor" />
            <line x1="60" y1="22" x2="60" y2="25" stroke="currentColor" />
            <line x1="63" y1="22" x2="63" y2="25" stroke="currentColor" />
            <line x1="66" y1="22" x2="66" y2="25" stroke="currentColor" />
            
            {/* Exposed Retro Engine block with cooling fins */}
            <rect x="40" y="29" width="14" height="15" rx="1" stroke="currentColor" />
            <line x1="42" y1="32" x2="52" y2="32" stroke="currentColor" />
            <line x1="42" y1="35" x2="52" y2="35" stroke="currentColor" />
            <line x1="42" y1="38" x2="52" y2="38" stroke="currentColor" />
            <line x1="42" y1="41" x2="52" y2="41" stroke="currentColor" />
            <circle cx="47" cy="44" r="5" stroke="currentColor" />
            <polygon points="52,38 56,36 56,40" stroke="currentColor" opacity="0.7" />
            
            {/* Swept-up Mega-phone Chrome Exhaust */}
            <path d="M 41 35 L 43 49 L 60 49 L 78 43 L 77 41 L 60 47 Z" stroke="currentColor" />
            
            {/* Classic Dual Rear Suspension */}
            <line x1="72" y1="25" x2="75" y2="42" stroke="currentColor" strokeDasharray="2,2" />
          </svg>
        </FloatingAsset>
      </>
    );
  };



  const renderAIProjects = (colorClass) => {
    return (
      <div className="w-full max-w-none mx-0 relative z-10 px-6 md:px-12 lg:px-20">
        <motion.div {...fadeInUp} className="mb-20 w-full text-left select-none pointer-events-none flex flex-col items-start">
          <h2 className={`font-mono text-sm tracking-widest mb-3 font-black uppercase ${colorClass}`}>
            // EXPERIMENTAL LABS // AI ENGINEERING
          </h2>
          <h3 className={`text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 ${colorClass} leading-tight`}>
            Oh, and by the way...<br />
            <span className="font-gellix font-extrabold block mt-3 select-auto pointer-events-auto cursor-default tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              I'm an AI Engineer
            </span>
          </h3>
          <p className={`text-sm md:text-base font-light opacity-75 ${colorClass}`}>
            I teach machines to think.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          <div className="flex flex-col gap-8 lg:gap-12 pr-0 md:pr-6">
            <motion.div
              variants={fadeItem}
              whileHover={{ y: -8, border: '2.5px solid #FFFFFF', boxShadow: '0 15px 35px rgba(255, 255, 255, 0.05)' }}
              className={`white-shaded-panel p-10 rounded-3xl border-white bg-white/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[280px] text-left ${colorClass}`}
            >
              <div className="relative z-10">
                <h4 className="text-2xl font-display font-black mb-3">
                  Interactive AI Avatar
                </h4>
                <p className="opacity-70 text-base leading-relaxed font-light mb-6">
                  Real-time video synthesis combining RAG, chunked TTS, pose conditioning, and autoregressive AAPT (Diffusion Transformer) decoding.
                </p>
              </div>
              <span className="font-mono text-[10px] opacity-80 tracking-wider font-bold">
                RAG // DIT // VAE // FASTAPI // WEBRTC
              </span>
            </motion.div>

            <motion.div
              variants={fadeItem}
              whileHover={{ y: -8, border: '2.5px solid #FFFFFF', boxShadow: '0 15px 35px rgba(255, 255, 255, 0.05)' }}
              className={`white-shaded-panel p-10 rounded-3xl border-white bg-white/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[280px] text-left ${colorClass}`}
            >
              <div className="relative z-10">
                <h4 className="text-2xl font-display font-black mb-3">
                  Cross-Modality Brain Imaging
                </h4>
                <p className="opacity-70 text-base leading-relaxed font-light mb-6">
                  CycleGAN framework with dual U-Net generators to synthesize PET scans from CT images (SSIM: 0.922, MAE: 0.012).
                </p>
              </div>
              <span className="font-mono text-[10px] opacity-80 tracking-wider font-bold">
                CYCLEGAN // U-NET // MATLAB
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col gap-8 lg:gap-12 pl-0 md:pl-6 justify-center">
            <motion.div
              variants={fadeItem}
              whileHover={{ y: -8, border: '2.5px solid #FFFFFF', boxShadow: '0 15px 35px rgba(229, 91, 109, 0.05)' }}
              className={`white-shaded-panel p-10 rounded-3xl border-white bg-white/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[280px] text-left ${colorClass}`}
            >
              <div className="relative z-10">
                <h4 className="text-2xl font-display font-black mb-3">
                  Visionary Model
                </h4>
                <p className="opacity-75 text-base leading-relaxed font-light mb-6">
                  Predicting economic conditions based on Neural ODEs using 36 key indicators, combined with multi-agent Optuna guidelines.
                </p>
              </div>
              <span className="font-mono text-[10px] opacity-80 tracking-wider font-bold">
                NEURAL_ODES // MULTI-AGENT // OPTUNA
              </span>
            </motion.div>

            <motion.div
              variants={fadeItem}
              whileHover={{ y: -8, border: '2.5px solid #FFFFFF', boxShadow: '0 15px 35px rgba(229, 91, 109, 0.05)' }}
              className={`white-shaded-panel p-10 rounded-3xl border-white bg-white/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[280px] text-left ${colorClass}`}
            >
              <div className="relative z-10">
                <h4 className="text-2xl font-display font-black mb-3">
                  Age Estimation AI Model
                </h4>
                <p className="opacity-75 text-base leading-relaxed font-light mb-6">
                  Hybrid classification-regression ResNet-18 model with SE Blocks attaining an F1 score of 0.783 for precise age detection.
                </p>
              </div>
              <span className="font-mono text-[10px] opacity-80 tracking-wider font-bold">
                RESNET-18 // SE_BLOCKS // CLASSIFICATION
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = (colorClass) => {
    return (
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10 px-6 md:px-12">
        <div className="w-full text-center mb-12 select-none pointer-events-none">
          <p className={`font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse opacity-45 ${colorClass}`}>
            // IF THE SITE BREAKS, IT'S DELIBERATE. //
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-2 text-right pr-6 md:pr-12">
            <h4 className={`font-display font-black text-xl tracking-tighter ${colorClass}`}>
              PAUL JAMES
            </h4>
            <p className={`font-mono text-[10px] md:text-xs tracking-wider opacity-50 ${colorClass}`}>
              © {new Date().getFullYear()} PAUL JAMES. CREATIVE DEVELOPER & AI ENGINEER.
            </p>
          </div>
          
          <div className="flex flex-col justify-center items-start pl-6 md:pl-12">
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-left">
              <a
                href="#"
                className={`hover:underline transition-colors text-xs tracking-widest font-bold opacity-80 ${colorClass}`}
              >
                GITHUB
              </a>
              <a
                href="#"
                className={`hover:underline transition-colors text-xs tracking-widest font-bold opacity-80 ${colorClass}`}
              >
                LINKEDIN
              </a>
              <a
                href="#"
                className={`hover:underline transition-colors text-xs tracking-widest font-bold opacity-80 ${colorClass}`}
              >
                TWITTER
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Scroll automatic triggers: bottom engages collapse, absolute top resets everything
  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          
          // 1. Scroll to the absolute bottom triggers gravity collapse (within 150px threshold)
          if (windowHeight + currentScrollY >= documentHeight - 150) {
            if (!isGravityActive) {
              setIsGravityActive(true);
            }
          }
          
          // 2. Scroll back to the absolute top of the website resets everything snap back
          if (currentScrollY <= 8 && isGravityActive) {
            setIsGravityActive(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isGravityActive, documentHeight]);

  const scrollYProgress = useTransform(leftTransformY, (y) => {
    const scrollY = -y;
    const start = 180; // Calibrated to drop before middle of screen
    const end = 1100;
    const progress = (scrollY - start) / (end - start);
    return Math.max(0, Math.min(progress, 1));
  });

  const planeProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    mass: 1.2
  });

  const planeX = useTransform(planeProgress, [0, 1], ["120vw", "-120vw"]);

  // Unified Full-Page layout builder that is rendered inside viewports (and measurer)
  const renderFullPage = (colorClass, isDummy = false, customTransformY = null) => {
    return (
      <div className={`w-full relative ${colorClass}`}>
        {/* SECTION 1: THE INTRO / HERO (MASSIVE SCREEN-SPANNING TYPOGRAPHY & PHYSICS-BASED FLOATING ASSETS) */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Technical Dotted Grid Backdrop */}
          <div className="absolute inset-0 tech-grid opacity-20 -z-10 pointer-events-none" />

          <motion.div
            key={resetCounter}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col justify-between px-6 md:px-12 lg:px-24 py-16 overflow-hidden"
          >
            {/* Spacing Anchor (Top) */}
            <div className="w-full pt-6 z-30" />

            {/* 6 Floating Background Assets */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {renderFloatingAssets(colorClass)}
            </div>

            {/* Center Screen: Massive Screen-Spanning Header split across the middle */}
            <div className="flex-1 w-full grid grid-cols-2 items-center select-none pointer-events-none z-20 my-auto relative">
              {/* Left Column: Paul (Light Pink, right-aligned) */}
              <div className="text-right pr-6 md:pr-12 flex flex-col justify-center items-end">
                <h1 className={`text-[10vw] sm:text-[11vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter select-none ${colorClass}`}>
                  Paul
                </h1>
                <h2 className={`text-xs sm:text-sm md:text-lg font-mono tracking-[0.2em] mt-4 font-bold opacity-80 ${colorClass}`}>
                  // CREATIVE_DEVELOPER
                </h2>
              </div>
              
              {/* Right Column: James. (Dark Coral, left-aligned) */}
              <div className="text-left pl-6 md:pl-12 flex flex-col justify-center items-start">
                <h1 className={`text-[10vw] sm:text-[11vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter select-none ${colorClass}`}>
                  James.
                </h1>
                <h2 className={`text-xs sm:text-sm md:text-lg font-mono tracking-[0.2em] mt-4 font-bold opacity-80 ${colorClass}`}>
                  FOUNDER_@_DREAMSMITH_INC
                </h2>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: THE ICEBREAKERS (DYNAMIC ENTRANCE BLUEPRINTS + STATIC CONVERSATION CARDS) */}
        <React.Suspense fallback={<TechSkeleton height="400px" label="CREATING SYSTEM ICEBREAKERS" />}>
          <IcebreakerBlock 
            customTransformY={customTransformY} 
            colorClass={colorClass} 
            isGravityActive={isGravityActive} 
          />
        </React.Suspense>

        {/* SECTION 3: THE PROBLEM SOLVER */}
        <React.Suspense fallback={<TechSkeleton height="400px" label="CREATING PROBLEM SOLVER INTERACTIVE" />}>
          <ProblemSolverBlock customTransformY={customTransformY} />
        </React.Suspense>

        {/* SECTION 4: OPERATING CAPABILITIES (SCROLL-DRIVEN CARD TABLE) */}
        <React.Suspense fallback={<TechSkeleton height="500px" label="DEALING CAPABILITIES INTERFACE" />}>
          <CardTableCapabilities isGravityActive={isGravityActive} customTransformY={customTransformY} />
        </React.Suspense>

        {/* SECTION 5: THE TIMELINE (CURVED S-CURVE PATH) */}
        <React.Suspense fallback={<TechSkeleton height="600px" label="ASSEMBLING EVOLUTION GRAPH TIMELINE" />}>
          <EvolutionPath customTransformY={customTransformY} />
        </React.Suspense>

        {/* SECTION 6: AI ENGINEER (GRAND FINALE) */}
        <section className="py-40 px-0 bg-transparent relative overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />
          <div className="relative w-full">
            {renderAIProjects(colorClass)}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-24 px-0 border-t border-white/10 bg-transparent relative">
          <div className="relative w-full">
            {renderFooter(colorClass)}
          </div>
        </footer>
      </div>
    );
  };

  return (
    <main className={`min-h-screen bg-transparent selection:bg-white/20 font-sans overflow-x-hidden relative ${isGravityActive ? 'gravity-active' : ''}`}>
      <CustomCursor />

      {/* REAL DOCUMENT HEIGHT SCROLL DRIVER */}
      <div 
        style={{ height: documentHeight, width: '100%', pointerEvents: 'none' }} 
        className="absolute top-0 left-0 -z-50"
      />

      {/* DUMMY SCROLL REFERENCE CONTAINER (in absolute document flow to drive scroll timelines natively) */}
      <div className="absolute top-0 left-0 w-full opacity-0 pointer-events-none -z-50 overflow-hidden" style={{ height: 'auto' }}>
        <div ref={contentRef} className="w-full h-auto">
          {renderFullPage("", true)}
        </div>
      </div>

      {/* FIXED VERTICAL SPLIT BACKGROUND */}
      <div className="fixed inset-0 flex pointer-events-none -z-20">
        <div className="w-1/2 h-full bg-[#E55B6C]" />
        <div className="w-1/2 h-full bg-[#FFD1DC]" />
      </div>
      {/* Clean White center separator line */}
      <div className="fixed inset-y-0 left-1/2 w-[2px] bg-white/10 -z-10 pointer-events-none transform -translate-x-1/2 animate-pulse" />

      {/* LEFT HALF COLUMN VIEWPORT */}
      <div className="fixed left-0 top-0 w-[50vw] h-screen overflow-hidden pointer-events-auto">
        <motion.div 
          style={{ y: leftTransformY }} 
          className="w-[100vw] h-auto absolute left-0 top-0 text-light-pink border-light-pink"
        >
          {renderFullPage("text-light-pink border-light-pink", false, leftTransformY)}
        </motion.div>
      </div>

      {/* RIGHT HALF COLUMN VIEWPORT */}
      <div className="fixed left-[50vw] top-0 w-[50vw] h-screen overflow-hidden pointer-events-auto">
        <motion.div 
          style={{ y: rightTransformY, left: '-50vw' }} 
          className="w-[100vw] h-auto absolute top-0 text-dark-coral border-dark-coral"
        >
          {renderFullPage("text-dark-coral border-dark-coral", false, rightTransformY)}
        </motion.div>
      </div>

      {/* GLOBAL SINGLE AIRCRAFT FLYBY (COLOR SHIFTS DYNAMICALLY ACROSS CENTER SEPARATOR LINE) */}
      {/* Left side fixed viewport clipped at 50vw */}
      <div 
        style={isGravityActive ? { display: 'none' } : {}}
        className="fixed left-0 top-0 w-[50vw] h-screen overflow-hidden pointer-events-none select-none z-10"
      >
        <motion.div 
          style={{ y: leftTransformY }} 
          className="w-[100vw] h-auto absolute left-0 top-0 text-light-pink pointer-events-none"
        >
          <div className="absolute top-[100vh] left-0 w-[100vw] h-[300px] overflow-hidden pointer-events-none">
            <motion.div style={{ x: planeX }} className="w-full relative pointer-events-none">
              <B747Schematic />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right side fixed viewport clipped at 50vw, offset left by -50vw */}
      <div 
        style={isGravityActive ? { display: 'none' } : {}}
        className="fixed left-[50vw] top-0 w-[50vw] h-screen overflow-hidden pointer-events-none select-none z-10"
      >
        <motion.div 
          style={{ y: leftTransformY, left: '-50vw' }} 
          className="w-[100vw] h-auto absolute top-0 text-dark-coral pointer-events-none"
        >
          <div className="absolute top-[100vh] left-0 w-[100vw] h-[300px] overflow-hidden pointer-events-none">
            <motion.div style={{ x: planeX }} className="w-full relative pointer-events-none">
              <B747Schematic />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CENTER HOLOGRAPHIC CALIBRATION GAUGE (HUD) */}
      <CalibrationScale leftTransformY={leftTransformY} rightTransformY={rightTransformY} />

      {/* PHYSICS GRAVITY SANDBOX */}
      <React.Suspense fallback={null}>
        <GravitySandbox 
          isGravityActive={isGravityActive} 
          setIsGravityActive={setIsGravityActive} 
          onResetComplete={() => setResetCounter(prev => prev + 1)}
        />
      </React.Suspense>
    </main>
  );
}
