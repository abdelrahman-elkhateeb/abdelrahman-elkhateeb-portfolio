"use client"

import { useCallback, useState } from "react"
import HeroExperience from "./HeroExperience"
import { cn } from "@/lib/utils"

export default function HeroScene() {
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  return (
    <div className={cn("nx-model-fade absolute inset-x-0 top-0 bottom-11 overflow-hidden md:bottom-12", ready && "is-ready")}>
      <div className="nx-glow-accent pointer-events-none absolute inset-0" />
      <div className="nx-glow-black pointer-events-none absolute inset-0" />
      <HeroExperience onReady={onReady} />
    </div>
  )
}
