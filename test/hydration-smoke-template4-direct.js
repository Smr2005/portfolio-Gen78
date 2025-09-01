const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    const renderer = require(path.resolve(__dirname, '..', 'server', 'renderers', 'template4Renderer-ssr.js'));
    const data = {
      name: 'Direct Sim User',
      title: 'Direct Hydration Test',
      about: 'Direct SSR content for Puppeteer',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    };

    // Attempt to read client build manifest for hydrate bundle path
    let clientBundleUrl = null;
    try {
      const manifest = require(path.resolve(__dirname, '..', 'client', 'build', 'asset-manifest.json'));
      clientBundleUrl = manifest.files && (manifest.files['main.js'] || manifest.files['static/js/main.js']) ? (manifest.files['main.js'] || manifest.files['static/js/main.js']) : null;
      if (clientBundleUrl && !clientBundleUrl.startsWith('/')) clientBundleUrl = '/' + clientBundleUrl.replace(/^\//, '');
    } catch (e) {
      clientBundleUrl = null;
    }

    const html = renderer.renderTemplate4SSR(data, { hydrate: !!clientBundleUrl, clientBundleUrl });

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    // Set content directly
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait briefly for potential hydration
  await new Promise(r => setTimeout(r, 1000));

    const resumeSelector = 'button.minimal-button';
    const hasResume = await page.$(resumeSelector) !== null;
    if (!hasResume) {
      console.log('Resume button not found — markup may differ');
      await browser.close();
      process.exit(2);
    }

    // Click the resume button
    await page.click(resumeSelector);

    // Wait to see if modal appears
    let modalFound = false;
    try {
      await page.waitForSelector('.modal.show, .modal', { timeout: 3000 });
      modalFound = true;
    } catch (e) {
      modalFound = false;
    }

    if (modalFound) {
      console.log('Hydration/Interaction SUCCESS: Modal appeared after clicking Resume');
      await browser.close();
      process.exit(0);
    } else {
      console.log('Hydration/Interaction UNCONFIRMED: Modal did not appear after clicking Resume (may still hydrate when scripts load)');
      await browser.close();
      process.exit(3);
    }
  } catch (err) {
    console.error('Direct Puppeteer error:', err);
    process.exit(4);
  }
})();
