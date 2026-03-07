# itsnemo.dev/work — Revamp Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the landing page copy/logos, add nav links + updated CTA, and create two supporting SEO pages (services.html, about.html) plus a C-expansion doc.

**Architecture:** Static HTML/CSS/JS site served via GitHub Pages at itsnemo.dev/work. Three HTML files share one style.css and one main.js. No build tool. Copy all humanized with the humanizer skill before finalizing.

**Tech Stack:** Vanilla HTML5, CSS custom properties, JS (GSAP + ScrollTrigger), Lucide icons, Formspree (contact form already wired).

---

## Task 1: Add nav link styles to style.css

**Files:**
- Modify: `style.css` (NAV section, lines 273–335)

**Step 1: Add `.nav-links` and `.nav-link` styles**

In style.css, after the `.nav-logo-text` block (around line 315), add:

```css
/* Nav text links */
.nav-links {
  display: none;
  align-items: center;
  gap: var(--space-4);
}

.nav-link {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  color: var(--text-muted);
  transition: color var(--dur-fast) ease;
}

.nav-link:hover { color: var(--text); }

@media (min-width: 768px) {
  .nav-links { display: flex; }
}
```

**Step 2: Verify**
Open style.css and confirm the block is inside the NAV section, not inside another rule.

**Step 3: Commit**
```bash
git add style.css
git commit -m "style: add nav-links styles"
```

---

## Task 2: Update nav markup in index.html

**Files:**
- Modify: `index.html` (NAV section, lines 47–55)

**Step 1: Replace nav-inner content**

Replace the entire `<nav>` block with:

```html
<nav id="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="itsnemo.dev home">
      <img src="assets/logo-mark.png" alt="itsnemo.dev" class="nav-logo-img" onerror="this.style.display='none'">
      <span class="nav-logo-text">itsnemo.dev</span>
    </a>
    <div class="nav-links">
      <a href="services.html" class="nav-link">Services</a>
      <a href="about.html" class="nav-link">About</a>
    </div>
    <a href="#contact" class="btn-ghost nav-cta">Get a Free Estimate</a>
  </div>
</nav>
```

**Step 2: Verify**
Open index.html in browser. Nav should show: logo-mark | (desktop only) Services · About | Get a Free Estimate button.

**Step 3: Commit**
```bash
git add index.html
git commit -m "feat: update nav with logo-mark, links, new CTA text"
```

---

## Task 3: Update hero and footer logos in index.html

**Files:**
- Modify: `index.html` (hero visual ~line 76–82, footer ~line 251)

**Step 1: Update hero logo img src**

Find:
```html
<img src="assets/logo-full.png" alt="" class="hero-logo-img">
```
Replace with:
```html
<img src="assets/logo-full-transparent-bg.png" alt="" class="hero-logo-img">
```

**Step 2: Update footer logo img src**

Find:
```html
<img src="assets/logo-full.png" alt="itsnemo.dev" class="footer-logo">
```
Replace with:
```html
<img src="assets/logo-full-transparent-bg.png" alt="itsnemo.dev" class="footer-logo">
```

**Step 3: Increase hero logo size by 10%**

In style.css, find `.hero-logo-img` (line ~469):
```css
.hero-logo-img {
  max-width: 380px;
```
Change to:
```css
.hero-logo-img {
  max-width: 418px;
```

**Step 4: Verify**
Open in browser at ≥768px. Hero logo should be slightly larger and blend with the dark bg (no white box). Footer logo same.

**Step 5: Commit**
```bash
git add index.html style.css
git commit -m "feat: use transparent-bg logo in hero and footer, +10% hero size"
```

---

## Task 4: Rewrite hero copy in index.html

**Files:**
- Modify: `index.html` (hero section, lines 58–83)

**Step 1: Replace hero text block**

Find the `<div class="hero-text">` block and replace its contents:

