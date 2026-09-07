import { expect, test, type Page } from "@playwright/test"

async function openPortfolio(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" })
  await page.evaluate(() => document.fonts.ready)
  const fontsLoaded = await page.evaluate(() => ["Inter", "Share Tech Mono"].every(family =>
    Array.from(document.fonts).some(font => font.family === family && font.status === "loaded")))
  expect(fontsLoaded).toBe(true)
  await expect(page.locator(".nx-model-fade")).toHaveClass(/is-ready/)
}

for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`content fits at ${width}px, including long contact values`, async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", error => errors.push(error.message))
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()) })
    await page.setViewportSize({ width, height: 844 })
    await openPortfolio(page)
    for (const section of await page.locator("main section").all()) {
      await section.scrollIntoViewIfNeeded()
    }
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    const clipped = await page.locator("h1, h2, h3, .nx-contact-value").evaluateAll(elements =>
      elements.filter(element => element.scrollWidth > element.clientWidth + 1).map(element => element.textContent))
    expect(clipped).toEqual([])
    expect(errors).toEqual([])
    await expect(page.locator(".nx-card, .nx-card-static")).toHaveCount(6)
    for (const image of await page.locator(".nx-card-image").all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    }
  })
}

test("menu traps focus, closes by Escape/link/close button and unlocks after resize", async ({ page }) => {
  await openPortfolio(page)
  const trigger = page.getByRole("button", { name: "Open menu" })
  const dialog = page.getByRole("dialog", { name: "Site navigation" })
  await trigger.focus()
  await page.keyboard.press("Enter")
  await expect(dialog).toBeVisible()
  await expect(page.locator("body")).toHaveAttribute("data-scroll-locked", "1")
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab")
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true)
  }
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Shift+Tab")
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true)
  }
  await page.keyboard.press("Escape")
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect(page.locator("body")).not.toHaveAttribute("data-scroll-locked")
  await trigger.click()
  await dialog.getByRole("link", { name: "Projects", exact: true }).click()
  await expect(dialog).toHaveCount(0)
  await expect(page.locator("#projects")).toBeFocused()
  await page.evaluate(() => window.scrollTo(0, 0))
  await trigger.click()
  await dialog.getByRole("button", { name: "Close menu" }).click()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.setViewportSize({ width: 1024, height: 844 })
  await expect(dialog).toHaveCount(0)
  await expect(page.locator("body")).not.toHaveAttribute("data-scroll-locked")
  expect(await page.getByRole("navigation", { name: "Sections", exact: true }).evaluate(element => element.contains(document.activeElement))).toBe(true)
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
})

test("clipboard success, rejection and unavailable API have accessible feedback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await openPortfolio(page)
  const copy = page.getByRole("button", { name: "Copy email address" })
  await copy.click()
  await expect(page.getByRole("status")).toHaveText("Email address copied.")
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("abdelrahmanelkhateeb10@gmail.com")
  await expect(page.getByRole("status")).toBeEmpty({ timeout: 3000 })
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: () => Promise.reject(new Error("Permission denied")) },
  }))
  await copy.click()
  await expect(page.getByRole("status")).toContainText("Could not copy")
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined }))
  await copy.click()
  await expect(page.getByRole("status")).toContainText("Could not copy")
})

test("reduced motion keeps content visible and stops ambient motion; no-JS content survives", async ({ page, browser }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await openPortfolio(page)
  await expect(page.locator(".nx-ticker-track")).toHaveCSS("animation-name", "none")
  await expect(page.locator(".nx-glow-accent")).toHaveCSS("animation-name", "none")
  await expect(page.locator("[data-reveal]").first()).toHaveCSS("opacity", "1")
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await expect(page.locator("[data-reveal]").first()).toHaveCSS("opacity", "1")
  const noJs = await browser.newContext({ javaScriptEnabled: false })
  const staticPage = await noJs.newPage()
  await staticPage.goto("http://127.0.0.1:3001/", { waitUntil: "domcontentloaded" })
  await expect(staticPage.locator("[data-reveal]").first()).toHaveCSS("opacity", "1")
  await expect(staticPage.getByRole("heading", { name: "Contact", exact: true })).toBeVisible()
  await expect(staticPage.locator(".nx-card, .nx-card-static")).toHaveCount(6)
  await noJs.close()
})

test("hover/focus colors, scroll spy and short landscape hero remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 840 })
  await openPortfolio(page)
  const nav = page.getByRole("navigation", { name: "Sections", exact: true })
  const about = nav.getByRole("link", { name: "About", exact: true })
  await about.hover()
  await expect(about).toHaveCSS("color", "rgb(210, 206, 253)")
  await about.focus()
  await expect(about).toHaveCSS("outline-width", "2px")
  await page.locator("#skills").scrollIntoViewIfNeeded()
  await expect(nav.getByRole("link", { name: "Tech stack", exact: true })).toHaveAttribute("data-active", "true")
  const email = page.locator(".nx-contact-value").first()
  await email.hover()
  await expect(email).toHaveCSS("color", "rgb(210, 206, 253)")
  await page.setViewportSize({ width: 667, height: 375 })
  await page.evaluate(() => window.scrollTo(0, 0))
  const name = await page.locator("h1").boundingBox()
  const hero = await page.locator(".nx-hero").boundingBox()
  expect(name!.y).toBeGreaterThanOrEqual(64)
  expect(hero!.height).toBeGreaterThanOrEqual(560)
})

test("the room responds to orbit drag and the mobile overlay covers its canvas", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 840 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await openPortfolio(page)
  const canvas = page.locator("canvas")
  await expect(canvas).toBeVisible()
  // Give OrbitControls' initial damping time to settle; ambient CSS is stopped.
  await page.waitForTimeout(1000)
  const before = await canvas.screenshot()
  await page.mouse.move(900, 220)
  await page.mouse.down()
  await page.mouse.move(1040, 250, { steps: 12 })
  await page.mouse.up()
  await page.waitForTimeout(800)
  const after = await canvas.screenshot()
  expect(before.equals(after)).toBe(false)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole("button", { name: "Open menu" }).click()
  const panel = page.getByRole("dialog", { name: "Site navigation" })
  await expect(panel).toHaveCSS("background-color", "rgb(11, 12, 20)")
  expect(await panel.evaluate(element => element.contains(document.elementFromPoint(195, 500)))).toBe(true)
})
