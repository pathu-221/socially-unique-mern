import { Request, Router, Response } from "express";
import { Posts } from "../Models/Posts";
import { IRequest, authenticate } from "../middleware/authenticate";
import { CommentDto, UpdateCommentDto } from "../dto/update-posts.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ObjectId } from "mongodb";
const router = Router();

router.get("/:postId", async (req: Request, res: Response) => {
	const { postId } = req.params;

	try {
		const post = await Posts.findOne({ _id: postId });
		if (!post)
			return res.status(404).send({ status: 0, msg: "Post not found!" });

		const comments = await Posts.findOne({ _id: postId })
			.populate({
				path: "comments",
				populate: {
					path: "user",
					select: "username photoUrl",
				},
			})
			.select("comments");

		res
			.status(200)
			.send({ status: 1, msg: "Comment fetched!", data: comments });
	} catch (error) {
		console.error(error);
		res.status(501).send({ status: 0, msg: "Something went wrong!" });
	}
});

router.post("/:postId", authenticate, async (req: IRequest, res: Response) => {
	const commentDto = plainToClass(CommentDto, req.body);
	const errors = await validate(commentDto);

	if (errors.length) {
		const firstErrorMessage = Object.values(errors[0].constraints)[0];
		return res.status(401).json({ status: 0, msg: firstErrorMessage });
	}

	const { postId } = req.params;

	try {
		const post = await Posts.findOne({ _id: postId });
		if (!post)
			return res.status(404).send({ status: 0, msg: "Post not found!" });

		await Posts.updateOne(
			{ _id: postId },
			{
				$push: {
					comments: {
						user: req.user._id,
						text: commentDto.text,
						parentComment: commentDto.parentComment,
					},
				},
			}
		);

		res.send({ status: 1, msg: "Comment Added!" });
	} catch (error) {
		console.error(error);
		res.status(501).send({ status: 0, msg: "Something went wrong!" });
	}
});

export default router;
