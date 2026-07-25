# itsnemo.dev — GitHub Pages Deploy Target

> Inherits from `/PROJECTS/CLAUDE.md`. This file = project-specific facts only.

## What this is

The **deploy target** for `itsnemo.dev`. GitHub Pages serves the `master` branch of
`github.com/cionelo/cionelo.github.io` at the apex domain (`CNAME` → `itsnemo.dev`).

It hosts several unrelated projects under one domain because they share a domain, not
because they share a codebase. Treat each top-level page as its own thing.

**This repo is a deploy target, not a place decisions get made.** Two of the things it
serves are mirrors whose source of truth is a *different* repo — see Mirrored files below.

## Critical facts

- **No build step. No framework. No package manager at the repo root.** Plain static
  HTML/CSS/vanilla JS. What's in the repo is byte-for-byte what ships.
- **Deploy = push to `master`.** There is no staging, no preview, no CI. A push is a
  production deploy. There is no rollback other than another push.
- **Root-level assets are referenced by bare relative path** — `styles.css`, `script.js`,
  `charts.js`, `textures/*.png`, `assets/**`. Moving or renaming any of them breaks the
  live site on the next push. `textures/` in particular is referenced from
  [styles.css:1174](styles.css#L1174) and [script.js:454](script.js#L454) — it looks like
  orphaned Minecraft art, it is not; it's the F3-hearth theme on the live homepage.
- **⚠ `master` is currently ahead of `origin/master` by 17 commits** (as of 2026-07-24).
  The entire media kit build is local-only — `itsnemo.dev/media-kit` is a 404 right now.
  Pushing deploys it. See Status below before you push.
- Verify the reference graph before moving *anything*, then serve locally and confirm
  nothing 404s. Do reorg work in an isolated worktree, never directly on `master`.

## Layout

| Path | What | Notes |
|------|------|-------|
| `index.html` + `styles.css` + `script.js` + `charts.js` | Main portfolio homepage | Bare relative refs. `strategy-viz.html` is embedded as an iframe at [index.html:313](index.html#L313) |
| `portfolio.html` + `portfolio-styles.css` + `portfolio.js` | Secondary project gallery | Also loads root `styles.css` + `script.js` |
| `strategy-viz.html` | Marketing-strategy visualization | Not a standalone page — iframed into `index.html` |
| `media-kit/` | Athlete brand media kit → `itsnemo.dev/media-kit` | **Mirror — see below** |
| `little-bites.html` | Little Bites ordering demo | **Mirror — see below** |
| `std.html`, `std-curric.html` | Tutoring Angwin ("STD") — redirect stub to a Google Apps Script app, plus a standalone curriculum page | No inbound links from `index.html`/`portfolio.html`; shared by direct URL |
| `sdr/meets/index.html` | Redirect stub → `sdr-meets.vercel.app/meets` | Meta-refresh only, no content |
| `textures/` | Minecraft-style textures for the homepage hearth theme | **Load-bearing.** Do not move |
| `assets/` | Images, resume PDFs, background videos, favicon (59MB) | |

## Working in this repo

The layout above is deliberately flat and stays that way — a reorg was considered and
rejected (2026-07-24). Every path in this repo is bare and relative, there's no build step
to catch a break, and no staging URL to notice one on. Moving files buys tidiness and pays
for it in live 404s. So: **navigate by the table, don't restructure.**

Because nothing is enforced by tooling, do these by hand:

```bash
# Serve locally — always check a real browser, never trust the file:// protocol
python3 -m http.server 8000     # → http://localhost:8000

# Pre-push check: every relative href/src in every HTML file resolves to a real file.
# Verified 2026-07-24 — catches the known tutor-dashboard break, no false positives.
grep -rhoE '(href|src)="[^"#:]+"' --include='*.html' . \
  | sed -E 's/.*="([^"]+)".*/\1/' \
  | grep -vE '^(https?|mailto|#|\[GAP)' | sort -u \
  | while read -r f; do [ -e "$f" ] || [ -e "media-kit/$f" ] || echo "MISSING: $f"; done
```

Reorg work, if it ever happens anyway, goes in an isolated git worktree — never on
`master` — and does not get pushed until the check above is clean and the pages have been
loaded in a browser.

## Mirrored files — do NOT edit these copies directly

Two things served from this repo are built or copied from elsewhere. Editing them here
creates a silent fork: the copy here drifts, the real source gets rebuilt, and your edit
is overwritten with no warning.

### `media-kit/` → source of truth is [`../media-kit/`](../media-kit/)

This folder is **generated output**. Its source is `PROJECTS/media-kit/src/` (a separate
git repo, private remote `github.com/cionelo/media-kit`), along with the brand decisions,
positioning, voice, metrics, and design spec that drive it.

- **Do not edit anything in `media-kit/` here. Ever.** Deploy runs
  `rsync --delete` from the source repo, so any edit you make in this folder is
  **destroyed on the next deploy**, silently and without a merge conflict to warn you.
  This includes typo fixes.
- Deploy is `../media-kit/bin/deploy.sh` — it tests, mirrors, and commits *only* the
  `media-kit/` path here, then asks before pushing.
- Spec: `../media-kit/docs/superpowers/specs/2026-07-23-media-kit-design.md` (§7 covers
  this arrangement, incl. the 2026-07-24 amendment that moved the source out of here).
- The page currently contains **33 `[GAP: ...]` placeholder tokens** and its `assets/`
  folder (hero clip, work thumbnails, partner logos) does not exist yet.
- **⚠ Migration pending as of 2026-07-24** — `../media-kit/src/` does not exist yet, so
  right now this folder *is* still the only copy of the source. Until the move happens,
  the "generated output" framing above describes the intended state, not the current one.
  Check whether `../media-kit/src/` exists before trusting it. Tests here:
  `cd media-kit && node --test` (15 passing).

### `little-bites.html` → source of truth is [`../little-bites-menu-system/`](../little-bites-menu-system/)

`little-bites.html` here is **byte-identical** to
`little-bites-menu-system/little-bites-demo.html` (verified: `diff` produces zero output).
It is a manually-synced mirror — there is no script, no symlink, nothing enforcing it.

- Source of truth is `little-bites-menu-system`. Edit the demo there, then copy here.
- That repo has its own CLAUDE.md with the real gotchas (options encoding, `BACKEND_URL`
  line number, the manual Apps Script redeploy step). Read it before touching anything
  Little Bites.

## Conventions

- File naming: `{description}-{YYYY-MM-DD}.{ext}`
- Commit format: `<type>: <description>` (feat, fix, refactor, docs, test, chore, perf, ci)
- Specs and plans, when this repo needs them, go under `docs/superpowers/{specs,plans}/`
  — same convention as the rest of `/PROJECTS`. Nothing lives there yet: the media kit's
  spec and plan correctly live in the sibling `media-kit/` repo, not here.

## Status / Open Items

- [ ] **17 unpushed commits on `master`** (Nemo, 2026-07-24) — the whole media kit build.
      Pushing publishes `itsnemo.dev/media-kit` **with 33 unfilled `[GAP: ...]` tokens
      visible** and no hero/logo assets. Decide deliberately: hold until the spec §9 data
      fill lands, or push now knowing it's visibly incomplete. There is no staging URL to
      preview it on.
- [ ] **Broken image on the live homepage** (Nemo, 2026-07-24) —
      [index.html:211](index.html#L211) points at `assets/images/tutor-dashboard-placeholder.png`,
      which does not exist. The actual file is `assets/images/tutor-dashboard.png`. Live 404.
- [ ] **`.DS_Store` files are tracked** despite being in `.gitignore` — `.gitignore` does
      not apply to already-tracked files. Four of them: repo root, `assets/`,
      `assets/images/`, `old/`. Need `git rm --cached`.
- [ ] **`STD-last draft alias` is tracked and served** — a macOS alias file pointing at a
      local `~/Downloads/Tutoring Angwin/STD-last draft`. Meaningless to anyone fetching
      it over HTTP. Deletion candidate.
- [ ] **`work/` is empty** — contains only `.DS_Store` files, so nothing in it is tracked.
      Local cruft; safe to delete.
- [ ] **10MB zip still in git history** (Nemo, 2026-07-24) — `old/cionelo.github.io-master.zip`,
      a stale snapshot of this repo, was **tracked and pushed to `origin/master`**. The
      `/old/` line in `.gitignore` never applied to it, same trap as `.DS_Store`: gitignore
      does not retroactively untrack. It has been deleted at the tip, but every clone still
      pays ~10MB because the blob lives in history. Removing it for real needs
      `git filter-repo` + a force-push, which rewrites public history — Nemo's call, and
      not worth it unless clone size starts to matter.
      **Lesson for this repo: check `git ls-files` before assuming `.gitignore` covers something.**
- [ ] **`README.md` is stale** — v2.3.0, "Last Updated: January 2026". Predates the media
      kit entirely and has mojibake in its section headers (`## =� Table of Contents`).
      Rewrite or retire; CLAUDE.md now carries the operational facts.
- [ ] **`.claude/` holds only an empty `worktrees/` dir** — no commands defined. The one
      real recurring friction worth a command is *verifying no relative reference 404s
      before a push*, given this repo has no build step to catch it and already has one
      live broken ref. Not built yet — confirm the friction is real first.
