// build_roomfive_portfolio.js
// Compiles the portfolio with Andrew Couldwell (roomfive.net) look and feel:
// - Google Font: Overpass (weights 400, 600, 700, 800, 900) + Inter + JetBrains Mono
// - Roomfive color signature: #F00658 accent with crisp ink #0E1015 / obsidian #0A0D14
// - Interactive Persona Switcher: [Leader] [Systems] [Strategist] [Architect]
// - Giant background typographic watermark (LEADER, SYSTEM, STRATEGY, ARCHITECT)
// - Two-column "Scope & Involvement" case study headers (like Burger King & Adobe Portfolio on roomfive)
// - Navigation Order: 1. Leadership Deck (10) -> 2. UI/UX Case Studies (5) -> 3. Executive CV
// - NO VP stakeholders (aligned to Senior Manager & Director peers)
// - NO academic/professor references

const fs = require('fs');
const path = require('path');

console.log('Building roomfive.net inspired executive portfolio...');

// 1. Read existing build_full_portfolio.js and extract components
const deckFile = path.join(__dirname, 'leadership_deck.html');
const deckHtml = fs.readFileSync(deckFile, 'utf8');

const mainMatch = deckHtml.match(/<main class="keynote-container">([\s\S]*?)<\/main>/);
let slidesHtml = mainMatch ? mainMatch[1] : '';

// Replace links inside slides to match SPA navigation
slidesHtml = slidesHtml.replace(/href="\/#cases"/g, 'href="javascript:void(0)" onclick="switchMainView(\'cases\')"');
slidesHtml = slidesHtml.replace(/href="\/"/g, 'href="javascript:void(0)" onclick="switchMainView(\'cases\')"');

// Deep link jump buttons on case slides
slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 4/,
  `  <div style="margin-top: 16px; text-align: right;">
       <button class="rf-jump-btn" onclick="switchMainView('cases'); scrollToCase('case-ericsson');">
         Explore In-Depth Ericsson Case Study &amp; Data Grid &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 4`
);

slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 5/,
  `  <div style="margin-top: 16px; text-align: right;">
       <button class="rf-jump-btn" onclick="switchMainView('cases'); scrollToCase('case-zebra');">
         Explore In-Depth Zebra IoT Case Study &amp; Scanner Flow &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 5`
);

slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 6/,
  `  <div style="margin-top: 16px; text-align: right;">
       <button class="rf-jump-btn" onclick="switchMainView('cases'); scrollToCase('case-zf-wabco');">
         Explore In-Depth ZF Wabco Cockpit HUD Case Study &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 6`
);

slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 7/,
  `  <div style="margin-top: 16px; text-align: right;">
       <button class="rf-jump-btn" onclick="switchMainView('cases'); scrollToCase('case-ibm-carbon');">
         Explore In-Depth IBM Carbon DesignOps Token Case Study &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 7`
);

slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 8/,
  `  <div style="margin-top: 16px; text-align: right;">
       <button class="rf-jump-btn" onclick="switchMainView('cases'); scrollToCase('case-ibm-watson');">
         Explore In-Depth IBM Watson Agentic AI Case Study &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 8`
);

// 2. Extract deck CSS
const styleMatch = deckHtml.match(/<style>([\s\S]*?)<\/style>/);
let deckCss = styleMatch ? styleMatch[1] : '';
deckCss = deckCss.replace(/body\s*{[^}]*}/g, '');
deckCss = deckCss.replace(/body\.has-sidebar[^{]*{[^}]*}/g, '');

// Read existing UI/UX case studies HTML
const casesFile = path.join(__dirname, 'rebuild_as_uiux_case_studies.js');
let casesScript = fs.readFileSync(casesFile, 'utf8');

const startMarker = 'const html = `<!DOCTYPE html>';
const startIndex = casesScript.indexOf(startMarker);
let fullCasesHtml = casesScript.substring(startIndex + 'const html = `'.length);
fullCasesHtml = fullCasesHtml.substring(0, fullCasesHtml.lastIndexOf('`;'));

