"use client"

import { projectsData } from "@/lib"
import ProjectCard from "../ProjectCard"
import SectionHeader from "@/components/SectionHeader"
import { useReveal } from "@/hooks/useReveal"

export default function Projects() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <section style={{ background: "#0b0c14" }} className="py-14" id="projects">
      <div className="mx-auto w-full max-w-290 px-4.5">
        <div ref={ref} data-reveal className={visible ? "is-visible" : ""}>
          <SectionHeader
            eyebrow="04"
            title="Projects"
            description="Six things I've shipped. Each one names the part that was actually hard."
            className="pb-7"
          />
          <div className="nx-divider" />
        </div>

        <div className="mt-11 flex flex-col gap-[18px]">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
