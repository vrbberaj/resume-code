# specialization_data.py
# Contains all data, HTML, CSS, and JS for the 5 UI/UX specializations and interactive prototypes

import os

# ----------------------------------------------------------------------------
# 1. Specialized Interactive Prototypes HTML & JS
# ----------------------------------------------------------------------------

ericsson_proto_html = """`
    <div class="interactive-prototype-window">
      <div class="proto-win-header">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url">https://salesops.ericsson.net/deals/deal-4820/bom-configurator</div>
        <span class="proto-win-badge">● LIVE SAP PRICING ENGINE</span>
      </div>
      <div class="proto-win-body">
        <div class="proto-deal-bar">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: #FFFFFF; margin: 0 0 4px;">Vodafone UK — 5G Massive MIMO Expansion (Q3 Deal #4820)</h4>
            <p style="font-size: 12px; color: #94A3B8; margin: 0;">Tier 1 Strategic &bull; Lead Architect: M. Lindqvist &bull; 12,000 Verified SAP Parts</p>
          </div>
          <div style="text-align: right;">
            <div id="ericsson-total-val" style="font-family: var(--font-heading); font-size: 24px; font-weight: 900; color: #F59E0B;">$8,420,000</div>
            <div id="ericsson-margin-badge" class="margin-pill margin-pass">38.4% GROSS MARGIN [PASS &bull; GREEN CHANNEL]</div>
          </div>
        </div>

        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 10px 14px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <span style="font-family: var(--font-code); font-size: 11px; color: #38BDF8;">⌨️ Keyboard Shortcuts: Arrow Keys to Navigate &bull; Tab to Edit &bull; Enter to Commit Row</span>
          <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8;">Auto-Approval Threshold: &ge;35.0% Gross Margin</span>
        </div>

        <div style="overflow-x: auto; margin-bottom: 16px;">
          <table class="proto-grid-table">
            <thead>
              <tr>
                <th>Part #</th>
                <th>Description</th>
                <th>Unit Cost</th>
                <th>List Price</th>
                <th>Qty</th>
                <th>Discount %</th>
                <th>Net Price</th>
                <th>Line Margin</th>
              </tr>
            </thead>
            <tbody id="ericsson-bom-rows">
              <tr data-part="AIR 6488" data-cost="11200" data-list="18500" data-qty="120">
                <td class="cell-code">AIR 6488</td>
                <td>5G Massive MIMO Radio (3.5GHz 64T64R)</td>
                <td class="cell-num">$11,200</td>
                <td class="cell-num">$18,500</td>
                <td class="cell-num">120</td>
                <td><input type="number" min="0" max="50" value="12" class="grid-num-input" oninput="recalcEricssonDeal()" aria-label="Discount percentage for AIR 6488"> %</td>
                <td class="cell-num row-net-val">$1,953,600</td>
                <td><span class="margin-pill margin-pass row-margin-val">39.2%</span></td>
              </tr>
              <tr data-part="Baseband 6648" data-cost="8200" data-list="14200" data-qty="85">
                <td class="cell-code">Baseband 6648</td>
                <td>High-Capacity RAN Compute Unit</td>
                <td class="cell-num">$8,200</td>
                <td class="cell-num">$14,200</td>
                <td class="cell-num">85</td>
                <td><input type="number" min="0" max="50" value="8" class="grid-num-input" oninput="recalcEricssonDeal()" aria-label="Discount percentage for Baseband 6648"> %</td>
                <td class="cell-num row-net-val">$1,110,440</td>
                <td><span class="margin-pill margin-pass row-margin-val">41.5%</span></td>
              </tr>
              <tr data-part="Router 6672" data-cost="5600" data-list="8900" data-qty="140">
                <td class="cell-code">Router 6672</td>
                <td>100GE Cell Site Aggregation Gateway</td>
                <td class="cell-num">$5,600</td>
                <td class="cell-num">$8,900</td>
                <td class="cell-num">140</td>
                <td><input type="number" min="0" max="50" value="15" class="grid-num-input" oninput="recalcEricssonDeal()" aria-label="Discount percentage for Router 6672"> %</td>
                <td class="cell-num row-net-val">$1,059,100</td>
                <td><span class="margin-pill margin-pass row-margin-val">36.1%</span></td>
              </tr>
              <tr data-part="Streetmacro 6701" data-cost="7100" data-list="11400" data-qty="60">
                <td class="cell-code">Streetmacro 6701</td>
                <td>mmWave Integrated Urban Small Cell</td>
                <td class="cell-num">$7,100</td>
                <td class="cell-num">$11,400</td>
                <td class="cell-num">60</td>
                <td><input type="number" min="0" max="50" value="10" class="grid-num-input" oninput="recalcEricssonDeal()" aria-label="Discount percentage for Streetmacro 6701"> %</td>
                <td class="cell-num row-net-val">$615,600</td>
                <td><span class="margin-pill margin-pass row-margin-val">37.8%</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
          <div style="font-size: 12px; color: #94A3B8;">
            💡 <em>Try increasing discounts to &gt;20% to observe live escalation guardrail trigger.</em>
          </div>
          <button onclick="triggerEricssonQuotePdf()" class="proto-action-btn">
            📄 1-Click Generate Signed Contract PDF
          </button>
        </div>

        <div id="ericsson-toast" class="proto-toast" style="display: none;">
          ✅ Contract Proposal #4820 Generated! Verified against 100% SAP Catalog Rules &amp; Signed by Commercial Bot.
        </div>
      </div>
    </div>
  `"""

