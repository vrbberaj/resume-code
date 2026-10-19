// audit_website.js
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Test pages list
  const pagesToTest = [
    { url: 'http://localhost:8080/', name: 'home' },
    { url: 'http://localhost:8080/work', name: 'work' },
    { url: 'http://localhost:8080/leadership', name: 'leadership' },
    { url: 'http://localhost:8080/cv', name: 'cv' },
    { url: 'http://localhost:8080/case-ericsson', name: 'case-ericsson' },
    { url: 'http://localhost:8080/case-ibm-watson', name: 'case-watson' },
    { url: 'http://localhost:8080/case-zebra', name: 'case-zebra' },
    { url: 'http://localhost:8080/case-ibm-carbon', name: 'case-carbon' },
    { url: 'http://localhost:8080/case-zf-wabco', name: 'case-wabco' }
  ];

  console.log('--- 1. Testing Page Statuses and Horizontal Overflows ---');
  for (const item of pagesToTest) {
    const res = await page.goto(item.url, { waitUntil: 'networkidle2' });
    const status = res.status();
    
    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    console.log(`Page: ${item.name.padEnd(15)} | Status: ${status} | Horizontal Overflow: ${overflow ? 'FAIL (Overflow detected)' : 'PASS'}`);
  }

  console.log('\n--- 2. Testing Mobile Responsiveness (iPhone 14: 390x844) ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  for (const item of ['home', 'work', 'case-ericsson', 'leadership', 'cv']) {
    const targetUrl = item === 'home' ? 'http://localhost:8080/' : `http://localhost:8080/${item}`;
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    const mobileOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`Mobile: ${item.padEnd(15)} | Horizontal Overflow: ${mobileOverflow ? 'FAIL (Overflow)' : 'PASS'}`);
    await page.screenshot({ path: `audit_mobile_${item}.png`, fullPage: false });
  }

  console.log('\n--- 3. Testing Desktop Leadership & CV Pages ---');
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto('http://localhost:8080/leadership', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'audit_desktop_leadership.png', fullPage: false });
  
  await page.goto('http://localhost:8080/cv', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'audit_desktop_cv.png', fullPage: false });

  await browser.close();
  console.log('\nAudit complete! All artifacts captured.');
})();
