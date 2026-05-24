import React from 'react';
import { motion } from 'framer-motion';

// 5-Stage Evolution Configuration
const EVOLUTION_STAGES = [
  {
    label: "01 // DON BOSCO",
    name: "DON BOSCO",
    context: "Schooling & Early Tech Exploration",
    description: "Where the curiosity for computers began. Writing my first lines of code and understanding how digital systems operate behind screen interfaces."
  },
  {
    label: "02 // NAIPUNNYA",
    name: "NAIPUNNYA COLLEGE",
    context: "B.Sc. Computer Science / Foundations",
    description: "Deepening the core academic stack. Transitioning from visual scripting to structured programming, design systems, and frontend frameworks."
  },
  {
    label: "03 // TCS",
    name: "TCS",
    context: "Validation Lead",
    description: "Handled enterprise-grade validation systems for a global pharma giant. Learned exactly how massive systems break at scale, optimizing workflows under strict production environments."
  },
  {
    label: "04 // CUSAT",
    name: "CUSAT",
    context: "M.Sc. AI Specialist",
    description: "Building deep continuous-time models and researching neural representations. Specializing in advanced machine learning and high-dimensional matrices."
  },
  {
    label: "05 // DREAMSMITH",
    name: "FOUNDER OF DREAMSMITH INC",
    context: "dreamSmith & HustleIt Platforms",
    description: "Incubating scalable digital platforms at CITTIC. Completely disrupting the student gig economy by bridging freelance talent with local industry requirements."
  }
];

// Technical Scramble Decrypter for new letters
const GlitchCharacter = ({ char }) => {
  const [displayChar, setDisplayChar] = React.useState(char);
  const glyphs = "XX@#$%&?*+=![]{}01";

  React.useEffect(() => {
    if (char === " ") {
      setDisplayChar(" ");
      return;
    }
    
    let iterations = 0;
    const maxIterations = 8;
    const interval = setInterval(() => {
      if (iterations >= maxIterations) {
        setDisplayChar(char);
        clearInterval(interval);
      } else {
        const randomChar = glyphs[Math.floor(Math.random() * glyphs.length)];
        setDisplayChar(randomChar);
        iterations++;
      }
    }, 40);

    return () => clearInterval(interval);
  }, [char]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="inline-block text-[#00ffcc] drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]"
    >
      {displayChar}
    </motion.span>
  );
};

// Typewriter console readout
const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    setDisplayText("");
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < text.length) {
        setDisplayText((prev) => prev + text.charAt(idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 12); // Sleek and responsive typing

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="text-zinc-300 text-base leading-relaxed font-light font-mono min-h-[90px] md:min-h-[70px] text-left">
      {displayText}
      <span className="inline-block w-1.5 h-4 bg-[#00ffcc] ml-1 animate-pulse" />
    </p>
  );
};

