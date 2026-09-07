# Refactor record — 2026-09-07

Baseline: `2268e422188b86a5852f95b4e81401416f99e947`, initially clean worktree.
This is a change record. Standing instructions live in [AGENTS.md](../AGENTS.md), with visual rules in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md).

## Problems and decisions

- Project rows used fixed 388px images plus 692px content, alongside 32px gaps and padding/borders. The old design arithmetic also omitted container padding and borders. Rows now use a 388:654 flexible grid at 1024px; below that they stack. The first project stays a full-width lead card and later rows still alternate. Long no-link notes may wrap.
- Hero text could outgrow narrow widths and absolutely positioned content could collide in short viewports. The name has a calculated fit cap, content participates in flex layout, and the section can grow beyond its viewport minimum. All copy/buttons remain; the model layer and legibility scrims remain behind them.
- Browser checks then exposed the decorative glow expanding outside its layer and the 753px-wide desktop name overflowing its former 720px box. The scene layer now locally contains its glow; the name container allows 780px while retaining 104px typography where it fits. The fit formula was tuned with loaded Inter to minimize size changes at narrow widths.
- Contact values can shrink/wrap at tablet widths, with a smaller intermediate label rail/gap. Removing inline colors restores nav/contact hover and focus colors.
- Card reveal and hover transitions are composed explicitly so the reveal selector no longer replaces background/border feedback or delays hover by the entrance stagger.
- Static sections and ProjectCard are Server Components. Shared Reveal owns observer interaction; HeroScene owns model readiness; CopyEmailButton owns clipboard state. Container, SectionHeader and the existing arrow path are reused without introducing layout wrappers around cards.
- The manual mobile overlay left a closed dialog in the DOM, had no usable close control in the panel, and did not cleanly close on desktop resize. Customized shadcn/Radix Sheet now owns portal, focus, Escape and scroll locking. The panel has a title/close button and is inert/hidden to assistive technology during its closing fade. Section selection and desktop focus restoration are handled by Navbar.
- Button's actual variants match the existing outline/icon treatment and 44/48px sizes. Avatar remains circular at 26px; its image uses Next-generated responsive sources instead of always requesting the 509432-byte original.
- One root palette now feeds Tailwind semantic utilities and effect CSS. Inter and Share Tech Mono remain. Geist variables were loaded but never applied as font families; those loads and unused next-themes were removed. The body still uses Share Tech Mono; About/Experience/Skills/Contact body text and the mobile menu retain that inherited appearance. Rounded-lg was actually 0.65rem, not the old documented 8px; that existing value is retained.
- Clipboard errors now have an accessible live announcement without a layout shift; success still resets after 1600ms. Only the duplicate ticker track is hidden from assistive technology. Project images now declare layout-appropriate `sizes`.
- Room materials and the area light no longer allocate new Three objects on every render. OwnedMaterial cleans up local materials independently of cached GLTF resources. Camera, model transforms, light values, texture, GLB and postprocessing settings remain. Loaded scene screenshots were compared with baseline and orbit was tested. EffectComposer/SelectiveBloom were deliberately retained; no removal experiment established that omitting them would preserve output. No rendering performance/bundle-size claim is made.
- Detailed screenshot comparison caught R3F automatically converting the texture to sRGB when passed as a JSX map prop. OwnedMaterial now binds it directly in onUpdate, retaining the original constructor path's color-space behavior without allocating materials during render or mutating/discarding the cached texture.
- After that correction, the matched 1440px scene region at `(x=300, y=80, width=840, height=250)` differed from baseline by at most 1/255 per RGB channel (mean approximately 0.013/255). This narrowly scoped comparison checks the room/background above the headline; it is not a whole-page pixel-equivalence or performance claim.

## Moves, removals and dependencies

- `components/sections/*` → matching `features/{hero,about,experience,skills,projects,contact}/` files.
- `components/ProjectCard.tsx` → `features/projects/components/ProjectCard.tsx`; `components/HeroModels/*` → `features/hero/scene/*` (including Room.jsx and its declaration).
- `components/Navbar.tsx` → `components/layout/Navbar.tsx`; `components/SectionHeader.tsx` → `components/shared/SectionHeader.tsx`.
- `lib/index.ts` replaced with feature data/types and `lib/site-config.ts`; old unused `words` removed. Deep comparisons against baseline confirmed identical projects, experiences, skills, contact email and Contact URLs. Hero URLs retain their original `www` spelling.
- Deleted unused `HeroText.tsx`, `TypeWriterAnimation.tsx`, `theme-provider.tsx`, and UI `badge.tsx`, `card.tsx`, `dropdown-menu.tsx`, `navigation-menu.tsx`. Unused Avatar helper exports were removed; Avatar/Image/Fallback remain. Button and Sheet were customized and adopted, not removed.
- Deleted unused `public/images/{ideas,concepts,designs,code,arrow-down,arrow-right,menu,x}.svg`, after examining source imports, public references and scene assets. Deleted dead `hero-gaming-bg`/`heroGridPan` CSS and obsolete theme tokens. Project images, avatar, GLB and texture are unchanged.
- Removed direct dependencies: `@gsap/react`, `gsap`, `react-countup`, `@tailwindcss/vite`, `motion`, `next-themes`. Legacy framer-motion imports disappeared with their only consumers; it was not a direct manifest dependency.
- Declared `postprocessing` directly at the already installed **6.38.2**, because Room imports BlendFunction. npm updated the lockfile; comparison found no version changes among retained package entries.
- `app/favicon.ico` remains the active favicon. `app/favicon_io/*` is retained as source material; it has no active metadata reference and is not automatically served from that directory. No icon relocation was attempted.
- Added `typecheck` and `verify:build` scripts (four focused Node tests of production HTML). After the user explicitly requested local Playwright, added `@playwright/test` 1.63.0 as a development dependency, `playwright.config.ts`, `tests/portfolio.spec.ts`, and `test:e2e` with 11 focused browser tests. Baseline copies, captures and browser failure artifacts are ignored and excluded from source lint/type scanning where appropriate.

