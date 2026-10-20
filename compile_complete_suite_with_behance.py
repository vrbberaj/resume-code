# compile_complete_suite_with_behance.py
import json
import os
import subprocess
import sys

print("=== 1. PREPARING COMPLETE SUITE WITH AUTHENTIC BEHANCE ARTIFACTS ===")

with open('build_executive_suite.js', 'r', encoding='utf-8') as f:
    text = f.read()

part_b_pos = text.find('// PART B: work.html')
part_c_pos = text.find('// PART C: 5 FULL-SIZE, MULTI-SECTION SCROLLABLE DEEP DIVES')
part_d_pos = text.find('// PART D: UPDATE NAVIGATION IN leadership.html AND cv.html')

if part_b_pos == -1 or part_c_pos == -1 or part_d_pos == -1:
    print(f"ERROR: Boundaries not found: b={part_b_pos}, c={part_c_pos}, d={part_d_pos}")
    sys.exit(1)

part_a = text[:part_b_pos]
part_d = text[part_d_pos:]

# Load Part B from update_suite_specializations.py
with open('update_suite_specializations.py', 'r', encoding='utf-8') as f:
    spec_content = f.read()

p_start = spec_content.find('// PART B: work.html — DEDICATED SELECTED WORK PORTAL')
end_marker = "console.log('work.html compiled successfully (Dedicated Selected Work Portal).');"
p_end = spec_content.find(end_marker)

if p_start == -1 or p_end == -1:
    print("ERROR: Part B markers not found in update_suite_specializations.py")
    sys.exit(1)

part_b = spec_content[p_start:p_end + len(end_marker)].strip() + "\n\n"
print("Part A and Part B prepared.")

# Extract Part C
part_c = text[part_c_pos:part_d_pos]

# Import clean specialization data
from specialization_data import (
    ericsson_proto_html, watson_proto_html, zebra_proto_html,
    carbon_proto_html, wabco_proto_html,
    ericsson_steps, watson_steps, zebra_steps,
    carbon_steps, wabco_steps,
    interactive_proto_styles, shared_proto_js,
    behance_artifacts
)

# 1. CSS for Behance showcase with strict 0-overflow rules
behance_showcase_css = """
  /* Authentic Behance Evidence Showcase in Section 04 */
  .behance-artifacts-showcase {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(96, 165, 250, 0.28);
    border-radius: 16px;
    padding: 28px 24px;
    margin: 32px 0;
    box-shadow: 0 12px 36px -10px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
  }
  .behance-showcase-header {
    margin-bottom: 24px;
    max-width: 100%;
    overflow: hidden;
  }
  .behance-showcase-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  .behance-verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(37, 99, 235, 0.2);
    color: #60a5fa;
    border: 1px solid rgba(96, 165, 250, 0.4);
    font-family: var(--font-code);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
  }
  .behance-showcase-title {
    font-size: 20px;
    font-weight: 700;
    color: #f8fafc;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .behance-showcase-desc {
    font-size: 14px;
    line-height: 1.6;
    color: #94a3b8;
    margin: 0;
    max-width: 820px;
  }
  .behance-gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
  }
  .behance-artifact-card {
    background: rgba(2, 6, 23, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, border-color 0.2s ease;
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
  }
  .behance-artifact-card:hover {
    transform: translateY(-2px);
    border-color: rgba(96, 165, 250, 0.4);
  }
  .behance-card-img-wrap {
    position: relative;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: 220px;
    background: #090d16;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    box-sizing: border-box;
  }
  .behance-card-img {
    width: 100% !important;
    max-width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    display: block !important;
    transition: transform 0.3s ease;
    box-sizing: border-box !important;
  }
  .behance-artifact-card:hover .behance-card-img {
    transform: scale(1.03);
  }
  .behance-img-tag {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(8px);
    color: #93c5fd;
    border: 1px solid rgba(96, 165, 250, 0.3);
    font-family: var(--font-code);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 3px 8px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }
  .behance-card-info {
    padding: 16px 18px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    max-width: 100%;
  }
  .behance-card-title {
    font-size: 15px;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0 0 6px 0;
    line-height: 1.4;
  }
  .behance-card-desc {
    font-size: 12.5px;
    line-height: 1.55;
    color: #94a3b8;
    margin: 0;
    flex-grow: 1;
  }
  .sticky-case-toc {
    max-width: 100vw;
    overflow: hidden;
  }
  .toc-wrap {
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  @media (max-width: 768px) {
    .behance-artifacts-showcase {
      padding: 20px 16px;
    }
    .behance-gallery-grid {
      grid-template-columns: 1fr;
    }
    .behance-card-img-wrap {
      height: 190px;
    }
  }
"""

# Global img reset in part_a
if "img { max-width: 100%;" not in part_a:
    part_a = part_a.replace(
        "* { box-sizing: border-box; margin: 0; padding: 0; }",
        "* { box-sizing: border-box; margin: 0; padding: 0; }\n  img { max-width: 100%; height: auto; }"
    )
    print("Added global img reset to part_a.")

# Replace existing behance-artifacts-showcase block or insert into scrollableCaseStyles
if ".behance-artifacts-showcase {" in part_c:
    p_s = part_c.find("/* Authentic Behance Evidence Showcase in Section 04 */")
    p_e = part_c.find(".sticky-case-toc", p_s)
    if p_s != -1 and p_e != -1:
        part_c = part_c[:p_s] + behance_showcase_css + "\n  " + part_c[p_e:]
        print("Updated behance_showcase_css with strict overflow guardrails.")
    else:
        # fallback replace
        p_end_card = part_c.find("`;\n\n// Helper function", p_s)
        if p_end_card != -1:
            part_c = part_c[:p_s] + behance_showcase_css + "\n" + part_c[p_end_card:]
