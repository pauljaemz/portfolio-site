import { motion } from "framer-motion";

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 50, rotateX: -20 },
    visible: { opacity: 1, scale: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 120, damping: 10, mass: 1.2 } }
  };

  return (
    <section className="min-h-screen relative text-white flex flex-col justify-center px-8 md:px-24 overflow-hidden perspective-[1000px]">
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <motion.p variants={item} className="text-accent-alt font-mono tracking-widest uppercase mb-4 text-sm font-semibold drop-shadow-md">
          Founder of dreamsmith // AI Researcher
        </motion.p>
        
        <motion.h1 variants={item} className="text-7xl md:text-[10rem] font-extrabold tracking-tighter leading-none mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent-alt">PAUL</span><br />
          JAMES.
        </motion.h1>

        <motion.h2 variants={item} className="text-3xl md:text-5xl text-white/90 max-w-3xl font-light drop-shadow-lg">
          Architecting Intelligence. <br />
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Capturing Reality.</span>
        </motion.h2>

        <motion.div variants={item} className="mt-14 flex flex-wrap gap-6">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(255, 0, 127, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-white text-black font-bold rounded-full transition-shadow"
          >
            Enter The Lab
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 border-2 border-white/30 rounded-full backdrop-blur-md text-white font-medium"
          >
            View Showreel
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