watson_proto_html = """`
    <div class="interactive-prototype-window">
      <div class="proto-win-header">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url">https://watson-orchestrate.ibm.com/workspace/agentic-mesh</div>
        <span class="proto-win-badge">● MULTI-AGENT STATE MACHINE ACTIVE</span>
      </div>
      <div class="proto-win-body">
        <div style="background: rgba(37, 99, 235, 0.1); border-left: 4px solid #3B82F6; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
          <div style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #60A5FA; text-transform: uppercase;">Natural Language Enterprise Intent</div>
          <div style="font-size: 14px; font-weight: 600; color: #FFFFFF; margin-top: 4px;">
            “Reconcile Q3 vendor invoices across SAP, verify credit limits in Salesforce CRM, and prepare executive payment voucher.”
          </div>
        </div>

        <!-- Agent Node Graph -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px;">
          <div class="agent-node-card">
            <div class="agent-node-header">
              <span class="agent-pulse-dot dot-active"></span>
              <span class="agent-name">1. SAP ERP Agent</span>
            </div>
            <div class="agent-status-badge badge-success">100% PO Match</div>
            <p class="agent-detail-text">14 PO line items matched against receipts; 0 unit variance detected.</p>
          </div>

          <div class="agent-node-card">
            <div class="agent-node-header">
              <span class="agent-pulse-dot dot-active"></span>
              <span class="agent-name">2. Salesforce CRM Agent</span>
            </div>
            <div class="agent-status-badge badge-success">Approved</div>
            <p class="agent-detail-text">Credit threshold of $250,000 verified; customer account in good standing.</p>
          </div>

          <div class="agent-node-card">
            <div class="agent-node-header">
              <span class="agent-pulse-dot dot-pending"></span>
              <span class="agent-name">3. Ledger Write-Back</span>
            </div>
            <div class="agent-status-badge badge-pending">Gated for Review</div>
            <p class="agent-detail-text">Awaiting human signature before immutable commit to General Ledger.</p>
          </div>
        </div>

        <!-- Confidence Score Gating Control -->
        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
            <div>
              <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8; text-transform: uppercase;">Confidence Gating Threshold:</span>
              <strong id="watson-conf-label" style="font-family: var(--font-heading); font-size: 15px; color: #60A5FA; margin-left: 8px;">94.2% AI Confidence [Tier 2: Supervised Draft]</strong>
            </div>
            <div class="conf-tier-btns">
              <button onclick="setWatsonConfidence('high')" id="wconf-high" class="btn-tier">High (96.4%)</button>
              <button onclick="setWatsonConfidence('med')" id="wconf-med" class="btn-tier active">Supervised (94.2%)</button>
              <button onclick="setWatsonConfidence('low')" id="wconf-low" class="btn-tier">Low (74.0%)</button>
            </div>
          </div>
          <p id="watson-conf-desc" style="font-size: 12px; color: #CBD5E1; margin: 0; line-height: 1.45;">
            Tier 2 Routing: Side-by-side database diff verification required before irreversible write-back to SAP S/4HANA.
          </p>
        </div>

        <!-- Side-by-Side Diff Drawer -->
        <div id="watson-diff-drawer" style="background: #090D14; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #38BDF8;">PROPOSED DATABASE MUTATION DIFF: SAP S/4HANA vs LLM DRAFT</span>
            <span style="font-family: var(--font-code); font-size: 10px; color: #94A3B8;">SOX Audit Token: #TX-98402-SHA256</span>
          </div>
          <div style="overflow-x: auto;">
            <table class="proto-grid-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Current Database State</th>
                  <th>Proposed Multi-Agent Mutation</th>
                  <th>Audit Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cell-code">INVOICE_STATUS</td>
                  <td style="color: #F87171;">PENDING_APPROVAL</td>
                  <td style="color: #34D399; font-weight: 700;">+ APPROVED_FOR_PAYMENT</td>
                  <td><span class="margin-pill margin-pass">VERIFIED</span></td>
                </tr>
                <tr>
                  <td class="cell-code">VOUCHER_AMOUNT</td>
                  <td>$0.00</td>
                  <td style="color: #34D399; font-weight: 700;">+ $142,500.00 [PO-9402]</td>
                  <td><span class="margin-pill margin-pass">VERIFIED</span></td>
                </tr>
                <tr>
                  <td class="cell-code">GL_ACCOUNT</td>
                  <td>2100-AP (Unposted)</td>
                  <td style="color: #34D399; font-weight: 700;">+ 2100-AP [Balanced &bull; Variance 0.00]</td>
                  <td><span class="margin-pill margin-pass">VERIFIED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Decision Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <span style="font-size: 12px; color: #94A3B8;">🔒 Cryptographic audit trail generated automatically upon human authorization.</span>
          <div style="display: flex; gap: 10px;">
            <button onclick="rejectWatsonLedger()" class="proto-reject-btn">❌ Reject / Force Human Override</button>
            <button onclick="commitWatsonLedger()" class="proto-action-btn">✅ Authorize &amp; Commit to SAP Ledger</button>
          </div>
        </div>

        <div id="watson-toast" class="proto-toast" style="display: none;">
          🚀 Transaction #TX-88219 committed to SAP S/4HANA &amp; SOX Cryptographic Audit Trail Logged!
        </div>
      </div>
    </div>
  `"""

