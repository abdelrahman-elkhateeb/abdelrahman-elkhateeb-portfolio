# Nocturne design system — implemented specification

This document describes the final implementation, replacing the conflicting historical design-board amendments. It was checked in local headless Chrome at six widths with the original fonts loaded and before/after captures; results and limits are recorded in [docs/REFACTOR_NOTES.md](docs/REFACTOR_NOTES.md).

Use [AGENTS.md](AGENTS.md) for working rules and the required verification matrix. Preserve the existing visual identity and content. New features should use the same system; do not reintroduce a footer, theme toggle, statistics strip, HUD panels, typewriter, scanlines or grid backdrop as cleanup.

## Palette and styling source

[app/globals.css](app/globals.css) owns the dark-only `:root` variables and Tailwind v4 `@theme inline` mappings. Utility names use these semantic tokens; effect CSS references the same variables. There is no independent light palette or runtime theme provider.

| Token / Tailwind suffix | Value | Use |
| --- | --- | --- |
| background | #0b0c14 | page and fullscreen menu |
| foreground | #e9e9ed | main text, hero name |
| card | #161826 | project surfaces |
| image-well | #0f111c | image loading background |
| primary / ring | #9184d9 | outline, focus, rules, glyphs, eyebrows |
| accent-light | #d2cefd | ticker text, active/hover links, gradient midpoint |
| muted-foreground | rgba(233,233,237,0.60) | descriptions and secondary text |
| ink-tertiary | rgba(233,233,237,0.45) | chips and metadata |
| ink-quaternary | rgba(233,233,237,0.35) | internal-project explanation |
| hero-subline | rgba(233,233,237,0.78) | text over the model |
| hard-part | #dedaf7 | hard-part sentence |
| ticker | #262a60 | the saturated ticker field |
| border | rgba(233,233,237,0.16) | card borders and fading dividers |
| input | rgba(233,233,237,0.22) | icon border and hovered card border |
| title-start | #f2f1f7 | project title gradient's first stop |
| icon-hover | rgba(233,233,237,0.07) | icon button hover |
| contact-hover | rgba(145,132,217,0.06) | Contact row hover/focus tint |

Card hover mixes primary 6% into card; primary-button hover mixes primary 12% into transparent. Project title gradient is 104deg, title-start at 0%, accent-light at 52%, primary at 100%. Hero name stays flat. No card lift, scale or shadow is part of the design.

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
| Lead project title | Inter, 500 | 21 → 34px |
| Other project titles | Inter, 500 | 21 → 27px |
| Project descriptions | Inter | 14 → 15px; line 1.6 |
| Hard-part sentence | Inter | 14.5 → 15.5px; line 1.5 |
| Project chips | Inter | 12 → 13px |
| Contact statement | inherited Share Tech Mono, 500 | 40 → 64px; line 1.05; tracking -0.03em |
| Contact values | inherited Share Tech Mono | 18 → 22px |

Explicit terminal accents remain the ticker, numbered section eyebrows and HARD PART labels. Eyebrows are 10 → 11px, uppercase with 0.20em tracking; HARD PART stays 10px. `System_*` vocabulary belongs only in the ticker. The former prohibition on all mono body text did not describe the built site and is superseded by the table above; do not silently change these assignments.

## Layout and responsive geometry

All widths include the complete border box. Breakpoints are defined in code, not left undefined between historical 390/1440 frames.

