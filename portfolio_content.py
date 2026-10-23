# portfolio_content.py
# All editable copy for the case-study pages, the leadership page and testimonials.
# build_gallery_pages.py reads this file; layout lives there, words live here.
#
# REVIEW NOTE: values marked  # CONFIRM  are best-guess placeholders (team sizes,
# hiring counts, etc.). Replace them with your real numbers before sharing widely.

# ---------------------------------------------------------------------------
# Testimonials
# ---------------------------------------------------------------------------
# These are DRAFT recommendations written from the period you worked at each
# company. They are NOT real quotes yet. The usual practice is to send a draft
# like this to the former manager/colleague, let them edit it, and ask them to
# post it on LinkedIn. Keep TESTIMONIALS_ARE_DRAFTS = True (shows a visible
# "Draft" badge) until each person has approved their words, then put their
# real name in "name" and flip "approved" to True for that entry.
TESTIMONIALS_ARE_DRAFTS = True

TESTIMONIALS = [
    {
        "key": "ibm-pm",
        "quote": "Balaajee took over a design team split across three products and, within a quarter, gave us one team with one way of working. What I valued most was how he handled the AI debate: he turned a stand-off between our research scientists and compliance into clear rules every squad could ship against.",
        "role": "Director of Product Management",
        "company": "IBM Software Labs",
        "relation": "Worked with Balaajee as his product partner",
        "period": "2024 – 2026",
        "name": "",
        "approved": False,
    },
    {
        "key": "ibm-designer",
        "quote": "He handed me the model diff drawer from first sketch to release and trusted me to run it. He was always there in critique, never in my way. His coaching is the reason I moved into a lead role.",
        "role": "Senior Product Designer",
        "company": "IBM Software Labs",
        "relation": "Reported to Balaajee",
        "period": "2024 – 2026",
        "name": "",
        "approved": False,
    },
    {
        "key": "zebra-pm",
        "quote": "Balaajee brought customers into the room. His card-sorting and feedback sessions with enterprise accounts reshaped our VisibilityIQ roadmap, and the design team he hired became one engineering genuinely trusted.",
        "role": "Senior Director, Product Management",
        "company": "Zebra Technologies",
        "relation": "Balaajee's product counterpart",
        "period": "2021 – 2024",
        "name": "",
        "approved": False,
    },
    {
        "key": "wabco-eng",
        "quote": "In under a year Balaajee gave our squads a shared design system and a clean handoff process. Safety reviews got faster because every design decision came with evidence from real drivers.",
        "role": "Engineering Manager, Fleet Telematics",
        "company": "ZF Wabco",
        "relation": "Worked with Balaajee on the cockpit programme",
        "period": "2020 – 2021",
        "name": "",
        "approved": False,
    },
    {
        "key": "ericsson-sales",
        "quote": "Our sales engineers were sceptical of any new tool. Balaajee sat with them, learned how they really worked, and designed something they preferred to their spreadsheets.",
        "role": "Sales Operations Lead",
        "company": "Ericsson",
        "relation": "Business stakeholder for the Sales Automation Tool",
        "period": "2019 – 2020",
        "name": "",
        "approved": False,
    },
]

TESTIMONIAL_BY_KEY = {t["key"]: t for t in TESTIMONIALS}

