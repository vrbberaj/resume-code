# build_full_suite.py
# Comprehensive builder for the Senior UI/UX Design Manager Executive Suite
import os
import sys

print("--- Assembling Senior Design Manager Suite ---")

with open('build_executive_suite.js', 'r', encoding='utf-8') as f:
    orig = f.read()

part_b_pos = orig.find('// PART B: work.html')
part_d_pos = orig.find('// PART D: UPDATE NAVIGATION IN leadership.html AND cv.html')

if part_b_pos == -1 or part_d_pos == -1:
    print("ERROR: Boundaries not found in build_executive_suite.js")
    sys.exit(1)

part_a = orig[:part_b_pos]
part_d = orig[part_d_pos:]

# ----------------------------------------------------------------------------
# 1. New Part B (work.html)
# ----------------------------------------------------------------------------
part_b = """// PART B: work.html — DEDICATED SELECTED WORK PORTAL
// ============================================================================
console.log('2. Compiling work.html (Dedicated Selected Work Portal)...');

const workHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balaajee V.R. | Selected Work &amp; Enterprise Product Portfolio</title>
  <meta name="description" content="Selected enterprise product transformations led by Balaajee V.R. Senior UI/UX Design Manager deep dives into Telecom CPQ, Enterprise Agentic AI, Industrial IoT, DesignOps Governance, and Automotive Cockpits.">
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
      max-width: 820px;
      line-height: 1.6;
    }

    /* 5-Phase Manager Framework Banner Infographic */
    .manager-framework-banner {
      background: #FFFFFF;
      border: 1px solid var(--border-medium);
      border-radius: 20px;
      padding: 32px 36px;
      margin-bottom: 36px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    }

    .framework-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .framework-pretitle {
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--primary-accent);
      margin-bottom: 6px;
    }

    .framework-title {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.25;
    }

    .framework-desc {
      font-size: 14px;
      color: var(--text-muted);
      max-width: 680px;
      margin-top: 4px;
    }

    .framework-badge {
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

    .framework-steps-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }

    @media (max-width: 1024px) {
      .framework-steps-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .framework-steps-grid {
        grid-template-columns: 1fr;
      }
      .manager-framework-banner {
        padding: 22px 18px;
      }
    }

    .framework-step-card {
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 18px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      transition: all 0.2s ease;
    }

    .framework-step-card:hover {
      border-color: var(--primary-accent);
      background: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    }

    .f-step-num {
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 900;
      color: var(--primary-accent);
      margin-bottom: 4px;
    }

    .f-step-title {
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .f-step-desc {
      font-size: 12px;
      color: var(--text-body);
      line-height: 1.5;
      margin-bottom: 12px;
    }

    .f-step-deliverable {
      font-family: var(--font-code);
      font-size: 10.5px;
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
      line-height: 1.25;
      margin-bottom: 12px;
    }

    .card-lead {
      font-size: 14.5px;
      color: var(--text-body);
      line-height: 1.6;
      margin-bottom: 18px;
    }

    /* 3-Step Visual Transformation Journey Strip */
    .card-journey-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 22px;
    }

    @media (max-width: 640px) {
      .card-journey-strip {
        grid-template-columns: 1fr;
        gap: 8px;
      }
    }

    .journey-step {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .journey-step-tag {
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .journey-step-tag.crisis { color: #E11D48; }
    .journey-step-tag.pivot { color: #2563EB; }
    .journey-step-tag.impact { color: #059669; }

    .journey-step-text {
      font-size: 11.5px;
      color: var(--text-body);
      line-height: 1.4;
      font-weight: 500;
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

    /* Right Preview Window Side with Annotated Screenshot */
    .card-preview-side {
      background: #0B0F17;
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
    }

    .preview-browser-mini {
      background: #161B26;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    .browser-screenshot-wrap {
      position: relative;
      width: 100%;
      background: #0B0E17;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      overflow: hidden;
      display: block;
    }

    .browser-screenshot-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      object-position: top center;
      display: block;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .transformation-card:hover .browser-screenshot-img {
      transform: scale(1.03);
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
      margin-bottom: 10px;
      display: block;
    }

    .preview-callout-badges {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .preview-callout-badge {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 7px 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      font-size: 11.5px;
      line-height: 1.4;
      color: #E2E8F0;
    }

    .callout-badge-icon {
      color: #10B981;
      font-weight: bold;
      line-height: 1.2;
    }

    @media (max-width: 640px) {
      .work-hero-header {
        padding: 36px 0 28px;
      }
      .work-container {
        padding: 0 16px;
        width: 100%;
        max-width: 100%;
      }
      .work-title {
        font-size: 26px;
      }
      .work-desc {
        font-size: 14.5px;
      }
      .showcase-directory {
        padding: 24px 0 60px;
      }
      .card-content-side {
        padding: 24px 16px;
      }
      .card-preview-side {
        padding: 20px 16px;
        border-left: none;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      .card-title {
        font-size: 20px;
      }
      .card-lead {
        font-size: 13.5px;
      }
      .card-metrics-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .card-cta-row {
        flex-direction: column;
        align-items: stretch;
      }
      .btn-read-deep-dive {
        justify-content: center;
      }
    }
  </style>
</head>
<body>

  ${getGlobalNav('work')}

  <section class="work-hero-header">
    <div class="work-container">
      <div class="work-pretitle">Senior UI/UX Design Manager Portfolio</div>
      <h1 class="work-title">Selected Work: Flagship Product Transformations</h1>
      <p class="work-desc">
        5 end-to-end enterprise transformations architected for scale, cross-squad velocity, and zero-defect governance. Built from hands-on squad leadership to boardroom ROI—crafted for Senior Design Manager impact, answering Director &amp; VP interview criteria.
      </p>
    </div>
  </section>

  <main class="showcase-directory">
    <div class="work-container">

      <!-- 5-Phase Senior UI/UX Design Manager Lifecycle Infographic Banner -->
      <section class="manager-framework-banner" aria-label="5-Phase Transformation Methodology">
        <div class="framework-header">
          <div>
            <div class="framework-pretitle">Execution Methodology &bull; Senior UI/UX Design Manager</div>
            <h2 class="framework-title">The 5-Phase Product Transformation Lifecycle</h2>
            <p class="framework-desc">
              How I bridge hands-on design craft with cross-squad engineering velocity, DesignOps token systems, and boardroom business ROI.
            </p>
          </div>
          <span class="framework-badge">Hands-On Craft &rarr; Squad Velocity &rarr; Boardroom ROI</span>
        </div>

        <div class="framework-steps-grid">
          <div class="framework-step-card">
            <div>
              <div class="f-step-num">01</div>
              <h3 class="f-step-title">Problem Audit &amp; Alignment</h3>
              <p class="f-step-desc">Quantify legacy technical &amp; design debt; establish KPI contract with PM and Engineering Directors.</p>
            </div>
            <span class="f-step-deliverable">📦 Risk Register &amp; KPI Contract</span>
          </div>

          <div class="framework-step-card">
            <div>
              <div class="f-step-num">02</div>
              <h3 class="f-step-title">In-Situ Research &amp; Ergonomics</h3>
              <p class="f-step-desc">Contextual inquiries, shadowing in real work environments, ergonomics, cognitive friction mapping.</p>
            </div>
            <span class="f-step-deliverable">📦 Task Empathy Map &amp; Heuristics</span>
          </div>

          <div class="framework-step-card">
            <div>
              <div class="f-step-num">03</div>
              <h3 class="f-step-title">Systems &amp; IA Pivot</h3>
              <p class="f-step-desc">Re-architect complex multi-step ordeals into single-pane data grids with live error guardrails.</p>
            </div>
            <span class="f-step-deliverable">📦 Single-Pane IA &amp; Data Grid Spec</span>
          </div>

          <div class="framework-step-card">
            <div>
              <div class="f-step-num">04</div>
              <h3 class="f-step-title">DesignOps &amp; Token Governance</h3>
              <p class="f-step-desc">Figma-to-Code CI/CD pipelines, multi-squad tokens, automated Style Dictionary theme compilation.</p>
            </div>
            <span class="f-step-deliverable">📦 Figma Variables &amp; Token Pipeline</span>
          </div>

          <div class="framework-step-card">
            <div>
              <div class="f-step-num">05</div>
              <h3 class="f-step-title">Usability &amp; Scale Adoption</h3>
              <p class="f-step-desc">SUS usability testing, telemetry instrumentation, change management, and hard boardroom ROI.</p>
            </div>
            <span class="f-step-deliverable">📦 Validated Pilot &amp; Global Rollout</span>
          </div>
        </div>
      </section>

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
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 Squad: 6 UX + 4 Devs</span>
                <span class="footprint-pill">⚡ 14 Sprints</span>
                <span class="footprint-pill">🛡️ DesignOps Tokenized</span>
              </div>
              <h2 class="card-title">Ericsson SalesOps Cloud: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine</h2>
              <p class="card-lead">
                Modernizing an unversioned, macro-laden spreadsheet quoting nightmare into an enterprise cloud data grid, reducing deal turnaround from 6 days to 42 minutes and achieving 100% catalog rule compliance across 12,000+ parts.
              </p>

              <!-- 3-Step Journey Strip -->
              <div class="card-journey-strip">
                <div class="journey-step">
                  <span class="journey-step-tag crisis">01. Legacy Crisis</span>
                  <span class="journey-step-text">14-tab unversioned Excel with cascading #REF! formula errors &amp; 6-day email bottleneck.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag pivot">02. Manager Intervention</span>
                  <span class="journey-step-text">Shadowed engineers in Stockholm; architected keyboard data grid &amp; tokenized margin rules.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag impact">03. Shipped Impact</span>
                  <span class="journey-step-text">Turnaround slashed from 6 days to 42 mins (-92%); 100% catalog rule compliance.</span>
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
              <div class="browser-screenshot-wrap">
                <img src="screenshots/transformation-ericsson.png" alt="Ericsson SalesOps BOM Data Grid" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● SHIPPED TO 1,200+ SALES ENGINEERS</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Keyboard-First Data Grid:</strong> Arrow navigation matching Excel muscle memory.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Live Margin Guardrail:</strong> Real-time 38.4% gross margin compliance check.</span>
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
        <article class="transformation-card">
          <div class="card-content-side">
            <div>
              <div class="card-meta-row">
                <span class="card-company-badge">IBM Software Labs</span>
                <span class="card-domain-badge">Agentic AI &amp; Enterprise UX</span>
                <span class="card-role-text">Senior Manager UI/UX Design &bull; Sep 2024 – Jan 2026</span>
              </div>
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 Squad: 8 UX + 12 AI Engineers</span>
                <span class="footprint-pill">⚡ 18 Sprints</span>
                <span class="footprint-pill">🛡️ Carbon Design System</span>
              </div>
              <h2 class="card-title">IBM Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX</h2>
              <p class="card-lead">
                Designing autonomous multi-agent task execution and Human-in-the-Loop governance for regulated Fortune 500 enterprises, transforming black-box AI into explainable, auditable workflows.
              </p>

              <!-- 3-Step Journey Strip -->
              <div class="card-journey-strip">
                <div class="journey-step">
                  <span class="journey-step-tag crisis">01. Legacy Crisis</span>
                  <span class="journey-step-text">Enterprise compliance rejected black-box GenAI due to hallucinated data &amp; SOX legal liability.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag pivot">02. Manager Intervention</span>
                  <span class="journey-step-text">Conducted executive inquiries with NY risk officers; built 3-tier confidence gating &amp; diff review.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag impact">03. Shipped Impact</span>
                  <span class="journey-step-text">+62% task velocity, 0 SOX compliance violations, and 94.2% autonomous confidence rating.</span>
                </div>
              </div>
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
              <div class="browser-screenshot-wrap">
                <img src="screenshots/transformation-ibm-watson.png" alt="IBM Watson Orchestrate Multi-Agent Mesh" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● ENTERPRISE AGENTIC UX MESH</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Multi-Agent Mesh:</strong> Visual execution canvas tracking autonomous handoffs.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>3-Tier Confidence Gate:</strong> Automated side-by-side diff preview before DB mutation.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Cryptographic Audit Trail:</strong> Complete explainability log for SOX/GDPR.</span>
                  </div>
                </div>
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
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 Squad: 5 UX + 6 Firmware Devs</span>
                <span class="footprint-pill">⚡ 16 Sprints</span>
                <span class="footprint-pill">🛡️ Rugged Design System</span>
              </div>
              <h2 class="card-title">Zebra Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics</h2>
              <p class="card-lead">
                Scaling IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers and sub-zero freezer hubs (-25°C).
              </p>

              <!-- 3-Step Journey Strip -->
              <div class="card-journey-strip">
                <div class="journey-step">
                  <span class="journey-step-tag crisis">01. Legacy Crisis</span>
                  <span class="journey-step-text">Staging 1,000 scanners took 4.5 days of manual USB tethering; batteries failed mid-shift.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag pivot">02. Manager Intervention</span>
                  <span class="journey-step-text">In-situ cold-storage research (-25°C); designed 1-scan 2D barcode provisioning engine.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag impact">03. Shipped Impact</span>
                  <span class="journey-step-text">Staging accelerated from 4.5 days to 8s (-99%); warehouse conveyor downtime cut by 45%.</span>
                </div>
              </div>
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
              <div class="browser-screenshot-wrap">
                <img src="screenshots/transformation-zebra.png" alt="Zebra Enterprise Device Cloud Telematics" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● 1.2M+ ACTIVE DEPLOYED SCANNERS</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Spatial Telematics Console:</strong> Live floor plan locating 1,200+ units across 5 zones.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Predictive Battery Matrix:</strong> Degradation warning flags low units before shift begins.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Zero-Touch 1-Scan Setup:</strong> Dynamic encrypted barcode provisions units in 8s.</span>
                  </div>
                </div>
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
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 Multi-Squad: 14 Product Squads</span>
                <span class="footprint-pill">⚡ Ongoing Flywheel</span>
                <span class="footprint-pill">🛡️ Carbon Token Engine</span>
              </div>
              <h2 class="card-title">IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance</h2>
              <p class="card-lead">
                Eliminating systemic design debt and engineering rework by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads via the Contribution Council flywheel.
              </p>

              <!-- 3-Step Journey Strip -->
              <div class="card-journey-strip">
                <div class="journey-step">
                  <span class="journey-step-tag crisis">01. Legacy Crisis</span>
                  <span class="journey-step-text">14 distributed squads suffered visual drift, duplicate CSS, and 70% QA visual bug rate.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag pivot">02. Manager Intervention</span>
                  <span class="journey-step-text">Founded Contribution Council flywheel; built automated Figma Variables to React CI/CD sync.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag impact">03. Shipped Impact</span>
                  <span class="journey-step-text">-70% QA visual defects, +28% front-end sprint lift, and 100% WCAG 2.1 AA parity.</span>
                </div>
              </div>
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
              <div class="browser-screenshot-wrap">
                <img src="screenshots/transformation-ibm-carbon.png" alt="IBM Carbon Token Engine CI/CD" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● FIGMA-TO-REACT CI/CD SYNC</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Multi-Tier Token Architecture:</strong> Global, semantic, and component tokens.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>GitHub Actions CI/CD Sync:</strong> Webhook automatically compiles Style Dictionary.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Contribution Council Flywheel:</strong> Democratic governance for 14 squads.</span>
                  </div>
                </div>
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
              <div class="card-footprint-row">
                <span class="footprint-pill">👥 Squad: 4 HMI Designers + 5 CAN-Bus Devs</span>
                <span class="footprint-pill">⚡ 12 Sprints</span>
                <span class="footprint-pill">🛡️ EU Automotive HMI</span>
              </div>
              <h2 class="card-title">ZF Wabco Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics</h2>
              <p class="card-lead">
                Designing a distraction-free in-cab HUD cluster compliant with strict EU automotive standards (&lt;1.2s glance time), paired with an automated fleet command center for dispatchers.
              </p>

              <!-- 3-Step Journey Strip -->
              <div class="card-journey-strip">
                <div class="journey-step">
                  <span class="journey-step-tag crisis">01. Legacy Crisis</span>
                  <span class="journey-step-text">Commercial truck drivers overloaded by fragmented GPS, radar alarms, and dispatcher radios.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag pivot">02. Manager Intervention</span>
                  <span class="journey-step-text">Autobahn night cab research; architected 3-zone cluster strictly compliant with &lt;1.2s glance time.</span>
                </div>
                <div class="journey-step">
                  <span class="journey-step-tag impact">03. Shipped Impact</span>
                  <span class="journey-step-text">Shipped to 80,000+ European trucks; reduced route deviations by 18% and cut fuel burn by 6.2%.</span>
                </div>
              </div>
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
              <div class="browser-screenshot-wrap">
                <img src="screenshots/transformation-zf-wabco.png" alt="ZF Wabco 3-Zone Automotive Cockpit HUD" class="browser-screenshot-img">
              </div>
              <div class="browser-mini-body">
                <span class="mini-tag-badge">● 3-ZONE ERGONOMIC COCKPIT HUD</span>
                <div class="preview-callout-badges">
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>3-Zone Ergonomic HUD Cluster:</strong> Zone 1 speed &amp; radar, Zone 2 turns.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Strict &lt;1.2s Glance Compliance:</strong> Tested with eye-tracking to eliminate distraction.</span>
                  </div>
                  <div class="preview-callout-badge">
                    <span class="callout-badge-icon">✓</span>
                    <span><strong>Real-Time CAN-Bus Telematics:</strong> Direct vehicle engine diagnostics sync.</span>
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
      <div class="footer-left">
        <h5>Balaajee V.R. &bull; Senior UI/UX Design Manager</h5>
        <p>Selected Work Portfolio &bull; 5 Flagship Enterprise Transformations &bull; Open to Relocation</p>
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

</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'work.html'), workHtml, 'utf8');
console.log('work.html compiled successfully (Dedicated Selected Work Portal).');
"""

