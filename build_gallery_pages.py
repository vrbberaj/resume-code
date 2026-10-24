# build_gallery_pages.py
# Generates:
#   work.html                -> Case Studies gallery (grid). Each card opens its own case-study page.
#   archive.html             -> Visual Archive gallery, a replica of the Behance profile grid.
#   archive-<slug>.html      -> One page per Behance project, images stacked like a Behance project view.
import glob
import html
import os
import re

from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

BEHANCE_PROFILE = "https://www.behance.net/balaajeeVR"
OWNER = "Balaajee V R"

# ---------------------------------------------------------------------------
# Shared site chrome (same header + core tokens as every other page)
# ---------------------------------------------------------------------------
with open("build_executive_suite.js", "r", encoding="utf-8") as f:
    _suite = f.read()
_m = re.search(r"const globalCoreStyles = `([\s\S]*?)`;", _suite)
GLOBAL_CORE_STYLES = _m.group(1) if _m else ""

HEAD_LINKS = """
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap">
"""


def header(active):
    def cls(key):
        return "nav-item active" if key == active else "nav-item"
    return f"""
  <header class="global-header">
    <div class="header-container">
      <a href="index.html" class="brand-link" aria-label="Balaajee V.R. Portfolio Home">
        <span class="brand-monogram" aria-hidden="true">B</span>
      </a>
      <nav class="nav-links" aria-label="Main Navigation">
        <a href="index.html" class="{cls('work')}">Selected Work</a>
        <a href="leadership.html" class="{cls('leadership')}">Leadership</a>
        <a href="leadership-deck.html" class="{cls('leadership-deck')}">Leadership Deck</a>
        <a href="archive.html" class="{cls('archive')}">Visual Archive</a>
        <a href="gallery.html" class="{cls('gallery')}">Career Gallery</a>
        <a href="cv.html" class="{cls('cv')}">My Resume</a>
      </nav>
      <div class="header-actions">
        <a href="contact.html" class="btn-contact">Get In Touch &rarr;</a>
      </div>
    </div>
  </header>"""


FOOTER = """
  <footer class="g-footer">
    <div class="g-wrap g-footer-row">
      <div>
        <strong>Balaajee V.R. &bull; Senior UI/UX Design Manager</strong>
        <span>Chennai / Bengaluru, India &bull; Open to Relocation</span>
      </div>
      <div class="g-footer-links">
        <a href="mailto:vrbberaj@gmail.com">vrbberaj@gmail.com</a>
        <a href="https://www.linkedin.com/in/balaajee-vr-21647967/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://www.behance.net/balaajeeVR" target="_blank" rel="noopener">Behance</a>
      </div>
    </div>
  </footer>"""

# Page-level styles shared by the three templates (light, editorial, generous whitespace)
GALLERY_STYLES = """
  body { background: #FAFAF9; }
  .g-wrap { max-width: 1240px; margin: 0 auto; padding: 0 24px; }

  /* Page intro */
  .g-intro { padding-top: 72px; padding-bottom: 40px; }
  .g-overline {
    font-family: var(--font-body); font-size: 13px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted);
    margin-bottom: 14px;
  }
  .g-title {
    font-family: var(--font-heading); font-weight: 800; color: var(--text-main);
    font-size: clamp(34px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.03em;
    margin-bottom: 16px;
  }
  .g-sub { font-size: 18px; line-height: 1.6; color: var(--text-body); max-width: 640px; }

  /* Footer */
  .g-footer { border-top: 1px solid var(--border-subtle); background: #FFFFFF; margin-top: 96px; padding: 36px 0; }
  .g-footer-row { display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
  .g-footer-row strong { display: block; font-family: var(--font-heading); font-size: 15px; color: var(--text-main); }
  .g-footer-row span { font-size: 13px; color: var(--text-muted); }
  .g-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
  .g-footer-links a { font-size: 13px; font-weight: 600; color: var(--text-muted); text-decoration: none; }
  .g-footer-links a:hover { color: var(--primary-accent); }

  @media (max-width: 640px) {
    .g-intro { padding-top: 44px; padding-bottom: 28px; }
    .g-sub { font-size: 16px; }
    .g-wrap { padding: 0 16px; }
  }
"""


