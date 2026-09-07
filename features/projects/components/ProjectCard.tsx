import { cn } from "@/lib/utils"

import type { ProjectEntry } from "../types"
import Image from "next/image"
import { Fragment } from "react"
import Reveal from "@/components/shared/Reveal"
import ArrowGlyph from "@/components/shared/ArrowGlyph"

type Project = ProjectEntry

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLead = index === 0
  const reversed = index > 0 && (index - 1) % 2 === 0
  const hasLink = !!project.link

  const titleSize = isLead ? "text-[21px] md:text-[34px]" : "text-[21px] md:text-[27px]"
  const wideCol = isLead ? "md:max-w-[692px]" : ""

  const image = (
    <div
      className={cn(`relative min-w-0 overflow-hidden rounded-lg ${
        isLead
          ? "aspect-video w-full md:aspect-[1112/420]"
          : "aspect-video w-full lg:aspect-auto lg:h-[242px]"
      }`, "bg-image-well")}

    >
      <Image src={project.image} alt="" fill sizes={isLead ? "(min-width: 1160px) 1074px, (min-width: 768px) calc(100vw - 86px), calc(100vw - 70px)" : "(min-width: 1160px) 388px, (min-width: 1024px) 34vw, (min-width: 768px) calc(100vw - 86px), calc(100vw - 70px)"} className="nx-card-image object-cover" />
    </div>
  )

  const content = (
    <div className={`flex min-w-0 flex-col gap-3 md:gap-[13px] ${isLead ? "" : "lg:pt-0.5"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3.5 md:items-center md:gap-5">
        <h3 className={cn("nx-card-title m-0 min-w-0 font-medium leading-[1.15] tracking-[-0.02em] md:leading-[1.1]", hasLink && "flex-1", titleSize)}>
          {project.title}
        </h3>
        {hasLink ? (
          <ArrowGlyph className="nx-card-arrow mt-1 size-4 shrink-0 text-primary md:mt-0 md:size-[18px]" />
        ) : (
          <span className="text-ink-quaternary text-[13px]">
            {project.noLinkReason}
          </span>
        )}
      </div>

      <p className={cn(`m-0 text-[14px] leading-[1.6] md:text-[15px] ${wideCol}`, "text-muted-foreground")} >
        <span className="md:hidden">{project.descriptionShort}</span>
        <span className="hidden md:inline">{project.description}</span>
      </p>

      <div className={`flex flex-col gap-2 lg:flex-row lg:items-baseline md:gap-[14px] md:pt-px ${wideCol}`}>
        <span
          className="font-mono text-[10px] tracking-[0.2em] text-primary flex-none uppercase">
          Hard part
        </span>
        <span className="text-hard-part text-[14.5px] leading-[1.5] md:text-[15.5px]">
          <span className="md:hidden">{project.hardPartShort}</span>
          <span className="hidden md:inline">{project.hardPart}</span>
        </span>
      </div>

      <div
        className={cn(`flex flex-wrap gap-x-[14px] gap-y-1 pt-[5px] text-[12px] leading-[1.7] md:leading-[1.6] md:text-[13px] ${wideCol}`, "text-ink-tertiary")}

      >
        {project.tech.map((t, i) => (
          <Fragment key={t}>
            <span>{t}</span>
            {i !== project.tech.length - 1 && <span className="opacity-40">·</span>}
          </Fragment>
        ))}
      </div>
    </div>
  )

  const layoutClass = isLead
    ? "flex flex-col gap-[14px] md:gap-[22px]"
    : cn("grid grid-cols-1 gap-3.5 lg:grid-cols-[minmax(0,388fr)_minmax(0,654fr)] lg:items-start lg:gap-8", reversed && "lg:grid-cols-[minmax(0,654fr)_minmax(0,388fr)] [&>:first-child]:lg:col-start-2 [&>:first-child]:lg:row-start-1 [&>:last-child]:lg:col-start-1 [&>:last-child]:lg:row-start-1")

  const className = cn(hasLink ? "nx-card" : "nx-card-static", layoutClass, "min-w-0 rounded-lg p-4 font-sans text-foreground md:p-6")
  const cardContent = <>{image}{content}</>
  return (
    <Reveal asChild index={index}>
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={className}>{cardContent}</a>
      ) : (
        <div className={className}>{cardContent}</div>
      )}
    </Reveal>
  )
}
