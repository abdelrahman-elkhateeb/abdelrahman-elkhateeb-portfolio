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

// 1440px is the width that regressed: zoom was gated to >1024px, so only there
// did OrbitControls consume the wheel as a dolly and preventDefault the scroll.
test("the wheel over the hero scrolls the page instead of zooming the room", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 840 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await openPortfolio(page)
  await page.mouse.move(720, 420)
  await page.mouse.wheel(0, 600)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
})

test("a vertical touch swipe scrolls the page while a horizontal drag still orbits", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:3001",
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  })
  const page = await context.newPage()
  await openPortfolio(page)
  const canvas = page.locator("canvas")
  const touchAction = await page.evaluate(() =>
    getComputedStyle(document.querySelector("[aria-label='Interactive 3D room']")!).touchAction)
  expect(touchAction).toBe("pan-y")
  // Chrome's synthesized scroll gesture does not drive touch input headlessly,
  // so dispatch the touch sequence itself and let the browser apply touch-action.
  const input = await context.newCDPSession(page)
  const swipe = async (x: number, y: number, dx: number, dy: number) => {
    await input.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] })
    for (let step = 1; step <= 10; step++) {
      await input.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: x + (dx * step) / 10, y: y + (dy * step) / 10 }],
      })
    }
    await input.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] })
  }
  await page.waitForTimeout(1000)
  const beforeDrag = await canvas.screenshot()
  await swipe(195, 300, -160, 0)
  await page.waitForTimeout(800)
  expect((await canvas.screenshot()).equals(beforeDrag)).toBe(false)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
  await swipe(195, 420, 0, -300)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  await context.close()
})

// Counts GPU draw calls so "paused" can be measured directly rather than
// inferred from pixels, which is not observable while the hero is off screen.
async function countDrawCalls(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __draws: number }
    w.__draws = 0
    for (const proto of [WebGLRenderingContext, WebGL2RenderingContext]) {
      for (const name of ["drawElements", "drawArrays", "drawElementsInstanced", "drawArraysInstanced"] as const) {
        const original = (proto.prototype as unknown as Record<string, unknown>)[name]
        if (typeof original !== "function") continue
        ;(proto.prototype as unknown as Record<string, unknown>)[name] = function (this: unknown, ...args: unknown[]) {
          w.__draws++
          return (original as (...a: unknown[]) => unknown).apply(this, args)
        }
      }
    }
  })
  return {
    reset: () => page.evaluate(() => { (window as unknown as { __draws: number }).__draws = 0 }),
    read: () => page.evaluate(() => (window as unknown as { __draws: number }).__draws),
  }
}

// The hero glow drifts for 16s across the same box as the canvas, and an element
// screenshot includes whatever overlaps it. Comparing scene frames under normal
// motion therefore needs the ambient layer held still, or every capture differs
// whether the room turned or not. Reduced-motion runs get this from the CSS.
async function stopAmbientGlow(page: Page) {
  await page.addStyleTag({ content: ".nx-glow-accent { animation: none !important; }" })
}

test("reduced motion holds the room still and a preference change starts/stops the turntable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 840 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await openPortfolio(page)
  await stopAmbientGlow(page)
  const canvas = page.locator("canvas")
  // Past the initial damping settle, nothing else may move the camera.
  await page.waitForTimeout(1500)
  const still = await canvas.screenshot()
  await page.waitForTimeout(3000)
  expect((await canvas.screenshot()).equals(still)).toBe(true)

  // Lifting the preference at runtime starts the drift without a reload.
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.waitForTimeout(3000)
  const moving = await canvas.screenshot()
  expect(moving.equals(still)).toBe(false)

  // Setting it again stops the drift again.
  await page.emulateMedia({ reducedMotion: "reduce" })
  // Damping eases the residual delta out after autoRotate stops contributing.
  await page.waitForTimeout(2500)
  const stopped = await canvas.screenshot()
  await page.waitForTimeout(3000)
  expect((await canvas.screenshot()).equals(stopped)).toBe(true)
})

test("the room drifts on its own, yields to a drag and resumes after release", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 840 })
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await openPortfolio(page)
  await stopAmbientGlow(page)
  const canvas = page.locator("canvas")
  await page.waitForTimeout(1500)
  const first = await canvas.screenshot()
  await page.waitForTimeout(2500)
  expect((await canvas.screenshot()).equals(first)).toBe(false)

  // A held drag suppresses the drift: OrbitControls only auto-rotates when no
  // gesture is in progress, so the view must follow the pointer and stop with it.
  await page.mouse.move(1100, 250)
  await page.mouse.down()
  await page.mouse.move(1180, 250, { steps: 8 })
  // Damping keeps easing the drag out for a few seconds; measured, the frame is
  // byte-identical from about 4s of hold, while free drift moves ~13% of pixels
  // in 2s. So this is a real "the turntable stopped", not a slow-motion pass.
  await page.waitForTimeout(4500)
  const held = await canvas.screenshot()
  await page.waitForTimeout(2000)
  expect((await canvas.screenshot()).equals(held)).toBe(true)

  // Releasing hands the camera back to the turntable, from the dragged angle.
  await page.mouse.up()
  await page.waitForTimeout(1200)
  const released = await canvas.screenshot()
  await page.waitForTimeout(2500)
  expect((await canvas.screenshot()).equals(released)).toBe(false)
})

test("the scene stops rendering while the hero is off screen and restarts on return", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 840 })
  await page.emulateMedia({ reducedMotion: "no-preference" })
  const draws = await countDrawCalls(page)
  await openPortfolio(page)
  await page.waitForTimeout(1000)

  await draws.reset()
  await page.waitForTimeout(1500)
  expect(await draws.read()).toBeGreaterThan(0)

  await page.locator("#contact").scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500) // let the observer fire and the loop wind down
  await draws.reset()
  await page.waitForTimeout(2000)
  expect(await draws.read()).toBe(0)

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(1000)
  await draws.reset()
  await page.waitForTimeout(1500)
  expect(await draws.read()).toBeGreaterThan(0)
})

test("the scene pauses and restarts off screen under reduced motion too", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 840 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  const draws = await countDrawCalls(page)
  await openPortfolio(page)
  await page.waitForTimeout(1000)

  await page.locator("#contact").scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  await draws.reset()
  await page.waitForTimeout(2000)
  expect(await draws.read()).toBe(0)

  // No scene prop changes on return here, so this only passes because the
  // resume requests a frame itself.
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(1000)
  await draws.reset()
  await page.waitForTimeout(1500)
  expect(await draws.read()).toBeGreaterThan(0)
  await expect(page.locator("canvas")).toBeVisible()
})
