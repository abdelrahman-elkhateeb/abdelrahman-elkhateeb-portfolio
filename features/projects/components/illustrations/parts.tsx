import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/* Drawing primitives. Every length is in cqw of the illustration frame, so a
   drawing scales as one picture from the 480px preview to the full-width
   case-study figure. */

export function Bar({ className }: { className?: string }) {
  return <div className={cn("h-[1.1cqw] rounded-full bg-foreground/14", className)} />
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("font-mono text-[length:1.4cqw] tracking-[0.14em] text-primary uppercase", className)}>
      {children}
    </div>
  )
}

const pillTones = {
  accent: "bg-primary/18 text-accent-light",
  neutral: "bg-foreground/6 text-muted-foreground",
  outline: "border border-foreground/18 text-muted-foreground",
}

export function Pill({ children, tone = "accent", className }: {
  children: ReactNode
  tone?: keyof typeof pillTones
  className?: string
}) {
  return (
    <div className={cn("justify-self-start rounded-full px-[1.3cqw] py-[0.45cqw] text-[length:1.5cqw] whitespace-nowrap", pillTones[tone], className)}>
      {children}
    </div>
  )
}

export function Action({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[0.8cqw] bg-primary px-[1.8cqw] py-[0.9cqw] text-[length:1.6cqw] font-semibold text-background", className)}>
      {children}
    </div>
  )
}

export function Surface({ children, className }: { children?: ReactNode; className?: string }) {
  return <div className={cn("rounded-[1cqw] border border-foreground/8 bg-card", className)}>{children}</div>
}

export function Sidebar({ brand, items, active, brandClassName }: {
  brand: string
  items: string[]
  active: string
  brandClassName?: string
}) {
  return (
    <div className="flex w-[20cqw] flex-none flex-col gap-[0.5cqw] border-r border-foreground/8 px-[1.6cqw] py-[2.6cqw] text-[length:1.8cqw] text-muted-foreground">
      <div className={cn("px-[1.2cqw] pb-[2cqw] text-[length:1.8cqw] font-semibold text-foreground", brandClassName)}>{brand}</div>
      {items.map(item => (
        <div key={item} className={cn("rounded-[0.8cqw] px-[1.2cqw] py-[0.9cqw]", item === active && "bg-primary/16 text-accent-light")}>
          {item}
        </div>
      ))}
    </div>
  )
}

export function FilterChips({ items }: { items: string[] }) {
  return (
    <div className="flex gap-[1cqw] text-[length:1.5cqw]">
      {items.map((item, i) => (
        <div key={item} className={cn("rounded-full px-[1.4cqw] py-[0.6cqw]", i === 0 ? "bg-primary/18 text-accent-light" : "border border-foreground/14 text-muted-foreground")}>
          {item}
        </div>
      ))}
    </div>
  )
}

/** A table row on a fixed track list; the caller supplies grid-cols. */
export function TableRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid items-center gap-[1.6cqw] border-t border-foreground/8 py-[1.3cqw] text-[length:1.6cqw]", className)}>
      {children}
    </div>
  )
}
