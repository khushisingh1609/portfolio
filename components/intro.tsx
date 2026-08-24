'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

/* ============================================================
   DIGITAL UNIVERSE — 3D Ring Convergence
   ============================================================ */

type Phase = 0 | 1 | 2 | 3 | 4 | 5;
const STORAGE_KEY = 'digitalUniverseIntroShown_3DRing';

const TIMING = {
  toExpand: 400,
  toRing: 1500,     // Particles pull into the circle
  toReveal: 2500,   // Text fades in
  toExit: 4500,     // Explosion
  toRemove: 5500,
  removeBuffer: 1000,
};

/* ---------- 3D Particle System Component ---------- */

function ParticleRing({ phase }: { phase: Phase }) {
  const count = 2500; // Increased count for a denser, richer ring
  const meshRef = useRef<THREE.Points>(null);
  
  // Calculate initial chaotic sphere and the target perfectly structured ring
  const { targets, geometry } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const tgt = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorPink = new THREE.Color('#F472B6');
    const colorPurple = new THREE.Color('#C084FC');
    const colorCyan = new THREE.Color('#22d3ee');

    const ringRadius = 16; // Size of the circle framing your text
    const ringThickness = 3; // How "thick" or 3D the ring is

    for (let i = 0; i < count; i++) {
      // 1. Initial State: Massive Chaotic Sphere
      const r1 = 45 * Math.cbrt(Math.random());
      const theta1 = Math.random() * 2 * Math.PI;
      const phi1 = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r1 * Math.sin(phi1) * Math.cos(theta1);     
      pos[i * 3 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1); 
      pos[i * 3 + 2] = r1 * Math.cos(phi1);                   

      // 2. Target State: A 3D Torus (Ring)
      const ringAngle = Math.random() * Math.PI * 2;
      // Random offset to give the ring volume (so it's not a flat line)
      const offsetX = (Math.random() - 0.5) * ringThickness;
      const offsetY = (Math.random() - 0.5) * ringThickness;
      const offsetZ = (Math.random() - 0.5) * (ringThickness * 2); 

      tgt[i * 3] = (ringRadius + offsetX) * Math.cos(ringAngle);
      tgt[i * 3 + 1] = (ringRadius + offsetY) * Math.sin(ringAngle); 
      tgt[i * 3 + 2] = offsetZ;

      // 3. Colors
      const mixedColor = [colorPink, colorPurple, colorCyan][Math.floor(Math.random() * 3)];
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    return { targets: tgt, geometry: geo };
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const posArray = geometry.attributes.position.array as Float32Array;

    // Continuously spin the entire 3D ring like a high-tech loading wheel
    meshRef.current.rotation.z -= delta * 0.4;
    // Add a slight dynamic 3D tilt
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.15;

    let lerpFactor = 0;
    if (phase === 2 || phase === 3) lerpFactor = 0.05; // Smoothly pull into the ring
    if (phase >= 4) lerpFactor = 0.15; // Fast explosion

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      if (phase >= 2 && phase <= 3) {
        // Pull particles into the structured ring
        posArray[idx] += (targets[idx] - posArray[idx]) * lerpFactor;
        posArray[idx + 1] += (targets[idx + 1] - posArray[idx + 1]) * lerpFactor;
        posArray[idx + 2] += (targets[idx + 2] - posArray[idx + 2]) * lerpFactor;
      } else if (phase >= 4) {
        // Explode outward towards the camera
        posArray[idx] *= 1.08;
        posArray[idx + 1] *= 1.08;
        posArray[idx + 2] += 2.5;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial 
        size={0.25} 
        vertexColors 
        transparent 
        opacity={phase >= 4 ? 0 : 0.9} 
        sizeAttenuation={true} 
      />
    </points>
  );
}

/* ---------- Main Component ---------- */

const overlayVariants: Variants = {
  active: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 1.2, ease: 'easeInOut' } },
};

const identityVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: 'easeOut', delay: 0.2 } },
};

export default function Intro() {
  const [mounted, setMounted] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [phase, setPhase] = useState<Phase>(0);
  const [removed, setRemoved] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMounted(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setRemoved(true);
      return;
    }

    setShouldShow(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');

    const schedule = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    schedule(() => setPhase(1), TIMING.toExpand);
    schedule(() => setPhase(2), TIMING.toRing);
    schedule(() => setPhase(3), TIMING.toReveal);
    schedule(() => setPhase(4), TIMING.toExit);
    schedule(() => setPhase(5), TIMING.toRemove);
    schedule(() => setRemoved(true), TIMING.toRemove + TIMING.removeBuffer);

    return () => timers.current.forEach(clearTimeout);
  }, []);

  if (!mounted || removed || !shouldShow) return null;

  const overlayExiting = phase >= 4;
  const showIdentity = phase >= 3 && phase < 5;

  return (
    <>
      <motion.div
        className="du-overlay"
        variants={overlayVariants}
        initial="active"
        animate={overlayExiting ? 'exit' : 'active'}
      >
        <div className="du-vignette" />

        {/* 3D WebGL Canvas */}
        <div className="du-canvas-container">
          <Canvas camera={{ position: [0, 0, 45], fov: 60 }}>
            <ParticleRing phase={phase} />
          </Canvas>
        </div>

        {/* 2D Crisp Text Overlay (Perfectly Centered inside the Ring) */}
        <motion.div
          className="du-identity"
          variants={identityVariants}
          initial="hidden"
          animate={showIdentity ? 'visible' : 'hidden'}
        >
          <span className="du-logo">&lt;KS/&gt;</span>
          <span className="du-name">KHUSHI SINGH</span>
          <span className="du-title">AI/ML ENGINEER</span>
        </motion.div>
      </motion.div>

      <style>{`
        .du-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #09090b; 
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .du-canvas-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .du-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 30%, rgba(9,9,11,0.9) 100%);
          pointer-events: none;
          z-index: 2;
        }
        .du-identity {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }
        .du-logo {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, #F472B6, #C084FC);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 0.25rem;
          text-shadow: 0 0 20px rgba(192, 132, 252, 0.4);
        }
        .du-name {
          font-size: clamp(1rem, 3vw, 1.5rem);
          font-weight: 700;
          color: #F8FAFC;
          letter-spacing: 0.15em;
        }
        .du-title {
          font-size: clamp(0.7rem, 2vw, 0.9rem);
          font-weight: 500;
          letter-spacing: 0.3em;
          color: #22d3ee;
        }
      `}</style>
    </>
  );
}