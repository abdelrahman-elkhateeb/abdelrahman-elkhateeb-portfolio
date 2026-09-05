"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useScrollSpy } from "@/hooks/useScrollSpy"
import img from "@/public/avatar.png"

const noopSubscribe = () => () => {}
/** True only once mounted on the client — the portal target doesn't exist during SSR. */
function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false)
}

const NAV_LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Tech stack", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
]

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

function Mark() {
  return (
    <a href="#" aria-label="Home" className="nx-nav-link flex items-center gap-2.5 no-underline">
      <Avatar className="size-[26px] rounded-full">
        <AvatarImage src={img.src} alt="" />
        <AvatarFallback className="rounded-full text-[9px]">AK</AvatarFallback>
      </Avatar>
      <span
        className="text-[12px] uppercase md:hidden"
        style={{ letterSpacing: "0.18em", color: "#e9e9ed", fontFamily: "Inter, system-ui, sans-serif" }}
      >
        AK
      </span>
    </a>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const mounted = useMounted()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const activeId = useScrollSpy(SECTION_IDS)

  const closeMenu = () => {
    setMenuOpen(false)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!menuOpen) return

    const panel = panelRef.current
    const focusable = panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
    focusable?.[0]?.focus()

    document.body.style.overflow = "hidden"

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeMenu()
        return
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <header className="nx-nav-cap nx-load pointer-events-none relative z-50 h-16 -mb-16 md:sticky md:top-0 md:h-[140px] md:-mb-[140px]">
        <div className="pointer-events-auto flex h-16 items-center justify-between px-[18px] md:h-[72px] md:px-10">
        <Mark />

        <nav aria-label="Sections" className="hidden items-center gap-[26px] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-active={activeId === link.id}
              className="nx-nav-link text-[12px] uppercase no-underline"
              style={{
                letterSpacing: "0.18em",
                color: activeId === link.id ? undefined : "rgba(233,233,237,0.60)",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          ref={triggerRef}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="nx-icon-btn flex h-11 w-11 flex-none flex-col items-center justify-center gap-1.5 rounded-lg md:hidden"
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 256 256" fill="#e9e9ed">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
            </svg>
          ) : (
            <>
              <span className="block h-px w-[18px]" style={{ background: "#e9e9ed" }} />
              <span className="block h-px w-[18px]" style={{ background: "#e9e9ed" }} />
            </>
          )}
        </button>
      </div>
      </header>

      {/* Rendered via portal, straight onto <body> — nesting it inside the sticky/relative
          header let the hero's WebGL canvas visually bleed through despite correct z-index
          and opacity (a browser compositing quirk with promoted GPU layers). Teleporting it
          out from under the canvas's ancestor chain avoids that entirely. */}
      {mounted &&
        createPortal(
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className={`nx-menu-ground pointer-events-none fixed inset-0 z-50 flex flex-col md:hidden ${
              menuOpen ? "nx-menu-open pointer-events-auto opacity-100" : "opacity-0"
            }`}
            style={{ background: "#0b0c14" }}
          >
            <div className="flex h-16 flex-none items-center justify-between px-[18px]">
              <Mark />
            </div>
            <nav aria-label="Sections" className="flex flex-col gap-7 px-[18px] pt-11">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="nx-menu-link text-[27px] leading-none tracking-[-0.02em] no-underline"
                  style={{
                    ["--menu-delay" as string]: menuOpen ? `${i * 40}ms` : "0ms",
                    color: activeId === link.id ? "#d2cefd" : "rgba(233,233,237,0.60)",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>,
          document.body
        )}
    </>
  )
}
