import ProjectCard from "../ProjectCard"
import TypeWriterAnimation from "../TypeWriterAnimation"

export default function Projects() {
  return (
    <section className="container mx-auto px-4 mt-20" id="projects">
      <TypeWriterAnimation text="Projects" tagType="h2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
        <ProjectCard />
      </div>
    </section>
  )
}