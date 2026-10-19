const puppeteer = require('puppeteer-core');

const viewports = [
  { name: 'iPhone SE (375px)', width: 375, height: 667 },
  { name: 'iPhone 14 (390px)', width: 390, height: 844 },
  { name: 'iPad Mini (768px)', width: 768, height: 1024 },
  { name: 'iPad Pro Landscape (1024px)', width: 1024, height: 768 },
  { name: 'Desktop (1440px)', width: 1440, height: 900 }
];

const pages = [
  { path: '/', name: 'Home' },
  { path: '/work', name: 'Work' },
  { path: '/leadership', name: 'Leadership' },
  { path: '/cv', name: 'CV' },
  { path: '/case-ericsson', name: 'Case Ericsson' },
  { path: '/case-ibm-watson', name: 'Case Watson' },
  { path: '/case-zebra', name: 'Case Zebra' },
  { path: '/case-ibm-carbon', name: 'Case Carbon' },
  { path: '/case-zf-wabco', name: 'Case Wabco' }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('=== COMPREHENSIVE RESPONSIVENESS AUDIT ===\n');

  let totalFailures = 0;

  for (const vp of viewports) {
    console.log(`\n======================================================`);
    console.log(`VIEWPORT: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`======================================================`);

    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.width <= 768 });

    for (const p of pages) {
      await page.goto(`http://localhost:8080${p.path}`, { waitUntil: 'networkidle2' });

      const result = await page.evaluate((vpWidth) => {
        const docScrollW = document.documentElement.scrollWidth;
        const bodyScrollW = document.body.scrollWidth;
        const innerW = window.innerWidth;
        const maxScrollW = Math.max(docScrollW, bodyScrollW);
        const hasOverflow = maxScrollW > vpWidth || innerW > vpWidth;

        let culprits = [];
        if (hasOverflow) {
          const allElems = document.querySelectorAll('*');
          allElems.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > vpWidth + 1 || el.scrollWidth > vpWidth + 1) {
              const sel = el.id ? `#${el.id}` : (el.className && typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}` : el.tagName.toLowerCase());
              culprits.push({
                tag: el.tagName,
                sel: sel,
                right: Math.round(rect.right),
                scrollWidth: el.scrollWidth,
                offsetWidth: el.offsetWidth
              });
            }
          });
        }

        return {
          maxScrollW,
          vpWidth,
          innerW,
          hasOverflow,
          culprits: culprits.slice(0, 5) // top 5
        };
      }, vp.width);

      if (result.hasOverflow) {
        totalFailures++;
        console.log(`❌ ${p.name.padEnd(16)} | OVERFLOW: scrollWidth=${result.maxScrollW}px > vpWidth=${result.vpWidth}px (Diff: +${result.maxScrollW - result.vpWidth}px, innerWidth=${result.innerW}px)`);
        result.culprits.forEach(c => {
          console.log(`   └─ [${c.tag}] ${c.sel} | right=${c.right}px, scrollWidth=${c.scrollWidth}px, offsetWidth=${c.offsetWidth}px`);
        });
      } else {
        console.log(`✅ ${p.name.padEnd(16)} | Clean (scrollWidth=${result.maxScrollW}px <= vpWidth=${result.vpWidth}px)`);
      }
    }
  }

  await browser.close();

  console.log(`\n======================================================`);
  console.log(`AUDIT FINISHED: Total Overflows = ${totalFailures}`);
  console.log(`======================================================`);
})();