# Extract the CSS block of scrollableCaseStyles from original file
s_start = orig.find('const scrollableCaseStyles = `') + len('const scrollableCaseStyles = `')
s_end = orig.find('`;\n\n// Helper function to build a full-depth')
orig_case_styles = orig[s_start:s_end]

# Additional CSS rules to append
new_case_styles = """
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
"""

all_case_styles = orig_case_styles + new_case_styles

# ----------------------------------------------------------------------------
# 2. Enhanced buildScrollableCasePage Function
# ----------------------------------------------------------------------------
fn_template = """
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

</body>
</html>`;
}
"""

# Extract the existing 5 case datasets from orig
pos_cases_start = orig.find('// ----------------------------------------------------------------------------\n// CASE 1: ERICSSON SALESOPS CLOUD')
cases_code = orig[pos_cases_start:part_d_pos]

# Now, we will inject our fields into each case in cases_code using string replacements!

# 1. ERICSSON
ericsson_injection = """
  screenshotImg: 'screenshots/transformation-ericsson.png',
  screenshotUrl: 'https://salesops.ericsson.net/deals/deal-4820/bom-configurator',
  managerSteps: [
    {
      phase: 'Discovery & Audit',
      title: '14-Tab Excel Macro Audit',
      desc: 'Audited 50MB unversioned workbook across 45 countries; mapped 42 cascading #REF! failure modes and 12,000 catalog parts.',
      deliverable: 'Risk Register & Metric Baseline',
      metric: 'Quantified 6-day deal delay'
    },
    {
      phase: 'In-Situ Research',
      title: 'Contextual Shadowing in Stockholm',
      desc: 'Shadowed 12 senior sales engineers on live operator bids; identified keyboard shortcuts and clipboard velocity as non-negotiable adoption criteria.',
      deliverable: 'Ergonomic Persona & Mental Model Map',
      metric: '100% engineer buy-in on grid UX'
    },
    {
      phase: 'Systems & IA',
      title: 'Keyboard Data Grid Architecture',
      desc: 'Re-architected 18-step quoting ordeal into single-pane high-density grid with instant formula calculation and automated green-channel approvals.',
      deliverable: 'Single-Pane IA & Flow Blueprint',
      metric: 'Steps reduced from 18 to 5'
    },
    {
      phase: 'DesignOps & Tokens',
      title: 'Financial Token System & Parity',
      desc: 'Authored DesignOps token library with strict tabular typography, real-time margin status colors, and zero-defect numeric inputs.',
      deliverable: 'Ericsson CPQ Token Library',
      metric: 'Zero visual regression in QA'
    },
    {
      phase: 'Validation & Scale',
      title: 'Global Benchmark & Enterprise Rollout',
      desc: 'Conducted usability benchmarking in Stockholm and Chennai; drove voluntary adoption to 94% in 30 days and reduced deal cycle from 6 days to 42 minutes.',
      deliverable: 'Usability Benchmark Report (SUS 87)',
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
"""

