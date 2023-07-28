"use client";

import { getComments, postComment } from "@/apis/comment.api";
// import { showToast } from "@/common/toast";
import useUser from "@/hooks/useUser";
import { Comment } from "@/interfaces/comment.interface";
import { FormEvent, useState, type FC } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
//import { Router } from "next/router";

interface CommentsProps {
	postId: string;
}

export interface ThreadComments extends Comment {
	replies: ThreadComments[];
}

const Comments: FC<CommentsProps> = ({ postId }) => {
	const { user } = useUser();
	const [comments, setComments] = useState<ThreadComments[] | null>(null);
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

	const formatThreadComments = (comments: ThreadComments[]) => {
		if (!comments) return [];
		let comm: ThreadComments[] = [];

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
			} as ThreadComments;
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
							postId={postId}
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

export default Comments;
