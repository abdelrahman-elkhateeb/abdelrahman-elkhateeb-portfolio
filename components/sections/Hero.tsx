import { Github, Linkedin, Code } from "lucide-react"
import HeroExperience from "../HeroModels/HeroExperience"

const TICKER_ITEMS = [
  "System_ready",
  "36 enterprise components shipped",
  "System_online",
  "Open to mid-level frontend roles",
  "System_stable",
  "Lighthouse 98+",
  "System_deployed",
  "Cairo, remote-friendly",
]

function TickerTrack() {
  return (
    <div className="flex flex-none gap-11 whitespace-nowrap pr-11">
      {TICKER_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-11">
          <span>{item}</span>
          <span style={{ color: "rgba(210,206,253,0.4)" }}>/</span>
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section
      className="nx-hero relative w-full h-screen min-h-[560px] overflow-hidden"
      style={{ background: "#0b0c14", color: "#e9e9ed", fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* model layer — reserves the ticker band at the bottom */}
      <div className="absolute inset-x-0 top-0 bottom-11 md:bottom-12">
        <div className="nx-glow-accent pointer-events-none absolute inset-0" />
        <div className="nx-glow-black pointer-events-none absolute inset-0" />
        <HeroExperience />
      </div>

      {/* legibility scrim — above the model, below the name/nav, never intercepts orbit drags */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-11 md:bottom-12">
        <div className="nx-scrim-bottom absolute inset-0" />
        <div className="nx-scrim-left absolute inset-0" />
      </div>

      {/* name + subline + ctas */}
      <div className="absolute left-5 right-5 bottom-[114px] flex flex-col gap-[18px] md:left-10 md:right-auto md:bottom-[178px] md:max-w-[720px]">
        <h1
          className="m-0 font-medium uppercase text-[46px] leading-[0.94] tracking-[-0.04em] md:text-[104px] md:leading-[0.92] md:tracking-[-0.045em]"
          style={{ color: "#e9e9ed", textShadow: "0 1px 34px rgba(8,9,15,0.5)" }}
        >
          Abdelrahman
          <br />
          Elkhateeb
        </h1>

        <div
          className="flex flex-wrap items-center gap-3 text-[14px] md:gap-4 md:text-[16px]"
          style={{ color: "rgba(233,233,237,0.78)" }}
        >
          <span>Frontend engineer</span>
          <span className="h-px w-11" style={{ background: "#9184d9" }} />
          <span>React · Next.js · TypeScript</span>
          <span className="hidden h-px w-11 md:block" style={{ background: "#9184d9" }} />
          <span className="hidden md:inline">Cairo</span>
        </div>

        <div className="mt-[6px] flex flex-wrap gap-3">
          <a
            href="#projects"
            className="nx-hero-btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[15px] font-medium tracking-[0.02em] no-underline"
          >
            See the work
            <svg width="15" height="15" viewBox="0 0 256 256" fill="currentColor">
              <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
            </svg>
          </a>
          <a
            href="https://github.com/abdelrahman-elkhateeb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="nx-icon-btn flex h-12 w-12 items-center justify-center rounded-lg"
          >
            <Github size={19} />
          </a>
          <a
            href="https://www.linkedin.com/in/abdelrahman-elkhateeb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="nx-icon-btn flex h-12 w-12 items-center justify-center rounded-lg"
          >
            <Linkedin size={19} />
          </a>
          <a
            href="https://www.frontendmentor.io/profile/abdelrahman-elkhateeb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Frontend Mentor profile"
            className="nx-icon-btn flex h-12 w-12 items-center justify-center rounded-lg"
          >
            <Code size={19} />
          </a>
        </div>
      </div>

      {/* the one loud band */}
      <div
        className="absolute inset-x-0 bottom-0 flex h-11 items-center overflow-hidden text-[11px] uppercase tracking-[0.22em] md:h-12 md:text-[12px] md:tracking-[0.24em]"
        style={{
          background: "#262a60",
          color: "#d2cefd",
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        <div className="nx-ticker-track flex w-max flex-none" style={{ fontSize: "inherit", letterSpacing: "inherit" }}>
          <TickerTrack />
          <TickerTrack />
        </div>
      </div>
    </section>
  )
}
