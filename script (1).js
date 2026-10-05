/* ============================================================
   TECHFEST — SIMULATED PARADIGM
   3D scroll site for Techfest IIT Bombay Campus Ambassador task
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ---------------- CUSTOM CURSOR ---------------- */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

document.querySelectorAll('a, .domain-card, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
});

/* ---------------- DOMAIN CARDS ---------------- */
const domains = [
  {
    name: 'Robotics & Automation',
    desc: 'Robowars, Roboracer, and autonomous builds — machines that fight, race, and think for themselves.',
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="14" width="20" height="16" rx="2"/><circle cx="16" cy="22" r="2"/><circle cx="24" cy="22" r="2"/><path d="M20 14V8M14 8h12"/><circle cx="20" cy="6" r="2"/></svg>`
  },
  {
    name: 'Artificial Intelligence',
    desc: 'From neural nets to applied ML — the layer of the simulation that learns as it runs.',
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="20" cy="20" r="4"/><circle cx="8" cy="10" r="2.5"/><circle cx="32" cy="10" r="2.5"/><circle cx="8" cy="30" r="2.5"/><circle cx="32" cy="30" r="2.5"/><path d="M10 11.5L17 18M30 11.5L23 18M10 28.5L17 22M30 28.5L23 22"/></svg>`
  },
  {
    name: 'Aerospace & Drones',
    desc: 'Boeing Aeromodelling and Drone Challenge — flight, navigation, and aerodynamics under pressure.',
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6L24 18H32L26 24L28 34L20 28L12 34L14 24L8 18H16Z"/></svg>`
  },
  {
    name: 'Cybersecurity',
    desc: 'Capture-the-flag style challenges that test how well you can break, and defend, the system.',
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6L32 11V20C32 28 27 33 20 35C13 33 8 28 8 20V11Z"/><path d="M15 20L18.5 23.5L26 16"/></svg>`
  },
  {
    name: 'Gaming & Esports',
    desc: 'Game of Codes and competitive esports tracks — build games, then battle inside them.',
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="14" width="28" height="16" rx="6"/><path d="M13 19V25M10 22H16"/><circle cx="26" cy="20" r="1.6"/><circle cx="30" cy="24" r="1.6"/></svg>`
  },
  {
    name: 'Sustainable Tech',
    desc: 'Engineering challenges aimed at the planet — efficient systems built for a harder climate.',
    icon: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 34C20 34 8 27 8 16C8 10 13 7 17 9C19 10 20 13 20 13C20 13 21 10 23 9C27 7 32 10 32 16C32 27 20 34 20 34Z"/></svg>`
  }
];

const grid = document.getElementById('domainsGrid');
domains.forEach((d, i) => {
  const card = document.createElement('div');
  card.className = 'domain-card';
  card.innerHTML = `
    <div class="domain-index">${String(i + 1).padStart(2, '0')} / ${String(domains.length).padStart(2, '0')}</div>
    <div class="domain-icon">${d.icon}</div>
    <h3>${d.name}</h3>
    <p>${d.desc}</p>
  `;
  grid.appendChild(card);

  // 3D tilt interaction
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${py * -10}deg) rotateY(${px * 10}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateZ(0)';
  });

  card.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
  card.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
});

/* ---------------- SCROLL REVEALS ---------------- */
gsap.utils.toArray('.stat-card, .timeline-item, .section-head, .domain-card').forEach((el) => {
  gsap.fromTo(el, { opacity: 0, y: 36 }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

/* ---------------- STAT COUNTERS ---------------- */
document.querySelectorAll('.stat-card').forEach((card) => {
  const target = parseInt(card.dataset.value, 10);
  const suffix = card.dataset.suffix || '';
  const numEl = card.querySelector('.stat-number');
  ScrollTrigger.create({
    trigger: card,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => { numEl.textContent = Math.floor(obj.val) + suffix; }
      });
    }
  });
});

/* ---------------- TIMELINE LINE DRAW ---------------- */
const timelineFg = document.getElementById('timelineFg');
ScrollTrigger.create({
  trigger: '.timeline-wrap',
  start: 'top 70%',
  end: 'bottom 60%',
  scrub: 1,
  onUpdate: (self) => {
    const offset = 1000 - (self.progress * 1000);
    timelineFg.style.strokeDashoffset = offset;
  }
});

