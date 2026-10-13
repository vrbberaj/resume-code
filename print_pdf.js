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
    await page.goto('file:///Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/index.html', { 
      waitUntil: 'networkidle2'
    });
    await page.evaluateHandle('document.fonts.ready');
    
    await page.pdf({
      path: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/resume.pdf',
      width: '900px',
      height: '1765px',
      printBackground: true,
      scale: 1,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });
    
    console.log('PDF generated successfully!');
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();
