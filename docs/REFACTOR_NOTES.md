# Hero scroll fix — 2026-09-07

Baseline for this change: `a7b849c`, clean worktree. Scope: the hero section blocked normal page
scrolling. Only [features/hero/scene/HeroExperience.tsx](../features/hero/scene/HeroExperience.tsx)
changed, plus two focused browser tests and the orbit lines in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md).

## Problem and decisions

- Two independent causes, with different reach. The wheel half was scoped to widths above 1024px:
  `enableZoom={!isTablet}` gated zoom on `(max-width: 1024px)`, and `OrbitControls.onMouseWheel`
  calls `preventDefault()` only when zoom is enabled. Measured on the baseline build, a wheel over
  the hero centre scrolled 600px at 320/375/390/768/1024 and 0px at 1440. The touch half was
  universal: `connect()` sets `touch-action: none` on the element it binds, so a vertical swipe
  rotated the room at every width. The fix is `enableZoom={false}` plus restoring `pan-y`.
- `minDistance`/`maxDistance` were kept. They are not dead code once zoom is off: `update()` clamps
  the camera radius on every frame, so `maxDistance` 20 pulls the `[0,15,20]` camera (radius 25) in
  to radius 20. Removing it would have moved the camera and changed the room's apparent size.
- The element that needs `pan-y` is the labelled wrapper R3F connects its events to, not the inner
  canvas: drei resolves `domElement || events.connected || gl.domElement`, and `touch-action` is
  intersected across ancestors, so setting it on the canvas alone would have had no effect.
- A one-shot mount effect was not enough and was measured failing: R3F connects its event target
  after the children mount, so drei's connect effect reruns on a later commit and overwrote the
  value. The effect is now keyed to the connected target and rendered after OrbitControls, so it
  reruns in the same commit and flushes after it. No `!important` CSS rule was needed.
- `touch-pan-y` is a Tailwind class on the Canvas rather than an inline `style` prop, keeping the
  source free of `style` props. The class alone cannot win against OrbitControls' inline write; the
  effect is what actually applies the value.
- The React Compiler's `react-hooks/immutability` rule rejects mutating a value reached from a hook
  or a prop, which ruled out writing through `events.connected`, `gl.domElement` or a `ref` prop.
  The effect therefore reaches the element with a `document` query, using the same label constant
  the Canvas renders so the selector and the attribute cannot drift.

## Verification

- ESLint, `tsc --noEmit`, Next production build and all four `verify:build` HTML tests passed.
- `test:e2e`: **all 13 browser tests passed** in local Chrome 152 against the production build. The
  existing orbit test and the scroll-spy/hover/short-landscape test were not modified and still pass.
- Two focused tests were added: a wheel over the hero centre at 1440px scrolls the page; on a touch
  viewport the connected wrapper computes `touch-action: pan-y`, a horizontal swipe still changes
  the rendered canvas, and a vertical swipe scrolls the page.
- Direct before/after behaviour measurements on the two production builds:

| Check | Before | After |
| --- | --- | --- |
| Wheel over hero centre, 320/375/390/768/1024px | scrollY 600 | scrollY 600 |
| Wheel over hero centre, 1440px | scrollY 0 | scrollY 600 |
| Computed `touch-action` on the connected wrapper | none | pan-y |
| Vertical touch swipe, 390px / 1440px | scrollY 0 / 0 | scrollY 1146 / 1194 |
| Horizontal touch drag rotates the room, 390px / 1440px | yes | yes |

- Visual comparison: hero captures at all six widths, plus the matched 1440px scene region
  `(x=300, y=80, width=840, height=250)` used by the previous refactor, are **byte-identical**
  between the baseline and fixed builds (max channel difference 0, zero differing pixels). Captured
  in the same Chrome with reduced motion, `deviceScaleFactor` 1 and the loaded scene at its initial
  camera; heights 844px except 1440px at 840px.
- Chrome's `Input.synthesizeScrollGesture` does not drive touch input in this headless setup: it
  failed to scroll over plain DOM in a control run, so its results were discarded. Touch checks
  dispatch the touch sequence through `Input.dispatchTouchEvent` instead, which the same control
  confirmed does scroll.
- A byte-equality assertion on the canvas after wheeling was written, then removed as incorrect: a
  plain `window.scrollTo` with no wheel, pointer or zoom path produces the identical 250-pixel change
  in the identical `x898-948 y31-40` box, so any scroll perturbs it. It is R3F re-measuring on scroll
  (`useMeasure({ scroll: true })`), is present on the baseline, and is unrelated to this change.
  Idle captures with no input at all are byte-identical, so the canvas itself is stable.
