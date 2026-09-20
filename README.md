# CM-iTAD Lab — website

Public website for the **Computational Methods and Intelligent Technology in
Architecture and Design (CM-iTAD) Lab**, Alfaisal University.

Static, dependency-free, deployable to Vercel as-is.

---

## Run it locally

No build step. Either open the file directly:

```bash
open index.html          # macOS
start index.html         # Windows
```

…or serve it (recommended — matches production behaviour):

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

Any static server works (`npx serve`, `php -S`, VS Code Live Server).

---

## Deploy

```bash
npm i -g vercel
vercel --prod
```

Framework preset **Other**, no build command, no output directory.
Full instructions in [`HANDOFF.md`](HANDOFF.md) §6.

---

## Editing content

**All content lives in `assets/js/data.js`.** Adding a project, publication, person
or nav item is an edit to that one file — no HTML changes needed.

Every record carries a `provenance` block recording where the content came from and
whether the lab has verified it. Do not add records without one.

→ Protocols for adding projects, pages and sibling sites: [`HANDOFF.md`](HANDOFF.md)
→ Colour, type, components and layout rules: [`DESIGN.md`](DESIGN.md)

---

## Structure

```
index.html · research.html · project.html · teaching.html
publications.html · lab.html · about.html · collaborate.html

assets/css/site.css   design tokens + all styling
assets/js/data.js     all content            ← edit this
assets/js/app.js      rendering layer
assets/img/           photography and figures
docs/img/             illustrations for DESIGN.md
```

Pages are thin shells with `data-render="…"` slots that `app.js` fills from
`data.js`. One script serves every page.

---

## Content sources

Built from the lab's own material: the CM-iTAD sponsorship and possibilities decks,
lab photography, figures supplied directly by the lab, and FEM outputs from
[`libishm1/MBB-3DP-FEM`](https://github.com/libishm1/MBB-3DP-FEM).

Known gaps and unverified items are listed in [`HANDOFF.md`](HANDOFF.md) §2.

---

## Before going live

- [ ] Set the real domain in `data.js` → `site.url`
- [ ] Identify the unnamed partner logo (`partners[7]`)
- [ ] Verify teaching entries against the official course record
- [ ] Add remaining publications
- [ ] Replace the favicon if a dedicated one exists