```html
<div class="hero-text">
  <p class="eyebrow">Custom Digital Tools · Colorado &amp; Beyond</p>
  <h1 class="hero-headline">
    You're good at<br>running your business.<br>
    <span class="headline-accent">Technology shouldn't slow you down.</span>
  </h1>
  <p class="hero-subline">I build custom websites, booking systems, and digital tools for small businesses — at prices that local businesses can actually afford.</p>
  <div class="hero-actions">
    <a href="#contact" class="btn-primary">Get a Free Estimate</a>
    <a href="#what-i-build" class="btn-text">See what I build ↓</a>
  </div>
  <p class="hero-demo-note">Free demos available for prospective clients — ask about it.</p>
</div>
```

**Step 2: Add `.hero-demo-note` style to style.css**

After `.hero-actions` styles (around line 415):
```css
.hero-demo-note {
  font-size: 13px;
  color: var(--text-muted);
  padding-top: var(--space-1);
}
```

**Step 3: Verify**
Headline reads clean, demo note appears below CTA in small muted text.

**Step 4: Commit**
```bash
git add index.html style.css
git commit -m "feat: rewrite hero copy, add demo note, update CTA"
```

---

## Task 5: Update contact section and footer in index.html

**Files:**
- Modify: `index.html` (contact section ~lines 205–245, footer ~lines 249–255)

**Step 1: Update contact headline and subline**

Find:
```html
<h2 class="contact-headline">Ready to simplify<br>your operations?</h2>
<p class="contact-subline">Tell me what you're working with. No tech knowledge required.</p>
```
Replace with:
```html
<h2 class="contact-headline">Let's figure out<br>what you need.</h2>
<p class="contact-subline">Free estimates always. Free demo on request — I'll build you something real so you can see what's possible before committing.</p>
```

**Step 2: Update footer copyright**

Find:
```html
<p class="footer-copy">© 2026 Nemo <span class="footer-dot" aria-hidden="true">·</span> All rights reserved.</p>
```
Replace with:
```html
<p class="footer-copy">© 2026 Nehemiah Cionelo <span class="footer-dot" aria-hidden="true">·</span> All rights reserved.</p>
```

**Step 3: Verify**
Contact section reads naturally. Footer shows full name.

**Step 4: Commit**
```bash
git add index.html
git commit -m "feat: update contact copy, footer copyright"
```

---

## Task 6: Update page meta tags in index.html

**Files:**
- Modify: `index.html` (head section, lines 1–16)

**Step 1: Update title and meta description**

Find:
```html
<title>Nemo | Custom Websites & Business Tools</title>
<meta name="description" content="I build affordable custom websites and digital tools for small businesses. Online ordering, booking systems, and automation — without enterprise pricing.">
```
Replace with:
```html
<title>Nehemiah Cionelo | Affordable Web Development & Business Tools</title>
<meta name="description" content="Custom websites, booking systems, and business automation for small businesses — built by a developer in Gunnison, CO, available remotely everywhere. Free estimates, free demos.">
```

**Step 2: Commit**
```bash
git add index.html
git commit -m "seo: update index.html title and meta description"
```

---

## Task 7: Create services.html

**Files:**
- Create: `services.html`

