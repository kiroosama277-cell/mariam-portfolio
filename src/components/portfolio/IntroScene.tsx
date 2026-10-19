"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ---------------- Outfits ---------------- */
export type OutfitKey = "black" | "plum" | "gold";

export const OUTFITS: Record<
  OutfitKey,
  { jacket: string; shirt: string; skirt: string; boots: string; swatch: string }
> = {
  black: { jacket: "#221b20", shirt: "#f0e0c4", skirt: "#221b20", boots: "#1c161a", swatch: "#2a2128" },
  plum: { jacket: "#6d2545", shirt: "#f7f1e4", skirt: "#6d2545", boots: "#f3ead9", swatch: "#8e3057" },
  gold: { jacket: "#c39c52", shirt: "#fbf4e4", skirt: "#b58a3e", boots: "#8a6a30", swatch: "#d9b569" },
};

/* ---------------- Easing ---------------- */
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---------------- Cinematic timeline (seconds) ----------------
   0.0 – 2.4  extreme close-up on the face (micro drift)
   2.4 – 5.2  dramatic pull-back to a portrait
   5.2 – 6.2  hold portrait
   6.2 – 8.6  pull back to full body
   8.6 – 9.4  hold
   9.4 – 19.0 slow 360° orbit around the character
   19.0 + ∞   idle sway + mouse parallax                          */
const T = {
  closeEnd: 3.2,
  pull1End: 6.0,
  portraitEnd: 7.0,
  pull2End: 9.4,
  medEnd: 10.2,
  orbitEnd: 19.6,
};

const SHOT_CLOSE = {
  pos: new THREE.Vector3(0.05, 1.84, 0.82),
  look: new THREE.Vector3(0, 1.8, 0.15),
  fov: 40,
};
const SHOT_PORTRAIT = {
  pos: new THREE.Vector3(0.42, 1.76, 2.0),
  look: new THREE.Vector3(0, 1.64, 0),
  fov: 40,
};
const SHOT_MEDIUM = {
  pos: new THREE.Vector3(0.14, 1.32, 4.1),
  look: new THREE.Vector3(0, 0.95, 0),
  fov: 40,
};

type MouseRef = { current: { x: number; y: number } };

