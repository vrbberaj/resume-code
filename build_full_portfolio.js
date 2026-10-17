// build_full_portfolio.js
// Assembles index.html with:
// 1. Leadership Deck (10 Slides) FIRST (Default Active View)
// 2. UI/UX Case Studies (5 In-Depth Projects) SECOND (Separate Dedicated View)
// 3. Executive CV THIRD
// Replaces all VP stakeholder references with accurate Senior Manager / Director terminology.

const fs = require('fs');
const path = require('path');

console.log('Compiling Full Executive Portfolio with Leadership Deck FIRST and UI/UX Case Studies SECOND...');

const deckFile = path.join(__dirname, 'leadership_deck.html');
const deckHtml = fs.readFileSync(deckFile, 'utf8');

// 1. Extract slides from leadership_deck.html
const mainMatch = deckHtml.match(/<main class="keynote-container">([\s\S]*?)<\/main>/);
let slidesHtml = mainMatch ? mainMatch[1] : '';

// Replace links inside slides to match SPA navigation
slidesHtml = slidesHtml.replace(/href="\/#cases"/g, 'href="javascript:void(0)" onclick="switchMainView(\'cases\')"');
slidesHtml = slidesHtml.replace(/href="\/"/g, 'href="javascript:void(0)" onclick="switchMainView(\'cases\')"');

// Add deep link buttons into the 5 case slides in the deck
slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 4/,
  `  <div style="margin-top: 14px; text-align: right;">
       <button class="btn-action btn-gold" onclick="switchMainView('cases'); scrollToCase('case-ericsson');" style="padding: 7px 16px; border-radius: 100px; font-size: 12px; font-weight: 600; background: var(--gold); color: #0D1B2E; border: none; cursor: pointer;">
         🔍 Explore Full Ericsson UI/UX Case Study &amp; Data Grid &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 4`
);

slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 5/,
  `  <div style="margin-top: 14px; text-align: right;">
       <button class="btn-action btn-gold" onclick="switchMainView('cases'); scrollToCase('case-zebra');" style="padding: 7px 16px; border-radius: 100px; font-size: 12px; font-weight: 600; background: var(--gold); color: #0D1B2E; border: none; cursor: pointer;">
         🔍 Explore Full Zebra IoT UI/UX Case Study &amp; Scanner Flow &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 5`
);

slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 6/,
  `  <div style="margin-top: 14px; text-align: right;">
       <button class="btn-action btn-gold" onclick="switchMainView('cases'); scrollToCase('case-zf-wabco');" style="padding: 7px 16px; border-radius: 100px; font-size: 12px; font-weight: 600; background: var(--gold); color: #0D1B2E; border: none; cursor: pointer;">
         🔍 Explore Full ZF Wabco Cockpit HUD Case Study &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 6`
);

slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 7/,
  `  <div style="margin-top: 14px; text-align: right;">
       <button class="btn-action btn-gold" onclick="switchMainView('cases'); scrollToCase('case-ibm-carbon');" style="padding: 7px 16px; border-radius: 100px; font-size: 12px; font-weight: 600; background: var(--gold); color: #0D1B2E; border: none; cursor: pointer;">
         🔍 Explore Full IBM Carbon DesignOps Token Case Study &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 7`
);

slidesHtml = slidesHtml.replace(
  /<\/div>\s*<\/section>\s*<!-- SLIDE 8/,
  `  <div style="margin-top: 14px; text-align: right;">
       <button class="btn-action btn-gold" onclick="switchMainView('cases'); scrollToCase('case-ibm-watson');" style="padding: 7px 16px; border-radius: 100px; font-size: 12px; font-weight: 600; background: var(--gold); color: #0D1B2E; border: none; cursor: pointer;">
         🔍 Explore Full IBM Watson Agentic AI Case Study &rarr;
       </button>
     </div>
   </div>
 </section>
 <!-- SLIDE 8`
);

// 2. Extract deck CSS
const styleMatch = deckHtml.match(/<style>([\s\S]*?)<\/style>/);
let deckCss = styleMatch ? styleMatch[1] : '';

// Clean deckCss so body styles don't override the main document
deckCss = deckCss.replace(/body\s*{[^}]*}/g, '');
deckCss = deckCss.replace(/body\.has-sidebar[^{]*{[^}]*}/g, '');

// Read existing UI/UX case studies HTML
const casesFile = path.join(__dirname, 'rebuild_as_uiux_case_studies.js');
let casesScript = fs.readFileSync(casesFile, 'utf8');

