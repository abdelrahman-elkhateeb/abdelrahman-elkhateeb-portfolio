import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import Container from "@/components/shared/Container"
import Reveal from "@/components/shared/Reveal"
import ArrowGlyph from "@/components/shared/ArrowGlyph"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { displayUrl, getNextProject, isSourceLink, projectsData } from "./data"
import type { ProjectEntry } from "./types"
import Illustration from "./components/illustrations/Illustration"
import TechList from "./components/TechList"

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-foreground/12 py-3.5 last:border-b">
      <dt className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">{label}</dt>
      <dd className="m-0 font-sans text-[15px] leading-[1.5] text-hero-subline">{children}</dd>
    </div>
  )
}

function CaseSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="flex flex-wrap gap-x-16 gap-y-5 border-t border-foreground/10 pt-10">
        <div className="flex flex-[1_1_220px] flex-col gap-3 md:max-w-[300px]">
          <span className="font-mono text-[11px] tracking-[0.2em] text-primary">{number}</span>
          <h2 className="m-0 font-sans text-[27px] leading-[1.1] font-medium tracking-[-0.02em] md:text-[34px]">{title}</h2>
        </div>
        <div className="flex max-w-[680px] min-w-0 flex-[999_1_560px] flex-col gap-[18px] font-sans text-[16px] leading-[1.7] text-muted-foreground md:text-[17px]">
          {children}
        </div>
      </section>
    </Reveal>
  )
}

