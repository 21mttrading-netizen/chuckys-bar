const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    async function scrollAndCapture(url, prefix) {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
        await new Promise(r => setTimeout(r, 1000));

        // Scroll to trigger reveals
        await page.evaluate(async () => {
            await new Promise(resolve => {
                let h = 0;
                const timer = setInterval(() => {
                    window.scrollBy(0, 300);
                    h += 300;
                    if (h >= document.body.scrollHeight) { clearInterval(timer); window.scrollTo(0, 0); resolve(); }
                }, 80);
            });
        });
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: `temporary_screenshots/${prefix}-full.png`, fullPage: true });
        await page.screenshot({ path: `temporary_screenshots/${prefix}-hero.png`, fullPage: false });
    }

    await scrollAndCapture('http://localhost:8083/index.html', 'home');
    await scrollAndCapture('http://localhost:8083/events.html', 'events');
    await scrollAndCapture('http://localhost:8083/menu.html', 'menu');

    await browser.close();
    console.log('All screenshots saved.');
})();