/* ---------------- Face (head-local coordinates) ---------------- */
function Face({
  eyeLRef,
  eyeRRef,
}: {
  eyeLRef: React.RefObject<THREE.Group | null>;
  eyeRRef: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group>
      {/* eyes (grouped so they can blink) */}
      <group ref={eyeLRef} position={[-0.115, 0.02, 0.3]}>
        <mesh>
          <sphereGeometry args={[0.05, 24, 24]} />
          <meshStandardMaterial color="#181114" roughness={0.25} />
        </mesh>
        <mesh position={[0.017, 0.022, 0.042]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      <group ref={eyeRRef} position={[0.115, 0.02, 0.3]}>
        <mesh>
          <sphereGeometry args={[0.05, 24, 24]} />
          <meshStandardMaterial color="#181114" roughness={0.25} />
        </mesh>
        <mesh position={[0.017, 0.022, 0.042]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      {/* lashes — tiny top lids for character */}
      <mesh position={[-0.115, 0.062, 0.305]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.115, 0.018, 0.03]} />
        <meshStandardMaterial color="#241721" roughness={0.4} />
      </mesh>
      <mesh position={[0.115, 0.062, 0.305]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.115, 0.018, 0.03]} />
        <meshStandardMaterial color="#241721" roughness={0.4} />
      </mesh>
      {/* smile */}
      <mesh position={[0, -0.12, 0.315]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.058, 0.016, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#5e2430" roughness={0.4} />
      </mesh>
      {/* blush */}
      <mesh position={[-0.215, -0.08, 0.27]} rotation={[0, -0.35, 0]}>
        <circleGeometry args={[0.038, 20]} />
        <meshBasicMaterial color="#e79ab0" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.215, -0.08, 0.27]} rotation={[0, 0.35, 0]}>
        <circleGeometry args={[0.038, 20]} />
        <meshBasicMaterial color="#e79ab0" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

/* ---------------- Character ---------------- */
function Character({
  outfit,
  mouse,
  exiting,
}: {
  outfit: OutfitKey;
  mouse: MouseRef;
  exiting: React.MutableRefObject<boolean>;
}) {
  const group = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Group>(null);
  const eyeR = useRef<THREE.Group>(null);
  const nextBlink = useRef(2.2);
  const blinkStart = useRef(-1);
  const colors = OUTFITS[outfit];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    /* breathing + gentle sway */
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.4) * 0.035;
      group.current.rotation.y = Math.sin(t * 0.5) * 0.06;
    }

    /* head follows the cursor a little */
    if (head.current) {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      head.current.rotation.y = THREE.MathUtils.lerp(
        head.current.rotation.y,
        mx * 0.22,
        0.06
      );
      head.current.rotation.x = THREE.MathUtils.lerp(
        head.current.rotation.x,
        -my * 0.1,
        0.06
      );
      head.current.rotation.z = Math.sin(t * 0.8) * 0.045;
    }

    /* blinking */
    if (t > nextBlink.current) {
      blinkStart.current = t;
      nextBlink.current = t + 2.6 + Math.random() * 2.8;
    }
    if (blinkStart.current > 0) {
      const bt = t - blinkStart.current;
      const d = 0.22;
      const s =
        bt >= d
          ? 1
          : Math.max(0.08, 1 - 0.92 * Math.sin((bt / d) * Math.PI));
      if (eyeL.current) eyeL.current.scale.y = s;
      if (eyeR.current) eyeR.current.scale.y = s;
      if (bt >= d) blinkStart.current = -1;
    }

    /* waving — occasionally, and always while exiting */
    const cycle = t % 9;
    const waving = exiting.current || (cycle > 5.5 && cycle < 8.2);
    if (armR.current) {
      const target = waving
        ? -2.4 + Math.sin(t * 9) * 0.35
        : Math.sin(t * 1.4) * 0.06;
      armR.current.rotation.z = THREE.MathUtils.lerp(
        armR.current.rotation.z,
        target,
        0.12
      );
    }
    if (armL.current) {
      armL.current.rotation.z = THREE.MathUtils.lerp(
        armL.current.rotation.z,
        Math.sin(t * 1.4 + 1) * 0.06,
        0.1
      );
    }
  });

  return (
    <group ref={group} position={[0, 0.08, 0]}>
      {/* ---- Head ---- */}
      <group ref={head} position={[0, 1.78, 0]}>
        <mesh>
          <sphereGeometry args={[0.32, 48, 48]} />
          <meshStandardMaterial color="#f2c9a4" roughness={0.55} />
        </mesh>
        <Face eyeLRef={eyeL} eyeRRef={eyeR} />
        {/* hair — bob cap */}
        <mesh position={[0, 0.075, -0.045]} scale={[1.13, 1.05, 1.1]}>
          <sphereGeometry args={[0.315, 40, 40, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
          <meshStandardMaterial color="#1b1318" roughness={0.35} />
        </mesh>
        {/* bangs */}
        <mesh position={[0, 0.16, 0.21]} rotation={[0.35, 0, 0]}>
          <boxGeometry args={[0.5, 0.16, 0.14]} />
          <meshStandardMaterial color="#1b1318" roughness={0.35} />
        </mesh>
        {/* side strands */}
        <mesh position={[-0.3, -0.08, 0.02]}>
          <boxGeometry args={[0.13, 0.42, 0.24]} />
          <meshStandardMaterial color="#1b1318" roughness={0.35} />
        </mesh>
        <mesh position={[0.3, -0.08, 0.02]}>
          <boxGeometry args={[0.13, 0.42, 0.24]} />
          <meshStandardMaterial color="#1b1318" roughness={0.35} />
        </mesh>
        {/* back hair */}
        <mesh position={[0, -0.1, -0.18]}>
          <boxGeometry args={[0.42, 0.5, 0.2]} />
          <meshStandardMaterial color="#1b1318" roughness={0.35} />
        </mesh>
        {/* tiny gold hairpin */}
        <mesh position={[0.21, 0.14, 0.14]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.1, 0.02, 0.02]} />
          <meshStandardMaterial color="#d8b25e" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* ---- Torso ---- */}
      <RoundedBox args={[0.58, 0.62, 0.32]} radius={0.07} position={[0, 1.06, 0]}>
        <meshStandardMaterial color={colors.jacket} roughness={0.6} />
      </RoundedBox>
      {/* inner shirt */}
      <mesh position={[0, 1.08, 0.165]}>
        <boxGeometry args={[0.2, 0.56, 0.02]} />
        <meshStandardMaterial color={colors.shirt} roughness={0.7} />
      </mesh>
      {/* buttons */}
      <mesh position={[0, 1.18, 0.185]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial color="#d8b25e" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.02, 0.185]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial color="#d8b25e" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* collar */}
      <mesh position={[-0.13, 1.36, 0.14]} rotation={[0.2, 0, 0.5]}>
        <boxGeometry args={[0.14, 0.16, 0.03]} />
        <meshStandardMaterial color={colors.jacket} roughness={0.6} />
      </mesh>
      <mesh position={[0.13, 1.36, 0.14]} rotation={[0.2, 0, -0.5]}>
        <boxGeometry args={[0.14, 0.16, 0.03]} />
        <meshStandardMaterial color={colors.jacket} roughness={0.6} />
      </mesh>

      {/* ---- Arms ---- */}
      <group ref={armL} position={[-0.38, 1.33, 0]}>
        <RoundedBox args={[0.14, 0.5, 0.14]} radius={0.05} position={[0, -0.27, 0]}>
          <meshStandardMaterial color={colors.jacket} roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, -0.56, 0]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial color="#f2c9a4" roughness={0.55} />
        </mesh>
      </group>
      <group ref={armR} position={[0.38, 1.33, 0]}>
        <RoundedBox args={[0.14, 0.5, 0.14]} radius={0.05} position={[0, -0.27, 0]}>
          <meshStandardMaterial color={colors.jacket} roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, -0.56, 0]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial color="#f2c9a4" roughness={0.55} />
        </mesh>
      </group>

      {/* ---- Skirt ---- */}
      <mesh position={[0, 0.63, 0]}>
        <cylinderGeometry args={[0.3, 0.47, 0.42, 32]} />
        <meshStandardMaterial color={colors.skirt} roughness={0.65} />
      </mesh>

      {/* ---- Legs ---- */}
      <mesh position={[-0.14, 0.3, 0]}>
        <boxGeometry args={[0.14, 0.32, 0.14]} />
        <meshStandardMaterial color="#eec39c" roughness={0.55} />
      </mesh>
      <mesh position={[0.14, 0.3, 0]}>
        <boxGeometry args={[0.14, 0.32, 0.14]} />
        <meshStandardMaterial color="#eec39c" roughness={0.55} />
      </mesh>

      {/* ---- Boots ---- */}
      <RoundedBox args={[0.17, 0.2, 0.24]} radius={0.05} position={[-0.14, 0.1, 0.03]}>
        <meshStandardMaterial color={colors.boots} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.17, 0.2, 0.24]} radius={0.05} position={[0.14, 0.1, 0.03]}>
        <meshStandardMaterial color={colors.boots} roughness={0.5} />
      </RoundedBox>
      {/* boot soles */}
      <mesh position={[-0.14, 0.012, 0.04]}>
        <boxGeometry args={[0.18, 0.03, 0.25]} />
        <meshStandardMaterial color="#d8b25e" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.14, 0.012, 0.04]}>
        <boxGeometry args={[0.18, 0.03, 0.25]} />
        <meshStandardMaterial color="#d8b25e" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ---------------- Podium ---------------- */
