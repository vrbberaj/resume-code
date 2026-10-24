# inject_design_management_rubric.py
import re

print("=== INJECTING DESIGN MANAGEMENT RUBRIC ENHANCEMENTS INTO compile_ibm_watson_story.js ===")

with open('compile_ibm_watson_story.js', 'r', encoding='utf-8') as f:
    code = f.read()

# -----------------------------------------------------------------------------
# 1. CSS INJECTION
# -----------------------------------------------------------------------------
new_css = '''
    /* Executive Whiteboard Sketches */
    .whiteboard-sketch-card {
      background: #FCFDFD;
      border: 1px solid #CBD5E1;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.02), 0 4px 16px rgba(15, 23, 42, 0.05);
      background-image: radial-gradient(#CBD5E1 1.2px, transparent 1.2px);
      background-size: 16px 16px;
      position: relative;
      overflow: hidden;
      width: 100%;
      max-width: 100%;
    }

    .whiteboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      border-bottom: 2px dashed #CBD5E1;
      padding-bottom: 12px;
      margin-bottom: 18px;
    }

    .whiteboard-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #1E293B;
      color: #F8FAFC;
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .whiteboard-context {
      font-family: var(--font-code);
      font-size: 12px;
      color: #64748B;
    }

    .whiteboard-diagram-wrap {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }

    .whiteboard-sticky-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-top: 16px;
      width: 100%;
    }

    .sticky-note {
      padding: 14px 16px;
      border-radius: 4px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.08);
      font-size: 12px;
      font-family: var(--font-body);
      font-weight: 600;
      line-height: 1.45;
      min-width: 0;
    }

    .sticky-note.yellow { background: #FEF08A; color: #713F12; transform: rotate(-1deg); }
    .sticky-note.pink   { background: #FCE7F3; color: #831843; transform: rotate(1.2deg); }
    .sticky-note.blue   { background: #CFFAFE; color: #155E75; transform: rotate(-0.8deg); }
    .sticky-note.green  { background: #DCFCE7; color: #14532D; transform: rotate(0.9deg); }

    /* Dual-Track Agile UCD Governance Cadence */
    .dual-track-wrapper {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
      width: 100%;
      max-width: 100%;
    }

    .dual-track-lanes {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
    }

    .track-lane {
      border-radius: 8px;
      padding: 16px;
      border: 1px solid #E2E8F0;
    }

    .track-lane.discovery {
      background: rgba(15, 98, 254, 0.03);
      border-left: 4px solid #0F62FE;
    }

    .track-lane.delivery {
      background: rgba(16, 185, 129, 0.03);
      border-left: 4px solid #10B981;
    }

    .track-lane-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
      font-family: var(--font-heading);
      font-size: 14.5px;
      font-weight: 800;
    }

    .track-steps-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      width: 100%;
    }

    .track-step-node {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 6px;
      padding: 10px;
      font-size: 11.5px;
      color: var(--text-body);
      min-width: 0;
    }

    .track-step-num {
      font-family: var(--font-code);
      font-size: 10px;
      font-weight: 700;
      display: block;
      margin-bottom: 4px;
    }

    .track-lane.discovery .track-step-num { color: #0F62FE; }
    .track-lane.delivery .track-step-num { color: #10B981; }

    .track-sync-gate {
      background: #FFFBEB;
      border: 1px dashed #F59E0B;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12.5px;
      color: #92400E;
      margin: 12px 0;
    }

    /* The Manager\'s Business Geek Spreadsheet Component */
    .manager-sheet-container {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 12px;
      margin: 28px 0;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
      overflow: hidden;
      width: 100%;
      max-width: 100%;
    }

    .sheet-header-bar {
      background: #107C41; /* Excel Enterprise Green */
      color: #FFFFFF;
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .sheet-title-text {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sheet-meta-badge {
      font-family: var(--font-code);
      font-size: 11px;
      background: rgba(255, 255, 255, 0.2);
      padding: 3px 8px;
      border-radius: 4px;
    }

    .sheet-tabs-bar {
      background: #F1F5F9;
      border-bottom: 1px solid #CBD5E1;
      display: flex;
      gap: 4px;
      padding: 6px 12px 0 12px;
      overflow-x: auto;
      max-width: 100%;
    }

    .sheet-tab-button {
      background: #E2E8F0;
      border: 1px solid #CBD5E1;
      border-bottom: none;
      padding: 8px 16px;
      border-radius: 6px 6px 0 0;
      font-family: var(--font-code);
      font-size: 12px;
      font-weight: 600;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .sheet-tab-button.active {
      background: #FFFFFF;
      color: #107C41;
      border-top: 3px solid #107C41;
      font-weight: 700;
      padding-bottom: 9px;
      margin-bottom: -1px;
    }

    .sheet-formula-bar {
      background: #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-code);
      font-size: 12px;
      color: #475569;
      overflow-x: auto;
      max-width: 100%;
    }

    .formula-label {
      font-weight: 700;
      color: #0F62FE;
      background: #EFF6FF;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
    }

    .sheet-content-pane {
      display: none;
      padding: 20px;
    }

    .sheet-content-pane.active {
      display: block;
    }

    .sheet-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      font-family: var(--font-body);
    }

    .sheet-table th {
      background: #F8FAFC;
      color: #334155;
      font-family: var(--font-code);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 10px 12px;
      border: 1px solid #E2E8F0;
      text-align: left;
      white-space: nowrap;
    }

    .sheet-table td {
      padding: 10px 12px;
      border: 1px solid #E2E8F0;
      color: var(--text-body);
    }

    .sheet-table tr:nth-child(even) td {
      background: #FAFCFE;
    }

    .sheet-score-pill {
      font-family: var(--font-code);
      font-weight: 700;
      font-size: 11.5px;
      padding: 3px 8px;
      border-radius: 4px;
      display: inline-block;
      white-space: nowrap;
    }

    .score-p1 { background: #DCFCE7; color: #166534; }
    .score-p2 { background: #FEF3C7; color: #92400E; }
    .score-p3 { background: #E0E7FF; color: #3730A3; }

    /* OKR Cards Grid */
    .okr-cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      width: 100%;
    }

    .okr-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 0;
    }

    .okr-tag {
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 700;
      color: #0F62FE;
      background: #EFF6FF;
      padding: 2px 8px;
      border-radius: 4px;
      width: fit-content;
    }

    .okr-title {
      font-family: var(--font-heading);
      font-size: 14.5px;
      font-weight: 700;
      color: var(--text-main);
    }

    .okr-bar-track {
      background: #E2E8F0;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      width: 100%;
    }

    .okr-bar-fill {
      height: 100%;
      border-radius: 4px;
      background: #10B981;
    }

    .okr-meta-row {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-code);
      font-size: 11px;
      color: #64748B;
    }

    /* The Manager\'s Method Kit */
    .method-kit-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 24px 0;
      width: 100%;
      max-width: 100%;
    }

    .method-kit-card {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 22px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 0;
    }

    .method-kit-card.t1 { border-top: 4px solid #0F62FE; }
    .method-kit-card.t2 { border-top: 4px solid #10B981; }
    .method-kit-card.t3 { border-top: 4px solid #C4892A; }

    .method-kit-pill {
      font-family: var(--font-code);
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 4px;
      width: fit-content;
    }

    .method-kit-card.t1 .method-kit-pill { background: rgba(15, 98, 254, 0.1); color: #0F62FE; }
    .method-kit-card.t2 .method-kit-pill { background: rgba(16, 185, 129, 0.1); color: #059669; }
    .method-kit-card.t3 .method-kit-pill { background: rgba(196, 137, 42, 0.1); color: #C4892A; }

    .method-kit-title {
      font-family: var(--font-heading);
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
    }

    .method-kit-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 12px;
      color: var(--text-body);
    }

    .method-kit-list li {
      padding-left: 14px;
      position: relative;
    }

    .method-kit-list li::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: #0F62FE;
      font-weight: bold;
    }

    /* Squad Attribution & Role Clarity */
    .attribution-container {
      background: #0D121A;
      color: #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      margin: 28px 0;
      border: 1px solid #1E293B;
      width: 100%;
      max-width: 100%;
    }

    .attribution-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 16px;
      width: 100%;
    }

    .attribution-col {
      background: #131A24;
      border: 1px solid #1E293B;
      border-radius: 8px;
      padding: 18px;
      min-width: 0;
    }

    .attribution-col.lead {
      border-left: 4px solid #0F62FE;
    }

    .attribution-col.squad {
      border-left: 4px solid #10B981;
    }

    .attribution-title {
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 800;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .attribution-col.lead .attribution-title { color: #60A5FA; }
    .attribution-col.squad .attribution-title { color: #34D399; }

    .attribution-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 12px;
      color: #CBD5E1;
      line-height: 1.5;
    }
'''

