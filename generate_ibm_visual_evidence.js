// generate_ibm_visual_evidence.js
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.join(__dirname, 'screenshots');

const rhapsodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Overpass:wght@600;700;800;900&display=swap">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1440px;
      height: 900px;
      background: #0f141c;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    /* Window Chrome */
    .win-bar {
      height: 38px;
      background: #0a0d14;
      border-bottom: 1px solid #1e293b;
      display: flex;
      align-items: center;
      padding: 0 16px;
      justify-content: space-between;
    }
    .win-dots { display: flex; gap: 8px; }
    .win-dot { width: 11px; height: 11px; border-radius: 50%; }
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #f59e0b; }
    .dot-green { background: #10b981; }
    .win-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .win-badge {
      background: rgba(15, 98, 254, 0.2);
      color: #78a9ff;
      border: 1px solid #0f62fe;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 700;
    }
    .win-actions { display: flex; gap: 12px; font-size: 11px; color: #64748b; }

    /* Main IDE Layout */
    .ide-body {
      flex: 1;
      display: grid;
      grid-template-columns: 240px 1fr 380px;
      background: #0c1017;
    }

    /* Left Nav / Tree */
    .ide-tree {
      background: #0d121a;
      border-right: 1px solid #1e293b;
      display: flex;
      flex-direction: column;
    }
    .tree-header {
      padding: 12px 14px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      border-bottom: 1px solid #1e293b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tree-item {
      padding: 8px 14px;
      font-size: 12px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .tree-item.active {
      background: rgba(15, 98, 254, 0.15);
      color: #ffffff;
      border-left: 2px solid #0f62fe;
      font-weight: 600;
    }
    .tree-sub {
      padding-left: 28px;
    }
    .tree-badge {
      margin-left: auto;
      font-size: 10px;
      background: #1e293b;
      padding: 1px 6px;
      border-radius: 3px;
      color: #cbd5e1;
    }

    /* Center Canvas */
    .ide-canvas-area {
      display: flex;
      flex-direction: column;
      background: #0f141c;
      position: relative;
    }
    .canvas-tabs {
      height: 36px;
      background: #0a0d14;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #1e293b;
      padding: 0 8px;
      gap: 4px;
    }
    .canvas-tab {
      padding: 6px 14px;
      font-size: 11.5px;
      color: #64748b;
      background: #0f141c;
      border: 1px solid transparent;
      border-top: 2px solid transparent;
      border-radius: 4px 4px 0 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .canvas-tab.active {
      color: #ffffff;
      background: #131a24;
      border-color: #1e293b #1e293b transparent #1e293b;
      border-top: 2px solid #0f62fe;
    }
    .canvas-toolbar {
      height: 40px;
      background: #131a24;
      border-bottom: 1px solid #1e293b;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 16px;
      font-size: 11px;
      color: #94a3b8;
    }
    .toolbar-chip {
      background: #1e293b;
      padding: 4px 10px;
      border-radius: 4px;
      color: #e2e8f0;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .canvas-stage {
      flex: 1;
      padding: 24px;
      background-image: radial-gradient(#1e293b 1px, transparent 1px);
      background-size: 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
      overflow: hidden;
    }

    /* SysML Diagram Nodes */
    .sysml-block-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .sysml-card {
      background: #161e2e;
      border: 1px solid #334155;
      border-radius: 6px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      overflow: hidden;
    }
    .sysml-card-head {
      background: #1e293b;
      padding: 8px 12px;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      color: #94a3b8;
      border-bottom: 1px solid #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sysml-card-title {
      font-weight: 700;
      color: #ffffff;
      font-size: 13px;
    }
    .sysml-card-body {
      padding: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      color: #cbd5e1;
    }
    .sysml-prop {
      display: flex;
      justify-content: space-between;
      padding: 2px 0;
      border-bottom: 1px dashed rgba(255,255,255,0.06);
    }
    .sysml-card.modified {
      border: 1px solid #10b981;
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.2);
    }
    .sysml-card.modified .sysml-card-head {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-color: #10b981;
    }

    /* Live Diff Floating Drawer */
    .diff-drawer {
      position: absolute;
      bottom: 20px;
      left: 24px;
      right: 24px;
      background: #0d121a;
      border: 1px solid #3b82f6;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 16px 36px rgba(0,0,0,0.6);
    }
    .diff-drawer-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .diff-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #60a5fa;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .diff-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      background: #0a0d14;
      padding: 12px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
    }
    .diff-col.before {
      border-right: 1px solid #1e293b;
      padding-right: 12px;
      color: #f87171;
    }
    .diff-col.after {
      padding-left: 4px;
      color: #34d399;
    }

    /* Right AI Panel */
    .ide-ai-panel {
      background: #0d121a;
      border-left: 1px solid #1e293b;
      display: flex;
      flex-direction: column;
    }
    .ai-panel-header {
      padding: 14px 16px;
      background: #111827;
      border-bottom: 1px solid #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ai-logo-box {
      width: 28px;
      height: 28px;
      background: #0f62fe;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 900;
      color: #ffffff;
    }
    .ai-title {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
    }
    .ai-sub {
      font-size: 10.5px;
      color: #64748b;
    }
    .ai-chat-body {
      flex: 1;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      overflow-y: auto;
    }
    .chat-bubble-user {
      background: #1e293b;
      border: 1px solid #334155;
      padding: 12px;
      border-radius: 8px 8px 2px 8px;
      font-size: 12px;
      line-height: 1.5;
      color: #e2e8f0;
    }
    .chat-bubble-ai {
      background: rgba(15, 98, 254, 0.08);
      border: 1px solid rgba(15, 98, 254, 0.3);
      padding: 14px;
      border-radius: 8px 8px 8px 2px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .ai-confidence-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid #10b981;
      color: #34d399;
      padding: 3px 8px;
      border-radius: 100px;
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      width: fit-content;
    }
    .agent-steps-mini {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: #0b0f17;
      padding: 10px;
      border-radius: 6px;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
    }
    .agent-step-row {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #94a3b8;
    }
    .agent-step-row.done { color: #34d399; }
    .ai-action-btn {
      background: #0f62fe;
      color: #ffffff;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
  </style>
</head>
<body>
  <div class="win-bar">
    <div class="win-dots">
      <div class="win-dot dot-red"></div>
      <div class="win-dot dot-yellow"></div>
      <div class="win-dot dot-green"></div>
    </div>
    <div class="win-title">
      <span>IBM Engineering Systems Design Rhapsody SE &bull; FlightControl_DO178C.sysml</span>
      <span class="win-badge">WATSON AI ACTIVE</span>
    </div>
    <div class="win-actions">
      <span>Branch: feature/avionics-actuator-mesh</span>
      <span>SysML v2.0</span>
      <span>DO-178C Level A</span>
    </div>
  </div>

  <div class="ide-body">
    <!-- Left Model Explorer -->
    <div class="ide-tree">
      <div class="tree-header">
        <span>Model Explorer</span>
        <span>SysML Tree</span>
      </div>
      <div class="tree-item">📦 FlightControlPkg</div>
      <div class="tree-item tree-sub">📄 Requirements Matrix <span class="tree-badge">42</span></div>
      <div class="tree-item tree-sub">⚡ PowerDistribution [bdd]</div>
      <div class="tree-item tree-sub active">✈️ PrimaryFlightActuator [stm] <span class="tree-badge">AI Modified</span></div>
      <div class="tree-item tree-sub">🛡️ RedundantSensorMesh [ibd]</div>
      <div class="tree-item tree-sub">⚙️ HydraulicValveInterface</div>
      <div class="tree-header" style="margin-top: auto;">
        <span>Compliance Matrix</span>
        <span>DO-178C</span>
      </div>
      <div class="tree-item" style="color: #34d399;">✓ 100% Traceability Bound</div>
      <div class="tree-item" style="color: #34d399;">✓ Zero Orphan Ports</div>
    </div>

    <!-- Center Canvas Stage -->
    <div class="ide-canvas-area">
      <div class="canvas-tabs">
        <div class="canvas-tab">Requirements Matrix</div>
        <div class="canvas-tab active">PrimaryFlightActuator [Statechart Diagram]</div>
        <div class="canvas-tab">HydraulicSafety [BDD]</div>
      </div>
      <div class="canvas-toolbar">
        <div class="toolbar-chip">🔍 Zoom: 100%</div>
        <div class="toolbar-chip">📐 Layout: Orthogonal SysML</div>
        <div class="toolbar-chip" style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399;">
          🛡️ Mathematical Verification: 0 Violations
        </div>
      </div>

      <div class="canvas-stage">
        <div class="sysml-block-grid">
          <!-- Card 1 -->
          <div class="sysml-card">
            <div class="sysml-card-head">
              <span>«block»</span>
              <span>SysML::Block</span>
            </div>
            <div class="sysml-card-body">
              <div class="sysml-card-title">SensorsController</div>
              <div class="sysml-prop"><span>+ gyroRate: rad/s</span><span>[1..3]</span></div>
              <div class="sysml-prop"><span>+ pitchAngle: deg</span><span>float</span></div>
              <div class="sysml-prop"><span>+ sampleClock: ms</span><span>10ms</span></div>
            </div>
          </div>

          <!-- Card 2 (Watson AI Modified) -->
          <div class="sysml-card modified">
            <div class="sysml-card-head">
              <span>«statechart» Watson AI Synthesized</span>
              <span style="color: #34d399;">Confidence: 96.8%</span>
            </div>
            <div class="sysml-card-body">
              <div class="sysml-card-title">DualActuatorStateMesh</div>
              <div class="sysml-prop"><span>state: StandbyInit</span><span>entry/calibrate()</span></div>
              <div class="sysml-prop"><span>state: NormalClosedLoop</span><span>do/servoTrim()</span></div>
              <div class="sysml-prop" style="color: #34d399;"><span>state: AutoDegradeSafeMode</span><span>AI Guard Added</span></div>
              <div class="sysml-prop"><span>transition: FaultDelta &gt; 5%</span><span>target: SecondaryHydraulic</span></div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="sysml-card">
            <div class="sysml-card-head">
              <span>«block»</span>
              <span>SysML::Block</span>
            </div>
            <div class="sysml-card-body">
              <div class="sysml-card-title">TelemetryTelemetrySink</div>
              <div class="sysml-prop"><span>+ arinc429Port</span><span>TxBus</span></div>
              <div class="sysml-prop"><span>+ soxAuditLog</span><span>CryptoHash</span></div>
              <div class="sysml-prop"><span>+ failoverClock</span><span>50us</span></div>
            </div>
          </div>
        </div>

        <!-- Supervised Side-by-Side Model Diff Drawer -->
        <div class="diff-drawer">
          <div class="diff-drawer-head">
            <div class="diff-tag">
              <span>⚖️ WATSON SIDE-BY-SIDE MODEL DIFF</span>
              <span style="color: #94a3b8; font-weight: normal;">| Reviewing Changes to DO-178C Actuator Recovery State Machine</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="ai-action-btn" style="background: #1e293b; color: #94a3b8;">Discard AI Delta</button>
              <button class="ai-action-btn" style="background: #10b981;">Approve &amp; Commit to SysML Model &rarr;</button>
            </div>
          </div>
          <div class="diff-cols">
            <div class="diff-col before">
              <div style="font-weight: 700; margin-bottom: 4px; color: #f87171;">- Legacy Manual Implementation (14h drafting):</div>
              <div>- single_channel_failure: halts system into unmonitored hard freeze</div>
              <div>- no requirement link to REQ-AV-8924 (fault tolerance under turbulence)</div>
              <div>- manual verification required 6 engineering sign-offs</div>
            </div>
            <div class="diff-col after">
              <div style="font-weight: 700; margin-bottom: 4px; color: #34d399;">+ Watson AI Generated Architecture (3.6h synthesis):</div>
              <div>+ state: AutoDegradeSafeMode gracefully transfers load to secondary servo</div>
              <div>+ 100% automated traceability bound to REQ-AV-8924 with mathematical proof</div>
              <div>+ cryptographic reasoning hash generated: 0x9f4a12.. verified DO-178C Level A</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Watson AI Copilot Panel -->
    <div class="ide-ai-panel">
      <div class="ai-panel-header">
        <div class="ai-logo-box">W</div>
        <div>
          <div class="ai-title">IBM Watson Copilot</div>
          <div class="ai-sub">Agentic Systems Modeling Assistant</div>
        </div>
      </div>
      <div class="ai-chat-body">
        <div class="chat-bubble-user">
          <strong>Elena Vance (Lead Systems Architect):</strong><br>
          "Synthesize a fault-tolerant SysML statechart for the primary flight actuator conforming to DO-178C Level A requirements. Ensure graceful degradation to secondary hydraulic bus on sensor loss."
        </div>

        <div class="chat-bubble-ai">
          <div class="ai-confidence-pill">✓ 96.8% CONFIDENCE &bull; TIER 1 MATCH</div>
          <p style="font-size: 12px; color: #e2e8f0; line-height: 1.5;">
            Decomposed natural language requirements into 3 SysML structural blocks and 4 deterministic transition states.
          </p>

          <div class="agent-steps-mini">
            <div class="agent-step-row done">✓ Agent 01: Requirement Parser (DO-178C)</div>
            <div class="agent-step-row done">✓ Agent 02: SysML Statechart Synthesizer</div>
            <div class="agent-step-row done">✓ Agent 03: Safety Guardrail Verifier (Formal)</div>
          </div>

          <div style="font-size: 11px; color: #94a3b8; font-family: 'JetBrains Mono', monospace; background: #0a0d14; padding: 8px; border-radius: 4px;">
            Generated: <strong>DualActuatorStateMesh</strong><br>
            Traceability: REQ-AV-8924, REQ-SAF-104<br>
            Status: Supervised Diff Drawer Opened
          </div>

          <button class="ai-action-btn">
            Accept SysML Delta &amp; Commit
          </button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

const maas360Html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Overpass:wght@600;700;800;900&display=swap">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1440px;
      height: 900px;
      background: #0f141c;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .win-bar {
      height: 38px;
      background: #0a0d14;
      border-bottom: 1px solid #1e293b;
      display: flex;
      align-items: center;
      padding: 0 16px;
      justify-content: space-between;
    }
    .win-dots { display: flex; gap: 8px; }
    .win-dot { width: 11px; height: 11px; border-radius: 50%; }
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #f59e0b; }
    .dot-green { background: #10b981; }
    .win-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .win-badge {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid #10b981;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 700;
    }

    /* Top KPI Bar */
    .kpi-bar {
      height: 80px;
      background: #111827;
      border-bottom: 1px solid #1e293b;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 0 24px;
      align-items: center;
      gap: 24px;
    }
    .kpi-card {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .kpi-label {
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .kpi-val {
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .kpi-sub {
      font-size: 11px;
      color: #10b981;
      font-weight: 600;
    }

    /* Main Console Grid */
    .console-body {
      flex: 1;
      display: grid;
      grid-template-columns: 280px 1fr 400px;
      background: #0c1017;
    }

    /* Left Fleet Selector */
    .fleet-nav {
      background: #0d121a;
      border-right: 1px solid #1e293b;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .fleet-item {
      padding: 10px 14px;
      background: #131a24;
      border: 1px solid #1e293b;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
    }
    .fleet-item.active {
      border-color: #0f62fe;
      background: rgba(15, 98, 254, 0.1);
    }
    .fleet-item-head {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;
    }
    .fleet-item-meta {
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      color: #94a3b8;
    }

    /* Center Main Remediation Console */
    .remedy-center {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background: #0f141c;
      overflow-y: auto;
    }
    .alert-banner {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid #ef4444;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .alert-info h4 {
      font-size: 14px;
      color: #fca5a5;
      margin-bottom: 4px;
    }
    .alert-info p {
      font-size: 12px;
      color: #cbd5e1;
    }

    /* Agent Mesh Visualization */
    .mesh-box {
      background: #131a24;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 20px;
    }
    .mesh-title {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .agent-cards-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .agent-card {
      background: #0d121a;
      border: 1px solid #334155;
      border-radius: 6px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .agent-card.active-mesh {
      border-color: #10b981;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
    }
    .agent-card-head {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      color: #94a3b8;
    }
    .agent-card-name {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
    }
    .agent-card-status {
      font-size: 11px;
      color: #34d399;
      font-family: 'JetBrains Mono', monospace;
    }

    /* Right Approval & Sandbox Drawer */
    .remedy-right {
      background: #0d121a;
      border-left: 1px solid #1e293b;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .approval-card {
      background: #131a24;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .approval-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .approval-badge {
      background: rgba(245, 158, 11, 0.2);
      border: 1px solid #f59e0b;
      color: #fbbf24;
      padding: 2px 8px;
      border-radius: 100px;
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
    }
    .diff-box-mini {
      background: #0a0d14;
      border: 1px solid #1e293b;
      border-radius: 6px;
      padding: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      line-height: 1.6;
    }
    .diff-del { color: #f87171; }
    .diff-add { color: #34d399; }
    .approve-btn {
      background: #0f62fe;
      color: #ffffff;
      border: none;
      padding: 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(15, 98, 254, 0.4);
    }
  </style>
</head>
<body>
  <div class="win-bar">
    <div class="win-dots">
      <div class="win-dot dot-red"></div>
      <div class="win-dot dot-yellow"></div>
      <div class="win-dot dot-green"></div>
    </div>
    <div class="win-title">
      <span>IBM MaaS360 Enterprise &bull; Proactive Endpoint Security Cockpit</span>
      <span class="win-badge">WATSON ZERO-DAY INTERCEPTOR ACTIVE</span>
    </div>
    <div style="font-size: 11px; color: #94a3b8; font-family: 'JetBrains Mono', monospace;">
      Org: Global_Enterprise_Tenants &bull; Security Level: SOX &amp; FedRAMP High
    </div>
  </div>

  <!-- KPI Metrics Bar -->
  <div class="kpi-bar">
    <div class="kpi-card">
      <div class="kpi-label">Active Managed Endpoints</div>
      <div class="kpi-val">142,500 <span class="kpi-sub">↑ 100% Online</span></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Fleet Policy Compliance</div>
      <div class="kpi-val">99.82% <span class="kpi-sub">↑ 0.4% from 94%</span></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Autonomous Triage Time</div>
      <div class="kpi-val">43 min <span class="kpi-sub">↓ -82% (was 4h)</span></div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Compliance Breach Incidents</div>
      <div class="kpi-val" style="color: #34d399;">0 <span class="kpi-sub">Across 140k Tasks</span></div>
    </div>
  </div>

  <div class="console-body">
    <!-- Left Fleet Navigator -->
    <div class="fleet-nav">
      <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Device Partitions</div>
      <div class="fleet-item active">
        <div class="fleet-item-head">
          <span>Windows 11 Corporate Fleet</span>
          <span style="color: #f87171;">Alert</span>
        </div>
        <div class="fleet-item-meta">42,180 devices &bull; CVE-2024-8192</div>
      </div>
      <div class="fleet-item">
        <div class="fleet-item-head">
          <span>macOS Engineering Fleet</span>
          <span style="color: #34d399;">Clean</span>
        </div>
        <div class="fleet-item-meta">28,450 devices &bull; Sequoia 15.1</div>
      </div>
      <div class="fleet-item">
        <div class="fleet-item-head">
          <span>iOS / Android Executive Fleet</span>
          <span style="color: #34d399;">Clean</span>
        </div>
        <div class="fleet-item-meta">71,870 mobile units &bull; Zero Drift</div>
      </div>
    </div>

    <!-- Center Remediation Workspace -->
    <div class="remedy-center">
      <div class="alert-banner">
        <div class="alert-info">
          <h4>🚨 Intercepted Zero-Day Kernel Exploit: CVE-2024-8192</h4>
          <p>Watson Security Agent isolated unauthenticated RPC buffer exploit affecting 42,180 corporate Windows laptops.</p>
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; background: #0a0d14; padding: 6px 12px; border-radius: 4px; color: #fca5a5;">
          Severity: CVSS 9.8 Critical
        </div>
      </div>

      <div class="mesh-box">
        <div class="mesh-title">
          <span>⚡ Multi-Agent Autonomous Remediation Pipeline</span>
          <span style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #34d399;">3 Agents Operating in Lockstep</span>
        </div>
        <div class="agent-cards-row">
          <div class="agent-card active-mesh">
            <div class="agent-card-head">
              <span>AGENT 01</span>
              <span>100% MATCH</span>
            </div>
            <div class="agent-card-name">Policy Inspector Agent</div>
            <div class="agent-card-status">Scanned 142k endpoints in 18s. Identified 42,180 unpatched devices.</div>
          </div>
          <div class="agent-card active-mesh">
            <div class="agent-card-head">
              <span>AGENT 02</span>
              <span>SYNTHESIZED</span>
            </div>
            <div class="agent-card-name">CVE Patch Synthesizer</div>
            <div class="agent-card-status">Generated non-reboot registry isolation payload. Tested in sandbox.</div>
          </div>
          <div class="agent-card active-mesh">
            <div class="agent-card-head">
              <span>AGENT 03</span>
              <span style="color: #fbbf24;">GATED 88.4%</span>
            </div>
            <div class="agent-card-name">Phased Rollout Controller</div>
            <div class="agent-card-status" style="color: #fbbf24;">Awaiting Supervised Human Sign-off. Blast radius: Canary Tier.</div>
          </div>
        </div>
      </div>

      <!-- Live Execution Log -->
      <div style="background: #0d121a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 11.5px;">
        <div style="color: #94a3b8; margin-bottom: 8px; font-weight: 700;">PROACTIVE SYSTEM AUDIT LOG</div>
        <div style="color: #34d399;">14:32:01.042 [Watson-Kernel] Zero-day anomaly signature detected on external gateway.</div>
        <div style="color: #34d399;">14:32:02.118 [Policy-Agent] Evaluated corporate fleet: 42,180 devices match vulnerable DLL version.</div>
        <div style="color: #60a5fa;">14:32:04.901 [Sandbox-Tester] Executed simulated payload on 5 isolated VMs. Zero crashes, RPC port sealed.</div>
        <div style="color: #fbbf24;">14:32:05.004 [Confidence-Router] Score: 88.4% &rarr; High Impact Action requires IT Admin Diff Approval.</div>
      </div>
    </div>

    <!-- Right Supervised Approval Drawer -->
    <div class="remedy-right">
      <div class="approval-card">
        <div class="approval-head">
          <span style="font-weight: 700; color: #ffffff; font-size: 13px;">Supervised Diff Approval</span>
          <span class="approval-badge">88.4% CONFIDENCE</span>
        </div>
        <p style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">
          Marcus Chen (Senior IT Admin): Confirm deployment of Watson-generated zero-downtime policy override to 42,180 endpoints.
        </p>
        <div class="diff-box-mini">
          <div style="color: #94a3b8; margin-bottom: 4px;">REGISTRY DELTA PREVIEW:</div>
          <div class="diff-del">- HKLM\\System\\RpcEndpoint = AllowUnauthenticated (Vulnerable)</div>
          <div class="diff-add">+ HKLM\\System\\RpcEndpoint = ForceKerberosSignature (Protected)</div>
          <div class="diff-add">+ SentinelWatcher Daemon = Active (Failover: Instant Revert)</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="approve-btn">
            🛡️ Approve Phased Deployment (500 Canary First)
          </button>
          <button style="background: transparent; border: 1px solid #334155; color: #94a3b8; padding: 8px; border-radius: 6px; font-size: 11.5px; cursor: pointer;">
            Request Manual Script Inspection
          </button>
        </div>
      </div>

      <div style="background: #131a24; border: 1px solid #1e293b; border-radius: 8px; padding: 14px; font-size: 11.5px; color: #94a3b8;">
        <strong style="color: #ffffff;">Senior Manager Governance Note:</strong><br>
        By gating this action behind Tier 2 Supervised Diff approval, zero unauthorized system modifications occur without admin confirmation, preserving 100% SOX and FedRAMP compliance.
      </div>
    </div>
  </div>
</body>
</html>
`;

async function main() {
  console.log('Launching browser to capture IBM visual evidence...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. IBM Rhapsody SE AI Systems Modeling Assistant
  console.log('Rendering IBM Rhapsody SE AI screenshot...');
  await page.setContent(rhapsodyHtml, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));
  const rhapsodyPath = path.join(OUT_DIR, 'transformation-ibm-watson.png');
  await page.screenshot({ path: rhapsodyPath, type: 'png' });
  console.log('Saved:', rhapsodyPath);

  // Also save specific rhapsody file
  const rhapsodySpecPath = path.join(OUT_DIR, 'ibm_rhapsody_ai_modeling.png');
  await page.screenshot({ path: rhapsodySpecPath, type: 'png' });
  console.log('Saved:', rhapsodySpecPath);

  // 2. IBM MaaS360 Proactive Endpoint Operations Console
  console.log('Rendering IBM MaaS360 AI screenshot...');
  await page.setContent(maas360Html, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));
  const maas360Path = path.join(OUT_DIR, 'ibm_maas360_ai_endpoint.png');
  await page.screenshot({ path: maas360Path, type: 'png' });
  console.log('Saved:', maas360Path);

  // 3. UX Research & 14-Designer Leadership Matrix
  console.log('Rendering UX Research & Leadership Matrix...');
  const leadershipHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Overpass:wght@700;800;900&display=swap">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1440px;
      height: 900px;
      background: #0d121a;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .head-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 16px;
    }
    .head-title h1 {
      font-family: 'Overpass', sans-serif;
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
    }
    .head-title p {
      font-size: 13px;
      color: #94a3b8;
      margin-top: 4px;
    }
    .badge-ibm {
      background: rgba(15, 98, 254, 0.2);
      border: 1px solid #0f62fe;
      color: #78a9ff;
      padding: 6px 14px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      flex: 1;
    }
    .card {
      background: #131a24;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .card-title {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 10px;
    }
    .card-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: #10b981;
    }
    .reorg-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 16px;
      margin-top: 8px;
    }
    .reorg-col {
      background: #0d121a;
      border: 1px solid #334155;
      border-radius: 6px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .reorg-col.after {
      border-color: #10b981;
      background: rgba(16, 185, 129, 0.04);
    }
    .reorg-head {
      font-size: 12px;
      font-weight: 700;
      color: #ffffff;
      font-family: 'JetBrains Mono', monospace;
    }
    .reorg-item {
      font-size: 11px;
      color: #cbd5e1;
      padding: 4px 8px;
      background: #161e2e;
      border-radius: 4px;
      border-left: 2px solid #64748b;
    }
    .reorg-col.after .reorg-item {
      border-left-color: #10b981;
    }
    .arrow-icon {
      font-size: 20px;
      color: #10b981;
      font-weight: 900;
    }
    .metric-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .metric-box {
      background: #0d121a;
      border: 1px solid #1e293b;
      border-radius: 6px;
      padding: 12px;
      text-align: center;
    }
    .metric-num {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
    }
    .metric-lbl {
      font-size: 10.5px;
      color: #94a3b8;
      margin-top: 2px;
      font-family: 'JetBrains Mono', monospace;
    }
  </style>
</head>
<body>
  <div class="head-bar">
    <div class="head-title">
      <h1>UX Research, Team Re-Org &amp; Usability Benchmark Evidence</h1>
      <p>Senior Manager Operational Artifacts &bull; IBM India Software Labs (Sep 2024 &ndash; Jan 2026)</p>
    </div>
    <div class="badge-ibm">IBM INDIA SOFTWARE LABS</div>
  </div>

  <div class="grid-2">
    <!-- Card 1: 14-Designer Re-Org -->
    <div class="card">
      <div class="card-title">
        <span>UX-as-a-Service Team Re-Organization (14 Designers)</span>
        <span class="card-tag">OPERATIONAL EXCELLENCE</span>
      </div>
      <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
        Dismantled isolated product silos to establish a centralized service model, accelerating AI feature velocity by 3.4x while maintaining strict Human-AI design governance across Rhapsody SE &amp; MaaS360.
      </p>

      <div class="reorg-grid">
        <div class="reorg-col">
          <div class="reorg-head" style="color: #f87171;">❌ Siloed Model (Before)</div>
          <div class="reorg-item">4 Designers &bull; Rhapsody Only</div>
          <div class="reorg-item">5 Designers &bull; MaaS360 Silo</div>
          <div class="reorg-item">3 Designers &bull; Core Watson AI</div>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">Fragmented patterns, duplicate tokens, high burnout.</div>
        </div>

        <div class="arrow-icon">&rarr;</div>

        <div class="reorg-col after">
          <div class="reorg-head" style="color: #34d399;">✓ UX-as-a-Service (Transformed)</div>
          <div class="reorg-item"><strong>Agentic IA &amp; Gating Chapter</strong> (4 lead)</div>
          <div class="reorg-item"><strong>Rhapsody SysML Pod</strong> (4 embedded)</div>
          <div class="reorg-item"><strong>MaaS360 SecOps Pod</strong> (4 embedded)</div>
          <div style="font-size: 10px; color: #34d399; margin-top: 4px;">Centralized TokenOps, unified confidence router.</div>
        </div>
      </div>

      <div class="metric-row" style="margin-top: auto;">
        <div class="metric-box">
          <div class="metric-num">3.4x</div>
          <div class="metric-lbl">Sprint Velocity</div>
        </div>
        <div class="metric-box">
          <div class="metric-num">100%</div>
          <div class="metric-lbl">Team Retention</div>
        </div>
        <div class="metric-box">
          <div class="metric-num">14</div>
          <div class="metric-lbl">Gov Workshops</div>
        </div>
      </div>
    </div>

    <!-- Card 2: Usability Testing Trajectory -->
    <div class="card">
      <div class="card-title">
        <span>3-Round Usability Testing Benchmark Trajectory (32 Participants)</span>
        <span class="card-tag">HUMAN-CENTERED PROOFS</span>
      </div>
      <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
        Conducted 3 iterative testing phases with 16 Systems Engineers and 16 Enterprise IT Admins, validating the shift from raw statistical AI to transparent Human-in-the-Loop explainability.
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px; background: #0d121a; padding: 14px; border-radius: 6px; border: 1px solid #1e293b;">
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
            <span>Round 1: Low-Fi Wireframes (Raw AI Confidence Scores)</span>
            <span style="color: #f87171; font-weight: 700;">SUS: 61.4 (Poor)</span>
          </div>
          <div style="height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden;">
            <div style="width: 61.4%; height: 100%; background: #f87171;"></div>
          </div>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Users confused: "Why is this 92%? What will it break?"</div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
            <span>Round 2: Mid-Fi Interactive (Added Reasoning Trace Drawer)</span>
            <span style="color: #fbbf24; font-weight: 700;">SUS: 77.8 (Good)</span>
          </div>
          <div style="height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden;">
            <div style="width: 77.8%; height: 100%; background: #fbbf24;"></div>
          </div>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Confidence climbed, but users demanded side-by-side diff previews.</div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
            <span>Round 3: High-Fi Sandbox (3-Tier Gating + 1-Click Diff Override)</span>
            <span style="color: #34d399; font-weight: 700;">SUS: 89.4 (Industry Benchmark)</span>
          </div>
          <div style="height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden;">
            <div style="width: 89.4%; height: 100%; background: #34d399;"></div>
          </div>
          <div style="font-size: 10px; color: #34d399; margin-top: 2px;">97% task success rate, 0 compliance errors, 100% executive sign-off.</div>
        </div>
      </div>

      <div class="metric-row" style="margin-top: auto;">
        <div class="metric-box">
          <div class="metric-num">89.4</div>
          <div class="metric-lbl">Final SUS Score</div>
        </div>
        <div class="metric-box">
          <div class="metric-num">97%</div>
          <div class="metric-lbl">Task Success</div>
        </div>
        <div class="metric-box">
          <div class="metric-num">0%</div>
          <div class="metric-lbl">Critical Errors</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
  await page.setContent(leadershipHtml, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));
  const leadPath = path.join(OUT_DIR, 'ibm_research_leadership_matrix.png');
  await page.screenshot({ path: leadPath, type: 'png' });
  console.log('Saved:', leadPath);

  await browser.close();
  console.log('All IBM visual evidence captured successfully!');
}

main().catch(err => {
  console.error('Error generating screenshots:', err);
  process.exit(1);
});
