import {
	deleteComment as deleteCommentApi,
	editComment,
} from "@/apis/comment.api";
import type { User } from "@/interfaces/user.interface";
import type { FC, FormEvent } from "react";
import { useState } from "react";
import type { ThreadComments } from "./Comments";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import CommentForm from "./CommentForm";

interface CommentItemProps {
	comment: ThreadComments;
	level: number;
	user?: User;
	onUpdate: () => Promise<void>;
}

const CommentItem: FC<CommentItemProps> = ({
	comment,
	level,
	user,
	onUpdate,
}) => {
	const isAdmin = comment.user._id === user?._id;
	const [isEditing, setIsEditing] = useState(false);
	const [commentToEdit, setCommentToEdit] = useState<ThreadComments>();

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

export default CommentItem;