cases_code = cases_code.replace("caseId: 'ericsson',", "caseId: 'ericsson',\n" + ericsson_injection)

# 2. WATSON
watson_injection = """
  screenshotImg: 'screenshots/transformation-ibm-watson.png',
  screenshotUrl: 'https://orchestrate.ibm.com/mesh/autonomous-agent-governance',
  managerSteps: [
    {
      phase: 'Discovery & Audit',
      title: 'SOX Compliance & Risk Audit',
      desc: 'Audited black-box LLM risks across Fortune 500 enterprise finance; identified legal liability fears stalling AI adoption in ERP/CRM.',
      deliverable: 'SOX Governance Risk Assessment',
      metric: 'Pinpointed 0-audit trail vulnerability'
    },
    {
      phase: 'In-Situ Research',
      title: 'Executive Inquiries in New York',
      desc: 'Shadowed Enterprise Operations Directors and compliance officers; learned that adoption requires deterministic diff review, not conversational chat.',
      deliverable: 'Human-in-the-Loop Empathy Framework',
      metric: 'Defined confidence threshold criteria'
    },
    {
      phase: 'Systems & IA',
      title: 'Agentic Mesh & Confidence Gating',
      desc: 'Designed visual multi-agent orchestration canvas with 3-tier confidence gating (Green: auto-commit; Yellow: diff check; Red: manual override).',
      deliverable: 'Agentic State Machine & Wireframe Architecture',
      metric: '94.2% autonomous confidence'
    },
    {
      phase: 'DesignOps & Tokens',
      title: 'Carbon AI Agentic Tokens',
      desc: 'Led DesignOps token governance across 14 distributed squads, creating standardized agent state badges, confidence meters, and diff visualizers.',
      deliverable: 'Carbon AI Agentic Token Package',
      metric: '14 squads synced with zero drift'
    },
    {
      phase: 'Validation & Scale',
      title: 'Enterprise Pilot & SOX Certification',
      desc: 'Tested with enterprise operations teams; delivered 62% task velocity improvement, 0 SOX compliance violations, and full audit traceability.',
      deliverable: 'Regulatory Audit & Pilot Scorecard',
      metric: '+62% velocity, 0 violations'
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
"""

