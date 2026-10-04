import Container from "@/components/shared/Container"
import SectionHeader from "@/components/shared/SectionHeader"
import Reveal from "@/components/shared/Reveal"
import { projectsData } from "./data"
import ProjectIndex from "./components/ProjectIndex"
import ProjectPreview from "./components/ProjectPreview"

export default function Projects() {
  const rows = projectsData.map(({ slug, title, descriptionShort, category }) => ({ slug, title, descriptionShort, category }))

  return (
    <section tabIndex={-1} className="bg-background py-14" id="projects">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="04"
            title="Projects"
            description="Eight things I've shipped. Each one opens into the full story: the problem, what I built, and the part that was actually hard."
            className="pb-7"
          />
          <div className="nx-divider" />
        </Reveal>

        <Reveal index={1}>
          <ProjectIndex
            rows={rows}
            previews={projectsData.map(project => <ProjectPreview key={project.slug} project={project} />)}
          />
        </Reveal>
      </Container>
    </section>
  )
}
