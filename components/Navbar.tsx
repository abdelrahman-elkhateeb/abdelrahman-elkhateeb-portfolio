import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import img from "@/public/avatar.png"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Tech stack", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  return (
    <header className="nx-nav-cap pointer-events-none relative z-50 h-16 -mb-16 md:sticky md:top-0 md:h-[140px] md:-mb-[140px]">
      <div className="pointer-events-auto flex h-16 items-center justify-between px-[18px] md:h-[72px] md:px-10">
        <a href="#" aria-label="Home" className="nx-nav-link flex items-center gap-3 no-underline">
          <Avatar className="size-[26px] rounded-full md:size-7">
            <AvatarImage src={img.src} alt="" />
            <AvatarFallback
              className="rounded-full text-[9px]"
            >
              AK
            </AvatarFallback>
          </Avatar>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-[26px] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nx-nav-link text-[12px] uppercase no-underline"
              style={{
                letterSpacing: "0.18em",
                color: "rgba(233,233,237,0.60)",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
