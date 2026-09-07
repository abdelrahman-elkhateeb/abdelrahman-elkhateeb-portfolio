import { Github, Linkedin, Code } from "lucide-react"
import HeroScene from "./scene/HeroScene"
import { Button } from "@/components/ui/button"
import ArrowGlyph from "@/components/shared/ArrowGlyph"
import { siteConfig, socialLinks } from "@/lib/site-config"
import { TICKER_ITEMS } from "./data"

function TickerTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div aria-hidden={duplicate || undefined} className="flex flex-none gap-11 whitespace-nowrap pr-11">
      {TICKER_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-11">
          <span>{item}</span>
          <span className="text-accent-light/40">/</span>
        </span>
      ))}
    </div>
  )
}

export default function Hero() {

  return (
    <section
      className="bg-background text-foreground font-sans nx-hero relative w-full min-h-screen">
      {/* model layer — reserves the ticker band at the bottom. Fades in on its own
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

      {/* the one loud band */}
      <div
        className="nx-load nx-load-ticker bg-ticker text-accent-light font-mono absolute inset-x-0 bottom-0 flex h-11 items-center overflow-hidden text-[11px] uppercase tracking-[0.22em] md:h-12 md:text-[12px] md:tracking-[0.24em]">
        <div className="tracking-[inherit] nx-ticker-track flex w-max flex-none">
          <TickerTrack />
          <TickerTrack duplicate />
        </div>
      </div>
    </section>
  )
}
