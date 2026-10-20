# execute_specialization_update.py
# Clean, deterministic script to update build_executive_suite.js

import os
import sys

print("--- 1. Reading clean build_executive_suite.js ---")
with open('build_executive_suite.js', 'r', encoding='utf-8') as f:
    text = f.read()

part_b_pos = text.find('// PART B: work.html')
part_c_pos = text.find('// PART C: 5 FULL-SIZE, MULTI-SECTION SCROLLABLE DEEP DIVES')
part_d_pos = text.find('// PART D: UPDATE NAVIGATION IN leadership.html AND cv.html')

if part_b_pos == -1 or part_c_pos == -1 or part_d_pos == -1:
    print(f"ERROR: Boundaries not found in build_executive_suite.js: b={part_b_pos}, c={part_c_pos}, d={part_d_pos}")
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

# Import clean data
from specialization_data import (
    ericsson_proto_html, watson_proto_html, zebra_proto_html,
    carbon_proto_html, wabco_proto_html,
    ericsson_steps, watson_steps, zebra_steps,
    carbon_steps, wabco_steps,
    interactive_proto_styles, shared_proto_js
)

# 1. Inject CSS into scrollableCaseStyles
css_end_marker = "  }\n`;\n\n\n// Helper function to build a full-depth"
if css_end_marker not in part_c:
    css_end_marker = "  }\n`;\n\n// Helper function to build a full-depth"

if css_end_marker in part_c:
    part_c = part_c.replace(css_end_marker, "  }\n" + interactive_proto_styles + "\n`;\n\n\n// Helper function to build a full-depth")
    print("CSS injected into scrollableCaseStyles cleanly.")
else:
    print("ERROR: css_end_marker not found in part_c")
    sys.exit(1)

# 2. Inject Behance cross-link into Section 04
behance_crosslink_html = """
        <!-- Behance Visual Craft Cross-Link Banner -->
        <div class="behance-project-crosslink" aria-label="Behance Visual Portfolio Link">
          <span>🎨 <strong>Behance Craft Gallery:</strong> High-resolution visual artifacts and Figma screens for this project are published on Behance:</span>
          <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener noreferrer">behance.net/balaajeeVR &rarr;</a>
        </div>
"""
pos_sec_ui = part_c.find('<!-- Section 04: Interactive Solution Showcase -->')
if pos_sec_ui != -1:
    pos_stage = part_c.find('<div class="annotated-screenshot-stage">', pos_sec_ui)
    if pos_stage != -1:
        part_c = part_c[:pos_stage] + behance_crosslink_html + "\n        " + part_c[pos_stage:]
        print("Behance cross-link injected into Section 04.")

# 3. Inject shared_proto_js before </body> in buildScrollableCasePage
pos_body_close = part_c.find('</body>')
if pos_body_close != -1:
    part_c = part_c[:pos_body_close] + shared_proto_js + "\n" + part_c[pos_body_close:]
    print("Shared prototype interaction JavaScript added before </body>.")

# 4. Helper function to replace managerSteps and uiMockupHtml in a dataset
def replace_case_data(c_name, new_steps, new_proto, c_text):
    pos_c = c_text.find(f"const {c_name} = ")
    if pos_c == -1:
        print(f"ERROR: {c_name} not found")
        sys.exit(1)
    
    # Replace managerSteps
    pos_ms = c_text.find("managerSteps: [", pos_c)
    pos_ms_end = c_text.find("],\n  architectureInfographicHtml:", pos_ms)
    c_text = c_text[:pos_ms + len("managerSteps: ")] + new_steps.strip() + c_text[pos_ms_end + 1:]
    
    # Recalculate pos_c
    pos_c = c_text.find(f"const {c_name} = ")
    # Replace uiMockupHtml
    pos_ui = c_text.find("uiMockupHtml: `", pos_c)
    pos_ui_end = c_text.find("`,\n  tokensProse:", pos_ui)
    c_text = c_text[:pos_ui + len("uiMockupHtml: ")] + new_proto.strip() + c_text[pos_ui_end + 1:]
    
    print(f"Successfully updated {c_name}")
    return c_text

part_c = replace_case_data("ericssonData", ericsson_steps, ericsson_proto_html, part_c)
part_c = replace_case_data("watsonData", watson_steps, watson_proto_html, part_c)
part_c = replace_case_data("zebraData", zebra_steps, zebra_proto_html, part_c)
part_c = replace_case_data("carbonData", carbon_steps, carbon_proto_html, part_c)
part_c = replace_case_data("wabcoData", wabco_steps, wabco_proto_html, part_c)

# 5. Assemble full file
full_suite = part_a + part_b + "// ============================================================================\n" + part_c + "\n\n" + part_d

with open('build_executive_suite.js', 'w', encoding='utf-8') as f:
    f.write(full_suite)

print("--- Successfully written new build_executive_suite.js! Total length:", len(full_suite))
