# build_portfolio_pages.py
# Generates, from portfolio_content.py:
#   case-*.html      -> one editorial page per case study (snapshot, ownership, process,
#                       artifacts, decisions, results, reflection, testimonial)
#   leadership.html  -> philosophy, evolution, team, hiring, delegation, challenges,
#                       workshops, tools & frameworks, documentation samples, references
#   index.html       -> injects a "How I lead" + references block (idempotent markers)
#   all pages        -> plain-text navigation labels (no emoji)
# Called from build_gallery_pages.py (which owns the shared page chrome).
import html
import re

import build_gallery_pages as g
from portfolio_content import (
    CASE_STUDIES, TESTIMONIALS, TESTIMONIAL_BY_KEY, TESTIMONIALS_ARE_DRAFTS,
    PHILOSOPHY, EVOLUTION, LEADERSHIP_NUMBERS, HIRING_STEPS, GROWTH_PRACTICES,
    HIRING_FACTS, DELEGATION_LEVELS, DELEGATION_EXAMPLE, TEAM_BEFORE, TEAM_AFTER,
    CHALLENGES, WORKSHOPS, TOOLS, FRAMEWORKS, TARGET_ROLES,
)

e = html.escape

# ---------------------------------------------------------------------------
# Shared components
# ---------------------------------------------------------------------------
SHARED_CSS = """
  .sec-label {
    font-family: var(--font-body); font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--primary-accent);
    margin-bottom: 10px;
  }
  .sec-title {
    font-family: var(--font-heading); font-weight: 800; color: var(--text-main);
    font-size: clamp(26px, 3vw, 34px); line-height: 1.15; letter-spacing: -0.02em;
  }
  .sec-intro { font-size: 17px; line-height: 1.65; color: var(--text-body); max-width: 680px; margin-top: 12px; }

  /* Testimonial card */
  .tq {
    position: relative; background: #FFFFFF; border: 1px solid var(--border-subtle);
    border-radius: 18px; padding: 28px 28px 24px; display: flex; flex-direction: column; gap: 20px;
    height: 100%;
  }
  .tq-mark { font-family: Georgia, serif; font-size: 56px; line-height: 0.6; color: var(--primary-accent); height: 22px; }
  .tq blockquote { font-size: 17px; line-height: 1.6; color: var(--text-main); flex: 1; }
  .tq figcaption { display: flex; align-items: center; gap: 12px; }
  .tq-avatar {
    flex: 0 0 auto; width: 40px; height: 40px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--text-main); color: #FFFFFF; font-weight: 800; font-size: 14px; font-family: var(--font-heading);
  }
  .tq-who strong { display: block; font-size: 14px; color: var(--text-main); }
  .tq-who span { display: block; font-size: 13px; color: var(--text-muted); }
  .tq-badge {
    position: absolute; top: 18px; right: 18px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
    color: #92400E; background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 100px; padding: 3px 10px;
  }
  .tq-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
  .tq-note { font-size: 13px; color: var(--text-muted); margin-top: 16px; }
  .tq-grid-5 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  .tq-grid-5 > .tq { grid-column: span 2; }
  .tq-grid-5 > .tq:nth-child(n+4) { grid-column: span 3; }
  @media (max-width: 980px) { .tq-grid, .tq-grid-5 { grid-template-columns: 1fr; } .tq-grid-5 > .tq { grid-column: auto !important; } }

  /* Artifact tags */
  .tag {
    display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700;
    letter-spacing: 0.04em; text-transform: uppercase; border-radius: 100px; padding: 3px 10px; white-space: nowrap;
  }
  .tag-real { color: #065F46; background: #D1FAE5; }
  .tag-recreation { color: #92400E; background: #FEF3C7; }
  .tag-diagram { color: #3730A3; background: #E0E7FF; }
  .tag-photo { color: #1E40AF; background: #DBEAFE; }

  /* Diagrams */
  .dg { background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 28px; }
  .dg-conf { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
  .dg-conf div { border-radius: 12px; padding: 18px; }
  .dg-conf strong { display: block; font-family: var(--font-heading); font-size: 22px; font-weight: 800; }
  .dg-conf b { display: block; font-size: 14px; margin: 6px 0 4px; color: var(--text-main); }
  .dg-conf span { font-size: 13px; color: var(--text-body); line-height: 1.5; display: block; }
  .dg-hi { background: #ECFDF5; } .dg-hi strong { color: #047857; }
  .dg-mid { background: #FFFBEB; } .dg-mid strong { color: #B45309; }
  .dg-lo { background: #FEF2F2; } .dg-lo strong { color: #B91C1C; }
  .dg-tiers { display: flex; align-items: stretch; gap: 10px; }
  .dg-tier { flex: 1; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px; background: var(--bg-subtle); }
  .dg-tier small { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); }
  .dg-tier code { display: block; font-family: var(--font-code); font-size: 13px; color: var(--text-main); margin: 8px 0 6px; word-break: break-word; }
  .dg-tier span { font-size: 13px; color: var(--text-body); }
  .dg-arrow { display: flex; align-items: center; color: var(--text-light); font-size: 20px; }
  .dg-swatch { display: inline-block; width: 12px; height: 12px; border-radius: 3px; background: #0F62FE; vertical-align: -1px; margin-right: 6px; }
  .dg-cluster {
    background: #0B1220; border-radius: 14px; padding: 22px; color: #E2E8F0;
    display: grid; grid-template-columns: 1fr 1.4fr 1fr; gap: 14px; align-items: stretch;
  }
  .dg-zone { border: 1px dashed rgba(148, 163, 184, 0.4); border-radius: 10px; padding: 14px; text-align: center; }
  .dg-zone small { display: block; font-family: var(--font-code); font-size: 11px; color: #94A3B8; margin-bottom: 8px; }
  .dg-zone strong { display: block; font-family: var(--font-heading); font-size: 26px; color: #FFFFFF; }
  .dg-zone span { font-size: 12px; color: #CBD5E1; }
  .dg-z1 { border-color: #34D399; } .dg-z1 strong { font-size: 40px; color: #34D399; }
  .dg-z2 strong { color: #FBBF24; font-size: 20px; }
  .dg-z3 strong { color: #6EE7B7; font-size: 16px; opacity: 0.8; }
  @media (max-width: 760px) {
    .dg-conf, .dg-cluster { grid-template-columns: 1fr; }
    .dg-tiers { flex-direction: column; }
    .dg-arrow { justify-content: center; transform: rotate(90deg); }
  }
"""