- Limits: headless desktop Chrome with viewport and touch emulation, not physical phones, Safari or
  Firefox. Touch behaviour is established by synthesized touch input, not by a real finger on a
  device. No commit, push or deploy was performed. Capture and probe artifacts are in ignored
  `.verification/scroll-fix/`.


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

# Change record — hero turntable

Baseline: `9256524` (`fix scroll issue for the hero seciton`), clean worktree. Landed on its own, not bundled with the scroll fix.

## What changed

- `features/hero/scene/HeroExperience.tsx`: `autoRotate` with `autoRotateSpeed` 0.4 on the existing OrbitControls, a `frameloop` that drops to `never` while the hero is off screen, and a `ResumeOnReturn` child that requests one frame on return.
- `features/hero/scene/HeroScene.tsx`: observes its own model layer and reads the motion preference, passing `rendering` and `autoRotate` down. Scene ownership is otherwise unchanged.
- `hooks/useInViewport.ts` and `hooks/usePrefersReducedMotion.ts`: new shared hooks following the existing observer conventions.
- Camera position/fov, `minDistance`/`maxDistance`, polar limits, target, lights, room scale/position/rotation, GLB, texture and the composer are untouched.

## Decisions

- **Camera, not the model — confirmed against the scene, not assumed.** Both options were built and captured at 1440px, the model one through a throwaway probe build that read a rotation offset from the URL hash. Rotating the model group sweeps the world-space spotlights and the #a259ff area light across the geometry: at 180 degrees the exterior carries pink/cyan/blue light blobs (`.verification/turntable/model-180.png`) where the camera-orbit frame at the same angle is clean matte black (`camera-180.png`), and every model frame facing away from the default camera shows the same smearing. Camera rotation is the better of the two, as expected. Only the 180 degree pair is a strictly matched view — model offset -x turned out to equal camera azimuth -x, not +x, so the other pairs in `sheet-camera-vs-model.png` are mirrored and are evidence about lighting, not about framing.
- **A full revolution is not viable with this asset, under either option.** The room is a two-wall corner diorama open toward the default camera. The camera sweep (`sheet-camera.png`, -75 to +90 in 15-degree steps) shows the interior readable only from about -45 to +30 degrees; by +60 the near wall occludes it and at 180 degrees it is an unlit shell. At the measured rate a revolution spends most of its time unreadable. This was implemented as specified and flagged rather than silently bounded, because bounding it is a design decision: azimuth limits would not help, since OrbitControls clamps rather than reverses and the turntable would stop dead at the limit.
- **Speed 0.4** is the middle of the requested band. At 60Hz that is 2.4 degrees a second, one revolution every 150s.
- **`autoRotateSpeed` is per frame, not per second.** `getAutoRotationAngle()` is `2*PI/60/60 * speed` with no delta-time term, so the rate scales with refresh rate. Measured 144.3 rAF frames/second on the capture machine, giving 5.8 degrees a second and a 62s revolution — 2.4x the 60Hz figure, which is why the timed drift captures do not match a 60Hz prediction. No value in the allowed band fixes this; only driving the azimuth from frame delta would, which is not what `autoRotate` does.
- **Manual drag needs no code.** three-stdlib applies auto-rotation only when `state === STATE.NONE`, so a drag suppresses it and release resumes from the new angle. Verified rather than assumed.
- **Frameloop.** `autoRotate` alone needs no frameloop change: the Canvas set no `frameloop` prop, so it was already R3F's `always` default and rendering continuously. The requested off-screen pause is what needs it, and there is no alternative mechanism — `frameloop` `never` is what makes R3F skip `useFrame` and `gl.render` and then cancel its animation frame. The on-screen value stays `always`, so the rendered hero is unchanged and only an off-screen idle state is new. This is a real edit to a line DESIGN_SYSTEM.md previously froze; it is called out rather than buried.
- Setting the frameloop through the store instead of the prop does not work: `Canvas` re-runs an unkeyed layout effect on every render whose awaited `configure` resets the frameloop from the prop, overriding the store write. Measured 11,118 draw calls while off screen before the switch to the prop.
- The stopped loop does not restart on its own. R3F restarts it incidentally through `invalidateInstance` when a scene prop changes, which masks the problem whenever `autoRotate` flips at the same moment — but under reduced motion nothing changes and the room would stay frozen on return. `ResumeOnReturn` requests a frame one animation frame later, after `Canvas`'s awaited async effect has applied `always`; a synchronous request is dropped while the state still reads `never`.

## Verification

