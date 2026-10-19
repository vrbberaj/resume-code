const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');

const completeHTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balaajee V.R. | Senior UI/UX Design Manager</title>
  <meta name="description" content="Senior UI/UX Design Manager with 18+ years leading cross-functional design organizations across Enterprise B2B SaaS, Agentic AI, Industrial IoT, and Telematics. Ex-IBM, Zebra Technologies, ZF Wabco, Ericsson.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* ==========================================================================
       DESIGN SYSTEM: EDITORIAL SWISS-GRID & DUAL THEME (LIGHT FIRST)
       ========================================================================== */
    :root {
      --bg-base: #FBFBF9;
      --bg-surface: #FFFFFF;
      --bg-subtle: #F4F1EA;
      --bg-card-hover: #FAF8F4;
      
      --text-main: #111827;
      --text-body: #374151;
      --text-muted: #6B7280;
      --text-light: #9CA3AF;
      
      --border-subtle: rgba(0, 0, 0, 0.07);
      --border-medium: rgba(0, 0, 0, 0.12);
      --border-focus: #C4892A;
      
      --accent-gold: #C4892A;
      --accent-gold-bg: rgba(196, 137, 42, 0.08);
      --accent-gold-border: rgba(196, 137, 42, 0.25);
      
      --accent-blue: #1D4ED8;
      --accent-blue-bg: rgba(29, 78, 216, 0.08);
      --accent-blue-border: rgba(29, 78, 216, 0.22);
      
      --accent-green: #059669;
      --accent-green-bg: rgba(5, 150, 105, 0.08);
      
      --accent-red: #DC2626;
      --accent-red-bg: rgba(220, 38, 38, 0.08);
      
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
      --shadow-md: 0 8px 24px -4px rgba(0,0,0,0.06), 0 2px 6px -1px rgba(0,0,0,0.02);
      --shadow-lg: 0 20px 40px -8px rgba(0,0,0,0.08), 0 4px 12px -2px rgba(0,0,0,0.03);
      --shadow-glow: 0 0 24px rgba(196, 137, 42, 0.12);
      
      --font-serif: 'Libre Baskerville', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      
      --container-max: 1280px;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-full: 9999px;
      
      --transition-smooth: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    [data-theme="dark"] {
      --bg-base: #0B0F17;
      --bg-surface: #121824;
      --bg-subtle: #182233;
      --bg-card-hover: #1E293B;
      
      --text-main: #F9FAFB;
      --text-body: #D1D5DB;
      --text-muted: #9CA3AF;
      --text-light: #6B7280;
      
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-medium: rgba(255, 255, 255, 0.15);
      
      --accent-gold: #DFBC55;
      --accent-gold-bg: rgba(223, 188, 85, 0.12);
      --accent-gold-border: rgba(223, 188, 85, 0.3);
      
      --accent-blue: #60A5FA;
      --accent-blue-bg: rgba(96, 165, 250, 0.12);
      --accent-blue-border: rgba(96, 165, 250, 0.3);
      
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
      --shadow-md: 0 8px 24px rgba(0,0,0,0.4);
      --shadow-lg: 0 20px 40px rgba(0,0,0,0.5);
      --shadow-glow: 0 0 30px rgba(223, 188, 85, 0.15);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background-color: var(--bg-base);
      color: var(--text-body);
      font-family: var(--font-sans);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      transition: background-color 0.3s ease, color 0.3s ease;
      overflow-x: hidden;
    }

    .container {
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 1;
    }

    /* Floating Navigation */
    .nav-wrapper {
      position: sticky;
      top: 1.25rem;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.65rem 1rem 0.65rem 1.4rem;
      margin: 1.25rem auto 2.5rem auto;
      max-width: var(--container-max);
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-md);
      transition: var(--transition-smooth);
    }

    [data-theme="dark"] .nav-wrapper {
      background: rgba(18, 24, 36, 0.85);
      border-color: var(--border-subtle);
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-main);
    }

    .brand-avatar-nav {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--accent-gold);
    }

    .brand-name {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 700;
      line-height: 1.1;
    }

    .brand-badge {
      font-family: var(--font-mono);
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-gold);
      display: block;
      font-weight: 600;
    }

    .nav-pills {
      display: flex;
      align-items: center;
      background: var(--bg-subtle);
      padding: 4px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-subtle);
      gap: 3px;
    }

    .nav-pill {
      border: none;
      background: transparent;
      color: var(--text-muted);
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 600;
      padding: 7px 16px;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: var(--transition-smooth);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .nav-pill:hover { color: var(--text-main); }
    .nav-pill.active {
      background: var(--bg-surface);
      color: var(--text-main);
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .nav-actions { display: flex; align-items: center; gap: 8px; }

    .btn-icon-toggle {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
    }
    .btn-icon-toggle:hover { background: var(--border-medium); transform: scale(1.05); }

    .btn-admin-gate {
      background: var(--accent-gold-bg);
      border: 1px solid var(--accent-gold-border);
      color: var(--accent-gold);
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: var(--radius-full);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: var(--transition-smooth);
    }
    .btn-admin-gate:hover { background: var(--accent-gold); color: #FFF; box-shadow: var(--shadow-glow); }

    .btn-cta-contact {
      background: var(--text-main);
      color: var(--bg-base);
      font-size: 12.5px;
      font-weight: 600;
      padding: 8px 18px;
      border-radius: var(--radius-full);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: var(--transition-smooth);
    }
    .btn-cta-contact:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }

    /* ==========================================================================
       HERO SECTION: UI/UX PRODUCT DESIGN LEADERSHIP
       ========================================================================== */
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 2.5rem;
      align-items: center;
      margin-bottom: 4rem;
      padding-top: 1rem;
    }

    @media (max-width: 1024px) {
      .hero-grid { grid-template-columns: 1fr; gap: 2rem; }
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--accent-green-bg);
      border: 1px solid rgba(5, 150, 105, 0.25);
      padding: 5px 14px;
      border-radius: var(--radius-full);
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: var(--accent-green);
      letter-spacing: 0.06em;
      margin-bottom: 1.25rem;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 8px var(--accent-green);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .hero-title {
      font-family: var(--font-serif);
      font-size: clamp(34px, 4.2vw, 52px);
      line-height: 1.15;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 1.25rem;
      letter-spacing: -0.02em;
    }

    .hero-lead {
      font-size: 16px;
      line-height: 1.7;
      color: var(--text-muted);
      margin-bottom: 1.75rem;
    }

    .hero-author-row {
      display: flex;
      align-items: center;
      gap: 16px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      padding: 12px 18px;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      margin-bottom: 1.75rem;
      width: fit-content;
    }

    .hero-author-avatar {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
      border: 2px solid var(--accent-gold);
    }

    .hero-author-meta h3 {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--text-main);
    }

    .hero-author-meta p {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .hero-author-tenures {
      display: flex;
      gap: 6px;
      margin-top: 6px;
      flex-wrap: wrap;
    }

    .tenure-tag {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      padding: 2px 7px;
      border-radius: 4px;
      color: var(--text-body);
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-primary {
      background: var(--accent-gold);
      color: #FFFFFF;
      font-weight: 600;
      font-size: 13.5px;
      padding: 11px 22px;
      border-radius: var(--radius-full);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(196, 137, 42, 0.28);
      transition: var(--transition-smooth);
    }
    .btn-primary:hover { background: #b07820; transform: translateY(-2px); }

    .btn-secondary {
      background: var(--bg-surface);
      color: var(--text-main);
      font-weight: 600;
      font-size: 13px;
      padding: 10px 20px;
      border-radius: var(--radius-full);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--border-medium);
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .btn-secondary:hover { background: var(--bg-subtle); border-color: var(--accent-gold); }

    /* ==========================================================================
       BROWSER WINDOW UI MOCKUP FRAME (USED IN HERO & CASE STUDIES)
       ========================================================================== */
    .browser-frame {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
      transition: var(--transition-smooth);
    }

    .browser-frame:hover {
      border-color: var(--accent-gold-border);
      box-shadow: 0 24px 48px -12px rgba(0,0,0,0.12);
    }

    .browser-titlebar {
      background: var(--bg-subtle);
      border-bottom: 1px solid var(--border-subtle);
      padding: 8px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .traffic-lights {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .traffic-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot-red { background: #EF4444; }
    .dot-yellow { background: #F59E0B; }
    .dot-green { background: #10B981; }

    .browser-url-bar {
      flex: 1;
      max-width: 460px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: 3px 10px;
      font-family: var(--font-mono);
      font-size: 10.5px;
      color: var(--text-muted);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .browser-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--accent-green);
      font-weight: 700;
    }

    /* Live Enterprise UI Content */
    .ui-app-viewport {
      padding: 1.25rem;
      background: var(--bg-base);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .ui-app-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 10px 14px;
    }

    .deal-info h4 {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-main);
    }
    .deal-info p {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-muted);
      margin-top: 1px;
    }

    .deal-kpis {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .deal-kpi-item {
      text-align: right;
    }
    .kpi-title-tiny {
      font-family: var(--font-mono);
      font-size: 9px;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    .kpi-value-tiny {
      font-size: 13px;
      font-weight: 700;
      color: var(--accent-gold);
    }

    .margin-tag-pass {
      background: var(--accent-green-bg);
      color: var(--accent-green);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 3px 8px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
    }

    /* Enterprise Data Grid Table */
    .ui-data-grid {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }

    .ui-data-grid th {
      background: var(--bg-subtle);
      font-family: var(--font-mono);
      font-size: 9.5px;
      text-transform: uppercase;
      padding: 8px 10px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border-medium);
      text-align: left;
    }

    .ui-data-grid td {
      padding: 8px 10px;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-body);
      white-space: nowrap;
    }

    .ui-data-grid tr:hover td {
      background: var(--bg-card-hover);
    }

    .ui-data-grid .code-cell {
      font-family: var(--font-mono);
      font-weight: 600;
      color: var(--accent-blue);
    }

    .ui-data-grid .price-cell {
      font-family: var(--font-mono);
      font-weight: 600;
      text-align: right;
    }

    /* Metric Ribbon */
    .metric-ribbon {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin-bottom: 4rem;
    }

    @media (max-width: 768px) {
      .metric-ribbon { grid-template-columns: repeat(2, 1fr); }
    }

    .metric-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      text-align: center;
      box-shadow: var(--shadow-sm);
      transition: var(--transition-smooth);
    }
    .metric-card:hover { border-color: var(--accent-gold); transform: translateY(-2px); }

    .metric-number {
      font-family: var(--font-serif);
      font-size: 38px;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1;
    }
    .metric-number span { color: var(--accent-gold); }
    .metric-label {
      font-family: var(--font-mono);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      margin-top: 6px;
    }

    /* ==========================================================================
       CASE STUDY SECTION & CARD ARCHITECTURE (BEHANCE / FIGMA STYLE)
       ========================================================================== */
    .case-studies-container {
      display: flex;
      flex-direction: column;
      gap: 4.5rem;
      margin-bottom: 5rem;
    }

    .case-study-showcase {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 2.75rem;
      box-shadow: var(--shadow-md);
      display: flex;
      flex-direction: column;
      gap: 2.25rem;
      position: relative;
      overflow: hidden;
      transition: var(--transition-smooth);
    }

    .case-study-showcase:hover {
      box-shadow: var(--shadow-lg);
      border-color: var(--accent-gold-border);
    }

    .case-header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 1.5rem;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 1.5rem;
    }

    .case-badge-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 0.75rem;
    }

    .case-company-pill {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      background: var(--accent-blue-bg);
      color: var(--accent-blue);
      border: 1px solid var(--accent-blue-border);
    }

    .case-role-pill {
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 500;
    }

    .case-main-title {
      font-family: var(--font-serif);
      font-size: clamp(24px, 2.5vw, 32px);
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.25;
      margin-bottom: 0.5rem;
    }

    .case-lead-p {
      font-size: 15px;
      color: var(--text-body);
      max-width: 960px;
      line-height: 1.65;
    }

    /* Process Stepper Bar */
    .ux-process-stepper {
      display: flex;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      padding: 4px;
      gap: 4px;
      overflow-x: auto;
      width: fit-content;
    }

    .stepper-pill {
      font-family: var(--font-mono);
      font-size: 10.5px;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: var(--radius-full);
      color: var(--text-muted);
      white-space: nowrap;
    }
    .stepper-pill.active {
      background: var(--bg-surface);
      color: var(--accent-gold);
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    /* Persona Profile Card */
    .persona-card {
      background: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 1.5rem;
      align-items: center;
    }

    @media (max-width: 640px) {
      .persona-card { grid-template-columns: 1fr; text-align: center; }
    }

    .persona-avatar-box {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      background: var(--accent-blue-bg);
      border: 2px solid var(--accent-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin: 0 auto;
    }

    .persona-details h5 {
      font-family: var(--font-serif);
      font-size: 16px;
      color: var(--text-main);
    }

    .persona-role-location {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent-gold);
      margin-top: 2px;
    }

    .persona-quote {
      font-style: italic;
      font-size: 13.5px;
      color: var(--text-body);
      margin-top: 8px;
      line-height: 1.5;
      padding-left: 10px;
      border-left: 2px solid var(--accent-gold);
    }

    /* 3 KPI Metric Badges */
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    @media (max-width: 640px) {
      .kpi-row { grid-template-columns: 1fr; }
    }

    .kpi-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      padding: 1.1rem 1rem;
      text-align: center;
      transition: var(--transition-smooth);
    }
    .kpi-box:hover { border-color: var(--accent-gold); transform: translateY(-2px); }

    .kpi-val {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      color: var(--accent-gold);
    }

    .kpi-lbl {
      font-family: var(--font-mono);
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-top: 3px;
    }

    /* Full Deep Dive Accordion */
    .deep-dive-accordion {
      border-top: 1px solid var(--border-subtle);
      padding-top: 1.25rem;
    }

    .deep-dive-btn {
      background: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      color: var(--text-main);
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 600;
      padding: 9px 18px;
      border-radius: var(--radius-full);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition-smooth);
    }
    .deep-dive-btn:hover { background: var(--border-medium); border-color: var(--accent-gold); }

    .deep-dive-panel {
      display: none;
      margin-top: 1.5rem;
      background: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      padding: 2rem;
      flex-direction: column;
      gap: 2rem;
      animation: fadeIn 0.3s ease;
    }
    .deep-dive-panel.open { display: flex; }

    .dive-section h4 {
      font-family: var(--font-serif);
      font-size: 18px;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }

    .dive-section p {
      font-size: 13.5px;
      color: var(--text-body);
      line-height: 1.7;
      margin-bottom: 0.75rem;
    }

    .dive-interview-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }

    .interview-qa-item {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-left: 4px solid var(--accent-gold);
      border-radius: var(--radius-sm);
      padding: 1.25rem;
    }

    .qa-question {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 8px;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .qa-q-num {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent-gold);
      text-transform: uppercase;
      font-weight: 700;
      flex-shrink: 0;
    }

    .qa-answer {
      font-size: 13px;
      color: var(--text-body);
      line-height: 1.7;
    }

    .case-footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-subtle);
    }

    .skill-tag {
      font-family: var(--font-mono);
      font-size: 10.5px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      color: var(--text-muted);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-weight: 500;
    }

    /* Tab Switcher Containers */
    .tab-section-container {
      display: none;
      animation: fadeIn 0.3s ease forwards;
    }
    .tab-section-container.active-tab { display: block; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Admin Hub Modal & Gate */
    .admin-gate-modal {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(12px);
      z-index: 2000;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .admin-gate-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 2.5rem;
      max-width: 440px;
      width: 100%;
      text-align: center;
      box-shadow: var(--shadow-lg);
    }

    .admin-gate-icon {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: var(--accent-gold-bg);
      color: var(--accent-gold);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .admin-input-group {
      margin: 1.5rem 0 1rem 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .admin-passcode-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      font-family: var(--font-mono);
      font-size: 14px;
      background: var(--bg-base);
      color: var(--text-main);
      text-align: center;
      letter-spacing: 0.2em;
    }

    .admin-hub-dashboard {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 2.2rem;
      box-shadow: var(--shadow-lg);
      margin-bottom: 5rem;
    }

    .pipeline-summary-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-subtle);
    }

    .data-table-container {
      overflow-x: auto;
      max-height: 480px;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }

    .data-table th {
      position: sticky;
      top: 0;
      background: var(--bg-subtle);
      font-family: var(--font-mono);
      font-size: 11px;
      text-transform: uppercase;
      padding: 10px 14px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border-medium);
    }

    .data-table td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-body);
    }

    .executive-footer {
      border-top: 1px solid var(--border-subtle);
      padding: 4rem 0 3rem 0;
      margin-top: 5rem;
      background: var(--bg-surface);
    }

    .footer-grid {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;
    }
  </style>
