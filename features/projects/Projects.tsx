import Container from "@/components/shared/Container"
import { projectsData } from "./data"
import ProjectCard from "./components/ProjectCard"
import SectionHeader from "@/components/shared/SectionHeader"
import Reveal from "@/components/shared/Reveal"

export default function Projects() {

  return (
    <section tabIndex={-1} className="bg-background py-14" id="projects">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="04"
            title="Projects"
            description="Six things I've shipped. Each one names the part that was actually hard."
            className="pb-7"
          />
          <div className="nx-divider" />
        </Reveal>

        <div className="mt-11 flex flex-col gap-[18px]">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
