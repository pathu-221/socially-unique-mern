import { getComments, postComment } from "@/apis/comment";
import { showToast } from "@/common/toast";
import { Comment } from "@/interfaces/comment";
import { User } from "@/interfaces/user";
import { useEffect, type FC, useState, FormEvent } from "react";
import { IoSend } from "react-icons/io5";
import { BsFillChatDotsFill } from "react-icons/bs";

interface CommentsProps {
	user?: User;
	postId: string;
}

const Comments: FC<CommentsProps> = ({ user, postId }) => {
	const [comments, setComments] = useState<Comment[] | null>(null);
	const [comment, setComment] = useState("");
	const [isReplying, setIsReplying] = useState(false);
	const [commentToReply, setCommentToReply] = useState<Comment | null>(null);

	useEffect(() => {
		fetchComments();
	}, []);

	const fetchComments = async () => {
		const data = await getComments(postId);

		if (!data.status) return showToast("error", data.msg);
		setComments(data.data.comments);
	};

	const formatCommentDate = (date: string) => {
		const formattedDate = new Date(date).toLocaleDateString("en-us", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});

		return formattedDate;
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!user)
			return showToast("error", "You need to sign in to post comments!");

		const requestBody: any = {
			text: comment,
		};

		if (isReplying && commentToReply) {
			requestBody.parentComment = commentToReply._id;
		}

		const data = await postComment(postId, requestBody);
		console.log({ data });

		if (!data.status) showToast("error", data.msg);
		else {
			showToast("success", data.msg);
			fetchComments();
			setComment("");
			setIsReplying(false);
			setCommentToReply(null);
		}
	};

	const commentForm = () => (
		<div className="flex items-center justify-center gap-2">
			<img
				src={
					user?.photoUrl ||
					"https://api.dicebear.com/6.x/fun-emoji/svg?seed=Kiki"
				}
				className="rounded-full h-12 w-12"
			/>
			<form
				className="flex-grow flex items-center justify-between gap-2"
				onSubmit={onSubmit}
			>
				<input
					placeholder="Leave a comment!"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className="input w-full break-word max-w-full input-bordered"
				/>
				<button className="btn btn-secondary">
					<IoSend />
				</button>
			</form>
		</div>
	);

	const renderReplies = (commentId: string) => {
		if (!comments) return;

		let replies: Comment[] = [];
		for (let i = 0; i < comments?.length; i++) {
			if (comments[i].parentComment === commentId) replies.push(comments[i]);
		}

		console.log({ replies });

		return (
			<>
				{replies.map((comment) => (
					<div className="flex gap-2 flex-col p-3">
						<div className="flex gap-3 items-center justify-start text-start">
							<img
								src={comment.user.photoUrl}
								className="rounded-full w-6 h-6"
							/>
							<div className="text-white text-base ">
								{comment.user.username}
							</div>
							<div className="text-base text">
								{formatCommentDate(comment.updatedAt)}
							</div>
						</div>
						<div className="text-lg">{comment.text}</div>
					</div>
				))}
			</>
		);
	};
	return (
		<>
			{/** comment section */}
			<div className="border-b pb-2 border-gray-400 flex items-start justify-between">
				{comments && comments.length} Comments
			</div>
			{/** comment form */}
			{commentForm()}
			{/** comments  */}
			<div className="flex flex-col gap-2">
				{comments &&
					comments.map(
						(comment) =>
							!comment.parentComment && (
								<div
									key={comment._id}
									className="flex gap-2 flex-col border-b border-gray-600 p-3"
								>
									<div className="flex gap-3 items-center justify-start text-start ">
										<img
											src={comment.user.photoUrl}
											className="rounded-full w-6 h-6"
										/>
										<div className="text-white text-base ">
											{comment.user.username}
										</div>
										<div className="text-base text">
											{formatCommentDate(comment.updatedAt)}
										</div>
									</div>
									<div className="text-lg">{comment.text}</div>
									<div
										className="flex self-start items-center gap-2 justify-center cursor-pointer"
										onClick={() => {
											setCommentToReply(comment);
											setIsReplying(!isReplying);
										}}
									>
										<BsFillChatDotsFill />
										Reply
									</div>
									{renderReplies(comment._id)}
									{isReplying &&
										commentToReply?._id === comment._id &&
										commentForm()}
								</div>
							)
					)}
			</div>
		</>
	);
};

export default Comments;
