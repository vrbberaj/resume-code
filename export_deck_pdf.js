const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  console.log('🚀 Starting Executive Leadership Deck PDF generation...');
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

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    
    console.log('📄 Loading http://localhost:8080/leadership-deck ...');
    await page.goto('http://localhost:8080/leadership-deck', { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');

    const pdfPath = path.join(__dirname, 'Balaajee_VR_Leadership_Deck.pdf');
    console.log('🖨️ Rendering 10-slide landscape presentation PDF...');
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      preferCSSPageSize: true
    });

    console.log(`✅ Success! Executive Deck PDF saved to: ${pdfPath}`);
  } catch (err) {
    console.error('❌ Error generating deck PDF:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
