"use client"

import { projectsData } from "@/lib"
import Image from "next/image"
import { Fragment, type CSSProperties } from "react"
import { useReveal, staggerDelay } from "@/hooks/useReveal"

type Project = (typeof projectsData)[number]

function ArrowGlyph() {
  return (
    <svg
      className="nx-card-arrow mt-1 h-4 w-4 flex-none md:mt-0 md:h-[18px] md:w-[18px]"
      viewBox="0 0 256 256"
      fill="#9184d9"
    >
      <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
    </svg>
  )
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useReveal<HTMLElement>()
  const isLead = index === 0
  const reversed = index > 0 && (index - 1) % 2 === 0
  const hasLink = !!project.link

  const titleSize = isLead ? "text-[21px] md:text-[34px]" : "text-[21px] md:text-[27px]"
  const wideCol = isLead ? "md:max-w-[692px]" : ""

  const style: CSSProperties = {
    ["--reveal-delay" as string]: `${staggerDelay(index)}ms`,
    color: "#e9e9ed",
    fontFamily: "Inter, system-ui, sans-serif",
  }

  const image = (
    <div
      className={`relative flex-none overflow-hidden rounded-lg ${
        isLead
          ? "aspect-video w-full md:aspect-[1112/420]"
          : "aspect-video w-full md:aspect-auto md:h-[242px] md:w-[388px]"
      }`}
      style={{ background: "#0f111c" }}
    >
      <Image src={project.image} alt="" fill className="nx-card-image object-cover" />
    </div>
  )

  const content = (
    <div className={`flex flex-col gap-3 md:gap-[13px] ${isLead ? "" : "md:w-[692px] md:flex-none md:pt-[2px]"}`}>
      <div className="flex items-start justify-between gap-3.5 md:items-center md:gap-5">
        <h3 className={`nx-card-title m-0 font-medium leading-[1.15] tracking-[-0.02em] md:leading-[1.1] ${titleSize}`}>
          {project.title}
        </h3>
        {hasLink ? (
          <ArrowGlyph />
        ) : (
          <span className="flex-none text-[13px]" style={{ color: "rgba(233,233,237,0.35)" }}>
            {project.noLinkReason}
          </span>
        )}
      </div>

      <p className={`m-0 text-[14px] leading-[1.6] md:text-[15px] ${wideCol}`} style={{ color: "rgba(233,233,237,0.6)" }}>
        <span className="md:hidden">{project.descriptionShort}</span>
        <span className="hidden md:inline">{project.description}</span>
      </p>

      <div className={`flex flex-col gap-2 md:flex-row md:items-baseline md:gap-[14px] md:pt-px ${wideCol}`}>
        <span
          className="flex-none uppercase"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "#9184d9",
          }}
        >
          Hard part
        </span>
        <span className="text-[14.5px] leading-[1.5] md:text-[15.5px]" style={{ color: "#dedaf7" }}>
          <span className="md:hidden">{project.hardPartShort}</span>
          <span className="hidden md:inline">{project.hardPart}</span>
        </span>
      </div>

      <div
        className={`flex flex-wrap gap-x-[14px] gap-y-1 pt-[5px] text-[12px] leading-[1.7] md:leading-[1.6] md:text-[13px] ${wideCol}`}
        style={{ color: "rgba(233,233,237,0.45)" }}
      >
        {project.tech.map((t, i) => (
          <Fragment key={t}>
            <span>{t}</span>
            {i !== project.tech.length - 1 && <span style={{ opacity: 0.4 }}>·</span>}
          </Fragment>
        ))}
      </div>
    </div>
  )

  const layoutClass = isLead
    ? "flex flex-col gap-[14px] md:gap-[22px]"
    : `flex flex-col gap-[14px] md:flex-row md:items-start md:gap-8 ${reversed ? "md:flex-row-reverse" : ""}`

  const className = `${hasLink ? "nx-card" : "nx-card-static"} ${layoutClass} rounded-lg p-4 md:p-6 ${
    visible ? "is-visible" : ""
  }`

  const { link } = project

  if (link) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        data-reveal
        className={className}
        style={style}
      >
        {image}
        {content}
      </a>
    )
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} data-reveal className={className} style={style}>
      {image}
      {content}
    </div>
  )
}