export default function CaseStudy({ project }: { project: ProjectEntry }) {
  const index = projectsData.indexOf(project)
  const next = getNextProject(project.slug)
  const nextIndex = projectsData.indexOf(next)
  const pad = (n: number) => String(n + 1).padStart(2, "0")

  // Sections are numbered in the order they appear, so a short page reads 01, 02.
  const sections: { title: string; body: ReactNode }[] = []
  if (project.problem) {
    sections.push({ title: "The problem", body: project.problem.map(p => <p key={p} className="m-0">{p}</p>) })
  }
  if (project.built) {
    sections.push({ title: "What I built", body: project.built.map(p => <p key={p} className="m-0">{p}</p>) })
  }

  return (
    <article className="bg-background pt-24 pb-20 md:pt-[136px] md:pb-24">
      <Container className="flex flex-col gap-16 md:gap-[72px]">
        <header className="nx-load flex flex-wrap items-end gap-x-16 gap-y-12">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
            <Link href="/#projects" className="nx-nav-link inline-flex items-center gap-2.5 self-start font-mono text-[12px] tracking-[0.18em] uppercase no-underline">
              <ArrowLeft size={14} aria-hidden="true" />
              All projects
            </Link>
            <div className="mt-3 font-mono text-[10px] tracking-[0.2em] text-primary uppercase md:text-[11px]">
              Project {pad(index)} · {project.category}
            </div>
            <h1 className="m-0 font-sans text-[46px] leading-[0.95] font-medium tracking-[-0.04em] text-pretty md:text-[clamp(56px,7vw,88px)]">
              {project.name}
            </h1>
            <p className="m-0 max-w-[640px] font-sans text-[17px] leading-[1.5] text-hero-subline md:text-[20px]">{project.description}</p>
            <div className="mt-2 flex flex-wrap gap-3 font-sans">
              {project.link ? (
                <Button asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {isSourceLink(project.link) ? "View source" : "Visit live site"}
                    <ArrowGlyph width="15" height="15" />
                  </a>
                </Button>
              ) : (
                <span className="self-center text-[13px] text-ink-quaternary">{project.noLinkReason}</span>
              )}
              {project.dashboardLink && (
                <Button asChild>
                  <a href={project.dashboardLink} target="_blank" rel="noopener noreferrer">
                    Visit dashboard
                    <ArrowGlyph width="15" height="15" />
                  </a>
                </Button>
              )}
              <Button asChild variant="secondary">
                <Link href="/#contact">Get in touch</Link>
              </Button>
            </div>
          </div>

          <dl className="m-0 flex min-w-0 flex-[1_1_280px] flex-col md:max-w-[340px]">
            {project.role && <Fact label="Role">{project.role}</Fact>}
            {project.platforms && <Fact label="Platforms">{project.platforms.join(" · ")}</Fact>}
            <Fact label="Stack"><TechList tech={project.tech} className="text-[15px] text-hero-subline" /></Fact>
            {project.link && (
              <Fact label={isSourceLink(project.link) ? "Source" : "Live"}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent-light underline decoration-primary/50 underline-offset-[3px] [overflow-wrap:anywhere] hover:text-foreground">
                  {displayUrl(project.link)}
                </a>
              </Fact>
            )}
            {project.dashboardLink && (
              <Fact label="Dashboard">
                <a href={project.dashboardLink} target="_blank" rel="noopener noreferrer" className="text-accent-light underline decoration-primary/50 underline-offset-[3px] [overflow-wrap:anywhere] hover:text-foreground">
                  {displayUrl(project.dashboardLink)}
                </a>
              </Fact>
            )}
          </dl>
        </header>

        <Reveal>
          <Illustration kind={project.illustration} label={project.illustrationLabel} />
        </Reveal>

        {sections.map((section, i) => (
          <CaseSection key={section.title} number={pad(i)} title={section.title}>{section.body}</CaseSection>
        ))}

        {project.features && (
          <div className="flex flex-col gap-16 md:gap-20">
            {project.features.map((feature, i) => (
              <Reveal key={feature.title}>
                <figure className={cn("m-0 flex flex-wrap items-center gap-x-14 gap-y-7", i % 2 === 1 && "flex-row-reverse")}>
                  <div className="min-w-0 flex-[999_1_560px]">
                    <Illustration kind={feature.illustration} label={`Drawing: ${feature.title}`} />
                  </div>
                  <figcaption className="flex min-w-0 flex-[1_1_280px] flex-col gap-3 font-sans">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Feature {pad(i)}</span>
                    <span className="text-[21px] leading-[1.2] font-medium tracking-[-0.02em] md:text-[24px]">{feature.title}</span>
                    <span className="text-[15px] leading-[1.6] text-muted-foreground md:text-[15.5px]">{feature.text}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        <CaseSection number={pad(sections.length)} title={project.hardParts.length > 1 ? "The hard parts" : "The hard part"}>
          <ol className="m-0 flex list-none flex-col p-0">
            {project.hardParts.map((part, i) => (
              <li key={part.title} className="grid grid-cols-[40px_minmax(0,1fr)] gap-2 border-b border-foreground/10 py-6 first:pt-0 last:border-b-0 md:grid-cols-[48px_minmax(0,1fr)]">
                <span className="pt-1 font-mono text-[13px] text-primary">{pad(i)}</span>
                <span className="flex flex-col gap-2.5">
                  <span className="text-[19px] leading-[1.25] font-medium tracking-[-0.01em] text-foreground md:text-[21px]">{part.title}</span>
                  <span className="text-[15.5px] leading-[1.65] text-hard-part md:text-[16px]">{part.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </CaseSection>

        {project.status && (
          <CaseSection number={pad(sections.length + 1)} title="Where it is now">
            {project.status.map(p => <p key={p} className="m-0">{p}</p>)}
          </CaseSection>
        )}

        <Reveal>
          <Link href={`/work/${next.slug}`} className="nx-index-row flex flex-wrap items-center gap-x-14 gap-y-8 rounded-lg border-y border-border px-1 py-10 font-sans md:px-6">
            <span className="flex min-w-0 flex-[999_1_420px] flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase md:text-[11px]">Next project · {pad(nextIndex)}</span>
              <span className="nx-card-title text-[30px] leading-[1.1] font-medium tracking-[-0.03em] md:text-[clamp(32px,3.6vw,48px)]">{next.title}</span>
              <span className="text-[15px] leading-[1.6] text-muted-foreground">{next.descriptionShort}</span>
            </span>
            <span className="min-w-0 flex-[1_1_260px] md:max-w-[360px]">
              <Illustration kind={next.illustration} label={next.illustrationLabel} />
            </span>
          </Link>
        </Reveal>
      </Container>
    </article>
  )
}
