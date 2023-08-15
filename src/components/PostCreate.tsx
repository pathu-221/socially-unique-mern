"use client";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import PostEditModal from "./PostEditModal";
import { showToast } from "@/common/showToast";

interface PostCreateProps {}

const PostCreate: FC<PostCreateProps> = () => {
	const router = useRouter();
	const { user } = useUser();
	const [showAddPostModal, setshowAddPostModal] = useState(false);

	if (!user) return <></>;

	if (!user.username)
		<span>
			<p>You need to choose a username first</p>
			<button className="btn btn-primary">Choose</button>
		</span>;

	return (
		<div className="flex items-center justify-between self-start p-4 rounded-2xl my-[-25px] justify-self-start gap-3 bg-dark-focus w-full">
			<img src={user.photoUrl} className="rounded-full h-12 aspect-square" />
			<span className="flex-grow">
				<input
					placeholder="What's on your mind?"
					className="w-full cursor-pointer hover:bg-gray-700 input input-bordered"
					onClick={() => setshowAddPostModal(true)}
				/>
			</span>
			{showAddPostModal && (
				<PostEditModal
					isOpen={showAddPostModal}
					onClose={() => setshowAddPostModal(false)}
					close={() => setshowAddPostModal(false)}
					onUpdate={() => {
						router.refresh();
					}}
				/>
			)}
		</div>
	);
};

export default PostCreate;
