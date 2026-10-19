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
      <a href="/" class="brand-link">
        <span class="brand-name">BALAAJEE V.R.</span>
        <span class="brand-role">/ Senior UI/UX Design Manager &amp; Director</span>
      </a>

      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/" class="nav-item ${activePage === 'home' ? 'active' : ''}">Welcome</a>
        <a href="/leadership" class="nav-item ${activePage === 'leadership' ? 'active' : ''}">👔 Leadership Deck</a>
        <a href="/work" class="nav-item ${activePage === 'work' ? 'active' : ''}">🎨 Selected Work</a>
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
        <a href="Balaajee VR POP Resume 20261015.pdf" download class="btn-download-pdf">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download CV (PDF)
        </a>
        `}
        <a href="mailto:vrbberaj@gmail.com" class="btn-contact">
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
  html { scroll-behavior: smooth; }
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
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-subtle);
    padding: 10px 0;
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
    white-space: nowrap;
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
  }

  .btn-contact:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(240, 6, 88, 0.3);
  }

  @media (max-width: 860px) {
    .header-container {
      padding: 0 16px;
      gap: 12px;
    }
    .brand-role { display: none; }
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

  @media (max-width: 560px) {
    .header-container {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      padding: 0 14px;
    }
    .brand-link {
      justify-content: space-between;
    }
    .nav-links {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      overflow-x: auto;
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
    gap: 18px;
  }

  .footer-links a {
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.15s ease;
  }

  .footer-links a:hover {
    color: var(--primary-accent);
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
  <title>Balaajee V.R. | Senior UI/UX Design Manager &amp; Product Design Director</title>
  <meta name="description" content="Executive Welcome Portal of Balaajee V.R. — 18+ years leading enterprise product design, AI orchestration, and design systems across IBM, Ericsson, Zebra, and ZF Wabco.">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}

    /* Welcome Hero Stage */
    .welcome-hero-stage {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 64px 0 60px;
    }

    .hero-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
      align-items: center;
    }

    @media (max-width: 980px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }

    .availability-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 14px;
      border-radius: 100px;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.25);
      color: #059669;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #059669;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 7px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    .hero-name {
      font-family: var(--font-heading);
      font-size: 46px;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: var(--text-main);
      margin-bottom: 12px;
    }

    .hero-subtitle {
      font-family: var(--font-heading);
      font-size: 21px;
      font-weight: 700;
      color: var(--primary-accent);
      line-height: 1.35;
      margin-bottom: 20px;
    }

    .hero-bio-lead {
      font-size: 16.5px;
      line-height: 1.65;
      color: var(--text-body);
      margin-bottom: 24px;
      max-width: 620px;
    }

    .pedigree-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 32px;
    }

    .pedigree-pill {
      font-family: var(--font-code);
      font-size: 11.5px;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 6px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
    }

    .pathways-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 480px;
    }

    .btn-pathway-primary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 22px;
      border-radius: 12px;
      background: var(--text-main);
      color: #FFFFFF;
      text-decoration: none;
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
    }

    .btn-pathway-primary:hover {
      background: #000000;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
    }

    .btn-pathway-secondary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 20px;
      border-radius: 12px;
      background: #FFFFFF;
      border: 1px solid var(--border-medium);
      color: var(--text-main);
      text-decoration: none;
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .btn-pathway-secondary:hover {
      background: var(--bg-subtle);
      border-color: var(--text-main);
      transform: translateY(-1px);
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

    .video-stage-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(11, 14, 23, 0.85);
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
      z-index: 10;
    }

    .video-time-tag {
      position: absolute;
      top: 14px;
      right: 14px;
      background: var(--primary-accent);
      color: #FFFFFF;
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      z-index: 10;
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
      font-size: 14px;
      font-weight: 800;
      color: #FFFFFF;
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

    /* Key Career Impact Numbers Strip */
    .impact-strip-section {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 32px 0;
    }

    .impact-grid {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 28px;
    }

    @media (max-width: 768px) {
      .impact-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .impact-stat-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .impact-num {
      font-family: var(--font-heading);
      font-size: 36px;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .impact-num span {
      color: var(--primary-accent);
    }

    .impact-label {
      font-family: var(--font-code);
      font-size: 11.5px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .impact-desc {
      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.4;
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
          <div class="availability-pill">
            <span class="pulse-dot"></span>
            Open to Senior Design Leadership • Open to Relocation (India &amp; Global)
          </div>

          <h1 class="hero-name">BALAAJEE V.R.</h1>
          <h2 class="hero-subtitle">Senior UI/UX Design Manager &amp; Product Design Director</h2>

          <p class="hero-bio-lead">
            <strong>18+ years</strong> orchestrating enterprise design systems, agentic AI UX, and mission-critical B2B software architectures compliant with European &amp; global standards (WCAG 2.2 AA, EAA, GDPR). Proven track record collaborating directly with Swedish and German enterprise headquarters across <strong>Ericsson, IBM Watson, Zebra Technologies,</strong> and <strong>ZF Wabco</strong>.
          </p>

          <div class="pedigree-tags">
            <span class="pedigree-pill">🏢 Ex-IBM Software Labs</span>
            <span class="pedigree-pill">🌐 Ex-Ericsson Global</span>
            <span class="pedigree-pill">📦 Ex-Zebra Technologies</span>
            <span class="pedigree-pill">🚛 Ex-ZF Wabco</span>
          </div>

          <!-- Direct Pathways to Dedicated Portals (No in-page clutter) -->
          <div class="pathways-group">
            <a href="/work" class="btn-pathway-primary">
              <span>🎨 Explore Selected Work (5 Enterprise Deep Dives)</span>
              <span>&rarr;</span>
            </a>
            <a href="/leadership" class="btn-pathway-secondary">
              <span>👔 View Executive Leadership &amp; Vision Deck</span>
              <span>&rarr;</span>
            </a>
            <a href="/cv" class="btn-pathway-secondary">
              <span>📄 Read Full Executive Curriculum Vitae (CV)</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

        <!-- Right: 60-Second Executive Video Stage -->
        <div class="hero-right">
          <div class="video-showcase-box">
            <div class="video-player-frame">
              <span class="video-stage-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                Executive Welcome Stage
              </span>
              <span class="video-time-tag">60s Briefing</span>
              
              <video id="welcomeVideo" controls poster="profile.jpg" preload="metadata">
                <source src="intro.mp4" type="video/mp4">
                Your browser does not support high-definition video playback.
              </video>
            </div>

            <div class="video-caption-bar">
              <div>
                <h4>Balaajee V.R. — Personal Introduction</h4>
                <p>Strategic Design Leadership &bull; 1080p HD</p>
              </div>
              <button class="btn-transcript-toggle" onclick="toggleTranscript()">
                📝 Transcript
              </button>
            </div>

            <div class="transcript-drawer" id="transcriptDrawer">
              <p><strong>Balaajee V.R. Speaking:</strong> “Hello and welcome. Over the past 18 years, I’ve led product design across enterprise leaders including IBM, Ericsson, Zebra Technologies, and ZF Wabco. My focus is taking high-complexity, mission-critical systems—whether that is telecom CPQ, autonomous enterprise AI, rugged industrial IoT, or commercial automotive HUDs—and transforming them into intuitive, high-velocity experiences that protect millions in revenue. Please explore my <strong>Selected Work</strong> for complete end-to-end deep dives, review my <strong>Leadership Deck</strong> to see how I scale teams, or browse my <strong>Executive CV</strong>. I look forward to our conversation.”</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>

  <!-- Impact Numbers Strip -->
  <section class="impact-strip-section">
    <div class="impact-grid">
      <div class="impact-stat-item">
        <div class="impact-num">18<span>+</span></div>
        <div class="impact-label">Years Leadership</div>
        <div class="impact-desc">Directing enterprise product design &amp; UX squads.</div>
      </div>
      <div class="impact-stat-item">
        <div class="impact-num">$45<span>M+</span></div>
        <div class="impact-label">Margin Protected</div>
        <div class="impact-desc">Annual operational savings &amp; revenue guardrails.</div>
      </div>
      <div class="impact-stat-item">
        <div class="impact-num">1,200<span>+</span></div>
        <div class="impact-label">Engineers Governed</div>
        <div class="impact-desc">Scaled across 14 distributed product squads.</div>
      </div>
      <div class="impact-stat-item">
        <div class="impact-num">6</div>
        <div class="impact-label">Design Systems</div>
        <div class="impact-desc">Multi-brand token architectures shipped to production.</div>
      </div>
    </div>
  </section>

  <!-- Global Footer -->
  <footer class="global-footer">
    <div class="footer-container">
      <div class="footer-left">
        <h5>Balaajee V.R. &bull; Senior UI/UX Design Manager &amp; Director</h5>
        <p>Bengaluru, India &bull; Open to Worldwide Relocation &amp; Global Remote Leadership</p>
      </div>
      <div class="footer-links">
        <a href="/work">Selected Work</a>
        <a href="/leadership">Leadership Deck</a>
        <a href="/cv">Executive CV</a>
        <a href="mailto:vrbberaj@gmail.com">vrbberaj@gmail.com</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
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
  <title>Balaajee V.R. | Selected Work &amp; Enterprise Product Portfolio</title>
  <meta name="description" content="Selected enterprise product transformations led by Balaajee V.R. Deep dives into Telecom CPQ, Enterprise Agentic AI, Industrial IoT, DesignOps Governance, and Automotive Cockpits.">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}

    .work-hero-header {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 56px 0 44px;
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
    }

    .work-desc {
      font-size: 16px;
      color: var(--text-muted);
      max-width: 780px;
      line-height: 1.6;
    }

    /* Transformation Showcase Directory */
    .showcase-directory {
      padding: 50px 0 80px;
    }

    .cards-stack {
      display: flex;
      flex-direction: column;
      gap: 32px;
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

    @media (max-width: 900px) {
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
      margin-bottom: 14px;
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

    .card-domain-badge {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      color: var(--primary-accent);
    }

    .card-role-text {
      font-size: 12px;
      color: var(--text-muted);
    }

    .card-title {
      font-family: var(--font-heading);
      font-size: 24px;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.25;
      margin-bottom: 12px;
    }

    .card-lead {
      font-size: 14.5px;
      color: var(--text-body);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .card-metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding-top: 18px;
      border-top: 1px solid var(--border-subtle);
      margin-bottom: 24px;
    }

    .c-metric-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .c-metric-val {
      font-family: var(--font-heading);
      font-size: 19px;
      font-weight: 900;
      color: var(--gold);
    }

    .c-metric-lbl {
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .card-cta-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .btn-read-deep-dive {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 22px;
      border-radius: 100px;
      background: var(--text-main);
      color: #FFFFFF;
      text-decoration: none;
      font-family: var(--font-heading);
      font-size: 13.5px;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .btn-read-deep-dive:hover {
      background: var(--primary-accent);
      transform: translateY(-1px);
    }

    /* Right Preview Window Side */
    .card-preview-side {
      background: #0B0F17;
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
    }

    .preview-browser-mini {
      background: #161B26;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    .browser-mini-bar {
      background: #111520;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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

    .dot-r { background: #FF5F56; }
    .dot-y { background: #FFBD2E; }
    .dot-g { background: #27C93F; }

    .browser-mini-title {
      font-family: var(--font-code);
      font-size: 10px;
      color: #94A3B8;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .browser-mini-body {
      padding: 16px;
    }

    .mini-tag-badge {
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 700;
      color: #10B981;
      margin-bottom: 6px;
      display: block;
    }

    .mini-callout-text {
      font-size: 12px;
      color: #CBD5E1;
      line-height: 1.5;
    }
  </style>
</head>
<body>

  ${getGlobalNav('work')}

  <section class="work-hero-header">
    <div class="work-container">
      <div class="work-pretitle">Enterprise Product Portfolio</div>
      <h1 class="work-title">Selected Work: Flagship Product Transformations</h1>
      <p class="work-desc">
        Comprehensive, multi-page deep dives documenting business stakes, contextual field inquiries, system architecture, interactive solutions, design tokens, usability validation, and executive CAR defense across 5 mission-critical enterprise platforms.
      </p>
    </div>
  </section>

  <main class="showcase-directory">
    <div class="work-container">
      <div class="cards-stack">

        <!-- 1. Ericsson -->
        <article class="transformation-card">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">Ericsson Global</span>
                <span class="card-domain-badge">Telecom CPQ &amp; OSS</span>
                <span class="card-role-text">Lead UI/UX Architect &bull; Jul 2019 – Sep 2020</span>
              </div>
              <h2 class="card-title">Ericsson SalesOps Cloud: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine</h2>
              <p class="card-lead">
                Modernizing an unversioned, macro-laden spreadsheet quoting nightmare into an enterprise cloud data grid, reducing deal turnaround from 6 days to 42 minutes and protecting $18M in margin leakage.
              </p>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">6d &rarr; 42m</div>
                  <div class="c-metric-lbl">Turnaround (-92%)</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">$18M+</div>
                  <div class="c-metric-lbl">Protected Margin</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">0%</div>
                  <div class="c-metric-lbl">Formula Errors</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-ericsson" class="btn-read-deep-dive">
                  Read Full Deep Dive &amp; Defense &rarr;
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
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● KEYBOARD-FIRST BOM DATA GRID</span>
                <p class="mini-callout-text">
                  Arrow-key navigation, tabular copy-paste, and instant margin guardrails validate $450M in annual telecom contracts in real-time.
                </p>
              </div>
            </div>
          </div>
        </article>

        <!-- 2. IBM Watson -->
        <article class="transformation-card">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">IBM Software Labs</span>
                <span class="card-domain-badge">Agentic AI &amp; Enterprise UX</span>
                <span class="card-role-text">Senior Manager UI/UX Design &bull; Sep 2024 – Jan 2026</span>
              </div>
              <h2 class="card-title">IBM Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX</h2>
              <p class="card-lead">
                Designing autonomous multi-agent task execution and Human-in-the-Loop governance for regulated Fortune 500 enterprises, transforming black-box AI into explainable, auditable workflows.
              </p>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">+62%</div>
                  <div class="c-metric-lbl">Task Velocity</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">0</div>
                  <div class="c-metric-lbl">Compliance Violations</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">94.2%</div>
                  <div class="c-metric-lbl">Autonomous Confidence</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-ibm-watson" class="btn-read-deep-dive">
                  Read Full Deep Dive &amp; Defense &rarr;
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
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● 3-TIER CONFIDENCE GATE MATRIX</span>
                <p class="mini-callout-text">
                  Governed Human-in-the-Loop approval workflows: automated side-by-side diff previews before any mutation commits to ERP or CRM systems.
                </p>
              </div>
            </div>
          </div>
        </article>

        <!-- 3. Zebra -->
        <article class="transformation-card">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">Zebra Technologies</span>
                <span class="card-domain-badge">Industrial IoT &amp; Hardware Telematics</span>
                <span class="card-role-text">UI/UX Product Design Manager &bull; Jul 2021 – Aug 2024</span>
              </div>
              <h2 class="card-title">Zebra Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics</h2>
              <p class="card-lead">
                Scaling IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers and sub-zero freezer hubs (-25°C).
              </p>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">1.2M+</div>
                  <div class="c-metric-lbl">Active Rugged Units</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">8 Secs</div>
                  <div class="c-metric-lbl">Staging vs 4.5 Days</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">-45%</div>
                  <div class="c-metric-lbl">Warehouse Downtime</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-zebra" class="btn-read-deep-dive">
                  Read Full Deep Dive &amp; Defense &rarr;
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
                <div class="browser-mini-title">zebra://cloud/spatial-telematics</div>
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● 1-SCAN 2D PROVISIONING ENGINE</span>
                <p class="mini-callout-text">
                  In-situ cold-storage research informed ultra-high-contrast dark mode and instant 1-scan setup, eliminating USB tethering bottlenecks.
                </p>
              </div>
            </div>
          </div>
        </article>

        <!-- 4. IBM Carbon -->
        <article class="transformation-card">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">IBM Software Labs</span>
                <span class="card-domain-badge">DesignOps &amp; Design Systems</span>
                <span class="card-role-text">DesignOps &amp; Governance Lead &bull; 2024–2026</span>
              </div>
              <h2 class="card-title">IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance</h2>
              <p class="card-lead">
                Eliminating multi-million dollar design debt by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads via the Contribution Council flywheel.
              </p>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">14 Squads</div>
                  <div class="c-metric-lbl">Synchronized Repos</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">+28%</div>
                  <div class="c-metric-lbl">Front-End Speed</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">-70%</div>
                  <div class="c-metric-lbl">Design QA Defects</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-ibm-carbon" class="btn-read-deep-dive">
                  Read Full Deep Dive &amp; Defense &rarr;
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
                <div class="browser-mini-title">carbon://designops/token-engine</div>
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● FIGMA-TO-REACT CI/CD SYNC</span>
                <p class="mini-callout-text">
                  Automated Style-Dictionary pull requests update 180+ tokens across light and dark modes with 100% theme parity and zero CSS drift.
                </p>
              </div>
            </div>
          </div>
        </article>

        <!-- 5. ZF Wabco -->
        <article class="transformation-card">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">ZF Wabco</span>
                <span class="card-domain-badge">Automotive Cockpit &amp; Fleet Safety</span>
                <span class="card-role-text">UI/UX Senior Specialist &bull; Oct 2020 – Jul 2021</span>
              </div>
              <h2 class="card-title">ZF Wabco Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics</h2>
              <p class="card-lead">
                Designing a distraction-free in-cab HUD cluster compliant with strict EU automotive standards (&lt;1.2s glance time), paired with an automated fleet command center for dispatchers.
              </p>
            </div>

            <div>
              <div class="card-metrics-grid">
                <div class="c-metric-item">
                  <div class="c-metric-val">80,000+</div>
                  <div class="c-metric-lbl">European Trucks</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">&lt; 1.2s</div>
                  <div class="c-metric-lbl">Eyes-Off-Road Glance</div>
                </div>
                <div class="c-metric-item">
                  <div class="c-metric-val">-18%</div>
                  <div class="c-metric-lbl">Route Deviations</div>
                </div>
              </div>

              <div class="card-cta-row">
                <a href="/case-zf-wabco" class="btn-read-deep-dive">
                  Read Full Deep Dive &amp; Defense &rarr;
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
                <div class="browser-mini-title">wabco://cockpit/can-bus-hud</div>
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● 3-ZONE ERGONOMIC COCKPIT</span>
                <p class="mini-callout-text">
                  Zone 1 heads-up radar distance, Zone 2 dark-mode navigation turn cards, Zone 3 peripheral eco-pulse coaching.
                </p>
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
      <div class="footer-left">
        <h5>Balaajee V.R. &bull; Senior UI/UX Design Manager &amp; Director</h5>
        <p>Selected Work Portfolio &bull; 5 Flagship Enterprise Transformations</p>
      </div>
      <div class="footer-links">
        <a href="/">Welcome</a>
        <a href="/leadership">Leadership Deck</a>
        <a href="/cv">Executive CV</a>
        <a href="mailto:vrbberaj@gmail.com">Get in Touch</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'work.html'), workHtml, 'utf8');
console.log('work.html compiled successfully (Dedicated Selected Work Portal).');

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
    top: 79px;
    z-index: 950;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-medium);
    padding: 8px 0;
  }

  .toc-wrap {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;
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
`;