**Step 1: Write the full file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Services | Nehemiah Cionelo — Web Development & Business Automation</title>
  <meta name="description" content="Custom website development, business automation, scheduling tools, Google Sheets integration, SEO, and more — explained in plain English for small business owners.">
  <link rel="canonical" href="https://itsnemo.dev/work/services.html">

  <!-- Open Graph -->
  <meta property="og:title" content="Services | itsnemo.dev">
  <meta property="og:description" content="What I build and why it matters — explained without the jargon.">
  <meta property="og:url" content="https://itsnemo.dev/work/services.html">
  <meta property="og:type" content="website">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&display=swap" rel="stylesheet">

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

  <!-- GSAP + ScrollTrigger -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <link rel="icon" href="assets/logo-mark.png" type="image/png">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- NAV -->
  <nav id="nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" aria-label="itsnemo.dev home">
        <img src="assets/logo-mark.png" alt="itsnemo.dev" class="nav-logo-img" onerror="this.style.display='none'">
        <span class="nav-logo-text">itsnemo.dev</span>
      </a>
      <div class="nav-links">
        <a href="services.html" class="nav-link nav-link--active">Services</a>
        <a href="about.html" class="nav-link">About</a>
      </div>
      <a href="index.html#contact" class="btn-ghost nav-cta">Get a Free Estimate</a>
    </div>
  </nav>

  <!-- PAGE HEADER -->
  <section id="services-hero" class="services-hero">
    <div class="container">
      <p class="eyebrow reveal">What I Build</p>
      <h1 class="services-headline reveal" style="transition-delay:0.1s">
        The tech explained.<br>No jargon required.
      </h1>
      <p class="services-subline reveal" style="transition-delay:0.2s">
        Every service listed here is something I've built for a real client or project. Here's what each one actually means, what it might look like for your business, and why it matters.
      </p>
    </div>
  </section>

  <!-- ANCHOR NAV -->
  <div class="services-anchor-bar">
    <div class="container">
      <a href="#websites" class="services-anchor-link">Websites</a>
      <span class="services-anchor-dot" aria-hidden="true">·</span>
      <a href="#automation" class="services-anchor-link">Automation &amp; Tools</a>
      <span class="services-anchor-dot" aria-hidden="true">·</span>
      <a href="#seo-content" class="services-anchor-link">SEO &amp; Content</a>
    </div>
  </div>

  <!-- BUCKET 1: WEBSITES -->
  <section id="websites" class="section-bg services-bucket">
    <div class="container">
      <div class="bucket-header reveal">
        <p class="eyebrow">Bucket 1</p>
        <h2 class="section-title">Websites</h2>
        <p class="bucket-desc">A website is only useful if it actually works for your business. I build them three ways depending on what you need — from simple and fast to fully custom.</p>
      </div>

      <div class="service-list">

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="layout" class="service-icon"></i>
            <div>
              <h3 class="service-title">Custom Website Development</h3>
              <p class="service-plain">A website built from scratch, around how your business actually works — not a template someone else designed for a different industry.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> A local gym gets a site with their class schedule, membership info, and a contact form that goes straight to the owner's inbox. No monthly Squarespace bill. No generic layout.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> Most small business websites are built on templates that were designed to sell the platform, not your business. A custom site is faster, cleaner, and actually represents what you do.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="file-code" class="service-icon"></i>
            <div>
              <h3 class="service-title">WordPress Builds</h3>
              <p class="service-plain">WordPress powers about 40% of the internet. When a client needs to update their own content without calling a developer every time, this is usually the right call.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> A home services company gets a site they can update themselves — new photos, service areas, seasonal promotions — without touching code.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> You shouldn't need to hire a developer to change your hours or add a new service. WordPress built right puts that control back in your hands.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="globe" class="service-icon"></i>
            <div>
              <h3 class="service-title">Hosting, Domains &amp; Deployment</h3>
              <p class="service-plain">Getting a site live involves more than just the design — domain registration, hosting setup, SSL certificates, deployment pipelines. I handle all of it.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> You hand me a domain name you already own (or I help you pick one), and I handle everything from there — hosting, configuration, launch, and making sure it stays up.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> Most developers build sites. Fewer handle the infrastructure. I do both, so you're not stuck Googling "how to point a DNS record" at midnight.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

      </div>
    </div>
  </section>

  <!-- BUCKET 2: AUTOMATION & TOOLS -->
  <section id="automation" class="section-surface services-bucket">
    <div class="container">
      <div class="bucket-header reveal">
        <p class="eyebrow">Bucket 2</p>
        <h2 class="section-title">Automation &amp; Tools</h2>
        <p class="bucket-desc">If you're doing the same thing manually every week, there's a good chance it can be automated. These are the systems that quietly run in the background so you don't have to.</p>
      </div>

      <div class="service-list">

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="calendar-check" class="service-icon"></i>
            <div>
              <h3 class="service-title">Booking &amp; Scheduling Systems</h3>
              <p class="service-plain">A client-facing calendar that lets people book appointments, sessions, or services without a phone call or a back-and-forth email chain.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> A tutoring business gets a scheduling page where students pick a session time, fill out intake info, and get a confirmation email — all without the tutor lifting a finger.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> Every booking that happens automatically is one less interruption in your day. For service businesses, this adds up fast.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="layout-dashboard" class="service-icon"></i>
            <div>
              <h3 class="service-title">Operational Dashboards</h3>
              <p class="service-plain">A custom internal tool that shows you the information you actually need — orders, sessions, inventory, client history — in one place, designed around your workflow.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> A tutoring academy gets a dashboard where staff can see all active students, track session completion, and flag accounts that are behind — instead of hunting through spreadsheets.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> Generic software is designed for everyone, which usually means it doesn't fit anyone well. A custom dashboard shows you exactly what you need and nothing you don't.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="zap" class="service-icon"></i>
            <div>
              <h3 class="service-title">Google Sheets &amp; Zapier Automation</h3>
              <p class="service-plain">If your business runs on spreadsheets, there's a lot we can do without replacing them — automated data entry, form-to-sheet pipelines, email triggers, and cross-tool integrations.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> A contact form on your website automatically adds new leads to a Google Sheet, sends you a notification, and logs a follow-up reminder — no copy-pasting required.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> Manual data entry is where mistakes happen and time disappears. Automating the repetitive parts frees you up for the work that actually needs you.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="database" class="service-icon"></i>
            <div>
              <h3 class="service-title">Data Management &amp; Inventory Systems</h3>
              <p class="service-plain">Airtable and similar tools can replace a mess of spreadsheets with something that's actually searchable, filterable, and shareable across your team.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> A small retailer gets an Airtable base for their inventory — suppliers, reorder points, purchase history — that anyone on staff can update from their phone.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> When your data lives in five different spreadsheets with inconsistent formatting, decisions take longer and mistakes are easier to make. One organized system fixes that.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

      </div>
    </div>
  </section>

  <!-- BUCKET 3: SEO & CONTENT -->
  <section id="seo-content" class="section-bg services-bucket">
    <div class="container">
      <div class="bucket-header reveal">
        <p class="eyebrow">Bucket 3</p>
        <h2 class="section-title">SEO &amp; Content</h2>
        <p class="bucket-desc">A great website that nobody finds isn't doing much. These services help people searching for what you offer actually find you.</p>
      </div>

      <div class="service-list">

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="search" class="service-icon"></i>
            <div>
              <h3 class="service-title">On-Page SEO</h3>
              <p class="service-plain">Search engine optimization — making your site appear higher in Google results when someone searches for what you do.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> A home services company in Nashville gets their service pages rewritten and restructured so they show up when someone searches "roof repair Nashville" instead of page 4.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> Most people don't scroll past the first few results. If your business doesn't show up there, it might as well not have a website.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="map-pin" class="service-icon"></i>
            <div>
              <h3 class="service-title">Google Business Profile Setup</h3>
              <p class="service-plain">Your Google Business Profile is what shows up when someone searches your business name or looks for services near them. Most are set up wrong or incomplete.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> A local restaurant gets their profile fully filled out — hours, photos, categories, service areas, and regular posts — so they show up in "restaurants near me" searches.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> For local businesses, this is often the highest-ROI thing you can do for visibility. It's free to set up, but almost nobody does it correctly.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

        <article class="service-entry reveal">
          <div class="service-entry-inner">
            <i data-lucide="pen-tool" class="service-icon"></i>
            <div>
              <h3 class="service-title">Blog &amp; Content Writing</h3>
              <p class="service-plain">Blog posts written to rank in search results and actually be useful to the people reading them — not just keyword-stuffed filler.</p>
              <p class="service-example"><span class="service-label">What this looks like:</span> A home services company gets monthly blog posts on topics their customers actually search for ("how often should I clean my gutters?"), driving organic traffic over time.</p>
              <p class="service-why"><span class="service-label">Why it matters:</span> Every useful article on your site is another way for a potential customer to find you — and a reason for Google to rank your domain higher.</p>
            </div>
          </div>
          <a href="index.html#contact" class="service-cta">Sounds like what I need → Get a free estimate</a>
        </article>

      </div>
    </div>
  </section>

  <!-- BOTTOM CTA -->
  <section class="section-contact services-bottom-cta">
    <div class="container container--narrow">
      <div class="contact-header reveal">
        <h2 class="contact-headline">Not sure which one<br>you need?</h2>
        <p class="contact-subline">That's the whole point of a free estimate. Tell me what's not working and I'll tell you what would actually help.</p>
        <a href="index.html#contact" class="btn-primary" style="margin-top: 2rem; display: inline-flex;">Get a Free Estimate</a>
        <p class="hero-demo-note" style="margin-top: 1rem;">Free demo available — I'll build you something real first.</p>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer id="footer">
    <div class="container">
      <img src="assets/logo-full-transparent-bg.png" alt="itsnemo.dev" class="footer-logo">
      <p class="footer-text">itsnemo.dev</p>
      <p class="footer-copy">© 2026 Nehemiah Cionelo <span class="footer-dot" aria-hidden="true">·</span> All rights reserved.</p>
    </div>
  </footer>

  <script src="main.js"></script>
