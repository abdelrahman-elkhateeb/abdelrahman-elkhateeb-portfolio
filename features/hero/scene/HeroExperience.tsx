"use client";

import { OrbitControls } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import { Suspense, useEffect } from "react"
import HeroLights from "./HeroLights"
import HeroModel from "./HeroModel"

/** R3F puts this label on the wrapper it connects events to, so it also
    identifies the element OrbitControls binds. */
const SCENE_LABEL = "Interactive 3D room"

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

const HeroExperience = ({ onReady }: { onReady?: () => void }) => {
  return (
    <Canvas
      camera={{ position: [0, 15, 20], fov: 45 }}
      className="h-full w-full touch-pan-y"
      aria-label={SCENE_LABEL}>
      <HeroLights />
      {/* No zoom at any width: the wheel handler returns before preventDefault,
          so the page scrolls. minDistance/maxDistance still clamp the initial
          camera radius (25 → 20) and define the framing; they are not dead. */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <AllowVerticalTouchScroll />
      <Suspense fallback={null}>
        <HeroModel />
        <ReadySignal onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}

export default HeroExperience;