# Insert CSS before @media (max-width: 900px)
target_css_pos = code.find('    .table-responsive-wrapper {')
if target_css_pos != -1:
    end_of_trw = code.find('    }', target_css_pos) + 6
    code = code[:end_of_trw] + new_css + code[end_of_trw:]
    print("✓ New CSS injected.")

# Add responsive overrides into @media (max-width: 900px)
med_pos = code.find('      .btn-tier { flex: 1 1 30% !important; text-align: center !important; }')
if med_pos != -1:
    med_addon = '''
      .whiteboard-header { flex-direction: column !important; align-items: flex-start !important; }
      .whiteboard-sticky-row { grid-template-columns: 1fr !important; }
      .dual-track-lanes { flex-direction: column !important; }
      .track-steps-row { grid-template-columns: 1fr 1fr !important; }
      .okr-cards-grid { grid-template-columns: 1fr !important; }
      .method-kit-grid { grid-template-columns: 1fr !important; }
      .attribution-grid { grid-template-columns: 1fr !important; }'''
    code = code[:med_pos + len('      .btn-tier { flex: 1 1 30% !important; text-align: center !important; }')] + med_addon + code[med_pos + len('      .btn-tier { flex: 1 1 30% !important; text-align: center !important; }'):]
    print("✓ Responsive media queries updated.")