def page(title, description, active, body, extra_css=""):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(description)}">
{HEAD_LINKS}
  <style>
{GLOBAL_CORE_STYLES}
{GALLERY_STYLES}
{extra_css}
  </style>
</head>
<body>
{header(active)}
{body}
{FOOTER}
</body>
</html>
"""


def img_size(path):
    try:
        with Image.open(path) as im:
            return im.size
    except Exception:
        return (1400, 990)


# ===========================================================================
# 1. CASE STUDIES GALLERY  (work.html)
# ===========================================================================
# Short card leads; titles, covers and metrics come from portfolio_content.py
CARD_TITLES = {
    "case-ibm-watson.html": "Enterprise AI Governance & Agentic Human-in-the-Loop Orchestration",
    "case-ericsson.html": "Transforming Mission-Critical Telecom CPQ for Global Carriers",
    "case-zebra.html": "Frontline Mobile UX & Device Health for 38,000+ Rugged Handhelds",
    "case-ibm-carbon.html": "Multi-Brand Design Token Architecture Across 45+ Engineering Squads",
    "case-zf-wabco.html": "Sub-Second Commercial Vehicle Cluster Built to Strict Glance Budgets",
}

CARD_LEADS = {
    "case-ibm-watson.html": "Human-in-the-loop confidence gating and transparent model-auditing that lets AI agents act inside mission-critical systems without black-box risk.",
    "case-ericsson.html": "Slashed enterprise quote-to-order turnaround from 14 days to 4 hours, replacing a fragile 14-tab Excel workbook with a keyboard-first sales engine across 45 countries.",
    "case-zebra.html": "VisibilityIQ operational dashboards and sub-second barcode/RFID scanning workflows for 38,000+ rugged handhelds in frontline warehouses and freezers.",
    "case-ibm-carbon.html": "A multi-brand global → semantic → component token pipeline from Figma to React, Angular and Web Components, eliminating $1.8M in design-engineer rework.",
    "case-zf-wabco.html": "A mission-critical commercial vehicle cluster engineered strictly under a 1.2-second eyes-off-road threshold, synthesizing live telematics for driver safety.",
}


def _cases_from_content():
    from portfolio_content import CASE_STUDIES
    return [{
        "company": c["company"], "domain": c["domain"],
        "title": CARD_TITLES.get(c["file"], c["title"]),
        "lead": CARD_LEADS.get(c["file"], c["lead"]), "metrics": c["metrics"][:2],
        "cover": c["cover"], "href": c["file"],
    } for c in CASE_STUDIES]


WORK_CSS = """
  .case-grid {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 56px 40px;
  }
  .case-card { display: block; text-decoration: none; color: inherit; }

  .case-stage {
    position: relative; overflow: hidden; border-radius: 20px;
    background: #ECEEF1; aspect-ratio: 16 / 10;
    transition: background 0.3s ease;
  }
  .case-stage img {
    position: absolute; left: 7%; right: 7%; top: 9%;
    width: 86%; height: auto; min-height: 100%;
    object-fit: cover; object-position: left top;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 18px 50px -12px rgba(15, 23, 42, 0.28);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .case-card:hover .case-stage { background: #E4E7EB; }
  .case-card:hover .case-stage img { transform: translateY(-8px); }

  .case-meta { padding-top: 24px; }
  .case-co {
    font-size: 13px; font-weight: 600; color: var(--text-muted);
    letter-spacing: 0.02em; margin-bottom: 8px;
  }
  .case-co b { color: var(--text-main); font-weight: 700; }
  .case-title {
    font-family: var(--font-heading); font-weight: 800; color: var(--text-main);
    font-size: 26px; line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 10px;
    transition: color 0.2s ease;
  }
  .case-card:hover .case-title { color: var(--primary-accent); }
  .case-lead { font-size: 16px; line-height: 1.6; color: var(--text-body); max-width: 620px; }

  .case-foot {
    display: flex; align-items: flex-end; justify-content: space-between;
    gap: 24px; margin-top: 20px; flex-wrap: wrap;
  }
  .case-metrics { display: flex; gap: 36px; }
  .case-metric strong {
    display: block; font-family: var(--font-heading); font-weight: 800;
    font-size: 24px; color: var(--text-main); letter-spacing: -0.02em; line-height: 1.1;
  }
  .case-metric span { font-size: 13px; color: var(--text-muted); }
  .case-link { font-size: 14px; font-weight: 700; color: var(--primary-accent); white-space: nowrap; }
  .case-link i { font-style: normal; display: inline-block; transition: transform 0.2s ease; }
  .case-card:hover .case-link i { transform: translateX(4px); }

  @media (max-width: 860px) {
    .case-grid { grid-template-columns: 1fr; gap: 48px; }
    .case-title { font-size: 24px; }
  }
  @media (max-width: 480px) {
    .case-metrics { gap: 24px; }
    .case-metric strong { font-size: 20px; }
  }
"""


def build_work():
    out = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Selected Work | Balaajee V.R.</title>
  <meta http-equiv="refresh" content="0; url=index.html#featured-work">
  <script>window.location.replace("index.html#featured-work");</script>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #FAFAF9; padding: 40px; text-align: center; color: #0F172A;">
  <p>Redirecting to <a href="index.html#featured-work" style="color: #F00658; font-weight: 700;">Selected Work on Home Stage</a>...</p>
</body>
</html>"""
    with open("work.html", "w", encoding="utf-8") as f:
        f.write(out)
    print("  ✓ work.html (redirect to index.html#featured-work)")


# ===========================================================================
# 2. VISUAL ARCHIVE: Behance replica (archive.html + archive-<slug>.html)
# ===========================================================================
# Names, grouping and order exactly as on behance.net/balaajeeVR (newest first)
BEHANCE_PROJECTS = [
    ("sales", "Sales Automation Tool", "https://www.behance.net/gallery/170250587/Sales-Automation-Tool"),
    ("networks", "Networks design project", "https://www.behance.net/gallery/170249607/Networks-design-project"),
    ("enterprise", "An Enterprise Project", "https://www.behance.net/gallery/170248145/An-Enterprise-Project"),
    ("web", "Web Projects", "https://www.behance.net/gallery/170244105/Web-Projects"),
    ("achievements", "My Achievements", "https://www.behance.net/gallery/170242191/My-Achievements"),
    ("gaming", "Gaming Projects", "https://www.behance.net/gallery/170240885/Gaming-Projects"),
    ("mobile", "Mobile Projects", "https://www.behance.net/gallery/170224969/Mobile-Projects"),
]


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def project_images(key):
    files = glob.glob(f"assets/behance/{key}/{key}_*.png")
    files.sort(key=lambda p: int(re.search(rf"{key}_(\d+)_", os.path.basename(p)).group(1)))
    return files


ARCHIVE_CSS = """
  /* Behance-style profile strip */
  .be-profile {
    display: flex; align-items: center; gap: 22px; flex-wrap: wrap;
    padding-top: 64px; padding-bottom: 32px;
  }
  .be-avatar {
    width: 88px; height: 88px; border-radius: 50%; object-fit: cover;
    border: 3px solid #FFFFFF; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12);
  }
  .be-who { flex: 1; min-width: 220px; }
  .be-name {
    font-family: var(--font-heading); font-size: 30px; font-weight: 800;
    color: var(--text-main); letter-spacing: -0.02em; line-height: 1.15;
  }
  .be-role { font-size: 15px; color: var(--text-muted); margin-top: 4px; }
  .be-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 20px; border-radius: 100px; text-decoration: none;
    background: #0057FF; color: #FFFFFF; font-weight: 700; font-size: 14px;
    transition: background 0.2s ease;
  }
  .be-btn:hover { background: #0046CC; }

  .be-tabs {
    display: flex; gap: 28px; border-bottom: 1px solid var(--border-subtle);
    margin-bottom: 32px;
  }
  .be-tab {
    padding: 12px 0; font-size: 15px; font-weight: 700; color: var(--text-main);
    border-bottom: 2px solid var(--text-main); margin-bottom: -1px;
  }
  .be-tab span { color: var(--text-muted); font-weight: 600; margin-left: 6px; }

  /* Project grid */
  .be-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 32px 24px;
  }
  .be-card { display: block; text-decoration: none; color: inherit; }
  .be-cover {
    position: relative; overflow: hidden; border-radius: 8px;
    aspect-ratio: 808 / 632; background: #E9EBEE;
  }
  .be-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .be-cover::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0) 55%);
    opacity: 0; transition: opacity 0.25s ease;
  }
  .be-cover-title {
    position: absolute; left: 16px; right: 16px; bottom: 14px; z-index: 2;
    color: #FFFFFF; font-weight: 700; font-size: 15px;
    opacity: 0; transform: translateY(6px); transition: all 0.25s ease;
  }
  .be-card:hover .be-cover::after, .be-card:focus-visible .be-cover::after { opacity: 1; }
  .be-card:hover .be-cover-title, .be-card:focus-visible .be-cover-title { opacity: 1; transform: none; }

  .be-card-meta { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding-top: 12px; }
  .be-card-title { font-size: 15px; font-weight: 700; color: var(--text-main); }
  .be-card-owner { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-muted); margin-top: 3px; }
  .be-card-owner img { width: 18px; height: 18px; border-radius: 50%; object-fit: cover; }
  .be-count { font-size: 12px; font-weight: 600; color: var(--text-muted); white-space: nowrap; }

  /* Single project view */
  .bp-top { padding-top: 40px; padding-bottom: 28px; }
  .bp-back {
    display: inline-flex; align-items: center; gap: 6px; text-decoration: none;
    font-size: 14px; font-weight: 600; color: var(--text-muted); margin-bottom: 24px;
  }
  .bp-back:hover { color: var(--text-main); }
  .bp-title {
    font-family: var(--font-heading); font-weight: 800; color: var(--text-main);
    font-size: clamp(28px, 4vw, 40px); letter-spacing: -0.02em; line-height: 1.15;
  }
  .bp-owner-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 14px; }
  .bp-owner { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: var(--text-main); }
  .bp-owner img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
  .bp-owner small { display: block; font-size: 13px; font-weight: 500; color: var(--text-muted); }

  .bp-canvas-wrap {
    max-width: 1240px;
    margin: 36px auto 64px;
    padding: 0 24px;
  }
  .bp-canvas {
    display: flex;
    flex-direction: column;
    gap: 36px;
  }
  .bp-canvas img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 16px;
    border: 1px solid var(--border-subtle);
    box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04);
    background: #FFFFFF;
  }
  @media (max-width: 640px) {
    .bp-canvas-wrap {
      margin: 20px auto 44px;
      padding: 0 16px;
    }
    .bp-canvas {
      gap: 20px;
    }
    .bp-canvas img {
      border-radius: 12px;
    }
  }

  .bp-end { text-align: center; padding: 56px 0 8px; }
  .bp-end h2 { font-family: var(--font-heading); font-size: 24px; font-weight: 800; color: var(--text-main); }
  .bp-end p { color: var(--text-muted); font-size: 14px; margin-top: 6px; }
  .bp-pager { display: flex; justify-content: space-between; gap: 16px; margin: 40px 0 56px; flex-wrap: wrap; }
  .bp-pager a {
    flex: 1; min-width: 220px; text-decoration: none; padding: 18px 20px;
    border: 1px solid var(--border-subtle); border-radius: 12px; background: #FFFFFF;
    transition: border-color 0.2s ease;
  }
  .bp-pager a:hover { border-color: var(--text-main); }
  .bp-pager small { display: block; font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
  .bp-pager strong { font-size: 16px; color: var(--text-main); }
  .bp-pager .next { text-align: right; }
  .bp-more-title { font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--text-main); margin-bottom: 20px; }

  @media (max-width: 640px) {
    .be-profile { padding-top: 40px; padding-bottom: 24px; gap: 16px; }
    .be-avatar { width: 64px; height: 64px; }
    .be-name { font-size: 24px; }
    .be-grid { grid-template-columns: 1fr; }
  }
"""


def build_archive():
    projects = []
    for key, name, url in BEHANCE_PROJECTS:
        projects.append({
            "key": key, "name": name, "url": url, "slug": slugify(name),
            "cover": f"assets/behance/covers/{key}.png",
            "images": project_images(key),
        })
    total = sum(len(p["images"]) for p in projects)

    def card(p, eager=False):
        n = len(p["images"])
        return f"""
      <a href="archive-{p['slug']}.html" class="be-card" id="be-card-{p['slug']}">
        <div class="be-cover">
          <img src="{p['cover']}" alt="{html.escape(p['name'])}" width="808" height="632" loading="{'eager' if eager else 'lazy'}">
          <span class="be-cover-title">{html.escape(p['name'])}</span>
        </div>
        <div class="be-card-meta">
          <div>
            <div class="be-card-title">{html.escape(p['name'])}</div>
          </div>
          <span class="be-count">{n} artifact{'s' if n != 1 else ''}</span>
        </div>
      </a>"""

    intro = f"""
    <section class="g-wrap g-intro">
      <h1 class="g-title">Visual Archive</h1>
      <p class="g-sub">Curated project collections and visual design archives spanning enterprise tools, telecom network systems, mobile applications, and digital product craft across 18+ years.</p>
    </section>"""

    # ---- gallery home
    body = f"""
  <main>{intro}
    <section class="g-wrap">
      <div class="be-grid">{''.join(card(p, i < 4) for i, p in enumerate(projects))}
      </div>
    </section>
  </main>"""
    with open("archive.html", "w", encoding="utf-8") as f:
        f.write(page(
            "Visual Archive | Balaajee V.R.",
            "Visual design archive of Balaajee V.R.: enterprise software, telecom systems, web, and mobile application archives.",
            "archive", body, ARCHIVE_CSS))
    print(f"  ✓ archive.html (gallery, {len(projects)} projects, {total} images)")

    # ---- one page per project
    for i, p in enumerate(projects):
        prev_p = projects[i - 1] if i > 0 else projects[-1]
        next_p = projects[(i + 1) % len(projects)]
        imgs = []
        for j, src in enumerate(p["images"]):
            w, h = img_size(src)
            imgs.append(
                f'<img src="{src}" alt="{html.escape(p["name"])}, image {j + 1}" width="{w}" height="{h}" '
                f'loading="{"eager" if j < 2 else "lazy"}">')
        others = [q for q in projects if q["key"] != p["key"]]
        body = f"""
  <main>
    <section class="g-wrap bp-top">
      <a href="archive.html" class="bp-back">&larr; Visual Archive</a>
      <h1 class="bp-title">{html.escape(p['name'])}</h1>
      <div class="bp-owner-row">
        <div class="bp-owner"><small>{len(p['images'])} artifact{'s' if len(p['images']) != 1 else ''}</small></div>
      </div>
    </section>

    <div class="bp-canvas-wrap">
      <section class="bp-canvas" aria-label="{html.escape(p['name'])} images">
        {''.join(imgs)}
      </section>
    </div>

    <section class="g-wrap">
      <div class="bp-end">
        <h2>{html.escape(p['name'])}</h2>
        <p>Visual Design Archive</p>
      </div>
      <nav class="bp-pager" aria-label="Project navigation">
        <a href="archive-{prev_p['slug']}.html"><small>&larr; Previous</small><strong>{html.escape(prev_p['name'])}</strong></a>
        <a href="archive-{next_p['slug']}.html" class="next"><small>Next &rarr;</small><strong>{html.escape(next_p['name'])}</strong></a>
      </nav>
      <h3 class="bp-more-title">More Archive Collections</h3>
      <div class="be-grid">{''.join(card(q) for q in others)}
      </div>
    </section>
  </main>"""
        fname = f"archive-{p['slug']}.html"
        with open(fname, "w", encoding="utf-8") as f:
            f.write(page(
                f"{p['name']} | Visual Archive | Balaajee V.R.",
                f"{p['name']}: design work by Balaajee V.R., from his Behance portfolio.",
                "archive", body, ARCHIVE_CSS))
        print(f"  ✓ {fname} ({len(p['images'])} images)")


if __name__ == "__main__":
    print("Building gallery pages...")
    build_work()
    build_archive()
    import build_portfolio_pages as bp
    bp.build_cases()
    bp.build_leadership()
    bp.inject_home()
    bp.clean_nav(["index.html", "cv.html", "leadership-deck.html", "leadership_deck.html"])
    print("Done.")
