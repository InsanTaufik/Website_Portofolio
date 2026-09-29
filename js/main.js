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
  const byId = (id) => document.getElementById(id);

  /* ── Icons (stroke, 1.5–2px, single family) ──────────────── */
  const ICON = {
    "arrow-down":
      '<svg viewBox="0 0 24 24" stroke-width="2" data-nudge="down" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
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

  function downloadAttrs(item) {
    if (!item.download) return "";
    const name = portfolioData.cv && portfolioData.cv.downloadName;
    return ` download${name ? '="' + esc(name) + '"' : ""}`;
  }

  /** A tool list set in mono, separated by middots. Plain text, not pills. */
  function toolLine(list, label) {
    if (!Array.isArray(list) || !list.length) return "";
    return `<ul class="tool-line"${label ? ` aria-label="${esc(label)}"` : ""}>${list
      .map((t) => `<li>${esc(t)}</li>`)
      .join("")}</ul>`;
  }

  function checklist(list) {
    if (!Array.isArray(list) || !list.length) return "";
    return `<ul class="checklist">${list.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  }

  /** Source → step → target chain. Arrows are CSS-only and decorative. */
  function flowDiagram(nodes, label) {
    if (!Array.isArray(nodes) || nodes.length < 2) return "";
    return `<ol class="flow" aria-label="${esc(label)}">${nodes
      .map((n) => `<li><span class="flow-node">${esc(n)}</span></li>`)
      .join("")}</ol>`;
  }

  function sectionHead(titleId, title, intro) {
    return `
      <header class="section-head">
        <h2 class="section-title reveal" id="${titleId}">${esc(title)}</h2>
        ${intro ? `<p class="section-intro reveal" data-delay="1">${esc(intro)}</p>` : ""}
      </header>`;
  }

  function detailBlock(heading, items) {
    if (!Array.isArray(items) || !items.length) return "";
    return `<div class="detail-block"><h4>${esc(heading)}</h4>${checklist(items)}</div>`;
  }

  function disclosure(summaryLabel, bodyHtml) {
    if (!bodyHtml) return "";
    return `
      <details class="disclosure">
        <summary><span class="disclosure-label">${esc(summaryLabel)}</span>${
      ICON["chevron-down"]
    }</summary>
        <div class="disclosure-body"><div class="disclosure-body-inner">${bodyHtml}</div></div>
      </details>`;
  }

  /* ── Renderers ───────────────────────────────────────────── */
  function renderNav() {
    const { meta, nav, cv } = portfolioData;
    const items = nav.links
      .map(
        (l) =>
          `<li><a class="nav-link" href="${esc(l.href)}" data-section="${esc(
            l.href.slice(1)
          )}">${esc(l.label)}</a></li>`
      )
      .join("");

    byId("nav-root").innerHTML = `
      <a href="#hero" class="brand" aria-label="Muhamad Insan Taufik, back to top">${esc(
        meta.navLogo
      )}<span aria-hidden="true">.</span></a>
      <nav class="nav-primary" aria-label="Primary"><ul class="nav-list">${items}</ul></nav>
      <a class="nav-cta" href="${esc(cv.href)}"${downloadAttrs({ download: true })}>${
      ICON.download
    }CV</a>
      <button class="hamburger" id="hamburger" type="button"
              aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>`;

    const mobileItems = nav.links
      .map(
        (l) =>
          `<a href="${esc(l.href)}" data-section="${esc(l.href.slice(1))}">${esc(l.label)}</a>`
      )
      .join("");
    byId("mobile-menu").innerHTML =
      mobileItems +
      `<a href="${esc(cv.href)}"${downloadAttrs({ download: true })}>Download CV</a>`;
  }

  function renderHero() {
    const h = portfolioData.hero;
    const c = portfolioData.contact;

    const ctas = h.ctas
      .map(
        (b) =>
          `<a class="btn btn--${b.variant === "primary" ? "primary" : "outline"}"
              href="${esc(b.href)}"${downloadAttrs(b)}>${esc(b.label)}${ICON[b.icon] || ""}</a>`
      )
      .join("");

    // Direct routes for a recruiter who already knows they want to talk.
    const reach = c.links
      .map(
        (l) =>
          `<a class="hero-reach-link" href="${esc(l.href)}"${
            l.external ? ' target="_blank" rel="noopener noreferrer"' : ""
          }>${l.icon === "mail" ? "Email" : esc(l.label)}</a>`
      )
      .join('<span aria-hidden="true">·</span>');

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
        <p class="hero-tagline reveal" data-delay="1">${esc(h.tagline)}</p>
        <p class="hero-summary reveal" data-delay="2">${esc(h.summary)}</p>
        <div class="hero-ctas reveal" data-delay="3">${ctas}</div>
        <p class="hero-reach reveal" data-delay="3">${reach}</p>
      </div>

      <aside class="layer-stack reveal" data-delay="2" aria-labelledby="layers-caption">
        <div class="layer-stack-head">
          <span class="mono-label" id="layers-caption">${esc(h.layersCaption)}</span>
          <span class="mono-label" aria-hidden="true">${h.layers.length} layers</span>
        </div>
        <ol class="layer-list">${layers}</ol>
      </aside>`;
  }

  function renderEvidence() {
    const items = portfolioData.hero.evidence;
    byId("evidence-root").innerHTML = `
      <ul class="evidence-strip reveal">
        ${items
          .map(
            (e) =>
              `<li class="evidence-item"><span class="evidence-value">${esc(
                e.value
              )}</span><span class="evidence-label">${esc(e.label)}</span></li>`
          )
          .join("")}
      </ul>`;
  }

  function renderWorkstreams(list) {
    if (!Array.isArray(list) || !list.length) return "";
    return `<div class="workstreams">${list
      .map(
        (w) => `
        <section class="workstream">
          <h4 class="workstream-title">${esc(w.title)}</h4>
          <p class="workstream-scope">${esc(w.scope)}</p>
          ${checklist(w.points)}
          ${toolLine(w.tools, "Tools")}
        </section>`
      )
      .join("")}</div>`;
  }

  function renderCaseStudy(cs) {
    if (!cs) return "";
    const body =
      flowDiagram(cs.flow, "Validation sequence") +
      (cs.challenge
        ? `<div class="detail-block"><h4>Challenge</h4><p>${esc(cs.challenge)}</p></div>`
        : "") +
      detailBlock("Approach", cs.approach) +
      detailBlock("Outcome", cs.outcome);
    return disclosure(cs.label, body);
  }

  function renderExperience() {
    const exp = portfolioData.experience;
    const roles = exp.items
      .map(
        (job) => `
        <article class="role${job.current ? " role--current" : ""} reveal">
          <div class="role-meta">
            <p class="role-period">${
              job.current ? '<span class="status-dot" aria-hidden="true"></span>' : ""
            }${esc(job.period)}</p>
            <p class="role-company">${esc(job.company)}</p>
            ${job.via ? `<p class="role-via">${esc(job.via)}</p>` : ""}
            <p class="role-location">${esc(job.location)}</p>
          </div>
          <div class="role-body">
            <h3 class="role-title">${esc(job.role)}${
              job.current ? '<span class="visually-hidden"> (current role)</span>' : ""
            }</h3>
            ${job.context ? `<p class="role-context">${esc(job.context)}</p>` : ""}
            ${checklist(job.points)}
            ${renderWorkstreams(job.workstreams)}
            ${renderCaseStudy(job.caseStudy)}
          </div>
        </article>`
      )
      .join("");

    byId("experience-root").innerHTML =
      sectionHead("experience-heading", exp.title, exp.intro) +
      `<div class="timeline">${roles}</div>`;
  }

  function renderProjects() {
    const pr = portfolioData.projects;

    const featured = pr.featured
      .map((p) => {
        const facts = [
          ["What it is", `<p>${esc(p.summary)}</p>`],
          p.why ? ["Why I built it", `<p>${esc(p.why)}</p>`] : null,
          ["What I built", checklist(p.built)],
          ["What it shows", `<p>${esc(p.proves)}</p>`],
        ].filter(Boolean);

        const link = p.repo
          ? `<a class="text-link" href="${esc(
              p.repo
            )}" target="_blank" rel="noopener noreferrer">View repository${ICON.external}</a>`
          : `<p class="project-note">${esc(p.note || "Code not public.")}</p>`;

        return `
        <article class="project card reveal">
          <p class="project-eyebrow">${[p.kind, p.year]
            .filter(Boolean)
            .map(esc)
            .join('<span class="sep" aria-hidden="true">/</span>')}</p>
          <h3 class="project-title">${esc(p.title)}</h3>
          ${toolLine(p.stack, "Tech stack")}
          ${flowDiagram(p.flow, "Test flow for " + p.title)}
          <dl class="project-facts">${facts
            .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`)
            .join("")}</dl>
          <div class="project-foot">${link}</div>
        </article>`;
      })
      .join("");

    const more = pr.more
      .map(
        (m) => `
        <li class="more-item">
          <div class="more-text">
            <h4 class="more-title">${esc(m.title)}</h4>
            <p class="more-summary">${esc(m.summary)}</p>
          </div>
          <span class="more-lang">${esc(m.language)}</span>
          <a class="text-link more-link" href="${esc(
            m.repo
          )}" target="_blank" rel="noopener noreferrer">Repository<span class="visually-hidden">: ${esc(
          m.title
        )}</span>${ICON.external}</a>
        </li>`
      )
      .join("");

    byId("projects-root").innerHTML =
      sectionHead("projects-heading", pr.title, pr.intro) +
      `<div class="projects-grid">${featured}</div>
      <div class="more-projects reveal">
        <h3 class="subsection-title">${esc(pr.moreTitle)}</h3>
        <ul class="more-list">${more}</ul>
      </div>`;
  }

  function renderSkills() {
    const s = portfolioData.skills;
    const itemList = (list) =>
      `<ul class="skill-items">${list.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    const rows = s.groups
      .map(
        (g) => `
      <div class="skill-row reveal">
        <div class="skill-head">
          <h3 class="skill-title">${esc(g.title)}</h3>
          <p class="skill-where">${esc(g.where)}</p>
        </div>
        <div class="skill-lists">
          <div class="skill-list">
            <p class="skill-kind">${esc(s.workLabel)}</p>
            ${itemList(g.work)}
          </div>
          ${
            Array.isArray(g.projects) && g.projects.length
              ? `<div class="skill-list skill-list--projects">
            <p class="skill-kind">${esc(s.projectLabel)}</p>
            ${itemList(g.projects)}
          </div>`
              : ""
          }
        </div>
      </div>`
      )
      .join("");

    byId("skills-root").innerHTML =
      sectionHead("skills-heading", s.title, s.intro) + `<div class="skills-table">${rows}</div>`;
  }

  /* Issuer monogram, derived from the name so it can never mismatch.
     Short acronyms (≤4 chars) render whole; camel-case names use their
     capitals; anything else falls back to the first two letters. */
  function monogram(issuer) {
    const s = String(issuer || "").trim();
    if (!s) return { text: "•", acronym: false };
    if (s.length <= 4) return { text: s.toUpperCase(), acronym: true };
    const caps = s.match(/[A-Z0-9]/g);
    if (caps && caps.length >= 2) return { text: (caps[0] + caps[1]).toUpperCase(), acronym: false };
    return { text: s.slice(0, 2).toUpperCase(), acronym: false };
  }

  function renderAbout() {
    const a = portfolioData.about;

    const creds = a.credentials
      .map((c) => {
        const m = monogram(c.issuer);
        const inner = `
          <span class="cred-mark${m.acronym ? " cred-mark--acronym" : ""}" aria-hidden="true">${esc(
          m.text
        )}</span>
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
          }<span class="visually-hidden">(view certificate)</span></span></a></li>`;
        }
        return `<li><div class="cred-row">${inner}<span></span></div></li>`;
      })
      .join("");

    const ed = a.education;
    const ta = a.teaching;

    byId("about-root").innerHTML = `
      <div class="about-grid">
        <div class="about-bio">
          <h2 class="section-title reveal" id="about-heading">${esc(a.title)}</h2>
          ${a.paragraphs.map((p) => `<p class="reveal">${p}</p>`).join("")}
        </div>

        <div class="background reveal" data-delay="1" id="certifications">
          <h3 class="subsection-title">${esc(a.backgroundTitle)}</h3>
          <dl class="background-list">
            <div>
              <dt>${esc(ed.degree)}</dt>
              <dd>${esc(ed.school)} · ${esc(ed.detail)}</dd>
              <dd class="background-period">${esc(ed.period)}</dd>
            </div>
            <div>
              <dt>${esc(ta.role)}</dt>
              <dd>${esc(ta.place)}. ${esc(ta.detail)}</dd>
              <dd class="background-period">${esc(ta.period)}</dd>
            </div>
          </dl>
          <ul class="cred-list">${creds}</ul>
          <p class="background-languages"><span class="mono-label">Languages</span> ${esc(a.languages)}</p>
        </div>
      </div>`;
  }

  function renderContact() {
    const c = portfolioData.contact;
    const cv = portfolioData.cv;
    const links = c.links
      .map(
        (l) =>
          `<a class="contact-link${l.icon === "mail" ? " contact-link--primary" : ""}" href="${esc(
            l.href
          )}"${l.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${
            ICON[l.icon] || ""
          }${esc(l.label)}</a>`
      )
      .join("");

    const copy = c.email
      ? `<button type="button" class="contact-link" id="copy-email" data-email="${esc(
          c.email
        )}">${ICON.copy}<span class="copy-label">Copy email</span></button>`
      : "";

    const cvLink = `<a class="contact-link" href="${esc(cv.href)}"${downloadAttrs({
      download: true,
    })}>${ICON.download}Download CV</a>`;

    byId("contact-root").innerHTML = `
      <div class="contact-inner">
        <p class="section-label reveal">${esc(c.sectionLabel)}</p>
        <h2 class="contact-headline reveal" data-delay="1" id="contact-heading">${esc(
          c.headline
        )}</h2>
        <p class="contact-sub reveal" data-delay="2">${esc(c.sub)}</p>
        <div class="contact-links reveal" data-delay="3">${links}${copy}${cvLink}</div>
        <p class="visually-hidden" id="copy-status" aria-live="polite"></p>
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
        <a href="${esc(find("linkedin").href)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="${esc(find("github").href)}" target="_blank" rel="noopener noreferrer">GitHub</a>
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
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => {
      if (!el.closest("#hero")) io.observe(el);
    });
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

      // Reduced motion: jump straight there.
      if (reduced()) {
        window.scrollTo({ top: destination, behavior: "instant" });
      } else {
        const started = performance.now();
        restoreScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        const tick = (now) => {
          const t = Math.min(1, (now - started) / duration);
          const eased = (1 - Math.cos(Math.PI * t)) / 2;
          window.scrollTo({ top: start + (destination - start) * eased, behavior: "instant" });
          if (t < 1) frame = window.requestAnimationFrame(tick);
          else cancelScroll();
        };
        if (Math.abs(destination - start) > 1) frame = window.requestAnimationFrame(tick);
        else cancelScroll();
      }

      // Keep keyboard focus at the destination without a second scroll jump.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  /* ── Disclosures ─────────────────────────────────────────────
     Keep <details> native, then animate its body where Web Animations is
     available. The desired state is separate from details.open while closing. */
  const disclosureTargets = new WeakMap();
  const disclosureAnimations = new WeakMap();

  function setDisclosureOpen(details, open) {
    const body = details.querySelector(".disclosure-body");
    const running = disclosureAnimations.get(details);
    if (running && disclosureTargets.get(details) === open) return;
    if (!running && details.open === open) return;

    const fromHeight = running
      ? body.getBoundingClientRect().height
      : open ? 0 : body.getBoundingClientRect().height;
    const fromOpacity = running ? parseFloat(getComputedStyle(body).opacity) : open ? 0 : 1;
    if (running) running.cancel();
    disclosureTargets.set(details, open);
    if (open) details.open = true;

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
    animation.finished
      .then(() => {
        if (disclosureAnimations.get(details) !== animation) return;
        disclosureAnimations.delete(details);
        details.open = open;
        animation.cancel();
        body.style.removeProperty("overflow");
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
        const current = disclosureTargets.has(details) ? disclosureTargets.get(details) : details.open;
        setDisclosureOpen(details, !current);
      });
    });
  }

  /* ── Copy email ──────────────────────────────────────────── */
  function initCopyEmail() {
    const btn = byId("copy-email");
    if (!btn) return;
    const label = btn.querySelector(".copy-label");
    const status = byId("copy-status");
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
      if (status) status.textContent = "Email address copied to clipboard";
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        btn.classList.remove("is-copied");
        if (label) label.textContent = original;
        if (status) status.textContent = "";
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
    byId("main").classList.remove("is-booting");
  }

  /* Behaviour second: observers and listeners, once the DOM is settled. */
  function enhance() {
    initMobileNav();
    initAnchors();
    initHeader();
    initScrollSpy();
    initScrollProgressFallback();
    initReveal();
    initDisclosures();
    initCopyEmail();

    // If the motion preference flips mid-session, don't strand hidden content.
    if (mqReduced.addEventListener) {
      mqReduced.addEventListener("change", () => {
        if (reduced()) {
          document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
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
