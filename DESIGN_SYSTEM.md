# Nocturne design system — implemented specification

This document describes the final implementation, replacing the conflicting historical design-board amendments. It was checked in local headless Chrome at six widths with the original fonts loaded and before/after captures; results and limits are recorded in [docs/REFACTOR_NOTES.md](docs/REFACTOR_NOTES.md).

Use [AGENTS.md](AGENTS.md) for working rules and the required verification matrix. Preserve the existing visual identity and content. New features should use the same system; do not reintroduce a footer, theme toggle, statistics strip, HUD panels, typewriter, scanlines or grid backdrop as cleanup.

## Palette and styling source

[app/globals.css](app/globals.css) owns the dark-only `:root` variables and Tailwind v4 `@theme inline` mappings. Utility names use these semantic tokens; effect CSS references the same variables. There is no independent light palette or runtime theme provider.

| Token / Tailwind suffix | Value | Use |
| --- | --- | --- |
| background | #0b0c14 | page and fullscreen menu |
| foreground | #e9e9ed | main text, hero name |
| card | #161826 | surfaces inside project illustrations |
| image-well | #0f111c | illustration browser-frame background |
| primary / ring | #9184d9 | outline, focus, rules, glyphs, eyebrows |
| accent-light | #d2cefd | status dot, active/hover links, active index number, gradient midpoint |
| muted-foreground | rgba(233,233,237,0.60) | descriptions and secondary text |
| ink-tertiary | rgba(233,233,237,0.45) | chips and metadata |
| ink-quaternary | rgba(233,233,237,0.35) | internal-project explanation |
| hero-subline | rgba(233,233,237,0.78) | text over the model |
| hard-part | #dedaf7 | hard-part sentence |
| field | #262a60 | saturated indigo field inside illustrations (store banner, timetable block); formerly the ticker band |
| border | rgba(233,233,237,0.16) | illustration frames, next-project rules and fading dividers |
| input | rgba(233,233,237,0.22) | icon and secondary-button border |
| title-start | #f2f1f7 | project title gradient's first stop |
| icon-hover | rgba(233,233,237,0.07) | icon button hover |
| contact-hover | rgba(145,132,217,0.06) | Contact row, project index row and next-project hover tint; active index row |

Primary-button hover mixes primary 12% into transparent. Project title gradient is 104deg, title-start at 0%, accent-light at 52%, primary at 100%. The same gradient marks the active index row title (from 1024px) and the next-project title. Hero name and case-study h1 stay flat. No lift, scale or shadow is part of the design. Row and fact rules use foreground at 10–12% so they sit under the 16% section dividers.

`--radius: 0.65rem` maps to `rounded-lg` (10.4px at the default 16px root). This preserves the actual pre-refactor CSS; older 8px specifications did not match it. Avatar remains circular, 26px, rather than the obsolete 28px square mark. Borders are 1px; focus outlines are 2px with 2px offset. There are no box shadows; the hero name has the sole text shadow, `0 1px 34px rgba(8,9,15,0.5)`.

## Typography and motifs

Only Inter (400/500/600) and Share Tech Mono are loaded, in globals.css. `font-sans` maps to Inter; `font-mono` maps to Share Tech Mono. The root body explicitly retains mono, matching the former inherited font. Geist font variables were never applied as families and are removed.

