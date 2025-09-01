const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

(async () => {
  const url = 'http://localhost:3002/portfolio/test';
  console.log('Starting hydration smoke test against', url);

  // Wait for server to be ready
  const maxWait = 10000;
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    try {
      const r = await fetch(url, { method: 'GET' });
      if (r.ok) break;
    } catch (e) {
      // retry
    }
    await new Promise(r => setTimeout(r, 200));
  }

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait a bit for client bundle to hydrate
    await page.waitForTimeout(1500);

    // Try to click the Resume button (text 'cat resume.pdf')
    const resumeSelector = 'button:has-text("cat resume.pdf")';
    try {
      await page.click('button', { text: 'cat resume.pdf' });
    } catch (e) {
      // fallback: find button by innerText via evaluate
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const b = buttons.find(x => x.innerText && x.innerText.toLowerCase().includes('cat resume'));
        if (b) b.click();
      });
    }

    // Wait for modal to appear
    const modalAppeared = await page.evaluate(() => {
      const modal = document.querySelector('.modal.show');
      return !!modal;
    });

    if (modalAppeared) {
      console.log('Hydration PASS: Resume modal appeared after click');
    } else {
      console.log('Hydration UNCONFIRMED: modal not found after click');
    }

  } catch (err) {
    console.error('Hydration test error:', err);
    process.exitCode = 2;
  } finally {
    await browser.close();
    // request server shutdown
    try { await fetch('http://localhost:3002/__shutdown'); } catch (e) {}
  }
})();
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

(async () => {
  const url = 'http://localhost:3002/portfolio/test';
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait some time for hydration to run
    await page.waitForTimeout(1500);

    // Click the Resume modal trigger (text 'cat resume.pdf' button)
    const resumeBtn = await page.$x("//button[contains(., 'cat resume.pdf') or contains(., 'Resume') or contains(., 'resume')]");
    if (!resumeBtn || resumeBtn.length === 0) {
      console.log('Resume button not found — hydration may not have attached or selector mismatch');
      await browser.close();
      process.exit(2);
    }

    await resumeBtn[0].click();

    // Wait for modal to appear
    let modalFound = false;
    try {
      await page.waitForSelector('.modal.show, .modal', { timeout: 3000 });
      modalFound = true;
    } catch (e) {
      modalFound = false;
    }

    console.log('Modal found after click:', modalFound);

    // Try Download Resume in modal
    let downloadClicked = false;
    if (modalFound) {
      try {
        const dlBtn = await page.$x("//button[contains(., 'Download Resume') or contains(., 'download resume') or contains(., 'Download')]");
        if (dlBtn && dlBtn.length > 0) {
          await dlBtn[0].click();
          downloadClicked = true;
        }
      } catch (e) {
        downloadClicked = false;
      }
    }

    console.log('Download button clicked:', downloadClicked);

    await browser.close();

    // Try to ask server to shutdown
    try { await fetch('http://localhost:3002/__shutdown'); } catch (e) {}

    const success = modalFound && downloadClicked;
    process.exit(success ? 0 : 3);
  } catch (err) {
    console.error('Puppeteer error:', err);
    process.exit(4);
  }
})();
