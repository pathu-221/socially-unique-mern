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
import {
	useEffect,
	type FC,
	useState,
	FormEvent,
	FormEventHandler,
	ChangeEventHandler,
} from "react";
import { IoSend } from "react-icons/io5";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import useUser from "@/hooks/useUser";
//import { Router } from "next/router";

interface CommentsProps {
	postId: string;
}

interface CommentItemProps {
	comment: threadComments;
	level: number;
	user?: User;
	onUpdate: () => Promise<void>;
}

interface threadComments extends Comment {
	replies: threadComments[];
}

interface CommentFormProps {
	comment?: threadComments;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onChange: ChangeEventHandler<HTMLTextAreaElement>;
	value?: string;
}

const Comments: FC<CommentsProps> = ({ postId }) => {
	const { user } = useUser();
	const [comments, setComments] = useState<threadComments[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [comment, setComment] = useState("");

	const fetchComments = async () => {
		setLoading(true);
		const data = await getComments(postId);
		setLoading(false);

		if (!data.status) return; //showToast("error", data.msg);

		const temp = data.data.comments.map((comment: any) => {
			return {
				...comment,
				replies: [],
			};
		});
		setComments(formatThreadComments(temp));
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!user) return; //showToast("error", "You need to sign in to post comments!");

		const requestBody: any = {
			text: comment,
		};

		const data = await postComment(postId, requestBody);

		if (!data.status) return; //showToast("error", data.msg);
		//showToast("success", data.msg);
		fetchComments();
		setComment("");
	};

	const formatThreadComments = (comments: threadComments[]) => {
		if (!comments) return [];
		let comm: threadComments[] = [];

		for (const comment of comments) {
			if (comment.parentComment) {
				const index = comments.findIndex(
					(c) => c._id === comment.parentComment
				);
				if (comments[index]) comments[index].replies.push({ ...comment });
			} else {
				comm.push({ ...comment, replies: [] });
			}
		}

		comm = comm.map((comment, index) => {
			return {
				...comments.find((c) => c._id === comment._id),
			} as threadComments;
		});

		return comm;
	};

	return (
		<section className="flex flex-col gap-2 items-start jutify-start">
			{comments ? (
				<>
					<CommentForm
						onChange={(e) => {
							setComment(e.target.value);
						}}
						value={comment}
						onSubmit={onSubmit}
					/>
					{comments.map((comment) => (
						<CommentItem
							onUpdate={fetchComments}
							user={user}
							key={comment._id}
							level={0}
							comment={comment}
						/>
					))}
				</>
			) : (
				<button
					onClick={() => fetchComments()}
					className="btn btn-primary btn-link self-center"
				>
					{loading ? "Loading" : "Load comments"}
				</button>
			)}
		</section>
	);
};

const CommentItem: FC<CommentItemProps> = ({
	comment,
	level,
	user,
	onUpdate,
}) => {
	const isAdmin = comment.user._id === user?._id;
	const [isEditing, setIsEditing] = useState(false);
	const [commentToEdit, setCommentToEdit] = useState<threadComments>();

	const formatCommentDate = (date: string) => {
		const formattedDate = Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		}).format(new Date(date));
		return formattedDate;
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!commentToEdit) return;

		const requestBody: any = {
			text: commentToEdit.text,
		};

		const res = await editComment(commentToEdit._id, requestBody);
		if (!res.status) return;
		await onUpdate();
		setIsEditing(false);
	};

	const deleteComment = async (commentId: string) => {
		const data = await deleteCommentApi(commentId);
		if (!data.status) return; //showToast("error", data.msg);

		//showToast("success", data.msg);
		await onUpdate();
	};

	return (
		<div className="ml-3 border-l border-gray-400 px-3 pt-2 w-full">
			<div className="flex gap-2 items-center">
				<img
					className="h-8 w-8 rounded-full"
					src={comment.user.photoUrl}
					alt="comment"
				/>
				<div>
					<p className="font-semibold text-sm">{comment.user.username}</p>
					<p className="text-xs text-gray-500">
						{formatCommentDate(comment.createdAt)}
					</p>
				</div>
				{isAdmin && (
					<div className="flex gap-2 items-center text-gray-400">
						<button
							onClick={() => {
								setIsEditing(!isEditing);
								setCommentToEdit(comment);
							}}
						>
							<AiTwotoneEdit />
						</button>
						<button onClick={() => deleteComment(comment._id)}>
							<AiFillDelete />
						</button>
					</div>
				)}
			</div>

			<div className="mt-2 text-sm px-2 pb-2">
				{isEditing ? (
					<CommentForm
						onChange={(e) => {
							if (commentToEdit)
								setCommentToEdit({ ...commentToEdit, text: e.target.value });
						}}
						onSubmit={onSubmit}
						comment={commentToEdit}
					/>
				) : (
					comment.text
				)}
			</div>

			{comment.replies &&
				comment.replies.map((reply) => (
					<CommentItem
						onUpdate={onUpdate}
						user={user}
						key={reply._id}
						level={level + 1}
						comment={reply}
					/>
				))}
		</div>
	);
};

const CommentForm: FC<CommentFormProps> = ({
	comment,
	onSubmit,
	onChange,
	value,
}) => {
	return (
		<div className="w-full">
			<form onSubmit={onSubmit} className="mb-6">
				<div className="py-2 px-4 mb-2 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
					<textarea
						id="comment"
						rows={4}
						className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
						placeholder="Write a comment..."
						required
						onChange={onChange}
						defaultValue={comment?.text}
						value={value}
					></textarea>
				</div>
				<button
					type="submit"
					className="btn btn-primary btn-sm text-white text-xs"
				>
					Post comment
				</button>
			</form>
		</div>
	);
};

export default Comments;
