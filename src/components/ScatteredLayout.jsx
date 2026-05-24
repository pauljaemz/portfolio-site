import BentoCard from "./BentoCard";
import AboutCard from "./sections/AboutCard";
import VideoReelCard from "./sections/VideoReelCard";
import ProjectsCard from "./sections/ProjectsCard";
import ExperienceCard from "./sections/ExperienceCard";

export default function ScatteredLayout() {
  return (
    <section className="py-32 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-16 md:gap-0">
      
      <div className="w-full md:w-[650px] self-start md:-ml-8 relative z-10">
        <BentoCard>
          <AboutCard />
        </BentoCard>
      </div>

      <div className="w-full md:w-[500px] self-end md:-mt-40 md:-mr-8 relative z-20">
        <BentoCard>
          <ExperienceCard />
        </BentoCard>
      </div>

      <div className="w-full md:w-[750px] self-center md:mt-24 relative z-30">
        <BentoCard>
          <ProjectsCard />
        </BentoCard>
      </div>

      <div className="w-full md:w-[450px] self-start md:-mt-56 md:ml-16 relative z-40">
        <BentoCard>
          <VideoReelCard />
        </BentoCard>
      </div>
      
    </section>
  );
}
