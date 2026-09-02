(function () {
  "use strict";

  /* ── Environment guards ── */
  const mqFine = window.matchMedia("(pointer: fine)");
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const prefersFine = () => mqFine.matches;
  const prefersReduced = () => mqReduced.matches;

  const SKILL_SVG = {
    "check-circle":
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    monitor:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    code:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    users:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    layers:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  };

  const CTA_ICONS = {
    "chevron-down":
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>',
    download:
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    "arrow-right":
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  };

  const CONTACT_ICONS = {
    mail:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>',
    copy:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
  };

  const ARROW_UPRIGHT =
    '<svg viewBox="0 0 24 24" stroke-width="1.6" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';

  /** @type {IntersectionObserver | null} */
  let revealObserver = null;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function tagsHtml(tags, className) {
    return tags
      .map((t) => `<span class="${className}">${escapeHtml(t)}</span>`)
      .join("");
  }

  function normalizeChip(c) {
    return typeof c === "string" ? { name: c } : c;
  }

  function chipHtml(chip, extraClass, interactive) {
    const c = normalizeChip(chip);
    const lvl = Number(c.level);
    const hasLevel = lvl >= 1 && lvl <= 3;
    const dots = hasLevel
      ? `<span class="chip-dots" aria-hidden="true">${[1, 2, 3]
          .map(
            (i) =>
              `<span class="chip-dot${i <= lvl ? " is-on" : ""}"></span>`
          )
          .join("")}</span>`
      : "";
    const lvlAttr = hasLevel ? ` data-level="${lvl}"` : "";
    const lvlName = hasLevel
      ? ` title="${escapeHtml(c.name)} — proficiency ${lvl} of 3"`
      : "";
    const interact = interactive ? ' tabindex="0" role="button"' : "";
    return `<span class="chip${
      extraClass ? " " + extraClass : ""
    }"${lvlAttr}${lvlName}${interact}>${escapeHtml(c.name)}${dots}</span>`;
  }

  /* ── Counter attributes helper ──
     Renders the final value now; initCounters() animates from 0 on scroll-in. */
  function counterAttrs(item) {
    if (item.count === undefined || item.count === null) return "";
    return ` data-count="${item.count}" data-value="${escapeHtml(item.value)}"`;
  }

  function renderNav() {
    const { meta, nav } = portfolioData;
    const desktop = nav.links
      .map(
        (l) =>
          `<li><a href="${escapeHtml(l.href)}" data-section="${escapeHtml(
            l.href.slice(1)
          )}">${escapeHtml(l.label)}</a></li>`
      )
      .join("");
    document.getElementById("nav-root").innerHTML = `
      <a href="#hero" class="nav-logo">${escapeHtml(meta.navLogo)}<span>.</span></a>
      <ul class="nav-links">${desktop}</ul>
      <a href="${escapeHtml(nav.cta.href)}" class="nav-cta">${escapeHtml(
      nav.cta.label
    )}</a>
      <button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu-root">
        <span></span><span></span><span></span>
      </button>`;

    document.getElementById("mobile-menu-root").innerHTML = nav.mobileLinks
      .map(
        (l, i) =>
          `<a href="${escapeHtml(l.href)}" data-section="${escapeHtml(
            l.href.slice(1)
          )}" style="--mi:${i}">${escapeHtml(l.label)}</a>`
      )
      .join("");
  }

  function heroNameHtml(lines) {
    return lines
      .map((line) => {
        const inner = escapeHtml(line.text);
        return line.emphasis ? `<em>${inner}</em>` : inner;
      })
      .join("<br>");
  }

  function heroCtasHtml(ctas) {
    return ctas
      .map((c) => {
        const icon = CTA_ICONS[c.icon] || "";
        const cls = c.variant === "primary" ? "btn-primary" : "btn-outline";
        const dl = c.download
          ? ` download${
              c.downloadName ? `="${escapeHtml(c.downloadName)}"` : ""
            } rel="noopener"`
          : "";
        return `<a href="${escapeHtml(c.href)}" class="${cls} btn-magnetic"${dl}><span class="btn-label">${escapeHtml(
          c.label
        )}</span><span class="btn-icon">${icon}</span></a>`;
      })
      .join("");
  }

  function terminalHtml(t) {
    const pairs = t.pairs
      .map(
        (p) =>
          `<div><span class="t-key">${escapeHtml(
            p.key
          )}</span> <span class="t-comment">=</span> <span class="t-val">${p.value}</span></div>`
      )
      .join("");
    const skillRows = t.skills.map((s) => `<div>&nbsp; ${s},</div>`).join("");
    const statusValClass = t.statusLine.valueClass || "t-val";
    return `
      <div class="terminal-body">
        <div class="t-comment">${escapeHtml(t.comment)}</div>
        <br>
        ${pairs}
        <br>
        <div class="t-comment">${escapeHtml(t.skillsComment)}</div>
        <div><span class="t-key">skills</span> <span class="t-comment">=</span> [</div>
        ${skillRows}
        <div>]</div>
        <br>
        <div class="t-comment">${escapeHtml(t.statusComment)}</div>
        <div><span class="t-key">${escapeHtml(
          t.statusLine.key
        )}</span> <span class="t-comment">=</span> <span class="${statusValClass}">${
      t.statusLine.value
    }</span></div>
        <div><span class="t-key">run</span>(<span class="t-val">profile</span>) <span class="t-cursor"></span></div>
      </div>`;
  }

  function renderHero() {
    const h = portfolioData.hero;
    document.getElementById("hero-root").innerHTML = `
      <div class="hero-left">
        <div class="hero-eyebrow hero-anim">${escapeHtml(h.eyebrow)}</div>
        <h1 class="hero-name hero-anim">${heroNameHtml(h.nameLines)}</h1>
        <div class="hero-role hero-anim">${escapeHtml(h.role)}</div>
        <p class="hero-tagline hero-anim">
          <strong>${escapeHtml(h.tagline.lead)}</strong>${escapeHtml(
      h.tagline.rest
    )}
        </p>
        <div class="hero-ctas hero-anim">${heroCtasHtml(h.ctas)}</div>
        <div class="hero-stats hero-anim">
          ${h.stats
            .map(
              (s) =>
                `<div class="stat-item"><div class="stat-num"${counterAttrs(
                  s
                )}>${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(
                  s.label
                )}</div></div>`
            )
            .join("")}
        </div>
      </div>
      <div class="hero-visual hero-anim">
        <div class="hero-terminal" data-parallax="0.02">
          <div class="terminal-bar">
            <div class="terminal-dot"></div>
            <div class="terminal-dot"></div>
            <div class="terminal-dot"></div>
            <span class="terminal-title">${escapeHtml(h.terminal.filename)}</span>
          </div>
          ${terminalHtml(h.terminal)}
        </div>
      </div>`;
  }

  function renderStrengths() {
    const items = portfolioData.strengths;
    // Repeat enough times that the -50% marquee loop is always seamless.
    const repeats = items.length < 8 ? 4 : 2;
    let out = [];
    for (let i = 0; i < repeats; i++) out = out.concat(items);
    document.getElementById("strengths-track").innerHTML = out
      .map((s) => `<span class="strength-item">${escapeHtml(s)}</span>`)
      .join("");
  }

  function renderAbout() {
    const a = portfolioData.about;
    const paras = a.paragraphs
      .map(
        (p, i) =>
          `<p class="reveal reveal-delay-${Math.min(i + 1, 4)}">${p}</p>`
      )
      .join("");
    const stats = a.stats
      .map((s, i) => {
        const inner = s.html ? s.value : escapeHtml(s.value);
        const num = s.html
          ? `<div class="asc-num">${inner}</div>`
          : `<div class="asc-num"${counterAttrs(s)}>${inner}</div>`;
        return `<div class="about-stat-card reveal reveal-delay-${Math.min(
          i + 1,
          4
        )}">${num}<div class="asc-label">${escapeHtml(s.label)}</div></div>`;
      })
      .join("");
    document.getElementById("about-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(a.sectionLabel)}</div>
      <div class="about-grid">
        <div>
          <h2 class="section-title reveal">${a.titleLines
            .map((line) => `${escapeHtml(line)}`)
            .join("<br>")}</h2>
          <div class="about-bio">${paras}</div>
          <div class="open-badge reveal reveal-delay-2">${escapeHtml(a.badge)}</div>
        </div>
        <div>
          <div class="about-stats-grid">${stats}</div>
        </div>
      </div>`;
  }

  function metricsHtml(metrics) {
    if (!Array.isArray(metrics) || !metrics.length) return "";
    return `<div class="tl-metrics">${metrics
      .map(
        (m) =>
          `<div class="tl-metric"><span class="tl-metric-val">${escapeHtml(
            m.value
          )}</span><span class="tl-metric-label">${escapeHtml(
            m.label
          )}</span></div>`
      )
      .join("")}</div>`;
  }

  function renderExperience() {
    const exp = portfolioData.experience;
    const items = exp.items
      .map(
        (job) => `
      <div class="tl-item reveal">
        <div class="tl-meta">
          <div class="tl-date">${escapeHtml(job.period)}</div>
          <div class="tl-company">${escapeHtml(job.company)}</div>
          <div class="tl-location">${escapeHtml(job.location)}</div>
        </div>
        <div class="tl-line"><div class="tl-dot"></div></div>
        <div class="tl-body">
          <div class="tl-role">${escapeHtml(job.role)}</div>
          <p class="tl-desc">${escapeHtml(job.description)}</p>
          ${metricsHtml(job.metrics)}
          <ul class="tl-bullets">
            ${job.highlights.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
          </ul>
          <div class="tl-tags">${tagsHtml(job.tags, "tl-tag")}</div>
        </div>
      </div>`
      )
      .join("");
    document.getElementById("experience-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(exp.sectionLabel)}</div>
      <h2 class="section-title reveal">${exp.titleLines
        .map((l) => escapeHtml(l))
        .join("<br>")}</h2>
      <div class="timeline">${items}</div>`;
  }

  function renderSkills() {
    const s = portfolioData.skills;

    // Featured strip: match names against category chips to inherit their level.
    let featuredHtml = "";
    if (Array.isArray(s.featured) && s.featured.length) {
      const lookup = {};
      s.categories.forEach((cat) =>
        cat.chips.forEach((c) => {
          const nc = normalizeChip(c);
          lookup[nc.name] = nc;
        })
      );
      featuredHtml = `<div class="skills-featured reveal">${s.featured
        .map((name) => chipHtml(lookup[name] || { name }, "chip-featured", false))
        .join("")}</div>`;
    }

    let legendHtml = "";
    if (s.levelLegend) {
      legendHtml = `<div class="skills-legend reveal" aria-hidden="true">${[3, 2, 1]
        .map((lvl) => {
          const label = s.levelLegend[lvl] || s.levelLegend[String(lvl)];
          if (!label) return "";
          const dots = [1, 2, 3]
            .map(
              (i) =>
                `<span class="chip-dot${i <= lvl ? " is-on" : ""}"></span>`
            )
            .join("");
          return `<span class="skills-legend-item"><span class="chip-dots">${dots}</span>${escapeHtml(
            label
          )}</span>`;
        })
        .join("")}</div>`;
    }

    const cats = s.categories
      .map((cat) => {
        const wide = cat.gridSpan === 2 ? " skill-category--wide" : "";
        const svg = SKILL_SVG[cat.icon] || SKILL_SVG["check-circle"];
        return `
      <div class="skill-category spotlight reveal ${cat.delayClass}${wide}">
        <div class="skill-cat-icon">${svg}</div>
        <div class="skill-cat-title">${escapeHtml(cat.title)}</div>
        <div class="skill-chips">${cat.chips
          .map((c) => chipHtml(c, "", true))
          .join("")}</div>
      </div>`;
      })
      .join("");

    document.getElementById("skills-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(s.sectionLabel)}</div>
      <h2 class="section-title reveal">${escapeHtml(s.title)}</h2>
      ${featuredHtml}
      ${legendHtml}
      <div class="skills-grid">${cats}</div>`;
  }

  function projectMetaHtml(proj) {
    const bits = [];
    if (proj.year) bits.push(escapeHtml(proj.year));
    if (proj.role) bits.push(escapeHtml(proj.role));
    if (proj.meta && proj.meta.language) bits.push(escapeHtml(proj.meta.language));
    if (proj.meta && proj.meta.updated)
      bits.push("Updated " + escapeHtml(proj.meta.updated));
    if (!bits.length) return "";
    return `<div class="project-meta">${bits
      .map((b) => `<span>${b}</span>`)
      .join('<span class="project-meta-sep">·</span>')}</div>`;
  }

  function projectLinksHtml(proj) {
    const links = [];
    if (proj.repo)
      links.push({ label: "View repository", href: proj.repo });
    if (Array.isArray(proj.links))
      proj.links.forEach((l) => {
        if (l && l.href) links.push(l);
      });
    if (!links.length) return "";
    return `<div class="project-links">${links
      .map(
        (l) =>
          `<a href="${escapeHtml(
            l.href
          )}" class="project-link" target="_blank" rel="noopener noreferrer">${escapeHtml(
            l.label
          )}${ARROW_UPRIGHT}</a>`
      )
      .join("")}</div>`;
  }

  function renderProjects() {
    const p = portfolioData.projects;
    const cards = p.items
      .map((proj) => {
        const stack = tagsHtml(proj.stack, "stack-tag");
        const delay = proj.delayClass ? ` ${proj.delayClass}` : "";
        const meta = projectMetaHtml(proj);
        const projLinks = projectLinksHtml(proj);
        if (proj.featured) {
          const metrics = proj.metrics
            .map(
              (m) =>
                `<div class="metric-item"><div class="metric-val">${escapeHtml(
                  m.value
                )}</div><div class="metric-label">${escapeHtml(
                  m.label
                )}</div></div>`
            )
            .join("");
          const bullets = proj.bullets
            .map((b) => `<li>${escapeHtml(b)}</li>`)
            .join("");
          return `
      <div class="project-card featured spotlight reveal">
        <div class="project-left">
          <div class="project-eyebrow">${escapeHtml(proj.eyebrow)}</div>
          <div class="project-title">${escapeHtml(proj.title)}</div>
          ${meta}
          <p class="project-desc">${escapeHtml(proj.description)}</p>
          <div class="project-stack">${stack}</div>
          ${projLinks}
        </div>
        <div class="project-right">
          <div class="project-metrics">${metrics}</div>
          <ul class="tl-bullets">${bullets}</ul>
        </div>
      </div>`;
        }
        return `
      <div class="project-card spotlight reveal${delay}">
        <div class="project-eyebrow">${escapeHtml(proj.eyebrow)}</div>
        <div class="project-title">${escapeHtml(proj.title)}</div>
        ${meta}
        <p class="project-desc">${escapeHtml(proj.description)}</p>
        <div class="project-stack">${stack}</div>
        ${projLinks}
      </div>`;
      })
      .join("");
    document.getElementById("projects-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(p.sectionLabel)}</div>
      <h2 class="section-title reveal">${escapeHtml(p.title)}</h2>
      <div class="projects-grid">${cards}</div>`;
  }

  /* Issuer monogram — derived from the issuer name so it can never mismatch.
     Short acronyms (≤4 chars) render whole; camel-case names use their capitals;
     everything else falls back to the first two letters. */
  function certMonogram(issuer) {
    const s = String(issuer || "").trim();
    if (!s) return { text: "•", acronym: false };
    if (s.length <= 4) return { text: s.toUpperCase(), acronym: true };
    const caps = s.match(/[A-Z0-9]/g);
    if (caps && caps.length >= 2)
      return { text: (caps[0] + caps[1]).toUpperCase(), acronym: false };
    return { text: s.slice(0, 2).toUpperCase(), acronym: false };
  }

  function renderCertifications() {
    const c = portfolioData.certifications;
    const rows = c.items
      .map((cert, i) => {
        const idx = String(i + 1).padStart(2, "0");
        const mono = certMonogram(cert.issuer);
        const iconMarkup = `<span class="cert-icon${
          mono.acronym ? " cert-icon--acronym" : ""
        }" aria-hidden="true">${escapeHtml(mono.text)}</span>`;
        const inner = `
        <span class="cert-index" aria-hidden="true">${idx}</span>
        ${iconMarkup}
        <span class="cert-text">
          <span class="cert-issuer">${escapeHtml(cert.issuer)}</span>
          <span class="cert-name">${escapeHtml(cert.name)}</span>
        </span>
        <span class="cert-year">${escapeHtml(cert.year)}</span>`;
        if (cert.credentialUrl) {
          return `<a class="cert-row is-link reveal ${cert.delayClass}" href="${escapeHtml(
            cert.credentialUrl
          )}" target="_blank" rel="noopener noreferrer">${inner}<span class="cert-arrow">${ARROW_UPRIGHT}</span></a>`;
        }
        return `<div class="cert-row reveal ${cert.delayClass}">${inner}</div>`;
      })
      .join("");
    document.getElementById("certifications-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(c.sectionLabel)}</div>
      <h2 class="section-title reveal">${escapeHtml(c.title)}</h2>
      <div class="certs-list">${rows}</div>`;
  }

  function renderContact() {
    const c = portfolioData.contact;
    const { before, emphasis, after } = c.headline;
    const email =
      c.email ||
      (c.links.find((l) => l.icon === "mail") || {}).href?.replace(
        "mailto:",
        ""
      ) ||
      "";
    const links = c.links
      .map((lnk) => {
        const svg = CONTACT_ICONS[lnk.icon] || "";
        const target = lnk.external
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";
        return `<a href="${escapeHtml(
          lnk.href
        )}" class="contact-link"${target}>${svg}${escapeHtml(lnk.label)}</a>`;
      })
      .join("");
    const copyBtn = email
      ? `<button type="button" class="contact-link contact-copy" id="copy-email" data-email="${escapeHtml(
          email
        )}">${CONTACT_ICONS.copy}<span class="copy-label">Copy email</span></button>`
      : "";
    document.getElementById("contact-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(c.sectionLabel)}</div>
      <h2 class="contact-headline reveal">${escapeHtml(
        before
      )}<br><em>${escapeHtml(emphasis)}</em> ${escapeHtml(after)}</h2>
      <p class="contact-sub reveal">${escapeHtml(c.sub)}</p>
      <div class="contact-links reveal">${links}${copyBtn}</div>`;
  }

  function renderFooter() {
    const { meta, contact } = portfolioData;
    const linkedin = contact.links.find((l) => l.icon === "linkedin");
    const github = contact.links.find((l) => l.icon === "github");
    const email = contact.links.find((l) => l.icon === "mail");
    document.getElementById("footer-root").innerHTML = `
      <div class="footer-copy">© <span id="footer-year">${
        meta.footer.year
      }</span> Muhamad Insan Taufik · ${escapeHtml(meta.footer.location)}</div>
      <div class="footer-links">
        <a href="${escapeHtml(
          linkedin.href
        )}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="${escapeHtml(
          github.href
        )}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="${escapeHtml(email.href)}">Email</a>
        <a href="#hero" class="footer-top">Back to top ↑</a>
      </div>`;
  }

  /* ── Scroll reveal + timeline dots ── */
  function setupRevealObserver() {
    const reveals = document.querySelectorAll(".reveal");
    if (prefersReduced() || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("visible"));
      document
        .querySelectorAll(".tl-item")
        .forEach((el) => el.classList.add("is-active"));
      return;
    }
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          if (entry.target.classList.contains("tl-item")) {
            entry.target.classList.add("is-active");
          }
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revealObserver.observe(el));
    document
      .querySelectorAll(".tl-item")
      .forEach((el) => revealObserver.observe(el));
  }

  /* ── Animated counters ── */
  function initCounters() {
    const els = document.querySelectorAll("[data-count]");
    if (!els.length) return;

    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      const finalText = el.getAttribute("data-value") || String(target);
      if (isNaN(target)) {
        el.textContent = finalText;
        return;
      }
      if (prefersReduced()) {
        el.textContent = finalText;
        return;
      }
      const decimals = (String(target).split(".")[1] || "").length;
      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        el.textContent = decimals
          ? val.toFixed(decimals)
          : Math.round(val).toLocaleString();
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = finalText;
        }
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      els.forEach(run);
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ── Hero entrance ── */
  function initHeroIntro() {
    const root = document.getElementById("hero-root");
    if (!root) return;
    const ready = () => root.classList.add("is-ready");
    // Double-rAF triggers the CSS transitions from a painted initial state…
    requestAnimationFrame(() => requestAnimationFrame(ready));
    // …with a timeout fallback for tabs opened in the background, where rAF
    // is throttled and would otherwise leave hero-anim / terminal lines hidden.
    setTimeout(ready, 250);
  }

  /* ── Nav scroll progress ── */
  function initScrollProgress() {
    const root = document.documentElement;
    let ticking = false;
    const update = () => {
      const max = root.scrollHeight - root.clientHeight;
      const p = max > 0 ? Math.min(1, root.scrollTop / max) : 0;
      root.style.setProperty("--scroll-progress", p.toFixed(4));
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* ── Subtle parallax (hero) ── */
  function initParallax() {
    if (prefersReduced()) return;
    const gridBg = document.querySelector(".hero-grid-bg");
    const layers = document.querySelectorAll("[data-parallax]");
    const hero = document.getElementById("hero");
    if (!hero) return;

    let px = 0,
      py = 0;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      requestAnimationFrame(apply);
    };
    const apply = () => {
      if (gridBg) gridBg.style.transform = `translate(${px * 14}px, ${py * 14}px)`;
      layers.forEach((el) => {
        const depth = parseFloat(el.getAttribute("data-parallax")) || 0.02;
        el.style.transform = `translate(${px * depth * 600}px, ${
          py * depth * 600
        }px)`;
      });
    };
    if (prefersFine()) {
      hero.addEventListener("mousemove", onMove, { passive: true });
      hero.addEventListener("mouseleave", () => {
        px = 0;
        py = 0;
        requestAnimationFrame(apply);
      });
    }
  }

  /* ── Cursor-follow ring ── */
  function initCursor() {
    const ring = document.getElementById("cursor-ring");
    if (!ring || !prefersFine() || prefersReduced()) return;
    document.body.classList.add("has-cursor-ring");

    let rx = window.innerWidth / 2,
      ry = window.innerHeight / 2;
    let tx = rx,
      ty = ry;
    let raf = null;

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = Math.abs(tx - rx) > 0.1 || Math.abs(ty - ry) > 0.1
        ? requestAnimationFrame(loop)
        : null;
    };
    window.addEventListener(
      "mousemove",
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
        ring.classList.add("is-visible");
        if (!raf) raf = requestAnimationFrame(loop);
      },
      { passive: true }
    );
    window.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) ring.classList.remove("is-visible");
    });

    const hoverSel = "a, button, .chip, .project-card, .cert-row.is-link, [role='button']";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverSel)) ring.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverSel)) ring.classList.remove("is-hover");
    });
  }

  /* ── Magnetic buttons ── */
  function initMagneticButtons() {
    if (!prefersFine() || prefersReduced()) return;
    document.querySelectorAll(".btn-magnetic, .nav-cta").forEach((btn) => {
      const strength = 0.25;
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ── Card pointer spotlight ── */
  function initCardSpotlight() {
    if (prefersReduced()) return;
    document.querySelectorAll(".spotlight").forEach((card) => {
      card.addEventListener(
        "mousemove",
        (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        },
        { passive: true }
      );
    });
  }

  /* ── Skill chip highlight ── */
  function initSkillFilter() {
    document.querySelectorAll(".skill-category .skill-chips").forEach((group) => {
      group.addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        const wasActive = chip.classList.contains("is-active");
        group.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
        group.classList.toggle("has-selection", !wasActive);
        if (!wasActive) chip.classList.add("is-active");
      });
      group.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const chip = e.target.closest(".chip");
        if (!chip) return;
        e.preventDefault();
        chip.click();
      });
    });
  }

  /* ── Copy email ── */
  function initCopyEmail() {
    const btn = document.getElementById("copy-email");
    if (!btn) return;
    const label = btn.querySelector(".copy-label");
    const original = label ? label.textContent : "";
    btn.addEventListener("click", async () => {
      const email = btn.getAttribute("data-email");
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch (__) {}
        document.body.removeChild(ta);
      }
      btn.classList.add("is-copied");
      if (label) label.textContent = "Copied";
      window.setTimeout(() => {
        btn.classList.remove("is-copied");
        if (label) label.textContent = original;
      }, 1800);
    });
  }

  /* ── Mobile nav ── */
  function closeMobile() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu-root");
    const backdrop = document.getElementById("mobile-backdrop");
    if (hamburger) {
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");
    }
    if (mobileMenu) mobileMenu.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  function initMobileNav() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu-root");
    const backdrop = document.getElementById("mobile-backdrop");
    if (!hamburger || !mobileMenu) return;

    const open = () => {
      hamburger.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
      hamburger.setAttribute("aria-label", "Close menu");
      mobileMenu.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
      document.body.classList.add("menu-open");
    };
    const toggle = () =>
      hamburger.classList.contains("open") ? closeMobile() : open();

    hamburger.addEventListener("click", toggle);
    if (backdrop) backdrop.addEventListener("click", closeMobile);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobile();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) closeMobile();
    });
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReduced() ? "auto" : "smooth",
          block: "start",
        });
        closeMobile();
        // Move focus for keyboard users without a second scroll jump.
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initActiveSectionNav() {
    const navAnchors = document.querySelectorAll(
      ".nav-links a[data-section], #mobile-menu-root a[data-section]"
    );
    const sections = Array.from(document.querySelectorAll("section[id]"));

    function updateActive() {
      const pos = window.scrollY + 120;
      let currentId = sections[0]?.getAttribute("id") || "";
      for (const sec of sections) {
        if (pos >= sec.offsetTop) currentId = sec.getAttribute("id") || "";
      }
      navAnchors.forEach((a) => {
        a.classList.toggle(
          "active",
          a.getAttribute("data-section") === currentId
        );
      });
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  function bootstrap() {
    document.title = portfolioData.meta.title;
    renderNav();
    renderHero();
    renderStrengths();
    renderAbout();
    renderExperience();
    renderSkills();
    renderProjects();
    renderCertifications();
    renderContact();
    renderFooter();

    initMobileNav();
    initSmoothAnchors();
    initNavbarScroll();
    initActiveSectionNav();
    setupRevealObserver();

    initHeroIntro();
    initScrollProgress();
    initCounters();
    initParallax();
    initCursor();
    initMagneticButtons();
    initCardSpotlight();
    initSkillFilter();
    initCopyEmail();

    // React to a live change in the motion preference.
    const onMotionChange = () => {
      if (prefersReduced()) {
        document
          .querySelectorAll(".reveal")
          .forEach((el) => el.classList.add("visible"));
      }
    };
    if (mqReduced.addEventListener)
      mqReduced.addEventListener("change", onMotionChange);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
