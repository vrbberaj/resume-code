// build_executive_suite.js
// Compiles the entire executive portfolio suite with:
// 1. Terminology: 'Selected Work' / 'Flagship Product Transformations'
// 2. Welcome Page (index.html): Pure executive briefing room with 60s Welcome Video + High-level bio + 3 CTAs (ZERO case studies on homepage)
// 3. Selected Work Portal (work.html): Dedicated directory of the 5 flagship enterprise transformations
// 4. Five Full-Size, Multi-Section Scrollable Deep Dives (case-*.html): Uninterrupted scroll with sticky jump nav, deep research, live mockups, tokens, usability benchmarks, and CAR defense
// 5. Updated Navigation across leadership.html and cv.html

const fs = require('fs');
const path = require('path');

console.log('--- Starting Executive Suite Build ---');

// 1. Common Head Links
const commonHeadLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap">
`;

// 2. Global Navigation Bar Function
function getGlobalNav(activePage) {
  return `
  <header class="global-header">
    <div class="header-container">
      <a href="index.html" class="brand-link" aria-label="BVR Portfolio Home">
        <span class="brand-monogram">BVR</span>
        <span class="brand-tag">Product Design Suite</span>
      </a>

      <nav class="nav-links" aria-label="Main Navigation">
        <a href="index.html" class="nav-item ${activePage === 'home' ? 'active' : ''}">Selected Work</a>
        <a href="leadership.html" class="nav-item ${activePage === 'leadership' ? 'active' : ''}">Leadership</a>
        <a href="archive.html" class="nav-item ${activePage === 'archive' ? 'active' : ''}">Design Artifacts</a>
        <a href="gallery.html" class="nav-item ${activePage === 'gallery' ? 'active' : ''}">Career Gallery</a>
        <a href="cv.html" class="nav-item ${activePage === 'cv' ? 'active' : ''}">My Resume</a>
      </nav>

      <div class="header-actions">
        <a href="contact.html" class="btn-contact">
          Get In Touch &rarr;
        </a>
      </div>
    </div>
  </header>
  `;
}

// 3. Global Core CSS Styles
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
  img { max-width: 100%; height: auto; }
  html {
    scroll-behavior: smooth;
    overflow-x: clip;
    max-width: 100vw;
    width: 100%;
  }
  body {
    background-color: var(--bg-base);
    color: var(--text-body);
    font-family: var(--font-body);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
    max-width: 100vw;
    width: 100%;
  }

  /* Global Header */
  .global-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-subtle);
    padding: 10px 0;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  .header-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  .brand-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--text-main);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .brand-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 25%;
    border: 2px solid var(--border-medium);
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
    transition: transform 0.2s ease, border-color 0.2s ease;
    flex-shrink: 0;
  }

  .brand-link:hover .brand-avatar {
    transform: scale(1.05);
    border-color: var(--primary-accent);
  }

  .brand-meta {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
  }

  .brand-name {
    font-family: var(--font-heading);
    font-weight: 800;
    font-size: 14.5px;
    color: var(--text-main);
    letter-spacing: -0.01em;
  }

  .brand-role {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
  }

  .brand-monogram {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-weight: 900;
    font-size: 14.5px;
    letter-spacing: 0.08em;
    padding: 4px 9px;
    background: var(--text-main);
    color: #FFFFFF;
    border-radius: 6px;
    line-height: 1;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12);
    transition: all 0.2s ease;
  }

  .brand-link:hover .brand-monogram {
    background: var(--primary-accent);
    transform: scale(1.04);
  }

  .brand-tag {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-muted);
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
    white-space: nowrap;
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
    white-space: nowrap;
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
    white-space: nowrap;
  }

  .btn-contact:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(240, 6, 88, 0.3);
  }

  @media (max-width: 1200px) {
    .brand-role { display: none; }
    .btn-download-pdf { display: none; }
    .nav-item { padding: 6px 13px; font-size: 12.5px; }
  }

  @media (max-width: 1040px) {
    .header-container {
      padding: 0 16px;
      gap: 10px;
    }
    .header-actions { display: none; }
    .nav-links {
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      max-width: 100%;
      padding: 3px 4px;
    }
    .nav-links::-webkit-scrollbar { display: none; }
    .nav-item {
      padding: 6px 12px;
      font-size: 12px;
      flex-shrink: 0;
    }
  }

  @media (max-width: 600px) {
    .global-header {
      padding: 8px 0;
    }
    .header-container {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      padding: 0 12px;
      max-width: 100%;
      overflow: hidden;
    }
    .brand-link {
      justify-content: space-between;
    }
    .nav-links {
      width: 100%;
      max-width: 100%;
      display: flex;
      justify-content: flex-start;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border-radius: 12px;
    }
  }

  /* Global Minimalist Footer */
  .global-footer {
    background: #FFFFFF;
    border-top: 1px solid var(--border-subtle);
    padding: 48px 0 36px;
    margin-top: 60px;
  }

  .footer-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-left h5 {
    font-family: var(--font-heading);
    font-size: 15px;
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 4px;
  }

  .footer-left p {
    font-size: 13px;
    color: var(--text-muted);
  }

  .footer-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px 20px;
  }

  .footer-links a {
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.15s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .footer-links a:hover {
    color: var(--primary-accent);
  }

  @media (max-width: 640px) {
    .footer-container {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      padding: 0 16px;
    }
    .footer-links {
      gap: 10px 14px;
    }
  }
`;

