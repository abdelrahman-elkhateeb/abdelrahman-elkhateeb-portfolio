"use client"

import { useEffect, useRef, useState } from "react"
import { getImageProps } from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useScrollSpy } from "@/hooks/useScrollSpy"
import { NAV_LINKS } from "@/lib/site-config"
import img from "@/public/avatar.png"

const SECTION_IDS = NAV_LINKS.map(link => link.id)
const avatarProps = getImageProps({ src: img, alt: "", width: 26, height: 26, sizes: "26px" }).props

function Mark({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#" aria-label="Home" onClick={onClick} className="nx-nav-link flex items-center gap-2.5 no-underline">
      <Avatar className="size-[26px] rounded-full">
        <AvatarImage {...avatarProps} />
        <AvatarFallback className="rounded-full text-[9px]">AK</AvatarFallback>
      </Avatar>
      <span className="font-sans text-[12px] tracking-[0.18em] text-foreground uppercase md:hidden">AK</span>
    </a>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS)
  const desktopNav = useRef<HTMLElement>(null)
  const selectedSection = useRef<string | null>(null)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const closeAtDesktop = () => { if (media.matches) setMenuOpen(false) }
    media.addEventListener("change", closeAtDesktop)
    return () => media.removeEventListener("change", closeAtDesktop)
  }, [])

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <header className="nx-nav-cap nx-load pointer-events-none relative z-50 -mb-16 h-16 md:sticky md:top-0 md:-mb-[140px] md:h-[140px]">
        <div className="pointer-events-auto flex h-16 items-center justify-between px-4.5 md:h-[72px] md:px-10">
          <Mark />
          <nav ref={desktopNav} aria-label="Sections" className="hidden items-center gap-[26px] md:flex">
            {NAV_LINKS.map(link => <a key={link.id} href={link.href} data-active={activeId === link.id} className="nx-nav-link font-sans text-[12px] tracking-[0.18em] uppercase no-underline">{link.label}</a>)}
          </nav>
          <SheetTrigger asChild>
            <Button type="button" variant="icon" size="touch" aria-label="Open menu" className="flex-col gap-1.5 md:hidden">
              <span className="block h-px w-[18px] bg-foreground" />
              <span className="block h-px w-[18px] bg-foreground" />
            </Button>
          </SheetTrigger>
        </div>
      </header>
      <SheetContent aria-describedby={undefined} aria-hidden={!menuOpen || undefined} inert={!menuOpen} onCloseAutoFocus={event => {
        if (selectedSection.current) {
          event.preventDefault()
          document.getElementById(selectedSection.current)?.focus({ preventScroll: true })
          selectedSection.current = null
        } else if (window.matchMedia("(min-width: 768px)").matches) {
          event.preventDefault()
          const nav = desktopNav.current
          ;(nav?.querySelector<HTMLAnchorElement>("[data-active=true]") ?? nav?.querySelector<HTMLAnchorElement>("a"))?.focus()
        }
      }}>
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <div className="flex h-16 shrink-0 items-center justify-between px-4.5">
          <Mark onClick={() => setMenuOpen(false)} />
          <SheetClose asChild>
            <Button type="button" variant="icon" size="touch" aria-label="Close menu">
              <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" /></svg>
            </Button>
          </SheetClose>
        </div>
        <nav aria-label="Mobile sections" className="nx-menu-links flex flex-col gap-7 px-4.5 pt-11 pb-8">
          {NAV_LINKS.map(link => (
            <SheetClose asChild key={link.id}>
              <a href={link.href} onClick={() => { selectedSection.current = link.id }} data-active={activeId === link.id} className="nx-menu-link nx-nav-link text-[27px] leading-none tracking-[-0.02em] no-underline">{link.label}</a>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