| Content | Actual family | Mobile → md (768px+) |
| --- | --- | --- |
| Hero name | Inter, 500, uppercase | fitted up to 46px → fitted up to 104px; line 0.94 → 0.92; tracking -0.04em → -0.045em |
| Hero subline | Inter | 14 → 16px |
| Hero buttons | Inter, 500 | 15px, tracking 0.02em |
| Desktop nav | Inter | 12px, uppercase, tracking 0.18em |
| Mobile menu links | inherited Share Tech Mono | 27px, line 1, tracking -0.02em |
| Section titles | Inter, 500 | 27 → 34px; line 1.1, tracking -0.02em |
| Section descriptions | inherited Share Tech Mono | 14 → 15px; line 1.6; max 560px |
| About prose | inherited Share Tech Mono | 14.5/1.65 → 15/1.7; max 640px |
| Experience company | Inter, 500 | 22 → 27px; line 1.1 |
| Experience claim | inherited Share Tech Mono | 17.5 → 21px; line 1.45 |
| Experience details/chips and Skills rows | inherited Share Tech Mono | existing feature sizes, primarily 13–15px |
| Project index title | Inter, 500 | 21 → 24px; line 1.15 |
| Project index number/category | Share Tech Mono | 11px category (13px desktop number), uppercase, tracking 0.18em |
| Project index description | Inter | 14px; line 1.55 |
| Hero status line | Inter / Share Tech Mono | 14px values; 11px uppercase labels (NOW, BASED, SCROLL), tracking 0.20em |
| Case-study h1 | Inter, 500 | 46px → clamp(56px, 7vw, 88px); line 0.95; tracking -0.04em |
| Case-study lede | Inter | 17 → 20px; line 1.5; max 640px |
| Case-study prose | Inter | 16 → 17px; line 1.7; max 680px |
| Hard-part sentence | Inter | 14.5 → 15.5px; line 1.5 |
| Tech lists | Inter | 13px plain text with dot separators (15px in case-study facts) |
| Contact statement | inherited Share Tech Mono, 500 | 40 → 64px; line 1.05; tracking -0.03em |
| Contact values | inherited Share Tech Mono | 18 → 22px |

Explicit terminal accents remain numbered section eyebrows, index numbers, status-line labels and HARD PART labels. Eyebrows are 10 → 11px, uppercase with 0.20em tracking; HARD PART stays 10px. The ticker and its `System_*` vocabulary were removed with the redesign; do not reintroduce them. The former prohibition on all mono body text did not describe the built site and is superseded by the table above; do not silently change these assignments.

## Layout and responsive geometry

All widths include the complete border box. Breakpoints are defined in code, not left undefined between historical 390/1440 frames.

| Area | Implemented layout |
| --- | --- |
| Shared Container | width 100%, max 1160px, 18px inner gutter on each side, min-width 0 |
| Sections after Hero | 56px top and bottom padding; order About, Experience, Tech stack, Projects, Contact |
| SectionHeader | 14px stack gap, 27/34px title; callers add divider and 28px bottom padding where needed; About has no header divider |
| Hero | minimum max(560px, 100svh), flexible height if content needs more space; content is in normal flex flow over absolute model/scrim layers |
| Hero content | 20px side margins and 40px bottom margin above the status line; from 768px, 40px sides, max 780px and 56px bottom; 96px minimum top margin. The loaded 104px name needs about 753px, wider than the former 720px box. |
| Hero name fitting | clamp(30px, (100vw - 40px) / 7.3, 46px); from 768px clamp(46px, (100vw - 80px) / 7.3, 104px) |
| Hero stack | 18px gaps; CTAs add 6px above a wrapping row with 12px gaps; buttons 48px tall and social controls 48px square |
| Hero status line | in normal flow at the bottom of the hero, opaque background with a 12% top rule. Below 768px two stacked lines (availability, short NOW) with 18/22px vertical padding; from 768px one row, min 64px, 40px gaps, Scroll cue right; long NOW text from 1024px; BASED from 1280px, the first width where the row fits it. No motion. |
| Hero model layer | still stops 44/48px above the hero bottom as it did beside the ticker, so canvas size and framing are unchanged; the taller status line covers only the fully scrimmed strip |
| Drag hint | from 768px, 40px from the right and 88px from the hero bottom, above the scrims (z-10); appears when the model is ready and fades out after the first pointer-down on the scene; aria-hidden |
| Project index | ordered list of whole-row links with 10% rules. Below 768px: number + category line, title, description, then a "Case study" label with the arrow. From 768px: 44px number column, title/description, and a right column stacking category over the "Case study" label. The label is always visible (not hover-only), so touch readers know each row opens a page. From 1024px a preview column minmax(0, 420px) with a 56px gap, sticky at 120px |
| Case-study page | `/work/[slug]`, top padding 96 → 136px to clear the nav cap. Header wraps lede column (flex 999 1 560px) and facts list (flex 1 1 280px, max 340px). Sections: label rail (flex 1 1 220px, max 300px) beside prose (flex 999 1 560px, max 680px). Feature figures: drawing (flex 999 1 560px) beside caption (flex 1 1 280px), alternating sides and stacking drawing-first when they wrap |
| Navbar | relative 64px mobile cap, -64px bottom margin; sticky 140px cap from 768px, -140px bottom margin and 72px interaction row; 18/40px horizontal padding |
| Mobile menu | available below 768px; opaque background, fullscreen body portal above WebGL, 64px top row with Home and 44px close control; links spaced 28px starting 44px below row |
| Experience | stacked below 768px; 208px metadata rail plus minmax(0,1fr) with 32px gap from 768px; details use two flexible columns |
| Skills | stacked label/chips with 12px gap; from 768px 150px label rail plus 40px gap; row padding 22 → 24px |
| Contact | labels above values on mobile; at 768px label rail 100px and gap 20px; from 1024px rail 150px and gap 40px; values shrink/wrap; copy is separate 44 → 48px control |