- `npm run lint`, `npm run typecheck`, `npm run build` and `npm run verify:build` (4/4 HTML tests) all pass.
- `npm run test:e2e`: **17/17 pass**, local Chrome via `PLAYWRIGHT_CHANNEL=chrome` against the production server on port 3001. All 13 pre-existing tests still pass, including the orbit-drag, wheel-scroll and touch-swipe tests. Four tests are new:
  - reduced motion holds the room still across 3s, a preference lifted at runtime starts the drift without a reload, and re-applying it stops the drift again;
  - the room drifts on its own, freezes while a drag is held, and resumes after release;
  - draw calls are greater than zero on screen, exactly 0 while the hero is scrolled off, and greater than zero again on return;
  - the same pause/restart under reduced motion, which is the case that only passes because of the explicit resume.
- The pause is measured directly by counting `drawElements`/`drawArrays` calls through a patched WebGL prototype, not inferred from pixels, which are not observable while the hero is off screen.
- Comparing scene frames under normal motion needs the hero glow's 16s drift held still, because an element screenshot includes overlapping siblings. Without that, "the frame changed" would pass whether or not the room turned.
- The held-drag assertion was measured before being asserted: free drift changes 442,623 of 3,421,440 bytes over 2s, while a held drag is byte-identical after about 4s of damping settle. The test settles 4.5s so exact equality is a real result.
- Six-width matrix (320/375/390/768/1024/1440, height 844 except 840 at 1440), reduced motion, same 2500ms settle as the pre-change captures: hero screenshots are **byte-identical to the pre-change captures at all six widths**, and `document.scrollWidth` equals the viewport at each. That is the evidence that camera, framing, lighting, scale and composer output were not disturbed. A matching normal-motion pass was captured alongside.
- Timed drift captures at 1440px (t+0/10/20/30/45/60/90/120s) and the two angle sweeps are in ignored `.verification/turntable/`, with the probe scripts that produced them.

## Limits

- Headless desktop Chrome with viewport emulation on a 144Hz machine; not physical phones, Safari or Firefox. The 60Hz figures are computed from the per-frame formula, not measured on a 60Hz display.
- The occlusion window (-45 to +30 degrees) was read from 15-degree captures at 1440px, not solved analytically or checked per width.
- No commit, push or deploy was performed. No bundle-size or runtime-performance number is claimed; the pause result is a draw-call count, not a power measurement.

# Projects: ChillWork and Foodie added (2026-10-03)

## What changed

