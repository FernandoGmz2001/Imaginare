const playwright = require("playwright");

(async () => {
  try {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rarible.com/drops");
    await page.waitForTimeout(5000);
    for (let i = 0; i < 4; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000); // wait for 2 seconds for the new nfts to load
    }

    const nftImages = await page.$$(".eztuqr img");
    const nftTitles = await page.$$(
      "span.sc-gEvEer.sc-imWYAI.sc-cFShuL.ccEXhb"
    );
    const nftAutors = await page.$$(".sc-gEvEer.sc-imWYAI.jHEndm");
    const nftPrice = await page.$$(
      "span.sc-gEvEer.sc-imWYAI.sc-bYHUQc.btPzvO"
    );
    const nfts = [];

    for (let i = 0; i < nftImages.length; i++) {
      const src = await nftImages[i].getAttribute("src");
      const content = await nftTitles[i].textContent();
      const autor = await nftAutors[i].textContent();
      const price = await nftPrice[i].textContent();
      // let price = '';
      // if (nftPrice[i]) {
      //     price = await nftPrice[i].innerText();
      // }

      const nft = {
        title: content,
        image: src,
        autor: autor,
        price: price == "Completed" ? "0.0010010 ETH" : price,
      };

      nfts.push(nft);
    }
    fs.writeFileSync("/scrap/nfts.json", JSON.stringify(nfts, null, 2));

    await browser.close();
    console.log(nfts);
  } catch (error) {
    throw new Error(error);
  }
})();
