# download_behance_assets.py
import json
import os
import urllib.request
import time

print("Starting high-resolution Behance assets downloader...")

with open("authentic_behance_images.json", "r", encoding="utf-8") as f:
    catalog = json.load(f)

# Output directories
DIR_ASSETS = "assets/behance"
DIR_SCREENSHOTS = "screenshots/behance"
os.makedirs(DIR_ASSETS, exist_ok=True)
os.makedirs(DIR_SCREENSHOTS, exist_ok=True)

# Precise naming mapping to cleanly replace existing files and add new gallery originals
# Format: (project_key, image_index_1_based, target_filename, description)
MAPPINGS = [
    # Sales Automation Tool (IBM Watson Case 1 & Archive)
    ("sales", 1, "sales_estimation_clean.png", "Scenario A vs B Business Case Modeler (1200x3772)"),
    ("sales", 2, "sales_estimation_tool.png", "Core vs RAN Algorithmic Estimation (1200x1196)"),
    ("sales", 3, "sales_scenario_clean.png", "Gross Margin Variance Breakdown (1200x788)"),
    
    # Networks Design Project (Ericsson Case 2 & Archive)
    ("networks", 8, "ericsson_desktop_grid.png", "Holistic view of entire network info customizable dashboard (1400x732)"),
    ("networks", 2, "ericsson_mobile_screens.png", "5-Screen Mobile Network Observability (1400x1409)"),
    ("networks", 1, "ericsson_problem_framework.png", "Clearly Defining Problems to Solve (1400x964)"),
    ("networks", 11, "network_configuration_ui.png", "200-device configuration & topology matrix (1400x680)"),
    ("networks", 5, "network_mobile_screens.png", "Mobile Telematics & Live Incident Feed (1400x990)"),
    ("networks", 10, "ericsson_desktop_grid_screens.png", "Network detail Map view option 1 (1400x680)"),
    
    # An Enterprise Project (Zebra Technologies Case 3 & Archive)
    ("enterprise", 6, "zebra_iot_dashboard.png", "VisibilityIQ™ Device & Battery Health Insights Console (1400x1569)"),
    ("enterprise", 6, "zebra_iot_insights_dashboard.png", "VisibilityIQ™ Device Health Insights Console (1400x1569)"),
    ("enterprise", 6, "zebra_rfid_clean.png", "VisibilityIQ™ RFID & Scanner Telematics Console (1400x1569)"),
    ("enterprise", 2, "zebra_card_sorting.png", "Stakeholder IA Card Sorting Matrix (1400x730)"),
    ("enterprise", 3, "zebra_user_flow.png", "End-to-End Fleet Health Monitoring User Flow Map (1400x1106)"),
    ("enterprise", 4, "zebra_user_flow_tree.png", "Automated Diagnostic Branching Tree (1400x2319)"),
    ("enterprise", 1, "zebra_it_manager_persona.png", "Field Research Persona: Jamie IT Operations Manager (1400x889)"),
    
    # Mobile Projects (ZF Wabco Case 5 & Archive)
    ("mobile", 2, "zf_mobile_clean.png", "High-Contrast Mobile Telematics & Automotive Cockpit (1400x990)"),
    ("mobile", 3, "mobile_telematics_clean.png", "Live Radar Headway & Speed HUD Cluster (1400x990)"),
    ("mobile", 4, "mobile_telematics.png", "Multi-Screen Fleet Event Stream & Route Log (1400x990)"),
    
    # Web Projects (IBM Carbon Case 4 & Archive)
    ("web", 1, "carbon_admin_clean.png", "Ready2Go Multi-Tenant Administration Web Platform (1400x990)"),
    ("web", 1, "carbon_tokens_clean.png", "Carbon Design System Tokens & Console (1400x990)"),
    ("web", 2, "carbon_ready2go_clean.png", "High-Density Incident Monitoring & Alert Matrix (1400x990)"),
    ("web", 3, "web_admin_portal.png", "Enterprise System Configuration & Audit Logs (1400x990)"),
    
    # Gaming Projects (Visual Archive Gallery 6)
    ("gaming", 1, "gaming_ui_1.png", "Greedy Jump Gameplay Canvas & Promotional Feature (1400x990)"),
    ("gaming", 2, "gaming_ui_2.png", "Level Architecture & Touch Mechanic Physics (1400x990)"),
    
    # My Achievements (Visual Archive Gallery 7)
    ("achievements", 1, "ericsson_hackfest_cert.png", "Ericsson Hackfest Certificate & Honors (1400x990)"),
    ("achievements", 2, "ericsson_hackfest_cert_2.png", "Innovation Awards & Recognition (1400x990)")
]

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.behance.net/"
}

print(f"Downloading {len(MAPPINGS)} authentic deliverables...")

downloaded_count = 0
for proj_key, img_idx, filename, desc in MAPPINGS:
    proj = catalog.get(proj_key)
    if not proj:
        print(f"Project key {proj_key} not found")
        continue
    
    # 0-indexed lookup
    idx_0 = img_idx - 1
    if idx_0 >= len(proj["images"]):
        print(f"Index {img_idx} out of range for {proj_key}")
        continue
        
    img_obj = proj["images"][idx_0]
    raw_url = img_obj["rawPngUrl"]
    
    print(f"\n[{downloaded_count+1}/{len(MAPPINGS)}] Downloading {filename}:")
    print(f"  Description: {desc}")
    print(f"  Source URL:  {raw_url}")
    
    req = urllib.request.Request(raw_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            
            # Save to assets/behance/
            path_assets = os.path.join(DIR_ASSETS, filename)
            with open(path_assets, "wb") as out_f:
                out_f.write(data)
                
            # Also save to screenshots/behance/ to instantly replace old screenshots
            path_screenshots = os.path.join(DIR_SCREENSHOTS, filename)
            with open(path_screenshots, "wb") as out_f:
                out_f.write(data)
                
            print(f"  -> SUCCESS ({len(data):,} bytes saved to {path_assets} & {path_screenshots})")
            downloaded_count += 1
            time.sleep(0.3)
    except Exception as e:
        print(f"  -> FAILED to download {raw_url}: {e}")

print(f"\nFinished: Successfully downloaded {downloaded_count}/{len(MAPPINGS)} high-resolution original images.")
