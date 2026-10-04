import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

// Checks the actual production HTML. This is an SSR smoke check, not a browser,
// accessibility audit, interaction test, or visual regression suite.
const read = path => readFileSync(new URL(`../.next/server/app/${path}`, import.meta.url), "utf8")
  .replace(/<script\b[\s\S]*?<\/script>/g, "")
const html = read("index.html")

test("all six sections and their content are server-rendered in order", () => {
  assert.equal([...html.matchAll(/<section\b/g)].length, 6)
  const ids = [...html.matchAll(/<section\b[^>]*id="([^"]+)"/g)].map(match => match[1])
  assert.deepEqual(ids, ["about", "experience", "skills", "projects", "contact"])
  assert.match(html, /Abdelrahman/)
  assert.match(html, /Tell me what you/)
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
  assert.equal([...html.matchAll(/<h2\b/g)].length, 5)
})

test("projects render as an eight-row index linking to case-study pages", () => {
  const rows = [...html.matchAll(/<a\b[^>]*class="[^"]*\bnx-index-row\b[^"]*"[^>]*>/g)].map(match => match[0])
  assert.equal(rows.length, 8)
  for (const row of rows) assert.match(row, /href="\/work\/[a-z-]+"/)
  assert.doesNotMatch(html, /\bnx-card-static\b|\bnx-card-image\b/)
  // One drawn preview per project; only the first is exposed before hydration.
  assert.equal([...html.matchAll(/class="nx-preview\b/g)].length, 8)
  assert.equal([...html.matchAll(/<div\b[^>]*role="img"/g)].length, 8)
  assert.equal([...html.matchAll(/<div\b[^>]*aria-hidden="true"[^>]*class="nx-preview\b/g)].length, 7)
})

test("every project has a prerendered case-study page", () => {
  const slugs = [...html.matchAll(/href="\/work\/([a-z-]+)"/g)].map(match => match[1])
  assert.equal(slugs.length, 8)
  for (const slug of slugs) {
    const page = read(`work/${slug}.html`)
    assert.equal([...page.matchAll(/<h1\b/g)].length, 1, slug)
    assert.match(page, /href="\/#projects"/, slug)
    assert.match(page, /Next project/, slug)
    assert.match(page, /The hard parts?</, slug)
  }
  const chillwork = read("work/chillwork.html")
  // Hero drawing, four feature figures and the next-project drawing all server-render.
  assert.equal([...chillwork.matchAll(/<figure\b/g)].length, 4)
  assert.equal([...chillwork.matchAll(/<div\b[^>]*role="img"/g)].length, 6)
  assert.match(read("work/mawasem-dashboard.html"), /Internal tool — no public link/)
})

test("closed navigation does not ship a hidden modal or focusable duplicate links", () => {
  assert.doesNotMatch(html, /role="dialog"|aria-modal="true"|aria-label="Mobile sections"/)
  assert.match(html, /aria-label="Open menu"[^>]*aria-expanded="false"|aria-expanded="false"[^>]*aria-label="Open menu"/)
})

test("no-JS, hero status line and clipboard announcement markup are present", () => {
  assert.match(html, /<noscript><style>\[data-reveal\]\{opacity:1!important;transform:none!important\}/)
  assert.match(html, /Open to mid-level frontend roles/)
  assert.doesNotMatch(html, /nx-ticker-track/)
  assert.match(html, /role="status" aria-live="polite" aria-atomic="true"/)
  assert.doesNotMatch(html, /<footer\b/)
  assert.match(html, /<html lang="en" class="dark"/)
})
