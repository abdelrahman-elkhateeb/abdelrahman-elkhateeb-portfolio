import Container from "@/components/shared/Container"
import { Fragment } from "react"
import { skillGroups } from "./data"
import SectionHeader from "@/components/shared/SectionHeader"
import Reveal from "@/components/shared/Reveal"

export default function Skills() {

  return (
    <section tabIndex={-1} className="bg-background py-14" id="skills">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="03"
            title="Tech stack"
            description="Everything here is in production somewhere — not a list of things I've read about."
            className="pb-7"
          />
          <div className="nx-divider" />
        </Reveal>
        {skillGroups.map((group, index) => (
          <Fragment key={group.title}>
            <div className="flex flex-col gap-3 py-[22px] md:flex-row md:gap-10 md:py-6">
              <h3
                className="text-ink-tertiary m-0 shrink-0 text-[13px] font-normal leading-[1.6] md:w-[150px]">
                {group.title}
              </h3>

              <p
                className="text-ink-tertiary m-0 flex flex-wrap text-[13px] leading-[1.7] md:leading-[1.6]">
                {group.skills.map((skill, i) => (
                  <span key={skill}>
                    {skill}
                    {i !== group.skills.length - 1 && (
                      <span aria-hidden  className="opacity-40 mx-2">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            {index !== skillGroups.length - 1 && <div className="nx-divider" />}
          </Fragment>
        ))}
      </Container>
    </section>
  )
}
