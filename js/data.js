/**
 * Single source of truth for portfolio content.
 * Loaded before main.js (see index.html).
 *
 * ─────────────────────────────────────────────────────────────
 * SHAPES THE RENDERER UNDERSTANDS
 *
 * hero.evidence[]       { value, label }
 * hero.layers[]         { id, label, scope, detail }   → the "Where I test" diagram
 *
 * experience.items[]    { period, company, via?, location, role, current?,
 *                         context?, points[], workstreams?, caseStudy? }
 *                       workstreams[] { title, scope, points[], tools[] } render
 *                       open, never behind a toggle — they are the core evidence.
 *                       caseStudy { label, flow[], challenge, approach[], outcome[] }
 *                       renders inside a <details>.
 *
 * projects.featured[]   { title, kind, year?, stack[], summary, why?, built[],
 *                         proves, flow?, repo?, note? }
 * projects.more[]       { title, summary, language, repo }
 *
 * skills.groups[]       { title, where, work[], projects[] }
 *                       work = used professionally; projects = personal projects only.
 *
 * about.paragraphs[]    HTML strings.
 * about.credentials[]   { issuer, name, year, credentialUrl? }
 * ─────────────────────────────────────────────────────────────
 *
 * CONTENT RULES
 * - The updated CV is the source of truth for titles, employers, dates and
 *   figures. Don't add figures it doesn't contain.
 * - Automation at Astra: the Playwright and WebdriverIO/Appium suites were
 *   inherited. Use execute / maintain / investigate — never build / design.
 *   Tosca (BTN) and the personal projects are the user's own work.
 * - CTFL v4.0 is a Udemy course, not a passed ISTQB exam. Never write
 *   "ISTQB-certified".
 */
const CV_URL = "assets/cv/Muhamad_Insan_Taufik_CV_2026.pdf";
const CREDENTIALS_URL =
  "https://drive.google.com/drive/folders/1oRnzUvtwKTr7_nv3gzP8e_B2nmigLzsm?usp=sharing";

