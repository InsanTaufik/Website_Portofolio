# Muhamad Insan Taufik — Software QA Engineer Portfolio

> Software QA Engineer | Manual & Automation Testing, API & Data Validation

**Live site:** https://insantaufik.github.io/Website_Portofolio/

## Overview

Software QA Engineer at PT Astra International Tbk (assigned through PT Global Lancesoft
Indonesia). I validate a 1B+ row migration from Microsoft Fabric and Cloudera to Google BigQuery
with SQL and Python/Pandas, and test an embedded Power BI application on web, Android, iOS and
iPadOS. I also execute and maintain existing Playwright and WebdriverIO/Appium regression suites.
Before this: QA internships in banking and capital markets.

**Open to Software QA, QA automation and data-quality roles.**

---

## Highlights

| | |
|---|---|
| **Data validation** | 100+ enterprise tables (1B+ rows) validated in a Fabric / Cloudera → BigQuery migration; 99.8% row-level hash match |
| **Application testing** | 200+ test cases on 15+ embedded Power BI dashboards, functional testing through SIT, UAT and release validation |
| **Automation** | Inherited Playwright and WebdriverIO/Appium suites (execute, maintain, investigate); 25+ Tricentis Tosca modules built at BTN; a Java/Selenium framework built from scratch as a personal project |
| **Education** | Bachelor of Information Systems, Telkom University (GPA 3.68/4.00) |

---

## Experience

### Software QA Engineer — PT Astra International Tbk
*Apr 2026 — Present · Assigned through PT Global Lancesoft Indonesia*

**Data migration validation** — Microsoft Fabric / Cloudera (Impala, Hive) → Google BigQuery
- Validated 100+ enterprise tables (1B+ rows): row counts, schema and data-type mapping, NULLs, duplicates, business keys, and numeric, datetime and timezone precision
- Reconciled source and target with SQL and Python/Pandas, including row-level hash comparison across partitioned data; 99.8% row-level match

**Application testing and automation** — web, Android, iOS, iPadOS
- Tested Auto Intelligence, an enterprise BI app embedding Power BI reports, from functional testing through SIT, UAT and release validation; designed 200+ test cases on 15+ dashboards
- Executed and maintained inherited Playwright (web) and WebdriverIO/Appium (Android) regression suites built on the Page Object Model; investigated failures and identified reliability improvements (condition-based waits, resilient locators)
- Investigated authorization failures and report-loading defects with Postman and network logs; documented reproducible defects in Jira and validated fixes across 3 release cycles

### Quality Assurance Intern — PT IDX Solusi Teknologi Informasi
*Dec 2025 — Apr 2026*
- 80+ positive/negative functional and regression test cases for IDX Terminal and HRIS; PRD reviews with developers, BAs and UI/UX designers

### Quality Assurance Intern — PT Indivara Group
*Nov 2025 — Dec 2025*
- 100+ functional and regression test cases for an Android app, a CMS and Salesforce; 7 critical pre-production defects found, 20+ tracked in Jira against Gherkin criteria over 4 sprints

### Business Support QA & Testing Intern — PT Bank Tabungan Negara (Persero) Tbk
*Jun 2024 — Aug 2024*
- Built and maintained 25+ Tricentis Tosca automation modules for recurring regression on a corporate internet banking platform; 60+ API and regression test cases across 10+ transaction types

---

## Projects

**Java/Selenium Automation Framework** (personal project) — Java, Selenium, TestNG, Maven. Built
from scratch: thread-safe parallel execution, constructor injection, polymorphic browser interface
for cross-browser runs. *Code not public yet.*

**Invoice Management API Automation** — Katalon Studio, Groovy, REST API. Positive and negative
tests for authentication, invoice listing, invoice detail and unbilled-summary endpoints (HTTP
status, JSON payloads); reusable request and retry handling as Custom Keywords. *Code not public.*

