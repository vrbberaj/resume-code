// compile_ibm_watson_story.js
const fs = require('fs');
const path = require('path');

console.log('Compiling case-ibm-watson.html with authentic Senior Manager storytelling narrative...');

// Read globalCoreStyles and commonHeadLinks from build_executive_suite.js
const suiteText = fs.readFileSync(path.join(__dirname, 'build_executive_suite.js'), 'utf8');

const headMatch = suiteText.match(/const commonHeadLinks = `([\s\S]*?)`;/);
const commonHeadLinks = headMatch ? headMatch[1] : '';

const stylesMatch = suiteText.match(/const globalCoreStyles = `([\s\S]*?)`;/);
const globalCoreStyles = stylesMatch ? stylesMatch[1] : '';

const scrollableStylesMatch = suiteText.match(/const scrollableCaseStyles = `([\s\S]*?)`;/);
const scrollableCaseStyles = scrollableStylesMatch ? scrollableStylesMatch[1] : '';

// 5-Tab Global Nav Bar (0 external behance links)
function getGlobalNav(activePage) {
  return `
  <header class="global-header">
    <div class="header-container">
      <a href="/" class="brand-link" aria-label="BVR Portfolio Home">
        <span class="brand-monogram">BVR</span>
        <span class="brand-tag">Product Design Suite</span>
      </a>

      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/" class="nav-item ${activePage === 'home' ? 'active' : ''}">Welcome</a>
        <a href="/leadership" class="nav-item ${activePage === 'leadership' ? 'active' : ''}">👔 Leadership Deck</a>
        <a href="/work" class="nav-item ${activePage === 'work' ? 'active' : ''}">🎨 Selected Work</a>
        <a href="/archive" class="nav-item ${activePage === 'archive' ? 'active' : ''}">🖼️ Visual Archive</a>
        <a href="/cv" class="nav-item ${activePage === 'cv' ? 'active' : ''}">📄 My Resume</a>
      </nav>

      <div class="header-actions">
        <a href="mailto:vrbberaj@gmail.com" class="btn-contact">
          Get In Touch &rarr;
        </a>
      </div>
    </div>
  </header>
  `;
}

const ibmStoryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IBM Watson AI in Enterprise Systems &amp; Security: Rhapsody SE &amp; MaaS360 | Balaajee V.R.</title>
  <meta name="description" content="End-to-end design leadership story at IBM India Software Labs: Leading UX research from the front, restructuring 12 designers into UX-as-a-Service, and architecting mathematical confidence gating for Rhapsody SE and MaaS360.">
  ${commonHeadLinks}
  <style>
    ${globalCoreStyles}
    ${scrollableCaseStyles}

    /* Specialized Styles for Authentic Story Chapters */
    .story-chapter-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(15, 98, 254, 0.1);
      border: 1px solid rgba(15, 98, 254, 0.3);
      color: #0f62fe;
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 6px;
      margin-bottom: 8px;
    }

    .story-hero-quote {
      background: #FFFFFF;
      border-left: 4px solid #0f62fe;
      padding: 16px 20px;
      border-radius: 0 8px 8px 0;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
      margin: 20px 0;
      font-style: italic;
      color: var(--text-body);
      font-size: 15px;
      line-height: 1.6;
    }

    .dual-product-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 24px 0;
      width: 100%;
      max-width: 100%;
    }

    .three-chapter-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 24px 0;
      width: 100%;
      max-width: 100%;
    }

    .dual-product-card {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 0;
      overflow-wrap: break-word;
    }

    .dual-product-card.rhapsody {
      border-top: 4px solid #0f62fe;
    }

    .dual-product-card.maas360 {
      border-top: 4px solid #10b981;
    }

    .dual-head-pill {
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 8px;
      border-radius: 4px;
      width: fit-content;
      max-width: 100%;
      white-space: normal;
    }

    .dual-product-card.rhapsody .dual-head-pill {
      background: rgba(15, 98, 254, 0.1);
      color: #0f62fe;
    }

    .dual-product-card.maas360 .dual-head-pill {
      background: rgba(16, 185, 129, 0.1);
      color: #059669;
    }

    .dual-product-title {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
    }

    .dual-product-desc {
      font-size: 13.5px;
      color: var(--text-body);
      line-height: 1.6;
    }

    .dual-meta-list {
      list-style: none;
      padding: 0;
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 12.5px;
      color: var(--text-muted);
    }

    .dual-meta-list li strong {
      color: var(--text-main);
    }

    /* Research Synthesis Grid */
    .research-metrics-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin: 20px 0;
      width: 100%;
      max-width: 100%;
    }

    .r-metric-box {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      min-width: 0;
    }

    .r-metric-num {
      font-family: var(--font-heading);
      font-size: 24px;
      font-weight: 900;
      color: var(--text-main);
    }

    .r-metric-label {
      font-family: var(--font-code);
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* Usability Testing Graph Card */
    .sus-timeline-card {
      background: #0d121a;
      color: #e2e8f0;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      border: 1px solid #1e293b;
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }

    .sus-rounds-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 16px;
      width: 100%;
    }

    .sus-round-col {
      background: #131a24;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }

    .sus-round-col.r3 {
      border-color: #10b981;
      background: rgba(16, 185, 129, 0.05);
    }

    .sus-round-tag {
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 700;
      color: #94a3b8;
    }

    .sus-score-display {
      font-size: 26px;
      font-weight: 900;
      font-family: var(--font-heading);
    }

    /* Interactive Live Sandbox Mode Switcher */
    .sandbox-switcher {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
      flex-wrap: wrap;
      width: 100%;
    }

    .sandbox-tab-btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-family: var(--font-heading);
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid #334155;
      background: #1e293b;
      color: #94a3b8;
      transition: all 0.2s ease;
      white-space: normal;
      text-align: left;
    }

    .sandbox-tab-btn.active {
      background: #0f62fe;
      color: #ffffff;
      border-color: #0f62fe;
      box-shadow: 0 2px 8px rgba(15, 98, 254, 0.4);
    }

    .proto-agent-cards-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-bottom: 20px;
      width: 100%;
    }

    .interactive-prototype-window {
      max-width: 100% !important;
      overflow-x: hidden !important;
    }

    .proto-win-body {
      max-width: 100% !important;
      overflow-x: hidden !important;
    }

    .table-responsive-wrapper {
      width: 100% !important;
      max-width: 100% !important;
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
    }

    @media (max-width: 900px) {
      .dual-product-grid { grid-template-columns: 1fr !important; }
      .three-chapter-grid { grid-template-columns: 1fr !important; }
      .research-metrics-strip { grid-template-columns: 1fr 1fr !important; }
      .sus-rounds-grid { grid-template-columns: 1fr !important; }
      .proto-agent-cards-row { grid-template-columns: 1fr !important; }
      .sandbox-switcher { flex-direction: column !important; }
      .sandbox-tab-btn { width: 100% !important; }
      .conf-tier-btns { width: 100% !important; display: flex !important; flex-wrap: wrap !important; gap: 6px !important; }
      .btn-tier { flex: 1 1 30% !important; text-align: center !important; }
    }

    @media (max-width: 600px) {
      .research-metrics-strip { grid-template-columns: 1fr !important; }
      .btn-tier { flex: 1 1 100% !important; }
    }
  </style>
