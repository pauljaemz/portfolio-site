import React from 'react';
import { motion, useTransform } from 'framer-motion';

export default function CalibrationScale({ leftTransformY, rightTransformY }) {
  // Elastic spring shift: left and right ticks translate in opposite directions based on scroll offset.
  // We compress/scale the displacement by 0.08 so ticks remain beautifully centered.
  const leftShift = useTransform([leftTransformY, rightTransformY], ([l, r]) => {
    const diff = (l - r) * 0.08;
    return Math.max(-30, Math.min(diff, 30)); // Safe boundary clamp
  });

  const rightShift = useTransform([leftTransformY, rightTransformY], ([l, r]) => {
    const diff = (r - l) * 0.08;
    return Math.max(-30, Math.min(diff, 30)); // Safe boundary clamp
  });

  // Render exactly 5 static horizontal lines
  // Spaced vertically by 15px (covering -30px, -15px, 0px, 15px, 30px)
  const ticks = [-30, -15, 0, 15, 30];

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center justify-center select-none w-[100px] h-[80px] overflow-hidden">
      
      {/* LEFT COLUMN STATIC BLACK TICKS */}
      <div className="absolute left-0 w-[50px] h-full overflow-hidden">
        <motion.div 
          className="absolute right-0 w-full h-full"
          style={{ y: leftShift }}
        >
          {ticks.map((yVal) => (
            <div 
              key={`left-tick-${yVal}`}
              style={{ 
                height: '1.5px', 
                width: yVal === 0 ? '20px' : '10px', 
                position: 'absolute', 
                top: `calc(50% + ${yVal}px - 0.75px)`,
                right: '2px',
                backgroundColor: '#000000'
              }}
              className="opacity-70"
            />
          ))}
        </motion.div>
      </div>

      {/* RIGHT COLUMN STATIC BLACK TICKS */}
      <div className="absolute right-0 w-[50px] h-full overflow-hidden">
        <motion.div 
          className="absolute left-0 w-full h-full"
          style={{ y: rightShift }}
        >
          {ticks.map((yVal) => (
            <div 
              key={`right-tick-${yVal}`}
              style={{ 
                height: '1.5px', 
                width: yVal === 0 ? '20px' : '10px', 
                position: 'absolute', 
                top: `calc(50% + ${yVal}px - 0.75px)`,
                left: '2px',
                backgroundColor: '#000000'
              }}
              className="opacity-70"
            />
          ))}
        </motion.div>
      </div>

    </div>
  );
}
