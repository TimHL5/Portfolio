'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { useThree, ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { latLngToVector3, GLOBE_RADIUS, LocationGroup } from './utils';

interface LocationPinProps {
  location: LocationGroup;
  onClick: () => void;
}

const PIN_COLOR = '#FF9500';
const POLE_HEIGHT = 0.15;

export default function LocationPin({ location, onClick }: LocationPinProps) {
  const position = useMemo(
    () => latLngToVector3(location.lat, location.lng, GLOBE_RADIUS, 0.01),
    [location.lat, location.lng]
  );

  const { camera } = useThree();

  // Orient group so local Z points outward from globe center
  const quaternion = useMemo(() => {
    const normal = position.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }, [position]);

  // Pole as a Three.js Line object
  const poleLine = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([0, 0, 0, 0, 0, POLE_HEIGHT]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const mat = new THREE.LineBasicMaterial({ color: PIN_COLOR, transparent: true, opacity: 0.5 });
    return new THREE.Line(geo, mat);
  }, []);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    // Back-face check: ignore clicks on pins behind the globe
    const normal = position.clone().normalize();
    const cameraDir = camera.position.clone().normalize();
    if (normal.dot(cameraDir) < 0) return;
    onClick();
  };

  const handleLabelClick = () => {
    // Back-face check for HTML label clicks too
    const normal = position.clone().normalize();
    const cameraDir = camera.position.clone().normalize();
    if (normal.dot(cameraDir) < 0) return;
    onClick();
  };

  return (
    <group position={position} quaternion={quaternion}>
      {/* Base dot on globe surface */}
      <mesh onClick={handleClick}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={PIN_COLOR} />
      </mesh>

      {/* Flag pole */}
      <primitive object={poleLine} />

      {/* Point light for subtle glow */}
      <pointLight color={PIN_COLOR} intensity={0.2} distance={0.4} />

      {/* City label at top of pole */}
      <Html
        position={[0, 0, POLE_HEIGHT + 0.02]}
        center
        occlude
        style={{ pointerEvents: 'auto' }}
      >
        <div
          onClick={handleLabelClick}
          className="flex items-center gap-1.5 px-2 py-1 bg-[#0A0A0A]/80 backdrop-blur border border-[#FF9500]/30 rounded cursor-pointer whitespace-nowrap hover:border-[#FF9500]/60 hover:bg-[#0A0A0A]/95 transition-colors select-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF9500]">
            {location.name}
          </span>
          <span className="w-4 h-4 rounded-full bg-[#FF9500]/20 text-[#FF9500] text-[9px] flex items-center justify-center font-mono">
            {location.experiences.length}
          </span>
        </div>
      </Html>

      {/* Invisible larger hitbox for easier clicking on 3D elements */}
      <mesh onClick={handleClick} visible={false}>
        <boxGeometry args={[0.1, 0.1, POLE_HEIGHT + 0.05]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}
