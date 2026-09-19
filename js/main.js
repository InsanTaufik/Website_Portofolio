/**
 * Renders portfolioData into the shell in index.html, then wires the
 * interaction layer.
 *
 * Motion policy: entrance reveals run once via IntersectionObserver,
 * the scroll-progress bar is a native CSS scroll timeline where the
 * browser has one, and everything non-essential is dropped under
 * prefers-reduced-motion.
 */
(function () {
  "use strict";

  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => mqReduced.matches;
  const $ = (sel) => document.querySelector(sel);
  const byId = (id) => document.getElementById(id);

  /* ── Icons (stroke, 1.5–2px, single family) ──────────────── */
  const ICON = {
    "arrow-down":
      '<svg viewBox="0 0 24 24" stroke-width="2" data-nudge="down" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
    "arrow-right":
      '<svg viewBox="0 0 24 24" stroke-width="2" data-nudge="right" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    download:
      '<svg viewBox="0 0 24 24" stroke-width="2" data-nudge="down" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    "chevron-down":
      '<svg class="disclosure-icon" viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    external:
      '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A4 4 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    copy:
      '<svg viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    "check-circle":
      '<svg viewBox="0 0 24 24" stroke-width="1.5" aria-hidden="true"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>',
    smartphone:
      '<svg viewBox="0 0 24 24" stroke-width="1.5" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>',
    terminal:
      '<svg viewBox="0 0 24 24" stroke-width="1.5" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="6 9 10 12 6 15"/><line x1="12" y1="15" x2="17" y2="15"/></svg>',
    layers:
      '<svg viewBox="0 0 24 24" stroke-width="1.5" aria-hidden="true"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>',
    monitor:
      '<svg viewBox="0 0 24 24" stroke-width="1.5" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    code:
      '<svg viewBox="0 0 24 24" stroke-width="1.5" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  };

  /* ── Helpers ─────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Renders the final value now; initCounters() animates up to it later. */
  function countAttrs(item) {
    if (item.count == null) return "";
    return ` data-count="${item.count}" data-final="${esc(item.value)}"`;
  }

  function downloadAttrs(item) {
    if (!item.download) return "";
    return ` download${item.downloadName ? '="' + esc(item.downloadName) + '"' : ""}`;
  }

  function tags(list) {
    if (!Array.isArray(list) || !list.length) return "";
    return `<ul class="tag-row">${list
      .map((t) => `<li class="tag">${esc(t)}</li>`)
      .join("")}</ul>`;
  }

  function checklist(list) {
    if (!Array.isArray(list) || !list.length) return "";
    return `<ul class="checklist">${list
      .map((x) => `<li>${esc(x)}</li>`)
      .join("")}</ul>`;
  }

  function metricBand(list) {
    if (!Array.isArray(list) || !list.length) return "";
    return `<div class="metrics">${list
      .map(
        (m) =>
          `<div class="metric"><span class="metric-value">${esc(
            m.value
          )}</span><span class="metric-label">${esc(m.label)}</span></div>`
      )
      .join("")}</div>`;
  }

  /** Source → step → target chain. Arrows are CSS-only and decorative. */
  function flowDiagram(nodes, label) {
    if (!Array.isArray(nodes) || nodes.length < 2) return "";
    return `<ol class="flow" aria-label="${esc(label)}">${nodes
      .map((n) => `<li><span class="flow-node">${esc(n)}</span></li>`)
      .join("")}</ol>`;
  }

  function sectionHead(label, titleId, title, intro) {
    return `
      <header class="section-head">
        <p class="section-label reveal">${esc(label)}</p>
        <h2 class="section-title reveal" data-delay="1" id="${titleId}">${esc(
      title
    )}</h2>
        ${
          intro
            ? `<p class="section-intro reveal" data-delay="2">${esc(intro)}</p>`
            : ""
        }
      </header>`;
  }

  function detailBlock(heading, items) {
    if (!Array.isArray(items) || !items.length) return "";
    return `<div class="detail-block"><h4>${esc(heading)}</h4>${checklist(
      items
    )}</div>`;
  }

  function disclosure(summaryLabel, bodyHtml) {
    if (!bodyHtml) return "";
    return `
      <details class="disclosure">
        <summary>${ICON["chevron-down"]}${esc(summaryLabel)}</summary>
        <div class="disclosure-body">${bodyHtml}</div>
      </details>`;
  }

  /* ── Renderers ───────────────────────────────────────────── */
  function renderNav() {
    const { meta, nav } = portfolioData;
    const items = nav.links
      .map(
        (l) =>
          `<li><a class="nav-link" href="${esc(l.href)}" data-section="${esc(
            l.href.slice(1)
          )}">${esc(l.label)}</a></li>`
      )
      .join("");

    byId("nav-root").innerHTML = `
      <a href="#hero" class="brand">${esc(meta.navLogo)}<span>.</span></a>
      <nav class="nav-primary" aria-label="Primary"><ul class="nav-list">${items}</ul></nav>
      <a class="nav-cta" href="${esc(nav.cta.href)}"${downloadAttrs(
      nav.cta
    )}>${ICON.download}${esc(nav.cta.label)}</a>
      <button class="hamburger" id="hamburger" type="button"
              aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>`;

    const mobileItems = nav.links
      .map(
        (l) =>
          `<a href="${esc(l.href)}" data-section="${esc(l.href.slice(1))}">${esc(
            l.label
          )}</a>`
      )
      .join("");
    byId("mobile-menu").innerHTML =
      mobileItems +
      `<a href="${esc(nav.cta.href)}"${downloadAttrs(
        nav.cta
      )}>Download CV</a>`;
  }

  function renderHero() {
    const h = portfolioData.hero;

    const ctas = h.ctas
      .map(
        (c) =>
          `<a class="btn btn--${c.variant === "primary" ? "primary" : "outline"}"
              href="${esc(c.href)}"${downloadAttrs(c)}>${esc(c.label)}${
            ICON[c.icon] || ""
          }</a>`
      )
      .join("");

    const layers = h.layers
      .map(
        (l) => `
        <li class="layer">
          <span class="layer-rail" aria-hidden="true"><span class="layer-node"></span></span>
          <span class="layer-text">
            <span class="layer-label">${esc(l.label)}</span>
            <span class="layer-scope">${esc(l.scope)}</span>
            <span class="layer-detail">${esc(l.detail)}</span>
          </span>
        </li>`
      )
      .join("");

    byId("hero-root").innerHTML = `
      <div class="hero-main">
        <p class="hero-status reveal">
          <span class="status-dot" aria-hidden="true"></span>
          <span>${esc(h.status)}</span>
          <span class="hero-status-sep" aria-hidden="true">/</span>
          <span>${esc(h.location)}</span>
        </p>
        <h1 id="hero-heading" class="reveal" data-delay="1">
          <span class="hero-name">${esc(h.name)}</span>
          <span class="hero-role">${esc(h.role)}</span>
        </h1>
        <p class="hero-summary reveal" data-delay="2">${esc(h.summary)}</p>
        <div class="hero-ctas reveal" data-delay="3">${ctas}</div>
      </div>

      <aside class="layer-stack reveal" data-delay="2" aria-labelledby="layers-caption">
        <div class="layer-stack-head">
          <span class="mono-label" id="layers-caption">${esc(h.layersCaption)}</span>
          <span class="mono-label">${h.layers.length} layers</span>
        </div>
        <ol class="layer-list">${layers}</ol>
      </aside>`;
  }

  function renderEvidence() {
    const items = portfolioData.hero.evidence;
    byId("evidence-root").innerHTML = `
      <div class="evidence-strip reveal">
        ${items
          .map(
            (e) =>
              `<div class="evidence-item"><span class="evidence-value"${countAttrs(
                e
              )}>${esc(e.value)}</span><span class="evidence-label">${esc(
                e.label
              )}</span></div>`
          )
          .join("")}
      </div>`;
  }

  function renderExperience() {
    const exp = portfolioData.experience;
    const roles = exp.items
      .map((job) => {
        const body =
          detailBlock("Approach", job.approach) +
          detailBlock("Findings", job.findings) +
          tags(job.tags);

        return `
        <article class="role reveal">
          <div class="role-meta">
            <p class="role-period">${
              job.current
                ? '<span class="status-dot" aria-hidden="true"></span>'
                : ""
            }${esc(job.period)}</p>
            <p class="role-company">${esc(job.company)}</p>
            <p class="role-location">${esc(job.location)}</p>
          </div>
          <div class="role-body">
            <h3 class="role-title">${esc(job.role)}</h3>
            <p class="role-context">${esc(job.context)}</p>
            ${metricBand(job.metrics)}
            ${disclosure(exp.disclosureLabel, body)}
          </div>
        </article>`;
      })
      .join("");

    byId("experience-root").innerHTML =
      sectionHead(exp.sectionLabel, "experience-heading", exp.title, exp.intro) +
      `<div class="timeline">${roles}</div>`;
  }

  function projectLinks(p) {
    const links = [];
    if (p.repo) links.push({ label: "Repository", href: p.repo });
    if (Array.isArray(p.links)) p.links.forEach((l) => l && l.href && links.push(l));
    if (!links.length) return "";
    return `<div class="project-links">${links
      .map(
        (l) =>
          `<a class="text-link" href="${esc(
            l.href
          )}" target="_blank" rel="noopener noreferrer">${esc(l.label)}${
            ICON.external
          }</a>`
      )
      .join("")}</div>`;
  }

  function projectEyebrow(p) {
    const bits = [p.eyebrow, p.year, p.role];
    if (p.meta && p.meta.language) bits.push(p.meta.language);
    if (p.meta && p.meta.updated) bits.push("Updated " + p.meta.updated);
    return `<p class="project-eyebrow">${bits
      .filter(Boolean)
      .map((b) => `<span>${esc(b)}</span>`)
      .join('<span class="sep" aria-hidden="true">/</span>')}</p>`;
  }

  function renderProjects() {
    const pr = portfolioData.projects;
    const cards = pr.items
      .map((p) => {
        const caseBody =
          (p.problem
            ? `<div class="detail-block"><h4>Problem</h4><p class="project-summary">${esc(
                p.problem
              )}</p></div>`
            : "") +
          detailBlock("Approach", p.approach) +
          detailBlock("Result", p.result);

        const aside =
          flowDiagram(p.flow, "Pipeline for " + p.title) + metricBand(p.metrics);

        return `
        <article class="project card card--interactive reveal${
          p.featured ? " project--featured" : ""
        }">
          <div class="project-head">
            ${projectEyebrow(p)}
            <h3 class="project-title">${esc(p.title)}</h3>
            <p class="project-summary">${esc(p.summary)}</p>
          </div>
          ${aside ? `<div class="project-aside">${aside}</div>` : ""}
          ${tags(p.stack)}
          ${disclosure(pr.disclosureLabel, caseBody)}
          ${projectLinks(p)}
        </article>`;
      })
      .join("");

    byId("projects-root").innerHTML =
      sectionHead(pr.sectionLabel, "projects-heading", pr.title, pr.intro) +
      `<div class="projects-grid">${cards}</div>`;
  }

  function renderSkills() {
    const s = portfolioData.skills;
    const groups = s.groups
      .map(
        (g, i) => `
      <div class="skill-group reveal" data-delay="${Math.min(i % 3, 3)}">
        <div class="skill-group-head">
          <span class="skill-icon" aria-hidden="true">${
            ICON[g.icon] || ICON["check-circle"]
          }</span>
          <h3 class="skill-group-title">${esc(g.title)}</h3>
        </div>
        <p class="skill-evidence">${esc(g.evidence)}</p>
        <ul class="skill-items">${g.items
          .map((it) => `<li class="tag">${esc(it)}</li>`)
          .join("")}</ul>
      </div>`
      )
      .join("");

    byId("skills-root").innerHTML =
      sectionHead(s.sectionLabel, "skills-heading", s.title, s.intro) +
      `<div class="skills-grid">${groups}</div>`;
  }

  /* Issuer monogram, derived from the name so it can never mismatch.
     Short acronyms (≤4 chars) render whole; camel-case names use their
     capitals; anything else falls back to the first two letters. */
  function monogram(issuer) {
    const s = String(issuer || "").trim();
    if (!s) return { text: "•", acronym: false };
    if (s.length <= 4) return { text: s.toUpperCase(), acronym: true };
    const caps = s.match(/[A-Z0-9]/g);
    if (caps && caps.length >= 2)
      return { text: (caps[0] + caps[1]).toUpperCase(), acronym: false };
    return { text: s.slice(0, 2).toUpperCase(), acronym: false };
  }

  function renderAbout() {
    const a = portfolioData.about;

    const facts = a.facts
      .map(
        (f) =>
          `<div class="fact"><span class="fact-value"${countAttrs(f)}>${esc(
            f.value
          )}</span><span class="fact-label">${esc(f.label)}</span></div>`
      )
      .join("");

    const creds = a.credentials
      .map((c) => {
        const m = monogram(c.issuer);
        const inner = `
          <span class="cred-mark${
            m.acronym ? " cred-mark--acronym" : ""
          }" aria-hidden="true">${esc(m.text)}</span>
          <span class="cred-text">
            <span class="cred-issuer">${esc(c.issuer)}</span>
            <span class="cred-name">${esc(c.name)}</span>
          </span>
          <span class="cred-year">${esc(c.year)}</span>`;
        if (c.credentialUrl) {
          return `<li><a class="cred-row" href="${esc(
            c.credentialUrl
          )}" target="_blank" rel="noopener noreferrer">${inner}<span class="cred-arrow">${
            ICON.external
          }</span></a></li>`;
        }
        return `<li><div class="cred-row">${inner}<span></span></div></li>`;
      })
      .join("");

    byId("about-root").innerHTML =
      sectionHead(a.sectionLabel, "about-heading", a.title) +
      `
      <div class="about-grid">
        <div class="about-bio reveal">
          ${a.paragraphs.map((p) => `<p>${p}</p>`).join("")}
          <span class="about-badge"><span class="status-dot" aria-hidden="true"></span>${esc(
            a.badge
          )}</span>
        </div>
        <div class="reveal" data-delay="1">
          <div class="facts-grid">${facts}</div>
        </div>
      </div>

      <div class="credentials" id="certifications">
        <div class="credentials-head reveal">
          <p class="section-label">${esc(a.credentialsLabel)}</p>
        </div>
        <ul class="cred-list reveal" data-delay="1">${creds}</ul>
      </div>`;
  }

  function renderContact() {
    const c = portfolioData.contact;
    const links = c.links
      .map(
        (l) =>
          `<a class="contact-link" href="${esc(l.href)}"${
            l.external ? ' target="_blank" rel="noopener noreferrer"' : ""
          }>${ICON[l.icon] || ""}${esc(l.label)}</a>`
      )
      .join("");

    const copy = c.email
      ? `<button type="button" class="contact-link" id="copy-email" data-email="${esc(
          c.email
        )}">${ICON.copy}<span class="copy-label">Copy email</span></button>`
      : "";

    byId("contact-root").innerHTML = `
      <div class="contact-inner">
        <p class="section-label reveal">${esc(c.sectionLabel)}</p>
        <h2 class="contact-headline reveal" data-delay="1" id="contact-heading">${esc(
          c.headline
        )}</h2>
        <p class="contact-sub reveal" data-delay="2">${esc(c.sub)}</p>
        <div class="contact-links reveal" data-delay="3">${links}${copy}</div>
      </div>`;
  }

  function renderFooter() {
    const { meta, contact } = portfolioData;
    const find = (icon) => contact.links.find((l) => l.icon === icon) || { href: "#" };
    byId("footer-root").innerHTML = `
      <p class="footer-copy">© ${meta.footer.year} Muhamad Insan Taufik · ${esc(
      meta.footer.location
    )}</p>
      <nav class="footer-links" aria-label="Elsewhere">
        <a href="${esc(
          find("linkedin").href
        )}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="${esc(
          find("github").href
        )}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="${esc(find("mail").href)}">Email</a>
        <a href="#hero">Back to top</a>
      </nav>`;
  }

  /* ── Scroll reveal ───────────────────────────────────────── */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (reduced() || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // The hero is above the fold by definition, so it runs its entrance on
    // load. Waiting for an intersection would leave the CTAs invisible on a
    // short viewport, where they sit just below the observer's margin.
    const hero = document.querySelectorAll("#hero .reveal");
    const show = () => hero.forEach((el) => el.classList.add("is-visible"));
    requestAnimationFrame(() => requestAnimationFrame(show));
    // Backstop for background tabs, where rAF is throttled.
    setTimeout(show, 300);

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => {
      if (!el.closest("#hero")) io.observe(el);
    });
  }

  /* ── Counters ────────────────────────────────────────────── */
  function initCounters() {
    const els = document.querySelectorAll("[data-count]");
    if (!els.length) return;

    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      const final = el.getAttribute("data-final") || String(target);
      if (isNaN(target) || reduced()) {
        el.textContent = final;
        return;
      }
      const decimals = (String(target).split(".")[1] || "").length;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / 900);
        const v = target * (1 - Math.pow(1 - t, 3));
        el.textContent = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = final;
      };
      requestAnimationFrame(tick);
    };

    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach((el) => {
        el.textContent = el.getAttribute("data-final") || el.textContent;
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          run(e.target);
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.6 }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ── Header state + scroll spy ───────────────────────────── */
  function initHeader() {
    const header = byId("site-header");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /**
   * Active-section highlight. An IntersectionObserver watching a thin
   * band below the header avoids reading offsetTop on every scroll tick.
   */
  function initScrollSpy() {
    const anchors = document.querySelectorAll("a[data-section]");
    if (!anchors.length || !("IntersectionObserver" in window)) return;

    const sections = Array.from(document.querySelectorAll("main > section[id]"));
    const watched = sections.filter((s) =>
      Array.from(anchors).some((a) => a.dataset.section === s.id)
    );
    if (!watched.length) return;

    const visible = new Set();
    let current = "";

    const setActive = (id) => {
      if (id === current) return;
      current = id;
      anchors.forEach((a) => {
        if (a.dataset.section === id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        // The last section in document order touching the band is the
        // one the reader has most recently arrived at.
        for (let i = watched.length - 1; i >= 0; i--) {
          if (visible.has(watched[i].id)) {
            setActive(watched[i].id);
            return;
          }
        }
        // Above the first watched section (the hero) nothing is current.
        setActive("");
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: 0 }
    );
    watched.forEach((s) => io.observe(s));
  }

  /* ── Scroll progress fallback (no CSS scroll timelines) ──── */
  function initScrollProgressFallback() {
    const bar = byId("scroll-progress");
    if (!bar || reduced()) return;
    if (window.CSS && CSS.supports && CSS.supports("animation-timeline", "scroll()")) return;

    const root = document.documentElement;
    let ticking = false;
    const update = () => {
      const max = root.scrollHeight - root.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? root.scrollTop / max : 0})`;
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
  }

  /* ── Mobile navigation ───────────────────────────────────── */
  const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let closeMobile = () => {};

  function initMobileNav() {
    const btn = byId("hamburger");
    const menu = byId("mobile-menu");
    const backdrop = byId("mobile-backdrop");
    if (!btn || !menu) return;

    const isOpen = () => btn.getAttribute("aria-expanded") === "true";

    const open = () => {
      menu.hidden = false;
      backdrop.hidden = false;
      // Next frame, so the transition runs from the painted hidden state.
      requestAnimationFrame(() => {
        menu.classList.add("is-open");
        backdrop.classList.add("is-open");
      });
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
      document.body.classList.add("menu-open");
      const first = menu.querySelector(FOCUSABLE);
      if (first) first.focus();
    };

    const close = (returnFocus) => {
      if (!isOpen()) return;
      menu.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("menu-open");
      window.setTimeout(() => {
        if (!isOpen()) {
          menu.hidden = true;
          backdrop.hidden = true;
        }
      }, reduced() ? 0 : 220);
      if (returnFocus) btn.focus();
    };
    closeMobile = close;

    btn.addEventListener("click", () => (isOpen() ? close(true) : open()));
    backdrop.addEventListener("click", () => close(true));
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) close(false);
    });

    document.addEventListener("keydown", (e) => {
      if (!isOpen()) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== "Tab") return;
      // Keep focus inside the menu and its trigger while it is open.
      const items = [btn].concat(Array.from(menu.querySelectorAll(FOCUSABLE)));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) close(false);
    });
  }

  /* ── Anchor navigation ───────────────────────────────────── */
  function initAnchors() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      closeMobile(false);
      target.scrollIntoView({
        behavior: reduced() ? "auto" : "smooth",
        block: "start",
      });
      // Move focus without a second scroll jump, so the keyboard lands
      // where the page just went.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  /* ── Copy email ──────────────────────────────────────────── */
  function initCopyEmail() {
    const btn = byId("copy-email");
    if (!btn) return;
    const label = btn.querySelector(".copy-label");
    const original = label ? label.textContent : "";
    let timer;

    btn.addEventListener("click", async () => {
      const email = btn.getAttribute("data-email");
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.cssText = "position:fixed;opacity:0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch (__) {}
        ta.remove();
      }
      btn.classList.add("is-copied");
      if (label) label.textContent = "Copied";
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        btn.classList.remove("is-copied");
        if (label) label.textContent = original;
      }, 1800);
    });
  }

  /* ── Boot ────────────────────────────────────────────────── */
  /* Content first. This script is the last thing in <body>, so every root
     element already exists — rendering here rather than on DOMContentLoaded
     means the page is complete before the browser's first paint, which is
     what keeps cumulative layout shift at zero. */
  function render() {
    document.title = portfolioData.meta.title;

    renderNav();
    renderHero();
    renderEvidence();
    renderExperience();
    renderProjects();
    renderSkills();
    renderAbout();
    renderContact();
    renderFooter();

    // Content is in place; give the sections their spacing back.
    document.getElementById("main").classList.remove("is-booting");
  }

  /* Behaviour second: observers and listeners, once the DOM is settled. */
  function enhance() {
    initMobileNav();
    initAnchors();
    initHeader();
    initScrollSpy();
    initScrollProgressFallback();
    initReveal();
    initCounters();
    initCopyEmail();

    // If the motion preference flips mid-session, don't strand hidden content.
    if (mqReduced.addEventListener) {
      mqReduced.addEventListener("change", () => {
        if (reduced()) {
          document
            .querySelectorAll(".reveal")
            .forEach((el) => el.classList.add("is-visible"));
        }
      });
    }
  }

  render();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhance);
  } else {
    enhance();
  }
})();