// ============================================================================
// PART A: index.html — PURE CINEMATIC WELCOME PORTAL
// ============================================================================
console.log('1. Compiling index.html (Pure Welcome Portal with Video Stage & High-Level Positioning)...');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balaajee V.R. | Senior UI/UX Design Manager</title>
  <meta name="description" content="Welcome Portal of Balaajee V.R. — Senior UI/UX Design Manager. 18+ years leading enterprise UI/UX design, AI orchestration, and design systems across IBM, Ericsson, Zebra, ZF Wabco, and Infosys.">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}

    /* Welcome Hero Stage */
    .welcome-hero-stage {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 44px 0 40px;
    }

    .hero-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 40px;
      align-items: start;
    }

    @media (max-width: 980px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 36px;
      }
    }

    .hero-headline {
      font-family: var(--font-heading);
      font-size: 34px;
      font-weight: 900;
      letter-spacing: -0.025em;
      line-height: 1.22;
      color: var(--text-main);
      margin-bottom: 22px;
    }

    .hero-bio-lead {
      font-size: 16px;
      line-height: 1.65;
      color: var(--text-body);
      margin-bottom: 22px;
      max-width: 620px;
    }

    .hero-cta-group {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      margin-top: 6px;
    }

    .btn-hero-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 13px 28px;
      border-radius: 100px;
      background: var(--text-main);
      color: #FFFFFF;
      text-decoration: none;
      font-family: var(--font-heading);
      font-size: 14.5px;
      font-weight: 800;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
    }

    .btn-hero-primary:hover {
      background: var(--primary-accent);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(240, 6, 88, 0.25);
    }

    .btn-hero-secondary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: 100px;
      background: transparent;
      border: 1.5px solid var(--border-medium);
      color: var(--text-main);
      text-decoration: none;
      font-family: var(--font-heading);
      font-size: 14.5px;
      font-weight: 700;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-hero-secondary:hover {
      background: var(--bg-subtle);
      border-color: var(--text-main);
      transform: translateY(-2px);
    }

    /* Dedicated Executive Pedigree & Global Brand Trust Section */
    .pedigree-trust-section {
      margin-top: 40px;
      padding-top: 28px;
      border-top: 1px solid var(--border-subtle);
    }

    .pedigree-trust-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .pedigree-trust-title {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    .pedigree-brands-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
      align-items: center;
    }

    .brand-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 16px 12px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: default;
    }

    .brand-item:hover {
      background: #FFFFFF;
      border-color: var(--border-medium);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }

    .brand-logo-img {
      height: 30px;
      max-width: 88px;
      width: auto;
      object-fit: contain;
      margin-bottom: 10px;
      filter: none;
      opacity: 1;
      transition: transform 0.25s ease;
    }

    .brand-item:hover .brand-logo-img {
      transform: scale(1.08);
    }

    .brand-item-name {
      font-family: var(--font-heading);
      font-size: 13.5px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.2;
    }

    .brand-item-role {
      font-family: var(--font-code);
      font-size: 10.5px;
      color: var(--text-muted);
      margin-top: 3px;
      letter-spacing: 0.02em;
    }

    @media (max-width: 880px) {
      .pedigree-brands-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 580px) {
      .pedigree-brands-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
    }

    /* Video Player Centerpiece Card */
    .video-showcase-box {
      background: #0B0E17;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2);
    }

    .video-player-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9.8;
      background: #000000;
    }

    .video-player-frame video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .video-time-tag {
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(11, 14, 23, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      z-index: 10;
      letter-spacing: 0.04em;
    }

    .video-caption-bar {
      padding: 16px 20px;
      background: #111624;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #FFFFFF;
    }

    .video-caption-bar h4 {
      font-family: var(--font-heading);
      font-size: 14.5px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 2px;
    }

    .video-caption-bar p {
      font-size: 12px;
      color: #94A3B8;
    }

    .btn-transcript-toggle {
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-transcript-toggle:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .transcript-drawer {
      display: none;
      padding: 18px 20px;
      background: #0B0E17;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: #CBD5E1;
      font-size: 13px;
      line-height: 1.6;
    }

    .transcript-drawer.open {
      display: block;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Executive Career Key Metrics Strip */
    .hero-stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 22px;
      max-width: 620px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    }

    .h-stat {
      display: flex;
      flex-direction: column;
    }

    .h-stat-num {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .h-stat-num span {
      color: var(--primary-accent);
    }

    .h-stat-lbl {
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 3px;
    }

    .h-stat-sub {
      font-size: 11px;
      color: #868e96;
      margin-top: 1px;
      line-height: 1.3;
    }

    @media (max-width: 640px) {
      .welcome-hero-stage {
        padding: 36px 0 32px;
      }
      .hero-container {
        padding: 0 16px;
        width: 100%;
        max-width: 100%;
      }
      .hero-name {
        font-size: 32px;
        line-height: 1.15;
        word-break: break-word;
      }
      .hero-subtitle {
        font-size: 17px;
        margin-bottom: 16px;
      }
      .hero-bio-lead {
        font-size: 14.5px;
        margin-bottom: 20px;
      }
      .hero-cta-group {
        width: 100%;
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      .btn-hero-primary,
      .btn-hero-secondary {
        justify-content: center;
        width: 100%;
        padding: 12px 20px;
        font-size: 14px;
      }
      .hero-stats-row {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 10px 12px;
        margin-bottom: 20px;
      }
      .h-stat-num {
        font-size: 19px;
      }
      .video-caption-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 14px 16px;
      }
    }
  </style>
</head>
<body>

  ${getGlobalNav('home')}

  <!-- Welcome Hero Stage -->
  <main class="welcome-hero-stage">
    <div class="hero-container">
      <div class="hero-grid">
        
        <!-- Left: Executive Positioning & Direct Pathways -->
        <div class="hero-left">
          <h1 class="hero-headline">
            Enterprise product design leadership for mission-critical software architectures.
          </h1>

          <!-- Executive Career Key Metrics Strip (Elevated directly below Headline) -->
          <div class="hero-stats-row">
            <div class="h-stat">
              <div class="h-stat-num">18<span>+</span></div>
              <div class="h-stat-lbl">Years Exp.</div>
              <div class="h-stat-sub">Enterprise UX Lead</div>
            </div>
            <div class="h-stat">
              <div class="h-stat-num">15<span>+</span></div>
              <div class="h-stat-lbl">Team Scale</div>
              <div class="h-stat-sub">Designers &amp; Squads</div>
            </div>
            <div class="h-stat">
              <div class="h-stat-num">50<span>+</span></div>
              <div class="h-stat-lbl">Mentored</div>
              <div class="h-stat-sub">UI/UX &amp; Product Designers</div>
            </div>
            <div class="h-stat">
              <div class="h-stat-num">6</div>
              <div class="h-stat-lbl">Design Systems</div>
              <div class="h-stat-sub">Token Architectures</div>
            </div>
          </div>

          <p class="hero-bio-lead">
            Senior UI/UX Design Manager with <strong>18+ years</strong> transforming complex enterprise software into high-velocity, market-leading digital experiences. Proven track record leading multi-disciplinary design squads and partnering directly with cross-functional engineering and product leadership across <strong>IBM, Ericsson, Zebra Technologies, ZF Wabco,</strong> and <strong>Infosys</strong> to scale multi-brand design systems, de-risk agentic enterprise AI, and slash operational latency.
          </p>

          <!-- Executive Primary Action (Zero Redundancy with Nav Bar) -->
          <div class="hero-cta-group">
            <a href="#featured-work" class="btn-hero-primary">
              <span>Explore flagship case studies (5 deep dives)</span>
              <span>&darr;</span>
            </a>
            <a href="leadership-deck.html" class="btn-hero-secondary">
              <span>10-Slide Leadership Deck</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

        <!-- Right: 60-Second Executive Video Stage -->
        <div class="hero-right">
          <div class="video-showcase-box">
            <div class="video-player-frame">
              <span class="video-time-tag">60s Video Briefing</span>
              
              <video id="welcomeVideo" controls poster="profile.jpg" preload="metadata">
                <source src="intro.mp4" type="video/mp4">
                Your browser does not support high-definition video playback.
              </video>
            </div>

            <div class="video-caption-bar">
              <div>
                <h4>Executive Video Introduction</h4>
                <p>Balaajee V.R. &bull; 1080p HD</p>
              </div>
              <button class="btn-transcript-toggle" onclick="toggleTranscript()">
                📝 Transcript
              </button>
            </div>

            <div class="transcript-drawer" id="transcriptDrawer">
              <p><strong>Balaajee V.R. Speaking:</strong> “Hello and welcome. Over the past 18 years, I’ve led product design organizations across global technology leaders including IBM, Ericsson, Zebra Technologies, ZF Wabco, and Infosys. As a Senior UI/UX Design Manager, my focus is taking high-complexity, mission-critical systems—whether telecom CPQ, agentic enterprise AI, rugged industrial IoT, or commercial automotive cockpits—and transforming them into intuitive, high-velocity experiences that scale seamlessly across global engineering and product teams. Please explore my <strong>Selected Work</strong> for complete end-to-end deep dives, review my <strong>Leadership Deck</strong> to see how I scale teams and systems, or view <strong>My Resume</strong>. I look forward to connecting with you.”</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Dedicated Executive Pedigree & Global Brand Trust Section -->
      <div class="pedigree-trust-section">
        <div class="pedigree-trust-header">
          <span class="pedigree-trust-title">Enterprise Design Leadership Across Global Tech</span>
        </div>
        <div class="pedigree-brands-grid">
          <div class="brand-item">
            <img src="logos/ibm.svg" alt="IBM" class="brand-logo-img">
            <span class="brand-item-name">IBM</span>
            <span class="brand-item-role">Software Labs</span>
          </div>
          <div class="brand-item">
            <img src="logos/ericsson.svg" alt="Ericsson" class="brand-logo-img">
            <span class="brand-item-name">Ericsson</span>
            <span class="brand-item-role">Global OSS/BSS</span>
          </div>
          <div class="brand-item">
            <img src="logos/zebra.svg" alt="Zebra Technologies" class="brand-logo-img">
            <span class="brand-item-name">Zebra Technologies</span>
            <span class="brand-item-role">Enterprise Mobile</span>
          </div>
          <div class="brand-item">
            <img src="logos/zf.svg" alt="ZF Wabco" class="brand-logo-img">
            <span class="brand-item-name">ZF Wabco</span>
            <span class="brand-item-role">Commercial Auto</span>
          </div>
          <div class="brand-item">
            <img src="logos/infosys.svg" alt="Infosys" class="brand-logo-img">
            <span class="brand-item-name">Infosys</span>
            <span class="brand-item-role">Digital Experience</span>
          </div>
        </div>
      </div>
    </div>
  </main>



  <!-- Global Footer -->
  <footer class="global-footer">
    <div class="footer-container">
      <div class="footer-left">
        <h5>Balaajee V.R. &bull; Senior UI/UX Design Manager</h5>
        <p>Chennai / Bengaluru, India &bull; Open to Relocation (India &amp; Global) &bull; Available in 30 Days</p>
      </div>
      <div class="footer-links">
        <a href="mailto:vrbberaj@gmail.com">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          vrbberaj@gmail.com
        </a>
        <a href="tel:+919994761293">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +91 9994761293
        </a>
        <a href="https://www.linkedin.com/in/balaajee-vr-21647967/" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          LinkedIn Profile
        </a>
      </div>
    </div>
  </footer>

  <script>
    function toggleTranscript() {
      const drawer = document.getElementById('transcriptDrawer');
      drawer.classList.toggle('open');
    }
  </script>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
console.log('index.html compiled successfully (100% clean welcome portal, no case study clutter).');

// ============================================================================
// PART B: work.html — DEDICATED SELECTED WORK PORTAL
// ============================================================================
console.log('2. Compiling work.html (Dedicated Selected Work Portal)...');

const workHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balaajee V.R. | Selected Work &amp; Enterprise UI/UX Specializations</title>
  <meta name="description" content="5 Flagship Enterprise UI/UX Specializations led by Balaajee V.R.: High-Density Financial Grids (Ericsson), Agentic AI &amp; HITL Governance (IBM Watson), Industrial IoT &amp; Physical/Digital Ergonomics (Zebra), DesignOps Token Architecture (IBM Carbon), and Automotive HMI Safety (ZF Wabco).">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}

    .work-hero-header {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 56px 0 40px;
    }

    .work-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .work-pretitle {
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary-accent);
      margin-bottom: 8px;
    }

    .work-title {
      font-family: var(--font-heading);
      font-size: 38px;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: var(--text-main);
      margin-bottom: 14px;
      line-height: 1.2;
    }

    .work-desc {
      font-size: 16px;
      color: var(--text-muted);
      max-width: 860px;
      line-height: 1.6;
    }

    /* Behance Portfolio Integration Banner */
    .behance-integration-banner {
      background: linear-gradient(135deg, #0D1627 0%, #172554 100%);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 16px;
      padding: 22px 28px;
      margin-top: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      box-shadow: 0 8px 24px rgba(13, 22, 39, 0.2);
    }

    .behance-left-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .behance-icon-badge {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: #0057FF;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 20px;
      font-family: var(--font-heading);
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0, 87, 255, 0.4);
    }

    .behance-text-block strong {
      display: block;
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 3px;
    }

    .behance-text-block p {
      font-size: 12.5px;
      color: #93C5FD;
      margin: 0;
      line-height: 1.45;
      max-width: 680px;
    }

    .behance-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: #FFFFFF;
      color: #0D1627;
      border-radius: 100px;
      font-family: var(--font-heading);
      font-size: 12.5px;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .behance-link-btn:hover {
      background: #60A5FA;
      color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(96, 165, 250, 0.35);
    }

    /* 5 UI/UX Specialization Pillars Banner */
    .specialization-pillars-banner {
      background: #FFFFFF;
      border: 1px solid var(--border-medium);
      border-radius: 20px;
      padding: 32px 36px;
      margin-bottom: 36px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    }

    .spec-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .spec-pretitle {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--primary-accent);
      margin-bottom: 6px;
    }

    .spec-title {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.25;
    }

    .spec-desc {
      font-size: 14px;
      color: var(--text-muted);
      max-width: 720px;
      margin-top: 4px;
    }

    .spec-badge {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      padding: 6px 14px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 100px;
      color: var(--text-main);
      white-space: nowrap;
    }

    .specialization-pillars-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 14px;
    }

    @media (max-width: 1100px) {
      .specialization-pillars-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .work-hero-header { padding: 36px 0 24px; }
      .work-title { font-size: 26px; }
      .work-container { padding: 0 16px; }
      .spec-badge { white-space: normal; display: inline-block; font-size: 10px; }
      .spec-header { gap: 12px; }
      .behance-left-info { flex-direction: column; align-items: flex-start; gap: 10px; }
      .behance-integration-banner { padding: 18px 16px; }
      .specialization-pillars-grid { grid-template-columns: 1fr; }
      .specialization-pillars-banner { padding: 20px 16px; }
      .card-content-side { padding: 22px 16px; }
      .card-preview-side { padding: 16px; }
      .card-title { font-size: 19px; }
      .card-metrics-grid { grid-template-columns: 1fr; gap: 8px; }
      .c-metric-item { padding: 10px 12px; }
    }

    .spec-pillar-card {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 18px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
    }

    .spec-pillar-card:hover {
      border-color: var(--primary-accent);
      background: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    }

    .s-pillar-icon {
      font-size: 20px;
      margin-bottom: 8px;
      line-height: 1;
    }

    .s-pillar-name {
      font-family: var(--font-heading);
      font-size: 13.5px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 6px;
      line-height: 1.3;
    }

    .s-pillar-domain {
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 700;
      color: var(--primary-accent);
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .s-pillar-desc {
      font-size: 11.5px;
      color: var(--text-body);
      line-height: 1.45;
      margin-bottom: 12px;
    }

    .s-pillar-prototype {
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 600;
      color: var(--text-muted);
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: 4px 8px;
      display: block;
      margin-top: auto;
    }

    /* Transformation Showcase Directory */
    .showcase-directory {
      padding: 40px 0 80px;
    }

    .cards-stack {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .transformation-card {
      background: #FFFFFF;
      border: 1px solid var(--border-medium);
      border-radius: 20px;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }

    .transformation-card:hover {
      border-color: var(--primary-accent);
      transform: translateY(-3px);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
    }

    @media (max-width: 960px) {
      .transformation-card {
        grid-template-columns: 1fr;
      }
    }

    .card-content-side {
      padding: 36px 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-meta-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .card-company-badge {
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 100px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
    }

    .card-specialization-pill {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 100px;
      background: rgba(240, 6, 88, 0.08);
      border: 1px solid rgba(240, 6, 88, 0.25);
      color: var(--primary-accent);
    }

    .card-role-text {
      font-size: 12px;
      color: var(--text-muted);
    }

    .card-footprint-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }

    .footprint-pill {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 6px;
      background: rgba(15, 23, 42, 0.05);
      color: var(--text-body);
      border: 1px solid var(--border-subtle);
    }

    .card-title {
      font-family: var(--font-heading);
      font-size: 24px;
      font-weight: 900;
      color: var(--text-main);
      margin-bottom: 12px;
      line-height: 1.3;
    }

    .card-lead {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    /* Distinct Domain Methodology Process Strip */
    .domain-methodology-strip {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 24px;
    }

    .methodology-title {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-main);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .methodology-steps-list {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }

    @media (max-width: 768px) {
      .methodology-steps-list {
        grid-template-columns: 1fr;
      }
    }

    .m-step-mini {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 11px;
      line-height: 1.35;
    }

    .m-step-mini strong {
      display: block;
      color: var(--primary-accent);
      font-family: var(--font-code);
      font-size: 10px;
      margin-bottom: 2px;
    }

    .m-step-mini span {
      color: var(--text-body);
      font-weight: 600;
    }

    .card-metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-bottom: 24px;
    }

    .c-metric-item {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 12px 14px;
    }

    .c-metric-val {
      font-family: var(--font-heading);
      font-size: 20px;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .c-metric-lbl {
      font-size: 11px;
      color: var(--text-muted);
      font-family: var(--font-code);
    }

    .card-cta-row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .btn-read-deep-dive {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 22px;
      border-radius: 100px;
      background: var(--primary-accent);
      color: #FFFFFF;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(240, 6, 88, 0.25);
    }

    .btn-read-deep-dive:hover {
      background: #D0054B;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(240, 6, 88, 0.35);
    }

    .btn-behance-ref {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 11px 18px;
      border-radius: 100px;
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      color: #0F172A;
      font-family: var(--font-code);
      font-size: 11.5px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-behance-ref:hover {
      border-color: #0057FF;
      color: #0057FF;
      background: rgba(0, 87, 255, 0.04);
    }

    /* Right Preview Side */
    .card-preview-side {
      background: #0B0E17;
      border-left: 1px solid var(--border-medium);
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media (max-width: 960px) {
      .card-preview-side {
        border-left: none;
        border-top: 1px solid var(--border-medium);
      }
    }

    .preview-browser-mini {
      background: #111624;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      overflow: hidden;
    }

    .browser-mini-bar {
      padding: 8px 12px;
      background: #0B0E17;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .browser-mini-dots {
      display: flex;
      gap: 4px;
    }

    .mini-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }

    .dot-r { background: #EF4444; }
    .dot-y { background: #F59E0B; }
    .dot-g { background: #10B981; }

    .browser-mini-title {
      font-family: var(--font-code);
      font-size: 10px;
      color: #94A3B8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .browser-screenshot-wrap {
      width: 100%;
      height: 220px;
      overflow: hidden;
      background: #000;
      position: relative;
    }

    .browser-screenshot-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
      transition: transform 0.3s ease;
    }

    .transformation-card:hover .browser-screenshot-img {
      transform: scale(1.03);
    }

    .browser-mini-body {
      padding: 14px 16px;
      background: #111624;
    }

    .mini-tag-badge {
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 700;
      color: #10B981;
      display: block;
      margin-bottom: 8px;
    }

    .preview-callout-badges {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .preview-callout-badge {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 11.5px;
      color: #CBD5E1;
      line-height: 1.4;
    }

    .callout-badge-icon {
      color: #38BDF8;
      font-weight: 800;
      flex-shrink: 0;
    }

    /* 5-Project Visual Thumbnail Strip */
    .behance-visual-strip {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 12px;
      margin-top: 20px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }

    .behance-strip-item {
      background: rgba(2, 6, 23, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      transition: all 0.2s ease;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .behance-strip-item:hover {
      border-color: #60A5FA;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }

    .behance-strip-thumb-wrap {
      position: relative;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      height: 84px;
      background: #090D16;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .behance-strip-thumb {
      width: 100%;
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s ease;
      box-sizing: border-box;
    }

    .behance-strip-item:hover .behance-strip-thumb {
      transform: scale(1.05);
    }

    .behance-strip-pill {
      position: absolute;
      top: 6px;
      left: 6px;
      background: rgba(15, 23, 42, 0.92);
      border: 1px solid rgba(96, 165, 250, 0.35);
      color: #93C5FD;
      font-family: var(--font-code);
      font-size: 8px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.05em;
    }

    .behance-strip-info {
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      box-sizing: border-box;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
    }

    .behance-strip-co {
      font-family: var(--font-code);
      font-size: 9px;
      font-weight: 800;
      color: #60A5FA;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .behance-strip-label {
      font-family: var(--font-heading);
      font-size: 11px;
      font-weight: 700;
      color: #F1F5F9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 900px) {
      .behance-visual-strip {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 600px) {
      .behance-visual-strip {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  </style>
</head>
<body>

  ${getGlobalNav('work')}

  <!-- Hero Header -->
  <header class="work-hero-header">
    <div class="work-container">
      <div class="work-pretitle">Flagship Enterprise Product Transformations</div>
      <h1 class="work-title">Selected Work: 5 UI/UX Specializations in Complex Enterprise Systems</h1>
      <p class="work-desc">
        Senior UI/UX Design Manager case studies illustrating deep craft across high-density financial data grids, autonomous agentic AI governance, physical/digital industrial IoT telematics, DesignOps token systems, and automotive safety cockpits.
      </p>

      <!-- Behance Portfolio Integration Banner with Direct Visual Evidence -->
      <aside class="behance-integration-banner" aria-label="Behance Visual Portfolio Evidence">
        <div class="behance-left-info">
          <div class="behance-icon-badge">Bē</div>
          <div class="behance-text-block">
            <strong>Authentic Behance Design Artifacts &bull; behance.net/balaajeeVR</strong>
            <p>
              Direct production screens, telematic dashboards, and information architecture maps extracted directly from my public Behance portfolio. While Behance displays the visual execution, each case study below provides the end-to-end Senior Design Manager defense: user shadowing, architecture blueprints, DesignOps governance, and enterprise ROI.
            </p>
          </div>
        </div>
        <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener noreferrer" class="behance-link-btn">
          <span>🎨 Open Full Behance Profile</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>

        <!-- 5-Project Visual Thumbnail Strip -->
        <div class="behance-visual-strip">
          <a href="#case-1" class="behance-strip-item">
            <div class="behance-strip-thumb-wrap">
              <img src="screenshots/behance/ericsson_desktop_grid.png" alt="Ericsson Desktop Grid" class="behance-strip-thumb">
              <span class="behance-strip-pill">Bē SCREEN</span>
            </div>
            <div class="behance-strip-info">
              <span class="behance-strip-co">Ericsson</span>
              <span class="behance-strip-label">Network Config Grids</span>
            </div>
          </a>

          <a href="#case-2" class="behance-strip-item">
            <div class="behance-strip-thumb-wrap">
              <img src="screenshots/behance/sales_estimation_clean.png" alt="Watson Sales Estimation" class="behance-strip-thumb">
              <span class="behance-strip-pill">Bē SCREEN</span>
            </div>
            <div class="behance-strip-info">
              <span class="behance-strip-co">IBM Watson</span>
              <span class="behance-strip-label">Multi-Scenario Modeler</span>
            </div>
          </a>

          <a href="#case-3" class="behance-strip-item">
            <div class="behance-strip-thumb-wrap">
              <img src="screenshots/behance/zebra_iot_dashboard.png" alt="Zebra IoT Dashboard" class="behance-strip-thumb">
              <span class="behance-strip-pill">Bē SCREEN</span>
            </div>
            <div class="behance-strip-info">
              <span class="behance-strip-co">Zebra Tech</span>
              <span class="behance-strip-label">IoT Device Health</span>
            </div>
          </a>

          <a href="#case-4" class="behance-strip-item">
            <div class="behance-strip-thumb-wrap">
              <img src="screenshots/behance/carbon_admin_clean.png" alt="IBM Carbon Admin" class="behance-strip-thumb">
              <span class="behance-strip-pill">Bē SCREEN</span>
            </div>
            <div class="behance-strip-info">
              <span class="behance-strip-co">IBM Carbon</span>
              <span class="behance-strip-label">Ready2Go Admin App</span>
            </div>
          </a>

          <a href="#case-5" class="behance-strip-item">
            <div class="behance-strip-thumb-wrap">
              <img src="screenshots/behance/zf_mobile_clean.png" alt="ZF Wabco Telematics" class="behance-strip-thumb">
              <span class="behance-strip-pill">Bē SCREEN</span>
            </div>
            <div class="behance-strip-info">
              <span class="behance-strip-co">ZF Wabco</span>
              <span class="behance-strip-label">Mobile Telematics</span>
            </div>
          </a>
        </div>
      </aside>
    </div>
  </header>

  <!-- Main Directory Stack -->
  <main class="showcase-directory">
    <div class="work-container">

      <!-- 5 UI/UX Specialization Pillars Banner -->
      <section class="specialization-pillars-banner" aria-label="5 UI/UX Specializations">
        <div class="spec-header">
          <div>
            <div class="spec-pretitle">Enterprise Core Competencies &bull; Senior UI/UX Design Manager</div>
            <h2 class="spec-title">5 Distinct UI/UX Specialization Pillars</h2>
            <p class="spec-desc">
              Every transformation targets a distinct technical and human challenge—from sub-second financial calculations and autonomous AI safety to cold-storage warehouse ergonomics and mission-critical automotive cockpits.
            </p>
          </div>
          <span class="spec-badge">18+ Years &bull; Enterprise &amp; Mission-Critical Systems</span>
        </div>

        <div class="specialization-pillars-grid">
          <div class="spec-pillar-card">
            <div>
              <div class="s-pillar-icon">📊</div>
              <div class="s-pillar-domain">Ericsson Global</div>
              <h3 class="s-pillar-name">Complex Financial Data Architecture</h3>
              <p class="s-pillar-desc">Sub-16ms single-pane BOM data grid replacing 14 unversioned Excel tabs; real-time gross margin guardrails.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Prototype: Keyboard BOM Grid</span>
          </div>

          <div class="spec-pillar-card">
            <div>
              <div class="s-pillar-icon">🧠</div>
              <div class="s-pillar-domain">IBM Software Labs</div>
              <h3 class="s-pillar-name">Agentic AI &amp; HITL Governance</h3>
              <p class="s-pillar-desc">Multi-agent state machines, 3-tier confidence routing, side-by-side database diffing, and SOX audit trails.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Prototype: Agent Mesh &amp; Diff</span>
          </div>

          <div class="spec-pillar-card">
            <div>
              <div class="s-pillar-icon">📡</div>
              <div class="s-pillar-domain">Zebra Technologies</div>
              <h3 class="s-pillar-name">Industrial IoT &amp; Physical Ergonomics</h3>
              <p class="s-pillar-desc">-25°C cold-storage freezer shadowing, 72px glove hit targets, spatial warehouse floor plans, and 1-scan QR staging.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Prototype: Spatial IoT Console</span>
          </div>

          <div class="spec-pillar-card">
            <div>
              <div class="s-pillar-icon">🎨</div>
              <div class="s-pillar-domain">IBM Carbon</div>
              <h3 class="s-pillar-name">DesignOps &amp; Token Architecture</h3>
              <p class="s-pillar-desc">Multi-tier token taxonomy, Figma-to-Code Style Dictionary compiler, multi-brand runtime theme engine.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Prototype: Live Token Studio</span>
          </div>

          <div class="spec-pillar-card">
            <div>
              <div class="s-pillar-icon">🚚</div>
              <div class="s-pillar-domain">ZF Wabco</div>
              <h3 class="s-pillar-name">Automotive Cockpit &amp; Safety UX</h3>
              <p class="s-pillar-desc">UNECE legal gaze budgeting (<1.2s glance ceiling), 3-zone spatial HUD, high-contrast anti-glare, CAN-bus sync.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Prototype: 3-Zone Cockpit HUD</span>
          </div>
        </div>
      </section>

      <div class="cards-stack">

        <!-- 1. Ericsson -->
        <article class="transformation-card" id="case-1">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">Ericsson Global</span>
                <span class="card-specialization-pill">Specialization: High-Density Data Grids &amp; Financial Architecture</span>
                <span class="card-role-text">Lead UI/UX Architect &bull; Jul 2019 – Sep 2020</span>
              </div>
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 Squad: 6 UX + 4 Devs</span>
                <span class="footprint-pill">⚡ 14 Sprints</span>
                <span class="footprint-pill">🛡️ DesignOps Tokenized</span>
                <span class="footprint-pill">🎨 Behance: Networks &amp; Infrastructure</span>
              </div>
              <h2 class="card-title">Ericsson SalesOps Cloud: Modernizing 14-Tab Legacy Excel Chaos into an Automated Deal Engine</h2>
              <p class="card-lead">
                Replaced an unversioned 50MB spreadsheet quoting ordeal across 45 countries with a keyboard-navigable single-pane data grid, cutting deal turnaround from 6 days to 42 minutes with zero formula defects across 12,000 catalog parts.
              </p>

              <!-- Domain-Specific Methodology Strip -->
              <div class="domain-methodology-strip">
                <div class="methodology-title">
                  <span>📐 Domain Process: High-Density Financial Data Grid Pipeline</span>
                </div>
                <div class="methodology-steps-list">
                  <div class="m-step-mini"><strong>01. Formula Audit</strong><span>14 tabs &amp; 42 #REF! error register</span></div>
                  <div class="m-step-mini"><strong>02. Shadowing</strong><span>Keyboard speed in Stockholm</span></div>
                  <div class="m-step-mini"><strong>03. Single-Pane IA</strong><span>Zero-modal 12,000-part grid</span></div>
                  <div class="m-step-mini"><strong>04. Reactive Tokens</strong><span>Sub-16ms live formula calculation</span></div>
                  <div class="m-step-mini"><strong>05. Governance</strong><span>Auto Green-Channel (&ge;35% margin)</span></div>
                </div>
              </div>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">6d &rarr; 42m</div>
                  <div class="c-metric-lbl">Turnaround (-92%)</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">100%</div>
                  <div class="c-metric-lbl">Rule Compliance</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">0%</div>
                  <div class="c-metric-lbl">Formula Errors</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-ericsson" class="btn-read-deep-dive">
                  Read Case Study &amp; Defense &rarr;
                </a>
                <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener noreferrer" class="btn-behance-ref">
                  🎨 Behance Gallery
                </a>
              </div>
            </div>
          </div>

          <div class="card-preview-side">
            <div class="preview-browser-mini">
              <div class="browser-mini-bar">
                <div class="browser-mini-dots">
                  <span class="mini-dot dot-r"></span>
                  <span class="mini-dot dot-y"></span>
                  <span class="mini-dot dot-g"></span>
                </div>
                <div class="browser-mini-title">ericsson://salesops/bom-grid</div>
              </div>
              <div class="browser-screenshot-wrap">
                <img src="screenshots/behance/ericsson_desktop_grid.png" alt="Authentic Behance: Ericsson Network Configuration &amp; Profile Grid" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● INTERACTIVE PROTOTYPE: FINANCIAL BOM DATA GRID</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Keyboard Data Grid:</strong> Arrow navigation matching Excel muscle memory.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Live Margin Guardrail:</strong> Sub-16ms recalculation of 38.4% gross margin.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>1-Click Contract PDF:</strong> Auto-populates verified SAP catalog parts.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 2. IBM Watson -->
        <article class="transformation-card" id="case-2">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">IBM Software Labs</span>
                <span class="card-specialization-pill">Specialization: Agentic AI, HITL Governance &amp; Cognitive UX</span>
                <span class="card-role-text">Senior Manager UI/UX Design &bull; Sep 2024 – Jan 2026</span>
              </div>
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 Squad: 8 UX + 12 AI Engineers</span>
                <span class="footprint-pill">🤖 Watson Orchestrate</span>
                <span class="footprint-pill">⚖️ SOX Compliant</span>
                <span class="footprint-pill">🎨 Behance: Enterprise AI UX</span>
              </div>
              <h2 class="card-title">IBM Watson Orchestrate: Multi-Agent AI Task Automation with Human-in-the-Loop Governance</h2>
              <p class="card-lead">
                Orchestrating autonomous agents across SAP, Salesforce, and Jira with transparent confidence routing, side-by-side database diff reviews, and immutable SOX audit trails, cutting manual review time by 78% without legal hallucination risks.
              </p>

              <!-- Domain-Specific Methodology Strip -->
              <div class="domain-methodology-strip">
                <div class="methodology-title">
                  <span>📐 Domain Process: Agentic AI &amp; Cognitive Governance Pipeline</span>
                </div>
                <div class="methodology-steps-list">
                  <div class="m-step-mini"><strong>01. Mental Model</strong><span>Cognitive trust &amp; audit inquiries</span></div>
                  <div class="m-step-mini"><strong>02. Confidence Gating</strong><span>3-tier mathematical thresholds</span></div>
                  <div class="m-step-mini"><strong>03. Agent Mesh</strong><span>Visual topology state machine</span></div>
                  <div class="m-step-mini"><strong>04. Mutation Diff</strong><span>Side-by-side database audit drawer</span></div>
                  <div class="m-step-mini"><strong>05. SOX Flywheel</strong><span>Cryptographic immutable ledger logs</span></div>
                </div>
              </div>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">-78%</div>
                  <div class="c-metric-lbl">Review Overhead</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">94.2%</div>
                  <div class="c-metric-lbl">Task Autonomy</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">0</div>
                  <div class="c-metric-lbl">SOX Violations</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-ibm-watson" class="btn-read-deep-dive">
                  Read Case Study &amp; Defense &rarr;
                </a>
                <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener noreferrer" class="btn-behance-ref">
                  🎨 Behance Gallery
                </a>
              </div>
            </div>
          </div>

          <div class="card-preview-side">
            <div class="preview-browser-mini">
              <div class="browser-mini-bar">
                <div class="browser-mini-dots">
                  <span class="mini-dot dot-r"></span>
                  <span class="mini-dot dot-y"></span>
                  <span class="mini-dot dot-g"></span>
                </div>
                <div class="browser-mini-title">watson://orchestrate/agentic-mesh</div>
              </div>
              <div class="browser-screenshot-wrap">
                <img src="screenshots/transformation-ibm-watson.png" alt="IBM Watson Orchestrate Multi-Agent Mesh" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● INTERACTIVE PROTOTYPE: AGENT MESH &amp; DIFF REVIEW</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Visual Agent Graph:</strong> Live status nodes across SAP, CRM &amp; Jira.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>3-Tier Confidence Meter:</strong> Dynamic routing (Auto vs Review vs Gated).</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Side-by-Side Diff:</strong> Live ledger mutation preview with 1-click commit.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 3. Zebra -->
        <article class="transformation-card" id="case-3">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">Zebra Technologies</span>
                <span class="card-specialization-pill">Specialization: Industrial IoT &amp; Physical/Digital Ergonomics</span>
                <span class="card-role-text">Senior UX Design Manager &bull; Jul 2021 – Aug 2024</span>
              </div>
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 Squad: 10 UX + 18 Devs</span>
                <span class="footprint-pill">📱 TC5X / MC9300 Handhelds</span>
                <span class="footprint-pill">❄️ Sub-Zero Ergonomics</span>
                <span class="footprint-pill">🎨 Behance: Enterprise IoT &amp; Mobile</span>
              </div>
              <h2 class="card-title">Zebra Technologies: Multi-Site Enterprise IoT &amp; Rugged Scanner Telematics</h2>
              <p class="card-lead">
                Solving cold-storage environmental friction in -25°C warehouse facilities with 72px glove touch targets, spatial floor-plan telematics, and zero-touch 2D barcode provisioning, reducing staging time from 45 minutes to 1 second.
              </p>

              <!-- Domain-Specific Methodology Strip -->
              <div class="domain-methodology-strip">
                <div class="methodology-title">
                  <span>📐 Domain Process: Physical/Digital Industrial Ergonomics Pipeline</span>
                </div>
                <div class="methodology-steps-list">
                  <div class="m-step-mini"><strong>01. Freezer Shadowing</strong><span>-25°C thermal friction &amp; fogging</span></div>
                  <div class="m-step-mini"><strong>02. Glove Biomechanics</strong><span>72px touch targets for heavy gloves</span></div>
                  <div class="m-step-mini"><strong>03. Spatial Floor IA</strong><span>2.5D warehouse topology mapping</span></div>
                  <div class="m-step-mini"><strong>04. 1-Scan Staging</strong><span>Encrypted 2D QR camera protocol</span></div>
                  <div class="m-step-mini"><strong>05. Predictive IoT</strong><span>Machine learning battery degradation</span></div>
                </div>
              </div>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">45m &rarr; 1s</div>
                  <div class="c-metric-lbl">Staging Time (-99%)</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">-35%</div>
                  <div class="c-metric-lbl">Battery Death Rate</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">99.8%</div>
                  <div class="c-metric-lbl">Glove Tap Accuracy</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-zebra" class="btn-read-deep-dive">
                  Read Case Study &amp; Defense &rarr;
                </a>
                <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener noreferrer" class="btn-behance-ref">
                  🎨 Behance Gallery
                </a>
              </div>
            </div>
          </div>

          <div class="card-preview-side">
            <div class="preview-browser-mini">
              <div class="browser-mini-bar">
                <div class="browser-mini-dots">
                  <span class="mini-dot dot-r"></span>
                  <span class="mini-dot dot-y"></span>
                  <span class="mini-dot dot-g"></span>
                </div>
                <div class="browser-mini-title">zebra://devicecloud/chicago-dc/spatial-map</div>
              </div>
              <div class="browser-screenshot-wrap">
                <img src="screenshots/transformation-zebra.png" alt="Zebra Technologies DeviceCloud Console" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● INTERACTIVE PROTOTYPE: SPATIAL IOT CONSOLE</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Zone Telematics:</strong> Interactive floor plan filtering 1,280 scanners.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Sub-Zero Alert Mode:</strong> -25°C freezer predictive battery degradation alert.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>2D Optical Staging:</strong> Interactive 1-scan QR onboarding simulation.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 4. Carbon -->
        <article class="transformation-card">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">IBM Software Labs</span>
                <span class="card-specialization-pill">Specialization: DesignOps, Token Architecture &amp; System Governance</span>
                <span class="card-role-text">Design Systems Lead &bull; Sep 2024 – Jan 2026</span>
              </div>
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 14 Federated Squads</span>
                <span class="footprint-pill">🎨 Carbon Design System</span>
                <span class="footprint-pill">⚙️ Style Dictionary CI/CD</span>
                <span class="footprint-pill">🎨 Behance: Design Systems</span>
              </div>
              <h2 class="card-title">IBM Carbon Design System: Multi-Brand Token Architecture &amp; 14-Squad Governance</h2>
              <p class="card-lead">
                Eliminated 320+ hardcoded CSS drift values and 4-week handoff delays by engineering an enterprise 3-tier token taxonomy and automated Figma-to-GitHub Style Dictionary pipeline across 14 independent squads.
              </p>

              <!-- Domain-Specific Methodology Strip -->
              <div class="domain-methodology-strip">
                <div class="methodology-title">
                  <span>📐 Domain Process: DesignOps &amp; Token Architecture Pipeline</span>
                </div>
                <div class="methodology-steps-list">
                  <div class="m-step-mini"><strong>01. CSS Drift Audit</strong><span>14-squad regression &amp; 320 hex leaks</span></div>
                  <div class="m-step-mini"><strong>02. Token Taxonomy</strong><span>3-tier global &rarr; semantic &rarr; component</span></div>
                  <div class="m-step-mini"><strong>03. CI/CD Pipeline</strong><span>Figma API &rarr; Style Dictionary compiler</span></div>
                  <div class="m-step-mini"><strong>04. Theme Engine</strong><span>0-latency multi-brand runtime switching</span></div>
                  <div class="m-step-mini"><strong>05. RFC Council</strong><span>Federated component governance SLA</span></div>
                </div>
              </div>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">4w &rarr; 1d</div>
                  <div class="c-metric-lbl">Token Handoff (-95%)</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">100%</div>
                  <div class="c-metric-lbl">Design-to-Code Parity</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">14 Squads</div>
                  <div class="c-metric-lbl">Unified Codebases</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-ibm-carbon" class="btn-read-deep-dive">
                  Read Case Study &amp; Defense &rarr;
                </a>
                <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener noreferrer" class="btn-behance-ref">
                  🎨 Behance Gallery
                </a>
              </div>
            </div>
          </div>

          <div class="card-preview-side">
            <div class="preview-browser-mini">
              <div class="browser-mini-bar">
                <div class="browser-mini-dots">
                  <span class="mini-dot dot-r"></span>
                  <span class="mini-dot dot-y"></span>
                  <span class="mini-dot dot-g"></span>
                </div>
                <div class="browser-mini-title">carbon://designops/tokens/governance</div>
              </div>
              <div class="browser-screenshot-wrap">
                <img src="screenshots/transformation-ibm-carbon.png" alt="IBM Carbon Design System Token Studio" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● INTERACTIVE PROTOTYPE: LIVE TOKEN PLAYGROUND</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Live Theme Switcher:</strong> Carbon White, G10, G90, G100 dynamic injection.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Token Inspector:</strong> Inspect $interactive-01, $field-01 in real time.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Automated PR Simulator:</strong> 1-click Style Dictionary GitHub dispatch.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 5. ZF Wabco -->
        <article class="transformation-card" id="case-5">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">ZF Wabco</span>
                <span class="card-specialization-pill">Specialization: Automotive HMI Ergonomics &amp; Safety UX</span>
                <span class="card-role-text">UI/UX Senior Specialist &bull; Oct 2020 – Jul 2021</span>
              </div>
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 Squad: 5 UX + 8 Systems Eng</span>
                <span class="footprint-pill">🚚 80,000+ European Trucks</span>
                <span class="footprint-pill">🛡️ UNECE 158/159 Compliant</span>
                <span class="footprint-pill">🎨 Behance: Automotive Cockpit</span>
              </div>
              <h2 class="card-title">ZF Wabco: Commercial Vehicle Digital Cockpit &amp; Fleet Telematics</h2>
              <p class="card-lead">
                Eliminated cab clutter and distraction across 80,000 European heavy trucks with an integrated 3-zone cluster HUD, glare-resistant anti-glare palettes, and strict 0.94s glance compliance (<1.2s EU legal limit).
              </p>

              <!-- Domain-Specific Methodology Strip -->
              <div class="domain-methodology-strip">
                <div class="methodology-title">
                  <span>📐 Domain Process: Automotive HMI &amp; Safety Ergonomics Pipeline</span>
                </div>
                <div class="methodology-steps-list">
                  <div class="m-step-mini"><strong>01. Autobahn Shadow</strong><span>Night freight glare &amp; audio clutter</span></div>
                  <div class="m-step-mini"><strong>02. Gaze Budgeting</strong><span><1.2s legal glance ceiling test</span></div>
                  <div class="m-step-mini"><strong>03. 3-Zone Spatial IA</strong><span>Forward radar, turn card, eco-coach</span></div>
                  <div class="m-step-mini"><strong>04. Anti-Glare Tokens</strong><span>Daylight high-contrast &amp; night dark mode</span></div>
                  <div class="m-step-mini"><strong>05. CAN-Bus Sync</strong><span>Hardware sensor bus cloud telemetry</span></div>
                </div>
              </div>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">0.94s</div>
                  <div class="c-metric-lbl">Driver Glance (&lt;1.2s Max)</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">-18%</div>
                  <div class="c-metric-lbl">Route &amp; Safety Errors</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">80,000+</div>
                  <div class="c-metric-lbl">Deployed Trucks</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-zf-wabco" class="btn-read-deep-dive">
                  Read Case Study &amp; Defense &rarr;
                </a>
                <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener noreferrer" class="btn-behance-ref">
                  🎨 Behance Gallery
                </a>
              </div>
            </div>
          </div>

          <div class="card-preview-side">
            <div class="preview-browser-mini">
              <div class="browser-mini-bar">
                <div class="browser-mini-dots">
                  <span class="mini-dot dot-r"></span>
                  <span class="mini-dot dot-y"></span>
                  <span class="mini-dot dot-g"></span>
                </div>
                <div class="browser-mini-title">zf-wabco://cockpit-cluster/active-haul</div>
              </div>
              <div class="browser-screenshot-wrap">
                <img src="screenshots/transformation-zf-wabco.png" alt="ZF Wabco Cockpit HUD Cluster" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● INTERACTIVE PROTOTYPE: 3-ZONE COCKPIT HUD</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Day/Night Switcher:</strong> High-contrast sunlight vs anti-glare night.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Speed &amp; Radar Controls:</strong> Interactive cruise speed &amp; headway gauge.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Hazard Simulator:</strong> Blind spot radar alert with 0.68s glance timer.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

      </div>
    </div>
  </main>

  <!-- Global Footer -->
  <footer class="global-footer">
    <div class="footer-container">
      <div class="footer-brand-side">
        <span class="footer-monogram">BVR</span>
        <span class="footer-brand-title">Balaajee V.R. &bull; Senior UI/UX Design Manager Portfolio</span>
        <p class="footer-bio-summary">
          18+ years leading design systems, agentic AI governance, complex data grids, and mission-critical enterprise platforms across IBM, Zebra, Ericsson, and ZF Wabco.
        </p>
        <div style="margin-top: 12px;">
          <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener noreferrer" style="color: #60A5FA; text-decoration: none; font-size: 13px; font-weight: 700; font-family: var(--font-code);">
            🎨 View Visual Execution Gallery on Behance (behance.net/balaajeeVR) &rarr;
          </a>
        </div>
      </div>
      <div class="footer-links-grid">
        <div class="footer-col">
          <span class="footer-col-title">Navigation</span>
          <a href="/" class="footer-link">Home</a>
          <a href="/work" class="footer-link active">Selected Work</a>
          <a href="/leadership" class="footer-link">Leadership Deck</a>
          <a href="/cv" class="footer-link">My Resume</a>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">UI/UX Specializations</span>
          <a href="/case-ericsson" class="footer-link">Financial Data Grids</a>
          <a href="/case-ibm-watson" class="footer-link">Agentic AI &amp; HITL</a>
          <a href="/case-zebra" class="footer-link">Industrial IoT Ergonomics</a>
          <a href="/case-ibm-carbon" class="footer-link">DesignOps &amp; Tokens</a>
          <a href="/case-zf-wabco" class="footer-link">Automotive Safety HMI</a>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Verified Proof</span>
          <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener noreferrer" class="footer-link">Behance Portfolio</a>
          <a href="https://linkedin.com/in/balaajee-vr" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn Profile</a>
          <a href="mailto:vrbberaj@gmail.com" class="footer-link">Direct Email</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom-bar">
      <span>&copy; 2026 Balaajee V.R. &bull; Enterprise UI/UX Design Manager Portfolio Suite &bull; Zero Overflow Across All Viewports</span>
    </div>
  </footer>

</body>
</html>`;

// Part B compiled with Left-Panel Navigation & IBM as Case #1
const { execSync } = require('child_process');
execSync('python3 compile_work_portal_with_sidebar.py', { cwd: __dirname, stdio: 'inherit' });
execSync('python3 compile_complete_suite_v2.py', { cwd: __dirname, stdio: 'inherit' });
// Gallery layout (case-study grid + Behance-style archive) replaces the left-panel pages
execSync('python3 build_gallery_pages.py', { cwd: __dirname, stdio: 'inherit' });
console.log('work.html and archive.html compiled as gallery pages.');

// ============================================================================
// PART C: 5 FULL-SIZE, MULTI-SECTION SCROLLABLE DEEP DIVES
// ============================================================================
console.log('3. Compiling 5 Full-Size, Multi-Section Scrollable Deep Dives...');

// Shared CSS for Long-Form Scrollable Case Studies
const scrollableCaseStyles = `
  /* Case Header & Hero */
  .case-hero-section {
    background: #FFFFFF;
    border-bottom: 1px solid var(--border-subtle);
    padding: 48px 0 36px;
  }

  .case-container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .case-badge-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }

  .pill-co {
    font-family: var(--font-heading);
    font-size: 11.5px;
    font-weight: 800;
    padding: 4px 12px;
    border-radius: 100px;
    background: var(--bg-subtle);
    color: var(--text-main);
    border: 1px solid var(--border-medium);
    text-transform: uppercase;
  }

  .pill-role {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
  }

  .pill-award {
    font-size: 11.5px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 100px;
    background: rgba(16, 185, 129, 0.1);
    color: #059669;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .case-main-title {
    font-family: var(--font-heading);
    font-size: 38px;
    font-weight: 900;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--text-main);
    margin-bottom: 16px;
  }

  .case-main-lead {
    font-size: 17px;
    line-height: 1.65;
    color: var(--text-body);
    max-width: 900px;
    margin-bottom: 28px;
  }

  /* Metric Badges Grid */
  .hero-metric-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 20px 24px;
    background: var(--bg-subtle);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    margin-bottom: 36px;
  }

  @media (max-width: 768px) {
    .hero-metric-bar { grid-template-columns: repeat(2, 1fr); }
  }

  .h-metric-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .h-metric-val {
    font-family: var(--font-heading);
    font-size: 22px;
    font-weight: 900;
    color: var(--gold);
  }

  .h-metric-lbl {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* 90-Second Walkthrough Video Stage */
  .case-video-stage {
    background: #0B0E17;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
    margin-bottom: 24px;
  }

  .video-stage-header {
    padding: 12px 18px;
    background: #111624;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #FFFFFF;
  }

  .video-stage-header-title {
    font-family: var(--font-heading);
    font-size: 13px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .video-stage-video {
    width: 100%;
    aspect-ratio: 16 / 9;
    max-height: 520px;
    background: #000000;
    display: block;
  }

  .video-chapters-bar {
    padding: 12px 18px;
    background: #111624;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    gap: 12px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    max-width: 100%;
  }

  .chapter-chip {
    padding: 6px 14px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #CBD5E1;
    font-family: var(--font-code);
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
  }

  .chapter-chip:hover {
    background: var(--primary-accent);
    color: #FFFFFF;
    border-color: var(--primary-accent);
  }

  /* Sticky In-Page Navigation Bar */
  .sticky-case-toc {
    position: sticky;
    top: 60px;
    z-index: 950;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-medium);
    padding: 8px 0;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  .toc-wrap {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    width: 100%;
    max-width: 100%;
  }

  .toc-wrap::-webkit-scrollbar { display: none; }

  .toc-link {
    font-family: var(--font-heading);
    font-size: 12px;
    font-weight: 700;
    color: var(--text-muted);
    text-decoration: none;
    padding: 5px 12px;
    border-radius: 100px;
    white-space: nowrap;
    transition: all 0.15s ease;
    border: 1px solid transparent;
  }

  .toc-link:hover {
    color: var(--text-main);
    background: var(--bg-subtle);
  }

  .toc-link.active {
    background: var(--text-main);
    color: #FFFFFF;
  }

  /* Multi-Section Continuous Content */
  .case-deep-dive-body {
    padding: 48px 0 80px;
  }

  .section-block {
    margin-bottom: 64px;
    scroll-margin-top: 135px;
  }

  .section-header-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-code);
    font-size: 11.5px;
    font-weight: 800;
    color: var(--primary-accent);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }

  .section-title-h2 {
    font-family: var(--font-heading);
    font-size: 26px;
    font-weight: 900;
    color: var(--text-main);
    margin-bottom: 16px;
    letter-spacing: -0.01em;
  }

  .section-prose {
    font-size: 15.5px;
    line-height: 1.7;
    color: var(--text-body);
    margin-bottom: 24px;
  }

  .section-prose strong {
    color: var(--text-main);
  }

  /* Callout Banner */
  .callout-box {
    background: #FFFFFF;
    border: 1px solid var(--border-medium);
    border-left: 4px solid var(--primary-accent);
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 24px;
  }

  .callout-box.gold { border-left-color: var(--gold); }
  .callout-box.blue { border-left-color: #1D4ED8; }
  .callout-box.green { border-left-color: #059669; }

  .callout-title {
    font-family: var(--font-heading);
    font-size: 14.5px;
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 6px;
  }

  .callout-text {
    font-size: 13.5px;
    color: var(--text-body);
    line-height: 1.6;
  }

  /* Persona Card */
  .persona-card {
    background: #FFFFFF;
    border: 1px solid var(--border-medium);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 24px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
  }

  .persona-top {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
  }

  .persona-avatar-box {
    font-size: 32px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--bg-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-subtle);
  }

  .persona-info h4 {
    font-family: var(--font-heading);
    font-size: 17px;
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 2px;
  }

  .persona-info p {
    font-size: 12.5px;
    color: var(--text-muted);
  }

  .persona-quote {
    font-style: italic;
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-main);
    padding: 16px 20px;
    background: var(--bg-subtle);
    border-left: 3px solid var(--gold);
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .empathy-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @media (max-width: 768px) {
    .empathy-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .empathy-box {
    background: var(--bg-base);
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    padding: 14px;
  }

  .empathy-box-title {
    font-family: var(--font-heading);
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--primary-accent);
    margin-bottom: 6px;
  }

  .empathy-box p {
    font-size: 12.5px;
    line-height: 1.45;
    color: var(--text-body);
  }

  /* Flow Comparison */
  .flow-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    .flow-comparison { grid-template-columns: 1fr; }
  }

  .flow-card {
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid var(--border-medium);
    overflow: hidden;
  }

  .flow-card.bad { border-top: 4px solid #DC2626; }
  .flow-card.good { border-top: 4px solid #059669; }

  .flow-card-header {
    padding: 16px 20px;
    background: var(--bg-subtle);
    border-bottom: 1px solid var(--border-subtle);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flow-card-header h4 {
    font-family: var(--font-heading);
    font-size: 14.5px;
    font-weight: 800;
    color: var(--text-main);
  }

  .flow-steps {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .flow-step-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 13.5px;
    line-height: 1.45;
  }

  .step-badge {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .step-bad { background: rgba(220, 38, 38, 0.1); color: #DC2626; }
  .step-good { background: rgba(5, 150, 105, 0.1); color: #059669; }

  /* Interactive UI Showcase Window */
  .ui-showcase-window {
    background: #FFFFFF;
    border: 1px solid var(--border-medium);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    margin-bottom: 24px;
  }

  .window-header {
    background: #0B0E17;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #FFFFFF;
  }

  .window-dots {
    display: flex;
    gap: 6px;
  }

  .window-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }

  .dot-red { background: #FF5F56; }
  .dot-yellow { background: #FFBD2E; }
  .dot-green { background: #27C93F; }

  .window-address {
    flex: 1;
    background: #161B26;
    border-radius: 4px;
    padding: 4px 12px;
    font-family: var(--font-code);
    font-size: 11px;
    color: #94A3B8;
  }

  .window-badge {
    font-family: var(--font-code);
    font-size: 10px;
    font-weight: 700;
    color: #10B981;
    background: rgba(16, 185, 129, 0.15);
    padding: 3px 8px;
    border-radius: 4px;
  }

  .app-canvas {
    padding: 24px;
    background: #FFFFFF;
  }

  .app-deal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--border-subtle);
    flex-wrap: wrap;
    gap: 12px;
  }

  .app-deal-info h4 {
    font-family: var(--font-heading);
    font-size: 15.5px;
    font-weight: 800;
    color: var(--text-main);
  }

  .app-deal-info p {
    font-family: var(--font-code);
    font-size: 12px;
    color: var(--text-muted);
  }

  .app-data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    margin-bottom: 16px;
  }

  .app-data-table th {
    background: var(--bg-subtle);
    padding: 10px 12px;
    text-align: left;
    font-family: var(--font-code);
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border-subtle);
  }

  .app-data-table td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-subtle);
    color: var(--text-body);
    font-variant-numeric: tabular-nums;
  }

  .cell-code { font-family: var(--font-code); font-weight: 700; color: var(--text-main); }
  .cell-num { font-family: var(--font-code); }

  .margin-pill {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 100px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .margin-pass { background: rgba(5, 150, 105, 0.1); color: #059669; border: 1px solid rgba(5, 150, 105, 0.25); }
  .margin-review { background: rgba(217, 119, 6, 0.1); color: #D97706; border: 1px solid rgba(217, 119, 6, 0.25); }
  .margin-fail { background: rgba(220, 38, 38, 0.1); color: #DC2626; border: 1px solid rgba(220, 38, 38, 0.25); }

  .ergonomics-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-subtle);
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    padding: 14px 18px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .ergonomics-text {
    font-size: 13px;
    color: var(--text-body);
    line-height: 1.45;
  }

  .btn-action-sm {
    padding: 8px 16px;
    border-radius: 100px;
    background: var(--primary-accent);
    color: #FFFFFF;
    font-family: var(--font-heading);
    font-size: 12.5px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-action-sm:hover {
    background: var(--primary-hover);
  }

  /* Token Grid */
  .token-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    .token-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .token-card {
    background: #FFFFFF;
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .token-swatch {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  }

  .token-meta h5 {
    font-family: var(--font-code);
    font-size: 12px;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 2px;
  }

  .token-meta span {
    font-size: 11px;
    color: var(--text-muted);
  }

  /* Usability Metrics Row */
  .metrics-hero-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    .metrics-hero-row { grid-template-columns: 1fr; }
  }

  .metric-hero-card {
    background: #FFFFFF;
    border: 1px solid var(--border-medium);
    border-radius: 14px;
    padding: 24px;
    text-align: center;
  }

  .m-hero-val {
    font-family: var(--font-heading);
    font-size: 32px;
    font-weight: 900;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 6px;
  }

  .m-hero-lbl {
    font-family: var(--font-code);
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  /* CAR Defense Cards */
  .car-defense-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .car-item-card {
    background: #FFFFFF;
    border: 1px solid var(--border-medium);
    border-radius: 16px;
    padding: 28px;
  }

  .car-q-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 20px;
    font-family: var(--font-heading);
    font-size: 17px;
    font-weight: 800;
    color: var(--text-main);
    line-height: 1.35;
  }

  .q-badge {
    background: var(--text-main);
    color: #FFFFFF;
    font-family: var(--font-code);
    font-size: 11.5px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .car-three-split {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (max-width: 800px) {
    .car-three-split { grid-template-columns: 1fr; }
  }

  .car-col {
    background: var(--bg-base);
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    padding: 16px;
  }

  .car-col strong {
    display: block;
    font-family: var(--font-heading);
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--primary-accent);
    margin-bottom: 6px;
  }

  .car-col p {
    font-size: 13.5px;
    color: var(--text-body);
    line-height: 1.55;
  }

  /* Floating Picture-in-Picture Mini-Player on Scroll */
  .floating-pip-player {
    display: none;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 320px;
    background: #0B0E17;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    z-index: 999;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pip-header {
    background: #111624;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-family: var(--font-heading);
    font-size: 11.5px;
    font-weight: 700;
    color: #FFFFFF;
  }

  .pip-close-btn {
    background: none;
    border: none;
    color: #94A3B8;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
  }

  .pip-body {
    position: relative;
    cursor: pointer;
    aspect-ratio: 16 / 9;
    background: #000;
    overflow: hidden;
  }

  .pip-body img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
  }

  /* Bottom Navigation Footer */
  .case-pagination-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 0 0;
    border-top: 1px solid var(--border-subtle);
    margin-top: 48px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .btn-all-work {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    border-radius: 100px;
    background: var(--bg-subtle);
    border: 1px solid var(--border-medium);
    color: var(--text-main);
    text-decoration: none;
    font-family: var(--font-heading);
    font-size: 13.5px;
    font-weight: 700;
  }

  .btn-next-case {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 100px;
    background: var(--text-main);
    color: #FFFFFF;
    text-decoration: none;
    font-family: var(--font-heading);
    font-size: 13.5px;
    font-weight: 700;
    transition: all 0.2s ease;
  }

  .btn-next-case:hover {
    background: var(--primary-accent);
  }

  @media (max-width: 640px) {
    .case-hero-section {
      padding: 32px 0 24px;
    }
    .case-container {
      padding: 0 16px;
      width: 100%;
      max-width: 100%;
    }
    .case-main-title {
      font-size: 24px;
      line-height: 1.25;
    }
    .case-main-lead {
      font-size: 15px;
      margin-bottom: 20px;
    }
    .hero-metric-bar {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 14px 16px;
      margin-bottom: 24px;
    }
    .video-stage-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      padding: 10px 14px;
    }
    .video-chapters-bar {
      padding: 10px 14px;
    }
    .case-deep-dive-body {
      padding: 32px 0 60px;
    }
    .section-block {
      margin-bottom: 44px;
      scroll-margin-top: 110px;
    }
    .section-title-h2 {
      font-size: 22px;
    }
    .persona-card {
      padding: 18px 16px;
    }
    .persona-top {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .empathy-grid {
      grid-template-columns: 1fr;
    }
    .app-canvas {
      padding: 16px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      max-width: 100%;
    }
    .app-data-table {
      min-width: 480px;
    }
    .token-grid {
      grid-template-columns: 1fr;
    }
    .metrics-hero-row {
      grid-template-columns: 1fr;
    }
    .car-item-card {
      padding: 18px 16px;
    }
    .car-three-split {
      grid-template-columns: 1fr;
    }
    .floating-pip-player {
      bottom: 12px;
      right: 12px;
      left: 12px;
      width: auto;
      max-width: calc(100vw - 24px);
    }
    .case-pagination-bar {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }
    .btn-all-work,
    .btn-next-case {
      justify-content: center;
      width: 100%;
    }
  }

  /* 5-Phase UI/UX Design Manager Lifecycle Infographic Pipeline */
  .manager-process-pipeline {
    background: #FFFFFF;
    border: 1px solid var(--border-medium);
    border-radius: 18px;
    padding: 28px;
    margin-bottom: 32px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  }

  .pipeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .pipeline-tag {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--primary-accent);
    letter-spacing: 0.08em;
    display: block;
  }

  .pipeline-heading {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 900;
    color: var(--text-main);
    margin-top: 2px;
  }

  .pipeline-role-badge {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 100px;
    background: rgba(240, 6, 88, 0.08);
    border: 1px solid rgba(240, 6, 88, 0.2);
    color: var(--primary-accent);
  }

  .pipeline-steps-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
  }

  @media (max-width: 1024px) {
    .pipeline-steps-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 640px) {
    .pipeline-steps-grid { grid-template-columns: 1fr; }
    .manager-process-pipeline { padding: 18px; }
  }

  .p-step-card {
    background: var(--bg-subtle);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.2s ease;
  }

  .p-step-card:hover {
    border-color: var(--primary-accent);
    background: #FFFFFF;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }

  .p-step-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .p-step-num {
    font-family: var(--font-heading);
    font-size: 13px;
    font-weight: 900;
    color: var(--primary-accent);
  }

  .p-step-phase {
    font-family: var(--font-code);
    font-size: 10px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
  }

  .p-step-title {
    font-family: var(--font-heading);
    font-size: 13.5px;
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 6px;
    line-height: 1.3;
  }

  .p-step-desc {
    font-size: 11.5px;
    color: var(--text-body);
    line-height: 1.45;
    margin-bottom: 10px;
  }

  .p-step-meta {
    border-top: 1px solid var(--border-subtle);
    padding-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .p-step-deliverable, .p-step-metric {
    font-family: var(--font-code);
    font-size: 10px;
    color: var(--text-muted);
    line-height: 1.35;
  }

  .p-step-deliverable strong, .p-step-metric strong {
    color: var(--text-main);
  }

  /* Section 03: Before vs After Architecture Infographic */
  .architecture-infographic-stage {
    background: #FFFFFF;
    border: 1px solid var(--border-medium);
    border-radius: 18px;
    padding: 28px;
    margin: 24px 0 28px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  }

  .arch-info-header {
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .arch-tag {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 800;
    color: var(--primary-accent);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    display: block;
    margin-bottom: 4px;
  }

  .arch-info-header h4 {
    font-family: var(--font-heading);
    font-size: 18px;
    font-weight: 900;
    color: var(--text-main);
  }

  .arch-diagram-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 18px;
  }

  @media (max-width: 768px) {
    .arch-diagram-grid { grid-template-columns: 1fr; }
  }

  .arch-column {
    background: var(--bg-subtle);
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .arch-column.legacy {
    border-color: rgba(225, 29, 72, 0.25);
    background: rgba(225, 29, 72, 0.02);
  }

  .arch-column.modern {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.02);
  }

  .arch-col-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-heading);
    font-size: 14px;
    font-weight: 800;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .arch-col-title.legacy { color: #BE123C; }
  .arch-col-title.modern { color: #047857; }

  .arch-flow-nodes {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .arch-node {
    background: #FFFFFF;
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 12px;
    color: var(--text-body);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .arch-node-icon {
    font-size: 14px;
    line-height: 1;
  }

  .arch-arrow {
    text-align: center;
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1;
  }

  .arch-summary-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 16px;
    background: var(--bg-subtle);
    border-radius: 10px;
    font-family: var(--font-code);
    font-size: 11px;
  }

  .arch-summary-stat {
    display: flex;
    gap: 6px;
  }

  .arch-summary-stat strong {
    color: var(--text-main);
  }

  /* Section 04: High-Resolution Annotated Product Screenshot Showcase */
  .annotated-screenshot-stage {
    background: #0B0E17;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
    margin: 28px 0 36px;
  }

  .annotated-header {
    padding: 12px 18px;
    background: #111624;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .annotated-url {
    font-family: var(--font-code);
    font-size: 11px;
    color: #94A3B8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .annotated-live-tag {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 700;
    color: #10B981;
    white-space: nowrap;
  }

  .screenshot-display-container {
    width: 100%;
    background: #000000;
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .annotated-full-img {
    width: 100%;
    height: auto;
    max-height: 580px;
    object-fit: cover;
    object-position: top center;
    display: block;
    transition: transform 0.4s ease;
  }

  .annotated-screenshot-stage:hover .annotated-full-img {
    transform: scale(1.01);
  }

  .screenshot-callout-ribbon {
    background: #111624;
    padding: 20px 24px;
  }

  .ribbon-title {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #E2E8F0;
    margin-bottom: 14px;
  }

  .callout-chips-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  @media (max-width: 768px) {
    .callout-chips-grid { grid-template-columns: 1fr; }
  }

  .callout-chip-item {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .chip-num {
    font-family: var(--font-heading);
    font-size: 13px;
    font-weight: 900;
    color: var(--primary-accent);
    background: rgba(240, 6, 88, 0.12);
    padding: 3px 7px;
    border-radius: 6px;
    line-height: 1;
    flex-shrink: 0;
  }

  .chip-body strong {
    display: block;
    font-family: var(--font-heading);
    font-size: 12.5px;
    color: #FFFFFF;
    margin-bottom: 3px;
  }

  .chip-body p {
    font-size: 11px;
    color: #94A3B8;
    line-height: 1.45;
    margin: 0;
  }

  /* Section 05: DesignOps Governance Flywheel Infographic */
  .designops-pipeline-stage {
    background: #0B0E17;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    padding: 28px;
    margin: 24px 0 28px;
    color: #FFFFFF;
  }

  .designops-pipeline-header {
    margin-bottom: 24px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .designops-tag {
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    color: #38BDF8;
    letter-spacing: 0.08em;
    display: block;
    margin-bottom: 4px;
  }

  .designops-pipeline-header h4 {
    font-family: var(--font-heading);
    font-size: 18px;
    font-weight: 900;
    color: #FFFFFF;
  }

  .designops-nodes-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    align-items: stretch;
  }

  @media (max-width: 1024px) {
    .designops-nodes-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 640px) {
    .designops-nodes-grid { grid-template-columns: 1fr; }
    .designops-pipeline-stage { padding: 18px; }
  }

  .d-node {
    background: #141A26;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .d-node-icon {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .d-node h5 {
    font-family: var(--font-heading);
    font-size: 13px;
    font-weight: 800;
    color: #FFFFFF;
    margin-bottom: 6px;
  }

  .d-node p {
    font-size: 11px;
    color: #94A3B8;
    line-height: 1.45;
    margin-bottom: 10px;
  }

  .d-node-tech {
    font-family: var(--font-code);
    font-size: 10px;
    font-weight: 700;
    color: #38BDF8;
    background: rgba(56, 189, 248, 0.1);
    padding: 3px 8px;
    border-radius: 4px;
    display: inline-block;
  }

  /* Interactive Working Prototype Container & Styling */
  .interactive-prototype-window {
    background: #0B0E17;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    overflow: hidden;
    margin: 28px 0 36px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  }

  .proto-win-header {
    background: #111624;
    padding: 12px 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .proto-win-url {
    font-family: var(--font-code);
    font-size: 11px;
    color: #94A3B8;
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 12px;
    border-radius: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 500px;
  }

  .proto-win-badge {
    font-family: var(--font-code);
    font-size: 10.5px;
    font-weight: 700;
    color: #10B981;
    white-space: nowrap;
  }

  .proto-win-body {
    padding: 24px;
    background: #0D111C;
    color: #FFFFFF;
  }

  .proto-deal-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 18px;
    flex-wrap: wrap;
    gap: 14px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .proto-grid-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  .proto-grid-table th {
    text-align: left;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.04);
    color: #94A3B8;
    font-family: var(--font-code);
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .proto-grid-table td {
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: #E2E8F0;
  }

  .proto-grid-table tr:hover td {
    background: rgba(255, 255, 255, 0.02);
  }

  .grid-num-input {
    width: 56px;
    padding: 4px 8px;
    background: #1E293B;
    border: 1px solid #3B82F6;
    border-radius: 4px;
    color: #FFFFFF;
    font-family: var(--font-code);
    font-size: 12px;
    font-weight: 700;
    text-align: right;
  }

  .grid-num-input:focus {
    outline: 2px solid #60A5FA;
  }

  .margin-pill.margin-escalate {
    background: rgba(239, 68, 68, 0.2);
    color: #F87171;
    border-color: #EF4444;
  }

  .proto-action-btn {
    background: var(--primary-accent);
    color: #FFFFFF;
    border: none;
    padding: 10px 20px;
    border-radius: 100px;
    font-family: var(--font-heading);
    font-size: 12.5px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(240, 6, 88, 0.3);
  }

  .proto-action-btn:hover {
    background: #D0054B;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(240, 6, 88, 0.4);
  }

  .proto-reject-btn {
    background: transparent;
    color: #F87171;
    border: 1px solid rgba(248, 113, 113, 0.3);
    padding: 10px 18px;
    border-radius: 100px;
    font-family: var(--font-heading);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .proto-reject-btn:hover {
    background: rgba(248, 113, 113, 0.1);
    border-color: #F87171;
  }

  .proto-toast {
    margin-top: 14px;
    padding: 12px 18px;
    border-radius: 8px;
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid #10B981;
    color: #34D399;
    font-family: var(--font-code);
    font-size: 11.5px;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Watson Agent Node Cards */
  .agent-node-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 14px;
  }

  .agent-node-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .agent-pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .dot-active {
    background: #10B981;
    box-shadow: 0 0 8px #10B981;
  }

  .dot-pending {
    background: #F59E0B;
    box-shadow: 0 0 8px #F59E0B;
  }

  .agent-name {
    font-family: var(--font-heading);
    font-size: 12.5px;
    font-weight: 800;
    color: #FFFFFF;
  }

  .agent-status-badge {
    display: inline-block;
    font-family: var(--font-code);
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 6px;
  }

  .badge-success { background: rgba(16, 185, 129, 0.15); color: #34D399; }
  .badge-pending { background: rgba(245, 158, 11, 0.15); color: #FBBF24; }

  .agent-detail-text {
    font-size: 11px;
    color: #94A3B8;
    margin: 0;
    line-height: 1.4;
  }

  .conf-tier-btns, .zone-filter-group, .carbon-theme-btns, .lighting-mode-btns {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .btn-tier, .zone-btn, .c-theme-btn, .w-light-btn {
    background: #1E293B;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #CBD5E1;
    padding: 6px 12px;
    border-radius: 6px;
    font-family: var(--font-code);
    font-size: 10.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-tier.active, .zone-btn.active, .c-theme-btn.active, .w-light-btn.active {
    background: #3B82F6;
    color: #FFFFFF;
    border-color: #60A5FA;
  }

  /* Zebra Fleet Card */
  .zebra-scanner-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 14px;
  }

  .zebra-scanner-card.scanner-warn {
    border-color: rgba(220, 38, 38, 0.4);
    background: rgba(220, 38, 38, 0.05);
  }

  .scanner-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .scanner-model {
    font-family: var(--font-heading);
    font-size: 12px;
    font-weight: 800;
    color: #FFFFFF;
  }

  .scanner-badge-ok {
    font-family: var(--font-code);
    font-size: 9.5px;
    color: #34D399;
    background: rgba(16, 185, 129, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .scanner-badge-alert {
    font-family: var(--font-code);
    font-size: 9.5px;
    color: #F87171;
    background: rgba(220, 38, 38, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .scanner-loc {
    font-size: 11px;
    color: #94A3B8;
    margin-bottom: 8px;
  }

  .scanner-metrics-row {
    font-family: var(--font-code);
    font-size: 10.5px;
    color: #CBD5E1;
    display: flex;
    gap: 8px;
  }

  /* Wabco HUD Card */
  .hud-zone-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }

  .hud-zone-tag {
    font-family: var(--font-code);
    font-size: 10px;
    font-weight: 700;
    color: #94A3B8;
    letter-spacing: 0.05em;
  }

  /* Behance Project Crosslink Ribbon */
  .behance-project-crosslink {
    background: linear-gradient(135deg, rgba(0, 87, 255, 0.1) 0%, rgba(240, 6, 88, 0.08) 100%);
    border: 1px solid rgba(0, 87, 255, 0.25);
    border-radius: 10px;
    padding: 12px 18px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .behance-project-crosslink span {
    font-size: 12.5px;
    color: var(--text-main);
    font-weight: 600;
  }

  .behance-project-crosslink a {
    color: #0057FF;
    font-family: var(--font-code);
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
  }

  .behance-project-crosslink a:hover {
    text-decoration: underline;
  }


  /* Authentic Behance Evidence Showcase in Section 04 */
  .behance-artifacts-showcase {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(96, 165, 250, 0.28);
    border-radius: 16px;
    padding: 28px 24px;
    margin: 32px 0;
    box-shadow: 0 12px 36px -10px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
  }
  .behance-showcase-header {
    margin-bottom: 24px;
    max-width: 100%;
    overflow: hidden;
  }
  .behance-showcase-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  .behance-verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(37, 99, 235, 0.2);
    color: #60a5fa;
    border: 1px solid rgba(96, 165, 250, 0.4);
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
  }
  .behance-showcase-title {
    font-size: 20px;
    font-weight: 700;
    color: #f8fafc;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .behance-showcase-desc {
    font-size: 14px;
    line-height: 1.6;
    color: #94a3b8;
    margin: 0;
    max-width: 820px;
  }
  .behance-gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
  }
  .behance-artifact-card {
    background: rgba(2, 6, 23, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, border-color 0.2s ease;
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
  }
  .behance-artifact-card:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.4);
  }
  .behance-card-img-wrap {
    position: relative;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: 220px;
    background: #090d16;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    box-sizing: border-box;
  }
  .behance-card-img {
    width: 100% !important;
    max-width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    display: block !important;
    transition: transform 0.3s ease;
    box-sizing: border-box !important;
  }
  .behance-artifact-card:hover .behance-card-img {
    transform: scale(1.03);
  }
  .behance-img-tag {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(8px);
    color: #93c5fd;
    border: 1px solid rgba(96, 165, 250, 0.3);
    font-family: var(--font-code);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 3px 8px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }
  .behance-card-info {
    padding: 16px 18px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    max-width: 100%;
  }
  .behance-card-title {
    font-size: 15px;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0 0 6px 0;
    line-height: 1.4;
  }
  .behance-card-desc {
    font-size: 12.5px;
    line-height: 1.55;
    color: #94a3b8;
    margin: 0;
    flex-grow: 1;
  }
  .sticky-case-toc {
    max-width: 100vw;
    overflow: hidden;
  }
  .toc-wrap {
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  @media (max-width: 768px) {
    .behance-artifacts-showcase {
      padding: 20px 16px;
    }
    .behance-gallery-grid {
      grid-template-columns: 1fr;
    }
    .behance-card-img-wrap {
      height: 190px;
    }
  }


`;


// Helper function to build a full-depth, multi-section scrollable case study page

// Helper function to render authentic Behance visual artifacts
function getBehanceShowcaseHtml(data) {
  if (!data.behanceArtifacts || data.behanceArtifacts.length === 0) return '';
  const artifactCards = data.behanceArtifacts.map(a => `
    <div class="behance-artifact-card">
      <div class="behance-card-img-wrap">
        <img src="${a.img}" alt="${a.title}" class="behance-card-img" loading="lazy">
        <span class="behance-img-tag">${a.tag}</span>
      </div>
      <div class="behance-card-info">
        <h4 class="behance-card-title">${a.title}</h4>
        <p class="behance-card-desc">${a.desc}</p>
      </div>
    </div>
  `).join('');

  return `
    <!-- Authentic Behance Production Artifacts Showcase -->
    <div class="behance-artifacts-showcase" aria-label="Authentic Behance Portfolio Evidence">
      <div class="behance-showcase-header">
        <div class="behance-showcase-title-row">
          <span class="behance-verified-badge">🎨 AUTHENTIC BĒHANCE EVIDENCE</span>
          <h3 class="behance-showcase-title">Visual Deliverables from My Public Behance Portfolio</h3>
        </div>
        <p class="behance-showcase-desc">
          Direct, unaltered production screens, information architecture maps, and responsive interfaces extracted from my public Behance portfolio archive (<strong>behance.net/balaajeeVR</strong>).
        </p>
      </div>
      <div class="behance-gallery-grid">
        ${artifactCards}
      </div>
    </div>
  `;
}


function buildScrollableCasePage(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title} | Balaajee V.R.</title>
  <meta name="description" content="${data.leadSummary.replace(/"/g, '&quot;')}">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}
    ${scrollableCaseStyles}
  </style>
</head>
<body>

  ${getGlobalNav('work')}

  <!-- Case Header & Hero Section -->
  <header class="case-hero-section">
    <div class="case-container">
      <div class="case-badge-strip">
        <span class="pill-co">${data.company}</span>
        <span class="pill-role">${data.roleDates}</span>
        <span class="pill-award">${data.award}</span>
      </div>

      <h1 class="case-main-title">${data.title}</h1>
      <p class="case-main-lead">${data.leadSummary}</p>

      <div class="hero-metric-bar">
        ${data.metrics.map(m => `
          <div class="h-metric-item">
            <div class="h-metric-val">${m.val}</div>
            <div class="h-metric-lbl">${m.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- 5-Phase UI/UX Design Manager Lifecycle Infographic Pipeline -->
      <div class="manager-process-pipeline" aria-label="5-Phase Design Manager Execution Framework">
        <div class="pipeline-header">
          <div class="pipeline-title-group">
            <span class="pipeline-tag">Senior UI/UX Design Manager Execution Framework</span>
            <h3 class="pipeline-heading">5-Phase Transformation Methodology &bull; ${data.shortName}</h3>
          </div>
          <span class="pipeline-role-badge">Hands-On Squad Leadership &rarr; Executive ROI</span>
        </div>
        <div class="pipeline-steps-grid">
          ${data.managerSteps.map((s, idx) => `
            <div class="p-step-card">
              <div>
                <div class="p-step-top">
                  <span class="p-step-num">0${idx + 1}</span>
                  <span class="p-step-phase">${s.phase}</span>
                </div>
                <h4 class="p-step-title">${s.title}</h4>
                <p class="p-step-desc">${s.desc}</p>
              </div>
              <div class="p-step-meta">
                <span class="p-step-deliverable"><strong>Deliverable:</strong> ${s.deliverable}</span>
                <span class="p-step-metric"><strong>Impact:</strong> ${s.metric}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 90-Second Walkthrough Video Stage -->
      <div class="case-video-stage" id="caseWalkthroughStage">
        <div class="video-stage-header">
          <span class="video-stage-header-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            90-Second Product Walkthrough &bull; ${data.shortName}
          </span>
          <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8;">1080p HD &bull; With Sticky PiP</span>
        </div>

        <video id="caseWalkthroughVideo" class="video-stage-video" controls poster="profile.jpg" preload="metadata">
          <source src="${data.videoFile}" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>

        <div class="video-chapters-bar">
          <span style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #CBD5E1; text-transform: uppercase;">Chapters:</span>
          ${data.chapters.map(c => `
            <button class="chapter-chip" onclick="seekCaseVideo(${c.sec})">${c.text}</button>
          `).join('')}
        </div>
      </div>

    </div>
  </header>

  <!-- Sticky In-Page Navigation Bar (Table of Contents) -->
  <nav class="sticky-case-toc" aria-label="In-Page Section Navigation">
    <div class="toc-wrap">
      <a href="#sec-stakes" class="toc-link">01. The Challenge</a>
      <a href="#sec-research" class="toc-link">02. Field Research &amp; Personas</a>
      <a href="#sec-ia" class="toc-link">03. IA &amp; Architecture Infographic</a>
      <a href="#sec-ui" class="toc-link">04. Shipped Product &amp; Prototype</a>
      <a href="#sec-tokens" class="toc-link">05. Tokens &amp; DesignOps</a>
      <a href="#sec-validation" class="toc-link">06. Usability &amp; Validation</a>
      <a href="#sec-car" class="toc-link">07. Business ROI &amp; CAR Defense</a>
    </div>
  </nav>

  <!-- Continuous Multi-Page Scrollable Content Body -->
  <main class="case-deep-dive-body">
    <div class="case-container">

      <!-- Section 01: The Challenge -->
      <section class="section-block" id="sec-stakes">
        <div class="section-header-tag">01 &bull; Business Context &amp; Stakes</div>
        <h2 class="section-title-h2">The Enterprise Crisis: Why Legacy Processes Were Failing</h2>
        <div class="section-prose">
          ${data.challengeProse}
        </div>
        <div class="callout-box gold">
          <div class="callout-title">Strategic Design Leadership Mandate</div>
          <div class="callout-text">${data.challengeMandate}</div>
        </div>
      </section>

      <!-- Section 02: Field Research & Personas -->
      <section class="section-block" id="sec-research">
        <div class="section-header-tag">02 &bull; In-Situ Field Research &amp; Mental Models</div>
        <h2 class="section-title-h2">Contextual Inquiries &amp; Empathy Mapping</h2>
        <div class="section-prose">
          ${data.researchProse}
        </div>
        ${data.personaHtml}
      </section>

      <!-- Section 03: IA & Workflow Transformation -->
      <section class="section-block" id="sec-ia">
        <div class="section-header-tag">03 &bull; Information Architecture &amp; Process Engineering</div>
        <h2 class="section-title-h2">Before &amp; After Workflow Transformation</h2>
        <div class="section-prose">
          ${data.workflowProse}
        </div>
        ${data.architectureInfographicHtml}
        ${data.workflowHtml}
      </section>

      <!-- Section 04: Interactive Solution Showcase -->
      <section class="section-block" id="sec-ui">
        <div class="section-header-tag">04 &bull; High-Fidelity Interactive Solution</div>
        <h2 class="section-title-h2">Production Shipped Interface &amp; Interactive Working Prototype</h2>
        <div class="section-prose">
          ${data.uiProse}
        </div>

        <!-- High-Resolution Annotated Product Screenshot Showcase -->
        
${getBehanceShowcaseHtml(data)}

        <div class="annotated-screenshot-stage">
          <div class="annotated-header">
            <div class="window-dots">
              <span class="window-dot dot-red"></span>
              <span class="window-dot dot-yellow"></span>
              <span class="window-dot dot-green"></span>
            </div>
            <div class="annotated-url">${data.screenshotUrl || 'production://' + data.caseId + '/enterprise-view'}</div>
            <span class="annotated-live-tag">● PRODUCTION SHIPPED INTERFACE</span>
          </div>
          <div class="screenshot-display-container">
            <img src="${data.screenshotImg}" alt="${data.shortName} Production Interface" class="annotated-full-img">
          </div>
          <div class="screenshot-callout-ribbon">
            <div class="ribbon-title">UI/UX Design Manager Architectural Highlights:</div>
            <div class="callout-chips-grid">
              ${data.screenshotCallouts.map((c, idx) => `
                <div class="callout-chip-item">
                  <div class="chip-num">0${idx + 1}</div>
                  <div class="chip-body">
                    <strong>${c.title}</strong>
                    <p>${c.detail}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        ${data.uiMockupHtml}
      </section>

      <!-- Section 05: Tokens & DesignOps -->
      <section class="section-block" id="sec-tokens">
        <div class="section-header-tag">05 &bull; Design Tokens &amp; Governance</div>
        <h2 class="section-title-h2">Design System Architecture &amp; Multi-Squad Token Pipeline</h2>
        <div class="section-prose">
          ${data.tokensProse}
        </div>

        <!-- DesignOps Governance Flywheel Infographic -->
        <div class="designops-pipeline-stage">
          <div class="designops-pipeline-header">
            <span class="designops-tag">DESIGNOPS GOVERNANCE FLYWHEEL</span>
            <h4>Single Source of Truth: Figma Variables &rarr; CI/CD &rarr; Multi-Squad Production Repos</h4>
          </div>
          <div class="designops-nodes-grid">
            <div class="d-node">
              <div class="d-node-icon">🎨</div>
              <h5>1. Figma Token Studio</h5>
              <p>Semantic color, typography, spacing tokens with mode switching</p>
              <span class="d-node-tech">Figma Variables</span>
            </div>
            <div class="d-node">
              <div class="d-node-icon">⚡</div>
              <h5>2. GitHub Actions CI</h5>
              <p>Automated webhook trigger on token publish; validates schema</p>
              <span class="d-node-tech">CI/CD Pipeline</span>
            </div>
            <div class="d-node">
              <div class="d-node-icon">⚙️</div>
              <h5>3. Style Dictionary</h5>
              <p>Compiles tokens into CSS vars, JSON, TypeScript theme contracts</p>
              <span class="d-node-tech">Token Compiler</span>
            </div>
            <div class="d-node">
              <div class="d-node-icon">📦</div>
              <h5>4. Production Repos</h5>
              <p>Automated PRs opened across 14 distributed squad codebases</p>
              <span class="d-node-tech">React / Web Components</span>
            </div>
            <div class="d-node">
              <div class="d-node-icon">🛡️</div>
              <h5>5. Automated QA</h5>
              <p>Visual regression testing with Playwright &amp; axe WCAG 2.1 AA</p>
              <span class="d-node-tech">Zero-Defect Gate</span>
            </div>
          </div>
        </div>

        ${data.tokensHtml}
      </section>

      <!-- Section 06: Usability & Validation -->
      <section class="section-block" id="sec-validation">
        <div class="section-header-tag">06 &bull; Usability Testing &amp; Metric Validation</div>
        <h2 class="section-title-h2">Quantitative Human-Centered Validation</h2>
        <div class="section-prose">
          ${data.validationProse}
        </div>
        <div class="metrics-hero-row">
          ${data.validationMetrics.map(m => `
            <div class="metric-hero-card">
              <div class="m-hero-val">${m.val}</div>
              <div class="m-hero-lbl">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Section 07: Business ROI & CAR Defense -->
      <section class="section-block" id="sec-car">
        <div class="section-header-tag">07 &bull; Hard Business ROI &amp; Leadership CAR Defense</div>
        <h2 class="section-title-h2">Leadership Interview Defense Q&amp;A (Situation, Action, Result)</h2>
        <div class="section-prose">
          ${data.carProse}
        </div>
        <div class="car-defense-grid">
          ${data.carQuestions.map((q, idx) => `
            <div class="car-item-card">
              <div class="car-q-header">
                <span class="q-badge">Q${idx + 1}</span>
                <span>${q.question}</span>
              </div>
              <div class="car-three-split">
                <div class="car-col">
                  <strong>Context / Situation</strong>
                  <p>${q.context}</p>
                </div>
                <div class="car-col">
                  <strong>UX Leadership Action</strong>
                  <p>${q.action}</p>
                </div>
                <div class="car-col">
                  <strong>Business Result</strong>
                  <p>${q.result}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Case Pagination Footer -->
      <footer class="case-pagination-bar">
        <a href="/work" class="btn-all-work">&larr; Back to All Selected Work</a>
        ${data.nextLink ? `
          <a href="${data.nextLink.url}" class="btn-next-case">
            Next Transformation: ${data.nextLink.label} &rarr;
          </a>
        ` : `
          <a href="/leadership" class="btn-next-case">
            Explore Leadership &amp; Vision Deck &rarr;
          </a>
        `}
      </footer>

    </div>
  </main>

  <!-- Global Footer -->
  <footer class="global-footer">
    <div class="footer-container">
      <div class="footer-left">
        <h5>Balaajee V.R. &bull; Senior UI/UX Design Manager</h5>
        <p>${data.shortName} Deep Dive &bull; 18+ Years Enterprise Design Leadership &bull; Open to Relocation</p>
      </div>
      <div class="footer-links">
        <a href="mailto:vrbberaj@gmail.com">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          vrbberaj@gmail.com
        </a>
        <a href="tel:+919994761293">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +91 9994761293
        </a>
        <a href="https://www.linkedin.com/in/balaajee-vr-21647967/" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          LinkedIn Profile
        </a>
      </div>
    </div>
  </footer>

  <!-- Floating Picture-in-Picture Mini-Player on Scroll -->
  <div class="floating-pip-player" id="floatingPipMiniPlayer">
    <div class="pip-header">
      <span>🎬 Speaking: ${data.shortName}</span>
      <button onclick="closeFloatingPip()" class="pip-close-btn" title="Dismiss">&times;</button>
    </div>
    <div class="pip-body" onclick="scrollToVideoStage()" title="Click to scroll to main video debrief">
      <img src="profile.jpg" alt="Balaajee V.R.">
      <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 10px;">
        <span style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; color: #FFFFFF; display: flex; align-items: center; gap: 6px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          ${data.shortName} &bull; 90s Walkthrough
        </span>
      </div>
    </div>
  </div>

  <script>
    function seekCaseVideo(seconds) {
      const video = document.getElementById('caseWalkthroughVideo');
      if (video) {
        video.currentTime = seconds;
        video.play().catch(e => {
          console.log('Video seek triggered to ' + seconds + 's');
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

    // Active Scroll-Spy for In-Page TOC
    const sectionIds = ['sec-stakes', 'sec-research', 'sec-ia', 'sec-ui', 'sec-tokens', 'sec-validation', 'sec-car'];
    window.addEventListener('scroll', () => {
      let currentSection = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            currentSection = id;
          }
        }
      }
      document.querySelectorAll('.toc-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('active');
        }
      });
    });

    // Dynamic TOC Offset Sync
    function syncTocOffset() {
      const header = document.querySelector('.global-header');
      const toc = document.querySelector('.sticky-case-toc');
      if (header && toc) {
        toc.style.top = header.offsetHeight + 'px';
      }
    }
    window.addEventListener('resize', syncTocOffset);
    syncTocOffset();

    function simulateAction(msg) {
      alert(msg);
    }
  </script>


  <!-- Shared Interactive Working Prototype Logic -->
  <script>
    // 1. Ericsson BOM Recalculation
    function recalcEricssonDeal() {
      const rows = document.querySelectorAll('#ericsson-bom-rows tr');
      let totalRev = 0, totalCost = 0;
      rows.forEach(r => {
        const cost = parseFloat(r.getAttribute('data-cost')) || 0;
        const list = parseFloat(r.getAttribute('data-list')) || 0;
        const qty = parseFloat(r.getAttribute('data-qty')) || 0;
        const input = r.querySelector('.grid-num-input');
        const disc = parseFloat(input ? input.value : 0) || 0;
        const netUnit = list * (1 - disc / 100);
        const lineRev = netUnit * qty;
        const lineCost = cost * qty;
        totalRev += lineRev;
        totalCost += lineCost;
        const netEl = r.querySelector('.row-net-val');
        const marginEl = r.querySelector('.row-margin-val');
        if (netEl) netEl.textContent = '$' + Math.round(lineRev).toLocaleString();
        const lineMargin = lineRev > 0 ? ((lineRev - lineCost) / lineRev) * 100 : 0;
        if (marginEl) {
          marginEl.textContent = lineMargin.toFixed(1) + '%';
          marginEl.className = 'margin-pill ' + (lineMargin >= 35 ? 'margin-pass' : 'margin-escalate') + ' row-margin-val';
        }
      });
      const totalEl = document.getElementById('ericsson-total-val');
      const badgeEl = document.getElementById('ericsson-margin-badge');
      if (totalEl) totalEl.textContent = '$' + Math.round(totalRev).toLocaleString();
      const overallMargin = totalRev > 0 ? ((totalRev - totalCost) / totalRev) * 100 : 0;
      if (badgeEl) {
        if (overallMargin >= 35) {
          badgeEl.className = 'margin-pill margin-pass';
          badgeEl.textContent = overallMargin.toFixed(1) + '% GROSS MARGIN [PASS • GREEN CHANNEL]';
        } else {
          badgeEl.className = 'margin-pill margin-escalate';
          badgeEl.textContent = overallMargin.toFixed(1) + '% GROSS MARGIN [⚠️ ESCALATION REQUIRED • VP REVIEW]';
        }
      }
    }
    function triggerEricssonQuotePdf() {
      const t = document.getElementById('ericsson-toast');
      if (t) { t.style.display = 'block'; setTimeout(() => { t.style.display = 'none'; }, 4500); }
    }

    // 2. Watson Confidence & Diff
    function setWatsonConfidence(tier) {
      const label = document.getElementById('watson-conf-label');
      const desc = document.getElementById('watson-conf-desc');
      document.querySelectorAll('.conf-tier-btns .btn-tier').forEach(b => b.classList.remove('active'));
      if (tier === 'high') {
        const btn = document.getElementById('wconf-high');
        if (btn) btn.classList.add('active');
        if (label) { label.textContent = '96.4% AI Confidence [Tier 1: Full Autonomy]'; label.style.color = '#34D399'; }
        if (desc) desc.textContent = 'Tier 1 Routing: Score exceeds 95% threshold. Safe for automated execution with post-commit notification.';
      } else if (tier === 'med') {
        const btn = document.getElementById('wconf-med');
        if (btn) btn.classList.add('active');
        if (label) { label.textContent = '94.2% AI Confidence [Tier 2: Supervised Draft]'; label.style.color = '#60A5FA'; }
        if (desc) desc.textContent = 'Tier 2 Routing: Side-by-side database diff verification required before irreversible write-back to SAP S/4HANA.';
      } else {
        const btn = document.getElementById('wconf-low');
        if (btn) btn.classList.add('active');
        if (label) { label.textContent = '74.0% AI Confidence [Tier 3: Low Confidence]'; label.style.color = '#F87171'; }
        if (desc) desc.textContent = 'Tier 3 Routing: Complex discrepancy detected. Hard escalation triggered to Corporate Financial Controller.';
      }
    }
    function commitWatsonLedger() {
      const t = document.getElementById('watson-toast');
      if (t) {
        t.style.display = 'block';
        t.style.background = 'rgba(16, 185, 129, 0.15)';
        t.style.borderColor = '#10B981';
        t.style.color = '#34D399';
        t.textContent = '🚀 Transaction #TX-88219 committed to SAP S/4HANA & SOX Cryptographic Audit Trail Logged!';
        setTimeout(() => { t.style.display = 'none'; }, 4500);
      }
    }
    function rejectWatsonLedger() {
      const t = document.getElementById('watson-toast');
      if (t) {
        t.style.display = 'block';
        t.style.background = 'rgba(239, 68, 68, 0.15)';
        t.style.borderColor = '#EF4444';
        t.style.color = '#F87171';
        t.textContent = '⚠️ Transaction rejected. Diverted to manual controller review queue.';
        setTimeout(() => { t.style.display = 'none'; }, 4500);
      }
    }

    // 3. Zebra Zone Filter & Scan
    function filterZebraZone(zone) {
      document.querySelectorAll('.zone-filter-group .zone-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById('zbtn-' + zone);
      if (activeBtn) activeBtn.classList.add('active');
      const alertEl = document.getElementById('zebra-cold-alert');
      const gloveInd = document.getElementById('zebra-glove-mode-indicator');
      if (zone === 'c') {
        if (alertEl) alertEl.style.display = 'block';
        if (gloveInd) {
          gloveInd.textContent = '🧤 Heavy Thermal Glove Mode: 72px Targets [ACTIVE]';
          gloveInd.style.background = 'rgba(240, 6, 88, 0.15)';
          gloveInd.style.color = '#F43F5E';
          gloveInd.style.borderColor = '#F43F5E';
        }
      } else {
        if (alertEl) alertEl.style.display = 'none';
        if (gloveInd) {
          gloveInd.textContent = '🧤 Standard Touch Targets: 44px';
          gloveInd.style.background = 'rgba(16, 185, 129, 0.1)';
          gloveInd.style.color = '#34D399';
          gloveInd.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        }
      }
    }
    function triggerZebraScan() {
      const t = document.getElementById('zebra-toast');
      if (t) { t.style.display = 'block'; setTimeout(() => { t.style.display = 'none'; }, 4500); }
    }

    // 4. Carbon Theme Switcher
    function setCarbonTheme(theme) {
      document.querySelectorAll('.carbon-theme-btns .c-theme-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById('cbtn-' + theme);
      if (activeBtn) activeBtn.classList.add('active');
      const stage = document.getElementById('carbon-live-stage');
      const btn = document.getElementById('carbon-btn-primary');
      const input = document.getElementById('carbon-input');
      const tint = document.getElementById('t-int');
      const tbg = document.getElementById('t-bg');
      const tfield = document.getElementById('t-field');
      const ttext = document.getElementById('t-text');

      if (!stage) return;
      if (theme === 'white') {
        stage.style.background = '#FFFFFF'; stage.style.color = '#161616'; stage.style.borderColor = '#E0E0E0';
        if (btn) btn.style.background = '#0F62FE';
        if (input) { input.style.background = '#F4F4F4'; input.style.borderColor = '#8D8D8D'; input.style.color = '#161616'; }
        if (tint) tint.textContent = '#0F62FE';
        if (tbg) tbg.textContent = '#FFFFFF';
        if (tfield) tfield.textContent = '#F4F4F4';
        if (ttext) ttext.textContent = '#161616';
      } else if (theme === 'g10') {
        stage.style.background = '#F4F4F4'; stage.style.color = '#161616'; stage.style.borderColor = '#D1D5DB';
        if (btn) btn.style.background = '#0F62FE';
        if (input) { input.style.background = '#FFFFFF'; input.style.borderColor = '#8D8D8D'; input.style.color = '#161616'; }
        if (tint) tint.textContent = '#0F62FE';
        if (tbg) tbg.textContent = '#F4F4F4';
        if (tfield) tfield.textContent = '#FFFFFF';
        if (ttext) ttext.textContent = '#161616';
      } else if (theme === 'g90') {
        stage.style.background = '#262626'; stage.style.color = '#F4F4F4'; stage.style.borderColor = '#525252';
        if (btn) btn.style.background = '#78A9FF';
        if (input) { input.style.background = '#393939'; input.style.borderColor = '#6F6F6F'; input.style.color = '#FFFFFF'; }
        if (tint) tint.textContent = '#78A9FF';
        if (tbg) tbg.textContent = '#262626';
        if (tfield) tfield.textContent = '#393939';
        if (ttext) ttext.textContent = '#F4F4F4';
      } else if (theme === 'g100') {
        stage.style.background = '#161616'; stage.style.color = '#FFFFFF'; stage.style.borderColor = '#393939';
        if (btn) btn.style.background = '#4589DF';
        if (input) { input.style.background = '#262626'; input.style.borderColor = '#525252'; input.style.color = '#FFFFFF'; }
        if (tint) tint.textContent = '#4589DF';
        if (tbg) tbg.textContent = '#161616';
        if (tfield) tfield.textContent = '#262626';
        if (ttext) ttext.textContent = '#FFFFFF';
      }
    }
    function triggerCarbonPr() {
      const t = document.getElementById('carbon-toast');
      if (t) { t.style.display = 'block'; setTimeout(() => { t.style.display = 'none'; }, 4500); }
    }

    // 5. Wabco HUD Simulator
    function setWabcoLighting(mode) {
      document.querySelectorAll('.lighting-mode-btns .w-light-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById('wbtn-' + mode);
      if (activeBtn) activeBtn.classList.add('active');
      const body = document.getElementById('wabco-hud-body');
      if (!body) return;
      if (mode === 'day') {
        body.style.background = '#F8FAFC';
        body.style.color = '#0F172A';
      } else {
        body.style.background = '#06090F';
        body.style.color = '#FFFFFF';
      }
    }
    function updateWabcoSpeed(val) {
      const speedEl = document.getElementById('wabco-speed-num');
      const sliderVal = document.getElementById('wabco-slider-val');
      const radarInfo = document.getElementById('wabco-radar-info');
      if (speedEl) speedEl.innerHTML = val + ' <span style="font-size: 16px;">KM/H</span>';
      if (sliderVal) sliderVal.textContent = val + ' km/h';
      const distance = Math.round(val * 0.96);
      if (radarInfo) radarInfo.innerHTML = 'Safe Radar Distance: <strong>' + distance + 'm</strong> &bull; Headway: 2.4s';
    }
    function triggerWabcoHazard() {
      const alertEl = document.getElementById('wabco-hazard-alert');
      const t = document.getElementById('wabco-toast');
      if (alertEl) { alertEl.style.display = 'block'; setTimeout(() => { alertEl.style.display = 'none'; }, 5000); }
      if (t) { t.style.display = 'block'; setTimeout(() => { t.style.display = 'none'; }, 5000); }
    }
  </script>

</body>
</html>`;
}


// ----------------------------------------------------------------------------
// CASE 1: ERICSSON SALESOPS CLOUD (FULL-SIZE SCROLLABLE)
// ----------------------------------------------------------------------------
console.log('3a. Compiling case-ericsson.html (Full Scrollable)...');

const ericssonData = {
  behanceArtifacts: [
    {
        "img": "screenshots/behance/ericsson_desktop_grid.png",
        "tag": "DESKTOP HIGH-DENSITY GRID",
        "title": "Network Device Configuration & Backup Profile Grids",
        "desc": "Complex tabular enterprise architecture managing live network device parameters, backup automation schedules, and multi-tenant profiles."
    },
    {
        "img": "screenshots/behance/ericsson_mobile_screens.png",
        "tag": "5-SCREEN MOBILE SUITE",
        "title": "Mobile Network Configuration & Critical Alarm Telematics",
        "desc": "On-the-go NOC companion application displaying real-time alarm counters, Cisco/Juniper router summaries, compliance policy checklists, and IP route changes."
    },
    {
        "img": "screenshots/behance/ericsson_problem_framework.png",
        "tag": "SYSTEMIC TAXONOMY",
        "title": "Early Problem Scoping & Network Failure Taxonomy",
        "desc": "Original discovery synthesis grouping 6 systemic enterprise failure vectors: performance degradation, network growth, security, and hardware compatibility."
    }
],
  caseId: 'ericsson',

  screenshotImg: 'screenshots/transformation-ericsson.png',
  screenshotUrl: 'https://salesops.ericsson.net/deals/deal-4820/bom-configurator',
  managerSteps: [
    {
      phase: 'Formula & Macro Audit',
      title: '14-Tab Excel Macro & Dependency Audit',
      desc: 'Audited 50MB unversioned workbook across 45 countries; mapped 42 cascading #REF! failure modes and 12,000 catalog parts.',
      deliverable: 'Risk Register & Formula Map',
      metric: 'Quantified 6-day deal delay'
    },
    {
      phase: 'Biomechanical Shadowing',
      title: 'In-Situ Keyboard Velocity Shadowing in Stockholm',
      desc: 'Shadowed 12 senior bid engineers on live operator bids; identified keyboard shortcuts and clipboard velocity as non-negotiable adoption criteria.',
      deliverable: 'Ergonomic Biomechanics Map',
      metric: '100% engineer buy-in on grid UX'
    },
    {
      phase: 'High-Density Grid Scaffolding',
      title: 'Single-Pane Data Grid IA & Frozen Headers',
      desc: 'Re-architected 18-step quoting ordeal into single-pane high-density grid with instant formula calculation and zero modal disruptions.',
      deliverable: 'Single-Pane Grid IA Blueprint',
      metric: 'Steps reduced from 18 to 5'
    },
    {
      phase: 'Sub-16ms Reactive Tokens',
      title: 'Reactive Financial Token System & Guardrails',
      desc: 'Authored DesignOps token library with strict tabular typography, real-time margin status colors, and sub-16ms live formula recalculations.',
      deliverable: 'Ericsson CPQ Token Library',
      metric: 'Zero visual regression in QA'
    },
    {
      phase: 'Green-Channel Governance',
      title: 'Global Benchmark & Green-Channel Auto-Signoff',
      desc: 'Conducted usability benchmarking in Stockholm and Chennai; drove voluntary adoption to 94% in 30 days and reduced deal cycle from 6 days to 42 minutes.',
      deliverable: 'Usability Benchmark (SUS 87)',
      metric: 'Turnaround: 6d &rarr; 42m (-92%)'
    }
  ],
  architectureInfographicHtml: `
    <div class="architecture-infographic-stage">
      <div class="arch-info-header">
        <span class="arch-tag">SYSTEM ARCHITECTURE &amp; DATA FLOW INFOGRAPHIC</span>
        <h4>Enterprise Topology: Legacy Spreadsheet Bottlenecks vs Modernized CPQ Data Grid</h4>
      </div>
      <div class="arch-diagram-grid">
        <div class="arch-column legacy">
          <div class="arch-col-title legacy">
            <span>❌ Legacy Architecture (Fragile &amp; Manual)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">High Friction</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">📄</span><div><strong>50MB Master Excel:</strong> 14 unversioned tabs with fragile VBA macros across 45 countries</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">⚠️</span><div><strong>Cascading #REF! Errors:</strong> Manual cell overrides broke dependent 5G hardware pricing calculations</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">✉️</span><div><strong>Email Verification Queue:</strong> Quotes queued in Commercial Director inboxes for manual margin sign-off</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">⏳</span><div><strong>6-Day Turnaround Bottleneck:</strong> High risk of pricing discrepancies and unauthorized discounts</div></div>
          </div>
        </div>
        <div class="arch-column modern">
          <div class="arch-col-title modern">
            <span>✅ Modernized System Architecture (Governed &amp; Automated)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">Zero-Defect</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">⚡</span><div><strong>Cloud CPQ Data Grid:</strong> Keyboard-first web grid with instant tabular copy-paste and arrow navigation</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🔄</span><div><strong>Real-Time SAP Pricing Sync:</strong> Direct API catalog link ensuring 100% compliant part numbers</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🛡️</span><div><strong>Automated Margin Guardrail:</strong> Live margin calculation with Green-Channel auto-approval for &ge;35%</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🚀</span><div><strong>42-Minute 1-Click Proposal:</strong> Instant export to verified customer PDF, eliminating email friction</div></div>
          </div>
        </div>
      </div>
      <div class="arch-summary-bar">
        <div class="arch-summary-stat"><span>Cycle Latency:</span> <strong>6 Days &rarr; 42 Minutes (-92%)</strong></div>
        <div class="arch-summary-stat"><span>Process Steps:</span> <strong>18 Manual Steps &rarr; 5 Automated Steps</strong></div>
        <div class="arch-summary-stat"><span>Catalog Accuracy:</span> <strong>100% Verified SAP Compliance</strong></div>
      </div>
    </div>
  `,
  screenshotCallouts: [
    {
      title: 'Keyboard-First High-Density Grid',
      detail: 'Engineers navigate 100+ rows with standard arrow keys, cell jumping, and tabular copy-paste, maintaining spreadsheet speed without formula fragility.'
    },
    {
      title: 'Live Gross Margin Guardrail Matrix',
      detail: 'Real-time margin calculation (38.4% PASS) automatically validates profitability against corporate thresholds before quote submission.'
    },
    {
      title: '1-Click Verified Customer Proposal',
      detail: 'Directly generates signed, customer-ready executive contract PDF with verified SAP part numbers, bypassing days of manual document preparation.'
    }
  ],

  title: 'Ericsson SalesOps Cloud: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine',
  shortName: 'Ericsson SalesOps CPQ',
  company: 'Ericsson Global',
  roleDates: 'Lead UI/UX Designer &amp; Architect &bull; Jul 2019 – Sep 2020',
  award: '🏆 1st Place Global Hack-fest Award &bull; Spot Innovation Citation',
  leadSummary: 'Modernizing an unversioned, macro-laden spreadsheet quoting nightmare into an enterprise cloud CPQ engine, reducing turnaround from 6 days to 42 minutes and achieving 100% catalog pricing accuracy across 12,000+ hardware components.',
  videoFile: 'ericsson_walkthrough.mp4',
  metrics: [
    { label: 'Target Users', val: '1,200+ Sales Engineers' },
    { label: 'Turnaround', val: '6 Days &rarr; 42 Mins (-92%)' },
    { label: 'Pricing Accuracy', val: '100% Verified' },
    { label: 'Adoption Rate', val: '94% in 30 Days' }
  ],
  chapters: [
    { sec: 0, text: '0:00 14-Tab Excel Audit' },
    { sec: 30, text: '0:30 Keyboard Data Grid' },
    { sec: 65, text: '1:05 Pricing Guardrails & Governance' }
  ],
  challengeProse: `
    <p>At Ericsson Global, over 1,200 technical sales engineers across 45 countries were configuring complex 5G network infrastructure deployments spanning thousands of line items. However, the entire quoting machinery relied on a <strong>monolithic, unversioned 50MB Microsoft Excel workbook</strong> containing 14 dense tabs, fragile Visual Basic macros, and manual regional rate cards.</p>
    <p>Whenever a sales engineer modified a discount cell, broken <code>#REF!</code> formulas frequently cascaded across interdependent hardware calculations. Worse still, unauthorized configuration overrides slipped through unnoticed, causing severe pricing discrepancies, delivery friction, and unapproved discount discrepancies across global markets. Quotes crawled through a 6-day email bottleneck waiting for Commercial Directors to manually verify Excel cell formulas.</p>
  `,
  challengeMandate: 'Architect an enterprise CPQ cloud application that eliminated spreadsheet calculation errors and enforced automated pricing validation guardrails, while strictly matching the keyboard data-entry velocity that senior electrical engineers demanded.',
  researchProse: `
    <p>To understand why prior corporate software rollouts failed with less than 15% adoption, I traveled to Stockholm, Sweden to conduct <strong>contextual inquiry sessions</strong> shadowing telecom sales engineers on live customer bids. I discovered that engineers didn’t love Excel for its visual interface—they loved it for <strong>keyboard muscle memory</strong> (arrow keys, copy-paste across cells, instantaneous autocomplete). Corporate web wizards with dropdowns and multi-step dialogs felt painfully slow and restrictive.</p>
  `,
  personaHtml: `
    <div class="persona-card">
      <div class="persona-top">
        <div class="persona-avatar-box">👨‍💼</div>
        <div class="persona-info">
          <h4>Marcus Lindqvist &bull; Senior Telecom Sales Engineer</h4>
          <p>Ericsson Global Sales Ops &bull; Stockholm, Sweden &bull; 12 Yrs Tenure</p>
        </div>
      </div>
      <div class="persona-quote">
        “I have an electrical engineering degree, but 60% of my week is burned copying numbers across 14 spreadsheet tabs, debugging broken VLOOKUP macros, and waiting days for Commercial Director email sign-offs. If your new web tool takes away my keyboard navigation, I will revert to Excel on day one.”
      </div>
      <div class="empathy-grid">
        <div class="empathy-box">
          <div class="empathy-box-title">Says</div>
          <p>“If your new tool takes away my keyboard shortcuts or makes me click through 8 wizards, I won’t use it.”</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Thinks</div>
          <p>“If I submit a quote with a #REF! formula error, I look incompetent in front of Vodafone executives.”</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Does</div>
          <p>Copies rows between unversioned regional workbooks; manually checks PDF pricing bulletins.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Feels</div>
          <p>Exhausted by bureaucratic spreadsheet administration instead of architecting advanced 5G network topology.</p>
        </div>
      </div>
    </div>
  `,
  workflowProse: `
    <p>We mapped the entire deal construction lifecycle from requirement intake to customer signature. By stripping out manual rate lookups and email sign-off loops, we condensed an 18-step manual ordeal into a streamlined 5-step automated workflow.</p>
  `,
  workflowHtml: `
    <div class="flow-comparison">
      <div class="flow-card bad">
        <div class="flow-card-header">
          <h4>❌ Legacy 14-Tab Excel Workflow (6 Days)</h4>
          <span class="margin-pill margin-fail">High Error Rate</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-bad">01</span>
            <div>Open 50MB unversioned master spreadsheet with 14 tabs and regional rate lookups.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">02</span>
            <div>Manually paste hardware bill-of-materials from network planning tool.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">03</span>
            <div>Debug broken VLOOKUP links and recalculate custom discount rates manually.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">04</span>
            <div>Email workbook to Regional Commercial Director for manual margin verification.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">05</span>
            <div>Wait 3 to 5 business days for review; risk manual data entry errors.</div>
          </div>
        </div>
      </div>

      <div class="flow-card good">
        <div class="flow-card-header">
          <h4>✅ SalesOps Cloud CPQ Workflow (42 Mins)</h4>
          <span class="margin-pill margin-pass">0% Calculation Errors</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-good">01</span>
            <div>Select Verified Customer Template (auto-syncs currency, tier, and master service agreements).</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">02</span>
            <div>Keyboard-first BOM configuration with instant catalog autocomplete and zero broken formulas.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">03</span>
            <div>Live margin engine validates deal profitability in real time against corporate guardrails.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">04</span>
            <div>Automated green-channel bypass: Deals &ge;35% margin auto-approved instantly.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">05</span>
            <div>1-Click export to verified, customer-ready executive proposal PDF.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  uiProse: `
    <p>Below is the live interactive Bill of Materials (BOM) interface. Notice how engineers can navigate cells with standard arrow keys, adjust discounts, and immediately observe live gross margin health calculations in the header.</p>
  `,
  uiMockupHtml: `
    <div class="interactive-prototype-window">
      <div class="proto-win-header">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url">https://salesops.ericsson.net/deals/deal-4820/bom-configurator</div>
        <span class="proto-win-badge">● LIVE SAP PRICING ENGINE</span>
      </div>
      <div class="proto-win-body">
        <div class="proto-deal-bar">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: #FFFFFF; margin: 0 0 4px;">Vodafone UK — 5G Massive MIMO Expansion (Q3 Deal #4820)</h4>
            <p style="font-size: 12px; color: #94A3B8; margin: 0;">Tier 1 Strategic &bull; Lead Architect: M. Lindqvist &bull; 12,000 Verified SAP Parts</p>
          </div>
          <div style="text-align: right;">
            <div id="ericsson-total-val" style="font-family: var(--font-heading); font-size: 24px; font-weight: 900; color: #F59E0B;">$8,420,000</div>
            <div id="ericsson-margin-badge" class="margin-pill margin-pass">38.4% GROSS MARGIN [PASS &bull; GREEN CHANNEL]</div>
          </div>
        </div>

        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 10px 14px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <span style="font-family: var(--font-code); font-size: 11px; color: #38BDF8;">⌨️ Keyboard Shortcuts: Arrow Keys to Navigate &bull; Tab to Edit &bull; Enter to Commit Row</span>
          <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8;">Auto-Approval Threshold: &ge;35.0% Gross Margin</span>
        </div>

        <div style="overflow-x: auto; margin-bottom: 16px;">
          <table class="proto-grid-table">
            <thead>
              <tr>
                <th>Part #</th>
                <th>Description</th>
                <th>Unit Cost</th>
                <th>List Price</th>
                <th>Qty</th>
                <th>Discount %</th>
                <th>Net Price</th>
                <th>Line Margin</th>
              </tr>
            </thead>
            <tbody id="ericsson-bom-rows">
              <tr data-part="AIR 6488" data-cost="11200" data-list="18500" data-qty="120">
                <td class="cell-code">AIR 6488</td>
                <td>5G Massive MIMO Radio (3.5GHz 64T64R)</td>
                <td class="cell-num">$11,200</td>
                <td class="cell-num">$18,500</td>
                <td class="cell-num">120</td>
                <td><input type="number" min="0" max="50" value="12" class="grid-num-input" oninput="recalcEricssonDeal()" aria-label="Discount percentage for AIR 6488"> %</td>
                <td class="cell-num row-net-val">$1,953,600</td>
                <td><span class="margin-pill margin-pass row-margin-val">39.2%</span></td>
              </tr>
              <tr data-part="Baseband 6648" data-cost="8200" data-list="14200" data-qty="85">
                <td class="cell-code">Baseband 6648</td>
                <td>High-Capacity RAN Compute Unit</td>
                <td class="cell-num">$8,200</td>
                <td class="cell-num">$14,200</td>
                <td class="cell-num">85</td>
                <td><input type="number" min="0" max="50" value="8" class="grid-num-input" oninput="recalcEricssonDeal()" aria-label="Discount percentage for Baseband 6648"> %</td>
                <td class="cell-num row-net-val">$1,110,440</td>
                <td><span class="margin-pill margin-pass row-margin-val">41.5%</span></td>
              </tr>
              <tr data-part="Router 6672" data-cost="5600" data-list="8900" data-qty="140">
                <td class="cell-code">Router 6672</td>
                <td>100GE Cell Site Aggregation Gateway</td>
                <td class="cell-num">$5,600</td>
                <td class="cell-num">$8,900</td>
                <td class="cell-num">140</td>
                <td><input type="number" min="0" max="50" value="15" class="grid-num-input" oninput="recalcEricssonDeal()" aria-label="Discount percentage for Router 6672"> %</td>
                <td class="cell-num row-net-val">$1,059,100</td>
                <td><span class="margin-pill margin-pass row-margin-val">36.1%</span></td>
              </tr>
              <tr data-part="Streetmacro 6701" data-cost="7100" data-list="11400" data-qty="60">
                <td class="cell-code">Streetmacro 6701</td>
                <td>mmWave Integrated Urban Small Cell</td>
                <td class="cell-num">$7,100</td>
                <td class="cell-num">$11,400</td>
                <td class="cell-num">60</td>
                <td><input type="number" min="0" max="50" value="10" class="grid-num-input" oninput="recalcEricssonDeal()" aria-label="Discount percentage for Streetmacro 6701"> %</td>
                <td class="cell-num row-net-val">$615,600</td>
                <td><span class="margin-pill margin-pass row-margin-val">37.8%</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
          <div style="font-size: 12px; color: #94A3B8;">
            💡 <em>Try increasing discounts to &gt;20% to observe live escalation guardrail trigger.</em>
          </div>
          <button onclick="triggerEricssonQuotePdf()" class="proto-action-btn">
            📄 1-Click Generate Signed Contract PDF
          </button>
        </div>

        <div id="ericsson-toast" class="proto-toast" style="display: none;">
          ✅ Contract Proposal #4820 Generated! Verified against 100% SAP Catalog Rules &amp; Signed by Commercial Bot.
        </div>
      </div>
    </div>
  `,
  tokensProse: `
    <p>To ensure high rendering performance across large 100+ row quote tables, we established semantic color tokens for margin health and tabular numerical alignment tokens using monospace type scales.</p>
  `,
  tokensHtml: `
    <div class="token-grid">
      <div class="token-card">
        <div class="token-swatch" style="background: #002561;"></div>
        <div class="token-meta">
          <h5>$ericsson-blue</h5>
          <span>#002561 &bull; Primary Brand</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #0082F0;"></div>
        <div class="token-meta">
          <h5>$action-cyan</h5>
          <span>#0082F0 &bull; Interactive Focus</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #10B981;"></div>
        <div class="token-meta">
          <h5>$margin-pass</h5>
          <span>#10B981 &bull; Margin &ge; 35%</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #F59E0B;"></div>
        <div class="token-meta">
          <h5>$margin-amber</h5>
          <span>#F59E0B &bull; Margin 28–34%</span>
        </div>
      </div>
    </div>
  `,
  validationProse: `
    <p>In 12 moderated usability sessions across Stockholm and Chennai, sales engineers saw their <strong>SUS (System Usability Scale) satisfaction jump from 34/100 (unacceptable) to 87/100 (world-class)</strong>. By preserving spreadsheet muscle memory while enforcing automated catalog validation rules, we achieved 94% platform adoption within 30 days.</p>
  `,
  validationMetrics: [
    { val: '34 &rarr; 87', label: 'SUS Usability Score (+155%)' },
    { val: '6d &rarr; 42m', label: 'Quote Turnaround (-92%)' },
    { val: '94%', label: 'Active 30-Day Adoption' }
  ],
  carProse: `
    <p>Direct leadership defenses addressing critical operational tensions between sales velocity and commercial governance.</p>
  `,
  carQuestions: [
    {
      question: 'Sales engineers are notoriously protective of their Excel spreadsheets. How did you overcome their intense resistance to a new web tool?',
      context: 'Previous corporate attempts to replace the 14-tab Excel sheet with heavy web wizards failed with under 15% adoption because sales engineers felt slow, handcuffed, and restricted by multi-step dropdown forms.',
      action: 'During contextual inquiry in Stockholm, I discovered engineers loved Excel not for its aesthetics, but for keyboard velocity. I scrapped the wizard paradigm and architected a high-speed data grid featuring arrow-key cell navigation, tabular copy-paste, and inline search. We preserved their muscle memory while silently moving the catalog and pricing validation to the cloud.',
      result: 'Adoption exceeded 94% within the first month. Quote turnaround dropped from 6 days to 42 minutes, and the project won 1st Place in the Ericsson Global Hack-fest Optimization Contest.'
    },
    {
      question: 'What was the biggest tension between Sales and Commercial Governance, and how did your UX architecture resolve it?',
      context: 'Sales demanded total quoting flexibility to respond quickly to complex tenders, while Commercial Governance and Pricing teams needed strict guardrails to prevent unapproved discount tiers and invalid hardware configurations.',
      action: 'I designed dynamic, three-tiered validation guardrails into the data grid. Standard configurations remained in a high-speed Green Channel for instant export. Out-of-bounds configurations triggered clear, non-blocking inline feedback with automated escalation workflows, eliminating subjective email disputes.',
      result: 'Compressed deal approval turnaround by 92%, enforced 100% catalog rule compliance across 14 global market units, and completely eliminated broken formula errors.'
    }
  ],
  nextLink: { url: '/case-ibm-watson', label: 'IBM Watson Agentic AI' }
};

fs.writeFileSync(path.join(__dirname, 'case-ericsson.html'), buildScrollableCasePage(ericssonData), 'utf8');
console.log('case-ericsson.html written cleanly.');

// ----------------------------------------------------------------------------
// CASE 2: IBM WATSON ORCHESTRATE (FULL-SIZE SCROLLABLE)
// ----------------------------------------------------------------------------
console.log('3b. Compiling case-ibm-watson.html (Full Scrollable)...');

const watsonData = {
  behanceArtifacts: [
    {
        "img": "screenshots/behance/sales_estimation_clean.png",
        "tag": "DECISION SUPPORT ENGINE",
        "title": "Business Case Portal: Scenario A vs Scenario B Modeler",
        "desc": "Enterprise multi-scenario decision modeling engine comparing 300 MSEK vs 260 MSEK investment pathways with automated Core Domain and RAN Domain variance tracking."
    },
    {
        "img": "screenshots/transformation-ibm-watson.png",
        "tag": "AGENTIC ORCHESTRATION",
        "title": "Watson Orchestrate Multi-Agent Autonomous Mesh",
        "desc": "3-tier confidence routing interface with transparent side-by-side database diff drawer and cryptographic SOX audit logging."
    }
],
  caseId: 'watson',

  screenshotImg: 'screenshots/transformation-ibm-watson.png',
  screenshotUrl: 'https://orchestrate.ibm.com/mesh/autonomous-agent-governance',
  managerSteps: [
    {
      phase: 'Mental Model & Trust Audit',
      title: 'Cognitive Mental Model & SOX Risk Audit',
      desc: 'Audited cognitive fatigue and liability anxiety when enterprise finance analysts review automated LLM database mutations across SAP and Salesforce.',
      deliverable: 'Cognitive Trust Audit & Risk Register',
      metric: 'Identified 18 hallucination risks'
    },
    {
      phase: '3-Tier Confidence Routing',
      title: 'Mathematical Confidence Gating Framework',
      desc: 'Designed 3-tier routing: Full Autonomy (>=95%), Supervised Review (80-94%), and Hard Human Override (<80%) to guarantee audit safety.',
      deliverable: 'Confidence Gating Architecture',
      metric: 'Zero unauthorized writes'
    },
    {
      phase: 'Agent Mesh State Machine',
      title: 'Multi-Agent Mesh Topology & Visual State Machine',
      desc: 'Engineered visual orchestration canvas showing live agent task hand-offs (SAP ERP -> CRM -> Jira) with real-time dependency status.',
      deliverable: 'Agentic Mesh Topology Map',
      metric: '78% review overhead reduction'
    },
    {
      phase: 'Side-by-Side Mutation Diff',
      title: 'Audit-Proof Ledger Mutation Diffing Drawer',
      desc: 'Created side-by-side database diff review highlighting pending adjustments with green addition and red deletion delta tokens before ERP write-back.',
      deliverable: 'Side-by-Side Diff Component Spec',
      metric: 'Review time: 45m -> 8m (-82%)'
    },
    {
      phase: 'SOX Compliance Flywheel',
      title: 'Cryptographic Audit Trail & Governance Flywheel',
      desc: 'Implemented immutable ledger logging with prompt parameter hashing and human approval timestamps; scaled across 6 global enterprise business units.',
      deliverable: 'SOX Audit Protocol & SUS 89 Report',
      metric: '0 SOX violations across 120k tasks'
    }
  ],
  architectureInfographicHtml: `
    <div class="architecture-infographic-stage">
      <div class="arch-info-header">
        <span class="arch-tag">SYSTEM ARCHITECTURE &amp; DATA FLOW INFOGRAPHIC</span>
        <h4>Agentic Topology: Black-Box Hallucinations vs Governed Multi-Agent Mesh</h4>
      </div>
      <div class="arch-diagram-grid">
        <div class="arch-column legacy">
          <div class="arch-col-title legacy">
            <span>❌ Legacy Architecture (Black-Box &amp; Unaudited)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">High Risk</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">🤖</span><div><strong>Black-Box GenAI Prompting:</strong> Autonomous agent executed actions without intermediate explainability</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">⚠️</span><div><strong>Hallucination Vulnerability:</strong> Model modified ERP and CRM records with unverified synthetic data</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🛑</span><div><strong>Compliance Officer Veto:</strong> Legal &amp; SOX teams halted deployment due to lack of audit trail</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">📉</span><div><strong>Stalled Automation:</strong> Enterprise operators reverted to slow, manual multi-system copy-paste routines</div></div>
          </div>
        </div>
        <div class="arch-column modern">
          <div class="arch-col-title modern">
            <span>✅ Modernized System Architecture (Governed &amp; Automated)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">Zero-Defect</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">🕸️</span><div><strong>Agentic Orchestration Mesh:</strong> Visual state graph displaying live multi-agent task execution across SAP/Salesforce</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🎯</span><div><strong>3-Tier Confidence Gating:</strong> Scores &ge;90% auto-execute; 70-89% trigger mandatory side-by-side diff review</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">👁️</span><div><strong>Human-in-the-Loop Diff Drawer:</strong> Operators inspect exact proposed mutations before committing to production</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">📜</span><div><strong>Cryptographic Audit Trail:</strong> Full provenance logging satisfying strict regulatory compliance for SOX and GDPR</div></div>
          </div>
        </div>
      </div>
      <div class="arch-summary-bar">
        <div class="arch-summary-stat"><span>Cycle Velocity:</span> <strong>+62% Velocity Acceleration</strong></div>
        <div class="arch-summary-stat"><span>System Topology:</span> <strong>Multi-System Context Switching &rarr; Unified Mesh</strong></div>
        <div class="arch-summary-stat"><span>Compliance Rate:</span> <strong>0 SOX Audit Violations / 94.2% Confidence</strong></div>
      </div>
    </div>
  `,
  screenshotCallouts: [
    {
      title: 'Multi-Agent Orchestration Mesh',
      detail: 'Visual execution canvas displays live inter-agent coordination across SAP, Salesforce, and Jira with transparent state transitions.'
    },
    {
      title: '3-Tier Human-in-the-Loop Gate',
      detail: 'Autonomous execution is gated by confidence ratings (94.2%); out-of-bounds mutations trigger mandatory side-by-side diff approvals.'
    },
    {
      title: 'Explainable Decision Log',
      detail: 'Complete step-by-step reasoning and cryptographic provenance ensure 100% regulatory compliance for SOX and GDPR audits.'
    }
  ],

  title: 'IBM Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX',
  shortName: 'IBM Watson Agentic AI',
  company: 'IBM Software Labs',
  roleDates: 'Senior Manager UI/UX Design &bull; Sep 2024 – Jan 2026',
  award: '🏆 Enterprise Agentic AI Design Excellence Award',
  leadSummary: 'Designing autonomous multi-agent task execution while preserving Human-in-the-Loop governance for regulated Fortune 500 enterprises, transforming black-box generative AI into an explainable, auditable system with confidence thresholds and side-by-side diff checks.',
  videoFile: 'watson_walkthrough.mp4',
  metrics: [
    { label: 'Organization Scale', val: '14 Product Squads' },
    { label: 'Task Execution', val: '62% Velocity Gain' },
    { label: 'Compliance Rate', val: '0 SOX Audit Violations' },
    { label: 'Autonomous Gate', val: '94.2% Confidence Threshold' }
  ],
  chapters: [
    { sec: 0, text: '0:00 Black-Box AI Pain' },
    { sec: 35, text: '0:35 Human-in-the-Loop Diff' },
    { sec: 70, text: '1:10 62% Velocity &amp; Audit' }
  ],
  challengeProse: `
    <p>Fortune 500 enterprises wanted the speed of autonomous generative AI agents to execute complex operations spanning SAP ERP, Salesforce CRM, and Jira. However, enterprise compliance and risk officers flatly rejected autonomous AI models because they operated as <strong>black-box engines</strong> that hallucinated data, corrupted financial master ledgers, and generated zero legal audit trails.</p>
    <p>Without transparent human oversight, corporate risk teams prohibited enterprise deployment, stalling automated operations initiatives and leaving teams bogged down in manual copy-paste reconciliation.</p>
  `,
  challengeMandate: 'Architect an Agentic UX mesh where multi-agent autonomous execution is bounded by an explainable Human-in-the-Loop confidence gate, giving compliance officers cryptographic assurance and side-by-side verification before any mutation commits to production ledgers.',
  researchProse: `
    <p>I led in-depth research sessions with Enterprise Operations Directors and SOX Compliance Officers in New York. Their primary anxiety wasn’t speed—it was <strong>personal legal liability</strong>. If an AI agent committed an incorrect payment voucher or modified a customer credit limit without authorization, the director faced regulatory penalties.</p>
  `,
  personaHtml: `
    <div class="persona-card">
      <div class="persona-top">
        <div class="persona-avatar-box">👩‍💼</div>
        <div class="persona-info">
          <h4>Elena Rostova &bull; Global Operations Director</h4>
          <p>Fortune 500 Enterprise Finance &bull; New York, USA</p>
        </div>
      </div>
      <div class="persona-quote">
        “Generative AI tools are flashy, but if an autonomous model updates vendor invoices in SAP with hallucinated data, our corporate audit fails and I am personally liable. I need to see exactly what changed, why the model believes it’s right, and have a 1-click override.”
      </div>
      <div class="empathy-grid">
        <div class="empathy-box">
          <div class="empathy-box-title">Pain Point</div>
          <p>Black-box GenAI lack of explainability, zero audit trails, compliance risks.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Goal</div>
          <p>Automate tedious multi-system manual tasks without risking SOX compliance violations.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Tools</div>
          <p>SAP ERP, Salesforce, Jira, Watson Orchestrate, IBM Carbon.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">UX Requirement</div>
          <p>Transparent confidence metrics and 1-click side-by-side diff previews before database commit.</p>
        </div>
      </div>
    </div>
  `,
  workflowProse: `
    <p>We engineered the <strong>3-Tier Confidence Gate Matrix</strong>. Instead of blindly executing user intents, the orchestration mesh decomposes tasks into discrete agent actions, evaluates certainty scores, and routes actions into automated or human-review channels.</p>
  `,
  workflowHtml: `
    <div class="flow-comparison">
      <div class="flow-card bad">
        <div class="flow-card-header">
          <h4>❌ Black-Box GenAI (High Enterprise Risk)</h4>
          <span class="margin-pill margin-fail">Unacceptable</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-bad">01</span>
            <div>User types natural prompt; LLM executes directly on production databases without human gating.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">02</span>
            <div>Hallucinations silently corrupt SAP vendor master tables and financial entries.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">03</span>
            <div>Zero cryptographic audit trail generated; internal compliance fails SOX audit.</div>
          </div>
        </div>
      </div>

      <div class="flow-card good">
        <div class="flow-card-header">
          <h4>✅ Agentic Confidence Gate (Governed AI)</h4>
          <span class="margin-pill margin-pass">SOX Compliant</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-good">01</span>
            <div>Multi-agent mesh breaks prompt into discrete, traceable API sub-tasks.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">02</span>
            <div>Confidence gate evaluates every proposed mutation against enterprise risk thresholds.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">03</span>
            <div>Side-by-side diff view with 1-click approve/reject and immutable cryptographic audit log.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  uiProse: `
    <p>Below is the interactive multi-agent orchestration console. Notice how each sub-agent reports execution status, followed by the overall confidence gate score determining whether autonomous execution is permitted.</p>
  `,
  uiMockupHtml: `
    <div class="interactive-prototype-window">
      <div class="proto-win-header">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url">https://watson-orchestrate.ibm.com/workspace/agentic-mesh</div>
        <span class="proto-win-badge">● MULTI-AGENT STATE MACHINE ACTIVE</span>
      </div>
      <div class="proto-win-body">
        <div style="background: rgba(37, 99, 235, 0.1); border-left: 4px solid #3B82F6; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
          <div style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #60A5FA; text-transform: uppercase;">Natural Language Enterprise Intent</div>
          <div style="font-size: 14px; font-weight: 600; color: #FFFFFF; margin-top: 4px;">
            “Reconcile Q3 vendor invoices across SAP, verify credit limits in Salesforce CRM, and prepare executive payment voucher.”
          </div>
        </div>

        <!-- Agent Node Graph -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px;">
          <div class="agent-node-card">
            <div class="agent-node-header">
              <span class="agent-pulse-dot dot-active"></span>
              <span class="agent-name">1. SAP ERP Agent</span>
            </div>
            <div class="agent-status-badge badge-success">100% PO Match</div>
            <p class="agent-detail-text">14 PO line items matched against receipts; 0 unit variance detected.</p>
          </div>

          <div class="agent-node-card">
            <div class="agent-node-header">
              <span class="agent-pulse-dot dot-active"></span>
              <span class="agent-name">2. Salesforce CRM Agent</span>
            </div>
            <div class="agent-status-badge badge-success">Approved</div>
            <p class="agent-detail-text">Credit threshold of $250,000 verified; customer account in good standing.</p>
          </div>

          <div class="agent-node-card">
            <div class="agent-node-header">
              <span class="agent-pulse-dot dot-pending"></span>
              <span class="agent-name">3. Ledger Write-Back</span>
            </div>
            <div class="agent-status-badge badge-pending">Gated for Review</div>
            <p class="agent-detail-text">Awaiting human signature before immutable commit to General Ledger.</p>
          </div>
        </div>

        <!-- Confidence Score Gating Control -->
        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
            <div>
              <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8; text-transform: uppercase;">Confidence Gating Threshold:</span>
              <strong id="watson-conf-label" style="font-family: var(--font-heading); font-size: 15px; color: #60A5FA; margin-left: 8px;">94.2% AI Confidence [Tier 2: Supervised Draft]</strong>
            </div>
            <div class="conf-tier-btns">
              <button onclick="setWatsonConfidence('high')" id="wconf-high" class="btn-tier">High (96.4%)</button>
              <button onclick="setWatsonConfidence('med')" id="wconf-med" class="btn-tier active">Supervised (94.2%)</button>
              <button onclick="setWatsonConfidence('low')" id="wconf-low" class="btn-tier">Low (74.0%)</button>
            </div>
          </div>
          <p id="watson-conf-desc" style="font-size: 12px; color: #CBD5E1; margin: 0; line-height: 1.45;">
            Tier 2 Routing: Side-by-side database diff verification required before irreversible write-back to SAP S/4HANA.
          </p>
        </div>

        <!-- Side-by-Side Diff Drawer -->
        <div id="watson-diff-drawer" style="background: #090D14; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #38BDF8;">PROPOSED DATABASE MUTATION DIFF: SAP S/4HANA vs LLM DRAFT</span>
            <span style="font-family: var(--font-code); font-size: 10px; color: #94A3B8;">SOX Audit Token: #TX-98402-SHA256</span>
          </div>
          <div style="overflow-x: auto;">
            <table class="proto-grid-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Current Database State</th>
                  <th>Proposed Multi-Agent Mutation</th>
                  <th>Audit Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cell-code">INVOICE_STATUS</td>
                  <td style="color: #F87171;">PENDING_APPROVAL</td>
                  <td style="color: #34D399; font-weight: 700;">+ APPROVED_FOR_PAYMENT</td>
                  <td><span class="margin-pill margin-pass">VERIFIED</span></td>
                </tr>
                <tr>
                  <td class="cell-code">VOUCHER_AMOUNT</td>
                  <td>$0.00</td>
                  <td style="color: #34D399; font-weight: 700;">+ $142,500.00 [PO-9402]</td>
                  <td><span class="margin-pill margin-pass">VERIFIED</span></td>
                </tr>
                <tr>
                  <td class="cell-code">GL_ACCOUNT</td>
                  <td>2100-AP (Unposted)</td>
                  <td style="color: #34D399; font-weight: 700;">+ 2100-AP [Balanced &bull; Variance 0.00]</td>
                  <td><span class="margin-pill margin-pass">VERIFIED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Decision Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <span style="font-size: 12px; color: #94A3B8;">🔒 Cryptographic audit trail generated automatically upon human authorization.</span>
          <div style="display: flex; gap: 10px;">
            <button onclick="rejectWatsonLedger()" class="proto-reject-btn">❌ Reject / Force Human Override</button>
            <button onclick="commitWatsonLedger()" class="proto-action-btn">✅ Authorize &amp; Commit to SAP Ledger</button>
          </div>
        </div>

        <div id="watson-toast" class="proto-toast" style="display: none;">
          🚀 Transaction #TX-88219 committed to SAP S/4HANA &amp; SOX Cryptographic Audit Trail Logged!
        </div>
      </div>
    </div>
  `,
  tokensProse: `
    <p>Using IBM Carbon design tokens, we established standardized confidence color stops, accessible contrast ratios, and clear agent state indicators across dark and light enterprise consoles.</p>
  `,
  tokensHtml: `
    <div class="token-grid">
      <div class="token-card">
        <div class="token-swatch" style="background: #0F62FE;"></div>
        <div class="token-meta">
          <h5>$carbon-blue-60</h5>
          <span>#0F62FE &bull; Primary Intent</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #10B981;"></div>
        <div class="token-meta">
          <h5>$confidence-high</h5>
          <span>#10B981 &bull; Autonomous (&ge;90%)</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #F59E0B;"></div>
        <div class="token-meta">
          <h5>$confidence-med</h5>
          <span>#F59E0B &bull; Diff Check (70–89%)</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #EF4444;"></div>
        <div class="token-meta">
          <h5>$confidence-low</h5>
          <span>#EF4444 &bull; Manual Fallback</span>
        </div>
      </div>
    </div>
  `,
  validationProse: `
    <p>Across 14 enterprise product squads rolling out agentic workflows, task execution velocity accelerated by <strong>62%</strong>, while corporate audits logged zero non-compliance violations over 12 months of production deployment.</p>
  `,
  validationMetrics: [
    { val: '62% Faster', label: 'Cross-System Task Velocity' },
    { val: '0', label: 'Compliance Audit Failures' },
    { val: '14 Squads', label: 'Unified Agentic Pattern' }
  ],
  carProse: `
    <p>Leadership defense addressing ethical AI, user trust, and multi-system regulatory governance in Fortune 500 environments.</p>
  `,
  carQuestions: [
    {
      question: 'How did you design for user trust when introducing autonomous AI agents into high-stakes enterprise systems?',
      context: 'Enterprise compliance officers rejected autonomous AI execution in SAP and Salesforce due to fear of hallucinated data corrupting corporate books and failing regulatory audits.',
      action: 'I designed the 3-Tier Confidence Gate Matrix. Every agentic output is assigned an explainable score. Scores ≥90% execute autonomously; 70–89% present a side-by-side diff drawer where humans approve changes with one click; scores <70% fall back to manual entry with clear attribution.',
      result: 'Reduced enterprise task completion time by 62% while maintaining 100% compliance across 14 distributed development squads and zero SOX violations.'
    }
  ],
  nextLink: { url: '/case-zebra', label: 'Zebra Enterprise IoT' }
};

execSync('node compile_ibm_watson_story.js', { cwd: __dirname, stdio: 'inherit' });
console.log('case-ibm-watson.html compiled cleanly with authentic Senior Manager storytelling narrative.');

// ----------------------------------------------------------------------------
// CASE 3: ZEBRA ENTERPRISE DEVICE CLOUD (FULL-SIZE SCROLLABLE)
// ----------------------------------------------------------------------------
console.log('3c. Compiling case-zebra.html (Full Scrollable)...');

const zebraData = {
  behanceArtifacts: [
    {
        "img": "screenshots/behance/zebra_iot_dashboard.png",
        "tag": "FLEET TELEMATICS CONSOLE",
        "title": "Multi-Site Device & Battery Health Insights Console",
        "desc": "Executive and operations portal monitoring 2,000 devices and 2,100 batteries with automated OS update queues, physical hardware test failures, and thermal warnings."
    },
    {
        "img": "screenshots/behance/zebra_card_sorting.png",
        "tag": "IA CARD SORTING",
        "title": "Stakeholder Information Architecture Card Sorting Matrix",
        "desc": "Synthesizing customer workshops and cross-functional feedback into clean functional buckets: Battery telemetry, Application health, Performance history, and Environmental limits."
    },
    {
        "img": "screenshots/behance/zebra_user_flow.png",
        "tag": "NAVIGATION ARCHITECTURE",
        "title": "Device Health Monitoring User Flow & Branching Logic",
        "desc": "Complete end-to-end user navigation model covering SSO sign-in, site-level device health routing, automated ticket triage, and predictive battery swap workflows."
    }
],
  caseId: 'zebra',

  screenshotImg: 'screenshots/transformation-zebra.png',
  screenshotUrl: 'https://cloud.zebra.com/telematics/distribution-hub-chicago',
  managerSteps: [
    {
      phase: 'Sub-Zero Thermal Shadowing',
      title: 'Contextual Research in -25°C Cold-Chain Freezers',
      desc: 'Shadowed warehouse pickers in Chicago and Memphis cold-storage facilities; documented screen fogging, hand numbness, and sudden battery drops.',
      deliverable: 'Sub-Zero Environmental Friction Map',
      metric: 'Identified 35% battery death rate'
    },
    {
      phase: '72px Heavy-Glove Ergonomics',
      title: 'Tactile Heavy-Glove Touch Architecture',
      desc: 'Scaled interactive touch targets from standard 44px to 72px with high-contrast tactile borders for workers wearing thick thermal gloves.',
      deliverable: 'Industrial Glove Ergonomics Spec',
      metric: 'Glove tap accuracy: 68% -> 99.8%'
    },
    {
      phase: 'Spatial Warehouse Floor IA',
      title: '2.5D Warehouse Topology & Device Telematics IA',
      desc: 'Structured interactive spatial console mapping 1,280 scanners across staging docks, conveyors, and sub-zero zones with real-time telemetry.',
      deliverable: 'Spatial Warehouse Topology Blueprint',
      metric: 'Device recovery: 48h -> 12m'
    },
    {
      phase: 'Zero-Touch 2D QR Protocol',
      title: '1-Second Optical Camera Staging Architecture',
      desc: 'Replaced 45-minute manual USB tethering per scanner with an instant 1-second optical camera scan of an encrypted 2D provisioning QR code.',
      deliverable: 'Zero-Touch Staging Protocol',
      metric: 'Staging time: 45m -> 1s (-99%)'
    },
    {
      phase: 'Predictive Battery Telematics',
      title: 'Machine Learning Battery Telematics & Global Rollout',
      desc: 'Engineered predictive battery degradation telemetry alerting supervisors 4 hours before cell failure; deployed across 45 international fulfillment hubs.',
      deliverable: 'Predictive Telematics Engine (SUS 88)',
      metric: 'Shift downtime reduced by 85%'
    }
  ],
  architectureInfographicHtml: `
    <div class="architecture-infographic-stage">
      <div class="arch-info-header">
        <span class="arch-tag">SYSTEM ARCHITECTURE &amp; DATA FLOW INFOGRAPHIC</span>
        <h4>Industrial IoT Topology: Manual USB Tethering vs Cloud Zero-Touch Provisioning</h4>
      </div>
      <div class="arch-diagram-grid">
        <div class="arch-column legacy">
          <div class="arch-col-title legacy">
            <span>❌ Legacy Architecture (Cable Tethers &amp; Stalls)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">High Friction</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">📦</span><div><strong>Unbox 1,000 Scanners:</strong> Physical delivery of handheld computers at fulfillment centers</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🔌</span><div><strong>Individual USB Tethering:</strong> IT technician plugged each device into PC to push Wi-Fi and inventory APKs</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">⏱️</span><div><strong>4.5-Day Staging Freeze:</strong> New distribution centers unable to launch while technicians manually flashed devices</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">⚠️</span><div><strong>Mid-Shift Battery Failures:</strong> Undetected battery degradation caused conveyor lines to halt during peak shifts</div></div>
          </div>
        </div>
        <div class="arch-column modern">
          <div class="arch-col-title modern">
            <span>✅ Modernized System Architecture (Governed &amp; Automated)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">Zero-Defect</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">📱</span><div><strong>Zero-Touch 1-Scan Profile:</strong> Dynamic encrypted 2D master barcode provisions Wi-Fi, VPN, and APKs in 8 seconds</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">📶</span><div><strong>Cloud Telematics Sync:</strong> Devices connect over-the-air to central IoT cloud dashboard instantly</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">📍</span><div><strong>Spatial Facility Heatmap:</strong> Live floor-plan monitors 1,200+ scanners across 5 warehouse zones with signal telemetry</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🔋</span><div><strong>Predictive Battery Matrix:</strong> ML model flags units with &lt;20% health for battery swap before shift starts</div></div>
          </div>
        </div>
      </div>
      <div class="arch-summary-bar">
        <div class="arch-summary-stat"><span>Staging Velocity:</span> <strong>4.5 Days &rarr; 8 Seconds (-99%)</strong></div>
        <div class="arch-summary-stat"><span>Provisioning Flow:</span> <strong>Manual USB Flashing &rarr; Zero-Touch 1-Scan</strong></div>
        <div class="arch-summary-stat"><span>Scale Deployed:</span> <strong>1.2M+ Active Rugged Devices</strong></div>
      </div>
    </div>
  `,
  screenshotCallouts: [
    {
      title: 'Spatial Distribution Floor-Plan',
      detail: 'Live telematics heat map tracks 1,200+ active scanners across 5 warehouse zones with signal strength, battery state, and packet latency.'
    },
    {
      title: 'Predictive Battery Degradation Alert',
      detail: 'Machine-learning health model flags aging lithium-ion cells before shift starts, preventing mid-shift line stoppages.'
    },
    {
      title: 'Zero-Touch 1-Scan Provisioning Engine',
      detail: 'Encrypted 2D master barcode provisions Wi-Fi, VPN certificates, and inventory apps in 8 seconds with audible beep verification.'
    }
  ],

  title: 'Zebra Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics',
  shortName: 'Zebra Enterprise IoT',
  company: 'Zebra Technologies',
  roleDates: 'UI/UX Product Design Manager &bull; Jul 2021 – Aug 2024',
  award: '🏆 Zebra Engineering Innovation Award &bull; Patent Filed',
  leadSummary: 'Scaling mission-critical IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers. Conducted in-situ contextual research in sub-zero freezers to redesign rugged scanner interaction paradigms.',
  videoFile: 'zebra_walkthrough.mp4',
  metrics: [
    { label: 'Active Fleet', val: '1.2M+ Rugged Devices' },
    { label: 'Staging Acceleration', val: '8s vs 4.5 Days (-99%)' },
    { label: 'Warehouse Downtime', val: '-45% Conveyor Halts' },
    { label: 'Field Research', val: 'Sub-Zero Freezers (-25°C)' }
  ],
  chapters: [
    { sec: 0, text: '0:00 Sub-Zero Contextual Inquiry' },
    { sec: 35, text: '0:35 Zero-Touch Barcode Staging' },
    { sec: 70, text: '1:10 1.2M Devices &amp; Uptime' }
  ],
  challengeProse: `
    <p>Zebra Technologies powers the physical logistics of e-commerce giants. When a fulfillment center receives a shipment of 1,000 new rugged handheld scanners, IT technicians historically spent <strong>4.5 business days individually tethering each device over USB</strong> to flash Wi-Fi certificates, OS updates, and inventory APKs.</p>
    <p>Furthermore, once deployed onto the warehouse floor, unpredicted battery degradation mid-shift caused conveyor belt packaging lines to halt, stalling packing throughput and creating critical shift bottlenecks during peak fulfillment surges.</p>
  `,
  challengeMandate: 'Architect a cloud telematics console paired with an instant zero-touch hardware provisioning protocol, enabling 1,000 scanners to be staged in seconds without cables or manual touch interaction.',
  researchProse: `
    <p>I spent three days on-site inside a -20°C cold-storage logistics distribution facility in Chicago. Shadowing pickers and IT leads, I observed that workers wore thick thermal gloves, rendering standard capacitive touchscreen gestures completely unusable. Condensation often blinded low-contrast displays, and workers relied entirely on physical trigger click feedback and audible beeps.</p>
  `,
  personaHtml: `
    <div class="persona-card">
      <div class="persona-top">
        <div class="persona-avatar-box">👷‍♂️</div>
        <div class="persona-info">
          <h4>Dave Kowalski &bull; Logistics Warehouse IT Lead</h4>
          <p>E-Commerce Distribution Center &bull; Chicago, USA</p>
        </div>
      </div>
      <div class="persona-quote">
        “Staging 1,000 new barcode scanners by tethering each unit over USB used to tie up my entire team for a week. And when a battery dies mid-shift on a packaging conveyor, it halts the whole sorting line and ruins our shift quota.”
      </div>
      <div class="empathy-grid">
        <div class="empathy-box">
          <div class="empathy-box-title">Physical Environment</div>
          <p>Sub-zero freezers (-20°C), thick thermal gloves, noisy industrial conveyors.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Ergonomic Constraint</div>
          <p>Touchscreens unusable with heavy gloves; physical button feedback essential.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Core Goal</div>
          <p>Zero-touch scanner deployment and predictive battery degradation warnings before shift start.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Outcome</div>
          <p>Single master barcode scan provisions scanner instantly; battery swaps scheduled proactively.</p>
        </div>
      </div>
    </div>
  `,
  workflowProse: `
    <p>We eliminated the USB cable entirely. By encoding enterprise Wi-Fi profiles, MDM certificates, and cloud telemetry URLs into an encrypted high-density 2D setup barcode, staging dropped from days to seconds.</p>
  `,
  workflowHtml: `
    <div class="flow-comparison">
      <div class="flow-card bad">
        <div class="flow-card-header">
          <h4>❌ Manual USB Flashing (4.5 Days)</h4>
          <span class="margin-pill margin-fail">Bottleneck</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-bad">01</span>
            <div>Unbox 1,000 scanners; tether individually via USB cables to IT technician laptop.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">02</span>
            <div>Type SSID credentials, install enterprise APKs, and manually calibrate laser scanner.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">03</span>
            <div>4.5 business days lost before devices reach warehouse floor.</div>
          </div>
        </div>
      </div>

      <div class="flow-card good">
        <div class="flow-card-header">
          <h4>✅ 1-Scan Zero-Touch Provisioning (8 Secs)</h4>
          <span class="margin-pill margin-pass">Instant Velocity</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-good">01</span>
            <div>IT generates encrypted high-density 2D setup barcode from Zebra Device Cloud console.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">02</span>
            <div>Warehouse worker unboxes scanner, points laser at barcode; audio beep confirms sync.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">03</span>
            <div>Wi-Fi, MDM profile, and cloud telemetry configured in 8 seconds; worker begins picking.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  uiProse: `
    <p>Below is the spatial fleet telemetry console. Notice the proactive battery degradation warning in Zone C (Sub-Zero Freezer), prompting warehouse supervisors to swap batteries before the morning shift starts.</p>
  `,
  uiMockupHtml: `
    <div class="interactive-prototype-window">
      <div class="proto-win-header">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url">https://devicecloud.zebra.com/hub/chicago-dc-04/spatial-map</div>
        <span class="proto-win-badge">● 1,280 SCANNERS ONLINE</span>
      </div>
      <div class="proto-win-body">
        <!-- Zone Selector Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
          <div class="zone-filter-group">
            <button onclick="filterZebraZone('all')" id="zbtn-all" class="zone-btn active">All Zones (1,280 Units)</button>
            <button onclick="filterZebraZone('a')" id="zbtn-a" class="zone-btn">Zone A: Staging Dock (480)</button>
            <button onclick="filterZebraZone('b')" id="zbtn-b" class="zone-btn">Zone B: Conveyors (620)</button>
            <button onclick="filterZebraZone('c')" id="zbtn-c" class="zone-btn">Zone C: Sub-Zero Freezer (-25°C) (180 ⚠️)</button>
          </div>
          <div id="zebra-glove-mode-indicator" style="font-family: var(--font-code); font-size: 11px; padding: 6px 12px; border-radius: 6px; background: rgba(16, 185, 129, 0.1); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.2);">
            🧤 Standard Touch Targets: 44px
          </div>
        </div>

        <!-- Dynamic Alert Banner for Zone C -->
        <div id="zebra-cold-alert" style="display: none; background: rgba(220, 38, 38, 0.15); border: 1px solid rgba(220, 38, 38, 0.4); border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
              <strong style="color: #F87171; font-family: var(--font-heading); font-size: 14px;">❄️ SUB-ZERO FACILITY ALERT (-25°C): Accelerated Battery Discharge</strong>
              <p style="font-size: 12px; color: #FECACA; margin: 3px 0 0;">ML Telematics predicts 14 batteries will drop below operating threshold in 1.8 hours. Heavy-Glove 72px mode engaged.</p>
            </div>
            <span style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #F87171; background: rgba(220, 38, 38, 0.2); padding: 4px 10px; border-radius: 4px;">SWAP RECOMMENDED</span>
          </div>
        </div>

        <!-- Scanner Fleet Cards Grid -->
        <div id="zebra-fleet-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px;">
          <div class="zebra-scanner-card">
            <div class="scanner-card-top">
              <span class="scanner-model">TC58 Handheld #4092</span>
              <span class="scanner-badge-ok">Optimal</span>
            </div>
            <div class="scanner-loc">Zone A &bull; Staging Dock 12</div>
            <div class="scanner-metrics-row">
              <span>Battery: <strong>96%</strong></span>
              <span>Temp: <strong>18°C</strong></span>
              <span>WiFi: <strong>-52 dBm</strong></span>
            </div>
          </div>

          <div class="zebra-scanner-card">
            <div class="scanner-card-top">
              <span class="scanner-model">TC58 Handheld #4118</span>
              <span class="scanner-badge-ok">Optimal</span>
            </div>
            <div class="scanner-loc">Zone B &bull; High-Speed Conveyor 04</div>
            <div class="scanner-metrics-row">
              <span>Battery: <strong>88%</strong></span>
              <span>Temp: <strong>19°C</strong></span>
              <span>WiFi: <strong>-48 dBm</strong></span>
            </div>
          </div>

          <div class="zebra-scanner-card scanner-warn">
            <div class="scanner-card-top">
              <span class="scanner-model">MC9300 Gun #1084</span>
              <span class="scanner-badge-alert">Swap Alert</span>
            </div>
            <div class="scanner-loc">Zone C &bull; Sub-Zero Freezer Bay 02</div>
            <div class="scanner-metrics-row">
              <span>Battery: <strong style="color: #F87171;">24% ⚠️</strong></span>
              <span>Temp: <strong style="color: #60A5FA;">-25°C</strong></span>
              <span>Heated Glass: <strong>ON</strong></span>
            </div>
          </div>
        </div>

        <!-- 1-Scan QR Provisioning Interactive Simulator -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <strong style="display: block; font-family: var(--font-heading); font-size: 14px; color: #FFFFFF;">Zero-Touch 1-Second 2D Barcode Provisioning Simulator</strong>
            <p style="font-size: 12px; color: #94A3B8; margin: 3px 0 0;">Bypasses 45-minute manual USB tethering. Replaces entire staging desk with 1 optical scan.</p>
          </div>
          <button onclick="triggerZebraScan()" class="proto-action-btn">
            📲 Simulate 1-Second 2D Barcode Scan
          </button>
        </div>

        <div id="zebra-toast" class="proto-toast" style="display: none;">
          ⚡ Scanner TC58 #4092 Staged in 0.82 seconds! Zero-touch enterprise profile applied.
        </div>
      </div>
    </div>
  `,
  tokensProse: `
    <p>We developed high-contrast industrial tokens specifically calibrated for warehouse lighting extremes, featuring 64px minimum tap targets and haptic confirmation pulses.</p>
  `,
  tokensHtml: `
    <div class="token-grid">
      <div class="token-card">
        <div class="token-swatch" style="background: #000000;"></div>
        <div class="token-meta">
          <h5>$dark-oled-bg</h5>
          <span>#000000 &bull; Battery Saver Base</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #FFD200;"></div>
        <div class="token-meta">
          <h5>$zebra-yellow</h5>
          <span>#FFD200 &bull; High-Viz Warning</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #00E676;"></div>
        <div class="token-meta">
          <h5>$laser-pass</h5>
          <span>#00E676 &bull; Scan Confirmed</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #FF1744;"></div>
        <div class="token-meta">
          <h5>$battery-crit</h5>
          <span>#FF1744 &bull; Swap Required</span>
        </div>
      </div>
    </div>
  `,
  validationProse: `
    <p>Deployed across 1.2M+ rugged mobile scanners globally, the zero-touch barcode provisioning protocol reduced device staging from 4.5 business days to 8 seconds per scanner, reducing Tier-1 support tickets by 33%.</p>
  `,
  validationMetrics: [
    { val: '1.2M+', label: 'Active Enterprise Units' },
    { val: '-45%', label: 'Conveyor Stoppage Downtime' },
    { val: '-33%', label: 'Tier-1 IT Tickets' }
  ],
  carProse: `
    <p>Defense examining field-tested hardware UX, physical ergonomic constraints, and enterprise IoT telemetry.</p>
  `,
  carQuestions: [
    {
      question: 'How did your field research in cold-storage warehouses change your design approach for industrial hardware UX?',
      context: 'Product management assumed standard capacitive touchscreen gestures would work on Android-based warehouse scanners. In reality, freezer workers wearing thermal gloves struggled with mis-taps and condensation.',
      action: 'I spent 3 days shadowing operators inside a -20°C distribution center in Chicago. I redesigned the scanner UI around ultra-high contrast dark mode, oversized touch targets (min 64px), and hardware trigger mapping with haptic confirmation. We also designed the 1-Scan barcode protocol so operators never had to type Wi-Fi passwords.',
      result: 'Staging time dropped from 4.5 days to 8 seconds per scanner. Fleet operational downtime dropped by 45%, and tier-1 support tickets decreased by 33% across 1.2M active devices.'
    }
  ],
  nextLink: { url: '/case-ibm-carbon', label: 'IBM Carbon Tokens' }
};

fs.writeFileSync(path.join(__dirname, 'case-zebra.html'), buildScrollableCasePage(zebraData), 'utf8');
console.log('case-zebra.html written cleanly.');

// ----------------------------------------------------------------------------
// CASE 4: IBM CARBON TOKEN ENGINE (FULL-SIZE SCROLLABLE)
// ----------------------------------------------------------------------------
console.log('3d. Compiling case-ibm-carbon.html (Full Scrollable)...');

const carbonData = {
  behanceArtifacts: [
    {
        "img": "screenshots/behance/carbon_admin_clean.png",
        "tag": "DESIGN SYSTEM PRODUCTION",
        "title": "Ready2Go Multi-Tenant Administration Web Platform",
        "desc": "Enterprise administration portal demonstrating strict adherence to Carbon design tokens: high-density tabular alert matrices, form components, and responsive tablet navigation."
    },
    {
        "img": "screenshots/transformation-ibm-carbon.png",
        "tag": "TOKEN GOVERNANCE PIPELINE",
        "title": "Style Dictionary Multi-Brand Token Engine",
        "desc": "Design token studio synchronizing 14 squads across White, Gray 10, Gray 90, and Gray 100 Dark modes with zero visual drift."
    }
],
  caseId: 'carbon',

  screenshotImg: 'screenshots/transformation-ibm-carbon.png',
  screenshotUrl: 'https://carbon.carbondesignsystem.com/designops/token-engine',
  managerSteps: [
    {
      phase: '14-Squad Visual Drift Audit',
      title: 'Cross-Squad CSS Drift & Visual Regression Audit',
      desc: 'Audited 14 disparate IBM software squads; identified 320+ hardcoded hex values, conflicting button radii, and 4-week hand-off friction.',
      deliverable: 'Token Drift Register (320 Leaks)',
      metric: 'Cataloged 4-week handoff lag'
    },
    {
      phase: '3-Tier Semantic Taxonomy',
      title: 'Enterprise Multi-Tier Token Architecture',
      desc: 'Engineered strict 3-tier hierarchy: Global Primitives (blue-60) -> Semantic Tokens (interactive-01) -> Component Tokens (button-primary-bg).',
      deliverable: '3-Tier Token Taxonomy Specification',
      metric: '180+ unified semantic tokens'
    },
    {
      phase: 'Figma-to-GitHub CI/CD Engine',
      title: 'Automated Style Dictionary Compiler Pipeline',
      desc: 'Built CI/CD pipeline using Figma REST API, Style Dictionary, and GitHub Actions to compile platform-agnostic token packages in seconds.',
      deliverable: 'Automated Style Dictionary Pipeline',
      metric: 'Token handoff: 4w -> 1d (-95%)'
    },
    {
      phase: 'Multi-Theme Runtime Engine',
      title: '0-Layout-Shift Runtime CSS Variable Injection',
      desc: 'Architected runtime theme engine allowing live switching across Carbon White, G10, G90, and G100 dark themes with zero layout shift.',
      deliverable: 'Runtime Theme Engine Architecture',
      metric: '100% design-to-code parity'
    },
    {
      phase: 'Federated RFC Systems Council',
      title: 'Federated Contribution SLA & Multi-Squad Flywheel',
      desc: 'Instituted weekly Design Review Council, component contribution RFC SLAs, and automated PR diff checks across all 14 squad repositories.',
      deliverable: 'Systems Contribution SLA (SUS 91)',
      metric: '14 squads synced with 0 regression'
    }
  ],
  architectureInfographicHtml: `
    <div class="architecture-infographic-stage">
      <div class="arch-info-header">
        <span class="arch-tag">SYSTEM ARCHITECTURE &amp; DATA FLOW INFOGRAPHIC</span>
        <h4>DesignOps Topology: Broken Slack Handoffs vs Automated Token CI/CD Pipeline</h4>
      </div>
      <div class="arch-diagram-grid">
        <div class="arch-column legacy">
          <div class="arch-col-title legacy">
            <span>❌ Legacy Architecture (Manual Drift &amp; Debt)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">High Friction</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">🎨</span><div><strong>Figma Hex Adjustments:</strong> Designers tweaked colors and typography in isolated Figma design files</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">💬</span><div><strong>Manual Slack Handoff:</strong> Designers posted hex codes and spec screenshots in developer Slack channels</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">💻</span><div><strong>Hardcoded CSS Overrides:</strong> Developers copied ad-hoc styles, creating 14 divergent squad variations</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🐛</span><div><strong>70% Visual Bug Rate:</strong> QA engineers flooded sprints with visual regression tickets and WCAG breaches</div></div>
          </div>
        </div>
        <div class="arch-column modern">
          <div class="arch-col-title modern">
            <span>✅ Modernized System Architecture (Governed &amp; Automated)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">Zero-Defect</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">🎯</span><div><strong>Figma Token Studio Source:</strong> Single source of truth for semantic color, spacing, and typography variables</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">⚙️</span><div><strong>GitHub Actions Webhook:</strong> Publishing tokens triggers automated CI pipeline without manual intervention</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">📦</span><div><strong>Style Dictionary Compiler:</strong> Compiles tokens into CSS variables, JSON themes, and TypeScript contracts</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🚀</span><div><strong>Automated PRs to 14 Squads:</strong> Zero-drift pull requests opened directly into React &amp; Web Component repositories</div></div>
          </div>
        </div>
      </div>
      <div class="arch-summary-bar">
        <div class="arch-summary-stat"><span>Sprint Velocity:</span> <strong>+28% Front-End Lift</strong></div>
        <div class="arch-summary-stat"><span>Handoff Pipeline:</span> <strong>Manual Slack Handoff &rarr; Automated GitHub CI/CD</strong></div>
        <div class="arch-summary-stat"><span>Quality Parity:</span> <strong>-70% Visual QA Bugs &amp; 100% WCAG 2.1 AA</strong></div>
      </div>
    </div>
  `,
  screenshotCallouts: [
    {
      title: 'Multi-Tier Semantic Token Architecture',
      detail: 'Systematically organizes global primitives into semantic role tokens and component-specific variables for seamless dark/light theme switching.'
    },
    {
      title: 'Automated CI/CD Style Dictionary Sync',
      detail: 'Token updates in Figma trigger automated GitHub Action pipelines that compile CSS variables, JSON, and React theme packages.'
    },
    {
      title: 'Contribution Council Governance Flywheel',
      detail: 'Democratic RFC review mechanism empowers 14 distributed squads to propose and adopt component evolutions without breaking core standards.'
    }
  ],

  title: 'IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance',
  shortName: 'IBM Carbon Tokens',
  company: 'IBM Software Labs',
  roleDates: 'DesignOps &amp; Governance Lead &bull; 2024–2026',
  award: '🏆 DesignOps Enterprise Leadership Citation',
  leadSummary: 'Eliminating systemic design debt and engineering rework by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads via the Contribution Council flywheel.',
  videoFile: 'carbon_walkthrough.mp4',
  metrics: [
    { label: 'Governed Squads', val: '14 Distributed Squads' },
    { label: 'Token Coverage', val: '180+ Synced Design Tokens' },
    { label: 'Sprint Velocity', val: '+28% Front-End Lift' },
    { label: 'QA Bug Reduction', val: '-70% Visual Drift Bugs' }
  ],
  chapters: [
    { sec: 0, text: '0:00 Multi-Squad Token Drift' },
    { sec: 30, text: '0:30 Contribution Council' },
    { sec: 65, text: '1:05 +28% Front-End Speed' }
  ],
  challengeProse: `
    <p>With 14 distributed software squads building products across cloud, data, and security, visual drift was spiraling out of control. Developers hardcoded hex values, copied CSS overrides from Stack Overflow, and repeatedly re-implemented button variations. Sprint handoffs were fraught with friction, resulting in <strong>over 70% of front-end QA tickets being visual regression bugs</strong> and breaking corporate WCAG accessibility compliance.</p>
  `,
  challengeMandate: 'Establish a seamless DesignOps token synchronizer connecting Figma Variables directly to React and Web Components repositories via automated CI/CD pipelines, governed by a democratic Contribution Council.',
  researchProse: `
    <p>Conducting interviews with senior engineering squad leads and designers across Bangalore, Austin, and San Jose, we found that engineers were eager to adopt design systems, but had no automated bridge. Manually updating hex codes whenever brand guidelines shifted was error-prone and wasted 25% of front-end sprint capacity.</p>
  `,
  personaHtml: `
    <div class="persona-card">
      <div class="persona-top">
        <div class="persona-avatar-box">👩‍💻</div>
        <div class="persona-info">
          <h4>Priya Sharma &bull; Senior Front-End Squad Lead</h4>
          <p>IBM Software Labs &bull; Bangalore, India</p>
        </div>
      </div>
      <div class="persona-quote">
        “Every time brand updates colors or design delivers a new dark mode layout, my front-end engineers waste 25% of the sprint resolving broken CSS overrides and handoff discrepancies. We need token changes to flow directly into our GitHub repositories via automated pull requests.”
      </div>
      <div class="empathy-grid">
        <div class="empathy-box">
          <div class="empathy-box-title">Pain Point</div>
          <p>Hardcoded hex values, visual drift, sprint handoff bugs, duplicate CSS classes.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Goal</div>
          <p>Automated token PRs directly into React codebases whenever design tokens change in Figma.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Tools</div>
          <p>Figma Variables, Style-Dictionary, GitHub Actions, Carbon React.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Impact</div>
          <p>Zero manual CSS editing for design token updates; instantaneous dark mode parity.</p>
        </div>
      </div>
    </div>
  `,
  workflowProse: `
    <p>We architected the <strong>Contribution Council Flywheel</strong>: squads propose new component variants via lightweight RFC templates; a weekly 30-minute cross-functional council reviews proposals; and approved tokens automatically generate pull requests into all 14 squad repositories.</p>
  `,
  workflowHtml: `
    <div class="flow-comparison">
      <div class="flow-card bad">
        <div class="flow-card-header">
          <h4>❌ Disconnected UI Handoff (High Tech Debt)</h4>
          <span class="margin-pill margin-fail">70% Bug Rate</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-bad">01</span>
            <div>Designers tweak hex codes in siloed Figma files without version control.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">02</span>
            <div>Developers manually inspect CSS in Figma and hardcode colors into stylesheet files.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">03</span>
            <div>Visual drift cascades across 14 squads; dark mode breaks; accessibility fails.</div>
          </div>
        </div>
      </div>

      <div class="flow-card good">
        <div class="flow-card-header">
          <h4>✅ Automated Token CI/CD Pipeline (Governed)</h4>
          <span class="margin-pill margin-pass">+28% Sprint Speed</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-good">01</span>
            <div>Designers publish approved semantic token changes to Figma Variables.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">02</span>
            <div>GitHub Action triggers Style-Dictionary transformation into SCSS, JSON, and React props.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">03</span>
            <div>Automated PRs merge into 14 squad repositories with automated visual regression tests.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  uiProse: `
    <p>Below is the multi-brand token synchronizer console tracking live variable propagation from Figma to GitHub production branches across all 14 squads.</p>
  `,
  uiMockupHtml: `
    <div class="interactive-prototype-window">
      <div class="proto-win-header">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url">https://designops.ibm.com/carbon-tokens/governance</div>
        <span class="proto-win-badge">● 14 SQUADS SYNCED</span>
      </div>
      <div class="proto-win-body">
        <!-- Theme Switcher Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div>
            <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8; text-transform: uppercase;">Active Carbon Theme Mode:</span>
            <div class="carbon-theme-btns" style="margin-top: 6px;">
              <button onclick="setCarbonTheme('white')" id="cbtn-white" class="c-theme-btn active">Carbon White (Light)</button>
              <button onclick="setCarbonTheme('g10')" id="cbtn-g10" class="c-theme-btn">Carbon G10 (Subtle)</button>
              <button onclick="setCarbonTheme('g90')" id="cbtn-g90" class="c-theme-btn">Carbon G90 (Slate)</button>
              <button onclick="setCarbonTheme('g100')" id="cbtn-g100" class="c-theme-btn">Carbon G100 (Dark)</button>
            </div>
          </div>
          <span style="font-family: var(--font-code); font-size: 11px; color: #38BDF8;">0-Layout-Shift Runtime CSS Variable Injection</span>
        </div>

        <!-- Live Component Stage (reacts to selected theme) -->
        <div id="carbon-live-stage" style="background: #FFFFFF; color: #161616; border: 1px solid #E0E0E0; border-radius: 12px; padding: 24px; margin-bottom: 20px; transition: all 0.25s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h5 id="carbon-stage-title" style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; margin: 0; color: inherit;">Multi-Brand Tokenized Component Preview</h5>
            <span id="carbon-stage-badge" style="font-family: var(--font-code); font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px; background: rgba(15, 98, 254, 0.1); color: #0F62FE;">v4.2.0 Tokenized</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: center;">
            <div>
              <label id="carbon-label" style="display: block; font-family: var(--font-code); font-size: 11px; font-weight: 700; margin-bottom: 6px; color: inherit;">Search Enterprise Catalog</label>
              <input id="carbon-input" type="text" value="Cloud Object Storage" style="width: 100%; box-sizing: border-box; padding: 10px 12px; font-size: 13px; border-radius: 4px; border: 1px solid #8D8D8D; background: #F4F4F4; color: inherit; font-family: var(--font-body);" aria-label="Search Enterprise Catalog component test input">
            </div>
            <div>
              <label style="display: block; font-family: var(--font-code); font-size: 11px; font-weight: 700; margin-bottom: 6px; color: inherit;">Primary Action</label>
              <button id="carbon-btn-primary" style="padding: 10px 18px; background: #0F62FE; color: #FFFFFF; border: none; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 4px; display: inline-flex; align-items: center; gap: 8px;">
                <span>Deploy Cluster &rarr;</span>
              </button>
            </div>
            <div>
              <label style="display: block; font-family: var(--font-code); font-size: 11px; font-weight: 700; margin-bottom: 6px; color: inherit;">Tokenized Status Tag</label>
              <span id="carbon-status-tag" style="display: inline-block; padding: 6px 12px; border-radius: 4px; background: #0F62FE; color: #FFFFFF; font-size: 12px; font-weight: 600;">$support-02 &bull; Active</span>
            </div>
          </div>
        </div>

        <!-- Token Variable Inspector -->
        <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;">
          <div style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #38BDF8; margin-bottom: 8px;">LIVE FIGMA VARIABLE TOKEN CONTRACT:</div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-family: var(--font-code); font-size: 11.5px;">
            <div style="color: #94A3B8;">$interactive-01: <strong id="t-int" style="color: #60A5FA;">#0F62FE</strong></div>
            <div style="color: #94A3B8;">$background: <strong id="t-bg" style="color: #FFFFFF;">#FFFFFF</strong></div>
            <div style="color: #94A3B8;">$field-01: <strong id="t-field" style="color: #CBD5E1;">#F4F4F4</strong></div>
            <div style="color: #94A3B8;">$text-01: <strong id="t-text" style="color: #FFFFFF;">#161616</strong></div>
          </div>
        </div>

        <!-- Action Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <span style="font-size: 12px; color: #94A3B8;">📦 Compiles directly via GitHub Actions to React, Web Components, and iOS/Android.</span>
          <button onclick="triggerCarbonPr()" class="proto-action-btn">
            🚀 Compile &amp; Push Style Dictionary PR to GitHub
          </button>
        </div>

        <div id="carbon-toast" class="proto-toast" style="display: none;">
          ✅ PR #318 Opened: 180 tokens compiled across 14 squad repositories with 0 visual regression!
        </div>
      </div>
    </div>
  `,
  tokensProse: `
    <p>We organized tokens into a strict 3-tier hierarchy: Global primitives (raw colors) &rarr; Semantic tokens (intent-based) &rarr; Component-scoped tokens.</p>
  `,
  tokensHtml: `
    <div class="token-grid">
      <div class="token-card">
        <div class="token-swatch" style="background: #0F62FE;"></div>
        <div class="token-meta">
          <h5>$carbon-blue-60</h5>
          <span>#0F62FE &bull; Primary Action</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #8A3FFC;"></div>
        <div class="token-meta">
          <h5>$carbon-purple-70</h5>
          <span>#8A3FFC &bull; Cloud Service Theme</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #24A148;"></div>
        <div class="token-meta">
          <h5>$carbon-green-50</h5>
          <span>#24A148 &bull; Success Validation</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #161616;"></div>
        <div class="token-meta">
          <h5>$carbon-gray-100</h5>
          <span>#161616 &bull; Dark Canvas Base</span>
        </div>
      </div>
    </div>
  `,
  validationProse: `
    <p>By automating token translation, front-end sprint velocity jumped by <strong>28%</strong>, while visual regression defects plunged by <strong>70%</strong> across all 14 squads.</p>
  `,
  validationMetrics: [
    { val: '+28%', label: 'Front-End Velocity Lift' },
    { val: '-70%', label: 'Design QA Defects' },
    { val: '180+', label: 'Governed Semantic Tokens' }
  ],
  carProse: `
    <p>Defense examining DesignOps leadership, federated governance models, and scaling design consistency across global engineering teams.</p>
  `,
  carQuestions: [
    {
      question: 'How did you scale design governance across 14 distributed squads without slowing down agile release trains?',
      context: '14 product squads were reinventing UI components, creating massive design debt, hardcoding colors, and failing corporate accessibility audits.',
      action: 'I established the Carbon Token Engine and founded the DesignOps Contribution Council. We implemented a 3-tier token hierarchy (Global → Semantic → Component) and automated the sync: when a token updates in Figma, a GitHub Action auto-generates PRs into squad repos via Style-Dictionary.',
      result: 'Front-end sprint velocity increased by 28%, visual regression defects fell by 70%, and light/dark theme parity was achieved automatically across all 14 squads.'
    }
  ],
  nextLink: { url: '/case-zf-wabco', label: 'ZF Wabco HUD' }
};

fs.writeFileSync(path.join(__dirname, 'case-ibm-carbon.html'), buildScrollableCasePage(carbonData), 'utf8');
console.log('case-ibm-carbon.html written cleanly.');

// ----------------------------------------------------------------------------
// CASE 5: ZF WABCO COMMERCIAL COCKPIT (FULL-SIZE SCROLLABLE)
// ----------------------------------------------------------------------------
console.log('3e. Compiling case-zf-wabco.html (Full Scrollable)...');

const wabcoData = {
  behanceArtifacts: [
    {
        "img": "screenshots/behance/zf_mobile_clean.png",
        "tag": "MOBILE ERGONOMICS",
        "title": "High-Contrast Mobile Telematics & Media Architecture",
        "desc": "Mobile telematic interface optimized for high ambient glare, quick thumb reachability, and high-contrast night readability with zero driver cognitive friction."
    },
    {
        "img": "screenshots/transformation-zf-wabco.png",
        "tag": "3-ZONE HUD COCKPIT",
        "title": "CAN-Bus 3-Zone Automotive Cockpit Cluster",
        "desc": "Digital cluster partitioned into immediate speed HUD, radar headway distance telemetry, and blind-spot obstacle alerts with strict <1.2s gaze budgeting."
    }
],
  caseId: 'wabco',

  screenshotImg: 'screenshots/transformation-zf-wabco.png',
  screenshotUrl: 'https://telematics.zf.com/cockpit/can-bus-hud',
  managerSteps: [
    {
      phase: 'Autobahn Night Shadowing',
      title: 'In-Cab Contextual Research on German Highways',
      desc: 'Shadowed commercial truck drivers on night freight routes across Germany; observed severe cognitive overload from aftermarket gadgets and unprioritized chimes.',
      deliverable: 'Driver Cognitive Load Map',
      metric: 'Identified 2.8s eyes-off-road risk'
    },
    {
      phase: 'Gaze Budgeting (<1.2s Legal Ceiling)',
      title: 'Infrared Gaze-Tracking & Glance Budgeting',
      desc: 'Conducted eye-tracking studies under simulated rain and fog; established strict 0.8-second glance ceiling to meet UNECE 158/159 EU safety standards.',
      deliverable: 'Glance Time Ergonomic Protocol',
      metric: 'Safety compliance: 100% UNECE'
    },
    {
      phase: '3-Zone Spatial Cluster Partitioning',
      title: '3-Zone Spatial Ergonomic Instrument Architecture',
      desc: 'Partitioned cluster display: Zone 1 (Immediate Forward Safety & Radar), Zone 2 (Turn Navigation), and Zone 3 (Peripheral Eco-Coaching).',
      deliverable: '3-Zone Ergonomic HUD Blueprint',
      metric: 'Glance duration: 2.8s -> 0.94s (-66%)'
    },
    {
      phase: 'Anti-Glare Lighting Engine',
      title: 'High-Contrast Glare-Shield Adaptive Palette',
      desc: 'Engineered dual daylight sunlight and anti-glare night lighting modes with suppressed blue light to prevent night blindness on unlit freight routes.',
      deliverable: 'Glare-Shield Luminescence Tokens',
      metric: 'Night eye fatigue reduced by 40%'
    },
    {
      phase: 'CAN-Bus Telematics Sync',
      title: 'CANopen Vehicle Bus Integration & Fleet Rollout',
      desc: 'Connected hardware CAN-bus engine sensors with cloud dispatch console for real-time fuel coaching; deployed across 80,000 European trucks.',
      deliverable: 'CAN-Bus Telematics Spec (SUS 86)',
      metric: 'Critical route errors cut by 18%'
    }
  ],
  architectureInfographicHtml: `
    <div class="architecture-infographic-stage">
      <div class="arch-info-header">
        <span class="arch-tag">SYSTEM ARCHITECTURE &amp; DATA FLOW INFOGRAPHIC</span>
        <h4>Automotive Telematics Topology: Fragmented Cab Displays vs Integrated 3-Zone Ergonomic HUD</h4>
      </div>
      <div class="arch-diagram-grid">
        <div class="arch-column legacy">
          <div class="arch-col-title legacy">
            <span>❌ Legacy Architecture (Fragmented &amp; Distracting)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">High Friction</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">📱</span><div><strong>Aftermarket GPS Units:</strong> Commercial drivers glanced at cluttered, suction-cup navigation displays</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🚨</span><div><strong>Isolated Radar Alarms:</strong> Separate collision warning beeper triggered jarring, context-free audio alerts</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">📻</span><div><strong>Dispatcher CB Radios:</strong> Constant verbal updates added high auditory clutter and distraction</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">⚠️</span><div><strong>2.8s Eyes-Off-Road Glance:</strong> Drivers diverted eyes from the road for nearly 3 seconds at 90 km/h</div></div>
          </div>
        </div>
        <div class="arch-column modern">
          <div class="arch-col-title modern">
            <span>✅ Modernized System Architecture (Governed &amp; Automated)</span>
            <span style="font-family: var(--font-code); font-size: 11px;">Zero-Defect</span>
          </div>
          <div class="arch-flow-nodes">
            <div class="arch-node"><span class="arch-node-icon">🏎️</span><div><strong>Integrated CAN-Bus Cluster:</strong> Direct CANopen vehicle bus reading speed, tire pressure, and engine telemetry</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🎯</span><div><strong>3-Zone Ergonomic Layout:</strong> Zone 1: Radar/Speed; Zone 2: Turn Cards; Zone 3: Peripheral Eco-Coaching</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🌙</span><div><strong>Adaptive Ambient Lighting:</strong> Auto-dimming high-contrast tokens eliminate night-time headlight glare</div></div>
            <div class="arch-arrow">&darr;</div>
            <div class="arch-node"><span class="arch-node-icon">🛡️</span><div><strong>0.94s Glance Compliance:</strong> Drivers absorb critical situational awareness well within strict EU legal limit</div></div>
          </div>
        </div>
      </div>
      <div class="arch-summary-bar">
        <div class="arch-summary-stat"><span>Driver Glance Time:</span> <strong>0.94s (&lt;1.2s EU Legal Max)</strong></div>
        <div class="arch-summary-stat"><span>Cab Integration:</span> <strong>Fragmented Gadgets &rarr; 3-Zone Ergonomic Cluster</strong></div>
        <div class="arch-summary-stat"><span>Fleet Scale:</span> <strong>80,000+ European Trucks / -18% Route Errors</strong></div>
      </div>
    </div>
  `,
  screenshotCallouts: [
    {
      title: '3-Zone Ergonomic HUD Cluster',
      detail: 'Zones partition critical information: immediate forward radar distance in Zone 1, turn navigation in Zone 2, and eco-coaching in Zone 3.'
    },
    {
      title: 'Strict <1.2s Glance Compliance',
      detail: 'High-contrast typography and glare-resistant color palette ensure drivers absorb critical telemetry in 0.94 seconds without diverting attention.'
    },
    {
      title: 'Direct CAN-Bus Telematics Integration',
      detail: 'Hardware-level integration with vehicle CANopen bus provides real-time tire pressure, fuel burn, and cloud fleet dispatch sync.'
    }
  ],

  title: 'ZF Wabco Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics',
  shortName: 'ZF Wabco Telematics',
  company: 'ZF Wabco',
  roleDates: 'UI/UX Senior Specialist &bull; Oct 2020 – Jul 2021',
  award: '🏆 Automotive Ergonomics Safety Citation &bull; EU Compliant',
  leadSummary: 'Designing a dual-interface ecosystem: a glanceable, distraction-free in-cab HUD cluster for commercial truck drivers compliant with strict EU automotive safety standards (<1.2s glance time), paired with an automated fleet command center for dispatchers.',
  videoFile: 'wabco_walkthrough.mp4',
  metrics: [
    { label: 'Deployment', val: '80,000+ European Trucks' },
    { label: 'Eyes-Off-Road Glance', val: '< 1.2s EU Standard' },
    { label: 'Route Deviations', val: '-18% Drop in Critical Errors' },
    { label: 'Safety Certification', val: '100% EU Compliant' }
  ],
  chapters: [
    { sec: 0, text: '0:00 In-Cab Cognitive Fatigue' },
    { sec: 35, text: '0:35 Distraction-Free HUD UX' },
    { sec: 65, text: '1:05 80k Trucks &amp; EU Safety' }
  ],
  challengeProse: `
    <p>Operating a 40-ton commercial articulated truck on high-speed European motorways at night presents severe cognitive overload. Aftermarket navigation tablets demanded repeated touch taps, bright backlight glare compromised night vision, and eyes-off-the-road times frequently exceeded 2.5 seconds—violating strict <strong>European Union Commercial Vehicle Safety Directives</strong>.</p>
  `,
  challengeMandate: 'Design an ergonomic in-cab digital instrument cluster cluster that presents mission-critical speed, braking radar, and turn guidance within strict <1.2-second glance cones, paired with real-time CAN-bus fleet radar for dispatchers.',
  researchProse: `
    <p>Conducting in-cab contextual inquiries with long-haul drivers in Germany, we identified intense environmental challenges: violent road vibration at 90 km/h, rapid shifts in ambient light (entering tunnels), and cognitive fatigue during 9-hour shifts. Drivers demanded high-contrast typography and zero tiny touch interaction targets.</p>
  `,
  personaHtml: `
    <div class="persona-card">
      <div class="persona-top">
        <div class="persona-avatar-box">🚛</div>
        <div class="persona-info">
          <h4>Klaus Meier &bull; Long-Haul Fleet Driver</h4>
          <p>Trans-European Logistics Fleet &bull; Hamburg, Germany</p>
        </div>
      </div>
      <div class="persona-quote">
        “Driving a 40-ton articulated lorry on the Autobahn at night in heavy snow requires total focus. If an aftermarket GPS screen has tiny buttons or bright glare, it's dangerously distracting. I need speed and turns right in my line of sight with zero button fiddling.”
      </div>
      <div class="empathy-grid">
        <div class="empathy-box">
          <div class="empathy-box-title">Environmental Challenge</div>
          <p>Extreme lighting shifts (direct sun to dark tunnels), high road vibration.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Glance Safety Rule</div>
          <p>Strict European regulation: No in-cab display may demand &gt;1.2 seconds glance time.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Core Driver Need</div>
          <p>High-contrast, dark-theme HUD with audible cues and zero tiny touch interactions.</p>
        </div>
        <div class="empathy-box">
          <div class="empathy-box-title">Outcome</div>
          <p>Reduced critical navigation errors by 18% and passed all EU commercial automotive safety certifications.</p>
        </div>
      </div>
    </div>
  `,
  workflowProse: `
    <p>We organized in-cab information into <strong>3 Ergonomic Glance Cones</strong>: Zone 1 (immediate line-of-sight critical telemetry), Zone 2 (navigation turn cards), and Zone 3 (peripheral eco-coaching).</p>
  `,
  workflowHtml: `
    <div class="flow-comparison">
      <div class="flow-card bad">
        <div class="flow-card-header">
          <h4>❌ Unregulated Touch Navigation (Dangerous)</h4>
          <span class="margin-pill margin-fail">&gt; 2.5s Eyes-Off-Road</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-bad">01</span>
            <div>Driver forced to look down at tablet mounted low on center console.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">02</span>
            <div>Tiny touch targets cause repeated mis-taps while vibrating at 90 km/h.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-bad">03</span>
            <div>Eyes off road exceed safety thresholds; severe risk of high-speed collision.</div>
          </div>
        </div>
      </div>

      <div class="flow-card good">
        <div class="flow-card-header">
          <h4>✅ 3-Zone Ergonomic Cluster (&lt; 1.2s Glance)</h4>
          <span class="margin-pill margin-pass">EU Certified</span>
        </div>
        <div class="flow-steps">
          <div class="flow-step-item">
            <span class="step-badge step-good">01</span>
            <div>Zone 1 directly in driver line of sight: instant speed and radar braking distance.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">02</span>
            <div>Zone 2 high-contrast navigation turns with low-glare dark OLED background.</div>
          </div>
          <div class="flow-step-item">
            <span class="step-badge step-good">03</span>
            <div>Non-critical eco-coaching relegated to gentle peripheral green light pulses.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  uiProse: `
    <p>Below is the simulation of the in-cab heads-up display operating in night driving mode with CAN-bus telematics streaming active speed and braking radar.</p>
  `,
  uiMockupHtml: `
    <div class="interactive-prototype-window">
      <div class="proto-win-header" style="background: #090D14;">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url" style="color: #94A3B8; background: #111624;">zf-wabco://cockpit-cluster/active-haul/route-849</div>
        <span class="proto-win-badge">● CAN-BUS CONNECTED &bull; UNECE 158/159 COMPLIANT</span>
      </div>
      <div id="wabco-hud-body" class="proto-win-body" style="background: #06090F; color: #FFFFFF; transition: all 0.3s ease;">
        <!-- Controls Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div class="lighting-mode-btns">
            <button onclick="setWabcoLighting('night')" id="wbtn-night" class="w-light-btn active">🌙 Night Freight Mode (Anti-Glare)</button>
            <button onclick="setWabcoLighting('day')" id="wbtn-day" class="w-light-btn">☀️ Daylight Sunlight Mode (High-Contrast)</button>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8;">Cruise Speed:</span>
            <input type="range" min="70" max="95" value="88" oninput="updateWabcoSpeed(this.value)" style="cursor: pointer;" aria-label="Simulated truck cruise speed control slider">
            <span id="wabco-slider-val" style="font-family: var(--font-code); font-size: 12px; font-weight: 700; color: #10B981;">88 km/h</span>
          </div>
        </div>

        <!-- 3-Zone Cockpit Cluster -->
        <div style="display: grid; grid-template-columns: 1fr 1.3fr 1fr; gap: 16px; margin-bottom: 20px;">
          <!-- Zone 1 -->
          <div id="wabco-zone-1" class="hud-zone-card">
            <div class="hud-zone-tag">ZONE 1 (&lt;0.8S GLANCE BUDGET)</div>
            <div id="wabco-speed-num" style="font-size: 42px; font-weight: 900; font-family: var(--font-code); color: #10B981; margin: 4px 0;">88 <span style="font-size: 16px;">KM/H</span></div>
            <div id="wabco-radar-info" style="font-size: 11px; color: #94A3B8;">Safe Radar Distance: <strong>85m</strong> &bull; Limit: 90</div>
            <div id="wabco-hazard-alert" style="display: none; margin-top: 8px; background: rgba(245, 158, 11, 0.2); border: 1px solid #F59E0B; border-radius: 6px; padding: 4px 8px; font-family: var(--font-code); font-size: 10px; color: #F59E0B; font-weight: 700;">
              ⚠️ BLIND SPOT: Vehicle at Right Flank (14m)
            </div>
          </div>

          <!-- Zone 2 -->
          <div class="hud-zone-card">
            <div class="hud-zone-tag" style="color: #F59E0B;">ZONE 2 (&lt;1.2S NAVIGATION)</div>
            <div style="font-size: 16px; font-weight: 800; color: #F59E0B; margin: 8px 0 4px;">A7 Hamburg &bull; Exit 24 in 2.4 km</div>
            <div style="font-size: 11px; color: #94A3B8;">Max Bridge Clearance: <strong>4.2m [CLEAR]</strong></div>
            <div style="font-size: 11px; color: #94A3B8; margin-top: 4px;">Lane 2 Recommended &bull; Heavy Freight</div>
          </div>

          <!-- Zone 3 -->
          <div class="hud-zone-card">
            <div class="hud-zone-tag" style="color: #38BDF8;">ZONE 3 (PERIPHERAL ECO-PULSE)</div>
            <div style="font-size: 18px; font-weight: 800; color: #38BDF8; margin: 8px 0 4px;">Optimal Torque</div>
            <div style="font-size: 11px; color: #94A3B8;">+14% Fleet Fuel Efficiency</div>
            <div style="font-size: 11px; color: #10B981; margin-top: 4px;">RPM: 1,250 &bull; Eco-Band Green</div>
          </div>
        </div>

        <!-- Simulator Controls -->
        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <strong style="font-family: var(--font-heading); font-size: 13px; color: #FFFFFF;">UNECE 158/159 Gaze-Time Compliance Simulator</strong>
            <p style="font-size: 11.5px; color: #94A3B8; margin: 2px 0 0;">Verifies driver cognitive perception speed under high-speed Autobahn freight conditions.</p>
          </div>
          <button onclick="triggerWabcoHazard()" class="proto-action-btn">
            🚨 Simulate Blind Spot Obstacle Warning
          </button>
        </div>

        <div id="wabco-toast" class="proto-toast" style="display: none;">
          ⚡ Blind Spot Hazard Triggered! Eye-glance perception clocked at 0.68s [PASS &lt; 0.8s UNECE 158/159 Limit].
        </div>
      </div>
    </div>
  `,
  tokensProse: `
    <p>Tokens were engineered for automotive night driving: strict OLED blacks to prevent cabin light bounce, high-contrast amber for turn alerts, and phosphor green for safe distance radar.</p>
  `,
  tokensHtml: `
    <div class="token-grid">
      <div class="token-card">
        <div class="token-swatch" style="background: #090D14;"></div>
        <div class="token-meta">
          <h5>$hud-black-oled</h5>
          <span>#090D14 &bull; Zero Night Glare</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #10B981;"></div>
        <div class="token-meta">
          <h5>$radar-safe-green</h5>
          <span>#10B981 &bull; Distance &gt; 80m</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #F59E0B;"></div>
        <div class="token-meta">
          <h5>$turn-amber</h5>
          <span>#F59E0B &bull; Navigation Guidance</span>
        </div>
      </div>
      <div class="token-card">
        <div class="token-swatch" style="background: #EF4444;"></div>
        <div class="token-meta">
          <h5>$emergency-brake</h5>
          <span>#EF4444 &bull; Imminent Obstacle</span>
        </div>
      </div>
    </div>
  `,
  validationProse: `
    <p>Certified 100% compliant with strict European automotive safety regulations, the HUD cluster was deployed across 80,000+ commercial vehicles, reducing critical route deviations by 18%.</p>
  `,
  validationMetrics: [
    { val: '80,000+', label: 'Commercial Trucks Deployed' },
    { val: '< 1.2s', label: 'Average Glance Time' },
    { val: '-18%', label: 'Route Deviations' }
  ],
  carProse: `
    <p>Defense examining automotive ergonomics, human factors engineering, and mission-critical safety compliance.</p>
  `,
  carQuestions: [
    {
      question: 'How did European automotive safety regulations govern your user experience decisions for the in-cab display?',
      context: 'EU commercial transport regulations strictly prohibit displays demanding more than 1.2 seconds of eyes-off-road glance time to avoid high-speed collision risks.',
      action: 'I partitioned the display into 3 glance zones. Critical vehicle speed and radar distance occupied Zone 1 directly in front of the driver. Navigation turns occupied Zone 2 with large, high-contrast turn arrows. Eco-coaching was relegated to subtle green peripheral pulses. We eliminated all sub-menus and touch requirements while driving.',
      result: 'Average driver glance time clocked at 0.94s (comfortably below the 1.2s legal ceiling), cutting critical navigation errors by 18% across 80,000 deployed European vehicles.'
    }
  ],
  nextLink: null
};

fs.writeFileSync(path.join(__dirname, 'case-zf-wabco.html'), buildScrollableCasePage(wabcoData), 'utf8');
console.log('case-zf-wabco.html written cleanly.');

// ============================================================================












// PART D: UPDATE NAVIGATION IN leadership.html AND cv.html
// ============================================================================
console.log('4. Synchronizing navigation links in leadership.html and cv.html...');

function updateNavInHtml(filePath, activeKey) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace brand link
  const brandPattern = /<a href="[^"]*" class="brand-link"[\s\S]*?<\/a>/;
  const newBrand = `
      <a href="index.html" class="brand-link" aria-label="BVR Portfolio Home">
        <span class="brand-monogram">BVR</span>
        <span class="brand-tag">Product Design Suite</span>
      </a>
  `.trim();
  if (content.match(brandPattern)) {
    content = content.replace(brandPattern, newBrand);
  }

  // Replace nav links block
  const navPattern = /<nav class="nav-links"[\s\S]*?<\/nav>/;
  const newNav = `
      <nav class="nav-links" aria-label="Main Navigation">
        <a href="index.html" class="nav-item ${activeKey === 'home' ? 'active' : ''}">Selected Work</a>
        <a href="leadership.html" class="nav-item ${activeKey === 'leadership' ? 'active' : ''}">Leadership</a>
        <a href="archive.html" class="nav-item ${activeKey === 'archive' ? 'active' : ''}">Design Artifacts</a>
        <a href="gallery.html" class="nav-item ${activeKey === 'gallery' ? 'active' : ''}">Career Gallery</a>
        <a href="cv.html" class="nav-item ${activeKey === 'cv' ? 'active' : ''}">My Resume</a>
      </nav>
  `.trim();

  if (content.match(navPattern)) {
    content = content.replace(navPattern, newNav);
  }

  // Replace header-actions to remove download button from top bar
  const actionsPattern = /<div class="header-actions">[\s\S]*?<\/div>/;
  const newActions = `
      <div class="header-actions">
        <a href="contact.html" class="btn-contact">
          Get In Touch &rarr;
        </a>
      </div>
  `.trim();
  if (content.match(actionsPattern)) {
    content = content.replace(actionsPattern, newActions);
  }

  // Update on-page titles if CV
  if (filePath.endsWith('cv.html')) {
    content = content.replace(/Curriculum Vitae/g, 'My Resume');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated navigation and header in ${path.basename(filePath)}`);
}

updateNavInHtml(path.join(__dirname, 'leadership.html'), 'leadership');
updateNavInHtml(path.join(__dirname, 'cv.html'), 'cv');

console.log('========================================================');
console.log('=== ALL PAGES COMPILED: CLEAN ARCHITECTURE COMPLETE ===');
console.log('========================================================');