zebra_proto_html = """`
    <div class="interactive-prototype-window">
      <div class="proto-win-header">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url">https://devicecloud.zebra.com/hub/chicago-dc-04/spatial-map</div>
        <span class="proto-win-badge">● 1,280 SCANNERS ONLINE</span>
      </div>
      <div class="proto-win-body">
        <!-- Zone Selector Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
          <div class="zone-filter-group">
            <button onclick="filterZebraZone('all')" id="zbtn-all" class="zone-btn active">All Zones (1,280 Units)</button>
            <button onclick="filterZebraZone('a')" id="zbtn-a" class="zone-btn">Zone A: Staging Dock (480)</button>
            <button onclick="filterZebraZone('b')" id="zbtn-b" class="zone-btn">Zone B: Conveyors (620)</button>
            <button onclick="filterZebraZone('c')" id="zbtn-c" class="zone-btn">Zone C: Sub-Zero Freezer (-25°C) (180 ⚠️)</button>
          </div>
          <div id="zebra-glove-mode-indicator" style="font-family: var(--font-code); font-size: 11px; padding: 6px 12px; border-radius: 6px; background: rgba(16, 185, 129, 0.1); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.2);">
            🧤 Standard Touch Targets: 44px
          </div>
        </div>

        <!-- Dynamic Alert Banner for Zone C -->
        <div id="zebra-cold-alert" style="display: none; background: rgba(220, 38, 38, 0.15); border: 1px solid rgba(220, 38, 38, 0.4); border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
              <strong style="color: #F87171; font-family: var(--font-heading); font-size: 14px;">❄️ SUB-ZERO FACILITY ALERT (-25°C): Accelerated Battery Discharge</strong>
              <p style="font-size: 12px; color: #FECACA; margin: 3px 0 0;">ML Telematics predicts 14 batteries will drop below operating threshold in 1.8 hours. Heavy-Glove 72px mode engaged.</p>
            </div>
            <span style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #F87171; background: rgba(220, 38, 38, 0.2); padding: 4px 10px; border-radius: 4px;">SWAP RECOMMENDED</span>
          </div>
        </div>

        <!-- Scanner Fleet Cards Grid -->
        <div id="zebra-fleet-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px;">
          <div class="zebra-scanner-card">
            <div class="scanner-card-top">
              <span class="scanner-model">TC58 Handheld #4092</span>
              <span class="scanner-badge-ok">Optimal</span>
            </div>
            <div class="scanner-loc">Zone A &bull; Staging Dock 12</div>
            <div class="scanner-metrics-row">
              <span>Battery: <strong>96%</strong></span>
              <span>Temp: <strong>18°C</strong></span>
              <span>WiFi: <strong>-52 dBm</strong></span>
            </div>
          </div>

          <div class="zebra-scanner-card">
            <div class="scanner-card-top">
              <span class="scanner-model">TC58 Handheld #4118</span>
              <span class="scanner-badge-ok">Optimal</span>
            </div>
            <div class="scanner-loc">Zone B &bull; High-Speed Conveyor 04</div>
            <div class="scanner-metrics-row">
              <span>Battery: <strong>88%</strong></span>
              <span>Temp: <strong>19°C</strong></span>
              <span>WiFi: <strong>-48 dBm</strong></span>
            </div>
          </div>

          <div class="zebra-scanner-card scanner-warn">
            <div class="scanner-card-top">
              <span class="scanner-model">MC9300 Gun #1084</span>
              <span class="scanner-badge-alert">Swap Alert</span>
            </div>
            <div class="scanner-loc">Zone C &bull; Sub-Zero Freezer Bay 02</div>
            <div class="scanner-metrics-row">
              <span>Battery: <strong style="color: #F87171;">24% ⚠️</strong></span>
              <span>Temp: <strong style="color: #60A5FA;">-25°C</strong></span>
              <span>Heated Glass: <strong>ON</strong></span>
            </div>
          </div>
        </div>

        <!-- 1-Scan QR Provisioning Interactive Simulator -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <strong style="display: block; font-family: var(--font-heading); font-size: 14px; color: #FFFFFF;">Zero-Touch 1-Second 2D Barcode Provisioning Simulator</strong>
            <p style="font-size: 12px; color: #94A3B8; margin: 3px 0 0;">Bypasses 45-minute manual USB tethering. Replaces entire staging desk with 1 optical scan.</p>
          </div>
          <button onclick="triggerZebraScan()" class="proto-action-btn">
            📲 Simulate 1-Second 2D Barcode Scan
          </button>
        </div>

        <div id="zebra-toast" class="proto-toast" style="display: none;">
          ⚡ Scanner TC58 #4092 Staged in 0.82 seconds! Zero-touch enterprise profile applied.
        </div>
      </div>
    </div>
  `"""

carbon_proto_html = """`
    <div class="interactive-prototype-window">
      <div class="proto-win-header">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url">https://designops.ibm.com/carbon-tokens/governance</div>
        <span class="proto-win-badge">● 14 SQUADS SYNCED</span>
      </div>
      <div class="proto-win-body">
        <!-- Theme Switcher Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div>
            <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8; text-transform: uppercase;">Active Carbon Theme Mode:</span>
            <div class="carbon-theme-btns" style="margin-top: 6px;">
              <button onclick="setCarbonTheme('white')" id="cbtn-white" class="c-theme-btn active">Carbon White (Light)</button>
              <button onclick="setCarbonTheme('g10')" id="cbtn-g10" class="c-theme-btn">Carbon G10 (Subtle)</button>
              <button onclick="setCarbonTheme('g90')" id="cbtn-g90" class="c-theme-btn">Carbon G90 (Slate)</button>
              <button onclick="setCarbonTheme('g100')" id="cbtn-g100" class="c-theme-btn">Carbon G100 (Dark)</button>
            </div>
          </div>
          <span style="font-family: var(--font-code); font-size: 11px; color: #38BDF8;">0-Layout-Shift Runtime CSS Variable Injection</span>
        </div>

        <!-- Live Component Stage (reacts to selected theme) -->
        <div id="carbon-live-stage" style="background: #FFFFFF; color: #161616; border: 1px solid #E0E0E0; border-radius: 12px; padding: 24px; margin-bottom: 20px; transition: all 0.25s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h5 id="carbon-stage-title" style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; margin: 0; color: inherit;">Multi-Brand Tokenized Component Preview</h5>
            <span id="carbon-stage-badge" style="font-family: var(--font-code); font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px; background: rgba(15, 98, 254, 0.1); color: #0F62FE;">v4.2.0 Tokenized</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: center;">
            <div>
              <label id="carbon-label" style="display: block; font-family: var(--font-code); font-size: 11px; font-weight: 700; margin-bottom: 6px; color: inherit;">Search Enterprise Catalog</label>
              <input id="carbon-input" type="text" value="Cloud Object Storage" style="width: 100%; box-sizing: border-box; padding: 10px 12px; font-size: 13px; border-radius: 4px; border: 1px solid #8D8D8D; background: #F4F4F4; color: inherit; font-family: var(--font-body);" aria-label="Search Enterprise Catalog component test input">
            </div>
            <div>
              <label style="display: block; font-family: var(--font-code); font-size: 11px; font-weight: 700; margin-bottom: 6px; color: inherit;">Primary Action</label>
              <button id="carbon-btn-primary" style="padding: 10px 18px; background: #0F62FE; color: #FFFFFF; border: none; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 4px; display: inline-flex; align-items: center; gap: 8px;">
                <span>Deploy Cluster &rarr;</span>
              </button>
            </div>
            <div>
              <label style="display: block; font-family: var(--font-code); font-size: 11px; font-weight: 700; margin-bottom: 6px; color: inherit;">Tokenized Status Tag</label>
              <span id="carbon-status-tag" style="display: inline-block; padding: 6px 12px; border-radius: 4px; background: #0F62FE; color: #FFFFFF; font-size: 12px; font-weight: 600;">$support-02 &bull; Active</span>
            </div>
          </div>
        </div>

        <!-- Token Variable Inspector -->
        <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;">
          <div style="font-family: var(--font-code); font-size: 11px; font-weight: 700; color: #38BDF8; margin-bottom: 8px;">LIVE FIGMA VARIABLE TOKEN CONTRACT:</div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-family: var(--font-code); font-size: 11.5px;">
            <div style="color: #94A3B8;">$interactive-01: <strong id="t-int" style="color: #60A5FA;">#0F62FE</strong></div>
            <div style="color: #94A3B8;">$background: <strong id="t-bg" style="color: #FFFFFF;">#FFFFFF</strong></div>
            <div style="color: #94A3B8;">$field-01: <strong id="t-field" style="color: #CBD5E1;">#F4F4F4</strong></div>
            <div style="color: #94A3B8;">$text-01: <strong id="t-text" style="color: #FFFFFF;">#161616</strong></div>
          </div>
        </div>

        <!-- Action Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <span style="font-size: 12px; color: #94A3B8;">📦 Compiles directly via GitHub Actions to React, Web Components, and iOS/Android.</span>
          <button onclick="triggerCarbonPr()" class="proto-action-btn">
            🚀 Compile &amp; Push Style Dictionary PR to GitHub
          </button>
        </div>

        <div id="carbon-toast" class="proto-toast" style="display: none;">
          ✅ PR #318 Opened: 180 tokens compiled across 14 squad repositories with 0 visual regression!
        </div>
      </div>
    </div>
  `"""