def initials(text):
    parts = [p for p in re.split(r"[\s,]+", text) if p and p[0].isalpha()]
    return (parts[0][0] + (parts[1][0] if len(parts) > 1 else "")).upper()


def testimonial_card(t):
    draft = TESTIMONIALS_ARE_DRAFTS or not t.get("approved")
    who = t["name"] if t.get("name") else t["role"]
    sub = f'{t["role"]}, {t["company"]}' if t.get("name") else t["company"]
    badge = '<span class="tq-badge">Draft · awaiting approval</span>' if draft else ""
    return f"""
        <figure class="tq">{badge}
          <div class="tq-mark">&ldquo;</div>
          <blockquote>{e(t['quote'])}</blockquote>
          <figcaption>
            <span class="tq-avatar">{e(initials(t['company']))}</span>
            <span class="tq-who"><strong>{e(who)}</strong><span>{e(sub)}</span><span>{e(t['relation'])} · {e(t['period'])}</span></span>
          </figcaption>
        </figure>"""


DRAFT_NOTE = ('<p class="tq-note">Draft recommendations, pending approval from each referee. '
              'References are available on request.</p>')

TAG = {
    "real": '<span class="tag tag-real">Original artifact</span>',
    "recreation": '<span class="tag tag-recreation">Recreated · original under NDA</span>',
    "diagram": '<span class="tag tag-diagram">Diagram</span>',
    "photo": '<span class="tag tag-photo">In action</span>',
}


def diagram(name):
    if name == "confidence":
        return """
      <div class="dg"><div class="dg-conf">
        <div class="dg-hi"><strong>&ge; 95%</strong><b>Runs automatically</b><span>Action executes and is logged with its reasoning for audit.</span></div>
        <div class="dg-mid"><strong>80–94%</strong><b>Human reviews a diff</b><span>A side-by-side before/after opens; one click to approve or reject.</span></div>
        <div class="dg-lo"><strong>&lt; 80%</strong><b>Human takes the wheel</b><span>AI hands back control with its draft and the reasons it is unsure.</span></div>
      </div></div>"""
    if name == "tokens":
        return """
      <div class="dg"><div class="dg-tiers">
        <div class="dg-tier"><small>1 · Global</small><code><span class="dg-swatch"></span>blue-60 · #0F62FE</code><span>Raw brand values. Rarely change.</span></div>
        <div class="dg-arrow">&rarr;</div>
        <div class="dg-tier"><small>2 · Semantic</small><code>interactive-primary</code><span>Intent. Themes swap here (light, dark).</span></div>
        <div class="dg-arrow">&rarr;</div>
        <div class="dg-tier"><small>3 · Component</small><code>button-primary-bg</code><span>What engineers use in code.</span></div>
      </div></div>"""
    if name == "zones":
        return """
      <div class="dg"><div class="dg-cluster">
        <div class="dg-zone dg-z3"><small>ZONE 3 · PERIPHERAL</small><strong>Eco-coaching</strong><span>Soft green pulse only</span></div>
        <div class="dg-zone dg-z1"><small>ZONE 1 · &lt; 0.8 s</small><strong>88</strong><span>km/h · radar distance 85 m</span></div>
        <div class="dg-zone dg-z2"><small>ZONE 2 · &lt; 1.2 s</small><strong>Exit 24 · 2.4 km</strong><span>Turn card, high contrast</span></div>
      </div></div>"""
    return ""


def figure(a, eager=False):
    kind = a["kind"]
    cap = f'<figcaption>{TAG[kind]}<span>{e(a["caption"])}</span></figcaption>'
    if kind == "diagram":
        return f'<figure class="cs-fig">{diagram(a["diagram"])}{cap}</figure>'
    w, h = g.img_size(a["src"])
    tall = " is-tall" if a.get("tall") else ""
    return f"""
        <figure class="cs-fig">
          <a href="{a['src']}" target="_blank" rel="noopener" class="cs-frame{tall}" aria-label="Open full image: {e(a['caption'])}">
            <img src="{a['src']}" alt="{e(a['caption'])}" width="{w}" height="{h}" loading="{'eager' if eager else 'lazy'}">
            {'<span class="cs-frame-more">View full image &#8599;</span>' if a.get('tall') else ''}
          </a>
          {cap}
        </figure>"""


