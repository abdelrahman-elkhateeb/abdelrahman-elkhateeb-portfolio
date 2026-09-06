# Portfolio redesign — locked design system

Derived from what exists in the built screens: the Cinema hero and project cards (2a, over
both camera angles), and the Experience section (3a, "one claim per role"). Anything not
present in those screens is marked **undefined** — do not invent a value for it, ask.

Board chrome (the `2a`/`3a` badges, the "Scrim spec" panel, the `<HeroModel />` placeholder
labels, the 1440/390 frame borders) is annotation, not part of the site. Excluded from all
tables below.

---

## 1. Palette

| Token | Hex / value | Role |
| --- | --- | --- |
| Page background | `#0b0c14` | The page. Every section sits directly on this. |
| Surface | `#161826` | Framed containers only (the hero viewport frame). Cards do **not** use it. |
| Image well | `#0f111c` | Behind screenshots, visible only while the image loads. |
| Scrim ground | `#08090f` | The hero legibility scrim. Never used as a fill anywhere else. |
| Band field | `#262a60` | The one saturated field on the page: the 48px hero ticker band. |
| Primary text | `#e9e9ed` | Hero name, card titles' light stop, nav, button labels. |
| Secondary text | `rgba(233,233,237,0.60)` | Card descriptions, body copy. |
| Tertiary text | `rgba(233,233,237,0.45)` | Tech chips, meta. |
| Quaternary text | `rgba(233,233,237,0.35)` | Smallest labels. Never for a sentence. |
| Hero subline | `rgba(233,233,237,0.78)` | Only the line under the hero name (it fights a lit model). |
| Hard-part text | `#dedaf7` | The hard-part sentence. Its own value — brighter than description, dimmer than title. |
| Accent | `#9184d9` | Outlines, rules, mono labels, arrow glyphs, gradient end stop. |
| Accent light | `#d2cefd` | Type on the band field; gradient mid stop. Use this, not `#9184d9`, for accent text at paragraph size. |
| Hairline / divider | `rgba(233,233,237,0.16)` | Card dividers, panel borders. |
| Interactive border | `rgba(233,233,237,0.22)` | Secondary/icon button borders. |
| Card hover tint | `rgba(145,132,217,0.06)` | Whole-card hover. |
| Button hover tint | `color-mix(in srgb, #9184d9 12%, transparent)` | Accent-outlined button hover. |

**Card title gradient** — `linear-gradient(104deg, #f2f1f7 0%, #d2cefd 52%, #9184d9 100%)`,
clipped to text (`background-clip: text; color: transparent`). Card titles only.

`#4cc9f0` (monitor cyan) was read off the model's light rig and is **not used in UI** — it
appears only inside the reserved model box. Keep it there.

## 2. Typography

Two families. **There is no serif, and no third family.**

| Slot | Family | Size / line / tracking / weight |
| --- | --- | --- |
| Hero name | Inter | 104 / 0.92 / −0.045em / 500, uppercase |
| Hero subline | Inter | 16 / 1.0 / 0 / 400 |
| Hero nav | Inter | 12 / 1.0 / 0.18em / 400, uppercase |
| Button label | Inter | 15 / 1.0 / 0.02em / 500 |
| Card title | Inter | 27 / 1.1 / −0.02em / 500, sentence case |
| Card description | Inter | 15 / 1.6 / 0 / 400 |
| Hard-part sentence | Inter | 15.5 / 1.5 / 0 / 400 |
| Hard-part label | Share Tech Mono | 10 / 1.0 / 0.20em / 400, uppercase |
| Tech chips | Inter | 13 / 1.0 / 0 / 400 |
| Ticker band | Share Tech Mono | 12 / 1.0 / 0.24em / 400, uppercase |

Inter weights loaded: 400, 500, 600. 600 is loaded but unused so far — don't reach for it
without a reason; hierarchy here is size and colour, not weight.

**Sans (Inter)** — everything: all headings, all body, all buttons, all nav, all chips,
all numbers.
**Mono (Share Tech Mono)** — only the two slots in the table above, governed by §6.
**Serif** — none. Not undefined: excluded.

Uppercase is a separate budget from mono: hero name, hero nav, and mono labels. Nothing else
is uppercase — card titles are sentence case, descriptions are sentence case.

## 3. Backgrounds & surfaces