</body>
</html>
```

**Step 2: Verify**
Open services.html in browser. Check: nav loads, anchor bar scrolls to correct sections, service entries display correctly, CTA links go to `index.html#contact`.

**Step 3: Commit**
```bash
git add services.html
git commit -m "feat: add services.html with 3 service buckets"
```

---

## Task 8: Create about.html

**Files:**
- Create: `about.html`

**Step 1: Write the full file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About | Nehemiah Cionelo — Web Developer in Gunnison, CO</title>
  <meta name="description" content="CS graduate, Sport Management master's, marathon runner training for the Olympic Trials. Based in Gunnison, CO at 7,700 ft. Available remotely for small business web development and automation.">
  <link rel="canonical" href="https://itsnemo.dev/work/about.html">

  <!-- Open Graph -->
  <meta property="og:title" content="About Nehemiah Cionelo | itsnemo.dev">
  <meta property="og:description" content="Web developer based in Gunnison, CO. CS background, Sport Management master's, marathon runner. Available remotely everywhere.">
  <meta property="og:url" content="https://itsnemo.dev/work/about.html">
  <meta property="og:type" content="website">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&display=swap" rel="stylesheet">

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

  <!-- GSAP + ScrollTrigger -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <link rel="icon" href="assets/logo-mark.png" type="image/png">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- NAV -->
  <nav id="nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" aria-label="itsnemo.dev home">
        <img src="assets/logo-mark.png" alt="itsnemo.dev" class="nav-logo-img" onerror="this.style.display='none'">
        <span class="nav-logo-text">itsnemo.dev</span>
      </a>
      <div class="nav-links">
        <a href="services.html" class="nav-link">Services</a>
        <a href="about.html" class="nav-link nav-link--active">About</a>
      </div>
      <a href="index.html#contact" class="btn-ghost nav-cta">Get a Free Estimate</a>
    </div>
  </nav>

  <!-- PAGE HEADER -->
  <section id="about-hero" class="services-hero">
    <div class="container container--narrow">
      <p class="eyebrow reveal">About</p>
      <h1 class="services-headline reveal" style="transition-delay:0.1s">
        The person<br>behind the work.
      </h1>
    </div>
  </section>

  <!-- ABOUT CONTENT -->
  <section class="section-surface about-content">
    <div class="container container--narrow">

      <div class="about-block reveal">
        <h2 class="about-section-title">The background</h2>
        <p>I grew up in Albuquerque, New Mexico and studied Computer Science at the University of New Mexico. After graduating, I went to Coastal Carolina University in South Carolina for a Master's in Sport Management — which might sound like an odd combination, but it's actually what makes the work different. I understand how organizations run, not just how to build software for them.</p>
        <p>That combination — engineering and operations — is what I try to bring to every project. The goal isn't just a working website. It's a system that fits how your business actually operates.</p>
      </div>

      <div class="about-block reveal">
        <h2 class="about-section-title">Why Gunnison</h2>
        <p>I moved to Gunnison, Colorado to train for the Olympic Trials in the marathon. At 7,700 feet above sea level, the altitude training benefits are real — and the mountains don't hurt either. It's the kind of place where you can run 20 miles in the morning and still get a full day of work done.</p>
        <p>I'm also getting involved with Western Colorado University's running program here. Coaching is something I care about almost as much as building software — there's a similar satisfaction in helping someone get better at something hard.</p>
      </div>

      <div class="about-block reveal">
        <h2 class="about-section-title">How I work with clients</h2>
        <p>I'm fully remote. Gunnison is small — most of the businesses I work with are outside of it. I work with clients across Colorado and beyond via video call and async communication, on whatever schedule makes sense for them.</p>
        <p>I keep things straightforward: free estimates, no commitment required. If you're not sure whether a project makes sense, I'm happy to talk through it. I also offer free demos for prospective clients — if you want to see what I'd actually build before saying yes, I can show you.</p>
      </div>

    </div>
  </section>

  <!-- CTA -->
  <section class="section-contact services-bottom-cta">
    <div class="container container--narrow">
      <div class="contact-header reveal">
        <h2 class="contact-headline">Let's talk<br>about your project.</h2>
        <p class="contact-subline">No pressure, no commitment. Just a conversation about what you need.</p>
        <a href="index.html#contact" class="btn-primary" style="margin-top: 2rem; display: inline-flex;">Get a Free Estimate</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer id="footer">
    <div class="container">
      <img src="assets/logo-full-transparent-bg.png" alt="itsnemo.dev" class="footer-logo">
      <p class="footer-text">itsnemo.dev</p>
      <p class="footer-copy">© 2026 Nehemiah Cionelo <span class="footer-dot" aria-hidden="true">·</span> All rights reserved.</p>
    </div>
  </footer>

  <script src="main.js"></script>