const portfolioData = {
  meta: {
    title: "Muhamad Insan Taufik — Software QA Engineer",
    navLogo: "MIT",
    footer: {
      location: "West Jakarta, Indonesia",
      year: 2026,
    },
  },

  cv: {
    href: CV_URL,
    downloadName: "Muhamad_Insan_Taufik_CV.pdf",
  },

  nav: {
    links: [
      { href: "#experience", label: "Experience" },
      { href: "#projects", label: "Projects" },
      { href: "#skills", label: "Skills" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
  },

  hero: {
    status: "Open to QA roles",
    location: "West Jakarta, ID",
    name: "Muhamad Insan Taufik",
    role: "Software QA Engineer",
    tagline: "Manual & automation testing · API · Data validation",
    summary:
      "I test enterprise applications from the screen down to the data. At Astra International I validate a Microsoft Fabric and Cloudera migration into Google BigQuery with SQL and Python, and test the Power BI app built on it across web, Android, iOS and iPadOS.",
    ctas: [
      { href: "#experience", label: "View experience", variant: "primary", icon: "arrow-down" },
      { href: CV_URL, label: "Download CV", variant: "outline", icon: "download", download: true },
    ],
    /* Every figure is stated in the CV as written. No sums across roles. */
    evidence: [
      { value: "1B+", label: "Rows validated across 100+ tables in a BigQuery migration" },
      { value: "99.8%", label: "Row-level hash match between source and target" },
      { value: "200+", label: "Test cases on 15+ embedded Power BI dashboards" },
      { value: "25+", label: "Tricentis Tosca modules built for banking regression" },
    ],
    layersCaption: "Where I test",
    layers: [
      {
        id: "ui",
        label: "Interface",
        scope: "Web · Android · iOS · iPadOS",
        detail: "Functional testing through SIT, UAT and release validation",
      },
      {
        id: "api",
        label: "API",
        scope: "REST · Postman · network logs",
        detail: "Status codes, JSON payloads, authentication and authorization",
      },
      {
        id: "data",
        label: "Data",
        scope: "SQL · Pandas · BigQuery · Fabric · Cloudera",
        detail: "Row counts, schema mapping, keys, precision, row-level hashes",
      },
      {
        id: "bi",
        label: "BI",
        scope: "Power BI Embedded",
        detail: "Hierarchical slicers, filter-state persistence, report loading",
      },
      {
        id: "auto",
        label: "Automation",
        scope: "Playwright · WebdriverIO/Appium · Tosca",
        detail: "Inherited regression suites at Astra; my own Tosca modules and framework projects",
      },
    ],
  },

  experience: {
    title: "Experience",
    intro:
      "Four QA roles since 2024, from banking and capital markets to enterprise BI and data at Astra International.",
    items: [
      {
        period: "Apr 2026 — Present",
        company: "PT Astra International Tbk",
        via: "Assigned through PT Global Lancesoft Indonesia",
        location: "Jakarta, ID",
        role: "Software QA Engineer",
        current: true,
        context:
          "Auto Intelligence is an enterprise BI app built on embedded Power BI reports. I test the app, and I validate the data behind it as it moves from Microsoft Fabric and Cloudera (Impala, Hive) to Google BigQuery.",
        workstreams: [
          {
            title: "Data migration validation",
            scope: "Fabric / Cloudera → BigQuery",
            points: [
              "Validated 100+ enterprise tables (1B+ rows): row counts, schema and data-type mapping, NULLs, duplicates, business keys, and numeric, datetime and timezone precision.",
              "Reconciled source and target with SQL and Python/Pandas, including row-level hash comparison across partitioned data. Result: a 99.8% row-level match.",
            ],
            tools: ["SQL", "Python/Pandas", "BigQuery", "Microsoft Fabric", "Cloudera"],
          },
          {
            title: "Application testing",
            scope: "Web · Android · iOS · iPadOS",
            points: [
              "Tested Auto Intelligence from functional testing through SIT, UAT and release validation.",
              "Designed 200+ test cases on 15+ dashboards for authentication and authorization, hierarchical slicers, filter-state persistence and responsive rendering.",
            ],
            tools: ["Power BI Embedded", "Jira"],
          },
          {
            title: "Automation & defect investigation",
            scope: "Inherited suites · Postman",
            points: [
              "Execute and maintain the inherited Playwright (web) and WebdriverIO/Appium (Android) regression suites, built on the Page Object Model. I investigate their failures and identify reliability fixes such as condition-based waits and resilient locators.",
              "Isolated authorization failures and report-loading defects with Postman and network logs, documented them reproducibly in Jira, and validated the fixes across 3 release cycles.",
            ],
            tools: ["Playwright", "WebdriverIO/Appium", "Postman", "Jira/Xray", "Allure"],
          },
        ],
        caseStudy: {
          label: "How the migration was validated",
          flow: [
            "Row counts",
            "Schema & data types",
            "NULLs · duplicates · keys",
            "Numeric · datetime · timezone precision",
            "Row-level hash per partition",
          ],
          challenge:
            "Moving tables between engines can change types, precision and timezone handling while row counts still match. A count check alone would miss most of that.",
          approach: [
            "Structure first: row counts, then schema and data-type mapping against the source.",
            "Content next: NULLs, duplicates and business-key integrity.",
            "Precision: numeric, datetime and timezone values, where differences between engines tend to surface.",
            "Row level: hash comparison across partitioned data, so a mismatch can be traced to a partition rather than a whole table.",
          ],
          outcome: ["99.8% row-level match across 100+ tables and 1B+ rows."],
        },
      },
      {
        period: "Dec 2025 — Apr 2026",
        company: "PT IDX Solusi Teknologi Informasi",
        location: "Jakarta Selatan, ID",
        role: "Quality Assurance Intern",
        context: "Capital markets · IDX Terminal and HRIS",
        points: [
          "Authored and executed 80+ positive and negative functional and regression test cases for IDX Terminal and HRIS.",
          "Reviewed PRDs with developers, business analysts and UI/UX designers to catch ambiguities before implementation.",
        ],
      },
      {
        period: "Nov 2025 — Dec 2025",
        company: "PT Indivara Group",
        location: "Tangerang, ID",
        role: "Quality Assurance Intern",
        context: "Android app, CMS and Salesforce",
        points: [
          "Designed and executed 100+ functional and regression test cases across an Android app, a CMS and Salesforce.",
          "Found 7 critical defects before production and tracked 20+ in Jira against Gherkin acceptance criteria over 4 Agile sprints.",
        ],
      },
      {
        period: "Jun 2024 — Aug 2024",
        company: "PT Bank Tabungan Negara (Persero) Tbk",
        location: "Jakarta, ID",
        role: "Business Support QA & Testing Intern",
        context: "Banking · corporate internet banking platform",
        points: [
          "Built and maintained 25+ Tricentis Tosca automation modules for recurring regression cycles.",
          "Created and executed 60+ API and regression test cases across 10+ transaction types.",
        ],
      },
    ],
  },

  projects: {
    title: "Projects",
    intro:
      "At work I maintain automation someone else designed. These personal projects are where I build it myself.",
    featured: [
      {
        title: "Java/Selenium Automation Framework",
        kind: "Personal project",
        stack: ["Java", "Selenium", "TestNG", "Maven"],
        summary: "A UI automation framework built from scratch.",
        why: "To learn how a professional framework is put together, rather than only writing tests inside one.",
        built: [
          "Thread-safe parallel execution",
          "Constructor injection",
          "A polymorphic browser interface for cross-browser runs",
        ],
        proves: "Framework construction: concurrency, dependency management and browser abstraction.",
        note: "Code not public yet.",
      },
      {
        title: "Invoice Management API Automation",
        kind: "API automation",
        year: "2025",
        stack: ["Katalon Studio", "Groovy", "REST API"],
        summary:
          "Automated tests for an invoice service's authentication, invoice listing, invoice detail and unbilled-summary endpoints.",
        flow: ["Auth token", "Invoice endpoints", "Status + JSON assertions"],
        built: [
          "Positive and negative tests for every endpoint, asserting HTTP status and JSON payloads",
          "Reusable request and retry handling as Katalon Custom Keywords",
          "Workflow documentation delivered with the suite",
        ],
        proves: "API test design beyond the happy path, and reusable test infrastructure.",
        note: "Code not public.",
      },
    ],
    moreTitle: "More on GitHub",
    more: [
      {
        title: "End-to-end Playwright suite",
        summary:
          "Playwright and TypeScript tests for SauceDemo on the Page Object Model, with shared fixtures and utilities. Written as a technical test.",
        language: "TypeScript",
        repo: "https://github.com/InsanTaufik/ESBTechnicalTest_Muhamad-Insan-Taufik",
      },
      {
        title: "Credit submission & approval workflow",
        summary:
          "A Next.js and NestJS prototype with a server-side approval state machine, role-based access and an audit trail, scoped from BRD, PRD and FSD documents.",
        language: "TypeScript",
        repo: "https://github.com/InsanTaufik/2a_Credit_Application_PDP_BCA_Finance",
      },
      {
        title: "CI/CD pipeline for a Flask API",
        summary:
          "pytest as the gate before promotion, Docker staging to production through GitHub Actions, and Prometheus and Grafana after deploy.",
        language: "Python",
        repo: "https://github.com/InsanTaufik/CI-CD-Practice",
      },
      {
        title: "Sales forecasting app (final-year project)",
        summary:
          "An XGBoost and Streamlit forecast of 12 months of Shopee sales, with data-quality checks on every model input. R² 0.901 on the evaluation set.",
        language: "Python",
        repo: "https://github.com/InsanTaufik/Aplikasi-Prediksi-Shopee",
      },
    ],
  },

  skills: {
    title: "Skills",
    intro: "Grouped as in my CV. Tools I've only used in personal projects are listed separately.",
    workLabel: "At work",
    projectLabel: "Projects only",
    groups: [
      {
        title: "Testing",
        where: "Astra, IDX, Indivara, BTN",
        work: [
          "Functional",
          "Integration",
          "Regression",
          "End-to-end",
          "Smoke",
          "SIT",
          "UAT",
          "Release validation",
          "Test case design",
          "Defect management (Jira/Xray)",
        ],
      },
      {
        title: "Automation",
        where: "Astra (inherited suites), BTN (Tosca)",
        work: [
          "Playwright (JavaScript)",
          "WebdriverIO/Appium",
          "Tricentis Tosca",
          "Page Object Model",
          "Allure",
          "Git",
        ],
        projects: [
          "Selenium (Java, TestNG)",
          "Katalon Studio (Groovy)",
          "Playwright (TypeScript)",
          "pytest",
          "GitHub Actions",
        ],
      },
      {
        title: "API",
        where: "Astra, BTN",
        work: [
          "REST APIs",
          "Postman",
          "HTTP status and JSON validation",
          "Authentication/authorization",
          "Network logs",
        ],
        projects: ["Katalon API automation"],
      },
      {
        title: "Data & BI",
        where: "Astra",
        work: [
          "SQL",
          "Python (Pandas)",
          "Data reconciliation",
          "ETL/migration testing",
          "Google BigQuery",
          "Microsoft Fabric",
          "Cloudera (Impala, Hive)",
          "Power BI Embedded",
        ],
      },
      {
        title: "Ways of working",
        where: "All roles",
        work: ["Agile Scrum", "Gherkin acceptance criteria", "PRD review"],
      },
    ],
  },

  about: {
    title: "How I work",
    paragraphs: [
      "I start from what could be wrong rather than the happy path. On a dashboard that means roles, filters and devices. In a migration it means types, precision and timezones, not only whether the row counts match.",
      "A defect I can't reproduce isn't finished. I work back through the screen, the API response, the query and the partition until the cause is specific enough for a developer to act on, and that evidence goes into the ticket.",
      "I see manual and automated testing as one job. Functional and exploratory testing find the problems; automation keeps them found. At Astra I run and maintain suites I inherited, and my personal projects are where I practise building them.",
    ],
    backgroundTitle: "Education & credentials",
    education: {
      degree: "Bachelor of Information Systems",
      school: "Telkom University",
      period: "Sep 2021 — Aug 2025",
      detail: "GPA 3.68 / 4.00",
    },
    teaching: {
      role: "Teaching Assistant, Data Warehouse & BI",
      place: "Daspro Laboratory, Telkom University",
      period: "May 2025 — Jun 2025",
      detail: "Lab modules and practical sessions on ETL and BI workflows in Pentaho and SQL.",
    },
    credentials: [
      {
        issuer: "BNSP",
        name: "Associate Data Scientist — competency certification",
        year: "2024",
        credentialUrl: CREDENTIALS_URL,
      },
      {
        issuer: "Udemy",
        name: "Certified Tester Foundation Level (CTFL) v4.0 — course",
        year: "2025",
        credentialUrl: CREDENTIALS_URL,
      },
    ],
    languages: "Indonesian (native) · English (professional working proficiency)",
  },

  contact: {
    sectionLabel: "Contact",
    email: "insantaufik82@gmail.com",
    headline: "Looking for my next QA role.",
    sub:
      "Software QA, QA automation or data-quality roles, on web, mobile or data platforms. Email is the fastest way to reach me.",
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
