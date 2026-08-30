"use client";

import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive"
import HeroLights from "./HeroLights"
import HeroModel from "./HeroModel"

const HeroExperience = () => {
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
      <HeroModel />
    </Canvas>
  )
}

export default HeroExperience;