### Project index, previews and case studies

The eight projects keep their order, copy and destinations. Each index row is a whole-row link to its internal case-study page (`/work/[slug]`, prerendered with `generateStaticParams`, `dynamicParams` false); external live/source links live on the case page. Project 2 has no public link, so its page shows the no-link explanation instead of a live button.

- Product visuals are drawn, not screenshots: `features/projects/components/illustrations/` renders a browser frame (16:10, `@container`) around a simplified screen in the site palette. Every length inside a drawing is in `cqw`, so one drawing scales from the 420px preview to the full-width case figure. Drawings are `role="img"` with a descriptive label; copy inside them is illustrative.
- The preview column shows the hovered or focused row's drawing, hard-part sentence, tech list and a "Read the full case study" link. The last active row persists, so the panel is never empty; project 1 is active before interaction and without JS. All eight previews are server-rendered in one grid cell and crossfade (opacity plus 8px rise, 320ms); inactive previews are `inert` and aria-hidden.
- Active-row styling (tint, gradient title, accent number and arrow) applies only from 1024px, where the preview exists. Below that, hover still tints the row.
- Case pages run: back link, eyebrow, h1, lede, live/source and Get in touch buttons, facts (role, platforms, stack, live/source — each only when known), main drawing, numbered sections (problem; what I built only when it adds to the lede), feature figures, hard parts, where it is now, next project (wrapping to the first).
- Do not wrap server-rendered content in `Reveal asChild`: Radix Slot drops a child that is still a streamed (lazy) RSC reference, which silently removed a case-study figure from the HTML. Wrap with `Reveal` instead.

Page overflow must be corrected at its source. Do not hide it on html/body/main. Intentional local clipping is limited to illustration frames, Avatar and the decorative scene layer (its scaling glow otherwise extends beyond the viewport); long labels/URLs must remain readable. The fullscreen menu can scroll vertically on short screens.

## Effects, motion and interaction

The common easing is `cubic-bezier(0.22, 0.61, 0.36, 1)` (`--ease-nocturne`). Shared recipes stay in globals.css.

- Hero bottom/left scrim stops are retained from the original implementation using #08090f. Nav cap uses alpha 0.55 at 0, 0.18 at 27px, 0 at 64px on mobile; desktop uses 60px/140px for the latter stops. No backdrop blur or new surface is introduced.
- Hero-only glow: primary 28% radial with a 16s drift, plus the black bottom radial. It must not spread to cards/buttons/section text.
- Nav loads at 0ms; name at 80ms (600ms duration); subline at 200ms; buttons at 300ms; status line at 420ms. Other ladder durations are 520ms; rise is 10px. Model opacity fades over 600ms when its Suspense readiness signal resolves, independently of this ladder.
- Reveals fire once on IntersectionObserver entry, 520ms opacity/12px rise with rootMargin `0px 0px -80px 0px`. Reveal delay classes represent 0/60/120/180ms, capped after index 3. Noscript CSS makes all reveal content readable.
- Sheet background enters/exits over 240ms. Links rise 8px over 480ms with 40ms steps through 160ms. Closing content becomes inert and aria-hidden while exit presence completes. Escape/close return to the trigger; selecting a section focuses it; resizing to desktop closes and focuses visible navigation.
- Nav inactive text is muted-foreground; hover/focus/active is accent-light. Scroll spy retains rootMargin `-70px 0px -60% 0px`. Header pointer-events are disabled outside its actual interactive row.
- Index and next-project rows tint over 480ms and the arrow translates 2px/-2px; the "Case study" label goes primary → accent-light on hover, focus-visible and the active row; the active index number and arrow colour change over 240ms. No transform is applied to the row itself. Primary-button arrow/tint uses 240ms. Contact row tint/arrow uses 480ms and value color 240ms; email starts at foreground, matching baseline.
- Copy glyph crossfade is 240ms, success resets after 1600ms. A persistent sr-only live region announces success/failure. Failure does not change row geometry.
- Reduced motion stops the glow and menu animations, makes preview switches instant, resolves reveals/load ladder immediately, removes arrow movement and clears transition delays. Color feedback is 150ms. A changed preference resolves reveals without replaying them; no-JS content remains readable. These behaviors have focused browser checks; they are not an accessibility certification or a screen-reader audit.