wabco_proto_html = """`
    <div class="interactive-prototype-window">
      <div class="proto-win-header" style="background: #090D14;">
        <div class="window-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <div class="proto-win-url" style="color: #94A3B8; background: #111624;">zf-wabco://cockpit-cluster/active-haul/route-849</div>
        <span class="proto-win-badge">● CAN-BUS CONNECTED &bull; UNECE 158/159 COMPLIANT</span>
      </div>
      <div id="wabco-hud-body" class="proto-win-body" style="background: #06090F; color: #FFFFFF; transition: all 0.3s ease;">
        <!-- Controls Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div class="lighting-mode-btns">
            <button onclick="setWabcoLighting('night')" id="wbtn-night" class="w-light-btn active">🌙 Night Freight Mode (Anti-Glare)</button>
            <button onclick="setWabcoLighting('day')" id="wbtn-day" class="w-light-btn">☀️ Daylight Sunlight Mode (High-Contrast)</button>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-family: var(--font-code); font-size: 11px; color: #94A3B8;">Cruise Speed:</span>
            <input type="range" min="70" max="95" value="88" oninput="updateWabcoSpeed(this.value)" style="cursor: pointer;" aria-label="Simulated truck cruise speed control slider">
            <span id="wabco-slider-val" style="font-family: var(--font-code); font-size: 12px; font-weight: 700; color: #10B981;">88 km/h</span>
          </div>
        </div>

        <!-- 3-Zone Cockpit Cluster -->
        <div style="display: grid; grid-template-columns: 1fr 1.3fr 1fr; gap: 16px; margin-bottom: 20px;">
          <!-- Zone 1 -->
          <div id="wabco-zone-1" class="hud-zone-card">
            <div class="hud-zone-tag">ZONE 1 (&lt;0.8S GLANCE BUDGET)</div>
            <div id="wabco-speed-num" style="font-size: 42px; font-weight: 900; font-family: var(--font-code); color: #10B981; margin: 4px 0;">88 <span style="font-size: 16px;">KM/H</span></div>
            <div id="wabco-radar-info" style="font-size: 11px; color: #94A3B8;">Safe Radar Distance: <strong>85m</strong> &bull; Limit: 90</div>
            <div id="wabco-hazard-alert" style="display: none; margin-top: 8px; background: rgba(245, 158, 11, 0.2); border: 1px solid #F59E0B; border-radius: 6px; padding: 4px 8px; font-family: var(--font-code); font-size: 10px; color: #F59E0B; font-weight: 700;">
              ⚠️ BLIND SPOT: Vehicle at Right Flank (14m)
            </div>
          </div>

          <!-- Zone 2 -->
          <div class="hud-zone-card">
            <div class="hud-zone-tag" style="color: #F59E0B;">ZONE 2 (&lt;1.2S NAVIGATION)</div>
            <div style="font-size: 16px; font-weight: 800; color: #F59E0B; margin: 8px 0 4px;">A7 Hamburg &bull; Exit 24 in 2.4 km</div>
            <div style="font-size: 11px; color: #94A3B8;">Max Bridge Clearance: <strong>4.2m [CLEAR]</strong></div>
            <div style="font-size: 11px; color: #94A3B8; margin-top: 4px;">Lane 2 Recommended &bull; Heavy Freight</div>
          </div>

          <!-- Zone 3 -->
          <div class="hud-zone-card">
            <div class="hud-zone-tag" style="color: #38BDF8;">ZONE 3 (PERIPHERAL ECO-PULSE)</div>
            <div style="font-size: 18px; font-weight: 800; color: #38BDF8; margin: 8px 0 4px;">Optimal Torque</div>
            <div style="font-size: 11px; color: #94A3B8;">+14% Fleet Fuel Efficiency</div>
            <div style="font-size: 11px; color: #10B981; margin-top: 4px;">RPM: 1,250 &bull; Eco-Band Green</div>
          </div>
        </div>

        <!-- Simulator Controls -->
        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <strong style="font-family: var(--font-heading); font-size: 13px; color: #FFFFFF;">UNECE 158/159 Gaze-Time Compliance Simulator</strong>
            <p style="font-size: 11.5px; color: #94A3B8; margin: 2px 0 0;">Verifies driver cognitive perception speed under high-speed Autobahn freight conditions.</p>
          </div>
          <button onclick="triggerWabcoHazard()" class="proto-action-btn">
            🚨 Simulate Blind Spot Obstacle Warning
          </button>
        </div>

        <div id="wabco-toast" class="proto-toast" style="display: none;">
          ⚡ Blind Spot Hazard Triggered! Eye-glance perception clocked at 0.68s [PASS &lt; 0.8s UNECE 158/159 Limit].
        </div>
      </div>
    </div>
  `"""

# ----------------------------------------------------------------------------
# 2. Domain-Specific 5-Phase Manager Methodologies
# ----------------------------------------------------------------------------

ericsson_steps = """[
    {
      phase: 'Formula & Macro Audit',
      title: '14-Tab Excel Macro & Dependency Audit',
      desc: 'Audited 50MB unversioned workbook across 45 countries; mapped 42 cascading #REF! failure modes and 12,000 catalog parts.',
      deliverable: 'Risk Register & Formula Map',
      metric: 'Quantified 6-day deal delay'
    },
    {
      phase: 'Biomechanical Shadowing',
      title: 'In-Situ Keyboard Velocity Shadowing in Stockholm',
      desc: 'Shadowed 12 senior bid engineers on live operator bids; identified keyboard shortcuts and clipboard velocity as non-negotiable adoption criteria.',
      deliverable: 'Ergonomic Biomechanics Map',
      metric: '100% engineer buy-in on grid UX'
    },
    {
      phase: 'High-Density Grid Scaffolding',
      title: 'Single-Pane Data Grid IA & Frozen Headers',
      desc: 'Re-architected 18-step quoting ordeal into single-pane high-density grid with instant formula calculation and zero modal disruptions.',
      deliverable: 'Single-Pane Grid IA Blueprint',
      metric: 'Steps reduced from 18 to 5'
    },
    {
      phase: 'Sub-16ms Reactive Tokens',
      title: 'Reactive Financial Token System & Guardrails',
      desc: 'Authored DesignOps token library with strict tabular typography, real-time margin status colors, and sub-16ms live formula recalculations.',
      deliverable: 'Ericsson CPQ Token Library',
      metric: 'Zero visual regression in QA'
    },
    {
      phase: 'Green-Channel Governance',
      title: 'Global Benchmark & Green-Channel Auto-Signoff',
      desc: 'Conducted usability benchmarking in Stockholm and Chennai; drove voluntary adoption to 94% in 30 days and reduced deal cycle from 6 days to 42 minutes.',
      deliverable: 'Usability Benchmark (SUS 87)',
      metric: 'Turnaround: 6d &rarr; 42m (-92%)'
    }
  ]"""