| Area | Implemented layout |
| --- | --- |
| Shared Container | width 100%, max 1160px, 18px inner gutter on each side, min-width 0 |
| Sections after Hero | 56px top and bottom padding; order About, Experience, Tech stack, Projects, Contact |
| SectionHeader | 14px stack gap, 27/34px title; callers add divider and 28px bottom padding where needed; About has no header divider |
| Hero | minimum max(560px, 100svh), flexible height if content needs more space; content is in normal flex flow over absolute model/scrim layers |
| Hero content | 20px side margins and 114px bottom margin; from 768px, 40px sides, max 780px and 178px bottom; 96px minimum top margin. The loaded 104px name needs about 753px, wider than the former 720px box. |
| Hero name fitting | clamp(30px, (100vw - 40px) / 7.3, 46px); from 768px clamp(46px, (100vw - 80px) / 7.3, 104px) |
| Hero stack | 18px gaps; CTAs add 6px above a wrapping row with 12px gaps; buttons 48px tall and social controls 48px square |
| Ticker | 44px tall below 768px, 48px from 768px; 11/12px mono, tracking 0.22/0.24em; duplicated track for seamless motion, second track aria-hidden |
| Navbar | relative 64px mobile cap, -64px bottom margin; sticky 140px cap from 768px, -140px bottom margin and 72px interaction row; 18/40px horizontal padding |
| Mobile menu | available below 768px; opaque background, fullscreen body portal above WebGL, 64px top row with Home and 44px close control; links spaced 28px starting 44px below row |
| Experience | stacked below 768px; 208px metadata rail plus minmax(0,1fr) with 32px gap from 768px; details use two flexible columns |
| Skills | stacked label/chips with 12px gap; from 768px 150px label rail plus 40px gap; row padding 22 → 24px |
| Contact | labels above values on mobile; at 768px label rail 100px and gap 20px; from 1024px rail 150px and gap 40px; values shrink/wrap; copy is separate 44 → 48px control |

### Project cards

The six original projects keep their order, images, full and abbreviated text and destinations. Project 2 is a noninteractive div with an explanation and no arrow. Others are whole-block external anchors, never nested buttons/links. Chips remain plain text, no filled badges.

- Outer card width at a fully expanded Container is **1124px** (1160 - 36 gutter). Card padding is 16px below 768px and 24px above, plus 1px borders.
- Lead image takes the complete inner width: **1074px** at the maximum container. It retains aspect 16:9 below 768px and 1112:420 above; the old 1112px physical-width claim was incorrect. At maximum width that ratio produces about 406px height.
- Subsequent cards stack below **1024px**. At 1024px and above, grid columns use **388:654** proportions and a 32px gap, alternating the image right/left starting with project 2 on the right.
- At maximum width: `1124 - 48 padding - 2 borders - 32 gap = 1042`, split into **388px image + 654px content**. Both tracks use minmax(0, …), so they shrink at smaller desktop widths. Row images retain 242px height at this breakpoint.
- The first card has 14 → 22px image/content gap; row cards have 14 → 32px. Content stacks use 12 → 13px gaps. Title and no-link note may wrap rather than overflow.
- Full/short copy switches at 768px, independently of the horizontal-layout breakpoint. Hard-part label/sentence stack below 1024px and align on a baseline above it. A lead description may use max-width 692px; this is a cap, not a forced row width.
- Next Image `sizes` follows the available inner width: mobile viewport -70px; stacked tablet viewport -86px; lead capped at 1074px; desktop row capped at 388px with an intermediate 34vw hint. Images retain object-cover and 0.78 resting opacity.

Page overflow must be corrected at its source. Do not hide it on html/body/main. Intentional local clipping is limited to image wells, Avatar, the ticker and the decorative scene layer (its scaling glow otherwise extends beyond the viewport); long labels/URLs must remain readable. The fullscreen menu can scroll vertically on short screens.

## Effects, motion and interaction

The common easing is `cubic-bezier(0.22, 0.61, 0.36, 1)` (`--ease-nocturne`). Shared recipes stay in globals.css.