export default function EvolutionTimeline() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [previousStep, setPreviousStep] = React.useState(0);

  const handleStepChange = (newStep) => {
    if (newStep === activeStep) return;
    setPreviousStep(activeStep);
    setActiveStep(newStep);
  };

  // Character Matching Algorithm
  const getMappedCharacters = () => {
    const targetStr = EVOLUTION_STAGES[activeStep].name;
    const sourceStr = EVOLUTION_STAGES[previousStep].name;

    const sourceChars = sourceStr.toUpperCase().split('').map((char, index) => ({
      char,
      index,
      used: false
    }));

    return targetStr.toUpperCase().split('').map((char, index) => {
      // Find the first unmatched matching letter in the previous step
      const match = sourceChars.find(
        (s) => s.char === char && !s.used
      );

      if (match) {
        match.used = true;
        return {
          char,
          key: `char-${char}-${match.index}`,
          matched: true
        };
      } else {
        return {
          char,
          key: `new-${char}-${index}`,
          matched: false
        };
      }
    });
  };

  const mappedChars = getMappedCharacters();
  const currentStage = EVOLUTION_STAGES[activeStep];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative bg-[#020202] overflow-hidden">
      {/* Decorative Radial Backglows */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#00ffcc]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="text-[#00ffcc] font-mono text-sm tracking-widest mb-4 font-black uppercase">
            // LOG_LEDGER.log
          </h2>
          <h3 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4 text-white">
            The Evolution
          </h3>
          <p className="text-zinc-400 text-lg font-light max-w-lg mx-auto font-mono text-xs uppercase">
            System evolution ledger. Dossier format index.
          </p>
        </div>

        {/* Widescreen Cyber Terminal Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Vertical Timeline Tabs (Left Side) */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            {EVOLUTION_STAGES.map((stage, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={stage.label}
                  onClick={() => handleStepChange(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative group flex items-center justify-between overflow-hidden ${
                    isActive
                      ? 'bg-[#00ffcc]/[0.02] border-[#00ffcc]/40 shadow-[0_0_20px_rgba(0,255,204,0.05)]'
                      : 'bg-black/30 border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Glowing vertical marker line inside active button */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabMarker"
                      className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00ffcc]"
                    />
                  )}

                  <div className="flex flex-col gap-1 z-10 pl-2">
                    <span
                      className={`font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                        isActive ? 'text-[#00ffcc]' : 'text-white/30 group-hover:text-white/50'
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span
                      className={`font-display font-bold text-sm tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                      }`}
                    >
                      {stage.name === "FOUNDER OF DREAMSMITH INC" ? "dreamsmith" : stage.name}
                    </span>
                  </div>

                  {/* Pulsing indicator block */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'bg-[#00ffcc] border-[#00ffcc] shadow-[0_0_10px_#00ffcc]'
                        : 'border-white/20 bg-transparent group-hover:border-white/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Large Screen Terminal Display (Right/Center) */}
          <div className="lg:col-span-8 flex flex-col justify-between glass-panel border-white/5 rounded-3xl overflow-hidden relative p-8 md:p-12 min-h-[400px]">
            {/* Ambient screen tint */}
            <div className="absolute inset-0 bg-[#030303]/40 -z-10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDEiLz4KPC9zdmc+')] pointer-events-none opacity-50 z-10" />

            {/* Screen Header Toolbar */}
            <div className="border-b border-white/5 pb-6 flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc]" />
                <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase ml-4">
                  INDEX_DOCK: 0{activeStep + 1} // ACTIVE_LEDGER
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#00ffcc] bg-[#00ffcc]/10 px-2.5 py-0.5 rounded border border-[#00ffcc]/20 uppercase tracking-widest animate-pulse">
                DECRYPT_ACTIVE
              </span>
            </div>

            {/* Main Interactive Word Display Screen */}
            <div className="flex-1 flex flex-col justify-center items-center py-8 z-10">
              <div className="flex flex-wrap justify-center items-center gap-y-3 font-display font-black text-3xl md:text-5xl text-white tracking-widest uppercase text-center max-w-full">
                {mappedChars.map((item) => (
                  <motion.span
                    key={item.key}
                    layout
                    transition={{ type: "spring", stiffness: 140, damping: 18 }}
                    className={`inline-block select-none ${
                      item.char === ' ' ? 'w-4 md:w-6' : ''
                    }`}
                  >
                    {item.matched ? (
                      <span className="text-white hover:text-[#00ffcc] transition-colors duration-300">
                        {item.char}
                      </span>
                    ) : (
                      <GlitchCharacter char={item.char} />
                    )}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Terminal Status Bar */}
            <div className="border-t border-b border-white/5 py-4 my-8 flex items-center justify-between font-mono text-[9px] text-white/30 uppercase tracking-widest">
              <span>STATUS: RECONSTRUCTED_STREAM</span>
              <span className="text-[#00ffcc]/60">INTEGRITY_INDEX: 1.000_MAX</span>
            </div>

            {/* Terminal Description Console Output */}
            <div className="text-left">
              <div className="font-mono text-[#00ffcc] text-xs font-bold tracking-wider mb-2 uppercase flex items-center gap-2">
                <span className="inline-block w-1.5 h-3 bg-[#00ffcc]/80" />
                {currentStage.context}
              </div>
              
              <TypewriterText text={currentStage.description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
