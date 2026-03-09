# itsnemo.dev/work — Handoff README

Freelance services site for Nehemiah Cionelo. Lives at `itsnemo.dev/work/` via GitHub Pages on `cionelo/cionelo.github.io`, served from the `/work/` subdirectory of the `master` branch.

---

## File structure

```
work/
├── index.html          # Homepage (hero, before/after, who I help, what I build, bridge, contact)
├── portfolio.html      # Project showcase (card grid, Option A — see upgrade notes below)
├── services.html       # Services (3 buckets: websites, automation, SEO)
├── about.html          # About page (side-by-side headshot + text)
├── style.css           # All styles — single file, sectioned with ASCII headers
├── main.js             # GSAP animations, mobile nav toggle, contact form, scroll
└── assets/
    ├── logo-mark.png
    ├── logo-full-transparent-bg.png
    ├── headshot.jpg            # Nehemiah's photo (used on about.html)
    └── og-image.png            # Open Graph image
```

---

## Design system

**Colors (CSS custom properties in `:root`):**
- `--bg` `#1C1917` — page background
- `--surface` `#292524` — card/section surface
- `--surface-2` `#211F1D` — contact section bg
- `--text` `#F5F0EB` — primary text
- `--text-muted` `#A8A29E` — secondary text
- `--accent` `#F59E0B` — amber, used for CTAs, icons, tags, active links

**Fonts:**
- Display: `Bricolage Grotesque` (headings, buttons)
- Body: `DM Sans` (body copy, nav, labels)

**Icons:** Lucide via CDN (`lucide.createIcons()` called in `main.js`)

**Animations:** GSAP + ScrollTrigger for scroll reveals and hero entrance. IntersectionObserver fallback if GSAP fails to load. Add `class="reveal"` to any element to opt into scroll-triggered fade-up.

---

## Page anatomy

Every page follows this shell:

```
<nav>             — logo + desktop links + hamburger button + mobile menu
<section>         — page-specific content
...
<footer>
<script src="main.js">
```

`main.js` is shared across all pages and handles: Lucide icon init, nav scroll behavior, hamburger toggle, GSAP reveals, smooth scroll, contact form (Formspree).

---

## Adding a new page

1. Copy the nav block from any existing page. Update the active link:
   - Desktop: add `nav-link--active` to the matching `<a class="nav-link">`
   - Mobile: add `nav-mobile-link--active` to the matching `<a class="nav-mobile-link">`
2. Add the new page link to the `<div class="nav-links">` and `<div class="nav-mobile-menu">` in **all existing pages** (index, portfolio, services, about).
3. Use `.services-hero` + `.services-headline` for the page header — already styled.
4. Include `<link rel="stylesheet" href="style.css">` and `<script src="main.js"></script>`.
5. Set a unique `<title>`, `<meta name="description">`, and `<link rel="canonical">`.

---

## Key components

### Cards
`.card` — base card (dark bg, amber border on hover, GSAP lift)
`.card--project` — extends `.card` for portfolio entries. Adds `.card-tags` + `.card-link`.

```html
<div class="card card--project reveal">
  <i data-lucide="[icon]" class="card-icon"></i>
  <h3 class="card-title">...</h3>
  <p class="card-desc">...</p>
  <div class="card-tags">
    <span class="card-tag">Tag</span>
  </div>
  <a href="..." class="card-link" target="_blank" rel="noopener">View project →</a>
</div>
```

### Contact form
Handled by Formspree (`https://formspree.io/f/mqeykwbq`). Endpoint is in `index.html`'s `<form action="...">`. Success state shown via `#form-success`. Logic in `main.js`.

### Bridge section (homepage)
Between `#what-i-build` and `#contact`. Classes: `#bridge .bridge-inner .bridge-headline .bridge-subline`. Soft CTA for visitors who aren't sure what they need.

---

## Portfolio page — upgrade path

`portfolio.html` currently uses **Option A** (card grid). The comment block at the top of that file documents how to upgrade to **Option B** (case study rows with screenshots).

Summary of Option B:
- Replace `.card-grid` with `.project-list` of `.project-row` articles
- Each row: visual left / text right (alternate with `:nth-child(even)`)
- Text structure: eyebrow → title → Problem → What I built → Outcome → tags → CTA button
- Add `.project-list` and `.project-row` CSS to `style.css` — no JS changes needed
- Needs actual screenshots saved to `assets/images/`

---

## Planned / not yet built

- **Testimonials section** — intended for homepage, below portfolio or bridge. No design spec yet.
- **Portfolio screenshots** — `portfolio.html` shows text cards only. Real screenshots will unlock Option B.

---

## Deployment

- Host: GitHub Pages, `master` branch, `/work/` subdirectory
- Domain: `itsnemo.dev` via CNAME at repo root
- To deploy: commit to `master` and push — Pages picks it up in ~1 min
- Remote: `https://github.com/cionelo/cionelo.github.io.git`
- Auth: GitHub requires a personal access token (not password) for HTTPS pushes. Alternatively set remote to SSH: `git remote set-url origin git@github.com:cionelo/cionelo.github.io.git`

---

## External dependencies (CDN)

All loaded via CDN, no build step, no package.json.

| Lib | Version | Purpose |
|-----|---------|---------|
| Bricolage Grotesque / DM Sans | — | Google Fonts |
| Lucide | latest | Icons |
| GSAP | 3.12.5 | Animations |
| ScrollTrigger | 3.12.5 | Scroll-based reveals |
| Formspree | — | Contact form backend |
