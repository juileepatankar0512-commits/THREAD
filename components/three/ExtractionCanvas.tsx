"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ExtractionProps {
  progress?: number;
  active?: boolean;
}

// Deterministic pseudo-random generator for React 19 purity compliance
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function ParticleStream({ active = true }: { active?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 90;

  // Generate stream particles that flow from left (document) to right (structured context)
  const [positions, initialData] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const data = [];

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 1.1 + 1);
      const r2 = seededRandom(i * 2.3 + 2);
      const r3 = seededRandom(i * 3.7 + 3);
      const r4 = seededRandom(i * 4.9 + 4);
      const r5 = seededRandom(i * 5.5 + 5);
      const r6 = seededRandom(i * 6.2 + 6);

      const x = -3.2 + r1 * 2.2;
      const y = -1.8 + r2 * 3.6;
      const z = (r3 - 0.5) * 1.5;
      const speed = 0.015 + r4 * 0.025;
      const offset = r5 * Math.PI * 2;
      const targetX = 2.5 + r6 * 1.8;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      data.push({ x, y, z, speed, offset, startX: x, targetX });
    }

    return [pos, data];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !active) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const item = initialData[i];
      // Flow from left to right with wave oscillation
      let currentX = array[i * 3] + item.speed;
      if (currentX > item.targetX) {
        currentX = item.startX;
      }
      array[i * 3] = currentX;
      array[i * 3 + 1] = item.y + Math.sin(t * 2 + item.offset) * 0.15;
      array[i * 3 + 2] = item.z + Math.cos(t * 1.5 + item.offset) * 0.1;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#a5884e"
          size={0.065}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </group>
  );
}

export function ExtractionCanvas({ active = true }: ExtractionProps) {
  return (
    <div className="extraction-canvas-layer" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ParticleStream active={active} />
      </Canvas>
    </div>
  );
}