# ---------------------------------------------------------------------------
# Case studies (order = gallery order)
# artifact kind: "real"       -> original deliverable (Behance / certificate)
#                "recreation" -> rebuilt for this portfolio, original is under NDA
#                "diagram"    -> HTML diagram rendered on the page
# ---------------------------------------------------------------------------
CASE_STUDIES = [
    # ------------------------------------------------------------------ IBM
    {
        "file": "case-ibm-watson.html",
        "company": "IBM Software Labs",
        "domain": "Agentic AI",
        "title": "Making AI agents safe to use in mission-critical engineering tools",
        "lead": "IBM wanted Watson inside Rhapsody SE (systems modelling) and MaaS360 (endpoint security). Users refused to trust AI that changed models or laptops silently. I led the team that made AI decisions visible, reviewable and auditable.",
        "cover": "screenshots/ibm_maas360_ai_endpoint.png",
        "cover_kind": "recreation",
        "snapshot": {
            "My role": "Senior Manager, UI/UX Design",
            "Team": "12 designers in 3 chapters",
            "Timeline": "Sep 2024 – Jan 2026 (16 months)",
            "Stakeholders": "Watson AI research, 3 product directors, 4 engineering squads, compliance & CISO",
            "Methods": "Field shadowing, workshops, wireframes, prototypes, 3 rounds of usability testing, OKRs",
            "Platforms": "Desktop modelling IDE, web admin console",
        },
        "metrics": [("74%", "faster model drafting"), ("82%", "faster threat triage"), ("61 → 89", "usability score (SUS)"), ("0", "compliance violations")],
        "problem": [
            "Systems engineers spent up to 14 hours turning written requirements into SysML models. Security admins faced 1,200+ alerts a day and wrote fixes by hand.",
            "Generic AI made it worse. It produced changes nobody could trace, so checking its work took longer than doing it manually. Compliance teams banned it outright.",
            "At the same time the design team was split into three product silos, each inventing its own AI patterns.",
        ],
        "owned": [
            "Framed the research and personally ran 24 shadowing sessions",
            "Defined the confidence-gating model with the AI research lead",
            "Facilitated 14 alignment workshops with research, product and compliance",
            "Re-organised the 12-person team and coached through bi-weekly 1:1s",
            "Presented design direction and results to VPs and the steering committee",
        ],
        "delegated": [
            "Rhapsody pod (2 designers): model diff drawer and SysML node design, end to end",
            "MaaS360 pod (2 designers): fleet tables, alert filters and staged rollout flow",
            "DesignOps chapter (4): Carbon token pipeline and accessibility checks",
            "Agentic IA chapter (4): shared AI patterns, test logistics and synthesis",
        ],
        "process": [
            ("Research", "Shadowed 24 engineers and admins. Key insight: “verification fatigue”. Checking AI output took longer than writing it."),
            ("Align", "14 workshops turned a research-vs-compliance stand-off into written AI trust rules."),
            ("Wireframe", "Low-fi confidence states. Round 1 tested raw scores: SUS 61. Users asked “why 92%?”"),
            ("Prototype", "Mid-fi reasoning trace showing each agent step. Round 2: SUS 78."),
            ("Test", "Hi-fi side-by-side diff and one-click approval with 32 users. Round 3: SUS 89, 97% task success."),
            ("Measure", "Tracked OKRs with product directors: tracing time, triage time, SUS and token sync speed."),
        ],
        "artifacts": [
            {"kind": "recreation", "src": "screenshots/transformation-ibm-watson.png", "caption": "Multi-agent AI telemetry cockpit: orchestrating task routing, safety tripwires, and supervised diff approvals."},
            {"kind": "recreation", "src": "screenshots/ibm_maas360_ai_endpoint.png", "caption": "MaaS360: AI remediation with staged rollout and supervised approval."},
            {"kind": "recreation", "src": "screenshots/ibm_rhapsody_ai_modeling.png", "caption": "Rhapsody SE: multi-agent SysML statechart copilot with mathematical safety guardrails."},
            {"kind": "diagram", "diagram": "confidence", "caption": "The three-tier confidence model the team designed and shipped."},
            {"kind": "recreation", "src": "screenshots/verified_whiteboard_sketch.png", "caption": "Workshop #3 whiteboard: why unguided AI fails in regulated systems."},
        ],
        "decisions": [
            ("Three levels of AI autonomy instead of on/off", "Compliance needed control; engineers needed speed. High-confidence actions run, medium ones open a diff for review, low ones hand control back.", "Added a review step for mid-confidence actions. Accepted because it removed the compliance veto."),
            ("Show what changed, not just a confidence score", "Round 1 users ignored percentages. They trusted a visual before/after diff.", "Two extra sprints, and we dropped a chatbot window that product wanted for marketing."),
            ("Re-organise 12 designers into chapters", "Three silos were building six different AI feedback widgets.", "Product teams lost “their” designer. Fixed by embedding designer pairs in each product squad."),
        ],
        "results": "AI moved from banned to adopted. Model drafting went from 14.2 hours to 3.6, threat triage from 4.1 hours to 43 minutes, with zero compliance violations across 140,000+ AI-assisted tasks. The team kept 100% retention over 16 months and three designers were promoted.",
        "learned": "Trust is a design deliverable. Next time I would bring compliance into the first research round, not the third workshop. It would have saved us a month of debate.",
        "testimonial": "ibm-designer",
    },
    # ------------------------------------------------------------- Ericsson
    {
        "file": "case-ericsson.html",
        "company": "Ericsson",
        "domain": "Enterprise sales tools",
        "title": "From a 14-tab Excel ordeal to a one-screen deal engine",
        "lead": "Sales engineers built multi-million business cases in a fragile 14-tab spreadsheet. I designed the Sales Automation Tool that replaced it with a keyboard-first, scenario-based web app.",
        "cover": "assets/covers/ericsson_dashboard.png",
        "cover_kind": "real",
        "snapshot": {
            "My role": "UI/UX Designer, design lead for the tool",
            "Team": "2 designers, 1 product owner, 8 engineers",  # CONFIRM
            "Timeline": "Jul 2019 – Sep 2020 (15 months)",
            "Stakeholders": "Sales engineers, commercial directors, pricing governance, SAP integration team",
            "Methods": "Contextual inquiry, workflow mapping, wireframes, prototype, 12 moderated tests",
            "Platforms": "Desktop web app",
        },
        "metrics": [("6 days → 42 min", "deal turnaround"), ("0", "formula errors"), ("94%", "adoption in 30 days"), ("34 → 87", "usability score (SUS)")],
        "problem": [
            "1,200+ sales engineers in 45 countries built quotes and business cases in one unversioned 50 MB workbook with 14 tabs and fragile macros.",
            "One edited cell could break formulas across the file. Every deal waited in a commercial director’s inbox for manual checking: about six days per quote.",
            "Earlier web tools had failed with under 15% adoption because they felt slower than Excel.",
        ],
        "owned": [
            "Field research: shadowed 12 engineers on live bids",
            "Workflow map: 18 manual steps cut to 5",
            "Interaction model and information architecture for the grid and scenarios",
            "Prototype and 12 moderated usability sessions in two countries",
        ],
        "delegated": [
            "Chart and dashboard visual design: second designer, reviewed weekly",
            "Grid performance spikes: front-end engineers, with my acceptance criteria",
            "Pricing rules and approval thresholds: agreed with pricing governance",
        ],
        "process": [
            ("Research", "Shadowed engineers on live bids. They loved Excel for keyboard speed, not for its looks."),
            ("Define", "Mapped the deal lifecycle from intake to signature. Found where the six days went."),
            ("Wireframe", "Scenario A vs B layout so engineers could compare business cases side by side."),
            ("Prototype", "Keyboard-first grid: arrow keys, paste from Excel, instant totals."),
            ("Test", "12 moderated sessions. SUS rose from 34 (old process) to 87."),
            ("Measure", "Adoption, turnaround time and error rate tracked for 30 days after launch."),
        ],
        "artifacts": [
            {"kind": "recreation", "src": "screenshots/transformation-ericsson.png", "caption": "Shipped single-screen scenario pricing tool: translating 14 complex Excel formula sheets into high-density grid comparison."},
            {"kind": "real", "src": "assets/behance/sales/sales_2_1200x1196.png", "caption": "Business case summary: profit and loss, cost of sales and cash flow per scenario."},
            {"kind": "real", "src": "assets/behance/sales/sales_3_1200x788.png", "caption": "Recent scenarios and opportunities: the engineer’s starting point."},
            {"kind": "real", "src": "assets/behance/sales/sales_1_1200x3772.png", "caption": "Scenario A vs B: engineering, transitional and transformational cost compared.", "tall": True},
            {"kind": "real", "src": "screenshots/behance/ericsson_hackfest_cert.png", "caption": "Also at Ericsson: 1st place, Group IT India Hackfest 2020 (Optimization), for the “Ericxa” employee-onboarding idea."},
        ],
        "decisions": [
            ("A grid, not a wizard", "Engineers would only switch if the tool was as fast as Excel.", "Harder to build and test than a form wizard. We spent a sprint on grid performance."),
            ("Auto-approve healthy deals", "Deals at 35%+ margin skip manual review; others escalate with a reason.", "Governance had to trust a rule instead of a person. We piloted it in two markets first."),
            ("Compare scenarios side by side", "Engineers always built two or three options for a customer.", "More complex layout. We kept it to two scenarios on screen at once."),
        ],
        "results": "Quote turnaround fell from six days to 42 minutes, formula errors went to zero, and 94% of engineers were using the tool within 30 days, without a mandate.",
        "learned": "Adoption is earned in the first week. Shadowing users before designing anything is what saved this project.",
        "testimonial": "ericsson-sales",
    },
    # ---------------------------------------------------------------- Zebra
    {
        "file": "case-zebra.html",
        "company": "Zebra Technologies",
        "domain": "Industrial IoT",
        "title": "Device health insights for rugged enterprise fleets",
        "lead": "IT managers running thousands of Zebra handhelds couldn’t see why devices failed. I led the design team behind VisibilityIQ device-health dashboards, and built the team while doing it.",
        "cover": "screenshots/behance/zebra_iot_dashboard.png",
        "cover_kind": "real",
        "snapshot": {
            "My role": "UI/UX Product Design Manager and hiring manager",
            "Team": "Grew from 3 to 9: 7 designers, 1 researcher, 1 design-system lead",  # CONFIRM
            "Timeline": "Jul 2021 – Aug 2024 (3 years)",
            "Stakeholders": "Product management, sales leadership, enterprise customers, engineering squads, support",
            "Methods": "Customer interviews, personas, card sorting, user flows, wireframes, prototypes, feedback sessions",
            "Platforms": "Web dashboards, Android handheld apps",
        },
        "metrics": [("38,000+", "handhelds managed"), ("84%", "fewer pairing failures"), ("3.2×", "staging throughput"), ("−33%", "tier-1 support tickets")],
        "problem": [
            "Enterprise IT managers like “Jamie” (our main persona) had battery, application and memory data spread across separate reports. They found out about failing devices when workers complained.",
            "Customers such as Australia Post asked for things we couldn’t show: which app was draining the battery, and which devices needed repair before the shift.",
            "On the warehouse floor, workers in freezers wore thick gloves that made standard touch targets unusable.",
        ],
        "owned": [
            "Negotiated the roadmap with product and sales leadership",
            "Set up the customer research programme and ran key sessions",
            "Hired and onboarded 6 designers; ran 1:1s and growth plans",  # CONFIRM
            "Owned design-system governance across product squads",
            "Represented design in PI planning",
        ],
        "delegated": [
            "Device Health dashboard detail design: senior designer, with weekly critique",
            "Research operations and synthesis: UX researcher",
            "Component library and tokens: design-system lead",
            "Scanner and staging flows on handhelds: designer pair embedded with Android team",
        ],
        "process": [
            ("Research", "Interviews with IT managers and customer meetings (Australia Post, Viva Aqua). Built the “Jamie” persona."),
            ("Define", "Card sorting with stakeholders grouped 100+ data points into Devices, Applications, Battery and Performance."),
            ("Wireframe", "User flows and low-fi Device Health Summary, where every insight ends in an action."),
            ("Prototype", "Hi-fi VisibilityIQ dashboard in Figma, tested with customer IT teams."),
            ("Test", "Customer feedback sessions. “This version seems clearer, much less crowded.”"),
            ("Measure", "Support tickets, pairing failures and staging throughput tracked after release."),
        ],
        "artifacts": [
            {"kind": "recreation", "src": "screenshots/transformation-zebra.png", "caption": "Shipped VisibilityIQ: Enterprise IoT device telemetry and actionable health dashboard across 38,000+ managed handhelds."},
            {"kind": "real", "src": "assets/behance/enterprise/enterprise_1_1400x889.png", "caption": "Persona: Jamie, IT manager. Goals, frustrations and device usage."},
            {"kind": "real", "src": "assets/behance/enterprise/enterprise_2_1400x730.png", "caption": "Card-sorting board from the stakeholder workshop."},
            {"kind": "real", "src": "assets/behance/enterprise/enterprise_3_1400x1106.png", "caption": "Device-health user flow and branching logic."},
            {"kind": "real", "src": "assets/behance/enterprise/enterprise_5_1400x788.png", "caption": "Research findings from customer meetings."},
            {"kind": "real", "src": "assets/behance/enterprise/enterprise_4_1400x2319.png", "caption": "Low-fi Device Health Summary: every card ends in an action.", "tall": True},
            {"kind": "real", "src": "assets/behance/enterprise/enterprise_6_1400x1569.png", "caption": "Shipped VisibilityIQ dashboard in production.", "tall": True},
            {"kind": "real", "src": "assets/behance/enterprise/enterprise_7_1400x788.png", "caption": "Customer feedback and validated usability responses."},
        ],
        "decisions": [
            ("Organise by what IT managers act on", "The card sort showed people think in Devices, Applications and Battery, not in our data sources.", "Engineering had to join data from three back-ends into one view."),
            ("Every insight ends in an action", "Customers didn’t want charts; they wanted “Request repair” or “Request OS update”.", "Each action needed a back-end workflow, so we launched with four and added more later."),
            ("Glove-friendly handheld UI", "Freezer visits showed 44px targets failed with thermal gloves. We moved to 72px with high contrast.", "Fewer items per screen, so flows got one step longer."),
        ],
        "results": "Customers called the new dashboards “clearer, much less crowded”. Pairing failures dropped 84%, staging throughput rose 3.2×, and tier-1 tickets fell by a third across 38,000+ managed handhelds.",
        "learned": "Customer quotes moved the roadmap more than any deck I made. I now put a customer voice in every roadmap review.",
        "testimonial": "zebra-pm",
    },
    # --------------------------------------------------------------- Carbon
    {
        "file": "case-ibm-carbon.html",
        "company": "IBM Software Labs",
        "domain": "Carbon design system",
        "title": "One source of truth for design tokens across 14 squads",
        "lead": "Fourteen product squads were hard-coding colours and rebuilding the same components. I set up a token pipeline and a contribution council so design changes reached production automatically.",
        "cover": "screenshots/transformation-ibm-carbon.png",
        "cover_kind": "recreation",
        "snapshot": {
            "My role": "Design manager, owner of DesignOps and governance",
            "Team": "DesignOps chapter: 4 designers + 2 front-end engineers",  # CONFIRM
            "Timeline": "2024 – 2026, alongside the Watson programme",
            "Stakeholders": "14 squad leads, front-end engineering, accessibility office, brand",
            "Methods": "Drift audit, token taxonomy, RFC process, CI pipeline, defect tracking",
            "Platforms": "Figma, React, Angular, Web Components",
        },
        "metrics": [("320+", "hard-coded values removed"), ("4 wks → 1 day", "design-to-code handoff"), ("−70%", "visual QA bugs"), ("+28%", "front-end velocity")],
        "problem": [
            "Fourteen squads built on Carbon, but each one had drifted. We found 320+ hard-coded colour values and several versions of the same button.",
            "Brand or theme changes took about four weeks to reach code, and 70% of front-end QA tickets were visual bugs.",
        ],
        "owned": [
            "Ran the drift audit and made the case to engineering leadership",
            "Defined the three-tier token structure with the DesignOps lead",
            "Set up and chaired the weekly contribution council",
            "Agreed success metrics with front-end leads",
        ],
        "delegated": [
            "Figma variables and token library: DesignOps designers",
            "CI pipeline (Style Dictionary + GitHub Actions): front-end engineers",
            "Visual regression and accessibility checks: QA with DesignOps",
            "RFC templates and council admin: rotating squad representatives",
        ],
        "process": [
            ("Audit", "Inventoried colours, spacing and components across 14 squads."),
            ("Define", "Three token tiers: global → semantic → component."),
            ("Design", "Figma variables with light and dark modes from day one."),
            ("Build", "Publishing a token opens pull requests in every squad repo automatically."),
            ("Govern", "Squads propose changes with a one-page RFC; council reviews weekly."),
            ("Measure", "Visual QA bugs, handoff time and front-end velocity per sprint."),
        ],
        "artifacts": [
            {"kind": "diagram", "diagram": "tokens", "caption": "The three-tier token structure: designers change intent, not hex codes."},
            {"kind": "recreation", "src": "screenshots/transformation-ibm-carbon.png", "caption": "Token sync console: which tokens reached which squads."},
        ],
        "decisions": [
            ("Semantic tokens between brand and components", "Squads should change “primary action”, not “blue-60”.", "A learning curve for designers used to picking colours directly."),
            ("A council, not a central gatekeeper", "A small central team would become a bottleneck for 14 squads.", "Slower for one-off requests; faster for everyone overall."),
            ("Automate pull requests instead of writing docs", "Docs go stale; automated PRs make the right thing the easy thing.", "Needed engineering time up front from two front-end engineers."),
        ],
        "results": "Design-to-code handoff dropped from about four weeks to a day, visual QA bugs fell 70%, and front-end velocity rose 28%. Light and dark themes now stay in sync automatically.",
        "learned": "A design system is a product, and its customers are engineers. Treating squads as users, with research and release notes, is what got adoption.",
        "testimonial": "ibm-pm",
    },
    # ------------------------------------------------------------- ZF Wabco
    {
        "file": "case-zf-wabco.html",
        "company": "ZF Wabco",
        "domain": "Automotive",
        "title": "A truck cockpit drivers can read in under a second",
        "lead": "Long-haul drivers juggled aftermarket gadgets and unprioritised alarms. I led UX for an in-cab cluster and fleet tracking app designed around a strict glance-time budget.",
        "cover": "screenshots/transformation-zf-wabco.png",
        "cover_kind": "recreation",
        "snapshot": {
            "My role": "UI/UX Senior Specialist, UX lead for cluster and fleet app",
            "Team": "3 designers + 1 human-factors engineer",  # CONFIRM
            "Timeline": "Oct 2020 – Jul 2021 (10 months)",
            "Stakeholders": "Product management, embedded engineering, safety & homologation, fleet customers",
            "Methods": "In-cab ride-alongs, glance-time tests, heatmaps, simulator prototypes, usability tests",
            "Platforms": "In-cab cluster display, mobile fleet app",
        },
        "metrics": [("2.8s → 0.94s", "eyes-off-road glance"), ("< 1.2s", "glance guideline met"), ("−18%", "critical route errors"), ("80,000+", "trucks deployed")],
        "problem": [
            "Drivers of 40-tonne trucks glanced at cluttered tablets and separate radar beepers. Eyes-off-road time often went past 2.5 seconds, above EU driver-distraction guidance.",
            "Night driving made it worse: bright screens hurt night vision and small touch targets were impossible at 90 km/h.",
        ],
        "owned": [
            "Ride-along research with long-haul drivers",
            "The three-zone layout and glance-time budget",
            "Alignment with safety and homologation reviewers",
            "Scaling the shared design system across squads",
        ],
        "delegated": [
            "Night and day colour palettes: visual designer",
            "Fleet mobile app flows: second designer",
            "Glance-time measurement protocol: human-factors engineer",
        ],
        "process": [
            ("Research", "Ride-alongs on night freight routes. Mapped every glance and every alarm."),
            ("Define", "Set a glance budget: critical info under 0.8s, navigation under 1.2s."),
            ("Wireframe", "Three zones: safety and speed, turn guidance, peripheral eco-coaching."),
            ("Prototype", "Simulator builds with day and anti-glare night modes."),
            ("Test", "Glance-time and heatmap tests in simulated rain, fog and tunnels."),
            ("Measure", "Route errors and driver feedback tracked across the fleet rollout."),
        ],
        "artifacts": [
            {"kind": "diagram", "diagram": "zones", "caption": "Three glance zones: what the driver sees first, second and only peripherally."},
            {"kind": "recreation", "src": "screenshots/transformation-zf-wabco.png", "caption": "Cluster layout with zone 1 speed and radar, zone 2 turn card, zone 3 eco-coaching."},
        ],
        "decisions": [
            ("Three glance zones with strict priority", "Safety information must win every time something competes for attention.", "Eco-coaching, a sales feature, was demoted to a peripheral light."),
            ("No touch interaction while driving", "Touch at 90 km/h on a vibrating cab caused repeated mis-taps.", "Some settings moved to the parked state or the fleet app."),
            ("Dedicated anti-glare night palette", "Drivers dimmed screens to zero at night and missed alerts.", "Two full colour modes to design, test and certify."),
        ],
        "results": "Average glance time dropped from 2.8 seconds to 0.94, well inside the 1.2-second guideline. Critical route errors fell 18% across 80,000+ trucks.",
        "learned": "In safety-critical UI, what you remove matters more than what you add. The hardest conversations were about what to leave out.",
        "testimonial": "wabco-eng",
    },
]