// Extract the html template string from rebuild_as_uiux_case_studies.js
const startMarker = 'const html = `<!DOCTYPE html>';
const startIndex = casesScript.indexOf(startMarker);
let fullCasesHtml = casesScript.substring(startIndex + 'const html = `'.length);
fullCasesHtml = fullCasesHtml.substring(0, fullCasesHtml.lastIndexOf('`;'));

// Replace all VP references in case studies
fullCasesHtml = fullCasesHtml.replace(/automated VP escalation triggers/g, 'automated Commercial Director escalation triggers');
fullCasesHtml = fullCasesHtml.replace(/waiting days for VP email sign-offs/g, 'waiting days for Commercial Director email sign-offs');
fullCasesHtml = fullCasesHtml.replace(/Email workbook to Regional Commercial VP for manual margin verification\./g, 'Email workbook to Regional Commercial Director for manual margin verification.');
fullCasesHtml = fullCasesHtml.replace(/prompted required VP approval\./g, 'prompted required Commercial Director approval.');
fullCasesHtml = fullCasesHtml.replace(/partner closely with product managers and VPs/g, 'partner closely with product directors, engineering leads, and business stakeholders');

// 3. Assemble Header Navigation: Put Leadership Deck FIRST!
const oldNav = `<nav class="nav-tabs" aria-label="Main Navigation">
        <button class="nav-tab-btn active" id="tabBtnCases" onclick="switchMainView('cases')">
          <span>🎨 UI/UX Case Studies (5)</span>
        </button>
        <button class="nav-tab-btn" id="tabBtnLeadership" onclick="switchMainView('leadership')">
          <span>👔 Leadership &amp; Approach</span>
        </button>
        <button class="nav-tab-btn" id="tabBtnCV" onclick="switchMainView('cv')">
          <span>📄 Executive CV</span>
        </button>
      </nav>`;

const newNav = `<nav class="nav-tabs" aria-label="Main Navigation">
        <button class="nav-tab-btn active" id="tabBtnDeck" onclick="switchMainView('deck')">
          <span>👔 Leadership Deck (10)</span>
        </button>
        <button class="nav-tab-btn" id="tabBtnCases" onclick="switchMainView('cases')">
          <span>🎨 UI/UX Case Studies (5)</span>
        </button>
        <button class="nav-tab-btn" id="tabBtnCV" onclick="switchMainView('cv')">
          <span>📄 Executive CV</span>
        </button>
      </nav>`;

fullCasesHtml = fullCasesHtml.replace(oldNav, newNav);

// 4. Construct View 1: #viewDeck (Leadership Deck)
const viewDeckHtml = `
    <!-- VIEW 1: EXECUTIVE LEADERSHIP DECK (DEFAULT & COMES FIRST) -->
    <div id="viewDeck" class="main-view active" style="padding: 24px 0 60px; background: #0A111E;">
      <div class="deck-stage" style="max-width: 1240px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Deck Header Strip -->
        <div class="deck-topbar" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(13, 27, 46, 0.95); border: 1px solid var(--gold-border); border-radius: 14px;">
          <div class="brand-group" style="display: flex; align-items: center; gap: 14px;">
            <img src="profile.jpg" alt="Balaajee V.R." class="brand-avatar" onerror="this.src='photo_300x400.jpg'" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--gold);">
            <div>
              <h2 style="font-family: var(--font-serif); font-size: 15px; color: #FFFFFF; line-height: 1.2;">Balaajee V.R. &bull; <span style="color: var(--gold);">Executive Leadership Deck</span></h2>
              <span style="font-family: var(--font-mono); font-size: 11px; color: #94A3B8;">Senior UI/UX Design Manager &bull; 18+ Years Enterprise Experience</span>
            </div>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button onclick="switchMainView('cases')" style="padding: 8px 18px; border-radius: 100px; font-size: 12px; font-weight: 700; background: var(--gold); color: #0D1B2E; border: none; cursor: pointer; display: flex; align-items: center; gap: 6px;">
              <span>Explore 5 UI/UX Case Studies &rarr;</span>
            </button>
            <a href="Balaajee_VR_Leadership_Deck.pdf" target="_blank" style="padding: 8px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.08); color: #E2E8F0; border: 1px solid rgba(255,255,255,0.2); text-decoration: none;">
              Download PDF
            </a>
          </div>
        </div>

        <!-- The 10 Keynote Slides -->
        <main class="keynote-container" style="position: relative;">
          ${slidesHtml}
        </main>

        <!-- Floating Slide Navigation Bar -->
        <div class="deck-bottombar" style="margin-top: 24px; display: flex; justify-content: center; align-items: center; gap: 16px; background: rgba(13, 27, 46, 0.95); padding: 10px 24px; border-radius: 100px; border: 1px solid var(--gold-border); max-width: 520px; margin-left: auto; margin-right: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
          <button class="btn-keynote" id="deckPrevBtn" title="Previous Slide (Left Arrow)" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #FFFFFF; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            &larr;
          </button>
          <div class="nav-counter" style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: #E2E8F0; letter-spacing: 0.05em;">
            SLIDE <span id="deckCurrentSlideNum" style="color: var(--gold);">1</span> OF <span id="deckTotalSlidesNum">10</span>
          </div>
          <div class="nav-dots" id="deckDotsContainer" style="display: flex; gap: 6px;"></div>
          <button class="btn-keynote" id="deckNextBtn" title="Next Slide (Right Arrow)" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #FFFFFF; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            &rarr;
          </button>
        </div>

        <!-- Cross-Link Banner to UI/UX Case Studies -->
        <div style="margin-top: 36px; background: rgba(200, 168, 74, 0.08); border: 1px dashed var(--gold-border); border-radius: var(--radius-lg); padding: 22px 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <h4 style="font-family: var(--font-serif); font-size: 16px; color: #FFFFFF; font-weight: 700;">Looking for granular UI/UX interaction design, live data-grids &amp; UX personas?</h4>
            <p style="font-size: 13px; color: #94A3B8; margin-top: 4px;">Explore all 5 standalone product case studies with interactive simulated browser apps, 14-tab journey flows, and interview CAR defense guides.</p>
          </div>
          <button class="btn-primary" onclick="switchMainView('cases')" style="background: var(--gold); color: #0D1B2E; font-weight: 700; padding: 10px 22px; border-radius: 100px; border: none; cursor: pointer;">
            Explore 5 UI/UX Case Studies &rarr;
          </button>
        </div>

      </div>
    </div>
`;

