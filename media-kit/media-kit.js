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

// ===== DOM wiring =====

export function initHeroMedia() {
  const slot = document.querySelector('[data-asset="hero-loop"]');
  if (!slot) return;
  // Real <video> gets swapped in here once hero-loop.mp4/hero-poster.jpg exist
  // (see Task 14). Until then the CSS asset-placeholder carries the section.
}

if (typeof document !== 'undefined') {
  initHeroMedia();
}
