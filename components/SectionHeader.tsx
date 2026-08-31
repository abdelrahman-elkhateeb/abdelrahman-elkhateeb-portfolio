import { cn } from "@/lib/utils"

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <div
        className="uppercase text-[10px] md:text-[11px]"
        style={{ fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.2em", color: "#9184d9" }}
      >
        {eyebrow}
      </div>
      <h2
        className="m-0 text-[27px] font-medium leading-[1.1] tracking-[-0.02em] md:text-[34px]"
        style={{ color: "#e9e9ed", fontFamily: "Inter, system-ui, sans-serif" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="m-0 max-w-[560px] text-[14px] leading-[1.6] md:text-[15px]"
          style={{ color: "rgba(233,233,237,0.6)" }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
