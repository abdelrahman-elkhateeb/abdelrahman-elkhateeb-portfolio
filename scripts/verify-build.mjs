import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

// Checks the actual production HTML. This is an SSR smoke check, not a browser,
// accessibility audit, interaction test, or visual regression suite.
const html = readFileSync(new URL("../.next/server/app/index.html", import.meta.url), "utf8")
  .replace(/<script\b[\s\S]*?<\/script>/g, "")

test("all six sections and their content are server-rendered in order", () => {
  assert.equal([...html.matchAll(/<section\b/g)].length, 6)
  const ids = [...html.matchAll(/<section\b[^>]*id="([^"]+)"/g)].map(match => match[1])
  assert.deepEqual(ids, ["about", "experience", "skills", "projects", "contact"])
  assert.match(html, /Abdelrahman/)
  assert.match(html, /Tell me what you/)
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
  assert.equal([...html.matchAll(/<h2\b/g)].length, 5)
})

test("projects keep five whole-card links and one noninteractive internal project", () => {
  assert.equal([...html.matchAll(/<a\b[^>]*class="[^"]*\bnx-card\b[^"-]/g)].length, 5)
  const card = html.match(/<div\b[^>]*class="[^"]*\bnx-card-static\b[^>]*>/)?.[0]
  assert.ok(card)
  assert.doesNotMatch(card, /tabindex|role="link"/)
  assert.match(html, /Internal tool/)
  assert.equal([...html.matchAll(/<img\b[^>]*class="[^"]*nx-card-image/g)].length, 6)
  assert.match(html, /sizes="\(min-width: 1160px\) 1074px/)
})

test("closed navigation does not ship a hidden modal or focusable duplicate links", () => {
  assert.doesNotMatch(html, /role="dialog"|aria-modal="true"|aria-label="Mobile sections"/)
  assert.match(html, /aria-label="Open menu"[^>]*aria-expanded="false"|aria-expanded="false"[^>]*aria-label="Open menu"/)
})

test("no-JS, reduced duplication and clipboard announcement markup are present", () => {
  assert.match(html, /<noscript><style>\[data-reveal\]\{opacity:1!important;transform:none!important\}/)
  assert.match(html, /aria-hidden="true" class="flex flex-none gap-11/)
  assert.match(html, /role="status" aria-live="polite" aria-atomic="true"/)
  assert.doesNotMatch(html, /<footer\b/)
  assert.match(html, /<html lang="en" class="dark"/)
})
