console.log("[server.js]");

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

import { dateRouter } from "./routers/date.js";
import * as scraper from "./scripts/scraper/scraper.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/date", dateRouter);

app.listen(port, () => {
	console.log("[server:main] Listening on port " + port);
});

async function main(mode, baseUrl, startUrl, limit = 1) {
	console.log("[server:main]");

	/* ------------ scraping ------------ */
	await scraper
		.scrape(mode, baseUrl, startUrl, limit)
		.catch((error) => {
			console.log("[server:main] Error: " + error.message);
		})
		.finally(async () => {
			console.log("[server:main] Done scraping");
		});
}

/* -------------- tt-vn ------------- */
// https://tuoitre.vn/timeline/3/trang-1.htm
// 		3:news
// 		11:business

/* -------------- tn-vn ------------- */
// https://thanhnien.vn/timelinelist/1854/1.htm
// 		1854:news
// 		18549:business

async function test() {
	await main("tt-vn", "https://tuoitre.vn/timeline/3/", "https://tuoitre.vn/timeline/3/trang-1.htm", 3300);
	await main("tt-vn", "https://tuoitre.vn/timeline/3/", "https://tuoitre.vn/timeline/11/trang-1.htm", 3300);

	await main("tn-vn", "https://thanhnien.vn/timelinelist/1854/", "https://thanhnien.vn/timelinelist/1854/1.htm", 10500);
	await main("tn-vn", "https://thanhnien.vn/timelinelist/18549/", "https://thanhnien.vn/timelinelist/18549/1.htm", 10500);
}

await test();

process.exit(0);
