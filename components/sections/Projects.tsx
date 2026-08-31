import { Fragment } from "react"
import { projectsData } from "@/lib"
import ProjectCard from "../ProjectCard"
import SectionHeader from "@/components/SectionHeader"

export default function Projects() {
  return (
    <section style={{ background: "#0b0c14" }} className="py-14" id="projects">
      <div className="mx-auto w-full max-w-290 px-4.5">
        <SectionHeader
          eyebrow="04"
          title="Projects"
          description="Six builds, from a production gifting platform and its operations dashboard to full-stack products and focused frontend tools."
          className="pb-7"
        />

        <div className="nx-divider" />
        {projectsData.map((project) => (
          <Fragment key={project.link}>
            <ProjectCard project={project} />
            <div className="nx-divider" />
          </Fragment>
        ))}
      </div>
    </section>
  )
}
