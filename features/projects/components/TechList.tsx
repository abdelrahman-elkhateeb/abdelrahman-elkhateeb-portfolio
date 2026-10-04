import { Fragment } from "react"
import { cn } from "@/lib/utils"

export default function TechList({ tech, className }: { tech: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-x-[14px] gap-y-1 font-sans text-[13px] leading-[1.6] text-ink-tertiary", className)}>
      {tech.map((item, i) => (
        <Fragment key={item}>
          <span>{item}</span>
          {i !== tech.length - 1 && <span className="opacity-40">·</span>}
        </Fragment>
      ))}
    </div>
  )
}
