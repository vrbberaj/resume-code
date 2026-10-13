const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1800, deviceScaleFactor: 2 });
    await page.goto('http://localhost:8080/vsign', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');

    const el = await page.$('.max-w-\\[900px\\]');
    if (el) {
      await el.screenshot({ path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/vsign_preview.png' });
    }
    await browser.close();
    console.log('vsign_preview.png saved successfully');
  } catch (err) {
    console.error(err);
  }
})();
