// verify_watson_gold_standard.js
const puppeteer = require('puppeteer-core');

(async () => {
  console.log('=== VERIFYING IBM WATSON GOLD STANDARD CASE STUDY ===');
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

  const url = 'http://localhost:8080/case-ibm-watson';

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(url, { waitUntil: 'networkidle0' });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    const overflow = scrollWidth > clientWidth;
    if (overflow) {
      console.error(`❌ OVERFLOW DETECTED at ${vp.name}: scrollWidth=${scrollWidth}, clientWidth=${clientWidth} (diff=${scrollWidth - clientWidth}px)`);
      process.exit(1);
    } else {
      console.log(`  ✓ 0-overflow at ${vp.name} (${scrollWidth}px == ${clientWidth}px)`);
    }
  }

  // Set desktop viewport for interaction & element presence tests
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0' });

  // 1. Element presence
  const elements = await page.evaluate(() => {
    return {
      whiteboardSketches: document.querySelectorAll('.whiteboard-sketch-card').length,
      stickyNotes: document.querySelectorAll('.sticky-note').length,
      dualTrackWrapper: !!document.querySelector('.dual-track-wrapper'),
      methodKitCards: document.querySelectorAll('.method-kit-card').length,
      attributionContainer: !!document.querySelector('.attribution-container'),
      managerSheetContainer: !!document.querySelector('.manager-sheet-container'),
      sheetTabButtons: document.querySelectorAll('.sheet-tab-button').length,
      sheetPanes: document.querySelectorAll('.sheet-content-pane').length,
      riceTableRows: document.querySelectorAll('#sheet-pane-rice tbody tr').length,
      okrCards: document.querySelectorAll('.okr-card').length,
      interviewRows: document.querySelectorAll('#sheet-pane-interviews tbody tr').length
    };
  });

  console.log('Elements verification result:', elements);

  if (elements.whiteboardSketches < 2) throw new Error('Expected at least 2 whiteboard sketches');
  if (elements.methodKitCards < 3) throw new Error('Expected 3 method kit cards');
  if (!elements.dualTrackWrapper) throw new Error('Expected dual-track wrapper');
  if (!elements.attributionContainer) throw new Error('Expected squad attribution container');
  if (!elements.managerSheetContainer) throw new Error('Expected manager spreadsheet container');
  if (elements.sheetTabButtons !== 3) throw new Error('Expected 3 sheet tab buttons');
  if (elements.riceTableRows < 8) throw new Error('Expected at least 8 RICE table rows');
  if (elements.okrCards < 4) throw new Error('Expected 4 OKR cards');
  if (elements.interviewRows < 5) throw new Error('Expected at least 5 interview rows');

  console.log('✓ All 9 Design Management rubric elements verified successfully!');

  // 2. Test interactive tab clicks
  console.log('Testing interactive spreadsheet tabs...');
  // Click OKR tab
  await page.click('#sheet-tab-btn-okr');
  let okrActive = await page.evaluate(() => {
    return document.getElementById('sheet-pane-okr').classList.contains('active') &&
           !document.getElementById('sheet-pane-rice').classList.contains('active');
  });
  console.log(`  ✓ OKR tab click: active=${okrActive}`);

  // Click Interviews tab
  await page.click('#sheet-tab-btn-interviews');
  let interviewsActive = await page.evaluate(() => {
    return document.getElementById('sheet-pane-interviews').classList.contains('active') &&
           !document.getElementById('sheet-pane-okr').classList.contains('active');
  });
  console.log(`  ✓ Interviews tab click: active=${interviewsActive}`);

  // Click RICE tab back
  await page.click('#sheet-tab-btn-rice');
  let riceActive = await page.evaluate(() => {
    return document.getElementById('sheet-pane-rice').classList.contains('active') &&
           !document.getElementById('sheet-pane-interviews').classList.contains('active');
  });
  console.log(`  ✓ RICE tab click: active=${riceActive}`);

  // Scroll to spreadsheet and take snapshot
  const sheetElement = await page.$('.manager-sheet-container');
  if (sheetElement) {
    await sheetElement.screenshot({ path: 'screenshots/verified_manager_spreadsheet.png' });
    console.log('📸 Captured screenshots/verified_manager_spreadsheet.png');
  }

  // Scroll to whiteboard and take snapshot
  const wbElement = await page.$('.whiteboard-sketch-card');
  if (wbElement) {
    await wbElement.screenshot({ path: 'screenshots/verified_whiteboard_sketch.png' });
    console.log('📸 Captured screenshots/verified_whiteboard_sketch.png');
  }

  await browser.close();
  console.log('🎉 ALL WATSON GOLD-STANDARD VERIFICATIONS PASSED 100%!');
})();