| | Value |
| --- | --- |
| Page | flat `#0b0c14`. No gradient, no grid overlay, no scanlines. |
| Cards (Turn 6, amended) | **`#161826`** — the card takes a surface. See the amended §4 row below for the full spec. |
| Card separation | cards no longer separate by a hairline *between* them — each card carries its own full `1px solid rgba(233,233,237,0.16)` border on all four sides instead (radius 8). `.nx-divider` (the fading hairline recipe below) is still the page's one divider primitive, used under section headers and between rail rows (Experience, Tech stack) and Contact rows — just no longer between project cards. |
| `.nx-divider` recipe | `linear-gradient(to right, transparent, rgba(233,233,237,0.16) 48px, rgba(233,233,237,0.16) calc(100% - 48px), transparent)`, 48px fade (24px at ≤640px). |
| Elevation | still none. Zero `box-shadow` anywhere. The only shadow of any kind is the hero name's `text-shadow`. **§8 is not amended by the card surface**: a card takes a fill, but it never floats — no shadow, no lift, no scale on hover, ever. |
| Hero | the model canvas *is* the surface, full bleed, plus the scrim (§8). |

## 4. Buttons / links / chips

| Variant | Spec | Hover |
| --- | --- | --- |
| Primary (accent outline) | 48px tall, `0 24px`, radius 8, `1px solid #9184d9`, label `#9184d9` 15/500, trailing 15px arrow | background `color-mix(#9184d9 12%, transparent)`, arrow translates `2px, -2px` over 240ms |
| Icon button | 48 × 48 (44 × 44 at the mobile-nav trigger and the Contact copy button — the touch floor, the one place this size changes), radius 8, `1px solid rgba(233,233,237,0.22)`, glyph 19px `#e9e9ed` | background `rgba(233,233,237,0.07)` |
| Card (whole-block link), Turn 6 amended | Surface `#161826`, `1px solid rgba(233,233,237,0.16)` border, radius 8, padding `24px` all round (`16px` at 390). No underline. A bare 18px (16px at 390) accent arrow glyph sits top-right of the title row, translating `2px, -2px` on hover over 480ms — same gesture the primary button's arrow now also carries. Project 2 (no public link) renders the identical surface as a plain `<div>`: no arrow, no hover tint, no cursor change, not focusable — a quiet Inter line at ink-35 states why instead. | background `color-mix(in srgb, #9184d9 6%, #161826)` (the old ground-relative 6% tint, recomposited against the surface instead — same token, same percentage, no new colour), border brightens to `rgba(233,233,237,0.22)`, both over 480ms. Card image lifts `opacity: 0.78 → 1` over the same 480ms — a veil, not a zoom. |
| Chip (tech) | **plain text.** 13px, `rgba(233,233,237,0.45)`, separated by `·` at 0.4 opacity. No fill, no border, no radius, no padding, not interactive. | none |

There is **no solid-filled button** anywhere. A chip is distinguishable from a button because
it has no box at all — the moment a tech chip gets a border or a background it reads as a
button and the rule is broken.

**Card composition (Turn 6, direction A — "editorial: one lead, five rows").** Project 1 runs
full-width with its image on top (1112 × 420 at 1440, 16:9 at 390); projects 2–6 run as
horizontal rows with the image alternating left/right per row (row 1 of the five — project 2 —
reversed first), collapsing to a single column with the image on top at 390, no alternation.
Direction B (uniform rows, no lead card) was drawn, compared, and rejected — it isn't kept
behind a flag or a variant prop. See §7 for the column arithmetic and §9 for the reveal/stagger
timing.

Focus rings (Turn 6, built): `:focus-visible { outline: 2px solid #9184d9; outline-offset: 2px; }`
is now a genuine global rule, covering every interactive element site-wide — including the
whole-card link, the mobile-menu trigger and its links, and every Contact row.

## 5. Section titles

Defined by the 3a Experience direction (Turn 3 of the Design project) and carried over to
Projects for consistency. Every section header is three stacked pieces, 14px gap, inside the
1160/390 content column:

| Piece | Spec |
| --- | --- |
| Eyebrow | The mono slot from §6(c): `Share Tech Mono`, 11px desktop / 10px mobile, `0.20em`, uppercase, accent `#9184d9`. **Content is a two-digit page-order number** (`01`, `02`, …), not a word — see the numbering rule below. |
| Title | Inter, sentence case, flat `#e9e9ed` (never the card-title gradient), 500 weight, `-0.02em`. 34px desktop / 27px mobile, line-height 1.1. |
| Description (optional) | Inter, `rgba(233,233,237,0.60)`, 15px desktop / 14px mobile, line-height 1.6, `max-width: 560px`. One sentence — a summary, not a repeat of the title. |