# -----------------------------------------------------------------------------
# 2. CHAPTER 02 INJECTION (Whiteboard Sketch A + Dual-Track Agile UCD Cadence)
# -----------------------------------------------------------------------------
ch02_content = '''
        <!-- Whiteboard Strategy Sketch A -->
        <div class="whiteboard-sketch-card">
          <div class="whiteboard-header">
            <span class="whiteboard-tag">🖊️ Executive Whiteboard Sketch &bull; Workshop #3</span>
            <span class="whiteboard-context">Presented to Chief Compliance Officer &amp; VP of Engineering (Bangalore &amp; Austin, Oct 2024)</span>
          </div>

          <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: #0F172A; margin-bottom: 8px;">
            The "Airport Runway" Analogy: Why Unguided LLMs Fail in Avionics &amp; SecOps
          </h4>
          <p style="font-size: 13px; color: #475569; margin-bottom: 16px;">
            This raw sketch on the conference room whiteboard shifted the executive room: I showed how treating AI like an "autonomous autopilot" without human radar gates is fatal in regulated systems.
          </p>

          <div class="whiteboard-diagram-wrap">
            <svg viewBox="0 0 900 230" width="100%" height="auto" style="display: block; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px;">
              <!-- Runway Lane 1: Consumer AI (Broken) -->
              <rect x="20" y="20" width="860" height="85" rx="6" fill="#FEF2F2" stroke="#FCA5A5" stroke-width="1.5" stroke-dasharray="4 4" />
              <text x="35" y="42" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#DC2626">FLAWED PATH: CONSUMER CHATBOT PARADIGM</text>
              <text x="35" y="62" font-family="Inter, sans-serif" font-size="11.5" fill="#7F1D1D">User Prompt &rarr; Black-Box LLM &rarr; Direct Production Mutation (0 Verification, 0 Diff, Hallucinations Unnoticed)</text>
              <text x="35" y="84" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#B91C1C">💥 Result: DO-178C avionics audit failure / Malicious SecOps registry corruption across 140k endpoints</text>

              <!-- Runway Lane 2: Enterprise Human-in-the-Loop Gating (Our Architecture) -->
              <rect x="20" y="120" width="860" height="95" rx="6" fill="#F0FDF4" stroke="#86EFAC" stroke-width="2" />
              <text x="35" y="142" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#15803D">OUR ARCHITECTURE: DETERMINISTIC 3-TIER CONFIDENCE ROUTING</text>
              <text x="35" y="164" font-family="Inter, sans-serif" font-size="11.5" fill="#14532D">1. Natural Language Intent &rarr; 2. Mathematical Confidence Scoring &rarr; 3. Visual Diff Sandbox &rarr; 4. Cryptographic Sign-Off</text>
              <text x="35" y="190" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#166534">🛡️ Result: 0 Compliance Breaches across 140k tasks &bull; Total practitioner trust &bull; 74% velocity gain</text>
            </svg>
          </div>

          <div class="whiteboard-sticky-row">
            <div class="sticky-note yellow">
              📌 CCO Reaction (Austin): "Finally someone understands that our aerospace clients get fined $250k per non-traceable code commit!"
            </div>
            <div class="sticky-note pink">
              📌 VP Engineering: "Balaajee, if your team can design the Side-by-Side Diff Drawer to render under 200ms, engineering will back this 100%."
            </div>
            <div class="sticky-note blue">
              📌 Chief Watson Architect: "We will expose model softmax probability logits as an API so the UI can route confidence dynamically."
            </div>
          </div>
        </div>

        <!-- Dual-Track Agile UCD Governance Cadence -->
        <div class="dual-track-wrapper">
          <div class="track-lane-title">
            <span>🔄 Dual-Track Agile UCD Governance: How My Team Scaled Discovery &amp; Delivery</span>
            <span class="sheet-meta-badge" style="background: rgba(15, 98, 254, 0.1); color: #0F62FE;">Bi-Weekly Sprint Cadence</span>
          </div>
          <p style="font-size: 13px; color: var(--text-body); margin-bottom: 14px;">
            To ensure research never delayed engineering sprints, I instituted a synchronized <strong>Dual-Track Agile</strong> operating model where UX Discovery worked exactly 2 sprints ahead of Dev Delivery:
          </p>

          <div class="dual-track-lanes">
            <!-- Track 1: Discovery -->
            <div class="track-lane discovery">
              <div class="track-lane-title">
                <span style="color: #0F62FE;">TRACK 1: UX DISCOVERY &amp; FIELD INQUIRY (Sprint N+2)</span>
                <span style="font-size: 11px; font-family: var(--font-code); color: #64748B;">Led by Me &amp; Research Chapter</span>
              </div>
              <div class="track-steps-row">
                <div class="track-step-node">
                  <span class="track-step-num">STEP 1</span>
                  <strong>In-Situ Shadowing:</strong> Observe avionics engineers &amp; SecOps analysts in active sessions.
                </div>
                <div class="track-step-node">
                  <span class="track-step-num">STEP 2</span>
                  <strong>Mental Model Mapping:</strong> Identify verification fatigue points and cognitive friction vectors.
                </div>
                <div class="track-step-node">
                  <span class="track-step-num">STEP 3</span>
                  <strong>Gating Paper Sketches:</strong> Co-design confidence thresholds on whiteboards with engineers.
                </div>
                <div class="track-step-node">
                  <span class="track-step-num">STEP 4</span>
                  <strong>1-Page UX Brief:</strong> Freeze model inputs, failure fallbacks, and task success metrics.
                </div>
              </div>
            </div>

            <!-- Inter-Track Sync Gate -->
            <div class="track-sync-gate">
              <span style="font-size: 18px;">⚖️</span>
              <div>
                <strong>Weekly 3-Amigos Alignment Gate (PM + Dev Lead + Design Manager):</strong> No feature enters the Engineering sprint backlog until the UX Brief has verified &ge;80% usability confidence on interactive prototypes.
              </div>
            </div>

            <!-- Track 2: Delivery -->
            <div class="track-lane delivery">
              <div class="track-lane-title">
                <span style="color: #10B981;">TRACK 2: ENGINEERING PAIRING &amp; PRODUCTION DELIVERY (Sprint N)</span>
                <span style="font-size: 11px; font-family: var(--font-code); color: #64748B;">Executed by Embedded Squad Designers</span>
              </div>
              <div class="track-steps-row">
                <div class="track-step-node">
                  <span class="track-step-num">STEP 1</span>
                  <strong>Carbon Token Binding:</strong> Bind UI specs to semantic tokens in Figma Variables.
                </div>
                <div class="track-step-node">
                  <span class="track-step-num">STEP 2</span>
                  <strong>Dev Pairing Sessions:</strong> Pair directly with frontend engineers in daily standups.
                </div>
                <div class="track-step-node">
                  <span class="track-step-num">STEP 3</span>
                  <strong>Automated CI/CD Lint:</strong> Playwright visual regression + axe WCAG 2.1 AA accessibility checks.
                </div>
                <div class="track-step-node">
                  <span class="track-step-num">STEP 4</span>
                  <strong>Production Rollout:</strong> Bi-weekly canary deployment to customer staging rings.
                </div>
              </div>
            </div>
          </div>
        </div>
'''

