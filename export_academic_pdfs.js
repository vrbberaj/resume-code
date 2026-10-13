const puppeteer = require('puppeteer-core');

const targets = [
  { url: 'http://localhost:8080/vsign', pdfPath: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/resume_vsign.pdf', height: '1765px' },
  { url: 'http://localhost:8080/scope', pdfPath: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/resume_scope.pdf', height: '1765px' },
  { url: 'http://localhost:8080/academic', pdfPath: '/Users/bjslabs/Documents/BJSLabs/Job Hunt/Resume Code/resume_academic.pdf', height: '1765px' }
];

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security'
      ]
    });

    for (const t of targets) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 2000 });
      await page.goto(t.url, { waitUntil: 'networkidle2' });
      await page.evaluateHandle('document.fonts.ready');

      const cardHeight = await page.evaluate(() => {
        const card = document.querySelector('.max-w-\\[900px\\]');
        return card ? card.offsetHeight : 1506;
      });

      await page.pdf({
        path: t.pdfPath,
        width: '900px',
        height: `${cardHeight}px`,
        printBackground: true,
        scale: 1,
        margin: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      });
      console.log(`Generated: ${t.pdfPath} (height: ${cardHeight}px)`);
      await page.close();
    }

    await browser.close();
    console.log('All academic PDFs generated successfully!');
  } catch (err) {
    console.error('Error generating academic PDFs:', err);
    process.exit(1);
  }
})();