function Podium() {
  return (
    <group position={[0, -0.02, 0]}>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.75, 1.9, 0.16, 64]} />
        <meshStandardMaterial color="#40102a" roughness={0.8} />
      </mesh>
      {/* gold rim */}
      <mesh position={[0, -0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.76, 0.035, 16, 90]} />
        <meshStandardMaterial color="#d3a94f" metalness={0.75} roughness={0.3} />
      </mesh>
      {/* inner rings */}
      <mesh position={[0, 0.015, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.02, 12, 70]} />
        <meshStandardMaterial color="#8a5f3a" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.015, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.014, 12, 80]} />
        <meshStandardMaterial color="#6e4a30" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ---------------- Camera rig ---------------- */
function computeShot(t: number, dist: number, out: { pos: THREE.Vector3; look: THREE.Vector3; fov: number }) {
  if (t < T.pull1End) {
    // close-up (hold then ease out)
    const p = easeInOutCubic(clamp01((t - T.closeEnd) / (T.pull1End - T.closeEnd)));
    out.pos.lerpVectors(SHOT_CLOSE.pos, SHOT_PORTRAIT.pos, p);
    out.look.lerpVectors(SHOT_CLOSE.look, SHOT_PORTRAIT.look, p);
    out.fov = lerp(SHOT_CLOSE.fov, SHOT_PORTRAIT.fov, p);
  } else if (t < T.pull2End) {
    const p1 = easeInOutCubic(clamp01((t - T.portraitEnd) / (T.pull2End - T.portraitEnd)));
    out.pos.lerpVectors(SHOT_PORTRAIT.pos, SHOT_MEDIUM.pos, p1);
    out.look.lerpVectors(SHOT_PORTRAIT.look, SHOT_MEDIUM.look, p1);
    out.fov = lerp(SHOT_PORTRAIT.fov, SHOT_MEDIUM.fov, p1);
  } else if (t < T.orbitEnd) {
    // slow cinematic 360° orbit
    const p = easeInOutCubic(clamp01((t - T.medEnd) / (T.orbitEnd - T.medEnd)));
    const theta = p * Math.PI * 2;
    const r = lerp(4.3, 5.1, p) * dist;
    const y = lerp(1.3, 1.08, p);
    out.pos.set(Math.sin(theta) * r, y, Math.cos(theta) * r);
    out.look.set(0, 0.94, 0);
    out.fov = SHOT_MEDIUM.fov;
  } else {
    // idle sway forever
    const theta = Math.sin(t * 0.14) * 0.12;
    const r = (4.95 + Math.sin(t * 0.32) * 0.07) * dist;
    out.pos.set(Math.sin(theta) * r, 1.1 + Math.sin(t * 0.5) * 0.035, Math.cos(theta) * r);
    out.look.set(0, 0.95, 0);
    out.fov = SHOT_MEDIUM.fov;
  }
  return out;
}

