// Add new article to database
console.log("[transactor.js]");

import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import model from "../../models/vnxArticle.js";
/* #region   */
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
console.log("[transactor.js:addVnxArticle] Connecting to Database.");
/* #endregion */

db.on("error", (error) => console.log("[transactor.js:addVnxArticle] Error connecting to database: " + error));
db.once("open", async () => {
	console.log("[transactor.js] Connected to Database");
});

export async function addVnxArticle(article) {
	console.log("[transactor.js:addVnxArticle]");

	try {
		await model.create(article).then((result) => {
			console.log("[transactor.js:addVnxArticle] Success. ID: " + result._id);
		});
		return;
	} catch (error) {
		console.log("[transactor.js:addVnxArticle] Error: " + error.message);
		return;
	}
}
