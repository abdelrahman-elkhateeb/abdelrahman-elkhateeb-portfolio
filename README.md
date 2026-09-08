<div align="center">

# Abdelrahman Elkhateeb — Portfolio

**A single-page portfolio built to be inspected, not just looked at.**

Dark Nocturne design, an interactive Three.js room, and a build that holds itself to the standards it claims.

[**Live site**](https://abdelrahman-elkhateeb.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/abdelrahman-elkhateeb) · [Frontend Mentor](https://www.frontendmentor.io/profile/abdelrahman-elkhateeb)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)

</div>

<!-- Add a screenshot at public/preview.png, then this renders. -->
<img width="1839" height="988" alt="Screenshot 2026-09-08 150250" src="https://github.com/user-attachments/assets/919acd3f-38a7-4e7e-bec5-1db7009eabe5" />
<img width="1845" height="985" alt="Screenshot 2026-09-08 150232" src="https://github.com/user-attachments/assets/2bb230a6-e5d2-4188-a505-d103e72e340e" />


---

## What this is

A single-page site with six sections — Hero, About, Experience, Tech stack, Projects and Contact — presenting frontend work with the problem behind each project rather than a list of libraries.

Contact is direct links and one-click email copy. There is no form, no footer and no theme toggle. Those are removals, not omissions.

## Design principles

**Evidence over adjectives.** No "passionate", no "clean code". Every project names the part that was actually hard, and every number on the page points at something shipped.

**Restraint as a signal.** One 3D moment in the hero and nothing decorative after it. Whatever survived the cut is on the page for a reason.

**The site proves its own claim.** A portfolio that argues for performance shouldn't be slow. Motion is CSS and `IntersectionObserver` rather than an animation library, `prefers-reduced-motion` is respected, and browser tests run across six viewport widths.

The implemented palette, fonts, dimensions, responsive behaviour and motion are documented in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Tech stack

| Area | Used |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, CSS variables, limited shared effect CSS |
| Components | Customized shadcn/Radix — Button, Sheet, Avatar |
| 3D | React Three Fiber, Drei, postprocessing |
| Motion | CSS transitions + `IntersectionObserver` |
| Type | Inter, Share Tech Mono (Google Fonts, via CSS) |
| Testing | Playwright, Node's built-in test runner |
| Hosting | Vercel |

No Styled Components, GSAP or Framer Motion. Fonts load over the network, so the browser needs connectivity for the intended appearance.

## Run locally

Requires **Node.js 22** and npm.

```sh
npm ci
npm run dev
```

Open the local URL Next prints.

### Production verification

```sh
npm run lint
npm run typecheck
npm run build
npm run verify:build
npm run start
```

`verify:build` uses Node's built-in runner to smoke-check the generated production HTML. Run it after a fresh build.

### Browser tests

Build first, then run Playwright against installed Chrome:

```powershell
$env:PLAYWRIGHT_CHANNEL='chrome'
npm.cmd run test:e2e
```

Playwright starts or reuses the production server on port 3001. Without the channel variable it falls back to Playwright Chromium — install it with `npx playwright install chromium`.

The suite covers six viewport widths, keyboard and menu behaviour, clipboard outcomes, motion preferences, images, scroll spy and orbit controls. It needs the original Google Fonts to load.

> Passing interaction assertions do not establish identical appearance. Visual changes still need matching before/after screenshots.

<details>
<summary><b>Windows with restricted PowerShell execution policy</b></summary>

Use `npm.cmd` instead of `npm` and `npx.cmd` instead of `npx`. No execution-policy change is needed.

</details>

## Project structure

```
app/          App Router entries, metadata, global Tailwind v4 theme, effect CSS
features/     hero (incl. 3D scene), about, experience, skills, projects, contact
              — each feature owns its content and private components/types
components/   ui/ (shadcn/Radix), shared/ (Container, SectionHeader, Reveal,
              ArrowGlyph), layout/ (Navbar)
hooks/        reveal, scroll-spy, viewport and reduced-motion observers
lib/          class merging, shared identity/navigation/contact destinations
public/       project images, avatar, room GLB and texture
scripts/      production HTML smoke checks
tests/        Playwright browser verification
```

## Editing content

Content lives in typed data files, separate from the components that render it:

| What | Where |
| --- | --- |
| Projects | [`features/projects/data.ts`](features/projects/data.ts) |
| Roles | [`features/experience/data.ts`](features/experience/data.ts) |
| Skills | [`features/skills/data.ts`](features/skills/data.ts) |
| Links, email, navigation | [`lib/site-config.ts`](lib/site-config.ts) |

## Contributor references

- [AGENTS.md](AGENTS.md) — architecture, placement and import rules, coding conventions, maintenance and verification workflow.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — implemented palette, fonts, dimensions, responsive behaviour and motion.
- [docs/REFACTOR_NOTES.md](docs/REFACTOR_NOTES.md) — changes, removals, decisions, passed checks and verification limits.
- [CLAUDE.md](CLAUDE.md) and [AGENT.md](AGENT.md) — agent entry points adopting the shared guide.

The repository still carries an [Azure Static Web Apps workflow](.github/workflows/azure-static-web-apps-gray-sea-0dcd34110.yml). Its deployment configuration was not validated during the refactor, and the local verification commands above do not publish the site.

## Contact

Open to mid-level frontend roles — Cairo, remote-friendly.

**abdelrahmanelkhateeb10@gmail.com** · [linkedin.com/in/abdelrahman-elkhateeb](https://www.linkedin.com/in/abdelrahman-elkhateeb)
