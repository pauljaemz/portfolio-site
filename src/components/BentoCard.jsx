import { motion } from "framer-motion";

export default function BentoCard({ className = "", children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 150, rotate: -4 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ type: "spring", stiffness: 100, damping: 12, mass: 1.2 }}
      whileHover={{ scale: 1.03, rotate: 1, zIndex: 50, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97, rotate: -1 }}
      drag
      dragConstraints={{ top: -20, left: -20, right: 20, bottom: 20 }}
      dragElastic={0.2}
      className={`glass-panel p-8 md:p-10 overflow-hidden relative flex flex-col cursor-grab active:cursor-grabbing ${className}`}
    >
      {children}
    </motion.div>
  );
}
