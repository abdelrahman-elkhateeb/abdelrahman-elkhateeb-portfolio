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
          description="Four builds, from a full-stack e-learning platform to an internal hotel dashboard."
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