More on GitHub:
- [End-to-end Playwright suite](https://github.com/InsanTaufik/ESBTechnicalTest_Muhamad-Insan-Taufik) — Playwright + TypeScript, Page Object Model
- [Credit submission & approval workflow](https://github.com/InsanTaufik/2a_Credit_Application_PDP_BCA_Finance) — Next.js, NestJS, server-side state machine, RBAC, audit trail
- [CI/CD pipeline for a Flask API](https://github.com/InsanTaufik/CI-CD-Practice) — pytest gate, Docker, GitHub Actions, Prometheus + Grafana
- [Sales forecasting app](https://github.com/InsanTaufik/Aplikasi-Prediksi-Shopee) — final-year project, XGBoost + Streamlit

---

## Skills

| | At work | Projects only |
|---|---|---|
| **Testing** | Functional, integration, regression, end-to-end, smoke, SIT, UAT, release validation, test case design, defect management (Jira/Xray) | |
| **Automation** | Playwright (JavaScript), WebdriverIO/Appium, Tricentis Tosca, Page Object Model, Allure, Git | Selenium (Java, TestNG), Katalon Studio (Groovy), Playwright (TypeScript), pytest, GitHub Actions |
| **API** | REST APIs, Postman, HTTP status and JSON validation, authentication/authorization, network logs | Katalon API automation |
| **Data & BI** | SQL, Python (Pandas), data reconciliation, ETL/migration testing, Google BigQuery, Microsoft Fabric, Cloudera (Impala, Hive), Power BI Embedded | |

---

## Education & credentials

- **Bachelor of Information Systems**, Telkom University — GPA 3.68/4.00 (Sep 2021 — Aug 2025)
- **Teaching Assistant, Data Warehouse & BI**, Daspro Laboratory, Telkom University (May — Jun 2025)
- **Associate Data Scientist** — BNSP competency certification (2024)
- **Certified Tester Foundation Level (CTFL) v4.0** — course, Udemy (2025)

**Languages:** Indonesian (native), English (professional working proficiency)

---

## Contact

- **Email:** insantaufik82@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/muhamad-insan-taufik
- **GitHub:** https://github.com/InsanTaufik

---

## Repository structure

```
portfolio/
├── index.html          # Document shell: metadata, landmarks, empty section roots
├── css/
│   └── styles.css      # Design tokens + components. One file, no build step.
├── js/
│   ├── data.js         # All content (portfolioData) — the only file to edit for copy
│   └── main.js         # Renders data.js into the shell, then wires interactions
├── assets/
│   ├── cv/             # CV PDF (hero, nav, mobile menu, contact)
│   ├── icons/          # Favicon
│   └── og/             # Social preview card (1200×630)
└── README.md
```

GitHub Pages serves the repository root at `/Website_Portofolio/`. The canonical and Open Graph
URLs in `index.html` point there; keep them in sync if the repository is renamed.

### Styling

The palette comes from the CV: navy `#1e395e` for identity, near-black text, slate rules
(`#99a4b0`), white and cool off-white paper. Colour is expressed through semantic tokens —
`--color-primary`, `--color-primary-hover`, `--color-text`, `--color-text-muted`,
`--color-border`, `--color-surface`, `--color-surface-alt`, `--color-background` and a few
more. Light values are declared on `:root`; the navy sections (`#projects`, `#contact`,
`.site-footer`) redeclare the same names, so components render correctly on either surface.

Type: DM Serif Display (headings), DM Sans (body), JetBrains Mono (dates, tool lists, labels).

---

## Updating content

All content lives in `js/data.js` (`portfolioData`). Edit that file only. Optional fields
degrade gracefully: omit one and the renderer skips that part.

| Field | Shape | Effect |
|-------|-------|--------|
| `hero.evidence[]` | `{ value, label }` | the figures strip under the hero |
| `hero.layers[]` | `{ id, label, scope, detail }` | a row in the "Where I test" diagram |
| `experience.items[].points` | `[string]` | bullets shown directly under the role |
| `experience.items[].workstreams` | `[{ title, scope, points[], tools[] }]` | always-visible strands of a role |
| `experience.items[].caseStudy` | `{ label, flow[], challenge, approach[], outcome[] }` | a disclosure under the role |
| `experience.items[].current` / `.via` | boolean / string | status dot; staffing employer under the company |
| `projects.featured[]` | `{ title, kind, year?, stack[], summary, why?, built[], proves, flow?, repo?, note? }` | a project card; `note` shows when there is no `repo` |
| `projects.more[]` | `{ title, summary, language, repo }` | a row in "More on GitHub" |
| `skills.groups[]` | `{ title, where, work[], projects[]? }` | a row in the skills table |
| `about.credentials[].credentialUrl` | URL | makes the credential row a link |
| `cv.href` | path | the CV file every "Download CV" link uses |

Content rules (also at the top of `data.js`): the CV is the source of truth for figures; the
Astra automation suites are inherited, so never "built" or "designed"; CTFL is a course, so never
"ISTQB-certified".

---

## Accessibility & motion

- Semantic landmarks, one `h1`, no heading-level skips; axe-core reports no WCAG 2.2 AA violations
- All core evidence is visible without interaction; the one disclosure (the migration case study)
  is a native `<details>`
- Focus rings re-map per surface; the mobile menu traps focus and returns it to its trigger
- Touch targets are at least 44px
- `prefers-reduced-motion: reduce` stops entrance reveals, the scroll-progress sweep, the
  availability pulse and smooth anchor scrolling

---

**Built with:** HTML, CSS, JavaScript (no framework, no build step) · **Hosted on:** GitHub Pages
