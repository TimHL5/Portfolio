'use client';

import { Canvas } from '@react-three/fiber';
import GlobeScene from './GlobeScene';
import { LocationGroup } from './utils';

interface GlobeCanvasProps {
  scrollProgress: number;
  onPinClick: (location: LocationGroup) => void;
}

export default function GlobeCanvas({ scrollProgress, onPinClick }: GlobeCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <GlobeScene scrollProgress={scrollProgress} onPinClick={onPinClick} />
    </Canvas>
  );
}
