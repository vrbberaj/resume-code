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

    // 1. Capture Deck View (Slide 1)
    await page.goto('http://localhost:8080/#deck', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/rf_deck_slide1.png',
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
    console.log('rf_deck_slide1.png saved');

    // 2. Capture UI/UX Case Studies View (Hero & Persona Switcher)
    await page.evaluate(() => switchMainView('cases'));
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/rf_hero_leader.png',
      clip: { x: 0, y: 0, width: 1440, height: 600 }
    });
    console.log('rf_hero_leader.png saved');

    // 3. Switch Persona to Systems
    await page.evaluate(() => switchRfPersona('systems'));
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/rf_hero_systems.png',
      clip: { x: 0, y: 0, width: 1440, height: 600 }
    });
    console.log('rf_hero_systems.png saved');

    // 4. Capture Ericsson Two-Column Scope & Involvement Header
    await page.evaluate(() => {
      const card = document.getElementById('case-ericsson');
      if (card) card.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/rf_ericsson_card.png',
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('rf_ericsson_card.png saved');

    // 5. Dark Mode
    await page.evaluate(() => toggleTheme());
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/rf_ericsson_dark.png',
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('rf_ericsson_dark.png saved');

    await browser.close();
    console.log('Verification finished successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
    process.exit(1);
  }
})();
