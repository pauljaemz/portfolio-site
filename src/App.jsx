import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import FloatingAsset from './components/FloatingAsset';
import './index.css';

// Dynamically import below-the-fold heavy components for bundle size & network optimizations
const ProblemSolverBlock = React.lazy(() => import('./components/ProblemSolverBlock'));
const CardTableCapabilities = React.lazy(() => import('./components/CardTableCapabilities'));
const EvolutionPath = React.lazy(() => import('./components/EvolutionPath'));
const GravitySandbox = React.lazy(() => import('./components/GravitySandbox'));

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

function B747Schematic() {
  return (
    <svg className="w-[300px] md:w-[500px] h-auto stroke-[1.2] fill-none graphic-asset" viewBox="0 0 500 250">
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
      <text x="30" y="70" className="font-mono text-[9px] fill-current" opacity="0.65" stroke="none">L: 76.3m (B747-8)</text>
      <text x="30" y="82" className="font-mono text-[9px] fill-current" opacity="0.65" stroke="none">SPAN: 68.4m</text>
      <text x="30" y="55" className="font-mono text-[10px] fill-current font-bold tracking-wider" stroke="none">BOEING 747-8 SCHEMATIC</text>
      
      <circle cx="210" cy="178" r="5" stroke="currentColor" strokeDasharray="1,1" strokeOpacity="0.5" />
      <circle cx="255" cy="201" r="5" stroke="currentColor" strokeDasharray="1,1" strokeOpacity="0.5" />
    </svg>
  );
}

