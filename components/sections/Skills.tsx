import { Fragment } from "react"
import { skillGroups } from "@/lib"
import SectionHeader from "@/components/SectionHeader"

export default function Skills() {
  return (
    <section style={{ background: "#0b0c14" }} className="py-14" id="skills">
      <div className="mx-auto w-full max-w-290 px-4.5">
        <SectionHeader
          eyebrow="03"
          title="Tech stack"
          description="Everything here is in production somewhere — not a list of things I've read about."
          className="pb-7"
        />

        <div className="nx-divider" />
        {skillGroups.map((group, index) => (
          <Fragment key={group.title}>
            <div className="flex flex-col gap-3 py-[22px] md:flex-row md:gap-10 md:py-6">
              <h3
                className="m-0 shrink-0 text-[13px] font-normal leading-[1.6] md:w-[150px]"
                style={{ color: "rgba(233,233,237,0.45)" }}
              >
                {group.title}
              </h3>

              <p
                className="m-0 flex flex-wrap text-[13px] leading-[1.7] md:leading-[1.6]"
                style={{ color: "rgba(233,233,237,0.45)" }}
              >
                {group.skills.map((skill, i) => (
                  <span key={skill}>
                    {skill}
                    {i !== group.skills.length - 1 && (
                      <span aria-hidden style={{ opacity: 0.4 }} className="mx-2">
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
      </div>
    </section>
  )
}
