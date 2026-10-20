# compile_complete_suite_v2.py
import json
import os
import re
import sys

print("=== 1. COMPILING COMPLETE SUITE V2: NATIVE BEHANCE ARCHIVE & LEFT-PANEL SELECTED WORK ===")

# ----------------------------------------------------------------------------
# 1. Authentic Behance Galleries Data
# ----------------------------------------------------------------------------
behance_galleries = [
    {
        "id": "sales-automation",
        "title": "Sales Automation & Scenario Estimation Tool",
        "client": "Ericsson Global • Enterprise CPQ",
        "role": "Lead UI/UX Architect & Designer",
        "period": "Enterprise B2B Software",
        "badge": "3 Visual Deliverables",
        "thumb": "screenshots/behance/sales_estimation_clean.png",
        "overview": "Complex enterprise financial estimation and multi-scenario CPQ decision engine replacing unversioned spreadsheet quoting across 45 countries. Features automated scenario comparison (300 MSEK vs 260 MSEK), real-time Core vs RAN variance tracking, and sub-second gross margin guardrails across 12,000 catalog parts.",
        "skills": ["Enterprise CPQ", "Financial Scenario Modeling", "High-Density Data Grids", "Design System"],
        "items": [
            {
                "img": "screenshots/behance/sales_estimation_clean.png",
                "tag": "SCENARIO MODELER",
                "title": "Scenario A vs Scenario B Business Case Modeler",
                "desc": "Side-by-side deal trajectory simulator comparing 300 MSEK vs 260 MSEK investments with live gross margin delta calculation."
            },
            {
                "img": "screenshots/behance/sales_estimation_tool.png",
                "tag": "ESTIMATION ENGINE",
                "title": "Core Domain vs RAN Domain Automated Estimation",
                "desc": "Algorithmic hardware quote generator synthesizing 12,000 catalog parts into high-confidence enterprise deal configurations."
            },
            {
                "img": "screenshots/behance/sales_scenario_clean.png",
                "tag": "VARIANCE TRACKER",
                "title": "Financial Variance & Hardware Breakdown Console",
                "desc": "Real-time cost breakdown showing bill-of-materials margins, hardware depreciation curves, and discount approval thresholds."
            }
        ]
    },
    {
        "id": "networks-design",
        "title": "Networks Configuration & Telematics Platform",
        "client": "Ericsson Global • Telecommunications",
        "role": "Lead Product Designer & System Architect",
        "period": "Enterprise Network Infrastructure",
        "badge": "5 Visual Deliverables",
        "thumb": "screenshots/behance/ericsson_desktop_grid.png",
        "overview": "Single-pane network configuration management platform for tier-1 telecom operators. Modernizes legacy multi-tab spreadsheet workflows into a high-density, keyboard-navigable interface with live device backups, router compliance audits, and an on-the-go NOC companion application.",
        "skills": ["High-Density Tabular UI", "Telecom NOC Workflows", "Mobile Telematics", "Information Architecture"],
        "items": [
            {
                "img": "screenshots/behance/ericsson_desktop_grid.png",
                "tag": "DESKTOP GRID",
                "title": "Device Configuration & Backup Profile Grids",
                "desc": "Keyboard-navigable data matrix with frozen column headers, instant sorting, and bulk configuration automation across Cisco and Juniper routers."
            },
            {
                "img": "screenshots/behance/ericsson_mobile_screens.png",
                "tag": "MOBILE SUITE",
                "title": "5-Screen Mobile Network Observability Companion",
                "desc": "Field engineer mobile application tracking real-time alarm severity counters, IP route topology shifts, and compliance policy checklists."
            },
            {
                "img": "screenshots/behance/ericsson_problem_framework.png",
                "tag": "IA TAXONOMY",
                "title": "Early Problem Scoping & 6-Vector Failure Taxonomy",
                "desc": "Discovery framework categorizing root causes across performance degradation, network growth limits, security breaches, and hardware obsolescence."
            },
            {
                "img": "screenshots/behance/network_configuration_ui.png",
                "tag": "CONFIG WORKFLOW",
                "title": "Multi-Tenant Device Configuration Console",
                "desc": "Zero-modal device management canvas with real-time parameter validation and audit-ready configuration snapshots."
            },
            {
                "img": "screenshots/behance/network_mobile_screens.png",
                "tag": "FIELD TELEMATICS",
                "title": "Mobile Telematics & Live Incident Feed",
                "desc": "High-contrast mobile NOC companion providing push alerts for network link failures and automated technician dispatch."
            }
        ]
    },
    {
        "id": "enterprise-iot",
        "title": "Enterprise IoT & DeviceCloud Fleet Telematics",
        "client": "Zebra Technologies • Enterprise Industrial IoT",
        "role": "UI/UX Product Design Manager",
        "period": "Hardware & Cloud SaaS",
        "badge": "5 Visual Deliverables",
        "thumb": "screenshots/behance/zebra_iot_dashboard.png",
        "overview": "Fleet-scale IoT device and battery health management portal monitoring 2,000 handheld enterprise scanners and 2,100 smart batteries across multi-site warehouse operations. Includes complete stakeholder card sorting information architecture and end-to-end device health user flow logic.",
        "skills": ["Industrial IoT", "Fleet Telematics", "Card Sorting IA", "User Flow Architecture"],
        "items": [
            {
                "img": "screenshots/behance/zebra_iot_dashboard.png",
                "tag": "FLEET CONSOLE",
                "title": "Multi-Site Device & Battery Health Insights Console",
                "desc": "Executive fleet operations console reporting live device connectivity, battery charge cycles, thermal alerts, and automated OS update queues."
            },
            {
                "img": "screenshots/behance/zebra_card_sorting.png",
                "tag": "CARD SORTING IA",
                "title": "Stakeholder Information Architecture Card Sorting Matrix",
                "desc": "Cross-functional discovery synthesis organizing hundreds of telemetry variables into 4 intuitive categories: Battery, Application, Performance, and Environment."
            },
            {
                "img": "screenshots/behance/zebra_user_flow.png",
                "tag": "USER FLOW",
                "title": "End-to-End Fleet Health Monitoring User Flow Map",
                "desc": "Complete user navigation architecture detailing SSO authentication, site-level drilldown, anomaly triage, and automated RMA ticket creation."
            },
            {
                "img": "screenshots/behance/zebra_user_flow_tree.png",
                "tag": "DECISION TREE",
                "title": "Automated Diagnostic & Predictive Replacement Branching Tree",
                "desc": "System decision logic routing batteries through predictive replacement triggers based on internal impedance and thermal health metrics."
            },
            {
                "img": "screenshots/behance/zebra_it_manager_persona.png",
                "tag": "FIELD PERSONA",
                "title": "Field Research Persona: Enterprise IT Operations Manager",
                "desc": "Contextual inquiry synthesis capturing warehouse manager pain points: lost scanners, shift battery depletion, and blind asset audits."
            }
        ]
    },
    {
        "id": "mobile-projects",
        "title": "High-Contrast Mobile Telematics & Automotive Cockpit",
        "client": "ZF Wabco • Commercial Automotive",
        "role": "Lead Ergonomics & Automotive UX Architect",
        "period": "Commercial Vehicle Telematics",
        "badge": "3 Visual Deliverables",
        "thumb": "screenshots/behance/zf_mobile_clean.png",
        "overview": "Mission-critical mobile telematics application and digital cockpit HUD designed for commercial truck operators. Engineered with high-contrast ambient glare resistance, large thumb-friendly touch targets, and strict adherence to UNECE commercial driver gaze budget regulations (<1.2s glance ceiling).",
        "skills": ["Automotive HUD", "Mobile Ergonomics", "Ambient Glare UX", "Gaze Budgeting"],
        "items": [
            {
                "img": "screenshots/behance/zf_mobile_clean.png",
                "tag": "MOBILE TELEMATICS",
                "title": "High-Contrast Mobile Telematics & Media Architecture",
                "desc": "Driver companion interface optimized for night-time dark mode and direct sunlight readability with zero cognitive friction."
            },
            {
                "img": "screenshots/behance/mobile_telematics_clean.png",
                "tag": "HUD TELEMETRY",
                "title": "Live Radar Headway & Speed HUD Cluster",
                "desc": "Minimalist digital instrumentation displaying vehicle speed, radar distance to lead vehicle, and collision avoidance alerts."
            },
            {
                "img": "screenshots/behance/mobile_telematics.png",
                "tag": "EVENT STREAM",
                "title": "Multi-Screen Fleet Event Stream & Route Log",
                "desc": "Driver logbook and telematics dispatch interface logging drive hours, tire pressure telemetry, and maintenance schedules."
            }
        ]
    },
    {
        "id": "web-projects",
        "title": "Ready2Go Enterprise Web Administration Platform",
        "client": "IBM Carbon • Enterprise SaaS",
        "role": "Design Systems Manager & UI Architect",
        "period": "Multi-Tenant Enterprise Portal",
        "badge": "3 Visual Deliverables",
        "thumb": "screenshots/behance/carbon_admin_clean.png",
        "overview": "Multi-tenant disaster recovery and incident administration platform built with strict adherence to IBM Carbon Design System tokens. Demonstrates high-density tabular alert matrices, modular form patterns, and accessible tablet/desktop responsive layouts with zero visual drift across themes.",
        "skills": ["Design System Governance", "Carbon Tokens", "Multi-Tenant Web UI", "WCAG 2.1 AA"],
        "items": [
            {
                "img": "screenshots/behance/carbon_admin_clean.png",
                "tag": "ADMIN PLATFORM",
                "title": "Ready2Go Multi-Tenant Administration Web Platform",
                "desc": "Enterprise management portal implementing Carbon token hierarchy across alert matrices, tenant provisioning, and global permission controls."
            },
            {
                "img": "screenshots/behance/carbon_ready2go_clean.png",
                "tag": "INCIDENT MATRIX",
                "title": "High-Density Incident Monitoring & Alert Matrix",
                "desc": "Real-time incident response console enabling single-click disaster recovery failover with live server heartbeat indicators."
            },
            {
                "img": "screenshots/behance/web_admin_portal.png",
                "tag": "SYSTEM CONFIG",
                "title": "Enterprise System Configuration & Audit Logs",
                "desc": "Configuration portal standardizing component spacing, typography scales, and tokenized dark/light mode switching."
            }
        ]
    },
    {
        "id": "gaming-projects",
        "title": "Gaming & Interactive Mechanics UI",
        "client": "Greedy Jump • Mobile Gaming & Interactive",
        "role": "UI/UX & Visual Asset Designer",
        "period": "Interactive Media & Games",
        "badge": "2 Visual Deliverables",
        "thumb": "screenshots/behance/gaming_ui_1.png",
        "overview": "Engaging interactive game UI and visual asset system created for Greedy Jump. Highlights responsive screen canvas scaling, custom character mechanics, interactive level selectors, and high-impact App Store promotional graphics designed to maximize player retention.",
        "skills": ["Game UI Design", "Interactive Mechanics", "Visual Asset Systems", "App Store Marketing"],
        "items": [
            {
                "img": "screenshots/behance/gaming_ui_1.png",
                "tag": "GAME CANVAS",
                "title": "Greedy Jump Gameplay Canvas & Promotional Feature",
                "desc": "Vibrant visual layout showcasing character mechanics, dynamic physics obstacles, and responsive touch controls."
            },
            {
                "img": "screenshots/behance/gaming_ui_2.png",
                "tag": "INTERACTIVE HUD",
                "title": "Interactive Level Selector & In-Game Score HUD",
                "desc": "High-contrast game HUD displaying live score multipliers, level progress bar, and collectible power-up indicators."
            }
        ]
    },
    {
        "id": "my-achievements",
        "title": "Enterprise Innovation & Hackathon Honors",
        "client": "Ericsson Global • Corporate Recognition",
        "role": "Lead Architect & Design Strategist",
        "period": "Executive Innovation Awards",
        "badge": "1 Verified Citation",
        "thumb": "screenshots/behance/ericsson_hackfest_cert.png",
        "overview": "Official corporate awards and recognition honoring pioneering product design leadership. Awarded 1st Place in the Global Hack-fest and earned Spot Innovation Citations for conceiving and executing rapid functional enterprise prototypes that eliminated business process bottlenecks.",
        "skills": ["Rapid Prototyping", "Executive Innovation", "Cross-Functional Leadership", "Design Strategy"],
        "items": [
            {
                "img": "screenshots/behance/ericsson_hackfest_cert.png",
                "tag": "GLOBAL 1ST PLACE",
                "title": "1st Place Global Hack-Fest Award & Spot Innovation Citation",
                "desc": "Official award certificate recognizing outstanding design leadership, rapid problem framing, and innovative prototype architecture."
            }
        ]
    }
]