## Scene constraints

[features/hero/scene](features/hero/scene) retains the room and rendering inputs:

- Canvas camera position [0,15,20], fov 45. No renderer-color or postprocessing change. `frameloop` is `always` whenever the hero is on screen — R3F's default and the long-standing behaviour — and `never` only while an IntersectionObserver reports the model layer off screen, which skips useFrame and `gl.render` and lets R3F cancel its animation frame. That stopped loop does not restart by itself, so returning to the hero requests one frame explicitly; without that the room freezes on return under reduced motion, where no scene prop changes to restart it implicitly. Do not make the on-screen value anything but `always`.
- Orbit has no pan and no zoom at any width, with distance 5–20 and polar limits PI/5–PI/2. Mobile orbit remains enabled. Zoom was previously enabled above 1024px, where OrbitControls consumed the wheel as a dolly and blocked page scrolling; it is now off everywhere so the wheel always scrolls the page. Pinch-dolly goes with it, but that was already off at 1024px and below, so touch screens wider than 1024px are the only surface that loses it.
- The scene is a turntable, not static: `autoRotate` is on with `autoRotateSpeed` 0.4, turning the camera around the target while the lights stay fixed relative to the room. Rotating the model group instead would sweep the world-space spotlights and the #a259ff area light across the geometry, which was captured and is visibly worse. Auto-rotation is off entirely under `prefers-reduced-motion: reduce` and while the hero is off screen, and OrbitControls suppresses it during a drag, so a manual drag takes over and the drift resumes from the released angle. Azimuth is the only thing it changes; distance, polar limits and target are untouched.
- Two limits of that turntable are known and accepted, not oversights. `autoRotateSpeed` advances a fixed angle per frame with no delta-time term, so the rate scales with refresh rate: 0.4 is 2.4 degrees a second at 60Hz but 5.8 at 144Hz. And the room is a two-wall corner diorama open toward the default camera, so past roughly -45 to +30 degrees of azimuth its own walls occlude the interior and it reads as a black shell near 180 degrees. A full revolution therefore spends most of its time unreadable; bounding the sweep is a design decision that has not been taken.
- The distance limits are not dead once zoom is off. `update()` clamps the camera radius every frame, so `maxDistance` 20 pulls the initial `[0,15,20]` camera (radius 25) in to radius 20 and defines the framing actually rendered. Removing either limit changes the room's apparent size.
- Rotate-by-drag is retained on mouse and touch. The connected canvas wrapper keeps `touch-action: pan-y`, reapplied after OrbitControls' connect forces `none`, so a vertical swipe scrolls the page while a horizontal drag still orbits.
- Room scale is 0.9 at <=768px, 1.05 at <=1024px, otherwise 1.2; y is -3.2 at <=768px, otherwise -3.5; rotation y is -PI/4.
- Spotlights retain positions/colors/intensities 100/40/60; area light retains color #a259ff, dimensions 3x2 and final intensity 15; point lights retain intensity 10 each. Cyan/purple scene colors are not DOM UI tokens.
- GLB path `/Models/optimized-room.glb` and texture `/images/textures/mat1.png` remain. Owned materials dispose only themselves; cached GLTF resources/textures are retained. Composer and zero-intensity SelectiveBloom stay: no removal experiment was performed, and matching the existing output takes precedence over speculative cleanup.
- OwnedMaterial binds the texture directly during `onUpdate`, preserving the constructor-based baseline's texture color space. A JSX `map` assignment would trigger R3F's automatic sRGB conversion; do not substitute it silently.

The page ends after Contact's terminating divider and spacing. There is no footer and no form. Review all widths and states using AGENTS.md; source-derived dimensions and a successful production build do not establish visual parity.
