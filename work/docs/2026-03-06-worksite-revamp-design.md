# itsnemo.dev/work — Revamp Design Doc
**Date:** 2026-03-06
**Scope:** Approach B — landing page refresh + 2 supporting SEO pages + C-expansion doc

---

## Mission / Voice

Nehemiah's core pitch: *You're good at running your business. You shouldn't also have to be good at technology.* Affordability is the thesis, not a feature. He brings industry-level web development, automation, and digital tooling to small businesses at prices that actually make sense. Free estimates and free demos (basic template build) available for prospective clients.

---

## Site Structure

```
work/
├── index.html          ← landing page
├── services.html       ← service deep-dives, grouped by category
├── about.html          ← Gunnison, CO context + who Nehemiah is
├── style.css           ← shared styles + page-specific sections
├── main.js             ← shared JS (nav, animations, form)
├── assets/
│   ├── logo-full-transparent-bg.png   ← hero + footer
│   ├── logo-mark.png                  ← nav header + favicon
│   └── logo-full.png                  ← fallback
└── docs/
    ├── 2026-03-06-worksite-revamp-design.md  (this file)
    └── SEO-EXPANSION.md              ← Approach C plan
```

---

## Navigation (all pages)

```
[logo-mark]    Services    About    Get a Free Estimate →
```

- Logo-mark links to `index.html`
- "Services" → `services.html`
- "About" → `about.html`
- "Get a Free Estimate" → `index.html#contact` (button style)
- Mobile: stack vertically, CTA full-width

---

## index.html

### Logo changes
- **Nav:** `assets/logo-mark.png` (small, ~32px height)
- **Hero visual:** `assets/logo-full-transparent-bg.png` at 110% of current size (transparent bg blends with hero gradient)
- **Footer:** `assets/logo-full-transparent-bg.png`

### Copy angle
Headline reframe: away from "duct tape" metaphor toward "you shouldn't have to fight your own tools." Subline emphasizes affordable access to professional-grade tooling. All copy passes humanizer pass before final.

### CTA changes
- Primary CTA: **"Get a Free Estimate"** (scrolls to contact form)
- Secondary line below CTA or near contact section: **"Ask about a free demo"** — offer to build a basic working template so prospective clients can see real output before committing. No risk to them.

### Contact section
- Headline: keep short, tighten the "ready to simplify" angle
- Subline: mention free estimate + free demo offer
- Form: already wired to Formspree `mqeykwbq`

### Footer
- Copyright: © 2026 Nehemiah Cionelo

---

## services.html

### Sticky anchor bar
```
Websites  ·  Automation & Tools  ·  SEO & Content
```

### Each service entry format
```
[Service name] — plain-English one-liner
What it actually is (no jargon)
What it might look like for your business (concrete example)
Why it matters
→ CTA: "Sound like your situation? Get a free estimate."
```

### Bucket 1: Websites
- Custom website development (React/Vite, WordPress, static HTML/CSS/JS)
- Netlify/GitHub Pages deployment + custom domain setup
- WordPress-native builds (Gutenberg, child themes)

### Bucket 2: Automation & Tools
- Custom operational dashboards
- Calendar/scheduling tools (availability filtering, booking flows)
- Google Sheets + Zapier automation pipelines
- Airtable data management (inventory, ordering)
- Natural language + data entry automations

### Bucket 3: SEO & Content
- On-page SEO strategy
- Google Business Profile setup + optimization
- Blog content writing (includes technical writeups)
- Web hosting, domain management, ongoing maintenance

### Infrastructure note (woven throughout)
Form handling (Formspree), email automation, database/backend setup, APIs & third-party integrations — these appear as "how it all connects" callouts within each bucket, not their own section.

---

## about.html

### Sections
1. **Who I am** — CS background (BS, University of New Mexico), Sport Management MS (Coastal Carolina University). The unusual combo: built software and studied how organizations run. That's what makes the work different.
2. **Why Gunnison** — Moved to train for Olympic Trials in the marathon. 7,700 ft, high-altitude training, mountain life. Getting involved with Western Colorado University's coaching program. Loves the sport, loves the place.
3. **Remote, everywhere** — Based in Gunnison, available anywhere. All work done remotely. Client communication via video call or async — whatever works for the client.
4. **CTA** → "Let's talk about what you need" → `index.html#contact`

### SEO targets for this page
- "Gunnison CO web developer"
- "remote web developer small business"
- "freelance web developer Colorado"

---

## SEO strategy (Approach B)

- Each page has unique `<title>`, `<meta description>`, and `<link rel="canonical">`
- services.html: targets "custom website development for small business", "business automation tools", "Google Sheets automation small business", etc.
- about.html: targets location-based and personal-background queries
- index.html: broad landing — "affordable web development small business", "free website estimate"

---

## Approach C expansion (brief — see SEO-EXPANSION.md)

Future session: split services.html into individual pages per service category, add sitemap.xml, structured data (JSON-LD), and internal cross-linking between service pages. See `SEO-EXPANSION.md` for full brief.
