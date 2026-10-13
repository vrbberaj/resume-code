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
    await page.setViewport({ width: 1440, height: 2500 });
    
    console.log('Navigating to Figma...');
    // We navigate to the URL
    await page.goto('https://www.figma.com/make/bRfKbuxnb52rDqLi5d6Jld/Enhance-Resume-for-UX-Roles?t=qdwMPMrrjcThQBYE-20&fullscreen=1', { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });
    
    console.log('Page loaded. Waiting 15 seconds for Figma WebGL canvas to fully render...');
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    console.log('Taking screenshot...');
    await page.screenshot({ 
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/figma_design.png',
      fullPage: true 
    });
    
    console.log('Screenshot saved successfully to figma_design.png!');
    await browser.close();
  } catch (error) {
    console.error('Error taking screenshot:', error);
    process.exit(1);
  }
})();
