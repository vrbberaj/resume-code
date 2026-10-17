const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.5 });

    // 1. Home / Welcome Portal (Hero + Editorial List)
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/zero_redundancy_home.png',
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
    console.log('1. zero_redundancy_home.png captured');

    // 2. Scrollable Leadership Deck (Single Clean Header & Jump Bar)
    await page.goto('http://localhost:8080/leadership', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/zero_redundancy_leadership.png',
      clip: { x: 0, y: 0, width: 1440, height: 1000 }
    });
    console.log('2. zero_redundancy_leadership.png captured');

    // 3. Full Executive CV (Direct Clean Resume)
    await page.goto('http://localhost:8080/cv', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/zero_redundancy_cv.png',
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
    console.log('3. zero_redundancy_cv.png captured');

    // 4. Dedicated Case Study: Ericsson (Unified Stage & 4 Clean Tabs)
    await page.goto('http://localhost:8080/case-ericsson', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/zero_redundancy_case.png',
      clip: { x: 0, y: 0, width: 1440, height: 1000 }
    });
    console.log('4. zero_redundancy_case.png captured');

    // 5. Scroll down to show Floating PiP Mini-Player
    await page.evaluate(() => {
      window.scrollTo(0, 750);
      window.dispatchEvent(new Event('scroll'));
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/zero_redundancy_pip.png'
    });
    console.log('5. zero_redundancy_pip.png captured');

    await browser.close();
    console.log('All zero-redundancy screenshots captured successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
    process.exit(1);
  }
})();
