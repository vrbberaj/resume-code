const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });
    const page = await browser.newPage();
    // Use A4 proportions for the viewport to capture high-res
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
    
    console.log('Navigating to local index.html...');
    await page.goto('file:///Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/index.html', { 
      waitUntil: 'networkidle2'
    });
    
    console.log('Waiting for fonts to load...');
    await page.evaluateHandle('document.fonts.ready');
    
    const element = await page.$('.max-w-\\[900px\\]');
    if (element) {
      console.log('Taking element screenshot...');
      await element.screenshot({ 
        path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/local_render_new.png'
      });
      console.log('Screenshot saved to local_render_new.png');
    } else {
      console.log('Taking full page screenshot...');
      await page.screenshot({ 
        path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/local_render_new.png',
        fullPage: true 
      });
      console.log('Full page screenshot saved to local_render_new.png');
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error taking screenshot:', error);
    process.exit(1);
  }
})();
