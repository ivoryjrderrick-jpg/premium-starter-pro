'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { BufferAttribute, BufferGeometry, Color, type Group } from 'three';

/**
 * Interactive low-poly mountain range.
 *
 * This module is the ONLY place three.js is imported, and it is loaded through
 * a dynamic import that is gated on viewport width + prefers-reduced-motion
 * (see HeroVisual.tsx). On phones and for reduced-motion users this chunk is
 * never requested.
 *
 * Geometry is generated here rather than loaded as a model — a GLTF plus the
 * drei loader would cost more bytes than the ~40 lines of noise below, and this
 * way there's no asset to fetch on top of the JS.
 */

/* ── Deterministic value noise ──────────────────────────────────────────────
   Seeded arithmetic rather than Math.random() so the range looks identical on
   every load instead of reshuffling itself between visits.                   */

function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = smoothstep(x - xi);
  const v = smoothstep(y - yi);

  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);

  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}

/** Ridged multifractal — squaring the inverted noise gives sharp alpine crests. */
function ridgedNoise(x: number, y: number): number {
  let amplitude = 1;
  let frequency = 1;
  let sum = 0;
  let norm = 0;

  for (let octave = 0; octave < 3; octave++) {
    const n = valueNoise(x * frequency, y * frequency);
    const ridge = 1 - Math.abs(n * 2 - 1);
    sum += ridge * ridge * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2.05;
  }

  return sum / norm;
}

const COLS = 44;
const ROWS = 26;
const WIDTH = 24;
const DEPTH = 11;
const AMPLITUDE = 3.6;

const COLOR_BASE = new Color('#131A2C');
const COLOR_MID = new Color('#C98F2E');
const COLOR_PEAK = new Color('#FFCB6B');

function heightAt(col: number, row: number): number {
  const u = col / COLS;
  const v = row / ROWS;

  // Row 0 is the far edge and row ROWS is nearest the camera, so the falloff is
  // inverted: peaks belong at the back, with an open foreground in front of them.
  const depthFalloff = Math.pow(1 - v, 1.3);

  // Ease the left and right edges down so the range doesn't clip the frame.
  const edgeFalloff = smoothstep(Math.min(1, Math.min(u, 1 - u) * 4.5));

  return ridgedNoise(u * 4.6, v * 3.1) * AMPLITUDE * depthFalloff * edgeFalloff;
}

/**
 * Builds a non-indexed triangle soup. Non-indexed is deliberate: it gives every
 * face its own vertices, which is what makes flatShading read as clean facets
 * instead of smoothed-over mush.
 */
function useMountainGeometry(): BufferGeometry {
  return useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const scratch = new Color();

    const pushVertex = (col: number, row: number) => {
      const h = heightAt(col, row);
      positions.push(
        (col / COLS - 0.5) * WIDTH,
        h,
        (row / ROWS - 0.5) * DEPTH,
      );

      // Amber at the crests fading to navy in the valleys.
      const t = Math.min(1, h / AMPLITUDE / 0.72);
      if (t < 0.55) {
        scratch.copy(COLOR_BASE).lerp(COLOR_MID, t / 0.55);
      } else {
        scratch.copy(COLOR_MID).lerp(COLOR_PEAK, (t - 0.55) / 0.45);
      }
      colors.push(scratch.r, scratch.g, scratch.b);
    };

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        // Two triangles per quad.
        pushVertex(col, row);
        pushVertex(col, row + 1);
        pushVertex(col + 1, row);

        pushVertex(col + 1, row);
        pushVertex(col, row + 1);
        pushVertex(col + 1, row + 1);
      }
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3));
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}

/** Reads the shared pointer ref and eases the range toward it. */
function Range({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<Group>(null);
  const geometry = useMountainGeometry();

  useFrame((state, delta) => {
    if (!group.current) return;

    // Slow ambient yaw. An oscillation rather than a full spin — a full
    // rotation would swing the flat underside of the terrain into view.
    const t = state.clock.elapsedTime;
    const ambientYaw = Math.sin(t * 0.055) * 0.14;

    const targetYaw = ambientYaw + pointer.current.x * 0.11;
    const targetPitch = pointer.current.y * 0.055;

    // Frame-rate independent easing, so a 120Hz display doesn't track faster.
    const ease = 1 - Math.pow(0.0015, delta);
    group.current.rotation.y += (targetYaw - group.current.rotation.y) * ease;
    group.current.rotation.x += (targetPitch - group.current.rotation.x) * ease;
  });

  return (
    <group ref={group} position={[0, -1.15, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial vertexColors flatShading roughness={0.92} metalness={0.05} />
      </mesh>
    </group>
  );
}

export default function MountainScene({
  onReady,
  paused = false,
}: {
  onReady?: () => void;
  paused?: boolean;
}) {
  const pointer = useRef({ x: 0, y: 0 });

  // Listen on the window rather than on the canvas: the canvas sits behind the
  // hero copy with pointer-events disabled, so canvas-local pointer events
  // would stop firing the moment the cursor crossed the headline.
  useEffect(() => {
    function onMove(e: MouseEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <Canvas
      // Capped DPR: retina displays gain nothing visible from a faceted scene
      // but pay 4x the fragment cost.
      dpr={[1, 1.75]}
      // Pulled back with a longer lens so the range sits low in frame as a
      // backdrop rather than crowding the headline.
      camera={{ position: [0, 1.9, 9.5], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      // Stops the render loop entirely once the hero scrolls out of view.
      frameloop={paused ? 'never' : 'always'}
      onCreated={() => onReady?.()}
    >
      {/* Fog does the atmospheric-perspective work, sinking the far ridges into
          the page background so the scene has no hard edges. */}
      <fog attach="fog" args={['#0D1220', 11, 30]} />
      <ambientLight intensity={0.95} color="#6B7A99" />
      <directionalLight position={[-6, 7, 4]} intensity={2.1} color="#FFD79A" />
      <directionalLight position={[5, 2, 3]} intensity={0.45} color="#3E5680" />
      <Range pointer={pointer} />
    </Canvas>
  );
}
