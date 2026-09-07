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
        className="font-mono tracking-[0.2em] text-primary uppercase text-[10px] md:text-[11px]">
        {eyebrow}
      </div>
      <h2
        className="text-foreground font-sans m-0 text-[27px] font-medium leading-[1.1] tracking-[-0.02em] md:text-[34px]">
        {title}
      </h2>
      {description && (
        <p
          className="text-muted-foreground m-0 max-w-[560px] text-[14px] leading-[1.6] md:text-[15px]">
          {description}
        </p>
      )}
    </div>
  )
}