# ---------------------------------------------------------------------------
# Leadership page
# ---------------------------------------------------------------------------
PHILOSOPHY = [
    ("Clarity before pixels", "Zero-waste scoping: every initiative starts with a 1-page executive brief defining the user problem, business ROI metric, technical constraints, and definition of done before designers touch Figma."),
    ("Delegate outcomes, not tasks", "Autonomous squad leadership: I empower designers with ownership of measurable problem spaces and definition of done, staying close through rigorous design critique rather than micro-control."),
    ("Engineering is a design partner", "Sprint zero velocity: designers pair directly with engineering leads from sprint zero. Shared design tokens, shared live demos, and shared velocity metrics eliminate handoff churn and code debt."),
    ("Evidence over opinion", "Empirical decision architecture: usability scores, contextual research, production telemetry, and business ROI settle architectural debates—never corporate hierarchy or subjective opinion."),
]

EVOLUTION = [
    ("2006 – 2010", "Infosys", "Senior Software Engineer", "Learned how engineers think. It\u2019s why I design with them, not for them."),
    ("2010 – 2015", "Titi Technologies", "Creative Head", "My first team. I was the best designer in the room and also the bottleneck. I learned to let go."),
    ("2015 – 2017", "Freelance", "UI/UX Designer", "Worked directly with clients, including healthcare UX research for Samsung. Learned to sell the \u201cwhy\u201d."),
    ("2017 – 2019", "NP Compete", "Lead UI/UX Designer", "Ran sprint planning and a small team. Started measuring design with numbers."),
    ("2019 – 2020", "Ericsson", "UI/UX Designer", "Went back to hands-on work at global scale. Field research changed how I start every project."),
    ("2020 – 2021", "ZF Wabco", "UI/UX Senior Specialist", "Safety-critical work taught me that evidence has to be rigorous, not convenient."),
    ("2021 – 2024", "Zebra Technologies", "Product Design Manager", "Became a hiring manager. Learned that hiring and coaching are the job, not a distraction from it."),
    ("2024 – 2026", "IBM Software Labs", "Senior Manager, UI/UX Design", "Led 12 designers through a re-org and an AI transformation. Leading through ambiguity."),
]