</body>
</html>
```

**Step 2: Verify**
Open about.html. Check: nav active state on About link, content reads cleanly, CTA goes to index.html#contact.

**Step 3: Commit**
```bash
git add about.html
git commit -m "feat: add about.html with bio, Gunnison context, remote CTA"
```

---

## Task 9: Add services/about page CSS to style.css

**Files:**
- Modify: `style.css` (append to end of file)

**Step 1: Append the following CSS block**

```css

/* ═══════════════════════════════════════════════════
   SERVICES PAGE
═══════════════════════════════════════════════════ */
.services-hero {
  padding: clamp(3rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3rem);
}

.services-headline {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2rem, 6vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: var(--space-3);
}

.services-subline {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.65;
  color: var(--text-muted);
  max-width: 60ch;
}

/* Anchor bar */
.services-anchor-bar {
  position: sticky;
  top: 0;
  z-index: 90;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: var(--space-2) 0;
}

@media (min-width: 768px) {
  .services-anchor-bar { top: 64px; }
}

.services-anchor-bar .container {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.services-anchor-link {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  transition: color var(--dur-fast) ease;
}

.services-anchor-link:hover { color: var(--accent); }

.services-anchor-dot {
  color: var(--border-amber);
  font-size: 14px;
}

/* Bucket sections */
.services-bucket { padding: var(--section-pad) 0; }

.bucket-header {
  margin-bottom: var(--space-8);
}

.bucket-desc {
  font-size: 17px;
  color: var(--text-muted);
  line-height: 1.65;
  max-width: 60ch;
  margin-top: var(--space-2);
}

/* Service entries */
.service-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.service-entry {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: var(--space-4);
  background: var(--bg);
  transition: border-color var(--dur-fast) ease;
}

.section-surface .service-entry { background: var(--surface-2); }

.service-entry:hover { border-color: var(--border-amber); }

.service-entry-inner {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  margin-bottom: var(--space-3);
}

.service-icon {
  width: 28px;
  height: 28px;
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 3px;
  stroke-width: 1.5;
}

.service-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  color: var(--text);
  margin-bottom: var(--space-2);
}

