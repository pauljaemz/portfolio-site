export default function ExperienceCard() {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-accent-alt to-purple-500">Experience</h3>
      <div className="space-y-8 flex-grow">
        
        <div className="relative pl-8 border-l-2 border-accent-alt/50">
          <div className="absolute w-4 h-4 bg-accent-alt rounded-full -left-[9px] top-1 shadow-[0_0_15px_rgba(0,255,204,0.8)]"></div>
          <h4 className="text-white font-bold text-xl leading-tight drop-shadow-md">AI Intern</h4>
          <p className="text-sm text-accent-alt mb-1 font-semibold">Talrop // Current</p>
        </div>

        <div className="relative pl-8 border-l-2 border-purple-400/50">
          <div className="absolute w-4 h-4 bg-purple-400 rounded-full -left-[9px] top-1 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
          <h4 className="text-white font-bold text-xl leading-tight drop-shadow-md">Founder</h4>
          <p className="text-sm text-purple-300 mb-1 font-medium">HustleIt // Incubated at CITTIC (CUSAT)</p>
          <p className="text-sm text-white/70">Two-sided gig-economy marketplace platform.</p>
        </div>

        <div className="relative pl-8 border-l-2 border-accent/50">
          <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-1 shadow-[0_0_15px_rgba(255,0,127,0.8)]"></div>
          <h4 className="text-white font-bold text-xl leading-tight drop-shadow-md">Founder & AI Researcher</h4>
          <p className="text-sm text-accent mb-1 font-medium">dreamsmith</p>
        </div>

        <div className="relative pl-8 border-l-2 border-white/20">
          <div className="absolute w-4 h-4 bg-white/60 rounded-full -left-[9px] top-1"></div>
          <h4 className="text-white font-bold text-xl leading-tight drop-shadow-md">Validation Lead</h4>
          <p className="text-sm text-white/60 mb-1 font-medium">TCS // Dec 2022 - Jul 2024</p>
          <p className="text-sm text-white/50">Enterprise solutions for a global pharmaceutical client.</p>
        </div>

      </div>
    </div>
  );
}
