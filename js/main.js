(function () {
  "use strict";

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
  };

  const CONTACT_ICONS = {
    mail:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>',
  };

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

  function chipsHtml(labels) {
    return labels
      .map((c) => `<span class="chip">${escapeHtml(c)}</span>`)
      .join("");
  }

  function renderNav() {
    const { meta, nav } = portfolioData;
    const desktop = nav.links
      .map(
        (l) =>
          `<li><a href="${escapeHtml(l.href)}" data-section="${escapeHtml(l.href.slice(1))}">${escapeHtml(l.label)}</a></li>`
      )
      .join("");
    document.getElementById("nav-root").innerHTML = `
      <a href="#hero" class="nav-logo">${escapeHtml(meta.navLogo)}<span>.</span></a>
      <ul class="nav-links">${desktop}</ul>
      <a href="${escapeHtml(nav.cta.href)}" class="nav-cta">${escapeHtml(nav.cta.label)}</a>
      <div class="nav-hamburger" id="hamburger" aria-label="Menu" role="button" tabindex="0">
        <span></span><span></span><span></span>
      </div>`;

    document.getElementById("mobile-menu-root").innerHTML = nav.mobileLinks
      .map(
        (l) =>
          `<a href="${escapeHtml(l.href)}" data-section="${escapeHtml(l.href.slice(1))}">${escapeHtml(l.label)}</a>`
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
        const cls =
          c.variant === "primary" ? "btn-primary" : "btn-outline";
        const dl = c.download
          ? ` download${
              c.downloadName ? `="${escapeHtml(c.downloadName)}"` : ""
            } rel="noopener"`
          : "";
        return `<a href="${escapeHtml(c.href)}" class="${cls}"${dl}>${icon}${escapeHtml(c.label)}</a>`;
      })
      .join("");
  }

  function terminalHtml(t) {
    const pairs = t.pairs
      .map(
        (p) =>
          `<div><span class="t-key">${escapeHtml(p.key)}</span> <span class="t-comment">=</span> <span class="t-val">${p.value}</span></div>`
      )
      .join("");
    const skillRows = t.skills
      .map((s) => `<div>&nbsp; ${s},</div>`)
      .join("");
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
        <div><span class="t-key">${escapeHtml(t.statusLine.key)}</span> <span class="t-comment">=</span> <span class="${statusValClass}">${t.statusLine.value}</span></div>
        <div><span class="t-key">run</span>(<span class="t-val">profile</span>) <span class="t-cursor"></span></div>
      </div>`;
  }

  function renderHero() {
    const h = portfolioData.hero;
    document.getElementById("hero-root").innerHTML = `
      <div class="hero-left">
        <div class="hero-eyebrow">${escapeHtml(h.eyebrow)}</div>
        <h1 class="hero-name">${heroNameHtml(h.nameLines)}</h1>
        <div class="hero-role">${escapeHtml(h.role)}</div>
        <p class="hero-tagline">
          <strong>${escapeHtml(h.tagline.lead)}</strong>${escapeHtml(h.tagline.rest)}
        </p>
        <div class="hero-ctas">${heroCtasHtml(h.ctas)}</div>
        <div class="hero-stats">
          ${h.stats
            .map(
              (s) =>
                `<div class="stat-item"><div class="stat-num">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`
            )
            .join("")}
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-terminal">
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
    const duplicated = [...items, ...items];
    document.getElementById("strengths-track").innerHTML = duplicated
      .map((s) => `<span class="strength-item">${escapeHtml(s)}</span>`)
      .join("");
  }

  function renderAbout() {
    const a = portfolioData.about;
    const paras = a.paragraphs
      .map((p) => `<p>${p}</p>`)
      .join("");
    const stats = a.stats
      .map((s) => {
        const inner = s.html ? s.value : escapeHtml(s.value);
        return `<div class="about-stat-card"><div class="asc-num">${inner}</div><div class="asc-label">${escapeHtml(s.label)}</div></div>`;
      })
      .join("");
    document.getElementById("about-root").innerHTML = `
      <div class="section-label">${escapeHtml(a.sectionLabel)}</div>
      <div class="about-grid">
        <div class="reveal">
          <h2 class="section-title">${a.titleLines.map((line) => `${escapeHtml(line)}`).join("<br>")}</h2>
          <div class="about-bio">${paras}</div>
          <div class="open-badge">${escapeHtml(a.badge)}</div>
        </div>
        <div class="reveal reveal-delay-2">
          <div class="about-stats-grid">${stats}</div>
        </div>
      </div>`;
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
          <ul class="tl-bullets">
            ${job.highlights.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
          </ul>
          <div>${tagsHtml(job.tags, "tl-tag")}</div>
        </div>
      </div>`
      )
      .join("");
    document.getElementById("experience-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(exp.sectionLabel)}</div>
      <h2 class="section-title reveal">${exp.titleLines.map((l) => escapeHtml(l)).join("<br>")}</h2>
      <div class="timeline">${items}</div>`;
  }

  function renderSkills() {
    const s = portfolioData.skills;
    const cats = s.categories
      .map((cat) => {
        const wide =
          cat.gridSpan === 2 ? " skill-category--wide" : "";
        const svg = SKILL_SVG[cat.icon] || SKILL_SVG["check-circle"];
        return `
      <div class="skill-category reveal ${cat.delayClass}${wide}">
        <div class="skill-cat-icon">${svg}</div>
        <div class="skill-cat-title">${escapeHtml(cat.title)}</div>
        <div class="skill-chips">${chipsHtml(cat.chips)}</div>
      </div>`;
      })
      .join("");
    document.getElementById("skills-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(s.sectionLabel)}</div>
      <h2 class="section-title reveal">${escapeHtml(s.title)}</h2>
      <div class="skills-grid">${cats}</div>`;
  }

  function renderProjects() {
    const p = portfolioData.projects;
    const cards = p.items
      .map((proj) => {
        const stack = tagsHtml(proj.stack, "stack-tag");
        const delay = proj.delayClass ? ` ${proj.delayClass}` : "";
        if (proj.featured) {
          const metrics = proj.metrics
            .map(
              (m) =>
                `<div class="metric-item"><div class="metric-val">${escapeHtml(m.value)}</div><div class="metric-label">${escapeHtml(m.label)}</div></div>`
            )
            .join("");
          const bullets = proj.bullets
            .map((b) => `<li>${escapeHtml(b)}</li>`)
            .join("");
          return `
      <div class="project-card featured reveal">
        <div class="project-left">
          <div class="project-eyebrow">${escapeHtml(proj.eyebrow)}</div>
          <div class="project-title">${escapeHtml(proj.title)}</div>
          <p class="project-desc">${escapeHtml(proj.description)}</p>
          <div class="project-stack">${stack}</div>
        </div>
        <div class="project-right">
          <div class="project-metrics">${metrics}</div>
          <ul class="tl-bullets">${bullets}</ul>
        </div>
      </div>`;
        }
        return `
      <div class="project-card reveal${delay}">
        <div class="project-eyebrow">${escapeHtml(proj.eyebrow)}</div>
        <div class="project-title">${escapeHtml(proj.title)}</div>
        <p class="project-desc">${escapeHtml(proj.description)}</p>
        <div class="project-stack">${stack}</div>
      </div>`;
      })
      .join("");
    document.getElementById("projects-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(p.sectionLabel)}</div>
      <h2 class="section-title reveal">${escapeHtml(p.title)}</h2>
      <div class="projects-grid">${cards}</div>`;
  }

  function renderCertifications() {
    const c = portfolioData.certifications;
    const cards = c.items
      .map(
        (cert) => `
      <div class="cert-card reveal ${cert.delayClass}">
        <div class="cert-icon">${cert.icon}</div>
        <div class="cert-issuer">${escapeHtml(cert.issuer)}</div>
        <div class="cert-name">${escapeHtml(cert.name)}</div>
        <div class="cert-year">${escapeHtml(cert.year)}</div>
      </div>`
      )
      .join("");
    document.getElementById("certifications-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(c.sectionLabel)}</div>
      <h2 class="section-title reveal">${escapeHtml(c.title)}</h2>
      <div class="certs-grid">${cards}</div>`;
  }

  function renderContact() {
    const c = portfolioData.contact;
    const { before, emphasis, after } = c.headline;
    const links = c.links
      .map((lnk) => {
        const svg = CONTACT_ICONS[lnk.icon] || "";
        const target = lnk.external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${escapeHtml(lnk.href)}" class="contact-link"${target}>${svg}${escapeHtml(lnk.label)}</a>`;
      })
      .join("");
    document.getElementById("contact-root").innerHTML = `
      <div class="section-label reveal">${escapeHtml(c.sectionLabel)}</div>
      <h2 class="contact-headline reveal">${escapeHtml(before)}<br><em>${escapeHtml(emphasis)}</em> ${escapeHtml(after)}</h2>
      <p class="contact-sub reveal">${escapeHtml(c.sub)}</p>
      <div class="contact-links reveal">${links}</div>`;
  }

  function renderFooter() {
    const { meta, contact } = portfolioData;
    const linkedin = contact.links.find((l) => l.icon === "linkedin");
    const github = contact.links.find((l) => l.icon === "github");
    const email = contact.links.find((l) => l.icon === "mail");
    document.getElementById("footer-root").innerHTML = `
      <div class="footer-copy">© <span id="footer-year">${meta.footer.year}</span> Muhamad Insan Taufik · ${escapeHtml(meta.footer.location)}</div>
      <div class="footer-links">
        <a href="${escapeHtml(linkedin.href)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="${escapeHtml(github.href)}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="${escapeHtml(email.href)}">Email</a>
      </div>`;
  }

  function setupRevealObserver() {
    if (revealObserver) {
      revealObserver.disconnect();
    }
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });
  }

  function closeMobile() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu-root");
    if (hamburger) hamburger.classList.remove("open");
    if (mobileMenu) mobileMenu.classList.remove("open");
  }

  function initMobileNav() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu-root");
    if (!hamburger || !mobileMenu) return;
    const toggle = () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    };
    hamburger.addEventListener("click", toggle);
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
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
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMobile();
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
        const top = sec.offsetTop;
        if (pos >= top) currentId = sec.getAttribute("id") || "";
      }
      navAnchors.forEach((a) => {
        const id = a.getAttribute("data-section");
        a.classList.toggle("active", id === currentId);
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }

})();
