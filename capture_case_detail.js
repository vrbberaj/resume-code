const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1.5 });

    await page.goto('http://localhost:8080/#cases', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 600));

    // Scroll to ericsson case
    await page.evaluate(() => {
      const el = document.getElementById('case-ericsson');
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 160;
        window.scrollTo({ top, behavior: 'instant' });
      }
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/rf_ericsson_full_case.png',
      clip: { x: 0, y: 70, width: 1440, height: 1100 }
    });
    console.log('rf_ericsson_full_case.png saved');

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