LEADERSHIP_NUMBERS = [
    ("12", "designers led at IBM"),
    ("100%", "team retention over 16 months"),
    ("3", "designers promoted"),
    ("50+", "designers mentored"),
    ("6", "design systems built or scaled"),
    ("18+", "years in product and design"),
]

HIRING_STEPS = [
    ("Scorecard", "Skills and behaviours agreed with the product and engineering leads before the role opens."),
    ("Portfolio review", "I look for decisions and trade-offs, not polish."),
    ("Live framing", "A 60-minute session where we frame a real problem together. No unpaid take-home work."),
    ("Partner panel", "The candidate meets the PM and engineering lead they would work with."),
    ("Structured debrief", "Everyone scores against the scorecard before discussing, to avoid groupthink."),
]

GROWTH_PRACTICES = [
    ("30-60-90 onboarding", "A buddy, a first shipped piece of work inside 30 days, and a clear 90-day goal."),
    ("Bi-weekly 1:1s", "Their agenda first. Career, blockers, then work."),
    ("Growth matrix", "Four stages: Craft \u2192 Logic \u2192 Systems \u2192 Strategy. We agree the next stage together each quarter."),
    ("Team rituals", "Weekly critique, a design review gate before dev, monthly show-and-tell, research readouts."),
]

HIRING_FACTS = [
    ("Hiring manager at Zebra", "Built the design team from 3 to 9 people."),  # CONFIRM
    ("12 designers at IBM", "Re-organised from three silos into a service model."),
    ("50+ mentored", "Across Ericsson, Zebra, IBM and earlier roles."),
]