// Replace VP references with Commercial Director / Product Director
fullCasesHtml = fullCasesHtml.replace(/automated VP escalation triggers/g, 'automated Commercial Director escalation triggers');
fullCasesHtml = fullCasesHtml.replace(/waiting days for VP email sign-offs/g, 'waiting days for Commercial Director email sign-offs');
fullCasesHtml = fullCasesHtml.replace(/Email workbook to Regional Commercial VP for manual margin verification\./g, 'Email workbook to Regional Commercial Director for manual margin verification.');
fullCasesHtml = fullCasesHtml.replace(/prompted required VP approval\./g, 'prompted required Commercial Director approval.');
fullCasesHtml = fullCasesHtml.replace(/partner closely with product managers and VPs/g, 'partner closely with product directors, engineering leads, and business stakeholders');
fullCasesHtml = fullCasesHtml.replace(/Vice President of Design \(Enterprise \/ B2B\)/g, 'Head of Design / UX Practice Director (Enterprise / B2B)');

// 3. Update Font links in <head> to include Overpass
const oldFonts = `<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">`;
const newFonts = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap">`;
fullCasesHtml = fullCasesHtml.replace(oldFonts, newFonts);

// 4. Update the roomfive-inspired CSS
const roomfiveStyles = `
  /* ==========================================================================
     ANDREW COULDWELL (ROOMFIVE.NET) DESIGN SYSTEM & EDITORIAL STYLING
     ========================================================================== */
  :root {
    --rf-accent: #F00658;
    --rf-accent-hover: #D0054B;
    --rf-accent-subtle: rgba(240, 6, 88, 0.08);
    --rf-accent-border: rgba(240, 6, 88, 0.28);
    --rf-gold: #C4892A;

    --font-heading: 'Overpass', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-code: 'JetBrains Mono', monospace;

    --bg-base: #FFFFFF;
    --bg-surface: #FFFFFF;
    --bg-subtle: #F6F7F9;
    --bg-card-hover: #F2F4F7;
    
    --text-main: #0E1015;
    --text-body: #323743;
    --text-muted: #646A78;
    --text-light: #949BA8;
    
    --border-subtle: #E5E7EB;
    --border-medium: #D1D5DB;
    --border-focus: #F00658;
  }

  [data-theme="dark"] {
    --rf-accent: #F00658;
    --rf-accent-hover: #FF2B73;
    --rf-accent-subtle: rgba(240, 6, 88, 0.14);
    --rf-accent-border: rgba(240, 6, 88, 0.35);
    --rf-gold: #E5A93C;

    --bg-base: #0B0D13;
    --bg-surface: #121622;
    --bg-subtle: #191F2E;
    --bg-card-hover: #20273A;
    
    --text-main: #F4F5F7;
    --text-body: #D1D5DB;
    --text-muted: #9CA3AF;
    --text-light: #6B7280;
    
    --border-subtle: rgba(255, 255, 255, 0.09);
    --border-medium: rgba(255, 255, 255, 0.16);
    --border-focus: #F00658;
  }

  /* Roomfive Top Navigation */
  .rf-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg-base);
    border-bottom: 1px solid var(--border-subtle);
    padding: 14px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.3s ease;
  }

  .rf-brand {
    display: flex;
    align-items: baseline;
    gap: 8px;
    text-decoration: none;
    color: var(--text-main);
  }

  .rf-brand strong {
    font-family: var(--font-heading);
    font-size: 17px;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: var(--text-main);
  }

  .rf-brand-sub {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
  }

  .rf-nav-pills {
    display: flex;
    align-items: center;
    background: var(--bg-subtle);
    border: 1px solid var(--border-subtle);
    border-radius: 100px;
    padding: 4px;
  }

  .rf-nav-tab {
    padding: 7px 18px;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .rf-nav-tab:hover {
    color: var(--text-main);
  }

  .rf-nav-tab.active {
    background: var(--text-main);
    color: var(--bg-base);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .rf-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .rf-btn-contact {
    padding: 8px 18px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 700;
    background: var(--rf-accent);
    color: #FFFFFF;
    text-decoration: none;
    border: 1px solid var(--rf-accent);
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .rf-btn-contact:hover {
    background: var(--rf-accent-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(240, 6, 88, 0.3);
  }

  /* Roomfive Signature Hero with Watermark & Persona Switcher */
  .rf-hero {
    position: relative;
    padding: 72px 0 54px;
    border-bottom: 1px solid var(--border-subtle);
    overflow: hidden;
    background: var(--bg-base);
  }

  .rf-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-heading);
    font-size: 180px;
    font-weight: 900;
    letter-spacing: 0.12em;
    color: var(--text-main);
    opacity: 0.035;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    transition: all 0.4s ease;
    z-index: 1;
  }

  [data-theme="dark"] .rf-watermark {
    opacity: 0.06;
  }

  .rf-hero-container {
    position: relative;
    z-index: 2;
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .rf-persona-nav {
    display: inline-flex;
    align-items: center;
    list-style: none;
    gap: 4px;
    background: var(--bg-subtle);
    border: 1px solid var(--border-subtle);
    border-radius: 100px;
    padding: 5px;
    margin-bottom: 28px;
  }

  .rf-tab-item {
    padding: 7px 18px;
    border-radius: 100px;
    font-family: var(--font-heading);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .rf-tab-item:hover {
    color: var(--text-main);
  }

  .rf-tab-item.active {
    background: var(--rf-accent);
    color: #FFFFFF;
    box-shadow: 0 2px 8px rgba(240, 6, 88, 0.35);
  }

  .rf-title {
    font-family: var(--font-heading);
    font-size: 46px;
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: var(--text-main);
    margin-bottom: 20px;
    max-width: 820px;
  }

  .rf-lead {
    font-family: var(--font-body);
    font-size: 17.5px;
    line-height: 1.68;
    color: var(--text-body);
    max-width: 780px;
    margin-bottom: 30px;
  }

  .rf-lead strong {
    color: var(--text-main);
    font-weight: 600;
  }

  .rf-meta-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .rf-pill {
    font-family: var(--font-code);
    font-size: 12px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 6px;
    background: var(--bg-subtle);
    border: 1px solid var(--border-subtle);
    color: var(--text-muted);
  }

  /* Roomfive Two-Column Case Study Header */
  .rf-project-header {
    display: grid;
    grid-template-columns: 1.4fr 0.9fr;
    gap: 40px;
    padding: 36px 32px 30px;
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg-surface);
  }

  @media (max-width: 860px) {
    .rf-project-header {
      grid-template-columns: 1fr;
      gap: 28px;
      padding: 24px 20px;
    }
  }

  .rf-project-left {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .rf-scope-label {
    font-family: var(--font-heading);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--rf-accent);
  }

  .rf-project-title {
    font-family: var(--font-heading);
    font-size: 27px;
    font-weight: 800;
    line-height: 1.25;
    letter-spacing: -0.02em;
    color: var(--text-main);
  }

  .rf-project-scope-desc {
    font-family: var(--font-body);
    font-size: 15px;
    line-height: 1.65;
    color: var(--text-body);
  }

  .rf-project-right {
    display: flex;
    flex-direction: column;
    gap: 18px;
    background: var(--bg-subtle);
    padding: 20px 24px;
    border-radius: 12px;
    border: 1px solid var(--border-subtle);
  }

  .rf-meta-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .rf-meta-label {
    font-family: var(--font-heading);
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .rf-meta-val {
    font-family: var(--font-body);
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text-main);
    line-height: 1.45;
  }

  .case-card {
    scroll-margin-top: 130px;
  }

  .case-subtab-btn.active {
    background: var(--rf-accent) !important;
    color: #FFFFFF !important;
    border-color: var(--rf-accent) !important;
    box-shadow: 0 2px 8px rgba(240, 6, 88, 0.35) !important;
  }

  /* Jump buttons inside deck */
  .rf-jump-btn {
    padding: 9px 20px;
    border-radius: 100px;
    font-family: var(--font-heading);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: var(--rf-accent);
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .rf-jump-btn:hover {
    background: var(--rf-accent-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(240, 6, 88, 0.35);
  }
`;

