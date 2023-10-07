import mongoose, { mongo } from "mongoose";

export async function connect() {
	try {
		const db = await mongoose.connect(process.env.ATLAS_URI);
		if (process.env.NODE_ENV === "development") {
			db.connection.useDb("test");
		} else {
			db.connection.useDb("staging");
		}
		if (db) console.log("connected to database");
	} catch (err) {
		console.error(err);
	}
}
