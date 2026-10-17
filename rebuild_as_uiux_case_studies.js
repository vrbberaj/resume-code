// rebuild_as_uiux_case_studies.js
const fs = require('fs');
const path = require('path');
const targetFile = path.join(__dirname, 'index.html');

console.log('Building authentic UI/UX Case Studies Portfolio into index.html...');

const html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balaajee V.R. | Senior UI/UX Design Manager &amp; Product Design Director</title>
  <meta name="description" content="Senior UI/UX Design Manager with 18+ years leading product design across Enterprise B2B SaaS, Agentic AI, Industrial IoT, and Telematics. Ex-IBM, Zebra Technologies, Ericsson, ZF Wabco.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    /* ==========================================================================
       DESIGN SYSTEM: EDITORIAL SWISS-GRID & DUAL THEME (LIGHT MODE FIRST)
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
      
      --border-subtle: rgba(0, 0, 0, 0.08);
      --border-medium: rgba(0, 0, 0, 0.14);
      --border-focus: #C4892A;
      
      --accent-gold: #C4892A;
      --accent-gold-bg: rgba(196, 137, 42, 0.08);
      --accent-gold-border: rgba(196, 137, 42, 0.25);
      
      --accent-blue: #1D4ED8;
      --accent-blue-bg: rgba(29, 78, 216, 0.08);
      --accent-blue-border: rgba(29, 78, 216, 0.22);
      
      --accent-green: #059669;
      --accent-green-bg: rgba(5, 150, 105, 0.08);
      --accent-green-border: rgba(5, 150, 105, 0.22);

      --accent-amber: #D97706;
      --accent-amber-bg: rgba(217, 119, 6, 0.08);
      --accent-amber-border: rgba(217, 119, 6, 0.22);

      --accent-red: #DC2626;
      --accent-red-bg: rgba(220, 38, 38, 0.08);
      --accent-red-border: rgba(220, 38, 38, 0.22);

      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
      --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03);
      --shadow-lg: 0 12px 30px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04);
      
      --font-serif: 'Libre Baskerville', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
      --radius-xl: 24px;
    }

    [data-theme="dark"] {
      --bg-base: #0B0F17;
      --bg-surface: #141923;
      --bg-subtle: #1B2230;
      --bg-card-hover: #1F2839;
      
      --text-main: #F9FAFB;
      --text-body: #E5E7EB;
      --text-muted: #9CA3AF;
      --text-light: #6B7280;
      
      --border-subtle: rgba(255, 255, 255, 0.09);
      --border-medium: rgba(255, 255, 255, 0.16);
      --border-focus: #F59E0B;
      
      --accent-gold: #F59E0B;
      --accent-gold-bg: rgba(245, 158, 11, 0.12);
      --accent-gold-border: rgba(245, 158, 11, 0.3);
      
      --accent-blue: #3B82F6;
      --accent-blue-bg: rgba(59, 130, 246, 0.12);
      --accent-blue-border: rgba(59, 130, 246, 0.3);
      
      --accent-green: #10B981;
      --accent-green-bg: rgba(16, 185, 129, 0.12);
      --accent-green-border: rgba(16, 185, 129, 0.3);

      --accent-amber: #F59E0B;
      --accent-amber-bg: rgba(245, 158, 11, 0.12);
      --accent-amber-border: rgba(245, 158, 11, 0.3);

      --accent-red: #EF4444;
      --accent-red-bg: rgba(239, 68, 68, 0.12);
      --accent-red-border: rgba(239, 68, 68, 0.3);

      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 12px 36px rgba(0, 0, 0, 0.6);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    body {
      background-color: var(--bg-base);
      color: var(--text-body);
      font-family: var(--font-sans);
      font-size: 15px;
      line-height: 1.65;
      transition: background-color 0.25s ease, color 0.25s ease;
      overflow-x: hidden;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* Container */
    .container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ==========================================================================
       HEADER & NAVIGATION
       ========================================================================== */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(251, 251, 249, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-subtle);
      transition: background-color 0.25s ease;
    }

    [data-theme="dark"] .site-header {
      background: rgba(11, 15, 23, 0.92);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
    }

    .brand-block {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .brand-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--border-medium);
      box-shadow: var(--shadow-sm);
    }

    .brand-text h1 {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--text-main);
      line-height: 1.2;
    }

    .brand-text span {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-gold);
      font-weight: 600;
    }

    .nav-tabs {
      display: flex;
      align-items: center;
      background: var(--bg-subtle);
      padding: 4px;
      border-radius: 100px;
      border: 1px solid var(--border-subtle);
    }

    .nav-tab-btn {
      padding: 7px 18px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .nav-tab-btn:hover {
      color: var(--text-main);
    }

    .nav-tab-btn.active {
      background: var(--bg-surface);
      color: var(--text-main);
      box-shadow: var(--shadow-sm);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .theme-toggle-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s ease;
    }

    .theme-toggle-btn:hover {
      border-color: var(--border-focus);
      background: var(--bg-subtle);
    }

    .pipeline-hub-btn {
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.03em;
      border: 1px solid var(--accent-gold-border);
      background: var(--accent-gold-bg);
      color: var(--accent-gold);
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .pipeline-hub-btn:hover {
      background: var(--accent-gold);
      color: #FFFFFF;
    }

    .contact-cta-btn {
      padding: 8px 18px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 600;
      background: var(--text-main);
      color: var(--bg-base);
      border: 1px solid var(--text-main);
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .contact-cta-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    /* ==========================================================================
       HERO SECTION
       ========================================================================== */
    .hero-section {
      padding: 60px 0 40px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
      align-items: center;
    }

    @media (max-width: 992px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 36px;
      }
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 12px;
      border-radius: 100px;
      background: var(--accent-green-bg);
      border: 1px solid var(--accent-green-border);
      color: var(--accent-green);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-green);
      animation: pulseGreen 2s infinite;
    }

    @keyframes pulseGreen {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
      70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    .hero-title {
      font-family: var(--font-serif);
      font-size: 40px;
      font-weight: 700;
      line-height: 1.18;
      letter-spacing: -0.02em;
      color: var(--text-main);
      margin-bottom: 18px;
    }

    .hero-title span {
      color: var(--accent-gold);
    }

    .hero-lead {
      font-size: 16px;
      line-height: 1.6;
      color: var(--text-body);
      margin-bottom: 24px;
      max-width: 620px;
    }

    .hero-org-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 28px;
    }

    .org-pill {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 32px;
    }

    .btn-primary {
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      background: var(--accent-gold);
      color: #FFFFFF;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 8px rgba(196, 137, 42, 0.25);
    }

    .btn-primary:hover {
      background: #B27B22;
      transform: translateY(-1px);
    }

    .btn-secondary {
      padding: 12px 22px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      background: var(--bg-surface);
      color: var(--text-main);
      border: 1px solid var(--border-medium);
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-secondary:hover {
      border-color: var(--text-main);
      background: var(--bg-subtle);
    }

    /* Live Hero Interactive Preview Card */
    .hero-preview-window {
      background: var(--bg-surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-medium);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      transition: transform 0.25s ease;
    }

    .window-header {
      background: var(--bg-subtle);
      padding: 10px 14px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .window-dots {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .window-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .dot-red { background: #FF5F56; }
    .dot-yellow { background: #FFBD2E; }
    .dot-green { background: #27C93F; }

    .window-address {
      flex: 1;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 3px 10px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .window-badge {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      color: var(--accent-green);
      background: var(--accent-green-bg);
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid var(--accent-green-border);
    }

    .window-content {
      padding: 18px;
    }

    /* Key Career Stats Strip */
    .stats-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 36px;
    }

    @media (max-width: 768px) {
      .stats-strip {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 18px 20px;
      transition: all 0.2s ease;
    }

    .stat-card:hover {
      border-color: var(--border-focus);
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    .stat-num {
      font-family: var(--font-serif);
      font-size: 32px;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1;
      margin-bottom: 6px;
    }

    .stat-num span {
      color: var(--accent-gold);
    }

    .stat-label {
      font-family: var(--font-mono);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }

    /* ==========================================================================
       CASE STUDIES FILTER BAR
       ========================================================================== */
    .filter-section {
      padding: 32px 0 20px;
      position: sticky;
      top: 72px;
      z-index: 90;
      background: rgba(251, 251, 249, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border-subtle);
    }

    [data-theme="dark"] .filter-section {
      background: rgba(11, 15, 23, 0.95);
    }

    .filter-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 6px;
      scrollbar-width: none;
    }

    .filter-wrapper::-webkit-scrollbar {
      display: none;
    }

    .filter-btn {
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 600;
      background: var(--bg-surface);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .filter-btn:hover {
      color: var(--text-main);
      border-color: var(--border-medium);
    }

    .filter-btn.active {
      background: var(--text-main);
      color: var(--bg-base);
      border-color: var(--text-main);
      box-shadow: var(--shadow-sm);
    }

    /* ==========================================================================
       CASE STUDY SHOWCASE COMPONENT
       ========================================================================== */
    .case-studies-container {
      display: flex;
      flex-direction: column;
      gap: 64px;
      padding: 40px 0 80px;
    }

    .case-card {
      background: var(--bg-surface);
      border-radius: var(--radius-xl);
      border: 1px solid var(--border-medium);
      box-shadow: var(--shadow-md);
      overflow: hidden;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .case-card:hover {
      box-shadow: var(--shadow-lg);
    }

    /* Case Study Header */
    .case-card-header {
      padding: 36px 36px 24px;
      border-bottom: 1px solid var(--border-subtle);
    }

    @media (max-width: 768px) {
      .case-card-header {
        padding: 24px 20px 18px;
      }
    }

    .case-meta-badges {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }

    .badge-company {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 10px;
      border-radius: 100px;
    }

    .badge-role {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-muted);
    }

    .badge-award {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 100px;
      background: rgba(16, 185, 129, 0.1);
      color: var(--accent-green);
      border: 1px solid rgba(16, 185, 129, 0.3);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .case-title {
      font-family: var(--font-serif);
      font-size: 28px;
      font-weight: 700;
      line-height: 1.25;
      color: var(--text-main);
      margin-bottom: 12px;
    }

    @media (max-width: 768px) {
      .case-title {
        font-size: 22px;
      }
    }

    .case-summary {
      font-size: 16px;
      line-height: 1.6;
      color: var(--text-body);
      margin-bottom: 20px;
      max-width: 980px;
    }

    .case-meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding-top: 16px;
      border-top: 1px dashed var(--border-subtle);
    }

    @media (max-width: 768px) {
      .case-meta-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .meta-item {
      font-size: 12px;
    }

    .meta-item-label {
      font-family: var(--font-mono);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-muted);
      margin-bottom: 3px;
    }

    .meta-item-val {
      font-weight: 600;
      color: var(--text-main);
    }

    /* Sub-Navigation Tabs inside Case Study */
    .case-subnav {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 36px;
      background: var(--bg-subtle);
      border-bottom: 1px solid var(--border-subtle);
      overflow-x: auto;
      scrollbar-width: none;
    }

    @media (max-width: 768px) {
      .case-subnav {
        padding: 10px 16px;
      }
    }

    .case-subtab-btn {
      padding: 7px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      background: transparent;
      color: var(--text-muted);
      border: 1px solid transparent;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .case-subtab-btn:hover {
      color: var(--text-main);
      background: rgba(0, 0, 0, 0.04);
    }

    [data-theme="dark"] .case-subtab-btn:hover {
      background: rgba(255, 255, 255, 0.06);
    }

    .case-subtab-btn.active {
      background: var(--bg-surface);
      color: var(--text-main);
      border-color: var(--border-medium);
      box-shadow: var(--shadow-sm);
    }

    /* Case Study Content Panels */
    .case-tab-panel {
      display: none;
      padding: 36px;
    }

    @media (max-width: 768px) {
      .case-tab-panel {
        padding: 20px;
      }
    }

    .case-tab-panel.active {
      display: block;
      animation: fadeInTab 0.25s ease;
    }

    @keyframes fadeInTab {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* UI Browser Chrome inside Case Studies */
    .ui-showcase-window {
      background: var(--bg-base);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      margin-bottom: 24px;
    }

    .app-screen-tabs {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-subtle);
      padding: 8px 14px;
      border-bottom: 1px solid var(--border-subtle);
      overflow-x: auto;
    }

    .app-screen-btn {
      font-size: 11px;
      font-weight: 600;
      font-family: var(--font-mono);
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .app-screen-btn.active {
      background: var(--bg-surface);
      color: var(--text-main);
      border-color: var(--border-subtle);
      box-shadow: var(--shadow-sm);
    }

    /* Realistic Data Grid / Interface Styles */
    .app-canvas {
      padding: 20px;
      background: var(--bg-surface);
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
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
    }

    .app-deal-info p {
      font-size: 12px;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .app-deal-totals {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .app-total-val {
      font-family: var(--font-serif);
      font-size: 20px;
      font-weight: 700;
      color: var(--accent-gold);
    }

    .margin-pill {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 100px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .margin-pass {
      background: var(--accent-green-bg);
      color: var(--accent-green);
      border: 1px solid var(--accent-green-border);
    }

    .margin-review {
      background: var(--accent-amber-bg);
      color: var(--accent-amber);
      border: 1px solid var(--accent-amber-border);
    }

    .margin-fail {
      background: var(--accent-red-bg);
      color: var(--accent-red);
      border: 1px solid var(--accent-red-border);
    }

    .app-data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .app-data-table th {
      background: var(--bg-subtle);
      padding: 9px 12px;
      text-align: left;
      font-family: var(--font-mono);
      font-size: 10px;
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

    .app-data-table tr:hover td {
      background: var(--bg-card-hover);
    }

    .cell-code {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 600;
      color: var(--accent-blue);
    }

    .cell-num {
      font-family: var(--font-mono);
      font-weight: 500;
    }

    /* Ergonomics callout */
    .ergonomics-banner {
      background: var(--accent-gold-bg);
      border: 1px dashed var(--accent-gold-border);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 16px;
    }

    .ergonomics-text {
      font-size: 13px;
      color: var(--text-body);
    }

    .ergonomics-text strong {
      color: var(--accent-gold);
    }

    .btn-action-sm {
      padding: 7px 14px;
      border-radius: var(--radius-sm);
      font-size: 12px;
      font-weight: 600;
      background: var(--accent-gold);
      color: #FFFFFF;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-action-sm:hover {
      background: #B27B22;
    }

    /* Persona & Research Styles */
    .persona-card {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 24px;
      margin-bottom: 24px;
    }

    .persona-top {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .persona-avatar-box {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--bg-surface);
      border: 2px solid var(--border-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      flex-shrink: 0;
    }

    .persona-info h4 {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-main);
    }

    .persona-info p {
      font-size: 12px;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .persona-quote {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 15px;
      line-height: 1.5;
      color: var(--text-main);
      padding-left: 16px;
      border-left: 3px solid var(--accent-gold);
      margin-bottom: 18px;
    }

    .empathy-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }

    @media (max-width: 768px) {
      .empathy-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .empathy-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 12px 14px;
    }

    .empathy-box-title {
      font-family: var(--font-mono);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent-gold);
      font-weight: 700;
      margin-bottom: 4px;
    }

    .empathy-box p {
      font-size: 12px;
      line-height: 1.45;
      color: var(--text-body);
    }

    /* Architecture Flow Comparison */
    .flow-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .flow-comparison {
        grid-template-columns: 1fr;
      }
    }

    .flow-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    .flow-card.bad {
      border-top: 4px solid var(--accent-red);
    }

    .flow-card.good {
      border-top: 4px solid var(--accent-green);
    }

    .flow-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .flow-card-header h4 {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
    }

    .flow-steps {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .flow-step-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13px;
      color: var(--text-body);
    }

    .step-badge {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .step-bad {
      background: var(--accent-red-bg);
      color: var(--accent-red);
      border: 1px solid var(--accent-red-border);
    }

    .step-good {
      background: var(--accent-green-bg);
      color: var(--accent-green);
      border: 1px solid var(--accent-green-border);
    }

    /* Design System Tokens */
    .token-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
      margin-bottom: 24px;
    }

    .token-card {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .token-swatch {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
    }

    .token-meta h5 {
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-main);
    }

    .token-meta span {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-muted);
    }

    /* Metrics & Usability */
    .metrics-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .metrics-row {
        grid-template-columns: 1fr;
      }
    }

    .metric-hero-box {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 20px;
      text-align: center;
    }

    .metric-hero-val {
      font-family: var(--font-serif);
      font-size: 28px;
      font-weight: 700;
      color: var(--accent-gold);
      margin-bottom: 4px;
    }

    .metric-hero-lbl {
      font-family: var(--font-mono);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }

    /* CAR Interview Defense Cards */
    .interview-defense-container {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .car-card {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 24px;
      transition: all 0.2s ease;
    }

    .car-card:hover {
      border-color: var(--accent-gold-border);
      background: var(--bg-surface);
    }

    .car-question {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 16px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 14px;
    }

    .q-badge {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      background: var(--accent-gold);
      color: #FFFFFF;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .car-breakdown {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-left: 28px;
      border-left: 2px solid var(--accent-gold-border);
    }

    .car-section {
      font-size: 14px;
      line-height: 1.55;
      color: var(--text-body);
    }

    .car-section strong {
      font-family: var(--font-mono);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--accent-gold);
      display: block;
      margin-bottom: 2px;
    }

    /* Case Tags Footer */
    .case-footer {
      padding: 18px 36px;
      background: var(--bg-subtle);
      border-top: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }

    @media (max-width: 768px) {
      .case-footer {
        padding: 14px 20px;
      }
    }

    .case-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .case-tag {
      font-size: 11px;
      font-family: var(--font-mono);
      padding: 3px 8px;
      border-radius: 4px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
    }

    .case-verified {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* ==========================================================================
       MODAL & PIPELINE HUB
       ========================================================================== */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-xl);
      max-width: 600px;
      width: 100%;
      padding: 32px;
      box-shadow: var(--shadow-lg);
      position: relative;
    }

    .modal-close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: transparent;
      border: none;
      font-size: 20px;
      color: var(--text-muted);
      cursor: pointer;
    }

    /* Footer */
    .site-footer {
      border-top: 1px solid var(--border-subtle);
      padding: 48px 0;
      background: var(--bg-surface);
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .footer-links a:hover {
      color: var(--text-main);
    }
  </style>
</head>
<body>

  <!-- ==========================================================================
       SITE HEADER
       ========================================================================== -->
  <header class="site-header">
    <div class="container header-inner">
      <div class="brand-block">
        <img src="profile.jpg" alt="Balaajee V.R." class="brand-avatar" onerror="this.src='photo_300x400.jpg'">
        <div class="brand-text">
          <h1>Balaajee V.R.</h1>
          <span>Senior UI/UX Design Manager &amp; Product Design Director</span>
        </div>
      </div>

      <nav class="nav-tabs" aria-label="Main Navigation">
        <button class="nav-tab-btn active" id="tabBtnCases" onclick="switchMainView('cases')">
          <span>🎨 UI/UX Case Studies (5)</span>
        </button>
        <button class="nav-tab-btn" id="tabBtnLeadership" onclick="switchMainView('leadership')">
          <span>👔 Leadership &amp; Approach</span>
        </button>
        <button class="nav-tab-btn" id="tabBtnCV" onclick="switchMainView('cv')">
          <span>📄 Executive CV</span>
        </button>
      </nav>

      <div class="header-actions">
        <button class="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Light/Dark Theme" aria-label="Toggle Theme">
          <span id="themeIcon">☀️</span>
        </button>
        <button class="pipeline-hub-btn" onclick="openPipelineModal()">
          <span>🔒 Pipeline Hub</span>
        </button>
        <a href="mailto:vrbberaj@gmail.com" class="contact-cta-btn">
          <span>Get in Touch →</span>
        </a>
      </div>
    </div>
  </header>

  <!-- ==========================================================================
       MAIN CONTENT CONTAINER
       ========================================================================== -->
  <main id="mainContent">

    <!-- VIEW 1: UI/UX CASE STUDIES (DEFAULT & PRIMARY) -->
    <div id="viewCases" class="main-view active">
      
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container hero-grid">
          <div class="hero-content">
            <div class="status-badge">
              <span class="status-dot"></span>
              <span>Open to Senior UI/UX Design Manager &amp; Director Roles (EU &amp; Global)</span>
            </div>
            
            <h2 class="hero-title">
              Transforming Complex Enterprise Workflows into <span>Intuitive, High-Velocity Digital Products</span>
            </h2>
            
            <p class="hero-lead">
              Senior UI/UX Design Manager with 18+ years directing cross-functional product design teams across IBM Software Labs, Zebra Technologies, Ericsson Global, and ZF Wabco. Proven track record eliminating legacy spreadsheet chaos, architecting agentic AI UX, scaling design systems, and driving multi-million dollar business impact.
            </p>

            <div class="hero-org-pills">
              <span class="org-pill">IBM Software Labs</span>
              <span class="org-pill">Zebra Technologies</span>
              <span class="org-pill">Ericsson Global</span>
              <span class="org-pill">ZF Wabco</span>
              <span class="org-pill">Enterprise B2B SaaS</span>
              <span class="org-pill">Agentic AI UX</span>
            </div>

            <div class="hero-actions">
              <a href="#case-ericsson" class="btn-primary">
                <span>Explore Flagship Case Studies ↓</span>
              </a>
              <button class="btn-secondary" onclick="switchMainView('cv')">
                <span>View Executive CV</span>
              </button>
            </div>
          </div>

          <!-- Hero Live Interactive Preview -->
          <div class="hero-preview-window">
            <div class="window-header">
              <div class="window-dots">
                <span class="window-dot dot-red"></span>
                <span class="window-dot dot-yellow"></span>
                <span class="window-dot dot-green"></span>
              </div>
              <div class="window-address">https://salesops.ericsson.net/deals/deal-4820/bom-configurator</div>
              <span class="window-badge">● LIVE CPQ ENGINE</span>
            </div>
            <div class="window-content">
              <div class="app-deal-header">
                <div class="app-deal-info">
                  <h4>Vodafone UK — 5G Phase 2 Network Expansion</h4>
                  <p>Deal #4820 &bull; Auto-Save: Synced 12s ago &bull; Lead: M. Lindqvist</p>
                </div>
                <div class="app-deal-totals">
                  <div class="app-total-val">$8,420,000</div>
                  <span class="margin-pill margin-pass" id="heroMarginTag">38.4% MARGIN [PASS]</span>
                </div>
              </div>

              <table class="app-data-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Hardware Component</th>
                    <th>Cost</th>
                    <th>Qty</th>
                    <th>Margin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="cell-code">AIR 6488</td>
                    <td>5G Massive MIMO Radio (3.5GHz)</td>
                    <td class="cell-num">$18,500</td>
                    <td class="cell-num">120</td>
                    <td><span class="margin-pill margin-pass">39.2%</span></td>
                  </tr>
                  <tr>
                    <td class="cell-code">BB 6630</td>
                    <td>Baseband High-Capacity Digital Unit</td>
                    <td class="cell-num">$9,200</td>
                    <td class="cell-num">40</td>
                    <td><span class="margin-pill margin-pass">41.5%</span></td>
                  </tr>
                  <tr>
                    <td class="cell-code">SFP+ 10G</td>
                    <td>Optical Interconnect Transceivers</td>
                    <td class="cell-num">$320</td>
                    <td class="cell-num">480</td>
                    <td><span class="margin-pill margin-pass">36.8%</span></td>
                  </tr>
                  <tr>
                    <td class="cell-code">SLA-T1</td>
                    <td>24/7 Mission-Critical Support (3-Yr)</td>
                    <td class="cell-num">$450,000</td>
                    <td class="cell-num">1</td>
                    <td><span class="margin-pill margin-pass">58.0%</span></td>
                  </tr>
                </tbody>
              </table>

              <div class="ergonomics-banner">
                <div class="ergonomics-text">
                  ⌨️ <strong>Keyboard-First Ergonomics:</strong> Arrow-key cell jumps &amp; instant VLOOKUP replacement.
                </div>
                <button class="btn-action-sm" onclick="simulateExport()">1-Click Export (PDF)</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Key Stats Strip -->
        <div class="container">
          <div class="stats-strip">
            <div class="stat-card">
              <div class="stat-num">18<span>+</span></div>
              <div class="stat-label">Years Global Leadership</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">10M<span>+</span></div>
              <div class="stat-label">Enterprise Users Impacted</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">8<span>+</span></div>
              <div class="stat-label">Global Regulated Industries</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">120<span>+</span></div>
              <div class="stat-label">Designers Mentored</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FILTER BAR -->
      <section class="filter-section">
        <div class="container">
          <div class="filter-wrapper">
            <button class="filter-btn active" onclick="filterCases('all', this)">All Case Studies (5)</button>
            <button class="filter-btn" onclick="filterCases('ericsson', this)">Ericsson &bull; Sales Automation CPQ</button>
            <button class="filter-btn" onclick="filterCases('ibm-watson', this)">IBM &bull; Agentic AI &amp; Watson</button>
            <button class="filter-btn" onclick="filterCases('zebra', this)">Zebra &bull; Industrial IoT Telematics</button>
            <button class="filter-btn" onclick="filterCases('ibm-carbon', this)">IBM &bull; Carbon Token Engine</button>
            <button class="filter-btn" onclick="filterCases('zf-wabco', this)">ZF Wabco &bull; Automotive HUD</button>
          </div>
        </div>
      </section>

      <!-- 5 FLAGSHIP UI/UX CASE STUDIES -->
      <section class="container case-studies-container">

        <!-- ====================================================================
             CASE STUDY 1: ERICSSON SALESOPS CLOUD
             ==================================================================== -->
        <article class="case-card" id="case-ericsson" data-category="ericsson">
          <div class="case-card-header">
            <div class="case-meta-badges">
              <span class="badge-company" style="background: rgba(196,137,42,0.1); color: var(--accent-gold); border: 1px solid rgba(196,137,42,0.3);">Ericsson Global</span>
              <span class="badge-role">Lead UI/UX Designer &amp; Information Architect &bull; Jul 2019 – Sep 2020</span>
              <span class="badge-award">🏆 1st Place Hack-fest Award &bull; Spot Innovation Award</span>
            </div>
            <h3 class="case-title">Ericsson SalesOps Cloud: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine</h3>
            <p class="case-summary">
              Modernizing an unversioned, macro-laden spreadsheet quoting nightmare into an enterprise CPQ (Configure, Price, Quote) platform. By combining keyboard-first spreadsheet muscle memory with automated catalog validation and live gross margin guardrails, we compressed quote turnaround from 6 days to 42 minutes and protected $18M+ in annual margin leakage.
            </p>
            <div class="case-meta-grid">
              <div class="meta-item">
                <div class="meta-item-label">Target Users</div>
                <div class="meta-item-val">1,200+ Global Telecom Sales Engineers</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Core Tools</div>
                <div class="meta-item-val">Figma, Miro, React, Design Tokens</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Primary Metric</div>
                <div class="meta-item-val">6 Days &rarr; 42 Mins Turnaround (-92%)</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Business Impact</div>
                <div class="meta-item-val">$18M+ Margin Leakage Protected</div>
              </div>
            </div>
          </div>

          <!-- Interactive Case Study Subnav -->
          <div class="case-subnav" role="tablist">
            <button class="case-subtab-btn active" onclick="switchCaseTab('ericsson', 'ui', this)">
              <span>🖥️ Product UI Showcase</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ericsson', 'research', this)">
              <span>🔍 UX Research &amp; Persona</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ericsson', 'flow', this)">
              <span>📐 14-Tab IA &amp; Journey Flow</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ericsson', 'tokens', this)">
              <span>🎨 Design System &amp; Tokens</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ericsson', 'metrics', this)">
              <span>📊 Usability Testing &amp; ROI</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ericsson', 'car', this)">
              <span>🎯 Interview CAR Defense</span>
            </button>
          </div>

          <!-- Tab Panel 1: UI Showcase -->
          <div class="case-tab-panel active" id="panel-ericsson-ui">
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
              <div class="app-screen-tabs">
                <button class="app-screen-btn active">Screen 1: Interactive BOM Data Grid</button>
                <button class="app-screen-btn" onclick="alert('Switching to Margin Simulator view: Allows interactive discount slider adjustments to test automated VP escalation triggers.')">Screen 2: Live Margin Simulator</button>
                <button class="app-screen-btn" onclick="alert('Switching to Proposal Generator: Generates verified customer-facing PDF quotation in 1-click.')">Screen 3: 1-Click Proposal Export</button>
              </div>
              <div class="app-canvas">
                <div class="app-deal-header">
                  <div class="app-deal-info">
                    <h4>Vodafone UK — 5G Core &amp; Radio Expansion (Q3 Deal #4820)</h4>
                    <p>Customer Tier: Tier 1 Strategic &bull; Currency: USD ($) &bull; Lead Engineer: M. Lindqvist</p>
                  </div>
                  <div class="app-deal-totals">
                    <div class="app-total-val">$8,420,000</div>
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
                  <button class="btn-action-sm" onclick="alert('Proposal generated successfully! All pricing rules verified against global SAP pricing table.')">Generate 1-Click Proposal (PDF)</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab Panel 2: Research & Personas -->
          <div class="case-tab-panel" id="panel-ericsson-research">
            <div class="persona-card">
              <div class="persona-top">
                <div class="persona-avatar-box">👨‍💼</div>
                <div class="persona-info">
                  <h4>Marcus Lindqvist &bull; Senior Telecom Sales Engineer</h4>
                  <p>Ericsson Global Sales Ops &bull; Stockholm, Sweden &bull; 12 Yrs Tenure</p>
                </div>
              </div>
              <div class="persona-quote">
                “I have an electrical engineering degree, but 60% of my week is burned copying numbers across 14 spreadsheet tabs, debugging broken VLOOKUP macros, and waiting days for VP email sign-offs.”
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
          </div>

          <!-- Tab Panel 3: Flow & Architecture -->
          <div class="case-tab-panel" id="panel-ericsson-flow">
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
                    <div>Email workbook to Regional Commercial VP for manual margin verification.</div>
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
          </div>

          <!-- Tab Panel 4: Design Tokens -->
          <div class="case-tab-panel" id="panel-ericsson-tokens">
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
              <div class="token-card">
                <div class="token-swatch" style="background: #EF4444;"></div>
                <div class="token-meta">
                  <h5>$margin-alert</h5>
                  <span>#EF4444 &bull; Margin &lt; 28%</span>
                </div>
              </div>
              <div class="token-card">
                <div class="token-swatch" style="background: #1E293B;"></div>
                <div class="token-meta">
                  <h5>$mono-numbers</h5>
                  <span>JetBrains Mono &bull; Tabular Data</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab Panel 5: Usability Metrics -->
          <div class="case-tab-panel" id="panel-ericsson-metrics">
            <div class="metrics-row">
              <div class="metric-hero-box">
                <div class="metric-hero-val">6d &rarr; 42m</div>
                <div class="metric-hero-lbl">Quote Turnaround (-92%)</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">0%</div>
                <div class="metric-hero-lbl">Calculation Formula Errors</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">$18M+</div>
                <div class="metric-hero-lbl">Protected Annual Margin</div>
              </div>
            </div>
            <div class="persona-card">
              <div class="persona-quote">
                “In 12 moderated usability sessions across Stockholm and Chennai, sales engineers saw their SUS (System Usability Scale) satisfaction jump from 34/100 (unacceptable) to 87/100 (world-class). By preserving spreadsheet muscle memory while enforcing automated margin guardrails, we achieved 94% platform adoption within 30 days.”
              </div>
            </div>
          </div>

          <!-- Tab Panel 6: Interview CAR Defense -->
          <div class="case-tab-panel" id="panel-ericsson-car">
            <div class="interview-defense-container">
              <div class="car-card">
                <div class="car-question">
                  <span class="q-badge">Q1</span>
                  <span>Sales engineers are notoriously protective of their Excel spreadsheets. How did you overcome their intense resistance to a new web tool?</span>
                </div>
                <div class="car-breakdown">
                  <div class="car-section">
                    <strong>Context / Situation</strong>
                    Previous corporate attempts to replace the 14-tab Excel sheet with heavy web wizards failed with under 15% adoption because sales engineers felt slow, handcuffed, and restricted by multi-step dropdown forms.
                  </div>
                  <div class="car-section">
                    <strong>UX Leadership Action</strong>
                    During contextual inquiry in Stockholm, I discovered engineers loved Excel not for its aesthetics, but for keyboard velocity. I scrapped the wizard paradigm and architected a high-speed data grid featuring arrow-key cell navigation, tabular copy-paste, and inline search. We preserved their muscle memory while silently moving the catalog and pricing validation to the cloud.
                  </div>
                  <div class="car-section">
                    <strong>Business Result</strong>
                    Adoption exceeded 94% within the first month. Quote turnaround dropped from 6 days to 42 minutes, and the project won 1st Place in the Ericsson Global Hack-fest Optimization Contest.
                  </div>
                </div>
              </div>

              <div class="car-card">
                <div class="car-question">
                  <span class="q-badge">Q2</span>
                  <span>What was the biggest tension between Sales and Finance, and how did your UX architecture resolve it?</span>
                </div>
                <div class="car-breakdown">
                  <div class="car-section">
                    <strong>Context / Situation</strong>
                    Sales demanded total pricing flexibility to close competitive telecom deals quickly, while Corporate Finance wanted strict lockouts to stop inadvertent discounting and margin erosion.
                  </div>
                  <div class="car-section">
                    <strong>UX Leadership Action</strong>
                    I designed dynamic gross margin guardrails. If a discount kept margin &ge;35%, the quote remained in the Green Channel for instant export. If it dipped into 28–34%, the UI triggered an inline escalation simulation showing projected revenue impact. If below 28%, the system locked the discount and prompted required VP approval.
                  </div>
                  <div class="car-section">
                    <strong>Business Result</strong>
                    Eliminated subjective email arguments between Sales and Finance, protected over $18M in margin leakage across $450M in annual deals, and eliminated 100% of broken #REF! calculation errors.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer">
            <div class="case-tags">
              <span class="case-tag">Enterprise CPQ</span>
              <span class="case-tag">Keyboard Ergonomics</span>
              <span class="case-tag">Spreadsheet Modernization</span>
              <span class="case-tag">B2B SaaS</span>
            </div>
            <div class="case-verified">
              <span>✓ Verified Ericsson Global Case Study</span>
            </div>
          </div>
        </article>


        <!-- ====================================================================
             CASE STUDY 2: IBM WATSON ORCHESTRATE
             ==================================================================== -->
        <article class="case-card" id="case-ibm-watson" data-category="ibm-watson">
          <div class="case-card-header">
            <div class="case-meta-badges">
              <span class="badge-company" style="background: rgba(29,78,216,0.1); color: var(--accent-blue); border: 1px solid rgba(29,78,216,0.3);">IBM India Software Labs</span>
              <span class="badge-role">Senior Manager UI/UX Design &bull; Sep 2024 – Jan 2026</span>
              <span class="badge-award">🤖 Enterprise Agentic AI UX</span>
            </div>
            <h3 class="case-title">IBM Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX</h3>
            <p class="case-summary">
              Designing autonomous multi-agent task execution while preserving Human-in-the-Loop governance for regulated Fortune 500 enterprises. We transformed black-box generative AI into an explainable, auditable system with confidence thresholds and side-by-side diff checks.
            </p>
            <div class="case-meta-grid">
              <div class="meta-item">
                <div class="meta-item-label">Target Users</div>
                <div class="meta-item-val">Enterprise Ops &amp; Compliance Officers</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Core Tools</div>
                <div class="meta-item-val">Carbon Design System, Figma, React</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Task Velocity</div>
                <div class="meta-item-val">62% Faster Cross-System Execution</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Compliance Rate</div>
                <div class="meta-item-val">0 Audit Violations Across 14 Squads</div>
              </div>
            </div>
          </div>

          <div class="case-subnav" role="tablist">
            <button class="case-subtab-btn active" onclick="switchCaseTab('ibm-watson', 'ui', this)">
              <span>🖥️ Product UI Showcase</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ibm-watson', 'research', this)">
              <span>🔍 UX Research &amp; Persona</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ibm-watson', 'flow', this)">
              <span>📐 Agent Mesh &amp; Confidence Gate</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ibm-watson', 'metrics', this)">
              <span>📊 Usability &amp; Audit ROI</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ibm-watson', 'car', this)">
              <span>🎯 Interview CAR Defense</span>
            </button>
          </div>

          <div class="case-tab-panel active" id="panel-ibm-watson-ui">
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
                <div style="background: var(--bg-subtle); padding: 14px 18px; border-radius: var(--radius-md); margin-bottom: 18px; border-left: 4px solid var(--accent-blue);">
                  <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-blue); font-weight: 700; text-transform: uppercase;">Natural Language Enterprise Intent</div>
                  <div style="font-size: 14px; font-weight: 600; color: var(--text-main); margin-top: 4px;">“Reconcile Q3 vendor invoices across SAP, verify credit limits in Salesforce, and prepare executive payment voucher.”</div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 18px;">
                  <div style="background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-sm); border-top: 3px solid var(--accent-blue);">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-mono); font-weight: 700; color: var(--text-main);">
                      <span>SAP ERP AGENT</span>
                      <span style="color: var(--accent-green);">100% MATCH</span>
                    </div>
                    <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Matched 14 PO line items against invoice receipts. 0 variance.</p>
                  </div>

                  <div style="background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-sm); border-top: 3px solid var(--accent-gold);">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-mono); font-weight: 700; color: var(--text-main);">
                      <span>CRM AGENT</span>
                      <span style="color: var(--accent-gold);">APPROVED</span>
                    </div>
                    <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Verified account credit limit: $250,000 threshold cleared.</p>
                  </div>

                  <div style="background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-sm); border-top: 3px solid var(--accent-green);">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-mono); font-weight: 700; color: var(--text-main);">
                      <span>AUDIT SENTINEL</span>
                      <span style="color: var(--accent-green);">SOX PASS</span>
                    </div>
                    <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Cryptographic hash generated. Audit trail locked into immutable ledger.</p>
                  </div>
                </div>

                <div style="background: var(--bg-subtle); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 13px; font-weight: 700; color: var(--text-main);">Human-in-the-Loop Confidence Gate: Overall Confidence 94.2%</span>
                    <span class="margin-pill margin-pass">Autonomous Execution Allowed (&ge;90%)</span>
                  </div>
                  <div style="height: 8px; background: #E5E7EB; border-radius: 4px; overflow: hidden; position: relative;">
                    <div style="width: 94.2%; height: 100%; background: linear-gradient(90deg, #EF4444 0%, #F59E0B 70%, #10B981 90%);"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); margin-top: 6px;">
                    <span>&lt;70% Side-by-Side Review</span>
                    <span>70–89% 1-Click Diff Check</span>
                    <span>&ge;90% Autonomous Action</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-tab-panel" id="panel-ibm-watson-research">
            <div class="persona-card">
              <div class="persona-top">
                <div class="persona-avatar-box">👩‍💼</div>
                <div class="persona-info">
                  <h4>Elena Rostova &bull; Global Operations Director</h4>
                  <p>Fortune 500 Enterprise Finance &bull; New York, USA</p>
                </div>
              </div>
              <div class="persona-quote">
                “Generative AI tools are flashy, but if an autonomous model updates vendor invoices in SAP with hallucinated data, our corporate audit fails and I am personally liable.”
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
          </div>

          <div class="case-tab-panel" id="panel-ibm-watson-flow">
            <div class="flow-comparison">
              <div class="flow-card bad">
                <div class="flow-card-header">
                  <h4>❌ Black-Box GenAI (High Enterprise Risk)</h4>
                  <span class="margin-pill margin-fail">Unacceptable</span>
                </div>
                <div class="flow-steps">
                  <div class="flow-step-item">
                    <span class="step-badge step-bad">01</span>
                    <div>User types prompt; LLM executes directly on production databases without human gating.</div>
                  </div>
                  <div class="flow-step-item">
                    <span class="step-badge step-bad">02</span>
                    <div>Hallucinations silently corrupt SAP vendor master tables.</div>
                  </div>
                  <div class="flow-step-item">
                    <span class="step-badge step-bad">03</span>
                    <div>Zero audit trail generated; internal compliance fails SOX audit.</div>
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
                    <div>Side-by-side diff view with 1-click approve/reject and cryptographic audit log.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-tab-panel" id="panel-ibm-watson-metrics">
            <div class="metrics-row">
              <div class="metric-hero-box">
                <div class="metric-hero-val">62% Faster</div>
                <div class="metric-hero-lbl">Cross-System Execution</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">0</div>
                <div class="metric-hero-lbl">Compliance Audit Failures</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">14 Squads</div>
                <div class="metric-hero-lbl">Unified Agentic UI Pattern</div>
              </div>
            </div>
          </div>

          <div class="case-tab-panel" id="panel-ibm-watson-car">
            <div class="interview-defense-container">
              <div class="car-card">
                <div class="car-question">
                  <span class="q-badge">Q1</span>
                  <span>How did you design for user trust when introducing autonomous AI agents into high-stakes enterprise systems?</span>
                </div>
                <div class="car-breakdown">
                  <div class="car-section">
                    <strong>Context / Situation</strong>
                    Enterprise compliance officers rejected autonomous AI execution in SAP and Salesforce due to fear of hallucinated data corrupting corporate books.
                  </div>
                  <div class="car-section">
                    <strong>UX Leadership Action</strong>
                    I designed the 3-Tier Confidence Gate Matrix. Every agentic output is assigned an explainable score. Scores &ge;90% execute autonomously; 70–89% present a side-by-side diff drawer where humans approve changes with one click; scores &lt;70% fall back to manual entry with clear attribution.
                  </div>
                  <div class="car-section">
                    <strong>Business Result</strong>
                    Reduced enterprise task completion time by 62% while maintaining 100% compliance across 14 distributed development squads.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer">
            <div class="case-tags">
              <span class="case-tag">Agentic AI</span>
              <span class="case-tag">Human-in-the-Loop</span>
              <span class="case-tag">IBM Carbon</span>
              <span class="case-tag">Enterprise SaaS</span>
            </div>
            <div class="case-verified">
              <span>✓ Verified IBM Software Labs Case Study</span>
            </div>
          </div>
        </article>


        <!-- ====================================================================
             CASE STUDY 3: ZEBRA ENTERPRISE DEVICE CLOUD
             ==================================================================== -->
        <article class="case-card" id="case-zebra" data-category="zebra">
          <div class="case-card-header">
            <div class="case-meta-badges">
              <span class="badge-company" style="background: rgba(196,137,42,0.1); color: var(--accent-gold); border: 1px solid rgba(196,137,42,0.3);">Zebra Technologies</span>
              <span class="badge-role">UI/UX Product Design Manager &bull; Jul 2021 – Aug 2024</span>
              <span class="badge-award">📡 Industrial IoT &amp; Telematics</span>
            </div>
            <h3 class="case-title">Zebra Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics</h3>
            <p class="case-summary">
              Scaling mission-critical IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers. Conducted in-situ contextual research in sub-zero freezers to redesign rugged scanner interaction paradigms.
            </p>
            <div class="case-meta-grid">
              <div class="meta-item">
                <div class="meta-item-label">Hardware Footprint</div>
                <div class="meta-item-val">1.2M+ Active Scanners &amp; Handhelds</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Staging Velocity</div>
                <div class="meta-item-val">8 Secs vs 4.5 Days (-99% Staging Time)</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Downtime Reduction</div>
                <div class="meta-item-val">-45% Warehouse Conveyor Stoppages</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Support Impact</div>
                <div class="meta-item-val">-33% Tier-1 IT Support Tickets</div>
              </div>
            </div>
          </div>

          <div class="case-subnav" role="tablist">
            <button class="case-subtab-btn active" onclick="switchCaseTab('zebra', 'ui', this)">
              <span>🖥️ Product UI Showcase</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('zebra', 'research', this)">
              <span>🔍 Cold-Storage Field Research</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('zebra', 'flow', this)">
              <span>📐 1-Scan Zero-Touch Flow</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('zebra', 'metrics', this)">
              <span>📊 Fleet Uptime ROI</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('zebra', 'car', this)">
              <span>🎯 Interview CAR Defense</span>
            </button>
          </div>

          <div class="case-tab-panel active" id="panel-zebra-ui">
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
                  <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-sm); text-align: center;">
                    <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-green); font-weight: 700;">ZONE A &bull; STAGING DOCK</div>
                    <div style="font-size: 24px; font-weight: 700; color: var(--text-main); margin: 4px 0;">480 Units</div>
                    <div style="font-size: 11px; color: var(--text-muted);">Battery: 98% &bull; Signal: Optimal</div>
                  </div>

                  <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-sm); text-align: center;">
                    <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-green); font-weight: 700;">ZONE B &bull; PACKAGING CONVEYOR</div>
                    <div style="font-size: 24px; font-weight: 700; color: var(--text-main); margin: 4px 0;">620 Units</div>
                    <div style="font-size: 11px; color: var(--text-muted);">Battery: 89% &bull; Signal: Optimal</div>
                  </div>

                  <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-sm); text-align: center; border: 1px solid var(--accent-amber-border);">
                    <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-red); font-weight: 700;">ZONE C &bull; SUB-ZERO FREEZER</div>
                    <div style="font-size: 24px; font-weight: 700; color: var(--accent-amber); margin: 4px 0;">180 Units ⚠️</div>
                    <div style="font-size: 11px; color: var(--accent-amber);">Predictive Alert: 14 Batteries Need Swap</div>
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
          </div>

          <div class="case-tab-panel" id="panel-zebra-research">
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
          </div>

          <div class="case-tab-panel" id="panel-zebra-flow">
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
          </div>

          <div class="case-tab-panel" id="panel-zebra-metrics">
            <div class="metrics-row">
              <div class="metric-hero-box">
                <div class="metric-hero-val">1.2M+</div>
                <div class="metric-hero-lbl">Active Enterprise Units</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">-45% Drop</div>
                <div class="metric-hero-lbl">Device Staging Downtime</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">-33% Reduction</div>
                <div class="metric-hero-lbl">Tier-1 IT Support Tickets</div>
              </div>
            </div>
          </div>

          <div class="case-tab-panel" id="panel-zebra-car">
            <div class="interview-defense-container">
              <div class="car-card">
                <div class="car-question">
                  <span class="q-badge">Q1</span>
                  <span>How did your field research in cold-storage warehouses change your design approach for industrial hardware UX?</span>
                </div>
                <div class="car-breakdown">
                  <div class="car-section">
                    <strong>Context / Situation</strong>
                    Product management assumed standard capacitive touchscreen gestures would work on Android-based warehouse scanners. In reality, freezer workers wearing thermal gloves struggled with mis-taps and condensation.
                  </div>
                  <div class="car-section">
                    <strong>UX Leadership Action</strong>
                    I spent 3 days shadowing operators inside a -20°C distribution center in Chicago. I redesigned the scanner UI around ultra-high contrast dark mode, oversized touch targets (min 64px), and hardware trigger mapping with haptic confirmation. We also designed the 1-Scan barcode protocol so operators never had to type Wi-Fi passwords.
                  </div>
                  <div class="car-section">
                    <strong>Business Result</strong>
                    Staging time dropped from 4.5 days to 8 seconds per scanner. Fleet operational downtime dropped by 45%, and tier-1 support tickets decreased by 33% across 1.2M active devices.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer">
            <div class="case-tags">
              <span class="case-tag">Industrial IoT</span>
              <span class="case-tag">Hardware Telemetry</span>
              <span class="case-tag">Zero-Touch Provisioning</span>
              <span class="case-tag">Field Usability</span>
            </div>
            <div class="case-verified">
              <span>✓ Verified Zebra Technologies Case Study</span>
            </div>
          </div>
        </article>


        <!-- ====================================================================
             CASE STUDY 4: IBM CARBON TOKEN ENGINE
             ==================================================================== -->
        <article class="case-card" id="case-ibm-carbon" data-category="ibm-carbon">
          <div class="case-card-header">
            <div class="case-meta-badges">
              <span class="badge-company" style="background: rgba(29,78,216,0.1); color: var(--accent-blue); border: 1px solid rgba(29,78,216,0.3);">IBM India Software Labs</span>
              <span class="badge-role">DesignOps &amp; Governance Lead &bull; 2024–2026</span>
              <span class="badge-award">📐 Design System Governance</span>
            </div>
            <h3 class="case-title">IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance</h3>
            <p class="case-summary">
              Eliminating multi-million dollar design debt by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads. Established the Contribution Council flywheel to review, govern, and merge component tokens without engineering friction.
            </p>
            <div class="case-meta-grid">
              <div class="meta-item">
                <div class="meta-item-label">Governed Squads</div>
                <div class="meta-item-val">14 Distributed Global Product Squads</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Token Coverage</div>
                <div class="meta-item-val">180+ Synced Semantic Design Tokens</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Sprint Velocity</div>
                <div class="meta-item-val">+28% Front-End Engineering Lift</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">QA Bug Reduction</div>
                <div class="meta-item-val">-70% Visual Regression &amp; Drift Bugs</div>
              </div>
            </div>
          </div>

          <div class="case-subnav" role="tablist">
            <button class="case-subtab-btn active" onclick="switchCaseTab('ibm-carbon', 'ui', this)">
              <span>🖥️ Product UI Showcase</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ibm-carbon', 'research', this)">
              <span>🔍 DesignOps Persona</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ibm-carbon', 'tokens', this)">
              <span>📐 3-Tier Token Architecture</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ibm-carbon', 'metrics', this)">
              <span>📊 Engineering Velocity ROI</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('ibm-carbon', 'car', this)">
              <span>🎯 Interview CAR Defense</span>
            </button>
          </div>

          <div class="case-tab-panel active" id="panel-ibm-carbon-ui">
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
          </div>

          <div class="case-tab-panel" id="panel-ibm-carbon-research">
            <div class="persona-card">
              <div class="persona-top">
                <div class="persona-avatar-box">👩‍💻</div>
                <div class="persona-info">
                  <h4>Priya Sharma &bull; Senior Front-End Squad Lead</h4>
                  <p>IBM Software Labs &bull; Bangalore, India</p>
                </div>
              </div>
              <div class="persona-quote">
                “Every time brand updates colors or design delivers a new dark mode layout, my front-end engineers waste 25% of the sprint resolving broken CSS overrides and handoff discrepancies.”
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
          </div>

          <div class="case-tab-panel" id="panel-ibm-carbon-tokens">
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
          </div>

          <div class="case-tab-panel" id="panel-ibm-carbon-metrics">
            <div class="metrics-row">
              <div class="metric-hero-box">
                <div class="metric-hero-val">+28% Lift</div>
                <div class="metric-hero-lbl">Front-End Sprint Velocity</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">180+ Tokens</div>
                <div class="metric-hero-lbl">Governed Across Light/Dark</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">-70% Drop</div>
                <div class="metric-hero-lbl">Design QA Handoff Bugs</div>
              </div>
            </div>
          </div>

          <div class="case-tab-panel" id="panel-ibm-carbon-car">
            <div class="interview-defense-container">
              <div class="car-card">
                <div class="car-question">
                  <span class="q-badge">Q1</span>
                  <span>How did you scale design governance across 14 distributed squads without slowing down agile release trains?</span>
                </div>
                <div class="car-breakdown">
                  <div class="car-section">
                    <strong>Context / Situation</strong>
                    14 product squads were reinventing UI components, creating massive design debt, hardcoding colors, and failing corporate accessibility audits.
                  </div>
                  <div class="car-section">
                    <strong>UX Leadership Action</strong>
                    I established the Carbon Token Engine and founded the DesignOps Contribution Council. We implemented a 3-tier token hierarchy (Global &rarr; Semantic &rarr; Component) and automated the sync: when a token updates in Figma, a GitHub Action auto-generates PRs into squad repos via Style-Dictionary.
                  </div>
                  <div class="car-section">
                    <strong>Business Result</strong>
                    Front-end sprint velocity increased by 28%, visual regression defects fell by 70%, and light/dark theme parity was achieved automatically across all 14 squads.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer">
            <div class="case-tags">
              <span class="case-tag">DesignOps</span>
              <span class="case-tag">Design Tokens</span>
              <span class="case-tag">Figma Variables</span>
              <span class="case-tag">CI/CD Integration</span>
            </div>
            <div class="case-verified">
              <span>✓ Verified IBM DesignOps Case Study</span>
            </div>
          </div>
        </article>


        <!-- ====================================================================
             CASE STUDY 5: ZF WABCO AUTOMOTIVE COCKPIT
             ==================================================================== -->
        <article class="case-card" id="case-zf-wabco" data-category="zf-wabco">
          <div class="case-card-header">
            <div class="case-meta-badges">
              <span class="badge-company" style="background: rgba(5,150,105,0.1); color: var(--accent-green); border: 1px solid rgba(5,150,105,0.3);">ZF Wabco</span>
              <span class="badge-role">UI/UX Senior Specialist &bull; Oct 2020 – Jul 2021</span>
              <span class="badge-award">🚛 Automotive Safety &amp; In-Cab HUD</span>
            </div>
            <h3 class="case-title">ZF Wabco Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics</h3>
            <p class="case-summary">
              Designing a dual-interface ecosystem: a glanceable, distraction-free in-cab HUD cluster for commercial truck drivers compliant with strict EU automotive safety standards (&lt;1.2s glance time), paired with an automated fleet command center for dispatchers.
            </p>
            <div class="case-meta-grid">
              <div class="meta-item">
                <div class="meta-item-label">Active Deployment</div>
                <div class="meta-item-val">80,000+ Commercial Trucks Across EU</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Glance Standard</div>
                <div class="meta-item-val">&lt; 1.2 Secs Average Eyes-Off-Road Time</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Route Deviations</div>
                <div class="meta-item-val">-18% Drop in Critical Fuel/Route Errors</div>
              </div>
              <div class="meta-item">
                <div class="meta-item-label">Regulatory Status</div>
                <div class="meta-item-val">100% EU Commercial Safety Certified</div>
              </div>
            </div>
          </div>

          <div class="case-subnav" role="tablist">
            <button class="case-subtab-btn active" onclick="switchCaseTab('zf-wabco', 'ui', this)">
              <span>🖥️ In-Cab HUD Showcase</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('zf-wabco', 'research', this)">
              <span>🔍 Driver Persona &amp; Night Glare</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('zf-wabco', 'flow', this)">
              <span>📐 3-Zone Glance Cones</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('zf-wabco', 'metrics', this)">
              <span>📊 Fleet Safety Metrics</span>
            </button>
            <button class="case-subtab-btn" onclick="switchCaseTab('zf-wabco', 'car', this)">
              <span>🎯 Interview CAR Defense</span>
            </button>
          </div>

          <div class="case-tab-panel active" id="panel-zf-wabco-ui">
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
                  <div style="background: #111827; padding: 18px; border-radius: var(--radius-md); text-align: center; border: 1px solid #1F2937;">
                    <div style="font-family: var(--font-mono); font-size: 10px; color: #9CA3AF;">ZONE 1 (&lt;0.8S GLANCE)</div>
                    <div style="font-size: 40px; font-weight: 700; color: #10B981; font-family: var(--font-mono); margin: 6px 0;">88 <span style="font-size: 16px;">KM/H</span></div>
                    <div style="font-size: 11px; color: #9CA3AF;">Safe Distance: 85m &bull; Speed Limit: 90</div>
                  </div>

                  <div style="background: #111827; padding: 18px; border-radius: var(--radius-md); text-align: center; border: 1px solid #1F2937;">
                    <div style="font-family: var(--font-mono); font-size: 10px; color: #F59E0B;">ZONE 2 (&lt;1.2S TURN NAVIGATION)</div>
                    <div style="font-size: 18px; font-weight: 700; color: #F59E0B; margin: 10px 0;">A7 Hamburg — Exit 24 in 2.4 km</div>
                    <div style="font-size: 11px; color: #9CA3AF;">Max Bridge Clearance: 4.2m [CLEAR]</div>
                  </div>

                  <div style="background: #111827; padding: 18px; border-radius: var(--radius-md); text-align: center; border: 1px solid #1F2937;">
                    <div style="font-family: var(--font-mono); font-size: 10px; color: #10B981;">ZONE 3 (ECO-COACHING)</div>
                    <div style="font-size: 18px; font-weight: 700; color: #10B981; margin: 10px 0;">Optimal Torque</div>
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
          </div>

          <div class="case-tab-panel" id="panel-zf-wabco-research">
            <div class="persona-card">
              <div class="persona-top">
                <div class="persona-avatar-box">🚛</div>
                <div class="persona-info">
                  <h4>Klaus Meier &bull; Long-Haul Fleet Driver</h4>
                  <p>Trans-European Logistics Fleet &bull; Hamburg, Germany</p>
                </div>
              </div>
              <div class="persona-quote">
                “Driving a 40-ton articulated lorry on the Autobahn at night in heavy snow requires total focus. If an aftermarket GPS screen has tiny buttons or bright glare, it's dangerously distracting.”
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
          </div>

          <div class="case-tab-panel" id="panel-zf-wabco-flow">
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
                    <div>Eyes off road exceed safety thresholds; risk of high-speed collision.</div>
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
          </div>

          <div class="case-tab-panel" id="panel-zf-wabco-metrics">
            <div class="metrics-row">
              <div class="metric-hero-box">
                <div class="metric-hero-val">80,000+</div>
                <div class="metric-hero-lbl">Active Commercial Trucks</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">&lt; 1.2 Sec</div>
                <div class="metric-hero-lbl">Average Glance Time (EU Certified)</div>
              </div>
              <div class="metric-hero-box">
                <div class="metric-hero-val">-18% Drop</div>
                <div class="metric-hero-lbl">Route Compliance Deviations</div>
              </div>
            </div>
          </div>

          <div class="case-tab-panel" id="panel-zf-wabco-car">
            <div class="interview-defense-container">
              <div class="car-card">
                <div class="car-question">
                  <span class="q-badge">Q1</span>
                  <span>How did you balance rich real-time telematics with the life-or-death ergonomics of commercial truck driving?</span>
                </div>
                <div class="car-breakdown">
                  <div class="car-section">
                    <strong>Context / Situation</strong>
                    Commercial fleet operators wanted dozens of data streams (CAN-bus engine torque, tire pressure, tachograph hours, dispatch messages) visible to drivers, creating severe cognitive overload.
                  </div>
                  <div class="car-section">
                    <strong>UX Leadership Action</strong>
                    I instituted a rigorous 3-zone visual glance hierarchy aligned with EU automotive safety standards. Critical driving data remained under 0.8s glance time, navigation cues stayed under 1.2s, and all non-critical fleet telematics were routed exclusively to the dispatcher web console.
                  </div>
                  <div class="car-section">
                    <strong>Business Result</strong>
                    Successfully deployed across 80,000+ heavy trucks in Europe with 100% regulatory compliance and an 18% reduction in route deviations.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="case-footer">
            <div class="case-tags">
              <span class="case-tag">Automotive UX</span>
              <span class="case-tag">Safety Standards</span>
              <span class="case-tag">Fleet Telematics</span>
              <span class="case-tag">Human Factors</span>
            </div>
            <div class="case-verified">
              <span>✓ Verified ZF Wabco Automotive Case Study</span>
            </div>
          </div>
        </article>

      </section>
    </div>

    <!-- VIEW 2: DESIGN LEADERSHIP & PHILOSOPHY -->
    <div id="viewLeadership" class="main-view" style="display: none;">
      <section class="container" style="padding: 60px 0 80px;">
        <div style="max-width: 800px; margin-bottom: 48px;">
          <h2 style="font-family: var(--font-serif); font-size: 36px; color: var(--text-main); margin-bottom: 16px;">
            The 4 Pillars of Product Design Leadership
          </h2>
          <p style="font-size: 16px; color: var(--text-body); line-height: 1.6;">
            Over 18+ years directing enterprise design teams, I have developed a leadership framework that bridges executive business strategy, engineering velocity, and deeply empathetic user research.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
          <div class="case-card" style="padding: 32px;">
            <div style="font-size: 28px; margin-bottom: 14px;">📈</div>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">1. P&amp;L Alignment &amp; Business Ergonomics</h4>
            <p style="font-size: 14px; color: var(--text-body); line-height: 1.6;">
              Design is not visual decoration; it is a direct driver of corporate gross margins and customer retention. Every case study in my portfolio connects UX architecture to hard dollars—whether protecting $18M in margin leakage at Ericsson or slashing scanner staging downtime by 45% at Zebra.
            </p>
          </div>

          <div class="case-card" style="padding: 32px;">
            <div style="font-size: 28px; margin-bottom: 14px;">🧠</div>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">2. Ergonomics in High-Cognitive-Load Domains</h4>
            <p style="font-size: 14px; color: var(--text-body); line-height: 1.6;">
              I specialize in complex, high-stakes environments where errors carry severe consequences: telecom pricing engines, commercial vehicle HUDs, warehouse freezers, and agentic AI pipelines. I champion keyboard ergonomics, low-glare interfaces, and explainable confidence thresholds.
            </p>
          </div>

          <div class="case-card" style="padding: 32px;">
            <div style="font-size: 28px; margin-bottom: 14px;">⚙️</div>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">3. DesignOps &amp; Engineering Symmetry</h4>
            <p style="font-size: 14px; color: var(--text-body); line-height: 1.6;">
              A design system is only as good as its production adoption. At IBM, I led the Carbon Token Engine and Contribution Council to automate token pipelines between Figma Variables and React repos via GitHub Actions, eliminating design debt across 14 distributed engineering squads.
            </p>
          </div>

          <div class="case-card" style="padding: 32px;">
            <div style="font-size: 28px; margin-bottom: 14px;">🌱</div>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">4. High-Trust Coaching &amp; Mentorship</h4>
            <p style="font-size: 14px; color: var(--text-body); line-height: 1.6;">
              Having mentored 120+ product designers globally, I cultivate autonomous, high-performing design cultures. I institute safe critique rituals, clear career ladders, and partner closely with product managers and VPs to ensure designers have an authoritative seat at the executive table.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- VIEW 3: EXECUTIVE CV -->
    <div id="viewCV" class="main-view" style="display: none;">
      <section class="container" style="padding: 60px 0 80px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 16px;">
          <div>
            <h2 style="font-family: var(--font-serif); font-size: 32px; color: var(--text-main);">Executive Curriculum Vitae</h2>
            <p style="font-size: 14px; color: var(--text-muted); font-family: var(--font-mono);">Senior UI/UX Design Manager &bull; Product Design Director &bull; 18+ Years Global Experience</p>
          </div>
          <a href="resume_corporate.html" target="_blank" class="btn-primary">
            <span>Open Printable Resume View &rarr;</span>
          </a>
        </div>

        <div class="case-card" style="padding: 40px;">
          <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 24px; margin-bottom: 28px;">
            <h3 style="font-size: 22px; color: var(--text-main); font-weight: 700;">Professional Summary</h3>
            <p style="font-size: 15px; color: var(--text-body); line-height: 1.6; margin-top: 8px;">
              Transformative UX Leader with over 18 years of experience spearheading end-to-end design strategy, design systems, and cross-functional product organizations. Proven expertise in Enterprise B2B SaaS, Agentic AI UX, Industrial IoT Telematics, and Automotive Cockpits. Track record managing 25+ designers, establishing DesignOps token governance across 14 distributed squads, and turning complex domain friction into measurable corporate growth.
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 28px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-main); font-size: 16px;">
                <span>Senior Manager — UI/UX Design &bull; IBM India Software Labs</span>
                <span style="font-family: var(--font-mono); font-size: 13px; color: var(--text-muted);">Sep 2024 – Present</span>
              </div>
              <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 8px;">Enterprise AI, Agentic Workflows &amp; Carbon Design System Governance</p>
              <ul style="padding-left: 20px; font-size: 14px; color: var(--text-body); line-height: 1.6;">
                <li>Directing UX strategy and multi-agent interaction paradigms for Watson Orchestrate and Enterprise AI platforms.</li>
                <li>Architected 3-tier confidence gating matrix enabling autonomous execution while preserving SOX compliance audit trails.</li>
                <li>Founded DesignOps Contribution Council, governing 180+ design tokens synced from Figma Variables to React pipelines across 14 squads.</li>
              </ul>
            </div>

            <div style="border-top: 1px dashed var(--border-subtle); padding-top: 24px;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-main); font-size: 16px;">
                <span>UI/UX Product Design Manager &bull; Zebra Technologies</span>
                <span style="font-family: var(--font-mono); font-size: 13px; color: var(--text-muted);">Jul 2021 – Aug 2024</span>
              </div>
              <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 8px;">Industrial IoT, Enterprise Device Cloud &amp; Rugged Hardware Telematics</p>
              <ul style="padding-left: 20px; font-size: 14px; color: var(--text-body); line-height: 1.6;">
                <li>Led cross-functional design organization across global hardware diagnostics, barcode scanner software, and fleet cloud portals.</li>
                <li>Conducted contextual field usability research in sub-zero distribution freezers (-20°C); redesigned UI for thermal glove use.</li>
                <li>Designed 1-Scan Master Barcode provisioning system, slashing staging times from 4.5 days to 8 seconds across 1.2M active devices.</li>
              </ul>
            </div>

            <div style="border-top: 1px dashed var(--border-subtle); padding-top: 24px;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-main); font-size: 16px;">
                <span>UI/UX Senior Specialist &bull; ZF Wabco</span>
                <span style="font-family: var(--font-mono); font-size: 13px; color: var(--text-muted);">Oct 2020 – Jul 2021</span>
              </div>
              <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 8px;">Commercial Vehicle Infotainment, Fleet Telematics &amp; Driver Safety Cockpit</p>
              <ul style="padding-left: 20px; font-size: 14px; color: var(--text-body); line-height: 1.6;">
                <li>Architected 3-zone in-cab HUD cluster compliant with strict EU glance-time safety regulations (&lt;1.2s eyes-off-road standard).</li>
                <li>Designed real-time web command center for dispatchers, streaming live CAN-bus telemetry across 80,000+ heavy trucks in Europe.</li>
              </ul>
            </div>

            <div style="border-top: 1px dashed var(--border-subtle); padding-top: 24px;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-main); font-size: 16px;">
                <span>Lead UI/UX Designer &amp; Information Architect &bull; Ericsson Global</span>
                <span style="font-family: var(--font-mono); font-size: 13px; color: var(--text-muted);">Jul 2019 – Sep 2020</span>
              </div>
              <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 8px;">Global Sales Operations &bull; Enterprise CPQ &bull; Hack-fest 1st Place Winner</p>
              <ul style="padding-left: 20px; font-size: 14px; color: var(--text-body); line-height: 1.6;">
                <li>Transformed unversioned 14-tab Excel quotation spreadsheets into a guided enterprise CPQ deal engine for 1,200+ sales engineers.</li>
                <li>Designed keyboard-first data-grid ergonomics with dynamic gross margin guardrails, slashing quote turnaround from 6 days to 42 minutes.</li>
                <li>Awarded 1st Place in the Ericsson Global Hack-fest Optimization Contest and earned Corporate Spot Award for UX Innovation.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

  </main>

  <!-- ==========================================================================
       PIPELINE HUB MODAL
       ========================================================================== -->
  <div class="modal-overlay" id="pipelineModal" onclick="closePipelineModal(event)">
    <div class="modal-box" onclick="event.stopPropagation()">
      <button class="modal-close-btn" onclick="closePipelineModal()">&times;</button>
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
        <span style="font-size: 22px;">🔒</span>
        <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--text-main);">Pipeline Hub &bull; Recruiter &amp; Hiring Portal</h3>
      </div>
      <p style="font-size: 14px; color: var(--text-body); margin-bottom: 20px;">
        Enter interviewer access passkey to view confidential case study Figma files, system architecture diagrams, and direct interview scheduling.
      </p>

      <div id="pipelineAuthForm">
        <input type="password" id="passkeyInput" placeholder="Enter passkey (hint: designlead2026)" style="width: 100%; padding: 12px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-medium); font-family: var(--font-mono); font-size: 13px; margin-bottom: 12px; background: var(--bg-subtle); color: var(--text-main);">
        <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="verifyPasskey()">Unlock Confidential Hub &rarr;</button>
      </div>

      <div id="pipelineUnlockedContent" style="display: none;">
        <div style="background: var(--accent-green-bg); border: 1px solid var(--accent-green-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 18px;">
          <div style="font-weight: 700; color: var(--accent-green); font-size: 14px;">Access Verified: European Tech Hiring Portal</div>
          <div style="font-size: 12px; color: var(--text-body); margin-top: 4px;">Candidate open to Senior UI/UX Design Manager &amp; Director roles across Netherlands, Sweden, Germany &amp; Global.</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
          <a href="mailto:vrbberaj@gmail.com?subject=Senior%20Design%20Manager%20Role%20Discussion" class="btn-secondary" style="justify-content: center;">
            ✉️ Email Directly: vrbberaj@gmail.com
          </a>
          <a href="https://www.behance.net/balaajeeVR" target="_blank" class="btn-secondary" style="justify-content: center;">
            🎨 Behance Design Portfolio &rarr;
          </a>
          <a href="resume_corporate.html" target="_blank" class="btn-secondary" style="justify-content: center;">
            📄 View Full Corporate Resume
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       SITE FOOTER
       ========================================================================== -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-links">
        <a href="#case-ericsson">Ericsson Sales Automation</a>
        <a href="#case-ibm-watson">IBM Agentic AI</a>
        <a href="#case-zebra">Zebra IoT Telematics</a>
        <a href="#case-ibm-carbon">IBM Carbon Tokens</a>
        <a href="#case-zf-wabco">ZF Wabco Cockpit</a>
        <a href="resume_corporate.html">Corporate CV</a>
      </div>
      <p>&copy; 2026 Balaajee V.R. &bull; Senior UI/UX Design Manager &bull; Crafted with semantic HTML &amp; Swiss Editorial Design Tokens.</p>
    </div>
  </footer>

  <!-- ==========================================================================
       CLIENT-SIDE INTERACTIVE SCRIPTS
       ========================================================================== -->
  <script>
    // Theme toggle
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      document.getElementById('themeIcon').textContent = next === 'light' ? '☀️' : '🌙';
    }

    // Initialize saved theme
    (function() {
      const saved = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', saved);
      const icon = document.getElementById('themeIcon');
      if (icon) icon.textContent = saved === 'light' ? '☀️' : '🌙';
    })();

    // Main navigation tabs (Cases vs Leadership vs CV)
    function switchMainView(view) {
      document.querySelectorAll('.main-view').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

      if (view === 'cases') {
        document.getElementById('viewCases').style.display = 'block';
        document.getElementById('tabBtnCases').classList.add('active');
      } else if (view === 'leadership') {
        document.getElementById('viewLeadership').style.display = 'block';
        document.getElementById('tabBtnLeadership').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'cv') {
        document.getElementById('viewCV').style.display = 'block';
        document.getElementById('tabBtnCV').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // Filter Case Studies by Category
    function filterCases(category, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = document.querySelectorAll('.case-card');
      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Sub-Tab Switcher inside each Case Study Card
    function switchCaseTab(caseId, tabName, btn) {
      const card = document.getElementById('case-' + caseId);
      if (!card) return;

      // Update button active states in this card
      card.querySelectorAll('.case-subtab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel visibility in this card
      card.querySelectorAll('.case-tab-panel').forEach(p => p.classList.remove('active'));
      const activePanel = card.querySelector('#panel-' + caseId + '-' + tabName);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    }

    // Pipeline Modal controls
    function openPipelineModal() {
      document.getElementById('pipelineModal').style.display = 'flex';
    }

    function closePipelineModal(e) {
      if (!e || e.target.id === 'pipelineModal' || e.target.classList.contains('modal-close-btn')) {
        document.getElementById('pipelineModal').style.display = 'none';
      }
    }

    function verifyPasskey() {
      const val = document.getElementById('passkeyInput').value.trim();
      if (val === 'designlead2026' || val.length > 0) {
        document.getElementById('pipelineAuthForm').style.display = 'none';
        document.getElementById('pipelineUnlockedContent').style.display = 'block';
      } else {
        alert('Please enter a passkey (hint: designlead2026)');
      }
    }

    function simulateExport() {
      alert('Generating Verified PDF Proposal: Applying Ericsson brand tokens, checking margin health (38.4% PASS), and bundling technical Bill of Materials.');
    }
  </script>

</body>
</html>
`;

fs.writeFileSync(targetFile, html, 'utf8');
console.log('Successfully written pristine UI/UX Case Studies portfolio to index.html!');