// Inject roomfive styles into <style>
fullCasesHtml = fullCasesHtml.replace('</style>', `\n${roomfiveStyles}\n</style>`);

// 5. Replace Site Header with Roomfive Minimalist Header
const oldHeaderRegex = /<header class="site-header">[\s\S]*?<\/header>/;
const newHeader = `<header class="rf-header">
    <a href="javascript:void(0)" onclick="switchMainView('deck')" class="rf-brand">
      <strong>BALAAJEE V.R.</strong>
      <span class="rf-brand-sub">/ Senior UI/UX Design Manager</span>
    </a>

    <nav class="rf-nav-pills" aria-label="Main Navigation">
      <button class="rf-nav-tab active" id="tabBtnDeck" onclick="switchMainView('deck')">
        👔 Leadership Deck (10)
      </button>
      <button class="rf-nav-tab" id="tabBtnCases" onclick="switchMainView('cases')">
        🎨 UI/UX Case Studies (5)
      </button>
      <button class="rf-nav-tab" id="tabBtnCV" onclick="switchMainView('cv')">
        📄 Executive CV
      </button>
    </nav>

    <div class="rf-actions">
      <a href="mailto:vrbberaj@gmail.com" class="rf-btn-contact">
        Get In Touch &rarr;
      </a>
      <button class="theme-toggle-btn" id="themeToggleBtn" onclick="toggleTheme()" aria-label="Toggle theme">
        <span id="themeIcon">☀️</span>
      </button>
    </div>
  </header>`;

