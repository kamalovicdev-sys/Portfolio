import {
  ArrowHelper,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Timer,
  Vector3,
  WebGLRenderer,
} from 'three';

// Hero dagi 3D sahna: oliy matematika masalalarining yechilish jarayoni (bosqichlar — solverScript.js).
// Koordinatalar matematikadagidek: z yuqoriga qaragan (world guruhi -90° ga burilgan).
// Bu modul (three.js bilan birga) alohida chunk — MathScene uni sahifa yuklangandan keyin oladi

// 1-masala: x + y + z = 6, 2x - y + z = 3, x + 2y - z = 2 → yechim P(1, 2, 3)
const SOLUTION = new Vector3(1, 2, 3);
const PLANES = [
  { normal: new Vector3(1, 1, 1), label: 'x + y + z = 6', corner: [1, 1] },
  { normal: new Vector3(2, -1, 1), label: '2x - y + z = 3', corner: [1, -1] },
  { normal: new Vector3(1, 2, -1), label: 'x + 2y - z = 2', corner: [-1, 1] },
];

// 2-masala: A = [[2, 1, 0], [0, 1, 1], [1, 0, 2]] — ustunlari bazis vektorlarining obrazlari, det A = 5
const COLUMNS = [new Vector3(2, 0, 1), new Vector3(1, 1, 0), new Vector3(0, 1, 2)];
const BASIS = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];

// Har bir masala uchun kamera qaraydigan nuqta (matematik koordinatalarda); masala almashganda silliq ko'chadi
const FOCUS = {
  system: new Vector3(1, 1.8, 2.4),
  det: new Vector3(1.1, 1, 1.2),
};

const palettes = {
  dark: {
    planes: ['#22c55e', '#3b82f6', '#a855f7'],
    line: '#f8fafc',
    accent: '#facc15',
    axis: '#64748b',
    grid: '#1e293b',
    text: '#e2e8f0',
    cube: '#22d3ee',
    basis: ['#f87171', '#4ade80', '#60a5fa'],
  },
  light: {
    planes: ['#16a34a', '#2563eb', '#9333ea'],
    line: '#0f172a',
    accent: '#ca8a04',
    axis: '#64748b',
    grid: '#cbd5e1',
    text: '#1e293b',
    cube: '#0891b2',
    basis: ['#dc2626', '#16a34a', '#2563eb'],
  },
};

// Har bir bosqichda qaysi obyektlar ko'rinishi (0 — yashirin, 1 — to'liq)
const targetsFor = (problem, stage) => {
  const system = problem === 'system';
  const det = problem === 'det';
  return {
    plane0: system && stage >= 1 ? 1 : 0,
    plane1: system && stage >= 2 ? 1 : 0,
    plane2: system && stage >= 3 ? 1 : 0,
    dimPlanes: system && stage >= 4 ? 1 : 0, // kesishish chiziqlari ko'rinishi uchun tekisliklar xiralashadi
    line01: system && stage >= 4 ? 1 : 0,
    line02: system && stage >= 5 ? 1 : 0,
    levelPlane: system && (stage === 6 || stage === 7) ? 1 : 0, // 3·R3 + R2 → z = 3
    point: system && stage >= 7 ? 1 : 0,
    pointLabel: system && stage >= 8 ? 1 : 0,
    cube: det ? 1 : 0,
    basisLabels: det && stage < 2 ? 1 : 0,
    columnLabels: det && stage >= 3 ? 1 : 0,
    volume: det && stage >= 5 ? 1 : 0,
  };
};

// Matn yorlig'i (sprite): kamera tomonga doim qarab turadi
const createLabel = (text, height = 0.3) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const font = '600 44px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  context.font = font;
  canvas.width = Math.ceil(context.measureText(text).width) + 24;
  canvas.height = 64;

  const texture = new CanvasTexture(canvas);
  const material = new SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false });
  const sprite = new Sprite(material);
  sprite.renderOrder = 10;
  sprite.scale.set((height * canvas.width) / canvas.height, height, 1);

  sprite.userData.setColor = (color) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = 'middle';
    context.fillText(text, 12, canvas.height / 2 + 2);
    texture.needsUpdate = true;
  };
  return sprite;
};

const createSegments = (points, material) => {
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(points.flatMap((point) => point.toArray())), 3));
  return new LineSegments(geometry, material);
};

const transparentLine = () => new LineBasicMaterial({ transparent: true, depthWrite: false });
const transparentSurface = () => new MeshBasicMaterial({ transparent: true, depthWrite: false, side: DoubleSide });