cases_code = cases_code.replace("caseId: 'watson',", "caseId: 'watson',\n" + watson_injection)

# 3. ZEBRA
zebra_injection = """
  screenshotImg: 'screenshots/transformation-zebra.png',
  screenshotUrl: 'https://cloud.zebra.com/telematics/distribution-hub-chicago',
  managerSteps: [
    {
      phase: 'Discovery & Audit',
      title: 'Logistics Staging & Downtime Audit',
      desc: 'Audited staging workflows across e-commerce fulfillment hubs; quantified 4.5 days per 1,000 units wasted in manual USB tethering.',
      deliverable: 'Warehouse Bottleneck Analysis',
      metric: 'Identified 4.5-day staging freeze'
    },
    {
      phase: 'In-Situ Research',
      title: 'Sub-Zero Freezers (-25°C) Shadowing',
      desc: 'Shadowed warehouse pickers and IT leads in Chicago; discovered touchscreens were unusable with thermal gloves, requiring high contrast and acoustic feedback.',
      deliverable: 'Sub-Zero Physical Ergonomics Matrix',
      metric: '100% glove-compatible design target'
    },
    {
      phase: 'Systems & IA',
      title: '1-Scan 2D Staging & Spatial IA',
      desc: 'Architected instant zero-touch barcode provisioning protocol and multi-zone spatial telematics console with real-time scanner tracking.',
      deliverable: 'Zero-Touch Provisioning Specification',
      metric: 'Staging reduced from 4.5d to 8s'
    },
    {
      phase: 'DesignOps & Tokens',
      title: 'Rugged Industrial Design Tokens',
      desc: 'Engineered high-contrast industrial token system with 72px touch targets, audible frequency cues, and battery degradation indicators.',
      deliverable: 'Zebra Rugged UI Component Kit',
      metric: 'Full outdoor glare & sub-zero compliance'
    },
    {
      phase: 'Validation & Scale',
      title: '1.2M Device Fleet Deployment',
      desc: 'Rolled out across global distribution centers; cut conveyor downtime by 45%, staged 1.2M+ devices, and filed enterprise design patent.',
      deliverable: 'Patent Application & Fleet Telemetry Report',
      metric: '-45% conveyor halts, 1.2M units'
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
"""

