const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1.5 });

    // 1. Home / Welcome Portal
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/clean_home_welcome.png',
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
    console.log('clean_home_welcome.png saved');

    // 2. Scrollable Leadership Deck
    await page.goto('http://localhost:8080/leadership', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/clean_leadership_scrollable.png',
      clip: { x: 0, y: 0, width: 1440, height: 1050 }
    });
    console.log('clean_leadership_scrollable.png saved');

    // 3. Full Executive CV
    await page.goto('http://localhost:8080/cv', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/clean_cv_fullpage.png',
      clip: { x: 0, y: 0, width: 1440, height: 1050 }
    });
    console.log('clean_cv_fullpage.png saved');

    // 4. Dedicated Case Study: Ericsson
    await page.goto('http://localhost:8080/case-ericsson', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/clean_case_ericsson.png',
      clip: { x: 0, y: 0, width: 1440, height: 1050 }
    });
    console.log('clean_case_ericsson.png saved');

    await browser.close();
    console.log('All screenshots verified successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
    process.exit(1);
  }
})();
