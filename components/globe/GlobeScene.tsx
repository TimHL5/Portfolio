'use client';

import { useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WireframeEarth from './WireframeEarth';
import LocationPin from './LocationPin';
import { groupExperiencesByLocation, latLngToVector3, GLOBE_RADIUS, LocationGroup } from './utils';

interface GlobeSceneProps {
  scrollProgress: number;
  onActiveLocationChange: (location: LocationGroup) => void;
  activeLocationName: string;
}

export default function GlobeScene({ scrollProgress, onActiveLocationChange, activeLocationName }: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const prevScrollRef = useRef(scrollProgress);
  const activeIndexRef = useRef(0);
  const locations = useMemo(() => groupExperiencesByLocation(), []);

  // Pre-compute pin positions (in local space)
  const pinPositions = useMemo(
    () => locations.map((loc) => latLngToVector3(loc.lat, loc.lng, GLOBE_RADIUS, 0.01)),
    [locations]
  );

  const tempVec = useMemo(() => new THREE.Vector3(), []);

  const handleActiveChange = useCallback(
    (index: number) => {
      if (activeIndexRef.current !== index) {
        activeIndexRef.current = index;
        onActiveLocationChange(locations[index]);
      }
    },
    [locations, onActiveLocationChange]
  );

  // Scroll-driven rotation + active location detection
  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    // Apply scroll-driven rotation
    const delta = scrollProgress - prevScrollRef.current;
    prevScrollRef.current = scrollProgress;
    groupRef.current.rotation.y += delta * Math.PI * 0.8;

    // Detect which location faces the camera most directly
    const cameraDir = camera.position.clone().normalize();
    let bestIndex = 0;
    let bestDot = -Infinity;

    for (let i = 0; i < pinPositions.length; i++) {
      // Transform local position to world space
      tempVec.copy(pinPositions[i]);
      groupRef.current.localToWorld(tempVec);
      tempVec.normalize();

      const dot = tempVec.dot(cameraDir);
      if (dot > bestDot) {
        bestDot = dot;
        bestIndex = i;
      }
    }

    // Hysteresis: only switch if new location is meaningfully more "in front"
    const currentDot = (() => {
      tempVec.copy(pinPositions[activeIndexRef.current]);
      groupRef.current.localToWorld(tempVec);
      tempVec.normalize();
      return tempVec.dot(cameraDir);
    })();

    if (bestIndex !== activeIndexRef.current && bestDot > currentDot + 0.05) {
      handleActiveChange(bestIndex);
    }
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
        autoRotateSpeed={0.5}
      />

      <group ref={groupRef}>
        <WireframeEarth />
        {locations.map((loc) => (
          <LocationPin
            key={loc.name}
            location={loc}
            isActive={loc.name === activeLocationName}
          />
        ))}
      </group>
    </>
  );
}
