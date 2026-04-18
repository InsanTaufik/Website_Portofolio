/**
 * Single source of truth for portfolio content.
 * Loaded before main.js (see index.html).
 */
const portfolioData = {
  meta: {
    title: "Muhamad Insan Taufik — QA Specialist",
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
    role:
      "Software QA Specialist · QA Engineer · Data-Oriented Tester",
    tagline: {
      lead: "I make sure things work and stay working.",
      rest: " Turning requirements into reliable systems—through functional testing, data validation, API testing, and an analytical mindset.",
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
      { value: "5+", label: "Roles & Internships" },
      { value: "100+", label: "Test Cases Written" },
      { value: "20+", label: "Tools Mastered" },
    ],
    terminal: {
      filename: "qa_profile.py",
      comment: "# QA Specialist Profile",
      pairs: [
        { key: "name", value: '"Muhamad Insan Taufik"' },
        { key: "role", value: '"Product Quality Assurance"' },
        { key: "location", value: '"Tangerang Selatan, ID"' },
      ],
      skillsComment: "# Core Capabilities",
      skills: [
        '"Data Validation"',
        '"Functional Testing"',
        '"API Testing"',
        '"SQL · Python"',
        '"Automation Basics"',
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
    "API & Backend Validation",
    "Data Migration QA",
    "SQL & Python Automation",
    "Clear Documentation",
    "Agile / Scrum Workflows",
    "ETL & Data Pipeline QA",
    "Defect Analysis & Reporting",
  ],

  about: {
    sectionLabel: "About",
    titleLines: ["Detail-oriented.", "Data-driven.", "Reliable."],
    paragraphs: [
      "I'm a Software QA Specialist who enjoys <strong>breaking things before users ever see them</strong>. My work spans functional testing, regression cycles, API validation, and large-scale data migration QA—always with a structured, analytical mindset.",
      "I hold a <strong>Bachelor of Information System</strong> from Telkom University (GPA 3.68/4.00) and have gained hands-on experience across fintech, capital markets, FMCG platforms, and enterprise data infrastructure at companies including <strong>PT Astra International</strong> and <strong>PT IDX Solusi Teknologi Informasi</strong>.",
      "I combine QA depth with data-science intuition—comfortable writing Python validation scripts, crafting Postman test suites, and spotting patterns in complex datasets. I collaborate well with developers, PMs, data engineers, and DevOps teams.",
    ],
    badge: "Currently open to QA & Data roles",
    stats: [
      { value: "3.68", label: "GPA · Telkom University", html: false },
      {
        value: "7",
        label: "Critical Defects Found at Indivara",
        html: false,
      },
      {
        value: "100+",
        label: "Test Cases Designed & Executed",
        html: false,
      },
      {
        value: 'R²<br><span class="asc-num-sub">0.901</span>',
        label: "Forecasting Model Accuracy",
        html: true,
      },
      { value: "4+", label: "Industries Tested Across", html: false },
      {
        value: "ISTQB",
        label: "Certified Foundation Level Tester",
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
        location: "Jakarta Utara, ID",
        role: "Product Quality Assurance",
        description:
          "Leading data validation and QA for a large-scale migration from Microsoft Fabric (Azure) to Google BigQuery (GCP), ensuring data integrity across enterprise reporting systems.",
        highlights: [
          "Developed an automated Python + pandas validation framework eliminating manual large-scale data verification",
          "Designed partition-based (year-month) validation logic for high-volume transactional datasets without memory overload",
          "Executed parallel multi-threaded data retrieval to optimize validation runtime and testing efficiency",
          "Performed deterministic row-level comparison across inventory movement and transactional reporting tables",
          "Identified data type mismatches, formatting inconsistencies, and ordering issues with actionable resolution insights",
          "Collaborated with data engineers and backend teams to align source and target schemas during migration",
        ],
        tags: [
          "Python",
          "BigQuery",
          "SQL",
          "Data Validation",
          "ETL QA",
        ],
      },
      {
        period: "Dec 2025 — Present",
        company: "PT IDX Solusi Teknologi Informasi",
        location: "Jakarta Selatan, ID",
        role: "Quality Assurance Intern",
        description:
          "QA across capital market technology environments including IDX Terminal, KPEI Securities systems, and internal product development.",
        highlights: [
          "Executed functional and regression testing on IDX Terminal; identified and reported 6 functional defects after backend changes",
          "Developed structured test cases for KPEI Admin, System Admin (SSL, SFTP), and KPEI Parameter — Minimum Rate",
          "Reviewed and data-mapped FSD documents for KPEI's Securities Borrowing & Lending (PME) project",
          "Collaborated with System Development and BA interns to define user scenarios for HRIS aligned with product backlog",
          "Practiced performance testing concepts using Apache JMeter on load and response metrics",
        ],
        tags: ["JMeter", "Functional Testing", "FSD Analysis", "TestRail"],
      },
      {
        period: "Nov 2025 — Dec 2025",
        company: "PT Indivara Group",
        location: "Tangerang, ID",
        role: "Quality Assurance Intern",
        description:
          "QA across four platforms in the Bersama FMCG digital distribution ecosystem—App Bersama, Web Monitoring, Web Victory, and Web Grosir.",
        highlights: [
          "Designed, documented, and executed 100+ functional & regression test cases ensuring feature readiness before release",
          "Identified and reported 7 critical defects, improving overall system stability and user experience",
          "Collaborated with Product Owner, Developers, DevOps, and QA lead to prioritize defects and verify fixes",
          "Used Gherkin, JIRA, and n8n ticketing to support end-to-end QA processes across sprint-based SDLC",
        ],
        tags: ["Gherkin", "JIRA", "Scrum", "n8n", "Manual Testing"],
      },
      {
        period: "Jun 2024 — Aug 2024",
        company: "PT Bank Tabungan Negara Tbk",
        location: "Jakarta, ID",
        role: "Business Support Intern (QA & Testing)",
        description:
          "Supported QA processes for BTN's Internet Banking Business platform serving corporate clients.",
        highlights: [
          "Designed, documented, and executed functional and regression test cases for corporate internet banking",
          "Performed API testing to validate backend responses across platform endpoints",
          "Assisted in early-stage test automation recording using Tosca for Corporate Internet Banking Web Application",
          "Collaborated with supervisor on test plan development and QA documentation improvements",
        ],
        tags: ["Postman", "API Testing", "Tosca", "Regression"],
      },
      {
        period: "May 2025 — Jun 2025",
        company: "Telkom University",
        location: "Bandung, ID",
        role: "Teaching Assistant — Data Warehouse & BI",
        description:
          "Designed and delivered lab modules for the Data Warehouse and Business Intelligence course using Pentaho and SQL.",
        highlights: [
          "Led practical sessions enabling students to perform data validation and BI analysis with Pentaho and SQL",
          "Designed lab modules contributing to 90%+ of students achieving strong course grades",
          "Further developed ETL technical skills through curriculum design and hands-on instruction",
        ],
        tags: ["SQL", "Pentaho", "ETL", "BI"],
      },
    ],
  },

  skills: {
    sectionLabel: "Skills & Tools",
    title: "Technical Arsenal",
    categories: [
      {
        icon: "check-circle",
        title: "QA & Testing",
        delayClass: "",
        gridSpan: 1,
        chips: [
          "Functional Testing",
          "Regression Testing",
          "API Testing",
          "Data Validation",
          "Manual Testing",
          "Automation Basics",
          "Test Case Design",
          "Performance Testing",
          "ETL Testing",
          "Gherkin",
        ],
      },
      {
        icon: "monitor",
        title: "Tools & Platforms",
        delayClass: "reveal-delay-1",
        gridSpan: 1,
        chips: [
          "Postman",
          "JIRA",
          "JMeter",
          "Selenium",
          "TestRail",
          "Git",
          "n8n",
          "Tosca",
          "Google Sheets",
          "Streamlit",
        ],
      },
      {
        icon: "code",
        title: "Programming & Data",
        delayClass: "reveal-delay-2",
        gridSpan: 1,
        chips: [
          "Python",
          "SQL",
          "Pandas",
          "Scikit-learn",
          "XGBoost",
          "Tableau",
          "Excel",
          "Java (basic)",
        ],
      },
      {
        icon: "users",
        title: "Workflow & Collaboration",
        delayClass: "",
        gridSpan: 1,
        chips: [
          "Agile / Scrum",
          "Sprint Planning",
          "FSD Analysis",
          "Defect Reporting",
          "Documentation",
          "Cross-functional Collaboration",
          "Root Cause Analysis",
        ],
      },
      {
        icon: "layers",
        title: "Data Infrastructure & Cloud",
        delayClass: "reveal-delay-1",
        gridSpan: 2,
        chips: [
          "Google BigQuery",
          "Microsoft Fabric / Azure",
          "ETL (Pentaho)",
          "Data Migration QA",
          "Partition-based Validation",
          "Multi-threading",
          "Row-level Comparison",
          "Logging & Audit Trails",
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
        eyebrow: "Final Year Project · 2025",
        title: "Sales & Inventory Forecasting System",
        description:
          "A predictive system for sales and inventory forecasting built with Python, XGBoost, and SQL. Implemented data preprocessing, validation, and automated testing scripts to ensure reliable forecasting results, then deployed as an interactive Streamlit web application.",
        stack: [
          "Python",
          "XGBoost",
          "SQL",
          "Streamlit",
          "Pandas",
          "Scikit-learn",
        ],
        metrics: [
          { value: "0.901", label: "R² Score" },
          { value: "<10%", label: "MAPE Error" },
        ],
        bullets: [
          "Deployed as a Streamlit web app for real-time stock forecasting decisions",
          "Automated testing scripts embedded to validate forecasting pipeline integrity",
          "Data preprocessing and validation mirrored production QA methodology",
        ],
      },
      {
        featured: false,
        eyebrow: "Enterprise QA · PT Astra International",
        title: "Automated Data Migration Validation Framework",
        description:
          "Python framework to validate large-scale data migration from Microsoft Fabric to Google BigQuery, with partition logic, parallel retrieval, and deterministic row comparison.",
        stack: ["Python", "Pandas", "BigQuery", "Multi-threading", "SQL"],
      },
      {
        featured: false,
        eyebrow: "QA Internship · PT IDX Solusi Teknologi",
        title: "Capital Markets System Testing — IDX & KPEI",
        description:
          "End-to-end testing for IDX Terminal and KPEI Securities Borrowing & Lending systems, including FSD analysis, data mapping, and regression cycles.",
        stack: ["Manual Testing", "FSD Analysis", "JMeter", "TestRail"],
        delayClass: "reveal-delay-1",
      },
    ],
  },

  certifications: {
    sectionLabel: "Certifications",
    title: "Validated Expertise",
    items: [
      {
        icon: "🏅",
        issuer: "ISTQB",
        name: "Certified Tester Foundation Level (CTFL) v4.0",
        year: "Udemy · 2025",
        delayClass: "",
      },
      {
        icon: "📊",
        issuer: "BNSP",
        name: "Associate Data Scientist",
        year: "Competent · 2024",
        delayClass: "reveal-delay-1",
      },
      {
        icon: "🐍",
        issuer: "HackerRank",
        name: "Python Basic Certification",
        year: "2026",
        delayClass: "reveal-delay-2",
      },
      {
        icon: "☕",
        issuer: "HackerRank",
        name: "Java Basic Certification",
        year: "2026",
        delayClass: "reveal-delay-3",
      },
    ],
  },

  contact: {
    sectionLabel: "Contact",
    headline: {
      before: "Let's build something",
      emphasis: "reliable",
      after: "together.",
    },
    sub:
      "I'm currently open to QA Engineer, Product Quality Assurance, and Data-Oriented Testing roles. Let's talk.",
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
