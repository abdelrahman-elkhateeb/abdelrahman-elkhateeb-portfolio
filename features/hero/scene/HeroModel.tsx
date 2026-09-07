"use client";

import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";

export default function HeroModel() {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const roomScale = isMobile ? 0.9 : isTablet ? 1.05 : 1.2;
  const roomPositionY = isMobile ? -3.2 : -3.5;

  return (
    <group
      scale={roomScale}
      position={[0, roomPositionY, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    >
      <Room />
    </group>
  );
}
