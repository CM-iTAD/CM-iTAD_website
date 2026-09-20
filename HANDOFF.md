# CM-iTAD Lab website — Handoff

Everything needed to run, extend, and deploy this site. Written for a developer
picking it up cold (including Claude Code).

- **Design rules:** see [`DESIGN.md`](DESIGN.md) — read it before adding UI.
- **Quick start:** see [`README.md`](README.md).

---

## 1. Architecture in one paragraph

A static site with **no build step and no dependencies**. Every page is a thin HTML
shell containing empty `<div data-render="...">` slots. `assets/js/data.js` holds all
content as a plain JavaScript object; `assets/js/app.js` reads it and fills the slots.
Adding a project means editing one array in one file. Nothing compiles, nothing
installs, and opening `index.html` from the filesystem works.

```
site/
├── index.html            home
├── research.html         filterable project index
├── project.html          project detail  (project.html?slug=…)
├── teaching.html         year-indexed teaching list
├── publications.html     publication list
├── lab.html              facilities & equipment
├── about.html            positioning, people, partner wall
├── collaborate.html      partnership routes
├── vercel.json           deploy config
├── assets/
│   ├── css/site.css      ALL styling — design tokens in :root
│   ├── js/data.js        ALL content — the single source of truth
│   ├── js/app.js         rendering layer
│   └── img/              photography, figures, partners/
└── docs/img/*.svg        illustrations used by DESIGN.md
```

### Why this shape

The site's content changes far more often than its code. Separating them means a new
project is a data edit that cannot break the layout, and the layout can be reworked
without touching content. It also means a non-developer can add a publication.

**The tradeoff, stated honestly:** content renders client-side, so it is not in the
initial HTML for crawlers. For a lab site with a handful of inbound links this is
fine. If SEO becomes important, §7 describes the migration.

---

## 2. Data provenance

Every record in `data.js` carries a `provenance` block. **Do not add a record without
one.** This is what lets a future maintainer tell verified lab output from
placeholder text.

```js
provenance: {
  source:   "github.com/libishm1/MBB-3DP-FEM @ main — outputs/fem/",
  added:    "2026-09-20",
  verified: true
}
```

| Field | Meaning |
|---|---|
| `source` | Where the content and images came from, specifically enough to find again |
| `added` | ISO date the record entered the site |
| `verified` | `true` = confirmed by the lab. `false` = drafted, awaiting sign-off |

### Provenance of the current content

| Content | Source | Verified |
|---|---|---|
| Lab positioning, mission, capabilities | CM-iTAD ROSHN sponsorship proposal (PPTX) | Yes |
| "Possibilities" framing, graph-ML figure | CM-iTAD Lab possibilities deck (PPTX) | Yes |
| Lab photography (printer, arms, grippers, VTOL, carbon fibre) | Lab's own documentation, extracted from the source decks | Yes |
| FEM figures (`fem-displacement`, `fem-comparison`) | `github.com/libishm1/MBB-3DP-FEM` @ `main`, `outputs/fem/` | Yes |
| Brick-stacking workflow diagram | Supplied directly by the lab | Yes |
| PCM louvre GIF, Riyadh urban study | Supplied directly by the lab | Yes |
| DCC '22 citation | As given in lab materials | Yes |
| Partner logos | Sliced from the partner wall in the source deck | Logos yes, names inferred — **`p8` is unidentified** |

### Known gaps

1. **`partners[7]` ("Research partner")** — logo present, name not legible in the
   source. Replace `name` once identified.
2. **`site.url`** is a placeholder (`cm-itad.example.org`). Set the real domain.
3. **Publications** contains three entries. More exist in the lab's folders —
   eCAADe (geometry-responsive toolpaths; collaborative aggregation), ASCAAD
   (robotic stacking), SIGraDi 2026, the MDPI *Sustainability* PCM submission and
   the *Energy & Buildings* PCM submission — and should be added as their status
   firms up.
4. **`gml-aec-prisma-review`** is listed with `authors: "CM-iTAD Lab"` because the
   source document states no author list and no target venue. Confirm both, then
   set `verified: true`.
5. **Teaching**: the 2026 ARE 435 entry is taken from the official Fall 2026 course
   outline and is verified. The remaining entries are still summarised from the
   decks — verify them against the course record before publishing.
6. **`featured: true` is set on five projects but the home page renders only the
   first four** (`app.js` → `renderHeaderFeatured`, `.slice(0, 4)`). The fifth,
   `graph-ml-building-ground`, never appears there. Unfeature one or raise the slice.

---

## 3. Protocol — adding a project

1. Put images in `assets/img/`. Lowercase, hyphenated, descriptive
   (`robotic-brick-stacking.jpg`, not `IMG_4821.jpg`).
2. Append an object to `CMITAD.projects` in `data.js`:

```js
{
  slug: "acoustic-panel-printing",      // kebab-case, unique, PERMANENT — it is the URL
  title: "Printed acoustic panels",
  category: "additive-materials",       // must match a categories[].id
  year: 2026,
  status: "Active",                     // Active | Published | Completed | Paused
  featured: false,                      // true = eligible for the home page
  summary: "One sentence. Appears on the card and in search results.",
  body: [
    "Paragraph one — the problem.",
    "Paragraph two — what the project does.",
    "Paragraph three — why it matters."
  ],
  images: [
    { src: "assets/img/acoustic-panel.jpg",
      alt: "Printed acoustic panel under test",
      caption: "Printed panel, absorption testing",
      fit: "cover" }                    // "contain" for plots/diagrams — see DESIGN.md §5
  ],
  tags: ["Acoustics", "FDM"],
  links: [{ label: "Repository", href: "https://…" }],   // optional
  publicationSlug: "…",                                   // optional, links a paper
  provenance: { source: "…", added: "2026-10-04", verified: false }
}
```

> **Note:** earlier versions of this file listed `metrics[]` as an optional field.
> `app.js` has no renderer for it, so anything put there is dead data. Do not use
> it unless you also write the renderer.

3. Open `research.html` and confirm the card appears under the right filter.

**Rules**
- `slug` is permanent. Changing it breaks every existing link. To rename a project,
  change `title` and leave `slug` alone.
- `category` must be an existing `categories[].id`, or the card renders with a raw id.
- Keep `summary` to one sentence — it is laid out for that.
- `featured: true` on more than four projects: only the first four reach the home page.

### Adding a research theme

Append to `CMITAD.categories`. The filter row, the home-page theme grid, and the
detail-page breadcrumb all pick it up automatically. Never change an existing `id`.

### Adding a publication, person, teaching entry, or facility

Same pattern — append to `publications`, `people`, `teaching`, or `facilities`.
Set `projectSlug` on a publication to cross-link it with a project.

---

## 4. Protocol — adding a page

1. **Copy `teaching.html`** (the simplest full page) to `newpage.html`.
2. Edit `<title>` and `<meta name="description">`.
3. Give each dynamic region a unique slot: `<div data-render="newpage-list"></div>`.
4. Add a renderer in `app.js`, following the existing ones exactly:

```js
function renderNewPage() {
  if (!slot("newpage-list")) return;        // no-op on every other page
  fill("newpage-list", el("div", { class: "grid grid--3" }, D.newThing.map(card)));
}
```

5. Call it from `init()` at the bottom of `app.js`.
6. Add the nav entry in `data.js` → `site.nav`. Header and footer update together;
   the active-page highlight is automatic.

The `if (!slot(...)) return;` guard is what lets one script serve every page — keep it.

**Static pages** (a manifesto, a policy) need no renderer: write the markup directly
between the header and footer slots and still add the nav entry.

---

## 5. Protocol — a second site

To spin up a sibling site (a project microsite, a conference page) reusing this system:

1. Copy `assets/css/site.css` and `assets/js/app.js` unchanged.
2. Write a **new** `data.js` — new `site` block, new content arrays.
3. Keep the `data-render` slot names identical so `app.js` works untouched.
4. Change only `--cm-blue` / `--cm-orange` in `:root` if the sub-brand needs it.
   Leave the neutrals alone — they are what make it recognisably CM-iTAD.
5. Deploy as a separate Vercel project, or as a subdirectory of this one.

If both sites need to stay in sync, promote `site.css` and `app.js` into a shared
repo and pull them in as a git submodule rather than copy-pasting twice.

---

## 6. Deploying to Vercel

**Via the dashboard**
1. Push this folder to a Git repository.
2. Vercel → *Add New Project* → import the repo.
3. Framework preset: **Other**. Build command: *(leave empty)*. Output directory: *(leave empty,
   or `site` if the repo root is one level above this folder)*.
4. Deploy.

**Via CLI**
```bash
npm i -g vercel
cd site
vercel          # preview
vercel --prod   # production
```

`vercel.json` sets long-lived immutable caching on `/assets/*`. Because of that,
**changing an image requires a new filename** (`hero.jpg` → `hero-v2.jpg`) or the old
one may be served from cache.

### Optional: pretty URLs

Set `"cleanUrls": true` in `vercel.json` to serve `/research` instead of
`/research.html`. If you do, update `site.nav` hrefs in `data.js` and the internal
links in `app.js` to match — otherwise every click takes a redirect hop. Links are
currently relative with `.html`, which works identically on Vercel, on a plain static
host, and from the local filesystem.

---

## 7. If you outgrow this setup

In rough order of when it becomes worth doing:

1. **Per-project pages for SEO.** Write a small Node script that reads `data.js` and
   emits one static HTML file per project at build time. Keeps the authoring model,
   gains crawlable pages.
2. **Move content to Markdown + front-matter** and adopt Astro or Eleventy. Natural
   step once more than one person edits content.
3. **A CMS** (Sanity, Contentful) if non-technical staff need to publish without Git.

Each step preserves the data shape in §3 — the `projects` array maps cleanly onto
collections in any of these.

---

## 8. Conventions

- Vanilla ES5-compatible JS. No frameworks, no bundler, no npm dependencies.
- 2-space indent; double quotes in JS.
- All styling lives in `site.css`. Inline `style` attributes are used sparingly in the
  HTML shells for one-off spacing only — never for colour or type.
- Filenames lowercase and hyphenated.
- Commit content and code changes separately; it makes content history readable.