watson_steps = """[
    {
      phase: 'Mental Model & Trust Audit',
      title: 'Cognitive Mental Model & SOX Risk Audit',
      desc: 'Audited cognitive fatigue and liability anxiety when enterprise finance analysts review automated LLM database mutations across SAP and Salesforce.',
      deliverable: 'Cognitive Trust Audit & Risk Register',
      metric: 'Identified 18 hallucination risks'
    },
    {
      phase: '3-Tier Confidence Routing',
      title: 'Mathematical Confidence Gating Framework',
      desc: 'Designed 3-tier routing: Full Autonomy (>=95%), Supervised Review (80-94%), and Hard Human Override (<80%) to guarantee audit safety.',
      deliverable: 'Confidence Gating Architecture',
      metric: 'Zero unauthorized writes'
    },
    {
      phase: 'Agent Mesh State Machine',
      title: 'Multi-Agent Mesh Topology & Visual State Machine',
      desc: 'Engineered visual orchestration canvas showing live agent task hand-offs (SAP ERP -> CRM -> Jira) with real-time dependency status.',
      deliverable: 'Agentic Mesh Topology Map',
      metric: '78% review overhead reduction'
    },
    {
      phase: 'Side-by-Side Mutation Diff',
      title: 'Audit-Proof Ledger Mutation Diffing Drawer',
      desc: 'Created side-by-side database diff review highlighting pending adjustments with green addition and red deletion delta tokens before ERP write-back.',
      deliverable: 'Side-by-Side Diff Component Spec',
      metric: 'Review time: 45m -> 8m (-82%)'
    },
    {
      phase: 'SOX Compliance Flywheel',
      title: 'Cryptographic Audit Trail & Governance Flywheel',
      desc: 'Implemented immutable ledger logging with prompt parameter hashing and human approval timestamps; scaled across 6 global enterprise business units.',
      deliverable: 'SOX Audit Protocol & SUS 89 Report',
      metric: '0 SOX violations across 120k tasks'
    }
  ]"""

zebra_steps = """[
    {
      phase: 'Sub-Zero Thermal Shadowing',
      title: 'Contextual Research in -25°C Cold-Chain Freezers',
      desc: 'Shadowed warehouse pickers in Chicago and Memphis cold-storage facilities; documented screen fogging, hand numbness, and sudden battery drops.',
      deliverable: 'Sub-Zero Environmental Friction Map',
      metric: 'Identified 35% battery death rate'
    },
    {
      phase: '72px Heavy-Glove Ergonomics',
      title: 'Tactile Heavy-Glove Touch Architecture',
      desc: 'Scaled interactive touch targets from standard 44px to 72px with high-contrast tactile borders for workers wearing thick thermal gloves.',
      deliverable: 'Industrial Glove Ergonomics Spec',
      metric: 'Glove tap accuracy: 68% -> 99.8%'
    },
    {
      phase: 'Spatial Warehouse Floor IA',
      title: '2.5D Warehouse Topology & Device Telematics IA',
      desc: 'Structured interactive spatial console mapping 1,280 scanners across staging docks, conveyors, and sub-zero zones with real-time telemetry.',
      deliverable: 'Spatial Warehouse Topology Blueprint',
      metric: 'Device recovery: 48h -> 12m'
    },
    {
      phase: 'Zero-Touch 2D QR Protocol',
      title: '1-Second Optical Camera Staging Architecture',
      desc: 'Replaced 45-minute manual USB tethering per scanner with an instant 1-second optical camera scan of an encrypted 2D provisioning QR code.',
      deliverable: 'Zero-Touch Staging Protocol',
      metric: 'Staging time: 45m -> 1s (-99%)'
    },
    {
      phase: 'Predictive Battery Telematics',
      title: 'Machine Learning Battery Telematics & Global Rollout',
      desc: 'Engineered predictive battery degradation telemetry alerting supervisors 4 hours before cell failure; deployed across 45 international fulfillment hubs.',
      deliverable: 'Predictive Telematics Engine (SUS 88)',
      metric: 'Shift downtime reduced by 85%'
    }
  ]"""

carbon_steps = """[
    {
      phase: '14-Squad Visual Drift Audit',
      title: 'Cross-Squad CSS Drift & Visual Regression Audit',
      desc: 'Audited 14 disparate IBM software squads; identified 320+ hardcoded hex values, conflicting button radii, and 4-week hand-off friction.',
      deliverable: 'Token Drift Register (320 Leaks)',
      metric: 'Cataloged 4-week handoff lag'
    },
    {
      phase: '3-Tier Semantic Taxonomy',
      title: 'Enterprise Multi-Tier Token Architecture',
      desc: 'Engineered strict 3-tier hierarchy: Global Primitives (blue-60) -> Semantic Tokens (interactive-01) -> Component Tokens (button-primary-bg).',
      deliverable: '3-Tier Token Taxonomy Specification',
      metric: '180+ unified semantic tokens'
    },
    {
      phase: 'Figma-to-GitHub CI/CD Engine',
      title: 'Automated Style Dictionary Compiler Pipeline',
      desc: 'Built CI/CD pipeline using Figma REST API, Style Dictionary, and GitHub Actions to compile platform-agnostic token packages in seconds.',
      deliverable: 'Automated Style Dictionary Pipeline',
      metric: 'Token handoff: 4w -> 1d (-95%)'
    },
    {
      phase: 'Multi-Theme Runtime Engine',
      title: '0-Layout-Shift Runtime CSS Variable Injection',
      desc: 'Architected runtime theme engine allowing live switching across Carbon White, G10, G90, and G100 dark themes with zero layout shift.',
      deliverable: 'Runtime Theme Engine Architecture',
      metric: '100% design-to-code parity'
    },
    {
      phase: 'Federated RFC Systems Council',
      title: 'Federated Contribution SLA & Multi-Squad Flywheel',
      desc: 'Instituted weekly Design Review Council, component contribution RFC SLAs, and automated PR diff checks across all 14 squad repositories.',
      deliverable: 'Systems Contribution SLA (SUS 91)',
      metric: '14 squads synced with 0 regression'
    }
  ]"""

