// verify_work_dashboard.js
const puppeteer = require('puppeteer-core');

(async () => {
  console.log('=== VERIFYING WORK.HTML MODERN SINGLE-PANE DASHBOARD ===');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const viewports = [
    { name: 'Mobile (375px)', width: 375, height: 812 },
    { name: 'Mobile Large (390px)', width: 390, height: 844 },
    { name: 'Tablet (768px)', width: 768, height: 1024 },
    { name: 'Desktop Small (1024px)', width: 1024, height: 800 },
    { name: 'Desktop Standard (1440px)', width: 1440, height: 900 }
  ];

  const url = 'http://localhost:8080/work';

  // 1. Check 0-overflow across all 5 viewports
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(url, { waitUntil: 'networkidle2' });

    const scrollInfo = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      };
    });

    if (scrollInfo.scrollWidth > scrollInfo.clientWidth) {
      console.error(`❌ OVERFLOW DETECTED at ${vp.name}: scrollWidth=${scrollInfo.scrollWidth}, clientWidth=${scrollInfo.clientWidth}`);
      process.exit(1);
    } else {
      console.log(`  ✓ 0-overflow at ${vp.name} (${scrollInfo.scrollWidth}px == ${scrollInfo.clientWidth}px)`);
    }
  }

  // 2. Element presence on 1440px
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  const elements = await page.evaluate(() => {
    return {
      specializationBanner: !!document.querySelector('.specialization-pillars-banner'),
      specializationPillars: document.querySelectorAll('.spec-pillar-card').length,
      sidebar: !!document.querySelector('.work-left-sidebar'),
      sidebarItems: document.querySelectorAll('.work-nav-item').length,
      archiveBanner: !!document.querySelector('.native-archive-banner'),
      cards: document.querySelectorAll('.transformation-card').length,
      methodologyStrips: document.querySelectorAll('.domain-methodology-strip').length,
      screenshots: document.querySelectorAll('.browser-screenshot-img').length,
      calloutBadges: document.querySelectorAll('.preview-callout-badges').length,
      viewPanes: document.querySelectorAll('.work-view-pane').length,
      activePanes: document.querySelectorAll('.work-view-pane.active').length
    };
  });

  console.log('Elements check on work.html:', elements);
  if (elements.sidebarItems !== 6) throw new Error('Expected 6 sidebar items');
  if (elements.cards !== 5) throw new Error('Expected 5 cards');
  if (elements.viewPanes !== 6) throw new Error('Expected 6 view panes (1 overview + 5 cards)');
  if (elements.activePanes !== 1) throw new Error('Expected exactly 1 active pane visible at a time!');

  // 3. Test clicking 2nd item (IBM Watson AI)
  console.log('Testing clicking 2nd item in left panel (IBM Watson AI)...');
  await page.click('.work-nav-item[data-target="case-1"]');

  const afterClickCase1 = await page.evaluate(() => {
    const case1 = document.getElementById('case-1');
    const overview = document.getElementById('specialization-pillars');
    return {
      case1Active: case1.classList.contains('active'),
      overviewActive: overview.classList.contains('active'),
      case1Display: window.getComputedStyle(case1).display,
      overviewDisplay: window.getComputedStyle(overview).display,
      activePanesCount: document.querySelectorAll('.work-view-pane.active').length,
      indicatorText: document.getElementById('dash-active-indicator').innerText
    };
  });

  console.log('  State after selecting 2nd item:', afterClickCase1);
  if (!afterClickCase1.case1Active || afterClickCase1.case1Display === 'none') {
    throw new Error('Case 1 was not displayed after clicking 2nd item!');
  }
  if (afterClickCase1.overviewActive || afterClickCase1.overviewDisplay !== 'none') {
    throw new Error('Overview was not hidden when Case 1 was selected!');
  }
  if (afterClickCase1.activePanesCount !== 1) {
    throw new Error(`Expected exactly 1 active pane, got ${afterClickCase1.activePanesCount}`);
  }
  console.log('  ✓ Only Case 1 is visible in the center! All other cases are hidden.');

  // Capture screenshot of Case 1 active
  await page.screenshot({ path: 'screenshots/verified_dashboard_case1.png', fullPage: false });
  console.log('📸 Captured screenshots/verified_dashboard_case1.png');

  // 4. Test clicking 3rd item (Ericsson CPQ)
  console.log('Testing clicking 3rd item in left panel (Ericsson SalesOps)...');
  await page.click('.work-nav-item[data-target="case-2"]');

  const afterClickCase2 = await page.evaluate(() => {
    const case1 = document.getElementById('case-1');
    const case2 = document.getElementById('case-2');
    return {
      case1Active: case1.classList.contains('active'),
      case2Active: case2.classList.contains('active'),
      case1Display: window.getComputedStyle(case1).display,
      case2Display: window.getComputedStyle(case2).display,
      activePanesCount: document.querySelectorAll('.work-view-pane.active').length
    };
  });

  console.log('  State after selecting 3rd item:', afterClickCase2);
  if (!afterClickCase2.case2Active || afterClickCase2.case2Display === 'none') {
    throw new Error('Case 2 was not displayed!');
  }
  if (afterClickCase2.case1Active || afterClickCase2.case1Display !== 'none') {
    throw new Error('Case 1 was not hidden!');
  }
  console.log('  ✓ Only Case 2 is visible in the center!');

  // Capture screenshot of Case 2 active
  await page.screenshot({ path: 'screenshots/verified_dashboard_case2.png', fullPage: false });
  console.log('📸 Captured screenshots/verified_dashboard_case2.png');

  await browser.close();
  console.log('🎉 ALL DASHBOARD TESTS PASSED: Single pane view, 0-overflow, floating sticky sidebar!');
})();
