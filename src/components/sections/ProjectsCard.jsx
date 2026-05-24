export default function ProjectsCard() {
  const projects = [
    {
      title: "Phineas AI",
      desc: "Lecture transcription & summarization",
      tags: "LLaMA3-70B • Whisper",
      award: "Winner: Buildathon 2025",
      gradient: "from-accent/80 via-accent/20 to-transparent"
    },
    {
      title: "Visionary Model",
      desc: "Economic forecasting for India",
      tags: "Neural ODEs • Informer Transformers",
      gradient: "from-purple-500/80 via-purple-500/20 to-transparent"
    },
    {
      title: "Medical Imaging",
      desc: "Synthesizing PET scans from CT",
      tags: "CycleGAN • U-Net",
      gradient: "from-accent-alt/80 via-accent-alt/20 to-transparent"
    },
    {
      title: "AI Avatar Chatbot",
      desc: "Contextual organizational response system",
      tags: "RAG • D-ID",
      gradient: "from-blue-500/80 via-blue-500/20 to-transparent"
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-3xl font-extrabold mb-8 text-white flex items-center justify-between drop-shadow-md">
        Featured Research
        <span className="text-sm font-bold text-accent hover:text-white cursor-pointer transition-colors px-4 py-2 bg-white/10 rounded-full">View All &rarr;</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
        {projects.map((project, idx) => (
          <div key={idx} className="group cursor-pointer flex flex-col justify-end p-6 min-h-[180px] bg-white/5 rounded-2xl overflow-hidden relative transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {/* Colorful overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="absolute inset-0 bg-black/20 z-0"></div>
            
            <div className="relative z-20 mt-auto transform transition-transform duration-300 group-hover:-translate-y-2">
              {project.award && (
                <span className="inline-block px-3 py-1 mb-3 bg-white text-black text-xs font-black uppercase tracking-wider rounded-full shadow-lg">
                  {project.award}
                </span>
              )}
              <h4 className="text-white font-extrabold text-2xl leading-tight drop-shadow-md">{project.title}</h4>
              <p className="text-sm text-white/90 mt-2 line-clamp-1 font-medium">{project.desc}</p>
              <p className="text-xs text-white/70 mt-2 font-mono">{project.tags}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