// A·v, t bo'yicha birlik matritsadan A ga silliq o'tish: v + t·(A·v − v)
const morphPoint = (point, t, out) => {
  const image = new Vector3()
    .addScaledVector(COLUMNS[0], point.x)
    .addScaledVector(COLUMNS[1], point.y)
    .addScaledVector(COLUMNS[2], point.z);
  return out.copy(point).lerp(image, t);
};

export const createMathScene = (container, { isDark, stage, getPointer, reduceMotion }) => {
  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    // WebGL qo'llab-quvvatlanmasa — sahna ko'rinmaydi, terminal esa yechimni yozishda davom etadi
    return { setStage() {}, setTheme() {}, dispose() {} };
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = 'width:100%;height:100%;display:block;opacity:0;transition:opacity 1.2s ease';
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 3.2, 11.5);
  // Kadr markazi biroz pastda — pastki qismni terminal yopib turadi
  camera.lookAt(0, -0.7, 0);

  // pivot — kursor va sekin tebranish uchun aylanadi; world — matematik koordinatalar (z yuqoriga)
  const pivot = new Group();
  scene.add(pivot);
  const world = new Group();
  world.rotation.x = -Math.PI / 2;
  pivot.add(world);
  const focus = FOCUS[stage.problem].clone();
  let focusTarget = focus.clone();
  const applyFocus = () => world.position.copy(focus).applyEuler(world.rotation).negate();

  // Koordinata o'qlari va xy tekisligidagi to'r
  const axisMaterial = transparentLine();
  world.add(createSegments([new Vector3(), new Vector3(3.6, 0, 0), new Vector3(), new Vector3(0, 3.6, 0), new Vector3(), new Vector3(0, 0, 3.6)], axisMaterial));
  const axisLabels = ['x', 'y', 'z'].map((name, i) => {
    const label = createLabel(name, 0.26);
    label.position.copy(BASIS[i]).multiplyScalar(3.85);
    world.add(label);
    return label;
  });
  const gridPoints = [];
  for (let i = -1; i <= 4; i++) {
    gridPoints.push(new Vector3(i, -1, 0), new Vector3(i, 4, 0), new Vector3(-1, i, 0), new Vector3(4, i, 0));
  }
  const gridMaterial = transparentLine();
  world.add(createSegments(gridPoints, gridMaterial));

  // 1-masala: tekisliklar (yechim nuqtasi atrofidagi kvadrat bo'lak), ularning chegaralari va tenglamalari
  const planeGeometry = new PlaneGeometry(3.6, 3.6);
  const planeEdgesGeometry = new EdgesGeometry(planeGeometry);
  const planes = PLANES.map(({ normal, label, corner }) => {
    const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), normal.clone().normalize());
    const surface = new Mesh(planeGeometry, transparentSurface());
    const edges = new LineSegments(planeEdgesGeometry, transparentLine());
    for (const object of [surface, edges]) {
      object.quaternion.copy(quaternion);
      object.position.copy(SOLUTION);
      world.add(object);
    }
    const text = createLabel(label);
    const u = new Vector3(1, 0, 0).applyQuaternion(quaternion);
    const v = new Vector3(0, 1, 0).applyQuaternion(quaternion);
    text.position.copy(SOLUTION).addScaledVector(u, corner[0] * 1.35).addScaledVector(v, corner[1] * 1.35);
    world.add(text);
    return { surface, edges, text };
  });

  // Gauss qadamlari: tekisliklar juftining kesishish chiziqlari (yo'nalishi — normallarning vektor ko'paytmasi)
  const intersectionLine = (a, b) => {
    const direction = new Vector3().crossVectors(PLANES[a].normal, PLANES[b].normal).normalize().multiplyScalar(3);
    const line = createSegments([SOLUTION.clone().sub(direction), SOLUTION.clone().add(direction)], transparentLine());
    world.add(line);
    return line;
  };
  const line01 = intersectionLine(0, 1);
  const line02 = intersectionLine(0, 2);

  // 3·R3 + R2 → -7z = -21: gorizontal z = 3 tekisligi
  const levelPlane = new Mesh(new PlaneGeometry(3.2, 3.2), transparentSurface());
  levelPlane.position.copy(SOLUTION);
  world.add(levelPlane);

  // Yechim nuqtasi P(1, 2, 3)
  const point = new Mesh(new SphereGeometry(0.11, 24, 16), new MeshBasicMaterial({ transparent: true }));
  point.position.copy(SOLUTION);
  world.add(point);
  const halo = new Mesh(new SphereGeometry(0.22, 24, 16), new MeshBasicMaterial({ transparent: true, depthWrite: false }));
  halo.position.copy(SOLUTION);
  world.add(halo);
  const pointLabel = createLabel('P(1, 2, 3)', 0.34);
  pointLabel.position.copy(SOLUTION).add(new Vector3(0.35, 0, 0.5));
  world.add(pointLabel);

  // 2-masala: birlik kub → parallelepiped, bazis vektorlari → A ning ustunlari
  const cubeGeometry = new BoxGeometry(1, 1, 1).translate(0.5, 0.5, 0.5);
  const cubeEdgesGeometry = new EdgesGeometry(cubeGeometry);
  const cubeBase = cubeGeometry.attributes.position.array.slice();
  const cubeEdgesBase = cubeEdgesGeometry.attributes.position.array.slice();
  const cubeSurface = new Mesh(cubeGeometry, transparentSurface());
  const cubeEdges = new LineSegments(cubeEdgesGeometry, transparentLine());
  world.add(cubeSurface, cubeEdges);

  const arrows = BASIS.map((direction) => {
    const arrow = new ArrowHelper(direction, new Vector3(), 1, 0xffffff, 0.22, 0.12);
    arrow.line.material.transparent = true;
    arrow.cone.material.transparent = true;
    world.add(arrow);
    return arrow;
  });
  const basisLabels = ['e₁', 'e₂', 'e₃'].map((name, i) => {
    const label = createLabel(name, 0.28);
    label.position.copy(BASIS[i]).multiplyScalar(1.3);
    world.add(label);
    return label;
  });
  // Yorliqlar uchlar yonida, bir-birining ustiga tushmasligi uchun turli tomonga surilgan
  const columnLabelOffsets = [new Vector3(0.35, -0.2, 0.3), new Vector3(0.2, 0.35, -0.4), new Vector3(-0.2, 0, 0.35)];
  const columnLabels = ['A·e₁ = (2, 0, 1)', 'A·e₂ = (1, 1, 0)', 'A·e₃ = (0, 1, 2)'].map((name, i) => {
    const label = createLabel(name, 0.24);
    label.position.copy(COLUMNS[i]).add(columnLabelOffsets[i]);
    world.add(label);
    return label;
  });
  const volumeLabel = createLabel('V = |det A| = 5', 0.38);
  volumeLabel.position.set(1.5, 1, 3.6);
  world.add(volumeLabel);

  // Bosqichlar orasida silliq o'tish: joriy qiymat har kadrda maqsadga yaqinlashadi
  let targets = targetsFor(stage.problem, stage.stage);
  const current = Object.fromEntries(Object.keys(targets).map((key) => [key, 0]));
  let morph = 0;
  let morphTarget = 0;

  const applyMorph = () => {
    const t = morph * morph * (3 - 2 * morph); // smoothstep
    const source = new Vector3();
    const target = new Vector3();
    for (const [geometry, base] of [[cubeGeometry, cubeBase], [cubeEdgesGeometry, cubeEdgesBase]]) {
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        morphPoint(source.fromArray(base, i * 3), t, target);
        positions.setXYZ(i, target.x, target.y, target.z);
      }
      positions.needsUpdate = true;
      geometry.computeBoundingSphere();
    }
    arrows.forEach((arrow, i) => {
      const vector = BASIS[i].clone().lerp(COLUMNS[i], t);
      arrow.setDirection(vector.clone().normalize());
      arrow.setLength(vector.length(), 0.22, 0.12);
    });
  };

  const setOpacity = (object, opacity) => {
    object.visible = opacity > 0.01;
    object.material.opacity = opacity;
  };

  const applyVisibility = (elapsed) => {
    const dim = current.dimPlanes;
    planes.forEach(({ surface, edges, text }, i) => {
      const visibility = current[`plane${i}`];
      setOpacity(surface, visibility * (0.2 - dim * 0.1));
      setOpacity(edges, visibility * (0.7 - dim * 0.3));
      setOpacity(text, visibility * (1 - dim * 0.35));
    });
    setOpacity(line01, current.line01);
    setOpacity(line02, current.line02);
    setOpacity(levelPlane, current.levelPlane * 0.22);
    setOpacity(point, current.point);
    halo.scale.setScalar(1 + Math.sin(elapsed * 4) * 0.25);
    setOpacity(halo, current.point * 0.3);
    setOpacity(pointLabel, current.pointLabel);
    setOpacity(cubeSurface, current.cube * (0.12 + current.volume * 0.14));
    setOpacity(cubeEdges, current.cube);
    arrows.forEach((arrow) => {
      arrow.visible = current.cube > 0.01;
      arrow.line.material.opacity = current.cube;
      arrow.cone.material.opacity = current.cube;
    });
    basisLabels.forEach((label) => setOpacity(label, current.basisLabels));
    columnLabels.forEach((label) => setOpacity(label, current.columnLabels));
    setOpacity(volumeLabel, current.volume);
  };

  const setTheme = (dark) => {
    const palette = dark ? palettes.dark : palettes.light;
    axisMaterial.color.set(palette.axis);
    axisMaterial.opacity = 0.8;
    gridMaterial.color.set(palette.grid);
    gridMaterial.opacity = 0.8;
    axisLabels.forEach((label) => label.userData.setColor(palette.axis));
    planes.forEach(({ surface, edges, text }, i) => {
      surface.material.color.set(palette.planes[i]);
      edges.material.color.set(palette.planes[i]);
      text.userData.setColor(palette.planes[i]);
    });
    line01.material.color.set(palette.line);
    line02.material.color.set(palette.line);
    levelPlane.material.color.set(palette.accent);
    point.material.color.set(palette.accent);
    halo.material.color.set(palette.accent);
    pointLabel.userData.setColor(palette.accent);
    cubeSurface.material.color.set(palette.cube);
    cubeEdges.material.color.set(palette.cube);
    arrows.forEach((arrow, i) => arrow.setColor(palette.basis[i]));
    basisLabels.forEach((label, i) => label.userData.setColor(palette.basis[i]));
    columnLabels.forEach((label, i) => label.userData.setColor(palette.basis[i]));
    volumeLabel.userData.setColor(palette.cube);
  };

  const setStage = (problem, stageIndex) => {
    targets = targetsFor(problem, stageIndex);
    focusTarget = FOCUS[problem];
    // Yangi determinant masalasi birlik kubdan boshlanadi
    if (problem === 'det' && stageIndex === 0) morph = 0;
    morphTarget = problem === 'det' && stageIndex >= 2 ? 1 : morph;
    if (reduceMotion) {
      Object.assign(current, targets);
      morph = morphTarget;
      focus.copy(focusTarget);
      applyFocus();
      applyMorph();
      applyVisibility(0);
      renderer.render(scene, camera);
    }
  };

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = container;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };

  const timer = new Timer();
  let frameId = null;
  let isVisible = true;

  const animate = (timestamp) => {
    timer.update(timestamp);
    // To'xtab qolgandan keyingi katta sakrashni cheklaymiz
    const delta = Math.min(timer.getDelta(), 0.05);
    const elapsed = timer.getElapsed();
    const [pointerX, pointerY] = getPointer();

    const ease = 1 - Math.exp(-delta * 5);
    for (const key of Object.keys(targets)) current[key] += (targets[key] - current[key]) * ease;
    if (morph !== morphTarget) {
      morph = morphTarget > morph ? Math.min(morph + delta / 2.2, morphTarget) : morphTarget;
      applyMorph();
    }
    applyVisibility(elapsed);
    focus.lerp(focusTarget, ease * 0.5);
    applyFocus();

    // Sahna sekin tebranadi va kursorga qarab biroz buriladi
    const swing = -0.55 + Math.sin(elapsed * 0.25) * 0.35;
    pivot.rotation.y += (swing + pointerX * 0.6 - pivot.rotation.y) * 0.05;
    pivot.rotation.x += (pointerY * 0.25 - pivot.rotation.x) * 0.05;

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };

  const start = () => {
    if (frameId !== null || reduceMotion || !isVisible || document.hidden) return;
    frameId = requestAnimationFrame(animate);
  };
  const stop = () => {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
  };

  // Hero ko'rinmay qolganda yoki tab yashirilganda chizishni to'xtatamiz (batareya va CPU uchun)
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible) start();
    else stop();
  });
  intersectionObserver.observe(container);
  const handleVisibilityChange = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', handleVisibilityChange);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  pivot.rotation.y = -0.55;
  applyFocus();
  setTheme(isDark);
  setStage(stage.problem, stage.stage);
  applyMorph();
  applyVisibility(0);
  resize();
  start();
  requestAnimationFrame(() => {
    canvas.style.opacity = '1';
  });

  return {
    setStage,
    setTheme: (dark) => {
      setTheme(dark);
      renderer.render(scene, camera);
    },
    dispose: () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      scene.traverse((object) => {
        object.geometry?.dispose();
        object.material?.map?.dispose();
        object.material?.dispose();
      });
      renderer.dispose();
      canvas.remove();
    },
  };
};
