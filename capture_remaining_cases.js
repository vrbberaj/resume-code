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
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');

    const cases = await page.$$('.case-card');
    console.log('Found', cases.length, 'case cards');

    // Screenshot Case 2 (IBM Carbon)
    if (cases[1]) {
      await cases[1].screenshot({ path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/preview_case_2_carbon.png' });
      console.log('Case 2 (Carbon) saved');
    }

    // Screenshot Case 3 (Zebra)
    if (cases[2]) {
      await cases[2].screenshot({ path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/preview_case_3_zebra.png' });
      console.log('Case 3 (Zebra) saved');
    }

    // Screenshot Case 5 (ZF Wabco)
    if (cases[4]) {
      await cases[4].screenshot({ path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/preview_case_5_wabco.png' });
      console.log('Case 5 (ZF Wabco) saved');
    }

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
