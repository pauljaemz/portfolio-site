import BentoCard from "./BentoCard";
import AboutCard from "./sections/AboutCard";
import VideoReelCard from "./sections/VideoReelCard";
import ProjectsCard from "./sections/ProjectsCard";
import ExperienceCard from "./sections/ExperienceCard";

export default function BentoGrid() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
        
        {/* Top Row: About and Video */}
        <BentoCard className="md:col-span-2">
          <AboutCard />
        </BentoCard>
        
        <BentoCard className="md:col-span-1 p-2 md:p-2">
          <VideoReelCard />
        </BentoCard>

        {/* Bottom Row: Experience and Projects */}
        <BentoCard className="md:col-span-1">
          <ExperienceCard />
        </BentoCard>

        <BentoCard className="md:col-span-2">
          <ProjectsCard />
        </BentoCard>

      </div>
    </section>
  );
}