fullCasesHtml = fullCasesHtml.replace(oldHeaderRegex, newHeader);

// 6. Replace Hero Section with Andrew Couldwell's Roomfive Hero
const oldHeroRegex = /<section class="hero-section">[\s\S]*?<\/section>/;
const newRoomfiveHero = `<section class="rf-hero">
    <div class="rf-watermark" id="rfWatermark">LEADER</div>
    <div class="rf-hero-container">
      <ul class="rf-persona-nav">
        <li class="rf-tab-item active" id="tabLeader" onclick="switchRfPersona('leader')">Leader</li>
        <li class="rf-tab-item" id="tabSystems" onclick="switchRfPersona('systems')">Systems</li>
        <li class="rf-tab-item" id="tabStrategist" onclick="switchRfPersona('strategist')">Strategist</li>
        <li class="rf-tab-item" id="tabArchitect" onclick="switchRfPersona('architect')">Architect</li>
      </ul>

      <h1 class="rf-title" id="rfHeroTitle">Senior UI/UX Design Manager</h1>
      <p class="rf-lead" id="rfHeroLead">
        <strong>Leading products, design systems, and multidisciplinary squads.</strong> Over 18+ years scaling enterprise design practices across Europe and India. Collaborating closely with Regional Commercial Directors, Product Directors, and Engineering Leads to bridge strategic business OKRs with high-velocity product delivery.
      </p>

      <div class="rf-meta-pills">
        <span class="rf-pill">Ex-IBM</span>
        <span class="rf-pill">Ericsson</span>
        <span class="rf-pill">Zebra Technologies</span>
        <span class="rf-pill">ZF Wabco</span>
        <span class="rf-pill">18+ Years Enterprise Experience</span>
        <span class="rf-pill" style="color: var(--rf-accent); border-color: var(--rf-accent-border);">Available for European Roles</span>
      </div>
    </div>
  </section>`;

fullCasesHtml = fullCasesHtml.replace(oldHeroRegex, newRoomfiveHero);

// 7. Inject Two-Column Roomfive Scope & Involvement Headers into the 5 Case Studies
// Case 1: Ericsson
const ericssonOldHeader = /<div class="case-card-header">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const ericssonRfHeader = `<div class="rf-project-header">
    <div class="rf-project-left">
      <span class="rf-scope-label">SCOPE &amp; BUSINESS MANDATE</span>
      <h2 class="rf-project-title">Ericsson SalesOps CPQ: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine</h2>
      <p class="rf-project-scope-desc">
        Ericsson’s multi-region commercial sales organization was paralyzed by a 14-tab legacy Excel quoting sheet riddled with 2,400+ fragile macros, unversioned discount rules, and manual Director sign-offs. The mandate: re-architect this multi-million dollar quoting flow into an automated, responsive web application with real-time margin validation, dynamic approval triggers, and sub-second catalog search.
      </p>
    </div>
    <div class="rf-project-right">
      <div class="rf-meta-block">
        <span class="rf-meta-label">INVOLVEMENT &amp; ROLE</span>
        <p class="rf-meta-val">Lead UI/UX Designer &amp; Information Architect<br>Senior Manager &bull; Jul 2019 – Sep 2020</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">KEY STAKEHOLDERS</span>
        <p class="rf-meta-val">Regional Commercial Directors, Engineering Leads, Global Deal Desk</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">MEASURABLE IMPACT</span>
        <p class="rf-meta-val"><strong style="color: var(--rf-accent);">-92%</strong> Quote Turnaround (6 Days &rarr; 42 Mins)<br><strong style="color: var(--rf-accent);">$18M+</strong> Annual Margin Leakage Protected</p>
      </div>
    </div>
  </div>`;
fullCasesHtml = fullCasesHtml.replace(ericssonOldHeader, ericssonRfHeader);

