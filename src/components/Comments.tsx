"use client";

import {
	deleteComment as deleteCommentApi,
	editComment,
	getComments,
	postComment,
} from "@/apis/comment.api";
// import { showToast } from "@/common/toast";
import { Comment } from "@/interfaces/comment.interface";
import { User } from "@/interfaces/user.interface";
import { useEffect, type FC, useState, FormEvent } from "react";
import { IoSend } from "react-icons/io5";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import useUser from "@/hooks/useUser";
//import { Router } from "next/router";

interface CommentsProps {
	postId: string;
}

const Comments: FC<CommentsProps> = ({ postId }) => {

    const { user } = useUser();
	const [comments, setComments] = useState<Comment[] | null>(null);
	const [comment, setComment] = useState("");
	const [isReplying, setIsReplying] = useState(false);
	const [edit, setEdit] = useState(false);
	const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);
	const [commentToReply, setCommentToReply] = useState<Comment | null>(null);

	useEffect(() => {
		fetchComments();
	}, []);

	const fetchComments = async () => {
		const data = await getComments(postId);

		if (!data.status) return //showToast("error", data.msg);
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
			return //showToast("error", "You need to sign in to post comments!");

		const requestBody: any = {
			text: commentToEdit ? commentToEdit.text : comment,
		};

		if (isReplying && commentToReply) {
			requestBody.parentComment = commentToReply._id;
		}

		const data = commentToEdit
			? await editComment(commentToEdit._id, requestBody)
			: await postComment(postId, requestBody);

		if (!data.status) return //showToast("error", data.msg);
		else {
			//showToast("success", data.msg);
			fetchComments();
			setComment("");
			setIsReplying(false);
			setCommentToReply(null);
			setCommentToEdit(null);
		}
	};

	const deleteComment = async (commentId: string) => {
		const data = await deleteCommentApi(commentId);
		if (!data.status) return //showToast("error", data.msg);
		else {
			//showToast("success", data.msg);
			fetchComments();
		}
	};

	const commentForm = (editing?: boolean) => (
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
					value={editing ? commentToEdit?.text : comment}
					onChange={(e) => {
						commentToEdit
							? setCommentToEdit({
									...commentToEdit,
									text: e.target.value,
							  })
							: setComment(e.target.value);
					}}
					className="input w-full break-word max-w-full input-bordered"
				/>
				<button className="btn btn-primary">
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

		return (
			<>
				{replies.map((comment) => (
					<div className="flex gap-3 flex-col p-1">
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
							{user && user._id === comment.user._id && (
								<>
									<AiTwotoneEdit
										className="cursor-pointer self-center"
										onClick={() => {
											setEdit(!edit);
											setCommentToEdit(comment);
										}}
									/>
									<AiFillDelete
										onClick={() => deleteComment(comment._id)}
										className="cursor-pointer"
									/>
								</>
							)}
						</div>
						<div className="text-lg">
							{edit && commentToEdit && commentToEdit._id === comment._id
								? commentForm(true)
								: comment.text}
						</div>
					</div>
				))}
			</>
		);
	};
	return (
		<>
			{/** comment section */}
			{/** comment form */}
			{user?.username &&  commentForm()}
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
										{user && user._id === comment.user._id && (
											<AiTwotoneEdit
												className="cursor-pointer self-center"
												onClick={() => {
													setEdit(!edit);
													setCommentToEdit(comment);
												}}
											/>
										)}
									</div>
									<div className="text-lg">
										{" "}
										<div className="text-lg">
											{edit &&
											commentToEdit &&
											commentToEdit._id === comment._id
												? commentForm(true)
												: comment.text}
										</div>
									</div>
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
									<div className="flex flex-col gap-1 pl-5">
										{renderReplies(comment._id)}
									</div>
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