wabco_steps = """[
    {
      phase: 'Autobahn Night Shadowing',
      title: 'In-Cab Contextual Research on German Highways',
      desc: 'Shadowed commercial truck drivers on night freight routes across Germany; observed severe cognitive overload from aftermarket gadgets and unprioritized chimes.',
      deliverable: 'Driver Cognitive Load Map',
      metric: 'Identified 2.8s eyes-off-road risk'
    },
    {
      phase: 'Gaze Budgeting (<1.2s Legal Ceiling)',
      title: 'Infrared Gaze-Tracking & Glance Budgeting',
      desc: 'Conducted eye-tracking studies under simulated rain and fog; established strict 0.8-second glance ceiling to meet UNECE 158/159 EU safety standards.',
      deliverable: 'Glance Time Ergonomic Protocol',
      metric: 'Safety compliance: 100% UNECE'
    },
    {
      phase: '3-Zone Spatial Cluster Partitioning',
      title: '3-Zone Spatial Ergonomic Instrument Architecture',
      desc: 'Partitioned cluster display: Zone 1 (Immediate Forward Safety & Radar), Zone 2 (Turn Navigation), and Zone 3 (Peripheral Eco-Coaching).',
      deliverable: '3-Zone Ergonomic HUD Blueprint',
      metric: 'Glance duration: 2.8s -> 0.94s (-66%)'
    },
    {
      phase: 'Anti-Glare Lighting Engine',
      title: 'High-Contrast Glare-Shield Adaptive Palette',
      desc: 'Engineered dual daylight sunlight and anti-glare night lighting modes with suppressed blue light to prevent night blindness on unlit freight routes.',
      deliverable: 'Glare-Shield Luminescence Tokens',
      metric: 'Night eye fatigue reduced by 40%'
    },
    {
      phase: 'CAN-Bus Telematics Sync',
      title: 'CANopen Vehicle Bus Integration & Fleet Rollout',
      desc: 'Connected hardware CAN-bus engine sensors with cloud dispatch console for real-time fuel coaching; deployed across 80,000 European trucks.',
      deliverable: 'CAN-Bus Telematics Spec (SUS 86)',
      metric: 'Critical route errors cut by 18%'
    }
  ]"""

# ----------------------------------------------------------------------------
# 3. Interactive Prototype CSS
# ----------------------------------------------------------------------------
interactive_proto_styles = """
  /* Interactive Working Prototype Container & Styling */
  .interactive-prototype-window {
    background: #0B0E17;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    overflow: hidden;
    margin: 28px 0 36px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  }

  .proto-win-header {
    background: #111624;
    padding: 12px 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .proto-win-url {
    font-family: var(--font-code);
    font-size: 11px;
    color: #94A3B8;
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 12px;
    border-radius: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 500px;
  }

  .proto-win-badge {
    font-family: var(--font-code);
    font-size: 10.5px;
    font-weight: 700;
    color: #10B981;
    white-space: nowrap;
  }

  .proto-win-body {
    padding: 24px;
    background: #0D111C;
    color: #FFFFFF;
  }

  .proto-deal-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 18px;
    flex-wrap: wrap;
    gap: 14px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .proto-grid-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  .proto-grid-table th {
    text-align: left;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.04);
    color: #94A3B8;
    font-family: var(--font-code);
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .proto-grid-table td {
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: #E2E8F0;
  }

  .proto-grid-table tr:hover td {
    background: rgba(255, 255, 255, 0.02);
  }

  .grid-num-input {
    width: 56px;
    padding: 4px 8px;
    background: #1E293B;
    border: 1px solid #3B82F6;
    border-radius: 4px;
    color: #FFFFFF;
    font-family: var(--font-code);
    font-size: 12px;
    font-weight: 700;
    text-align: right;
  }

  .grid-num-input:focus {
    outline: 2px solid #60A5FA;
  }

  .margin-pill.margin-escalate {
    background: rgba(239, 68, 68, 0.2);
    color: #F87171;
    border-color: #EF4444;
  }

  .proto-action-btn {
    background: var(--primary-accent);
    color: #FFFFFF;
    border: none;
    padding: 10px 20px;
    border-radius: 100px;
    font-family: var(--font-heading);
    font-size: 12.5px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(240, 6, 88, 0.3);
  }

  .proto-action-btn:hover {
    background: #D0054B;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(240, 6, 88, 0.4);
  }

  .proto-reject-btn {
    background: transparent;
    color: #F87171;
    border: 1px solid rgba(248, 113, 113, 0.3);
    padding: 10px 18px;
    border-radius: 100px;
    font-family: var(--font-heading);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .proto-reject-btn:hover {
    background: rgba(248, 113, 113, 0.1);
    border-color: #F87171;
  }

  .proto-toast {
    margin-top: 14px;
    padding: 12px 18px;
    border-radius: 8px;
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid #10B981;
    color: #34D399;
    font-family: var(--font-code);
    font-size: 11.5px;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Watson Agent Node Cards */
  .agent-node-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 14px;
  }

  .agent-node-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .agent-pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .dot-active {
    background: #10B981;
    box-shadow: 0 0 8px #10B981;
  }

  .dot-pending {
    background: #F59E0B;
    box-shadow: 0 0 8px #F59E0B;
  }

  .agent-name {
    font-family: var(--font-heading);
    font-size: 12.5px;
    font-weight: 800;
    color: #FFFFFF;
  }

  .agent-status-badge {
    display: inline-block;
    font-family: var(--font-code);
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 6px;
  }

  .badge-success { background: rgba(16, 185, 129, 0.15); color: #34D399; }
  .badge-pending { background: rgba(245, 158, 11, 0.15); color: #FBBF24; }

  .agent-detail-text {
    font-size: 11px;
    color: #94A3B8;
    margin: 0;
    line-height: 1.4;
  }

  .conf-tier-btns, .zone-filter-group, .carbon-theme-btns, .lighting-mode-btns {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .btn-tier, .zone-btn, .c-theme-btn, .w-light-btn {
    background: #1E293B;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #CBD5E1;
    padding: 6px 12px;
    border-radius: 6px;
    font-family: var(--font-code);
    font-size: 10.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-tier.active, .zone-btn.active, .c-theme-btn.active, .w-light-btn.active {
    background: #3B82F6;
    color: #FFFFFF;
    border-color: #60A5FA;
  }

  /* Zebra Fleet Card */
  .zebra-scanner-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 14px;
  }

  .zebra-scanner-card.scanner-warn {
    border-color: rgba(220, 38, 38, 0.4);
    background: rgba(220, 38, 38, 0.05);
  }

  .scanner-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .scanner-model {
    font-family: var(--font-heading);
    font-size: 12px;
    font-weight: 800;
    color: #FFFFFF;
  }

  .scanner-badge-ok {
    font-family: var(--font-code);
    font-size: 9.5px;
    color: #34D399;
    background: rgba(16, 185, 129, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .scanner-badge-alert {
    font-family: var(--font-code);
    font-size: 9.5px;
    color: #F87171;
    background: rgba(220, 38, 38, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .scanner-loc {
    font-size: 11px;
    color: #94A3B8;
    margin-bottom: 8px;
  }

  .scanner-metrics-row {
    font-family: var(--font-code);
    font-size: 10.5px;
    color: #CBD5E1;
    display: flex;
    gap: 8px;
  }

  /* Wabco HUD Card */
  .hud-zone-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }

  .hud-zone-tag {
    font-family: var(--font-code);
    font-size: 10px;
    font-weight: 700;
    color: #94A3B8;
    letter-spacing: 0.05em;
  }

  /* Behance Project Crosslink Ribbon */
  .behance-project-crosslink {
    background: linear-gradient(135deg, rgba(0, 87, 255, 0.1) 0%, rgba(240, 6, 88, 0.08) 100%);
    border: 1px solid rgba(0, 87, 255, 0.25);
    border-radius: 10px;
    padding: 12px 18px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .behance-project-crosslink span {
    font-size: 12.5px;
    color: var(--text-main);
    font-weight: 600;
  }

  .behance-project-crosslink a {
    color: #0057FF;
    font-family: var(--font-code);
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
  }

  .behance-project-crosslink a:hover {
    text-decoration: underline;
  }
"""

