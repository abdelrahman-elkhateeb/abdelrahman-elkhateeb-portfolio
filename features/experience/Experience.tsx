import Container from "@/components/shared/Container"
import { experiences } from "./data"
import { Fragment } from "react"
import SectionHeader from "@/components/shared/SectionHeader"
import Reveal from "@/components/shared/Reveal"

type Exp = (typeof experiences)[number]

function ExperienceRow({ exp }: { exp: Exp }) {
  return (
    <div className="flex flex-col gap-3 px-4 py-5 md:grid md:grid-cols-[208px_minmax(0,1fr)] md:gap-8 md:px-[18px] md:py-7">
      <div
        className="text-ink-tertiary flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[13px] md:flex-col md:items-start md:gap-1.5">
        <span className="text-foreground text-[14px] md:text-[15px]">
          {exp.period}
        </span>
        <span className="opacity-40 md:hidden">·</span>
        <span>{exp.employmentType}</span>
        <span className="opacity-40 md:hidden">·</span>
        <span>{exp.location}</span>
      </div>

      <div className="flex flex-col gap-3.5 md:max-w-[760px] md:gap-4">
        <div className="flex flex-wrap items-baseline gap-2.5 md:gap-3.5">
          <h3
            className="text-foreground font-sans m-0 text-[22px] font-medium leading-[1.1] tracking-[-0.02em] md:text-[27px]">
            {exp.company}
          </h3>
          <span className="text-muted-foreground text-[14px] md:text-[15px]">
            {exp.role}
          </span>
        </div>

        <p
          className="text-foreground m-0 text-[17.5px] leading-[1.45] tracking-[-0.01em] md:text-[21px]">
          {exp.headline}
        </p>

        <div className="flex flex-col gap-2.5 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-3.5 md:pt-0.5">
          {exp.highlights.map((h, i) => (
            <div key={i} className="flex gap-2.5 md:gap-3">
              <span
                className="bg-primary mt-[11px] h-px w-3 flex-none md:mt-3 md:w-3.5"

              />
              <span
                className="text-muted-foreground text-[14.5px] leading-[1.55] md:text-[15px] md:leading-[1.6]">
                {h}
              </span>
            </div>
          ))}
        </div>

        <div
          className="text-ink-tertiary flex flex-wrap gap-2.5 pt-1 text-[12px] md:gap-3.5 md:pt-[5px] md:text-[13px]">
          {exp.techStack.map((t, i) => (
            <Fragment key={t}>
              <span>{t}</span>
              {i !== exp.techStack.length - 1 && <span className="opacity-40">·</span>}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {

  return (
    <section tabIndex={-1} className="bg-background py-14" id="experience">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="02"
            title="Experience"
            description="Two roles — contract frontend work for German enterprise clients, and a freelance corporate build."
            className="pb-7"
          />
          <div className="nx-divider" />
        </Reveal>
        {experiences.map((exp) => (
          <Fragment key={exp.id}>
            <ExperienceRow exp={exp} />
            <div className="nx-divider" />
          </Fragment>
        ))}
      </Container>
    </section>
  )
}