# ===========================================================================
# CASE STUDY PAGES
# ===========================================================================
CASE_CSS = """
  .cs-top { padding-top: 40px; }
  .cs-back { display: inline-flex; gap: 6px; text-decoration: none; font-size: 14px; font-weight: 600; color: var(--text-muted); margin-bottom: 28px; }
  .cs-back:hover { color: var(--text-main); }
  .cs-over { font-size: 13px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.02em; margin-bottom: 14px; }
  .cs-over b { color: var(--text-main); }
  .cs-title {
    font-family: var(--font-heading); font-weight: 800; color: var(--text-main);
    font-size: clamp(34px, 5vw, 58px); line-height: 1.06; letter-spacing: -0.03em; max-width: 960px;
  }
  .cs-lead { font-size: 20px; line-height: 1.6; color: var(--text-body); max-width: 780px; margin-top: 20px; }

  .cs-cover { margin-top: 44px; position: relative; overflow: hidden; border-radius: 22px; background: #ECEEF1; aspect-ratio: 21 / 9; }
  .cs-cover img {
    position: absolute; left: 8%; right: 8%; top: 10%; width: 84%; height: auto; min-height: 100%;
    object-fit: cover; object-position: left top; border-radius: 10px 10px 0 0;
    box-shadow: 0 18px 50px -12px rgba(15, 23, 42, 0.28);
  }
  .cs-cover .tag { position: absolute; left: 16px; bottom: 16px; z-index: 2; }

  /* Snapshot */
  .cs-snap { margin-top: 40px; background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 22px; overflow: hidden; }
  .cs-facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .cs-fact { padding: 22px 26px; border-right: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); }
  .cs-fact:nth-child(3n) { border-right: 0; }
  .cs-fact small { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
  .cs-fact span { font-size: 15px; line-height: 1.5; color: var(--text-main); font-weight: 500; }
  .cs-metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); background: var(--text-main); }
  .cs-metric { padding: 24px 26px; border-right: 1px solid rgba(255, 255, 255, 0.1); }
  .cs-metric:last-child { border-right: 0; }
  .cs-metric strong { display: block; font-family: var(--font-heading); font-weight: 800; font-size: clamp(22px, 2.4vw, 30px); color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.1; }
  .cs-metric span { font-size: 13px; color: #CBD5E1; }

  /* Sections */
  .cs-sec { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 56px; padding-top: 88px; }
  .cs-sec-head { position: sticky; top: 96px; align-self: start; }
  .cs-num { font-family: var(--font-code); font-size: 13px; font-weight: 700; color: var(--primary-accent); }
  .cs-sec-head h2 { font-family: var(--font-heading); font-weight: 800; color: var(--text-main); font-size: 26px; line-height: 1.2; letter-spacing: -0.02em; margin-top: 6px; }
  .cs-sec-head p { font-size: 14px; color: var(--text-muted); margin-top: 8px; line-height: 1.5; }
  .cs-prose p { font-size: 18px; line-height: 1.75; color: var(--text-body); max-width: 720px; }
  .cs-prose p + p { margin-top: 16px; }

  .cs-own { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .cs-own > div { border-radius: 18px; padding: 26px; }
  .cs-own h3 { font-family: var(--font-heading); font-size: 17px; font-weight: 800; margin-bottom: 14px; }
  .cs-own ul { list-style: none; display: grid; gap: 10px; }
  .cs-own li { font-size: 15px; line-height: 1.55; padding-left: 22px; position: relative; }
  .cs-own li::before { content: ""; position: absolute; left: 0; top: 9px; width: 8px; height: 8px; border-radius: 2px; }
  .cs-own-me { background: var(--text-main); color: #E2E8F0; }
  .cs-own-me h3 { color: #FFFFFF; }
  .cs-own-me li::before { background: var(--primary-accent); }
  .cs-own-team { background: #FFFFFF; border: 1px solid var(--border-subtle); color: var(--text-body); }
  .cs-own-team h3 { color: var(--text-main); }
  .cs-own-team li::before { background: var(--border-medium); }

  .cs-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; counter-reset: step; }
  .cs-step { background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 20px; }
  .cs-step small { font-family: var(--font-code); font-size: 12px; font-weight: 700; color: var(--text-light); }
  .cs-step h3 { font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--text-main); margin: 4px 0 6px; }
  .cs-step p { font-size: 14px; line-height: 1.55; color: var(--text-body); }

  .cs-figs { display: grid; gap: 40px; margin-top: 40px; }
  .cs-fig { margin: 0; }
  .cs-frame { display: block; position: relative; background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 14px; overflow: hidden; }
  .cs-frame img { display: block; width: 100%; height: auto; }
  .cs-frame.is-tall { max-height: 640px; }
  .cs-frame.is-tall::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 120px; background: linear-gradient(to top, #FFFFFF, rgba(255,255,255,0)); }
  .cs-frame-more { position: absolute; z-index: 2; left: 50%; bottom: 18px; transform: translateX(-50%); background: var(--text-main); color: #FFFFFF; font-size: 13px; font-weight: 700; padding: 8px 16px; border-radius: 100px; }
  .cs-fig figcaption { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 12px; font-size: 14px; color: var(--text-muted); line-height: 1.5; }

  .cs-dec { display: grid; gap: 16px; }
  .cs-dec article { background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 18px; padding: 24px 26px; display: grid; grid-template-columns: 40px 1fr; gap: 6px 16px; }
  .cs-dec-n { grid-row: span 3; font-family: var(--font-heading); font-size: 28px; font-weight: 900; color: var(--border-medium); line-height: 1; }
  .cs-dec h3 { font-family: var(--font-heading); font-size: 19px; font-weight: 800; color: var(--text-main); }
  .cs-dec p { font-size: 15px; line-height: 1.6; color: var(--text-body); }
  .cs-dec p b { color: var(--text-main); }


  .cs-result-text p { font-size: 22px; line-height: 1.6; color: var(--text-main); }
  .cs-learn { border-left: 3px solid var(--primary-accent); padding: 6px 0 6px 24px; font-family: var(--font-heading); font-size: 24px; line-height: 1.45; color: var(--text-main); font-weight: 600; max-width: 760px; }

  .cs-pager { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 96px; }
  .cs-pager a { text-decoration: none; background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 22px 24px; transition: border-color 0.2s ease, transform 0.2s ease; }
  .cs-pager a:hover { border-color: var(--text-main); transform: translateY(-2px); }
  .cs-pager small { display: block; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); }
  .cs-pager strong { display: block; font-family: var(--font-heading); font-size: 18px; color: var(--text-main); margin-top: 4px; line-height: 1.3; }
  .cs-pager .next { text-align: right; }

  @media (max-width: 980px) {
    .cs-sec { grid-template-columns: 1fr; gap: 20px; padding-top: 64px; }
    .cs-sec-head { position: static; }
    .cs-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .cs-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .cs-fact:nth-child(3n) { border-right: 1px solid var(--border-subtle); }
    .cs-fact:nth-child(2n) { border-right: 0; }
    .cs-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .cs-metric:nth-child(2) { border-right: 0; }
    .cs-metric:nth-child(-n+2) { border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
  }
  @media (max-width: 640px) {
    .cs-lead { font-size: 17px; }
    .cs-cover { aspect-ratio: 4 / 3; }
    .cs-facts, .cs-own, .cs-steps, .cs-pager { grid-template-columns: 1fr; }
    .cs-fact { border-right: 0 !important; }
    .cs-prose p { font-size: 16px; }
    .cs-result-text p { font-size: 18px; }
    .cs-learn { font-size: 19px; }
    .cs-pager .next { text-align: left; }
  }
"""


def section(num, title, sub, content, sid):
    sub_html = f"<p>{e(sub)}</p>" if sub else ""
    return f"""
    <section class="g-wrap cs-sec" id="{sid}">
      <header class="cs-sec-head"><div class="cs-num">{num}</div><h2>{e(title)}</h2>{sub_html}</header>
      <div class="cs-body">{content}
      </div>
    </section>"""