target_ch02_str = 'Over 14 structured design thinking workshops, I used customer journey risk maps and live failure scenarios to align all stakeholders around a fundamental principle: <em>"Autonomy must be earned through mathematical certainty; human oversight is not friction, it is the product\'s primary enterprise value proposition."</em>\n          </p>\n        </div>\n      </section>'
if target_ch02_str in code:
    replacement_ch02 = target_ch02_str.replace('        </div>\n      </section>', '        </div>\n' + ch02_content + '      </section>')
    code = code.replace(target_ch02_str, replacement_ch02)
    print("✓ Chapter 02 enhanced with Whiteboard Sketch A and Dual-Track UCD Cadence.")
else:
    print("⚠️ Warning: target_ch02_str not found exactly; using fallback search.")
    ch02_end = code.find('      </section>\n\n      <!-- ====================================================================\n           CHAPTER 03: DUAL USER PERSONAS')
    if ch02_end != -1:
        code = code[:ch02_end] + ch02_content + code[ch02_end:]
        print("✓ Chapter 02 enhanced using fallback anchor.")

# -----------------------------------------------------------------------------
# 3. CHAPTER 04 INJECTION (Whiteboard Sketch B + The Design Manager's Method Kit)
# -----------------------------------------------------------------------------
ch04_content = '''
        <!-- Whiteboard Strategy Sketch B -->
        <div class="whiteboard-sketch-card">
          <div class="whiteboard-header">
            <span class="whiteboard-tag">🖊️ Systems Architecture Whiteboard &bull; Bangalore Design Lab</span>
            <span class="whiteboard-context">Gating Logic &amp; Human-in-the-Loop Handshake Architecture (Nov 2024)</span>
          </div>

          <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: #0F172A; margin-bottom: 8px;">
            The 3-Tier Confidence Handshake Architecture
          </h4>
          <p style="font-size: 13px; color: #475569; margin-bottom: 16px;">
            How the Watson Core agentic stack communicates certainty to the user interface, ensuring zero silent model mutations.
          </p>

          <div class="whiteboard-diagram-wrap">
            <svg viewBox="0 0 900 210" width="100%" height="auto" style="display: block; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px;">
              <!-- Node 1: Intent Input -->
              <rect x="25" y="75" width="150" height="60" rx="6" fill="#F8FAFC" stroke="#475569" stroke-width="1.5" />
              <text x="100" y="100" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#0F172A">INPUT INTENT</text>
              <text x="100" y="118" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#64748B">Prompt / Telemetry</text>

              <!-- Arrow 1 -->
              <line x1="175" y1="105" x2="225" y2="105" stroke="#0F62FE" stroke-width="2" />

              <!-- Node 2: Evaluator Engine -->
              <rect x="225" y="55" width="180" height="100" rx="8" fill="#EFF6FF" stroke="#0F62FE" stroke-width="2" />
              <text x="315" y="85" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#0F62FE">WATSON CONFIDENCE</text>
              <text x="315" y="103" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#0F62FE">EVALUATOR</text>
              <text x="315" y="125" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#3B82F6">Softmax Logit Scoring</text>

              <!-- Branches -->
              <!-- Top Branch: Tier 1 -->
              <path d="M 405 85 L 470 45 L 520 45" fill="none" stroke="#10B981" stroke-width="2" />
              <rect x="520" y="20" width="340" height="50" rx="6" fill="#F0FDF4" stroke="#10B981" stroke-width="1.5" />
              <text x="535" y="40" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#15803D">&ge;95% &rarr; TIER 1: AUTO-COMMIT &bull; IMMUTABLE LOG</text>
              <text x="535" y="57" font-family="Inter, sans-serif" font-size="10" fill="#166534">Direct execution with non-blocking toast &amp; 1-click instant revert</text>

              <!-- Middle Branch: Tier 2 -->
              <path d="M 405 105 L 520 105" fill="none" stroke="#F59E0B" stroke-width="2" />
              <rect x="520" y="80" width="340" height="50" rx="6" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1.5" />
              <text x="535" y="100" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#B45309">80-94% &rarr; TIER 2: MANDATORY DIFF DRAWER REVIEW</text>
              <text x="535" y="117" font-family="Inter, sans-serif" font-size="10" fill="#92400E">Side-by-side red/green code &amp; statechart diff before commit</text>

              <!-- Bottom Branch: Tier 3 -->
              <path d="M 405 125 L 470 165 L 520 165" fill="none" stroke="#EF4444" stroke-width="2" />
              <rect x="520" y="140" width="340" height="50" rx="6" fill="#FEF2F2" stroke="#EF4444" stroke-width="1.5" />
              <text x="535" y="160" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#B91C1C">&lt;80% &rarr; TIER 3: ZERO MUTATION &bull; HUMAN STEERING</text>
              <text x="535" y="177" font-family="Inter, sans-serif" font-size="10" fill="#991B1B">Trigger disambiguation modal; practitioner guides model logic</text>
            </svg>
          </div>
        </div>

        <!-- The Design Manager's Method Kit -->
        <div style="margin-top: 28px;">
          <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 6px;">
            🧰 The Design Manager's Method Kit: 3 Custom Frameworks Created for Scale
          </h3>
          <p style="font-size: 13.5px; color: var(--text-body); margin-bottom: 16px;">
            As a design leader, I create tangible tools and operational rubrics that empower teams to execute with consistency even when dealing with abstract AI complexity:
          </p>

          <div class="method-kit-grid">
            <!-- Tool 1 -->
            <div class="method-kit-card t1">
              <span class="method-kit-pill">Method Kit 01 &bull; Governance Rubric</span>
              <h4 class="method-kit-title">10-Point AI Heuristic Evaluation Rubric</h4>
              <p style="font-size: 12.5px; color: var(--text-body); line-height: 1.5;">
                A specialized heuristic scorecard adapted from Nielsen Norman for agentic AI workflows, mandated before any design enters dev staging:
              </p>
              <ul class="method-kit-list">
                <li><strong>Provenance Clarity:</strong> Can the user trace source tokens in &le;2 clicks?</li>
                <li><strong>Blast-Radius Visibility:</strong> Is the fleet/system impact quantified upfront?</li>
                <li><strong>Reversibility Sentinel:</strong> Is 1-click undo state preserved in memory?</li>
                <li><strong>Hallucination Tripline:</strong> Does the UI fail gracefully if confidence drops?</li>
              </ul>
            </div>

            <!-- Tool 2 -->
            <div class="method-kit-card t2">
              <span class="method-kit-pill">Method Kit 02 &bull; Intake Canvas</span>
              <h4 class="method-kit-title">1-Page AI Product UX Briefing Canvas</h4>
              <p style="font-size: 12.5px; color: var(--text-body); line-height: 1.5;">
                A shared contractual canvas co-signed by PM, Eng Lead, and Design Lead before sprint kickoff to eliminate scope thrash:
              </p>
              <ul class="method-kit-list">
                <li><strong>Model Capability Boundaries:</strong> What can Watson reliably do vs not do?</li>
                <li><strong>Human Intervention Triggers:</strong> Exact confidence tripwires for Tiers 1-3.</li>
                <li><strong>Regulatory Gate:</strong> DO-178C or CVE audit logging requirements.</li>
                <li><strong>Target Task Efficiency:</strong> Maximum acceptable operator verification time.</li>
              </ul>
            </div>

            <!-- Tool 3 -->
            <div class="method-kit-card t3">
              <span class="method-kit-pill">Method Kit 03 &bull; Talent Ladder</span>
              <h4 class="method-kit-title">Designer AI Growth &amp; 1:1 Coaching Matrix</h4>
              <p style="font-size: 12.5px; color: var(--text-body); line-height: 1.5;">
                The 4-stage talent elevation ladder I used during bi-weekly 1:1s to upskill 14 traditional UI designers into Agentic UX architects:
              </p>
              <ul class="method-kit-list">
                <li><strong>Stage 1 (Craft):</strong> Carbon token mastery &amp; statechart drawing.</li>
                <li><strong>Stage 2 (Logic):</strong> Designing multi-turn conversational error states.</li>
                <li><strong>Stage 3 (Agentic):</strong> Prompt chaining &amp; non-deterministic UI states.</li>
                <li><strong>Stage 4 (Strategy):</strong> Presenting AI governance to enterprise C-suite.</li>
              </ul>
            </div>
          </div>
        </div>
'''