DELEGATION_LEVELS = [
    ("I decide", "Team structure, hiring decisions, design principles, the quality bar."),
    ("We decide together", "Roadmap priorities with product; design-system changes through the council."),
    ("You decide, keep me posted", "Interaction details, research plans, component design."),
    ("You own it", "Day-to-day execution, visual craft, tools and workflow."),
]

DELEGATION_EXAMPLE = "At IBM, a senior designer owned the model diff drawer end to end. I reviewed it at three checkpoints (brief, mid-fi, pre-release) and otherwise stayed out of the way. It shipped on time and became the pattern for both products."

TEAM_BEFORE = [("Rhapsody SE", 4), ("MaaS360", 5), ("Watson Core", 3)]
TEAM_AFTER = [
    ("Agentic IA chapter", 4, "Shared AI patterns: confidence, reasoning traces, error recovery."),
    ("Embedded product pods", 4, "Designer pairs inside Rhapsody SE and MaaS360 squads."),
    ("DesignOps chapter", 4, "Tokens, pipeline, accessibility and tooling."),
]

CHALLENGES = [
    ("Research vs. compliance", "IBM", "AI researchers wanted full autonomy; compliance wanted to ban it. I reframed autonomy as something earned through confidence, and we shipped a three-tier model both sides signed.", "case-ibm-watson.html"),
    ("Product assumption vs. the field", "Zebra", "Product assumed standard touch would work in freezers. Three days on a cold-storage floor proved otherwise, and the data changed the roadmap.", "case-zebra.html"),
    ("Sales speed vs. governance", "Ericsson", "Sales wanted flexibility, pricing wanted control. Auto-approval for healthy deals gave both what they needed.", "case-ericsson.html"),
]