- Hero bottom/left scrim stops are retained from the original implementation using #08090f. Nav cap uses alpha 0.55 at 0, 0.18 at 27px, 0 at 64px on mobile; desktop uses 60px/140px for the latter stops. No backdrop blur or new surface is introduced.
- Hero-only glow: primary 28% radial with a 16s drift, plus the black bottom radial. It must not spread to cards/buttons/section text.
- Nav loads at 0ms; name at 80ms (600ms duration); subline at 200ms; buttons at 300ms; ticker at 420ms. Other ladder durations are 520ms; rise is 10px. Model opacity fades over 600ms when its Suspense readiness signal resolves, independently of this ladder.
- Reveals fire once on IntersectionObserver entry, 520ms opacity/12px rise with rootMargin `0px 0px -80px 0px`. Card delay classes represent 0/60/120/180ms, capped after index 3. Noscript CSS makes all reveal content readable.
- Ticker runs linearly for 42s, or 34s at widths <=768px (at exactly 768px the band already uses its desktop height). This existing boundary distinction is retained.
- Sheet background enters/exits over 240ms. Links rise 8px over 480ms with 40ms steps through 160ms. Closing content becomes inert and aria-hidden while exit presence completes. Escape/close return to the trigger; selecting a section focuses it; resizing to desktop closes and focuses visible navigation.
- Nav inactive text is muted-foreground; hover/focus/active is accent-light. Scroll spy retains rootMargin `-70px 0px -60% 0px`. Header pointer-events are disabled outside its actual interactive row.
- Card hover tints background/border over 480ms, image opacity 0.78 → 1, arrow translates 2px/-2px. No transform is applied to the card/image itself. Primary-button arrow/tint uses 240ms. Contact row tint/arrow uses 480ms and value color 240ms; email starts at foreground, matching baseline.
- Copy glyph crossfade is 240ms, success resets after 1600ms. A persistent sr-only live region announces success/failure. Failure does not change row geometry.
- Reduced motion stops ticker/glow and menu animations, resolves reveals/load ladder immediately, removes arrow movement and clears transition delays. Color feedback is 150ms. A changed preference resolves reveals without replaying them; no-JS content remains readable. These behaviors have focused browser checks; they are not an accessibility certification or a screen-reader audit.

## Scene constraints

[features/hero/scene](features/hero/scene) retains the room and rendering inputs:

- Canvas camera position [0,15,20], fov 45. No frameloop, renderer-color or postprocessing change.
- Orbit has no pan and no zoom at any width, with distance 5–20 and polar limits PI/5–PI/2. Mobile orbit remains enabled; the old auto-spin/orbit-off note was inaccurate. Zoom was previously enabled above 1024px, where OrbitControls consumed the wheel as a dolly and blocked page scrolling; it is now off everywhere so the wheel always scrolls the page. Pinch-dolly goes with it, but that was already off at 1024px and below, so touch screens wider than 1024px are the only surface that loses it.
- The distance limits are not dead once zoom is off. `update()` clamps the camera radius every frame, so `maxDistance` 20 pulls the initial `[0,15,20]` camera (radius 25) in to radius 20 and defines the framing actually rendered. Removing either limit changes the room's apparent size.
- Rotate-by-drag is retained on mouse and touch. The connected canvas wrapper keeps `touch-action: pan-y`, reapplied after OrbitControls' connect forces `none`, so a vertical swipe scrolls the page while a horizontal drag still orbits.
- Room scale is 0.9 at <=768px, 1.05 at <=1024px, otherwise 1.2; y is -3.2 at <=768px, otherwise -3.5; rotation y is -PI/4.
- Spotlights retain positions/colors/intensities 100/40/60; area light retains color #a259ff, dimensions 3x2 and final intensity 15; point lights retain intensity 10 each. Cyan/purple scene colors are not DOM UI tokens.
- GLB path `/Models/optimized-room.glb` and texture `/images/textures/mat1.png` remain. Owned materials dispose only themselves; cached GLTF resources/textures are retained. Composer and zero-intensity SelectiveBloom stay: no removal experiment was performed, and matching the existing output takes precedence over speculative cleanup.
- OwnedMaterial binds the texture directly during `onUpdate`, preserving the constructor-based baseline's texture color space. A JSX `map` assignment would trigger R3F's automatic sRGB conversion; do not substitute it silently.

The page ends after Contact's terminating divider and spacing. There is no footer and no form. Review all widths and states using AGENTS.md; source-derived dimensions and a successful production build do not establish visual parity.
