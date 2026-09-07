# Abdelrahman Elkhateeb — portfolio

A single-page Next.js 16 / React 19 portfolio with the dark Nocturne design and an interactive Three.js room. Sections: Hero, About, Experience, Tech stack, Projects and Contact. Contact uses direct links and email copying; there is no form, footer or theme toggle.

## Run locally

Use Node.js 22 (the version used for local verification) and npm. Install the locked dependencies, then start the development server:

```sh
npm ci
npm run dev
```

Open the local URL printed by Next. For production verification:

```sh
npm run lint
npm run typecheck
npm run build
npm run verify:build
npm run start
```

On Windows with PowerShell script execution restricted, use `npm.cmd` instead of `npm` and `npx.cmd` instead of `npx`. No execution-policy change is needed. `verify:build` uses Node's built-in runner to check generated production HTML; run it after a fresh build.

For the focused Playwright browser tests, use installed Chrome after building:

```powershell
$env:PLAYWRIGHT_CHANNEL='chrome'
npm.cmd run test:e2e
```

Playwright starts/reuses the production server on port 3001. Without the channel variable it uses Playwright Chromium, installed with `npx playwright install chromium`. The tests cover the six viewport widths, keyboard/menu behavior, clipboard outcomes, motion preferences, images, scroll spy and orbit. They require the original Google Fonts to load. Matching before/after screenshots are still needed for visual changes; passing interaction assertions alone does not establish identical appearance.

## Implementation and content

- `app/`: App Router entry points, metadata, global Tailwind v4 theme and effect CSS.
- `features/`: hero (including scene), about, experience, skills, projects and contact. Each feature owns its content and private components/types.
- `components/ui/`: customized shadcn/Radix Button, Sheet and Avatar. `components/shared/` contains Container, SectionHeader, Reveal and ArrowGlyph; `components/layout/` contains Navbar.
- `hooks/`: reveal and scroll-spy observers. `lib/`: class merging and shared identity/navigation/contact destinations.
- `public/`: project images, avatar, room GLB and texture. `scripts/`: production HTML smoke checks. `tests/` and `playwright.config.ts`: browser verification.

Edit projects in [features/projects/data.ts](features/projects/data.ts), roles in [features/experience/data.ts](features/experience/data.ts), skills in [features/skills/data.ts](features/skills/data.ts), and common destinations in [lib/site-config.ts](lib/site-config.ts).

Styling uses Tailwind CSS, CSS variables and limited shared effect CSS. Motion uses CSS and IntersectionObserver; the scene uses React Three Fiber, Drei and postprocessing. There is no Styled Components, GSAP or Framer Motion implementation. Inter and Share Tech Mono are loaded from Google Fonts through CSS; font loading therefore needs network access in the browser.

## Contributor references

- [AGENTS.md](AGENTS.md): architecture, placement/import rules, coding conventions, maintenance and verification workflow for all contributors.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): implemented palette, fonts, dimensions, responsive behavior and motion.
- [docs/REFACTOR_NOTES.md](docs/REFACTOR_NOTES.md): changes, removals, decisions, passed checks and verification limits.
- [CLAUDE.md](CLAUDE.md) and [AGENT.md](AGENT.md): compatible agent entry points adopting the shared guide.

The repository retains an [Azure Static Web Apps workflow](.github/workflows/azure-static-web-apps-gray-sea-0dcd34110.yml). Its deployment configuration was not validated during the refactor; local Next builds produce `.next`. Local verification commands do not publish the site.
