import { cn } from "@/lib/utils"
import type { IllustrationKind } from "../../types"
import { screens } from "./screens"

/** A drawn browser window around one product screen. It is a container, so the
    drawing's cqw lengths scale with whatever width the caller gives it. */
export default function Illustration({ kind, label, className }: {
  kind: IllustrationKind
  label: string
  className?: string
}) {
  const { url, Screen } = screens[kind]
  return (
    <div role="img" aria-label={label} className={cn("@container overflow-hidden rounded-lg border border-border bg-image-well font-sans text-foreground", className)}>
      <div className="flex aspect-[16/10] flex-col">
        <div className="flex h-[5.5cqw] flex-none items-center gap-[1cqw] border-b border-foreground/8 px-[2.4cqw]">
          <div className="size-[1.1cqw] rounded-full bg-foreground/18" />
          <div className="size-[1.1cqw] rounded-full bg-foreground/18" />
          <div className="size-[1.1cqw] rounded-full bg-foreground/18" />
          <div className="ml-[1.6cqw] truncate font-mono text-[length:1.6cqw] text-ink-tertiary">{url}</div>
        </div>
        <div className="flex min-h-0 flex-1">
          <Screen />
        </div>
      </div>
    </div>
  )
}
