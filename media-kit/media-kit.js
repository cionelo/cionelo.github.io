// ===== Pure logic (unit tested in media-kit.test.js) =====

// A card may point at one piece or at a whole series. `data-links` carries a
// labelled list; `data-link` stays the single-link fallback so a card without
// a list keeps working. Bad JSON falls back rather than blanking the modal.
export function parseWorkLinks(raw, fallbackUrl) {
  let parsed = null;
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }
  }

  if (Array.isArray(parsed)) {
    const links = parsed
      .filter((entry) => entry && typeof entry.url === 'string' && entry.url)
      .map((entry) => ({ label: entry.label || entry.url, url: entry.url }));
    if (links.length) return links;
  }

  return fallbackUrl ? [{ label: 'Watch full video ↗', url: fallbackUrl }] : [];
}

export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function formatCompactNumber(n) {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
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
  // The poster ships as a plain <img>. If a hero-loop.mp4 ever lands, swap in a
  // muted autoplay <video> here with the poster as its fallback frame.
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

export function initGalleryModal() {
  const cards = Array.from(document.querySelectorAll('.work-card'));
  const modal = document.getElementById('work-modal');
  if (!cards.length || !modal) return;

  const titleEl = document.getElementById('work-modal-title');
  const brandEl = document.getElementById('work-modal-brand');
  const metricsEl = document.getElementById('work-modal-metrics');
  const linksEl = document.getElementById('work-modal-links');
  const thumbEl = modal.querySelector('.work-modal__thumb');
  const closeBtn = modal.querySelector('.work-modal__close');
  const prevBtn = modal.querySelector('.work-modal__prev');
  const nextBtn = modal.querySelector('.work-modal__next');

  let currentIndex = 0;

  // The modal borrows whichever card was opened instead of carrying its own
  // image. One asset per card, and nothing to keep in sync by hand.
  function syncThumb(card) {
    const cardThumb = card.querySelector('.work-card__thumb');
    const source = cardThumb && cardThumb.querySelector('img');
    thumbEl.replaceChildren();

    if (!source) {
      thumbEl.classList.add('asset-placeholder');
      thumbEl.textContent = cardThumb ? cardThumb.textContent.trim() : '';
      return;
    }

    thumbEl.classList.remove('asset-placeholder');
    const img = document.createElement('img');
    img.src = source.src;
    img.alt = source.alt;
    thumbEl.append(img);
  }

  function renderLinks(card) {
    const links = parseWorkLinks(card.dataset.links, card.dataset.link);
    linksEl.replaceChildren();
    links.forEach((link, i) => {
      const a = document.createElement('a');
      a.className = i === 0 ? 'btn btn--primary' : 'btn btn--secondary';
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = link.label;
      linksEl.append(a);
    });
  }

  function render(index) {
    currentIndex = index;
    const card = cards[currentIndex];
    titleEl.textContent = card.dataset.title;
    brandEl.textContent = card.dataset.brand;
    metricsEl.textContent = card.dataset.metrics;
    renderLinks(card);
    syncThumb(card);
  }

  function open(index) {
    render(index);
    modal.showModal();
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => open(index));
  });
  closeBtn.addEventListener('click', () => modal.close());
  prevBtn.addEventListener('click', () => render(getAdjacentIndex(currentIndex, -1, cards.length)));
  nextBtn.addEventListener('click', () => render(getAdjacentIndex(currentIndex, 1, cards.length)));
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') render(getAdjacentIndex(currentIndex, -1, cards.length));
    if (event.key === 'ArrowRight') render(getAdjacentIndex(currentIndex, 1, cards.length));
  });
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const href = buildMailtoHref({
      to: 'nemocionelo@gmail.com',
      name: data.get('name'),
      brand: data.get('brand'),
      need: data.get('need'),
      timeline: data.get('timeline') || 'Not specified',
    });
    window.location.href = href;
  });
}

export function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const revealed = new WeakSet();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const isVisible = shouldReveal(entry.isIntersecting, revealed.has(entry.target));
      if (isVisible) {
        entry.target.classList.add('is-visible');
        revealed.add(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => observer.observe(el));
}

export function initPraiseToggle() {
  const button = document.querySelector('[data-praise-toggle]');
  const panel = document.getElementById('praise-original');
  if (!button || !panel) return;
  button.addEventListener('click', () => {
    const isHidden = panel.hasAttribute('hidden');
    if (isHidden) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
    button.setAttribute('aria-expanded', String(isHidden));
  });
}

if (typeof document !== 'undefined') {
  // Every section below the hero starts at opacity 0 and is revealed by JS, so
  // a single throwing init would otherwise blank most of the page. Isolate them.
  [
    initHeroMedia,
    initCountUp,
    initGalleryModal,
    initContactForm,
    initScrollReveal,
    initPraiseToggle,
  ].forEach((init) => {
    try {
      init();
    } catch (error) {
      console.error(`${init.name} failed`, error);
    }
  });
}