def build_case(i, c):
    n = len(CASE_STUDIES)
    prev_c, next_c = CASE_STUDIES[i - 1], CASE_STUDIES[(i + 1) % n]

    facts = "".join(f'<div class="cs-fact"><small>{e(k)}</small><span>{e(v)}</span></div>' for k, v in c["snapshot"].items())
    metrics = "".join(f'<div class="cs-metric"><strong>{e(v)}</strong><span>{e(l)}</span></div>' for v, l in c["metrics"])
    problem = "".join(f"<p>{e(p)}</p>" for p in c["problem"])
    owned = "".join(f"<li>{e(x)}</li>" for x in c["owned"])
    delegated = "".join(f"<li>{e(x)}</li>" for x in c["delegated"])
    steps = "".join(f'<div class="cs-step"><small>{k + 1:02d}</small><h3>{e(t)}</h3><p>{e(d)}</p></div>' for k, (t, d) in enumerate(c["process"]))
    figs = "".join(figure(a) for a in c["artifacts"])
    decisions = "".join(
        f'<article><span class="cs-dec-n">{k + 1}</span><h3>{e(t)}</h3><p><b>Why:</b> {e(w)}</p><p><b>Trade-off:</b> {e(o)}</p></article>'
        for k, (t, w, o) in enumerate(c["decisions"]))

    body = f"""
  <main>
    <section class="g-wrap cs-top">
      <a href="work.html" class="cs-back">&larr; All case studies</a>
      <div class="cs-over"><b>{e(c['company'])}</b> &nbsp;·&nbsp; {e(c['domain'])} &nbsp;·&nbsp; {e(c['snapshot']['Timeline'])}</div>
      <h1 class="cs-title">{e(c['title'])}</h1>
      <p class="cs-lead">{e(c['lead'])}</p>
      <div class="cs-cover">
        <img src="{c['cover']}" alt="{e(c['title'])}" loading="eager">
        {TAG[c['cover_kind']]}
      </div>
      <div class="cs-snap" id="snapshot" aria-label="Project snapshot">
        <div class="cs-facts">{facts}</div>
        <div class="cs-metrics">{metrics}</div>
      </div>
    </section>
{section("01", "The problem", "Situation", f'<div class="cs-prose">{problem}</div>', "problem")}
{section("02", "My role and how I led", "What I did myself, and what I trusted the team with", f'''
        <div class="cs-own">
          <div class="cs-own-me"><h3>What I owned</h3><ul>{owned}</ul></div>
          <div class="cs-own-team"><h3>What I delegated</h3><ul>{delegated}</ul></div>
        </div>''', "role")}
{section("03", "Process", "From research to measured outcome", f'<div class="cs-steps">{steps}</div>', "process")}
{section("04", "Evidence", "Artifacts from the project", f'<div class="cs-figs" style="margin-top:0">{figs}</div>', "evidence")}
{section("05", "Key decisions", "The calls I made and what they cost", f'<div class="cs-dec">{decisions}</div>', "decisions")}
{section("06", "Results", "Business and user impact", f'<div class="cs-prose cs-result-text"><p>{e(c["results"])}</p></div>', "results")}
{section("07", "What I learned", None, f'<p class="cs-learn">{e(c["learned"])}</p>', "learned")}
    <nav class="g-wrap cs-pager" aria-label="Case study navigation">
      <a href="{prev_c['file']}" id="cs-prev"><small>&larr; Previous</small><strong>{e(prev_c['company'])}: {e(prev_c['title'])}</strong></a>
      <a href="{next_c['file']}" class="next" id="cs-next"><small>Next &rarr;</small><strong>{e(next_c['company'])}: {e(next_c['title'])}</strong></a>
    </nav>
  </main>"""
    out = g.page(
        f"{c['company']}: {c['title']} | Case Study | Balaajee V.R.",
        c["lead"][:155],
        "work", body, SHARED_CSS + CASE_CSS)
    with open(c["file"], "w", encoding="utf-8") as f:
        f.write(out)
    print(f"  ✓ {c['file']} (case study, {len(c['artifacts'])} artifacts)")


def build_cases():
    for i, c in enumerate(CASE_STUDIES):
        build_case(i, c)


