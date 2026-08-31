# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev      # start Next.js dev server (Turbopack)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint.config.mjs)
```

There is no test suite configured in this repository.

## Architecture

Next.js 16 (App Router) single-page portfolio site. `app/page.tsx` composes the whole page as one
ordered stack of section components: `Hero → About → Experience → Skills → Projects →
ContactSection`. `app/layout.tsx` wraps everything in `ThemeProvider` (next-themes, class-based,
system default) with a persistent `Navbar` and `Footer` outside `<main>`.

**Data layer.** All page content — project list, work experience, stats, tech list, skill groups —
lives in one file, [lib/index.ts](lib/index.ts), as plain exported arrays/objects (`projectsData`,
`experiences`, `stats`, `tech`, `skillGroups`). Section components import from there rather than
owning their own content; adding or editing a project/experience entry means editing this file,
not the component that renders it.

**Design system.** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) is the source of truth for the site's
locked "Nocturne" direction — palette, type scale, spacing, the terminal/mono motif budget, and
motion timing are all specified there with exact values. Read it before touching
`components/sections/Hero.tsx`, `components/ProjectCard.tsx`, `components/sections/Projects.tsx`,
`components/sections/Skills.tsx`, `components/sections/Experience.tsx`,
`components/sections/About.tsx`, `components/Navbar.tsx`, `components/SectionHeader.tsx`, or the
`nx-*` utility classes in `app/globals.css`. Values not present in that doc are explicitly marked
"undefined" — ask rather than inventing one. Contact and the footer still carry the pre-redesign
"cyber terminal" treatment (`CyberCard`, Orbitron) and remain outside the locked spec — see
DESIGN_SYSTEM.md's "Known gap" note.

**3D hero.** `components/HeroModels/` renders the hero's 3D scene via `@react-three/fiber` +
`@react-three/drei`: `HeroExperience.tsx` owns the `Canvas`/`OrbitControls` and is a client
component; `HeroModel.tsx` loads the actual model, `HeroLights.tsx` sets up lighting, `Room.jsx`
(with a hand-written `Room.d.ts`) is the generated/glTF-derived model component. Orbit zoom is
disabled below the tablet breakpoint via `react-responsive`.

**UI primitives.** `components/ui/` is shadcn/ui (`components.json`: style `new-york`, base color
`neutral`, icon library `lucide-react`), aliased through `@/components`, `@/lib`, `@/hooks` in
`tsconfig.json`. Use the shadcn CLI conventions (Radix primitives under `components/ui`, class
merging via `cn()` in [lib/utils.ts](lib/utils.ts)) rather than hand-rolling new primitives.

**Styling.** Tailwind CSS v4 via `@import "tailwindcss"` in `app/globals.css` (no `tailwind.config`
file — v4's CSS-first config). Two font families are loaded there: Inter and Share Tech Mono
(Google Fonts `@import`), plus Geist/Geist Mono via `next/font` in `app/layout.tsx` for the
shadcn/theme baseline. The Hero/Projects "Nocturne" tokens (`nx-*` classes, `nx-scrim-*`,
`nx-glow-*`, ticker keyframes) are hand-written CSS at the bottom of `globals.css`, separate from
the Tailwind/shadcn OKLCH theme tokens (`--background`, `--primary`, etc.) defined above them —
the two token systems currently coexist rather than being unified.

## Deployment

Deployed via GitHub Actions to Azure Static Web Apps
(`.github/workflows/azure-static-web-apps-gray-sea-0dcd34110.yml`), triggered on push to `master`
and on PR open/sync/reopen/close.
