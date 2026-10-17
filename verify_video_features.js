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

    // 1. Homepage Hero with Video Card
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/video_homepage_hero.png',
      clip: { x: 0, y: 0, width: 1440, height: 850 }
    });
    console.log('1. video_homepage_hero.png captured');

    // 2. Open Video Modal on Homepage
    await page.click('.video-hero-card');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/video_modal_opened.png',
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
    console.log('2. video_modal_opened.png captured');

    // 3. Case Ericsson Walkthrough Top
    await page.goto('http://localhost:8080/case-ericsson', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/video_case_walkthrough.png',
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('3. video_case_walkthrough.png captured');

    // 4. Scroll down on Case Ericsson to trigger Floating Sticky PiP Mini-Player
    await page.evaluate(() => {
      window.scrollTo(0, 850);
      window.dispatchEvent(new Event('scroll'));
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/video_case_pip_scrolled.png'
    });
    console.log('4. video_case_pip_scrolled.png captured');

    await browser.close();
    console.log('All video verification screenshots completed!');
  } catch (err) {
    console.error('Error during video verification:', err);
    process.exit(1);
  }
})();
