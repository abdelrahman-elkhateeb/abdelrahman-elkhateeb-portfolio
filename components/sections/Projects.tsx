import ProjectCard from "../ProjectCard"
import TypeWriterAnimation from "../TypeWriterAnimation"

export default function Projects() {
  return (
    <section className="container mx-auto px-4 mt-20" id="projects">
      <TypeWriterAnimation text="Projects" tagType="h2" />

      <div className="grid-layout gap-12">
        <ProjectCard />
      </div>
    </section>
  )
}