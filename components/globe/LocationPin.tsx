'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { latLngToVector3, GLOBE_RADIUS, LocationGroup } from './utils';

interface LocationPinProps {
  location: LocationGroup;
  isActive: boolean;
}

const PIN_COLOR = '#FF9500';
const POLE_HEIGHT = 0.18;

export default function LocationPin({ location, isActive }: LocationPinProps) {
  const position = useMemo(
    () => latLngToVector3(location.lat, location.lng, GLOBE_RADIUS, 0.01),
    [location.lat, location.lng]
  );

  // Orient group so local Z points outward from globe center
  const quaternion = useMemo(() => {
    const normal = position.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }, [position]);

  const dotRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const scaleRef = useRef(1);

  // Pole as a Three.js Line object (avoids SVG <line> conflict)
  const poleLine = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([0, 0, 0, 0, 0, POLE_HEIGHT]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const mat = new THREE.LineBasicMaterial({
      color: PIN_COLOR,
      transparent: true,
      opacity: 0.3,
    });
    return new THREE.Line(geo, mat);
  }, []);

  // Smooth lerped transitions for active/inactive states
  useFrame(() => {
    const targetScale = isActive ? 1.8 : 1;
    const targetPoleOpacity = isActive ? 0.8 : 0.3;
    const targetLightIntensity = isActive ? 0.6 : 0.1;

    scaleRef.current += (targetScale - scaleRef.current) * 0.08;
    if (dotRef.current) {
      dotRef.current.scale.setScalar(scaleRef.current);
    }

    if (poleLine.material instanceof THREE.LineBasicMaterial) {
      poleLine.material.opacity +=
        (targetPoleOpacity - poleLine.material.opacity) * 0.08;
    }

    if (lightRef.current) {
      lightRef.current.intensity +=
        (targetLightIntensity - lightRef.current.intensity) * 0.08;
    }
  });

  return (
    <group position={position} quaternion={quaternion}>
      {/* Base dot on globe surface */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={PIN_COLOR} />
      </mesh>

      {/* Flag pole */}
      <primitive object={poleLine} />

      {/* Point light for subtle glow */}
      <pointLight
        ref={lightRef}
        color={PIN_COLOR}
        intensity={0.1}
        distance={0.5}
      />

      {/* City label at top of pole */}
      <Html
        position={[0, 0, POLE_HEIGHT + 0.02]}
        center
        occlude
        style={{ pointerEvents: 'none' }}
      >
        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded whitespace-nowrap select-none transition-all duration-500 ${
            isActive
              ? 'bg-[#0A0A0A]/90 border border-[#FF9500]/60 shadow-[0_0_12px_rgba(255,149,0,0.2)]'
              : 'bg-[#0A0A0A]/60 border border-offwhite/10'
          }`}
          style={{
            transform: `scale(${isActive ? 1.1 : 0.85})`,
            transition: 'transform 0.5s ease',
          }}
        >
          <span
            className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-500 ${
              isActive ? 'text-[#FF9500]' : 'text-offwhite/30'
            }`}
          >
            {location.name}
          </span>
          <span
            className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-mono transition-colors duration-500 ${
              isActive
                ? 'bg-[#FF9500]/20 text-[#FF9500]'
                : 'bg-offwhite/5 text-offwhite/20'
            }`}
          >
            {location.experiences.length}
          </span>
        </div>
      </Html>
    </group>
  );
}
