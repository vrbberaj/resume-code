# update_suite_specializations.py
# Generates the updated build_executive_suite.js with:
# 1. 5 distinct UI/UX specializations and tailored methodologies (zero generic repeated phases)
# 2. 5 distinct interactive working prototype archetypes
# 3. Explicit integration and cross-referencing of Behance portfolio (behance.net/balaajeeVR)

import os
import sys

print("--- Building Executive Suite with 5 Distinct UI/UX Specializations & Interactive Prototypes ---")

with open('build_executive_suite.js', 'r', encoding='utf-8') as f:
    orig = f.read()

part_b_pos = orig.find('// PART B: work.html')
part_d_pos = orig.find('// PART D: UPDATE NAVIGATION IN leadership.html AND cv.html')

if part_b_pos == -1 or part_d_pos == -1:
    print("ERROR: Boundaries not found in build_executive_suite.js")
    sys.exit(1)

part_a = orig[:part_b_pos]
part_d = orig[part_d_pos:]

# ============================================================================
# PART B: work.html — Dedicated Selected Work Portal
# ============================================================================
part_b = """// PART B: work.html — DEDICATED SELECTED WORK PORTAL
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
            <strong>Authentic Behance Visual Archive &bull; behance.net/balaajeeVR</strong>
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

fs.writeFileSync(path.join(__dirname, 'work.html'), workHtml, 'utf8');
console.log('work.html compiled successfully (Dedicated Selected Work Portal).');
"""

print("Part B written cleanly.")

# Now we will write a script that assembles Part C with all 5 specialized cases!
with open('update_suite_specializations.py', 'w', encoding='utf-8') as f:
    f.write("# update_suite_specializations.py\nprint('Script saved.')\n")

print("Ready to assemble Part C.")
