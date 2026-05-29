import React from 'react';

/**
 * SplitInversion renders its children twice, clipping each copy to one half of the screen.
 * - Left half (0vw to 50vw): text is colored Light Pink (#FFD1DC).
 * - Right half (50vw to 100vw): text is colored Dark Coral (#E55B6C).
 * This creates a perfect color-split effect down the middle of the screen for any element.
 */
export default function SplitInversion({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Invisible layout driver to reserve natural space */}
      <div className="opacity-0 pointer-events-none select-none">
        {children}
      </div>
      
      {/* Left clipped layer (Light Pink on Dark Coral) */}
      <div 
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none select-none overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 50vw 0, 50vw 100%, 0 100%)' }}
      >
        <div className="w-full h-full flex justify-center items-center text-[#FFD1DC] stroke-[#FFD1DC] fill-[#FFD1DC]">
          {children}
        </div>
      </div>
      
      {/* Right clipped layer (Dark Coral on Light Pink) */}
      <div 
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none select-none overflow-hidden"
        style={{ clipPath: 'polygon(50vw 0, 100vw 0, 100vw 100%, 50vw 100%)' }}
      >
        <div className="w-full h-full flex justify-center items-center text-[#E55B6C] stroke-[#E55B6C] fill-[#E55B6C]">
          {children}
        </div>
      </div>
    </div>
  );
}
