import dotenv from "dotenv";

dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

import auth from "./routes/auth";
import posts from "./routes/posts";
import users from "./routes/user";
import likes from "./routes/like";
import comments from "./routes/comments";

import fileUpload from "express-fileupload";
import { connect } from "./db/conn";

export const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../public")));

app.use(
	cors({
		origin: "*",
		allowedHeaders: "*",
	})
);

app.use(express.json());
app.use(
	fileUpload({
        limits: { fileSize: 10 * 1024 * 1024 },
        createParentPath: true
	})
);
app.use("/auth", auth);
app.use("/posts", posts);
app.use("/user", users);
app.use("/like", likes);
app.use("/comments", comments);

app.get("/", async (req: Request, res: Response) => {
	res.send(JSON.stringify({ msg: "ok" }));
});

app.listen(port, async () => {
	console.log(`app listening on port ${port}`);
	await connect();
});