export default function App() {
  const sectionRef = React.useRef(null);
  const [isGravityActive, setIsGravityActive] = React.useState(false);
  const [resetCounter, setResetCounter] = React.useState(0);
  const [hoveredIcebreaker, setHoveredIcebreaker] = React.useState(null);

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
        <FloatingAsset initialLeft="84%" initialTop="72%" className="design-asset" isGravityActive={isGravityActive}>
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
        <FloatingAsset initialLeft="26%" initialTop="74%" className="design-asset" isGravityActive={isGravityActive}>
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

        {/* Asset 10: Headphones (NEW) */}
        <FloatingAsset initialLeft="70%" initialTop="34%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-24 h-24 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 100 100"
          >
            {/* Headband Outer Wire */}
            <path d="M 15 50 A 35 35 0 0 1 85 50" stroke="currentColor" />
            {/* Headband Inner Cushion Band */}
            <path d="M 20 50 A 30 30 0 0 1 80 50" stroke="currentColor" strokeDasharray="3,3" />
            {/* Left Ear Cup */}
            <rect x="10" y="44" width="8" height="22" rx="3" stroke="currentColor" />
            <rect x="18" y="47" width="3" height="16" rx="1" stroke="currentColor" />
            {/* Right Ear Cup */}
            <rect x="82" y="44" width="8" height="22" rx="3" stroke="currentColor" />
            <rect x="79" y="47" width="3" height="16" rx="1" stroke="currentColor" />
            {/* Band adjusters */}
            <line x1="14" y1="44" x2="14" y2="38" stroke="currentColor" />
            <line x1="86" y1="44" x2="86" y2="38" stroke="currentColor" />
          </svg>
        </FloatingAsset>

        {/* Asset 11: Modern Racing Superbike */}
        <FloatingAsset initialLeft="82%" initialTop="58%" className="design-asset" isGravityActive={isGravityActive}>
          <svg
            className={`w-36 h-24 stroke-[1.5] fill-none graphic-asset filter drop-shadow-[0_0_10px_rgba(255,255,255,0.06)] ${colorClass}`}
            viewBox="0 0 100 60"
          >
            {/* Front Wheel (Left) */}
            <circle cx="25" cy="42" r="13" stroke="currentColor" />
            <circle cx="25" cy="42" r="11" stroke="currentColor" strokeDasharray="3,3" opacity="0.6" />
            <circle cx="25" cy="42" r="8" stroke="currentColor" opacity="0.8" />
            <circle cx="25" cy="42" r="7" stroke="currentColor" />
            <circle cx="25" cy="42" r="2.5" stroke="currentColor" />
            
            {/* Rear Wheel (Right) */}
            <circle cx="75" cy="42" r="13" stroke="currentColor" />
            <circle cx="75" cy="42" r="11" stroke="currentColor" strokeDasharray="3,3" opacity="0.6" />
            <circle cx="75" cy="42" r="6" stroke="currentColor" />
            <circle cx="75" cy="42" r="2.5" stroke="currentColor" />
            
            {/* Upside Down Front Fork */}
            <line x1="25" y1="42" x2="35" y2="16" stroke="currentColor" strokeWidth="1.5" />
            {/* Clip-on Racing Handlebars */}
            <line x1="33" y1="18" x2="31" y2="20" stroke="currentColor" strokeWidth="2" />
            <path d="M 31 20 L 29 22" stroke="currentColor" />
            
            {/* Aerodynamic Front Nose Fairing & Headlight Cowl */}
            <path d="M 33 16 C 34 12, 38 10, 41 10 C 39 13, 37 15, 35 16" stroke="currentColor" />
            <path d="M 33 16 L 21 24 L 28 32 C 30 35, 33 36, 36 36 L 44 36" stroke="currentColor" />
            <path d="M 23 23 L 29 25" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Muscular, Angular Sport Fuel Tank */}
            <path d="M 37 20 C 40 14, 46 13, 52 16 C 55 18, 56 22, 54 25 Z" stroke="currentColor" />
            <path d="M 44 20 C 47 22, 51 22, 53 25" stroke="currentColor" opacity="0.7" />
            
            {/* Aggressive Fully Cowled Mid-Body / Side Fairing */}
            <path d="M 33 30 L 40 22 L 54 25 L 52 38 L 33 36 Z" stroke="currentColor" />
            <line x1="42" y1="26" x2="40" y2="32" stroke="currentColor" />
            <line x1="46" y1="27" x2="44" y2="33" stroke="currentColor" />
            <line x1="50" y1="28" x2="48" y2="34" stroke="currentColor" />
            
            {/* Aerodynamic Winglet */}
            <path d="M 33 28 L 39 29 L 36 31 Z" stroke="currentColor" />
            
            {/* Exposed Aluminum Twin-Spar Frame */}
            <path d="M 35 18 C 39 22, 48 24, 54 36" stroke="currentColor" strokeWidth="2" />
            
            {/* Sharp Upswept Tail Section & Split Seats */}
            <path d="M 54 25 C 57 26, 60 26, 62 22 C 64 20, 68 18, 74 15 C 72 20, 68 25, 62 28 Z" stroke="currentColor" />
            <path d="M 64 21 C 67 19, 71 17, 73 15" stroke="currentColor" />
            
            {/* Swingarm Rear Fork */}
            <path d="M 54 36 L 75 42 L 56 38 Z" stroke="currentColor" />
            
            {/* Heavy Upswept Racing Exhaust */}
            <path d="M 48 38 Q 56 42 66 38 L 74 28 L 72 26 L 64 36 Z" stroke="currentColor" />
            <line x1="68" y1="33" x2="66" y2="26" stroke="currentColor" opacity="0.8" />
            
            {/* Rear Tire Hugger / Mudguard */}
            <path d="M 64 36 C 66 32, 70 30, 75 29 C 76 29, 78 30, 79 31" stroke="currentColor" opacity="0.8" />
          </svg>
        </FloatingAsset>
      </>
    );
  };

  const renderIcebreakers = (colorClass) => {
    return (
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

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 items-stretch">
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
                className={`flex flex-col gap-3 sm:gap-6 p-3 sm:p-6 md:p-8 glass-panel rounded-2xl sm:rounded-3xl transition-all duration-300 relative overflow-hidden group min-h-[220px] sm:min-h-[260px] md:min-h-[300px] justify-between text-left h-full border-white ${colorClass}`}
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
                className={`flex flex-col gap-3 sm:gap-6 p-3 sm:p-6 md:p-8 glass-panel rounded-2xl sm:rounded-3xl transition-all duration-300 relative overflow-hidden group min-h-[220px] sm:min-h-[260px] md:min-h-[300px] justify-between text-left h-full border-white ${colorClass}`}
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
                className={`flex flex-col gap-3 sm:gap-6 p-3 sm:p-6 md:p-8 glass-panel rounded-2xl sm:rounded-3xl transition-all duration-300 relative overflow-hidden group min-h-[220px] sm:min-h-[260px] md:min-h-[300px] justify-between text-left h-full border-white ${colorClass}`}
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
                      Ask me about model weight collapse, training losses of multi-billion parameter networks, or whether gradient descent is just premium guessing. I will talk for hours.
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
    );
  };

  const renderAIProjects = (colorClass) => {
    return (
      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12 lg:px-24">
        <motion.div {...fadeInUp} className="mb-20 w-full text-left select-none pointer-events-none flex flex-col items-start">
          <h2 className={`font-mono text-sm tracking-widest mb-3 font-black uppercase ${colorClass}`}>
            // EXPERIMENTAL LABS // AI ENGINEERING
          </h2>
          <h3 className={`text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 ${colorClass} leading-tight`}>
            Oh, and by the way...<br />I'm an AI Engineer.
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
              className={`glass-panel p-10 rounded-3xl border-white bg-white/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[280px] text-left ${colorClass}`}
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
              className={`glass-panel p-10 rounded-3xl border-white bg-white/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[280px] text-left ${colorClass}`}
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
              className={`glass-panel p-10 rounded-3xl border-white bg-white/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[280px] text-left ${colorClass}`}
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
              className={`glass-panel p-10 rounded-3xl border-white bg-white/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[280px] text-left ${colorClass}`}
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
          const documentHeight = document.documentElement.scrollHeight;
          
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
    <main className={`min-h-screen bg-transparent selection:bg-white/20 font-sans overflow-x-hidden relative ${isGravityActive ? 'gravity-active' : ''}`}>
      <CustomCursor />

      {/* FIXED VERTICAL SPLIT BACKGROUND */}
      <div className="fixed inset-0 flex pointer-events-none -z-20">
        <div className="w-1/2 h-full bg-[#E55B6C]" />
        <div className="w-1/2 h-full bg-[#FFD1DC]" />
      </div>
      {/* Clean White center separator line */}
      <div className="fixed inset-y-0 left-1/2 w-[2px] bg-white/10 -z-10 pointer-events-none transform -translate-x-1/2 animate-pulse" />

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

          {/* 6 Floating Background Assets - Left Column Layer (Light Pink) */}
          <div className="absolute left-0 top-0 bottom-0 w-[50vw] overflow-hidden pointer-events-none z-10 text-light-pink border-light-pink">
            <div className="w-screen h-full text-inherit fill-inherit stroke-inherit relative">
              {renderFloatingAssets("text-light-pink border-light-pink")}
            </div>
          </div>

          {/* 6 Floating Background Assets - Right Column Layer (Dark Coral) */}
          <div className="absolute left-[50vw] top-0 bottom-0 w-[50vw] overflow-hidden pointer-events-none z-10 text-dark-coral border-dark-coral">
            <div 
              className="w-screen h-full text-inherit fill-inherit stroke-inherit relative"
              style={{ left: '-50vw' }}
            >
              {renderFloatingAssets("text-dark-coral border-dark-coral")}
            </div>
          </div>

          {/* Center Screen: Massive Screen-Spanning Header split across the middle */}
          <div className="flex-1 w-full grid grid-cols-2 items-center select-none pointer-events-none z-20 my-auto relative">
            {/* Left Column: Paul (Light Pink, right-aligned) */}
            <div className="text-right pr-6 md:pr-12 flex flex-col justify-center items-end">
              <h1 className="text-[10vw] sm:text-[11vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter text-light-pink select-none">
                Paul
              </h1>
              <h2 className="text-xs sm:text-sm md:text-lg font-mono tracking-[0.2em] text-light-pink/70 mt-4 font-bold">
                // CREATIVE_DEVELOPER
              </h2>
            </div>
            
            {/* Right Column: James. (Dark Coral, left-aligned) */}
            <div className="text-left pl-6 md:pl-12 flex flex-col justify-center items-start">
              <h1 className="text-[10vw] sm:text-[11vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter text-dark-coral select-none">
                James.
              </h1>
              <h2 className="text-xs sm:text-sm md:text-lg font-mono tracking-[0.2em] text-dark-coral/80 mt-4 font-bold">
                FOUNDER_@_DREAMSMITH_INC
              </h2>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: THE ICEBREAKERS (DYNAMIC ENTRANCE BLUEPRINTS + STATIC CONVERSATION CARDS) */}
      <section 
        ref={sectionRef}
        className="py-32 relative z-10 border-t border-white/10 overflow-hidden bg-transparent"
      >
        {/* Huge Aircraft Blueprint - Scroll-linked Flyby - Left Column Layer (Light Pink) */}
        <div 
          style={isGravityActive ? { display: 'none' } : {}}
          className="absolute left-0 top-[12%] w-[50vw] overflow-hidden pointer-events-none select-none -z-10 text-light-pink"
        >
          <div className="w-screen relative">
            <motion.div style={{ x: planeX }} className="w-full">
              <B747Schematic />
            </motion.div>
          </div>
        </div>

        {/* Huge Aircraft Blueprint - Scroll-linked Flyby - Right Column Layer (Dark Coral) */}
        <div 
          style={isGravityActive ? { display: 'none' } : {}}
          className="absolute left-[50vw] top-[12%] w-[50vw] overflow-hidden pointer-events-none select-none -z-10 text-dark-coral"
        >
          <div 
            className="w-screen relative"
            style={{ left: '-50vw' }}
          >
            <motion.div style={{ x: planeX }} className="w-full">
              <B747Schematic />
            </motion.div>
          </div>
        </div>

        <div className="relative w-full">
          {/* Layout Driver (Invisible) */}
          <div className="opacity-0 pointer-events-none select-none w-full">
            {renderIcebreakers("")}
          </div>

          {/* Left Column Layer (Light Pink) */}
          <div className="absolute left-0 top-0 bottom-0 w-[50vw] overflow-hidden text-light-pink fill-light-pink stroke-light-pink z-10">
            <div className="w-screen h-full text-inherit fill-inherit stroke-inherit relative">
              {renderIcebreakers("text-light-pink")}
            </div>
          </div>

          {/* Right Column Layer (Dark Coral) */}
          <div className="absolute left-[50vw] top-0 bottom-0 w-[50vw] overflow-hidden text-dark-coral fill-dark-coral stroke-dark-coral z-10">
            <div 
              className="w-screen h-full text-inherit fill-inherit stroke-inherit relative"
              style={{ left: '-50vw' }}
            >
              {renderIcebreakers("text-dark-coral")}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE PROBLEM SOLVER */}
      <React.Suspense fallback={<TechSkeleton height="400px" label="CREATING PROBLEM SOLVER INTERACTIVE" />}>
        <ProblemSolverBlock />
      </React.Suspense>

      {/* SECTION 4: OPERATING CAPABILITIES (SCROLL-DRIVEN CARD TABLE) */}
      <React.Suspense fallback={<TechSkeleton height="500px" label="DEALING CAPABILITIES INTERFACE" />}>
        <CardTableCapabilities isGravityActive={isGravityActive} />
      </React.Suspense>

      {/* SECTION 5: THE TIMELINE (CURVED S-CURVE PATH) */}
      <React.Suspense fallback={<TechSkeleton height="600px" label="ASSEMBLING EVOLUTION GRAPH TIMELINE" />}>
        <EvolutionPath />
      </React.Suspense>

      {/* SECTION 6: AI ENGINEER (GRAND FINALE) */}
      <section className="py-40 px-0 bg-transparent relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

        <div className="relative w-full">
          {/* Layout Driver (Invisible) */}
          <div className="opacity-0 pointer-events-none select-none w-full">
            {renderAIProjects("")}
          </div>

          {/* Left Column Layer (Light Pink) */}
          <div className="absolute left-0 top-0 bottom-0 w-[50vw] overflow-hidden text-light-pink fill-light-pink stroke-light-pink z-10">
            <div className="w-screen h-full text-inherit fill-inherit stroke-inherit relative">
              {renderAIProjects("text-light-pink")}
            </div>
          </div>

          {/* Right Column Layer (Dark Coral) */}
          <div className="absolute left-[50vw] top-0 bottom-0 w-[50vw] overflow-hidden text-dark-coral fill-dark-coral stroke-dark-coral z-10">
            <div 
              className="w-screen h-full text-inherit fill-inherit stroke-inherit relative"
              style={{ left: '-50vw' }}
            >
              {renderAIProjects("text-dark-coral")}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-0 border-t border-white/10 bg-transparent relative transition-all duration-700">
        <div className="relative w-full">
          {/* Layout Driver (Invisible) */}
          <div className="opacity-0 pointer-events-none select-none w-full">
            {renderFooter("")}
          </div>

          {/* Left Column Layer (Light Pink) */}
          <div className="absolute left-0 top-0 bottom-0 w-[50vw] overflow-hidden text-light-pink fill-light-pink stroke-light-pink z-10">
            <div className="w-screen h-full text-inherit fill-inherit stroke-inherit relative">
              {renderFooter("text-light-pink")}
            </div>
          </div>

          {/* Right Column Layer (Dark Coral) */}
          <div className="absolute left-[50vw] top-0 bottom-0 w-[50vw] overflow-hidden text-dark-coral fill-dark-coral stroke-dark-coral z-10">
            <div 
              className="w-screen h-full text-inherit fill-inherit stroke-inherit relative"
              style={{ left: '-50vw' }}
            >
              {renderFooter("text-dark-coral")}
            </div>
          </div>
        </div>
      </footer>
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
