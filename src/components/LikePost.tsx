"use client";

import { geLikedByUser, getTotalLikes, likePost } from "@/apis/like.api";
import { showToast } from "@/common/showToast";
import useUser from "@/hooks/useUser";
import { useState, type FC, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface LikePostProps {
	postId: string;
}

const LikePost: FC<LikePostProps> = ({ postId }) => {
	const user = useUser().user;
	const [postLikes, setPostLikes] = useState(0);
	const [alreadyLiked, setAlreadyLiked] = useState(false);

	useEffect(() => {
		fetchLikes(postId);
		fetchIsLiked(postId);
	}, []);

	const likeThisPost = async () => {
        if (!user) return;
        
		const response = await likePost(postId);
		if (!response.status) return showToast(response.msg, "error");

		fetchLikes(postId);
		fetchIsLiked(postId);
	};

	const fetchLikes = async (id: string) => {
		const response = await getTotalLikes(id);
		console.log({ response });
		if (!response.status) return showToast(response?.msg, "error");

		setPostLikes(response.data);
	};

	const fetchIsLiked = async (id: string) => {
		const response = await geLikedByUser(id);
		if (!response.status) return showToast(response.msg, "error");

		setAlreadyLiked(response.data);
	};

	return (
		<span className="mr-5 cursor-pointer flex flex-col gap-0 pt-4 items-center justify-center">
			<button onClick={() => likeThisPost()} className="btn btn-ghost btn-sm">
				{alreadyLiked ? (
					<AiFillHeart className="text-secondary" size={25} />
				) : (
					<AiOutlineHeart size={25} />
				)}
			</button>
			{postLikes && <p>{postLikes}</p>}
		</span>
	);
};

export default LikePost;
