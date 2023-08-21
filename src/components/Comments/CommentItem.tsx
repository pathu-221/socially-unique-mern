import {
	deleteComment as deleteCommentApi,
	editComment,
	postComment,
} from "@/apis/comment.api";
import type { User } from "@/interfaces/user.interface";
import type { ChangeEvent, FC, FormEvent } from "react";
import { useState } from "react";
import type { ThreadComments } from "./Comments";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import CommentForm from "./CommentForm";
import { BsReplyFill } from "react-icons/bs";
import { showToast } from "@/common/showToast";
import { getProfileImageUrl } from "@/common/getImageUrl";
interface CommentItemProps {
	comment: ThreadComments;
	level: number;
	user?: User;
	postId?: string;
	onUpdate: () => Promise<any>;
}

const CommentItem: FC<CommentItemProps> = ({
	comment,
	level,
	user,
	onUpdate,
	postId,
}) => {
	const isAdmin = comment.user._id === user?._id;
	const [isEditing, setIsEditing] = useState(false);
	const [isReplying, setIsReplying] = useState(false);
	const [commentToEdit, setCommentToEdit] = useState<ThreadComments>();
	const [reply, setReply] = useState("");

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

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReply(e.target.value);
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

	const replyToComment = async (e: FormEvent) => {
		e.preventDefault();
		const requestBody = {
			parentComment: comment._id,
			text: reply,
		};

		if (!postId) return;

		const data = await postComment(postId, requestBody);
		if (!data.status) return showToast(data.msg, "error");
		setIsReplying(false);
		setReply("");
		onUpdate();
	};

	const deleteComment = async (commentId: string) => {
		const data = await deleteCommentApi(commentId);
		if (!data.status) return showToast(data.msg, "error");

		showToast(data.msg, "success");
		await onUpdate();
	};

	return (
		<div className="border-l border-gray-400 px-3 pt-2 w-full">
			<div className="flex gap-2 items-center">
				<img
					className="h-8 w-8 rounded-full"
					src={getProfileImageUrl(comment.user.photoUrl)}
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
					<span className="flex flex-col gap-2 items-start justify-center">
						<p>{comment.text}</p>
						<span
							onClick={() => setIsReplying(!isReplying)}
							className="flex items-end gap-2 justify-end cursor-pointer"
						>
							<BsReplyFill size={18} />
							<p className="m-0 p-0 text-xs text-gray-500">Reply</p>
						</span>
						{isReplying && (
							<CommentForm
								value={reply}
								onChange={onChange}
								onSubmit={replyToComment}
							/>
						)}
					</span>
				)}
			</div>

			{comment.replies &&
				comment.replies.map((reply) => (
					<CommentItem
						onUpdate={onUpdate}
						user={user}
						key={reply._id}
						postId={postId}
						level={level + 1}
						comment={reply}
					/>
				))}
		</div>
	);
};

export default CommentItem;