.service-plain {
  font-size: 16px;
  color: var(--text);
  line-height: 1.65;
  margin-bottom: var(--space-2);
}

.service-example,
.service-why {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: var(--space-1);
}

.service-label {
  font-weight: 600;
  color: var(--accent);
  margin-right: 4px;
}

.service-cta {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
  border-top: 1px solid var(--border);
  padding-top: var(--space-2);
  width: 100%;
  transition: color var(--dur-fast) ease;
}

.service-cta:hover { color: var(--accent-hover); }

/* Bottom CTA on services + about pages */
.services-bottom-cta {
  padding: clamp(4rem, 8vw, 7rem) 0;
  text-align: center;
}

/* Active nav link */
.nav-link--active {
  color: var(--text) !important;
}


/* ═══════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════ */
.about-content {
  padding: var(--section-pad) 0;
}

.about-block {
  margin-bottom: var(--space-8);
}

.about-block:last-child { margin-bottom: 0; }

.about-section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  color: var(--text);
  margin-bottom: var(--space-3);
  letter-spacing: -0.01em;
}

.about-block p {
  font-size: 17px;
  line-height: 1.75;
  color: var(--text-muted);
  margin-bottom: var(--space-3);
}

.about-block p:last-child { margin-bottom: 0; }
```

**Step 2: Verify**
Reload services.html and about.html. Service entries should have icons, clean layout, amber labels. About page should read like a human wrote it.

**Step 3: Commit**
```bash
git add style.css
git commit -m "style: add services and about page styles"
```

---

## Task 10: Create SEO-EXPANSION.md

**Files:**
- Create: `docs/SEO-EXPANSION.md`

**Step 1: Write the file**

```markdown
# SEO Expansion Plan — Approach C