- Two entries in `features/projects/data.ts`: **ChillWork** (frontend only — the owner's part; the backend is not claimed) at position 3, after the Mawasem pair, and **Foodie** at position 5, after Lumina. Both link to their live Vercel deployments. No existing project was removed or reordered.
- Screenshots supplied by the owner: `public/images/chillwork.webp`, `public/images/foodie.webp`.
- Section description "Six things I've shipped" → "Eight things I've shipped".
- Count assertions updated for the new total: `scripts/verify-build.mjs` (7 linked cards, 8 card images) and `tests/portfolio.spec.ts` (8 cards).

## Verification

- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run verify:build` (4/4) pass.
- `npm run test:e2e` with `PLAYWRIGHT_CHANNEL=chrome`: 17/17 pass, including the six-width fit test.
- Card screenshots of both new entries at 390/768/1024/1440 (reduced motion, fonts loaded) in ignored `.verification/new-projects/`; `scrollWidth` equals the viewport at each width. There are no before captures for comparison, because these cards did not exist; existing cards were not changed.

# Change record — redesign: status line, project index, case-study pages

Baseline: `6f66831` (`Add ChillWork and Foodie to projects`), clean worktree. Direction approved by the owner on a design canvas before implementation; reference for the case-study structure and drawn product screens was the owner's Full Circle Studio site.

## What changed

- Hero: the scrolling ticker band is replaced by a static status line (availability, current role, base, scroll cue) in normal flow. The model layer keeps its 44/48px bottom offset, so canvas size, camera framing and the scene are untouched; the status line only covers the fully scrimmed strip. A "Drag to look around" hint (768px+) appears with the model and leaves after the first pointer-down on the scene. `--ticker` is renamed `--field`; ticker keyframes/classes and `TICKER_ITEMS` are removed.
- Projects: the cards and screenshots are replaced by an editorial index of whole-row links. From 1024px a sticky preview column shows the hovered/focused row's drawing, hard part and stack; previews are server-rendered children of the small `ProjectIndex` client boundary, crossfade in one grid cell, and inactive ones are `inert`/aria-hidden.
- Case studies: `app/work/[slug]/page.tsx` prerenders a page for all eight projects from `features/projects/data.ts` (problem, what I built, feature figures, hard parts, status, next project — each only when the data has it). Copy for Mawasem, ChillWork and Foodie was adapted to first person from the owner's Full Circle case studies; the smaller projects use the existing portfolio copy only. Roles are stated only where the portfolio already states them.
- Illustrations: twelve drawn screens (one per project plus four ChillWork features) in `features/projects/components/illustrations/`, sized entirely in `cqw` inside a 16:10 `@container` frame, `role="img"` with labels.
- Navigation: `NAV_LINKS` point at `/#section` so they work from case pages; the Home mark is a `Link` to `/`; Projects is active on `/work/*`; `useScrollSpy` takes the pathname so it re-observes after client navigation back to the home page.
- Button gains a `secondary` CVA variant (bordered, used for "Get in touch").
- `ProjectCard.tsx` is deleted. At the owner's request the eight project screenshots in `public/images/` were deleted too, after confirming nothing referenced them; `public/images/textures/` (the room matcap) stays.

## Decisions and findings

- **`Reveal asChild` drops streamed server children.** The ChillWork page first rendered only three of four feature figures: the second figure's subtree was outlined into a lazy RSC chunk, and Radix `Slot` renders nothing for a child that is not yet a valid element. The page HTML had three `<figure>`s while the RSC payload had four. Case-page content is now wrapped by `Reveal` (a div) instead; the rule is recorded in AGENTS.md and DESIGN_SYSTEM.md. About still uses `Reveal asChild` with a small inline child and was not changed.
- The status line shows BASED only from 1280px: measured content at 1024px (availability, long NOW, BASED, scroll, gaps, padding) is about 1096px and would wrap.
- Active-row styling is limited to 1024px+, where the preview it refers to exists; below that only hover tints.

## Verification

- `npm run lint`, `npm run typecheck`, `npm run build` (12 static routes including 8 `/work/*`) and `npm run verify:build` (5/5) pass. The smoke checks were rewritten for the index, the eight prerendered case pages (one h1, back link, next project, hard parts each), four server-rendered ChillWork figures and the no-link message.
- `npm run test:e2e` with `PLAYWRIGHT_CHANNEL=chrome`: **24/24 pass**. New: case pages at all six widths (no document overflow, no clipped h1/h2/dd, no console errors), preview follows hover and keyboard focus and persists off-list, Enter opens the case page, Projects is active there, next-project and All projects links navigate, and scroll spy works again after returning; drag hint visible before and hidden after a drag. All scene, orbit, wheel, touch, menu, clipboard and reduced-motion tests still pass.
- Captures at 320/375/390/768/1024/1440 (reduced motion, fonts loaded, 2.5s settle) for the home hero, projects section and ChillWork page are in ignored `.verification/redesign/`; `scrollWidth` equals the viewport at every width on both pages.

## Limits

- Headless Chrome with viewport emulation; not physical phones, Safari or Firefox. No screen-reader pass.
- No pixel comparison of the scene against the previous build was made; the claim that it is unchanged rests on the unchanged canvas box, camera and scene code, and on the passing scene tests.
- Drawings at phone width are small (a 354px-wide drawing sets 1.9cqw text near 7px); they are illustrative, labelled for assistive technology, and the case-page copy carries the content.
- No commit, push or deploy was performed.

## Follow-up — case-study affordance

- Owner feedback: rows did not say they open a page. Each index row now carries an always-visible "Case study" label with the arrow (under the description below 768px; under the category from 768px), and the preview panel ends with a "Read the full case study" link. Chosen over a cursor-following pill or an animated hand because it works on touch and needs no motion.
- Verification: lint, typecheck, build, `verify:build` 5/5 (now also counts both label variants and de-duplicates slugs, since each appears on the row and the preview link) and `test:e2e` 24/24 (every row shows one visible label at all six widths; the active preview link points at the hovered project). Captures at 390/768/1440 in `.verification/redesign/`; no overflow.

# ChillWork dashboard link (2026-10-07)

- `ProjectEntry` gains optional `dashboardLink`; ChillWork sets it to `https://chillwork-dashboard.vercel.app`, shown as a "Visit dashboard" button beside "Visit live site" and a "Dashboard" fact under "Live" on `/work/chillwork`. Status copy names both URLs.
- Drawn screens that live in the dashboard (jobs board, schedule, parts) now show `chillwork-dashboard.vercel.app` in their URL bar; triage and invoice stay on the customer site.
- Verified: lint, typecheck, build, verify:build pass; both links render on `/work/chillwork`; `scrollWidth` = 320 at 320px. Six-width visual matrix and test:e2e not run (one added button and fact row; buttons wrap cleanly at 320px).
