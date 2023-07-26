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
						parentComment:
							commentDto.parentComment &&
							new ObjectId(commentDto.parentComment),
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

router.put(
	"/:commentId",
	authenticate,
	async (req: IRequest, res: Response) => {
		const updateCommentDto = plainToClass(UpdateCommentDto, req.body);
		const errors = await validate(updateCommentDto);

		if (errors.length) {
			const firstErrorMessage = Object.values(errors[0].constraints)[0];
			return res.status(401).json({ status: 0, msg: firstErrorMessage });
		}

		const { commentId } = req.params;

		console.log({ id: new ObjectId(commentId) });
		try {
			await Posts.findOneAndUpdate(
				{ "comments._id": new ObjectId(commentId) },
				{ $set: { "comments.$.text": updateCommentDto.text } },
				{ new: true }
			);
			res.send({ status: 1, msg: "Comment Edited!" });
		} catch (error) {
			console.error(error);
			res.status(501).send({ status: 0, msg: "Something went wrong!" });
		}
	}
);

router.delete(
	"/:commentId",
	authenticate,
	async (req: IRequest, res: Response) => {
		const { commentId } = req.params;

		try {
			await Posts.findOneAndUpdate(
				{ "comments._id": new ObjectId(commentId) },
				{ $pull: { comments: { _id: commentId } } },
				{ new: true }
			);

			res.send({ status: 1, msg: "Comment Deleted!" });
		} catch (error) {
			console.error(error);
			res.status(501).send({ status: 0, msg: "Something went wrong!" });
		}
	}
);

export default router;
