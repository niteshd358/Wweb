import puppeteer from 'puppeteer';

const groupName = "demo group by webscrapper";
const contactNames = 'Prajwal Maharashtra, R VISHNU Mysore';

(async (groupName, contactNames) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://web.whatsapp.com', { waitUntil: 'load', timeout: 100000 });
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector("div[title='Menu']", { timeout: 100000 });
    await page.click("div[title='Menu']");

    await page.waitForSelector("div[data-testid='start-new-chat']", { timeout: 100000 });
    await page.click("div[data-testid='start-new-chat']");

    const contactList = contactNames.split(',').map(name => name.trim());

    for (const name of contactList) {
      await page.waitForSelector('div[data-testid="search"]', { timeout: 100000 });
      await page.type('div[data-testid="search"] input', name);
      await page.waitForTimeout(2000); // Wait for search results to load

      const contactSelector = `span[title="${name}"]`;
      await page.waitForSelector(contactSelector, { timeout: 100000 });
      await page.click(contactSelector);
    }

    await page.waitForSelector('div[data-testid="next"]', { timeout: 100000 });
    await page.click('div[data-testid="next"]');

    await page.waitForSelector('div[contenteditable="true"]', { timeout: 100000 });
    await page.type('div[contenteditable="true"]', groupName);

    await page.click('button[data-testid="arrow-forward"]');
    
    console.log('WhatsApp group created successfully!');

  } catch (error) {
    console.error('Error creating WhatsApp group:', error);
  } finally {
    await browser.close();
  }
})(groupName, contactNames);