// Insert #viewDeck right after `<main id="mainContent">` and make #viewCases inactive by default
fullCasesHtml = fullCasesHtml.replace(
  '<main id="mainContent">\n\n    <!-- VIEW 1: UI/UX CASE STUDIES (DEFAULT & PRIMARY) -->\n    <div id="viewCases" class="main-view active">',
  `<main id="mainContent">\n\n${viewDeckHtml}\n\n    <!-- VIEW 2: UI/UX CASE STUDIES (DEDICATED & SEPARATE) -->\n    <div id="viewCases" class="main-view" style="display: none;">`
);

// Inject deck CSS into <style>
fullCasesHtml = fullCasesHtml.replace(
  '</style>',
  `\n/* ==========================================================================\n   KEYNOTE LEADERSHIP DECK EMBEDDED STYLES\n   ========================================================================== */\n${deckCss}\n</style>`
);

// 5. Update Navigation & Slide Switcher Scripts
const newScripts = `
    // Main navigation tabs (Deck vs Cases vs CV)
    function switchMainView(view) {
      document.querySelectorAll('.main-view').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

      if (view === 'deck') {
        const deck = document.getElementById('viewDeck');
        if (deck) deck.style.display = 'block';
        const tab = document.getElementById('tabBtnDeck');
        if (tab) tab.classList.add('active');
        history.replaceState(null, null, '#deck');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'cases') {
        const cases = document.getElementById('viewCases');
        if (cases) cases.style.display = 'block';
        const tab = document.getElementById('tabBtnCases');
        if (tab) tab.classList.add('active');
        history.replaceState(null, null, '#cases');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'cv') {
        const cv = document.getElementById('viewCV');
        if (cv) cv.style.display = 'block';
        const tab = document.getElementById('tabBtnCV');
        if (tab) tab.classList.add('active');
        history.replaceState(null, null, '#cv');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // Keynote Deck Slide Controller
    let currentDeckSlide = 0;
    let deckSlides = [];
    let totalDeckSlides = 0;
    let deckCurrentSlideNum, deckTotalSlidesNum, deckPrevBtn, deckNextBtn, deckDotsContainer;

    function initDeck() {
      deckSlides = document.querySelectorAll('#viewDeck .slide');
      totalDeckSlides = deckSlides.length;

      deckCurrentSlideNum = document.getElementById('deckCurrentSlideNum');
      deckTotalSlidesNum = document.getElementById('deckTotalSlidesNum');
      deckPrevBtn = document.getElementById('deckPrevBtn');
      deckNextBtn = document.getElementById('deckNextBtn');
      deckDotsContainer = document.getElementById('deckDotsContainer');

      if (deckTotalSlidesNum) deckTotalSlidesNum.textContent = totalDeckSlides;

      if (deckDotsContainer) {
        deckDotsContainer.innerHTML = '';
        deckSlides.forEach((_, idx) => {
          const dot = document.createElement('div');
          dot.className = 'nav-dot ' + (idx === 0 ? 'active' : '');
          dot.style.cssText = 'width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.25); cursor: pointer; transition: all 0.2s;';
          if (idx === 0) dot.style.background = 'var(--gold)';
          dot.title = 'Go to Slide ' + (idx + 1);
          dot.onclick = () => goToDeckSlide(idx);
          deckDotsContainer.appendChild(dot);
        });
      }

      if (deckPrevBtn) {
        deckPrevBtn.onclick = () => {
          if (currentDeckSlide > 0) {
            goToDeckSlide(currentDeckSlide - 1);
          }
        };
      }

      if (deckNextBtn) {
        deckNextBtn.onclick = () => {
          if (currentDeckSlide < totalDeckSlides - 1) {
            goToDeckSlide(currentDeckSlide + 1);
          }
        };
      }
      updateDeckSlide();
    }

    function updateDeckSlide() {
      deckSlides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentDeckSlide);
      });

      const dots = document.querySelectorAll('#deckDotsContainer .nav-dot');
      dots.forEach((dot, idx) => {
        const isActive = idx === currentDeckSlide;
        dot.classList.toggle('active', isActive);
        dot.style.background = isActive ? 'var(--gold)' : 'rgba(255,255,255,0.25)';
      });

      if (deckCurrentSlideNum) deckCurrentSlideNum.textContent = currentDeckSlide + 1;
      if (deckPrevBtn) deckPrevBtn.disabled = currentDeckSlide === 0;
      if (deckNextBtn) deckNextBtn.disabled = currentDeckSlide === totalDeckSlides - 1;
    }

    function goToDeckSlide(index) {
      if (index >= 0 && index < totalDeckSlides) {
        currentDeckSlide = index;
        updateDeckSlide();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    window.goToDeckSlide = goToDeckSlide;
    window.switchMainView = switchMainView;
    window.scrollToCase = function(caseId) {
      setTimeout(() => {
        const el = document.getElementById(caseId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    };

    // Keyboard arrow keys for Keynote deck when #viewDeck is active
    window.addEventListener('keydown', (e) => {
      const deckView = document.getElementById('viewDeck');
      if (deckView && deckView.style.display !== 'none') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
          if (currentDeckSlide < totalDeckSlides - 1) {
            e.preventDefault();
            goToDeckSlide(currentDeckSlide + 1);
          }
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          if (currentDeckSlide > 0) {
            e.preventDefault();
            goToDeckSlide(currentDeckSlide - 1);
          }
        }
      }
    });

    // Check initial hash on load
    window.addEventListener('DOMContentLoaded', () => {
      initDeck();
      if (window.location.hash === '#cases') {
        switchMainView('cases');
      } else if (window.location.hash === '#cv') {
        switchMainView('cv');
      } else {
        switchMainView('deck');
      }
    });
`;