WORKSHOPS = [
    ("14 AI governance workshops", "IBM", "Research, product, compliance and legal agreeing AI trust rules."),
    ("Customer card sorting", "Zebra", "Stakeholders and customers grouping device-health data."),
    ("PI planning & Lean UX", "Zebra", "Design represented in every programme increment."),
    ("Contextual inquiry", "Ericsson", "Shadowing sales engineers on live bids in Stockholm."),
    ("Weekly AI-UX masterclasses", "IBM", "Upskilling the team on designing for AI."),
]

TOOLS = [
    ("Design & prototyping", ["Figma", "FigJam", "Miro", "Mural"]),
    ("Research & analytics", ["UserTesting", "Hotjar", "Google Analytics"]),
    ("Delivery & operations", ["Jira", "Confluence", "Monday.com"]),
    ("AI in my workflow", ["Microsoft Copilot", "ChatGPT Enterprise", "IBM Watson", "Google Stitch", "NotebookLM", "Gemini"]),
    ("Standards", ["WCAG 2.2 AA", "European Accessibility Act", "GDPR privacy by design", "Carbon Design System"]),
]

FRAMEWORKS = [
    ("One-page UX brief", "Problem, user, success metric, constraints and risks. Signed by PM, engineering lead and design before a sprint starts.", "IBM, Zebra"),
    ("10-point AI heuristic rubric", "Checks provenance, blast radius, reversibility and graceful failure before AI features reach development.", "IBM"),
    ("Designer growth matrix", "Four stages (Craft, Logic, Systems, Strategy) used in 1:1s and promotion cases.", "IBM, Zebra"),
    ("Design review checklist", "A quality gate: accessibility, states, tokens, content and analytics events.", "Zebra, IBM"),
    ("RICE + UX-debt prioritisation", "A spreadsheet that weighs reach, impact and confidence against effort and UX debt.", "IBM"),
    ("Hiring scorecard", "Skills and behaviours agreed before interviews; scored before the debrief.", "Zebra, IBM"),
]

TARGET_ROLES = ["Head of Design", "Design Director", "Senior UX Design Manager"]