ch04_end = code.find('      </section>\n\n      <!-- ====================================================================\n           CHAPTER 05: MANAGING DESIGNERS')
if ch04_end != -1:
    code = code[:ch04_end] + ch04_content + code[ch04_end:]
    print("✓ Chapter 04 enhanced with Whiteboard Sketch B and Method Kit.")

# -----------------------------------------------------------------------------
# 4. CHAPTER 05 INJECTION (Squad Attribution) & CHAPTER 05B (Manager Spreadsheets)
# -----------------------------------------------------------------------------
attribution_content = '''
        <!-- Squad Attribution & Leadership Role Clarity -->
        <div class="attribution-container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: #FFFFFF;">
              👥 Squad Attribution &amp; Front-Line Managerial Role Clarity
            </h3>
            <span class="sheet-meta-badge">Leadership Accountability</span>
          </div>
          <p style="font-size: 13px; color: #94A3B8; margin-top: 6px;">
            Great design managers clearly distinguish their strategic and architectural steering from the tactical craft of their team, giving immense credit to the squad:
          </p>

          <div class="attribution-grid">
            <div class="attribution-col lead">
              <h4 class="attribution-title">👔 My Front-Line Leadership Role</h4>
              <ul class="attribution-list">
                <li>• Led 24 in-situ field research sessions and framed the "Verification Fatigue" insight.</li>
                <li>• Conceived and formulated the 3-Tier Confidence Routing Engine mathematical thresholds.</li>
                <li>• Facilitated 14 cross-functional alignment workshops between Watson Research, PM, and CCO.</li>
                <li>• Engineered the centralized UX-as-a-Service team re-org and weekly 1:1 coaching.</li>
                <li>• Defended design architectures at the Executive SteerCo and defended FAA audit compliance.</li>
              </ul>
            </div>

            <div class="attribution-col squad">
              <h4 class="attribution-title">🎨 Squad Craft Attribution &amp; Praise</h4>
              <ul class="attribution-list">
                <li>• <strong>Rhapsody Pod Designers:</strong> Crafted the pixel-perfect SysML diagram nodes, port connectors, and side-by-side model diff drawer component variations.</li>
                <li>• <strong>MaaS360 Pod Designers:</strong> Designed the high-density fleet quarantine telemetry tables, alert filtering chips, and canary staging modal.</li>
                <li>• <strong>DesignOps Engineers:</strong> Built the GitHub Actions CI/CD token compiler, Style Dictionary build scripts, and automated axe WCAG linting.</li>
                <li>• <strong>Watson Research Scientists:</strong> Exposed probability APIs and fine-tuned prompt embeddings for DO-178C avionics syntax.</li>
              </ul>
            </div>
          </div>
        </div>
'''