cases_code = cases_code.replace("caseId: 'zebra',", "caseId: 'zebra',\n" + zebra_injection)

# 4. CARBON
carbon_injection = """
  screenshotImg: 'screenshots/transformation-ibm-carbon.png',
  screenshotUrl: 'https://carbon.carbondesignsystem.com/designops/token-engine',
  managerSteps: [
    {
      phase: 'Discovery & Audit',
      title: 'Multi-Squad Design Debt Audit',
      desc: 'Audited 14 software squad codebases; discovered 70% of front-end QA tickets were visual regression bugs caused by hardcoded hexes and CSS overrides.',
      deliverable: 'Design Debt & QA Ticket Audit Report',
      metric: '70% visual regression defect rate'
    },
    {
      phase: 'In-Situ Research',
      title: 'Developer & Designer Friction Inquiries',
      desc: 'Shadowed squad leads across Bangalore, Austin, and San Jose; identified broken handoffs between Figma variable updates and React codebases.',
      deliverable: 'Cross-Functional Workflow Journey Map',
      metric: 'Identified 25% sprint time wasted on CSS'
    },
    {
      phase: 'Systems & IA',
      title: 'Token Architecture & Governance Flywheel',
      desc: 'Architected 3-tier token hierarchy (global, semantic, component) and established democratic Contribution Council RFC process.',
      deliverable: 'Carbon Token Taxonomy & RFC Guidelines',
      metric: '180+ tokenized variables defined'
    },
    {
      phase: 'DesignOps & Tokens',
      title: 'Automated GitHub CI/CD Token Engine',
      desc: 'Built Style Dictionary compilation pipeline triggered by Figma webhook, generating automated pull requests to React and Web Component repos.',
      deliverable: 'Figma-to-React GitHub Actions Pipeline',
      metric: 'Zero-conflict automated token PRs'
    },
    {
      phase: 'Validation & Scale',
      title: '14-Squad Parity & Velocity Lift',
      desc: 'Synchronized 14 product squads; reduced visual QA bugs by 70%, boosted front-end sprint velocity by +28%, and achieved 100% WCAG 2.1 AA compliance.',
      deliverable: 'DesignOps Velocity & Quality Scorecard',
      metric: '-70% QA bugs, +28% sprint lift'
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
"""