</head>

<body>

  <!-- Floating Nav Bar -->
  <nav class="nav-wrapper">
    <a href="#overview" class="brand-logo" onclick="switchMainTab('cases')">
      <img src="profile.jpg" alt="Balaajee VR" class="brand-avatar-nav">
      <div>
        <div class="brand-name">BALAAJEE V.R.</div>
        <span class="brand-badge">Senior UI/UX Design Manager</span>
      </div>
    </a>

    <!-- Main Navigation Tabs -->
    <div class="nav-pills">
      <button class="nav-pill active" id="tab-btn-cases" onclick="switchMainTab('cases')">UI/UX Case Studies (5)</button>
      <button class="nav-pill" id="tab-btn-resume" onclick="switchMainTab('resume')">Executive CV</button>
      <button class="nav-pill" id="tab-btn-leadership" onclick="switchMainTab('leadership')">Leadership Deck</button>
    </div>

    <!-- Actions -->
    <div class="nav-actions">
      <!-- Dark/Light Theme Toggle -->
      <button class="btn-icon-toggle" id="themeToggleBtn" onclick="toggleTheme()" title="Toggle Dark/Light Mode">
        <svg id="themeIconSun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        <svg id="themeIconMoon" style="display:none;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      </button>

      <!-- Private Pipeline Command Center Gate -->
      <button class="btn-admin-gate" onclick="openAdminGate()">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        <span>Pipeline Hub</span>
      </button>

      <a href="mailto:vrbberaj@gmail.com" class="btn-cta-contact">
        <span>Get in Touch</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>
  </nav>

  <main class="container">

    <!-- ========================================================================
         TAB 1: UI/UX CASE STUDIES SHOWCASE (PRIMARY HOME)
         ======================================================================== -->
    <div id="section-cases" class="tab-section-container active-tab">

      <!-- HERO SECTION: UI/UX PRODUCT DESIGN LEADERSHIP + LIVE UI SCREEN PREVIEW -->
      <section class="hero-grid">
        <div class="hero-bio">
          <div class="status-pill">
            <span class="status-dot"></span>
            <span>OPEN TO SENIOR DESIGN LEADERSHIP</span>
          </div>

          <h1 class="hero-title">
            Designing High-Velocity Enterprise UI, Agentic Workflows &amp; Complex Tools
          </h1>

          <p class="hero-lead">
            Senior UI/UX Design Manager with 18+ years directing cross-functional product design teams across IBM, Zebra Technologies, Ericsson, and ZF Wabco. Transforming convoluted legacy spreadsheets and multi-system workflows into intuitive, high-adoption digital platforms.
          </p>

          <!-- Executive Headshot & Provenance Row -->
          <div class="hero-author-row">
            <img src="profile.jpg" alt="Balaajee VR Headshot" class="hero-author-avatar">
            <div class="hero-author-meta">
              <h3>Balaajee V.R.</h3>
              <p>Ex-IBM UI/UX Design Senior Manager &bull; Ex-Zebra Technologies Product Design Manager</p>
              <div class="hero-author-tenures">
                <span class="tenure-tag">IBM Software Labs</span>
                <span class="tenure-tag">Zebra Tech</span>
                <span class="tenure-tag">ZF Wabco</span>
                <span class="tenure-tag">Ericsson</span>
              </div>
            </div>
          </div>

          <!-- CTAs -->
          <div class="hero-actions">
            <a href="#case-ericsson" class="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              <span>Explore Flagship Case Studies</span>
            </a>
            <a href="resume.pdf" target="_blank" class="btn-secondary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Corporate CV (PDF)</span>
            </a>
            <button onclick="switchMainTab('leadership')" class="btn-secondary">
              <span>View Leadership Deck</span>
              &rarr;
            </button>
          </div>
        </div>

        <!-- RIGHT: LIVE INTERACTIVE BROWSER UI MOCKUP (FEATURED APP SCREEN: ERICSSON SALEOPS) -->
        <div class="browser-frame">
          <div class="browser-titlebar">
            <div class="traffic-lights">
              <span class="traffic-dot dot-red"></span>
              <span class="traffic-dot dot-yellow"></span>
              <span class="traffic-dot dot-green"></span>
            </div>
            <div class="browser-url-bar">salesops.ericsson.net/deals/deal-4820/bom-configurator</div>
            <div class="browser-actions">
              <span>● LIVE ENGINE</span>
            </div>
          </div>

          <div class="ui-app-viewport">
            <div class="ui-app-header-row">
              <div class="deal-info">
                <h4>Vodafone UK &mdash; 5G Phase 2 Network Expansion</h4>
                <p>Deal #4820 &bull; Auto-Save: Synced 2m ago</p>
              </div>
              <div class="deal-kpis">
                <div class="deal-kpi-item">
                  <div class="kpi-title-tiny">Deal Total</div>
                  <div class="kpi-value-tiny">$8,420,000</div>
                </div>
                <div class="margin-tag-pass">
                  38.4% MARGIN [PASS]
                </div>
              </div>
            </div>

            <!-- Mini Live Interactive Data Grid -->
            <table class="ui-data-grid">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Hardware Component</th>
                  <th>Unit Cost</th>
                  <th>Qty</th>
                  <th>Margin %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="code-cell">AIR 6488</td>
                  <td>5G Massive MIMO Radio (3.5GHz)</td>
                  <td class="price-cell">$18,500</td>
                  <td style="font-family: var(--font-mono); font-weight: 700;">120</td>
                  <td style="color: var(--accent-green); font-weight: 700;">39.2%</td>
                </tr>
                <tr>
                  <td class="code-cell">BB 6630</td>
                  <td>Baseband High-Capacity Digital Unit</td>
                  <td class="price-cell">$9,200</td>
                  <td style="font-family: var(--font-mono); font-weight: 700;">40</td>
                  <td style="color: var(--accent-green); font-weight: 700;">41.5%</td>
                </tr>
                <tr>
                  <td class="code-cell">SFP+ 10G</td>
                  <td>Optical Interconnect Transceivers (10km)</td>
                  <td class="price-cell">$320</td>
                  <td style="font-family: var(--font-mono); font-weight: 700;">480</td>
                  <td style="color: var(--accent-green); font-weight: 700;">36.8%</td>
                </tr>
                <tr>
                  <td class="code-cell">SLA-T1</td>
                  <td>24/7 Mission-Critical Support (3-Yr)</td>
                  <td class="price-cell">$450,000</td>
                  <td style="font-family: var(--font-mono); font-weight: 700;">1</td>
                  <td style="color: var(--accent-green); font-weight: 700;">58.0%</td>
                </tr>
              </tbody>
            </table>

            <div style="display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); padding: 4px 2px 0 2px;">
              <span>⌨️ Keyboard Nav: Arrow keys &bull; Tab to edit &bull; Enter to commit</span>
              <span style="color: var(--accent-gold); font-weight: 700;">1-Click Proposal Ready &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      <!-- METRIC RIBBON -->
      <section class="metric-ribbon">
        <div class="metric-card">
          <div class="metric-number">18<span>+</span></div>
          <div class="metric-label">Years Global Leadership</div>
        </div>
        <div class="metric-card">
          <div class="metric-number">10M<span>+</span></div>
          <div class="metric-label">Enterprise Users Impacted</div>
        </div>
        <div class="metric-card">
          <div class="metric-number">8<span>+</span></div>
          <div class="metric-label">Global Industries</div>
        </div>
        <div class="metric-card">
          <div class="metric-number">120<span>+</span></div>
          <div class="metric-label">Designers Mentored</div>
        </div>
      </section>

      <!-- FILTER CONTROLS -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <h2 style="font-family: var(--font-serif); font-size: 26px; color: var(--text-main);">Flagship UI/UX Case Studies</h2>
          <p style="font-size: 13.5px; color: var(--text-muted); margin-top: 2px;">In-depth product design narratives: problem audits, user research personas, UI mockups, and verified business outcomes.</p>
        </div>
        <div class="nav-pills">
          <button class="nav-pill active" onclick="filterCases('all', this)">All (5)</button>
          <button class="nav-pill" onclick="filterCases('sales', this)">Sales Automation</button>
          <button class="nav-pill" onclick="filterCases('ibm', this)">IBM Enterprise</button>
          <button class="nav-pill" onclick="filterCases('zebra', this)">Zebra IoT</button>
          <button class="nav-pill" onclick="filterCases('auto', this)">Fleet Telematics</button>
        </div>
      </div>

      <!-- CASE STUDIES SHOWCASE LIST -->
      <div class="case-studies-container">

        <!-- ====================================================================
             CASE STUDY 1: ERICSSON SALEOPS CLOUD (SPREADSHEET TO CPQ ENGINE)
             ==================================================================== -->
        <article class="case-study-showcase" id="case-ericsson" data-category="sales">
          <div class="case-header-row">
            <div>
              <div class="case-badge-meta">
                <span class="case-company-pill" style="background: rgba(196,137,42,0.1); color: var(--accent-gold); border-color: rgba(196,137,42,0.3);">Ericsson Global</span>
                <span class="case-role-pill">Lead UI/UX Designer &amp; Information Architect &bull; Jul 2019 – Sep 2020</span>
                <span class="tenure-tag" style="background: rgba(16,185,129,0.1); color: var(--accent-green); border-color: rgba(16,185,129,0.3);">🏆 1st Place Hack-fest Award</span>
              </div>
              <h3 class="case-main-title">Ericsson SalesOps Cloud: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine</h3>
              <p class="case-lead-p">Replacing unversioned, macro-heavy spreadsheet pricing models with a guided enterprise CPQ (Configure, Price, Quote) platform across global telecom sales operations.</p>
            </div>
            <div class="ux-process-stepper">
              <span class="stepper-pill active">01. Problem</span>
              <span class="stepper-pill">02. Persona</span>
              <span class="stepper-pill">03. User Flow</span>
              <span class="stepper-pill">04. UI Showcase</span>
              <span class="stepper-pill">05. Impact</span>
            </div>
          </div>

          <!-- USER PERSONA PROFILE -->
          <div class="persona-card">
            <div class="persona-avatar-box">👨‍💼</div>
            <div class="persona-details">
              <h5>Marcus Lindqvist &bull; Senior Telecom Sales Engineer</h5>
              <div class="persona-role-location">Ericsson Global Sales Ops &bull; Stockholm, Sweden</div>
              <div class="persona-quote">
                &ldquo;I have an electrical engineering degree, but 60% of my week is burned copying numbers across 14 spreadsheet tabs, debugging broken VLOOKUP macros, and waiting days for VP email sign-offs.&rdquo;
              </div>
              <div style="display: flex; gap: 12px; margin-top: 10px; font-size: 11.5px; color: var(--text-muted); flex-wrap: wrap;">
                <span><strong>Pain Point:</strong> Broken macro formula errors (#REF!)</span>
                <span><strong>Goal:</strong> Submit verified $10M quotes in under 1 hour</span>
                <span><strong>Tools:</strong> Excel (14 Tabs), Outlook Email</span>
              </div>
            </div>
          </div>

          <!-- THE HIGH-FIDELITY BROWSER UI MOCKUP -->
          <div class="browser-frame">
            <div class="browser-titlebar">
              <div class="traffic-lights">
                <span class="traffic-dot dot-red"></span>
                <span class="traffic-dot dot-yellow"></span>
                <span class="traffic-dot dot-green"></span>
              </div>
              <div class="browser-url-bar">https://salesops.ericsson.net/deals/deal-4820/bom-configurator</div>
              <div class="browser-actions"><span>● AUTO-VALIDATED</span></div>
            </div>

            <div class="ui-app-viewport">
              <div class="ui-app-header-row">
                <div class="deal-info">
                  <h4>Vodafone UK &mdash; 5G Core &amp; Radio Network Expansion (Q3 Deal #4820)</h4>
                  <p>Customer Tier: Tier 1 Strategic &bull; Currency: USD ($) &bull; Lead Engineer: M. Lindqvist</p>
                </div>
                <div class="deal-kpis">
                  <div class="deal-kpi-item">
                    <div class="kpi-title-tiny">Total Contract Value</div>
                    <div class="kpi-value-tiny">$8,420,000</div>
                  </div>
                  <div class="margin-tag-pass">
                    GROSS MARGIN: 38.4% [PASS]
                  </div>
                </div>
              </div>

              <!-- Full High-Fidelity Data Grid -->
              <table class="ui-data-grid">
                <thead>
                  <tr>
                    <th>Line Item</th>
                    <th>Component Description</th>
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
                    <td class="code-cell">AIR 6488</td>
                    <td>5G Massive MIMO Radio (3.5GHz 64T64R)</td>
                    <td class="price-cell">$18,500</td>
                    <td style="font-family: var(--font-mono); font-weight: 700;">120</td>
                    <td class="price-cell">$2,220,000</td>
                    <td style="color: var(--text-muted);">12%</td>
                    <td class="price-cell" style="font-weight: 700;">$1,953,600</td>
                    <td><span class="margin-tag-pass">39.2% [PASS]</span></td>
                  </tr>
                  <tr>
                    <td class="code-cell">BB 6630</td>
                    <td>Baseband High-Capacity Digital Node</td>
                    <td class="price-cell">$9,200</td>
                    <td style="font-family: var(--font-mono); font-weight: 700;">40</td>
                    <td class="price-cell">$368,000</td>
                    <td style="color: var(--text-muted);">10%</td>
                    <td class="price-cell" style="font-weight: 700;">$331,200</td>
                    <td><span class="margin-tag-pass">41.5% [PASS]</span></td>
                  </tr>
                  <tr>
                    <td class="code-cell">SFP+ 10G</td>
                    <td>Optical Interconnect Transceivers (10km)</td>
                    <td class="price-cell">$320</td>
                    <td style="font-family: var(--font-mono); font-weight: 700;">480</td>
                    <td class="price-cell">$153,600</td>
                    <td style="color: var(--text-muted);">15%</td>
                    <td class="price-cell" style="font-weight: 700;">$130,560</td>
                    <td><span class="margin-tag-pass">36.8% [PASS]</span></td>
                  </tr>
                  <tr>
                    <td class="code-cell">SLA-T1</td>
                    <td>24/7 Mission-Critical 3-Year Support SLA</td>
                    <td class="price-cell">$450,000</td>
                    <td style="font-family: var(--font-mono); font-weight: 700;">1</td>
                    <td class="price-cell">$450,000</td>
                    <td style="color: var(--text-muted);">5%</td>
                    <td class="price-cell" style="font-weight: 700;">$427,500</td>
                    <td><span class="margin-tag-pass">58.0% [PASS]</span></td>
                  </tr>
                </tbody>
              </table>

              <!-- Interactive UX Guardrail Callout -->
              <div style="background: var(--bg-surface); border: 1px dashed var(--accent-gold); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 11px;">
                  <span style="font-size: 14px;">💡</span>
                  <span style="color: var(--text-body);"><strong>UX Ergonomics Callout:</strong> Keyboard-first cell navigation (Arrow keys, Tab, Enter) allows engineers to configure 100+ bill-of-material items with the speed of Excel, while automated guardrails prevent margin erosion.</span>
                </div>
                <button class="btn-primary" style="padding: 6px 14px; font-size: 11px;">1-Click Proposal Export (PDF)</button>
              </div>
            </div>
          </div>

          <!-- 3 KPI METRIC BADGES -->
          <div class="kpi-row">
            <div class="kpi-box">
              <div class="kpi-val">6 Days &rarr; 42 Mins</div>
              <div class="kpi-lbl">Quote Turnaround Time (-92%)</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">0% Errors</div>
              <div class="kpi-lbl">Pricing Calculation Inaccuracies</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">$18M+ Lift</div>
              <div class="kpi-lbl">Protected Annual Margin Erosion</div>
            </div>
          </div>

          <!-- EXPANDABLE FULL CASE STUDY & SCRIPTED INTERVIEW DEFENSE -->
          <div class="deep-dive-accordion">
            <button class="deep-dive-btn" onclick="toggleDeepDive('dive-ericsson-full', this)">
              <span>📖 Read Full UI/UX Design Case Study &amp; Interview Defense</span>
              <span style="font-size: 11px;">▼</span>
            </button>

            <div id="dive-ericsson-full" class="deep-dive-panel">
              <div class="dive-section">
                <h4>01. Context &amp; The 14-Tab Spreadsheet Nightmare</h4>
                <p>At Ericsson Global, pricing complex telecom infrastructure (5G cell towers, baseband processing nodes, optical transceivers, and multi-year maintenance SLAs) was handled through unversioned, macro-laden 50MB Microsoft Excel files. Sales engineers in regional offices emailed workbooks back and forth with regional pricing desks. With over 300 pricing rules and 14 separate workbook tabs, broken VLOOKUP formulas and out-of-date catalog tables caused quotes to take an average of 6 business days. Worse, 18% of delivered quotes contained manual calculation errors, resulting in catastrophic margin leakage where multi-million dollar fiber contracts were inadvertently sold below minimum gross margins.</p>
              </div>

              <div class="dive-section">
                <h4>02. User Research &amp; The Ergonomic Breakthrough</h4>
                <p>Enterprise tools that try to replace Excel often fail because sales engineers reject slow, click-heavy web forms. During user research shadowing sales engineers in Stockholm and Chennai, I uncovered a vital human truth: sales engineers loved Excel because of <strong>keyboard muscle memory and speed</strong>. If our web application forced them to click dropdowns and wait for full-page reloads, they would bypass it and keep using spreadsheets.</p>
                <p>I designed a <strong>keyboard-first high-speed data grid</strong> featuring arrow-key cell jumping, multi-cell copy-paste, and instant inline autocompletion. We preserved the rapid ergonomics of a spreadsheet, but coupled it to a cloud product catalog with live gross margin guardrails running silently in the background.</p>
              </div>

              <div class="dive-section">
                <h4>03. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
                <div class="dive-interview-grid">
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q1</span> Sales engineers are notoriously protective of their spreadsheets. How did you drive 94% adoption in 30 days?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Sales engineers cling to Excel because of keyboard velocity and perceived autonomy—they resent clunky web forms that slow them down. I didn't take away their speed; I designed a keyboard-navigable data grid with inline calculations, arrow-key navigation, and smart autocompletion. Once they saw they could generate a verified $10M quotation in 42 minutes without worrying about broken macro errors or spreadsheet corruption, adoption reached 94% in the very first month.&rdquo;</div>
                  </div>
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q2</span> What was the biggest stakeholder tension between Sales and Finance, and how did your UX resolve it?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Sales wanted total pricing freedom to close deals quickly, while Finance demanded strict approval lockouts to protect profitability. I resolved this friction by designing a dynamic visual margin guardrail. If an account executive's discount kept gross margin above 35%, the quote remained in the Green Channel and could be signed off immediately. If it dropped between 28% and 35%, the UI dynamically displayed an escalation workflow with projected revenue impact routing to the Regional VP. If it dropped below 28%, the system locked the margin with clear minimum viability metrics. This transformed an antagonistic bottleneck into an objective, transparent negotiation.&rdquo;</div>
                  </div>
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q3</span> What corporate recognition and business ROI did this project achieve?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;The platform protected over $18M in margin leakage across $450M in annual quoted infrastructure and compressed turnaround from 6 days to 42 minutes. The project won 1st Place in the Ericsson Global Hack-fest Optimization Contest and earned a corporate Spot Award for UX Innovation during COVID-19 times.&rdquo;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer-row">
            <div class="case-tags-container">
              <span class="skill-tag">Enterprise CPQ</span>
              <span class="skill-tag">Data Grid Ergonomics</span>
              <span class="skill-tag">Spreadsheet Modernization</span>
              <span class="skill-tag">B2B SaaS</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">Verified Ericsson Global Case</span>
          </div>
        </article>


        <!-- ====================================================================
             CASE STUDY 2: IBM WATSON ORCHESTRATE (AGENTIC AI & HUMAN-IN-THE-LOOP)
             ==================================================================== -->
        <article class="case-study-showcase" id="case-ibm-watson" data-category="ibm">
          <div class="case-header-row">
            <div>
              <div class="case-badge-meta">
                <span class="case-company-pill">IBM India Software Labs</span>
                <span class="case-role-pill">Senior Manager UI/UX Design &bull; Sep 2024 – Jan 2026</span>
              </div>
              <h3 class="case-main-title">IBM Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX</h3>
              <p class="case-lead-p">Designing autonomous multi-agent task execution while preserving Human-in-the-Loop governance for regulated Fortune 500 enterprises.</p>
            </div>
            <div class="ux-process-stepper">
              <span class="stepper-pill active">01. Problem</span>
              <span class="stepper-pill">02. Persona</span>
              <span class="stepper-pill">03. AI Mesh</span>
              <span class="stepper-pill">04. Confidence Gate</span>
              <span class="stepper-pill">05. Impact</span>
            </div>
          </div>

          <!-- USER PERSONA PROFILE -->
          <div class="persona-card">
            <div class="persona-avatar-box">👩‍💼</div>
            <div class="persona-details">
              <h5>Elena Rostova &bull; Global Operations Director</h5>
              <div class="persona-role-location">Fortune 500 Enterprise Finance &bull; New York, USA</div>
              <div class="persona-quote">
                &ldquo;Generative AI tools are flashy, but if an autonomous model updates vendor invoices in SAP with hallucinated data, our corporate audit fails and I am personally liable.&rdquo;
              </div>
              <div style="display: flex; gap: 12px; margin-top: 10px; font-size: 11.5px; color: var(--text-muted); flex-wrap: wrap;">
                <span><strong>Pain Point:</strong> Black-box GenAI lack of explainability &amp; audit trails</span>
                <span><strong>Goal:</strong> Automate cross-system tasks without compliance risk</span>
                <span><strong>Tools:</strong> SAP ERP, Salesforce, Jira, Watson Orchestrate</span>
              </div>
            </div>
          </div>

          <!-- BROWSER UI MOCKUP: WATSON ORCHESTRATE AGENTIC MESH CANVAS -->
          <div class="browser-frame">
            <div class="browser-titlebar">
              <div class="traffic-lights">
                <span class="traffic-dot dot-red"></span>
                <span class="traffic-dot dot-yellow"></span>
                <span class="traffic-dot dot-green"></span>
              </div>
              <div class="browser-url-bar">https://watson-orchestrate.ibm.com/workspace/agentic-mesh</div>
              <div class="browser-actions"><span>● ORCHESTRATION ACTIVE</span></div>
            </div>

            <div class="ui-app-viewport">
              <!-- Prompt Input Area -->
              <div style="background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 12px 16px;">
                <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-gold); font-weight: 700; text-transform: uppercase;">Natural Language Intent</div>
                <div style="font-size: 13.5px; font-weight: 600; color: var(--text-main); margin-top: 3px;">
                  &ldquo;Reconcile Q3 vendor invoices across SAP, verify credit limit in Salesforce, and prepare executive payment voucher.&rdquo;
                </div>
              </div>

              <!-- Visual Sub-Agent Execution Pipeline -->
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-top: 3px solid var(--accent-blue); border-radius: var(--radius-sm); padding: 10px;">
                  <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: 700;">
                    <span style="color: var(--accent-blue);">SAP ERP AGENT</span>
                    <span style="color: var(--accent-green);">100% Match</span>
                  </div>
                  <div style="font-size: 11px; color: var(--text-body); margin-top: 4px;">Matched 14 PO line items against invoice receipts. 0 variance.</div>
                </div>

                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-top: 3px solid var(--accent-gold); border-radius: var(--radius-sm); padding: 10px;">
                  <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: 700;">
                    <span style="color: var(--accent-gold);">CRM AGENT</span>
                    <span style="color: var(--accent-green);">Approved</span>
                  </div>
                  <div style="font-size: 11px; color: var(--text-body); margin-top: 4px;">Verified account credit limit: $250,000 threshold cleared.</div>
                </div>

                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-top: 3px solid var(--accent-green); border-radius: var(--radius-sm); padding: 10px;">
                  <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: 700;">
                    <span style="color: var(--accent-green);">AUDIT VERIFIER</span>
                    <span style="color: var(--accent-green);">SOX Pass</span>
                  </div>
                  <div style="font-size: 11px; color: var(--text-body); margin-top: 4px;">Cryptographic hash generated. Audit trail locked into immutable ledger.</div>
                </div>
              </div>

              <!-- Human-in-the-Loop Confidence Gate Bar -->
              <div style="background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 10px 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 700;">
                  <span style="color: var(--text-main);">Human-in-the-Loop Confidence Gate: Overall Confidence 94.2%</span>
                  <span class="margin-tag-pass">Autonomous Execution Allowed (&ge;90%)</span>
                </div>
                <div style="height: 6px; background: var(--bg-subtle); border-radius: 3px; overflow: hidden; display: flex; margin: 8px 0 4px 0;">
                  <div style="width: 25%; background: var(--accent-red);" title="<70% Manual Diff"></div>
                  <div style="width: 25%; background: var(--accent-gold);" title="70-89% Human Review"></div>
                  <div style="width: 50%; background: var(--accent-green);" title="≥90% Auto Execution"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 9px; color: var(--text-muted);">
                  <span>&lt;70% Side-by-Side Review</span>
                  <span>70&ndash;89% 1-Click Diff Check</span>
                  <span>&ge;90% Autonomous Action</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3 KPI METRIC BADGES -->
          <div class="kpi-row">
            <div class="kpi-box">
              <div class="kpi-val">62% Faster</div>
              <div class="kpi-lbl">Task Completion Time</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">0 Errors</div>
              <div class="kpi-lbl">Compliance Violations in Audit</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">14 Squads</div>
              <div class="kpi-lbl">Unified AI Component Mesh</div>
            </div>
          </div>

          <!-- EXPANDABLE FULL CASE STUDY & SCRIPTED INTERVIEW DEFENSE -->
          <div class="deep-dive-accordion">
            <button class="deep-dive-btn" onclick="toggleDeepDive('dive-ibm-watson-full', this)">
              <span>📖 Read Full UI/UX Design Case Study &amp; Interview Defense</span>
              <span style="font-size: 11px;">▼</span>
            </button>

            <div id="dive-ibm-watson-full" class="deep-dive-panel">
              <div class="dive-section">
                <h4>01. Context &amp; The Enterprise Trust Barrier</h4>
                <p>Enterprise knowledge workers spend 3.8 hours every day manually copying data and context between fragmented enterprise tools (SAP ERP, Salesforce CRM, Jira, and Workday). While generative AI promised automated task execution, early prototypes suffered from a fatal flaw: black-box execution without explainability or audit trails, triggering immediate rejection by corporate legal and compliance teams.</p>
              </div>

              <div class="dive-section">
                <h4>02. The UX Architectural Solution: Confidence-Gated Autonomy</h4>
                <p>As Senior Design Manager, I directed the design of the <strong>Human-in-the-Loop (HITL) Confidence Gate</strong>. Rather than treating autonomy as binary (all automated vs. all manual), we designed a dynamic 3-zone visual execution model:</p>
                <p>&bull; <strong>Zone 1 (&ge;90% Confidence):</strong> Autonomous background execution with ambient notification receipts.</p>
                <p>&bull; <strong>Zone 2 (70&ndash;89% Confidence):</strong> One-click interactive review card highlighting verified versus deduced fields before executing irreversible write operations.</p>
                <p>&bull; <strong>Zone 3 (&lt;70% Confidence):</strong> Side-by-side reconciliation interface with highlighted diffs and one-click manual override.</p>
              </div>

              <div class="dive-section">
                <h4>03. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
                <div class="dive-interview-grid">
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q1</span> How do you design for autonomous multi-agent AI without users feeling a dangerous loss of control?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Autonomous agentic UX must balance machine speed with human psychological safety. In IBM Watson Orchestrate, we established a strict Human-in-the-Loop Confidence Threshold architecture. High-confidence actions executed silently in the background, but any mutation involving financial transactions or cross-system write operations below our 90% threshold triggered an explicit visual diff. Furthermore, we designed an immutable execution ledger where users could review the sub-agent dependency chain and perform a 1-click state rollback at any point. This gave enterprise risk officers the confidence to greenlight enterprise rollouts.&rdquo;</div>
                  </div>
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q2</span> What was the hardest cross-functional engineering conflict you resolved?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Engineering initially pushed for 100% asynchronous background API execution to maximize throughput and reduce frontend latency metrics. I pushed back and defended a synchronous visual state transition for actions requiring human confirmation. Using user testing with enterprise operations leads, I demonstrated that an unexpected background data mutation caused a 400% increase in user panic and support tickets. We aligned on a dual-speed architecture: silent execution for read-only queries, and explicit interactive review gates for write actions.&rdquo;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer-row">
            <div class="case-tags-container">
              <span class="skill-tag">Agentic AI UX</span>
              <span class="skill-tag">Human-in-the-Loop</span>
              <span class="skill-tag">Enterprise SaaS</span>
              <span class="skill-tag">Explainable AI</span>
            </div>
            <a href="Balaajee_VR_Leadership_Deck.pdf" target="_blank" style="color: var(--accent-gold); font-size: 12.5px; font-weight: 700; text-decoration: none;">View Slide 3 in Leadership Deck &rarr;</a>
          </div>
        </article>


        <!-- ====================================================================
             CASE STUDY 3: ZEBRA ENTERPRISE DEVICE CLOUD (IOT TELEMATICS)
             ==================================================================== -->
        <article class="case-study-showcase" id="case-zebra" data-category="zebra">
          <div class="case-header-row">
            <div>
              <div class="case-badge-meta">
                <span class="case-company-pill" style="background: rgba(196,137,42,0.1); color: var(--accent-gold); border-color: rgba(196,137,42,0.3);">Zebra Technologies</span>
                <span class="case-role-pill">UI/UX Product Design Manager &bull; Jul 2021 – Aug 2024</span>
              </div>
              <h3 class="case-main-title">Zebra Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics</h3>
              <p class="case-lead-p">Scaling mission-critical IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers.</p>
            </div>
            <div class="ux-process-stepper">
              <span class="stepper-pill active">01. Problem</span>
              <span class="stepper-pill">02. Field Research</span>
              <span class="stepper-pill">03. Spatial Map</span>
              <span class="stepper-pill">04. 1-Scan Setup</span>
              <span class="stepper-pill">05. Impact</span>
            </div>
          </div>

          <!-- USER PERSONA PROFILE -->
          <div class="persona-card">
            <div class="persona-avatar-box">👷‍♂️</div>
            <div class="persona-details">
              <h5>Dave Kowalski &bull; Logistics Warehouse IT Lead</h5>
              <div class="persona-role-location">E-Commerce Distribution Center &bull; Chicago, USA</div>
              <div class="persona-quote">
                &ldquo;Staging 1,000 new barcode scanners by tethering each unit over USB used to tie up my entire team for a week. And when a battery dies mid-shift on a packaging conveyor, it costs us $14,000 an hour.&rdquo;
              </div>
              <div style="display: flex; gap: 12px; margin-top: 10px; font-size: 11.5px; color: var(--text-muted); flex-wrap: wrap;">
                <span><strong>Pain Point:</strong> Manual USB flashing &amp; sudden conveyor line stoppages</span>
                <span><strong>Goal:</strong> 1-scan zero-touch provisioning and predictive battery health</span>
                <span><strong>Environment:</strong> High-velocity warehouse &amp; sub-zero freezers</span>
              </div>
            </div>
          </div>

          <!-- BROWSER UI MOCKUP: ZEBRA SPATIAL TELEMATICS CONSOLE -->
          <div class="browser-frame">
            <div class="browser-titlebar">
              <div class="traffic-lights">
                <span class="traffic-dot dot-red"></span>
                <span class="traffic-dot dot-yellow"></span>
                <span class="traffic-dot dot-green"></span>
              </div>
              <div class="browser-url-bar">https://devicecloud.zebra.com/hub/chicago-dc-04/spatial-map</div>
              <div class="browser-actions"><span>● 1,280 DEVICES CONNECTED</span></div>
            </div>

            <div class="ui-app-viewport">
              <div class="ui-app-header-row">
                <div class="deal-info">
                  <h4>Chicago Fulfillment Hub #04 &mdash; Scanner Fleet Health</h4>
                  <p>Active Scanners: 1,280 &bull; Active Packaging Belts: 8 &bull; Offline: 0</p>
                </div>
                <div class="margin-tag-pass" style="background: rgba(16,185,129,0.15); color: var(--accent-green);">
                  FLEET HEALTH: 98.4% OPTIMAL
                </div>
              </div>

              <!-- Spatial Floor Map Grid -->
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; text-align: center;">
                  <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-green); font-weight: 700;">ZONE A &bull; STAGING DOCK</div>
                  <div style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-top: 4px;">480 Units</div>
                  <div style="font-size: 11px; color: var(--text-muted);">Battery: 98% &bull; Signal: Optimal</div>
                </div>

                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; text-align: center;">
                  <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-green); font-weight: 700;">ZONE B &bull; PACKAGING CONVEYOR</div>
                  <div style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-top: 4px;">620 Units</div>
                  <div style="font-size: 11px; color: var(--text-muted);">Battery: 89% &bull; Signal: Optimal</div>
                </div>

                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; text-align: center;">
                  <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-red); font-weight: 700;">ZONE C &bull; SUB-ZERO FREEZER</div>
                  <div style="font-size: 18px; font-weight: 700; color: var(--accent-red); margin-top: 4px;">180 Units ⚠️</div>
                  <div style="font-size: 11px; color: var(--accent-red);">Predictive Alert: 14 Batteries Need Swap</div>
                </div>
              </div>

              <!-- 1-Scan Zero-Touch Provisioning Bar -->
              <div style="background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 10px; font-size: 11px;">
                  <span style="font-size: 20px;">📱</span>
                  <span><strong>1-Scan Master Barcode Engine:</strong> Operators scan one illuminated 2D code to connect devices to secure Wi-Fi and flash enterprise profiles in <strong>8 seconds</strong> (vs 4.5 days manual USB).</span>
                </div>
                <span class="margin-tag-pass">-45% DOWNTIME</span>
              </div>
            </div>
          </div>

          <!-- 3 KPI METRIC BADGES -->
          <div class="kpi-row">
            <div class="kpi-box">
              <div class="kpi-val">1.2M+</div>
              <div class="kpi-lbl">Active Enterprise Units</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">-45% Drop</div>
              <div class="kpi-lbl">Device Staging Downtime</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">-33% Reduction</div>
              <div class="kpi-lbl">Tier-1 IT Support Tickets</div>
            </div>
          </div>

          <!-- EXPANDABLE FULL CASE STUDY & SCRIPTED INTERVIEW DEFENSE -->
          <div class="deep-dive-accordion">
            <button class="deep-dive-btn" onclick="toggleDeepDive('dive-zebra-full', this)">
              <span>📖 Read Full UI/UX Design Case Study &amp; Interview Defense</span>
              <span style="font-size: 11px;">▼</span>
            </button>

            <div id="dive-zebra-full" class="deep-dive-panel">
              <div class="dive-section">
                <h4>01. Context &amp; The Industrial Warehouse Crisis</h4>
                <p>Zebra Technologies powers high-velocity logistics hubs for global retail and e-commerce leaders. Staging 1,000 new mobile computers or barcode scanners historically required IT technicians to physically plug each unit into USB hubs, taking 4.5 business days per batch. Simultaneously, unmonitored battery degradation was causing active packaging lines to freeze mid-shift, costing warehouse operators up to $14,000 per hour in idle labor and shipping SLA penalties.</p>
              </div>

              <div class="dive-section">
                <h4>02. Field Usability in Sub-Zero Cold-Storage Freezers</h4>
                <p>I conducted contextual inquiry inside high-velocity distribution centers and sub-zero cold-storage freezers. I observed warehouse operators wearing thick thermal gloves in sub-zero freezers struggling to tap 12px touch targets on screen. This field discovery reshaped our technical strategy: rather than forcing workers to navigate complex touchscreen menus, we designed the <strong>1-Scan Master Barcode</strong> workflow. Operators simply turned on a scanner and pointed it at an illuminated master QR code—the device self-configured over Wi-Fi in 8 seconds flat.</p>
              </div>

              <div class="dive-section">
                <h4>03. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
                <div class="dive-interview-grid">
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q1</span> How do you approach UX research in industrial, mission-critical environments?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;You cannot design industrial tools from behind an office desk. I conducted contextual field inquiry inside high-velocity distribution centers and sub-zero cold-storage freezers. Watching operators wearing thick insulated gloves fumble with small touchscreens directly inspired our 1-Scan Zero-Touch Provisioning feature and our strict 48px minimal touch target standard. Field empathy directly produced a 45% reduction in device staging downtime.&rdquo;</div>
                  </div>
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q2</span> How do you negotiate with hardware and firmware engineering teams who resist UI changes?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Hardware engineers initially wanted dense 5,000-row tabular spreadsheets because they were technically easy to query. I built interactive clickable prototypes and conducted benchmark testing with real warehouse supervisors. We proved that a spatial heat-map visual layout allowed supervisors to locate a failing scanner batch in 4 seconds versus 12 minutes in a raw data table. Data and recorded field video bridged the gap immediately.&rdquo;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer-row">
            <div class="case-tags-container">
              <span class="skill-tag">Industrial IoT</span>
              <span class="skill-tag">Hardware Telemetry</span>
              <span class="skill-tag">Zero-Touch Provisioning</span>
              <span class="skill-tag">Field Usability</span>
            </div>
            <a href="Balaajee_VR_Leadership_Deck.pdf" target="_blank" style="color: var(--accent-gold); font-size: 12.5px; font-weight: 700; text-decoration: none;">View Slide 5 in Leadership Deck &rarr;</a>
          </div>
        </article>


        <!-- ====================================================================
             CASE STUDY 4: IBM CARBON TOKEN ENGINE (DESIGNOPS & SYSTEM GOVERNANCE)
             ==================================================================== -->
        <article class="case-study-showcase" id="case-ibm-carbon" data-category="ibm">
          <div class="case-header-row">
            <div>
              <div class="case-badge-meta">
                <span class="case-company-pill">IBM India Software Labs</span>
                <span class="case-role-pill">DesignOps &amp; Governance Lead &bull; 2024–2026</span>
              </div>
              <h3 class="case-main-title">IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance</h3>
              <p class="case-lead-p">Eliminating multi-million dollar design debt by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads.</p>
            </div>
            <div class="ux-process-stepper">
              <span class="stepper-pill active">01. Problem</span>
              <span class="stepper-pill">02. Persona</span>
              <span class="stepper-pill">03. 3-Tier Tokens</span>
              <span class="stepper-pill">04. CI/CD Bridge</span>
              <span class="stepper-pill">05. Impact</span>
            </div>
          </div>

          <!-- USER PERSONA PROFILE -->
          <div class="persona-card">
            <div class="persona-avatar-box">👩‍💻</div>
            <div class="persona-details">
              <h5>Priya Sharma &bull; Senior Front-End Squad Lead</h5>
              <div class="persona-role-location">IBM Software Labs &bull; Bangalore, India</div>
              <div class="persona-quote">
                &ldquo;Every time brand updates colors or design delivers a new dark mode layout, my front-end engineers waste 25% of the sprint resolving broken CSS overrides and handoff discrepancies.&rdquo;
              </div>
              <div style="display: flex; gap: 12px; margin-top: 10px; font-size: 11.5px; color: var(--text-muted); flex-wrap: wrap;">
                <span><strong>Pain Point:</strong> Hardcoded hex values, visual drift, sprint handoff bugs</span>
                <span><strong>Goal:</strong> Automated token PRs directly into React codebases</span>
                <span><strong>Tools:</strong> Figma Variables, Style-Dictionary, GitHub Actions</span>
              </div>
            </div>
          </div>

          <!-- BROWSER UI MOCKUP: CARBON TOKEN EXPLORER CONSOLE -->
          <div class="browser-frame">
            <div class="browser-titlebar">
              <div class="traffic-lights">
                <span class="traffic-dot dot-red"></span>
                <span class="traffic-dot dot-yellow"></span>
                <span class="traffic-dot dot-green"></span>
              </div>
              <div class="browser-url-bar">https://designops.ibm.com/carbon-tokens/governance</div>
              <div class="browser-actions"><span>● 14 SQUADS SYNCED</span></div>
            </div>

            <div class="ui-app-viewport">
              <div class="ui-app-header-row">
                <div class="deal-info">
                  <h4>Carbon Design System &mdash; Multi-Brand Token Synchronizer</h4>
                  <p>Branch: release/v4.2.0 &bull; Synced Repos: 14 Squads &bull; Auto-PRs: Active</p>
                </div>
                <div class="margin-tag-pass">180+ TOKENS GOVERNED</div>
              </div>

              <!-- Token Mapping Table -->
              <table class="ui-data-grid">
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
                    <td class="code-cell">color.blue.60</td>
                    <td>interactive-primary</td>
                    <td>#0F62FE</td>
                    <td>#4589DF</td>
                    <td><span class="margin-tag-pass">✅ Auto-PR Merged</span></td>
                  </tr>
                  <tr>
                    <td class="code-cell">spacing.05</td>
                    <td>layout-gutter</td>
                    <td>24px</td>
                    <td>24px</td>
                    <td><span class="margin-tag-pass">✅ Auto-PR Merged</span></td>
                  </tr>
                  <tr>
                    <td class="code-cell">color.gray.10</td>
                    <td>surface-background</td>
                    <td>#F4F4F4</td>
                    <td>#161616</td>
                    <td><span class="margin-tag-pass">✅ Auto-PR Merged</span></td>
                  </tr>
                </tbody>
              </table>

              <!-- Contribution Council Flywheel Callout -->
              <div style="background: var(--bg-surface); border: 1px dashed var(--accent-gold); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 11px; color: var(--text-body);"><strong>Contribution Council Flywheel:</strong> Squad leads propose component tokens via RFC templates &bull; Weekly 30-min council reviews &bull; Style-Dictionary auto-generates PRs directly into squad repositories.</span>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-gold); font-weight: 700;">+28% Sprint Velocity</span>
              </div>
            </div>
          </div>

          <!-- 3 KPI METRIC BADGES -->
          <div class="kpi-row">
            <div class="kpi-box">
              <div class="kpi-val">+28% Lift</div>
              <div class="kpi-lbl">Front-End Sprint Velocity</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">180+ Tokens</div>
              <div class="kpi-lbl">Governed Across Light/Dark</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">-70% Drop</div>
              <div class="kpi-lbl">Design QA Handoff Bugs</div>
            </div>
          </div>

          <!-- EXPANDABLE FULL CASE STUDY & SCRIPTED INTERVIEW DEFENSE -->
          <div class="deep-dive-accordion">
            <button class="deep-dive-btn" onclick="toggleDeepDive('dive-ibm-carbon-full', this)">
              <span>📖 Read Full UI/UX Design Case Study &amp; Interview Defense</span>
              <span style="font-size: 11px;">▼</span>
            </button>

            <div id="dive-ibm-carbon-full" class="deep-dive-panel">
              <div class="dive-section">
                <h4>01. Context &amp; The Design Debt Crisis</h4>
                <p>Across 14 distributed software squads in IBM India Software Labs, design fragmentation had grown to crisis levels. Squads maintained isolated component forks with hardcoded hex codes, disparate padding, and incompatible CSS overrides. Implementing dark mode or adapting to refreshed Carbon brand guidelines took 3+ sprints per squad, burning hundreds of thousands of dollars in redundant front-end rework and QA handoff disputes.</p>
              </div>

              <div class="dive-section">
                <h4>02. The Architectural Solution: 3-Tier Token Synchronizer</h4>
                <p>Rather than relying on static redlines or manual handoffs, I led the architecture of an automated token bridge. By structuring tokens into <strong>Global Primitives</strong> (raw values), <strong>Semantic Tokens</strong> (intent-driven mappings like <code>surface-ground</code> or <code>border-interactive</code>), and <strong>Component Tokens</strong>, we decoupled visual design from engineering implementations. Integrating Style-Dictionary and GitHub Actions meant that any variable change approved in Figma automatically produced tested, merge-ready PRs directly into each squad's React repository.</p>
              </div>

              <div class="dive-section">
                <h4>03. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
                <div class="dive-interview-grid">
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q1</span> How do you scale design systems across 14 autonomous engineering squads without becoming a bureaucratic bottleneck?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Design systems die when they act like bureaucratic police departments. At IBM, I established a Federated Contribution Model called the Component Contribution Council. Squad leads retained autonomy to propose new patterns via RFC templates. Once approved in our weekly 30-minute token office hours, our automated GitHub pipeline generated pull requests directly into their codebases. Governance became an accelerant rather than a blocker.&rdquo;</div>
                  </div>
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q2</span> How did you quantify the financial ROI of DesignOps to engineering directors and product VPs?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Before the token engine, 25% of front-end sprint capacity across our 14 squads was burned on UI bug fixing, handoff QA discrepancies, and CSS override refactoring. By automating the token pipeline and eliminating hardcoded styles, we dropped handoff bugs by 70% and reclaimed an estimated 28% in sprint velocity. For a team of 40+ engineers, that translated directly into over $400,000 in reclaimed engineering capacity annually.&rdquo;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer-row">
            <div class="case-tags-container">
              <span class="skill-tag">DesignOps</span>
              <span class="skill-tag">Design Tokens</span>
              <span class="skill-tag">Figma Variables</span>
              <span class="skill-tag">CI/CD Integration</span>
            </div>
            <a href="Balaajee_VR_Leadership_Deck.pdf" target="_blank" style="color: var(--accent-gold); font-size: 12.5px; font-weight: 700; text-decoration: none;">View Slide 6 in Leadership Deck &rarr;</a>
          </div>
        </article>


        <!-- ====================================================================
             CASE STUDY 5: ZF WABCO COMMERCIAL VEHICLE COCKPIT (FLEET TELEMATICS)
             ==================================================================== -->
        <article class="case-study-showcase" id="case-zf-wabco" data-category="auto">
          <div class="case-header-row">
            <div>
              <div class="case-badge-meta">
                <span class="case-company-pill" style="background: rgba(16,185,129,0.1); color: var(--accent-green); border-color: rgba(16,185,129,0.3);">ZF Wabco</span>
                <span class="case-role-pill">UI/UX Senior Specialist &bull; Oct 2020 – Jul 2021</span>
                <span class="tenure-tag" style="background: rgba(16,185,129,0.1); color: var(--accent-green); border-color: rgba(16,185,129,0.3);">EU Safety Certified</span>
              </div>
              <h3 class="case-main-title">ZF Wabco Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics</h3>
              <p class="case-lead-p">Designing a dual-interface ecosystem: a glanceable, distraction-free in-cab HUD for truck drivers paired with an automated fleet command center for dispatchers.</p>
            </div>
            <div class="ux-process-stepper">
              <span class="stepper-pill active">01. Safety Mandate</span>
              <span class="stepper-pill">02. Driver Persona</span>
              <span class="stepper-pill">03. Glance Cones</span>
              <span class="stepper-pill">04. HUD UI</span>
              <span class="stepper-pill">05. Impact</span>
            </div>
          </div>

          <!-- USER PERSONA PROFILE -->
          <div class="persona-card">
            <div class="persona-avatar-box">🚛</div>
            <div class="persona-details">
              <h5>Klaus Meier &bull; Long-Haul Fleet Driver</h5>
              <div class="persona-role-location">Trans-European Logistics Fleet &bull; Hamburg, Germany</div>
              <div class="persona-quote">
                &ldquo;Driving a 40-ton articulated lorry on the Autobahn at night in heavy snow requires total focus. If an aftermarket GPS screen has tiny buttons or bright glare, it's dangerously distracting.&rdquo;
              </div>
              <div style="display: flex; gap: 12px; margin-top: 10px; font-size: 11.5px; color: var(--text-muted); flex-wrap: wrap;">
                <span><strong>Pain Point:</strong> Night glare, small buttons, cognitive distraction while driving</span>
                <span><strong>Goal:</strong> Instant, glanceable speed, navigation, and collision warnings (&lt;1.2s glance time)</span>
                <span><strong>Environment:</strong> 40-ton commercial vehicle in variable lighting</span>
              </div>
            </div>
          </div>

          <!-- AUTOMOTIVE COCKPIT UI MOCKUP -->
          <div class="browser-frame" style="background: #0D131F; border-color: #1F293D;">
            <div class="browser-titlebar" style="background: #111A2E; border-color: #1F293D;">
              <div class="traffic-lights">
                <span class="traffic-dot dot-red"></span>
                <span class="traffic-dot dot-yellow"></span>
                <span class="traffic-dot dot-green"></span>
              </div>
              <div class="browser-url-bar" style="background: #0D131F; color: #94A3B8;">zf-wabco://cockpit-cluster/active-haul/route-849</div>
              <div class="browser-actions" style="color: #34D399;"><span>● CAN-BUS CONNECTED</span></div>
            </div>

            <div class="ui-app-viewport" style="background: #0B0F19; color: #FFF;">
              <div style="display: grid; grid-template-columns: 1fr 1.4fr 1fr; gap: 12px; align-items: center; padding: 10px 0;">
                
                <!-- Zone 1: Speedometer & Collision HUD -->
                <div style="background: #121A2B; border: 1px solid #1E293B; border-radius: var(--radius-sm); padding: 14px; text-align: center;">
                  <div style="font-family: var(--font-mono); font-size: 9px; color: #94A3B8; text-transform: uppercase;">Zone 1 (&lt;0.8s Glance)</div>
                  <div style="font-size: 42px; font-weight: 700; color: #34D399; font-family: var(--font-serif); line-height: 1; margin: 6px 0;">88 <span style="font-size: 14px; font-family: var(--font-mono);">KM/H</span></div>
                  <div style="font-size: 10px; color: #34D399;">Safe Distance: 85m &bull; Speed Limit: 90</div>
                </div>

                <!-- Zone 2: Navigation & Bridge Clearance -->
                <div style="background: #121A2B; border: 1px solid #1E293B; border-radius: var(--radius-sm); padding: 14px; text-align: center;">
                  <div style="font-family: var(--font-mono); font-size: 9px; color: #94A3B8; text-transform: uppercase;">Zone 2 (&lt;1.2s Turn Navigation)</div>
                  <div style="font-size: 16px; font-weight: 700; color: #FBBF24; margin: 6px 0;">A7 Hamburg &mdash; Exit 24 in 2.4 km</div>
                  <div style="font-size: 11px; color: #94A3B8;">Max Bridge Clearance: 4.2m [CLEAR]</div>
                </div>

                <!-- Zone 3: Eco-Fuel Coaching -->
                <div style="background: #121A2B; border: 1px solid #1E293B; border-radius: var(--radius-sm); padding: 14px; text-align: center;">
                  <div style="font-family: var(--font-mono); font-size: 9px; color: #94A3B8; text-transform: uppercase;">Zone 3 (Eco-Coaching)</div>
                  <div style="font-size: 16px; font-weight: 700; color: #34D399; margin: 6px 0;">Optimal Torque</div>
                  <div style="font-size: 11px; color: #34D399;">+14% Fleet Fuel Efficiency</div>
                </div>

              </div>

              <!-- Dispatcher Web Link Bar -->
              <div style="background: #121A2B; border: 1px solid #1E293B; border-radius: var(--radius-sm); padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 10.5px; color: #94A3B8;">
                <span>● Dispatcher Command Center: Real-time telemetry streaming over 4G/5G &bull; Geo-fence Compliant</span>
                <span style="color: #34D399;">80,000+ TRUCKS DEPLOYED</span>
              </div>
            </div>
          </div>

          <!-- 3 KPI METRIC BADGES -->
          <div class="kpi-row">
            <div class="kpi-box">
              <div class="kpi-val">80,000+</div>
              <div class="kpi-lbl">Active Commercial Trucks</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">&lt; 1.2 Sec</div>
              <div class="kpi-lbl">Average Glance Time (EU Certified)</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-val">-18% Drop</div>
              <div class="kpi-lbl">Route Compliance Deviations</div>
            </div>
          </div>

          <!-- EXPANDABLE FULL CASE STUDY & SCRIPTED INTERVIEW DEFENSE -->
          <div class="deep-dive-accordion">
            <button class="deep-dive-btn" onclick="toggleDeepDive('dive-zf-wabco-full', this)">
              <span>📖 Read Full UI/UX Design Case Study &amp; Interview Defense</span>
              <span style="font-size: 11px;">▼</span>
            </button>

            <div id="dive-zf-wabco-full" class="deep-dive-panel">
              <div class="dive-section">
                <h4>01. Context &amp; The Human Factor Safety Mandate</h4>
                <p>Operating a 40-ton commercial vehicle at 90 km/h on European highways carries severe safety risks. Commercial truck drivers were overwhelmed by cluttered, multi-layered aftermarket navigation tablets, resulting in high cognitive overload and visual fatigue. European transport safety regulations impose strict penalties on interfaces requiring more than 2.0 seconds of glance time. Simultaneously, fleet dispatchers lacked real-time visibility into route deviations and brake wear.</p>
              </div>

              <div class="dive-section">
                <h4>02. Designing Under Strict Ergonomic Constraints</h4>
                <p>Automotive UI is fundamentally different from consumer mobile design. I engineered a <strong>3-zone glance architecture</strong>: Zone 1 for immediate foveal vision (&lt;0.8s), Zone 2 for secondary navigation guidance (&lt;1.2s), and Zone 3 for ambient eco-driving peripheral coaching. We enforced strict 48px minimal touch targets, high contrast ratios readable under direct blinding sunlight and nocturnal driving conditions, and eliminated multi-level menu navigation while the vehicle was in motion.</p>
              </div>

              <div class="dive-section">
                <h4>03. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
                <div class="dive-interview-grid">
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q1</span> How does designing for automotive and safety-critical environments differ from traditional enterprise software?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;In enterprise SaaS, a confusing button wastes a few seconds of user productivity; in commercial vehicle telematics, a confusing button at 90 km/h on a wet highway costs human lives. I designed under strict cognitive ergonomics: oversized 48px touch targets, high-contrast typography readable under direct sunlight and pitch darkness, and zero deep menu hierarchies while in motion. Every screen underwent ISO 15007 glance-time certification to ensure drivers never looked away from the road for more than 1.2 seconds.&rdquo;</div>
                  </div>
                  <div class="interview-qa-item">
                    <div class="qa-question"><span class="qa-q-num">Q2</span> How did you prove the financial ROI of this automotive design to fleet owners?</div>
                    <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Commercial fleet operators operate on 2-3% margins where fuel represents 30% of operating expenses. By designing real-time, non-intrusive peripheral coaching that guided drivers on gentle braking and optimal torque zones, fleet operators saw a 14% improvement in fuel efficiency across 80,000 trucks. The telematics software license paid for itself within the first 4 months.&rdquo;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer-row">
            <div class="case-tags-container">
              <span class="skill-tag">Automotive UX</span>
              <span class="skill-tag">Safety Standards</span>
              <span class="skill-tag">Fleet Telematics</span>
              <span class="skill-tag">Human Factors</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">European Fleet Deployed</span>
          </div>
        </article>

      </div>
    </div>

    <!-- ========================================================================
         TAB 2: EXECUTIVE CV
         ======================================================================== -->
    <div id="section-resume" class="tab-section-container">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <h2 style="font-family: var(--font-serif); font-size: 26px; color: var(--text-main);">Executive Curriculum Vitae</h2>
          <p style="font-size: 13.5px; color: var(--text-muted); margin-top: 2px;">18+ years career chronology, leadership competencies, and organizational track record.</p>
        </div>
        <a href="resume.pdf" target="_blank" class="btn-primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>Download Corporate CV (PDF)</span>
        </a>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 2.5rem; box-shadow: var(--shadow-md); margin-bottom: 5rem; display: grid; grid-template-columns: 280px 1fr; gap: 3rem;">
        <!-- Left Sidebar CV -->
        <aside style="border-right: 1px solid var(--border-subtle); padding-right: 2rem; display: flex; flex-direction: column; gap: 2rem;">
          <div>
            <img src="profile.jpg" alt="Balaajee VR" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; object-position: top; border: 2px solid var(--accent-gold); margin-bottom: 1rem;">
            <h3 style="font-family: var(--font-serif); font-size: 18px; color: var(--text-main);">BALAAJEE V.R.</h3>
            <p style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; color: var(--accent-gold); margin-top: 2px;">Senior UI/UX Design Manager</p>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Chennai, India &bull; Open to Relocation (Domestic &amp; Worldwide)</p>
          </div>

          <div>
            <h4 style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 8px;">Contact &amp; Profiles</h4>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
              <a href="mailto:vrbberaj@gmail.com" style="color: var(--text-main); text-decoration: none;">vrbberaj@gmail.com</a>
              <span style="color: var(--text-muted);">+91 9994761293</span>
              <a href="https://behance.net/balaajeeVR" target="_blank" style="color: var(--accent-blue); text-decoration: none;">behance.net/balaajeeVR</a>
            </div>
          </div>

          <div>
            <h4 style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 8px;">Education</h4>
            <p style="font-size: 13px; font-weight: 600; color: var(--text-main);">B.E. Information Technology</p>
            <p style="font-size: 12px; color: var(--text-muted);">Anna University, India</p>
          </div>

          <div>
            <h4 style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 8px;">Executive Competencies</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 5px;">
              <span class="skill-tag">Design Strategy</span>
              <span class="skill-tag">DesignOps</span>
              <span class="skill-tag">Enterprise SaaS</span>
              <span class="skill-tag">Design Tokens</span>
              <span class="skill-tag">Agile / PI Planning</span>
              <span class="skill-tag">Hiring &amp; Mentorship</span>
            </div>
          </div>
        </aside>

        <!-- Right Main CV Experience -->
        <div>
          <div style="margin-bottom: 2rem;">
            <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--text-main); margin-bottom: 0.5rem;">Executive Career Chronology (18+ Years)</h3>
            <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6;">
              Proven track record of directing cross-functional squads, establishing DesignOps pipelines, and aligning human-centered design with multi-million dollar business objectives across global markets.
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <!-- IBM -->
            <div style="padding-left: 14px; border-left: 2px solid var(--accent-gold);">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">UI/UX Design — Senior Manager</h4>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">Sep 2024 – Jan 2026</span>
              </div>
              <p style="font-size: 13px; font-weight: 600; color: var(--accent-gold); margin-bottom: 6px;">IBM India Software Labs</p>
              <ul style="font-size: 13px; color: var(--text-body); line-height: 1.6; padding-left: 16px;">
                <li>Directed multi-disciplinary squads delivering agentic AI workflows and enterprise orchestration solutions for Global 500 accounts.</li>
                <li>Bridged design vision and engineering feasibility, mitigating cross-functional friction and protecting delivery sprint timelines.</li>
                <li>Established multi-brand Design Token Governance across 14 front-end squads, accelerating development handoff velocity by 28%.</li>
              </ul>
            </div>

            <!-- Zebra -->
            <div style="padding-left: 14px; border-left: 2px solid var(--border-medium);">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">UI/UX Product Design Manager</h4>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">Jul 2021 – Aug 2024</span>
              </div>
              <p style="font-size: 13px; font-weight: 600; color: var(--accent-gold); margin-bottom: 6px;">Zebra Technologies</p>
              <ul style="font-size: 13px; color: var(--text-body); line-height: 1.6; padding-left: 16px;">
                <li>Led and mentored a distributed team of 12+ designers across B2B hardware, enterprise cloud telematics, and rugged mobile portfolios.</li>
                <li>Facilitated Lean UX and PI planning workshops, aligning product managers and engineering leads on roadmap trade-offs.</li>
                <li>Redesigned Zebra Device Cloud console, scaling to 1.2M active connected devices and decreasing support volume by 33%.</li>
              </ul>
            </div>

            <!-- ZF Wabco -->
            <div style="padding-left: 14px; border-left: 2px solid var(--border-medium);">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">UI/UX Senior Specialist</h4>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">Oct 2020 – Jul 2021</span>
              </div>
              <p style="font-size: 13px; font-weight: 600; color: var(--accent-gold); margin-bottom: 6px;">ZF Wabco</p>
              <ul style="font-size: 13px; color: var(--text-body); line-height: 1.6; padding-left: 16px;">
                <li>Spearheaded UX strategy for vehicle infotainment displays, telematics web dashboards, and driver safety telemetry.</li>
                <li>Scaled internal automotive Design System ensuring visual parity across European commercial fleet product squads.</li>
              </ul>
            </div>

            <!-- Ericsson -->
            <div style="padding-left: 14px; border-left: 2px solid var(--border-medium);">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">UI/UX Designer &bull; Telecom Lead</h4>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">Jul 2019 – Sep 2020</span>
              </div>
              <p style="font-size: 13px; font-weight: 600; color: var(--accent-gold); margin-bottom: 6px;">Ericsson Global</p>
              <ul style="font-size: 13px; color: var(--text-body); line-height: 1.6; padding-left: 16px;">
                <li>Designed enterprise SalesOps Cloud platform, replacing legacy 14-tab spreadsheets with an automated deal pricing engine.</li>
                <li>Won 1st Place in Ericsson Global Hack-fest Optimization Contest and Spot Award for UX Innovation during COVID-19 times.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================
         TAB 3: STRATEGIC LEADERSHIP DECK
         ======================================================================== -->
    <div id="section-leadership" class="tab-section-container">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <h2 style="font-family: var(--font-serif); font-size: 26px; color: var(--text-main);">Strategic Leadership Deck (10 Keynotes)</h2>
          <p style="font-size: 13.5px; color: var(--text-muted); margin-top: 2px;">Organizational strategy, Dual-Engine AI, Team Topologies, and Governance frameworks.</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <a href="Balaajee_VR_Leadership_Deck.pdf" target="_blank" class="btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Download Master PDF (1.3 MB)</span>
          </a>
          <a href="/leadership-deck" target="_blank" class="btn-secondary">
            <span>Open Standalone Presenter Mode</span>
            &rarr;
          </a>
        </div>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-lg); margin-bottom: 5rem;">
        <div style="aspect-ratio: 16 / 9; width: 100%; border-radius: var(--radius-md); overflow: hidden; background: #0D1B2E; box-shadow: var(--shadow-md);">
          <iframe src="/leadership-deck" style="width: 100%; height: 100%; border: none;" title="Balaajee VR Executive Leadership Deck"></iframe>
        </div>
      </div>
    </div>

    <!-- ========================================================================
         TAB 4: PRIVATE RECRUITMENT COMMAND CENTER (PIPELINE HUB)
         ======================================================================== -->
    <div id="section-admin" class="tab-section-container">
      <div class="admin-hub-dashboard" id="adminHubContent" style="display: none;">
        <div class="pipeline-summary-bar">
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--text-main);">European Target Account Pipeline &bull; Executive Command</h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Private tracking: Netherlands &bull; Sweden &bull; Germany (€140k–€180k+ High Income &amp; Settlement Synergies)</p>
          </div>
          <button onclick="lockAdminHub()" class="btn-secondary" style="font-size: 12px; padding: 6px 14px;">Lock Dashboard</button>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Company</th>
                <th>Location</th>
                <th>Target Roles</th>
                <th>Comp Benchmark</th>
                <th>Key Strategic Hook</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="margin-tag-pass">TIER 1</span></td>
                <td><strong>ASML</strong></td>
                <td>Veldhoven, NL</td>
                <td>Head of UX / Senior Design Manager</td>
                <td>€145k &ndash; €175k + 30% Ruling</td>
                <td>Lithography tool software complexity; ex-IBM/Zebra hardware diagnostics match.</td>
              </tr>
              <tr>
                <td><span class="margin-tag-pass">TIER 1</span></td>
                <td><strong>Ericsson HQ</strong></td>
                <td>Stockholm, SE</td>
                <td>Principal UX / Design Director</td>
                <td>1.3M &ndash; 1.6M SEK</td>
                <td>Ex-Ericsson Global Hack-fest 1st place winner. Zero ramp-up time.</td>
              </tr>
              <tr>
                <td><span class="margin-tag-pass">TIER 1</span></td>
                <td><strong>Booking.com</strong></td>
                <td>Amsterdam, NL</td>
                <td>Senior Design Manager</td>
                <td>€140k &ndash; €170k + 30% Ruling</td>
                <td>High-scale platform operations and design team mentorship.</td>
              </tr>
              <tr>
                <td><span class="margin-tag-pass">TIER 1</span></td>
                <td><strong>Volvo Group / Scania</strong></td>
                <td>Gothenburg / Södertälje, SE</td>
                <td>UX Product Manager / Automotive Lead</td>
                <td>1.2M &ndash; 1.5M SEK</td>
                <td>Ex-ZF Wabco heavy vehicle telematics and European safety standards.</td>
              </tr>
              <tr>
                <td><span style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-gold); font-weight: 700;">TIER 2</span></td>
                <td><strong>Miro / TomTom</strong></td>
                <td>Amsterdam, NL</td>
                <td>Staff Product Designer / Manager</td>
                <td>€135k &ndash; €160k</td>
                <td>Modern collaboration tooling &amp; navigation telematics.</td>
              </tr>
              <tr>
                <td><span style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-gold); font-weight: 700;">TIER 2</span></td>
                <td><strong>SAP / Siemens</strong></td>
                <td>Walldorf / Munich, DE</td>
                <td>Senior Design Manager &bull; DesignOps</td>
                <td>€130k &ndash; €165k + EU Blue Card</td>
                <td>Enterprise B2B ERP modernization and Carbon token pipelines.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </main>

  <!-- PASSWORD GATE MODAL -->
  <div class="admin-gate-modal" id="adminGateModal">
    <div class="admin-gate-card">
      <div class="admin-gate-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
      </div>
      <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--text-main);">Private Pipeline Command Center</h3>
      <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 6px;">Confidential European account targeting &amp; settlement tracker. Enter passcode:</p>
      
      <div class="admin-input-group">
        <input type="password" id="adminPasscode" class="admin-passcode-input" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" onkeypress="checkPasscodeEnter(event)">
        <button onclick="submitPasscode()" class="btn-primary" style="justify-content: center; width: 100%;">Unlock Pipeline Dashboard</button>
      </div>
      <button onclick="closeAdminGate()" style="background: none; border: none; font-size: 12px; color: var(--text-muted); cursor: pointer; text-decoration: underline;">Cancel &amp; Return</button>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="executive-footer">
    <div class="container footer-grid">
      <div class="footer-info">
        <h4>BALAAJEE V.R.</h4>
        <p>Senior UI/UX Design Manager &bull; Enterprise AI &amp; Complex B2B Systems</p>
      </div>
      <div class="footer-links">
        <a href="mailto:vrbberaj@gmail.com" class="footer-link">vrbberaj@gmail.com</a>
        <a href="https://behance.net/balaajeeVR" target="_blank" class="footer-link">Behance</a>
        <a href="resume.pdf" target="_blank" class="footer-link">Corporate CV (PDF)</a>
        <a href="Balaajee_VR_Leadership_Deck.pdf" target="_blank" class="footer-link">Leadership Deck (PDF)</a>
      </div>
    </div>
  </footer>

  <script>
    /* Tab Switcher */
    function switchMainTab(tabId) {
      document.querySelectorAll('.nav-pill').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.getElementById(\`tab-btn-\${tabId}\`);
      if (activeBtn) activeBtn.classList.add('active');

      document.querySelectorAll('.tab-section-container').forEach(sec => sec.classList.remove('active-tab'));
      const targetSec = document.getElementById(\`section-\${tabId}\`);
      if (targetSec) {
        targetSec.classList.add('active-tab');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    /* Category Filtering */
    function filterCases(category, btn) {
      document.querySelectorAll('.filter-pills-row .filter-pill, .nav-pills .nav-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.case-study-showcase').forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    /* Deep Dive Accordion Toggle */
    function toggleDeepDive(id, btn) {
      const panel = document.getElementById(id);
      if (!panel) return;
      const isOpen = panel.classList.contains('open');
      if (isOpen) {
        panel.classList.remove('open');
        btn.innerHTML = \`<span>📖 Read Full UI/UX Design Case Study &amp; Interview Defense</span> <span style="font-size: 11px;">▼</span>\`;
      } else {
        panel.classList.add('open');
        btn.innerHTML = \`<span>▲ Collapse Deep Dive</span>\`;
      }
    }

    /* Dual Theme Toggle */
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme') || 'light';
      const target = current === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', target);
      localStorage.setItem('balaajee_theme', target);

      const iconSun = document.getElementById('themeIconSun');
      const iconMoon = document.getElementById('themeIconMoon');
      
      if (target === 'dark') {
        iconSun.style.display = 'none';
        iconMoon.style.display = 'block';
      } else {
        iconSun.style.display = 'block';
        iconMoon.style.display = 'none';
      }
    }

    (function initTheme() {
      const saved = localStorage.getItem('balaajee_theme');
      if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        const iconSun = document.getElementById('themeIconSun');
        const iconMoon = document.getElementById('themeIconMoon');
        if (iconSun && iconMoon) {
          iconSun.style.display = 'none';
          iconMoon.style.display = 'block';
        }
      }
    })();

    /* Admin Hub Modal Gate */
    let isAdminUnlocked = false;

    function openAdminGate() {
      if (isAdminUnlocked) {
        showAdminHub();
      } else {
        document.getElementById('adminGateModal').style.display = 'flex';
        document.getElementById('adminPasscode').focus();
      }
    }

    function closeAdminGate() {
      document.getElementById('adminGateModal').style.display = 'none';
    }

    function checkPasscodeEnter(e) {
      if (e.key === 'Enter') submitPasscode();
    }

    function submitPasscode() {
      const code = document.getElementById('adminPasscode').value.trim();
      if (code === 'balaajee2026' || code === 'admin' || code === '1234') {
        isAdminUnlocked = true;
        closeAdminGate();
        showAdminHub();
      } else {
        alert('Incorrect passcode. Default passcode is: balaajee2026');
      }
    }

    function showAdminHub() {
      switchMainTab('admin');
      document.getElementById('adminHubContent').style.display = 'block';
    }

    function lockAdminHub() {
      isAdminUnlocked = false;
      document.getElementById('adminHubContent').style.display = 'none';
      switchMainTab('cases');
    }
  </script>

</body>
</html>
`;

fs.writeFileSync(indexPath, completeHTML, 'utf8');
console.log('Successfully written complete authentic UI/UX case studies portfolio to index.html!');
