export default function AboutCard() {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-alt">About Me</h3>
      <p className="text-white/80 font-light leading-relaxed text-lg flex-grow drop-shadow-md">
        I'm an AI Researcher and Full-Stack Developer currently pursuing my M.Sc. in Computer Science with a specialization in Artificial Intelligence at CUSAT. As the founder of <span className="text-white font-bold">dreamsmith</span> and <span className="text-white font-bold">HustleIt</span>, I blend cutting-edge AI architectures with seamless digital experiences.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <span className="px-5 py-2 bg-gradient-to-r from-accent/20 to-purple-500/20 border border-white/20 rounded-full text-sm text-white font-medium shadow-[0_0_15px_rgba(255,0,127,0.3)]">Python & Django</span>
        <span className="px-5 py-2 bg-gradient-to-r from-purple-500/20 to-accent-alt/20 border border-white/20 rounded-full text-sm text-white font-medium shadow-[0_0_15px_rgba(0,255,204,0.3)]">React & Postgres</span>
        <span className="px-5 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-white font-medium">LLMs & RAG</span>
        <span className="px-5 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-white font-medium">GANs & Neural ODEs</span>
      </div>
    </div>
  );
}
