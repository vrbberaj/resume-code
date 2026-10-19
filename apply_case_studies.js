const fs = require('fs');

const indexPath = '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Add toggleDeepDive to the JS block if not present
if (!html.includes('function toggleDeepDive')) {
  const jsInsertionPoint = 'function filterCases(category, btn) {';
  const toggleCode = `function toggleDeepDive(id, btn) {
      const panel = document.getElementById(id);
      if (!panel) return;
      const isOpen = panel.classList.contains('open');
      if (isOpen) {
        panel.classList.remove('open');
        btn.innerHTML = \`<span>📖 Explore Full Architectural Deep Dive &amp; Interview Defense</span> <span style="font-size: 11px;">▼</span>\`;
      } else {
        panel.classList.add('open');
        btn.innerHTML = \`<span>▲ Collapse Deep Dive &amp; Interview Defense</span>\`;
      }
    }

    `;
  html = html.replace(jsInsertionPoint, toggleCode + jsInsertionPoint);
}

// 2. Define the rich, infographic-driven HTML for all 5 Case Studies
const newCasesHTML = `        <!-- Case Studies List -->
        <div class="cases-grid">

          <!-- =================================================================
               CASE 1: IBM WATSON ORCHESTRATE AI
               ================================================================= -->
          <article class="case-card" data-category="ibm">
            <div class="case-header-block">
              <div>
                <div class="case-meta-top">
                  <span class="case-company-badge">IBM India Software Labs</span>
                  <span class="case-role-text">Senior Manager UI/UX Design &bull; Sep 2024 – Jan 2026</span>
                </div>
                <h3 class="case-title">IBM Watson Orchestrate: Multi-Agent AI Task Automation &amp; Agentic UX</h3>
                <p class="case-headline-lead">Designing autonomous multi-agent task execution while preserving Human-in-the-Loop governance for regulated Fortune 500 enterprises.</p>
              </div>
            </div>

            <!-- VISUAL INFOGRAPHIC CANVAS: MULTI-AGENT ARCHITECTURE & CONFIDENCE GATE -->
            <div class="infographic-canvas">
              <div class="infographic-canvas-header">
                <div class="canvas-title-group">
                  <span class="canvas-chip chip-modern">Visual Infographic Spec</span>
                  <span style="font-size: 13.5px; font-weight: 700; color: var(--text-main);">Multi-Agent Orchestration &amp; Confidence Gate Architecture</span>
                </div>
                <span class="canvas-subtitle">System Topology: Enterprise Production Mesh</span>
              </div>

              <!-- 3-Column Visual Flow Architecture -->
              <div class="infographic-comparison-grid" style="grid-template-columns: 1.1fr 48px 1.4fr;">
                
                <!-- Col 1: Natural Language Intent Prompt -->
                <div class="pipeline-node-card" style="border-left: 3px solid var(--accent-blue); background: var(--bg-surface);">
                  <span class="node-step-tag">01. Natural Language Intent</span>
                  <div class="node-title">Goal Intake &amp; Decomposition</div>
                  <div style="background: var(--bg-subtle); padding: 8px 10px; border-radius: 4px; font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); border: 1px dashed var(--border-medium); margin-top: 4px;">
                    &ldquo;Reconcile Q3 vendor invoices across SAP, verify credit limit in Salesforce, and prepare executive payment voucher.&rdquo;
                  </div>
                  <div class="node-status-pill pill-blue">Master Orchestrator Active</div>
                </div>

                <!-- Center Connector -->
                <div class="transform-arrow-column">
                  <div class="transform-icon-circle" style="width: 36px; height: 36px; font-size: 14px;">⚡</div>
                  <span class="transform-label" style="font-size: 8px;">Sub-Agents</span>
                </div>

                <!-- Col 2: 3 Sub-Agents + Confidence Gate -->
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <!-- Sub Agents Mesh -->
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
                    <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 6px 8px; font-size: 9.5px; text-align: center;">
                      <div style="font-weight: 700; color: var(--accent-blue);">SAP Agent</div>
                      <div style="color: var(--text-muted); font-size: 8.5px;">PO Item Fetch</div>
                    </div>
                    <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 6px 8px; font-size: 9.5px; text-align: center;">
                      <div style="font-weight: 700; color: var(--accent-gold);">CRM Agent</div>
                      <div style="color: var(--text-muted); font-size: 8.5px;">Credit Check</div>
                    </div>
                    <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 6px 8px; font-size: 9.5px; text-align: center;">
                      <div style="font-weight: 700; color: var(--accent-green);">Audit Agent</div>
                      <div style="color: var(--text-muted); font-size: 8.5px;">SOX Verify</div>
                    </div>
                  </div>

                  <!-- Confidence Gate Indicator -->
                  <div style="background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: 4px; padding: 8px 10px; display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: 700;">
                      <span style="color: var(--text-main);">Human-in-the-Loop Confidence Threshold Gate</span>
                      <span style="color: var(--accent-green);">Confidence: 94.2% [PASS]</span>
                    </div>
                    <div style="height: 6px; background: var(--bg-subtle); border-radius: 3px; overflow: hidden; display: flex;">
                      <div style="width: 25%; background: var(--accent-red);" title="<70% Manual Diff"></div>
                      <div style="width: 25%; background: var(--accent-gold);" title="70-89% Human Review"></div>
                      <div style="width: 50%; background: var(--accent-green);" title="≥90% Auto Execution"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 8px; color: var(--text-muted);">
                      <span>&lt;70% Side-by-Side Diff</span>
                      <span>70&ndash;89% 1-Click Confirm</span>
                      <span>&ge;90% Autonomous Action</span>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Bottom Bar: Rollback Timeline -->
              <div class="margin-indicator-bar" style="font-family: var(--font-mono); font-size: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--accent-green);">● LIVE LEDGER:</span>
                  <span style="color: var(--text-body);">Every API mutation committed to immutable audit log with 1-click snapshot rollback.</span>
                </div>
                <span class="node-status-pill pill-green">Audit Compliant</span>
              </div>
            </div>

            <!-- 3 KPI Metric Badges -->
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

            <!-- Expandable Full Deep Dive & Interview Defense -->
            <div class="deep-dive-accordion">
              <button class="deep-dive-btn" onclick="toggleDeepDive('dive-ibm-watson', this)">
                <span>📖 Explore Full Architectural Deep Dive &amp; Interview Defense</span>
                <span style="font-size: 11px;">▼</span>
              </button>

              <div id="dive-ibm-watson" class="deep-dive-panel">
                <div class="dive-section">
                  <h4>1. Executive Framing &amp; The Business Problem</h4>
                  <p>Enterprise knowledge workers in Fortune 500 finance, procurement, and HR operations spend an average of 3.8 hours every day manually copying data and context between fragmented enterprise tools (SAP ERP, Salesforce CRM, Jira, and Workday). While generative AI promised autonomous automation, early prototypes suffered from a fatal flaw: black-box execution without explainability or audit trails, triggering immediate rejection by corporate legal and compliance teams.</p>
                </div>

                <div class="dive-section">
                  <h4>2. The UX Architectural Breakthrough: Dual-Confidence Gating</h4>
                  <p>As Senior Design Manager, I directed the design of the <strong>Human-in-the-Loop (HITL) Confidence Gate</strong>. Rather than treating autonomy as binary (all automated vs. all manual), we designed a dynamic 3-zone visual execution model:</p>
                  <p>&bull; <strong>Zone 1 (&ge;90% Confidence):</strong> Autonomous background execution with ambient notification receipts.</p>
                  <p>&bull; <strong>Zone 2 (70&ndash;89% Confidence):</strong> One-click interactive review card highlighting verified versus deduced fields before executing irreversible write operations.</p>
                  <p>&bull; <strong>Zone 3 (&lt;70% Confidence):</strong> Side-by-side reconciliation interface with highlighted diffs and one-click manual override.</p>
                </div>

                <div class="dive-section">
                  <h4>3. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
                  <div class="dive-interview-grid">
                    <div class="interview-qa-item">
                      <div class="qa-question"><span class="qa-q-num">Q1</span> How do you design for autonomous multi-agent AI without users feeling a dangerous loss of control?</div>
                      <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Autonomous agentic UX must balance machine speed with human psychological safety. In IBM Watson Orchestrate, we established a strict Human-in-the-Loop Confidence Threshold architecture. High-confidence actions executed silently in the background, but any mutation involving financial transactions or cross-system write operations below our 90% threshold triggered an explicit visual diff. Furthermore, we designed an immutable execution ledger where users could review the sub-agent dependency chain and perform a 1-click state rollback at any point. This gave enterprise risk officers the confidence to greenlight enterprise rollouts.&rdquo;</div>
                    </div>
                    <div class="interview-qa-item">
                      <div class="qa-question"><span class="qa-q-num">Q2</span> What was the hardest cross-functional engineering conflict you resolved?</div>
                      <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Engineering initially pushed for 100% asynchronous background API execution to maximize throughput and reduce frontend latency metrics. I pushed back and defended a synchronous visual state transition for actions requiring human confirmation. Using user testing with enterprise operations leads, I demonstrated that an unexpected background data mutation caused a 400% increase in user panic and support tickets. We aligned on a dual-speed architecture: silent execution for read-only queries, and explicit interactive review gates for write actions.&rdquo;</div>
                    </div>
                    <div class="interview-qa-item">
                      <div class="qa-question"><span class="qa-q-num">Q3</span> How did you quantify the business ROI of this UX initiative?</div>
                      <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;We tracked two core north-star metrics: Task Cycle Time and User Trust Deficit (measured by rollback frequency). We achieved a 62% reduction in end-to-end task completion time, while maintaining a sub-0.5% rollback rate across 10,000+ pilot agent executions. The framework became the design benchmark presented at IBM Think for generative AI enterprise orchestration.&rdquo;</div>
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


          <!-- =================================================================
               CASE 2: IBM CARBON TOKEN ENGINE
               ================================================================= -->
          <article class="case-card" data-category="ibm">
            <div class="case-header-block">
              <div>
                <div class="case-meta-top">
                  <span class="case-company-badge">IBM India Software Labs</span>
                  <span class="case-role-text">DesignOps &amp; Governance Lead &bull; 2024–2026</span>
                </div>
                <h3 class="case-title">IBM Carbon Token Engine: Cross-Squad DesignOps &amp; UI System Governance</h3>
                <p class="case-headline-lead">Eliminating multi-million dollar design debt by synchronizing single-source-of-truth Figma tokens with React production pipelines across 14 distributed squads.</p>
              </div>
            </div>

            <!-- VISUAL INFOGRAPHIC CANVAS: FIGMA-TO-CODE CI/CD PIPELINE -->
            <div class="infographic-canvas">
              <div class="infographic-canvas-header">
                <div class="canvas-title-group">
                  <span class="canvas-chip chip-modern">DesignOps Blueprint</span>
                  <span style="font-size: 13.5px; font-weight: 700; color: var(--text-main);">Automated Figma-to-Code Multi-Brand Token Engine</span>
                </div>
                <span class="canvas-subtitle">Governance: 14 Front-End Engineering Squads</span>
              </div>

              <!-- 4-Tier Pipeline Row -->
              <div class="pipeline-nodes-row">
                <div class="pipeline-node-card">
                  <span class="node-step-tag">Tier 1: Primitives</span>
                  <div class="node-title">Figma Global Variables</div>
                  <div class="node-desc">Colors, 8pt Spacing Grid, Typography scales, and Border Radii.</div>
                  <div class="node-status-pill pill-blue">Design System Team</div>
                </div>

                <div class="pipeline-node-card">
                  <span class="node-step-tag">Tier 2: Semantics</span>
                  <div class="node-title">Style-Dictionary Layer</div>
                  <div class="node-desc">Abstracts semantic light/dark surfaces, contrast rules, and brand palettes.</div>
                  <div class="node-status-pill pill-amber">Automated Transform</div>
                </div>

                <div class="pipeline-node-card">
                  <span class="node-step-tag">Tier 3: CI/CD Engine</span>
                  <div class="node-title">GitHub Actions Auto-PR</div>
                  <div class="node-desc">Auto-generates pull requests into squad repos with Percy visual regression.</div>
                  <div class="node-status-pill pill-green">Zero Manual Code</div>
                </div>

                <div class="pipeline-node-card">
                  <span class="node-step-tag">Tier 4: Production</span>
                  <div class="node-title">14 Squad Repositories</div>
                  <div class="node-desc">React &amp; Web Components consume versioned npm design token artifacts.</div>
                  <div class="node-status-pill pill-green">+28% Sprint Velocity</div>
                </div>
              </div>

              <!-- Governance Flywheel Bar -->
              <div class="margin-indicator-bar" style="font-family: var(--font-mono); font-size: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--accent-gold);">● GOVERNANCE FLYWHEEL:</span>
                  <span style="color: var(--text-body);">Weekly 30-min Contribution Council + Squad RFC proposals eliminated top-down friction.</span>
                </div>
                <span class="node-status-pill pill-amber">180+ Active Tokens</span>
              </div>
            </div>

            <!-- 3 KPI Metric Badges -->
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

            <!-- Expandable Full Deep Dive & Interview Defense -->
            <div class="deep-dive-accordion">
              <button class="deep-dive-btn" onclick="toggleDeepDive('dive-ibm-carbon', this)">
                <span>📖 Explore Full Architectural Deep Dive &amp; Interview Defense</span>
                <span style="font-size: 11px;">▼</span>
              </button>

              <div id="dive-ibm-carbon" class="deep-dive-panel">
                <div class="dive-section">
                  <h4>1. Executive Framing &amp; The Design Debt Crisis</h4>
                  <p>Across 14 distributed software squads in IBM India Software Labs, design fragmentation had grown to crisis levels. Squads maintained isolated component forks with hardcoded hex codes, disparate padding, and incompatible CSS overrides. Implementing dark mode or adapting to refreshed Carbon brand guidelines took 3+ sprints per squad, burning hundreds of thousands of dollars in redundant front-end rework and QA handoff disputes.</p>
                </div>

                <div class="dive-section">
                  <h4>2. The Architectural Solution: 3-Tier Token Synchronizer</h4>
                  <p>Rather than relying on static redlines or manual handoffs, I led the architecture of an automated token bridge. By structuring tokens into <strong>Global Primitives</strong> (raw values), <strong>Semantic Tokens</strong> (intent-driven mappings like <code>surface-ground</code> or <code>border-interactive</code>), and <strong>Component Tokens</strong>, we decoupled visual design from engineering implementations. Integrating Style-Dictionary and GitHub Actions meant that any variable change approved in Figma automatically produced tested, merge-ready PRs directly into each squad's React repository.</p>
                </div>

                <div class="dive-section">
                  <h4>3. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
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


          <!-- =================================================================
               CASE 3: ZEBRA TECHNOLOGIES IOT FLEET TELEMATICS
               ================================================================= -->
          <article class="case-card" data-category="zebra">
            <div class="case-header-block">
              <div>
                <div class="case-meta-top">
                  <span class="case-company-badge" style="background: rgba(196,137,42,0.1); color: var(--accent-gold); border-color: rgba(196,137,42,0.3);">Zebra Technologies</span>
                  <span class="case-role-text">UI/UX Product Design Manager &bull; Jul 2021 – Aug 2024</span>
                </div>
                <h3 class="case-title">Zebra Enterprise Device Cloud: Multi-Site Fleet &amp; Scanner Telematics</h3>
                <p class="case-headline-lead">Scaling mission-critical IoT diagnostics and zero-touch barcode provisioning for 1.2M+ active enterprise hardware devices across global distribution centers.</p>
              </div>
            </div>

            <!-- VISUAL INFOGRAPHIC CANVAS: WAREHOUSE SPATIAL MAP & ZERO-TOUCH SETUP -->
            <div class="infographic-canvas">
              <div class="infographic-canvas-header">
                <div class="canvas-title-group">
                  <span class="canvas-chip chip-modern">IoT Architecture</span>
                  <span style="font-size: 13.5px; font-weight: 700; color: var(--text-main);">Spatial Warehouse Diagnostics &amp; 1-Scan Zero-Touch Provisioning</span>
                </div>
                <span class="canvas-subtitle">Scale: 1.2M Active Hardware Devices Governed</span>
              </div>

              <!-- 3-Column Visual Flow Architecture -->
              <div class="infographic-comparison-grid" style="grid-template-columns: 1fr 50px 1.3fr;">
                
                <!-- Col 1: Spatial Warehouse Heatmap Mock -->
                <div class="pipeline-node-card">
                  <span class="node-step-tag">Spatial Heatmap</span>
                  <div class="node-title">Distribution Center Floor Grid</div>
                  <!-- Visual floor map grid with pins -->
                  <div style="background: var(--bg-subtle); border: 1px solid var(--border-medium); border-radius: 4px; padding: 8px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-family: var(--font-mono); font-size: 9px; text-align: center;">
                    <div style="background: rgba(16,185,129,0.15); color: var(--accent-green); padding: 6px 2px; border-radius: 3px;">Zone A: 480 Scanners<br>Battery: 98%</div>
                    <div style="background: rgba(16,185,129,0.15); color: var(--accent-green); padding: 6px 2px; border-radius: 3px;">Zone B: 310 Scanners<br>Battery: 89%</div>
                    <div style="background: rgba(220,38,38,0.15); color: var(--accent-red); padding: 6px 2px; border-radius: 3px; font-weight: 700;">Zone C: Stoppage Risk<br>Battery: 12% ⚠️</div>
                  </div>
                  <div class="node-status-pill pill-green">Real-Time Telemetry</div>
                </div>

                <!-- Center Connector -->
                <div class="transform-arrow-column">
                  <div class="transform-icon-circle" style="width: 38px; height: 38px; font-size: 15px;">⚡</div>
                  <span class="transform-label" style="font-size: 8px;">1-Scan</span>
                </div>

                <!-- Col 2: 1-Scan Provisioning & Predictive Battery -->
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div class="pipeline-node-card" style="border-left: 3px solid var(--accent-green);">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                      <span class="node-step-tag">Zero-Touch Provisioning</span>
                      <span style="font-family: var(--font-mono); font-size: 9px; color: var(--accent-green); font-weight: 700;">8 Sec vs 4.5 Days</span>
                    </div>
                    <div class="node-title">Scan 1 Master 2D Barcode</div>
                    <div class="node-desc">Scanning a single generated DataMatrix barcode connects scanner to encrypted Wi-Fi, pulls firmware, and flashes enterprise configurations instantly.</div>
                  </div>

                  <div class="pipeline-node-card" style="border-left: 3px solid var(--accent-gold);">
                    <span class="node-step-tag">Predictive Battery Analytics</span>
                    <div class="node-title">Proactive Degradation Curve</div>
                    <div class="node-desc">AI flags lithium cell impedance degradation 3 shifts before line stoppage, saving $14,000/hr in conveyor downtime.</div>
                  </div>
                </div>

              </div>

              <!-- Bottom Bar -->
              <div class="margin-indicator-bar" style="font-family: var(--font-mono); font-size: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--accent-green);">● FIELD INSIGHT:</span>
                  <span style="color: var(--text-body);">Contextual inquiry in sub-zero freezers drove oversized 48px touch targets for gloved workers.</span>
                </div>
                <span class="node-status-pill pill-green">-45% Staging Downtime</span>
              </div>
            </div>

            <!-- 3 KPI Metric Badges -->
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

            <!-- Expandable Full Deep Dive & Interview Defense -->
            <div class="deep-dive-accordion">
              <button class="deep-dive-btn" onclick="toggleDeepDive('dive-zebra-iot', this)">
                <span>📖 Explore Full Architectural Deep Dive &amp; Interview Defense</span>
                <span style="font-size: 11px;">▼</span>
              </button>

              <div id="dive-zebra-iot" class="deep-dive-panel">
                <div class="dive-section">
                  <h4>1. Executive Framing &amp; The Industrial Crisis</h4>
                  <p>Zebra Technologies powers high-velocity logistics hubs for global retail and e-commerce leaders. Staging 1,000 new mobile computers or barcode scanners historically required IT technicians to physically plug each unit into USB hubs, taking 4.5 business days per batch. Simultaneously, unmonitored battery degradation was causing active packaging lines to freeze mid-shift, costing warehouse operators up to $14,000 per hour in idle labor and shipping SLA penalties.</p>
                </div>

                <div class="dive-section">
                  <h4>2. Field Research in Sub-Zero Distribution Hubs</h4>
                  <p>I conducted contextual inquiry inside high-velocity cold-storage distribution centers. I observed warehouse operators wearing thick thermal gloves in sub-zero freezers struggling to tap 12px touch targets on screen. This field discovery reshaped our technical strategy: rather than forcing workers to navigate complex touchscreen menus, we designed the <strong>1-Scan Master Barcode</strong> workflow. Operators simply turned on a scanner and pointed it at an illuminated master QR code—the device self-configured over Wi-Fi in 8 seconds flat.</p>
                </div>

                <div class="dive-section">
                  <h4>3. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
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


          <!-- =================================================================
               CASE 4: ERICSSON SALES AUTOMATION PLATFORM (EXCEL TO CPQ)
               ================================================================= -->
          <article class="case-card" data-category="sales">
            <div class="case-header-block">
              <div>
                <div class="case-meta-top">
                  <span class="case-company-badge">Ericsson Global</span>
                  <span class="case-role-text">Lead UI/UX Designer &bull; Jul 2019 – Sep 2020</span>
                </div>
                <h3 class="case-title">Ericsson SalesOps Cloud: Transforming 14-Tab Legacy Excel Chaos into an Automated Deal Engine</h3>
                <p class="case-headline-lead">Replacing unversioned, macro-heavy spreadsheet pricing models with a guided enterprise CPQ (Configure, Price, Quote) platform across global telecom sales operations.</p>
              </div>
            </div>

            <!-- VISUAL INFOGRAPHIC CANVAS: EXCEL NIGHTMARE VS 4-STEP DEAL ENGINE -->
            <div class="infographic-canvas">
              <div class="infographic-canvas-header">
                <div class="canvas-title-group">
                  <span class="canvas-chip chip-legacy">Legacy Nightmare</span>
                  <span style="font-size: 13.5px; font-weight: 700; color: var(--text-main);">14-Tab Spreadsheet Chaos</span>
                  <span style="font-size: 13.5px; color: var(--text-muted);">&rarr;</span>
                  <span class="canvas-chip chip-modern">Architectural Solution</span>
                  <span style="font-size: 13.5px; font-weight: 700; color: var(--text-main);">Automated 4-Step Deal Engine</span>
                </div>
                <span class="canvas-subtitle">Award: 🏆 1st Place Ericsson Global Hack-fest</span>
              </div>

              <!-- Side-by-Side Visual Comparison -->
              <div class="infographic-comparison-grid">

                <!-- Left: Spreadsheet Mock Window -->
                <div class="spreadsheet-mock">
                  <div class="spreadsheet-titlebar">
                    <span>⚠️ Global_Pricing_2020_v4_FINAL_v2.xlsx</span>
                    <span style="color: #ffcccc; font-size: 9.5px;">6 Days Latency</span>
                  </div>
                  <div class="spreadsheet-grid">
                    <div class="sheet-cell sheet-header-cell">#</div>
                    <div class="sheet-cell sheet-header-cell">Component</div>
                    <div class="sheet-cell sheet-header-cell">Unit Margin</div>
                    <div class="sheet-cell sheet-header-cell">Lookup Status</div>

                    <div class="sheet-cell sheet-header-cell">12</div>
                    <div class="sheet-cell">5G Radio 4415</div>
                    <div class="sheet-cell sheet-err-cell">-14.8% (LOSS)</div>
                    <div class="sheet-cell sheet-err-cell">#REF! ERR</div>

                    <div class="sheet-cell sheet-header-cell">13</div>
                    <div class="sheet-cell">Baseband 6630</div>
                    <div class="sheet-cell">34.2%</div>
                    <div class="sheet-cell">VLOOKUP_OK</div>

                    <div class="sheet-cell sheet-header-cell">14</div>
                    <div class="sheet-cell">Fiber Hub 10G</div>
                    <div class="sheet-cell sheet-err-cell">0.0%</div>
                    <div class="sheet-cell sheet-err-cell">#VALUE! ERR</div>
                  </div>
                  <!-- 14 messy tabs preview -->
                  <div class="sheet-tabs-row">
                    <div class="sheet-tab active-error">5G Towers</div>
                    <div class="sheet-tab">Baseband</div>
                    <div class="sheet-tab">Fiber BOM</div>
                    <div class="sheet-tab">Discounts v2</div>
                    <div class="sheet-tab">SLA Support</div>
                    <div class="sheet-tab">DO NOT EDIT</div>
                    <div class="sheet-tab">Old Prices</div>
                    <div class="sheet-tab">+7 more</div>
                  </div>
                </div>

                <!-- Center Transformation Bridge -->
                <div class="transform-arrow-column">
                  <div class="transform-icon-circle">➔</div>
                  <span class="transform-label">UX Transform</span>
                </div>

                <!-- Right: Automated CPQ 4-Step Pipeline -->
                <div class="pipeline-nodes-row" style="grid-template-columns: repeat(2, 1fr); gap: 8px;">
                  <div class="pipeline-node-card">
                    <span class="node-step-tag">Step 01</span>
                    <div class="node-title">Deal Intake &amp; SLA</div>
                    <div class="node-desc">Auto-loads customer baseline contract terms &amp; volume tiers.</div>
                    <div class="node-status-pill pill-blue">Auto-Populated</div>
                  </div>

                  <div class="pipeline-node-card">
                    <span class="node-step-tag">Step 02</span>
                    <div class="node-title">Keyboard BOM Grid</div>
                    <div class="node-desc">High-speed keyboard navigation, arrow keys, and inline edit.</div>
                    <div class="node-status-pill pill-blue">Excel Speed</div>
                  </div>

                  <div class="pipeline-node-card">
                    <span class="node-step-tag">Step 03</span>
                    <div class="node-title">Margin Guardrails</div>
                    <div class="node-desc">Live calculation: Green &gt;35%, Amber routes to Regional VP.</div>
                    <div class="node-status-pill pill-green">Zero Loss</div>
                  </div>

                  <div class="pipeline-node-card">
                    <span class="node-step-tag">Step 04</span>
                    <div class="node-title">1-Click Proposal</div>
                    <div class="node-desc">Customer-ready executive contract PDF generated in 42 minutes.</div>
                    <div class="node-status-pill pill-green">Verified PDF</div>
                  </div>
                </div>

              </div>

              <!-- Live Dynamic Margin Guardrail Indicator -->
              <div class="margin-indicator-bar">
                <div style="display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px;">
                  <span style="color: var(--accent-green); font-weight: 700;">● GROSS MARGIN GUARDRAIL:</span>
                  <span style="color: var(--text-body);">Calculated Margin: <strong>38.4%</strong> (Compliant &mdash; Instant Auto-Approval Enabled)</span>
                </div>
                <div style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: var(--accent-gold);">
                  Cycle Time: 6 Days &rarr; 42 Mins (-92%)
                </div>
              </div>
            </div>

            <!-- 3 KPI Metric Badges -->
            <div class="kpi-row">
              <div class="kpi-box">
                <div class="kpi-val">6 Days &rarr; 42 Mins</div>
                <div class="kpi-lbl">Quote Turnaround Time</div>
              </div>
              <div class="kpi-box">
                <div class="kpi-val">0% Errors</div>
                <div class="kpi-lbl">Pricing Calculation Inaccuracies</div>
              </div>
              <div class="kpi-box">
                <div class="kpi-val">$18M+ Lift</div>
                <div class="kpi-lbl">Protected Margin Leakage</div>
              </div>
            </div>

            <!-- Expandable Full Deep Dive & Interview Defense -->
            <div class="deep-dive-accordion">
              <button class="deep-dive-btn" onclick="toggleDeepDive('dive-ericsson-sales', this)">
                <span>📖 Explore Full Architectural Deep Dive &amp; Interview Defense</span>
                <span style="font-size: 11px;">▼</span>
              </button>

              <div id="dive-ericsson-sales" class="deep-dive-panel">
                <div class="dive-section">
                  <h4>1. Executive Framing &amp; The Spreadsheet Nightmare</h4>
                  <p>At Ericsson Global, pricing multi-million dollar telecom network deployments (5G radio base stations, massive MIMO antennae, optical routing, and multi-year SLA support agreements) was managed via massive, 14-tab Microsoft Excel spreadsheets. Hundreds of global sales engineers emailed 50MB macro-heavy workbooks across time zones. Broken VLOOKUP formulas, unlinked tabs, and out-of-date catalog rates meant that preparing an enterprise quote took an agonizing 6 business days. Worse, 18% of sent proposals suffered from calculation errors, causing multi-million dollar margin leakage on major fiber contracts.</p>
                </div>

                <div class="dive-section">
                  <h4>2. The UX Breakthrough: Keyboard-First Data Grid Ergonomics</h4>
                  <p>When enterprise software replaces Excel, user adoption usually crashes because sales engineers hate slow, click-heavy web forms. During user research, I realized that if we built a standard stepper wizard, users would revolt and continue using spreadsheets. So I designed a <strong>keyboard-first high-speed data grid</strong> with arrow-key cell navigation, bulk copy-paste, and instant inline autocompletion. We preserved the muscle memory and speed of a spreadsheet, but coupled it to a cloud catalog with real-time gross margin guardrails in the background.</p>
                </div>

                <div class="dive-section">
                  <h4>3. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
                  <div class="dive-interview-grid">
                    <div class="interview-qa-item">
                      <div class="qa-question"><span class="qa-q-num">Q1</span> Sales engineers are notoriously loyal to Excel. How did you drive 94% adoption without user resistance?</div>
                      <div class="qa-answer"><strong>Answer for Interviewer:</strong> &ldquo;Sales engineers cling to Excel because of keyboard velocity and perceived autonomy—they resent clunky enterprise web forms that slow them down. I didn't take away their speed; I designed a keyboard-navigable data grid with inline calculations, arrow-key navigation, and smart autocompletion. Once they saw they could generate a verified $10M quotation in 42 minutes without worrying about broken macro errors or spreadsheet corruption, adoption reached 94% in the very first month.&rdquo;</div>
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
                <span class="skill-tag">B2B SaaS</span>
                <span class="skill-tag">Enterprise CPQ</span>
                <span class="skill-tag">Data Grid Ergonomics</span>
                <span class="skill-tag">Spreadsheet Modernization</span>
              </div>
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">Verified Ericsson Global Case</span>
            </div>
          </article>


          <!-- =================================================================
               CASE 5: ZF WABCO COMMERCIAL VEHICLE FLEET COCKPIT
               ================================================================= -->
          <article class="case-card" data-category="auto">
            <div class="case-header-block">
              <div>
                <div class="case-meta-top">
                  <span class="case-company-badge" style="background: rgba(16,185,129,0.1); color: var(--accent-green); border-color: rgba(16,185,129,0.3);">ZF Wabco</span>
                  <span class="case-role-text">UI/UX Senior Specialist &bull; Oct 2020 – Jul 2021</span>
                </div>
                <h3 class="case-title">ZF Wabco Commercial Vehicle Cockpit &amp; Real-Time Safety Telematics</h3>
                <p class="case-headline-lead">Designing a dual-interface ecosystem: a glanceable, distraction-free in-cab HUD for truck drivers paired with an automated fleet command center for dispatchers.</p>
              </div>
            </div>

            <!-- VISUAL INFOGRAPHIC CANVAS: DUAL-ZONE IN-CAB COCKPIT & DISPATCHER CLOUD -->
            <div class="infographic-canvas">
              <div class="infographic-canvas-header">
                <div class="canvas-title-group">
                  <span class="canvas-chip chip-modern">Automotive Telematics</span>
                  <span style="font-size: 13.5px; font-weight: 700; color: var(--text-main);">Glanceable In-Cab HUD &amp; Dispatcher Cloud Telematics</span>
                </div>
                <span class="canvas-subtitle">Safety Standard: EU Certified (&lt;1.2s Glance Time)</span>
              </div>

              <!-- 3 Visual Cones Row -->
              <div class="pipeline-nodes-row" style="grid-template-columns: repeat(3, 1fr);">
                <div class="pipeline-node-card" style="border-top: 3px solid var(--accent-red);">
                  <span class="node-step-tag">Zone 1 (&lt;0.8s Foveal)</span>
                  <div class="node-title">Primary Safety HUD</div>
                  <div class="node-desc">Digital velocity, collision avoidance alert, and emergency brake proximity.</div>
                  <div class="node-status-pill pill-green">Zero Distraction</div>
                </div>

                <div class="pipeline-node-card" style="border-top: 3px solid var(--accent-gold);">
                  <span class="node-step-tag">Zone 2 (&lt;1.2s Navigation)</span>
                  <div class="node-title">Heavy Vehicle Routing</div>
                  <div class="node-desc">Low-bridge clearance restrictions, weigh station alerts, and lane centering.</div>
                  <div class="node-status-pill pill-amber">Turn Guidance</div>
                </div>

                <div class="pipeline-node-card" style="border-top: 3px solid var(--accent-green);">
                  <span class="node-step-tag">Zone 3 (Ambient Coaching)</span>
                  <div class="node-title">Eco-Fuel Efficiency Bar</div>
                  <div class="node-desc">Peripheral visual and haptic coaching delivering a 14% improvement in fleet fuel efficiency.</div>
                  <div class="node-status-pill pill-green">+14% Fuel Savings</div>
                </div>
              </div>

              <!-- Bottom Bar: Dispatcher Cloud -->
              <div class="margin-indicator-bar" style="font-family: var(--font-mono); font-size: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--accent-green);">● TELEMATICS LOOP:</span>
                  <span style="color: var(--text-body);">Truck CAN-bus streams real-time telemetry to Dispatcher Web Console with automated geo-fencing.</span>
                </div>
                <span class="node-status-pill pill-green">80,000+ Active Trucks</span>
              </div>
            </div>

            <!-- 3 KPI Metric Badges -->
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

            <!-- Expandable Full Deep Dive & Interview Defense -->
            <div class="deep-dive-accordion">
              <button class="deep-dive-btn" onclick="toggleDeepDive('dive-zf-wabco', this)">
                <span>📖 Explore Full Architectural Deep Dive &amp; Interview Defense</span>
                <span style="font-size: 11px;">▼</span>
              </button>

              <div id="dive-zf-wabco" class="deep-dive-panel">
                <div class="dive-section">
                  <h4>1. Executive Framing &amp; The Human Factor Safety Mandate</h4>
                  <p>Operating a 40-ton commercial vehicle at 90 km/h on European highways carries severe safety risks. Commercial truck drivers were overwhelmed by cluttered, multi-layered aftermarket navigation tablets, resulting in high cognitive overload and visual fatigue. European transport safety regulations impose strict penalties on interfaces requiring more than 2.0 seconds of glance time. Simultaneously, fleet dispatchers lacked real-time visibility into route deviations and brake wear.</p>
                </div>

                <div class="dive-section">
                  <h4>2. Designing Under Strict Ergonomic Constraints</h4>
                  <p>Automotive UI is fundamentally different from consumer mobile design. I engineered a <strong>3-zone glance architecture</strong>: Zone 1 for immediate foveal vision (&lt;0.8s), Zone 2 for secondary navigation guidance (&lt;1.2s), and Zone 3 for ambient eco-driving peripheral coaching. We enforced strict 48px minimal touch targets, high contrast ratios readable under direct blinding sunlight and nocturnal driving conditions, and eliminated multi-level menu navigation while the vehicle was in motion.</p>
                </div>

                <div class="dive-section">
                  <h4>3. Executive Interview Preparation &amp; Defense (CAR Framework)</h4>
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

        </div>`;

// Replace the case studies block
const startMarker = '<!-- Case Studies List -->';
const endMarker = '<!-- ========================================================================\n         TAB 2: FULL LEADERSHIP DECK';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  html = html.substring(0, startIndex) + newCasesHTML + '\n      </section>\n\n    </div>\n\n    ' + html.substring(endIndex);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Successfully updated index.html with new infographic case studies and deep-dive interview preparation!');
} else {
  console.error('Could not find start or end markers for case studies replacement');
}
