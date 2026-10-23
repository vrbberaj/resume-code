// build_clean_architecture.js
// Completely separates the portfolio into clean, dedicated, intuitive pages:
// 1. index.html           -> Clean Welcome / Overview Portal with Cinematic Executive Video Player & 3 Pathways
// 2. leadership.html       -> Single-page vertically scrollable Leadership Deck (NO horizontal pagination)
// 3. cv.html               -> Full-page Executive CV with prominent Download PDF button
// 4. case-ericsson.html    -> Dedicated in-depth case study for Ericsson SalesOps CPQ with Video Walkthrough & Sticky PiP
// 5. case-ibm-watson.html  -> Dedicated in-depth case study for IBM Watson Agentic AI & AIOps
// 6. case-zebra.html       -> Dedicated in-depth case study for Zebra Scanner IoT & Rugged UX
// 7. case-ibm-carbon.html  -> Dedicated in-depth case study for IBM Carbon Token Engine & DesignOps
// 8. case-zf-wabco.html    -> Dedicated in-depth case study for ZF Wabco Fleet Telematics & In-Cab HUD
// 9. serve.js              -> Clean server routing for all paths

const fs = require('fs');
const path = require('path');

console.log('Beginning compilation of clean, intuitive multi-page architecture with video stage...');

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
        <a href="Balaajee_VR_Senior_UX_Manager_CV.pdf" download="Balaajee_VR_Senior_UX_Manager_CV.pdf" class="btn-download-pdf">
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
// 1. GENERATE index.html (WELCOME & OVERVIEW PORTAL WITH VIDEO STAGE)
// ============================================================================
console.log('Generating index.html (Welcome & Overview Portal with Executive Video Stage)...');

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
      padding: 60px 0 54px;
    }

    .hero-wrap {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .hero-two-col {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 44px;
      align-items: center;
    }

    @media (max-width: 960px) {
      .hero-two-col {
        grid-template-columns: 1fr;
        gap: 36px;
      }
    }

    .hero-badge-strip {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
      flex-wrap: wrap;
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
      font-size: 42px;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.15;
      color: var(--text-main);
      margin-bottom: 18px;
    }

    .hero-heading span {
      color: var(--primary-accent);
    }

    .hero-bio {
      font-size: 17px;
      line-height: 1.65;
      color: var(--text-body);
      margin-bottom: 26px;
    }

    .hero-bio strong {
      color: var(--text-main);
      font-weight: 600;
    }

    .hero-cta-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .btn-hero-primary {
      padding: 11px 22px;
      border-radius: 100px;
      font-family: var(--font-heading);
      font-size: 13.5px;
      font-weight: 700;
      background: var(--text-main);
      color: #FFFFFF;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-hero-primary:hover {
      background: #000;
      transform: translateY(-1px);
    }

    .btn-hero-secondary {
      padding: 11px 20px;
      border-radius: 100px;
      font-family: var(--font-heading);
      font-size: 13.5px;
      font-weight: 700;
      background: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      color: var(--text-main);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-hero-secondary:hover {
      background: #FFFFFF;
    }

    /* Executive Video Stage Card */
    .video-hero-card {
      position: relative;
      background: #0B0E17;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.12);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-hero-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 24px 50px rgba(240, 6, 88, 0.2);
      border-color: var(--primary-accent);
    }

    .video-poster-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9.8;
      overflow: hidden;
    }

    .video-poster-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      filter: brightness(0.85);
      transition: transform 0.5s ease;
    }

    .video-hero-card:hover .video-poster-img {
      transform: scale(1.03);
    }

    .video-gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(11, 14, 23, 0.2) 0%, rgba(11, 14, 23, 0.85) 100%);
    }

    .video-top-tag {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(11, 14, 23, 0.8);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 100px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .video-duration-pill {
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(240, 6, 88, 0.9);
      color: #FFFFFF;
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
    }

    .video-play-btn-pulse {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--primary-accent);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 0 rgba(240, 6, 88, 0.6);
      transition: all 0.2s ease;
      animation: playPulse 2s infinite;
    }

    @keyframes playPulse {
      0% { box-shadow: 0 0 0 0 rgba(240, 6, 88, 0.6); }
      70% { box-shadow: 0 0 0 14px rgba(240, 6, 88, 0); }
      100% { box-shadow: 0 0 0 0 rgba(240, 6, 88, 0); }
    }

    .video-hero-card:hover .video-play-btn-pulse {
      transform: translate(-50%, -50%) scale(1.1);
      background: #FFFFFF;
      color: var(--primary-accent);
    }

    .video-bottom-caption {
      position: absolute;
      bottom: 16px;
      left: 18px;
      right: 18px;
      color: #FFFFFF;
    }

    .video-bottom-caption h4 {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 2px;
    }

    .video-bottom-caption p {
      font-size: 12px;
      color: #CBD5E1;
      line-height: 1.4;
    }

    /* 3 Primary Pathways */
    .pathways-section {
      padding: 36px 0;
      max-width: 1200px;
      margin: 0 auto;
      padding-left: 24px;
      padding-right: 24px;
    }

    .pathways-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    @media (max-width: 860px) {
      .pathways-grid { grid-template-columns: 1fr; }
    }

    .pathway-card {
      background: var(--bg-surface);
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
    }

    .pathway-icon {
      font-size: 28px;
      margin-bottom: 12px;
    }

    .pathway-title {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 6px;
    }

    .pathway-desc {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.55;
      margin-bottom: 18px;
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
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      padding: 30px 0;
    }

    .stats-grid {
      max-width: 1200px;
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
      font-size: 36px;
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
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Case Studies Showcase Section */
    .cases-section {
      padding: 64px 0 96px;
      max-width: 1200px;
      margin: 0 auto;
      padding-left: 24px;
      padding-right: 24px;
    }

    .section-header {
      margin-bottom: 36px;
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
      font-size: 32px;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: var(--text-main);
      margin-bottom: 10px;
    }

    .section-desc {
      font-size: 15.5px;
      color: var(--text-muted);
      max-width: 680px;
    }

    .cases-grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .case-card-preview {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 18px;
      padding: 30px;
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
        gap: 22px;
        padding: 22px;
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
      gap: 10px;
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
      font-size: 23px;
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
      gap: 14px;
    }

    .preview-metric-block {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .metric-label {
      font-family: var(--font-heading);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    .metric-value {
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 800;
      color: var(--primary-accent);
    }

    .btn-read-case {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 100px;
      background: var(--primary-accent);
      color: #FFFFFF;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
      margin-top: 4px;
    }

    .btn-read-case:hover {
      background: var(--primary-hover);
    }

    /* Video Player Modal */
    .video-modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(8, 12, 20, 0.88);
      backdrop-filter: blur(12px);
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .video-modal-box {
      background: #0B0E17;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      width: 100%;
      max-width: 820px;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
      animation: modalFadeIn 0.25s ease;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #FFFFFF;
    }

    .modal-title {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .modal-close-btn {
      background: transparent;
      border: none;
      color: #94A3B8;
      font-size: 22px;
      cursor: pointer;
      line-height: 1;
    }

    .modal-close-btn:hover { color: #FFFFFF; }

    .modal-video-stage {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .modal-transcript-area {
      padding: 20px 24px;
      background: #111522;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      color: #E2E8F0;
      font-size: 13.5px;
      line-height: 1.65;
    }

    .transcript-header {
      font-family: var(--font-heading);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--primary-accent);
      margin-bottom: 8px;
    }
  </style>
</head>
<body>

  ${getGlobalNav('home')}

  <!-- Welcome Hero -->
  <section class="welcome-hero">
    <div class="hero-wrap">
      <div class="hero-two-col">
        
        <!-- Left: Introduction & Bio -->
        <div>
          <div class="hero-badge-strip">
            <span class="status-badge"><span class="status-dot"></span> Available for European &amp; Global Roles</span>
            <span style="font-size: 12px; color: var(--text-muted);">18+ Years &bull; Ex-IBM, Ericsson, Zebra, ZF Wabco</span>
          </div>

          <h1 class="hero-heading">
            Senior UI/UX Design Manager &amp; <span>Product Design Director</span>
          </h1>

          <p class="hero-bio">
            Welcome to my portfolio. I specialize in <strong>turning complex enterprise chaos into high-margin SaaS</strong>, scaling multi-brand design systems, and partnering with Commercial Directors and Engineering Leads to bridge strategic business OKRs with high-velocity product delivery.
          </p>

          <div class="hero-cta-group">
            <a href="/leadership" class="btn-hero-primary">
              👔 Executive Leadership Deck &rarr;
            </a>
            <a href="/cv" class="btn-hero-secondary">
              📄 View Full Executive CV
            </a>
            <a href="#cases" class="btn-hero-secondary">
              🎨 5 Case Studies &darr;
            </a>
          </div>
        </div>

        <!-- Right: Cinematic Executive Video Stage Card -->
        <div>
          <div class="video-hero-card" onclick="openVideoModal()">
            <div class="video-poster-wrapper">
              <img src="profile.jpg" alt="Balaajee V.R." class="video-poster-img" onerror="this.src='photo_300x400.jpg'">
              <div class="video-gradient-overlay"></div>
              <div class="video-top-tag">
                <span>🎬</span> EXECUTIVE INTRO
              </div>
              <div class="video-duration-pill">01:15</div>
              <div class="video-play-btn-pulse">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
              </div>
              <div class="video-bottom-caption">
                <h4>Watch Balaajee V.R. &bull; 60s Executive Intro</h4>
                <p>Leadership philosophy, enterprise SaaS &amp; team scaling</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- 3 Direct Pathways -->
  <section class="pathways-section">
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

  <!-- Video Player Modal -->
  <div class="video-modal-backdrop" id="videoModalBackdrop" onclick="closeVideoModal(event)">
    <div class="video-modal-box">
      <div class="modal-header">
        <div class="modal-title">
          <span>🎬</span>
          <span>Balaajee V.R. &bull; Executive Portfolio Introduction</span>
        </div>
        <button class="modal-close-btn" onclick="closeVideoModal()">&times;</button>
      </div>
      <div class="modal-video-stage">
        <!-- Interactive Video Player Container -->
        <video id="executiveVideoPlayer" controls poster="profile.jpg" style="width: 100%; height: 100%; object-fit: cover;">
          <source src="intro.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
      </div>
      <div class="modal-transcript-area">
        <div class="transcript-header">EXECUTIVE SPOKEN TRANSCRIPT &bull; 60 SECONDS</div>
        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
          <button type="button" class="chapter-tag" onclick="seekExecutiveIntro(0)" style="font-family: var(--font-code); font-size: 11px; padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.08); color: #94A3B8; border: 1px solid rgba(255,255,255,0.12); cursor: pointer;">⏱️ 0:00 Welcome &amp; Background</button>
          <button type="button" class="chapter-tag" onclick="seekExecutiveIntro(22)" style="font-family: var(--font-code); font-size: 11px; padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.08); color: #94A3B8; border: 1px solid rgba(255,255,255,0.12); cursor: pointer;">⏱️ 0:22 Leadership Philosophy</button>
          <button type="button" class="chapter-tag" onclick="seekExecutiveIntro(42)" style="font-family: var(--font-code); font-size: 11px; padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.08); color: #94A3B8; border: 1px solid rgba(255,255,255,0.12); cursor: pointer;">⏱️ 0:42 Enterprise Impact &amp; CPQ</button>
        </div>
        <p>
          <em>"Hi, I'm Balaajee. Welcome to my portfolio. Over the past 18 years at companies like IBM, Ericsson, and Zebra Technologies, I've focused on one core challenge: transforming messy, high-friction enterprise systems into high-velocity digital products. On this site, you'll find my Executive Leadership Deck, which covers my approach to team topologies, design systems, and 30-60-90 day onboarding. Below that, explore five in-depth case studies—starting with how we turned Ericsson's 14-tab legacy Excel sheet into an automated cloud CPQ that saved 18 million dollars in margin leakage. Feel free to explore the interactive prototypes, review my full CV, and let's connect."</em>
        </p>
        <div style="margin-top: 10px; font-size: 11.5px; color: #94A3B8; font-family: var(--font-code);">
          💡 <strong>Video Ready to Drop:</strong> Place your recorded <code>intro.mp4</code> in this folder or link your Loom / YouTube URL.
        </div>
      </div>
    </div>
  </div>

  <script>
    function openVideoModal() {
      document.getElementById('videoModalBackdrop').style.display = 'flex';
      const video = document.getElementById('executiveVideoPlayer');
      if (video) video.play().catch(e => console.log('Autoplay prevented or no file yet'));
    }

    function closeVideoModal(e) {
      if (!e || e.target.id === 'videoModalBackdrop' || e.target.classList.contains('modal-close-btn')) {
        document.getElementById('videoModalBackdrop').style.display = 'none';
        const video = document.getElementById('executiveVideoPlayer');
        if (video) video.pause();
      }
    }

    function seekExecutiveIntro(seconds) {
      const video = document.getElementById('executiveVideoPlayer');
      if (video) {
        video.currentTime = seconds;
        video.play().catch(e => console.log('Seeking intro video'));
      }
    }
  </script>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
console.log('index.html with Video Stage written successfully.');

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
        <a href="Balaajee_VR_Senior_UX_Manager_CV.pdf" download="Balaajee_VR_Senior_UX_Manager_CV.pdf" class="btn-contact" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px;">
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
// 4. GENERATE 5 DEDICATED CASE STUDY PAGES (WITH EXECUTIVE VIDEO WALKTHROUGH & SMART PIP)
// ============================================================================
console.log('Extracting and compiling 5 dedicated case study pages with video walkthrough...');

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

    /* Executive Video Walkthrough Banner */
    .case-video-walkthrough {
      background: #0B0E17;
      border-radius: 18px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 24px 28px;
      margin-bottom: 32px;
      display: grid;
      grid-template-columns: 1.25fr 0.95fr;
      gap: 28px;
      align-items: center;
      color: #FFFFFF;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
    }

    @media (max-width: 860px) {
      .case-video-walkthrough {
        grid-template-columns: 1fr;
        padding: 20px;
        gap: 20px;
      }
    }

    .walkthrough-label {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      color: var(--primary-accent);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .walkthrough-heading {
      font-family: var(--font-heading);
      font-size: 20px;
      font-weight: 800;
      line-height: 1.25;
      margin-bottom: 8px;
      color: #FFFFFF;
    }

    .walkthrough-desc {
      font-size: 13.5px;
      line-height: 1.6;
      color: #CBD5E1;
      margin-bottom: 16px;
    }

    .walkthrough-chapters {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
    }

    .chapter-tag {
      font-family: var(--font-code);
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      color: #94A3B8;
      border: 1px solid rgba(255, 255, 255, 0.12);
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .chapter-tag:hover {
      background: rgba(240, 6, 88, 0.2);
      color: #FFFFFF;
      border-color: rgba(240, 6, 88, 0.5);
    }

    .btn-watch-walkthrough {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 20px;
      border-radius: 100px;
      background: var(--primary-accent);
      color: #FFFFFF;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-watch-walkthrough:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }

    .walkthrough-player-box {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 12px;
      overflow: hidden;
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: pointer;
    }

    .walkthrough-poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      filter: brightness(0.8);
    }

    /* Floating Smart Picture-in-Picture Mini-Player on Scroll */
    .floating-pip-player {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 320px;
      background: #0B0E17;
      border: 1px solid rgba(240, 6, 88, 0.4);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
      z-index: 9999;
      display: none;
      animation: pipSlideIn 0.3s ease;
    }

    @keyframes pipSlideIn {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .pip-header {
      padding: 8px 12px;
      background: #111522;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-heading);
      font-size: 11.5px;
      font-weight: 700;
      color: #FFFFFF;
    }

    .pip-close-btn {
      background: transparent;
      border: none;
      color: #94A3B8;
      font-size: 16px;
      cursor: pointer;
      line-height: 1;
    }

    .pip-close-btn:hover { color: #FFFFFF; }

    .pip-body {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
    }

    .pip-body video, .pip-body img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

    <!-- Executive Case Walkthrough Video Stage -->
    <div class="case-video-walkthrough" id="caseWalkthroughStage">
      <div>
        <div class="walkthrough-label">EXECUTIVE CASE DEBRIEF &bull; 90 SECONDS</div>
        <h2 class="walkthrough-heading">Watch Balaajee Present: ${options.shortName}</h2>
        <p class="walkthrough-desc">
          ${options.videoSummary}
        </p>
        <div class="walkthrough-chapters">
          <button type="button" class="chapter-tag" onclick="seekCaseVideo(0)">⏱️ 0:00 The Context &amp; Pain</button>
          <button type="button" class="chapter-tag" onclick="seekCaseVideo(30)">⏱️ 0:30 UX Re-Architecture</button>
          <button type="button" class="chapter-tag" onclick="seekCaseVideo(65)">⏱️ 1:05 Business ROI &amp; Metrics</button>
        </div>
        <button class="btn-watch-walkthrough" onclick="toggleCaseVideoPlay()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Watch Video Walkthrough (90s)
        </button>
      </div>

      <div class="walkthrough-player-box" onclick="toggleCaseVideoPlay()">
        <video id="caseWalkthroughVideo" poster="profile.jpg" controls style="width: 100%; height: 100%; object-fit: cover;">
          <source src="${options.videoFile || 'intro.mp4'}" type="video/mp4">
        </video>
      </div>
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

  <!-- Smart Sticky Picture-in-Picture Mini-Player on Scroll -->
  <div class="floating-pip-player" id="floatingPipMiniPlayer">
    <div class="pip-header">
      <span>🎬 Speaking: ${options.shortName}</span>
      <button onclick="closeFloatingPip()" class="pip-close-btn" title="Dismiss">&times;</button>
    </div>
    <div class="pip-body" onclick="scrollToVideoStage()" title="Click to scroll to main video debrief" style="cursor: pointer;">
      <img src="profile.jpg" alt="Balaajee V.R." style="width: 100%; height: 100%; object-fit: cover; object-position: center 25%;">
      <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 10px;">
        <span style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; color: #FFFFFF; display: flex; align-items: center; gap: 6px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          ${options.shortName} &bull; 90s Walkthrough
        </span>
      </div>
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

    function toggleCaseVideoPlay() {
      const video = document.getElementById('caseWalkthroughVideo');
      if (video) {
        if (video.paused) {
          video.play().catch(e => alert('Video placeholder ready! Drop your recorded video into this folder or link your Loom walkthrough.'));
        } else {
          video.pause();
        }
      }
    }

    function seekCaseVideo(seconds) {
      const video = document.getElementById('caseWalkthroughVideo');
      if (video) {
        video.currentTime = seconds;
        video.play().catch(e => {
          alert('Chapter seek ready! Once you drop your recorded walkthrough video into this folder, clicking chapters will jump to exactly ' + seconds + 's.');
        });
      }
    }

    function scrollToVideoStage() {
      const stage = document.getElementById('caseWalkthroughStage');
      if (stage) stage.scrollIntoView({ behavior: 'smooth' });
    }

    function closeFloatingPip() {
      document.getElementById('floatingPipMiniPlayer').style.display = 'none';
      pipDismissed = true;
    }

    let pipDismissed = false;

    // Smart Sticky PiP on scroll past the video section
    window.addEventListener('scroll', () => {
      if (pipDismissed) return;
      const stage = document.getElementById('caseWalkthroughStage');
      const pip = document.getElementById('floatingPipMiniPlayer');
      if (!stage || !pip) return;

      const rect = stage.getBoundingClientRect();
      if (rect.bottom < 50) {
        pip.style.display = 'block';
      } else {
        pip.style.display = 'none';
      }
    });

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
  videoSummary: 'In this 90-second executive briefing, I break down the 14-tab legacy spreadsheet audit, our keyboard-first UX re-architecture, and how we prevented $18M in margin leakage.',
  videoFile: 'ericsson_walkthrough.mp4',
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
  videoSummary: 'Explaining our governance framework for enterprise agentic AI, confidence thresholds, and side-by-side diff checks across 14 global product squads.',
  videoFile: 'watson_walkthrough.mp4',
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
  videoSummary: 'A 90-second briefing on contextual research in sub-zero freezers and designing sub-second barcode workflows for 1.2M+ rugged devices.',
  videoFile: 'zebra_walkthrough.mp4',
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
  videoSummary: 'Walking through our Contribution Council flywheel and synchronizing Figma tokens with React production pipelines to eliminate 70% of UI drift.',
  videoFile: 'carbon_walkthrough.mp4',
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
  videoSummary: 'Demonstrating how we designed distraction-free in-cab HUD clusters for 80,000+ European commercial trucks compliant with EU safety standards.',
  videoFile: 'wabco_walkthrough.mp4',
  cardHtml: wabcoCard,
  prevLink: { url: '/case-ibm-carbon.html', label: 'IBM Carbon Token Engine' },
  nextLink: null
});
fs.writeFileSync(path.join(__dirname, 'case-zf-wabco.html'), wabcoPageHtml, 'utf8');
console.log('case-zf-wabco.html written successfully.');

console.log('ALL PAGES REBUILT CLEANLY WITH VIDEO INTRO & STICKY PIP MINI-PLAYER!');
