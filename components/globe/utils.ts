import * as THREE from 'three';
import { EXPERIENCE, PERSONAL } from '@/lib/constants';

export const GLOBE_RADIUS = 1.5;

export interface LocationGroup {
  name: string;
  lat: number;
  lng: number;
  flag: string;
  experiences: (typeof EXPERIENCE)[number][];
}

export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number = GLOBE_RADIUS,
  altitude: number = 0
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = radius + altitude;

  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export function groupExperiencesByLocation(): LocationGroup[] {
  const placeMap = new Map(
    PERSONAL.places.map((p) => [p.name, { lat: p.lat, lng: p.lng, flag: p.flag }])
  );

  const groups = new Map<string, LocationGroup>();

  for (const exp of EXPERIENCE) {
    const coords = placeMap.get(exp.location);
    if (!coords) continue;

    if (!groups.has(exp.location)) {
      groups.set(exp.location, {
        name: exp.location,
        lat: coords.lat,
        lng: coords.lng,
        flag: coords.flag,
        experiences: [],
      });
    }
    groups.get(exp.location)!.experiences.push(exp);
  }

  return Array.from(groups.values());
}