// Replace existing switchMainView function in script
const oldScriptTarget = '    // Main navigation tabs (Cases vs Leadership vs CV)\n    function switchMainView(view) {\n      document.querySelectorAll(\'.main-view\').forEach(el => el.style.display = \'none\');\n      document.querySelectorAll(\'.nav-tab-btn\').forEach(btn => btn.classList.remove(\'active\'));\n\n      if (view === \'cases\') {\n        document.getElementById(\'viewCases\').style.display = \'block\';\n        document.getElementById(\'tabBtnCases\').classList.add(\'active\');\n      } else if (view === \'leadership\') {\n        document.getElementById(\'viewLeadership\').style.display = \'block\';\n        document.getElementById(\'tabBtnLeadership\').classList.add(\'active\');\n        window.scrollTo({ top: 0, behavior: \'smooth\' });\n      } else if (view === \'cv\') {\n        document.getElementById(\'viewCV\').style.display = \'block\';\n        document.getElementById(\'tabBtnCV\').classList.add(\'active\');\n        window.scrollTo({ top: 0, behavior: \'smooth\' });\n      }\n    }';

fullCasesHtml = fullCasesHtml.replace(oldScriptTarget, newScripts);

// Write target file
const targetFile = path.join(__dirname, 'index.html');
fs.writeFileSync(targetFile, fullCasesHtml, 'utf8');

console.log('Successfully written index.html with Leadership Deck FIRST and UI/UX Case Studies SECOND!');