/* ---------------- AMBIENT GLITCH PULSES ---------------- */
function ambientGlitch(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  setInterval(() => {
    el.classList.add('force-glitch');
    setTimeout(() => el.classList.remove('force-glitch'), 220);
  }, 3600 + Math.random() * 2000);
}
ambientGlitch('.hero-title-accent');
ambientGlitch('.jackin-title');

/* ---------------- THREE.JS: HERO CORE ---------------- */
(function heroScene() {
  const canvas = document.getElementById('webgl');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 9;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Wireframe icosahedron "core"
  const coreGeo = new THREE.IcosahedronGeometry(2.3, 1);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff, wireframe: true, transparent: true, opacity: 0.5 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  const coreGeo2 = new THREE.IcosahedronGeometry(1.5, 0);
  const coreMat2 = new THREE.MeshBasicMaterial({ color: 0xff2e92, wireframe: true, transparent: true, opacity: 0.35 });
  const core2 = new THREE.Mesh(coreGeo2, coreMat2);
  scene.add(core2);

  // Particle field: sphere positions <-> exploded positions
  const COUNT = 1800;
  const spherePos = new Float32Array(COUNT * 3);
  const explodedPos = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  const cCyan = new THREE.Color(0x00f5ff);
  const cMag = new THREE.Color(0xff2e92);

  for (let i = 0; i < COUNT; i++) {
    // points distributed on a sphere
    const phi = Math.acos(-1 + (2 * i) / COUNT);
    const theta = Math.sqrt(COUNT * Math.PI) * phi;
    const r = 3.4 + Math.random() * 0.6;
    spherePos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
    spherePos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    spherePos[i * 3 + 2] = r * Math.cos(phi);

    // exploded random scatter
    explodedPos[i * 3] = (Math.random() - 0.5) * 16;
    explodedPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    explodedPos[i * 3 + 2] = (Math.random() - 0.5) * 16;

    const mixed = cCyan.clone().lerp(cMag, Math.random());
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(spherePos.slice(), 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // scroll progress (0 at top of hero, 1 once scrolled one viewport height)
  let scrollProgress = 0;
  function updateScrollProgress() {
    const hero = document.getElementById('hero');
    const rect = hero.getBoundingClientRect();
    const total = hero.offsetHeight;
    const passed = Math.min(Math.max(-rect.top, 0), total);
    scrollProgress = passed / total;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // mouse parallax
  let parX = 0, parY = 0;
  window.addEventListener('mousemove', (e) => {
    parX = (e.clientX / window.innerWidth - 0.5) * 2;
    parY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const posAttr = particleGeo.getAttribute('position');

  function animate() {
    requestAnimationFrame(animate);

    const t = scrollProgress; // 0 -> 1
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
      posAttr.array[ix] = spherePos[ix] + (explodedPos[ix] - spherePos[ix]) * t;
      posAttr.array[iy] = spherePos[iy] + (explodedPos[iy] - spherePos[iy]) * t;
      posAttr.array[iz] = spherePos[iz] + (explodedPos[iz] - spherePos[iz]) * t;
    }
    posAttr.needsUpdate = true;

    core.rotation.y += 0.0022;
    core.rotation.x += 0.0009;
    core2.rotation.y -= 0.0017;
    core2.rotation.x += 0.0013;
    particles.rotation.y += 0.0006;

    core.material.opacity = 0.5 * (1 - t * 0.8);
    core2.material.opacity = 0.35 * (1 - t * 0.8);

    camera.position.x += (parX * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-parY * 0.6 - camera.position.y) * 0.04;
    camera.position.z = 9 + t * 4;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();
  updateScrollProgress();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

/* ---------------- THREE.JS: JACK-IN AMBIENT FIELD ---------------- */
(function ctaScene() {
  const canvas = document.getElementById('webglCta');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const COUNT = 500;
  const pos = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const cCyan = new THREE.Color(0x00f5ff);
  const cMag = new THREE.Color(0xff2e92);

  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    const mixed = cCyan.clone().lerp(cMag, Math.random());
    colors[i * 3] = mixed.r; colors[i * 3 + 1] = mixed.g; colors[i * 3 + 2] = mixed.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.6, depthWrite: false });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.0009;
    points.rotation.x += 0.0004;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

/* ---------------- MISC ---------------- */
document.getElementById('liveYear').textContent = new Date().getFullYear();
