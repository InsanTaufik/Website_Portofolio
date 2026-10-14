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
 * - List CTFL v4.0 as an ISTQB certification, as stated in the current CV.
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
    tagline: "Functional · API · Mobile & web testing · Data quality & BI validation",
    summary:
      "Software QA Engineer combining web, mobile and API testing with data quality validation in SQL, Python/Pandas and SAP GUI Scripting. I validate a 1B+ row Fabric/Cloudera-to-BigQuery migration and am building SAP-to-A1 customer data validation automation at PT Astra International Tbk.",
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
    layersCaption: "QA coverage",
    layers: [
      {
        id: "product",
        label: "Product QA",
        scope: "Web · Android · iOS · iPadOS",
        detail: "Functional, SIT, UAT, release and regression testing",
      },
      {
        id: "api",
        label: "API",
        scope: "REST · Postman · App logs",
        detail: "Authentication, JSON payloads, defects and fix validation",
      },
      {
        id: "data",
        label: "Data quality",
        scope: "SQL · Python/Pandas · SAP GUI",
        detail: "Cross-system reconciliation and migration validation",
      },
      {
        id: "automation",
        label: "Automation",
        scope: "Playwright · WebdriverIO/Appium · Tosca",
        detail: "Inherited suites, banking regression and reliability improvements",
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
        role: "Product QA / Software QA Engineer",
        current: true,
        context:
          "Data quality and cross-system validation at Astra: SAP to A1 (Azure SQL), Fabric / Cloudera to BigQuery, and product QA for ODYSSEUS / Auto Intelligence, an enterprise BI app embedding Power BI reports.",
        workstreams: [
          {
            title: "SAP GUI & customer data validation",
            scope: "Extract → Match → Validate",
            points: [
              "Extracted A1 data through Azure SQL and SAP data from KNA1, KNB1 and ZPYGSDDT00816 using VBScript/SAP GUI.",
              "Matched unique CustomerNo values with batched Python/Pandas workflows and flexible SAP-to-A1 field mapping.",
              "Validated duplicates, missing records, blanks and field mismatches; investigated about 1,000 UAT discrepancies.",
            ],
            tools: ["SAP GUI Scripting", "VBScript", "Azure SQL", "Python/Pandas"],
          },
          {
            title: "MAGNUM — data migration QA",
            scope: "Extract → Compare → Reconcile",
            points: [
              "Compared Fabric/Cloudera source data with BigQuery across five business units, 100+ tables and 1B+ rows.",
              "Validated schemas, counts, business keys, duplicates, NULLs, numeric precision and date-time values with SQL and multithreaded Python/Pandas.",
              "Applied SHA-2 row-level hashes across partitions and recorded a 99.8% row match.",
            ],
            tools: ["SQL", "Python/Pandas", "BigQuery", "Microsoft Fabric", "Cloudera"],
          },
          {
            title: "ODYSSEUS — Auto Intelligence",
            scope: "Design → Execute → Investigate → Regression",
            points: [
              "Tested web and mobile apps through functional, SIT, UAT, release and regression cycles; designed 200+ cases across 15+ dashboards.",
              "Validated APIs, authentication, dashboard data, hierarchical filters and responsive behavior with Postman, logs and network inspection.",
              "Maintained inherited Playwright and WebdriverIO/Appium suites, investigated failures, and supported Power BI source-to-dashboard validation.",
            ],
            tools: ["Power BI Embedded", "Playwright", "WebdriverIO/Appium", "Postman", "Jira/Xray"],
          },
        ],
      },
      {
        period: "Dec 2025 — Apr 2026",
        company: "PT IDX Solusi Teknologi Informasi",
        location: "Jakarta Selatan, ID",
        role: "Quality Assurance Intern",
        context: "Capital markets · IDX Terminal, KPEI, HRIS and SSL/SFTP",
        points: [
          "Tested IDX Terminal, KPEI PME/SBL, KPEI Administration, HRIS and SSL/SFTP modules; wrote and ran 80+ functional and regression cases from PRDs, FSDs and backlogs.",
          "Found 6 functional defects in IDX Terminal after backend changes and supported retests and UAT.",
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
      "My professional work includes inherited automation suites; these projects show how I build deeper automation and API testing experience.",
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
        note: "Code not public yet.",
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
          "SAP GUI Scripting (VBScript)",
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
          "Network inspection and application logs",
        ],
        projects: ["Katalon API automation"],
      },
      {
        title: "Data & BI",
        where: "Astra",
        work: [
          "SQL",
          "Python (Pandas)",
          "Data quality validation",
          "Cross-system reconciliation",
          "Migration testing",
          "Google BigQuery",
          "Azure SQL",
          "Microsoft Fabric",
          "Cloudera (Impala, Hive)",
          "Power BI Embedded",
          "SAP GUI Scripting",
          "SHA-2 row-level hashing",
          "Elasticsearch (basic exposure)",
          "Kafka (basic exposure)",
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
      "I start from what could be wrong rather than the happy path. On a dashboard that means roles, filters, device behavior and API responses. In a data migration it means types, precision, null handling and record-level validation, not only whether the row counts match.",
      "A defect I can't reproduce isn't finished. I work back through the screen, the API call, the query and the data flow until the cause is specific enough for a developer to act on, and that evidence goes into the ticket.",
      "I combine manual and automated testing as one quality practice. At Astra I validate cross-system data and embedded BI reports, while also maintaining inherited Playwright and WebdriverIO/Appium suites. My personal work is focused on building stronger automation and deeper QA depth in the areas I work on every day.",
    ],
    backgroundTitle: "Education & credentials",
    education: {
      degree: "Bachelor of Information Systems",
      school: "Telkom University",
      period: "Sep 2021 — Aug 2025",
      detail: "GPA 3.68 / 4.00",
    },
    credentials: [
      {
        issuer: "BNSP",
        name: "Associate Data Scientist — competency certification",
        year: "2024",
        credentialUrl: CREDENTIALS_URL,
      },
      {
        issuer: "ISTQB",
        name: "Certified Tester Foundation Level (CTFL) v4.0",
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
      "Software QA, QA automation and data-quality roles across web, mobile and data platforms. Email is the fastest way to reach me.",
    links: [
      {
        href: "mailto:insantaufik82@gmail.com",
        label: "insantaufik82@gmail.com",
        icon: "mail",
        external: false,
      },
      {
        href: "tel:+6281380294349",
        label: "081380294349",
        icon: "phone",
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
