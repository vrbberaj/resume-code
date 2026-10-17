// verify_executive_suite.js
const puppeteer = require('puppeteer-core');

(async () => {
  console.log('Launching Chrome to capture executive suite pages...');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1.5 });

  // 1. Welcome Page (index.html)
  console.log('1. Capturing Welcome Portal (index.html)...');
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
  await page.evaluateHandle('document.fonts.ready');
  await page.screenshot({ path: 'exec_welcome_hero.png', fullPage: false });
  await page.screenshot({ path: 'exec_welcome_full.png', fullPage: true });

  // 2. Selected Work (work.html)
  console.log('2. Capturing Selected Work (work.html)...');
  await page.goto('http://localhost:8080/work', { waitUntil: 'networkidle2' });
  await page.evaluateHandle('document.fonts.ready');
  await page.screenshot({ path: 'exec_work_portal.png', fullPage: true });

  // 3. Ericsson Full Case Study (case-ericsson.html)
  console.log('3. Capturing Ericsson Full Scrollable Case Study (case-ericsson.html)...');
  await page.goto('http://localhost:8080/case-ericsson', { waitUntil: 'networkidle2' });
  await page.evaluateHandle('document.fonts.ready');
  await page.screenshot({ path: 'exec_ericsson_top.png', fullPage: false });
  
  // Scroll down to middle (Interactive UI & tokens)
  await page.evaluate(() => {
    document.getElementById('sec-ui').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'exec_ericsson_ui_pip.png', fullPage: false });

  // Scroll to CAR defense
  await page.evaluate(() => {
    document.getElementById('sec-car').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'exec_ericsson_car.png', fullPage: false });

  // 4. Watson Case Study
  console.log('4. Capturing Watson Case Study (case-ibm-watson.html)...');
  await page.goto('http://localhost:8080/case-ibm-watson', { waitUntil: 'networkidle2' });
  await page.evaluateHandle('document.fonts.ready');
  await page.screenshot({ path: 'exec_watson_top.png', fullPage: false });

  await browser.close();
  console.log('All screenshots captured successfully!');
})();
