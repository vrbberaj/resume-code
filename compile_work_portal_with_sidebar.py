# compile_work_portal_with_sidebar.py
import json
import os
import re

print("Compiling work.html with Sticky Floating Left Panel and Modern Dashboard Single-Pane View...")

# Import shared prototypes & styles from specialization_data
from specialization_data import (
    ericsson_proto_html, watson_proto_html, zebra_proto_html,
    carbon_proto_html, wabco_proto_html,
    ericsson_steps, watson_steps, zebra_steps,
    carbon_steps, wabco_steps,
    interactive_proto_styles, shared_proto_js
)

# Read globalCoreStyles & commonHeadLinks from build_executive_suite.js
with open('build_executive_suite.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract commonHeadLinks
m_head = re.search(r'const commonHeadLinks = `([\s\S]*?)`;', text)
commonHeadLinks = m_head.group(1) if m_head else ''

# Extract globalCoreStyles
m_styles = re.search(r'const globalCoreStyles = `([\s\S]*?)`;', text)
globalCoreStyles = m_styles.group(1) if m_styles else ''

# 5 Projects Data Ordered: 1. IBM, 2. Ericsson, 3. Zebra, 4. Carbon, 5. Wabco
projects_data = [
    {
        "id": "case-1",
        "badgeKey": "ibm",
        "company": "IBM India Software Labs",
        "coPill": "IBM",
        "specPill": "Agentic AI & HITL Governance",
        "title": "IBM Watson: Multi-Agent AI Task Automation & Agentic Governance in Rhapsody SE & MaaS360",
        "lead": "Architecting autonomous multi-agent task execution and mathematical confidence gating across enterprise systems modeling (Rhapsody SE) and unified endpoint security (MaaS360), eliminating black-box hallucination risks in mission-critical environments.",
        "managerTag": "Senior UI/UX Design Manager Execution Framework",
        "methodology": [
            {"num": "01", "name": "Cognitive Audit", "detail": "18 risk vectors"},
            {"num": "02", "name": "Confidence Gating", "detail": ">=95% auto-route"},
            {"num": "03", "name": "Multi-Agent Mesh", "detail": "State machines"},
            {"num": "04", "name": "Side-by-Side Diff", "detail": "Delta token review"},
            {"num": "05", "name": "SOX Compliance", "detail": "Immutable audit"}
        ],
        "metrics": [
            {"val": "74% Faster", "label": "Model Drafting (14h -> 3.6h)"},
            {"val": "82% Faster", "label": "Endpoint Triage (4h -> 43m)"},
            {"val": "0 Violations", "label": "SOX / Compliance Risk Across 140k Tasks"},
            {"val": "12 Designers", "label": "UX-as-a-Service Team Re-Org"}
        ],
        "screenshot": "screenshots/transformation-ibm-watson.png",
        "screenshotAlt": "IBM Watson Agentic AI Production Interface",
        "previewUrl": "https://watson.ibm.com/governance/agentic-mesh",
        "callouts": [
            {"icon": "⚡", "text": "<strong>Multi-Agent State Machine:</strong> Visual canvas displays live agent coordination with sub-agent dependency tracking."},
            {"icon": "🛡️", "text": "<strong>3-Tier Confidence Router:</strong> Actions >=95% execute instantly; 80-94% trigger mandatory side-by-side diff approvals."},
            {"icon": "📜", "text": "<strong>Cryptographic Audit Drawer:</strong> Full reasoning traces and SOX-compliant ledger diffs before production commit."}
        ],
        "protoHtml": watson_proto_html.replace('`', ''),
        "caseHref": "case-ibm-watson.html"
    },
    {
        "id": "case-2",
        "badgeKey": "ericsson",
        "company": "Ericsson Global",
        "coPill": "ERICSSON",
        "specPill": "High-Density Data Grids & Financial Architecture",
        "title": "Ericsson SalesOps Cloud: Modernizing 14-Tab Legacy Excel Chaos into an Automated Deal Engine",
        "lead": "Replaced an unversioned 50MB spreadsheet quoting ordeal across 45 countries with a keyboard-navigable single-pane data grid, cutting deal turnaround from 6 days to 42 minutes with zero formula defects across 12,000 catalog parts.",
        "managerTag": "High-Density Financial Data Grid Pipeline",
        "methodology": [
            {"num": "01", "name": "Formula Audit", "detail": "14 tabs & 42 #REF!"},
            {"num": "02", "name": "Shadowing", "detail": "Keyboard speed Stockholm"},
            {"num": "03", "name": "Single-Pane IA", "detail": "Zero-modal 12k grid"},
            {"num": "04", "name": "Reactive Tokens", "detail": "Sub-16ms live formula"},
            {"num": "05", "name": "Governance", "detail": "Auto green channel >=35%"}
        ],
        "metrics": [
            {"val": "6d &rarr; 42m", "label": "Turnaround (-92%)"},
            {"val": "100%", "label": "Verified Pricing Accuracy"},
            {"val": "0%", "label": "Formula Error Rate"},
            {"val": "1,200+", "label": "Global Sales Engineers"}
        ],
        "screenshot": "screenshots/behance/ericsson_desktop_grid.png",
        "screenshotAlt": "Ericsson Network Configuration & Profile Grid",
        "previewUrl": "https://salesops.ericsson.net/deals/deal-4820/bom-configurator",
        "callouts": [
            {"icon": "⚡", "text": "<strong>Keyboard Data Grid:</strong> Arrow navigation and instant inline editing matching Excel muscle memory."},
            {"icon": "🛡️", "text": "<strong>Live Margin Guardrail:</strong> Sub-16ms recalculation of 38.4% gross margin on every discount change."},
            {"icon": "📄", "text": "<strong>1-Click Contract PDF:</strong> Auto-populates verified SAP catalog parts with zero manual re-keying."}
        ],
        "protoHtml": ericsson_proto_html.replace('`', ''),
        "caseHref": "case-ericsson.html"
    },
    {
        "id": "case-3",
        "badgeKey": "zebra",
        "company": "Zebra Technologies",
        "coPill": "ZEBRA",
        "specPill": "Industrial IoT & Physical Ergonomics",
        "title": "Zebra Technologies: Multi-Modal Edge Device Provisioning & Warehouse Floor Telemetry",
        "lead": "Engineered high-contrast, physical-ergonomic workflows for rugged Android touch computers operating in sub-zero freezer warehouses (-25°C), reducing scanner pairing dropouts by 84% through audible and haptic spatial cues.",
        "managerTag": "Physical Context Ergonomics & IoT Telemetry",
        "methodology": [
            {"num": "01", "name": "Freezer Shadow", "detail": "-25C Chicago glove test"},
            {"num": "02", "name": "Glove Targets", "detail": "72px touch hit areas"},
            {"num": "03", "name": "Audio-Haptic", "detail": "105dB warehouse chime"},
            {"num": "04", "name": "1-Scan QR Staging", "detail": "Zero-touch setup"},
            {"num": "05", "name": "Spatial Floor IA", "detail": "Floor map asset locator"}
        ],
        "metrics": [
            {"val": "84% Drop", "label": "Scanner Provisioning Failures"},
            {"val": "3.2x Faster", "label": "Floor Staging Throughput"},
            {"val": "72px Min", "label": "Thermal Glove Hit Target"},
            {"val": "38,000+", "label": "Active Handhelds Managed"}
        ],
        "screenshot": "screenshots/behance/zebra_rfid_clean.png",
        "screenshotAlt": "Zebra Enterprise Device Staging & Telemetry",
        "previewUrl": "https://iot-cloud.zebra.com/devices/staging-cockpit",
        "callouts": [
            {"icon": "⚡", "text": "<strong>1-Scan QR Staging:</strong> Generates encrypted multi-device barcode payload for instant zero-touch staging."},
            {"icon": "🛡️", "text": "<strong>Sub-Zero Dark Mode:</strong> High-visibility amber palette optimized for high-glare and frozen optics."},
            {"icon": "📦", "text": "<strong>Spatial Warehouse Locator:</strong> Interactive SVG floor grid locating beacons with +/-0.5m accuracy."}
        ],
        "protoHtml": zebra_proto_html.replace('`', ''),
        "caseHref": "case-zebra.html"
    },
    {
        "id": "case-4",
        "badgeKey": "carbon",
        "company": "IBM Carbon",
        "coPill": "CARBON",
        "specPill": "Enterprise Token Architecture & Systems Governance",
        "title": "IBM Carbon Design System: Multi-Tier Token Governance Across 60+ Cloud Applications",
        "lead": "Architected a multi-brand token pipeline (Global &rarr; Semantic &rarr; Component) synchronizing design tokens from Figma Variables to React, Angular, and iOS codebases via GitHub Actions CI/CD with zero design debt.",
        "managerTag": "Multi-Brand DesignOps & Token Governance",
        "methodology": [
            {"num": "01", "name": "Token Taxonomy", "detail": "Global, Semantic, Comp"},
            {"num": "02", "name": "Figma Variables", "detail": "Theme modes 100% mapped"},
            {"num": "03", "name": "Style Dictionary", "detail": "CSS, JSON, TS theme output"},
            {"num": "04", "name": "Automated CI/CD", "detail": "Zero-defect PR generator"},
            {"num": "05", "name": "Runtime Engine", "detail": "Sub-10ms theme switching"}
        ],
        "metrics": [
            {"val": "100%", "label": "Token Parity (Figma to Code)"},
            {"val": "18 Min", "label": "Token-to-Production CI/CD"},
            {"val": "60+", "label": "Enterprise Apps Powered"},
            {"val": "0 Code PRs", "label": "For Semantic Color Changes"}
        ],
        "screenshot": "screenshots/behance/carbon_tokens_clean.png",
        "screenshotAlt": "IBM Carbon Design System Token Studio & Spec",
        "previewUrl": "https://carbon.carbondesignsystem.com/tokens/interactive-studio",
        "callouts": [
            {"icon": "⚡", "text": "<strong>Multi-Tier Token Engine:</strong> Real-time inspector showing Global &rarr; Semantic &rarr; Component token resolution."},
            {"icon": "🛡️", "text": "<strong>Automated PR Generator:</strong> 1-click token build pushing formatted JSON to production repositories."},
            {"icon": "🎨", "text": "<strong>Runtime Theme Switcher:</strong> Instant hot-swapping between White, Gray 10, Gray 90, and Gray 100 themes."}
        ],
        "protoHtml": carbon_proto_html.replace('`', ''),
        "caseHref": "case-ibm-carbon.html"
    },
    {
        "id": "case-5",
        "badgeKey": "wabco",
        "company": "ZF Wabco",
        "coPill": "WABCO",
        "specPill": "Automotive Cockpit & Safety-Critical UX",
        "title": "ZF Wabco: Mission-Critical Commercial Vehicle Cockpit & Fleet Telematics HUD",
        "lead": "Architected a commercial vehicle telematics cluster and mobile driver companion adhering to strict ISO 15005 / UNECE glance budgets (<1.2s gaze ceiling), integrating live radar collision warnings, brake pad wear sensors, and route telemetry.",
        "managerTag": "Mission-Critical Automotive Ergonomics",
        "methodology": [
            {"num": "01", "name": "Glance Budget", "detail": "<1.2s legal ceiling pass"},
            {"num": "02", "name": "Zone Architecture", "detail": "HUD, Radar, Telematics"},
            {"num": "03", "name": "Night Ergonomics", "detail": "Ultra-low glare anti-fatigue"},
            {"num": "04", "name": "CAN-Bus Sync", "detail": "Sub-20ms sensor rendering"},
            {"num": "05", "name": "UNECE Audit", "detail": "100% regulatory sign-off"}
        ],
        "metrics": [
            {"val": "<1.2s", "label": "Driver Glance Ceiling (Pass)"},
            {"val": "3 Zones", "label": "HUD Speed, Radar, Alarms"},
            {"val": "100%", "label": "UNECE Safety Compliance"},
            {"val": "0 Friction", "label": "Night & High-Glare Ergonomics"}
        ],
        "screenshot": "screenshots/behance/zf_mobile_clean.png",
        "screenshotAlt": "ZF Wabco Cockpit HUD Cluster & Mobile Telematics",
        "previewUrl": "https://telematics.zf-wabco.com/cockpit/cluster-hud",
        "callouts": [
            {"icon": "⚡", "text": "<strong>3-Zone Visual Partitioning:</strong> Zone 1 Speed HUD, Zone 2 Radar Telemetry, Zone 3 Active Event Log."},
            {"icon": "🛡️", "text": "<strong><1.2s Gaze Budget Compliance:</strong> Strict visual hierarchy preventing dangerous driver distraction."},
            {"icon": "🚗", "text": "<strong>CAN-Bus Telematics Sync:</strong> Live tire pressure, radar headway, and obstacle proximity warnings."}
        ],
        "protoHtml": wabco_proto_html.replace('`', ''),
        "caseHref": "case-zf-wabco.html"
    }
]

# Build the Left Sidebar Items HTML (With data-target for dashboard switching)
sidebar_items_html = """
      <a href="#specialization-pillars" class="work-nav-item active" data-target="specialization-pillars" onclick="switchWorkView('specialization-pillars', this); return false;">
        <div class="work-nav-icon">🏛️</div>
        <div class="work-nav-text">
          <div class="work-nav-title">Specialization Overview</div>
          <div class="work-nav-sub">5 Enterprise Pillars</div>
        </div>
      </a>
"""

for p in projects_data:
    sidebar_items_html += f"""
      <a href="#{p['id']}" class="work-nav-item" data-target="{p['id']}" onclick="switchWorkView('{p['id']}', this); return false;">
        <span class="work-nav-badge {p['badgeKey']}">{p['coPill']}</span>
        <div class="work-nav-text">
          <div class="work-nav-title">{p['specPill']}</div>
          <div class="work-nav-sub">{p['company']}</div>
        </div>
      </a>
    """

# Build the Cards HTML (Each card is a work-view-pane with prev/next dashboard controls)
cards_html = ""
for idx, p in enumerate(projects_data):
    methodology_steps_html = "".join([
        f'<div class="d-step-item"><span class="d-step-num">{s["num"]}</span><div><strong>{s["name"]}:</strong> {s["detail"]}</div></div>'
        for s in p["methodology"]
    ])
    
    metrics_html = "".join([
        f'<div class="t-stat-card"><div class="t-stat-val">{m["val"]}</div><div class="t-stat-label">{m["label"]}</div></div>'
        for m in p["metrics"]
    ])
    
    callouts_html = "".join([
        f'<div class="preview-callout-badge"><span class="callout-badge-icon">{c["icon"]}</span><span>{c["text"]}</span></div>'
        for c in p["callouts"]
    ])

    prev_target = "specialization-pillars" if idx == 0 else projects_data[idx-1]["id"]
    prev_label = "Specialization Overview" if idx == 0 else f"{projects_data[idx-1]['coPill']}: {projects_data[idx-1]['specPill']}"
    next_target = "specialization-pillars" if idx == len(projects_data) - 1 else projects_data[idx+1]["id"]
    next_label = "Specialization Overview" if idx == len(projects_data) - 1 else f"{projects_data[idx+1]['coPill']}: {projects_data[idx+1]['specPill']}"

    cards_html += f"""
    <!-- Case #{idx+1}: {p['company']} (Dashboard View Pane) -->
    <article class="transformation-card work-view-pane" id="{p['id']}">
      <div class="card-header-bar">
        <div class="card-badges-left">
          <span class="pill-co">{p['company']}</span>
          <span class="pill-spec">Specialization: {p['specPill']}</span>
        </div>
        <a href="{p['caseHref']}" class="btn-deep-dive-pill">
          <span>Read Full Case Study</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>

      <div class="card-hero-text">
        <h2 class="card-title">{p['title']}</h2>
        <p class="card-lead">{p['lead']}</p>
      </div>

      <!-- Domain Methodology Process Strip -->
      <div class="domain-methodology-strip">
        <div class="d-strip-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span>DOMAIN METHODOLOGY: {p['managerTag']}</span>
        </div>
        <div class="d-steps-grid">
          {methodology_steps_html}
        </div>
      </div>

      <!-- Shipped Production Evidence Screenshot -->
      <div class="browser-screenshot-canvas">
        <div class="browser-mockup-header">
          <div class="browser-dots">
            <span class="b-dot red"></span>
            <span class="b-dot yellow"></span>
            <span class="b-dot green"></span>
          </div>
          <div class="browser-url-pill">{p['previewUrl']}</div>
          <span class="browser-status-tag">PRODUCTION DELIVERABLE</span>
        </div>
        <div class="browser-screenshot-wrapper">
          <img src="{p['screenshot']}" alt="{p['screenshotAlt']}" class="browser-screenshot-img" loading="lazy">
        </div>
      </div>

      <!-- Interactive Working Prototype Simulation -->
      {p['protoHtml']}

      <!-- Key Deliverable Features -->
      <div class="preview-callout-badges">
        {callouts_html}
      </div>

      <!-- Metrics Row -->
      <div class="card-metrics-row">
        {metrics_html}
      </div>

      <!-- Card Footer CTA -->
      <div class="card-footer-cta">
        <div class="footer-cta-text">
          <strong>Interested in the complete design management defense?</strong>
          <span>Explore user shadowing recordings, SysML state machine diagrams, and executive CAR defense.</span>
        </div>
        <a href="{p['caseHref']}" class="btn-primary-card">
          <span>Explore 8-Chapter Narrative Defense</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>

      <!-- In-Page Dashboard Switcher Footer -->
      <div class="dash-pane-switcher-bar">
        <button class="btn-dash-nav-prev" onclick="switchWorkView('{prev_target}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>&larr; {prev_label}</span>
        </button>
        <div class="dash-pane-progress">Transformation {idx+1} of {len(projects_data)}</div>
        <button class="btn-dash-nav-next" onclick="switchWorkView('{next_target}')">
          <span>{next_label} &rarr;</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </article>
    """

# Build Full work.html Page
work_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Selected Work: 5 UI/UX Specializations in Complex Enterprise Systems | Balaajee V.R.</title>
  <meta name="description" content="Dedicated single-pane dashboard of 5 flagship enterprise product transformations illustrating deep craft across Agentic AI governance, high-density financial data grids, industrial IoT, token architecture, and automotive cockpits.">
  {commonHeadLinks}
  <style>
    {globalCoreStyles}
    {interactive_proto_styles}

    .work-hero-header {{
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 40px 0 32px;
    }}

    .work-container {{
      max-width: 1380px;
      margin: 0 auto;
      padding: 0 24px;
    }}

    .work-pretitle {{
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary-accent);
      margin-bottom: 8px;
    }}

    .work-title {{
      font-family: var(--font-heading);
      font-size: 34px;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: var(--text-main);
      margin-bottom: 10px;
      line-height: 1.2;
    }}

    .work-desc {{
      font-size: 15px;
      color: var(--text-muted);
      max-width: 860px;
      line-height: 1.6;
    }}

    /* Native Visual Archive Banner (Replacing external Behance referral) */
    .native-archive-banner {{
      background: linear-gradient(135deg, #0D1627 0%, #172554 100%);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 16px;
      padding: 20px 24px;
      margin-top: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      box-shadow: 0 8px 24px rgba(13, 22, 39, 0.2);
    }}

    .archive-banner-left {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}

    .archive-banner-badge {{
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
    }}

    .archive-banner-text strong {{
      display: block;
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 3px;
    }}

    .archive-banner-text p {{
      font-size: 12.5px;
      color: #93C5FD;
      margin: 0;
      line-height: 1.45;
      max-width: 680px;
    }}

    .archive-link-btn {{
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
    }}

    .archive-link-btn:hover {{
      background: #60A5FA;
      color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(96, 165, 250, 0.35);
    }}

    /* 2-Column App Layout with Sticky Floating Left Panel */
    .work-app-layout {{
      max-width: 1380px;
      margin: 0 auto;
      padding: 32px 24px 80px;
      display: flex;
      gap: 32px;
      align-items: flex-start;
      position: relative;
    }}

    /* Sticky & Floating Left Sidebar */
    .work-left-sidebar {{
      width: 320px;
      flex-shrink: 0;
      background: #FFFFFF;
      border: 1px solid rgba(203, 213, 225, 0.95);
      border-radius: 18px;
      position: sticky;
      top: 84px;
      box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 14px -2px rgba(15, 23, 42, 0.04);
      overflow: hidden;
      box-sizing: border-box;
      max-width: 100%;
      z-index: 25;
      transition: all 0.25s ease;
      max-height: calc(100vh - 100px);
      display: flex;
      flex-direction: column;
    }}

    .work-left-sidebar:hover {{
      box-shadow: 0 20px 48px -6px rgba(15, 23, 42, 0.12), 0 6px 18px -2px rgba(15, 23, 42, 0.05);
    }}

    .work-sidebar-header {{
      padding: 18px 20px;
      background: var(--bg-subtle);
      border-bottom: 1px solid var(--border-subtle);
      flex-shrink: 0;
    }}

    .work-sidebar-tag {{
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 800;
      color: var(--primary-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: block;
      margin-bottom: 3px;
    }}

    .work-sidebar-title {{
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      color: var(--text-main);
      margin: 0;
    }}

    .work-sidebar-nav {{
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }}

    .work-nav-item {{
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 13px;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 10px;
      text-decoration: none;
      color: var(--text-body);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
    }}

    .work-nav-item:hover {{
      background: var(--bg-subtle);
      color: var(--text-main);
      transform: translateX(2px);
    }}

    .work-nav-item.active {{
      background: #EFF6FF;
      border-color: #3B82F6;
      color: #1D4ED8;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.14);
    }}

    .work-nav-item.active::after {{
      content: '';
      position: absolute;
      right: 12px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2563EB;
      box-shadow: 0 0 8px #2563EB;
    }}

    .work-nav-icon {{
      font-size: 16px;
      width: 24px;
      text-align: center;
    }}

    .work-nav-badge {{
      font-family: var(--font-code);
      font-size: 9.5px;
      font-weight: 800;
      padding: 3px 6px;
      border-radius: 5px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      flex-shrink: 0;
      min-width: 48px;
      text-align: center;
    }}

    .work-nav-badge.ibm {{ background: #EEF2FF; color: #4338CA; border: 1px solid #C7D2FE; }}
    .work-nav-badge.ericsson {{ background: #F0FDF4; color: #166534; border: 1px solid #BBF7D0; }}
    .work-nav-badge.zebra {{ background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }}
    .work-nav-badge.carbon {{ background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; }}
    .work-nav-badge.wabco {{ background: #FEF2F2; color: #B91C1C; border: 1px solid #FECACA; }}

    .work-nav-text {{
      flex-grow: 1;
      min-width: 0;
    }}

    .work-nav-title {{
      font-family: var(--font-heading);
      font-size: 12.5px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }}

    .work-nav-sub {{
      font-size: 11px;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }}

    .work-sidebar-footer {{
      padding: 12px 14px;
      border-top: 1px solid var(--border-subtle);
      background: var(--bg-subtle);
      flex-shrink: 0;
    }}

    .work-archive-link-btn {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 8px 12px;
      background: #0D1627;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-family: var(--font-heading);
      font-size: 11.5px;
      font-weight: 700;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }}

    .work-archive-link-btn:hover {{
      background: #1E293B;
    }}

    /* Main Content Area */
    .work-main-pane {{
      flex-grow: 1;
      min-width: 0;
      max-width: 100%;
    }}

    /* Modern Dashboard View Pane Switcher */
    .work-view-pane {{
      display: none;
      animation: fadeInDashboardView 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    .work-view-pane.active {{
      display: block;
    }}

    @keyframes fadeInDashboardView {{
      from {{
        opacity: 0;
        transform: translateY(8px);
      }}
      to {{
        opacity: 1;
        transform: translateY(0);
      }}
    }}

    /* Dashboard Context Status Bar */
    .work-dashboard-statusbar {{
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 12px 18px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }}

    .dash-status-left {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .dash-live-dot {{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
      flex-shrink: 0;
    }}

    .dash-status-title {{
      font-size: 13.5px;
      color: var(--text-main);
      font-family: var(--font-body);
    }}

    .dash-mode-pill {{
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 700;
      color: #0F62FE;
      background: rgba(15, 98, 254, 0.08);
      padding: 3px 8px;
      border-radius: 4px;
      border: 1px solid rgba(15, 98, 254, 0.2);
    }}

    /* Bottom Pane Switcher Bar */
    .dash-pane-switcher-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 24px;
      margin-top: 28px;
      border-top: 1px solid var(--border-subtle);
      flex-wrap: wrap;
      gap: 12px;
    }}

    .btn-dash-nav-prev, .btn-dash-nav-next {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 8px;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid var(--border-medium);
      background: #FFFFFF;
      color: var(--text-main);
    }}

    .btn-dash-nav-prev:hover, .btn-dash-nav-next:hover {{
      background: #F1F5F9;
      border-color: #94A3B8;
      transform: translateY(-1px);
    }}

    .btn-dash-nav-next {{
      background: #0F172A;
      color: #FFFFFF;
      border-color: #0F172A;
    }}

    .btn-dash-nav-next:hover {{
      background: #1E293B;
      color: #FFFFFF;
    }}

    .dash-pane-progress {{
      font-family: var(--font-code);
      font-size: 11.5px;
      color: var(--text-muted);
      font-weight: 600;
    }}

    /* 5 UI/UX Specialization Pillars Banner */
    .specialization-pillars-banner {{
      background: #FFFFFF;
      border: 1px solid var(--border-medium);
      border-radius: 20px;
      padding: 32px 36px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      max-width: 100%;
      box-sizing: border-box;
    }}

    .spec-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }}

    .spec-pretitle {{
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--primary-accent);
      margin-bottom: 6px;
    }}

    .spec-title {{
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.25;
    }}

    .spec-desc {{
      font-size: 14px;
      color: var(--text-muted);
      max-width: 720px;
      margin-top: 4px;
    }}

    .spec-badge {{
      font-family: var(--font-code);
      font-size: 11.5px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 100px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      color: var(--text-body);
      white-space: nowrap;
    }}

    .specialization-pillars-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      max-width: 100%;
      box-sizing: border-box;
    }}

    .spec-pillar-card {{
      background: var(--bg-base);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 20px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
      min-width: 0;
      box-sizing: border-box;
      cursor: pointer;
    }}

    .spec-pillar-card:hover {{
      transform: translateY(-2px);
      border-color: #3B82F6;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
    }}

    .s-pillar-icon {{
      font-size: 24px;
      margin-bottom: 12px;
    }}

    .s-pillar-domain {{
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--primary-accent);
      margin-bottom: 4px;
    }}

    .s-pillar-name {{
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 8px;
      line-height: 1.35;
    }}

    .s-pillar-desc {{
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 14px;
    }}

    .s-pillar-prototype {{
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 700;
      color: #0057FF;
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      padding: 4px 8px;
      border-radius: 6px;
      display: inline-block;
    }}

    /* Transformation Cards */
    .transformation-card {{
      background: #FFFFFF;
      border: 1px solid var(--border-medium);
      border-radius: 24px;
      padding: 36px 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      max-width: 100%;
      box-sizing: border-box;
    }}

    .card-header-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 12px;
    }}

    .card-badges-left {{
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }}

    .pill-co {{
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 5px 12px;
      border-radius: 6px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      color: var(--text-main);
    }}

    .pill-spec {{
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 5px 12px;
      border-radius: 6px;
      background: rgba(240, 6, 88, 0.08);
      border: 1px solid rgba(240, 6, 88, 0.25);
      color: var(--primary-accent);
    }}

    .btn-deep-dive-pill {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 700;
      color: var(--text-main);
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 100px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      transition: all 0.2s ease;
    }}

    .btn-deep-dive-pill:hover {{
      background: var(--text-main);
      color: #FFFFFF;
      border-color: var(--text-main);
    }}

    .card-hero-text {{
      margin-bottom: 24px;
    }}

    .card-title {{
      font-family: var(--font-heading);
      font-size: 24px;
      font-weight: 900;
      color: var(--text-main);
      margin-bottom: 8px;
      line-height: 1.25;
    }}

    .card-lead {{
      font-size: 14.5px;
      color: var(--text-muted);
      line-height: 1.6;
      max-width: 960px;
    }}

    /* Domain Methodology Strip */
    .domain-methodology-strip {{
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 28px;
    }}

    .d-strip-title {{
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-muted);
      margin-bottom: 12px;
    }}

    .d-strip-title svg {{
      color: var(--primary-accent);
    }}

    .d-steps-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
    }}

    .d-step-item {{
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 12px;
      color: var(--text-body);
      line-height: 1.4;
    }}

    .d-step-num {{
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 800;
      color: var(--primary-accent);
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      padding: 2px 5px;
      border-radius: 4px;
      flex-shrink: 0;
    }}

    /* Browser Mockup Canvas */
    .browser-screenshot-canvas {{
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 28px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }}

    .browser-mockup-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      background: #1E293B;
      border-bottom: 1px solid #334155;
    }}

    .browser-dots {{
      display: flex;
      gap: 6px;
    }}

    .b-dot {{
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }}

    .b-dot.red {{ background: #EF4444; }}
    .b-dot.yellow {{ background: #F59E0B; }}
    .b-dot.green {{ background: #10B981; }}

    .browser-url-pill {{
      font-family: var(--font-code);
      font-size: 11px;
      color: #94A3B8;
      background: #0F172A;
      padding: 3px 14px;
      border-radius: 100px;
      border: 1px solid #334155;
      max-width: 480px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }}

    .browser-status-tag {{
      font-family: var(--font-code);
      font-size: 9.5px;
      font-weight: 800;
      color: #10B981;
      background: rgba(16, 185, 129, 0.15);
      padding: 2px 8px;
      border-radius: 4px;
    }}

    .browser-screenshot-wrapper {{
      width: 100%;
      background: #000000;
      display: flex;
      justify-content: center;
    }}

    .browser-screenshot-img {{
      width: 100%;
      height: auto;
      display: block;
      max-height: 520px;
      object-fit: cover;
      object-position: top;
    }}

    /* Preview Callouts */
    .preview-callout-badges {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 12px;
      margin-bottom: 28px;
    }}

    .preview-callout-badge {{
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 12.5px;
      color: var(--text-body);
      line-height: 1.45;
    }}

    .callout-badge-icon {{
      font-size: 16px;
      flex-shrink: 0;
    }}

    /* Metrics Row */
    .card-metrics-row {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 14px;
      padding: 20px 0;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 24px;
    }}

    .t-stat-card {{
      text-align: left;
    }}

    .t-stat-val {{
      font-family: var(--font-heading);
      font-size: 26px;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.1;
      margin-bottom: 4px;
    }}

    .t-stat-label {{
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.35;
    }}

    /* Card Footer CTA */
    .card-footer-cta {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }}

    .footer-cta-text strong {{
      display: block;
      font-family: var(--font-heading);
      font-size: 14.5px;
      color: var(--text-main);
      margin-bottom: 2px;
    }}

    .footer-cta-text span {{
      font-size: 12.5px;
      color: var(--text-muted);
    }}

    .btn-primary-card {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: var(--text-main);
      color: #FFFFFF;
      border-radius: 100px;
      font-family: var(--font-heading);
      font-size: 13.5px;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.2s ease;
      white-space: nowrap;
    }}

    .btn-primary-card:hover {{
      background: var(--primary-accent);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(240, 6, 88, 0.3);
    }}

    @media (max-width: 900px) {{
      .work-app-layout {{
        flex-direction: column !important;
        gap: 16px !important;
        padding: 16px 16px 60px !important;
      }}

      .work-left-sidebar {{
        width: 100% !important;
        position: sticky !important;
        top: 88px !important;
        z-index: 40 !important;
        border-radius: 14px !important;
        background: rgba(255, 255, 255, 0.96) !important;
        backdrop-filter: blur(12px) !important;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08) !important;
        max-height: none !important;
        display: block !important;
      }}

      .work-sidebar-header {{
        padding: 10px 14px !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
      }}

      .work-sidebar-tag {{
        margin-bottom: 0 !important;
      }}

      .work-sidebar-nav {{
        flex-direction: row !important;
        overflow-x: auto !important;
        padding: 8px 10px !important;
        gap: 8px !important;
        max-height: none !important;
        -webkit-overflow-scrolling: touch !important;
        white-space: nowrap !important;
      }}

      .work-nav-item {{
        flex-shrink: 0 !important;
        padding: 8px 12px !important;
        width: auto !important;
      }}

      .work-nav-item.active::after {{
        display: none !important;
      }}

      .work-sidebar-footer {{
        display: none !important;
      }}

      .dash-pane-switcher-bar {{
        flex-direction: column !important;
        align-items: stretch !important;
      }}

      .btn-dash-nav-prev, .btn-dash-nav-next {{
        width: 100% !important;
        justify-content: center !important;
      }}

      .transformation-card {{
        padding: 24px 20px !important;
      }}
    }}
  </style>
</head>
<body>

  <!-- Navigation Bar (0 external links) -->
  <header class="global-header">
    <div class="header-container">
      <a href="/" class="brand-link" aria-label="BVR Portfolio Home">
        <span class="brand-monogram">BVR</span>
        <span class="brand-tag">Product Design Suite</span>
      </a>

      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/" class="nav-item">Welcome</a>
        <a href="/leadership" class="nav-item">👔 Leadership Deck</a>
        <a href="/work" class="nav-item active">🎨 Selected Work</a>
        <a href="/archive" class="nav-item">🖼️ Visual Archive</a>
        <a href="/cv" class="nav-item">📄 My Resume</a>
      </nav>

      <div class="header-actions">
        <a href="mailto:vrbberaj@gmail.com" class="btn-contact">
          Get In Touch &rarr;
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Title Header -->
  <header class="work-hero-header">
    <div class="work-container">
      <div class="work-pretitle">Enterprise Product Architecture &bull; Selected Work</div>
      <h1 class="work-title">Complex Systems Modernization: 5 Flagship Enterprise Case Studies</h1>
      <p class="work-desc">
        Senior UI/UX Design Manager leadership spanning Agentic AI governance, high-density financial data architecture, mission-critical industrial IoT, multi-brand design system tokens, and automotive cockpit safety ergonomics.
      </p>

      <!-- Native Visual Archive Banner -->
      <div class="native-archive-banner">
        <div class="archive-banner-left">
          <div class="archive-banner-badge">🖼️</div>
          <div class="archive-banner-text">
            <strong>Looking for raw visual deliverables, UI design sheets &amp; awards?</strong>
            <p>Explore my dedicated Visual Archive featuring 7 authentic design galleries, 22 project deliverables, and high-definition zoom sheets across B2B, mobile, web, and gaming.</p>
          </div>
        </div>
        <a href="/archive" class="archive-link-btn">
          <span>Open Visual Archive (7 Galleries)</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>
    </div>
  </header>

  <!-- 2-Column App Layout with Sticky Floating Left Sidebar -->
  <div class="work-app-layout">
    <!-- Sticky Floating Left Sidebar Navigation -->
    <aside class="work-left-sidebar" aria-label="Selected Work Navigation">
      <div class="work-sidebar-header">
        <span class="work-sidebar-tag">PROJECT SELECTOR</span>
        <h3 class="work-sidebar-title">Enterprise Transformations</h3>
      </div>
      <div class="work-sidebar-nav" role="tablist">
        {sidebar_items_html}
      </div>
      <div class="work-sidebar-footer">
        <a href="/archive" class="work-archive-link-btn">
          <span>🖼️ Visual Archive</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>
    </aside>

    <!-- Main Content Pane: Shows ONLY the currently selected view -->
    <main class="work-main-pane" id="work-main-pane">
      <!-- Dashboard Status Bar -->
      <div class="work-dashboard-statusbar">
        <div class="dash-status-left">
          <span class="dash-live-dot"></span>
          <span id="dash-active-indicator" class="dash-status-title"><strong>Specialization Overview</strong> &bull; 5 Enterprise Pillars</span>
        </div>
        <div class="dash-status-right">
          <span class="dash-mode-pill">Modern Single-Pane Dashboard</span>
        </div>
      </div>

      <!-- Section: Specialization Overview (View Pane 0) -->
      <section class="specialization-pillars-banner work-view-pane active" id="specialization-pillars">
        <div class="spec-header">
          <div>
            <div class="spec-pretitle">Strategic Leadership Taxonomy</div>
            <h2 class="spec-title">5 UI/UX Specialization Pillars</h2>
            <p class="spec-desc">
              Grounded in 15+ years of designing and scaling complex enterprise software for IBM, Ericsson, Zebra, and ZF Wabco. Select any card below or from the floating left panel to inspect the full case study:
            </p>
          </div>
          <span class="spec-badge">5 CORE PILLARS</span>
        </div>

        <div class="specialization-pillars-grid">
          <div class="spec-pillar-card" onclick="switchWorkView('case-1')">
            <div>
              <div class="s-pillar-icon">🧠</div>
              <div class="s-pillar-domain">IBM Software Labs</div>
              <h3 class="s-pillar-name">Agentic AI &amp; HITL Governance</h3>
              <p class="s-pillar-desc">Multi-agent state machines, 3-tier confidence routing, side-by-side database diffing, and SOX audit trails.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Case #1: Agent Mesh &amp; Diff</span>
          </div>

          <div class="spec-pillar-card" onclick="switchWorkView('case-2')">
            <div>
              <div class="s-pillar-icon">📊</div>
              <div class="s-pillar-domain">Ericsson Global</div>
              <h3 class="s-pillar-name">Complex Financial Data Architecture</h3>
              <p class="s-pillar-desc">Sub-16ms single-pane BOM data grid replacing 14 unversioned Excel tabs; real-time gross margin guardrails.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Case #2: Keyboard BOM Grid</span>
          </div>

          <div class="spec-pillar-card" onclick="switchWorkView('case-3')">
            <div>
              <div class="s-pillar-icon">📡</div>
              <div class="s-pillar-domain">Zebra Technologies</div>
              <h3 class="s-pillar-name">Industrial IoT &amp; Physical Ergonomics</h3>
              <p class="s-pillar-desc">-25°C cold-storage freezer shadowing, 72px glove hit targets, spatial warehouse floor plans, and 1-scan QR staging.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Case #3: Spatial IoT Console</span>
          </div>

          <div class="spec-pillar-card" onclick="switchWorkView('case-4')">
            <div>
              <div class="s-pillar-icon">🎨</div>
              <div class="s-pillar-domain">IBM Carbon</div>
              <h3 class="s-pillar-name">DesignOps &amp; Token Architecture</h3>
              <p class="s-pillar-desc">Multi-tier token taxonomy, Figma-to-Code Style Dictionary compiler, multi-brand runtime theme engine.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Case #4: Live Token Studio</span>
          </div>

          <div class="spec-pillar-card" onclick="switchWorkView('case-5')">
            <div>
              <div class="s-pillar-icon">🚚</div>
              <div class="s-pillar-domain">ZF Wabco</div>
              <h3 class="s-pillar-name">Automotive Cockpit &amp; Safety UX</h3>
              <p class="s-pillar-desc">UNECE legal gaze budgeting (&lt;1.2s glance ceiling), 3-zone spatial HUD, high-contrast anti-glare, CAN-bus sync.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Case #5: 3-Zone Cockpit HUD</span>
          </div>
        </div>

        <div class="dash-pane-switcher-bar">
          <div></div>
          <div class="dash-pane-progress">5 Specializations &bull; Click to Explore Cases</div>
          <button class="btn-dash-nav-next" onclick="switchWorkView('case-1')">
            <span>Explore Case #1: IBM Watson AI</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </section>

      <!-- 5 Transformation Cards: Displayed one at a time as dashboard view panes -->
      {cards_html}
    </main>
  </div>

  <script>
    // Shared Prototype Logic
    {shared_proto_js.replace('<script>', '').replace('</script>', '').replace('<!-- Shared Interactive Working Prototype Logic -->', '')}

    // Modern Dashboard Single-Pane View Switcher
    function switchWorkView(targetId, clickedEl) {{
      // 1. Hide all view panes
      const panes = document.querySelectorAll('.work-view-pane');
      panes.forEach(p => p.classList.remove('active'));

      // 2. Show target pane
      const targetPane = document.getElementById(targetId);
      if (targetPane) {{
        targetPane.classList.add('active');
      }}

      // 3. Update sidebar active item
      const navItems = document.querySelectorAll('.work-nav-item');
      navItems.forEach(item => item.classList.remove('active'));

      let activeNav = clickedEl;
      if (!activeNav) {{
        activeNav = document.querySelector(`.work-nav-item[data-target="${{targetId}}"]`) ||
                    document.querySelector(`.work-nav-item[href="#${{targetId}}"]`);
      }}
      if (activeNav) {{
        activeNav.classList.add('active');

        // Scroll active nav item into view if in mobile horizontal scroll
        if (activeNav.scrollIntoView && window.innerWidth <= 900) {{
          activeNav.scrollIntoView({{ behavior: 'smooth', inline: 'center', block: 'nearest' }});
        }}

        // Update dashboard status bar title
        const titleEl = activeNav.querySelector('.work-nav-title');
        const subEl = activeNav.querySelector('.work-nav-sub');
        const indicator = document.getElementById('dash-active-indicator');
        if (indicator && titleEl) {{
          const subText = subEl ? ` &bull; ${{subEl.textContent}}` : '';
          indicator.innerHTML = `<strong>${{titleEl.textContent}}</strong>${{subText}}`;
        }}
      }}

      // 4. Update URL hash
      if (history.replaceState) {{
        history.replaceState(null, null, '#' + targetId);
      }}

      // 5. Scroll to top of main pane if scrolled past
      const mainPane = document.getElementById('work-main-pane');
      if (mainPane && window.scrollY > 240) {{
        const yOffset = -80;
        const y = mainPane.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({{ top: y, behavior: 'smooth' }});
      }}
    }}

    // Hash router on initial load & hash changes
    window.addEventListener('DOMContentLoaded', () => {{
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) {{
        const navItem = document.querySelector(`.work-nav-item[data-target="${{hash}}"]`) ||
                        document.querySelector(`.work-nav-item[href="#${{hash}}"]`);
        switchWorkView(hash, navItem);
      }} else {{
        // Default to Specialization Overview
        switchWorkView('specialization-pillars', document.querySelector('.work-nav-item'));
      }}
    }});

    window.addEventListener('hashchange', () => {{
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) {{
        const navItem = document.querySelector(`.work-nav-item[data-target="${{hash}}"]`) ||
                        document.querySelector(`.work-nav-item[href="#${{hash}}"]`);
        switchWorkView(hash, navItem);
      }}
    }});
  </script>
</body>
</html>
"""

# Write work.html
with open('work.html', 'w', encoding='utf-8') as f:
    f.write(work_html)

print("--- Successfully generated work.html with Sticky Floating Left Panel and Modern Dashboard Single-Pane View ---")
