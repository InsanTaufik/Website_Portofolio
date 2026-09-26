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
 * experience.items[]    { period, company, via?, location, role, context, proof?,
 *                         metrics[{value,label}], approach[], findings[],
 *                         tags[] }
 *                       via = staffing / contracting employer, shown under the
 *                       company. approach/findings render inside a <details>.
 *
 * projects.carousel     { label?, autoplay, intervalMs }
 *                       autoplay is currently off so visitors control reading pace.
 * projects.items[]      { featured?, eyebrow, year?, role, title, summary, proof?,
 *                         stack[], repo?, links[{label,href}],
 *                         meta{language,updated?},
 *                         image?  { src, alt, width, height } → lazy-loaded,
 *                                 alt is required unless the image is decorative
 *                         problem?, approach[], result[],
 *                         flow[]  → ["Source", "Step", "Target"] diagram
 *                         metrics[{value,label}] }
 *                       One slide each, in order. Keep the list at 4+ slides so
 *                       the carousel has an offscreen slot to wrap through.
 *
 * Wording rule for automation: the Playwright and WebdriverIO/Appium suites at
 * Astra were inherited (handed over), not built. Use execute / maintain /
 * investigate / troubleshoot / surface improvements — never build / design /
 * architect. Only the Java/Selenium project is "built from scratch".
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
      location: "West Jakarta, Indonesia",
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
    location: "West Jakarta, ID",
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
    /* Every figure traces to the CV. 440+ is the sum of the per-role floors:
       200+ Astra, 80+ IDX, 100+ Indivara, 60+ BTN. The CV names four
       domains: Banking, Capital Markets, Automotive, FMCG. */
    evidence: [
      { value: "440+", label: "Test cases designed", count: 440 },
      { value: "100+", label: "Enterprise tables validated", count: 100 },
      { value: "1B+", label: "Rows reconciled" },
      { value: "4", label: "Industries", count: 4 },
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
        scope: "SQL · Pandas · BigQuery · Fabric · Cloudera",
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
        scope: "Playwright · WebdriverIO/Appium · Tosca · Katalon",
        detail: "Running and maintaining inherited web and Android regression suites, plus Tosca and Katalon automation of my own",
      },
    ],
  },

  about: {
    sectionLabel: "About",
    title: "Background",
    paragraphs: [
      "I'm an <strong>ISTQB-certified Software QA Engineer</strong> based in West Jakarta. Most of my work sits where an application meets its data: functional and regression testing on the front end, REST checks in the middle, and SQL and Python reconciliation against the warehouse behind it.",
      "I hold a <strong>Bachelor of Information Systems</strong> from Telkom University (GPA 3.68/4.00). Since 2024 I've tested in banking, capital markets, automotive, and FMCG, at <strong>PT Astra International Tbk</strong> (via PT Global Lancesoft Indonesia), <strong>PT IDX Solusi Teknologi Informasi</strong>, <strong>PT Indivara Group</strong>, and <strong>PT Bank Tabungan Negara (Persero) Tbk</strong>.",
      "On the automation side, the <strong>Playwright (web) and WebdriverIO/Appium (Android) suites at Astra were handed over to me</strong>. I execute and maintain them, investigate failures, and surface reliability improvements such as condition-based waits and resilient locators. The framework I built from scratch is a Java/Selenium learning project, listed under Projects.",
      "The part I like most is the investigation: a row count that doesn't match, or a dashboard that renders on desktop but not on an iPad, then working back through the API, the query, and the partition until the cause is specific enough to put in a ticket. I collaborate with Developers, Business Analysts, and Product teams across Agile delivery. English: professional working proficiency.",
    ],
    badge: "Open to QA & data quality roles",
    facts: [
      { value: "3.68", label: "GPA · Telkom University, Information Systems", count: 3.68 },
      { value: "99.8%", label: "Row-level hash match across partitioned datasets at Astra", count: 99.8 },
      { value: "35+", label: "Jira defects documented with full reproduction evidence at Astra", count: 35 },
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
    disclosureLabel: "View approach & findings",
    items: [
      {
        period: "Apr 2026 — Present",
        company: "PT Astra International Tbk",
        via: "via PT Global Lancesoft Indonesia",
        location: "Jakarta, ID",
        role: "Software QA Engineer",
        current: true,
        context:
          "Auto Intelligence is an enterprise BI application that embeds Power BI reports. I test it across Web, Android, iOS, and iPadOS, and I validated the data behind it while it moved from Microsoft Fabric and Cloudera (Impala/Hive) to Google BigQuery.",
        proof: "35+ defects documented with reproduction evidence across three release cycles.",
        metrics: [
          { value: "100+", label: "Enterprise tables validated" },
          { value: "99.8%", label: "Row-level hash match" },
          { value: "1B+", label: "Rows validated" },
          { value: "200+", label: "Test cases designed" },
        ],
        approach: [
          "SQL and Python/Pandas reconciliation of 100+ enterprise tables (1B+ rows) in the migration: row counts, schema and data type mapping, NULLs, duplicates, business keys, and numeric, datetime, and timezone precision.",
          "Functional, integration, regression, smoke, SIT, UAT, and release validation for Auto Intelligence across Web, Android, iOS, and iPadOS.",
          "200+ test cases designed for authentication/authorization, hierarchical slicers, filter-state persistence, and responsive rendering on 15+ dashboards.",
          "Executing and maintaining the inherited Playwright (Web) and WebdriverIO/Appium (Android) regression suites, which open the embedded Power BI reports per role and environment and check that they load without a visual error. The suites follow the Page Object Model, use custom fixtures, and report through Allure and Jira/Xray.",
        ],
        findings: [
          "99.8% row-level hash match across partitioned datasets.",
          "Authorization failures and report-loading defects isolated through Postman and network log analysis.",
          "35+ defects documented in Jira with full reproduction evidence, driving confirmation and release validation across 3 release cycles.",
          "When the inherited suites fail, I investigate the failure and surface reliability improvements such as condition-based waits and resilient locators.",
        ],
        tags: ["Python", "Pandas", "SQL", "BigQuery", "Microsoft Fabric", "Cloudera", "Playwright", "WebdriverIO", "Appium", "Postman", "Power BI Embedded", "Jira"],
      },
      {
        period: "Dec 2025 — Apr 2026",
        company: "PT IDX Solusi Teknologi Informasi",
        location: "Jakarta Selatan, ID",
        role: "Quality Assurance Intern",
        context:
          "Functional and regression testing for IDX Terminal and HRIS, working from functional requirements and PRDs.",
        proof: "Clarified ambiguous PRD requirements with developers, analysts, and designers.",
        metrics: [{ value: "80+", label: "Functional & regression cases" }],
        approach: [
          "Authored and executed 80+ functional and regression test cases for IDX Terminal and HRIS, deriving positive and negative scenarios from functional requirements.",
          "Groomed PRDs with Developers, Business Analysts, and UI/UX Designers to surface ambiguous requirements before development.",
        ],
        tags: ["Functional Testing", "Regression", "Test Case Design", "PRD Grooming"],
      },
      {
        period: "Nov 2025 — Dec 2025",
        company: "PT Indivara Group",
        location: "Tangerang, ID",
        role: "Quality Assurance Intern",
        context:
          "Functional and regression testing across an Android app, a CMS, and a Salesforce platform, delivered in Agile sprints.",
        proof: "Identified seven critical defects before production.",
        metrics: [
          { value: "100+", label: "Functional & regression cases" },
          { value: "7", label: "Critical defects pre-production" },
          { value: "20+", label: "Defects tracked in Jira" },
          { value: "4", label: "Agile sprints" },
        ],
        approach: [
          "Designed and executed 100+ functional and regression test cases across an Android app, a CMS, and a Salesforce platform.",
          "Tracked 20+ defects in Jira using Gherkin-based acceptance criteria across 4 Agile sprints.",
        ],
        findings: ["Identified 7 critical defects before production."],
        tags: ["Mobile Testing", "Android", "Gherkin", "Jira", "Scrum"],
      },
      {
        period: "May 2025 — Jun 2025",
        company: "Daspro Laboratory, Telkom University",
        location: "Bandung, ID",
        role: "Teaching Assistant — Data Warehouse & BI",
        context:
          "Lab modules for the Data Warehouse and Business Intelligence course, taught with Pentaho and SQL.",
        proof: "Taught ETL and BI workflows in Pentaho and SQL.",
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
        role: "Business Support QA & Testing Intern",
        context:
          "API and regression testing for a Corporate Internet Banking platform, plus Tricentis Tosca automation for its recurring regression cycles.",
        proof: "Built and maintained 25+ Tosca modules for recurring regression.",
        metrics: [
          { value: "60+", label: "API & regression cases" },
          { value: "10+", label: "Transaction types" },
          { value: "25+", label: "Tosca automation modules" },
        ],
        approach: [
          "Created and executed 60+ API and regression test cases across 10+ transaction types.",
          "Built and maintained 25+ Tricentis Tosca automation modules supporting recurring regression cycles.",
        ],
        tags: ["API Testing", "Regression", "Tricentis Tosca"],
      },
    ],
  },

  projects: {
    sectionLabel: "Projects",
    title: "Projects",
    intro:
      "Things I built, and what I checked before trusting them. Repositories are linked where they're public.",
    disclosureLabel: "View case study",
    carousel: {
      label: "Project highlights",
      autoplay: false,
      intervalMs: 8000,
    },
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
        proof: "Checked every model input for data quality before training.",
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
        /* Personal project, straight from the CV. Built from scratch — the one
           framework here that is. No public repo, so no link. */
        eyebrow: "Test automation",
        role: "Personal project",
        meta: { language: "Java" },
        title: "Java/Selenium Automation Framework",
        summary:
          "A test automation framework built from scratch to learn professional framework architecture: thread-safe parallel execution, constructor injection, and a polymorphic browser interface for cross-browser support.",
        stack: ["Java", "Maven", "TestNG", "Selenium"],
      },
      {
        eyebrow: "API test automation",
        year: "2025",
        role: "Solo build",
        meta: { language: "Groovy", updated: "2025" },
        title: "Invoice Management API Automation",
        summary:
          "A Katalon Studio suite for the authentication, invoice listing, invoice detail, and unbilled summary endpoints, with positive and negative scenarios for HTTP status codes and JSON payloads.",
        proof: "Covered positive and negative responses for HTTP status and JSON payloads.",
        flow: ["Auth token", "Invoice endpoints", "Assertions"],
        problem:
          "Four related endpoints, each needing negative as well as positive coverage of status codes and JSON payloads.",
        approach: [
          "Positive and negative scenarios for every endpoint, covering HTTP status codes and JSON payloads.",
          "Reusable request and retry handling implemented as Katalon Custom Keywords, so each test reads as intent rather than plumbing.",
        ],
        result: ["Workflow documentation delivered with the suite."],
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
        proof: "Kept selectors in one page object per screen.",
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
        proof: "Enforced approval stages on the server so clients cannot skip ahead.",
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
        proof: "Used pytest as a gate before promotion to production.",
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
        evidence: "Test cases designed at Astra (200+), IDX (80+), Indivara (100+), and BTN (60+)",
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
        evidence: "15+ embedded dashboards tested on Web, Android, iOS, and iPadOS at Astra",
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
        evidence: "100+ enterprise tables (1B+ rows) validated during the BigQuery migration",
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
        evidence: "Astra: executing and maintaining inherited Playwright and WebdriverIO/Appium suites. BTN: 25+ Tosca modules built",
        items: [
          "Playwright (JavaScript)",
          "WebdriverIO / Appium",
          "Page Object Model",
          "Custom fixtures",
          "Allure reporting",
          "Jira / Xray integration",
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
