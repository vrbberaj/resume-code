const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });
    await page.goto('file:///Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/index.html', { 
      waitUntil: 'networkidle2'
    });
    
    const report = await page.evaluate(() => {
      const pageEl = document.querySelector('#fig-code-root');
      const sidebar = document.querySelector('aside');
      const main = document.querySelector('main');
      
      return {
        pageHeightPx: pageEl ? pageEl.clientHeight : 0,
        pageWidthPx: pageEl ? pageEl.clientWidth : 0,
        sidebarScrollHeight: sidebar ? sidebar.scrollHeight : 0,
        sidebarClientHeight: sidebar ? sidebar.clientHeight : 0,
        mainScrollHeight: main ? main.scrollHeight : 0,
        mainClientHeight: main ? main.clientHeight : 0
      };
    });
    
    console.log('--- A4 Height Overflow Report ---');
    console.log(`Page Box: ${report.pageWidthPx}px x ${report.pageHeightPx}px`);
    console.log(`Sidebar: Client Height = ${report.sidebarClientHeight}px, Scroll Height = ${report.sidebarScrollHeight}px`);
    console.log(`Main Content: Client Height = ${report.mainClientHeight}px, Scroll Height = ${report.mainScrollHeight}px`);
    
    const sidebarOverflow = report.sidebarScrollHeight > report.sidebarClientHeight;
    const mainOverflow = report.mainScrollHeight > report.mainClientHeight;
    
    if (sidebarOverflow) {
      console.log('WARNING: Sidebar content overflows its container!');
    } else {
      console.log('SUCCESS: Sidebar content fits perfectly.');
    }
    
    if (mainOverflow) {
      console.log('WARNING: Main content overflows its container!');
    } else {
      console.log('SUCCESS: Main content fits perfectly.');
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error checking overflow:', error);
    process.exit(1);
  }
})();