ch05b_content = '''
      <!-- ====================================================================
           CHAPTER 05B: THE BUSINESS GEEK\'S SPREADSHEETS & OKR TRACKER
           ==================================================================== -->
      <section class="section-block" id="sec-sheets">
        <div class="story-chapter-badge">Chapter 05B &bull; Business Operations &amp; Data Leadership</div>
        <h2 class="section-title-h2">Pulling Out the Sheets: Prioritization Engine, Customer OKRs &amp; Interview Taxonomy</h2>
        <div class="section-prose">
          <p>
            Many people assume design managers live exclusively in Figma. The reality of enterprise product leadership is that our most high-leverage battles are won inside spreadsheets. To align 14 Designers, 4 engineering squads, and 3 product directors, I built and managed through these interactive operational sheets:
          </p>
        </div>

        <!-- Interactive Manager Spreadsheet Component -->
        <div class="manager-sheet-container">
          <!-- Green Excel Title Header -->
          <div class="sheet-header-bar">
            <div class="sheet-title-text">
              <span>📊 IBM_Watson_AI_UX_Executive_Prioritization_Workbook.xlsx</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <span class="sheet-meta-badge">CONFIDENTIAL &bull; IBM ISL</span>
              <span class="sheet-meta-badge">Q3&ndash;Q4 Live Master</span>
            </div>
          </div>

          <!-- Workbook Tabs Strip -->
          <div class="sheet-tabs-bar" role="tablist">
            <button class="sheet-tab-button active" id="sheet-tab-btn-rice" onclick="switchSheetTab('rice')">
              📑 Tab 1: Feature Prioritization (RICE + UX Debt)
            </button>
            <button class="sheet-tab-button" id="sheet-tab-btn-okr" onclick="switchSheetTab('okr')">
              🎯 Tab 2: Customer-Centered OKR Dashboard
            </button>
            <button class="sheet-tab-button" id="sheet-tab-btn-interviews" onclick="switchSheetTab('interviews')">
              🎙️ Tab 3: Contextual Interview Taxonomy (N=24)
            </button>
          </div>

          <!-- Formula Bar -->
          <div class="sheet-formula-bar" id="sheet-fx-bar">
            <span class="formula-label">fx</span>
            <span id="sheet-fx-text" style="font-family: var(--font-code);">= (REACH * IMPACT * CONFIDENCE) / DEV_EFFORT_SPRINTS * (1 + UX_DEBT_WEIGHT)</span>
          </div>

          <!-- TAB 1: RICE Prioritization Table -->
          <div class="sheet-content-pane active" id="sheet-pane-rice">
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <span style="font-size: 12px; color: #64748B;">
                Scoring 38 enterprise feature candidates across Rhapsody SE and MaaS360 squads to dictate sprint allocation:
              </span>
              <span class="sheet-score-pill score-p1">Sorted by Priority Rank (WSJF/RICE)</span>
            </div>

            <div class="table-responsive-wrapper">
              <table class="sheet-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Feature / Architecture Epic</th>
                    <th>Pod</th>
                    <th>Reach</th>
                    <th>Impact</th>
                    <th>Conf.</th>
                    <th>Effort</th>
                    <th>UX Debt</th>
                    <th>RICE Score</th>
                    <th>Tier Route</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>#01</strong></td>
                    <td><strong>Side-by-Side Model Diff Drawer</strong> (Visual Statechart delta)</td>
                    <td>Rhapsody SE</td>
                    <td>10 / 10</td>
                    <td>5.0 (Critical)</td>
                    <td>95%</td>
                    <td>2 Sprints</td>
                    <td>1.8 (Severe)</td>
                    <td><span class="sheet-score-pill score-p1">665.0</span></td>
                    <td>Tier 2 (Diff)</td>
                    <td><span class="margin-pill margin-pass">Shipped</span></td>
                  </tr>
                  <tr>
                    <td><strong>#02</strong></td>
                    <td><strong>Proactive Fleet Zero-Day Blast Quarantine</strong> (One-Click)</td>
                    <td>MaaS360</td>
                    <td>10 / 10</td>
                    <td>5.0 (Critical)</td>
                    <td>90%</td>
                    <td>2 Sprints</td>
                    <td>1.6 (High)</td>
                    <td><span class="sheet-score-pill score-p1">585.0</span></td>
                    <td>Tier 2 (Canary)</td>
                    <td><span class="margin-pill margin-pass">Shipped</span></td>
                  </tr>
                  <tr>
                    <td><strong>#03</strong></td>
                    <td><strong>3-Tier Mathematical Confidence Gating Engine</strong> (Core logic)</td>
                    <td>Watson IA</td>
                    <td>10 / 10</td>
                    <td>4.5 (High)</td>
                    <td>95%</td>
                    <td>3 Sprints</td>
                    <td>1.4 (Med)</td>
                    <td><span class="sheet-score-pill score-p1">342.0</span></td>
                    <td>All Tiers</td>
                    <td><span class="margin-pill margin-pass">Shipped</span></td>
                  </tr>
                  <tr>
                    <td><strong>#04</strong></td>
                    <td><strong>DO-178C Bidirectional Requirement Traceability Ledger</strong></td>
                    <td>Rhapsody SE</td>
                    <td>8 / 10</td>
                    <td>4.5 (High)</td>
                    <td>90%</td>
                    <td>3 Sprints</td>
                    <td>1.5 (High)</td>
                    <td><span class="sheet-score-pill score-p2">270.0</span></td>
                    <td>Tier 1 (Audit)</td>
                    <td><span class="margin-pill margin-pass">Shipped</span></td>
                  </tr>
                  <tr>
                    <td><strong>#05</strong></td>
                    <td><strong>Multi-Squad Token Pipeline CI/CD Automation</strong></td>
                    <td>DesignOps</td>
                    <td>10 / 10</td>
                    <td>4.0 (High)</td>
                    <td>95%</td>
                    <td>4 Sprints</td>
                    <td>1.7 (High)</td>
                    <td><span class="sheet-score-pill score-p2">256.5</span></td>
                    <td>Tokens</td>
                    <td><span class="margin-pill margin-pass">Shipped</span></td>
                  </tr>
                  <tr>
                    <td><strong>#06</strong></td>
                    <td><strong>Canary Staging Sentinel Watcher with Automated Rollback</strong></td>
                    <td>MaaS360</td>
                    <td>9 / 10</td>
                    <td>4.0 (High)</td>
                    <td>85%</td>
                    <td>3 Sprints</td>
                    <td>1.2 (Med)</td>
                    <td><span class="sheet-score-pill score-p2">224.4</span></td>
                    <td>Tier 2</td>
                    <td><span class="margin-pill margin-pass">Shipped</span></td>
                  </tr>
                  <tr>
                    <td><strong>#07</strong></td>
                    <td><strong>Natural Language SysML Block Generator</strong> (Core prompt)</td>
                    <td>Rhapsody SE</td>
                    <td>7 / 10</td>
                    <td>3.5 (Med)</td>
                    <td>80%</td>
                    <td>4 Sprints</td>
                    <td>0.8 (Low)</td>
                    <td><span class="sheet-score-pill score-p3">88.2</span></td>
                    <td>Tier 3</td>
                    <td><span class="margin-pill margin-pass">Shipped</span></td>
                  </tr>
                  <tr>
                    <td><strong>#08</strong></td>
                    <td><strong>Consumer Free-Form AI Chatbot Floating Window</strong></td>
                    <td>Consumer</td>
                    <td>4 / 10</td>
                    <td>1.5 (Low)</td>
                    <td>50%</td>
                    <td>5 Sprints</td>
                    <td>0.2 (None)</td>
                    <td><span class="sheet-score-pill score-p3" style="background:#FEE2E2; color:#991B1B;">7.2</span></td>
                    <td>Rejected</td>
                    <td><span class="margin-pill" style="background:#FEE2E2; color:#991B1B;">Deprioritized</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB 2: Customer-Centered OKR Dashboard -->
          <div class="sheet-content-pane" id="sheet-pane-okr">
            <div style="margin-bottom: 14px;">
              <span style="font-size: 12.5px; color: #64748B;">
                Tracking customer-centered Objectives &amp; Key Results (OKRs) committed to Product Directors and VP Engineering:
              </span>
            </div>

            <div class="okr-cards-grid">
              <div class="okr-card">
                <span class="okr-tag">OKR 01 &bull; Avionics Modeling Efficiency</span>
                <h4 class="okr-title">Cut Rhapsody SE DO-178C requirement tracing verification time by &gt;70%</h4>
                <div class="okr-bar-track">
                  <div class="okr-bar-fill" style="width: 94%;"></div>
                </div>
                <div class="okr-meta-row">
                  <span>Baseline: 4.2 hrs &rarr; Target: 1.2 hrs</span>
                  <span style="color: #10B981; font-weight: 700;">Actual: 1.1 hrs (74% drop &bull; Exceeded)</span>
                </div>
              </div>

              <div class="okr-card">
                <span class="okr-tag">OKR 02 &bull; SecOps Alert Fatigue</span>
                <h4 class="okr-title">Reduce Tier-2 SecOps false-positive triage time on 100k+ endpoints by &gt;75%</h4>
                <div class="okr-bar-track">
                  <div class="okr-bar-fill" style="width: 100%;"></div>
                </div>
                <div class="okr-meta-row">
                  <span>Baseline: 38 min &rarr; Target: 10 min</span>
                  <span style="color: #10B981; font-weight: 700;">Actual: 6.8 min (82% drop &bull; Exceeded)</span>
                </div>
              </div>

              <div class="okr-card">
                <span class="okr-tag">OKR 03 &bull; Usability Benchmark</span>
                <h4 class="okr-title">Elevate enterprise practitioner SUS benchmark from poor (&lt;65) to Grade A (&gt;85)</h4>
                <div class="okr-bar-track">
                  <div class="okr-bar-fill" style="width: 100%;"></div>
                </div>
                <div class="okr-meta-row">
                  <span>Baseline: 61.4 SUS &rarr; Target: 85.0</span>
                  <span style="color: #10B981; font-weight: 700;">Actual: 89.4 SUS (+28 pts &bull; Exceeded)</span>
                </div>
              </div>

              <div class="okr-card">
                <span class="okr-tag">OKR 04 &bull; DesignOps Velocity</span>
                <h4 class="okr-title">Accelerate multi-squad Carbon token sync from Figma to production repos</h4>
                <div class="okr-bar-track">
                  <div class="okr-bar-fill" style="width: 100%;"></div>
                </div>
                <div class="okr-meta-row">
                  <span>Baseline: 28 days manual PR &rarr; Target: &lt;24 hrs</span>
                  <span style="color: #10B981; font-weight: 700;">Actual: 18 min automated CI/CD (100%)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: Qualitative Interview Repository -->
          <div class="sheet-content-pane" id="sheet-pane-interviews">
            <div style="margin-bottom: 12px;">
              <span style="font-size: 12px; color: #64748B;">
                Excerpt from the qualitative interview database (24 practitioners across 4 sites) tagged by severity and design action:
              </span>
            </div>

            <div class="table-responsive-wrapper">
              <table class="sheet-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Participant Role</th>
                    <th>Domain Site</th>
                    <th>Primary Pain Tag</th>
                    <th>Severity</th>
                    <th>Direct Verbatim Quote</th>
                    <th>Design Action Taken</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>P-01</td>
                    <td>Lead Avionics Systems Architect</td>
                    <td>Dallas Defense Prime</td>
                    <td>Verification Fatigue</td>
                    <td><span class="sheet-score-pill" style="background:#FEE2E2; color:#991B1B;">Critical</span></td>
                    <td><em>"If the AI writes 200 lines of state machine, I spend twice as long verifying it as I would drawing it."</em></td>
                    <td>Designed Side-by-Side Model Diff Drawer</td>
                  </tr>
                  <tr>
                    <td>P-04</td>
                    <td>Principal Safety Certifier</td>
                    <td>Toulouse Aerospace</td>
                    <td>DO-178C Non-Compliance</td>
                    <td><span class="sheet-score-pill" style="background:#FEE2E2; color:#991B1B;">Critical</span></td>
                    <td><em>"I need to know which text requirement generated each SysML block. No provenance = failed audit."</em></td>
                    <td>Added Requirement Link Token chips to drawer</td>
                  </tr>
                  <tr>
                    <td>P-09</td>
                    <td>Tier-2 SecOps Incident Lead</td>
                    <td>Frankfurt FinTech SOC</td>
                    <td>Alert Paralyzation</td>
                    <td><span class="sheet-score-pill" style="background:#FEF3C7; color:#92400E;">High</span></td>
                    <td><em>"Every alert looks identical. I don't know if this RPC buffer overflow affects 5 laptops or 50,000."</em></td>
                    <td>Engineered Blast-Radius Scope Bar in MaaS360</td>
                  </tr>
                  <tr>
                    <td>P-14</td>
                    <td>Global CISO Administrator</td>
                    <td>New York Healthcare</td>
                    <td>Fear of Fleet Outage</td>
                    <td><span class="sheet-score-pill" style="background:#FEE2E2; color:#991B1B;">Critical</span></td>
                    <td><em>"I'm terrified of pushing an automated patch that bluescreens nurses' tablets in intensive care."</em></td>
                    <td>Built Canary Staging Sentinel (500 device pilot)</td>
                  </tr>
                  <tr>
                    <td>P-18</td>
                    <td>Automotive ASIL-D Modeler</td>
                    <td>Munich Autonomous EV</td>
                    <td>Black-Box Mistrust</td>
                    <td><span class="sheet-score-pill" style="background:#FEF3C7; color:#92400E;">High</span></td>
                    <td><em>"Why does Watson think this braking signal is 94%? What rules did it evaluate?"</em></td>
                    <td>Added Expandable Reasoning Trace Inspector</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
'''