Current state (Approach B): three pages — index.html, services.html, about.html.

## What Approach C looks like

Split services.html into individual pages per service, one URL per service category:

- work/services/websites.html
- work/services/automation.html
- work/services/seo-content.html
- work/services/booking-systems.html  (if splitting further)

Each page gets:
- Unique <title> and <meta description> targeting specific keywords
- JSON-LD structured data (Service schema)
- Internal links to related pages
- sitemap.xml entry

## sitemap.xml to add

Place at work/sitemap.xml, list all pages with <lastmod>.
Submit to Google Search Console.

## Internal linking strategy

- index.html "What I Build" cards → individual service pages
- services.html anchor nav → individual service pages
- Each service page → related services (cross-links)
- Each service page → about.html

## Keyword targets per page

| Page | Primary keyword |
|------|----------------|
| websites.html | "custom website development small business Colorado" |
| automation.html | "business automation Google Sheets Zapier small business" |
| seo-content.html | "SEO for small business local search optimization" |
| booking-systems.html | "online booking system small business affordable" |
| about.html | "web developer Gunnison Colorado remote" |

## When to do this

Once you have 2-3 client projects to reference on each service page. Real examples outperform generic descriptions for both SEO and conversion.
```

**Step 2: Commit**
```bash
git add docs/SEO-EXPANSION.md
git commit -m "docs: add SEO-EXPANSION.md for future Approach C"
```

---

## Task 11: Humanizer pass on all copy

**Step 1:** Read the current copy in index.html hero, contact section, services.html service entries, and about.html blocks.

**Step 2:** Run each chunk through the humanizer skill checklist mentally:
- No em dash overuse
- No rule-of-three padding
- No vague attributions
- No promotional inflation ("groundbreaking", "vibrant")
- No copula avoidance ("serves as", "stands as")
- Sentence rhythm varies

**Step 3:** Edit any flagged passages in-place.

**Step 4:** Commit
```bash
git add index.html services.html about.html
git commit -m "copy: humanizer pass on all page copy"
```

---

## Task 12: Final verification

**Step 1:** Open index.html, services.html, about.html in browser. Check:
- [ ] Nav links work across all three pages
- [ ] Logo-mark in nav renders correctly
- [ ] Transparent-bg logo in hero and footer (no white box)
- [ ] Hero logo is visibly 10% larger
- [ ] "Get a Free Estimate" CTA on index scrolls to contact form
- [ ] All service-page "Get a free estimate" links go to index.html#contact
- [ ] Formspree form still submits (test with a real submission)
- [ ] Footer copyright reads "Nehemiah Cionelo"
- [ ] Favicon shows logo-mark

**Step 2:** Check mobile (375px viewport):
- [ ] Nav shows logo + CTA only (no text links)
- [ ] Services anchor bar wraps cleanly
- [ ] About page text is readable

**Step 3: Final commit**
```bash
git add -A
git commit -m "chore: final verification pass, worksite revamp complete"
```
```

After that, deploy following the deployment guide in README.md.
