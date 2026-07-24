// ===== Pure logic (unit tested in media-kit.test.js) =====

export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function formatCompactNumber(n) {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '.0')}M`;
  }
  if (n >= 1_000) {
    return `${Math.round(n / 1_000)}K`;
  }
  return `${n}`;
}

export function getAdjacentIndex(currentIndex, direction, total) {
  return (currentIndex + direction + total) % total;
}

export function buildMailtoHref({ to, name, brand, need, timeline }) {
  const subject = `Partnership inquiry: ${brand}`;
  const body = [
    `Name: ${name}`,
    `Brand: ${brand}`,
    `What they're looking for: ${need}`,
    `Timeline: ${timeline}`,
  ].join('\n');
  const params = new URLSearchParams({ subject, body });
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`;
}

export function shouldReveal(isIntersecting, alreadyRevealed) {
  return isIntersecting || alreadyRevealed;
}

export function parseCountUpTarget(el) {
  return Number(el.dataset.countTarget);
}

// ===== DOM wiring =====

export function initHeroMedia() {
  const slot = document.querySelector('[data-asset="hero-loop"]');
  if (!slot) return;
  // Real <video> gets swapped in here once hero-loop.mp4/hero-poster.jpg exist
  // (see Task 14). Until then the CSS asset-placeholder carries the section.
}

export function animateCountUp(el, { duration = 1200 } = {}) {
  const target = parseCountUpTarget(el);
  if (!Number.isFinite(target)) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    el.textContent = formatCompactNumber(target);
    return;
  }
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.round(easeOutCubic(progress) * target);
    el.textContent = formatCompactNumber(value);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export function initCountUp() {
  const items = document.querySelectorAll('[data-count-target]');
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach((el) => { el.textContent = formatCompactNumber(parseCountUpTarget(el)); });
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  items.forEach((el) => observer.observe(el));
}

if (typeof document !== 'undefined') {
  initHeroMedia();
  initCountUp();
}
