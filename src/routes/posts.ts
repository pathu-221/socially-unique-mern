import { Router, Request, Response } from "express";
import { Posts } from "../Models/Posts";
import { IRequest, authenticate } from "../middleware/authenticate";
import { plainToClass } from "class-transformer";
import { CreatePostsDto } from "../dto/create-posts.dto";
import { UpdatePostsDto } from "../dto/update-posts.dto";
import { validate } from "class-validator";
import { v2 } from "cloudinary";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	const userId = req.query?.userId as string;

	try {
		//trying aggregation
		const posts = await Posts.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "user",
				},
			},
			{ $unwind: "$user" },
			{ $match: { published: true } },
			{ $sort: { createdAt: -1 } },
			{
				$project: {
					_id: 1,
					title: 1,
					content: 1,
					published: 1,
					picture: 1,
					user: {
						_id: "$user._id",
						username: "$user.username",
						photoUrl: "$user.photoUrl",
					},
					likes: {
						$size: "$likes",
					},
					createdAt: 1,
					updatedAt: 1,
					likedByUser: {
						$cond: {
							if: { $eq: [{ $ifNull: [userId, null] }, null] },
							then: false,
							else: { $in: [new ObjectId(userId), "$likes.user"] },
						},
					},
				},
			},
		]);

		res.send({
			status: 1,
			msg: "All Posts fetched successfully!",
			data: posts,
		});
	} catch (error) {
		console.error(error);
		res.send({ status: 0, msg: "Something went wrong!" });
	}
});

router.put("/:postId", authenticate, async (req: IRequest, res: Response) => {
	const updatePostDto = plainToClass(UpdatePostsDto, req.body);
	const errors = await validate(updatePostDto);

	if (errors.length) {
		const firstErrorMessage = Object.values(errors[0].constraints)[0];
		return res.status(401).json({ status: 0, msg: firstErrorMessage });
	}

	try {
		const postId = req.params.postId;
		const post = await Posts.findOne({ _id: postId }).populate(
			"user",
			"_id username"
		);

		if (!post) return res.send({ status: 0, msg: "Post not Found!" });

		// if (post.user._id !== req.user._id)
		// 	res.send({ status: 0, msg: "This post is not yours!" });

		let url;
		if (req.files) {
			const file = Array.isArray(req.files["picture"])
				? req.files["picture"][0]
				: req.files["picture"];

			const image = await v2.uploader.upload(file.tempFilePath, {
				public_id: `${req.user._id}/${file.name}`,
			});

			url = image.url;
		}

		const published = await JSON.parse(updatePostDto.published);
		const updatedPost = await Posts.updateOne(
			{ _id: postId },
			{
				content: updatePostDto.content,
				picture: url,
				published: published.published,
			}
		);

		res.send({
			status: 1,
			msg: "Post saved successfully!",
			data: updatedPost,
		});
	} catch (error) {
		console.error(error);
		res.status(501).send({ status: 0, msg: "Something went wrong!" });
	}
});

router.post("/", authenticate, async (req: IRequest, res: Response) => {
	const createPostsDto = plainToClass(CreatePostsDto, req.body);
	const errors = await validate(createPostsDto);

	if (errors.length) {
		const firstErrorMessage = Object.values(errors[0].constraints)[0];
		return res.status(401).json({ status: 0, msg: firstErrorMessage });
	}

	try {
		const post = new Posts({
			...createPostsDto,
			user: req.user._id,
		});

		await post.save();

		res.send({
			status: 1,
			msg: "Post saved successfully!",
			data: post,
		});
	} catch (err) {
		console.error({ err });
		res.status(501).send({
			status: 0,
			msg: "Something went wrong!",
		});
	}
});

router.get("/user", authenticate, async (req: IRequest, res: Response) => {
	try {
		const posts = await Posts.find({ user: req.user._id }).populate(
			"user",
			"username photoUrl"
		);

		res.status(200).send({
			status: 1,
			msg: "Users posts fetched!",
			data: posts,
		});
	} catch (error) {
		console.error(error);
		res.end({
			status: 0,
			msg: "Something went wrong!",
		});
	}
});

router.get("/:postId", async (req: Request, res: Response) => {
	const { postId } = req.params;

	if (!postId) return res.send({ status: 0, msg: "Post Id is required" });

	try {
		const posts = await Posts.findOne({ _id: postId }).populate(
			"user",
			"username photoUrl"
		);

		res.status(200).send({
			status: 1,
			msg: "Post Fetched Successfully!",
			data: posts,
		});
	} catch (error) {
		console.error(error);
		res.end({
			status: 0,
			msg: "Something went wrong!",
		});
	}
});

export default router;