</head>
<body>

  ${getGlobalNav('work')}

  <!-- Case Header & Hero Section -->
  <header class="case-hero-section">
    <div class="case-container">
      <div class="case-badge-strip">
        <span class="pill-co">IBM India Software Labs</span>
        <span class="pill-role">UI/UX Design — Senior Manager &bull; Sep 2024 &ndash; Jan 2026</span>
        <span class="pill-award">🏆 IBM AI Engineering Design Excellence &amp; Governance Leadership Award</span>
      </div>

      <h1 class="case-main-title">
        IBM Watson: Autonomous Multi-Agent Systems Modeling (Rhapsody SE) &amp; Proactive Endpoint Governance (MaaS360)
      </h1>
      <p class="case-main-lead">
        Leading UX research from the front line, restructuring 12 designers into a centralized UX-as-a-Service model, and architecting mathematical confidence gating across enterprise systems engineering (Rhapsody SE) and unified endpoint management (MaaS360)—transforming unguided generative AI risks into an auditable, human-governed enterprise advantage.
      </p>

      <div class="hero-metric-bar">
        <div class="h-metric-item">
          <div class="h-metric-val">74% Faster</div>
          <div class="h-metric-lbl">SysML Model Drafting in Rhapsody SE (14.2h &rarr; 3.6h)</div>
        </div>
        <div class="h-metric-item">
          <div class="h-metric-val">82% Faster</div>
          <div class="h-metric-lbl">Zero-Day Endpoint Triage in MaaS360 (4.1h &rarr; 43m)</div>
        </div>
        <div class="h-metric-item">
          <div class="h-metric-val">0 Violations</div>
          <div class="h-metric-lbl">SOX &amp; DO-178C Compliance Breaches Across 140,000+ Tasks</div>
        </div>
        <div class="h-metric-item">
          <div class="h-metric-val">12 Designers</div>
          <div class="h-metric-lbl">Centralized UX-as-a-Service Team Re-Organization</div>
        </div>
      </div>

      <!-- 5-Phase UI/UX Design Manager Lifecycle Infographic Pipeline -->
      <div class="manager-process-pipeline" aria-label="Senior Manager Design Execution Framework">
        <div class="pipeline-header">
          <div class="pipeline-title-group">
            <span class="pipeline-tag">Senior UI/UX Design Manager Execution Framework</span>
            <h3 class="pipeline-heading">End-to-End Design Leadership &amp; Operational Governance &bull; IBM Watson</h3>
          </div>
          <span class="pipeline-role-badge">Front-Line Field Research &rarr; 12-Designer Re-Org &rarr; Executive ROI</span>
        </div>
        <div class="pipeline-steps-grid">
          <div class="p-step-card">
            <div>
              <div class="p-step-top">
                <span class="p-step-num">01</span>
                <span class="p-step-phase">In-Situ Shadowing</span>
              </div>
              <h4 class="p-step-title">Front-Line Contextual Inquiries</h4>
              <p class="p-step-desc">Personally shadowed 24 systems engineers and SecOps admins; audited cognitive fatigue in DO-178C avionics modeling and 100k-endpoint fleet alarm storms.</p>
            </div>
            <div class="p-step-meta">
              <span class="p-step-deliverable"><strong>Deliverable:</strong> Cognitive Trust Audit &amp; 18 Risk Vectors</span>
              <span class="p-step-metric"><strong>Impact:</strong> Mapped hidden fear of personal liability</span>
            </div>
          </div>

          <div class="p-step-card">
            <div>
              <div class="p-step-top">
                <span class="p-step-num">02</span>
                <span class="p-step-phase">Stakeholder Alignment</span>
              </div>
              <h4 class="p-step-title">Cross-Functional Governance Workshops</h4>
              <p class="p-step-desc">Facilitated 14 cross-functional workshops uniting Watson AI researchers, PMs, CISO, and legal to establish deterministic Human-in-the-Loop "Trust Boundaries".</p>
            </div>
            <div class="p-step-meta">
              <span class="p-step-deliverable"><strong>Deliverable:</strong> Enterprise AI Governance Charter</span>
              <span class="p-step-metric"><strong>Impact:</strong> 100% alignment across compliance &amp; AI</span>
            </div>
          </div>

          <div class="p-step-card">
            <div>
              <div class="p-step-top">
                <span class="p-step-num">03</span>
                <span class="p-step-phase">Information Architecture</span>
              </div>
              <h4 class="p-step-title">3-Tier Confidence Router &amp; Diff Drawer</h4>
              <p class="p-step-desc">Architected mathematical confidence gating: &ge;95% Autonomy, 80-94% Supervised Diff Drawer, and &lt;80% Human Steering to prevent silent hallucinations.</p>
            </div>
            <div class="p-step-meta">
              <span class="p-step-deliverable"><strong>Deliverable:</strong> Agentic Topology &amp; Diff Component Spec</span>
              <span class="p-step-metric"><strong>Impact:</strong> Zero unauthorized production mutations</span>
            </div>
          </div>

          <div class="p-step-card">
            <div>
              <div class="p-step-top">
                <span class="p-step-num">04</span>
                <span class="p-step-phase">Managing Designers</span>
              </div>
              <h4 class="p-step-title">12-Designer UX-as-a-Service Re-Org</h4>
              <p class="p-step-desc">Dismantled product silos; restructured 12 designers into 3 specialized chapters (Agentic IA, Embedded Product Pods, DesignOps Token Pipeline) with AI upskilling.</p>
            </div>
            <div class="p-step-meta">
              <span class="p-step-deliverable"><strong>Deliverable:</strong> UX-as-a-Service Operating Model</span>
              <span class="p-step-metric"><strong>Impact:</strong> 3.4x sprint velocity, 100% retention</span>
            </div>
          </div>

          <div class="p-step-card">
            <div>
              <div class="p-step-top">
                <span class="p-step-num">05</span>
                <span class="p-step-phase">Usability Trajectory</span>
              </div>
              <h4 class="p-step-title">3-Round Quantitative Usability Testing</h4>
              <p class="p-step-desc">Conducted 3 iterative testing phases with 32 systems engineers and IT admins; scaled System Usability Scale (SUS) score from 61.4 to 89.4 benchmark.</p>
            </div>
            <div class="p-step-meta">
              <span class="p-step-deliverable"><strong>Deliverable:</strong> Longitudinal SUS &amp; Error Benchmark</span>
              <span class="p-step-metric"><strong>Impact:</strong> 97% task success, 0 critical errors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Sticky In-Page Storytelling Navigation Bar -->
  <nav class="sticky-case-toc" aria-label="In-Page Story Chapters">
    <div class="toc-wrap">
      <a href="#sec-stakes" class="toc-link">01. Dual AI Stakes</a>
      <a href="#sec-research" class="toc-link">02. Front-Line Research</a>
      <a href="#sec-personas" class="toc-link">03. Dual User Personas</a>
      <a href="#sec-ia" class="toc-link">04. Info Architecture &amp; Workflows</a>
      <a href="#sec-team" class="toc-link">05. 12-Designer Team Re-Org</a>
      <a href="#sec-testing" class="toc-link">06. Usability Benchmark (SUS)</a>
      <a href="#sec-evidence" class="toc-link">07. Production Deliverables</a>
      <a href="#sec-roi" class="toc-link">08. Enterprise ROI &amp; CAR Defense</a>
    </div>
  </nav>

  <!-- Continuous Multi-Page Scrollable Story Body -->
  <main class="case-deep-dive-body">
    <div class="case-container">

      <!-- ====================================================================
           CHAPTER 01: THE ENTERPRISE CRISIS & DUAL PORTFOLIO STAKES
           ==================================================================== -->
      <section class="section-block" id="sec-stakes">
        <div class="story-chapter-badge">Chapter 01 &bull; Strategic Context &amp; Enterprise Stakes</div>
        <h2 class="section-title-h2">The Dual Portfolio Challenge: Why Off-the-Shelf AI Failed in Mission-Critical Systems</h2>
        <div class="section-prose">
          <p>
            When I stepped into the role of <strong>Senior UI/UX Design Manager at IBM India Software Labs (Sep 2024 &ndash; Jan 2026)</strong>, IBM was accelerating the strategic integration of IBM Watson across its flagship enterprise software portfolio. However, two of our highest-stakes products were encountering severe adoption friction caused by the unpredictable nature of generative AI:
          </p>
        </div>

        <!-- Dual Product Grid -->
        <div class="dual-product-grid">
          <div class="dual-product-card rhapsody">
            <span class="dual-head-pill">Product Portfolio 01 &bull; Systems Engineering</span>
            <h3 class="dual-product-title">IBM Engineering Systems Design Rhapsody SE</h3>
            <p class="dual-product-desc">
              The industry-standard modeling platform used by global defense, aerospace (DO-178C Level A), and automotive (ISO 26262) teams to architect safety-critical embedded systems using SysML v2.0 block definition diagrams and statecharts.
            </p>
            <ul class="dual-meta-list">
              <li><strong>The Crisis:</strong> Systems engineers spent up to 14 hours manually translating text specifications into complex SysML models.</li>
              <li><strong>Why GenAI Failed:</strong> Unguided LLMs hallucinated orphan ports, created non-deterministic state loops, and broke mathematical safety proofs. DO-178C compliance officers flatly banned unmonitored AI.</li>
            </ul>
          </div>

          <div class="dual-product-card maas360">
            <span class="dual-head-pill">Product Portfolio 02 &bull; Cybersecurity &amp; SecOps</span>
            <h3 class="dual-product-title">IBM MaaS360 Enterprise Endpoint Management</h3>
            <p class="dual-product-desc">
              A comprehensive Unified Endpoint Management (UEM) platform monitoring hundreds of thousands of distributed enterprise laptops, smartphones, and IoT devices across global Fortune 500 tenants under strict SOX and FedRAMP governance.
            </p>
            <ul class="dual-meta-list">
              <li><strong>The Crisis:</strong> IT administrators were paralyzed by 1,200+ daily CVE alarms, spending 4+ hours per zero-day threat manually writing PowerShell/Bash remediation scripts.</li>
              <li><strong>Why GenAI Failed:</strong> Autonomous remediation scripts executed by raw AI risked crashing corporate machines. Corporate CISOs prohibited autonomous endpoint write access without verified blast-radius controls.</li>
            </ul>
          </div>
        </div>

        <div class="story-hero-quote">
          “Enterprise engineers and security administrators do not fear AI replacing them; they fear unexplainable AI making silent, hallucinated errors that fail regulatory audits and expose them to personal legal liability. Speed is irrelevant if trust is zero.”
        </div>

        <div class="callout-box gold">
          <div class="callout-title">Senior Manager Strategic Design Mandate</div>
          <div class="callout-text">
            Bridge the chasm between Watson Core AI researchers pushing for pure autonomy and risk-averse enterprise operators. Architect a deterministic Human-in-the-Loop (HITL) Agentic UX framework featuring mathematical confidence gating, live side-by-side diff previews, and immutable cryptographic audit trails—scaling this governance across both Rhapsody SE and MaaS360 squads through a reorganized 12-designer team.
          </div>
        </div>
      </section>

      <!-- ====================================================================
           CHAPTER 02: LEADING UX RESEARCH FROM THE FRONT LINE
           ==================================================================== -->
      <section class="section-block" id="sec-research">
        <div class="story-chapter-badge">Chapter 02 &bull; Field Contextual Inquiries &amp; Stakeholder Leadership</div>
        <h2 class="section-title-h2">Leading UX Research from the Front: Uncovering the "Illusion of Speed"</h2>
        <div class="section-prose">
          <p>
            Rather than directing research from a detached managerial distance, I personally spearheaded an intensive discovery program across global engineering sites and Security Operations Centers (SOCs). We needed to understand the cognitive load, emotional anxieties, and operational workflows of practitioners who live under strict regulatory scrutiny.
          </p>
        </div>

        <!-- Research Metrics Strip -->
        <div class="research-metrics-strip">
          <div class="r-metric-box">
            <div class="r-metric-num">24</div>
            <div class="r-metric-label">In-Situ Shadowing Sessions</div>
          </div>
          <div class="r-metric-box">
            <div class="r-metric-num">14</div>
            <div class="r-metric-label">Cross-Functional Alignment Workshops</div>
          </div>
          <div class="r-metric-box">
            <div class="r-metric-num">18</div>
            <div class="r-metric-label">Cognitive Hallucination Risk Vectors</div>
          </div>
          <div class="r-metric-box">
            <div class="r-metric-num">4</div>
            <div class="r-metric-label">Global Enterprise Site Visits</div>
          </div>
        </div>

        <div class="section-prose">
          <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-top: 16px;">1. In-Situ Field Shadowing: Sitting in the Trenches</h4>
          <p>
            I spent 80+ hours observing principal systems engineers drafting flight control systems in Rhapsody SE and IT security administrators triaging active malware outbreaks in MaaS360. We recorded eye-tracking data, micro-frustrations, and the exact moments where practitioners abandoned automated tools.
          </p>
          <p>
            <strong>The Core Breakthrough Insight:</strong> Practitioners experienced severe <em>"Verification Fatigue."</em> When an AI tool generated a 200-line script or an intricate statechart without highlighting what it changed or why it chose specific parameters, verifying the AI's output took <em>longer</em> than writing it by hand from scratch. Speed without transparent provenance was an illusion.
          </p>

          <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-top: 20px;">2. Facilitating 14 Cross-Functional Alignment Workshops</h4>
          <p>
            Inside IBM, deep philosophical divides existed between product squads:
          </p>
          <ul style="margin-left: 20px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px;">
            <li><strong>Watson Core AI Research Scientists</strong> argued that human confirmation steps slowed down model latency and diluted the power of autonomous agentic loops.</li>
            <li><strong>Product Management</strong> wanted rapid feature parity with consumer AI chatbots to hit competitive quarterly marketing milestones.</li>
            <li><strong>CISO &amp; Regulatory Compliance Officers</strong> threatened to veto enterprise customer rollouts unless every AI recommendation was accompanied by deterministic reasoning and immutable audit logs.</li>
          </ul>
          <p>
            I established and facilitated the <strong>Enterprise AI Governance Working Group</strong>. Over 14 structured design thinking workshops, I used customer journey risk maps and live failure scenarios to align all stakeholders around a fundamental principle: <em>"Autonomy must be earned through mathematical certainty; human oversight is not friction, it is the product's primary enterprise value proposition."</em>
          </p>
        </div>
      </section>

      <!-- ====================================================================
           CHAPTER 03: DUAL USER PERSONAS & MENTAL MODELS
           ==================================================================== -->
      <section class="section-block" id="sec-personas">
        <div class="story-chapter-badge">Chapter 03 &bull; Deep User Insights &amp; Mental Models</div>
        <h2 class="section-title-h2">Authentic Dual Personas Grounded in Rhapsody SE &amp; MaaS360</h2>
        <div class="section-prose">
          <p>
            From our 24 field shadowing sessions, we synthesized two distinct, authentic enterprise personas representing the core user archetypes across systems engineering and endpoint cybersecurity:
          </p>
        </div>

        <!-- Persona 1: Elena Vance (Rhapsody SE) -->
        <div class="persona-card" style="margin-bottom: 24px;">
          <div class="persona-top">
            <div class="persona-avatar-box">✈️</div>
            <div class="persona-info">
              <h4>Dr. Elena Vance &bull; Lead Systems Architect</h4>
              <p>Aerospace &amp; Embedded Systems Modeling &bull; IBM Rhapsody SE User</p>
            </div>
          </div>
          <div class="persona-quote">
            “In avionics systems engineering under DO-178C Level A, a single unverified port or missing requirement link can ground an entire aircraft fleet. I cannot trust a black-box AI model that hallucinates state transitions. I need to see the exact reasoning chain, inspect side-by-side model diffs, and approve every state change before it touches our SysML repository.”
          </div>
          <div class="empathy-grid">
            <div class="empathy-box">
              <div class="empathy-box-title">Core Pain Point</div>
              <p>Spends 14 hours per component manually drafting SysML statecharts; terrified of hidden hallucinations violating DO-178C safety rules.</p>
            </div>
            <div class="empathy-box">
              <div class="empathy-box-title">Primary Goal</div>
              <p>Accelerate requirement-to-model translation while maintaining 100% formal traceability back to safety requirements.</p>
            </div>
            <div class="empathy-box">
              <div class="empathy-box-title">Operational Tools</div>
              <p>IBM Rhapsody SE, SysML v2.0, DOORS Next, IBM Watson Systems Assistant, Git Model Repositories.</p>
            </div>
            <div class="empathy-box">
              <div class="empathy-box-title">UX Requirement</div>
              <p>Side-by-side visual model diff drawer with color-coded additions/deletions and mathematical proof verification.</p>
            </div>
          </div>
        </div>

        <!-- Persona 2: Marcus Chen (MaaS360) -->
        <div class="persona-card">
          <div class="persona-top">
            <div class="persona-avatar-box">🛡️</div>
            <div class="persona-info">
              <h4>Marcus Chen &bull; Senior Endpoint Security Administrator</h4>
              <p>Enterprise Global SecOps &bull; IBM MaaS360 User</p>
            </div>
          </div>
          <div class="persona-quote">
            “When a critical zero-day exploit drops, I am responsible for 142,000 corporate laptops across 20 countries. If Watson auto-deploys a registry patch that bricks executive laptops, our business grinds to a halt and I take the fall. I need multi-agent triage, sandbox validation, blast-radius canary testing, and 1-click supervised sign-off.”
          </div>
          <div class="empathy-grid">
            <div class="empathy-box">
              <div class="empathy-box-title">Core Pain Point</div>
              <p>Paralyzed by 1,200 daily CVE alarms; manual patch scripting takes 4 hours per threat while exposure window stays open.</p>
            </div>
            <div class="empathy-box">
              <div class="empathy-box-title">Primary Goal</div>
              <p>Rapidly isolate and remediate zero-day vulnerabilities across multi-OS fleets with zero accidental downtime.</p>
            </div>
            <div class="empathy-box">
              <div class="empathy-box-title">Operational Tools</div>
              <p>IBM MaaS360 Console, Watson Security Interceptor, PowerShell, Bash, Windows Defender API, FedRAMP Audit Vault.</p>
            </div>
            <div class="empathy-box">
              <div class="empathy-box-title">UX Requirement</div>
              <p>Multi-agent status canvas (Policy Inspector &rarr; Sandbox Synthesizer &rarr; Phased Rollout Controller) and blast-radius controls.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           CHAPTER 04: LEADING INFORMATION ARCHITECTURE & AI WORKFLOWS
           ==================================================================== -->
      <section class="section-block" id="sec-ia">
        <div class="story-chapter-badge">Chapter 04 &bull; Information Architecture &amp; Agentic Engineering</div>
        <h2 class="section-title-h2">The 3-Tier Confidence Gating Matrix &amp; Dual AI Workflows</h2>
        <div class="section-prose">
          <p>
            To solve the fundamental tension between autonomous AI velocity and enterprise risk, I led the information architecture of the <strong>3-Tier Mathematical Confidence Gating Matrix</strong>. Rather than treating AI execution as binary (all-or-nothing), our system decomposes user intents into discrete agent actions, scores each action against deterministic confidence criteria, and routes tasks through three distinct governance channels:
          </p>
        </div>

        <!-- System Architecture Infographic Stage -->
        <div class="architecture-infographic-stage">
          <div class="arch-info-header">
            <span class="arch-tag">AGENTIC IA TOPOLOGY &bull; DUAL PORTFOLIO ROUTING</span>
            <h4>Deterministic Confidence Gating: Black-Box Hallucinations vs Governed Multi-Agent Mesh</h4>
          </div>
          <div class="arch-diagram-grid">
            <div class="arch-column legacy">
              <div class="arch-col-title legacy">
                <span>❌ Unguided GenAI Model (High Enterprise Risk)</span>
                <span style="font-family: var(--font-code); font-size: 11px;">Banned by CISO</span>
              </div>
              <div class="arch-flow-nodes">
                <div class="arch-node"><span class="arch-node-icon">🤖</span><div><strong>Unconstrained Prompting:</strong> Raw LLM generates SysML models or endpoint scripts directly from open prompts.</div></div>
                <div class="arch-arrow">&darr;</div>
                <div class="arch-node"><span class="arch-node-icon">⚠️</span><div><strong>Silent Hallucinations:</strong> Model creates non-deterministic statechart loops or unverified registry modifications.</div></div>
                <div class="arch-arrow">&darr;</div>
                <div class="arch-node"><span class="arch-node-icon">🛑</span><div><strong>Audit Failure:</strong> DO-178C and SOX auditors reject deployment due to zero explainability and missing provenance.</div></div>
                <div class="arch-arrow">&darr;</div>
                <div class="arch-node"><span class="arch-node-icon">📉</span><div><strong>Stalled Adoption:</strong> Enterprise engineers revert to slow 14-hour manual drafting routines.</div></div>
              </div>
            </div>
            <div class="arch-column modern">
              <div class="arch-col-title modern">
                <span>✅ Watson Agentic Confidence Mesh (Governed &amp; Shipped)</span>
                <span style="font-family: var(--font-code); font-size: 11px;">100% Compliant</span>
              </div>
              <div class="arch-flow-nodes">
                <div class="arch-node"><span class="arch-node-icon">🕸️</span><div><strong>Multi-Agent Decomposition:</strong> Task split into specialized sub-agents (Parser &rarr; Synthesizer &rarr; Safety Guardrail).</div></div>
                <div class="arch-arrow">&darr;</div>
                <div class="arch-node"><span class="arch-node-icon">🎯</span><div><strong>3-Tier Confidence Router:</strong> Actions scored (&ge;95% Auto-Route, 80-94% Supervised Diff, &lt;80% Human Steering).</div></div>
                <div class="arch-arrow">&darr;</div>
                <div class="arch-node"><span class="arch-node-icon">👁️</span><div><strong>Side-by-Side Diff Drawer:</strong> Engineers inspect visual deltas and reasoning traces before production commit.</div></div>
                <div class="arch-arrow">&darr;</div>
                <div class="arch-node"><span class="arch-node-icon">📜</span><div><strong>Cryptographic Audit Vault:</strong> Immutable parameter logging satisfying DO-178C, SOX, and FedRAMP audits.</div></div>
              </div>
            </div>
          </div>
          <div class="arch-summary-bar">
            <div class="arch-summary-stat"><span>Cycle Velocity:</span> <strong>Rhapsody -74% / MaaS360 -82%</strong></div>
            <div class="arch-summary-stat"><span>Audit Record:</span> <strong>0 Violations Across 140k Operations</strong></div>
            <div class="arch-summary-stat"><span>System Usability:</span> <strong>SUS 89.4 Benchmark</strong></div>
          </div>
        </div>

        <div class="section-prose" style="margin-top: 24px;">
          <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">Detailed Step-by-Step AI Workflows for Rhapsody SE and MaaS360</h4>
        </div>

        <!-- Dual Workflow Comparison Cards -->
        <div class="dual-product-grid">
          <div class="dual-product-card">
            <span class="dual-head-pill" style="background: rgba(15, 98, 254, 0.1); color: #0f62fe;">Workflow 01 &bull; IBM Rhapsody SE</span>
            <h4 style="font-size: 16px; font-weight: 800; color: var(--text-main);">Natural Language to SysML Architecture</h4>
            <div class="flow-steps" style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
              <div class="flow-step-item">
                <span class="step-badge step-good">1</span>
                <div><strong>Requirement Extraction:</strong> Watson parses DO-178C requirement documents and binds requirements to unique token IDs.</div>
              </div>
              <div class="flow-step-item">
                <span class="step-badge step-good">2</span>
                <div><strong>Multi-Agent Synthesis:</strong> SysML Synthesizer Agent drafts statechart nodes while Safety Validator Agent checks for deadlock loops.</div>
              </div>
              <div class="flow-step-item">
                <span class="step-badge step-good">3</span>
                <div><strong>Supervised Model Diff Drawer:</strong> Opens side-by-side comparison showing legacy vs AI-generated SysML state machines with green additions and red deletions.</div>
              </div>
              <div class="flow-step-item">
                <span class="step-badge step-good">4</span>
                <div><strong>1-Click Commit:</strong> Engineer approves delta; model commits to repository with 100% automated traceability links.</div>
              </div>
            </div>
          </div>

          <div class="dual-product-card">
            <span class="dual-head-pill" style="background: rgba(16, 185, 129, 0.1); color: #059669;">Workflow 02 &bull; IBM MaaS360</span>
            <h4 style="font-size: 16px; font-weight: 800; color: var(--text-main);">Autonomous Zero-Day Threat Interception</h4>
            <div class="flow-steps" style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
              <div class="flow-step-item">
                <span class="step-badge step-good">1</span>
                <div><strong>Telemetry Ingestion:</strong> Watson detects anomalous RPC buffer signature across gateway telemetry in real-time.</div>
              </div>
              <div class="flow-step-item">
                <span class="step-badge step-good">2</span>
                <div><strong>Fleet Scope Audit:</strong> Policy Inspector Agent queries 142k endpoints; identifies 42,180 vulnerable Windows 11 machines in 18 seconds.</div>
              </div>
              <div class="flow-step-item">
                <span class="step-badge step-good">3</span>
                <div><strong>Sandbox Patch Testing:</strong> Synthesizer generates non-reboot registry isolation payload and validates across 5 isolated VMs.</div>
              </div>
              <div class="flow-step-item">
                <span class="step-badge step-good">4</span>
                <div><strong>Supervised Canary Staging:</strong> Admin approves staged rollout (500 canary machines first &rarr; full fleet) with automated rollback sentinel.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           CHAPTER 05: MANAGING DESIGNERS: 12-PERSON TEAM RE-ORG
           ==================================================================== -->
      <section class="section-block" id="sec-team">
        <div class="story-chapter-badge">Chapter 05 &bull; Team Leadership &amp; Operational Excellence</div>
        <h2 class="section-title-h2">Managing 12 Designers: Transitioning from Siloed Pods to UX-as-a-Service</h2>
        <div class="section-prose">
          <p>
            One of my most significant executive responsibilities as Senior Manager was leading and evolving the design organization. Upon taking over the team, I found 12 talented product designers operating in completely isolated product silos:
          </p>
          <ul style="margin-left: 20px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px;">
            <li><strong>The Problem:</strong> 4 designers worked exclusively on Rhapsody, 5 on MaaS360, and 3 on Watson Core AI. Each group was inventing separate UI components for AI confidence ratings, diverging from IBM Carbon design tokens, and duplicating research. Sprint velocity was sluggish, and cross-pollination was virtually non-existent.</li>
            <li><strong>The Strategic Re-Org:</strong> I dismantled the product silos and reorganized the 12 designers into a centralized <strong>UX-as-a-Service Operating Model</strong> organized around three specialized chapters:</li>
          </ul>
        </div>

        <!-- 3 Chapters Grid -->
        <div class="three-chapter-grid">
          <div class="dual-product-card" style="border-top: 3px solid #0f62fe;">
            <span class="dual-head-pill" style="background: rgba(15, 98, 254, 0.1); color: #0f62fe;">Chapter 01 (4 Designers)</span>
            <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">Agentic IA &amp; Gating Chapter</h4>
            <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
              Led the design of shared Human-AI interaction patterns: confidence score visualization, multi-agent state machines, reasoning trace drawers, and error recovery flows.
            </p>
          </div>

          <div class="dual-product-card" style="border-top: 3px solid #10b981;">
            <span class="dual-head-pill" style="background: rgba(16, 185, 129, 0.1); color: #059669;">Chapter 02 (4 Designers)</span>
            <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">Embedded Product Pods</h4>
            <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
              Two designer pairs embedded directly into Rhapsody SE and MaaS360 sprint rituals, working side-by-side with engineering leads and product managers to execute feature roadmaps.
            </p>
          </div>

          <div class="dual-product-card" style="border-top: 3px solid #c4892a;">
            <span class="dual-head-pill" style="background: rgba(196, 137, 42, 0.1); color: #c4892a;">Chapter 03 (4 Designers)</span>
            <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">DesignOps &amp; Token Pipeline</h4>
            <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
              Engineered automated Figma-to-Code token pipelines using IBM Carbon Design System, integrating CI/CD linting, and enforcing WCAG 2.1 AA accessibility across all codebases.
            </p>
          </div>
        </div>

        <!-- DesignOps Governance Flywheel Infographic -->
        <div class="designops-pipeline-stage" style="margin-top: 24px;">
          <div class="designops-pipeline-header">
            <span class="designops-tag">DESIGNOPS GOVERNANCE FLYWHEEL</span>
            <h4>12-Designer UX-as-a-Service Token Architecture: Figma Variables &rarr; CI/CD &rarr; Rhapsody &amp; MaaS360 Repos</h4>
          </div>
          <div class="designops-nodes-grid">
            <div class="d-node">
              <div class="d-node-icon">🎨</div>
              <h5>1. Figma Token Studio</h5>
              <p>Carbon semantic color, typography, and AI confidence tokens</p>
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
              <p>Automated PRs opened across Rhapsody SE &amp; MaaS360 squads</p>
              <span class="d-node-tech">Carbon React / Angular</span>
            </div>
            <div class="d-node">
              <div class="d-node-icon">🛡️</div>
              <h5>5. Automated QA</h5>
              <p>Visual regression testing with Playwright &amp; axe WCAG 2.1 AA</p>
              <span class="d-node-tech">Zero-Defect Gate</span>
            </div>
          </div>
        </div>

        <div class="section-prose" style="margin-top: 20px;">
          <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">Mentoring, Upskilling &amp; Design Operations Impact</h4>
          <p>
            I initiated weekly <em>"AI-UX Masterclasses"</em> where I mentored designers on prompt engineering, understanding LLM token context limits, and designing for non-deterministic system states. As a result of this restructuring:
          </p>
          <ul style="margin-left: 20px; display: flex; flex-direction: column; gap: 6px;">
            <li><strong>3.4x Increase in AI Feature Sprint Velocity:</strong> By sharing component patterns, feature delivery cycle time dropped from 6 weeks to 1.8 weeks.</li>
            <li><strong>100% Team Retention:</strong> Zero attrition across the 12 designers over my 16-month tenure, with 3 designers promoted to senior and lead roles.</li>
            <li><strong>Zero Redundant UI Components:</strong> Consolidated 6 disparate AI feedback widgets into 1 unified Carbon AI component package.</li>
          </ul>
        </div>
      </section>

      <!-- ====================================================================
           CHAPTER 06: 3-ROUND USABILITY TESTING TRAJECTORY
           ==================================================================== -->
      <section class="section-block" id="sec-testing">
        <div class="story-chapter-badge">Chapter 06 &bull; Quantitative Usability &amp; Validation Trajectory</div>
        <h2 class="section-title-h2">Longitudinal Usability Testing: Measuring the Shift from Alienation to Trust</h2>
        <div class="section-prose">
          <p>
            We did not rely on anecdotal feedback. To prove to IBM executives and enterprise customers that our Human-in-the-Loop governance delivered measurable cognitive improvements, we conducted three rigorous usability testing rounds with <strong>32 enterprise practitioners (16 systems engineers, 16 IT security admins)</strong>:
          </p>
        </div>

        <!-- SUS Timeline Card -->
        <div class="sus-timeline-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">
            <span style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: #ffffff;">System Usability Scale (SUS) Score Trajectory Across 3 Iterative Testing Rounds</span>
            <span style="font-family: var(--font-code); font-size: 11px; color: #34d399;">N = 32 Enterprise Practitioners</span>
          </div>

          <div class="sus-rounds-grid">
            <div class="sus-round-col">
              <span class="sus-round-tag">ROUND 01 &bull; LOW-FI WIREFRAMES</span>
              <div class="sus-score-display" style="color: #f87171;">61.4 <span style="font-size: 13px; font-weight: normal; color: #94a3b8;">/ 100</span></div>
              <p style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">
                <strong>Prototype Tested:</strong> Raw percentage confidence scores without reasoning traces.
              </p>
              <div style="font-size: 11px; color: #f87171; background: #0a0d14; padding: 8px; border-radius: 4px; margin-top: auto;">
                ❌ User Reaction: "Why is this 92%? What is the model guessing? I don't trust this to touch production."
              </div>
            </div>

            <div class="sus-round-col">
              <span class="sus-round-tag">ROUND 02 &bull; MID-FI PROTOTYPES</span>
              <div class="sus-score-display" style="color: #fbbf24;">77.8 <span style="font-size: 13px; font-weight: normal; color: #94a3b8;">/ 100</span></div>
              <p style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">
                <strong>Prototype Tested:</strong> Added expandable reasoning trace drawer showing agent steps.
              </p>
              <div style="font-size: 11px; color: #fbbf24; background: #0a0d14; padding: 8px; border-radius: 4px; margin-top: auto;">
                ⚠️ User Reaction: "Reasoning helps, but I still have to mentally compare my old code. Give me a visual diff."
              </div>
            </div>

            <div class="sus-round-col r3">
              <span class="sus-round-tag" style="color: #34d399;">ROUND 03 &bull; HIGH-FI PRODUCTION SANDBOX</span>
              <div class="sus-score-display" style="color: #34d399;">89.4 <span style="font-size: 13px; font-weight: normal; color: #34d399;">/ 100</span></div>
              <p style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">
                <strong>Prototype Tested:</strong> 3-Tier Gating + Interactive Side-by-Side Model Diff Drawer + 1-Click Commit.
              </p>
              <div style="font-size: 11px; color: #34d399; background: #0a0d14; padding: 8px; border-radius: 4px; margin-top: auto;">
                ✅ User Reaction: "This is exactly what I need. I can see what changed in 5 seconds and sign off with complete confidence."
              </div>
            </div>
          </div>
        </div>

        <div class="metrics-hero-row" style="margin-top: 20px;">
          <div class="metric-hero-card">
            <div class="m-hero-val">97%</div>
            <div class="m-hero-lbl">Task Completion Success Rate</div>
          </div>
          <div class="metric-hero-card">
            <div class="m-hero-val">0%</div>
            <div class="m-hero-lbl">Critical Cognitive Error Rate</div>
          </div>
          <div class="metric-hero-card">
            <div class="m-hero-val">89.4</div>
            <div class="m-hero-lbl">Final Industry Benchmark SUS Score</div>
          </div>
          <div class="metric-hero-card">
            <div class="m-hero-val">100%</div>
            <div class="m-hero-lbl">Executive &amp; Compliance Sign-Off</div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           CHAPTER 07: SHIPPED PRODUCTION DELIVERABLES & INTERACTIVE SANDBOX
           ==================================================================== -->
      <section class="section-block" id="sec-evidence">
        <div class="story-chapter-badge">Chapter 07 &bull; Shipped Product Visual Evidence</div>
        <h2 class="section-title-h2">Shipped Production Screens &amp; Senior Manager Operational Deliverables</h2>
        <div class="section-prose">
          <p>
            Below are authentic, high-resolution production screens and operational deliverables created at IBM India Software Labs for IBM Rhapsody SE, IBM MaaS360, and our 12-designer team re-organization:
          </p>
        </div>

        <!-- Authentic Production Artifacts Showcase Container -->
        <div class="behance-artifacts-showcase" aria-label="Authentic Production Evidence">
          <div class="behance-showcase-header">
            <div class="behance-showcase-title-row">
              <span class="behance-verified-badge">🛡️ PRODUCTION SHIPPED DELIVERABLES &amp; ARTIFACTS</span>
              <h3 class="behance-showcase-title">Transformed Final Products &amp; Senior Manager Operational Deliverables</h3>
            </div>
            <p class="behance-showcase-desc">
              Direct, unaltered production screens, information architecture maps, and operational frameworks created at IBM India Software Labs for IBM Rhapsody SE, IBM MaaS360, and our 12-designer UX-as-a-Service team.
            </p>
          </div>
          <div class="behance-gallery-grid">
            <!-- Card 1: Rhapsody SE -->
            <div class="behance-artifact-card">
              <div class="behance-card-img-wrap">
                <img src="screenshots/ibm_rhapsody_ai_modeling.png" alt="IBM Rhapsody SE AI Systems Modeling Assistant" class="behance-card-img" loading="lazy">
                <span class="behance-img-tag">RHAPSODY SE PRODUCTION UI</span>
              </div>
              <div class="behance-card-info">
                <h4 class="behance-card-title">IBM Engineering Systems Design Rhapsody SE &bull; Watson Copilot</h4>
                <p class="behance-card-desc">
                  High-density SysML modeling IDE showing model explorer, generated avionics statechart, Watson Copilot chat with DO-178C agent steps, and the live Side-by-Side Model Diff Drawer.
                </p>
              </div>
            </div>

            <!-- Card 2: MaaS360 -->
            <div class="behance-artifact-card">
              <div class="behance-card-img-wrap">
                <img src="screenshots/ibm_maas360_ai_endpoint.png" alt="IBM MaaS360 Proactive Endpoint Security Cockpit" class="behance-card-img" loading="lazy">
                <span class="behance-img-tag">MAAS360 ENTERPRISE CONSOLE</span>
              </div>
              <div class="behance-card-info">
                <h4 class="behance-card-title">IBM MaaS360 Enterprise &bull; Proactive Endpoint Security Cockpit</h4>
                <p class="behance-card-desc">
                  Enterprise fleet management console monitoring 142k endpoints, displaying intercepted zero-day CVE-2024-8192, multi-agent remediation pipeline, and the Supervised Diff Approval drawer.
                </p>
              </div>
            </div>

            <!-- Card 3: Research & Team Re-Org Matrix -->
            <div class="behance-artifact-card">
              <div class="behance-card-img-wrap">
                <img src="screenshots/ibm_research_leadership_matrix.png" alt="UX-as-a-Service 12-Designer Re-Org & Usability Trajectory" class="behance-card-img" loading="lazy">
                <span class="behance-img-tag">OPERATIONAL LEADERSHIP ARTIFACT</span>
              </div>
              <div class="behance-card-info">
                <h4 class="behance-card-title">12-Designer UX-as-a-Service Re-Org &amp; Usability Benchmark Matrix</h4>
                <p class="behance-card-desc">
                  Operational framework comparing siloed vs centralized service model, sprint velocity multipliers, and longitudinal SUS score progression from 61.4 to 89.4.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- High-Resolution Annotated Product Screenshot Showcase -->
        <div class="annotated-screenshot-stage" style="margin-top: 32px;">
          <div class="annotated-header">
            <div class="window-dots">
              <span class="window-dot dot-red"></span>
              <span class="window-dot dot-yellow"></span>
              <span class="window-dot dot-green"></span>
            </div>
            <div class="annotated-url">https://watson.ibm.com/rhapsody/avionics-systems-studio</div>
            <span class="annotated-live-tag">● PRODUCTION SHIPPED INTERFACE</span>
          </div>
          <div class="screenshot-display-container">
            <img src="screenshots/transformation-ibm-watson.png" alt="IBM Rhapsody SE AI Systems Modeling Assistant" class="annotated-full-img">
          </div>
          <div class="screenshot-callout-ribbon">
            <div class="ribbon-title">UI/UX Design Manager Architectural Highlights:</div>
            <div class="callout-chips-grid">
              <div class="callout-chip-item">
                <div class="chip-num">01</div>
                <div class="chip-body">
                  <strong>SysML v2.0 Statechart Canvas</strong>
                  <p>Visual model explorer and state machine with DO-178C requirement traceability tags.</p>
                </div>
              </div>
              <div class="callout-chip-item">
                <div class="chip-num">02</div>
                <div class="chip-body">
                  <strong>Side-by-Side Model Diff Drawer</strong>
                  <p>Supervised token diff highlighting exact state transitions and parameters before commit.</p>
                </div>
              </div>
              <div class="callout-chip-item">
                <div class="chip-num">03</div>
                <div class="chip-body">
                  <strong>Deterministic Confidence Router</strong>
                  <p>96.8% certainty score gating auto-execution vs mandatory human sign-off.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Live Working Prototype Stage -->
        <div class="interactive-prototype-stage" style="margin-top: 36px;">
          <div class="section-header-tag" style="margin-bottom: 8px;">LIVE HANDS-ON DEMONSTRATION</div>
          <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--text-main); margin-bottom: 8px;">
            Interactive Working Prototype: Test the Governed Agent Mesh
          </h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">
            Click below to switch between <strong>IBM Rhapsody SE (SysML Modeling)</strong> and <strong>IBM MaaS360 (Endpoint Remediation)</strong>, test confidence score gating, and inspect live diffs directly in your browser.
          </p>

          <!-- Interactive Prototype Window -->
          <div class="interactive-prototype-window">
            <div class="proto-win-header">
              <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
              <div class="proto-win-url" id="watson-proto-url">https://watson.ibm.com/rhapsody/avionics-actuator-mesh</div>
              <span class="proto-win-badge">● WATSON AGENTIC MESH ACTIVE</span>
            </div>
            <div class="proto-win-body">

              <!-- Dual Mode Switcher -->
              <div class="sandbox-switcher">
                <button onclick="switchWatsonMode('rhapsody')" id="mode-btn-rhapsody" class="sandbox-tab-btn active">
                  ✈️ IBM Rhapsody SE (SysML Statechart Generation)
                </button>
                <button onclick="switchWatsonMode('maas360')" id="mode-btn-maas360" class="sandbox-tab-btn">
                  🛡️ IBM MaaS360 (Zero-Day CVE Remediation)
                </button>
              </div>

              <!-- Intent Card -->
              <div style="background: rgba(37, 99, 235, 0.1); border-left: 4px solid #3B82F6; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
                <div style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #60A5FA; text-transform: uppercase;" id="watson-intent-tag">
                  Natural Language Systems Engineering Intent
                </div>
                <div style="font-size: 14px; font-weight: 600; color: #FFFFFF; margin-top: 4px;" id="watson-intent-text">
                  “Synthesize a fault-tolerant SysML statechart for the primary flight actuator conforming to DO-178C Level A requirements. Ensure graceful degradation to secondary hydraulic bus on sensor loss.”
                </div>
              </div>

              <!-- Multi-Agent Node Graph -->
              <div class="proto-agent-cards-row">
                <div class="agent-node-card">
                  <div class="agent-node-header">
                    <span class="agent-pulse-dot dot-active"></span>
                    <span class="agent-name" id="agent-1-name">1. Requirement Parser</span>
                  </div>
                  <div class="agent-status-badge badge-success" id="agent-1-badge">100% Bound</div>
                  <p class="agent-detail-text" id="agent-1-desc">Extracted DO-178C safety constraints; verified 0 orphan port requirements.</p>
                </div>

                <div class="agent-node-card">
                  <div class="agent-node-header">
                    <span class="agent-pulse-dot dot-active"></span>
                    <span class="agent-name" id="agent-2-name">2. SysML Synthesizer</span>
                  </div>
                  <div class="agent-status-badge badge-success" id="agent-2-badge">Synthesized</div>
                  <p class="agent-detail-text" id="agent-2-desc">Generated 3 structural blocks &amp; 4 deterministic transition states.</p>
                </div>

                <div class="agent-node-card">
                  <div class="agent-node-header">
                    <span class="agent-pulse-dot dot-pending"></span>
                    <span class="agent-name" id="agent-3-name">3. Human Sign-Off Gate</span>
                  </div>
                  <div class="agent-status-badge badge-pending" id="agent-3-badge">Gated for Review</div>
                  <p class="agent-detail-text" id="agent-3-desc">Supervised diff drawer opened; awaiting systems engineer sign-off.</p>
                </div>
              </div>

              <!-- Confidence Score Gating Control -->
              <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                  <div>
                    <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8; text-transform: uppercase;">Confidence Gating Threshold:</span>
                    <strong id="watson-conf-label" style="font-family: var(--font-heading); font-size: 15px; color: #60A5FA; margin-left: 8px;">96.8% AI Confidence [Tier 1: High Certainty Match]</strong>
                  </div>
                  <div class="conf-tier-btns">
                    <button onclick="setWatsonConfidence('high')" id="wconf-high" class="btn-tier active">Tier 1: High (96.8%)</button>
                    <button onclick="setWatsonConfidence('med')" id="wconf-med" class="btn-tier">Tier 2: Supervised (88.4%)</button>
                    <button onclick="setWatsonConfidence('low')" id="wconf-low" class="btn-tier">Tier 3: Low (74.0%)</button>
                  </div>
                </div>
                <p id="watson-conf-desc" style="font-size: 12px; color: #CBD5E1; margin: 0; line-height: 1.45;">
                  Tier 1 Routing: Deterministic DO-178C Level A match. Ready for instant commit with cryptographic reasoning trace.
                </p>
              </div>

              <!-- Side-by-Side Diff Drawer -->
              <div id="watson-diff-drawer" style="background: #090D14; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 16px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span id="watson-diff-title" style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #38BDF8;">
                    PROPOSED MODEL MUTATION DIFF: LEGACY SYSML vs WATSON AI DRAFT
                  </span>
                  <span id="watson-diff-token" style="font-family: var(--font-code); font-size: 10px; color: #94A3B8;">
                    DO-178C Traceability Token: #REQ-AV-8924-SHA256
                  </span>
                </div>
                <div class="table-responsive-wrapper">
                  <table class="proto-grid-table" id="watson-diff-table">
                    <thead>
                      <tr>
                        <th>SysML Element</th>
                        <th>Baseline Model State</th>
                        <th>Watson AI Synthesized Delta</th>
                        <th>Safety Validation</th>
                      </tr>
                    </thead>
                    <tbody id="watson-diff-tbody">
                      <tr>
                        <td class="cell-code">PrimaryFlightActuator</td>
                        <td style="color: #F87171;">Single channel (halts on fault)</td>
                        <td style="color: #34D399; font-weight: 700;">+ Dual-redundant failover state</td>
                        <td><span class="margin-pill margin-pass">DO-178C PASS</span></td>
                      </tr>
                      <tr>
                        <td class="cell-code">State: AutoDegrade</td>
                        <td>None (Hard freeze)</td>
                        <td style="color: #34D399; font-weight: 700;">+ Graceful switch to secondary servo</td>
                        <td><span class="margin-pill margin-pass">VERIFIED</span></td>
                      </tr>
                      <tr>
                        <td class="cell-code">Traceability Binding</td>
                        <td>Unlinked (Manual check)</td>
                        <td style="color: #34D399; font-weight: 700;">+ 100% bound to REQ-AV-8924</td>
                        <td><span class="margin-pill margin-pass">VERIFIED</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Decision Controls -->
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <span id="watson-governance-note" style="font-size: 12px; color: #94A3B8;">
                  🔒 Cryptographic audit trail generated automatically upon human authorization.
                </span>
                <div style="display: flex; gap: 10px;">
                  <button onclick="rejectWatsonLedger()" class="proto-reject-btn">❌ Discard Delta / Manual Steering</button>
                  <button onclick="commitWatsonLedger()" class="proto-action-btn" id="watson-commit-btn">
                    ✅ Approve &amp; Commit to Model Repository
                  </button>
                </div>
              </div>

              <div id="watson-toast" class="proto-toast" style="display: none;">
                🚀 SysML Statechart committed to FlightControl_DO178C repository with full cryptographic audit trail!
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           CHAPTER 08: ENTERPRISE ROI & SENIOR MANAGER CAR DEFENSE
           ==================================================================== -->
      <section class="section-block" id="sec-roi">
        <div class="story-chapter-badge">Chapter 08 &bull; Business Impact &amp; Executive Leadership Defense</div>
        <h2 class="section-title-h2">Hard Enterprise ROI &amp; Senior Manager Leadership CAR Defense</h2>
        <div class="section-prose">
          <p>
            The transformation of IBM Watson into an auditable, Human-in-the-Loop agentic platform delivered profound, measurable returns for IBM and its enterprise customers across aerospace, defense, and cybersecurity:
          </p>
        </div>

        <div class="metrics-hero-row" style="margin: 20px 0;">
          <div class="metric-hero-card">
            <div class="m-hero-val">74%</div>
            <div class="m-hero-lbl">Faster Modeling Cycle Time in Rhapsody SE (14.2h &rarr; 3.6h)</div>
          </div>
          <div class="metric-hero-card">
            <div class="m-hero-val">82%</div>
            <div class="m-hero-lbl">Faster Zero-Day Triage &amp; Remediation in MaaS360 (4.1h &rarr; 43m)</div>
          </div>
          <div class="metric-hero-card">
            <div class="m-hero-val">0</div>
            <div class="m-hero-lbl">SOX / DO-178C Compliance Breaches Across 140,000+ Tasks</div>
          </div>
          <div class="metric-hero-card">
            <div class="m-hero-val">100%</div>
            <div class="m-hero-lbl">Design Team Retention &amp; 3.4x Cross-Squad Sprint Velocity</div>
          </div>
        </div>

        <div class="section-prose" style="margin-top: 24px;">
          <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--text-main); margin-bottom: 12px;">
            Senior Manager Leadership CAR Defense (Situation, Action, Result)
          </h3>
          <p>
            Defending critical design leadership decisions in executive and hiring manager interviews:
          </p>
        </div>

        <div class="car-defense-grid" style="margin-top: 16px;">
          <!-- CAR 1: Philosophical Conflict -->
          <div class="car-item-card">
            <div class="car-q-header">
              <span class="q-badge">CAR 01</span>
              <span>How did you resolve the intense philosophical tension between Watson AI research scientists wanting full autonomy and systems engineers demanding control?</span>
            </div>
            <div class="car-three-split">
              <div class="car-col">
                <strong>Situation</strong>
                <p>Watson Core AI researchers designed fully autonomous multi-agent loops, but aerospace and defense clients flatly refused to adopt the tools, citing DO-178C regulatory liability and hallucination risks.</p>
              </div>
              <div class="car-col">
                <strong>UX Leadership Action</strong>
                <p>I stepped into the conflict and led 14 cross-functional workshops. I reframed the debate: autonomy wasn't a philosophical right of the model, but an operational privilege earned through mathematical certainty. I designed the 3-Tier Confidence Gating Matrix and the Side-by-Side Model Diff Drawer, giving risk officers deterministic control while preserving 74% speed gains for engineers.</p>
              </div>
              <div class="car-col">
                <strong>Business Result</strong>
                <p>Customer objections dropped by 100%, unlocking enterprise customer renewals across Fortune 500 aerospace clients and eliminating regulatory deployment blocks.</p>
              </div>
            </div>
          </div>

          <!-- CAR 2: Team Re-Org -->
          <div class="car-item-card">
            <div class="car-q-header">
              <span class="q-badge">CAR 02</span>
              <span>How did you restructure 12 designers from isolated product silos into a centralized UX-as-a-Service organization?</span>
            </div>
            <div class="car-three-split">
              <div class="car-col">
                <strong>Situation</strong>
                <p>12 designers were isolated in product silos (Rhapsody, MaaS360, Watson Core). Each team was reinventing divergent AI patterns and conflicting Carbon tokens, resulting in sluggish sprint velocity and designer burnout.</p>
              </div>
              <div class="car-col">
                <strong>UX Leadership Action</strong>
                <p>I restructured the team into a centralized UX-as-a-Service model with 3 specialized chapters (Agentic IA, Embedded Product Pods, DesignOps Token Pipeline). I established weekly AI-UX Masterclasses upskilling designers in prompt engineering, agent state machines, and Human-AI design principles.</p>
              </div>
              <div class="car-col">
                <strong>Business Result</strong>
                <p>Accelerated sprint velocity by 3.4x, eliminated 100% of redundant AI components, and achieved 100% team retention over 16 months with 3 internal promotions.</p>
              </div>
            </div>
          </div>

          <!-- CAR 3: Quantifying UX Value -->
          <div class="car-item-card">
            <div class="car-q-header">
              <span class="q-badge">CAR 03</span>
              <span>What specific quantitative metrics did you use to prove to IBM Vice Presidents that design leadership directly drove product adoption?</span>
            </div>
            <div class="car-three-split">
              <div class="car-col">
                <strong>Situation</strong>
                <p>Executive leadership questioned whether investing in custom side-by-side diff drawers and explainability architecture was worth postponing a quick-and-dirty chatbot launch.</p>
              </div>
              <div class="car-col">
                <strong>UX Leadership Action</strong>
                <p>I established a longitudinal usability benchmarking program tracking System Usability Scale (SUS), task completion time, and cognitive error rates across 32 enterprise practitioners over 3 iterative evaluation rounds.</p>
              </div>
              <div class="car-col">
                <strong>Business Result</strong>
                <p>Demonstrated SUS progression from 61.4 (poor) to 89.4 (industry benchmark), reduced modeling time from 14.2h to 3.6h (-74%), and proved zero compliance violations across 140k+ operations, securing full VP executive sign-off.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Case Pagination Footer -->
      <footer class="case-pagination-bar">
        <a href="/work" class="btn-all-work">&larr; Back to All Selected Work</a>
        <a href="/case-ericsson" class="btn-next-case">
          Next Transformation: Ericsson Financial Data Grids &rarr;
        </a>
      </footer>

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
          <a href="/archive" style="color: #60A5FA; text-decoration: none; font-size: 13px; font-weight: 700; font-family: var(--font-code);">
            🖼️ Explore Complete Visual Archive (7 Projects, 27 Artifacts) &rarr;
          </a>
        </div>
      </div>
      <div class="footer-links-grid">
        <div class="footer-col">
          <span class="footer-col-title">Navigation</span>
          <a href="/" class="footer-link">Home</a>
          <a href="/work" class="footer-link">Selected Work</a>
          <a href="/archive" class="footer-link">Visual Archive</a>
          <a href="/leadership" class="footer-link">Leadership Deck</a>
          <a href="/cv" class="footer-link">My Resume</a>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">UI/UX Specializations</span>
          <a href="/case-ibm-watson" class="footer-link active">IBM Watson Agentic AI</a>
          <a href="/case-ericsson" class="footer-link">Ericsson Financial Grids</a>
          <a href="/case-zebra" class="footer-link">Zebra Industrial IoT</a>
          <a href="/case-ibm-carbon" class="footer-link">IBM Carbon Tokens</a>
          <a href="/case-zf-wabco" class="footer-link">ZF Wabco Cockpit HUD</a>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Verified Proof</span>
          <a href="/archive" class="footer-link">Visual Archive</a>
          <a href="https://linkedin.com/in/balaajee-vr" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn Profile</a>
          <a href="mailto:vrbberaj@gmail.com" class="footer-link">Direct Email</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom-bar">
      <span>&copy; 2026 Balaajee V.R. &bull; Enterprise UI/UX Design Manager Portfolio Suite &bull; Zero Overflow Across All Viewports</span>
    </div>
  </footer>

  <!-- Interactive Sandbox JavaScript -->
  <script>
    let currentWatsonMode = 'rhapsody';
    let currentConfidenceTier = 'high';

    const rhapsodyData = {
      url: 'https://watson.ibm.com/rhapsody/avionics-actuator-mesh',
      intentTag: 'Natural Language Systems Engineering Intent',
      intentText: '“Synthesize a fault-tolerant SysML statechart for the primary flight actuator conforming to DO-178C Level A requirements. Ensure graceful degradation to secondary hydraulic bus on sensor loss.”',
      agent1Name: '1. Requirement Parser',
      agent1Badge: '100% Bound',
      agent1Desc: 'Extracted DO-178C safety constraints; verified 0 orphan port requirements.',
      agent2Name: '2. SysML Synthesizer',
      agent2Badge: 'Synthesized',
      agent2Desc: 'Generated 3 structural blocks & 4 deterministic transition states.',
      agent3Name: '3. Human Sign-Off Gate',
      agent3Badge: 'Gated for Review',
      agent3Desc: 'Supervised diff drawer opened; awaiting systems engineer sign-off.',
      diffTitle: 'PROPOSED MODEL MUTATION DIFF: LEGACY SYSML vs WATSON AI DRAFT',
      diffToken: 'DO-178C Traceability Token: #REQ-AV-8924-SHA256',
      rows: [
        { elem: 'PrimaryFlightActuator', baseline: 'Single channel (halts on fault)', delta: '+ Dual-redundant failover state', status: 'DO-178C PASS' },
        { elem: 'State: AutoDegrade', baseline: 'None (Hard freeze)', delta: '+ Graceful switch to secondary servo', status: 'VERIFIED' },
        { elem: 'Traceability Binding', baseline: 'Unlinked (Manual check)', delta: '+ 100% bound to REQ-AV-8924', status: 'VERIFIED' }
      ],
      commitBtn: '✅ Approve &amp; Commit to Model Repository',
      toast: '🚀 SysML Statechart committed to FlightControl_DO178C repository with full cryptographic audit trail!'
    };

    const maas360Data = {
      url: 'https://maas360.ibm.com/security/zero-day-remediation',
      intentTag: 'Autonomous Cybersecurity Remediation Intent',
      intentText: '“Intercept zero-day RPC kernel buffer exploit CVE-2024-8192 across corporate Windows fleet. Generate non-reboot registry patch and execute phased canary staging.”',
      agent1Name: '1. Policy Inspector',
      agent1Badge: '42,180 Found',
      agent1Desc: 'Scanned 142k endpoints in 18s; flagged vulnerable DLL version across Windows 11 fleet.',
      agent2Name: '2. CVE Synthesizer',
      agent2Badge: 'Tested in VM',
      agent2Desc: 'Generated registry isolation payload; verified zero crashes in sandbox environment.',
      agent3Name: '3. Canary Controller',
      agent3Badge: 'Awaiting Sign-Off',
      agent3Desc: 'Phased rollout staged: 500 canary machines first with instant rollback sentinel.',
      diffTitle: 'PROPOSED REGISTRY MUTATION DIFF: LIVE FLEET vs WATSON PATCH',
      diffToken: 'FedRAMP Audit Token: #CVE-2024-8192-CANARY',
      rows: [
        { elem: 'HKLM\\\\System\\\\RpcEndpoint', baseline: 'AllowUnauthenticated (Vulnerable)', delta: '+ ForceKerberosSignature (Protected)', status: 'CVSS 9.8 MITIGATED' },
        { elem: 'SentinelWatcher Daemon', baseline: 'Disabled', delta: '+ Active (Failover: Instant Revert)', status: 'VERIFIED' },
        { elem: 'Fleet Target Blast Radius', baseline: 'All 142,000 devices', delta: '+ Tier 1: 500 Canary laptops first', status: 'SAFE STAGING' }
      ],
      commitBtn: '🛡️ Authorize Phased Canary Deployment (500 Devices)',
      toast: '🛡️ Watson Zero-Day Patch deployed to 500 Canary Devices; Sentinel rollback watcher active!'
    };

    function switchWatsonMode(mode) {
      currentWatsonMode = mode;
      document.getElementById('mode-btn-rhapsody').classList.toggle('active', mode === 'rhapsody');
      document.getElementById('mode-btn-maas360').classList.toggle('active', mode === 'maas360');

      const data = mode === 'rhapsody' ? rhapsodyData : maas360Data;
      document.getElementById('watson-proto-url').innerText = data.url;
      document.getElementById('watson-intent-tag').innerText = data.intentTag;
      document.getElementById('watson-intent-text').innerText = data.intentText;
      document.getElementById('agent-1-name').innerText = data.agent1Name;
      document.getElementById('agent-1-badge').innerText = data.agent1Badge;
      document.getElementById('agent-1-desc').innerText = data.agent1Desc;
      document.getElementById('agent-2-name').innerText = data.agent2Name;
      document.getElementById('agent-2-badge').innerText = data.agent2Badge;
      document.getElementById('agent-2-desc').innerText = data.agent2Desc;
      document.getElementById('agent-3-name').innerText = data.agent3Name;
      document.getElementById('agent-3-badge').innerText = data.agent3Badge;
      document.getElementById('agent-3-desc').innerText = data.agent3Desc;
      document.getElementById('watson-diff-title').innerText = data.diffTitle;
      document.getElementById('watson-diff-token').innerText = data.diffToken;
      document.getElementById('watson-commit-btn').innerHTML = data.commitBtn;

      let tbodyHtml = '';
      data.rows.forEach(r => {
        tbodyHtml += \`
          <tr>
            <td class="cell-code">\${r.elem}</td>
            <td style="color: #F87171;">\${r.baseline}</td>
            <td style="color: #34D399; font-weight: 700;">\${r.delta}</td>
            <td><span class="margin-pill margin-pass">\${r.status}</span></td>
          </tr>
        \`;
      });
      document.getElementById('watson-diff-tbody').innerHTML = tbodyHtml;
    }

    function setWatsonConfidence(tier) {
      currentConfidenceTier = tier;
      document.getElementById('wconf-high').classList.toggle('active', tier === 'high');
      document.getElementById('wconf-med').classList.toggle('active', tier === 'med');
      document.getElementById('wconf-low').classList.toggle('active', tier === 'low');

      const label = document.getElementById('watson-conf-label');
      const desc = document.getElementById('watson-conf-desc');
      const drawer = document.getElementById('watson-diff-drawer');

      if (tier === 'high') {
        label.innerText = '96.8% AI Confidence [Tier 1: High Certainty Match]';
        label.style.color = '#34D399';
        desc.innerText = 'Tier 1 Routing: Deterministic verification complete. Ready for instant commit with cryptographic reasoning trace.';
        drawer.style.display = 'block';
        drawer.style.borderColor = '#10B981';
      } else if (tier === 'med') {
        label.innerText = '88.4% AI Confidence [Tier 2: Supervised Diff Required]';
        label.style.color = '#FBBF24';
        desc.innerText = 'Tier 2 Routing: Side-by-side diff verification mandatory before commit. Blast radius evaluated.';
        drawer.style.display = 'block';
        drawer.style.borderColor = '#F59E0B';
      } else {
        label.innerText = '74.0% AI Confidence [Tier 3: Low Certainty / Ambiguous Intent]';
        label.style.color = '#F87171';
        desc.innerText = 'Tier 3 Routing: Autonomy suspended. Clarifying question triggered; human engineer must guide model synthesis.';
        drawer.style.display = 'none';
      }
    }

    function commitWatsonLedger() {
      const data = currentWatsonMode === 'rhapsody' ? rhapsodyData : maas360Data;
      const toast = document.getElementById('watson-toast');
      toast.innerText = data.toast;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 4000);
    }

    function rejectWatsonLedger() {
      const toast = document.getElementById('watson-toast');
      toast.innerText = '⚠️ Action discarded by operator. Reverted to baseline state.';
      toast.style.display = 'block';
      toast.style.background = '#EF4444';
      setTimeout(() => {
        toast.style.display = 'none';
        toast.style.background = '#0F62FE';
      }, 3000);
    }
  </script>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'case-ibm-watson.html'), ibmStoryHtml, 'utf8');
console.log('case-ibm-watson.html generated successfully with authentic storytelling!');