# ----------------------------------------------------------------------------
# 4. Shared JavaScript for Interactive Prototypes
# ----------------------------------------------------------------------------
shared_proto_js = """
  <!-- Shared Interactive Working Prototype Logic -->
  <script>
    // 1. Ericsson BOM Recalculation
    function recalcEricssonDeal() {
      const rows = document.querySelectorAll('#ericsson-bom-rows tr');
      let totalRev = 0, totalCost = 0;
      rows.forEach(r => {
        const cost = parseFloat(r.getAttribute('data-cost')) || 0;
        const list = parseFloat(r.getAttribute('data-list')) || 0;
        const qty = parseFloat(r.getAttribute('data-qty')) || 0;
        const input = r.querySelector('.grid-num-input');
        const disc = parseFloat(input ? input.value : 0) || 0;
        const netUnit = list * (1 - disc / 100);
        const lineRev = netUnit * qty;
        const lineCost = cost * qty;
        totalRev += lineRev;
        totalCost += lineCost;
        const netEl = r.querySelector('.row-net-val');
        const marginEl = r.querySelector('.row-margin-val');
        if (netEl) netEl.textContent = '$' + Math.round(lineRev).toLocaleString();
        const lineMargin = lineRev > 0 ? ((lineRev - lineCost) / lineRev) * 100 : 0;
        if (marginEl) {
          marginEl.textContent = lineMargin.toFixed(1) + '%';
          marginEl.className = 'margin-pill ' + (lineMargin >= 35 ? 'margin-pass' : 'margin-escalate') + ' row-margin-val';
        }
      });
      const totalEl = document.getElementById('ericsson-total-val');
      const badgeEl = document.getElementById('ericsson-margin-badge');
      if (totalEl) totalEl.textContent = '$' + Math.round(totalRev).toLocaleString();
      const overallMargin = totalRev > 0 ? ((totalRev - totalCost) / totalRev) * 100 : 0;
      if (badgeEl) {
        if (overallMargin >= 35) {
          badgeEl.className = 'margin-pill margin-pass';
          badgeEl.textContent = overallMargin.toFixed(1) + '% GROSS MARGIN [PASS • GREEN CHANNEL]';
        } else {
          badgeEl.className = 'margin-pill margin-escalate';
          badgeEl.textContent = overallMargin.toFixed(1) + '% GROSS MARGIN [⚠️ ESCALATION REQUIRED • VP REVIEW]';
        }
      }
    }
    function triggerEricssonQuotePdf() {
      const t = document.getElementById('ericsson-toast');
      if (t) { t.style.display = 'block'; setTimeout(() => { t.style.display = 'none'; }, 4500); }
    }

    // 2. Watson Confidence & Diff
    function setWatsonConfidence(tier) {
      const label = document.getElementById('watson-conf-label');
      const desc = document.getElementById('watson-conf-desc');
      document.querySelectorAll('.conf-tier-btns .btn-tier').forEach(b => b.classList.remove('active'));
      if (tier === 'high') {
        const btn = document.getElementById('wconf-high');
        if (btn) btn.classList.add('active');
        if (label) { label.textContent = '96.4% AI Confidence [Tier 1: Full Autonomy]'; label.style.color = '#34D399'; }
        if (desc) desc.textContent = 'Tier 1 Routing: Score exceeds 95% threshold. Safe for automated execution with post-commit notification.';
      } else if (tier === 'med') {
        const btn = document.getElementById('wconf-med');
        if (btn) btn.classList.add('active');
        if (label) { label.textContent = '94.2% AI Confidence [Tier 2: Supervised Draft]'; label.style.color = '#60A5FA'; }
        if (desc) desc.textContent = 'Tier 2 Routing: Side-by-side database diff verification required before irreversible write-back to SAP S/4HANA.';
      } else {
        const btn = document.getElementById('wconf-low');
        if (btn) btn.classList.add('active');
        if (label) { label.textContent = '74.0% AI Confidence [Tier 3: Low Confidence]'; label.style.color = '#F87171'; }
        if (desc) desc.textContent = 'Tier 3 Routing: Complex discrepancy detected. Hard escalation triggered to Corporate Financial Controller.';
      }
    }
    function commitWatsonLedger() {
      const t = document.getElementById('watson-toast');
      if (t) {
        t.style.display = 'block';
        t.style.background = 'rgba(16, 185, 129, 0.15)';
        t.style.borderColor = '#10B981';
        t.style.color = '#34D399';
        t.textContent = '🚀 Transaction #TX-88219 committed to SAP S/4HANA & SOX Cryptographic Audit Trail Logged!';
        setTimeout(() => { t.style.display = 'none'; }, 4500);
      }
    }
    function rejectWatsonLedger() {
      const t = document.getElementById('watson-toast');
      if (t) {
        t.style.display = 'block';
        t.style.background = 'rgba(239, 68, 68, 0.15)';
        t.style.borderColor = '#EF4444';
        t.style.color = '#F87171';
        t.textContent = '⚠️ Transaction rejected. Diverted to manual controller review queue.';
        setTimeout(() => { t.style.display = 'none'; }, 4500);
      }
    }

    // 3. Zebra Zone Filter & Scan
    function filterZebraZone(zone) {
      document.querySelectorAll('.zone-filter-group .zone-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById('zbtn-' + zone);
      if (activeBtn) activeBtn.classList.add('active');
      const alertEl = document.getElementById('zebra-cold-alert');
      const gloveInd = document.getElementById('zebra-glove-mode-indicator');
      if (zone === 'c') {
        if (alertEl) alertEl.style.display = 'block';
        if (gloveInd) {
          gloveInd.textContent = '🧤 Heavy Thermal Glove Mode: 72px Targets [ACTIVE]';
          gloveInd.style.background = 'rgba(240, 6, 88, 0.15)';
          gloveInd.style.color = '#F43F5E';
          gloveInd.style.borderColor = '#F43F5E';
        }
      } else {
        if (alertEl) alertEl.style.display = 'none';
        if (gloveInd) {
          gloveInd.textContent = '🧤 Standard Touch Targets: 44px';
          gloveInd.style.background = 'rgba(16, 185, 129, 0.1)';
          gloveInd.style.color = '#34D399';
          gloveInd.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        }
      }
    }
    function triggerZebraScan() {
      const t = document.getElementById('zebra-toast');
      if (t) { t.style.display = 'block'; setTimeout(() => { t.style.display = 'none'; }, 4500); }
    }

    // 4. Carbon Theme Switcher
    function setCarbonTheme(theme) {
      document.querySelectorAll('.carbon-theme-btns .c-theme-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById('cbtn-' + theme);
      if (activeBtn) activeBtn.classList.add('active');
      const stage = document.getElementById('carbon-live-stage');
      const btn = document.getElementById('carbon-btn-primary');
      const input = document.getElementById('carbon-input');
      const tint = document.getElementById('t-int');
      const tbg = document.getElementById('t-bg');
      const tfield = document.getElementById('t-field');
      const ttext = document.getElementById('t-text');

      if (!stage) return;
      if (theme === 'white') {
        stage.style.background = '#FFFFFF'; stage.style.color = '#161616'; stage.style.borderColor = '#E0E0E0';
        if (btn) btn.style.background = '#0F62FE';
        if (input) { input.style.background = '#F4F4F4'; input.style.borderColor = '#8D8D8D'; input.style.color = '#161616'; }
        if (tint) tint.textContent = '#0F62FE';
        if (tbg) tbg.textContent = '#FFFFFF';
        if (tfield) tfield.textContent = '#F4F4F4';
        if (ttext) ttext.textContent = '#161616';
      } else if (theme === 'g10') {
        stage.style.background = '#F4F4F4'; stage.style.color = '#161616'; stage.style.borderColor = '#D1D5DB';
        if (btn) btn.style.background = '#0F62FE';
        if (input) { input.style.background = '#FFFFFF'; input.style.borderColor = '#8D8D8D'; input.style.color = '#161616'; }
        if (tint) tint.textContent = '#0F62FE';
        if (tbg) tbg.textContent = '#F4F4F4';
        if (tfield) tfield.textContent = '#FFFFFF';
        if (ttext) ttext.textContent = '#161616';
      } else if (theme === 'g90') {
        stage.style.background = '#262626'; stage.style.color = '#F4F4F4'; stage.style.borderColor = '#525252';
        if (btn) btn.style.background = '#78A9FF';
        if (input) { input.style.background = '#393939'; input.style.borderColor = '#6F6F6F'; input.style.color = '#FFFFFF'; }
        if (tint) tint.textContent = '#78A9FF';
        if (tbg) tbg.textContent = '#262626';
        if (tfield) tfield.textContent = '#393939';
        if (ttext) ttext.textContent = '#F4F4F4';
      } else if (theme === 'g100') {
        stage.style.background = '#161616'; stage.style.color = '#FFFFFF'; stage.style.borderColor = '#393939';
        if (btn) btn.style.background = '#4589DF';
        if (input) { input.style.background = '#262626'; input.style.borderColor = '#525252'; input.style.color = '#FFFFFF'; }
        if (tint) tint.textContent = '#4589DF';
        if (tbg) tbg.textContent = '#161616';
        if (tfield) tfield.textContent = '#262626';
        if (ttext) ttext.textContent = '#FFFFFF';
      }
    }
    function triggerCarbonPr() {
      const t = document.getElementById('carbon-toast');
      if (t) { t.style.display = 'block'; setTimeout(() => { t.style.display = 'none'; }, 4500); }
    }

    // 5. Wabco HUD Simulator
    function setWabcoLighting(mode) {
      document.querySelectorAll('.lighting-mode-btns .w-light-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById('wbtn-' + mode);
      if (activeBtn) activeBtn.classList.add('active');
      const body = document.getElementById('wabco-hud-body');
      if (!body) return;
      if (mode === 'day') {
        body.style.background = '#F8FAFC';
        body.style.color = '#0F172A';
      } else {
        body.style.background = '#06090F';
        body.style.color = '#FFFFFF';
      }
    }
    function updateWabcoSpeed(val) {
      const speedEl = document.getElementById('wabco-speed-num');
      const sliderVal = document.getElementById('wabco-slider-val');
      const radarInfo = document.getElementById('wabco-radar-info');
      if (speedEl) speedEl.innerHTML = val + ' <span style="font-size: 16px;">KM/H</span>';
      if (sliderVal) sliderVal.textContent = val + ' km/h';
      const distance = Math.round(val * 0.96);
      if (radarInfo) radarInfo.innerHTML = 'Safe Radar Distance: <strong>' + distance + 'm</strong> &bull; Headway: 2.4s';
    }
    function triggerWabcoHazard() {
      const alertEl = document.getElementById('wabco-hazard-alert');
      const t = document.getElementById('wabco-toast');
      if (alertEl) { alertEl.style.display = 'block'; setTimeout(() => { alertEl.style.display = 'none'; }, 5000); }
      if (t) { t.style.display = 'block'; setTimeout(() => { t.style.display = 'none'; }, 5000); }
    }
  </script>
"""
