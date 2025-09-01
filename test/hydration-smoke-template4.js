const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

(async () => {
  const url = 'http://localhost:3002/portfolio/test';
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait a short time for hydration
    await page.waitForTimeout(1000);

    // Try to click the Resume button (selector based on appearance)
    const resumeSelector = 'button.minimal-button';
    const hasResume = await page.$(resumeSelector) !== null;
    if (!hasResume) {
      console.log('Resume button not found — hydration may not have attached or markup differs');
      await browser.close();
      process.exit(2);
    }

    await page.click(resumeSelector);

    // Wait for modal to appear (Bootstrap modal has role dialog or .modal in DOM)
    let modalFound = false;
    try {
      await page.waitForSelector('.modal.show, .modal', { timeout: 3000 });
      modalFound = true;
    } catch (e) {
      modalFound = false;
    }

    if (modalFound) {
      console.log('Hydration SUCCESS: Modal appeared after clicking Resume');
    } else {
      console.log('Hydration FAILED: Modal did not appear after clicking Resume');
    }

    await browser.close();

    // Ask server to shutdown (if available)
    try { await fetch('http://localhost:3002/__shutdown'); } catch (e) {}

    process.exit(modalFound ? 0 : 3);
  } catch (err) {
    console.error('Puppeteer error:', err);
    process.exit(4);
  }
})();