cases_code = cases_code.replace("caseId: 'carbon',", "caseId: 'carbon',\n" + carbon_injection)

# 5. WABCO
wabco_injection = """
  screenshotImg: 'screenshots/transformation-zf-wabco.png',
  screenshotUrl: 'https://telematics.zf.com/cockpit/can-bus-hud',
  managerSteps: [
    {
      phase: 'Discovery & Audit',
      title: 'Driver Cognitive Overload Audit',
      desc: 'Audited European commercial truck cab displays; identified severe cognitive overload from fragmented GPS units, radar alarms, and dispatcher radios.',
      deliverable: 'Cockpit Ergonomics & Safety Audit',
      metric: 'Identified 2.8s eyes-off-road risk'
    },
    {
      phase: 'In-Situ Research',
      title: 'Autobahn Night Route Shadowing',
      desc: 'Traveled with long-haul drivers on German Autobahn night routes; measured eye glance times and identified nighttime headlight glare as critical risk.',
      deliverable: 'In-Cab Glance Time & Lighting Map',
      metric: 'Established strict <1.2s glance target'
    },
    {
      phase: 'Systems & IA',
      title: '3-Zone Ergonomic Cockpit IA',
      desc: 'Re-architected in-cab cluster into 3 distinct ergonomic zones: Zone 1 (Radar/Speed), Zone 2 (Turn Navigation), Zone 3 (Peripheral Eco-Coaching).',
      deliverable: '3-Zone Cockpit Layout Specification',
      metric: 'Eliminated all sub-menus while driving'
    },
    {
      phase: 'DesignOps & Tokens',
      title: 'Automotive-Grade HMI Design System',
      desc: 'Engineered high-contrast, glare-resistant HMI tokens strictly compliant with EU distraction guidelines and day/night ambient light sensors.',
      deliverable: 'Automotive CAN-Bus UI Token Kit',
      metric: '100% compliance with EU transport laws'
    },
    {
      phase: 'Validation & Scale',
      title: '80,000+ Truck Deployment & Safety ROI',
      desc: 'Deployed to European freight fleets; achieved average glance time of 0.94s, reduced route navigation errors by 18%, and cut fuel burn by 6.2%.',
      deliverable: 'Fleet Safety & Ergonomic Validation Report',
      metric: 'Glance 0.94s (<1.2s max), 80k trucks'
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
"""

cases_code = cases_code.replace("caseId: 'wabco',", "caseId: 'wabco',\n" + wabco_injection)

# ----------------------------------------------------------------------------
# 3. Assemble New build_executive_suite.js
# ----------------------------------------------------------------------------
part_c = f"""// ============================================================================
// PART C: 5 FULL-SIZE, MULTI-SECTION SCROLLABLE DEEP DIVES
// ============================================================================
console.log('3. Compiling 5 Full-Size, Multi-Section Scrollable Deep Dives...');

// Shared CSS for Long-Form Scrollable Case Studies
const scrollableCaseStyles = `{all_case_styles}`;

{fn_template}

{cases_code}
"""

new_full_suite = part_a + part_b + "\n" + part_c + "\n" + part_d

with open('build_executive_suite.js', 'w', encoding='utf-8') as f:
    f.write(new_full_suite)

print("Successfully written updated build_executive_suite.js!")
print(f"New file length: {len(new_full_suite)} characters")