else:
    pos_hover = part_c.find(".behance-project-crosslink a:hover {\n    text-decoration: underline;\n  }")
    if pos_hover != -1:
        insert_pos = pos_hover + len(".behance-project-crosslink a:hover {\n    text-decoration: underline;\n  }\n")
        part_c = part_c[:insert_pos] + "\n" + behance_showcase_css + "\n" + part_c[insert_pos:]
        print("Injected behance_showcase_css into scrollableCaseStyles after behance-project-crosslink.")
    else:
        pos_styles = part_c.find("const scrollableCaseStyles = `")
        if pos_styles != -1:
            insert_pos = pos_styles + len("const scrollableCaseStyles = `\n")
            part_c = part_c[:insert_pos] + behance_showcase_css + "\n  " + part_c[insert_pos:]
            print("Injected behance_showcase_css at start of scrollableCaseStyles.")

# 2. Add helper function getBehanceShowcaseHtml(data)
helper_function_js = """
// Helper function to render authentic Behance visual artifacts
function getBehanceShowcaseHtml(data) {
  if (!data.behanceArtifacts || data.behanceArtifacts.length === 0) return '';
  const artifactCards = data.behanceArtifacts.map(a => `
    <div class="behance-artifact-card">
      <div class="behance-card-img-wrap">
        <img src="${a.img}" alt="${a.title}" class="behance-card-img" loading="lazy">
        <span class="behance-img-tag">${a.tag}</span>
      </div>
      <div class="behance-card-info">
        <h4 class="behance-card-title">${a.title}</h4>
        <p class="behance-card-desc">${a.desc}</p>
      </div>
    </div>
  `).join('');

  return `
    <!-- Authentic Behance Production Artifacts Showcase -->
    <div class="behance-artifacts-showcase" aria-label="Authentic Behance Portfolio Evidence">
      <div class="behance-showcase-header">
        <div class="behance-showcase-title-row">
          <span class="behance-verified-badge">🎨 AUTHENTIC BĒHANCE EVIDENCE</span>
          <h3 class="behance-showcase-title">Visual Deliverables from My Public Behance Portfolio</h3>
        </div>
        <p class="behance-showcase-desc">
          Direct, unaltered production screens, information architecture maps, and responsive interfaces extracted from my public Behance portfolio archive (<strong>behance.net/balaajeeVR</strong>).
        </p>
      </div>
      <div class="behance-gallery-grid">
        ${artifactCards}
      </div>
    </div>
  `;
}
"""

if "function getBehanceShowcaseHtml(data)" not in part_c:
    pos_fn = part_c.find("function buildScrollableCasePage(data) {")
    if pos_fn != -1:
        part_c = part_c[:pos_fn] + helper_function_js + "\n\n" + part_c[pos_fn:]
        print("Injected getBehanceShowcaseHtml before buildScrollableCasePage.")

# Replace ${behanceShowcaseHtml} with ${getBehanceShowcaseHtml(data)}
if "${behanceShowcaseHtml}" in part_c:
    part_c = part_c.replace("${behanceShowcaseHtml}", "${getBehanceShowcaseHtml(data)}")
    print("Replaced ${behanceShowcaseHtml} with ${getBehanceShowcaseHtml(data)}.")

# 3. Helper to inject behanceArtifacts into each caseData
def inject_behance_to_dataset(c_name, artifacts_list, c_text):
    pos_c = c_text.find(f"const {c_name} = {{")
    if pos_c == -1:
        print(f"ERROR: {c_name} not found")
        return c_text
    
    pos_end_data = c_text.find("};\n", pos_c)
    data_block = c_text[pos_c:pos_end_data]
    if "behanceArtifacts:" in data_block:
        p_b_start = data_block.find("behanceArtifacts:")
        p_b_end = data_block.find("],\n", p_b_start)
        if p_b_start != -1 and p_b_end != -1:
            artifacts_json = json.dumps(artifacts_list, indent=4)
            artifacts_js = f"behanceArtifacts: {artifacts_json},\n"
            c_text = c_text[:pos_c + p_b_start] + artifacts_js + c_text[pos_c + p_b_end + 3:]
            print(f"Updated behanceArtifacts in {c_name}.")
            return c_text

    artifacts_json = json.dumps(artifacts_list, indent=4)
    artifacts_js = f"  behanceArtifacts: {artifacts_json},\n"
    insert_pos = pos_c + len(f"const {c_name} = {{\n")
    c_text = c_text[:insert_pos] + artifacts_js + c_text[insert_pos:]
    print(f"Injected behanceArtifacts into {c_name}.")
    return c_text

part_c = inject_behance_to_dataset("ericssonData", behance_artifacts["ericsson"], part_c)
part_c = inject_behance_to_dataset("watsonData", behance_artifacts["watson"], part_c)
part_c = inject_behance_to_dataset("zebraData", behance_artifacts["zebra"], part_c)
part_c = inject_behance_to_dataset("carbonData", behance_artifacts["carbon"], part_c)
part_c = inject_behance_to_dataset("wabcoData", behance_artifacts["wabco"], part_c)

# 4. Assemble and write build_executive_suite.js
full_suite = part_a + part_b + "// ============================================================================\n" + part_c + "\n\n" + part_d

with open('build_executive_suite.js', 'w', encoding='utf-8') as f:
    f.write(full_suite)

print("--- Successfully compiled build_executive_suite.js! Total length:", len(full_suite))
