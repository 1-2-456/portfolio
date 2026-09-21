/* =========================================================
 * 交互逻辑：项目渲染与筛选 / 锚点导航 / 滚动动效 / 粒子背景
 * ======================================================= */
'use strict';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========= 1. 项目作品：渲染 + 分类筛选 ========= */
const filterBar = document.getElementById('filterBar');
const projectList = document.getElementById('projectList');

function renderFilters() {
  // 「全部」置前，其余按数据中出现顺序生成
  const keys = ['all', ...new Set(PROJECTS.map((p) => p.category))];
  filterBar.innerHTML = keys
    .map(
      (k, i) =>
        `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${k}" role="tab" aria-selected="${i === 0}">${
          CATEGORY_LABELS[k] || k
        }</button>`
    )
    .join('');
}

function projectCard(p) {
  const label = CATEGORY_LABELS[p.category] || p.category;
  const metrics = (p.metrics || [])
    .map((m) => `<div class="metric"><b>${m.value}</b><span>${m.label}</span></div>`)
    .join('');
  const tech = (p.tech || []).map((t) => `<span class="tech">${t}</span>`).join('');
  const results = (p.results || []).map((r) => `<li>${r}</li>`).join('');
  const time = p.time ? `<time>${p.time}</time>` : '';
  const tags = (p.tags || []).length
    ? `<div class="project-tags">${p.tags.map((t) => `<span class="ptag">${t}</span>`).join('')}</div>`
    : '';
  const scaleRow = p.scale
    ? `<div class="meta-row"><span class="meta-label">数据规模</span><p>${p.scale}</p></div>`
    : '';

  return `
    <article class="project-card" data-category="${p.category}">
      <figure class="project-media">
        <img src="${p.image}" alt="${p.name} 可视化效果图" loading="lazy" />
        <span class="badge">${label}</span>
      </figure>
      <div class="project-body">
        <header class="project-head">
          <h3>${p.name}</h3>
          ${time}
        </header>
        ${tags}
        <p class="project-bg">${p.background}</p>
        <div class="project-meta">
          ${scaleRow}
          <div class="meta-row"><span class="meta-label">技术栈</span><div class="tech-list">${tech}</div></div>
        </div>
        <div class="project-metrics">${metrics}</div>
        <ul class="project-results">${results}</ul>
      </div>
    </article>`;
}

function renderProjects() {
  projectList.innerHTML = PROJECTS.map(projectCard).join('');

  // 图片加载完成后淡入
  projectList.querySelectorAll('.project-media img').forEach((img) => {
    const done = () => img.classList.add('loaded');
    if (img.complete && img.naturalWidth > 0) done();
    else {
      img.addEventListener('load', done);
      img.addEventListener('error', done); // 加载失败也显示占位渐变
    }
  });
}

function applyFilter(key) {
  projectList.querySelectorAll('.project-card').forEach((card) => {
    const show = key === 'all' || card.dataset.category === key;
    card.classList.toggle('hidden', !show);
    if (show && !REDUCED_MOTION) {
      card.classList.remove('pop');
      void card.offsetWidth; // 重触发动画
      card.classList.add('pop');
    }
  });
}

filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filterBar.querySelectorAll('.filter-btn').forEach((b) => {
    b.classList.toggle('active', b === btn);
    b.setAttribute('aria-selected', b === btn);
  });
  applyFilter(btn.dataset.filter);
});

/* ========= 2. 锚点导航：scrollspy + 移动端菜单 ========= */
const sidebar = document.getElementById('sidebar');
const navToggle = document.getElementById('navToggle');
const mask = document.getElementById('mask');
const navLinks = Array.from(document.querySelectorAll('#nav a'));

function toggleMenu(open) {
  sidebar.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  mask.hidden = !open;
}

navToggle.addEventListener('click', () => toggleMenu(!sidebar.classList.contains('open')));
mask.addEventListener('click', () => toggleMenu(false));

navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    toggleMenu(false);
    setActive(link.getAttribute('href').slice(1));
  })
);

function setActive(id) {
  navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
}

function initScrollSpy() {
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ========= 3. 滚动进入动效 / 技能条 / 数字滚动 ========= */
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((t) => io.observe(t));
}

function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  const fill = (bar) => (bar.style.width = bar.dataset.w + '%');
  if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
    bars.forEach(fill);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fill(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((b) => io.observe(b));
}

function initCounters() {
  const counters = document.querySelectorAll('.stat b[data-count]');
  const animate = (el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    if (REDUCED_MOTION) {
      el.textContent = target + suffix;
      return;
    }
    const dur = 1200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => io.observe(c));
}

/* ========= 4. Canvas 数据粒子背景 ========= */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, parts = [], rafId = null;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const count = Math.min(Math.floor((W * H) / 22000), 90);
    parts = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.6
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const LINK = 130;

    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleDotRGB}, 0.5)`;
      ctx.fill();
    }

    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i], b = parts[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = dx * dx + dy * dy;
        if (d < LINK * LINK) {
          ctx.strokeStyle = `rgba(${particleLinkRGB}, ${(1 - Math.sqrt(d) / LINK) * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    rafId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);

  if (REDUCED_MOTION) {
    draw();
    cancelAnimationFrame(rafId); // 仅绘制静态一帧
    return;
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      rafId = requestAnimationFrame(draw);
    }
  });

  rafId = requestAnimationFrame(draw);
}

/* ========= 5. 深浅色主题切换 ========= */
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'portfolio-theme';

// 粒子背景颜色跟随主题（从 CSS 变量读取 RGB 三元组）
let particleDotRGB = '0, 229, 195';
let particleLinkRGB = '79, 140, 255';

function refreshParticleColors() {
  const s = getComputedStyle(document.documentElement);
  particleDotRGB = s.getPropertyValue('--particle-dot-rgb').trim() || particleDotRGB;
  particleLinkRGB = s.getPropertyValue('--particle-link-rgb').trim() || particleLinkRGB;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-label', theme === 'light' ? '切换到深色主题' : '切换到浅色主题');
  refreshParticleColors();
}

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null; // localStorage 不可用时使用默认深色
  }
}

function initTheme() {
  applyTheme(getSavedTheme() === 'light' ? 'light' : 'dark');
}

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {
    /* 忽略：隐私模式下可能无法写入 */
  }
});

/* ========= 初始化 ========= */
// 禁用浏览器滚动位置恢复，保证每次进入页面都从顶部开始、激活"个人介绍"
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

initTheme();
renderFilters();
renderProjects();
initScrollSpy();
setActive('hero');
initReveal();
initSkillBars();
initCounters();
initCanvas();