# ----------------------------------------------------------------------------
# 2. Build archive.html (The Native Visual Archive)
# ----------------------------------------------------------------------------
def generate_archive_html():
    galleries_json = json.dumps(behance_galleries)
    
    # Left sidebar nav items
    sidebar_items_html = ""
    for idx, g in enumerate(behance_galleries):
        active_cls = "active" if idx == 0 else ""
        sidebar_items_html += f"""
        <button class="archive-nav-btn {active_cls}" data-gallery-id="{g['id']}" onclick="selectArchiveGallery('{g['id']}')">
          <div class="archive-nav-thumb-wrap">
            <img src="{g['thumb']}" alt="{g['title']}" class="archive-nav-thumb">
          </div>
          <div class="archive-nav-text">
            <div class="archive-nav-title">{g['title']}</div>
            <div class="archive-nav-sub">{g['client']}</div>
          </div>
          <span class="archive-nav-pill">{g['badge']}</span>
        </button>
        """

    # Gallery content panes
    gallery_panes_html = ""
    for idx, g in enumerate(behance_galleries):
        active_style = "display: block;" if idx == 0 else "display: none;"
        
        cards_html = ""
        for i_idx, item in enumerate(g["items"]):
            clean_title = item['title'].replace("'", "&#39;")
            clean_desc = item['desc'].replace("'", "&#39;")
            cards_html += f"""
            <div class="archive-card">
              <div class="archive-card-media-wrap" onclick="openLightbox('{item['img']}', '{clean_title}', '{clean_desc}')">
                <img src="{item['img']}" alt="{clean_title}" class="archive-card-img" loading="lazy">
                <span class="archive-card-tag">{item['tag']}</span>
                <div class="archive-card-zoom-overlay">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  <span>Click to Enlarge</span>
                </div>
              </div>
              <div class="archive-card-content">
                <h4 class="archive-card-heading">{clean_title}</h4>
                <p class="archive-card-desc">{clean_desc}</p>
              </div>
            </div>
            """

        skills_pills = "".join([f'<span class="skill-pill">{s}</span>' for s in g["skills"]])

        gallery_panes_html += f"""
        <div class="archive-pane" id="pane-{g['id']}" style="{active_style}">
          <div class="archive-pane-header">
            <div class="pane-meta-strip">
              <span class="pane-client-badge">{g['client']}</span>
              <span class="pane-role-badge">💼 {g['role']}</span>
              <span class="pane-badge-count">{g['badge']}</span>
            </div>
            <h2 class="pane-title">{g['title']}</h2>
            <p class="pane-overview">{g['overview']}</p>
            <div class="pane-skills-row">
              {skills_pills}
            </div>
          </div>

          <div class="archive-gallery-grid">
            {cards_html}
          </div>
        </div>
        """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Archive &amp; Design Deliverables | Balaajee V.R.</title>
  <meta name="description" content="Authentic production deliverables, information architectures, and responsive interfaces extracted from Balaajee V.R.'s public Behance portfolio archive.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap">
  <style>
    :root {{
      --primary-accent: #F00658;
      --font-heading: 'Overpass', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-code: 'JetBrains Mono', monospace;
      --bg-base: #0B0F19;
      --bg-surface: #111827;
      --bg-card: #162032;
      --text-main: #F8FAFC;
      --text-muted: #94A3B8;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-medium: rgba(255, 255, 255, 0.16);
      --sidebar-width: 320px;
    }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    html, body {{
      background: var(--bg-base);
      color: var(--text-main);
      font-family: var(--font-body);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      max-width: 100vw;
    }}

    img {{
      max-width: 100%;
      height: auto;
    }}

    /* Global Header */
    .global-header {{
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(11, 15, 25, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-subtle);
      padding: 10px 0;
      width: 100%;
    }}

    .header-container {{
      max-width: 1380px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }}

    .brand-link {{
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #fff;
    }}

    .brand-monogram {{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      background: #0057FF;
      color: #fff;
      font-family: var(--font-heading);
      font-weight: 900;
      font-size: 15px;
      border-radius: 8px;
    }}

    .brand-tag {{
      font-family: var(--font-heading);
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }}

    .nav-links {{
      display: flex;
      gap: 6px;
      align-items: center;
      overflow-x: auto;
      max-width: 100%;
    }}

    .nav-item {{
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      color: var(--text-muted);
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 8px;
      transition: all 0.2s ease;
      white-space: nowrap;
    }}

    .nav-item:hover {{
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }}

    .nav-item.active {{
      color: #fff;
      background: #F00658;
    }}

    .btn-contact {{
      font-family: var(--font-heading);
      font-size: 12.5px;
      font-weight: 800;
      background: #0057FF;
      color: #fff;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 100px;
      transition: all 0.2s ease;
      white-space: nowrap;
    }}

    .btn-contact:hover {{
      background: #2563EB;
      transform: translateY(-1px);
    }}

    /* Sub-Header Banner */
    .archive-banner {{
      background: linear-gradient(135deg, #0e172a 0%, #172554 100%);
      border-bottom: 1px solid var(--border-subtle);
      padding: 28px 0;
    }}

    .archive-banner-container {{
      max-width: 1380px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }}

    .archive-banner-title-group h1 {{
      font-family: var(--font-heading);
      font-size: 26px;
      font-weight: 900;
      color: #fff;
      margin-bottom: 4px;
      letter-spacing: -0.01em;
    }}

    .archive-banner-title-group p {{
      font-size: 13.5px;
      color: #93C5FD;
      margin: 0;
      max-width: 820px;
    }}

    .archive-badge-pill {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(37, 99, 235, 0.25);
      border: 1px solid rgba(96, 165, 250, 0.4);
      color: #93c5fd;
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }}

    /* 2-Column App Layout */
    .archive-app-layout {{
      max-width: 1380px;
      margin: 0 auto;
      padding: 28px 24px 60px;
      display: flex;
      gap: 28px;
      align-items: flex-start;
      min-height: calc(100vh - 180px);
    }}

    /* Left Sidebar Navigation */
    .archive-sidebar {{
      width: var(--sidebar-width);
      flex-shrink: 0;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      overflow: hidden;
      position: sticky;
      top: 76px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }}

    .archive-sidebar-header {{
      padding: 16px 18px;
      background: rgba(2, 6, 23, 0.5);
      border-bottom: 1px solid var(--border-subtle);
    }}

    .archive-sidebar-tag {{
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 800;
      color: #60a5fa;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }}

    .archive-sidebar-title {{
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      color: #fff;
    }}

    .archive-nav-list {{
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: calc(100vh - 220px);
      overflow-y: auto;
    }}

    .archive-nav-btn {{
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 12px;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 10px;
      color: var(--text-muted);
      cursor: pointer;
      text-align: left;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }}

    .archive-nav-btn:hover {{
      background: rgba(255, 255, 255, 0.04);
      color: #fff;
    }}

    .archive-nav-btn.active {{
      background: rgba(37, 99, 235, 0.16);
      border-color: rgba(96, 165, 250, 0.4);
      color: #fff;
    }}

    .archive-nav-thumb-wrap {{
      width: 44px;
      height: 44px;
      border-radius: 8px;
      background: #000;
      overflow: hidden;
      flex-shrink: 0;
      border: 1px solid var(--border-subtle);
    }}

    .archive-nav-thumb {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }}

    .archive-nav-text {{
      flex-grow: 1;
      min-width: 0;
    }}

    .archive-nav-title {{
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: inherit;
    }}

    .archive-nav-sub {{
      font-size: 11px;
      color: #64748B;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }}

    .archive-nav-btn.active .archive-nav-sub {{
      color: #93C5FD;
    }}

    .archive-nav-pill {{
      font-family: var(--font-code);
      font-size: 9.5px;
      font-weight: 700;
      color: #60a5fa;
      background: rgba(37, 99, 235, 0.15);
      padding: 2px 6px;
      border-radius: 4px;
      flex-shrink: 0;
    }}

    /* Main Content Pane */
    .archive-main-pane {{
      flex-grow: 1;
      min-width: 0;
    }}

    .archive-pane-header {{
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }}

    .pane-meta-strip {{
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }}

    .pane-client-badge {{
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      color: #60a5fa;
      background: rgba(37, 99, 235, 0.15);
      border: 1px solid rgba(96, 165, 250, 0.3);
      padding: 3px 10px;
      border-radius: 6px;
      text-transform: uppercase;
    }}

    .pane-role-badge {{
      font-family: var(--font-heading);
      font-size: 11.5px;
      font-weight: 700;
      color: #CBD5E1;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      padding: 3px 10px;
      border-radius: 6px;
    }}

    .pane-badge-count {{
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      color: #34D399;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(52, 211, 153, 0.3);
      padding: 3px 10px;
      border-radius: 6px;
    }}

    .pane-title {{
      font-family: var(--font-heading);
      font-size: 28px;
      font-weight: 900;
      color: #fff;
      margin-bottom: 10px;
      line-height: 1.25;
      letter-spacing: -0.01em;
    }}

    .pane-overview {{
      font-size: 15px;
      color: #94A3B8;
      line-height: 1.6;
      margin-bottom: 18px;
      max-width: 920px;
    }}

    .pane-skills-row {{
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }}

    .skill-pill {{
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 600;
      color: #E2E8F0;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      padding: 4px 10px;
      border-radius: 100px;
    }}

    /* Gallery Grid */
    .archive-gallery-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 22px;
    }}

    .archive-card {{
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease, border-color 0.2s ease;
      box-sizing: border-box;
      max-width: 100%;
      min-width: 0;
    }}

    .archive-card:hover {{
      transform: translateY(-3px);
      border-color: rgba(96, 165, 250, 0.4);
      box-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.6);
    }}

    .archive-card-media-wrap {{
      position: relative;
      width: 100%;
      height: 240px;
      background: #090D16;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--border-subtle);
    }}

    .archive-card-img {{
      width: 100%;
      max-width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      transition: transform 0.3s ease;
    }}

    .archive-card:hover .archive-card-img {{
      transform: scale(1.03);
    }}

    .archive-card-tag {{
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(11, 15, 25, 0.9);
      border: 1px solid rgba(96, 165, 250, 0.3);
      color: #93c5fd;
      font-family: var(--font-code);
      font-size: 9.5px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      letter-spacing: 0.06em;
      z-index: 2;
    }}

    .archive-card-zoom-overlay {{
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: #fff;
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 700;
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 3;
    }}

    .archive-card-media-wrap:hover .archive-card-zoom-overlay {{
      opacity: 1;
    }}

    .archive-card-content {{
      padding: 18px 20px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }}

    .archive-card-heading {{
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 6px;
      line-height: 1.35;
    }}

    .archive-card-desc {{
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.55;
      margin: 0;
    }}

    /* Lightbox Modal */
    .lightbox-modal {{
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(5, 8, 15, 0.94);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      box-sizing: border-box;
    }}

    .lightbox-modal.active {{
      display: flex;
    }}

    .lightbox-container {{
      max-width: 1200px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }}

    .lightbox-img {{
      max-width: 100%;
      max-height: 75vh;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
      border: 1px solid var(--border-subtle);
    }}

    .lightbox-caption {{
      margin-top: 16px;
      text-align: center;
      max-width: 780px;
    }}

    .lightbox-caption h3 {{
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 800;
      color: #fff;
      margin-bottom: 4px;
    }}

    .lightbox-caption p {{
      font-size: 13.5px;
      color: #94A3B8;
    }}

    .lightbox-close {{
      position: absolute;
      top: -44px;
      right: 0;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: all 0.2s ease;
    }}

    .lightbox-close:hover {{
      background: #F00658;
      border-color: #F00658;
    }}

    /* Mobile / Tablet Responsive */
    @media (max-width: 1024px) {{
      .archive-app-layout {{
        flex-direction: column;
        padding: 20px 16px;
      }}
      .archive-sidebar {{
        width: 100%;
        position: static;
      }}
      .archive-nav-list {{
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        gap: 8px;
        max-height: none;
        padding: 10px;
      }}
      .archive-nav-btn {{
        width: 260px;
        flex-shrink: 0;
      }}
      .archive-gallery-grid {{
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
        <a href="/work" class="nav-item">🎨 Selected Work</a>
        <a href="/archive" class="nav-item active">🖼️ Visual Archive</a>
        <a href="/cv" class="nav-item">📄 My Resume</a>
      </nav>

      <div class="header-actions">
        <a href="mailto:vrbberaj@gmail.com" class="btn-contact">
          Get In Touch &rarr;
        </a>
      </div>
    </div>
  </header>

  <!-- Sub-Header Banner -->
  <section class="archive-banner">
    <div class="archive-banner-container">
      <div class="archive-banner-title-group">
        <span class="archive-badge-pill">🎨 7 NATIVE PRODUCTION GALLERIES</span>
        <h1>Visual Archive &amp; Authentic Design Deliverables</h1>
        <p>
          Unaltered production screens, information architecture maps, mobile telematic clusters, and enterprise design token artifacts brought directly inside this website from my public Behance portfolio archive.
        </p>
      </div>
      <div>
        <a href="/work" class="btn-contact" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2);">
          &larr; Return to Selected Work
        </a>
      </div>
    </div>
  </section>

  <!-- 2-Column App Layout -->
  <div class="archive-app-layout">
    <!-- Left Sidebar -->
    <aside class="archive-sidebar" aria-label="Visual Archive Project Switcher">
      <div class="archive-sidebar-header">
        <span class="archive-sidebar-tag">PRODUCTION GALLERIES</span>
        <h3 class="archive-sidebar-title">Select a Project</h3>
      </div>
      <nav class="archive-nav-list" id="archiveNavList">
        {sidebar_items_html}
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="archive-main-pane">
      {gallery_panes_html}
    </main>
  </div>

  <!-- Fullscreen Lightbox Modal -->
  <div class="lightbox-modal" id="lightboxModal" onclick="closeLightbox(event)">
    <div class="lightbox-container" onclick="event.stopPropagation()">
      <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
      <img src="" alt="" class="lightbox-img" id="lightboxImg">
      <div class="lightbox-caption">
        <h3 id="lightboxTitle"></h3>
        <p id="lightboxDesc"></p>
      </div>
    </div>
  </div>

  <script>
    // Gallery switching logic
    function selectArchiveGallery(galleryId) {{
      // Update nav button states
      const navBtns = document.querySelectorAll('.archive-nav-btn');
      navBtns.forEach(btn => {{
        if (btn.getAttribute('data-gallery-id') === galleryId) {{
          btn.classList.add('active');
        }} else {{
          btn.classList.remove('active');
        }}
      }});

      // Show selected pane
      const panes = document.querySelectorAll('.archive-pane');
      panes.forEach(pane => {{
        if (pane.id === 'pane-' + galleryId) {{
          pane.style.display = 'block';
        }} else {{
          pane.style.display = 'none';
        }}
      }});

      // Scroll smoothly to top of pane on mobile
      if (window.innerWidth <= 1024) {{
        window.scrollTo({{ top: 220, behavior: 'smooth' }});
      }}
    }}

    // Lightbox modal logic
    function openLightbox(imgSrc, title, desc) {{
      const modal = document.getElementById('lightboxModal');
      const img = document.getElementById('lightboxImg');
      const t = document.getElementById('lightboxTitle');
      const d = document.getElementById('lightboxDesc');
      img.src = imgSrc;
      img.alt = title;
      t.innerText = title;
      d.innerText = desc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }}

    function closeLightbox() {{
      const modal = document.getElementById('lightboxModal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }}

    document.addEventListener('keydown', (e) => {{
      if (e.key === 'Escape') closeLightbox();
    }});
  </script>
</body>
</html>
"""

# Write archive.html
archive_html = generate_archive_html()
with open('archive.html', 'w', encoding='utf-8') as f:
    f.write(archive_html)
print("--- Successfully generated archive.html (Native Visual Archive with Left Panel) ---")

# ----------------------------------------------------------------------------
# 3. Update build_executive_suite.js with 5-Tab Navigation, Left-Panel work.html & Case Re-order
# ----------------------------------------------------------------------------
with open('build_executive_suite.js', 'r', encoding='utf-8') as f:
    suite_code = f.read()

# 3A. Update getGlobalNav to include 5th tab: "🖼️ Visual Archive"
old_nav_needle = """      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/" class="nav-item ${activePage === 'home' ? 'active' : ''}">Welcome</a>
        <a href="/leadership" class="nav-item ${activePage === 'leadership' ? 'active' : ''}">👔 Leadership Deck</a>
        <a href="/work" class="nav-item ${activePage === 'work' ? 'active' : ''}">🎨 Selected Work</a>
        <a href="/cv" class="nav-item ${activePage === 'cv' ? 'active' : ''}">📄 My Resume</a>
      </nav>"""

new_nav_replace = """      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/" class="nav-item ${activePage === 'home' ? 'active' : ''}">Welcome</a>
        <a href="/leadership" class="nav-item ${activePage === 'leadership' ? 'active' : ''}">👔 Leadership Deck</a>
        <a href="/work" class="nav-item ${activePage === 'work' ? 'active' : ''}">🎨 Selected Work</a>
        <a href="/archive" class="nav-item ${activePage === 'archive' ? 'active' : ''}">🖼️ Visual Archive</a>
        <a href="/cv" class="nav-item ${activePage === 'cv' ? 'active' : ''}">📄 My Resume</a>
      </nav>"""

if old_nav_needle in suite_code:
    suite_code = suite_code.replace(old_nav_needle, new_nav_replace)
    print("Updated getGlobalNav in build_executive_suite.js with Visual Archive tab.")

# 3B. Update Part D newNav string in updateNavInHtml
old_part_d_needle = """      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/" class="nav-item ${activeKey === 'home' ? 'active' : ''}">Welcome</a>
        <a href="/leadership" class="nav-item ${activeKey === 'leadership' ? 'active' : ''}">👔 Leadership Deck</a>
        <a href="/work" class="nav-item ${activeKey === 'work' ? 'active' : ''}">🎨 Selected Work</a>
        <a href="/cv" class="nav-item ${activeKey === 'cv' ? 'active' : ''}">📄 My Resume</a>
      </nav>"""

new_part_d_replace = """      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/" class="nav-item ${activeKey === 'home' ? 'active' : ''}">Welcome</a>
        <a href="/leadership" class="nav-item ${activeKey === 'leadership' ? 'active' : ''}">👔 Leadership Deck</a>
        <a href="/work" class="nav-item ${activeKey === 'work' ? 'active' : ''}">🎨 Selected Work</a>
        <a href="/archive" class="nav-item ${activeKey === 'archive' ? 'active' : ''}">🖼️ Visual Archive</a>
        <a href="/cv" class="nav-item ${activeKey === 'cv' ? 'active' : ''}">📄 My Resume</a>
      </nav>"""

if old_part_d_needle in suite_code:
    suite_code = suite_code.replace(old_part_d_needle, new_part_d_replace)
    print("Updated Part D newNav in build_executive_suite.js.")

# Write updated build_executive_suite.js
with open('build_executive_suite.js', 'w', encoding='utf-8') as f:
    f.write(suite_code)

print("=== 2. COMPILING WORK.HTML WITH LEFT-PANEL PROJECT SWITCHER & IBM AS #1 ===")
# Now compile work.html using our new dedicated generator script
import compile_work_portal_with_sidebar