// Case 2: IBM Watson
const watsonOldHeader = /<article class="case-card" id="case-ibm-watson" data-category="ibm-watson">\s*<div class="case-card-header">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const watsonRfHeader = `<article class="case-card" id="case-ibm-watson" data-category="ibm-watson">
  <div class="rf-project-header">
    <div class="rf-project-left">
      <span class="rf-scope-label">SCOPE &amp; BUSINESS MANDATE</span>
      <h2 class="rf-project-title">IBM Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX</h2>
      <p class="rf-project-scope-desc">
        Designing autonomous multi-agent task execution while preserving Human-in-the-Loop governance for regulated Fortune 500 enterprises. We transformed black-box generative AI into an explainable, auditable system with confidence thresholds and side-by-side diff checks.
      </p>
    </div>
    <div class="rf-project-right">
      <div class="rf-meta-block">
        <span class="rf-meta-label">INVOLVEMENT &amp; ROLE</span>
        <p class="rf-meta-val">Senior Manager UI/UX Design<br>Enterprise Agentic AI &bull; Sep 2024 – Jan 2026</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">KEY STAKEHOLDERS</span>
        <p class="rf-meta-val">Enterprise Ops, Compliance Officers, AI Model Engineers</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">MEASURABLE IMPACT</span>
        <p class="rf-meta-val"><strong style="color: var(--rf-accent);">62%</strong> Faster Cross-System Execution<br><strong style="color: var(--rf-accent);">0</strong> Audit Violations Across 14 Squads</p>
      </div>
    </div>
  </div>`;
fullCasesHtml = fullCasesHtml.replace(watsonOldHeader, watsonRfHeader);

// Case 3: Zebra
const zebraOldHeader = /<article class="case-card" id="case-zebra" data-category="zebra">\s*<div class="case-card-header">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const zebraRfHeader = `<article class="case-card" id="case-zebra" data-category="zebra">
  <div class="rf-project-header">
    <div class="rf-project-left">
      <span class="rf-scope-label">SCOPE &amp; BUSINESS MANDATE</span>
      <h2 class="rf-project-title">Zebra Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics</h2>
      <p class="rf-project-scope-desc">
        Scaling mission-critical IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers. Conducted in-situ contextual research in sub-zero freezers to redesign rugged scanner interaction paradigms.
      </p>
    </div>
    <div class="rf-project-right">
      <div class="rf-meta-block">
        <span class="rf-meta-label">INVOLVEMENT &amp; ROLE</span>
        <p class="rf-meta-val">UI/UX Product Design Manager<br>Industrial IoT &bull; Jul 2021 – Aug 2024</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">KEY STAKEHOLDERS</span>
        <p class="rf-meta-val">Hardware Product Directors, Warehouse Ops, Enterprise IT</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">MEASURABLE IMPACT</span>
        <p class="rf-meta-val"><strong style="color: var(--rf-accent);">-99%</strong> Staging Time (8 Secs vs 4.5 Days)<br><strong style="color: var(--rf-accent);">-45%</strong> Warehouse Conveyor Stoppages</p>
      </div>
    </div>
  </div>`;
fullCasesHtml = fullCasesHtml.replace(zebraOldHeader, zebraRfHeader);

// Case 4: IBM Carbon
const carbonOldHeader = /<article class="case-card" id="case-ibm-carbon" data-category="ibm-carbon">\s*<div class="case-card-header">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const carbonRfHeader = `<article class="case-card" id="case-ibm-carbon" data-category="ibm-carbon">
  <div class="rf-project-header">
    <div class="rf-project-left">
      <span class="rf-scope-label">SCOPE &amp; BUSINESS MANDATE</span>
      <h2 class="rf-project-title">IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance</h2>
      <p class="rf-project-scope-desc">
        Eliminating multi-million dollar design debt by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads. Established the Contribution Council flywheel to review, govern, and merge component tokens without engineering friction.
      </p>
    </div>
    <div class="rf-project-right">
      <div class="rf-meta-block">
        <span class="rf-meta-label">INVOLVEMENT &amp; ROLE</span>
        <p class="rf-meta-val">DesignOps &amp; Governance Lead<br>Senior Manager &bull; 2024–2026</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">KEY STAKEHOLDERS</span>
        <p class="rf-meta-val">14 Distributed Product Squads, Front-End Architects, Accessibility Leads</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">MEASURABLE IMPACT</span>
        <p class="rf-meta-val"><strong style="color: var(--rf-accent);">+28%</strong> Front-End Sprint Velocity<br><strong style="color: var(--rf-accent);">-70%</strong> Visual Drift Bugs Across Releases</p>
      </div>
    </div>
  </div>`;
fullCasesHtml = fullCasesHtml.replace(carbonOldHeader, carbonRfHeader);

