# Project working guide

This is the primary Codex instruction file and the shared working guide for all contributors.
[CLAUDE.md](CLAUDE.md) adopts the same rules; [AGENT.md](AGENT.md) is a compatibility pointer.
Read [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) before changing appearance or interaction.
[docs/REFACTOR_NOTES.md](docs/REFACTOR_NOTES.md) records history and verification limits, not standing instructions.

## Scope and workflow

- Read applicable nested instructions and inspect `git status --short` before editing. Preserve unrelated work.
- Implement the requested change, verify it appropriately, and update affected documentation. A successful build alone does not verify appearance or interaction.
- Keep the Nocturne identity, section order, copy, destination URLs, project images, mobile copy and 3D appearance. Make the smallest correction for an actual defect.
- Do not add a footer, theme toggle, statistics strip or a new visual direction as incidental cleanup.
- Resolve routine implementation choices from the current code and design guide. New product scope needs a concrete requirement; an old design-board annotation is not one.
- Do not commit, push or deploy unless the task authorizes it. The Azure workflow runs on master pushes and PR events; local build verification does not deploy.

## Architecture and placement

```text
app/                       App Router composition, root metadata and global CSS
  layout.tsx               dark HTML, no-JS reveal fallback, Navbar and main
  page.tsx                 Hero → About → Experience → Skills → Projects → ContactSection
  globals.css              palette, Tailwind v4 theme, shared effects and motion
  favicon.ico              active Next.js favicon convention
  favicon_io/              retained source icon/manifest assets; not a served route
features/
  hero/                    Hero.tsx, ticker data.ts, scene/ with R3F and Room
  about/                   About.tsx and prose data.ts
  experience/              Experience.tsx and role data.ts
  skills/                  Skills.tsx and group data.ts
  projects/                Projects.tsx, data.ts, types.ts, components/ProjectCard.tsx
  contact/                 ContactSection.tsx and CopyEmailButton.tsx
components/
  layout/                  Navbar.tsx, including mobile navigation
  shared/                  Container, SectionHeader, Reveal and ArrowGlyph
  ui/                      customized shadcn Button, Sheet and Avatar
hooks/                     shared useReveal, useScrollSpy, useInViewport and usePrefersReducedMotion
lib/                       utils.ts (cn), site-config.ts (identity, navigation, contact/social URLs)
public/                    project images, avatar, Models/optimized-room.glb and texture
scripts/                   verify-build.mjs, production HTML smoke checks
tests/                     portfolio.spec.ts, focused Playwright browser checks
docs/                      refactor history and verification record
```

- Add a section to its feature, compose it in `app/page.tsx`, and update navigation in `lib/site-config.ts` if required. Create folders only when they contain real code.
- Feature-specific components/hooks/types/data stay within that feature. A single section component can live at the feature root; `components/` is useful when a feature has multiple components.
- Put a component in `components/shared/` only when unrelated features actually reuse it. Put a hook in `hooks/` only when it is shared. UI primitives must not know portfolio content.
- Add projects in `features/projects/data.ts` using `ProjectEntry` from `types.ts`; keep full/short descriptions and hard-part copy, image, and either a destination or a no-link explanation. The first item is the lead card; later items alternate at desktop width.
- Experiences and skills belong in their respective `data.ts` files. Shared identity and destinations belong in `lib/site-config.ts`. Do not restore a global content barrel such as `lib/index.ts`.
- Allowed dependency direction: `app → features / components / lib`; `features → their own files / components / hooks / lib`; `components/layout → components/shared / ui / hooks / lib`; `components/shared → ui / hooks / lib`; `components/ui → lib/utils and external primitives`; `hooks → lib and external libraries`; `lib → external utilities only`.
- Do not import `app` from lower layers, import one feature's internals from another, or make `lib`, hooks or primitives depend on features. Move genuinely shared code down a layer. Prefer direct imports and `import type`; avoid circular imports and unrelated barrel exports.

## UI, styling and motion

