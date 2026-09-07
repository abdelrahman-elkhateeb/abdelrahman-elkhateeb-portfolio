"use client";

import { OrbitControls } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import { Suspense, useEffect } from "react"
import HeroLights from "./HeroLights"
import HeroModel from "./HeroModel"

/** R3F puts this label on the wrapper it connects events to, so it also
    identifies the element OrbitControls binds. */
const SCENE_LABEL = "Interactive 3D room"

/** Turntable rate. 0.4 is the middle of the deliberate band: at 60Hz it is
    2.4 degrees a second, one revolution every 150s, which drifts rather than
    spins, and 0.6 starts reading as motion competing with the hero copy.

    Note that OrbitControls advances a fixed 2*PI/60/60 * speed radians PER
    FRAME with no delta-time term, so the rate is display-dependent: the same
    0.4 measures 5.8 degrees a second on a 144Hz screen, a revolution every
    62s. Changing this value cannot fix that; only driving the azimuth from
    frame delta would, which is not what autoRotate does. */
const AUTO_ROTATE_SPEED = 0.4

/** Mounts once the sibling Suspense boundary resolves — the model's own readiness signal. */
function ReadySignal({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.()
  }, [onReady])
  return null
}

/** OrbitControls.connect() forces `touch-action: none` on the element it binds —
    the labelled wrapper R3F connected, not the inner canvas — so a vertical swipe
    over the hero would rotate the room instead of scrolling the page. Restore
    pan-y there: vertical swipes scroll, horizontal drags still orbit. R3F connects
    its event target after the children mount, so this reruns on that change; being
    rendered after OrbitControls, it flushes after the matching connect effect. */
function AllowVerticalTouchScroll() {
  const connected = useThree(state => state.events.connected)
  useEffect(() => {
    const target = document.querySelector<HTMLElement>(`[aria-label="${SCENE_LABEL}"]`)
    if (target) target.style.touchAction = "pan-y"
  }, [connected])
  return null
}

/** Requests one frame when the hero comes back.

    `frameloop="never"` does not merely skip rendering: R3F cancels its animation
    frame once nothing asks to repeat, so returning to `always` leaves a stopped
    loop that only a frame request restarts. R3F restarts it implicitly when a
    scene prop changes, which hides the problem whenever autoRotate flips at the
    same moment — but under reduced motion no prop changes and the room would
    stay frozen. Canvas applies the frameloop prop from an awaited async effect,
    so a frame requested synchronously here would still be dropped as "never";
    wait one animation frame, by which point the prop has landed. */
function ResumeOnReturn({ rendering }: { rendering: boolean }) {
  const invalidate = useThree(state => state.invalidate)
  useEffect(() => {
    if (!rendering) return
    const frame = requestAnimationFrame(() => invalidate())
    return () => cancelAnimationFrame(frame)
  }, [rendering, invalidate])
  return null
}

type HeroExperienceProps = {
  onReady?: () => void
  /** False while the hero is off screen. */
  rendering?: boolean
  /** Turntable drift. Off under reduced motion and while paused. */
  autoRotate?: boolean
}

const HeroExperience = ({ onReady, rendering = true, autoRotate = false }: HeroExperienceProps) => {
  return (
    <Canvas
      camera={{ position: [0, 15, 20], fov: 45 }}
      /* `always` is R3F's default and the scene's existing behaviour, so the
         rendered hero is unchanged; only the off-screen idle state is new.
         `never` skips useFrame and gl.render and then cancels the animation
         frame, so a hero the reader has scrolled past costs nothing. */
      frameloop={rendering ? "always" : "never"}
      className="h-full w-full touch-pan-y"
      aria-label={SCENE_LABEL}>
      <HeroLights />
      {/* No zoom at any width: the wheel handler returns before preventDefault,
          so the page scrolls. minDistance/maxDistance still clamp the initial
          camera radius (25 → 20) and define the framing; they are not dead.
          autoRotate turns the camera around the target, leaving the lights fixed
          relative to the room. OrbitControls applies it only while no drag is in
          progress, so a manual drag takes over and the drift resumes from the new
          angle on release. */}
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={AUTO_ROTATE_SPEED}
        enablePan={false}
        enableZoom={false}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <AllowVerticalTouchScroll />
      <ResumeOnReturn rendering={rendering} />
      <Suspense fallback={null}>
        <HeroModel />
        <ReadySignal onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}

export default HeroExperience;
