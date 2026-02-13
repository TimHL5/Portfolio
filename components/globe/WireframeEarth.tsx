'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import * as topojson from 'topojson-client';
import type { Topology } from 'topojson-specification';
import landData from 'world-atlas/land-110m.json';
import { GLOBE_RADIUS } from './utils';

// Convert [lng, lat] to 3D position on sphere
function coordToVec3(coord: number[], radius: number): THREE.Vector3 {
  const lng = coord[0];
  const lat = coord[1];
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function WireframeEarth() {
  const wireRef = useRef<THREE.LineSegments>(null);

  const segments = typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 40;

  const wireGeometry = useMemo(() => {
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, segments, segments);
    const wireGeo = new THREE.WireframeGeometry(sphereGeo);
    sphereGeo.dispose();
    return wireGeo;
  }, [segments]);

  // Build country outline geometries from TopoJSON
  const countryLines = useMemo(() => {
    const topoData = landData as unknown as Topology;
    const geo = topojson.feature(topoData, topoData.objects.land) as unknown as GeoJSON.FeatureCollection;
    const allPoints: number[] = [];

    const processRing = (ring: number[][]) => {
      for (let i = 0; i < ring.length - 1; i++) {
        const a = coordToVec3(ring[i], GLOBE_RADIUS * 1.001);
        const b = coordToVec3(ring[i + 1], GLOBE_RADIUS * 1.001);
        allPoints.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    };

    const features = geo.features ?? [geo];
    for (const feature of features) {
      const geom = (feature as GeoJSON.Feature).geometry ?? feature;
      if (geom.type === 'Polygon') {
        for (const ring of geom.coordinates) {
          processRing(ring);
        }
      } else if (geom.type === 'MultiPolygon') {
        for (const polygon of geom.coordinates) {
          for (const ring of polygon) {
            processRing(ring);
          }
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(allPoints, 3)
    );
    return geometry;
  }, []);

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

      {/* Wireframe overlay - faint grid lines */}
      <lineSegments ref={wireRef} geometry={wireGeometry}>
        <lineBasicMaterial
          color="#FF9500"
          transparent
          opacity={0.06}
          depthTest={true}
        />
      </lineSegments>

      {/* Country outlines */}
      <lineSegments geometry={countryLines}>
        <lineBasicMaterial
          color="#FF9500"
          transparent
          opacity={0.35}
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
