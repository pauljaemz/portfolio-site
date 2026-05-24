export default function VideoReelCard() {
  return (
    <div className="w-full h-full min-h-[350px] relative rounded-3xl overflow-hidden group cursor-pointer border-2 border-white/20 hover:border-accent transition-colors duration-300">
      {/* Colorful placeholder for video */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-accent/20 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
        
        {/* Glowing play button */}
        <div className="w-20 h-20 bg-gradient-to-tr from-accent to-accent-alt rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,255,204,0.6)] group-hover:shadow-[0_0_70px_rgba(0,255,204,1)] transition-all duration-300 transform group-hover:scale-110">
          <svg className="w-8 h-8 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        
      </div>
      <div className="absolute bottom-6 left-6 z-10">
        <span className="px-5 py-3 bg-black/50 backdrop-blur-xl border border-white/30 rounded-full text-sm text-white font-bold uppercase tracking-widest shadow-lg">
          Play Showreel
        </span>
      </div>
    </div>
  );
}