- Use customized shadcn primitives in `components/ui/` as the interactive foundation. `Button` supports `outline`/`icon` variants and `default` (48px tall), `icon` (48px square), `touch` (44px square) sizes. Use `asChild` for an anchor styled as a button; keep ordinary navigation links and whole project links as anchors.
- `Sheet` wraps Radix Dialog for a fullscreen portal, focus management, Escape and scroll lock. Do not replace these behaviors with manual keydown or body-overflow handlers. Preserve the visible close control, accessible title, closed-state `inert`, link selection and desktop-resize handling.
- Use Tailwind for routine layout and typography, and `cn()` for conditional classes. Extend the existing CVA definition when adding a real Button variant; keep its interaction/size semantics separate.
- Add a semantic CSS variable under `:root` in `app/globals.css`, expose it through `@theme inline` when a Tailwind utility is needed, then document its role in `DESIGN_SYSTEM.md`. Reuse existing colors and opacity levels first. Do not add a second palette or a Tailwind JS config.
- Do not repeat fixed colors, font families, dimensions or animation delays in `style` props. Finite states use classes/data attributes. A genuinely runtime value may use a typed CSS custom property (`CSSProperties & { '--name': string }`); document why classes cannot represent it. Radix/R3F/Next Image generated inline styles are expected.
- Custom CSS is for shared gradients, scrims, keyframes, selectors spanning stateful children, and the calculated hero fit rule. Keep it in `app/globals.css`; use Tailwind for ordinary spacing and grids. Do not introduce CSS-in-JS or another styling framework.
- Dark-only is explicit on HTML and in root tokens. Load only Inter and Share Tech Mono through the existing CSS imports. Preserve the actual font assignments in the design guide, including inherited mono body text; do not silently restyle it to match an obsolete Inter-only rule.
- Preserve the shared custom ArrowGlyph path and sizes. Use existing Lucide icons for social/copy controls; decorative SVGs should be hidden from assistive technology. Do not swap in a visibly different glyph merely for consistency.
- Keep hero load delays, one-shot reveal timing, capped card stagger, ticker, readiness fade, scene auto-rotation and reduced-motion behavior. Use `Reveal` for static server content that needs an entrance; do not turn a whole feature into a Client Component just for a reveal.

## Responsive and accessibility requirements

- Keep bounded containers and flexible children. Account for content, both borders, padding and gaps. Use `min-w-0`, `minmax(0, …)` and wrapping for shrinking tracks/long text. Do not hard-code the former 388px + 692px project row.
- Never conceal a page overflow defect with `overflow-x-hidden`, clipping text or deleting content. Local clipping for image wells/Avatar, the ticker and the decorative scene glow is intentional. A Sheet may scroll internally to keep its links reachable.
- Test widths **320, 375, 390, 768, 1024 and 1440px**, plus a short landscape viewport for hero/menu changes. Capture comparison screenshots at least at 390, 768, 1024 and 1440px using the same browser, viewport height, zoom, loaded fonts, scroll position and animation/scene readiness.
- Check the entire page for horizontal overflow and clipped content, including project 2's no-link message, email and long social URLs. The ticker's own moving track may exceed its local viewport; the document may not.
- Test mouse, Tab, Shift+Tab, Enter and Escape; focus must stay inside an open Sheet, return appropriately on close, move to a selected section, and land on visible desktop navigation after resizing. Verify scroll unlock and no WebGL bleed through the overlay. Closed links must not be focusable or announced as an open dialog.
- Preserve semantic headings/anchors/buttons, visible focus, names on icon buttons, image alternatives and the live copy-status region. Test clipboard success and rejection, including unavailable clipboard APIs; failure must not throw an unhandled rejection or shift layout.
- Test reduced motion and preference changes, no-JS content, active-section scroll spy, link destinations and image loading. Keep the duplicate ticker track `aria-hidden`. Manual browser checks remain necessary beyond HTML smoke tests.

## React and 3D

