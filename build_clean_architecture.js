// build_clean_architecture.js
// Completely separates the portfolio into clean, dedicated, intuitive pages:
// 1. index.html           -> Clean Welcome / Overview Portal with 3 direct pathways and 5 project cards
// 2. leadership.html       -> Single-page vertically scrollable Leadership Deck (NO horizontal pagination)
// 3. cv.html               -> Full-page Executive CV with prominent Download PDF button
// 4. case-ericsson.html    -> Dedicated in-depth case study for Ericsson SalesOps CPQ (Excel to Cloud)
// 5. case-ibm-watson.html  -> Dedicated in-depth case study for IBM Watson Agentic AI & AIOps
// 6. case-zebra.html       -> Dedicated in-depth case study for Zebra Scanner IoT & Rugged UX
// 7. case-ibm-carbon.html  -> Dedicated in-depth case study for IBM Carbon Token Engine & DesignOps
// 8. case-zf-wabco.html    -> Dedicated in-depth case study for ZF Wabco Fleet Telematics & In-Cab HUD
// 9. serve.js              -> Clean server routing for all paths

const fs = require('fs');
const path = require('path');

console.log('Beginning compilation of clean, intuitive multi-page architecture...');

// Common CSS & Font Links
const commonHeadLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap">
`;

// Common Global Navigation Bar
function getGlobalNav(activePage) {
  return `
  <header class="global-header">
    <div class="header-container">
      <a href="/" class="brand-link">
        <span class="brand-name">BALAAJEE V.R.</span>
        <span class="brand-role">/ Senior UI/UX Design Manager</span>
      </a>

      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/" class="nav-item ${activePage === 'home' ? 'active' : ''}">Welcome</a>
        <a href="/leadership" class="nav-item ${activePage === 'leadership' ? 'active' : ''}">👔 Leadership Deck</a>
        <a href="/#cases" class="nav-item ${activePage === 'cases' ? 'active' : ''}">🎨 Case Studies</a>
        <a href="/cv" class="nav-item ${activePage === 'cv' ? 'active' : ''}">📄 Executive CV</a>
      </nav>

      <div class="header-actions">
        <a href="Balaajee VR POP Resume 20261015.pdf" download class="btn-download-pdf">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download CV (PDF)
        </a>
        <a href="mailto:vrbberaj@gmail.com" class="btn-contact">
          Get In Touch &rarr;
        </a>
      </div>
    </div>
  </header>
  `;
}

// Global Core Styles
const globalCoreStyles = `
  :root {
    --primary-accent: #F00658;
    --primary-hover: #D0054B;
    --accent-subtle: rgba(240, 6, 88, 0.08);
    --accent-border: rgba(240, 6, 88, 0.25);
    --gold: #C4892A;

    --font-heading: 'Overpass', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-code: 'JetBrains Mono', monospace;

    --bg-base: #F8F9FA;
    --bg-surface: #FFFFFF;
    --bg-subtle: #F1F3F6;
    --bg-card: #FFFFFF;
    
    --text-main: #0F172A;
    --text-body: #334155;
    --text-muted: #64748B;
    --text-light: #94A3B8;
    
    --border-subtle: #E2E8F0;
    --border-medium: #CBD5E1;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background-color: var(--bg-base);
    color: var(--text-body);
    font-family: var(--font-body);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* Global Header */
  .global-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-subtle);
    padding: 12px 0;
  }

  .header-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-link {
    display: flex;
    align-items: baseline;
    gap: 8px;
    text-decoration: none;
    color: var(--text-main);
  }

  .brand-name {
    font-family: var(--font-heading);
    font-size: 17px;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: var(--text-main);
  }

  .brand-role {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .brand-role { display: none; }
  }

  .nav-links {
    display: flex;
    align-items: center;
    background: var(--bg-subtle);
    border: 1px solid var(--border-subtle);
    border-radius: 100px;
    padding: 4px;
    gap: 2px;
  }

  .nav-item {
    padding: 7px 16px;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .nav-item:hover {
    color: var(--text-main);
  }

  .nav-item.active {
    background: var(--text-main);
    color: #FFFFFF;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn-download-pdf {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 15px;
    border-radius: 100px;
    font-size: 12.5px;
    font-weight: 600;
    background: #FFFFFF;
    color: var(--text-main);
    border: 1px solid var(--border-medium);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-download-pdf:hover {
    border-color: var(--text-main);
    background: var(--bg-subtle);
  }

  .btn-contact {
    padding: 8px 18px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 700;
    background: var(--primary-accent);
    color: #FFFFFF;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-contact:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(240, 6, 88, 0.3);
  }
`;

// ============================================================================
// 1. GENERATE index.html (WELCOME & OVERVIEW PORTAL)
// ============================================================================
console.log('Generating index.html (Welcome & Overview Portal)...');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balaajee V.R. | Senior UI/UX Design Manager &amp; Product Design Director</title>
  <meta name="description" content="Senior UI/UX Design Manager with 18+ years leading enterprise product design, DesignOps, and complex SaaS architectures. Ex-IBM, Ericsson, Zebra Technologies, ZF Wabco.">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}

    /* Welcome Hero */
    .welcome-hero {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 72px 0 60px;
    }

    .hero-wrap {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .hero-badge-strip {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 100px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #059669;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #059669;
    }

    .hero-heading {
      font-family: var(--font-heading);
      font-size: 46px;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.15;
      color: var(--text-main);
      margin-bottom: 20px;
      max-width: 860px;
    }

    .hero-heading span {
      color: var(--primary-accent);
    }

    .hero-bio {
      font-size: 18px;
      line-height: 1.68;
      color: var(--text-body);
      max-width: 800px;
      margin-bottom: 32px;
    }

    .hero-bio strong {
      color: var(--text-main);
      font-weight: 600;
    }

    /* 3 Primary Pathways */
    .pathways-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 36px;
    }

    @media (max-width: 860px) {
      .pathways-grid { grid-template-columns: 1fr; }
    }

    .pathway-card {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.25s ease;
      text-decoration: none;
      color: inherit;
    }

    .pathway-card:hover {
      border-color: var(--primary-accent);
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
      background: #FFFFFF;
    }

    .pathway-icon {
      font-size: 28px;
      margin-bottom: 14px;
    }

    .pathway-title {
      font-family: var(--font-heading);
      font-size: 19px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 8px;
    }

    .pathway-desc {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.55;
      margin-bottom: 20px;
      flex: 1;
    }

    .pathway-link {
      font-size: 13px;
      font-weight: 700;
      color: var(--primary-accent);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Stats Strip */
    .stats-section {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 32px 0;
    }

    .stats-grid {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-number {
      font-family: var(--font-heading);
      font-size: 38px;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .stat-number span {
      color: var(--primary-accent);
    }

    .stat-label {
      font-family: var(--font-code);
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Case Studies Showcase Section */
    .cases-section {
      padding: 72px 0 96px;
      max-width: 1140px;
      margin: 0 auto;
      padding-left: 24px;
      padding-right: 24px;
    }

    .section-header {
      margin-bottom: 40px;
    }

    .section-label {
      font-family: var(--font-heading);
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--primary-accent);
      margin-bottom: 8px;
    }

    .section-title {
      font-family: var(--font-heading);
      font-size: 34px;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: var(--text-main);
      margin-bottom: 10px;
    }

    .section-desc {
      font-size: 16px;
      color: var(--text-muted);
      max-width: 680px;
    }

    .cases-grid {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .case-card-preview {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 18px;
      padding: 32px;
      display: grid;
      grid-template-columns: 1.4fr 0.9fr;
      gap: 36px;
      align-items: center;
      transition: all 0.25s ease;
      text-decoration: none;
      color: inherit;
    }

    @media (max-width: 860px) {
      .case-card-preview {
        grid-template-columns: 1fr;
        gap: 24px;
        padding: 24px;
      }
    }

    .case-card-preview:hover {
      border-color: var(--primary-accent);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.07);
    }

    .case-preview-left {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .case-badge-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .case-company-pill {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 6px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
    }

    .case-role-pill {
      font-size: 12px;
      color: var(--text-muted);
    }

    .case-preview-title {
      font-family: var(--font-heading);
      font-size: 24px;
      font-weight: 800;
      line-height: 1.25;
      letter-spacing: -0.02em;
      color: var(--text-main);
    }

    .case-preview-summary {
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--text-body);
    }

    .case-preview-right {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .preview-metric-block {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .metric-label {
      font-family: var(--font-heading);
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    .metric-value {
      font-family: var(--font-heading);
      font-size: 17px;
      font-weight: 800;
      color: var(--primary-accent);
    }

    .btn-read-case {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 11px 20px;
      border-radius: 100px;
      background: var(--primary-accent);
      color: #FFFFFF;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
      margin-top: 6px;
    }

    .btn-read-case:hover {
      background: var(--primary-hover);
    }
  </style>
</head>
<body>

  ${getGlobalNav('home')}

  <!-- Welcome Hero -->
  <section class="welcome-hero">
    <div class="hero-wrap">
      <div class="hero-badge-strip">
        <span class="status-badge"><span class="status-dot"></span> Available for European &amp; Global Roles</span>
        <span style="font-size: 12px; color: var(--text-muted);">18+ Years Enterprise Experience &bull; Ex-IBM, Ericsson, Zebra, ZF Wabco</span>
      </div>

      <h1 class="hero-heading">
        Senior UI/UX Design Manager &amp; <span>Product Design Director</span>
      </h1>

      <p class="hero-bio">
        Welcome to my portfolio. I specialize in <strong>turning complex enterprise chaos into high-margin SaaS</strong>, scaling multi-brand design systems, and partnering with Commercial Directors and Engineering Leads to bridge strategic business OKRs with high-velocity product delivery.
      </p>

      <!-- 3 Direct Pathways -->
      <div class="pathways-grid">
        <a href="/leadership" class="pathway-card">
          <div>
            <div class="pathway-icon">👔</div>
            <h3 class="pathway-title">Executive Leadership Deck</h3>
            <p class="pathway-desc">
              A single-page vertically scrollable presentation outlining my leadership philosophy, team topology, enterprise design maturity, and 30-60-90 day onboarding vision.
            </p>
          </div>
          <span class="pathway-link">Read Leadership Deck &rarr;</span>
        </a>

        <a href="/cv" class="pathway-card">
          <div>
            <div class="pathway-icon">📄</div>
            <h3 class="pathway-title">Full Executive CV</h3>
            <p class="pathway-desc">
              Complete chronological professional history, competencies, metrics, and education. Includes 1-click official PDF download and clean print layout.
            </p>
          </div>
          <span class="pathway-link">View Full Executive CV &rarr;</span>
        </a>

        <a href="#cases" class="pathway-card">
          <div>
            <div class="pathway-icon">🎨</div>
            <h3 class="pathway-title">5 UI/UX Case Studies</h3>
            <p class="pathway-desc">
              In-depth product design case studies with live interactive browser mockups, 14-tab legacy spreadsheet audits, personas, design tokens, and interview CAR defense.
            </p>
          </div>
          <span class="pathway-link">Explore 5 Case Studies &darr;</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Career Stats Strip -->
  <section class="stats-section">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-number">18<span>+</span></div>
        <div class="stat-label">Years Enterprise Design Leadership</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">10M<span>+</span></div>
        <div class="stat-label">Users Impacted Across Global Systems</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">12<span>+</span></div>
        <div class="stat-label">Designers &amp; Engineers Direct Squad</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">45<span>%</span></div>
        <div class="stat-label">Dev Acceleration via Token Systems</div>
      </div>
    </div>
  </section>

  <!-- Selected In-Depth UI/UX Case Studies Showcase Grid -->
  <section class="cases-section" id="cases">
    <div class="section-header">
      <div class="section-label">SELECTED WORK &bull; DEDICATED IN-DEPTH CASE STUDIES</div>
      <h2 class="section-title">Enterprise Product Case Studies</h2>
      <p class="section-desc">
        Each project below features a dedicated page with interactive browser mockups, information architecture flows, design tokens, and interview CAR defense frameworks.
      </p>
    </div>

    <div class="cases-grid">

      <!-- Case 1: Ericsson -->
      <div class="case-card-preview">
        <div class="case-preview-left">
          <div class="case-badge-meta">
            <span class="case-company-pill" style="color: var(--primary-accent); border-color: var(--accent-border);">Ericsson Global</span>
            <span class="case-role-pill">Lead UI/UX Designer &amp; Information Architect &bull; Jul 2019 – Sep 2020</span>
          </div>
          <h3 class="case-preview-title">Ericsson SalesOps CPQ: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine</h3>
          <p class="case-preview-summary">
            Modernizing an unversioned, macro-laden spreadsheet quoting nightmare into an enterprise CPQ (Configure, Price, Quote) platform. By combining keyboard-first spreadsheet muscle memory with automated catalog validation and live gross margin guardrails, we compressed quote turnaround from 6 days to 42 minutes and protected $18M+ in annual margin leakage.
          </p>
        </div>
        <div class="case-preview-right">
          <div class="preview-metric-block">
            <span class="metric-label">Key Transformation</span>
            <span class="metric-value">6 Days &rarr; 42 Mins Turnaround (-92%)</span>
          </div>
          <div class="preview-metric-block">
            <span class="metric-label">Protected Revenue</span>
            <span class="metric-value">$18M+ Margin Leakage Protected</span>
          </div>
          <a href="/case-ericsson.html" class="btn-read-case">
            Read Dedicated Case Study &amp; Live App &rarr;
          </a>
        </div>
      </div>

      <!-- Case 2: IBM Watson -->
      <div class="case-card-preview">
        <div class="case-preview-left">
          <div class="case-badge-meta">
            <span class="case-company-pill">IBM Software Labs</span>
            <span class="case-role-pill">Senior Manager UI/UX Design &bull; Sep 2024 – Jan 2026</span>
          </div>
          <h3 class="case-preview-title">IBM Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX</h3>
          <p class="case-preview-summary">
            Designing autonomous multi-agent task execution while preserving Human-in-the-Loop governance for regulated Fortune 500 enterprises. We transformed black-box generative AI into an explainable, auditable system with confidence thresholds and side-by-side diff checks.
          </p>
        </div>
        <div class="case-preview-right">
          <div class="preview-metric-block">
            <span class="metric-label">Task Velocity</span>
            <span class="metric-value">62% Faster Cross-System Execution</span>
          </div>
          <div class="preview-metric-block">
            <span class="metric-label">Governance Impact</span>
            <span class="metric-value">0 Compliance Violations Across 14 Squads</span>
          </div>
          <a href="/case-ibm-watson.html" class="btn-read-case">
            Read Dedicated Case Study &amp; Live App &rarr;
          </a>
        </div>
      </div>

      <!-- Case 3: Zebra Technologies -->
      <div class="case-card-preview">
        <div class="case-preview-left">
          <div class="case-badge-meta">
            <span class="case-company-pill">Zebra Technologies</span>
            <span class="case-role-pill">UI/UX Product Design Manager &bull; Jul 2021 – Aug 2024</span>
          </div>
          <h3 class="case-preview-title">Zebra Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics</h3>
          <p class="case-preview-summary">
            Scaling mission-critical IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers. Conducted in-situ contextual research in sub-zero freezers to redesign rugged scanner interaction paradigms.
          </p>
        </div>
        <div class="case-preview-right">
          <div class="preview-metric-block">
            <span class="metric-label">Staging Acceleration</span>
            <span class="metric-value">8 Secs vs 4.5 Days (-99% Staging Time)</span>
          </div>
          <div class="preview-metric-block">
            <span class="metric-label">Hardware Footprint</span>
            <span class="metric-value">1.2M+ Active Scanners &amp; Handhelds</span>
          </div>
          <a href="/case-zebra.html" class="btn-read-case">
            Read Dedicated Case Study &amp; Live App &rarr;
          </a>
        </div>
      </div>

      <!-- Case 4: IBM Carbon -->
      <div class="case-card-preview">
        <div class="case-preview-left">
          <div class="case-badge-meta">
            <span class="case-company-pill">IBM Software Labs</span>
            <span class="case-role-pill">DesignOps &amp; Governance Lead &bull; 2024–2026</span>
          </div>
          <h3 class="case-preview-title">IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance</h3>
          <p class="case-preview-summary">
            Eliminating multi-million dollar design debt by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads. Established the Contribution Council flywheel to review, govern, and merge component tokens without engineering friction.
          </p>
        </div>
        <div class="case-preview-right">
          <div class="preview-metric-block">
            <span class="metric-label">Front-End Velocity</span>
            <span class="metric-value">+28% Sprint Delivery Acceleration</span>
          </div>
          <div class="preview-metric-block">
            <span class="metric-label">Drift Reduction</span>
            <span class="metric-value">-70% Visual Regression &amp; Drift Bugs</span>
          </div>
          <a href="/case-ibm-carbon.html" class="btn-read-case">
            Read Dedicated Case Study &amp; Live App &rarr;
          </a>
        </div>
      </div>

      <!-- Case 5: ZF Wabco -->
      <div class="case-card-preview">
        <div class="case-preview-left">
          <div class="case-badge-meta">
            <span class="case-company-pill">ZF Wabco</span>
            <span class="case-role-pill">UI/UX Senior Specialist &bull; Oct 2020 – Jul 2021</span>
          </div>
          <h3 class="case-preview-title">ZF Wabco Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics</h3>
          <p class="case-preview-summary">
            Designing a dual-interface ecosystem: a glanceable, distraction-free in-cab HUD cluster for commercial truck drivers compliant with strict EU automotive safety standards (&lt;1.2s glance time), paired with an automated fleet command center for dispatchers.
          </p>
        </div>
        <div class="case-preview-right">
          <div class="preview-metric-block">
            <span class="metric-label">EU Safety Standard</span>
            <span class="metric-value">&lt; 1.2s Eyes-Off-Road Glance Time</span>
          </div>
          <div class="preview-metric-block">
            <span class="metric-label">Active EU Deployment</span>
            <span class="metric-value">80,000+ Commercial Trucks</span>
          </div>
          <a href="/case-zf-wabco.html" class="btn-read-case">
            Read Dedicated Case Study &amp; Live App &rarr;
          </a>
        </div>
      </div>

    </div>
  </section>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
console.log('index.html written successfully.');

// ============================================================================
// 2. GENERATE leadership.html (VERTICALLY SCROLLABLE SINGLE-PAGE DECK)
// ============================================================================
console.log('Generating leadership.html (Vertically Scrollable Leadership Deck)...');

const deckRaw = fs.readFileSync(path.join(__dirname, 'leadership_deck.html'), 'utf8');

// Extract slides
const slidesMatch = deckRaw.match(/<main class="keynote-container">([\s\S]*?)<\/main>/);
let scrollableSlides = slidesMatch ? slidesMatch[1] : '';

// Make all slides permanently visible in vertical flow
scrollableSlides = scrollableSlides.replace(/class="slide"/g, 'class="slide active"');

// Replace deep links to point to the dedicated case study pages!
scrollableSlides = scrollableSlides.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 4/,
  `  <div style="margin-top: 18px; text-align: right;">
       <a href="/case-ericsson.html" class="btn-read-case" style="display: inline-flex; text-decoration: none;">
         Explore Dedicated Ericsson Case Study &amp; Live Data Grid &rarr;
       </a>
     </div>
   </div>
 </section>
 <!-- SLIDE 4`
);

scrollableSlides = scrollableSlides.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 5/,
  `  <div style="margin-top: 18px; text-align: right;">
       <a href="/case-zebra.html" class="btn-read-case" style="display: inline-flex; text-decoration: none;">
         Explore Dedicated Zebra Scanner Case Study &rarr;
       </a>
     </div>
   </div>
 </section>
 <!-- SLIDE 5`
);

scrollableSlides = scrollableSlides.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 6/,
  `  <div style="margin-top: 18px; text-align: right;">
       <a href="/case-zf-wabco.html" class="btn-read-case" style="display: inline-flex; text-decoration: none;">
         Explore Dedicated ZF Wabco Cockpit HUD Case Study &rarr;
       </a>
     </div>
   </div>
 </section>
 <!-- SLIDE 6`
);

scrollableSlides = scrollableSlides.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 7/,
  `  <div style="margin-top: 18px; text-align: right;">
       <a href="/case-ibm-carbon.html" class="btn-read-case" style="display: inline-flex; text-decoration: none;">
         Explore Dedicated IBM Carbon DesignOps Token Case Study &rarr;
       </a>
     </div>
   </div>
 </section>
 <!-- SLIDE 7`
);

scrollableSlides = scrollableSlides.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 8/,
  `  <div style="margin-top: 18px; text-align: right;">
       <a href="/case-ibm-watson.html" class="btn-read-case" style="display: inline-flex; text-decoration: none;">
         Explore Dedicated IBM Watson Agentic AI Case Study &rarr;
       </a>
     </div>
   </div>
 </section>
 <!-- SLIDE 8`
);

// Extract deck CSS
const deckStyleMatch = deckRaw.match(/<style>([\s\S]*?)<\/style>/);
let deckCss = deckStyleMatch ? deckStyleMatch[1] : '';
deckCss = deckCss.replace(/body\s*{[^}]*}/g, '');
deckCss = deckCss.replace(/body\.has-sidebar[^{]*{[^}]*}/g, '');

const leadershipHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balaajee V.R. | Executive Design Leadership Deck (Scrollable Presentation)</title>
  <meta name="description" content="Scrollable executive presentation on design leadership, team topology, enterprise design maturity, and 30-60-90 day onboarding vision.">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}
    ${deckCss}

    /* Vertical Scrollable Deck Overrides */
    body {
      background: #0B0E17 !important;
      color: #E2E8F0;
    }

    .leadership-wrap {
      max-width: 1240px;
      margin: 0 auto;
      padding: 32px 24px 80px;
    }

    .deck-top-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: rgba(18, 24, 38, 0.95);
      border: 1px solid rgba(200, 168, 74, 0.3);
      border-radius: 14px;
      margin-bottom: 28px;
    }

    .keynote-container {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .slide {
      display: flex !important;
      flex-direction: column;
      opacity: 1 !important;
      visibility: visible !important;
      position: static !important;
      min-height: auto !important;
      border-radius: 20px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
      margin-bottom: 20px;
    }

    /* Quick jump table of contents */
    .deck-jump-bar {
      position: sticky;
      top: 65px;
      z-index: 50;
      background: rgba(11, 14, 23, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 10px 0;
      margin-bottom: 30px;
    }

    .jump-links {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .jump-item {
      padding: 6px 14px;
      border-radius: 100px;
      font-family: var(--font-code);
      font-size: 11.5px;
      font-weight: 600;
      color: #94A3B8;
      background: rgba(255, 255, 255, 0.06);
      text-decoration: none;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .jump-item:hover {
      color: #FFFFFF;
      background: var(--primary-accent);
    }
  </style>
</head>
<body>

  ${getGlobalNav('leadership')}

  <!-- Sticky Quick Jump Sub-Navigation -->
  <div class="deck-jump-bar">
    <div style="max-width: 1240px; margin: 0 auto; padding: 0 24px;">
      <div class="jump-links">
        <span style="font-family: var(--font-code); font-size: 11px; color: var(--gold); font-weight: 700; margin-right: 6px;">JUMP TO:</span>
        <a href="#slide-1" class="jump-item">01. Overview</a>
        <a href="#slide-2" class="jump-item">02. 4 Pillars</a>
        <a href="#slide-3" class="jump-item">03. Ericsson CPQ</a>
        <a href="#slide-4" class="jump-item">04. Zebra IoT</a>
        <a href="#slide-5" class="jump-item">05. ZF Wabco</a>
        <a href="#slide-6" class="jump-item">06. IBM Carbon</a>
        <a href="#slide-7" class="jump-item">07. IBM Watson</a>
        <a href="#slide-8" class="jump-item">08. Design Maturity</a>
        <a href="#slide-9" class="jump-item">09. 30-60-90 Plan</a>
        <a href="#slide-10" class="jump-item">10. Target Roles</a>
      </div>
    </div>
  </div>

  <div class="leadership-wrap">
    
    <!-- Top Strip -->
    <div class="deck-top-strip">
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="profile.jpg" alt="Balaajee V.R." onerror="this.src='photo_300x400.jpg'" style="width: 38px; height: 38px; border-radius: 50%; border: 2px solid var(--gold);">
        <div>
          <h2 style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: #FFFFFF;">Balaajee V.R. &bull; <span style="color: var(--gold);">Executive Leadership Deck</span></h2>
          <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8;">Continuous Scrollable Presentation &bull; 10 Strategic Sections</span>
        </div>
      </div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <a href="Balaajee_VR_Leadership_Deck.pdf" download class="btn-download-pdf" style="background: rgba(255,255,255,0.08); color: #FFFFFF; border-color: rgba(255,255,255,0.2);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Deck (PDF)
        </a>
        <a href="/#cases" class="btn-contact" style="padding: 7px 16px; font-size: 12.5px;">
          View UI/UX Case Studies &rarr;
        </a>
      </div>
    </div>

    <!-- The 10 Sections (Scrollable Vertically) -->
    <main class="keynote-container">
      ${scrollableSlides}
    </main>

  </div>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'leadership.html'), leadershipHtml, 'utf8');
console.log('leadership.html written successfully.');

// ============================================================================
// 3. GENERATE cv.html (FULL-PAGE EXECUTIVE CV WITH DOWNLOAD BUTTON)
// ============================================================================
console.log('Generating cv.html (Full-Page Executive CV)...');

const corpCvRaw = fs.readFileSync(path.join(__dirname, 'resume_corporate.html'), 'utf8');

// Extract the resume container
const cvContainerMatch = corpCvRaw.match(/<div id="container">([\s\S]*?)<\/body>/);
const cvContainerHtml = cvContainerMatch ? cvContainerMatch[1] : '';

const cvHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balaajee V.R. | Full Executive Curriculum Vitae (CV)</title>
  <meta name="description" content="Executive Curriculum Vitae for Balaajee V.R., Senior UI/UX Design Manager. Ex-IBM, Zebra Technologies, Ericsson, ZF Wabco.">
  <link rel="stylesheet" href="style.css">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}

    .cv-top-action-bar {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 14px 0;
      position: sticky;
      top: 60px;
      z-index: 90;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    .cv-bar-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .cv-bar-title {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      color: var(--text-main);
    }

    .cv-bar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    @media print {
      .global-header, .cv-top-action-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body class="bg-[#DDD9D0]">

  ${getGlobalNav('cv')}

  <!-- Sticky Action Bar for CV -->
  <div class="cv-top-action-bar">
    <div class="cv-bar-container">
      <div>
        <div class="cv-bar-title">Balaajee V.R. &bull; Executive Curriculum Vitae</div>
        <div style="font-size: 12px; color: var(--text-muted);">Senior UI/UX Design Manager &bull; 18+ Years Enterprise Experience</div>
      </div>
      <div class="cv-bar-actions">
        <a href="Balaajee VR POP Resume 20261015.pdf" download class="btn-contact" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Official PDF (A4)
        </a>
        <button onclick="window.print()" class="btn-download-pdf" style="cursor: pointer; padding: 8px 16px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print CV
        </button>
      </div>
    </div>
  </div>

  <!-- Full Corporate CV Document -->
  <div id="container">
    ${cvContainerHtml}

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'cv.html'), cvHtml, 'utf8');
console.log('cv.html written successfully.');

// ============================================================================
// 4. GENERATE 5 DEDICATED CASE STUDY PAGES
// ============================================================================
console.log('Extracting and compiling 5 dedicated case study pages...');

const caseSourceRaw = fs.readFileSync(path.join(__dirname, 'rebuild_as_uiux_case_studies.js'), 'utf8');

// Extract Case Studies CSS from rebuild_as_uiux_case_studies.js
const caseCssMatch = caseSourceRaw.match(/<style>([\s\S]*?)<\/style>/);
const caseCss = caseCssMatch ? caseCssMatch[1] : '';

// Helper function to build a standalone dedicated case study page
function buildDedicatedCasePage(options) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${options.title} | Balaajee V.R.</title>
  <meta name="description" content="${options.description}">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}
    ${caseCss}

    .case-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 24px 80px;
    }

    .breadcrumb-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-muted);
    }

    .breadcrumbs a {
      color: var(--text-main);
      text-decoration: none;
      font-weight: 600;
    }

    .breadcrumbs a:hover {
      color: var(--primary-accent);
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 16px;
      border-radius: 100px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-size: 12.5px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-back:hover {
      background: #FFFFFF;
      border-color: var(--border-medium);
    }

    /* Force the single case card to be permanently visible */
    .case-card {
      display: block !important;
      margin-bottom: 40px;
    }

    .case-bottom-nav {
      margin-top: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 24px;
      border-top: 1px solid var(--border-subtle);
      flex-wrap: wrap;
      gap: 16px;
    }

    .case-nav-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 700;
      color: var(--text-main);
      text-decoration: none;
    }

    .case-nav-link:hover {
      color: var(--primary-accent);
    }
  </style>
</head>
<body>

  ${getGlobalNav('cases')}

  <div class="case-page-container">
    
    <!-- Breadcrumb Bar -->
    <div class="breadcrumb-bar">
      <div class="breadcrumbs">
        <a href="/">Home</a>
        <span>&rsaquo;</span>
        <a href="/#cases">Case Studies</a>
        <span>&rsaquo;</span>
        <span>${options.shortName}</span>
      </div>
      <a href="/#cases" class="btn-back">
        &larr; Back to All Case Studies
      </a>
    </div>

    <!-- The Case Card Content -->
    ${options.cardHtml}

    <!-- Bottom Project Navigation -->
    <div class="case-bottom-nav">
      ${options.prevLink ? `<a href="${options.prevLink.url}" class="case-nav-link">&larr; Previous: ${options.prevLink.label}</a>` : `<div></div>`}
      <a href="/#cases" class="btn-back">All Case Studies</a>
      ${options.nextLink ? `<a href="${options.nextLink.url}" class="case-nav-link">Next: ${options.nextLink.label} &rarr;</a>` : `<div></div>`}
    </div>

  </div>

  <script>
    // Sub-Tab Switcher inside Case Study
    function switchCaseTab(caseId, tabName, btn) {
      const card = document.getElementById('case-' + caseId);
      if (!card) return;

      card.querySelectorAll('.case-subtab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      card.querySelectorAll('.case-tab-panel').forEach(p => p.classList.remove('active'));
      const activePanel = card.querySelector('#panel-' + caseId + '-' + tabName);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    }

    function simulateExport() {
      alert('Generating Verified Proposal: Applying brand tokens, validating margin health, and bundling Bill of Materials.');
    }
  </script>

</body>
</html>
`;
}

// Extract the 5 case card articles from rebuild_as_uiux_case_studies.js
function extractArticle(caseId) {
  const startRegex = new RegExp(`<article class="case-card" id="${caseId}"[\\s\\S]*?<\\/article>`);
  const match = caseSourceRaw.match(startRegex);
  if (match) {
    let content = match[0];
    // Clean VP references
    content = content.replace(/automated VP escalation triggers/g, 'automated Commercial Director escalation triggers');
    content = content.replace(/waiting days for VP email sign-offs/g, 'waiting days for Commercial Director email sign-offs');
    content = content.replace(/Email workbook to Regional Commercial VP for manual margin verification\./g, 'Email workbook to Regional Commercial Director for manual margin verification.');
    content = content.replace(/prompted required VP approval\./g, 'prompted required Commercial Director approval.');
    return content;
  }
  return '';
}

// 1. Ericsson Page
const ericssonCard = extractArticle('case-ericsson');
const ericssonPageHtml = buildDedicatedCasePage({
  title: 'Ericsson SalesOps CPQ: Excel-to-Cloud Transformation',
  shortName: 'Ericsson SalesOps CPQ',
  description: 'Transforming a 14-tab legacy Excel quoting sheet into an enterprise cloud CPQ engine, reducing turnaround from 6 days to 42 minutes.',
  cardHtml: ericssonCard,
  prevLink: null,
  nextLink: { url: '/case-ibm-watson.html', label: 'IBM Watson Agentic AI' }
});
fs.writeFileSync(path.join(__dirname, 'case-ericsson.html'), ericssonPageHtml, 'utf8');
console.log('case-ericsson.html written successfully.');

// 2. IBM Watson Page
const watsonCard = extractArticle('case-ibm-watson');
const watsonPageHtml = buildDedicatedCasePage({
  title: 'IBM Watson Orchestrate: Multi-Agent AI Task Automation',
  shortName: 'IBM Watson Agentic AI',
  description: 'Designing autonomous multi-agent task execution and Human-in-the-Loop governance for regulated Fortune 500 enterprises.',
  cardHtml: watsonCard,
  prevLink: { url: '/case-ericsson.html', label: 'Ericsson SalesOps CPQ' },
  nextLink: { url: '/case-zebra.html', label: 'Zebra Enterprise Device Cloud' }
});
fs.writeFileSync(path.join(__dirname, 'case-ibm-watson.html'), watsonPageHtml, 'utf8');
console.log('case-ibm-watson.html written successfully.');

// 3. Zebra Page
const zebraCard = extractArticle('case-zebra');
const zebraPageHtml = buildDedicatedCasePage({
  title: 'Zebra Enterprise Device Cloud: Rugged Scanner IoT UX',
  shortName: 'Zebra Enterprise IoT',
  description: 'Scaling IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers.',
  cardHtml: zebraCard,
  prevLink: { url: '/case-ibm-watson.html', label: 'IBM Watson Agentic AI' },
  nextLink: { url: '/case-ibm-carbon.html', label: 'IBM Carbon Token Engine' }
});
fs.writeFileSync(path.join(__dirname, 'case-zebra.html'), zebraPageHtml, 'utf8');
console.log('case-zebra.html written successfully.');

// 4. IBM Carbon Page
const carbonCard = extractArticle('case-ibm-carbon');
const carbonPageHtml = buildDedicatedCasePage({
  title: 'IBM Carbon Token Engine: Cross-Squad DesignOps',
  shortName: 'IBM Carbon Tokens',
  description: 'Synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads.',
  cardHtml: carbonCard,
  prevLink: { url: '/case-zebra.html', label: 'Zebra Enterprise Device Cloud' },
  nextLink: { url: '/case-zf-wabco.html', label: 'ZF Wabco Cockpit HUD' }
});
fs.writeFileSync(path.join(__dirname, 'case-ibm-carbon.html'), carbonPageHtml, 'utf8');
console.log('case-ibm-carbon.html written successfully.');

// 5. ZF Wabco Page
const wabcoCard = extractArticle('case-zf-wabco');
const wabcoPageHtml = buildDedicatedCasePage({
  title: 'ZF Wabco Commercial Vehicle Cockpit & Real-Time Safety',
  shortName: 'ZF Wabco Telematics',
  description: 'Designing a distraction-free in-cab HUD cluster compliant with strict EU automotive standards (<1.2s glance time).',
  cardHtml: wabcoCard,
  prevLink: { url: '/case-ibm-carbon.html', label: 'IBM Carbon Token Engine' },
  nextLink: null
});
fs.writeFileSync(path.join(__dirname, 'case-zf-wabco.html'), wabcoPageHtml, 'utf8');
console.log('case-zf-wabco.html written successfully.');

// ============================================================================
// 5. UPDATE serve.js TO ROUTE ALL CLEAN URLS
// ============================================================================
console.log('Updating serve.js with clean routing for all dedicated pages...');

const updatedServeJs = `const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
  let targetFile = decodedUrl === '/' ? 'index.html' : decodedUrl;

  // Clean Route Mappings
  if (decodedUrl === '/leadership' || decodedUrl === '/leadership-deck') targetFile = 'leadership.html';
  else if (decodedUrl === '/cv' || decodedUrl === '/resume') targetFile = 'cv.html';
  else if (decodedUrl === '/case-ericsson') targetFile = 'case-ericsson.html';
  else if (decodedUrl === '/case-ibm-watson') targetFile = 'case-ibm-watson.html';
  else if (decodedUrl === '/case-zebra') targetFile = 'case-zebra.html';
  else if (decodedUrl === '/case-ibm-carbon') targetFile = 'case-ibm-carbon.html';
  else if (decodedUrl === '/case-zf-wabco') targetFile = 'case-zf-wabco.html';
  else if (decodedUrl === '/vsign') targetFile = 'academic_vsign.html';
  else if (decodedUrl === '/scope') targetFile = 'academic_scope.html';
  else if (decodedUrl === '/academic') targetFile = 'academic_resume.html';
  else if (decodedUrl === '/general') targetFile = 'academic_general.html';
  else if (decodedUrl === '/prep-first-call') targetFile = 'prep_first_call.html';
  else if (decodedUrl === '/prep-interview-stages') targetFile = 'prep_interview_stages.html';
  else if (decodedUrl === '/tracker') targetFile = 'tracker.html';
  
  let filePath = path.join(__dirname, targetFile);
  
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'text/html';
  if (ext === '.css') contentType = 'text/css';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
  else if (ext === '.js') contentType = 'application/javascript';
  else if (ext === '.pdf') contentType = 'application/pdf';
  else if (ext === '.svg') contentType = 'image/svg+xml';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found: ' + targetFile);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(\`Server error: \${err.code}\`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}/\`);
});
`;

fs.writeFileSync(path.join(__dirname, 'serve.js'), updatedServeJs, 'utf8');
console.log('serve.js updated.');

console.log('COMPILATION COMPLETE! All dedicated pages created cleanly.');