// Helper function to build a full-depth, multi-section scrollable case study page
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

      <!-- 90-Second Walkthrough Video Stage -->
      <div class="case-video-stage" id="caseWalkthroughStage">
        <div class="video-stage-header">
          <span class="video-stage-header-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            90-Second Executive Walkthrough &bull; ${data.shortName}
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
      <a href="#sec-ia" class="toc-link">03. IA &amp; Workflow Transformation</a>
      <a href="#sec-ui" class="toc-link">04. Interactive Solution Showcase</a>
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
        ${data.workflowHtml}
      </section>

      <!-- Section 04: Interactive Solution Showcase -->
      <section class="section-block" id="sec-ui">
        <div class="section-header-tag">04 &bull; High-Fidelity Interactive Solution</div>
        <h2 class="section-title-h2">Interactive Working Prototype Showcase</h2>
        <div class="section-prose">
          ${data.uiProse}
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
        <div class="section-header-tag">07 &bull; Hard Business ROI &amp; Executive CAR Defense</div>
        <h2 class="section-title-h2">Executive Interview Defense Q&amp;A (Situation, Action, Result)</h2>
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
        <h5>Balaajee V.R. &bull; Senior UI/UX Design Manager &amp; Director</h5>
        <p>${data.shortName} Deep Dive &bull; 18+ Years Enterprise Design Leadership</p>
      </div>
      <div class="footer-links">
        <a href="/">Welcome</a>
        <a href="/work">Selected Work</a>
        <a href="/leadership">Leadership Deck</a>
        <a href="/cv">Executive CV</a>
        <a href="mailto:vrbberaj@gmail.com">Get in Touch</a>
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