ch05_end = code.find('      </section>\n\n      <!-- ====================================================================\n           CHAPTER 06: 3-ROUND USABILITY TESTING')
if ch05_end != -1:
    code = code[:ch05_end] + attribution_content + '      </section>\n\n' + ch05b_content + code[ch05_end + len('      </section>\n\n'):]
    print("✓ Chapter 05 enhanced with Squad Attribution, and Chapter 05B injected with Manager Spreadsheets.")

# -----------------------------------------------------------------------------
# 5. JAVASCRIPT INJECTION (switchSheetTab)
# -----------------------------------------------------------------------------
js_content = '''    // Tabbed Spreadsheet Switcher
    function switchSheetTab(tabId) {
      document.querySelectorAll('.sheet-tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.sheet-content-pane').forEach(pane => pane.classList.remove('active'));
      
      const btn = document.getElementById('sheet-tab-btn-' + tabId);
      const pane = document.getElementById('sheet-pane-' + tabId);
      const fx = document.getElementById('sheet-fx-text');

      if (btn) btn.classList.add('active');
      if (pane) pane.classList.add('active');

      if (fx) {
        if (tabId === 'rice') {
          fx.innerText = '= (REACH * IMPACT * CONFIDENCE) / DEV_EFFORT_SPRINTS * (1 + UX_DEBT_WEIGHT)';
        } else if (tabId === 'okr') {
          fx.innerText = '= SUMPRODUCT(OKR_TARGETS, ACTUAL_DELIVERIES) / TOTAL_STRATEGIC_WEIGHT';
        } else if (tabId === 'interviews') {
          fx.innerText = '= VLOOKUP(PARTICIPANT_ID, FIELD_OBSERVATIONS_DB, VERBATIM_QUOTE, FALSE)';
        }
      }
    }

'''

js_target = '    let currentWatsonMode = \'rhapsody\';'
if js_target in code:
    code = code.replace(js_target, js_content + js_target)
    print("✓ JavaScript switchSheetTab injected.")

with open('compile_ibm_watson_story.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("=== Successfully updated compile_ibm_watson_story.js! ===")
