"use client"

import { useEffect, useRef, useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { contactEmail } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export default function CopyEmailButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false; if (timer.current) clearTimeout(timer.current) }
  }, [])

  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current)
    setStatus("idle")
    try {
      await navigator.clipboard.writeText(contactEmail)
      if (mounted.current) {
        setStatus("copied")
        timer.current = setTimeout(() => setStatus("idle"), 1600)
      }
    } catch {
      if (mounted.current) setStatus("error")
    }
  }

  return (
    <>
      <Button type="button" variant="icon" size="touch" aria-label="Copy email address" onClick={copyEmail} className="relative md:ml-4.5 md:size-12">
        <Copy size={18} aria-hidden="true" className={cn("nx-copy-icon absolute", status === "copied" ? "opacity-0" : "opacity-100")} />
        <Check size={18} aria-hidden="true" className={cn("nx-copy-icon absolute", status === "copied" ? "opacity-100" : "opacity-0")} />
      </Button>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {status === "copied" ? "Email address copied." : status === "error" ? "Could not copy. Select the email address to copy it, or use the email link." : ""}
      </span>
    </>
  )
}