# ===========================================================================
# LEADERSHIP PAGE
# ===========================================================================
LEAD_CSS = """
  .ld-hero { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 56px; align-items: center; padding-top: 64px; }
  .ld-hero h1 { font-family: var(--font-heading); font-weight: 800; color: var(--text-main); font-size: clamp(36px, 5vw, 60px); line-height: 1.05; letter-spacing: -0.03em; }
  .ld-hero p { font-size: 19px; line-height: 1.65; color: var(--text-body); margin-top: 20px; max-width: 600px; }
  .ld-photo { position: relative; border-radius: 22px; overflow: hidden; aspect-ratio: 4 / 3; background: #ECEEF1; }
  .ld-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 40% 30%; display: block; }
  .ld-roles { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 24px; }
  .ld-roles span { font-size: 13px; font-weight: 600; color: var(--text-main); background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 100px; padding: 6px 14px; }

  .ld-nav { position: sticky; top: 61px; z-index: 50; background: rgba(250, 250, 249, 0.94); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-subtle); margin-top: 56px; }
  .ld-nav .g-wrap { display: flex; gap: 6px; overflow-x: auto; padding-top: 12px; padding-bottom: 12px; scrollbar-width: none; }
  .ld-nav .g-wrap::-webkit-scrollbar { display: none; }
  .ld-nav a { flex: 0 0 auto; font-size: 13px; font-weight: 600; color: var(--text-muted); text-decoration: none; padding: 7px 14px; border-radius: 100px; }
  .ld-nav a:hover { color: var(--text-main); background: #FFFFFF; }

  .ld-sec { padding-top: 96px; scroll-margin-top: 120px; }
  .ld-head { margin-bottom: 36px; }

  .ld-nums { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); background: var(--text-main); border-radius: 20px; overflow: hidden; margin-top: 56px; }
  .ld-nums div { padding: 24px 22px; border-right: 1px solid rgba(255, 255, 255, 0.1); }
  .ld-nums div:last-child { border-right: 0; }
  .ld-nums strong { display: block; font-family: var(--font-heading); font-size: 32px; font-weight: 800; color: #FFFFFF; line-height: 1.1; }
  .ld-nums span { font-size: 13px; color: #CBD5E1; }

  .ld-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
  .ld-cards-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ld-cards-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .ld-card { background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 18px; padding: 26px; }
  .ld-card small { display: block; font-family: var(--font-code); font-size: 12px; font-weight: 700; color: var(--primary-accent); margin-bottom: 8px; }
  .ld-card h3 { font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--text-main); line-height: 1.25; margin-bottom: 8px; }
  .ld-card p { font-size: 15px; line-height: 1.6; color: var(--text-body); }
  .ld-card a { font-size: 14px; font-weight: 700; color: var(--primary-accent); text-decoration: none; display: inline-block; margin-top: 12px; }
  .ld-card .meta { font-size: 13px; color: var(--text-muted); margin-top: 10px; }

  .ld-time { position: relative; display: grid; gap: 0; }
  .ld-time::before { content: ""; position: absolute; left: 132px; top: 8px; bottom: 8px; width: 2px; background: var(--border-subtle); }
  .ld-tl { display: grid; grid-template-columns: 112px 1fr; gap: 40px; padding: 14px 0; position: relative; }
  .ld-tl::before { content: ""; position: absolute; left: 127px; top: 22px; width: 12px; height: 12px; border-radius: 50%; background: #FFFFFF; border: 2px solid var(--border-medium); }
  .ld-tl:last-child::before { background: var(--primary-accent); border-color: var(--primary-accent); }
  .ld-tl time { font-family: var(--font-code); font-size: 13px; font-weight: 700; color: var(--text-muted); padding-top: 4px; text-align: right; }
  .ld-tl h3 { font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--text-main); }
  .ld-tl h3 span { font-family: var(--font-body); font-weight: 500; font-size: 14px; color: var(--text-muted); margin-left: 6px; }
  .ld-tl p { font-size: 15px; color: var(--text-body); margin-top: 2px; }

  .ld-team { display: grid; grid-template-columns: minmax(0, 0.8fr) 60px minmax(0, 1.2fr); gap: 16px; align-items: stretch; }
  .ld-col { background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 18px; padding: 24px; }
  .ld-col h3 { font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--text-main); margin-bottom: 4px; }
  .ld-col > p { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }
  .ld-unit { display: flex; justify-content: space-between; gap: 12px; padding: 12px 14px; border-radius: 10px; background: var(--bg-subtle); margin-top: 8px; }
  .ld-unit b { font-size: 14px; color: var(--text-main); }
  .ld-unit span { font-size: 13px; color: var(--text-muted); }
  .ld-unit em { font-style: normal; font-size: 13px; font-weight: 700; color: var(--text-main); white-space: nowrap; }
  .ld-after .ld-unit { background: #FFF1F5; }
  .ld-arrow { display: flex; align-items: center; justify-content: center; font-size: 26px; color: var(--text-light); }

  .ld-steps { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
  .ld-step { background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 18px; }
  .ld-step small { font-family: var(--font-code); font-size: 12px; font-weight: 700; color: var(--text-light); }
  .ld-step h3 { font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--text-main); margin: 4px 0 6px; }
  .ld-step p { font-size: 13.5px; line-height: 1.55; color: var(--text-body); }
  .ld-sub { font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--text-main); margin: 40px 0 16px; }

  .ld-deleg { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-radius: 18px; overflow: hidden; border: 1px solid var(--border-subtle); }
  .ld-deleg div { padding: 22px; background: #FFFFFF; border-right: 1px solid var(--border-subtle); }
  .ld-deleg div:last-child { border-right: 0; }
  .ld-deleg small { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); }
  .ld-deleg h3 { font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--text-main); margin: 6px 0; }
  .ld-deleg p { font-size: 14px; line-height: 1.55; color: var(--text-body); }
  .ld-deleg-bar { height: 6px; border-radius: 6px; margin-top: 14px; background: linear-gradient(90deg, var(--text-main), var(--primary-accent)); }
  .ld-callout { margin-top: 20px; background: #FFFFFF; border-left: 3px solid var(--primary-accent); border-radius: 0 14px 14px 0; padding: 18px 22px; font-size: 15px; line-height: 1.6; color: var(--text-body); }
  .ld-callout b { color: var(--text-main); }

  .ld-workshop { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 32px; align-items: start; }
  .ld-wlist { display: grid; gap: 10px; }
  .ld-witem { display: flex; justify-content: space-between; gap: 16px; background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 14px; padding: 16px 18px; }
  .ld-witem b { display: block; font-size: 15px; color: var(--text-main); }
  .ld-witem span { font-size: 13px; color: var(--text-muted); }
  .ld-witem em { font-style: normal; font-size: 12px; font-weight: 700; color: var(--text-main); background: var(--bg-subtle); border-radius: 100px; padding: 3px 10px; height: fit-content; white-space: nowrap; }

  .ld-tools { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
  .ld-tools div { background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 18px; }
  .ld-tools h3 { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; }
  .ld-tools ul { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }
  .ld-tools li { font-size: 13px; font-weight: 600; color: var(--text-main); background: var(--bg-subtle); border-radius: 8px; padding: 5px 9px; }

  /* Redacted document samples */
  .ld-docs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
  .doc { background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 14px; box-shadow: 0 10px 30px -18px rgba(15, 23, 42, 0.25); overflow: hidden; }
  .doc-bar { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 12px 16px; border-bottom: 1px solid var(--border-subtle); background: var(--bg-subtle); }
  .doc-bar b { font-size: 13px; color: var(--text-main); }
  .doc-bar span { font-size: 10px; font-weight: 800; letter-spacing: 0.08em; color: #B91C1C; border: 1px solid #FCA5A5; border-radius: 4px; padding: 2px 6px; }
  .doc-body { padding: 16px; font-size: 12.5px; color: var(--text-body); line-height: 1.5; }
  .doc-body h4 { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin: 12px 0 4px; }
  .doc-body h4:first-child { margin-top: 0; }
  .rx { display: inline-block; height: 10px; border-radius: 2px; background: #1E293B; vertical-align: middle; }
  .doc table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .doc th { text-align: left; font-size: 10.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; padding: 6px 4px; border-bottom: 1px solid var(--border-subtle); }
  .doc td { padding: 7px 4px; border-bottom: 1px solid var(--bg-subtle); color: var(--text-main); }
  .doc td.ok { color: #047857; font-weight: 700; }
  .doc-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .doc-cols div { background: var(--bg-subtle); border-radius: 8px; padding: 8px; min-height: 120px; }
  .doc-cols b { display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 6px; }
  .doc-cols i { display: block; font-style: normal; background: #FFFFFF; border-radius: 6px; padding: 6px; margin-bottom: 6px; font-size: 11.5px; }
  .doc-cap { padding: 12px 16px; border-top: 1px solid var(--border-subtle); font-size: 13px; color: var(--text-muted); }

  .ld-cta { margin-top: 96px; background: var(--text-main); border-radius: 24px; padding: 48px; display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
  .ld-cta h2 { font-family: var(--font-heading); font-size: clamp(24px, 3vw, 34px); font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; }
  .ld-cta p { color: #CBD5E1; font-size: 16px; margin-top: 6px; }
  .ld-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .ld-btn { text-decoration: none; font-weight: 700; font-size: 15px; border-radius: 100px; padding: 13px 22px; }
  .ld-btn-p { background: var(--primary-accent); color: #FFFFFF; }
  .ld-btn-p:hover { background: var(--primary-hover); }
  .ld-btn-s { background: rgba(255, 255, 255, 0.1); color: #FFFFFF; }

  @media (max-width: 1100px) {
    .ld-tools { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .ld-steps { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .ld-nums { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .ld-nums div:nth-child(3) { border-right: 0; }
    .ld-nums div:nth-child(-n+3) { border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .ld-cards-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 900px) {
    .ld-hero, .ld-workshop { grid-template-columns: 1fr; gap: 32px; }
    .ld-team { grid-template-columns: 1fr; }
    .ld-arrow { transform: rotate(90deg); height: 30px; }
    .ld-deleg { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .ld-deleg div:nth-child(2) { border-right: 0; }
    .ld-deleg div:nth-child(-n+2) { border-bottom: 1px solid var(--border-subtle); }
    .ld-docs, .ld-cards-3 { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .ld-cards, .ld-cards-4, .ld-steps, .ld-tools, .ld-deleg { grid-template-columns: 1fr; }
    .ld-deleg div { border-right: 0 !important; border-bottom: 1px solid var(--border-subtle); }
    .ld-nums { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .ld-nums div { border-right: 0 !important; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .ld-time::before { left: 6px; }
    .ld-tl { grid-template-columns: 1fr; gap: 4px; padding-left: 28px; }
    .ld-tl::before { left: 1px; }
    .ld-tl time { text-align: left; }
    .ld-cta { padding: 32px 24px; }
    .ld-hero p { font-size: 17px; }
  }
"""


