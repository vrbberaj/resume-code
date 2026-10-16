const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 2200 });

    console.log('Navigating to https://www.behance.net/balaajeeVR ...');
    await page.goto('https://www.behance.net/balaajeeVR', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Wait 5 seconds for client hydration & projects rendering
    await new Promise(r => setTimeout(r, 5000));

    // Scroll down to load lazy projects
    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(r => setTimeout(r, 2000));
    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(r => setTimeout(r, 2000));

    const screenshotPath = '/Users/bjslabs/.gemini/antigravity-ide/brain/109b5e80-b713-4e72-a5a9-3658cfac04d1/behance_portfolio.png';
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log('Screenshot saved to', screenshotPath);

    const profileData = await page.evaluate(() => {
      const name = document.querySelector('h1')?.innerText?.trim() || '';
      const occupation = document.querySelector('[class*="occupation"], [class*="Occupation"]')?.innerText?.trim() || '';
      const location = document.querySelector('[class*="location"], [class*="Location"]')?.innerText?.trim() || '';
      
      const stats = Array.from(document.querySelectorAll('[class*="Stat-stat"], [class*="stat-count"], [class*="profile-stat"]'))
        .map(el => el.innerText.trim());

      const about = Array.from(document.querySelectorAll('[class*="About-text"], [class*="bio"], [class*="Bio"]'))
        .map(el => el.innerText.trim()).join('\n');

      // Find all project covers
      const projectCards = [];
      const links = document.querySelectorAll('a[href*="/gallery/"]');
      const seen = new Set();

      links.forEach(a => {
        const href = a.href;
        if (seen.has(href)) return;
        seen.add(href);

        const card = a.closest('li, div[class*="ProjectCover"], div[class*="cover"]') || a;
        
        // Find title
        let title = '';
        const titleEl = card.querySelector('[class*="title"], [class*="Title"], h3, h4');
        if (titleEl) title = titleEl.innerText.trim();
        if (!title) title = a.getAttribute('aria-label') || a.innerText.trim();

        // Find cover image
        const img = card.querySelector('img');
        const imgSrc = img ? (img.src || img.getAttribute('srcset') || '') : '';

        // Find fields/categories
        const fields = Array.from(card.querySelectorAll('[class*="field"], [class*="Field"], [class*="category"]'))
          .map(el => el.innerText.trim()).filter(Boolean).join(', ');

        // Find views / appreciations
        const projectStats = Array.from(card.querySelectorAll('[class*="stats"], [class*="Stats"], [class*="count"]'))
          .map(el => el.innerText.trim()).filter(Boolean).join(' | ');

        projectCards.push({
          title,
          href,
          imgSrc,
          fields,
          stats: projectStats
        });
      });

      return {
        name,
        occupation,
        location,
        about,
        stats,
        totalProjects: projectCards.length,
        projects: projectCards
      };
    });

    console.log('RESULT:' + JSON.stringify(profileData, null, 2));
    fs.writeFileSync('/Users/bjslabs/.gemini/antigravity-ide/brain/109b5e80-b713-4e72-a5a9-3658cfac04d1/behance_data.json', JSON.stringify(profileData, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