A fading `nx-divider` hairline sits directly under the block, before the section's first
content row.

**Numbering rule.** The eyebrow number is the section's position in `app/page.tsx`'s stack,
counting only sections below the hero (the hero has no heading — the name is the heading, so
it takes no number): `01` About · `02` Experience · `03` Skills · `04` Projects · `05` Contact.
Experience and Projects use `02` and `04` respectively, not `01`/`02`, precisely so the numbers
stay stable as the remaining sections adopt the same header.

**Consistency rule — no exceptions once a section has this header.** If any one section under
the locked spec carries the numbered eyebrow, every section that has a title must carry it,
styled identically. Don't ship a page where one section is numbered and its neighbor just has
a bare `<h2>` — that reads as an accident, not a choice. (About, Skills, and Contact don't have
this header built yet; when they do, they take `01`, `03`, `05` and the same three-piece spec
above — not a variant.)

## 6. Terminal motif — the hard rule

The whole reason this direction was chosen is that the terminal language is **compressed into
one place**. Quantitatively, as built:

- Hero: **1** terminal element (the 48px ticker band). Nothing else in the hero is mono.
- Card: **1** terminal element (the 10px `HARD PART` label), repeated once per card because
  it is the same slot, not a new one.

Rules for the rest of the page:

1. **Whitelist of three slots. Nothing outside it.** (a) The hero ticker band — one per page,
   hero only, 48px, mono 12/0.24em, `#d2cefd` on `#262a60`. (b) The hard-part label inside a
   project card. (c) A section eyebrow label above a section title — max one per section,
   ≤11px, 0.20em, uppercase, accent.
2. **Per section: 0 or 1 mono element.** The project list is the single exception: one label
   per card, because it is slot (b) repeating down a list.
3. **Page total: 6 mono elements maximum**, ticker included. If a new section wants a seventh,
   an existing one gives up its label.
4. **Viewport rule:** never more than 2 mono elements visible at once at 1440 × 840.
5. **`System_*` vocabulary lives only inside the ticker band.** Not in headings, not in
   status lines, not in the footer, not as a card status.
6. **Forbidden entirely, everywhere:** mono headings of any level; mono body copy or
   descriptions; mono button labels; mono nav; mono chips or tech lists; mono form labels,
   inputs, or placeholders; mono numbers, stats, or dates; mono footer; mono captions.
7. **Retired effects — do not reintroduce:** the typewriter caret, blinking status dots
   (there are none in the locked hero), HUD corner brackets, scanline overlays, the animated
   scan bar, the grid overlay, and per-card `SYSTEM_READY` footers. Each of those belonged to
   a direction that wasn't picked.

Practical test before adding any mono: name which of the three whitelisted slots it is. If it
isn't one of them, it's Inter.

## 7. Spacing & density

