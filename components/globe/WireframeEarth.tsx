'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GLOBE_RADIUS } from './utils';

export default function WireframeEarth() {
  const wireRef = useRef<THREE.LineSegments>(null);

  const segments = typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 40;

  const geometry = useMemo(() => {
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, segments, segments);
    const wireGeo = new THREE.WireframeGeometry(sphereGeo);
    sphereGeo.dispose();
    return wireGeo;
  }, [segments]);

  // Subtle pulse animation on wireframe opacity
  useFrame(({ clock }) => {
    if (wireRef.current) {
      const material = wireRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.15 + Math.sin(clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group>
      {/* Solid dark inner sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.995, segments, segments]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.95} />
      </mesh>

      {/* Wireframe overlay - glowing grid lines */}
      <lineSegments ref={wireRef} geometry={geometry}>
        <lineBasicMaterial
          color="#FF9500"
          transparent
          opacity={0.15}
          depthTest={true}
        />
      </lineSegments>

      {/* Faint atmosphere glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.02, 32, 32]} />
        <meshBasicMaterial
          color="#FF9500"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
