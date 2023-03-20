// Scrape the news website for articles
console.log("[scraper.js]");

import * as cacher from "./cacher.js";
import * as fetcher from "./fetcher.js";
import * as parser from "./parser.js";

// set limit = -1 to scrape all pages
export async function scrape(mode, baseUrl, startUrl, limit = 1) {
	if (limit === -1) {
		// set hard limit of 5000
		limit = 5000;
	}

	console.log("[scraper:scrape] mode: " + mode + ", url: " + startUrl + ", limit: " + limit);

	switch (mode) {
		case "tt-vn": {
			let i = limit;

			while (i !== 0) {
				try {
					let html = await fetcher.fetchHttpText(startUrl);

					let urls = await parser.parseDom(parser.htmlToJsdom(html), "tt-vn-feed");

					await cacher.cacheMany(urls, mode, false).catch((error) => {
						console.log("[scraper:scrape] Error: " + error.message);
						return;
					});

					await parser
						.parseCache(mode)
						.then(() => {
							console.log("[scraper:scrape] Parsed cache");
						})
						.catch((error) => {
							console.log("[scraper:scrape] Error parsing: " + error.message);
							return;
						});

					// https://tuoitre.vn/timeline/3/trang-1.htm
					let page = parseInt(startUrl.substring(startUrl.lastIndexOf("-") + 1, startUrl.lastIndexOf(".htm")));
					page++;
					startUrl = baseUrl + "trang-" + page.toString() + ".htm";

					i--;
				} catch (error) {
					console.log("[scraper:scrape] Error: " + error.message);
					return;
				}
			}

			return;
		}

		case "tn-vn": {
			let i = limit;

			while (i !== 0) {
				try {
					let html = await fetcher.fetchHttpText(startUrl);

					let urls = await parser.parseDom(parser.htmlToJsdom(html), "tn-vn-feed");

					await cacher.cacheMany(urls, mode, false).catch((error) => {
						console.log("[scraper:scrape] Error: " + error.message);
						return;
					});

					await parser
						.parseCache(mode)
						.then(() => {
							console.log("[scraper:scrape] Parsed cache");
						})
						.catch((error) => {
							console.log("[scraper:scrape] Error parsing: " + error.message);
							return;
						});

					// https://thanhnien.vn/timelinelist/1854/1.htm

					let page = parseInt(startUrl.substring(startUrl.lastIndexOf("/") + 1, startUrl.lastIndexOf(".htm")));
					page++;
					startUrl = baseUrl + page.toString() + ".htm";

					i--;
				} catch (error) {
					console.log("[scraper:scrape] Error: " + error.message);
					return;
				}
			}

			return;
		}

		default: {
			console.log("[scraper:scrape] Error: Invalid mode");
			break;
		}
	}
}