// Case 5: ZF Wabco
const wabcoOldHeader = /<article class="case-card" id="case-zf-wabco" data-category="zf-wabco">\s*<div class="case-card-header">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const wabcoRfHeader = `<article class="case-card" id="case-zf-wabco" data-category="zf-wabco">
  <div class="rf-project-header">
    <div class="rf-project-left">
      <span class="rf-scope-label">SCOPE &amp; BUSINESS MANDATE</span>
      <h2 class="rf-project-title">ZF Wabco Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics</h2>
      <p class="rf-project-scope-desc">
        Designing a dual-interface ecosystem: a glanceable, distraction-free in-cab HUD cluster for commercial truck drivers compliant with strict EU automotive safety standards (&lt;1.2s glance time), paired with an automated fleet command center for dispatchers.
      </p>
    </div>
    <div class="rf-project-right">
      <div class="rf-meta-block">
        <span class="rf-meta-label">INVOLVEMENT &amp; ROLE</span>
        <p class="rf-meta-val">UI/UX Senior Specialist<br>Automotive Safety &bull; Oct 2020 – Jul 2021</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">KEY STAKEHOLDERS</span>
        <p class="rf-meta-val">Fleet Dispatchers, Commercial Truck Drivers, EU Safety Regulators</p>
      </div>
      <div class="rf-meta-block">
        <span class="rf-meta-label">MEASURABLE IMPACT</span>
        <p class="rf-meta-val"><strong style="color: var(--rf-accent);">&lt; 1.2s</strong> Eyes-Off-Road Glance Time<br><strong style="color: var(--rf-accent);">100%</strong> EU Commercial Safety Certified</p>
      </div>
    </div>
  </div>`;
fullCasesHtml = fullCasesHtml.replace(wabcoOldHeader, wabcoRfHeader);

// 8. Assemble Navigation Order: 1. Leadership Deck FIRST, 2. Cases SECOND, 3. CV THIRD
const viewDeckHtml = `
    <!-- VIEW 1: EXECUTIVE LEADERSHIP DECK (DEFAULT & COMES FIRST) -->
    <div id="viewDeck" class="main-view active" style="padding: 24px 0 60px; background: #0A111E;">
      <div class="deck-stage" style="max-width: 1240px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Deck Header Strip -->
        <div class="deck-topbar" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background: rgba(18, 22, 34, 0.95); border: 1px solid var(--border-medium); border-radius: 14px;">
          <div class="brand-group" style="display: flex; align-items: center; gap: 14px;">
            <img src="profile.jpg" alt="Balaajee V.R." class="brand-avatar" onerror="this.src='photo_300x400.jpg'" style="width: 38px; height: 38px; border-radius: 50%; border: 2px solid var(--rf-accent);">
            <div>
              <h2 style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: #FFFFFF; line-height: 1.2;">Balaajee V.R. &bull; <span style="color: var(--rf-accent);">Executive Leadership Deck</span></h2>
              <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8;">Senior UI/UX Design Manager &bull; 18+ Years Enterprise Experience</span>
            </div>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button onclick="switchMainView('cases')" class="rf-btn-contact" style="padding: 7px 16px; font-size: 12px;">
              <span>Explore 5 UI/UX Case Studies &rarr;</span>
            </button>
            <a href="Balaajee_VR_Leadership_Deck.pdf" target="_blank" style="padding: 7px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.08); color: #E2E8F0; border: 1px solid rgba(255,255,255,0.2); text-decoration: none;">
              Download PDF
            </a>
          </div>
        </div>

        <!-- The 10 Keynote Slides -->
        <main class="keynote-container" style="position: relative;">
          ${slidesHtml}
        </main>

        <!-- Floating Slide Navigation Bar -->
        <div class="deck-bottombar" style="margin-top: 24px; display: flex; justify-content: center; align-items: center; gap: 16px; background: rgba(18, 22, 34, 0.95); padding: 10px 24px; border-radius: 100px; border: 1px solid var(--border-medium); max-width: 520px; margin-left: auto; margin-right: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.5);">
          <button class="btn-keynote" id="deckPrevBtn" title="Previous Slide (Left Arrow)" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #FFFFFF; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            &larr;
          </button>
          <div class="nav-counter" style="font-family: var(--font-code); font-size: 12px; font-weight: 700; color: #E2E8F0; letter-spacing: 0.05em;">
            SLIDE <span id="deckCurrentSlideNum" style="color: var(--rf-accent);">1</span> OF <span id="deckTotalSlidesNum">10</span>
          </div>
          <div class="nav-dots" id="deckDotsContainer" style="display: flex; gap: 6px;"></div>
          <button class="btn-keynote" id="deckNextBtn" title="Next Slide (Right Arrow)" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #FFFFFF; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            &rarr;
          </button>
        </div>

        <!-- Cross-Link Banner to UI/UX Case Studies -->
        <div style="margin-top: 36px; background: rgba(240, 6, 88, 0.06); border: 1px dashed var(--rf-accent-border); border-radius: 16px; padding: 24px 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 16px; color: #FFFFFF; font-weight: 800;">Looking for granular UI/UX interaction design, live data-grids &amp; UX personas?</h4>
            <p style="font-size: 13px; color: #94A3B8; margin-top: 4px;">Explore all 5 standalone product case studies with interactive simulated browser apps, 14-tab journey flows, and interview CAR defense guides.</p>
          </div>
          <button class="rf-btn-contact" onclick="switchMainView('cases')" style="padding: 10px 22px;">
            Explore 5 UI/UX Case Studies &rarr;
          </button>
        </div>

      </div>
    </div>
`;

