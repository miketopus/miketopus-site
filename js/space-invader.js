// ── 3D Space Invader — spins in place, centered on screen ─────
// Same pixel pattern as assets/space-invader/space-invader.glb
import * as THREE from 'three';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

const LINE_WIDTH = 2; // px — plain WebGL lines are always 1px, hence LineSegments2

const canvas = document.querySelector('.cs-invader');
if (canvas) init(canvas);

function init(canvas) {
  const PATTERN = [
    '..X.....X..',
    '...X...X...',
    '..XXXXXXX..',
    '.XX.XXX.XX.',
    'XXXXXXXXXXX',
    'X.XXXXXXX.X',
    'X.X.....X.X',
    '...XX.XX...',
  ];
  const S = 0.1;            // pixel size
  const D = 0.1;            // depth
  const rows = PATTERN.length, cols = PATTERN[0].length;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 3.2);

  // Outlines only — no solid faces. All cube edges merged into one
  // geometry so every line owns its color and blinks on its own timer.
  const PALETTE = [0x231652, 0x1a133d].map((h) => new THREE.Color(h));
  const cubeEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(S, S, D)).attributes.position;

  const positions = [];
  PATTERN.forEach((row, r) => {
    [...row].forEach((c, k) => {
      if (c !== 'X') return;
      // Centered on both axes so it spins around its own middle
      const x = (k - (cols - 1) / 2) * S, y = ((rows - 1) / 2 - r) * S;
      for (let i = 0; i < cubeEdges.count; i++) {
        positions.push(cubeEdges.getX(i) + x, cubeEdges.getY(i) + y, cubeEdges.getZ(i));
      }
    });
  });

  const lineCount = positions.length / 6;
  const colors = new Float32Array(positions.length);
  const nextSwap = new Float32Array(lineCount);
  function paint(i) {
    const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    colors.set([c.r, c.g, c.b, c.r, c.g, c.b], i * 6);
  }
  for (let i = 0; i < lineCount; i++) {
    paint(i);
    nextSwap[i] = Math.random() * 1.5;
  }

  const geometry = new LineSegmentsGeometry();
  geometry.setPositions(positions);
  geometry.setColors(colors); // keeps a reference to `colors`
  const colorAttr = geometry.attributes.instanceColorStart.data;

  const material = new LineMaterial({ vertexColors: true, linewidth: LINE_WIDTH });
  const invader = new LineSegments2(geometry, material);
  scene.add(invader);

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    material.resolution.set(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = new THREE.Clock();

  (function loop() {
    const t = clock.getElapsedTime();
    if (reduceMotion) {
      invader.rotation.set(-0.15, 0.5, 0);
    } else {
      invader.rotation.y = t * 0.8;                 // spin

      // Intermittent color swaps — each line every 0.2–1.5s
      let dirty = false;
      for (let i = 0; i < lineCount; i++) {
        if (t < nextSwap[i]) continue;
        paint(i);
        nextSwap[i] = t + 0.2 + Math.random() * 1.3;
        dirty = true;
      }
      if (dirty) colorAttr.needsUpdate = true;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }());
}
