"use client"

import { useCallback, useState } from "react"
import { MoveHorizontal } from "lucide-react"
import HeroExperience from "./HeroExperience"
import { useInViewport } from "@/hooks/useInViewport"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { cn } from "@/lib/utils"

export default function HeroScene() {
  const [ready, setReady] = useState(false)
  const [dragged, setDragged] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  // This layer is the hero's model area, so its intersection is the scene's.
  const { ref, inViewport } = useInViewport<HTMLDivElement>()
  const reducedMotion = usePrefersReducedMotion()
  return (
    <>
      <div
        ref={ref}
        onPointerDownCapture={() => setDragged(true)}
        className={cn("nx-model-fade absolute inset-x-0 top-0 bottom-11 overflow-hidden md:bottom-12", ready && "is-ready")}>
        <div className="nx-glow-accent pointer-events-none absolute inset-0" />
        <div className="nx-glow-black pointer-events-none absolute inset-0" />
        <HeroExperience
          onReady={onReady}
          rendering={inViewport}
          autoRotate={inViewport && !reducedMotion}
        />
      </div>
      {/* Drag affordance. A sibling of the model layer with its own z-index so the
          scrims do not darken it; shown once the room is ready, gone after the
          first drag. Decorative: orbiting is pointer-only. */}
      <div
        aria-hidden="true"
        data-visible={ready && !dragged}
        className="nx-drag-hint pointer-events-none absolute right-10 bottom-[88px] z-10 hidden items-center gap-2.5 rounded-full border border-border bg-background/60 px-3.5 py-2 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase md:flex">
        <MoveHorizontal size={14} className="text-primary" />
        Drag to look around
      </div>
    </>
  )
}