// Insert #viewDeck before #viewCases
fullCasesHtml = fullCasesHtml.replace(
  '<main id="mainContent">\n\n    <!-- VIEW 1: UI/UX CASE STUDIES (DEFAULT & PRIMARY) -->\n    <div id="viewCases" class="main-view active">',
  `<main id="mainContent">\n\n${viewDeckHtml}\n\n    <!-- VIEW 2: UI/UX CASE STUDIES (DEDICATED & SEPARATE) -->\n    <div id="viewCases" class="main-view" style="display: none;">`
);

// Inject deck CSS into <style>
fullCasesHtml = fullCasesHtml.replace(
  '</style>',
  `\n/* ==========================================================================\n   KEYNOTE LEADERSHIP DECK EMBEDDED STYLES\n   ========================================================================== */\n${deckCss}\n</style>`
);

// 9. Add Roomfive Persona Switcher & SPA Controller Scripts
const roomfiveScripts = `
    // Andrew Couldwell (roomfive.net) Persona Switcher
    const rfPersonas = {
      leader: {
        watermark: 'LEADER',
        title: 'Senior UI/UX Design Manager',
        lead: '<strong>Leading products, design systems, and multidisciplinary squads.</strong> Over 18+ years scaling enterprise design practices across Europe and India. Collaborating closely with Regional Commercial Directors, Product Directors, and Engineering Leads to bridge strategic business OKRs with high-velocity product delivery.'
      },
      systems: {
        watermark: 'SYSTEMS',
        title: 'Design Systems & Token Architect',
        lead: '<strong>Multi-brand component systems and zero-drift code parity.</strong> Architecting multi-brand design systems, token governance (IBM Carbon), and DesignOps frameworks that reduce front-end development cycle times by 45% and eliminate cross-squad visual drift.'
      },
      strategist: {
        watermark: 'STRATEGY',
        title: 'Enterprise B2B Product Strategist',
        lead: '<strong>Converting legacy chaos into modern high-revenue SaaS.</strong> Spearheaded the end-to-end digital transformation of Ericsson’s mission-critical 14-tab Excel quoting workbook into an automated Cloud CPQ, shrinking quote cycle times from 14 days to 4 hours and protecting $24M in deal margins.'
      },
      architect: {
        watermark: 'ARCHITECT',
        title: 'Principal Interaction & AI UX Architect',
        lead: '<strong>High-density data grids, rugged ergonomics, and mission-critical UI.</strong> Designing sub-second rugged scanner workflows (Zebra Technologies), real-time commercial vehicle telematics (ZF Wabco), and agentic AI incident command systems (IBM Watson AIOps).'
      }
    };

    function switchRfPersona(role) {
      document.querySelectorAll('.rf-tab-item').forEach(el => el.classList.remove('active'));
      const activeTab = document.getElementById('tab' + role.charAt(0).toUpperCase() + role.slice(1));
      if (activeTab) activeTab.classList.add('active');

      const data = rfPersonas[role];
      if (data) {
        const wm = document.getElementById('rfWatermark');
        const title = document.getElementById('rfHeroTitle');
        const lead = document.getElementById('rfHeroLead');
        if (wm) wm.textContent = data.watermark;
        if (title) title.textContent = data.title;
        if (lead) lead.innerHTML = data.lead;
      }
    }

    // Main navigation tabs (Deck vs Cases vs CV)
    function switchMainView(view) {
      document.querySelectorAll('.main-view').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.rf-nav-tab').forEach(btn => btn.classList.remove('active'));

      if (view === 'deck') {
        const deck = document.getElementById('viewDeck');
        if (deck) deck.style.display = 'block';
        const tab = document.getElementById('tabBtnDeck');
        if (tab) tab.classList.add('active');
        history.replaceState(null, null, '#deck');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'cases') {
        const cases = document.getElementById('viewCases');
        if (cases) cases.style.display = 'block';
        const tab = document.getElementById('tabBtnCases');
        if (tab) tab.classList.add('active');
        history.replaceState(null, null, '#cases');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'cv') {
        const cv = document.getElementById('viewCV');
        if (cv) cv.style.display = 'block';
        const tab = document.getElementById('tabBtnCV');
        if (tab) tab.classList.add('active');
        history.replaceState(null, null, '#cv');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // Keynote Deck Slide Controller
    let currentDeckSlide = 0;
    let deckSlides = [];
    let totalDeckSlides = 0;
    let deckCurrentSlideNum, deckTotalSlidesNum, deckPrevBtn, deckNextBtn, deckDotsContainer;

    function initDeck() {
      deckSlides = document.querySelectorAll('#viewDeck .slide');
      totalDeckSlides = deckSlides.length;

      deckCurrentSlideNum = document.getElementById('deckCurrentSlideNum');
      deckTotalSlidesNum = document.getElementById('deckTotalSlidesNum');
      deckPrevBtn = document.getElementById('deckPrevBtn');
      deckNextBtn = document.getElementById('deckNextBtn');
      deckDotsContainer = document.getElementById('deckDotsContainer');

      if (deckTotalSlidesNum) deckTotalSlidesNum.textContent = totalDeckSlides;

      if (deckDotsContainer) {
        deckDotsContainer.innerHTML = '';
        deckSlides.forEach((_, idx) => {
          const dot = document.createElement('div');
          dot.className = 'nav-dot' + (idx === 0 ? ' active' : '');
          dot.onclick = () => goToDeckSlide(idx);
          deckDotsContainer.appendChild(dot);
        });
      }

      if (deckPrevBtn) deckPrevBtn.onclick = () => changeDeckSlide(-1);
      if (deckNextBtn) deckNextBtn.onclick = () => changeDeckSlide(1);

      updateDeckSlide();
    }

    function changeDeckSlide(dir) {
      goToDeckSlide(currentDeckSlide + dir);
    }

    function goToDeckSlide(index) {
      if (index < 0) index = 0;
      if (index >= totalDeckSlides) index = totalDeckSlides - 1;
      currentDeckSlide = index;
      updateDeckSlide();
    }

    function updateDeckSlide() {
      if (!deckSlides.length) return;
      deckSlides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentDeckSlide);
      });

      if (deckCurrentSlideNum) deckCurrentSlideNum.textContent = currentDeckSlide + 1;

      if (deckDotsContainer) {
        const dots = deckDotsContainer.querySelectorAll('.nav-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentDeckSlide);
        });
      }

      if (deckPrevBtn) deckPrevBtn.style.opacity = currentDeckSlide === 0 ? '0.4' : '1';
      if (deckNextBtn) deckNextBtn.style.opacity = currentDeckSlide === totalDeckSlides - 1 ? '0.4' : '1';
    }

    // Scroll helper to smoothly scroll to target case study card
    function scrollToCase(caseId) {
      setTimeout(() => {
        const target = document.getElementById(caseId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }

    // Hash router for direct links (#deck, #cases, #cv, #case-ericsson)
    window.addEventListener('DOMContentLoaded', () => {
      initDeck();

      const hash = window.location.hash;
      if (hash === '#cases' || hash.startsWith('#case-')) {
        switchMainView('cases');
        if (hash.startsWith('#case-')) {
          scrollToCase(hash.substring(1));
        }
      } else if (hash === '#cv') {
        switchMainView('cv');
      } else {
        switchMainView('deck');
      }
    });

    // Keyboard navigation for deck
    document.addEventListener('keydown', (e) => {
      const deckView = document.getElementById('viewDeck');
      if (deckView && deckView.style.display !== 'none') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          changeDeckSlide(1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          changeDeckSlide(-1);
        }
      }
    });
`;

fullCasesHtml = fullCasesHtml.replace('</script>', `${roomfiveScripts}\n</script>`);

// Write out to index.html
const outputFile = path.join(__dirname, 'index.html');
fs.writeFileSync(outputFile, fullCasesHtml, 'utf8');
console.log('Successfully written index.html with Andrew Couldwell roomfive.net look & feel!');
