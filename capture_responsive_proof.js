const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Mobile Screenshots (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'proof_mobile_home.png', fullPage: false });

  await page.goto('http://localhost:8080/work', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'proof_mobile_work.png', fullPage: false });

  await page.goto('http://localhost:8080/leadership', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'proof_mobile_leadership.png', fullPage: false });

  await page.goto('http://localhost:8080/cv', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'proof_mobile_cv.png', fullPage: false });

  await page.goto('http://localhost:8080/case-ericsson', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'proof_mobile_case_ericsson.png', fullPage: false });

  // Tablet Screenshot (1024x768)
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'proof_tablet_home.png', fullPage: false });

  await page.goto('http://localhost:8080/leadership', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'proof_tablet_leadership.png', fullPage: false });

  await browser.close();
  console.log('All responsive visual proofs captured.');
})();
