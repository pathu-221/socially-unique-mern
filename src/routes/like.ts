import { Request, Response, Router } from "express";
import { IRequest, authenticate } from "../middleware/authenticate";
import { Posts } from "../Models/Posts";
import { ObjectId } from "mongodb";

const router = Router();

router.put("/:postId", authenticate, async (req: IRequest, res: Response) => {
	const { postId } = req.params;

	try {
		const post = await Posts.findOne({ _id: postId });

		if (!post)
			return res.status(404).send({ status: 0, msg: "Post not found!" });

		const liked = post.likes.findIndex((val) => val.user.equals(req.user._id));

		if (liked === -1) {
			await Posts.updateOne(
				{ _id: postId },
				{
					$push: {
						likes: { user: req.user._id },
					},
				}
			);

			return res.status(200).send({
				status: 1,
				msg: "Post liked!",
			});
		} else {
			await Posts.updateOne(
				{ _id: postId },
				{
					$pull: {
						likes: { user: req.user._id },
					},
				}
			);
			return res.status(200).send({
				status: 1,
				msg: "Post unliked!",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(501).send({ status: 0, msg: "Something Went Wrong!" });
	}
});

export default router;
