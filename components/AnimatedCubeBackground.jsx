'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────────────────
   AnimatedCubeBackground
   Pure Three.js (no React Three Fiber) — avoids reconciler version issues.
   Renders floating dark-metallic cubes with glowing cyan edges, particles,
   blue/cyan lighting, and subtle mouse parallax.
───────────────────────────────────────────────────────────────────────── */

const CUBE_CONFIGS = [
  // [x, y, z, size, rotSpeedX, rotSpeedY, rotSpeedZ, floatRange, phaseOffset]
  [-3.2,  0.5, -1.5, 1.40, 0.0020, 0.0040, 0.0010, 0.35, 0.0],
  [-1.8,  2.2, -2.5, 0.90, 0.0030, 0.0020, 0.0020, 0.28, 1.2],
  [-4.8, -0.4, -3.0, 0.65, 0.0040, 0.0050, 0.0030, 0.22, 2.1],
  [-2.5, -1.9, -2.0, 1.00, 0.0020, 0.0030, 0.0010, 0.32, 3.3],
  [-0.8,  3.2, -4.0, 0.40, 0.0060, 0.0070, 0.0040, 0.18, 0.7],
  [-5.6,  1.2, -4.5, 0.55, 0.0050, 0.0030, 0.0030, 0.25, 1.8],
  [-1.2, -0.5, -1.0, 0.75, 0.0030, 0.0040, 0.0020, 0.30, 4.1],
  [-3.9,  1.8, -6.0, 1.10, 0.0010, 0.0020, 0.0010, 0.20, 2.8],
  [-2.1,  3.8, -5.0, 0.30, 0.0080, 0.0090, 0.0050, 0.15, 5.0],
  [-6.2, -1.0, -5.0, 0.45, 0.0040, 0.0030, 0.0030, 0.18, 3.6],
  [-0.5,  1.0, -2.0, 0.60, 0.0025, 0.0045, 0.0015, 0.26, 4.8],
];

export default function AnimatedCubeBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;
    if (!container) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.setClearColor(0x000000, 0); // transparent — CSS handles bg color

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(
      58,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    /* ── Scene ── */
    const scene = new THREE.Scene();

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x050d1e, 0.3));

    const blueLight = new THREE.PointLight(0x1677ff, 3.0, 18, 2);
    blueLight.position.set(-6, 2, 2);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00d9ff, 3.5, 14, 2);
    cyanLight.position.set(-2, 1, 3);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x6d5bff, 1.3, 12, 2);
    violetLight.position.set(-4, -4, 1);
    scene.add(violetLight);

    const spotlight = new THREE.SpotLight(0x1677ff, 3.5, 28, Math.PI * 0.25, 0.8, 2);
    spotlight.position.set(-4, 5, 3);
    scene.add(spotlight);

    /* ── Cube group (for parallax) ── */
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    /* ── Materials ── */
    const faceMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x060d1a),
      metalness: 0.92,
      roughness: 0.18,
      transparent: true,
      opacity: 0.88,
    });
    const edgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x00d9ff),
      transparent: true,
      opacity: 0.85,
    });

    /* ── Build cubes ── */
    const cubeData = CUBE_CONFIGS.map(([x, y, z, size, rsx, rsy, rsz, fr, ph]) => {
      const group = new THREE.Group();
      group.position.set(x, y, z);
      group._basePos = { x, y, z };
      group._rotSpeed = { x: rsx, y: rsy, z: rsz };
      group._floatRange = fr;
      group._phase = ph;

      const boxGeo = new THREE.BoxGeometry(size, size, size);
      const mesh = new THREE.Mesh(boxGeo, faceMat.clone());
      group.add(mesh);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(boxGeo),
        edgeMat.clone()
      );
      group.add(edges);
      group._edges = edges;

      sceneGroup.add(group);
      return group;
    });

    /* ── Light rays (thin translucent boxes) ── */
    const rayConfigs = [
      [-3.5,  0.8, -2.0, Math.PI / 4],
      [-2.0,  1.5, -3.0, -Math.PI / 5],
      [-4.5, -0.5, -3.5, Math.PI / 6],
    ];
    const rayMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x1677ff),
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const rayMeshes = rayConfigs.map(([x, y, z, rz]) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 6, 0.04),
        rayMat.clone()
      );
      mesh.position.set(x, y, z);
      mesh.rotation.z = rz;
      mesh._baseRz = rz;
      mesh._phase = x;
      sceneGroup.add(mesh);
      return mesh;
    });

    /* ── Particles ── */
    const PARTICLE_COUNT = reducedMotion ? 0 : 200;
    let particlePoints = null;
    if (PARTICLE_COUNT > 0) {
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.65) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const pg = new THREE.BufferGeometry();
      pg.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pm = new THREE.PointsMaterial({
        color: 0x00d9ff,
        size: 0.055,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      particlePoints = new THREE.Points(pg, pm);
      sceneGroup.add(particlePoints);
    }

    /* ── Mouse parallax ── */
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    /* ── Resize handler ── */
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    /* ── Animation loop ── */
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!reducedMotion) {
        // Cube animations
        cubeData.forEach((group) => {
          group.position.y = group._basePos.y + Math.sin(t * 0.4 + group._phase) * group._floatRange;
          group.position.x = group._basePos.x + Math.cos(t * 0.22 + group._phase * 0.7) * (group._floatRange * 0.5);
          group.rotation.x += group._rotSpeed.x;
          group.rotation.y += group._rotSpeed.y;
          group.rotation.z += group._rotSpeed.z * 0.5;

          // Pulse edge glow
          if (group._edges) {
            group._edges.material.opacity = 0.55 + 0.45 * Math.sin(t * 1.8 + group._phase);
          }
        });

        // Light ray animations
        rayMeshes.forEach((mesh) => {
          mesh.rotation.z = mesh._baseRz + Math.sin(t * 0.3 + mesh._phase) * 0.4;
          mesh.material.opacity = 0.025 + 0.03 * Math.sin(t * 0.8 + mesh._phase);
        });

        // Particle drift
        if (particlePoints) {
          const arr = particlePoints.geometry.attributes.position.array;
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            arr[i * 3 + 1] += 0.003;
            if (arr[i * 3 + 1] > 5.5) arr[i * 3 + 1] = -5.5;
          }
          particlePoints.geometry.attributes.position.needsUpdate = true;
          particlePoints.material.opacity = 0.5 + 0.3 * Math.sin(t * 0.7);
        }

        // Spotlight pulse
        spotlight.intensity = 2.5 + 1.5 * Math.sin(t * 0.5);

        // Mouse parallax (smooth lerp)
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;
        sceneGroup.rotation.y = mouse.x * 0.35;
        sceneGroup.rotation.x = -mouse.y * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        // Deep navy background
        background: 'radial-gradient(ellipse 70% 80% at 20% 50%, rgba(0,30,70,0.60) 0%, transparent 70%), #060c14',
      }}
    >
      {/* Atmospheric glow blob behind left-side cubes */}
      <div
        style={{
          position: 'absolute',
          left: '3%',
          top: '12%',
          width: '44%',
          height: '74%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(22,119,255,0.16) 0%, rgba(0,217,255,0.08) 40%, transparent 70%)',
          filter: 'blur(52px)',
          pointerEvents: 'none',
        }}
      />

      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      {/* Vignette — darkens right side so portfolio text stays readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, transparent 38%, rgba(6,12,20,0.72) 65%, rgba(6,12,20,0.97) 100%),' +
            'linear-gradient(to bottom, rgba(6,12,20,0.35) 0%, transparent 14%, transparent 84%, rgba(6,12,20,0.65) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