Scale in use (px): **6 · 8 · 12 · 13 · 14 · 16 · 18 · 22 · 24 · 28 · 32 · 40 · 44 · 48 · 56**
(Nocturne's 0.7× density — deliberately compact).

| Measure | Value |
| --- | --- |
| Page gutter, desktop | 40px (hero), 18px inside the 1160 card column |
| Card padding (Turn 6, amended) | `24px` all round at desktop, `16px` at 390 — was `24px 18px` before the card took a surface. |
| Card columns (Turn 6, amended) | image **388 × 242** (1.6 ratio), gap 32, content column **692** — at 1160 total: `1160 − 48 (24px padding × 2) − 32 (gap) = 1080`... the column itself is fixed at 692 and the image absorbs the remaining space, so **the image took the loss, not the column**: 1160 − 48 − 32 − 692 = 388, down from the pre-surface 400. §7's 692px content column is unchanged and still load-bearing — the hard-part sentence still measures two lines at ~150 characters. The lead card's image runs full width instead: 1112 × 420 (1160 − 48 padding), same 388-width math applied to the row cards only. |
| Card content stack | 13px gap; +5px extra before the chips row |
| Hard-part label → sentence | 14px gap, baseline-aligned |
| Hero name → subline → buttons | 18px, then 6px extra above the buttons |
| Hero name block → ticker band | 130px from the band top edge |
| Between major sections | 56px (the board's own section rhythm); **44px** between blocks inside a section |

The 692px content column is load-bearing: it is what keeps a hard-part sentence at two
lines. Don't narrow it, and cap hard-part copy at **~150 characters** — 167 characters wrapped
to three lines and had to be cut.

## 8. Borders / gradients / glow

| | Value |
| --- | --- |
| Border weight | 1px. Only. No 2px anywhere in the locked direction. |
| Radius | 8px — cards, images, buttons, icon buttons. (The 4px radius belonged to the spec-sheet direction; it's out.) |
| Gradients, text | one: the card title gradient (§1). |
| Gradients, surface | one family: the hero scrim, all stops mixed from `#08090f`. |
| Glow | permitted **only inside the hero model box**: `radial-gradient(40% 46% at 50% 42%, color-mix(#9184d9 28%, transparent), transparent 70%)`, plus a black bottom radial for weight. |
| Shadow | none, except `text-shadow: 0 1px 34px rgba(8,9,15,0.5)` on the hero name. |

Glow is **forbidden** on cards, images, buttons, text, chips, section titles, and any future
container. It is a property of the 3D scene, not of the interface.

**Hero scrim (verbatim, three stacked layers over the model, under the nav and name, above
nothing else):**

```
/* bottom lift */
linear-gradient(to top, rgba(8,9,15,0.92) 0%, rgba(8,9,15,0.86) 13%,
  rgba(8,9,15,0.71) 26%, rgba(8,9,15,0.48) 39%, rgba(8,9,15,0.26) 52%,
  rgba(8,9,15,0.10) 66%, rgba(8,9,15,0.02) 78%, rgba(8,9,15,0) 88%)
/* left wash, for the name column */
linear-gradient(to right, rgba(8,9,15,0.58) 0%, rgba(8,9,15,0.34) 22%,
  rgba(8,9,15,0.14) 40%, rgba(8,9,15,0) 60%)
/* nav cap */
linear-gradient(to bottom, rgba(8,9,15,0.55) 0%, rgba(8,9,15,0.18) 60px,
  rgba(8,9,15,0) 140px)
```

Eight eased stops, not a two-stop ramp — that's what prevents banding across 792px. The scrim
is the page ground colour, never grey: that's why it vanishes on a dark camera angle and only
appears where the model is bright. It sits above the model and below the ticker band, and is
`pointer-events: none` so it never intercepts orbit drags.

## 9. Motion (Turn 6 — replaces the v1 sketch above wholesale)

Character unchanged: slow, weighted, single-axis — the pace of the model's orbit damping.
Nothing bounces, nothing overshoots, nothing blinks. One easing token, everywhere:
`cubic-bezier(0.22, 0.61, 0.36, 1)`.

**Duration ladder.** 240ms interaction feedback (hover colour/background) · 480ms considered
state change (card tint, card border, card image veil, card/contact arrow) · 520ms entrance ·
600ms reserved for exactly two things — the hero name and the model canvas's arrival — because
they're the two largest things that move.

**Load ladder — hero only, fixed CSS-animation delays, fires once on first paint:**

| Element | Delay | Duration |
| --- | --- | --- |
| Sticky nav row | 0ms | 520ms |
| Hero name | 80ms | **600ms** |
| Hero subline | 200ms | 520ms |
| Hero buttons | 300ms | 520ms |
| Ticker band | 420ms | 520ms |
| Model canvas | *on readiness signal, not a fixed delay* | **600ms**, opacity only |

The model canvas sits outside the ladder: it fades in over 600ms whenever its own readiness
signal fires (the `<Suspense>` boundary around `HeroModel` resolving — the same mechanism that
already suspends on `useGLTF`), never a timeout. A slow model delays nothing else; a fast one
never races the type. All five ladder steps animate `opacity` + a 10px rise on one axis via a
pure CSS `@keyframes` animation (`animation-fill-mode: both`), so the load ladder needs no JS
and never flashes unstyled content — the 0% keyframe frame *is* the initial state.

**Scroll entrances.** Each section resolves as one 520ms fade-and-12px-rise, firing once via
`IntersectionObserver` and then unobserving — never replayed on scroll-back. Initial hidden
state lives in CSS keyed off a `data-reveal` attribute (never inline), so there's no flash of
positioned content before hydration; a `<noscript>` override resolves every reveal to its final
state so the page is fully readable with JavaScript off.

**Stagger cap — project cards.** 60ms per card, capped at **3 steps / 180ms total**: delay =
`Math.min(index, 3) * 60ms` (0, 60, 120, 180…), so cards 4, 5 and 6 all land on the same final
180ms step and the list can never ripple longer as it grows. (The frame's own annotation says
"`Math.min(index, 2)`"; built as `Math.min(index, 3)` instead, because the frame's own worked
example — card 6, at stagger index 5, landing at 180ms "alongside card 4" — only holds with a
cap of 3, and cards 4–6 sharing the final step requires four distinct delay values, 0/60/120/180,
not three. Built to match the frame's demonstrated behaviour over its prose.)

**Scroll-spy.** Desktop nav only (the mobile nav is an overlay, not a persistent bar), tracked
via `IntersectionObserver` with `rootMargin: "-70px 0px -60% 0px"` against each section id;
active link colour is `#d2cefd`, 240ms.

**Mobile menu.** Ground opacity 0 → 1 over 240ms. Links ride up from `translateY(8px)` over
480ms each, 40ms apart (5 links = 160ms end to end).

**Hover / interaction (unchanged from v1, now itemised):** card surface + border-colour tint
480ms; card image veil (opacity 0.78 → 1) 480ms; card/contact/button arrow glyph translate
`2px, -2px` 480ms (card, contact row) or 240ms (primary button, to match the button's own
faster feedback duration); icon-button and nav-link colour/background 240ms; Contact row value
colour (ink-60 → `#d2cefd`) 240ms; copy-icon crossfade 240ms, reverting 1.6s after a copy.

**Ambient loops, unchanged:** `glowDrift` 16s ease-in-out infinite (hero model box only) ·
`tickerRun` 42s linear infinite, 34s at 390. Linear on purpose — a ticker that eases reads as
broken.

**Performance.** Only `transform` and `opacity` animate, never layout properties. Every reveal
disconnects its own observer once fired. Nothing below the fold animates before it enters the
viewport. The scroll-spy and every reveal read from `IntersectionObserver`, never a scroll
event handler — no layout thrash on scroll.

**Reduced motion — a different design, not a subtraction.** Under
`@media (prefers-reduced-motion: reduce)`: both ambient loops (`tickerRun`, `glowDrift`) stop
entirely, the band holding its first frame of readable copy and the glow at rest; every load-
ladder and scroll-reveal element resolves to its final state instantly — CSS-forced (`opacity: 1
!important; transform: none !important`), so nothing is ever hidden or removed, and no
`IntersectionObserver` is even created for reveals; hover colour/background transitions survive,
cut to 150ms; **delays collapse to zero, not just durations** — a delay communicates nothing on
its own, so someone asking for less motion shouldn't wait through one; the mobile menu still
opens, just without the link transform. The scrim is never touched anywhere in this — it's
legibility, not decoration.

## 10. Mobile

The locked combination was built at 1440 only, so this section is **partly undefined**.
Carried over from the mobile frames of the two directions we drew from, as provisional:

| | Provisional value |
| --- | --- |
| Widths built | 390 (mobile), 1440 (desktop). Breakpoints between them: undefined. |
| Hero, model | full-bleed band 390 × 560, name block bottom-left inside it, orbit off / slow auto-spin |
| Hero, name | 46 / 0.94 / −0.04em / 500, uppercase; subline 14px |
| Hero, ticker band | 44px tall, mono 11 / 0.22em, `tickerRun` 34s |
| Hero, buttons | full-width primary, 48px tall; icon buttons drop to a row of two |
| Card | single column: image on top at 4:3 or 16:9, then title 20–21px, description 14px, chips 12px |
| Card padding | 16–18px |

Two things needed deciding; both are now settled (Turn 6):

1. **The hard-part line at 390 — settled.** The label moves above the sentence instead of
   beside it, the sentence runs at 14.5/1.5, and every project carries a ≤100-character mobile
   variant of both its description and its hard-part sentence (`descriptionShort` /
   `hardPartShort` in `lib/index.ts`) alongside the full desktop copy. Both variants ship in the
   markup; only one is visible per breakpoint.
2. **The scrim at 390.** Still as shipped in the locked hero — unchanged by Turn 6.

## 11. Navbar — persistent, sticky

**No new surface.** The scrim's third layer (the nav cap) is **re-parented** from the hero onto
the sticky nav element, values byte-identical:
`linear-gradient(to bottom, rgba(8,9,15,0.55) 0%, rgba(8,9,15,0.18) 60px, rgba(8,9,15,0) 140px)`.
Over the hero this renders exactly as the locked build did; after scroll the same fade takes
incoming content to the ground before it reaches the labels. §8's one surface-gradient family is
unchanged — no bar, no fill, **no `backdrop-filter`**, no second cap.

| | Value |
| --- | --- |
| Element | 140px tall, `position: sticky; top: 0`, `margin-bottom: -140px` so it overlays rather than occupies. `pointer-events: none` on the element, `auto` on the row. |
| Row | top 72px of the element, `padding: 0 40px`, mark left / links right |
| Type | Inter 12 / 1.0 / 0.18em / 400, uppercase. **Not mono** — does not count against the §6 budget. |
| Links | About · Experience · Tech stack · Projects · Contact. **No section numbers** — those would be mono. |
| Inactive | `rgba(233,233,237,0.60)` |
| Active / hover | `#d2cefd`, 240ms `cubic-bezier(0.22, 0.61, 0.36, 1)`. Colour only — no underline, no dot, no sliding indicator. |
| Mark | 28px portrait at **radius 8** + `AK` at nav type spec, 12px gap. Not a circle: 8px is the only radius in the system. |

Active state is `#d2cefd`, not `#9184d9` — §1 already reserves the light stop for accent *text*;
`#9184d9` stays on outlines, rules and glyphs.

**At 390 the nav does not persist — but it now opens (Turn 6, reversed).** The v1 call was "no
mobile nav, no hamburger," on the grounds that an overlay/close/dialog pattern would cost more
than this system had built. That refusal is reversed: the hero's static top row (mark only,
64px, 18px gutter) now also carries a 44 × 44 §4 icon-button trigger, opening a full-screen
overlay menu. The costs the v1 decision refused are accepted:

| | Value |
| --- | --- |
| Trigger | §4 icon button, 44 × 44 (the touch-floor size), two 1px rules for a closed glyph, an × for open. `aria-expanded`, `aria-controls="mobile-menu"`. |
| Overlay ground | the page ground `#0b0c14`, full opacity — **no new surface colour, no lighter panel fill, no `backdrop-filter`** (still forbidden). The hero underneath is gone, not blurred. |
| Overlay mount | rendered through a portal straight onto `<body>`, not nested inside the sticky/relative nav element. Nesting it there let the hero's WebGL canvas visually bleed through the overlay despite correct `opacity`/`z-index`/background — a browser GPU-compositing quirk with promoted canvas layers, not a CSS mistake. Portalling out from under the canvas's ancestor chain is the fix; if a future overlay needs the same ground, mount it the same way. |
| Links | About · Experience · Tech stack · Projects · Contact — sentence case, Inter, 27px, zero mono, no section numbers. Same content as the desktop nav. |
| Motion | ground fades 0 → 1 over 240ms; links ride up from `translateY(8px)` over 480ms, 40ms apart. See §9. |
| Accessibility | focus moves into the panel on open (first focusable element), is trapped while open (`Tab`/`Shift+Tab` cycle within the panel), `Escape` closes and returns focus to the trigger, background scroll is locked (`document.body.style.overflow`) while open. `role="dialog"`, `aria-modal="true"`. |

**Known cost, now paid instead of accepted:** the `AK` mark still appears alone in the static
top row — the hamburger sits beside it, not a full nameplate — but the overlay it opens now
carries real navigation, closing the gap the v1 note flagged.

**Implementation note (unchanged).** The negative-margin overlay trick for the persistent
desktop cap only works if the element has a non-`static` `position` at every breakpoint —
`position: relative` on mobile, `sticky` at `md:`.

The dark/light toggle from the pre-redesign navbar remains removed — the locked direction has
no light mode. The mobile hamburger sheet is back, rebuilt from nothing rather than restyled
from the pre-redesign one (which used a light-capable shadcn `Sheet`; this uses none of that
component).

## 12. About

**The 36+ / 15+ / 2025 / Cairo stat row is cut and does not return in any form** — not as a row,
not as a strip, not as inline figures. Because it's gone, **Cairo and the 2025 degree are carried
by the prose**, split across the first and last sentences (they appear nowhere else on the page).

| | Value |
| --- | --- |
| Header | mono `01` eyebrow (slot c) + Inter 34 / 1.1 / −0.02em / 500 sentence-case title, flat `#e9e9ed`. **No subline** — a subline here would rebuild the stat row in miniature. |
| Prose | Inter 15 / 1.7, `rgba(233,233,237,0.60)`, `max-width: 640px`, five sentences, `text-wrap: pretty` |
| Spacing | 14px eyebrow → title, 22px title → prose, 56px above the section |
| 390 | title 27px, prose 14.5 / 1.65, full width in an 18px gutter |

Section header pattern, now general (established at Experience, applied here): mono two-digit
eyebrow + 34px Inter title, optional 15px subline — implemented as the shared `SectionHeader`
component (`components/SectionHeader.tsx`), consumed by Experience, Projects and About alike. One
mono element per section — §6.2 holds.

**No trailing divider under About's header.** §5's "a divider sits under the block, before the
section's first content row" describes a repeating list (Experience's rows, Projects' cards) that
needs a rule to separate header from row one. About's content is a single prose paragraph, not a
list — the built direction has no divider there, and the shared header component takes an
optional `divider` render (opt-in per caller) rather than always rendering one.

**Line-height reconciliation.** An earlier pass of this direction specified the About title at
34 / 1.15; the general rule (§5) and Experience/Projects both use 1.1. Standardised on **1.1
everywhere** the shared header renders, since the visual difference is negligible and one shared
component with one line-height beats a per-section exception.

## 13. Tech stack

Locked direction **5a**, "three rows on a 150px rail" — the same rail/rhythm Experience (§11c)
already established, applied here first in the design and adopted there. Replaces the pre-redesign
`Skills.tsx` (Orbitron `CyberCard`s, `Skill_Tree` label, per-card status badges, a cycling
`SYSTEM_*` line) wholesale — nine mono elements collapsed to the section's one `03` eyebrow.

| | Value |
| --- | --- |
| Header | shared `SectionHeader` (§5/§11b): `03` eyebrow, "Tech stack" title, one-sentence description. |
| Rows | one per group (Frontend, Backend, Tools) — `.nx-divider` **between** rows only, not above the first (the header's own trailing divider covers that) or below the last. |
| Rail | 150px, flush left, `flex: none`, group name, Inter 13px, `rgba(233,233,237,0.45)`. Never mono — a group name is not a status. |
| Chip line | §4 chip spec: 13px, `rgba(233,233,237,0.45)`, `·` separators at 0.4 opacity. Each name carries its own trailing separator **inside its own span**, so a wrapped line never opens with a dot. |
| Row padding | `22px 0` vertical (desktop `24px` — negligible, kept as one Tailwind step). |
| At 390 | rail moves **above** the chip line (`flex-col`), 12px gap between them; rows still separated by `.nx-divider`. |

No cards, no fills, no borders, no icons, no counts, no levels, no motion. `skillGroups` in
`lib/index.ts` dropped its `code`/`status` fields (only `title` and `skills` are read now) and
`Shadcn UI` was renamed `shadcn/ui` to match the library's own name; `systemStatus` is gone
entirely — nothing else in the repo read it once `Skills.tsx` stopped cycling it.

## 14. Contact — as built (Turn 6)

Replaces the pre-redesign `Contact_Log_1/2/3` `CyberCard`s wholesale — six mono elements
(three `CHANNEL_ACTIVE` labels plus their card kickers) against a three-slot page budget, in
`System_*`/Orbitron vocabulary §6 retired everywhere outside the ticker band. `cyberCard.tsx`
is deleted; it was blocked only by this import.

No form, no inputs, no backend. Direct links only, driven by `contactLinks` and `contactEmail`
in `lib/index.ts` rather than hard-coded in the component:

| | Value |
| --- | --- |
| Header | shared `SectionHeader` (§5/§11b): `05` eyebrow, "Contact" title. No description — the statement below carries that weight instead. |
| Statement | Inter 500, `-0.03em`, `#e9e9ed`, **64px at 1440 / 40px at 390** — the only type on the page above the 34px section-title size besides the hero name. `text-wrap: pretty`. |
| Availability prose | Inter 15/16, ink-60, one paragraph, prose only — **never a stat row** (§12 cut the stat row permanently and that holds here too): "Open to mid-level frontend roles — Cairo, remote-friendly. Email is the fastest way to reach me, and I answer the same day." |
| Rows | §11c rail-row pattern at a larger scale: 150px label rail, value at **22px** (18px at 390, label above value) so a row reads as a target, not a line of text. `28px` vertical padding (desktop) vs. the rail's usual 24px. |
| Email row | the mailto link carries the row pattern plus a trailing arrow like every other row; a separate 48×48 (44×44 at 390) §4 icon button sits outside it for copy-to-clipboard, glyph crossfading to a check over 240ms and reverting after 1.6s. |
| Row hover | value colour ink-60 → `#d2cefd` at 240ms, row background 6% accent tint at 480ms, arrow `2px, -2px` at 480ms — identical tokens to the card hover in §4, reused rather than re-invented. |
| Page ending | a `.nx-divider` 56px below the last row, then 56px of bottom padding — a page-terminating rule, **not** a row separator and not a footer: no copyright line, no nav links, no small print, no utility row. |

**The footer stays deliberately undefined and unbuilt.** The page ends at Contact — `app/layout.tsx`
renders no `<footer>` and imports no `Footer` component; `components/Footer.tsx` is deleted as
dead code now that nothing references it. This is not an oversight to flag as a gap (the way the
pre-Turn-6 doc flagged Contact/footer together as a "known gap") — it's the shipped shape of the
page. If a footer is ever wanted, it needs its own design pass; nothing here should be read as a
placeholder for one.

---

## Inconsistencies to settle

Four things the hero and cards did differently.

1. **Three border alphas for one job.** Hero frame `0.12`, hairlines and panels `0.16`, button
   borders `0.22`. **Standardise on two:** `0.16` for every hairline and divider, `0.22` for
   every interactive border. Retire `0.12`.
2. **Secondary text drifts across four values** — `0.60` (card description), `0.62` (board
   prose), `0.68`/`0.72`/`0.78` (hero subline across versions). **Standardise on `0.60` for all
   body copy, with `0.78` as a documented exception for the hero subline only**, because it sits
   over a live model rather than the page ground.
3. **Big type is treated two ways** — the card title takes the gradient, the hero name is flat
   `#e9e9ed`. Keep both, but as a stated rule rather than an accident: **the gradient belongs to
   repeating list titles**, where it does the work of lifting an item off the page; **the hero
   name stays flat**, because a gradient over live 3D fights the model and undermines the scrim.
   No third use of the gradient.
4. **The card's arrow glyph has no hover state** while every other interactive thing does.
   **Add one:** on card hover, translate the arrow `2px, -2px` over the same 480ms easing. Same
   gesture as the button's trailing arrow, which also currently has none — give it the same.

Also worth naming: the hero nav is Inter uppercase at 0.18em, which sits visually close to the
mono labels. It is *not* mono and doesn't count against the §6 budget — but if the page ever
feels like the terminal motif is creeping, this is the element that's doing it, and the fix is
to drop the nav to sentence case, not to touch the ticker.

## Still undefined — ask, don't invent

Forms and inputs (Contact has none, by design — see §14) · loading and empty states ·
breakpoints between 390 and 1440. **The footer is not on this list** — it isn't undefined, it's
deliberately absent; see §14.

**Settled:** section titles (§5 → SectionHeader) · the navbar (§11, including the Turn 6 mobile
overlay) · About (§12) · the stats block (cut, §12) · light mode (removed sitewide — dark only;
the pre-redesign toggle and its Sun/Moon control are gone from the navbar, though the underlying
`next-themes` provider is left in place rather than torn out, since that's a larger, separate
change) · Projects (§3/§4/§7 — direction A, "editorial: one lead, five rows," Turn 6) · Tech
stack (§13, locked `5a`) · Contact (§14) · focus rings (§4, built — a genuine global
`:focus-visible` rule) · scroll behaviour — the nav's active-link state uses
`IntersectionObserver` with `-70px 0px -60% 0px` root margins (§9), not scroll offsets · the
footer (§14 — deliberately absent, not a gap).

**Known gap, closed:** the "Contact and the footer still carry the pre-redesign cyber-terminal
treatment" gap noted after §13 is resolved by §14 — Contact is rebuilt on the locked system and
the footer is removed rather than restyled. The light-mode-capable shadcn background this gap
also flagged (a white band after Projects when the system theme resolves to light) no longer has
anywhere to appear now that nothing after Projects renders unstyled shadcn surface.
