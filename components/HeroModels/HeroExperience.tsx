"use client";

import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import HeroLights from "./HeroLights"
import HeroModel from "./HeroModel"

/** Mounts once the sibling Suspense boundary resolves — the model's own readiness signal. */
function ReadySignal({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.()
  }, [onReady])
  return null
}

const HeroExperience = ({ onReady }: { onReady?: () => void }) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <Canvas
      camera={{ position: [0, 15, 20], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <HeroLights />
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={null}>
        <HeroModel />
        <ReadySignal onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}

export default HeroExperience;
