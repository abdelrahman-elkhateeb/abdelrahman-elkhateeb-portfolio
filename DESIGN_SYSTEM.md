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
| Cards | **no surface at all** — transparent on the page. |
| Card separation | a 1px hairline above and below each card, faded to transparent over the outer 48px: `linear-gradient(to right, transparent, rgba(233,233,237,0.16) 48px, rgba(233,233,237,0.16) calc(100% - 48px), transparent)`. |
| Elevation | none. Zero `box-shadow` in the design. The only shadow of any kind is the hero name's `text-shadow`. |
| Hero | the model canvas *is* the surface, full bleed, plus the scrim (§8). |

Cards separate by **rule and hover tint**, never by fill or shadow. If a future section needs
a container, it gets a hairline border on the page ground — not a lighter fill.

## 4. Buttons / links / chips

| Variant | Spec | Hover |
| --- | --- | --- |
| Primary (accent outline) | 48px tall, `0 24px`, radius 8, `1px solid #9184d9`, label `#9184d9` 15/500, trailing 15px arrow | background `color-mix(#9184d9 12%, transparent)` |
| Icon button | 48 × 48, radius 8, `1px solid rgba(233,233,237,0.22)`, glyph 19px `#e9e9ed` | background `rgba(233,233,237,0.07)` |
| Card (whole-block link) | the entire card is the link, radius 8, no underline, no border; a bare 18px accent arrow glyph top-right marks it | background `rgba(145,132,217,0.06)`, 480ms |
| Chip (tech) | **plain text.** 13px, `rgba(233,233,237,0.45)`, separated by `·` at 0.4 opacity. No fill, no border, no radius, no padding, not interactive. | none |

There is **no solid-filled button** anywhere. A chip is distinguishable from a button because
it has no box at all — the moment a tech chip gets a border or a background it reads as a
button and the rule is broken.

Focus states: **undefined** — never built. Prescribed: `:focus-visible { outline: 2px solid
#9184d9; outline-offset: 2px; }` on every interactive element, including the whole-card link.

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
| Card padding | `24px 18px` |
| Card columns | image 400 × 250, gap 32, content column 692 (at 1160 total) |
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

## 9. Motion

Character: slow, weighted, single-axis — the pace of the model's orbit damping. Nothing
bounces, nothing overshoots, nothing blinks.

- **Hover, card:** background tint over **480ms `cubic-bezier(0.22, 0.61, 0.36, 1)`**. No lift,
  no scale, no image zoom (the image zoom belonged to the Cinema card, which we didn't take).
- **Hover, buttons:** background tint only. Duration unspecified in the build — use 240ms with
  the same easing.
- **Ambient, hero glow:** `glowDrift` 16s ease-in-out infinite — a ±14px drift and 1.04 scale
  on the accent radial. The only looping motion inside the hero frame.
- **Ambient, ticker:** `tickerRun` 42s linear infinite, translating a duplicated track −50%.
  Linear on purpose; a ticker that eases reads as broken.
- **On load / on scroll:** nothing. No entrance animations, no scroll reveals, no parallax were
  built, and the restraint is deliberate — if we add any, one shared 400–600ms fade-and-6px-rise
  at most, once per section, never staggered per card.
- **Reduced motion** (prescribed, not yet built): under `@media (prefers-reduced-motion: reduce)`
  stop `tickerRun` and `glowDrift` entirely — the band keeps its first frame of copy and stays
  readable, the glow holds at its rest position. Keep hover colour transitions but cut them to
  ≤150ms. Never remove the scrim; it's legibility, not decoration.

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

Two things need deciding, not guessing:

1. **The hard-part line at 390.** At ~358px content width a 150-character sentence runs to
   four lines. Either the mobile card carries a shortened hard-part string (≤80 characters),
   or the label moves above the sentence instead of beside it, or it is dropped below a
   breakpoint. My recommendation: label above, sentence at 14.5/1.5, and a ≤100-character
   variant of each line.
2. **The scrim at 390.** The bottom lift is defined in percentages so it scales, but the left
   wash is pointless on a narrow screen — drop the left wash on mobile, keep bottom + nav cap.

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

**At 390 the nav does not persist.** The hero carries a static top row (mark only, 64px, 18px
gutter) and the page navigates by scrolling. Five labels measure ~396px against 354px of content
width, so a condensed row would mean cutting to three items; a hamburger would cost an overlay
surface, a close state and a dialog pattern this system doesn't have. No mobile nav, no hamburger.

**Known cost:** with the `AK` mark, the full name appears nowhere between the hero scrolling off
and the About prose. Accepted.

**Implementation note.** The negative-margin overlay trick only works if the element has a
non-`static` `position` at every breakpoint — `position: relative` on mobile, `sticky` at `md:`.
Giving the mobile row `position: static` lets the hero (painted later in DOM, occupying the same
box via the same negative margin) paint over the mark, since `z-index` is a no-op on statically
positioned elements. `relative` fixes it while still scrolling away normally (not sticky), which
is what "does not persist" requires.

Both the dark/light toggle and the mobile hamburger sheet from the pre-redesign navbar are
removed, not just restyled — the locked direction has no light mode (§ below) and no overlay
surface pattern to build a mobile menu from.

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

Footer · forms and inputs · the Contact section (its body content — its section-title header
follows §5's pattern once built, taking `05`) · focus rings (prescribed, unbuilt) · scroll
behaviour, including whether the nav's active-link state uses IntersectionObserver thresholds or
scroll offsets (the current build has no active-link tracking at all — every link renders in its
inactive colour, hover only) · loading and empty states · breakpoints between 390 and 1440.

**Settled:** section titles (§5 → SectionHeader) · the navbar (§11) · About (§12) · the stats
block (cut, §12) · light mode (removed sitewide — dark only; the pre-redesign toggle and its
Sun/Moon control are gone from the navbar, though the underlying `next-themes` provider is left
in place rather than torn out, since that's a larger, separate change) · Projects (§4/§7 — all
four project cards render through the one `ProjectCard` in a single divided list, matching the
locked Turn 2 build exactly. A prior pass had split card one into a "featured" row with the
remaining three in a bordered 2-column grid; the design has no basis for that split — §3 says
cards separate only by rule and hover tint, never by fill, border or grouping. The grid variant,
`ProjectCardGrid.tsx` and its `.nx-card-grid` styles, has been removed) · Tech stack (§13, locked
`5a`).

**Known gap:** Contact and the footer still carry the pre-redesign "cyber terminal" treatment
(Orbitron, `CyberCard`, mono headings) and a light-mode-capable shadcn background — visible as a
white band after Projects when the system theme resolves to light. Skills no longer contributes to
this gap as of §13. Out of scope for this pass; flagged here rather than patched, since restyling
Contact and the footer is its own migration.