def lead_head(label, title, intro=None):
    intro_html = f'<p class="sec-intro">{e(intro)}</p>' if intro else ""
    return f'<div class="ld-head"><div class="sec-label">{e(label)}</div><h2 class="sec-title">{e(title)}</h2>{intro_html}</div>'


def doc_samples():
    return f"""
      <div class="ld-docs">
        <div class="doc">
          <div class="doc-bar"><b>One-page UX brief</b><span>CONFIDENTIAL</span></div>
          <div class="doc-body">
            <h4>Problem</h4><p>Engineers spend longer checking AI output than writing it by hand. <span class="rx" style="width:60px"></span></p>
            <h4>Primary user</h4><p>Lead systems architect, <span class="rx" style="width:90px"></span></p>
            <h4>Success metric</h4><p>Tracing time &minus;70% · SUS &gt; 85</p>
            <h4>Constraints</h4><p><span class="rx" style="width:120px"></span> compliance · diff must render &lt; 200 ms</p>
            <h4>Sign-off</h4><p>PM <span class="rx" style="width:40px"></span> · Eng <span class="rx" style="width:40px"></span> · Design &#10003;</p>
          </div>
          <div class="doc-cap">Brief template used before every sprint (IBM).</div>
        </div>
        <div class="doc">
          <div class="doc-bar"><b>Design OKR tracker · H2</b><span>CONFIDENTIAL</span></div>
          <div class="doc-body">
            <table>
              <tr><th>Key result</th><th>Base</th><th>Target</th><th>Actual</th></tr>
              <tr><td>Requirement tracing time</td><td>4.2 h</td><td>1.2 h</td><td class="ok">1.1 h</td></tr>
              <tr><td>False-positive triage</td><td>38 m</td><td>10 m</td><td class="ok">6.8 m</td></tr>
              <tr><td>Usability (SUS)</td><td>61</td><td>85</td><td class="ok">89</td></tr>
              <tr><td>Token sync to prod</td><td>28 d</td><td>&lt; 1 d</td><td class="ok">18 m</td></tr>
              <tr><td><span class="rx" style="width:110px"></span></td><td><span class="rx" style="width:24px"></span></td><td><span class="rx" style="width:24px"></span></td><td><span class="rx" style="width:24px"></span></td></tr>
            </table>
          </div>
          <div class="doc-cap">OKRs I reported to product directors and the VP (IBM).</div>
        </div>
        <div class="doc">
          <div class="doc-bar"><b>Design roadmap · Now / Next / Later</b><span>CONFIDENTIAL</span></div>
          <div class="doc-body">
            <div class="doc-cols">
              <div><b>Now</b><i>Device health summary</i><i>Battery drain per app</i><i><span class="rx" style="width:70px"></span></i></div>
              <div><b>Next</b><i>Repair request flow</i><i><span class="rx" style="width:60px"></span></i><i>Glove mode</i></div>
              <div><b>Later</b><i><span class="rx" style="width:64px"></span></i><i>Predictive alerts</i></div>
            </div>
          </div>
          <div class="doc-cap">Quarterly roadmap negotiated with product and sales (Zebra).</div>
        </div>
      </div>
      <p class="tq-note">Recreated samples. Originals are confidential; names and sensitive figures are redacted.</p>"""


