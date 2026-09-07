"use client"

import type { ComponentProps } from "react"
import { Slot } from "radix-ui"
import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"

const delayClasses = ["nx-reveal-0", "nx-reveal-1", "nx-reveal-2", "nx-reveal-3"]

export default function Reveal({ children, className, index = 0, asChild = false, ...props }:
  ComponentProps<"div"> & { index?: number; asChild?: boolean }) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp ref={ref} data-reveal className={cn(delayClasses[Math.max(0, Math.min(Math.floor(index), 3))], visible && "is-visible", className)} {...props}>
      {children}
    </Comp>
  )
}
