/**
 * Single source of truth for portfolio content.
 * Loaded before main.js (see index.html).
 *
 * ─────────────────────────────────────────────────────────────
 * OPTIONAL FIELDS (safe to add / omit — the renderer degrades):
 *   hero.stats[].count ........... number to animate the counter to
 *   about.stats[].count .......... same, for the about stat cards
 *   experience.items[].metrics ... [{ value, label }] highlight chips
 *   skills.featured ............. ["Skill name", ...] shown as a top strip
 *   skills.levelLegend ......... { "3": "Advanced", "2": "Working", "1": "Familiar" }
 *   skills.categories[].chips .. string  OR  { name, level: 1|2|3 }
 *   projects.items[].year ...... "2025"
 *   projects.items[].role ...... "Lead QA"
 *   projects.items[].repo ...... "https://github.com/user/repo"
 *   projects.items[].links ..... [{ label, href }]
 *   projects.items[].meta ...... { language, updated }  (baked GitHub data)
 *   certifications.items[].credentialUrl ... "https://..."
 *   contact.email .............. plain address for the "copy" action
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
      { href: "#about", label: "About" },
      { href: "#experience", label: "Experience" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#certifications", label: "Certs" },
      { href: "#contact", label: "Contact" },
    ],
    mobileLinks: [
      { href: "#about", label: "About" },
      { href: "#experience", label: "Experience" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#certifications", label: "Certifications" },
      { href: "#contact", label: "Contact" },
    ],
    cta: { href: "mailto:insantaufik82@gmail.com", label: "Hire Me" },
  },

  hero: {
    eyebrow: "Available for New Roles",
    nameLines: [
      { text: "Muhamad", emphasis: false },
      { text: "Insan", emphasis: true },
      { text: "Taufik", emphasis: false },
    ],
    role: "Software QA Engineer · Functional, API & Data Testing · BI Validation",
    tagline: {
      lead: "I make sure things work and stay working.",
      rest:
        " From functional, API, mobile and web testing to enterprise data-migration and Power BI validation—turning requirements into reliable releases with SQL and Python.",
    },
    ctas: [
      {
        href: "#experience",
        label: "View Experience",
        variant: "primary",
        icon: "chevron-down",
      },
      {
        href: "assets/cv/Muhamad_Insan_Taufik_CV_2026.pdf",
        label: "Download CV",
        variant: "outline",
        icon: "download",
        download: true,
        downloadName: "Muhamad_Insan_Taufik_CV.pdf",
      },
    ],
    stats: [
      { value: "600+", label: "Test Cases Executed", count: 600 },
      { value: "100+", label: "Datasets Validated", count: 100 },
      { value: "5", label: "Industries Tested", count: 5 },
    ],
    terminal: {
      filename: "qa_profile.py",
      comment: "# QA Engineer Profile",
      pairs: [
        { key: "name", value: '"Muhamad Insan Taufik"' },
        { key: "role", value: '"Software QA Engineer"' },
        { key: "location", value: '"Tangerang Selatan, ID"' },
      ],
      skillsComment: "# Core Capabilities",
      skills: [
        '"Functional & API Testing"',
        '"Data Validation & ETL QA"',
        '"Power BI Embedded Testing"',
        '"SQL · Python · Pandas"',
        '"Playwright · Selenium · Tosca"',
      ],
      statusComment: "# Status",
      statusLine: {
        key: "status",
        value: '"open_to_opportunities"',
        valueClass: "t-green",
      },
    },
  },

  strengths: [
    "Functional & Regression Testing",
    "API & Integration Testing",
    "Mobile & Web Testing",
    "Power BI Embedded Testing",
    "ETL & Data Migration QA",
    "SQL & Python / Pandas Automation",
    "SIT · UAT · Release Validation",
    "Root Cause Analysis",
    "Playwright Test Automation",
    "Agile / Scrum Delivery",
  ],

  about: {
    sectionLabel: "About",
    titleLines: ["Detail-oriented.", "Data-driven.", "Reliable."],
    paragraphs: [
      "I'm an <strong>ISTQB-certified Software QA Engineer</strong> who enjoys breaking things before users ever see them. My work spans functional, regression, API, integration, mobile, web, and embedded-BI testing—plus large-scale data-migration and ETL validation.",
      "I hold a <strong>Bachelor of Information Systems</strong> from Telkom University (GPA 3.68/4.00) and have tested across banking, capital markets, automotive, FMCG, and enterprise data platforms at companies including <strong>PT Astra International</strong> and <strong>PT IDX Solusi Teknologi Informasi</strong>.",
      "I've validated <strong>100+ enterprise datasets</strong> and <strong>600+ test cases</strong>, reconciling data with SQL and a Python/Pandas automation framework and tracing schema, duplication, and precision mismatches to their root causes. I collaborate closely with data engineers, backend engineers, BAs, product owners, and DevOps teams. English: professional working proficiency.",
    ],
    badge: "Currently open to QA & Data roles",
    stats: [
      { value: "3.68", label: "GPA · Telkom University", html: false, count: 3.68 },
      {
        value: "99.8%",
        label: "Row-level hash-match accuracy at Astra",
        html: false,
        count: 99.8,
      },
      {
        value: "600+",
        label: "Test cases across functional, API, BI & UAT",
        html: false,
        count: 600,
      },
      {
        value: 'R²<br><span class="asc-num-sub">0.901</span>',
        label: "Forecasting Model Accuracy",
        html: true,
      },
      {
        value: "35+",
        label: "Defects Documented with Root Cause at Astra",
        html: false,
        count: 35,
      },
      {
        value: "ISTQB",
        label: "Certified Tester Foundation Level (CTFL v4.0)",
        html: false,
      },
    ],
  },

  experience: {
    sectionLabel: "Experience",
    titleLines: ["Where I've Made", "an Impact"],
    items: [
      {
        period: "Apr 2026 — Present",
        company: "PT Astra International Tbk",
        location: "Jakarta, ID",
        role: "Product Quality Assurance",
        description:
          "Data-quality validation and end-to-end QA for the Auto Intelligence platform during a Microsoft Fabric and Cloudera to Google BigQuery migration across five business units (Daihatsu, Toyota, Honda, Lexus, and Business Sales Operations).",
        metrics: [
          { value: "100+", label: "Enterprise datasets validated" },
          { value: "99.8%", label: "Row-level hash-match accuracy" },
          { value: "1B+", label: "Rows under partition-based validation" },
          { value: "200+", label: "SIT / UAT / regression test cases" },
        ],
        highlights: [
          "Validated 100+ enterprise datasets across five business units, achieving 99.8% row-level hash-match accuracy with SQL reconciliation and Python/Pandas automation",
          "Maintained 40+ Playwright (JavaScript) automation scripts for the Auto Intelligence App, cutting flaky failures by 30% through root-cause fixes and test-data updates",
          "Applied partition-based validation across transactional datasets up to 1B+ rows, resolving schema mismatches and duplicates — 25% fewer discrepancies and 40% faster validation queries",
          "Tested 15+ embedded Power BI dashboards across Web, Android, and iOS in DEV, STG, and Prod-like environments",
          "Ran SIT, UAT, regression, functional, and integration testing across 200+ test cases covering API integrations, auth flows, report rendering, filters, slicers, and refresh",
          "Documented 35+ Jira defects for dashboard performance and API dependencies, each with reproduction steps, expected/actual results, and root cause analysis",
          "Partnered with data engineers, backend engineers, BAs, and external vendors to drive defect resolution and release validation across 3 release cycles",
        ],
        tags: ["Python", "Pandas", "BigQuery", "SQL", "Playwright", "Power BI Embedded"],
      },
      {
        period: "Dec 2025 — Apr 2026",
        company: "PT IDX Solusi Teknologi Informasi",
        location: "Jakarta Selatan, ID",
        role: "Quality Assurance Intern",
        description:
          "Functional and regression testing across five capital-market and enterprise systems: IDX Terminal, KPEI Administration, HRIS, SSL/SFTP, and PME.",
        metrics: [
          { value: "80+", label: "Functional & regression test cases" },
          { value: "6", label: "Functional defects identified" },
          { value: "50%", label: "Ambiguous requirements cut in grooming" },
        ],
        highlights: [
          "Authored and ran 80+ functional and regression test cases for IDX Terminal and HRIS, covering positive and negative scenarios from functional requirements",
          "Groomed PRDs with developers, BAs, and UI/UX designers, reducing ambiguous and redundant requirements by up to 50% before development",
          "Translated Functional Specification Documents into structured, traceable test scenarios",
          "Identified six functional defects and performed defect validation, regression, and UAT across Agile sprints",
        ],
        tags: ["Functional Testing", "Regression", "FSD Analysis", "UAT", "Jira"],
      },
      {
        period: "Nov 2025 — Dec 2025",
        company: "PT Indivara Group",
        location: "Tangerang, ID",
        role: "Quality Assurance Intern",
        description:
          "QA across four Agile-delivered FMCG applications in the Bersama distribution ecosystem — Bersama App (Android), Bersama Web Monitoring (CMS), and Victory Web (Salesforce).",
        metrics: [
          { value: "100+", label: "Functional & regression test cases" },
          { value: "7", label: "Critical defects before production" },
          { value: "20+", label: "Defects tracked to closure" },
          { value: "4", label: "Agile sprints" },
        ],
        highlights: [
          "Developed and executed 100+ functional and regression test cases across Bersama App, Web Monitoring, and Victory Web, identifying 7 critical defects before production release",
          "Tracked and closed 20+ Jira defects using Gherkin-based acceptance criteria",
          "Collaborated with product owners, developers, and DevOps engineers across 4 Agile sprints",
        ],
        tags: ["Mobile Testing", "Gherkin", "Jira", "Scrum", "Manual Testing"],
      },
      {
        period: "May 2025 — Jun 2025",
        company: "Daspro Laboratory, Telkom University",
        location: "Bandung, ID",
        role: "Teaching Assistant — Data Warehouse & BI",
        description:
          "Designed and delivered lab modules for the Data Warehouse and Business Intelligence course using Pentaho and SQL.",
        metrics: [{ value: "90%+", label: "Students achieving strong grades" }],
        highlights: [
          "Designed lab modules, exercises, and Q&A materials for Data Warehouse and BI coursework",
          "Guided students in building ETL and BI workflows with Pentaho and SQL",
          "Ran practical sessions on data validation and BI analysis",
        ],
        tags: ["SQL", "Pentaho", "ETL", "BI"],
      },
      {
        period: "Jun 2024 — Aug 2024",
        company: "PT Bank Tabungan Negara (Persero) Tbk",
        location: "Jakarta, ID",
        role: "Business Support Intern — QA & Testing",
        description:
          "QA for BTN's Corporate Internet Banking platform — backend services, transaction data, and business-rule logic.",
        metrics: [
          { value: "60+", label: "Regression & API test cases" },
          { value: "25+", label: "Tricentis Tosca automation modules" },
          { value: "80%", label: "Manual regression effort reduced" },
        ],
        highlights: [
          "Created and validated 60+ regression and API test cases covering 10+ banking transaction types",
          "Built and maintained 25+ Tricentis Tosca automation modules, cutting manual regression effort by 80% per cycle",
          "Validated backend services, transaction data, and business-rule logic across banking workflows",
          "Prepared structured test plans and defect documentation",
        ],
        tags: ["Postman", "API Testing", "Tosca", "Regression", "SQL"],
      },
    ],
  },

  skills: {
    sectionLabel: "Skills & Tools",
    title: "Technical Arsenal",
    levelLegend: { 3: "Advanced", 2: "Working", 1: "Familiar" },
    featured: [
      "Functional Testing",
      "API Testing",
      "ETL / Data Validation",
      "SQL",
      "Python",
      "Power BI Embedded",
    ],
    categories: [
      {
        icon: "check-circle",
        title: "Testing & QA",
        delayClass: "",
        gridSpan: 1,
        chips: [
          { name: "Functional Testing", level: 3 },
          { name: "Regression Testing", level: 3 },
          { name: "API Testing", level: 3 },
          { name: "Integration Testing", level: 2 },
          { name: "Mobile Testing", level: 2 },
          { name: "Web Testing", level: 3 },
          { name: "Embedded BI Testing", level: 2 },
          { name: "ETL / Data Validation", level: 3 },
          { name: "SIT", level: 2 },
          { name: "UAT", level: 3 },
          { name: "Test Case Design", level: 3 },
          { name: "Defect Management", level: 3 },
          { name: "Root Cause Analysis", level: 3 },
        ],
      },
      {
        icon: "monitor",
        title: "Automation & Tools",
        delayClass: "reveal-delay-1",
        gridSpan: 1,
        chips: [
          { name: "Postman", level: 3 },
          { name: "Playwright", level: 2 },
          { name: "Selenium", level: 2 },
          { name: "Tricentis Tosca", level: 2 },
          { name: "JMeter", level: 2 },
          { name: "TestRail", level: 2 },
          { name: "Jira", level: 3 },
          { name: "Git", level: 2 },
          { name: "Gherkin (BDD)", level: 2 },
        ],
      },
      {
        icon: "code",
        title: "Programming & Database",
        delayClass: "reveal-delay-2",
        gridSpan: 1,
        chips: [
          { name: "SQL", level: 3 },
          { name: "Python", level: 3 },
          { name: "Pandas", level: 3 },
          { name: "JavaScript", level: 2 },
          { name: "TypeScript", level: 1 },
          { name: "Java", level: 1 },
        ],
      },
      {
        icon: "layers",
        title: "Data & BI Platforms",
        delayClass: "reveal-delay-1",
        gridSpan: 2,
        chips: [
          { name: "Google BigQuery (GCP)", level: 2 },
          { name: "Microsoft Fabric (Azure)", level: 2 },
          { name: "Cloudera / Impala", level: 2 },
          { name: "Power BI Embedded", level: 2 },
          { name: "Pentaho", level: 2 },
          { name: "Partition-based Validation", level: 3 },
          { name: "Multi-threaded Validation", level: 3 },
        ],
      },
      {
        icon: "users",
        title: "Methodologies & Collaboration",
        delayClass: "",
        gridSpan: 1,
        chips: [
          { name: "Agile Scrum", level: 3 },
          { name: "SDLC", level: 2 },
          { name: "STLC", level: 2 },
          { name: "CI/CD Fundamentals", level: 1 },
          { name: "Requirements / FSD Analysis", level: 3 },
          { name: "Cross-functional Collaboration", level: 3 },
          { name: "Test Planning", level: 3 },
        ],
      },
    ],
  },

  projects: {
    sectionLabel: "Projects",
    title: "Built & Validated",
    items: [
      {
        featured: true,
        eyebrow: "Final-Year Project · 2025",
        year: "2025",
        role: "Solo build · Data & QA",
        repo: "https://github.com/InsanTaufik/Aplikasi-Prediksi-Shopee",
        meta: { language: "Python", updated: "Jul 2025" },
        title: "Sales & Inventory Forecasting System",
        description:
          "A Streamlit web app that forecasts 12 months of product sales with an XGBoost pipeline using iterative prediction, seasonal analysis, and lag features. Data preprocessing, transformation, and automated validation scripts protect the integrity of every model input.",
        stack: ["Python", "XGBoost", "Streamlit", "Pandas", "SQL", "Scikit-learn"],
        metrics: [
          { value: "0.901", label: "R² Score" },
          { value: "<10%", label: "MAPE Error" },
        ],
        bullets: [
          "Deployed as an interactive Streamlit app for real-time stock-forecasting decisions",
          "Automated data-quality checks embedded to validate the forecasting pipeline",
          "Preprocessing and validation mirror production QA methodology",
        ],
      },
      {
        featured: false,
        eyebrow: "Test Automation · 2026",
        year: "2026",
        role: "Playwright framework",
        repo: "https://github.com/InsanTaufik/ESBTechnicalTest_Muhamad-Insan-Taufik",
        meta: { language: "TypeScript", updated: "Aug 2026" },
        title: "End-to-End Test Automation Framework",
        description:
          "A maintainable Playwright + TypeScript automation suite for SauceDemo built on the Page Object Model, with reusable fixtures, utilities, and automated assertions across core user journeys.",
        stack: ["Playwright", "TypeScript", "Page Object Model", "CI"],
      },
      {
        featured: false,
        eyebrow: "Full-Stack + QA · 2026",
        year: "2026",
        role: "Workflow simulation",
        repo: "https://github.com/InsanTaufik/2a_Credit_Application_PDP_BCA_Finance",
        meta: { language: "TypeScript", updated: "Aug 2026" },
        title: "Digital Credit Submission & Approval Workflow",
        description:
          "A production-like credit-application prototype: submission → validation → multi-level approval → back office → document generation → e-sign → auditable disbursement, with a strict server-side state machine, RBAC, and a full audit trail. Scope driven by BRD / PRD / FSD.",
        stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Playwright", "TypeScript"],
        delayClass: "reveal-delay-1",
      },
      {
        featured: false,
        eyebrow: "DevOps for QA · 2026",
        year: "2026",
        role: "Solo build",
        repo: "https://github.com/InsanTaufik/CI-CD-Practice",
        meta: { language: "Python", updated: "Mar 2026" },
        title: "CI/CD Pipeline Practice — Flask API",
        description:
          "A minimal Flask REST API wired to a full CI/CD pipeline: pytest unit and edge-case suites, Docker staging → production promotion, GitHub Actions, feature-flag rollout, and Prometheus + Grafana observability.",
        stack: ["Python", "Flask", "Docker", "GitHub Actions", "pytest", "Prometheus"],
      },
      {
        featured: false,
        eyebrow: "Coding Camp · 2025",
        year: "2025",
        role: "Mini project",
        repo: "https://github.com/InsanTaufik/CodingCamp-7Nov2025-muhamadinsantaufik",
        meta: { language: "HTML", updated: "Nov 2025" },
        title: "Personal Profile Website",
        description:
          "A responsive multi-page personal profile site built with vanilla HTML, CSS, and JavaScript during a 5-day RevoU coding camp.",
        stack: ["HTML", "CSS", "JavaScript"],
        delayClass: "reveal-delay-1",
      },
    ],
  },

  certifications: {
    sectionLabel: "Certifications",
    title: "Validated Expertise",
    items: [
      {
        issuer: "Udemy",
        name: "Certified Tester Foundation Level (CTFL) v4.0 Course Completion",
        year: "Course · 2025",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
        delayClass: "",
      },
      {
        issuer: "BNSP",
        name: "Associate Data Scientist",
        year: "Competent · 2024",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
        delayClass: "reveal-delay-1",
      },
      {
        issuer: "HackerRank",
        name: "Python (Basic)",
        year: "2026",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
        delayClass: "reveal-delay-2",
      },
      {
        issuer: "HackerRank",
        name: "SQL (Basic)",
        year: "2026",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
        delayClass: "reveal-delay-3",
      },
      {
        issuer: "HackerRank",
        name: "Java (Basic)",
        year: "2026",
        credentialUrl:
          "https://drive.google.com/drive/folders/1KEd6lMcrQ5Ege-8LnrL_rR9lywujZB47?usp=sharing",
        delayClass: "reveal-delay-4",
      },
    ],
  },

  contact: {
    sectionLabel: "Contact",
    email: "insantaufik82@gmail.com",
    headline: {
      before: "Where others see code,",
      emphasis: "I seek certainty",
      after: "before it meets the world.",
    },
    sub:
      "I'm open to Software QA Engineer, QA Automation, and Data Quality / ETL Validation roles across web, mobile, and enterprise data platforms. Let's talk.",
    links: [
      {
        href: "mailto:insantaufik82@gmail.com",
        label: "Email Me",
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
