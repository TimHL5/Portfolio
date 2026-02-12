'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WireframeEarth from './WireframeEarth';
import LocationPin from './LocationPin';
import { groupExperiencesByLocation, LocationGroup } from './utils';

interface GlobeSceneProps {
  scrollProgress: number;
  onPinClick: (location: LocationGroup) => void;
}

export default function GlobeScene({ scrollProgress, onPinClick }: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const prevScrollRef = useRef(scrollProgress);
  const locations = useMemo(() => groupExperiencesByLocation(), []);

  // Scroll-driven additive rotation
  useFrame(() => {
    if (!groupRef.current) return;
    const delta = scrollProgress - prevScrollRef.current;
    prevScrollRef.current = scrollProgress;
    groupRef.current.rotation.y += delta * Math.PI * 0.8;
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#FF9500" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
        autoRotate
        autoRotateSpeed={0.3}
      />

      <group ref={groupRef}>
        <WireframeEarth />
        {locations.map((loc) => (
          <LocationPin
            key={loc.name}
            location={loc}
            onClick={() => onPinClick(loc)}
          />
        ))}
      </group>
    </>
  );
}