function Rig({
  mouse,
  dist,
  exiting,
}: {
  mouse: MouseRef;
  dist: number;
  exiting: React.MutableRefObject<boolean>;
}) {
  const exitStart = useRef<number | null>(null);
  const look = useRef(new THREE.Vector3().copy(SHOT_CLOSE.look));
  const tmpRef = useRef({
    pos: new THREE.Vector3(),
    look: new THREE.Vector3(),
    fov: 40,
  });

  useFrame(({ camera, clock }, delta) => {
    const t = clock.getElapsedTime();
    const tmp = tmpRef.current;

    if (exiting.current && exitStart.current === null) exitStart.current = t;

    computeShot(t, dist, tmp);

    /* mouse parallax (fades in after the opening seconds) */
    const w = 0.55 * clamp01((t - 1.2) / 2.4);
    const mx = mouse.current.x;
    const my = mouse.current.y;
    tmp.pos.x += mx * 0.22 * w;
    tmp.pos.y += -my * 0.12 * w;
    tmp.look.x += mx * 0.06 * w;

    /* exit: push back in toward the face like the opening shot */
    if (exitStart.current !== null) {
      const p = easeInOutCubic(clamp01((t - exitStart.current) / 0.95));
      tmp.pos.lerp(SHOT_CLOSE.pos, p);
      tmp.look.lerp(SHOT_CLOSE.look, p);
      tmp.fov = lerp(tmp.fov, 36, p);
    }

    /* damped cinematic follow */
    const k = 1 - Math.exp(-delta * 5.2);
    camera.position.lerp(tmp.pos, k);
    look.current.lerp(tmp.look, k);
    camera.lookAt(look.current);
    const cam = camera as THREE.PerspectiveCamera;
    if (Math.abs(cam.fov - tmp.fov) > 0.01) {
      cam.fov = lerp(cam.fov, tmp.fov, k);
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

/* ---------------- Floating light streaks ---------------- */
function Streaks() {
  const group = useRef<THREE.Group>(null);
  const spots = useMemo(
    () =>
      [
        { p: [-4.4, 2.6, -1] as const, len: 3.4, o: 0.5 },
        { p: [4.6, 1.4, -1] as const, len: 3.0, o: 0.55 },
        { p: [-3.8, -1.6, -1] as const, len: 2.6, o: 0.4 },
        { p: [3.6, 3.2, -1] as const, len: 3.2, o: 0.45 },
        { p: [0.4, -1.9, -1.4] as const, len: 2.2, o: 0.35 },
      ] as const,
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.08) * 0.14;
      group.current.position.y = Math.sin(t * 0.22) * 0.12;
    }
    group.current?.children.forEach((child, i) => {
      child.rotation.z = Math.PI / 3.6 + Math.sin(t * 0.3 + i * 1.7) * 0.05;
    });
  });

  return (
    <group ref={group}>
      {spots.map((s, i) => (
        <group key={i} position={[s.p[0], s.p[1], s.p[2]]}>
          <mesh rotation={[0, 0, Math.PI / 3.6]}>
            <boxGeometry args={[s.len, 0.045, 0.02]} />
            <meshBasicMaterial color="#f5e8d8" transparent opacity={s.o} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------------- Scene ---------------- */
export default function IntroScene({
  outfit,
  mouse,
  dist,
  exiting,
}: {
  outfit: OutfitKey;
  mouse: MouseRef;
  dist: number;
  exiting: React.MutableRefObject<boolean>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{
        position: SHOT_CLOSE.pos.toArray(),
        fov: SHOT_CLOSE.fov,
        near: 0.1,
        far: 60,
      }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.62} />
      <directionalLight position={[3, 5, 4]} intensity={1.15} color="#ffe6c4" />
      <pointLight position={[-3, 2, 3]} intensity={12} color="#e8a0b8" distance={12} />
      <pointLight position={[0, 3.5, 2]} intensity={10} color="#ffd98a" distance={10} />
      {/* rim light for the cinematic edge */}
      <pointLight position={[-2.4, 2.6, -3.2]} intensity={26} color="#ff9db8" distance={14} />
      <pointLight position={[2.6, 1.2, -3]} intensity={18} color="#d3a94f" distance={14} />

      <Rig mouse={mouse} dist={dist} exiting={exiting} />
      <Character outfit={outfit} mouse={mouse} exiting={exiting} />
      <Podium />
      <Streaks />

      <Sparkles count={140} scale={[11, 6.5, 3]} size={2.6} speed={0.35} color="#f0d9ae" opacity={0.85} />
      <Sparkles count={50} scale={[7, 4, 2]} size={4.5} speed={0.2} color="#ffffff" opacity={0.6} />
    </Canvas>
  );
}