</body>
</html>
`;
}

// ----------------------------------------------------------------------------
// CASE 1: ERICSSON SALESOPS CLOUD (FULL-SIZE SCROLLABLE)
// ----------------------------------------------------------------------------
console.log('3a. Compiling case-ericsson.html (Full Scrollable)...');

const ericssonData = {
  caseId: 'ericsson',
  title: 'Ericsson SalesOps Cloud: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine',
  shortName: 'Ericsson SalesOps CPQ',
  company: 'Ericsson Global',
  roleDates: 'Lead UI/UX Designer &amp; Architect &bull; Jul 2019 – Sep 2020',
  award: '🏆 1st Place Global Hack-fest Award &bull; Spot Innovation Citation',
  leadSummary: 'Modernizing an unversioned, macro-laden spreadsheet quoting nightmare into an enterprise cloud CPQ engine, reducing turnaround from 6 days to 42 minutes and protecting $18M in margin leakage across $450M in annual deals.',
  videoFile: 'ericsson_walkthrough.mp4',
  metrics: [
    { label: 'Target Users', val: '1,200+ Sales Engineers' },
    { label: 'Turnaround', val: '6 Days &rarr; 42 Mins (-92%)' },
    { label: 'Protected Margin', val: '$18M+ Annual' },
    { label: 'Adoption Rate', val: '94% in 30 Days' }
  ],
  chapters: [
    { sec: 0, text: '0:00 14-Tab Excel Audit' },
    { sec: 30, text: '0:30 Keyboard Data Grid' },
    { sec: 65, text: '1:05 $18M Margin Impact' }
  ],
  challengeProse: `
    <p>At Ericsson Global, over 1,200 technical sales engineers across 45 countries were quoting complex 5G network infrastructure contracts worth upwards of $450 million annually. However, the entire commercial machinery relied on a <strong>monolithic, unversioned 50MB Microsoft Excel workbook</strong> containing 14 dense tabs, fragile Visual Basic macros, and manual regional rate cards.</p>
    <p>Whenever a sales engineer modified a discount cell, broken <code>#REF!</code> formulas frequently cascaded across interdependent hardware calculations. Worse still, unauthorized discounting slipped through unnoticed, costing Ericsson an estimated <strong>$18M+ annually in margin erosion</strong>. Quotes crawled through a 6-day email bottleneck waiting for Commercial Directors to manually verify Excel cell formulas.</p>
  `,
  challengeMandate: 'Architect an enterprise CPQ cloud application that eliminated spreadsheet calculation errors and enforced automated gross margin guardrails, while strictly matching the keyboard data-entry velocity that senior electrical engineers demanded.',
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
    <div class="ui-showcase-window">
      <div class="window-header">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="window-address">https://salesops.ericsson.net/deals/deal-4820/bom-configurator</div>
        <span class="window-badge">● AUTO-VALIDATED</span>
      </div>
      <div class="app-canvas">
        <div class="app-deal-header">
          <div class="app-deal-info">
            <h4>Vodafone UK — 5G Core &amp; Radio Expansion (Q3 Deal #4820)</h4>
            <p>Customer Tier: Tier 1 Strategic &bull; Currency: USD ($) &bull; Lead Engineer: M. Lindqvist</p>
          </div>
          <div class="app-deal-totals">
            <div style="font-family: var(--font-heading); font-size: 22px; font-weight: 900; color: var(--gold);">$8,420,000</div>
            <span class="margin-pill margin-pass">GROSS MARGIN: 38.4% [PASS]</span>
          </div>
        </div>

        <table class="app-data-table">
          <thead>
            <tr>
              <th>Line Item</th>
              <th>Hardware Component</th>
              <th>Unit Cost</th>
              <th>Qty</th>
              <th>List Total</th>
              <th>Discount</th>
              <th>Net Contract Price</th>
              <th>Margin Health</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="cell-code">AIR 6488</td>
              <td>5G Massive MIMO Radio (3.5GHz 64T64R)</td>
              <td class="cell-num">$18,500</td>
              <td class="cell-num">120</td>
              <td class="cell-num">$2,220,000</td>
              <td class="cell-num">12%</td>
              <td class="cell-num">$1,953,600</td>
              <td><span class="margin-pill margin-pass">39.2% [PASS]</span></td>
            </tr>
            <tr>
              <td class="cell-code">BB 6630</td>
              <td>Baseband High-Capacity Digital Node</td>
              <td class="cell-num">$9,200</td>
              <td class="cell-num">40</td>
              <td class="cell-num">$368,000</td>
              <td class="cell-num">10%</td>
              <td class="cell-num">$331,200</td>
              <td><span class="margin-pill margin-pass">41.5% [PASS]</span></td>
            </tr>
            <tr>
              <td class="cell-code">SFP+ 10G</td>
              <td>Optical Interconnect Transceivers (10km)</td>
              <td class="cell-num">$320</td>
              <td class="cell-num">480</td>
              <td class="cell-num">$153,600</td>
              <td class="cell-num">15%</td>
              <td class="cell-num">$130,560</td>
              <td><span class="margin-pill margin-pass">36.8% [PASS]</span></td>
            </tr>
            <tr>
              <td class="cell-code">SLA-T1</td>
              <td>24/7 Mission-Critical 3-Year Support SLA</td>
              <td class="cell-num">$450,000</td>
              <td class="cell-num">1</td>
              <td class="cell-num">$450,000</td>
              <td class="cell-num">5%</td>
              <td class="cell-num">$427,500</td>
              <td><span class="margin-pill margin-pass">58.0% [PASS]</span></td>
            </tr>
          </tbody>
        </table>

        <div class="ergonomics-banner">
          <div class="ergonomics-text">
            💡 <strong>UX Ergonomics Callout:</strong> Arrow-key cell jumping, multi-cell copy-paste, and instant inline typeahead autocomplete allow engineers to build 100+ line item quotes at the speed of Excel, without broken formulas.
          </div>
          <button class="btn-action-sm" onclick="simulateAction('Proposal generated successfully! All pricing rules verified against global SAP pricing table.')">Generate 1-Click Proposal (PDF)</button>
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
    <p>In 12 moderated usability sessions across Stockholm and Chennai, sales engineers saw their <strong>SUS (System Usability Scale) satisfaction jump from 34/100 (unacceptable) to 87/100 (world-class)</strong>. By preserving spreadsheet muscle memory while enforcing automated margin guardrails, we achieved 94% platform adoption within 30 days.</p>
  `,
  validationMetrics: [
    { val: '34 &rarr; 87', label: 'SUS Usability Score (+155%)' },
    { val: '6d &rarr; 42m', label: 'Quote Turnaround (-92%)' },
    { val: '94%', label: 'Active 30-Day Adoption' }
  ],
  carProse: `
    <p>Direct leadership defenses addressing critical business tensions between sales velocity and financial compliance.</p>
  `,
  carQuestions: [
    {
      question: 'Sales engineers are notoriously protective of their Excel spreadsheets. How did you overcome their intense resistance to a new web tool?',
      context: 'Previous corporate attempts to replace the 14-tab Excel sheet with heavy web wizards failed with under 15% adoption because sales engineers felt slow, handcuffed, and restricted by multi-step dropdown forms.',
      action: 'During contextual inquiry in Stockholm, I discovered engineers loved Excel not for its aesthetics, but for keyboard velocity. I scrapped the wizard paradigm and architected a high-speed data grid featuring arrow-key cell navigation, tabular copy-paste, and inline search. We preserved their muscle memory while silently moving the catalog and pricing validation to the cloud.',
      result: 'Adoption exceeded 94% within the first month. Quote turnaround dropped from 6 days to 42 minutes, and the project won 1st Place in the Ericsson Global Hack-fest Optimization Contest.'
    },
    {
      question: 'What was the biggest tension between Sales and Finance, and how did your UX architecture resolve it?',
      context: 'Sales demanded total pricing flexibility to close competitive telecom deals quickly, while Corporate Finance wanted strict lockouts to stop inadvertent discounting and margin erosion.',
      action: 'I designed dynamic gross margin guardrails. If a discount kept margin ≥35%, the quote remained in the Green Channel for instant export. If it dipped into 28–34%, the UI triggered an inline escalation simulation showing projected revenue impact. If below 28%, the system locked the discount and prompted required Commercial Director approval.',
      result: 'Eliminated subjective email arguments between Sales and Finance, protected over $18M in margin leakage across $450M in annual deals, and eliminated 100% of broken #REF! calculation errors.'
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
  caseId: 'watson',
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
    <p>Without transparent human oversight, corporate legal teams prohibited internal deployment, stalling multi-million dollar software contracts and leaving operations teams bogged down in manual copy-paste reconciliation.</p>
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
    <div class="ui-showcase-window">
      <div class="window-header">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="window-address">https://watson-orchestrate.ibm.com/workspace/agentic-mesh</div>
        <span class="window-badge">● ORCHESTRATION ACTIVE</span>
      </div>
      <div class="app-canvas">
        <div style="background: var(--bg-subtle); padding: 14px 18px; border-radius: 10px; margin-bottom: 18px; border-left: 4px solid #1D4ED8;">
          <div style="font-family: var(--font-code); font-size: 10.5px; color: #1D4ED8; font-weight: 700; text-transform: uppercase;">Natural Language Enterprise Intent</div>
          <div style="font-size: 14.5px; font-weight: 600; color: var(--text-main); margin-top: 4px;">“Reconcile Q3 vendor invoices across SAP, verify credit limits in Salesforce, and prepare executive payment voucher.”</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 18px;">
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 8px; border-top: 3px solid #1D4ED8;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-code); font-weight: 700; color: var(--text-main);">
              <span>SAP ERP AGENT</span>
              <span style="color: #059669;">100% MATCH</span>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Matched 14 PO line items against invoice receipts. 0 variance.</p>
          </div>

          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 8px; border-top: 3px solid var(--gold);">
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-code); font-weight: 700; color: var(--text-main);">
              <span>CRM AGENT</span>
              <span style="color: var(--gold);">APPROVED</span>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Verified account credit limit: $250,000 threshold cleared.</p>
          </div>

          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 8px; border-top: 3px solid #059669;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-code); font-weight: 700; color: var(--text-main);">
              <span>AUDIT SENTINEL</span>
              <span style="color: #059669;">SOX PASS</span>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Cryptographic hash generated. Audit trail locked into immutable ledger.</p>
          </div>
        </div>

        <div style="background: var(--bg-subtle); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 13.5px; font-weight: 700; color: var(--text-main);">Human-in-the-Loop Confidence Gate: Overall Score 94.2%</span>
            <span class="margin-pill margin-pass">Autonomous Execution Allowed (&ge;90%)</span>
          </div>
          <div style="height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden; position: relative;">
            <div style="width: 94.2%; height: 100%; background: linear-gradient(90deg, #DC2626 0%, #D97706 70%, #059669 90%);"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-family: var(--font-code); font-size: 10.5px; color: var(--text-muted); margin-top: 6px;">
            <span>&lt;70% Manual Entry Fallback</span>
            <span>70–89% 1-Click Diff Verification</span>
            <span>&ge;90% Autonomous Execution</span>
          </div>
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

fs.writeFileSync(path.join(__dirname, 'case-ibm-watson.html'), buildScrollableCasePage(watsonData), 'utf8');
console.log('case-ibm-watson.html written cleanly.');

// ----------------------------------------------------------------------------
// CASE 3: ZEBRA ENTERPRISE DEVICE CLOUD (FULL-SIZE SCROLLABLE)
// ----------------------------------------------------------------------------
console.log('3c. Compiling case-zebra.html (Full Scrollable)...');

const zebraData = {
  caseId: 'zebra',
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
    <p>Furthermore, once deployed onto the warehouse floor, unpredicted battery degradation mid-shift caused conveyor belt packaging lines to halt, costing logistics operators over <strong>$14,000 per hour in idle warehouse downtime</strong>.</p>
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
        “Staging 1,000 new barcode scanners by tethering each unit over USB used to tie up my entire team for a week. And when a battery dies mid-shift on a packaging conveyor, it costs us $14,000 an hour.”
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
    <div class="ui-showcase-window">
      <div class="window-header">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="window-address">https://devicecloud.zebra.com/hub/chicago-dc-04/spatial-map</div>
        <span class="window-badge">● 1,280 SCANNERS ONLINE</span>
      </div>
      <div class="app-canvas">
        <div class="app-deal-header">
          <div class="app-deal-info">
            <h4>Chicago Fulfillment Hub #04 — Scanner Fleet Health</h4>
            <p>Active Scanners: 1,280 &bull; Active Packaging Belts: 8 &bull; Offline: 0</p>
          </div>
          <div class="app-deal-totals">
            <span class="margin-pill margin-pass">FLEET HEALTH: 98.4% OPTIMAL</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 18px;">
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 8px; text-align: center;">
            <div style="font-family: var(--font-code); font-size: 10.5px; color: #059669; font-weight: 700;">ZONE A &bull; STAGING DOCK</div>
            <div style="font-size: 24px; font-weight: 800; color: var(--text-main); margin: 4px 0;">480 Units</div>
            <div style="font-size: 11px; color: var(--text-muted);">Battery: 98% &bull; Signal: Optimal</div>
          </div>

          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 8px; text-align: center;">
            <div style="font-family: var(--font-code); font-size: 10.5px; color: #059669; font-weight: 700;">ZONE B &bull; PACKAGING CONVEYOR</div>
            <div style="font-size: 24px; font-weight: 800; color: var(--text-main); margin: 4px 0;">620 Units</div>
            <div style="font-size: 11px; color: var(--text-muted);">Battery: 89% &bull; Signal: Optimal</div>
          </div>

          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 8px; text-align: center; border: 1px solid rgba(217, 119, 6, 0.3);">
            <div style="font-family: var(--font-code); font-size: 10.5px; color: #DC2626; font-weight: 700;">ZONE C &bull; SUB-ZERO FREEZER</div>
            <div style="font-size: 24px; font-weight: 800; color: #D97706; margin: 4px 0;">180 Units ⚠️</div>
            <div style="font-size: 11px; color: #D97706;">Predictive Alert: 14 Batteries Need Swap</div>
          </div>
        </div>

        <div class="ergonomics-banner">
          <div class="ergonomics-text">
            📱 <strong>1-Scan Master Barcode Engine:</strong> Operators scan one illuminated 2D code on terminal to auto-provision Wi-Fi, MDM certs, and firmware in 8 seconds (vs 4.5 days manual USB tethering).
          </div>
          <span class="margin-pill margin-pass">-45% DOWNTIME</span>
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
  caseId: 'carbon',
  title: 'IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance',
  shortName: 'IBM Carbon Tokens',
  company: 'IBM Software Labs',
  roleDates: 'DesignOps &amp; Governance Lead &bull; 2024–2026',
  award: '🏆 DesignOps Enterprise Leadership Citation',
  leadSummary: 'Eliminating multi-million dollar design debt by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads via the Contribution Council flywheel.',
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
    <div class="ui-showcase-window">
      <div class="window-header">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="window-address">https://designops.ibm.com/carbon-tokens/governance</div>
        <span class="window-badge">● 14 SQUADS SYNCED</span>
      </div>
      <div class="app-canvas">
        <div class="app-deal-header">
          <div class="app-deal-info">
            <h4>Carbon Design System — Multi-Brand Token Synchronizer</h4>
            <p>Branch: release/v4.2.0 &bull; Synced Repos: 14 Squads &bull; Auto-PRs: Active</p>
          </div>
          <div class="app-deal-totals">
            <span class="margin-pill margin-pass">180+ TOKENS GOVERNED</span>
          </div>
        </div>

        <table class="app-data-table">
          <thead>
            <tr>
              <th>Figma Variable</th>
              <th>Semantic Token Name</th>
              <th>Light Value</th>
              <th>Dark Value</th>
              <th>CI/CD Sync Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="cell-code">color.blue.60</td>
              <td>interactive-primary</td>
              <td class="cell-num">#0F62FE</td>
              <td class="cell-num">#4589DF</td>
              <td><span class="margin-pill margin-pass">✅ Auto-PR Merged</span></td>
            </tr>
            <tr>
              <td class="cell-code">spacing.05</td>
              <td>layout-gutter</td>
              <td class="cell-num">24px</td>
              <td class="cell-num">24px</td>
              <td><span class="margin-pill margin-pass">✅ Auto-PR Merged</span></td>
            </tr>
            <tr>
              <td class="cell-code">color.gray.10</td>
              <td>surface-background</td>
              <td class="cell-num">#F4F4F4</td>
              <td class="cell-num">#161616</td>
              <td><span class="margin-pill margin-pass">✅ Auto-PR Merged</span></td>
            </tr>
          </tbody>
        </table>

        <div class="ergonomics-banner">
          <div class="ergonomics-text">
            🔄 <strong>Contribution Council Flywheel:</strong> Squad leads propose component tokens via RFC templates &bull; Weekly 30-min council reviews &bull; Style-Dictionary auto-generates PRs directly into squad repositories.
          </div>
          <span class="margin-pill margin-pass">+28% Sprint Velocity</span>
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
  caseId: 'wabco',
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
    <div class="ui-showcase-window">
      <div class="window-header" style="background: #0D1117;">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="window-address" style="background: #161B22; color: #8B949E;">zf-wabco://cockpit-cluster/active-haul/route-849</div>
        <span class="window-badge">● CAN-BUS CONNECTED</span>
      </div>
      <div class="app-canvas" style="background: #090D14; color: #FFFFFF;">
        <div style="display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 16px; margin-bottom: 18px;">
          <div style="background: #111827; padding: 18px; border-radius: 10px; text-align: center; border: 1px solid #1F2937;">
            <div style="font-family: var(--font-code); font-size: 10.5px; color: #9CA3AF;">ZONE 1 (&lt;0.8S GLANCE)</div>
            <div style="font-size: 38px; font-weight: 800; color: #10B981; font-family: var(--font-code); margin: 6px 0;">88 <span style="font-size: 16px;">KM/H</span></div>
            <div style="font-size: 11px; color: #9CA3AF;">Safe Distance: 85m &bull; Limit: 90</div>
          </div>

          <div style="background: #111827; padding: 18px; border-radius: 10px; text-align: center; border: 1px solid #1F2937;">
            <div style="font-family: var(--font-code); font-size: 10.5px; color: #F59E0B;">ZONE 2 (&lt;1.2S NAVIGATION)</div>
            <div style="font-size: 18px; font-weight: 800; color: #F59E0B; margin: 10px 0;">A7 Hamburg — Exit 24 in 2.4 km</div>
            <div style="font-size: 11px; color: #9CA3AF;">Max Bridge Clearance: 4.2m [CLEAR]</div>
          </div>

          <div style="background: #111827; padding: 18px; border-radius: 10px; text-align: center; border: 1px solid #1F2937;">
            <div style="font-family: var(--font-code); font-size: 10.5px; color: #10B981;">ZONE 3 (ECO-COACHING)</div>
            <div style="font-size: 18px; font-weight: 800; color: #10B981; margin: 10px 0;">Optimal Torque</div>
            <div style="font-size: 11px; color: #9CA3AF;">+14% Fleet Fuel Efficiency</div>
          </div>
        </div>

        <div class="ergonomics-banner" style="background: #1F2937; border-color: #374151;">
          <div class="ergonomics-text" style="color: #E5E7EB;">
            📡 <strong>Dispatcher Command Center:</strong> Real-time CAN-bus telemetry streaming over 4G/5G &bull; Geo-fence compliance &bull; Driver rest cycle tracking.
          </div>
          <span class="margin-pill margin-pass">80,000+ TRUCKS DEPLOYED</span>
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
  
  // Replace nav links block
  const navPattern = /<nav class="nav-links"[\s\S]*?<\/nav>/;
  const newNav = `
      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/" class="nav-item ${activeKey === 'home' ? 'active' : ''}">Welcome</a>
        <a href="/leadership" class="nav-item ${activeKey === 'leadership' ? 'active' : ''}">👔 Leadership Deck</a>
        <a href="/work" class="nav-item ${activeKey === 'work' ? 'active' : ''}">🎨 Selected Work</a>
        <a href="/cv" class="nav-item ${activeKey === 'cv' ? 'active' : ''}">📄 Executive CV</a>
      </nav>
  `.trim();

  if (content.match(navPattern)) {
    content = content.replace(navPattern, newNav);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated navigation in ${path.basename(filePath)}`);
  }
}

updateNavInHtml(path.join(__dirname, 'leadership.html'), 'leadership');
updateNavInHtml(path.join(__dirname, 'cv.html'), 'cv');

console.log('========================================================');
console.log('=== ALL PAGES COMPILED: CLEAN ARCHITECTURE COMPLETE ===');
console.log('========================================================');
