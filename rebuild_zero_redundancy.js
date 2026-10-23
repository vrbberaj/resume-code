// rebuild_zero_redundancy.js
// Completely removes all redundant info, repeated text, duplicate headers, and multi-paragraph spam across the portfolio.

const fs = require('fs');
const path = require('path');

console.log('--- Starting Zero-Redundancy Portfolio Build ---');

// 1. Common Fonts & Meta
const commonHeadLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap">
`;

// 2. Clean Global Navigation Bar (Single, Non-Duplicated Header)
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
        ${activePage === 'cv' ? `
        <button onclick="window.print()" class="btn-download-pdf" style="cursor: pointer;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print CV
        </button>
        ` : ''}
        ${activePage === 'leadership' ? `
        <a href="Balaajee_VR_Leadership_Deck.pdf" download class="btn-download-pdf">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Deck (PDF)
        </a>
        ` : `
        <a href="Balaajee_VR_Senior_UX_Manager_CV.pdf" download="Balaajee_VR_Senior_UX_Manager_CV.pdf" class="btn-download-pdf">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download CV (PDF)
        </a>
        `}
        <a href="contact.html" class="btn-contact">
          Get In Touch &rarr;
        </a>
      </div>
    </div>
  </header>
  `;
}

// 3. Global Core CSS
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
// PART A: COMPILE index.html (WELCOME PORTAL WITH EDITORIAL PROJECT INDEX)
// ============================================================================
console.log('1. Compiling lean index.html (Eliminating redundant pathway cards & text walls)...');

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
      padding: 56px 0 50px;
    }

    .hero-wrap {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .hero-two-col {
      display: grid;
      grid-template-columns: 1.18fr 0.82fr;
      gap: 40px;
      align-items: center;
    }

    @media (max-width: 960px) {
      .hero-two-col {
        grid-template-columns: 1fr;
        gap: 32px;
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
      font-size: 40px;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.15;
      color: var(--text-main);
      margin-bottom: 16px;
    }

    .hero-heading span {
      color: var(--primary-accent);
    }

    .hero-bio {
      font-size: 16.5px;
      line-height: 1.6;
      color: var(--text-body);
      margin-bottom: 24px;
    }

    .hero-bio strong {
      color: var(--text-main);
      font-weight: 600;
    }

    .hero-cta-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
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
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.12);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-hero-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 22px 48px rgba(240, 6, 88, 0.2);
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
      width: 58px;
      height: 58px;
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

    .video-bottom-caption {
      position: absolute;
      bottom: 16px;
      left: 18px;
      right: 18px;
      color: #FFFFFF;
    }

    .video-bottom-caption h4 {
      font-family: var(--font-heading);
      font-size: 14.5px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 2px;
    }

    .video-bottom-caption p {
      font-size: 11.5px;
      color: #CBD5E1;
      line-height: 1.4;
    }

    /* Stats Strip */
    .stats-section {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 24px 0;
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
      gap: 3px;
    }

    .stat-number {
      font-family: var(--font-heading);
      font-size: 32px;
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

    /* Selected Work: Editorial Project Index */
    .cases-section {
      padding: 56px 0 80px;
      max-width: 1200px;
      margin: 0 auto;
      padding-left: 24px;
      padding-right: 24px;
    }

    .section-header {
      margin-bottom: 32px;
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
      font-size: 30px;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: var(--text-main);
      margin-bottom: 8px;
    }

    .section-desc {
      font-size: 15px;
      color: var(--text-muted);
      max-width: 700px;
    }

    .editorial-case-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .editorial-case-row {
      display: grid;
      grid-template-columns: 210px 1.4fr 1fr auto;
      gap: 28px;
      align-items: center;
      padding: 24px 28px;
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      text-decoration: none;
      color: inherit;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .editorial-case-row:hover {
      border-color: var(--primary-accent);
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.05);
    }

    .row-brand-col {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .row-company {
      font-family: var(--font-heading);
      font-size: 15.5px;
      font-weight: 800;
      color: var(--text-main);
    }

    .row-domain {
      font-family: var(--font-code);
      font-size: 11px;
      color: var(--primary-accent);
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .row-main-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .row-title {
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.3;
    }

    .row-summary {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.45;
    }

    .row-metric-col {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .row-metric-pill {
      display: inline-flex;
      align-items: baseline;
      gap: 5px;
      font-family: var(--font-heading);
    }

    .row-metric-pill .m-val {
      font-size: 18px;
      font-weight: 900;
      color: var(--gold);
    }

    .row-metric-pill .m-lbl {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-body);
    }

    .row-metric-sub {
      font-family: var(--font-code);
      font-size: 11px;
      color: var(--text-muted);
    }

    .row-arrow-col {
      text-align: right;
    }

    .btn-row-action {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 100px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      font-family: var(--font-heading);
      font-size: 12.5px;
      font-weight: 700;
      color: var(--text-main);
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .editorial-case-row:hover .btn-row-action {
      background: var(--primary-accent);
      color: #FFFFFF;
      border-color: var(--primary-accent);
    }

    @media (max-width: 900px) {
      .editorial-case-row {
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 20px;
      }
      .row-arrow-col {
        text-align: left;
      }
    }

    /* Video Player Modal */
    .video-modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .video-modal-box {
      background: #0B0E17;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      max-width: 780px;
      width: 100%;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      animation: modalFadeIn 0.25s ease-out;
    }

    @keyframes modalFadeIn {
      from { transform: scale(0.96); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-title {
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
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
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000000;
    }

    .modal-transcript-area {
      padding: 18px 22px;
      background: #111522;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      color: #E2E8F0;
      font-size: 13px;
      line-height: 1.6;
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
            I specialize in <strong>turning complex enterprise chaos into high-margin SaaS</strong>, scaling multi-brand design systems, and partnering with Commercial Directors and Engineering Leads to bridge strategic business OKRs with high-velocity product delivery.
          </p>

          <div class="hero-cta-group">
            <a href="#cases" class="btn-hero-primary">
              🎨 Explore 5 Case Studies &darr;
            </a>
            <a href="/leadership" class="btn-hero-secondary">
              👔 Executive Leadership Deck &rarr;
            </a>
            <a href="/cv" class="btn-hero-secondary">
              📄 View Full Executive CV
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

  <!-- Selected Work: High-Impact Editorial Project Index -->
  <section class="cases-section" id="cases">
    <div class="section-header">
      <div class="section-label">SELECTED WORK &bull; DEDICATED IN-DEPTH CASE STUDIES</div>
      <h2 class="section-title">Enterprise Product Case Studies</h2>
      <p class="section-desc">
        Click any case below for the dedicated deep dive: 90-second video walkthrough, interactive live browser mockup, architecture flows, tokens, and interview CAR defense.
      </p>
    </div>

    <div class="editorial-case-list">

      <!-- Case 1: Ericsson -->
      <a href="/case-ericsson.html" class="editorial-case-row">
        <div class="row-brand-col">
          <span class="row-company">Ericsson Global</span>
          <span class="row-domain">Enterprise CPQ SaaS</span>
        </div>
        <div class="row-main-col">
          <h3 class="row-title">SalesOps Cloud: 14-Tab Legacy Excel to Automated Deal Engine</h3>
          <p class="row-summary">Modernized unversioned macro-laden spreadsheets into an automated quoting engine for 1,200+ telecom engineers.</p>
        </div>
        <div class="row-metric-col">
          <div class="row-metric-pill">
            <span class="m-val">$18M</span>
            <span class="m-lbl">Margin Protected</span>
          </div>
          <div class="row-metric-sub">6 Days &rarr; 42 Mins Turnaround</div>
        </div>
        <div class="row-arrow-col">
          <span class="btn-row-action">Deep Dive &rarr;</span>
        </div>
      </a>

      <!-- Case 2: IBM Watson -->
      <a href="/case-ibm-watson.html" class="editorial-case-row">
        <div class="row-brand-col">
          <span class="row-company">IBM Software Labs</span>
          <span class="row-domain">Agentic AI &amp; Orchestration</span>
        </div>
        <div class="row-main-col">
          <h3 class="row-title">Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX</h3>
          <p class="row-summary">Architected autonomous agent execution while preserving Human-in-the-Loop governance across 14 global product squads.</p>
        </div>
        <div class="row-metric-col">
          <div class="row-metric-pill">
            <span class="m-val">62%</span>
            <span class="m-lbl">Faster Task Velocity</span>
          </div>
          <div class="row-metric-sub">0 Compliance Violations</div>
        </div>
        <div class="row-arrow-col">
          <span class="btn-row-action">Deep Dive &rarr;</span>
        </div>
      </a>

      <!-- Case 3: Zebra Technologies -->
      <a href="/case-zebra.html" class="editorial-case-row">
        <div class="row-brand-col">
          <span class="row-company">Zebra Technologies</span>
          <span class="row-domain">Industrial IoT &amp; Hardware UX</span>
        </div>
        <div class="row-main-col">
          <h3 class="row-title">Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics</h3>
          <p class="row-summary">Zero-touch barcode provisioning and IoT diagnostics for 1.2M+ rugged hardware devices across global distribution centers.</p>
        </div>
        <div class="row-metric-col">
          <div class="row-metric-pill">
            <span class="m-val">1.2M+</span>
            <span class="m-lbl">Active Enterprise Devices</span>
          </div>
          <div class="row-metric-sub">8 Secs vs 4.5 Days Staging</div>
        </div>
        <div class="row-arrow-col">
          <span class="btn-row-action">Deep Dive &rarr;</span>
        </div>
      </a>

      <!-- Case 4: IBM Carbon -->
      <a href="/case-ibm-carbon.html" class="editorial-case-row">
        <div class="row-brand-col">
          <span class="row-company">IBM Software Labs</span>
          <span class="row-domain">DesignOps &amp; Governance</span>
        </div>
        <div class="row-main-col">
          <h3 class="row-title">Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance</h3>
          <p class="row-summary">Synchronized Figma tokens with React production pipelines across 14 squads via the Contribution Council flywheel.</p>
        </div>
        <div class="row-metric-col">
          <div class="row-metric-pill">
            <span class="m-val">-70%</span>
            <span class="m-lbl">UI Drift &amp; Regressions</span>
          </div>
          <div class="row-metric-sub">+28% Sprint Dev Acceleration</div>
        </div>
        <div class="row-arrow-col">
          <span class="btn-row-action">Deep Dive &rarr;</span>
        </div>
      </a>

      <!-- Case 5: ZF Wabco -->
      <a href="/case-zf-wabco.html" class="editorial-case-row">
        <div class="row-brand-col">
          <span class="row-company">ZF Wabco</span>
          <span class="row-domain">Automotive Fleet &amp; HUD</span>
        </div>
        <div class="row-main-col">
          <h3 class="row-title">Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics</h3>
          <p class="row-summary">Distraction-free in-cab HUD cluster compliant with strict EU automotive standards, paired with fleet command center.</p>
        </div>
        <div class="row-metric-col">
          <div class="row-metric-pill">
            <span class="m-val">80k+</span>
            <span class="m-lbl">Active EU Trucks</span>
          </div>
          <div class="row-metric-sub">&lt; 1.2s Eye-Off-Road Glance</div>
        </div>
        <div class="row-arrow-col">
          <span class="btn-row-action">Deep Dive &rarr;</span>
        </div>
      </a>

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
        <video id="executiveVideoPlayer" controls poster="profile.jpg" style="width: 100%; height: 100%; object-fit: cover;">
          <source src="intro.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
      </div>
      <div class="modal-transcript-area">
        <div class="transcript-header">EXECUTIVE SPOKEN TRANSCRIPT &bull; 60 SECONDS</div>
        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
          <button type="button" class="chapter-tag" onclick="seekExecutiveIntro(0)">⏱️ 0:00 Welcome &amp; Background</button>
          <button type="button" class="chapter-tag" onclick="seekExecutiveIntro(22)">⏱️ 0:22 Leadership Philosophy</button>
          <button type="button" class="chapter-tag" onclick="seekExecutiveIntro(42)">⏱️ 0:42 Enterprise Impact &amp; CPQ</button>
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
console.log('index.html written cleanly.');

// ============================================================================
// PART B: COMPILE leadership.html (SINGLE CLEAN PRESENTATION HEADER)
// ============================================================================
console.log('2. Compiling leadership.html (Removing redundant top strip & nested headers)...');

const deckRaw = fs.readFileSync(path.join(__dirname, 'leadership_deck.html'), 'utf8');

// Extract slides from keynote-container
const slidesMatch = deckRaw.match(/<main class="keynote-container">([\s\S]*?)<\/main>/);
let scrollableSlides = slidesMatch ? slidesMatch[1] : '';

// Make all slides active in vertical flow
scrollableSlides = scrollableSlides.replace(/class="slide"/g, 'class="slide active"');

// Ensure links in slides point directly to dedicated case studies
scrollableSlides = scrollableSlides.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 4/,
  `  <div style="margin-top: 18px; text-align: right;">
       <a href="/case-ericsson.html" class="btn-read-case" style="display: inline-flex; text-decoration: none; padding: 8px 18px; border-radius: 100px; background: var(--gold); color: #0D1B2E; font-weight: 700; font-size: 12.5px;">
         Explore Dedicated Ericsson Case Study &amp; Live Data Grid &rarr;
       </a>
     </div>
   </div>
 </section>
 <!-- SLIDE 4`
);

// Extract CSS from leadership_deck.html
const deckCssMatch = deckRaw.match(/<style>([\s\S]*?)<\/style>/);
const deckCss = deckCssMatch ? deckCssMatch[1] : '';

const leadershipHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balaajee V.R. | Executive Leadership Deck</title>
  <meta name="description" content="Executive Leadership Presentation: Scaling enterprise design teams, DesignOps token governance, cross-functional collaboration, and 30-60-90 day execution plan.">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}
    ${deckCss}

    /* Override deck layout for pure vertical scroll */
    body {
      background-color: #070B14;
      color: #E2E8F0;
    }

    .leadership-wrap {
      max-width: 1240px;
      margin: 0 auto;
      padding: 24px 24px 80px;
    }

    .keynote-container {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .slide {
      display: flex !important;
      opacity: 1 !important;
      transform: none !important;
      min-height: auto !important;
      padding: 3rem 3.4rem !important;
      margin-bottom: 0 !important;
    }

    /* Single Clean Jump Bar directly under Global Header */
    .deck-jump-bar {
      position: sticky;
      top: 60px;
      z-index: 950;
      background: rgba(13, 27, 46, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(200, 168, 74, 0.3);
      padding: 10px 0;
    }

    .jump-links {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      align-items: center;
      scrollbar-width: none;
    }
    .jump-links::-webkit-scrollbar { display: none; }

    .jump-item {
      padding: 5px 12px;
      border-radius: 100px;
      font-family: var(--font-code);
      font-size: 11px;
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
        <span style="font-family: var(--font-code); font-size: 11px; color: var(--gold); font-weight: 700; margin-right: 6px;">STRATEGIC SECTIONS:</span>
        <a href="#slide-1" class="jump-item">01. Overview</a>
        <a href="#slide-2" class="jump-item">02. 4 Pillars</a>
        <a href="#slide-3" class="jump-item">03. Team Topology</a>
        <a href="#slide-4" class="jump-item">04. IBM AI-UX</a>
        <a href="#slide-5" class="jump-item">05. Zebra IoT</a>
        <a href="#slide-6" class="jump-item">06. ZF Wabco HUD</a>
        <a href="#slide-7" class="jump-item">07. Token Ops</a>
        <a href="#slide-8" class="jump-item">08. Agentic DesignOps</a>
        <a href="#slide-9" class="jump-item">09. 30-60-90 Plan</a>
        <a href="#slide-10" class="jump-item">10. Target Roles</a>
      </div>
    </div>
  </div>

  <div class="leadership-wrap">
    <!-- The 10 Strategic Sections (Scrollable Vertically) -->
    <main class="keynote-container">
      ${scrollableSlides}
    </main>
  </div>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'leadership.html'), leadershipHtml, 'utf8');
console.log('leadership.html written cleanly.');

// ============================================================================
// PART C: COMPILE cv.html (PURE FULL-PAGE CV WITH ZERO DUPLICATE ACTION BARS)
// ============================================================================
console.log('3. Compiling cv.html (Eliminating redundant action bars)...');

const corpCvRaw = fs.readFileSync(path.join(__dirname, 'resume_corporate.html'), 'utf8');

// Extract resume container
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

    body {
      background-color: #DDD9D0;
    }

    #container {
      max-width: 900px;
      margin: 24px auto 60px;
      background: transparent;
    }

    @media print {
      .global-header {
        display: none !important;
      }
      body {
        background-color: #FFFFFF !important;
      }
      #container {
        margin: 0 !important;
        max-width: 100% !important;
      }
    }
  </style>
</head>
<body class="bg-[#DDD9D0]">

  ${getGlobalNav('cv')}

  <!-- Full Corporate CV Document -->
  <div id="container">
    ${cvContainerHtml}
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'cv.html'), cvHtml, 'utf8');
console.log('cv.html written cleanly.');

// ============================================================================
// PART D: COMPILE 5 DEDICATED CASE STUDY PAGES (UNIFIED STAGE & CONSOLIDATED TABS)
// ============================================================================
console.log('4. Compiling 5 Dedicated Case Studies (Eliminating duplicate video/header blocks and merging tabs)...');

const caseSourceRaw = fs.readFileSync(path.join(__dirname, 'rebuild_as_uiux_case_studies.js'), 'utf8');
const caseCssMatch = caseSourceRaw.match(/<style>([\s\S]*?)<\/style>/);
const caseCss = caseCssMatch ? caseCssMatch[1] : '';

function buildDedicatedCasePage(options) {
  // Strip duplicate old case-card-header from cardHtml
  let cleanedCard = options.cardHtml;
  cleanedCard = cleanedCard.replace(/<div class="case-card-header">[\s\S]*?<\/div>\s*<!-- Interactive Case Study Subnav -->/i, '');

  // Consolidate sub-tabs to 4 clean, purposeful tabs
  cleanedCard = cleanedCard.replace(
    /<div class="case-subnav" role="tablist">[\s\S]*?<\/div>/i,
    `<div class="case-subnav" role="tablist">
      <button class="case-subtab-btn active" onclick="switchCaseTab('${options.caseId}', 'ui', this)">
        <span>💻 Interactive Solution</span>
      </button>
      <button class="case-subtab-btn" onclick="switchCaseTab('${options.caseId}', 'research', this)">
        <span>🔍 Research &amp; Architecture</span>
      </button>
      <button class="case-subtab-btn" onclick="switchCaseTab('${options.caseId}', 'tokens', this)">
        <span>🎨 Design Tokens &amp; Governance</span>
      </button>
      <button class="case-subtab-btn" onclick="switchCaseTab('${options.caseId}', 'impact', this)">
        <span>📈 Business ROI &amp; Defense</span>
      </button>
    </div>`
  );

  // Merge panels 5 & 6 into panel-impact
  const metricsMatch = cleanedCard.match(new RegExp(`<div class="case-tab-panel" id="panel-${options.caseId}-metrics">([\\s\\S]*?)<\\/div>\\s*<!-- Tab Panel 6`, 'i'));
  const carMatch = cleanedCard.match(new RegExp(`<div class="case-tab-panel" id="panel-${options.caseId}-car">([\\s\\S]*?)<\\/div>\\s*<div class="case-footer">`, 'i'));

  if (metricsMatch && carMatch) {
    const combinedImpactPanel = `
      <div class="case-tab-panel" id="panel-${options.caseId}-impact">
        <div style="margin-bottom: 24px;">
          <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--text-main); margin-bottom: 12px;">Quantitative Impact &amp; Usability Metrics</h4>
          ${metricsMatch[1]}
        </div>
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border-subtle);">
          <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--text-main); margin-bottom: 12px;">Executive CAR Defense &amp; Leadership Q&amp;A</h4>
          ${carMatch[1]}
        </div>
      </div>
    `;
    cleanedCard = cleanedCard.replace(
      new RegExp(`<div class="case-tab-panel" id="panel-${options.caseId}-metrics">[\\s\\S]*?<div class="case-tab-panel" id="panel-${options.caseId}-car">[\\s\\S]*?<div class="case-footer">`, 'i'),
      combinedImpactPanel + '<div class="case-footer">'
    );
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${options.title} | Balaajee V.R.</title>
  <meta name="description" content="${options.leadSummary}">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}
    ${caseCss}

    .case-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 28px 24px 80px;
    }

    .breadcrumb-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
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

    /* UNIFIED EXECUTIVE CASE STAGE (Zero Redundancy) */
    .unified-case-stage {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 20px;
      padding: 32px 36px;
      margin-bottom: 28px;
      display: grid;
      grid-template-columns: 1.25fr 0.95fr;
      gap: 36px;
      align-items: center;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.03);
    }

    @media (max-width: 920px) {
      .unified-case-stage {
        grid-template-columns: 1fr;
        padding: 24px;
        gap: 24px;
      }
    }

    .stage-badges {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    .stage-company-pill {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 100px;
      background: rgba(240, 6, 88, 0.08);
      color: var(--primary-accent);
      border: 1px solid rgba(240, 6, 88, 0.25);
    }

    .stage-role-pill {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-muted);
    }

    .stage-award-pill {
      font-size: 11px;
      font-weight: 700;
      color: #B45309;
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.25);
      padding: 2px 8px;
      border-radius: 100px;
    }

    .stage-title {
      font-family: var(--font-heading);
      font-size: 26px;
      font-weight: 900;
      line-height: 1.25;
      color: var(--text-main);
      letter-spacing: -0.02em;
      margin-bottom: 10px;
    }

    .stage-lead {
      font-size: 14.5px;
      line-height: 1.55;
      color: var(--text-body);
      margin-bottom: 16px;
    }

    .stage-metrics-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }

    .stage-metric-chip {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 6px 12px;
      display: flex;
      flex-direction: column;
    }

    .stage-metric-chip .chip-lbl {
      font-family: var(--font-code);
      font-size: 9.5px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .stage-metric-chip .chip-val {
      font-family: var(--font-heading);
      font-size: 13.5px;
      font-weight: 800;
      color: var(--text-main);
    }

    .stage-chapters {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chapter-tag {
      font-family: var(--font-code);
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 6px;
      background: #FFFFFF;
      color: var(--text-body);
      border: 1px solid var(--border-medium);
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .chapter-tag:hover {
      background: var(--primary-accent);
      color: #FFFFFF;
      border-color: var(--primary-accent);
    }

    /* Video Player Box inside Stage */
    .stage-video-box {
      position: relative;
      background: #0B0E17;
      border-radius: 14px;
      overflow: hidden;
      aspect-ratio: 16 / 9.5;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }

    .stage-video-tag {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(11, 14, 23, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 100px;
      z-index: 5;
      pointer-events: none;
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
      cursor: pointer;
    }

    .pip-body img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
    }

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
        &larr; All Case Studies
      </a>
    </div>

    <!-- UNIFIED EXECUTIVE CASE STAGE -->
    <div class="unified-case-stage" id="caseWalkthroughStage">
      <div>
        <div class="stage-badges">
          <span class="stage-company-pill">${options.company}</span>
          <span class="stage-role-pill">${options.roleDates}</span>
          ${options.award ? `<span class="stage-award-pill">${options.award}</span>` : ''}
        </div>
        <h1 class="stage-title">${options.title}</h1>
        <p class="stage-lead">${options.leadSummary}</p>
        <div class="stage-metrics-row">
          ${options.metrics.map(m => `
            <div class="stage-metric-chip">
              <span class="chip-lbl">${m.label}</span>
              <span class="chip-val">${m.val}</span>
            </div>
          `).join('')}
        </div>
        <div class="stage-chapters">
          ${options.chapters.map(c => `
            <button type="button" class="chapter-tag" onclick="seekCaseVideo(${c.sec})">⏱️ ${c.text}</button>
          `).join('')}
        </div>
      </div>

      <div class="stage-video-box">
        <div class="stage-video-tag">🎬 90s Executive Debrief</div>
        <video id="caseWalkthroughVideo" poster="profile.jpg" controls style="width: 100%; height: 100%; object-fit: cover;">
          <source src="${options.videoFile || 'intro.mp4'}" type="video/mp4">
        </video>
      </div>
    </div>

    <!-- The Case Card Content (With Cleaned 4 Sub-Tabs) -->
    ${cleanedCard}

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
    <div class="pip-body" onclick="scrollToVideoStage()" title="Click to scroll to main video debrief">
      <img src="profile.jpg" alt="Balaajee V.R.">
      <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 10px;">
        <span style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; color: #FFFFFF; display: flex; align-items: center; gap: 6px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          ${options.shortName} &bull; 90s Walkthrough
        </span>
      </div>
    </div>
  </div>

  <script>
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

    // Smart Sticky PiP on scroll past the video stage
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

// Helper to extract case card and clean VP references
function extractArticle(caseId) {
  const startRegex = new RegExp(`<article class="case-card" id="${caseId}"[\\s\\S]*?<\\/article>`);
  const match = caseSourceRaw.match(startRegex);
  if (match) {
    let content = match[0];
    content = content.replace(/automated VP escalation triggers/g, 'automated Commercial Director escalation triggers');
    content = content.replace(/waiting days for VP email sign-offs/g, 'waiting days for Commercial Director email sign-offs');
    content = content.replace(/Email workbook to Regional Commercial VP for manual margin verification\./g, 'Email workbook to Regional Commercial Director for manual margin verification.');
    content = content.replace(/prompted required VP approval\./g, 'prompted required Commercial Director approval.');
    return content;
  }
  return '';
}

// 1. Ericsson Case
const ericssonCard = extractArticle('case-ericsson');
const ericssonPageHtml = buildDedicatedCasePage({
  caseId: 'ericsson',
  title: 'Ericsson SalesOps Cloud: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine',
  shortName: 'Ericsson SalesOps CPQ',
  company: 'Ericsson Global',
  roleDates: 'Lead UI/UX Designer &amp; Architect &bull; Jul 2019 – Sep 2020',
  award: '🏆 1st Place Hack-fest Award &bull; Spot Innovation Award',
  leadSummary: 'Modernizing an unversioned, macro-laden spreadsheet quoting nightmare into an enterprise CPQ engine, reducing turnaround from 6 days to 42 minutes and protecting $18M in margin leakage.',
  videoFile: 'ericsson_walkthrough.mp4',
  metrics: [
    { label: 'Target Users', val: '1,200+ Sales Engineers' },
    { label: 'Turnaround', val: '6 Days &rarr; 42 Mins (-92%)' },
    { label: 'Protected Margin', val: '$18M+ Annual' },
    { label: 'Core Tools', val: 'Figma, React, Tokens' }
  ],
  chapters: [
    { sec: 0, text: '0:00 14-Tab Excel Audit' },
    { sec: 30, text: '0:30 Keyboard Data Grid' },
    { sec: 65, text: '1:05 $18M Margin Impact' }
  ],
  cardHtml: ericssonCard,
  prevLink: null,
  nextLink: { url: '/case-ibm-watson.html', label: 'IBM Watson Agentic AI' }
});
fs.writeFileSync(path.join(__dirname, 'case-ericsson.html'), ericssonPageHtml, 'utf8');
console.log('case-ericsson.html written cleanly.');

// 2. IBM Watson Case
const watsonCard = extractArticle('case-ibm-watson');
const watsonPageHtml = buildDedicatedCasePage({
  caseId: 'watson',
  title: 'IBM Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX',
  shortName: 'IBM Watson Agentic AI',
  company: 'IBM Software Labs',
  roleDates: 'Senior Manager UI/UX Design &bull; Sep 2024 – Jan 2026',
  award: '🏆 Enterprise Design Excellence Award',
  leadSummary: 'Designing autonomous multi-agent task execution and Human-in-the-Loop governance for regulated Fortune 500 enterprises, transforming black-box AI into explainable workflows.',
  videoFile: 'watson_walkthrough.mp4',
  metrics: [
    { label: 'Organization Scale', val: '14 Product Squads' },
    { label: 'Task Execution', val: '62% Velocity Gain' },
    { label: 'Compliance', val: '0 Violations' },
    { label: 'Stack', val: 'Watson AI, Carbon, React' }
  ],
  chapters: [
    { sec: 0, text: '0:00 Black-Box AI Pain' },
    { sec: 35, text: '0:35 Human-in-the-Loop Diff' },
    { sec: 70, text: '1:10 62% Velocity &amp; Audit' }
  ],
  cardHtml: watsonCard,
  prevLink: { url: '/case-ericsson.html', label: 'Ericsson SalesOps CPQ' },
  nextLink: { url: '/case-zebra.html', label: 'Zebra Enterprise IoT' }
});
fs.writeFileSync(path.join(__dirname, 'case-ibm-watson.html'), watsonPageHtml, 'utf8');
console.log('case-ibm-watson.html written cleanly.');

// 3. Zebra Case
const zebraCard = extractArticle('case-zebra');
const zebraPageHtml = buildDedicatedCasePage({
  caseId: 'zebra',
  title: 'Zebra Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics',
  shortName: 'Zebra Enterprise IoT',
  company: 'Zebra Technologies',
  roleDates: 'UI/UX Product Design Manager &bull; Jul 2021 – Aug 2024',
  award: '🏆 Zebra Engineering Innovation Award',
  leadSummary: 'Scaling IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers and sub-zero freezer hubs.',
  videoFile: 'zebra_walkthrough.mp4',
  metrics: [
    { label: 'Active Fleet', val: '1.2M+ Rugged Devices' },
    { label: 'Staging Acceleration', val: '8s vs 4.5 Days (-99%)' },
    { label: 'Field Research', val: 'Sub-Zero Freezers' },
    { label: 'Platform', val: 'Android Enterprise, IoT' }
  ],
  chapters: [
    { sec: 0, text: '0:00 Sub-Zero Contextual Inquiry' },
    { sec: 35, text: '0:35 Zero-Touch Barcode Staging' },
    { sec: 70, text: '1:10 1.2M Devices &amp; Uptime' }
  ],
  cardHtml: zebraCard,
  prevLink: { url: '/case-ibm-watson.html', label: 'IBM Watson Agentic AI' },
  nextLink: { url: '/case-ibm-carbon.html', label: 'IBM Carbon Tokens' }
});
fs.writeFileSync(path.join(__dirname, 'case-zebra.html'), zebraPageHtml, 'utf8');
console.log('case-zebra.html written cleanly.');

// 4. IBM Carbon Case
const carbonCard = extractArticle('case-ibm-carbon');
const carbonPageHtml = buildDedicatedCasePage({
  caseId: 'carbon',
  title: 'IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance',
  shortName: 'IBM Carbon Tokens',
  company: 'IBM Software Labs',
  roleDates: 'DesignOps &amp; Governance Lead &bull; 2024–2026',
  award: '🏆 DesignOps Leadership Award',
  leadSummary: 'Eliminating multi-million dollar design debt by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads via the Contribution Council flywheel.',
  videoFile: 'carbon_walkthrough.mp4',
  metrics: [
    { label: 'Squad Footprint', val: '14 Distributed Squads' },
    { label: 'UI Drift Reduction', val: '-70% Visual Bugs' },
    { label: 'Front-End Velocity', val: '+28% Sprint Delivery' },
    { label: 'Tooling', val: 'Figma Tokens, CI/CD, Git' }
  ],
  chapters: [
    { sec: 0, text: '0:00 Multi-Squad Token Drift' },
    { sec: 30, text: '0:30 Contribution Council' },
    { sec: 65, text: '1:05 +28% Front-End Speed' }
  ],
  cardHtml: carbonCard,
  prevLink: { url: '/case-zebra.html', label: 'Zebra Enterprise IoT' },
  nextLink: { url: '/case-zf-wabco.html', label: 'ZF Wabco HUD' }
});
fs.writeFileSync(path.join(__dirname, 'case-ibm-carbon.html'), carbonPageHtml, 'utf8');
console.log('case-ibm-carbon.html written cleanly.');

// 5. ZF Wabco Case
const wabcoCard = extractArticle('case-zf-wabco');
const wabcoPageHtml = buildDedicatedCasePage({
  caseId: 'wabco',
  title: 'ZF Wabco Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics',
  shortName: 'ZF Wabco Telematics',
  company: 'ZF Wabco',
  roleDates: 'UI/UX Senior Specialist &bull; Oct 2020 – Jul 2021',
  award: '🏆 Automotive Ergonomics Safety Citation',
  leadSummary: 'Designing a distraction-free in-cab HUD cluster compliant with strict EU automotive standards (<1.2s glance time), paired with an automated fleet command center for dispatchers.',
  videoFile: 'wabco_walkthrough.mp4',
  metrics: [
    { label: 'Deployment', val: '80,000+ European Trucks' },
    { label: 'Eyes-Off-Road Glance', val: '< 1.2s EU Standard' },
    { label: 'Domain', val: 'Commercial Telematics' },
    { label: 'Framework', val: 'Automotive HUD, Qt/QML' }
  ],
  chapters: [
    { sec: 0, text: '0:00 In-Cab Cognitive Fatigue' },
    { sec: 35, text: '0:35 Distraction-Free HUD UX' },
    { sec: 65, text: '1:05 80k Trucks &amp; EU Safety' }
  ],
  cardHtml: wabcoCard,
  prevLink: { url: '/case-ibm-carbon.html', label: 'IBM Carbon Tokens' },
  nextLink: null
});
fs.writeFileSync(path.join(__dirname, 'case-zf-wabco.html'), wabcoPageHtml, 'utf8');
console.log('case-zf-wabco.html written cleanly.');

console.log('=== ALL PAGES REBUILT CLEANLY WITH ZERO REDUNDANCY ===');
