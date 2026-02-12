'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { latLngToVector3, GLOBE_RADIUS, LocationGroup } from './utils';

interface LocationPinProps {
  location: LocationGroup;
  onClick: () => void;
}

const PIN_COLOR = '#FF9500';

export default function LocationPin({ location, onClick }: LocationPinProps) {
  const position = useMemo(
    () => latLngToVector3(location.lat, location.lng, GLOBE_RADIUS, 0.02),
    [location.lat, location.lng]
  );

  const pulseRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Orient ring to face outward from globe center
  const quaternion = useMemo(() => {
    const normal = position.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }, [position]);

  // Pulse animation
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const t = (clock.elapsedTime * 0.8) % 1;
      pulseRef.current.scale.setScalar(1 + t * 2);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 * (1 - t);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    // Back-face check: ignore clicks on pins behind the globe
    const normal = position.clone().normalize();
    const cameraDir = camera.position.clone().normalize();
    if (normal.dot(cameraDir) < 0) return;
    onClick();
  };

  return (
    <group position={position} quaternion={quaternion}>
      {/* Core pin dot */}
      <mesh onClick={handleClick}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={PIN_COLOR} />
      </mesh>

      {/* Pulse ring */}
      <mesh ref={pulseRef}>
        <ringGeometry args={[0.025, 0.04, 16]} />
        <meshBasicMaterial
          color={PIN_COLOR}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light for local glow */}
      <pointLight color={PIN_COLOR} intensity={0.3} distance={0.5} />

      {/* Invisible larger hitbox for easier clicking */}
      <mesh onClick={handleClick} visible={false}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}
