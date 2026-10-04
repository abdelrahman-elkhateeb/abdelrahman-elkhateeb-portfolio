import { ArrowDown, Github, Linkedin, Code } from "lucide-react"
import HeroScene from "./scene/HeroScene"
import { Button } from "@/components/ui/button"
import ArrowGlyph from "@/components/shared/ArrowGlyph"
import { siteConfig, socialLinks } from "@/lib/site-config"
import { HERO_STATUS } from "./data"

export default function Hero() {
  return (
    <section
      className="bg-background text-foreground font-sans nx-hero relative w-full min-h-screen">
      {/* model layer — stops 44/48px above the bottom, as it did beside the former
          ticker, so the canvas size and framing are unchanged; the taller status
          line overlaps only the fully scrimmed strip. Fades in on its own
          readiness signal (outside the load ladder), never a fixed delay. */}
      <HeroScene />

      {/* legibility scrim — above the model, below the name/nav, never intercepts orbit drags */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-11 md:bottom-12">
        <div className="nx-scrim-bottom absolute inset-0" />
        <div className="nx-scrim-left absolute inset-0" />
      </div>

      {/* name + subline + ctas */}
      <div className="nx-hero-content relative z-10 flex min-w-0 flex-col gap-4.5">
        <h1
          className="nx-load nx-hero-name m-0 font-medium uppercase text-[46px] leading-[0.94] tracking-[-0.04em] lg:text-[104px] md:leading-[0.92] md:tracking-[-0.045em]">
          {siteConfig.givenName}
          <br />
          {siteConfig.familyName}
        </h1>

        <div
          className="nx-load nx-load-subline text-hero-subline flex flex-wrap items-center gap-3 text-[14px] md:gap-4 md:text-[16px]">
          <span>Frontend engineer</span>
          <span className="bg-primary h-px w-11"  />
          <span>React · Next.js · TypeScript</span>
          <span className="bg-primary hidden h-px w-11 md:block"  />
          <span className="hidden md:inline">Cairo</span>
        </div>

        <div className="nx-load nx-load-ctas mt-[6px] flex flex-wrap gap-3">
          <Button asChild >
          <a
            href="#projects">
            See the work
            <ArrowGlyph width="15" height="15" />
          </a>
          </Button>
          <Button asChild variant="icon" size="icon">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub">
            <Github size={19} />
          </a>
          </Button>
          <Button asChild variant="icon" size="icon">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn">
            <Linkedin size={19} />
          </a>
          </Button>
          <Button asChild variant="icon" size="icon">
          <a
            href={socialLinks.frontendMentor}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Frontend Mentor profile">
            <Code size={19} />
          </a>
          </Button>
        </div>
      </div>

      {/* status line — static facts, no motion; opaque so it caps the scene */}
      <div className="nx-load nx-load-status relative z-10 flex flex-col gap-2.5 border-t border-foreground/12 bg-background px-5 pt-[18px] pb-[22px] font-sans text-[14px] text-hero-subline md:min-h-16 md:flex-row md:flex-wrap md:items-center md:gap-x-10 md:px-10 md:py-3">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex size-[15px] flex-none items-center justify-center rounded-full bg-primary/22">
            <span className="size-[7px] rounded-full bg-accent-light" />
          </span>
          {HERO_STATUS.availability}
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">Now</span>
          <span className="lg:hidden">{HERO_STATUS.nowShort}</span>
          <span className="hidden lg:inline">{HERO_STATUS.nowLong}</span>
        </div>
        <div className="hidden items-baseline gap-3 xl:flex">
          <span className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">Based</span>
          {HERO_STATUS.based}
        </div>
        <a href="#about" className="nx-nav-link ml-auto hidden items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase no-underline md:flex">
          Scroll
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
