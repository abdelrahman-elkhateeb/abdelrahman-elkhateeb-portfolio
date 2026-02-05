"use client";

import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive"
import { Room } from "./Room"
import HeroLights from "./HeroLights"

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const roomScale = isMobile ? 0.9 : isTablet ? 1.05 : 1.2;
  const roomPositionY = isMobile ? -3.2 : -3.5;

  return (
    <Canvas
      camera={{ position: [0, 15, 20], fov: 45 }}
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

      <group
        scale={roomScale}
        position={[0, roomPositionY, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <Room />
      </group>
    </Canvas>
  )
}

export default HeroExperience;
