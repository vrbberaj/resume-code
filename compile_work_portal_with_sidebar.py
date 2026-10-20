# compile_work_portal_with_sidebar.py
import json
import os
import re

print("Compiling work.html with Left Panel Navigation and IBM as Case #1...")

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
        "title": "Zebra DeviceCloud: Enterprise IoT Management for Rugged Warehouse Fleets & Batteries",
        "lead": "Architected multi-site fleet visibility console for 2,000 rugged mobile computers and 2,100 batteries, cutting lost asset loss by 94% through sub-zero glove touch targets, spatial floor plans, and predictive battery swap alerts.",
        "managerTag": "Industrial IoT Physical Ergonomics Framework",
        "methodology": [
            {"num": "01", "name": "-25°C Shadowing", "detail": "Chicago cold-chain"},
            {"num": "02", "name": "Card Sorting IA", "detail": "4 stakeholder buckets"},
            {"num": "03", "name": "Glove Ergonomics", "detail": "72px hit targets"},
            {"num": "04", "name": "Spatial Floorplan", "detail": "Visual access point map"},
            {"num": "05", "name": "Predictive Battery", "detail": "Swap before failure"}
        ],
        "metrics": [
            {"val": "94% Drop", "label": "Lost Asset Loss (-$1.2M)"},
            {"val": "2,000+", "label": "Scanners Tracked"},
            {"val": "72px", "label": "Freezer Glove Touch Target"},
            {"val": "<15s", "label": "1-Scan QR Staging"}
        ],
        "screenshot": "screenshots/behance/zebra_iot_dashboard.png",
        "screenshotAlt": "Zebra Technologies Device & Battery Health Insights Console",
        "previewUrl": "https://devicecloud.zebra.com/enterprise/site-chicago-04",
        "callouts": [
            {"icon": "⚡", "text": "<strong>Multi-Site Battery Telemetry:</strong> Live charge cycle tracking, thermal warnings, and predictive battery replacement."},
            {"icon": "🧤", "text": "<strong>Cold-Storage Optimized:</strong> 72px glove hit targets tested in -25°C commercial industrial freezers."},
            {"icon": "📦", "text": "<strong>1-Scan QR Fleet Provisioning:</strong> Configures Wi-Fi, MDM profile, and warehouse zone in under 15 seconds."}
        ],
        "protoHtml": zebra_proto_html.replace('`', ''),
        "caseHref": "case-zebra.html"
    },
    {
        "id": "case-4",
        "badgeKey": "carbon",
        "company": "IBM Carbon",
        "coPill": "CARBON",
        "specPill": "Design Systems & TokenOps Architecture",
        "title": "IBM Carbon Design System: Multi-Brand Token Studio Scaling Across 14 Global Squads",
        "lead": "Spearheaded design system governance and token compiler pipeline synchronizing 14 squads across White, Gray 10, Gray 90, and Gray 100 Dark themes with zero visual drift and 100% WCAG 2.1 AA accessibility compliance.",
        "managerTag": "Design System Token Pipeline",
        "methodology": [
            {"num": "01", "name": "Component Audit", "detail": "Eliminated 62 rogue buttons"},
            {"num": "02", "name": "Multi-Tier Tokens", "detail": "Global -> Semantic -> Component"},
            {"num": "03", "name": "Figma Variables", "detail": "1-click 4-theme switching"},
            {"num": "04", "name": "CI/CD Compiler", "detail": "Style Dictionary -> npm"},
            {"num": "05", "name": "Automated QA", "detail": "Playwright + axe-core"}
        ],
        "metrics": [
            {"val": "14 Squads", "label": "Unified on 1 Token Pipeline"},
            {"val": "4 Themes", "label": "White, Gray 10, 90, 100 Dark"},
            {"val": "0 Visual Drift", "label": "Across Production Repos"},
            {"val": "100%", "label": "WCAG 2.1 AA Contrast Compliance"}
        ],
        "screenshot": "screenshots/behance/carbon_admin_clean.png",
        "screenshotAlt": "IBM Carbon Ready2Go Administration Web Platform",
        "previewUrl": "https://carbon.ibm.com/token-studio/themes",
        "callouts": [
            {"icon": "🎨", "text": "<strong>Live Token Theme Switcher:</strong> Instant switching between White, Gray 10, Gray 90, and Gray 100 Dark."},
            {"icon": "⚙️", "text": "<strong>Automated Style Dictionary:</strong> Transforms Figma variables into JSON, CSS variables, and TS contracts."},
            {"icon": "🛡️", "text": "<strong>Zero-Defect Accessibility Gate:</strong> Automated CI contrast validation guaranteeing WCAG AA standards."}
        ],
        "protoHtml": carbon_proto_html.replace('`', ''),
        "caseHref": "case-ibm-carbon.html"
    },
    {
        "id": "case-5",
        "badgeKey": "wabco",
        "company": "ZF Wabco",
        "coPill": "WABCO",
        "specPill": "Automotive Cockpit & Safety UX",
        "title": "ZF Wabco Cockpit HUD: Gaze-Budgeted Digital Cluster for Commercial Heavy Truck Safety",
        "lead": "Engineered 3-zone commercial truck digital instrument cluster adhering to strict <1.2s gaze budget ceilings under extreme ambient glare, connecting CAN-bus telematics with zero driver cognitive distraction.",
        "managerTag": "Automotive Gaze-Budgeting Safety Protocol",
        "methodology": [
            {"num": "01", "name": "Driver Shadowing", "detail": "Night & high-glare routes"},
            {"num": "02", "name": "3-Zone Cluster IA", "detail": "Critical HUD vs telemetry"},
            {"num": "03", "name": "Gaze Ceilings", "detail": "<1.2s glance budgeting"},
            {"num": "04", "name": "High-Contrast UI", "detail": "Pure black OLED typography"},
            {"num": "05", "name": "CAN-Bus Telematics", "detail": "Live radar headway distance"}
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

# Build the Left Sidebar Items HTML
sidebar_items_html = """
      <a href="#specialization-pillars" class="work-nav-item active" onclick="activateWorkNav(this)">
        <div class="work-nav-icon">🏛️</div>
        <div class="work-nav-text">
          <div class="work-nav-title">Specialization Overview</div>
          <div class="work-nav-sub">5 Enterprise Pillars</div>
        </div>
      </a>
"""

for p in projects_data:
    sidebar_items_html += f"""
      <a href="#{p['id']}" class="work-nav-item" onclick="activateWorkNav(this)">
        <span class="work-nav-badge {p['badgeKey']}">{p['coPill']}</span>
        <div class="work-nav-text">
          <div class="work-nav-title">{p['specPill']}</div>
          <div class="work-nav-sub">{p['company']}</div>
        </div>
      </a>
    """

# Build the Cards HTML
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

    cards_html += f"""
    <!-- Case #{idx+1}: {p['company']} -->
    <article class="transformation-card" id="{p['id']}">
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
          {p['managerTag']}
        </div>
        <div class="d-strip-steps">
          {methodology_steps_html}
        </div>
      </div>

      <!-- Card Split Grid: Interactive Prototype + Annotated Screenshot Preview -->
      <div class="card-split-grid">
        <div class="interactive-column">
          <div class="col-section-tag">
            <span>🕹️ LIVE INTERACTIVE WORKING PROTOTYPE</span>
            <span style="color: #64748B;">Interactive Demo</span>
          </div>
          {p['protoHtml']}
        </div>

        <div class="screenshot-column">
          <div class="col-section-tag">
            <span>📸 SHIPPED PRODUCTION INTERFACE</span>
            <span style="color: #64748B;">Visual Evidence</span>
          </div>
          <div class="browser-preview-frame">
            <div class="browser-preview-header">
              <div class="browser-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
              <div class="browser-url-text">{p['previewUrl']}</div>
            </div>
            <div class="browser-screenshot-wrap">
              <img src="{p['screenshot']}" alt="{p['screenshotAlt']}" class="browser-screenshot-img" loading="lazy">
            </div>
            <div class="browser-mini-body">
              <span class="preview-callout-title">UI/UX Architectural Highlights:</span>
              <div class="preview-callout-badges">
                {callouts_html}
              </div>
            </div>
          </div>
        </div>
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
          <span>Explore 7-Chapter Narrative Defense</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
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
  <meta name="description" content="Dedicated directory of 5 flagship enterprise product transformations illustrating deep craft across Agentic AI governance, high-density financial data grids, industrial IoT, token architecture, and automotive cockpits.">
  {commonHeadLinks}
  <style>
    {globalCoreStyles}
    {interactive_proto_styles}

    .work-hero-header {{
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 48px 0 36px;
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
      font-size: 36px;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: var(--text-main);
      margin-bottom: 12px;
      line-height: 1.2;
    }}

    .work-desc {{
      font-size: 15.5px;
      color: var(--text-muted);
      max-width: 860px;
      line-height: 1.6;
    }}

    /* Native Visual Archive Banner (Replacing external Behance referral) */
    .native-archive-banner {{
      background: linear-gradient(135deg, #0D1627 0%, #172554 100%);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 16px;
      padding: 22px 28px;
      margin-top: 24px;
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

    /* 2-Column App Layout with Left Panel Navigation */
    .work-app-layout {{
      max-width: 1380px;
      margin: 0 auto;
      padding: 32px 24px 80px;
      display: flex;
      gap: 32px;
      align-items: flex-start;
      position: relative;
    }}

    /* Left Sidebar */
    .work-left-sidebar {{
      width: 290px;
      flex-shrink: 0;
      background: #FFFFFF;
      border: 1px solid var(--border-medium);
      border-radius: 16px;
      position: sticky;
      top: 76px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      box-sizing: border-box;
      max-width: 100%;
    }}

    .work-sidebar-header {{
      padding: 16px 18px;
      background: var(--bg-subtle);
      border-bottom: 1px solid var(--border-subtle);
    }}

    .work-sidebar-tag {{
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 800;
      color: var(--primary-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: block;
      margin-bottom: 2px;
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
      max-height: calc(100vh - 220px);
      overflow-y: auto;
    }}

    .work-nav-item {{
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 10px;
      text-decoration: none;
      color: var(--text-body);
      transition: all 0.2s ease;
      box-sizing: border-box;
    }}

    .work-nav-item:hover {{
      background: var(--bg-subtle);
      color: var(--text-main);
    }}

    .work-nav-item.active {{
      background: #EFF6FF;
      border-color: rgba(59, 130, 246, 0.4);
      color: #1E40AF;
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

    /* 5 UI/UX Specialization Pillars Banner */
    .specialization-pillars-banner {{
      background: #FFFFFF;
      border: 1px solid var(--border-medium);
      border-radius: 20px;
      padding: 32px 36px;
      margin-bottom: 36px;
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
    }}

    .spec-pillar-card:hover {{
      transform: translateY(-2px);
      border-color: var(--border-medium);
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
      margin-bottom: 44px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
      transition: box-shadow 0.25s ease;
      max-width: 100%;
      box-sizing: border-box;
      scroll-margin-top: 90px;
    }}

    .transformation-card:hover {{
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
    }}

    .card-header-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }}

    .card-badges-left {{
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }}

    .pill-co {{
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 100px;
      background: var(--bg-subtle);
      color: var(--text-main);
      border: 1px solid var(--border-medium);
      text-transform: uppercase;
    }}

    .pill-spec {{
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 100px;
      background: rgba(240, 6, 88, 0.08);
      color: var(--primary-accent);
      border: 1px solid rgba(240, 6, 88, 0.2);
    }}

    .btn-deep-dive-pill {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: #0057FF;
      color: #FFFFFF;
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 800;
      border-radius: 100px;
      text-decoration: none;
      transition: all 0.2s ease;
    }}

    .btn-deep-dive-pill:hover {{
      background: #0045CC;
      transform: translateY(-1px);
    }}

    .card-hero-text {{
      margin-bottom: 22px;
    }}

    .card-title {{
      font-family: var(--font-heading);
      font-size: 26px;
      font-weight: 900;
      color: var(--text-main);
      margin-bottom: 8px;
      line-height: 1.25;
      letter-spacing: -0.01em;
    }}

    .card-lead {{
      font-size: 14.5px;
      color: var(--text-body);
      line-height: 1.6;
      max-width: 900px;
    }}

    /* Domain Methodology Process Strip */
    .domain-methodology-strip {{
      background: #F8FAFC;
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 28px;
    }}

    .d-strip-title {{
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 800;
      color: var(--primary-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .d-strip-steps {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 12px;
    }}

    .d-step-item {{
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 12px;
      line-height: 1.45;
      color: var(--text-body);
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }}

    .d-step-num {{
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 800;
      color: var(--primary-accent);
      background: rgba(240, 6, 88, 0.08);
      padding: 2px 6px;
      border-radius: 4px;
      flex-shrink: 0;
    }}

    /* Card Split Grid: Prototype + Screenshot */
    .card-split-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 28px;
    }}

    .col-section-tag {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: var(--text-main);
      margin-bottom: 10px;
      text-transform: uppercase;
    }}

    .interactive-column {{
      min-width: 0;
    }}

    .screenshot-column {{
      min-width: 0;
    }}

    /* Browser Preview Frame */
    .browser-preview-frame {{
      background: #090D16;
      border: 1px solid #1E293B;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    }}

    .browser-preview-header {{
      background: #0F172A;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid #1E293B;
    }}

    .browser-dots {{
      display: flex;
      gap: 6px;
    }}

    .dot-r {{ width: 9px; height: 9px; border-radius: 50%; background: #EF4444; }}
    .dot-y {{ width: 9px; height: 9px; border-radius: 50%; background: #F59E0B; }}
    .dot-g {{ width: 9px; height: 9px; border-radius: 50%; background: #10B981; }}

    .browser-url-text {{
      font-family: var(--font-code);
      font-size: 10.5px;
      color: #94A3B8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }}

    .browser-screenshot-wrap {{
      width: 100%;
      height: 220px;
      overflow: hidden;
      background: #000;
      position: relative;
    }}

    .browser-screenshot-img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
      transition: transform 0.3s ease;
    }}

    .transformation-card:hover .browser-screenshot-img {{
      transform: scale(1.03);
    }}

    .browser-mini-body {{
      padding: 14px 16px;
      background: #111624;
    }}

    .preview-callout-title {{
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #10B981;
      display: block;
      margin-bottom: 8px;
    }}

    .preview-callout-badges {{
      display: flex;
      flex-direction: column;
      gap: 6px;
    }}

    .preview-callout-badge {{
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 11.5px;
      color: #CBD5E1;
      line-height: 1.4;
    }}

    .callout-badge-icon {{
      color: #38BDF8;
      font-weight: 800;
      flex-shrink: 0;
    }}

    /* Metrics Row */
    .card-metrics-row {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }}

    .t-stat-card {{
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 14px 16px;
      text-align: center;
    }}

    .t-stat-val {{
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 900;
      color: var(--text-main);
      margin-bottom: 4px;
      line-height: 1.2;
    }}

    .t-stat-label {{
      font-size: 11.5px;
      color: var(--text-muted);
      line-height: 1.35;
    }}

    /* Card Footer CTA */
    .card-footer-cta {{
      border-top: 1px solid var(--border-subtle);
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }}

    .footer-cta-text strong {{
      display: block;
      font-size: 13.5px;
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
      padding: 11px 22px;
      background: var(--primary-accent);
      color: #FFFFFF;
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 800;
      border-radius: 100px;
      text-decoration: none;
      transition: all 0.2s ease;
      white-space: nowrap;
    }}

    .btn-primary-card:hover {{
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(240, 6, 88, 0.35);
    }}

    /* Mobile / Tablet Responsive */
    @media (max-width: 1024px) {{
      .work-app-layout {{
        flex-direction: column;
        padding: 20px 16px;
        gap: 20px;
        max-width: 100%;
        overflow: hidden;
      }}
      .work-left-sidebar {{
        width: 100%;
        max-width: 100%;
        position: sticky;
        top: 60px;
        z-index: 100;
        overflow: hidden;
      }}
      .work-sidebar-nav {{
        flex-direction: row;
        overflow-x: auto;
        max-width: 100%;
        -webkit-overflow-scrolling: touch;
        max-height: none;
        padding: 8px;
        gap: 8px;
      }}
      .work-nav-item {{
        width: 210px;
        flex-shrink: 0;
      }}
      .work-sidebar-footer {{
        display: none;
      }}
      .card-split-grid {{
        grid-template-columns: 1fr;
      }}
      .card-metrics-row {{
        grid-template-columns: 1fr 1fr;
      }}
      .transformation-card {{
        padding: 24px 20px;
      }}
    }}

    @media (max-width: 600px) {{
      .card-metrics-row {{
        grid-template-columns: 1fr;
      }}
    }}
  </style>
</head>
<body>

  <!-- Global Header -->
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

  <!-- Hero Header -->
  <header class="work-hero-header">
    <div class="work-container">
      <div class="work-pretitle">Flagship Enterprise Product Transformations</div>
      <h1 class="work-title">Selected Work: 5 UI/UX Specializations in Complex Enterprise Systems</h1>
      <p class="work-desc">
        Senior UI/UX Design Manager case studies illustrating deep craft across autonomous agentic AI governance, high-density financial data grids, physical/digital industrial IoT telematics, DesignOps token systems, and automotive safety cockpits.
      </p>

      <!-- Native Visual Archive Banner (No external links) -->
      <aside class="native-archive-banner" aria-label="Visual Archive Navigation">
        <div class="archive-banner-left">
          <div class="archive-banner-badge">🖼️</div>
          <div class="archive-banner-text">
            <strong>Authentic Production Deliverables Archive &bull; Zero External Redirects</strong>
            <p>
              Explore all 7 production design galleries—including information architecture maps, mobile telematic clusters, and enterprise token studios—preserved natively in the Visual Archive.
            </p>
          </div>
        </div>
        <a href="/archive" class="archive-link-btn">
          <span>🖼️ Browse Visual Archive (7 Galleries)</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </aside>
    </div>
  </header>

  <!-- 2-Column App Layout with Left Panel Navigation -->
  <div class="work-app-layout">
    <!-- Left Sidebar -->
    <aside class="work-left-sidebar" id="workSidebar" aria-label="Transformation Projects Navigation">
      <div class="work-sidebar-header">
        <span class="work-sidebar-tag">FLAGSHIP TRANSFORMATIONS</span>
        <h3 class="work-sidebar-title">Selected Work</h3>
      </div>
      <nav class="work-sidebar-nav" id="workSidebarNav">
        {sidebar_items_html}
      </nav>
      <div class="work-sidebar-footer">
        <a href="/archive" class="work-archive-link-btn">
          <span>🖼️ Open Visual Archive</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="work-main-pane">
      <!-- 5 UI/UX Specialization Pillars Banner -->
      <section class="specialization-pillars-banner" id="specialization-pillars" aria-label="5 Enterprise Specialization Pillars">
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
              <div class="s-pillar-icon">🧠</div>
              <div class="s-pillar-domain">IBM Software Labs</div>
              <h3 class="s-pillar-name">Agentic AI &amp; HITL Governance</h3>
              <p class="s-pillar-desc">Multi-agent state machines, 3-tier confidence routing, side-by-side database diffing, and SOX audit trails.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Prototype: Agent Mesh &amp; Diff</span>
          </div>

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
              <p class="s-pillar-desc">UNECE legal gaze budgeting (&lt;1.2s glance ceiling), 3-zone spatial HUD, high-contrast anti-glare, CAN-bus sync.</p>
            </div>
            <span class="s-pillar-prototype">🕹️ Prototype: 3-Zone Cockpit HUD</span>
          </div>
        </div>
      </section>

      <!-- 5 Transformation Cards Ordered: 1. IBM, 2. Ericsson, 3. Zebra, 4. Carbon, 5. Wabco -->
      {cards_html}
    </main>
  </div>

  <script>
    {shared_proto_js}

    // Left sidebar active state sync
    function activateWorkNav(clickedItem) {{
      const items = document.querySelectorAll('.work-nav-item');
      items.forEach(item => item.classList.remove('active'));
      clickedItem.classList.add('active');
    }}

    // Auto-highlight active sidebar item on scroll
    window.addEventListener('scroll', () => {{
      const cards = document.querySelectorAll('.transformation-card, #specialization-pillars');
      const navItems = document.querySelectorAll('.work-nav-item');
      let currentId = '';

      cards.forEach(card => {{
        const rect = card.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {{
          currentId = card.id;
        }}
      }});

      if (currentId) {{
        navItems.forEach(item => {{
          if (item.getAttribute('href') === '#' + currentId) {{
            item.classList.add('active');
          }} else {{
            item.classList.remove('active');
          }}
        }});
      }}
    }}, {{ passive: true }});
  </script>
</body>
</html>
"""

# Write work.html
with open('work.html', 'w', encoding='utf-8') as f:
    f.write(work_html)

print("--- Successfully generated work.html with Left Panel Navigation and IBM as Case #1 ---")
