import { projectsData } from "@/lib"
import Image from "next/image"
import { Fragment } from "react"

type Project = (typeof projectsData)[number]

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="nx-card flex flex-col items-start gap-5 rounded-lg px-4 py-4 md:flex-row md:gap-8 md:px-[18px] md:py-4"
      style={{ color: "#e9e9ed", fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div
        className="relative aspect-video w-full flex-none overflow-hidden rounded-lg md:aspect-auto md:h-[250px] md:w-[400px]"
        style={{ background: "#0f111c" }}
      >
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[13px] md:pt-[2px]">
        <div className="flex items-center justify-between gap-5">
          <h3 className="nx-card-title m-0 text-[20px] font-medium leading-[1.1] tracking-[-0.02em] md:text-[27px]">
            {project.title}
          </h3>
          <svg
            className="nx-card-arrow flex-none"
            width="18"
            height="18"
            viewBox="0 0 256 256"
            fill="#9184d9"
          >
            <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
          </svg>
        </div>

        <p className="m-0 text-[14px] leading-[1.6] md:text-[15px]" style={{ color: "rgba(233,233,237,0.6)" }}>
          {project.description}
        </p>

        <div className="flex items-baseline gap-[14px] pt-px">
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
          <span className="text-[14px] leading-[1.5] md:text-[15.5px]" style={{ color: "#dedaf7" }}>
            {project.hardPart}
          </span>
        </div>

        <div
          className="flex flex-wrap gap-[14px] pt-[5px] text-[12px] md:text-[13px]"
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
    </a>
  )
}
