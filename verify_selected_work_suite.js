// verify_selected_work_suite.js
const puppeteer = require('puppeteer-core');

const viewports = [
  { name: 'Mobile (375px)', width: 375, height: 812 },
  { name: 'Mobile Large (390px)', width: 390, height: 844 },
  { name: 'Tablet (768px)', width: 768, height: 1024 },
  { name: 'Desktop Small (1024px)', width: 1024, height: 900 },
  { name: 'Desktop Standard (1440px)', width: 1440, height: 1000 }
];

const testPages = [
  { name: 'Selected Work Portal', url: 'http://localhost:8080/work' },
  { name: 'Ericsson Case Study', url: 'http://localhost:8080/case-ericsson' },
  { name: 'Watson AI Case Study', url: 'http://localhost:8080/case-ibm-watson' },
  { name: 'Zebra IoT Case Study', url: 'http://localhost:8080/case-zebra' },
  { name: 'Carbon Design System Case Study', url: 'http://localhost:8080/case-ibm-carbon' },
  { name: 'ZF Wabco Cockpit Case Study', url: 'http://localhost:8080/case-zf-wabco' }
];

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    console.log('=== 1. VERIFYING ELEMENT PRESENCE & HORIZONTAL OVERFLOW ===');
    let allPassed = true;

    for (const p of testPages) {
      console.log(`\nTesting ${p.name} (${p.url})...`);
      const page = await browser.newPage();

      for (const vp of viewports) {
        await page.setViewport({ width: vp.width, height: vp.height });
        await page.goto(p.url, { waitUntil: 'networkidle2' });
        await page.evaluateHandle('document.fonts.ready');

        // Check horizontal scroll
        const scrollInfo = await page.evaluate(() => {
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            bodyScrollWidth: document.body.scrollWidth,
            bodyClientWidth: document.body.clientWidth
          };
        });

        const hasOverflow = scrollInfo.scrollWidth > scrollInfo.clientWidth + 1 || scrollInfo.bodyScrollWidth > scrollInfo.bodyClientWidth + 1;
        if (hasOverflow) {
          console.error(`  ❌ OVERFLOW at ${vp.name}: doc=${scrollInfo.scrollWidth}/${scrollInfo.clientWidth}, body=${scrollInfo.bodyScrollWidth}/${scrollInfo.bodyClientWidth}`);
          allPassed = false;
        } else {
          console.log(`  ✓ 0-overflow at ${vp.name}`);
        }
      }

      // Check key element selectors on 1440px
      await page.setViewport({ width: 1440, height: 1000 });
      await page.goto(p.url, { waitUntil: 'networkidle2' });

      if (p.url.includes('/work')) {
        const elements = await page.evaluate(() => {
          return {
            specializationBanner: !!document.querySelector('.specialization-pillars-banner'),
            specializationPillars: document.querySelectorAll('.spec-pillar-card').length,
            behanceBanner: !!document.querySelector('.behance-integration-banner'),
            behanceVisualStrip: !!document.querySelector('.behance-visual-strip'),
            behanceStripItems: document.querySelectorAll('.behance-strip-item').length,
            cards: document.querySelectorAll('.transformation-card').length,
            methodologyStrips: document.querySelectorAll('.domain-methodology-strip').length,
            screenshots: document.querySelectorAll('.browser-screenshot-img').length,
            calloutBadges: document.querySelectorAll('.preview-callout-badges').length
          };
        });
        console.log(`  Elements check for ${p.name}:`, elements);
        if (!elements.specializationBanner || elements.specializationPillars !== 5 || !elements.behanceBanner || !elements.behanceVisualStrip || elements.behanceStripItems !== 5 || elements.cards !== 5 || elements.methodologyStrips !== 5 || elements.screenshots !== 5) {
          console.error('  ❌ Missing expected elements on work.html');
          allPassed = false;
        } else {
          console.log('  ✓ All elements present on work.html (5 specialization pillars, Behance visual strip with 5 items, 5 cards, 5 domain methodology strips, 5 screenshots)');
        }

        // Capture full page screenshot of work.html
        await page.screenshot({
          path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/verified_work_portal.png',
          fullPage: false,
          clip: { x: 0, y: 0, width: 1440, height: 1800 }
        });
        console.log('  📸 Saved verified_work_portal.png');
      } else {
        const elements = await page.evaluate(() => {
          return {
            pipeline: !!document.querySelector('.manager-process-pipeline'),
            pipelineSteps: document.querySelectorAll('.p-step-card').length,
            archInfographic: !!document.querySelector('.architecture-infographic-stage'),
            annotatedScreenshot: !!document.querySelector('.annotated-screenshot-stage'),
            behanceArtifactsShowcase: !!document.querySelector('.behance-artifacts-showcase'),
            behanceArtifactCards: document.querySelectorAll('.behance-artifact-card').length,
            interactivePrototype: !!document.querySelector('.interactive-prototype-window'),
            screenshotImg: document.querySelector('.annotated-full-img')?.getAttribute('src'),
            calloutChips: document.querySelectorAll('.callout-chip-item').length,
            designopsPipeline: !!document.querySelector('.designops-pipeline-stage')
          };
        });
        console.log(`  Elements check for ${p.name}:`, elements);
        if (!elements.pipeline || elements.pipelineSteps !== 5 || !elements.archInfographic || !elements.annotatedScreenshot || !elements.behanceArtifactsShowcase || elements.behanceArtifactCards < 2 || !elements.interactivePrototype || !elements.screenshotImg || elements.calloutChips !== 3 || !elements.designopsPipeline) {
          console.error(`  ❌ Missing expected elements on ${p.name}`);
          allPassed = false;
        } else {
          console.log(`  ✓ All elements verified on ${p.name} (5 manager steps, arch infographic, Behance artifacts showcase (${elements.behanceArtifactCards} cards), interactive prototype, screenshot: ${elements.screenshotImg}, 3 callout chips, designops flywheel)`);
        }

        if (p.url.includes('case-ericsson')) {
          await page.screenshot({
            path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/verified_case_ericsson.png',
            clip: { x: 0, y: 0, width: 1440, height: 1800 }
          });
          console.log('  📸 Saved verified_case_ericsson.png');
        }
      }

      await page.close();
    }

    await browser.close();

    if (allPassed) {
      console.log('\n========================================================');
      console.log('🎉 ALL SUITE VERIFICATIONS PASSED: ZERO OVERFLOW & ALL ELEMENTS PRESENT!');
      console.log('========================================================');
    } else {
      console.error('\n❌ Some tests failed. Please review above.');
      process.exit(1);
    }
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
