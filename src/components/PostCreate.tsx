"use client";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import PostEditModal from "./PostEditModal";
import { showToast } from "@/common/showToast";
import UsernameModal from "./UsernameModal";

interface PostCreateProps {}

const PostCreate: FC<PostCreateProps> = () => {
	const router = useRouter();
	const { user } = useUser();
	const [showAddPostModal, setshowAddPostModal] = useState(false);

	if (!user) return <></>;
	//if (!user.username)
	//useEffect(() => {}, [user]);
	return (
		<div className="flex items-center justify-between self-start p-4 rounded-2xl my-[-25px] justify-self-start gap-3 bg-dark-focus w-full">
			<img src={user?.photoUrl} className="rounded-full h-12 aspect-square" alt="user profile"/>
			<span className="flex-grow">
				<input
					placeholder="What's on your mind?"
					className="w-full cursor-pointer hover:bg-gray-700 input input-bordered"
					onClick={() => {
						if (!user?.username)
							showToast("You need to choose a username first!", "warning");
						setshowAddPostModal(true);
					}}
				/>
			</span>
			{showAddPostModal &&
				(user?.username ? (
					<PostEditModal
						isOpen={showAddPostModal}
						onClose={() => setshowAddPostModal(false)}
						close={() => setshowAddPostModal(false)}
						onUpdate={() => {
							router.refresh();
						}}
					/>
				) : (
					<UsernameModal
						isOpen={showAddPostModal}
						onClose={() => setshowAddPostModal(false)}
					/>
				))}
		</div>
	);
};

export default PostCreate;