def build_leadership():
    nums = "".join(f"<div><strong>{e(v)}</strong><span>{e(l)}</span></div>" for v, l in LEADERSHIP_NUMBERS)
    phil = "".join(f'<div class="ld-card"><small>{k + 1:02d}</small><h3>{e(t)}</h3><p>{e(d)}</p></div>' for k, (t, d) in enumerate(PHILOSOPHY))
    evo = "".join(f'<div class="ld-tl"><time>{e(y)}</time><div><h3>{e(co)}<span>{e(r)}</span></h3><p>{e(l)}</p></div></div>' for y, co, r, l in EVOLUTION)
    before = "".join(f'<div class="ld-unit"><b>{e(n)}</b><em>{c} designers</em></div>' for n, c in TEAM_BEFORE)
    after = "".join(f'<div class="ld-unit"><div><b>{e(n)}</b><br><span>{e(d)}</span></div><em>{c} designers</em></div>' for n, c, d in TEAM_AFTER)
    hire = "".join(f'<div class="ld-step"><small>{k + 1:02d}</small><h3>{e(t)}</h3><p>{e(d)}</p></div>' for k, (t, d) in enumerate(HIRING_STEPS))
    grow = "".join(f'<div class="ld-card"><h3>{e(t)}</h3><p>{e(d)}</p></div>' for t, d in GROWTH_PRACTICES)
    facts = "".join(f'<div class="ld-card"><h3>{e(t)}</h3><p>{e(d)}</p></div>' for t, d in HIRING_FACTS)
    deleg = "".join(f'<div><small>Level {k + 1}</small><h3>{e(t)}</h3><p>{e(d)}</p></div>' for k, (t, d) in enumerate(DELEGATION_LEVELS))
    chall = "".join(f'<div class="ld-card"><small>{e(co)}</small><h3>{e(t)}</h3><p>{e(d)}</p><a href="{href}">Read the case study &rarr;</a></div>' for t, co, d, href in CHALLENGES)
    works = "".join(f'<div class="ld-witem"><div><b>{e(t)}</b><span>{e(d)}</span></div><em>{e(co)}</em></div>' for t, co, d in WORKSHOPS)
    tools = "".join(f'<div><h3>{e(cat)}</h3><ul>{"".join(f"<li>{e(x)}</li>" for x in items)}</ul></div>' for cat, items in TOOLS)
    fw = "".join(f'<div class="ld-card"><h3>{e(t)}</h3><p>{e(d)}</p><div class="meta">Used at: {e(u)}</div></div>' for t, d, u in FRAMEWORKS)
    refs = "".join(testimonial_card(t) for t in TESTIMONIALS)
    roles = "".join(f"<span>{e(r)}</span>" for r in TARGET_ROLES)
    action_photo = figure({"kind": "photo", "src": "assets/photos/candid_flipchart_huddle.jpg",
                           "caption": "Cross-functional design thinking & affinity mapping workshop with squad designers."})
    wall_critique = figure({"kind": "photo", "src": "assets/photos/candid_desk_review.jpg",
                            "caption": "Desk review & 1:1 critique: walking through interaction details and pairing logic on an iMac workstation."})
    window_photo = figure({"kind": "photo", "src": "assets/photos/candid_window_wireframes.jpg",
                           "caption": "Studio wireframe wall: taping up and inspecting full handheld staging flows on the studio window."})
    stage_panel = figure({"kind": "photo", "src": "assets/photos/candid_allhands_panel.jpg",
                          "caption": "Design All-Hands Town Hall: presenting user-centric innovation and enterprise systems to 100+ stakeholders."})
    team_culture = figure({"kind": "photo", "src": "assets/photos/candid_team_marathon.jpg",
                           "caption": "Team culture & camaraderie: celebrating at the corporate charity 5K finish line."})
    scorecard_fig = figure({"kind": "photo", "src": "assets/photos/artifact_ux_scorecard_warroom.jpg",
                            "caption": "Enterprise UX Scorecard & Sprint Quality Bar: criteria linking heuristic standards to physical war-room deliverables."})
    card_sort = figure({"kind": "real", "src": "assets/behance/enterprise/enterprise_2_1400x730.png",
                        "caption": "Card-sorting board from a Zebra stakeholder workshop I ran."})

    links = [("philosophy", "Philosophy"), ("evolution", "How I evolved"), ("team", "Team structure"),
             ("hiring", "Hiring & growth"), ("delegation", "Delegation"), ("challenges", "Challenges"),
             ("workshops", "Workshops"), ("tools", "Tools & frameworks"), ("docs", "Documentation"),
             ("references", "References")]
    subnav = "".join(f'<a href="#{i}">{e(t)}</a>' for i, t in links)

    body = f"""
  <aside class="ld-compare-banner" style="background:#0F172A;color:#CBD5E1;border-bottom:1px solid rgba(200, 168, 74, 0.35);padding:12px 24px;position:relative;z-index:999;">
    <div class="g-wrap" style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:13.5px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--primary-accent);"></span>
        <span><strong>UX Management Playbook &amp; Frameworks</strong> &bull; Long-form Documentation</span>
      </div>
      <a href="leadership-deck.html" style="color:#DFBC55;font-weight:700;text-decoration:underline;display:inline-flex;align-items:center;gap:6px;">
        Compare with 10-Slide Keynote Presentation Deck &rarr;
      </a>
    </div>
  </aside>
  <main>
    <section class="g-wrap ld-hero">
      <div>
        <div class="g-overline">Leadership</div>
        <h1>How I lead design teams</h1>
        <p>I build teams that make clear decisions, ship with engineering, and prove impact with evidence. Here is what I believe, how I hire and delegate, and the tools I've built to run teams of up to 12 designers.</p>
        <div style="margin: 18px 0 20px; display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="leadership-deck.html" style="display:inline-flex;align-items:center;gap:8px;font-size:13.5px;padding:9px 18px;border-radius:100px;background:#0F172A;color:#FFFFFF;text-decoration:none;font-weight:700;transition:all 0.2s ease;">
            📊 View 10-Slide Keynote Deck &rarr;
          </a>
        </div>
        <div class="ld-roles">{roles}</div>
      </div>
      <div class="ld-photo"><img src="speaking-gesture.jpg" alt="Balaajee V.R." loading="eager"></div>
    </section>
    <section class="g-wrap"><div class="ld-nums" aria-label="Leadership by the numbers">{nums}</div></section>

    <nav class="ld-nav" aria-label="On this page"><div class="g-wrap">{subnav}</div></nav>

    <section class="g-wrap ld-sec" id="philosophy">
      {lead_head("Leadership philosophy", "Four things I believe about leading design")}
      <div class="ld-cards ld-cards-4">{phil}</div>
    </section>

    <section class="g-wrap ld-sec" id="evolution">
      {lead_head("How my approach evolved", "From engineer to design leader", "Each role changed how I lead. These are the lessons that stuck.")}
      <div class="ld-time">{evo}</div>
    </section>

    <section class="g-wrap ld-sec" id="team">
      {lead_head("Team structure", "Re-organising 12 designers at IBM", "Three product silos were duplicating AI patterns and research. I moved the team to a service model with chapters, while keeping designers embedded in product squads.")}
      <div class="ld-team">
        <div class="ld-col"><h3>Before: product silos</h3><p>Separate patterns, duplicated research</p>{before}</div>
        <div class="ld-arrow">&rarr;</div>
        <div class="ld-col ld-after"><h3>After: UX as a service</h3><p>Shared patterns, embedded pairs, one quality bar</p>{after}</div>
      </div>
      <div class="ld-callout"><b>Result:</b> 6 different AI feedback widgets consolidated into 1, feature cycle time down from 6 weeks to under 2, 100% retention and 3 promotions over 16 months.</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;margin-top:28px;">
        {stage_panel}
        {team_culture}
      </div>
    </section>

    <section class="g-wrap ld-sec" id="hiring">
      {lead_head("Hiring and growing teams", "How I hire", "A consistent process, agreed with product and engineering before the first interview.")}
      <div class="ld-steps">{hire}</div>
      <h3 class="ld-sub">How I grow people</h3>
      <div class="ld-cards ld-cards-4">{grow}</div>
      <h3 class="ld-sub">Track record</h3>
      <div class="ld-cards ld-cards-3">{facts}</div>
    </section>

    <section class="g-wrap ld-sec" id="delegation">
      {lead_head("Delegation", "How I delegate", "I agree the level of ownership with each designer at the start of a project, so nobody has to guess.")}
      <div class="ld-deleg">{deleg}</div>
      <div class="ld-deleg-bar" aria-hidden="true"></div>
      <div class="ld-callout"><b>In practice:</b> {e(DELEGATION_EXAMPLE)}</div>
    </section>

    <section class="g-wrap ld-sec" id="challenges">
      {lead_head("Challenges overcome", "Conflicts I've resolved")}
      <div class="ld-cards ld-cards-3">{chall}</div>
    </section>

    <section class="g-wrap ld-sec" id="workshops">
      {lead_head("Workshops and facilitation", "Bringing people into the room")}
      <div class="ld-workshop"><div class="ld-wlist">{works}</div><div style="display:grid;gap:24px;">{action_photo}{wall_critique}{window_photo}{card_sort}</div></div>
    </section>

    <section class="g-wrap ld-sec" id="tools">
      {lead_head("Tools", "Software I use")}
      <div class="ld-tools">{tools}</div>
      <h3 class="ld-sub">Frameworks I've built</h3>
      <div class="ld-cards ld-cards-3">{fw}</div>
    </section>

    <section class="g-wrap ld-sec" id="docs">
      {lead_head("Business documentation & governance", "How I run the business side of design", "Briefs, OKRs, quality scorecards and roadmaps are how design earns a seat at the planning table.")}
      <div style="margin-bottom:28px;">{scorecard_fig}</div>
      {doc_samples()}
    </section>

    <section class="g-wrap ld-sec" id="references">
      {lead_head("References & Verification", "Available upon request", "Formal reference letters and direct referee contacts from engineering managers, product directors, and former design reports are provided to hiring committees during the interview stage.")}
      <div class="ld-card" style="padding:28px 32px;background:#FFFFFF;border:1px solid var(--border-subtle);border-radius:12px;max-width:780px;">
        <p style="font-size:15px;line-height:1.65;color:var(--text-body);margin:0 0 16px;">
          To respect colleague privacy and corporate confidentiality across IBM, Zebra Technologies, Ericsson, and ZF Wabco, personal contact details and endorsements are not published openly on this website.
        </p>
        <p style="font-size:15px;line-height:1.65;color:var(--text-body);margin:0 0 24px;">
          Verified professional references from former engineering directors, product counterparts, and design mentees are available to hiring committees and executive recruiters upon request during interview stages.
        </p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;">
          <a href="mailto:vrbberaj@gmail.com?subject=Professional%20Reference%20Request%20-%20Balaajee%20V.R." class="ld-btn ld-btn-p" style="padding:10px 22px;font-size:14px;">Request References &rarr;</a>
          <a href="https://linkedin.com/in/vrbberaj" target="_blank" rel="noopener" class="ld-btn ld-btn-s" style="padding:10px 22px;font-size:14px;">Connect on LinkedIn ↗</a>
        </div>
      </div>
    </section>

    <section class="g-wrap">
      <div class="ld-cta">
        <div><h2>Let's talk about your design team</h2><p>Open to senior design leadership roles in India and globally. Available in 30 days.</p></div>
        <div class="ld-cta-btns">
          <a href="mailto:vrbberaj@gmail.com" class="ld-btn ld-btn-p" id="ld-cta-email">Email me</a>
          <a href="work.html" class="ld-btn ld-btn-s" id="ld-cta-work">See case studies</a>
        </div>
      </div>
    </section>
  </main>"""
    out = g.page(
        "Leadership: How I Lead Design Teams | Balaajee V.R.",
        "Leadership philosophy, team structure, hiring, delegation, frameworks and references of design manager Balaajee V.R.",
        "leadership", body, SHARED_CSS + LEAD_CSS)
    with open("leadership.html", "w", encoding="utf-8") as f:
        f.write(out)
    print("  ✓ leadership.html (philosophy, hiring, delegation, tools, docs, references)")


