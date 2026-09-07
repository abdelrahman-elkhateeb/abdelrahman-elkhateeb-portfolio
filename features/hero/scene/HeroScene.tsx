"use client"

import { useCallback, useState } from "react"
import HeroExperience from "./HeroExperience"
import { useInViewport } from "@/hooks/useInViewport"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { cn } from "@/lib/utils"

export default function HeroScene() {
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  // This layer is the hero's model area, so its intersection is the scene's.
  const { ref, inViewport } = useInViewport<HTMLDivElement>()
  const reducedMotion = usePrefersReducedMotion()
  return (
    <div
      ref={ref}
      className={cn("nx-model-fade absolute inset-x-0 top-0 bottom-11 overflow-hidden md:bottom-12", ready && "is-ready")}>
      <div className="nx-glow-accent pointer-events-none absolute inset-0" />
      <div className="nx-glow-black pointer-events-none absolute inset-0" />
      <HeroExperience
        onReady={onReady}
        rendering={inViewport}
        autoRotate={inViewport && !reducedMotion}
      />
    </div>
  )
}
