/* ==========================================================================
   CM-iTAD Lab — rendering layer
   Reads window.CMITAD (data.js) and fills [data-render="..."] slots.
   No build step, no dependencies. See HANDOFF.md §4.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.CMITAD;
  if (!D) { console.error("[cm-itad] data.js did not load before app.js"); return; }

  /* ------------------------------------------------------------- helpers */
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k === "html") n.innerHTML = v;
      else n.setAttribute(k, v);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function slot(name) { return document.querySelector('[data-render="' + name + '"]'); }
  function fill(name, node) { var s = slot(name); if (s && node) { s.innerHTML = ""; s.appendChild(node); } return s; }
  function frag(nodes) { var f = document.createDocumentFragment(); nodes.forEach(function (n) { if (n) f.appendChild(n); }); return f; }
  function catOf(id) { return D.categories.filter(function (c) { return c.id === id; })[0] || { id: id, label: id }; }
  function param(k) { return new URLSearchParams(location.search).get(k); }

  /* Filename used for nav highlighting. "/", "" and "/index.html" all -> "index.html" */
  function norm(p) {
    p = (p || "").split("?")[0].split("#")[0];
    var last = p.substring(p.lastIndexOf("/") + 1);
    return last === "" ? "index.html" : last;
  }

  /* --------------------------------------------------------- header/footer */
  function renderHeader() {
    var host = slot("header"); if (!host) return;
    var here = norm(location.pathname);

    var nav = el("nav", { class: "nav", id: "site-nav", "aria-label": "Primary" },
      D.site.nav.map(function (item) {
        var a = el("a", { href: item.href, text: item.label });
        if (norm(item.href) === here) a.setAttribute("aria-current", "page");
        return a;
      }));

    var toggle = el("button", {
      class: "nav-toggle", type: "button", "aria-expanded": "false",
      "aria-controls": "site-nav", "aria-label": "Menu"
    }, [el("span")]);

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.setAttribute("data-open", String(!open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { toggle.setAttribute("aria-expanded", "false"); nav.setAttribute("data-open", "false"); }
    });

    host.appendChild(el("div", { class: "site-header__inner" }, [
      el("a", { class: "brand", href: "index.html", "aria-label": D.site.name + " home" }, [
        el("span", { class: "brand__mark" }, [el("img", { src: "assets/img/logo-cube.png", alt: "", width: "34", height: "34" })]),
        el("span", {}, [
          el("span", { class: "brand__name", text: D.site.name, style: "display:block" }),
          el("span", { class: "brand__sub", text: "Alfaisal University", style: "display:block" })
        ])
      ]),
      nav, toggle
    ]));
  }

  function renderFooter() {
    var host = slot("footer"); if (!host) return;
    var s = D.site;
    host.appendChild(el("div", { class: "wrap" }, [
      el("div", { class: "footer__grid" }, [
        el("div", {}, [
          el("div", { class: "brand__name", text: s.longName, style: "font-size:17px;margin-bottom:10px;color:var(--fg-on-dark)" }),
          el("p", { class: "small", text: s.parent, style: "color:var(--fg2-on-dark)" }),
          el("p", { class: "small", text: s.location, style: "color:var(--fg2-on-dark);margin-top:4px" })
        ]),
        el("div", {}, [
          el("div", { class: "footer__h", text: "Explore" }),
          el("div", { class: "footer__links" }, s.nav.map(function (i) { return el("a", { href: i.href, text: i.label }); }))
        ]),
        el("div", {}, [
          el("div", { class: "footer__h", text: "Contact" }),
          el("div", { class: "footer__links" }, [
            el("a", { href: "mailto:" + s.email, text: s.email }),
            el("a", { href: s.officialPage, target: "_blank", rel: "noopener", text: "Official university page" })
          ])
        ])
      ]),
      el("div", { class: "footer__bar" }, [
        el("span", { text: "© " + new Date().getFullYear() + " " + s.name + " · " + s.parent }),
        el("span", { text: s.tagline })
      ])
    ]));
  }

  /* --------------------------------------------------------------- cards */
  function projectCard(p) {
    var img = (p.images || [])[0];
    var media = img
      ? el("div", { class: "card__media" + (img.fit === "contain" ? " card__media--contain" : "") },
          [el("img", { src: img.src, alt: img.alt || p.title, loading: "lazy" })])
      : null;

    return el("a", { class: "card", href: "project.html?slug=" + p.slug }, [
      media,
      el("div", { class: "card__body" }, [
        el("div", { class: "card__meta" }, [
          el("span", { class: "tag", text: catOf(p.category).label }),
          el("span", { class: "tag tag--year", text: String(p.year) })
        ]),
        el("h3", { class: "card__title", text: p.title }),
        el("p", { class: "card__sum", text: p.summary }),
        el("span", { class: "card__more", text: "View project →" })
      ])
    ]);
  }

  /* ----------------------------------------------------------- home page */
  function renderHome() {
    if (!slot("home-featured")) return;

    fill("home-stats", el("div", { class: "grid grid--3" },
      D.stats.map(function (s) {
        return el("div", { class: "stat" }, [
          el("span", { class: "stat__n", text: s.n }),
          el("span", { class: "stat__l", text: s.label })
        ]);
      })));

    var featured = D.projects.filter(function (p) { return p.featured; }).slice(0, 4);
    fill("home-featured", el("div", { class: "grid grid--2" }, featured.map(projectCard)));

    fill("home-themes", el("div", { class: "cells cells--3" },
      D.categories.map(function (c, i) {
        return el("a", { class: "cell", href: "research.html?theme=" + c.id, style: "color:inherit" }, [
          el("span", { class: "cell__num", text: String(i + 1).padStart(2, "0") }),
          el("span", { class: "h-3", text: c.label }),
          el("span", { class: "card__sum", text: c.blurb })
        ]);
      })));
  }

  /* ------------------------------------------------------- research page */
  function renderResearch() {
    var listHost = slot("research-list"); if (!listHost) return;
    var filterHost = slot("research-filters");
    var active = param("theme") || "all";

    function draw() {
      var items = active === "all" ? D.projects : D.projects.filter(function (p) { return p.category === active; });
      items = items.slice().sort(function (a, b) { return b.year - a.year; });
      listHost.innerHTML = "";
      listHost.appendChild(items.length
        ? el("div", { class: "grid grid--3" }, items.map(projectCard))
        : el("p", { class: "empty", text: "No projects in this theme yet." }));

      if (filterHost) Array.prototype.forEach.call(filterHost.querySelectorAll(".filter"), function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.theme === active));
      });
    }

    if (filterHost) {
      var defs = [{ id: "all", label: "All research" }].concat(D.categories);
      filterHost.innerHTML = "";
      defs.forEach(function (c) {
        var b = el("button", { class: "filter", type: "button", "data-theme": c.id, text: c.label, "aria-pressed": "false" });
        b.addEventListener("click", function () {
          active = c.id;
          var u = new URL(location.href);
          if (active === "all") u.searchParams.delete("theme"); else u.searchParams.set("theme", active);
          history.replaceState(null, "", u);
          draw();
        });
        filterHost.appendChild(b);
      });
    }
    draw();
  }

  /* --------------------------------------------------------- project page */
  function renderProject() {
    var host = slot("project"); if (!host) return;
    var p = D.projects.filter(function (x) { return x.slug === param("slug"); })[0];

    if (!p) {
      host.appendChild(el("div", { class: "wrap section" }, [
        el("h1", { class: "h-1", text: "Project not found" }),
        el("p", { class: "lead", text: "That project does not exist, or its link has changed.", style: "margin-top:14px" }),
        el("div", { class: "btn-row" }, [el("a", { class: "btn btn--primary", href: "research.html", text: "All research" })])
      ]));
      return;
    }

    document.title = p.title + " — " + D.site.name;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", p.summary);

    var spec = el("div", { class: "spec" }, [
      row("Theme", catOf(p.category).label),
      row("Year", String(p.year)),
      row("Status", p.status),
      p.tags && p.tags.length ? row("Methods", p.tags.join(", ")) : null
    ]);
    function row(k, v) {
      return el("div", { class: "spec__row" }, [el("span", { class: "spec__k", text: k }), el("span", { text: v })]);
    }

    var links = (p.links || []).map(function (l) {
      return el("a", { class: "btn btn--ghost", href: l.href, target: "_blank", rel: "noopener", text: l.label });
    });

    host.appendChild(el("div", { class: "wrap section" }, [
      el("p", { class: "breadcrumb" }, [
        el("a", { href: "research.html", text: "Research" }),
        el("span", { text: " / " + catOf(p.category).label })
      ]),
      el("div", { class: "detail__head" }, [
        el("div", {}, [
          el("h1", { class: "h-display", text: p.title }),
          el("p", { class: "lead", text: p.summary, style: "margin-top:20px;max-width:62ch" }),
          links.length ? el("div", { class: "btn-row" }, links) : null
        ]),
        spec
      ])
    ]));

    var figs = (p.images || []).map(function (im) {
      return el("figure", { class: "figure" + (im.fit === "contain" ? "" : " figure--cover"), style: "margin:0" }, [
        el("img", { src: im.src, alt: im.alt || p.title, loading: "lazy" }),
        im.caption ? el("figcaption", { text: im.caption }) : null
      ]);
    });

    host.appendChild(el("div", { class: "wrap section--tight" }, [
      el("div", { class: "grid " + (figs.length > 1 ? "grid--2" : "grid--1") }, figs)
    ]));

    if (p.body && p.body.length) {
      host.appendChild(el("div", { class: "wrap section--tight" }, [
        el("div", { class: "detail__body" }, p.body.map(function (t) { return el("p", { text: t }); }))
      ]));
    }

    var pub = p.publicationSlug && D.publications.filter(function (x) { return x.slug === p.publicationSlug; })[0];
    if (pub) {
      host.appendChild(el("div", { class: "wrap section--tight" }, [
        el("div", { class: "callout" }, [
          el("div", { class: "mono-label", text: "Related publication", style: "margin-bottom:8px" }),
          el("p", { text: pub.authors + " (" + pub.year + "). " + pub.title + ". " + pub.venue + "." })
        ])
      ]));
    }

    var more = D.projects.filter(function (x) { return x.category === p.category && x.slug !== p.slug; }).slice(0, 3);
    if (more.length) {
      host.appendChild(el("div", { class: "wrap section" }, [
        el("p", { class: "eyebrow", text: "More in " + catOf(p.category).label }),
        el("div", { class: "grid grid--3" }, more.map(projectCard))
      ]));
    }
  }

  /* -------------------------------------------------------- teaching page */
  function renderTeaching() {
    if (!slot("teaching-list")) return;
    var items = D.teaching.slice().sort(function (a, b) { return b.year - a.year; });
    fill("teaching-list", el("div", { class: "list" }, items.map(function (t) {
      return el("div", { class: "list__item" }, [
        el("span", { class: "list__year", text: String(t.year) }),
        el("div", {}, [
          el("div", { class: "list__title", text: t.title }),
          el("p", { class: "list__meta", text: t.summary })
        ]),
        el("span", { class: "tag", text: t.kind })
      ]);
    })));
  }

  /* ---------------------------------------------------- publications page */
  function renderPublications() {
    if (!slot("publications-list")) return;
    var items = D.publications.slice().sort(function (a, b) { return b.year - a.year; });
    fill("publications-list", el("div", { class: "list" }, items.map(function (pub) {
      var linked = pub.projectSlug && D.projects.some(function (p) { return p.slug === pub.projectSlug; });
      return el("div", { class: "list__item" }, [
        el("span", { class: "list__year", text: String(pub.year) }),
        el("div", {}, [
          el("div", { class: "list__title", text: pub.title }),
          el("p", { class: "list__meta", text: pub.authors + " · " + pub.venue + (pub.status ? " · " + pub.status : "") }),
          linked ? el("p", { style: "margin-top:8px" }, [
            el("a", { class: "small", href: "project.html?slug=" + pub.projectSlug, text: "Related project →" })
          ]) : null
        ]),
        el("span", { class: "tag", text: pub.type })
      ]);
    })));
  }

  /* --------------------------------------------------------------- lab page */
  function renderLab() {
    if (!slot("lab-facilities")) return;
    fill("lab-facilities", el("div", { class: "grid grid--2" }, D.facilities.map(function (f) {
      return el("article", { class: "card" }, [
        f.image ? el("div", { class: "card__media" }, [el("img", { src: f.image, alt: f.name, loading: "lazy" })]) : null,
        el("div", { class: "card__body" }, [
          el("h3", { class: "card__title", text: f.name }),
          el("p", { class: "card__sum", text: f.detail })
        ])
      ]);
    })));
    fill("lab-stats", el("div", { class: "grid grid--3" }, D.stats.map(function (s) {
      return el("div", { class: "stat" }, [
        el("span", { class: "stat__n", text: s.n }),
        el("span", { class: "stat__l", text: s.label })
      ]);
    })));
  }

  /* ------------------------------------------------------------ about page */
  function renderAbout() {
    if (slot("about-people")) {
      fill("about-people", el("div", {}, D.people.map(function (pp) {
        return el("div", { class: "person" }, [
          el("span", { class: "person__name", text: pp.name }),
          el("span", { class: "person__role", text: pp.role }),
          el("p", { class: "person__bio", text: pp.bio }),
          pp.email ? el("a", { class: "small", href: "mailto:" + pp.email, text: pp.email }) : null
        ]);
      })));
    }
    if (slot("partners")) {
      fill("partners", el("div", { class: "logos" }, D.partners.map(function (pt) {
        return el("div", {}, [el("img", { src: pt.logo, alt: pt.name, loading: "lazy" })]);
      })));
    }
  }

  /* ------------------------------------------------------ collaborate page */
  function renderCollaborate() {
    if (!slot("collab-list")) return;
    fill("collab-list", el("div", { class: "cells cells--3" }, D.collaborate.map(function (c, i) {
      return el("div", { class: "cell" }, [
        el("span", { class: "cell__num", text: String(i + 1).padStart(2, "0") }),
        el("span", { class: "h-3", text: c.title }),
        el("span", { class: "card__sum", text: c.body })
      ]);
    })));
  }

  /* ------------------------------------------------------------------ init */
  function init() {
    renderHeader(); renderFooter();
    renderHome(); renderResearch(); renderProject();
    renderTeaching(); renderPublications(); renderLab();
    renderAbout(); renderCollaborate();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
