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
	const { user } = useUser();
	const [showAddPostModal, setshowAddPostModal] = useState(false);

	if (!user) return null;

	if (!user.username)
		<span>
			<p>You need to choose a username first</p>
			<button className="btn btn-primary">Choose</button>
		</span>;

	return (
		<div className="flex items-center justify-between self-start p-4 rounded-2xl my-[-25px]">
			<button
				onClick={() => showToast("hello", "info")}
				className="btn btn-primary"
			>
				Show
			</button>
			<button
				className="bg-primary text-white flex items-center px-4 py-2 rounded-lg"
				onClick={() => setshowAddPostModal(true)}
			>
				<AiOutlinePlus className="mr-2" />
				<p>Add Post</p>
			</button>
			{showAddPostModal && (
				<PostEditModal
					isOpen={showAddPostModal}
					onClose={() => setshowAddPostModal(false)}
					close={() => setshowAddPostModal(false)}
					onUpdate={() => {}}
				/>
			)}
		</div>
	);
};

export default PostCreate;