## Documentation reconciliation

Added AGENTS.md as the primary shared working guide; AGENT.md now redirects and CLAUDE.md adopts the same core rules. Replaced the inaccurate README structure/tool claims and consolidated DESIGN_SYSTEM.md into the final source-derived behavior. Removed contradictory assertions about Footer/ThemeProvider, Contact's old CyberCard design, nonexistent global data exports, undefined intermediate breakpoints, 28px square Avatar, 8px rounded-lg, and all-body-Inter typography. No nested instruction files were found during the initial inventory.

## Verification and limits

- Baseline: ESLint, `npx.cmd tsc --noEmit`, and Next production build passed.
- After implementation: ESLint, typecheck and Next production build passed; all four production HTML tests passed. These cover section order/server content, linked/static project semantics and image markup, absence of a closed modal, and no-JS/ticker/live-region markup.
- Data parity and unchanged retained dependency versions were checked against baseline. This does not measure bundle size or runtime performance.
- Local production server started successfully. HTTP checks returned 200 for the page, room GLB, texture, favicon and Next's 64px optimized Avatar endpoint. Local documentation links resolved; all 33 source modules had resolvable imports, declared package imports, no circular imports and no source `style` props. `git diff --check` passed with the repository's normal line-ending configuration.
- The connected browser tool was initially unavailable. With explicit user authorization, Playwright ran local headless Chrome against the production app and an isolated copy of the baseline commit. **All 11 browser tests passed**, covering six viewport widths, actual Inter/Share Tech Mono loading, no clipped headings/contact values, project image loading, no console/page errors during the width checks, menu keyboard trapping/Escape/close/link/resize and scroll unlock, clipboard success/rejection/unavailable API, no-JS content, reduced motion/preference changes, hover/focus, scroll spy, short landscape, orbit response and overlay hit testing.
- Captured before/after hero, internal-project card, Contact and full-page PNGs at all six widths, using Chrome 152.0.7977.82. Final comparison captures use the same reduced-motion preference with the loaded scene at its initial camera; normal-motion behavior was exercised separately by the browser tests. Reviewed the desktop/mobile hero and loaded scene, project reflow and Contact. The original scene appearance is preserved in the reviewed views; no claim of pixel-identical animation timing is made. The baseline ran in development mode, so its Next dev indicator is excluded from visual comparison. Card no-link wrapping and tablet stacking, narrow-screen hero fitting, Contact wrapping and the menu close button are intended corrections.
- A separate menu screenshot showed the opaque page-background pixel `(11,12,20)` over the canvas area and no scene bleed; its page emitted no console errors. Geometry bindings, cached-material bindings and responsive model transforms matched baseline. Avatar, all project images, GLB and texture are byte-identical to baseline.
- Capture artifacts and measured widths are saved locally in `.verification/` (`comparison.json`, `before-<width>-*.png`, `after-<width>-*.png`, plus the menu screenshot); they are intentionally not tracked source. Required screenshots use height 844px except 1440px captures, which use 840px. Tests additionally cover 667×375 landscape.

| Viewport width | Baseline document scrollWidth | Final document scrollWidth |
| --- | --- | --- |
| 320 | 327 | 320 |
| 375 | 375 | 375 |
| 390 | 390 | 390 |
| 768 | 1155 | 768 |
| 1024 | 1155 | 1024 |
| 1440 | 1440 | 1440 |

- Limits: verification used headless desktop Chrome with viewport emulation, not physical phones, Safari or Firefox. This is not a screen-reader certification, GPU memory profile or cross-device pixel guarantee. No numeric bundle-size improvement is asserted.
- Room.jsx is still not fully TypeScript checked. The retained Azure workflow specifies `output_location: build`, while local Next emits `.next`; deployment behavior was not tested or changed. No commit, push or deploy was performed.
