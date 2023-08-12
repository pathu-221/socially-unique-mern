import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
import { ObjectId } from "mongodb";
import path from "path";
import { Posts } from "../Models/Posts";
import { User } from "../Models/User";
import { CreatePostsDto } from "../dto/create-posts.dto";
import { UpdatePostsDto } from "../dto/update-posts.dto";
import { IRequest, authenticate } from "../middleware/authenticate";
import { uploadPostPictures } from "../helpers/uploadFiles";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
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
					comments: {
						$size: "$comments",
					},
					createdAt: 1,
					updatedAt: 1,
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
		let filePaths: string[] = updatePostDto.picture
			? await JSON.parse(updatePostDto.picture)
			: [];
		if (req.files) {
			const files = uploadPostPictures(
				req.files["pictures"],
				req.user._id,
				postId
			);
			filePaths.concat(files);
		}

		const published = updatePostDto.published === "true";

		const updatedPost = await Posts.updateOne(
			{ _id: postId },
			{
				content: updatePostDto.content,
				picture: filePaths,
				published: published,
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

router.delete(
	"/:postId",
	authenticate,
	async (req: IRequest, res: Response) => {
		try {
			const postId = req.params.postId;
			const post = await Posts.findOne({ _id: postId });

			if (!post) return res.send({ status: 0, msg: "Post not Found!" });

			await Posts.findByIdAndDelete(postId);

			res.send({
				status: 1,
				msg: "Post deleted successfully!",
			});
		} catch (error) {
			console.error(error);
			res.status(501).send({ status: 0, msg: "Something went wrong!" });
		}
	}
);

router.post("/", authenticate, async (req: IRequest, res: Response) => {
	const createPostsDto = plainToClass(CreatePostsDto, req.body);
	const errors = await validate(createPostsDto);

	if (errors.length) {
		const firstErrorMessage = Object.values(errors[0].constraints)[0];
		return res.status(401).json({ status: 0, msg: firstErrorMessage });
	}

	try {
		const postId = new ObjectId();
		const filePaths: string[] = [];
		if (req.files) {
			filePaths.push(
				...uploadPostPictures(
					req.files["pictures"],
					req.user._id,
					postId.toString()
				)
			);
		}
		const post = new Posts({
			picture: filePaths,
			_id: postId,
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

router.get("/user/:userId", async (req: IRequest, res: Response) => {
	const { userId } = req.params;
	try {
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
			{ $match: { "user._id": new ObjectId(userId) } },
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
				},
			},
		]);
		const user = await User.findOne({ _id: userId }).select([
			"username",
			"photoUrl",
			"_id",
		]);

		res.status(200).send({
			status: 1,
			msg: "Users public posts fetched!",
			data: { posts, user },
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
		const posts = await Posts.aggregate([
			{ $match: { _id: new ObjectId(postId) } },
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
					comments: {
						$size: "$comments",
					},
					createdAt: 1,
					updatedAt: 1,
				},
			},
		]);

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
