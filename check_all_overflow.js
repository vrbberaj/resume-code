const puppeteer = require('puppeteer-core');

const pages = [
  { name: 'Corporate (index.html)', url: 'http://localhost:8080/' },
  { name: 'VIT V-SIGN (academic_vsign.html)', url: 'http://localhost:8080/vsign' },
  { name: 'VIT SCOPE (academic_scope.html)', url: 'http://localhost:8080/scope' },
  { name: 'Interdisciplinary (academic_resume.html)', url: 'http://localhost:8080/academic' }
];

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    });

    for (const p of pages) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 1800 });
      await page.goto(p.url, { waitUntil: 'networkidle2' });
      await page.evaluateHandle('document.fonts.ready');

      const report = await page.evaluate(() => {
        const sidebar = document.querySelector('aside');
        const main = document.querySelector('main');
        return {
          sidebarClientHeight: sidebar ? sidebar.clientHeight : 0,
          sidebarScrollHeight: sidebar ? sidebar.scrollHeight : 0,
          mainClientHeight: main ? main.clientHeight : 0,
          mainScrollHeight: main ? main.scrollHeight : 0
        };
      });

      console.log(`\n=== Report for ${p.name} ===`);
      console.log(`Sidebar: client=${report.sidebarClientHeight}, scroll=${report.sidebarScrollHeight}`);
      console.log(`Main:    client=${report.mainClientHeight}, scroll=${report.mainScrollHeight}`);
      const sidebarOverflow = report.sidebarScrollHeight > report.sidebarClientHeight;
      const mainOverflow = report.mainScrollHeight > report.mainClientHeight;
      console.log(`Sidebar Overflow: ${sidebarOverflow ? 'FAIL' : 'OK'}`);
      console.log(`Main Overflow:    ${mainOverflow ? 'FAIL' : 'OK'}`);
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error('Error running check:', err);
    process.exit(1);
  }
})();
