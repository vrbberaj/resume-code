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
  { name: 'Visual Archive', url: 'http://localhost:8080/archive' },
  { name: 'Ericsson Case Study', url: 'http://localhost:8080/case-ericsson' },
  { name: 'Watson AI Case Study', url: 'http://localhost:8080/case-ibm-watson' },
  { name: 'Zebra IoT Case Study', url: 'http://localhost:8080/case-zebra' },
  { name: 'Carbon Design System Case Study', url: 'http://localhost:8080/case-ibm-carbon' },
  { name: 'ZF Wabco Cockpit Case Study', url: 'http://localhost:8080/case-zf-wabco' },
  ...['sales-automation-tool', 'networks-design-project', 'an-enterprise-project', 'web-projects',
      'my-achievements', 'gaming-projects', 'mobile-projects'].map(s => ({
    name: `Archive project: ${s}`, url: `http://localhost:8080/archive-${s}.html`
  }))
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

      if (p.url.endsWith('/work')) {
        const elements = await page.evaluate(() => {
          return {
            leftPanel: !!document.querySelector('.work-left-sidebar, .archive-sidebar'),
            caseCards: document.querySelectorAll('.case-card').length,
            caseLinks: [...document.querySelectorAll('.case-card')].map(a => a.getAttribute('href')),
            brokenCovers: [...document.querySelectorAll('.case-card img')].filter(i => !i.complete || i.naturalWidth === 0).length
          };
        });
        console.log(`  Elements check for ${p.name}:`, elements);
        if (elements.leftPanel || elements.caseCards !== 5 || elements.brokenCovers > 0 || elements.caseLinks.some(h => !/^case-.+\.html$/.test(h))) {
          console.error('  ❌ Case study gallery check failed on work.html');
          allPassed = false;
        } else {
          console.log('  ✓ work.html: 5 case cards, each linking to its own case page, no left panel');
        }

        await page.screenshot({
          path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/verified_work_portal.png',
          fullPage: false,
          clip: { x: 0, y: 0, width: 1440, height: 1800 }
        });
        console.log('  📸 Saved verified_work_portal.png');
      } else if (p.url.endsWith('/archive')) {
        const elements = await page.evaluate(() => {
          return {
            leftPanel: !!document.querySelector('.archive-sidebar, .work-left-sidebar'),
            projectCards: document.querySelectorAll('.be-card').length,
            names: [...document.querySelectorAll('.be-card-title')].map(e => e.textContent.trim()),
            brokenCovers: [...document.querySelectorAll('.be-cover img')].filter(i => !i.complete || i.naturalWidth === 0).length
          };
        });
        console.log(`  Elements check for ${p.name}:`, elements);
        if (elements.leftPanel || elements.projectCards !== 7 || elements.brokenCovers > 0) {
          console.error('  ❌ Behance gallery check failed on archive.html');
          allPassed = false;
        } else {
          console.log('  ✓ archive.html: 7 Behance projects with covers, no left panel');
        }
      } else if (p.url.includes('/archive-')) {
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
        });
        await new Promise(r => setTimeout(r, 800));
        const elements = await page.evaluate(() => {
          const imgs = [...document.querySelectorAll('.bp-canvas img')];
          return { images: imgs.length, broken: imgs.filter(i => !i.complete || i.naturalWidth === 0).length };
        });
        console.log(`  Elements check for ${p.name}:`, elements);
        if (elements.images === 0 || elements.broken > 0) {
          console.error(`  ❌ Image stack check failed on ${p.url}`);
          allPassed = false;
        } else {
          console.log(`  ✓ ${elements.images} images loaded in project view`);
        }
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
