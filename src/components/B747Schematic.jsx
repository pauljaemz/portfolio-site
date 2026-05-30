import React from 'react';

export default function B747Schematic() {
  return (
    <svg className="w-[300px] md:w-[500px] h-[150px] md:h-[250px] stroke-[1.2] fill-none graphic-asset" viewBox="0 0 500 250">
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
      
      {/* Flight Direction Nose Arrow Indicators */}
      <polygon points="74,114 81,110 85,114" fill="currentColor" fillOpacity="0.8" stroke="currentColor" />
      
      {/* Structural Alignment/Measurement Markings */}
      <path d="M 52 133 C 52 135, 51 142, 51 145" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="20" y1="140" x2="480" y2="140" stroke="currentColor" strokeDasharray="3,6" strokeOpacity="0.3" />
      <line x1="180" y1="40" x2="180" y2="220" stroke="currentColor" strokeDasharray="3,6" strokeOpacity="0.3" />
      
      {/* Isometric/Architectural Scale Annotations */}
      <text x="30" y="70" className="font-mono text-[9px] fill-current" opacity="0.65" stroke="none">L: 76.3m (B747-8)</text>
      <text x="30" y="82" className="font-mono text-[9px] fill-current" opacity="0.65" stroke="none">SPAN: 68.4m</text>
      <text x="30" y="55" className="font-mono text-[10px] fill-current font-bold tracking-wider" stroke="none">BOEING 747-8 SCHEMATIC</text>
      
      <circle cx="210" cy="178" r="5" stroke="currentColor" strokeDasharray="1,1" strokeOpacity="0.5" />
      <circle cx="255" cy="201" r="5" stroke="currentColor" strokeDasharray="1,1" strokeOpacity="0.5" />
    </svg>
  );
}
