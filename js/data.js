/**
 * Single source of truth for portfolio content.
 * Loaded before main.js (see index.html).
 *
 * ─────────────────────────────────────────────────────────────
 * SHAPES THE RENDERER UNDERSTANDS
 *
 * hero.evidence[]       { value, label, count? }  count = animate up to it
 * hero.layers[]         { id, label, scope, detail }   → the layer diagram
 *
 * experience.items[]    { period, company, location, role, context,
 *                         metrics[{value,label}], approach[], findings[],
 *                         tags[] }
 *                       approach/findings render inside a <details>.
 *
 * projects.items[]      { featured?, eyebrow, year, role, title, summary,
 *                         stack[], repo?, links[{label,href}],
 *                         meta{language,updated},
 *                         problem?, approach[], result[],
 *                         flow[]  → ["Source", "Step", "Target"] diagram
 *                         metrics[{value,label}] }
 *
 * skills.groups[]       { id, title, evidence, items[] }   items = strings
 * about.credentials[]   { issuer, name, year, credentialUrl? }
 * ─────────────────────────────────────────────────────────────
 */
const portfolioData = {
  meta: {
    title: "Muhamad Insan Taufik — Software QA Engineer",
    navLogo: "MIT",
    footer: {
      location: "Kota Tangerang Selatan, Indonesia",
      year: 2026,
    },
  },

  nav: {
    links: [
      { href: "#experience", label: "Experience" },
      { href: "#projects", label: "Projects" },
      { href: "#skills", label: "Skills" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    cta: {
      href: "assets/cv/Muhamad_Insan_Taufik_CV_2026.pdf",
      label: "CV",
      download: true,
      downloadName: "Muhamad_Insan_Taufik_CV.pdf",
    },
  },

  hero: {
    status: "Open to QA roles",
    location: "Tangerang Selatan, ID",
    name: "Muhamad Insan Taufik",
    role: "Software QA Engineer",
    summary:
      "I test enterprise applications across the layers they run on: the screens people use, the APIs behind them, and the warehouse underneath. Right now that means validating a Microsoft Fabric and Cloudera migration into BigQuery at Astra International, and the embedded Power BI dashboards built on top of it.",
    ctas: [
      { href: "#experience", label: "View experience", variant: "primary", icon: "arrow-down" },
      {
        href: "assets/cv/Muhamad_Insan_Taufik_CV_2026.pdf",
        label: "Download CV",
        variant: "outline",
        icon: "download",
        download: true,
        downloadName: "Muhamad_Insan_Taufik_CV.pdf",
      },
    ],
    evidence: [
      { value: "600+", label: "Test cases executed", count: 600 },
      { value: "100+", label: "Datasets validated", count: 100 },
      { value: "1B+", label: "Rows reconciled" },
      { value: "5", label: "Industries", count: 5 },
    ],
    /* The layer diagram — replaces the old decorative terminal.
       Each layer is something the CV can actually back up. */
    layersCaption: "Where I test",
    layers: [
      {
        id: "ui",
        label: "Interface",
        scope: "Web · Android · iOS · iPad",
        detail: "Functional, regression, cross-device and responsive behaviour",
      },
      {
        id: "api",
        label: "API",
        scope: "REST · Postman",
        detail: "Status codes, JSON payloads, auth flows, null and boundary cases",
      },
      {
        id: "data",
        label: "Data",
        scope: "BigQuery · Fabric · Cloudera",
        detail: "Schema, row counts, duplicates, precision, row-level hashes",
      },
      {
        id: "bi",
        label: "BI",
        scope: "Power BI Embedded",
        detail: "Report rendering, slicers, filters, refresh, fullscreen behaviour",
      },
      {
        id: "auto",
        label: "Automation",
        scope: "Playwright · Tosca · Katalon · Python",
        detail: "Regression suites and reconciliation scripts that run without me",
      },
    ],
  },

  about: {
    sectionLabel: "About",
    title: "Background",
    paragraphs: [
      "I'm an <strong>ISTQB-certified Software QA Engineer</strong> based in Tangerang Selatan. Most of my work sits where an application meets its data: functional and regression testing on the front end, REST checks in the middle, and SQL and Python reconciliation against the warehouse behind it.",
      "I hold a <strong>Bachelor of Information Systems</strong> from Telkom University (GPA 3.68/4.00). Since 2024 I've tested in banking, capital markets, automotive, FMCG, and enterprise data platforms, at <strong>PT Astra International</strong>, <strong>PT IDX Solusi Teknologi Informasi</strong>, <strong>PT Indivara Group</strong>, and <strong>Bank BTN</strong>.",
      "The part I like most is the investigation: a row count that doesn't match, or a dashboard that renders on desktop but not on an iPad, then working back through the API, the query, and the partition until the cause is specific enough to put in a ticket. I work day to day with data engineers, backend engineers, BAs, product owners, and DevOps. English: professional working proficiency.",
    ],
    badge: "Open to QA & data quality roles",
    facts: [
      { value: "3.68", label: "GPA · Telkom University, Information Systems", count: 3.68 },
      { value: "99.8%", label: "Row-level hash match across 100+ datasets at Astra", count: 99.8 },
      { value: "35+", label: "Defects documented with root cause at Astra", count: 35 },
      { value: "ISTQB", label: "Certified Tester Foundation Level, CTFL v4.0" },
    ],
    credentialsLabel: "Certifications",
    credentials: [
      {
        issuer: "Udemy",
        name: "Certified Tester Foundation Level (CTFL) v4.0 — course completion",
        year: "2025",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
      },
      {
        issuer: "BNSP",
        name: "Associate Data Scientist — competent",
        year: "2024",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
      },
      {
        issuer: "HackerRank",
        name: "Python (Basic)",
        year: "2026",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
      },
      {
        issuer: "HackerRank",
        name: "SQL (Basic)",
        year: "2026",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
      },
      {
        issuer: "HackerRank",
        name: "Java (Basic)",
        year: "2026",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
      },
    ],
  },

  experience: {
    sectionLabel: "Experience",
    title: "Experience",
    intro:
      "Five roles since 2024, across banking, capital markets, automotive, FMCG, and a university lab. Open any entry for how the testing was done.",
    disclosureLabel: "Approach & findings",
    items: [
      {
        period: "Apr 2026 — Present",
        company: "PT Astra International Tbk",
        location: "Jakarta, ID",
        role: "Product Quality Assurance",
        current: true,
        context:
          "Auto Intelligence is Astra's analytics platform for five business units — Daihatsu, Toyota, Honda, Lexus, and Business Sales Operations. While it moved off Microsoft Fabric and Cloudera onto Google BigQuery, my job was to prove the data landing in BigQuery matched the source, and that the app and dashboards sitting on top of it still behaved.",
        metrics: [
          { value: "100+", label: "Datasets validated" },
          { value: "99.8%", label: "Row-level hash match" },
          { value: "1B+", label: "Rows under partition validation" },
          { value: "200+", label: "SIT / UAT / regression cases" },
        ],
        approach: [
          "SQL reconciliation paired with a Python and Pandas comparison script — row counts, schema, nulls, duplicates, business keys, and row-level hashes across 100+ datasets, reaching 99.8% hash match.",
          "Partition-based validation instead of full-table scans on transactional tables up to 1B+ rows, which made validation queries about 40% faster.",
          "40+ Playwright scripts in JavaScript covering the Auto Intelligence App regression suite.",
          "200+ SIT, UAT, regression, functional, and integration cases over API integrations, auth flows, report rendering, filters, slicers, and refresh.",
          "15+ embedded Power BI dashboards checked on Web, Android, and iOS across DEV, STG, and Prod-like environments.",
        ],
        findings: [
          "Partition-level comparison surfaced schema mismatches and duplicate rows; discrepancies dropped about 25% once they were fixed.",
          "35+ Jira defects on dashboard performance and API dependencies, each with reproduction steps, expected versus actual, and a root-cause note.",
          "Flaky Playwright failures fell about 30% after tracing them to stale test data and timing assumptions rather than re-running them.",
          "Defect resolution and release validation driven with data engineers, backend engineers, BAs, and external vendors across 3 release cycles.",
        ],
        tags: ["Python", "Pandas", "SQL", "BigQuery", "Microsoft Fabric", "Cloudera", "Playwright", "Power BI Embedded", "Jira"],
      },
      {
        period: "Dec 2025 — Apr 2026",
        company: "PT IDX Solusi Teknologi Informasi",
        location: "Jakarta Selatan, ID",
        role: "Quality Assurance Intern",
        context:
          "Functional and regression testing across five capital-market and enterprise systems: IDX Terminal, KPEI Administration, HRIS, SSL/SFTP, and PME.",
        metrics: [
          { value: "80+", label: "Functional & regression cases" },
          { value: "6", label: "Functional defects found" },
          { value: "50%", label: "Ambiguous requirements cut" },
        ],
        approach: [
          "80+ functional and regression cases for IDX Terminal and HRIS, covering positive and negative paths derived from the functional requirements.",
          "Functional Specification Documents translated into structured, traceable test scenarios.",
          "PRD grooming with developers, BAs, and UI/UX designers before development started.",
        ],
        findings: [
          "Six functional defects identified, then validated through defect retest, regression, and UAT across Agile sprints.",
          "Grooming cut ambiguous and redundant requirements by up to 50% before anything was built.",
        ],
        tags: ["Functional Testing", "Regression", "FSD Analysis", "UAT", "Jira"],
      },
      {
        period: "Nov 2025 — Dec 2025",
        company: "PT Indivara Group",
        location: "Tangerang, ID",
        role: "Quality Assurance Intern",
        context:
          "QA across four Agile-delivered FMCG applications in the Bersama distribution ecosystem — Bersama App on Android, Bersama Web Monitoring (CMS), and Victory Web on Salesforce.",
        metrics: [
          { value: "100+", label: "Functional & regression cases" },
          { value: "7", label: "Critical defects pre-release" },
          { value: "20+", label: "Defects tracked to closure" },
          { value: "4", label: "Agile sprints" },
        ],
        approach: [
          "100+ functional and regression cases spanning the Android app, the CMS, and the Salesforce web front end.",
          "Gherkin acceptance criteria used as the basis for both test cases and defect reports.",
        ],
        findings: [
          "Seven critical defects caught before the production release.",
          "20+ Jira defects tracked to closure with product owners, developers, and DevOps engineers over 4 sprints.",
        ],
        tags: ["Mobile Testing", "Android", "Gherkin", "Jira", "Scrum"],
      },
      {
        period: "May 2025 — Jun 2025",
        company: "Daspro Laboratory, Telkom University",
        location: "Bandung, ID",
        role: "Teaching Assistant — Data Warehouse & BI",
        context:
          "Lab modules for the Data Warehouse and Business Intelligence course, taught with Pentaho and SQL.",
        metrics: [{ value: "90%+", label: "Students reaching strong grades" }],
        approach: [
          "Lab modules, exercises, and Q&A materials designed for the Data Warehouse and BI coursework.",
          "Practical sessions on building ETL and BI workflows in Pentaho and SQL, plus data validation and BI analysis.",
        ],
        findings: [
          "Over 90% of students reached strong grades on the coursework.",
        ],
        tags: ["SQL", "Pentaho", "ETL", "BI"],
      },
      {
        period: "Jun 2024 — Aug 2024",
        company: "PT Bank Tabungan Negara (Persero) Tbk",
        location: "Jakarta, ID",
        role: "Business Support Intern — QA & Testing",
        context:
          "QA for BTN's Corporate Internet Banking platform: backend services, transaction data, and the business-rule logic between them.",
        metrics: [
          { value: "60+", label: "Regression & API cases" },
          { value: "25+", label: "Tosca automation modules" },
          { value: "80%", label: "Manual regression effort cut" },
        ],
        approach: [
          "60+ regression and API cases covering 10+ banking transaction types.",
          "25+ Tricentis Tosca automation modules built and maintained for the regression suite.",
          "Structured test plans and defect documentation for each cycle.",
        ],
        findings: [
          "Automating the regression modules cut manual regression effort by about 80% per cycle.",
          "Backend services, transaction data, and business-rule logic validated across the banking workflows.",
        ],
        tags: ["Postman", "API Testing", "Tricentis Tosca", "Regression", "SQL"],
      },
    ],
  },

  projects: {
    sectionLabel: "Projects",
    title: "Projects",
    intro:
      "Things I built, and what I checked before trusting them. Repositories are linked where they're public.",
    disclosureLabel: "Read the case study",
    items: [
      {
        featured: true,
        eyebrow: "Final-year project",
        year: "2025",
        role: "Solo build",
        repo: "https://github.com/InsanTaufik/Aplikasi-Prediksi-Shopee",
        meta: { language: "Python", updated: "Jul 2025" },
        title: "Sales & Inventory Forecasting System",
        summary:
          "A Streamlit app that forecasts 12 months of product sales from Shopee transaction history, using an XGBoost pipeline with iterative prediction, lag features, and seasonal decomposition.",
        flow: ["Sales history", "Preprocess + validate", "XGBoost pipeline", "Streamlit app"],
        problem:
          "A forecast is only worth acting on if the history feeding it is clean, so the input checks mattered as much as the model.",
        approach: [
          "Preprocessing and transformation over the raw transaction history: type coercion, missing-period handling, and lag and seasonal feature construction.",
          "Automated data-quality checks run against every model input before training, rather than after a bad forecast appears.",
          "Iterative prediction so each forecast month feeds the next, with accuracy measured on held-out periods rather than on the training set.",
        ],
        result: [
          "R² of 0.901 and MAPE under 10% on the evaluation set.",
          "Deployed as an interactive Streamlit app for month-by-month stock planning.",
        ],
        metrics: [
          { value: "0.901", label: "R² score" },
          { value: "<10%", label: "MAPE" },
        ],
        stack: ["Python", "XGBoost", "Pandas", "Scikit-learn", "Streamlit", "SQL"],
      },
      {
        eyebrow: "API test automation",
        year: "2025",
        role: "Solo build",
        meta: { language: "Groovy", updated: "2025" },
        title: "Invoice Management API Automation",
        summary:
          "A Katalon Studio suite covering authentication, invoice listing, invoice detail, and unbilled summary endpoints — positive and negative paths for each.",
        flow: ["Auth token", "Invoice endpoints", "Assertions", "Bug report"],
        problem:
          "Four related endpoints, each needing coverage past the happy path: status codes, payload shape, nullable and required fields, date formats, and amount rules.",
        approach: [
          "Coverage split per endpoint across HTTP status codes, JSON payload shape, required and nullable fields, date formats, and amount business rules.",
          "Reusable request and retry handling built as Katalon Custom Keywords so each test reads as intent rather than plumbing.",
          "Negative cases written alongside positive ones for every endpoint, not as an afterthought.",
        ],
        result: [
          "A bug report and workflow documentation delivered with the suite so the findings outlived the run.",
        ],
        stack: ["Katalon Studio", "Groovy", "REST API"],
      },
      {
        eyebrow: "Test automation",
        year: "2026",
        role: "Framework build",
        repo: "https://github.com/InsanTaufik/ESBTechnicalTest_Muhamad-Insan-Taufik",
        meta: { language: "TypeScript", updated: "Aug 2026" },
        title: "End-to-End Playwright Framework",
        summary:
          "A Playwright and TypeScript suite for SauceDemo built on the Page Object Model, with reusable fixtures, utilities, and assertions across the core user journeys.",
        problem:
          "Written as a technical test, and used as a reference for how I structure a suite so it survives more than one sprint.",
        approach: [
          "Page Object Model to keep selectors in one place per screen.",
          "Shared fixtures and utilities so setup is declared once rather than copied per spec.",
        ],
        stack: ["Playwright", "TypeScript", "Page Object Model", "CI"],
      },
      {
        eyebrow: "Full-stack + QA",
        year: "2026",
        role: "Workflow simulation",
        repo: "https://github.com/InsanTaufik/2a_Credit_Application_PDP_BCA_Finance",
        meta: { language: "TypeScript", updated: "Aug 2026" },
        title: "Credit Submission & Approval Workflow",
        summary:
          "A production-shaped credit-application prototype with a server-side state machine, role-based access control, and a full audit trail. Scope taken from BRD, PRD, and FSD.",
        flow: [
          "Submission",
          "Validation",
          "Multi-level approval",
          "Back office",
          "Document + e-sign",
          "Disbursement",
        ],
        problem:
          "Approval workflows break at the transitions: a state reached out of order, or a role doing something it shouldn't. Building one is a good way to learn where to point the tests.",
        approach: [
          "State transitions enforced server-side so a client can't skip a stage.",
          "RBAC across submission, approval, and back-office roles.",
          "An audit trail behind every transition, which is what makes the flow testable after the fact.",
        ],
        stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Playwright", "TypeScript"],
      },
      {
        eyebrow: "DevOps for QA",
        year: "2026",
        role: "Solo build",
        repo: "https://github.com/InsanTaufik/CI-CD-Practice",
        meta: { language: "Python", updated: "Mar 2026" },
        title: "CI/CD Pipeline — Flask API",
        summary:
          "A small Flask REST API wired to a full pipeline so I could see where automated tests sit in a deployment, not just in a test runner.",
        flow: ["Commit", "pytest", "Docker staging", "Production", "Prometheus + Grafana"],
        approach: [
          "pytest unit and edge-case suites running as the gate before promotion.",
          "Docker staging promoted to production through GitHub Actions, with feature-flag rollout.",
          "Prometheus and Grafana for post-deploy observability.",
        ],
        stack: ["Python", "Flask", "Docker", "GitHub Actions", "pytest", "Prometheus"],
      },
      {
        eyebrow: "Coding camp",
        year: "2025",
        role: "Mini project",
        repo: "https://github.com/InsanTaufik/CodingCamp-7Nov2025-muhamadinsantaufik",
        meta: { language: "HTML", updated: "Nov 2025" },
        title: "Personal Profile Website",
        summary:
          "A responsive multi-page profile site in vanilla HTML, CSS, and JavaScript, built during a 5-day RevoU coding camp.",
        stack: ["HTML", "CSS", "JavaScript"],
      },
    ],
  },

  skills: {
    sectionLabel: "Skills",
    title: "What I work with",
    intro:
      "Grouped by what it's for, with where I've used it. The experience section is the evidence.",
    groups: [
      {
        id: "testing",
        icon: "check-circle",
        title: "Testing",
        evidence: "600+ cases across Astra, IDX, Indivara, and BTN",
        items: [
          "Functional",
          "Regression",
          "Integration",
          "End-to-end",
          "Smoke & sanity",
          "SIT",
          "UAT",
          "Release validation",
          "Test case design",
          "Defect management",
          "Root cause investigation",
        ],
      },
      {
        id: "platforms",
        icon: "smartphone",
        title: "Application platforms",
        evidence: "15+ embedded dashboards checked on Web, Android, and iOS at Astra",
        items: [
          "Cross-browser web",
          "Android",
          "iOS / iPadOS",
          "Responsive & cross-device",
          "Power BI Embedded",
        ],
      },
      {
        id: "api",
        icon: "terminal",
        title: "API & backend",
        evidence: "60+ regression and API cases over 10+ transaction types at BTN",
        items: [
          "REST API testing",
          "Postman",
          "JSON & HTTP response validation",
          "Auth flows",
          "Network log analysis",
          "JMeter",
        ],
      },
      {
        id: "data",
        icon: "layers",
        title: "Data & ETL",
        evidence: "100+ datasets and 1B+ rows reconciled during the BigQuery migration",
        items: [
          "SQL",
          "Python / Pandas",
          "Schema & row-level validation",
          "Partition-based validation",
          "Hash comparison",
          "Data reconciliation",
          "ETL / migration testing",
          "Google BigQuery",
          "Microsoft Fabric",
          "Cloudera (Impala / Hive)",
        ],
      },
      {
        id: "automation",
        icon: "monitor",
        title: "Automation",
        evidence: "40+ Playwright scripts at Astra, 25+ Tosca modules at BTN",
        items: [
          "Playwright (JavaScript)",
          "Tricentis Tosca",
          "Katalon Studio (Groovy)",
          "Selenium",
          "Gherkin / BDD",
          "pytest",
        ],
      },
      {
        id: "tooling",
        icon: "code",
        title: "Languages & tooling",
        evidence: "Day-to-day across every role listed",
        items: [
          "Python",
          "JavaScript",
          "TypeScript",
          "Groovy",
          "Java",
          "Git",
          "Jira",
          "Confluence",
          "Agile Scrum",
        ],
      },
    ],
  },

  contact: {
    sectionLabel: "Contact",
    email: "insantaufik82@gmail.com",
    headline: "Looking for my next QA role.",
    sub:
      "Software QA Engineer, QA Automation, or Data Quality / ETL Validation — web, mobile, or enterprise data platforms. Email is the fastest way to reach me.",
    links: [
      {
        href: "mailto:insantaufik82@gmail.com",
        label: "insantaufik82@gmail.com",
        icon: "mail",
        external: false,
      },
      {
        href: "https://www.linkedin.com/in/muhamad-insan-taufik",
        label: "LinkedIn",
        icon: "linkedin",
        external: true,
      },
      {
        href: "https://github.com/InsanTaufik",
        label: "GitHub",
        icon: "github",
        external: true,
      },
    ],
  },
};