- Server Components are the default for routes, static sections, project cards and data. Client boundaries are Navbar, Reveal, CopyEmailButton and the scene; UI primitives opt in as needed. Pass serializable data/server-rendered children into boundaries; never import server-only code into their client graph.
- Keep state local. Effects must clean up observers/listeners/timers; clipboard completion must not update an unmounted component. Do not add global state management for this portfolio.
- Scene ownership is `features/hero/scene/`: HeroScene owns readiness and the viewport/reduced-motion gating it passes down, HeroExperience owns Canvas/OrbitControls and the frameloop, HeroModel owns responsive room transforms, HeroLights owns lights, Room renders GLTF meshes.
- The hero auto-rotates the camera, never the model group: the lights are world-space and turning the room sweeps them across it. Keep the rotation off under reduced motion and while the hero is off screen, and keep the explicit frame request that restarts R3F's cancelled loop on return. See DESIGN_SYSTEM.md for the values and the two accepted limits.
- Keep GLB, texture, camera, lighting, material values, orbit limits, model scale/position and render settings unless the requested change requires otherwise. Compare loaded scene screenshots at matching camera/zoom and timing before accepting a scene change. Test orbit and remount/resize behavior.
- Use declarative lights/materials instead of allocating `new THREE.*` during render. Room's `OwnedMaterial` cleans up only its own material; `dispose={null}` protects GLTF cache geometry/materials. Do not dispose shared textures or cached resources from an individual mount.
- Preserve Room's direct texture binding in `OwnedMaterial.onUpdate`: the original texture color space is intentional compatibility behavior. Replacing it with a JSX `map` prop activates R3F's automatic sRGB conversion and changes the room colors. Any color-space migration needs its own visual comparison.
- Keep EffectComposer/SelectiveBloom even at intensity 0 until a before/after rendered comparison proves removal preserves color/output. Do not infer that zero bloom makes the entire postprocessing pipeline inert.
- `Room.jsx` remains generated JavaScript with a public `Room.d.ts`. The implementation is not fully TypeScript checked; do not report otherwise. R3F is for the scene; shadcn/Tailwind govern DOM UI.

## Dependencies, verification and completion

- Use npm and `package-lock.json`. Add a dependency only for a concrete unmet need, declare directly imported packages explicitly, and update the lockfile through npm. Avoid unrelated upgrades; removing dead imports does not prove a bundle-size reduction.
- Before deletion check imports, dynamic asset paths, data fields, GLTF/texture references, Next conventions and metadata. Keep used project images, avatar, model and texture. `app/favicon_io/` is retained source material, not currently linked metadata; deliberate icon work must account for its manifest paths.
- Run from the repository root:

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run verify:build
npm run test:e2e
npm run start
```

`verify:build` requires a fresh production build and uses Node's built-in test runner on generated HTML. It does not launch a browser. `start` serves that build; `dev` uses Next's development server. On Windows where PowerShell blocks npm scripts, use `npm.cmd`/`npx.cmd` instead of changing execution policy. `npx tsc --noEmit` is equivalent to `npm run typecheck`.

`test:e2e` also requires a fresh build. Playwright starts/reuses a local production server on port 3001. Set `PLAYWRIGHT_CHANNEL=chrome` to use an installed Chrome (the verified local setup); otherwise install Playwright Chromium with `npx playwright install chromium`. In PowerShell use `$env:PLAYWRIGHT_CHANNEL='chrome'` before `npm.cmd run test:e2e`. Browser tests require access to the existing Google Fonts URLs and check that both actual families loaded. They cover the six widths, image loading, console errors, menu/focus/resize, clipboard outcomes, no-JS/reduced motion, hover/scroll spy, short landscape and orbit. Retained failure screenshots/traces go in ignored `test-results/`. Before/after captures go in ignored `.verification/`; do not confuse baseline copies there with active source.

- Content/structure changes: lint, typecheck, production build and HTML smoke checks; verify affected copy/links/assets. UI/CSS/interaction changes additionally need `test:e2e` and the visual matrix above. Scene changes additionally need matching rendered scene comparisons and resource lifecycle checks. Add focused behavior tests when useful; do not add a large suite merely for file moves.
- Documentation-only changes: validate referenced files, scripts and local links against the repository; broader code checks are needed only if code/configuration also changed.
- A task is done when implementation, appropriate successful verification and affected documentation are complete. Report any blocked/unrun check explicitly and do not label it passed. Keep permanent rules here/design guide; record operation-specific changes and results in refactor notes.
