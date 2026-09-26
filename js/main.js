/**
 * Renders portfolioData into the shell in index.html, then wires the
 * interaction layer.
 *
 * Motion policy: entrance reveals run once via IntersectionObserver,
 * the scroll-progress bar is a native CSS scroll timeline where the
 * browser has one. Interactive transitions run for every motion setting;
 * decorative reveals stay still when reduced motion is requested.
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
    "arrow-left":
      '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    pause:
      '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><line x1="9" y1="5" x2="9" y2="19"/><line x1="15" y1="5" x2="15" y2="19"/></svg>',
    play:
      '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><polygon points="7 4 19 12 7 20 7 4"/></svg>',
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

  function tags(list, label) {
    if (!Array.isArray(list) || !list.length) return "";
    return `<ul class="tag-row"${label ? ` aria-label="${esc(label)}"` : ""}>${list
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
    const openLabel = summaryLabel.replace(/^View\b/, "Hide");
    return `
      <details class="disclosure">
        <summary data-closed-label="${esc(summaryLabel)}" data-open-label="${esc(
      openLabel
    )}"><span class="disclosure-label">${esc(
      summaryLabel
    )}</span>${ICON["chevron-down"]}</summary>
        <div class="disclosure-body"><div class="disclosure-body-inner">${bodyHtml}</div></div>
      </details>`;
  }

  function proofLine(value) {
    return value ? `<p class="proof-line">${esc(value)}</p>` : "";
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
            ${job.via ? `<p class="role-via">${esc(job.via)}</p>` : ""}
            <p class="role-location">${esc(job.location)}</p>
          </div>
          <div class="role-body">
            <h3 class="role-title">${esc(job.role)}</h3>
            <p class="role-context">${esc(job.context)}</p>
            ${proofLine(job.proof)}
            ${disclosure(exp.disclosureLabel, body)}
            ${metricBand(job.metrics)}
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

  /** A slide's headline figures on one line. The full band stays on experience roles. */
  function statLine(list) {
    if (!Array.isArray(list) || !list.length) return "";
    return `<ul class="project-stats">${list
      .map((m) => `<li><strong>${esc(m.value)}</strong>${esc(m.label)}</li>`)
      .join("")}</ul>`;
  }

  /** Optional. Width/height reserve the box so a lazy image never shifts the slide. */
  function projectMedia(p) {
    const im = p.image;
    if (!im || !im.src) return "";
    return `<figure class="project-media"><img src="${esc(im.src)}" alt="${esc(
      im.alt || ""
    )}" width="${esc(im.width)}" height="${esc(
      im.height
    )}" loading="lazy" decoding="async" draggable="false" /></figure>`;
  }

  /* The carousel is a ring of slides. Slide i starts `rel` steps from the
     active slide, wrapped into [-half, n-1-half]; initCarousel() uses the same
     maths, so the first paint already matches what the script will produce. */
  const ringHalf = (n) => Math.floor(n / 2);
  const ringWrap = (d, n) => {
    d = ((d % n) + n) % n;
    return d > n - 1 - ringHalf(n) ? d - n : d;
  };
  const pad2 = (n) => String(n).padStart(2, "0");

  function renderProjects() {
    const pr = portfolioData.projects;
    const car = pr.carousel || {};
    const total = pr.items.length;
    const showThree = total > 2 && window.matchMedia("(min-width: 900px)").matches;

    const slides = pr.items
      .map((p, i) => {
        // Every slide has the same anatomy — name, description, stack, link — so
        // the shared row height stays close to each slide's own. Anything longer
        // (the pipeline diagram, problem, approach, result) sits behind the case study.
        const caseBody =
          flowDiagram(p.flow, "Pipeline for " + p.title) +
          (p.problem
            ? `<div class="detail-block"><h4>Problem</h4><p class="project-summary">${esc(
                p.problem
              )}</p></div>`
            : "") +
          detailBlock("Approach", p.approach) +
          detailBlock("Result", p.result);

        // The current project and its neighbours form the desktop preview.
        return `
        <div class="carousel-slide${i === 0 ? " is-active" : ""}${
          i === 0 || (showThree && (i === 1 || i === total - 1)) ? " is-visible" : ""
        }"
             style="--rel:${ringWrap(i, total)}"
             role="group" aria-roledescription="slide"
             aria-label="${i + 1} of ${total}: ${esc(p.title)}"${
          i === 0 || (showThree && (i === 1 || i === total - 1)) ? "" : " inert"
        }>
          <article class="project card${p.featured ? " project--featured" : ""}">
            <div class="project-preview" aria-hidden="true">${esc(p.title)}</div>
            <div class="project-content"${i === 0 ? "" : " inert"}>
              <div class="project-head">
                ${projectEyebrow(p)}
                <h3 class="project-title">${esc(p.title)}</h3>
                <p class="project-summary">${esc(p.summary)}</p>
              </div>
              ${projectMedia(p)}
              ${caseBody ? proofLine(p.proof) : ""}
              ${disclosure(pr.disclosureLabel, caseBody)}
              ${statLine(p.metrics)}
              ${tags(p.stack, "Tech stack")}
              ${projectLinks(p)}
            </div>
          </article>
        </div>`;
      })
      .join("");

    const dots = pr.items
      .map(
        (p, i) =>
          `<li><button type="button" class="carousel-dot" data-index="${i}"
                aria-label="Show project ${i + 1} of ${total}: ${esc(p.title)}"${
            i === 0 ? ' aria-current="true"' : ""
          }></button></li>`
      )
      .join("");

    byId("projects-root").innerHTML =
      sectionHead(pr.sectionLabel, "projects-heading", pr.title, pr.intro) +
      `
      <div class="carousel reveal${total > 2 ? " is-multi" : ""}" id="projects-carousel" role="region"
           aria-roledescription="carousel" aria-label="${esc(
             car.label || "Project highlights"
           )}">
        <div class="carousel-bar">
          <p class="mono-label carousel-count" aria-hidden="true"><span class="carousel-count-now">${pad2(
            1
          )}</span> / ${pad2(total)}</p>
          <button type="button" class="carousel-btn carousel-pause" hidden
                  aria-label="Pause automatic slide show">${ICON.pause}</button>
        </div>
        <div class="carousel-viewport" tabindex="0" role="group"
             aria-label="Project slides" aria-describedby="projects-carousel-hint">
          <div class="carousel-track" id="projects-track">${slides}</div>
          <div class="carousel-controls">
            <button type="button" class="carousel-btn carousel-prev"
                    aria-label="Previous project" aria-controls="projects-track">${
                      ICON["arrow-left"]
                    }</button>
            <button type="button" class="carousel-btn carousel-next"
                    aria-label="Next project" aria-controls="projects-track">${
                      ICON["arrow-right"]
                    }</button>
          </div>
        </div>
        <ul class="carousel-dots" aria-label="Choose a project">${dots}</ul>
        <p class="visually-hidden" id="projects-carousel-hint">Use the left and right arrow keys to change project.</p>
        <div class="visually-hidden" id="projects-carousel-status" aria-live="polite" aria-atomic="true"></div>
      </div>`;
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
        const t = Math.min(1, (now - start) / 1200);
        const v = target * (0.5 - Math.cos(Math.PI * t) / 2);
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
    const duration = 560;
    const scrollingKeys = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
    let frame = 0;
    let restoreScrollBehavior = null;

    function cancelScroll() {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      if (restoreScrollBehavior !== null) {
        document.documentElement.style.scrollBehavior = restoreScrollBehavior;
        restoreScrollBehavior = null;
      }
    }

    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    window.addEventListener("pointerdown", cancelScroll, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (scrollingKeys.has(e.key)) cancelScroll();
    });

    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!target) return;

      e.preventDefault();
      closeMobile(false);
      cancelScroll();
      const start = window.scrollY;
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const destination = Math.max(0, Math.min(max, start + target.getBoundingClientRect().top - offset));
      const started = performance.now();
      restoreScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      function tick(now) {
        const t = Math.min(1, (now - started) / duration);
        const eased = (1 - Math.cos(Math.PI * t)) / 2;
        window.scrollTo({ top: start + (destination - start) * eased, behavior: "instant" });
        if (t < 1) frame = window.requestAnimationFrame(tick);
        else cancelScroll();
      }
      if (Math.abs(destination - start) > 1) frame = window.requestAnimationFrame(tick);
      else cancelScroll();

      // Keep keyboard focus at the destination without a second scroll jump.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  /* Keep <details> native, then animate its body where Web Animations is
     available. The desired state is separate from details.open while closing. */
  const disclosureTargets = new WeakMap();
  const disclosureAnimations = new WeakMap();

  function syncDisclosureLabel(details) {
    const summary = details.querySelector("summary");
    const label = summary && summary.querySelector(".disclosure-label");
    if (!label) return;
    const open = disclosureTargets.has(details)
      ? disclosureTargets.get(details)
      : details.open;
    label.textContent = summary.dataset[open ? "openLabel" : "closedLabel"];
  }

  function setDisclosureOpen(details, open) {
    const body = details.querySelector(".disclosure-body");
    const running = disclosureAnimations.get(details);
    if (running && disclosureTargets.get(details) === open) {
      return running.finished.catch(() => {});
    }
    if (!running && details.open === open) return Promise.resolve();

    const fromHeight = running
      ? body.getBoundingClientRect().height
      : open ? 0 : body.getBoundingClientRect().height;
    const fromOpacity = running
      ? parseFloat(getComputedStyle(body).opacity)
      : open ? 0 : 1;
    if (running) running.cancel();
    disclosureTargets.set(details, open);
    if (open) details.open = true;
    syncDisclosureLabel(details);

    if (!body.animate) {
      details.open = open;
      syncDisclosureLabel(details);
      return Promise.resolve();
    }

    body.style.height = fromHeight + "px";
    body.style.overflow = "hidden";
    const toHeight = open ? body.scrollHeight : 0;
    const animation = body.animate(
      [
        { height: fromHeight + "px", opacity: fromOpacity },
        { height: toHeight + "px", opacity: open ? 1 : 0 },
      ],
      { duration: 320, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", fill: "forwards" }
    );
    disclosureAnimations.set(details, animation);
    return animation.finished
      .then(() => {
        if (disclosureAnimations.get(details) !== animation) return;
        disclosureAnimations.delete(details);
        details.open = open;
        animation.cancel();
        body.style.removeProperty("height");
        body.style.removeProperty("overflow");
        syncDisclosureLabel(details);
      })
      .catch(() => {});
  }

  function initDisclosures() {
    document.querySelectorAll("details.disclosure").forEach((details) => {
      const summary = details.querySelector("summary");
      const body = details.querySelector(".disclosure-body");
      summary.addEventListener("click", (event) => {
        if (!body.animate) return; // native toggle remains the fallback
        event.preventDefault();
        const current = disclosureTargets.has(details)
          ? disclosureTargets.get(details)
          : details.open;
        setDisclosureOpen(details, !current);
      });
      details.addEventListener("toggle", () => syncDisclosureLabel(details));
    });

    if (!("IntersectionObserver" in window)) return;
    const first = [
      document.querySelector("#experience .disclosure"),
      document.querySelector("#projects .disclosure"),
    ].filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const details = entry.target;
        details.classList.add("is-hinted");
        window.setTimeout(() => details.classList.remove("is-hinted"), 800);
        observer.unobserve(details);
      });
    }, { threshold: 0.5 });
    first.forEach((details) => observer.observe(details));
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

  /* ── Projects carousel ───────────────────────────────────────
     Every slide sits in the same grid cell and is offset by one custom
     property, --rel: its distance from the active slide, in layout steps.
     CSS turns that into translateX, so nothing is ever measured to lay it out
     and the tallest slide sets one constant height (no layout shift).

     Slides live on a ring. Moving by `delta` shifts every --rel by the same
     amount; a slide that would leave one edge is re-parked offscreen on the
     other side, so last → first and first → last slide in the right direction
     instead of rewinding the whole track. */
  function initCarousel() {
    const root = byId("projects-carousel");
    if (!root) return;

    const viewport = root.querySelector(".carousel-viewport");
    const track = root.querySelector(".carousel-track");
    const slides = Array.from(root.querySelectorAll(".carousel-slide"));
    const dots = Array.from(root.querySelectorAll(".carousel-dot"));
    const prevBtn = root.querySelector(".carousel-prev");
    const nextBtn = root.querySelector(".carousel-next");
    const pauseBtn = root.querySelector(".carousel-pause");
    const countNow = root.querySelector(".carousel-count-now");
    const status = byId("projects-carousel-status");
    const cfg = portfolioData.projects.carousel || {};
    const n = slides.length;

    if (n < 2) {
      root.querySelector(".carousel-bar").hidden = true;
      root.querySelector(".carousel-dots").hidden = true;
      return;
    }

    let active = 0;
    const rel = slides.map((_, i) => ringWrap(i, n));
    const desktop = window.matchMedia("(min-width: 900px)");
    const showThree = () => root.classList.contains("is-multi") && desktop.matches;
    const isVisible = (i) =>
      i === active || (showThree() && (i === (active + 1) % n || i === (active - 1 + n) % n));

    /* ── Positioning ── */
    /** Set one slide's --rel. `animate: false` snaps just that slide, so slides
        that are mid-transition are left alone. */
    function place(i, v, animate) {
      const s = slides[i];
      if (!animate) s.style.transition = "none";
      s.style.setProperty("--rel", v);
      if (!animate) {
        void s.offsetWidth; // flush, so the snap isn't batched with the next change
        s.style.transition = "";
      }
    }

    /** Wrap any slide that drifted past the edge. It is offscreen by then. */
    function settle() {
      for (let i = 0; i < n; i++) {
        const w = ringWrap(rel[i], n);
        if (w !== rel[i]) {
          rel[i] = w;
          place(i, w, false);
        }
      }
    }

    function show() {
      slides.forEach((s, i) => {
        const on = i === active;
        s.classList.toggle("is-active", on);
        const visible = isVisible(i);
        s.classList.toggle("is-visible", visible);
        // Only cards wholly inside the viewport belong in the tab order.
        s.toggleAttribute("inert", !visible);
        s.querySelector(".project-content").toggleAttribute("inert", !on);
        s.style.setProperty("--rel", rel[i]);
      });
      dots.forEach((d, i) => {
        if (i === active) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
      countNow.textContent = pad2(active + 1);
    }

    const toMs = (t) => (t.slice(-2) === "ms" ? parseFloat(t) : parseFloat(t) * 1000);
    const slideMs = () =>
      Math.max.apply(
        null,
        getComputedStyle(slides[0])
          .transitionDuration.split(",")
          .map((t) => toMs(t.trim()))
      );

    let settleTimer = 0;
    let moving = false;
    let closingForMove = false;
    let queued = null;
    function afterMove() {
      settle();
      // A case study left open on a slide that has gone would keep the whole
      // row tall, so close it once the slide is out of sight.
      slides.forEach((s, i) => {
        const d = !isVisible(i) && s.querySelector("details[open]");
        if (d) d.open = false;
      });
      moving = false;
      if (queued) {
        const request = queued;
        queued = null;
        const delta = ringWrap(request.target - active, n);
        if (delta) move(delta, request.announce);
      }
    }

    function move(delta, announce) {
      if (!delta) return;
      const nextActive = (((active + delta) % n) + n) % n;
      if (moving || closingForMove) {
        queued = { target: nextActive, announce };
        return;
      }
      const openDetail = slides[active].querySelector("details[open]");
      if (openDetail) {
        closingForMove = true;
        setDisclosureOpen(openDetail, false).then(() => {
          closingForMove = false;
          if (disclosureTargets.get(openDetail) !== false) {
            queued = null;
            return;
          }
          const request = queued || { target: nextActive, announce };
          queued = null;
          const step = ringWrap(request.target - active, n);
          if (step) move(step, request.announce);
        });
        return;
      }
      moving = true;
      settle();
      const nextVisible = (i) =>
        i === nextActive ||
        (showThree() && (i === (nextActive + 1) % n || i === (nextActive - 1 + n) % n));
      // Move focus only if its card leaves the visible viewport.
      if (slides.some((s, i) => !nextVisible(i) && s.contains(document.activeElement))) {
        viewport.focus({ preventScroll: true });
      }

      for (let i = 0; i < n; i++) {
        const end = rel[i] - delta;
        const w = ringWrap(end, n);
        if (w !== end && !isVisible(i)) {
          // Wraps from one offscreen side to the other. Start it on the far side
          // of where it lands so the whole ring travels as one rigid track.
          place(i, w + delta, false);
          rel[i] = w;
        } else {
          rel[i] = end; // may sit past the edge; settle() wraps it once offscreen
        }
      }
      active = nextActive;
      show();

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(afterMove, slideMs() + 80);
      if (announce) status.textContent = slides[active].getAttribute("aria-label");
    }

    /* ── Autoplay ──
       Off under reduced motion. Pauses on hover, on focus, while a case study is
       open, offscreen, and in a background tab. The first manual navigation
       stops it for good; the pause button is the only way back in until then. */
    let autoTimer = 0;
    let autoStopped = false;
    let userPaused = false;
    let hovering = false;
    let focused = false;
    let caseOpen = false;
    let inView = !("IntersectionObserver" in window);

    const autoAllowed = () => !!cfg.autoplay && !reduced() && !autoStopped;
    const autoRunning = () =>
      autoAllowed() && !userPaused && !hovering && !focused && !caseOpen && inView && !document.hidden;

    function syncAuto() {
      window.clearTimeout(autoTimer);
      autoTimer = 0;
      if (!autoRunning()) return;
      autoTimer = window.setTimeout(() => {
        move(1, false);
        syncAuto();
      }, cfg.intervalMs || 8000);
    }

    function syncPause() {
      pauseBtn.hidden = !autoAllowed();
      pauseBtn.innerHTML = userPaused ? ICON.play : ICON.pause;
      pauseBtn.setAttribute(
        "aria-label",
        userPaused ? "Start automatic slide show" : "Pause automatic slide show"
      );
    }

    /** Anything the user does to change slide comes through here. */
    function manual(delta) {
      if (!delta) return;
      if (!autoStopped) {
        autoStopped = true;
        if (document.activeElement === pauseBtn) viewport.focus({ preventScroll: true });
        syncPause();
        syncAuto();
      }
      move(delta, true);
    }

    prevBtn.addEventListener("click", () => manual(-1));
    nextBtn.addEventListener("click", () => manual(1));
    slides.forEach((slide, i) => {
      slide.addEventListener("click", () => {
        if (!showThree() || swallowClick || i === active) return;
        const direction = ringWrap(i - active, n);
        if (Math.abs(direction) === 1) manual(direction);
      });
    });
    // A dot takes the shortest way round the ring.
    dots.forEach((d, i) => d.addEventListener("click", () => manual(ringWrap(i - active, n))));
    if (desktop.addEventListener) desktop.addEventListener("change", show);
    else desktop.addListener(show);
    pauseBtn.addEventListener("click", () => {
      userPaused = !userPaused;
      syncPause();
      syncAuto();
    });

    root.addEventListener("keydown", (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        manual(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        manual(-1);
      }
    });

    root.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse") return;
      hovering = true;
      syncAuto();
    });
    root.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "mouse") return;
      hovering = false;
      syncAuto();
    });
    root.addEventListener("focusin", () => {
      focused = true;
      syncAuto();
    });
    root.addEventListener("focusout", (e) => {
      focused = root.contains(e.relatedTarget);
      syncAuto();
    });
    // `toggle` doesn't bubble, so listen in the capture phase.
    root.addEventListener(
      "toggle",
      () => {
        caseOpen = !!root.querySelector("details[open]");
        syncAuto();
      },
      true
    );
    document.addEventListener("visibilitychange", syncAuto);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          inView = entries[entries.length - 1].isIntersecting;
          syncAuto();
        },
        { threshold: 0.35 }
      ).observe(root);
    }
    if (mqReduced.addEventListener) {
      mqReduced.addEventListener("change", () => {
        syncPause();
        syncAuto();
      });
    }

    /* ── Drag / swipe (pointer events) ──
       touch-action: pan-y on the viewport leaves vertical scrolling to the
       browser; horizontal moves arrive here. Drag is only claimed once the
       gesture is clearly horizontal, so a tap on a link or <summary> is a tap. */
    let drag = null;
    let swallowClick = false;

    const stepPx = () =>
      (showThree() ? slides[active].offsetWidth * 0.82 : viewport.clientWidth) +
      (parseFloat(getComputedStyle(track).columnGap) || 0);

    // Move/up are tracked on `window` for as long as a press is down, not on the
    // viewport: a fast pointer can leave the viewport before the drag has been
    // claimed (and captured), and the release must be seen wherever it happens.
    const onMove = (e) => trackMove(e);
    const onUp = (e) => endDrag(e, false);
    const onCancel = (e) => endDrag(e, true);
    function stopTracking() {
      drag = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    }

    viewport.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (moving || closingForMove) return;
      if (drag && drag.live) return; // a second finger
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, dx: 0, live: false, step: 0, samples: [] };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onCancel);
    });

    function trackMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;

      if (!drag.live) {
        // Vertical intent: let the page scroll.
        if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
          stopTracking();
          return;
        }
        if (Math.abs(dx) < 8) return;
        drag.live = true;
        drag.step = stepPx();
        settle();
        try {
          viewport.setPointerCapture(e.pointerId);
        } catch (_) {}
        track.classList.add("is-dragging");
        if (window.getSelection) window.getSelection().removeAllRanges();
      }

      // One swipe moves at most one slide.
      drag.dx = Math.max(-drag.step, Math.min(drag.step, dx));
      track.style.setProperty("--drag", drag.dx + "px");

      const now = performance.now();
      drag.samples.push([now, e.clientX]);
      while (drag.samples.length > 1 && now - drag.samples[0][0] > 100) drag.samples.shift();
    }

    function endDrag(e, cancelled) {
      if (!drag || e.pointerId !== drag.id) return;
      const d = drag;
      stopTracking();
      if (!d.live) return;

      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch (_) {}

      // The click that ends a drag is not a click on whatever was underneath.
      swallowClick = true;
      window.setTimeout(() => (swallowClick = false), 60);
      const a = d.samples[0];
      const b = d.samples[d.samples.length - 1];
      const v = a && b && b[0] > a[0] ? (b[1] - a[1]) / (b[0] - a[0]) : 0; // px per ms
      const far = Math.abs(d.dx) > Math.min(96, d.step * 0.2);
      const flick = Math.abs(v) > 0.4 && Math.abs(d.dx) > 24;
      // Commit the dragged pose with transitions restored before changing its
      // destination. The next style change now uses the same slide transition
      // as arrows, dots, and preview clicks.
      track.classList.remove("is-dragging");
      void slides[active].offsetWidth;
      if (!cancelled && (far || flick)) manual(d.dx < 0 ? 1 : -1);
      track.style.setProperty("--drag", "0px");
    }

    viewport.addEventListener(
      "click",
      (e) => {
        if (!swallowClick) return;
        e.preventDefault();
        e.stopPropagation();
      },
      true
    );
    // Stops the browser starting its own link/image drag, which would cancel ours.
    viewport.addEventListener("dragstart", (e) => e.preventDefault());

    syncPause();
    syncAuto();
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
    initDisclosures();
    initCarousel();
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
