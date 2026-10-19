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
    
    // Screenshot 1: IBM Watson + IBM Carbon
    await page.evaluate(() => {
      const card = document.querySelector('[data-category="ibm"]');
      if (card) card.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ 
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/preview_ibm_cases.png',
      clip: { x: 0, y: 1100, width: 1440, height: 950 }
    });
    console.log('IBM cases screenshot saved');

    // Screenshot 2: Ericsson SalesOps Cloud Infographic
    await page.evaluate(() => {
      const card = document.querySelector('[data-category="sales"]');
      if (card) card.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));

    const salesCard = await page.$('[data-category="sales"]');
    if (salesCard) {
      await salesCard.screenshot({
        path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/preview_ericsson_card.png'
      });
      console.log('Ericsson card screenshot saved');
    }

    // Click to expand deep dive on Ericsson
    await page.evaluate(() => {
      const btn = document.querySelector('[data-category="sales"] .deep-dive-btn');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    if (salesCard) {
      await salesCard.screenshot({
        path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/preview_ericsson_expanded.png'
      });
      console.log('Ericsson expanded deep-dive screenshot saved');
    }

    // Toggle Dark Mode
    await page.evaluate(() => {
      toggleTheme();
    });
    await new Promise(r => setTimeout(r, 600));

    if (salesCard) {
      await salesCard.screenshot({
        path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/preview_ericsson_dark.png'
      });
      console.log('Ericsson dark mode screenshot saved');
    }

    await browser.close();
    console.log('All verification captures completed successfully!');
  } catch (err) {
    console.error('Error in capture:', err);
    process.exit(1);
  }
})();
