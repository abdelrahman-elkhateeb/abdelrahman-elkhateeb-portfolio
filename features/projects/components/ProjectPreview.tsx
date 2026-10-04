import Link from "next/link"
import ArrowGlyph from "@/components/shared/ArrowGlyph"
import type { ProjectEntry } from "../types"
import Illustration from "./illustrations/Illustration"
import TechList from "./TechList"

export default function ProjectPreview({ project }: { project: ProjectEntry }) {
  return (
    <div className="flex flex-col gap-5 font-sans">
      <Illustration kind={project.illustration} label={project.illustrationLabel} />
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Hard part</span>
        <p className="m-0 text-[15.5px] leading-[1.5] text-hard-part">{project.hardPart}</p>
      </div>
      <TechList tech={project.tech} />
      <Link href={`/work/${project.slug}`} className="nx-preview-link inline-flex items-center gap-2.5 mt-1 self-start text-[15px] font-medium no-underline">
        Read the full case study
        <ArrowGlyph className="nx-card-arrow size-[15px]" />
      </Link>
    </div>
  )
}