# ===========================================================================
# HOME PAGE ADDITIONS + NAV CLEAN-UP
# ===========================================================================
HOME_START, HOME_END = "<!-- BVR:HOME-EXTRA:START -->", "<!-- BVR:HOME-EXTRA:END -->"

HOME_CSS = """
  .hx { background: #FAFAF9; padding: 88px 0 24px; border-top: 1px solid var(--border-subtle); }
  .hx .g-wrap { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
  .hx-row { display: flex; justify-content: space-between; align-items: end; gap: 24px; flex-wrap: wrap; margin-bottom: 32px; }
  .hx-link { font-size: 14px; font-weight: 700; color: var(--primary-accent); text-decoration: none; white-space: nowrap; }
  .hx-phil { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; margin-bottom: 32px; }
  .hx-phil div { border-top: 2px solid var(--text-main); padding-top: 16px; }
  .hx-phil h3 { font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 6px; }
  .hx-phil p { font-size: 14.5px; line-height: 1.6; color: var(--text-body); }
  @media (max-width: 900px) { .hx-phil { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 560px) { .hx-phil { grid-template-columns: 1fr; } .hx .g-wrap { padding: 0 16px; } }
"""


def inject_home():
    with open("index.html", "r", encoding="utf-8") as f:
        src = f.read()
    src = re.sub(re.escape(HOME_START) + r"[\s\S]*?" + re.escape(HOME_END) + r"\n?", "", src)
    phil = "".join(f"<div><h3>{e(t)}</h3><p>{e(d)}</p></div>" for t, d in PHILOSOPHY)
    block = f"""{HOME_START}
  <style>{SHARED_CSS}{HOME_CSS}</style>
  <section class="hx" aria-label="How I lead">
    <div class="g-wrap">
      <div class="hx-row">
        <div><div class="sec-label">Leadership Philosophy</div><h2 class="sec-title">Four things I believe about leading design</h2></div>
      </div>
      <div class="hx-phil">{phil}</div>
    </div>
  </section>
{HOME_END}
"""
    src = re.sub(r"(</main>[ \t]*\r?\n)", lambda m: m.group(1) + block, src, count=1)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(src)
    print("  ✓ index.html (how-I-lead + references block)")


NAV_LABELS = [
    ("👔 Leadership Deck", "Leadership"), ("🎨 Selected Work", "Selected Work"),
    ("🖼️ Visual Archive", "Visual Archive"), ("📄 My Resume", "Resume"),
    ("🎨 Explore Selected Work (5 Deep Dives)", "Explore selected work (5 case studies)"),
]


def clean_nav(files):
    for fn in files:
        try:
            with open(fn, "r", encoding="utf-8") as f:
                src = f.read()
        except FileNotFoundError:
            continue
        new = src
        for old, lab in NAV_LABELS:
            new = new.replace(old, lab)
        if new != src:
            with open(fn, "w", encoding="utf-8") as f:
                f.write(new)
            print(f"  ✓ {fn} (navigation labels cleaned)")
