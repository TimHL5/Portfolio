'use client';

import { useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WireframeEarth from './WireframeEarth';
import LocationPin from './LocationPin';
import { groupExperiencesByLocation, latLngToVector3, GLOBE_RADIUS, LocationGroup } from './utils';

interface GlobeSceneProps {
  onActiveLocationChange: (location: LocationGroup) => void;
  activeLocationName: string;
  targetLocationName?: string;
  onCityClick?: (location: LocationGroup) => void;
}

export default function GlobeScene({
  onActiveLocationChange,
  activeLocationName,
  targetLocationName,
  onCityClick,
}: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
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

  // Find target location index
  const targetIndex = useMemo(() => {
    if (!targetLocationName) return -1;
    return locations.findIndex((l) => l.name === targetLocationName);
  }, [targetLocationName, locations]);

  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    if (targetIndex >= 0 && pinPositions[targetIndex]) {
      // Rotate globe to face the target location toward the camera
      const pin = pinPositions[targetIndex];
      const targetY = -Math.atan2(pin.x, pin.z);

      let currentY = groupRef.current.rotation.y;
      let diff = targetY - currentY;
      // Wrap to [-PI, PI] for shortest path
      diff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
      if (diff < -Math.PI) diff += Math.PI * 2;

      if (Math.abs(diff) > 0.005) {
        groupRef.current.rotation.y += diff * 0.08;
      }
    } else {
      // Idle: slow constant spin
      groupRef.current.rotation.y += 0.002;

      // Only detect which location faces the camera during idle spin
      // (skip during targeted rotation to avoid overriding user's city selection)
      const cameraDir = camera.position.clone().normalize();
      let bestIndex = 0;
      let bestDot = -Infinity;

      for (let i = 0; i < pinPositions.length; i++) {
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
      />

      <group ref={groupRef}>
        <WireframeEarth />
        {locations.map((loc) => (
          <LocationPin
            key={loc.name}
            location={loc}
            isActive={loc.name === activeLocationName}
            onClick={() => onCityClick?.(loc)}
          />
        ))}
      </group>
    </>
  );
}
