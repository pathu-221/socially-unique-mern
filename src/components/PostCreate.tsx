"use client";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { AiOutlinePlus } from 'react-icons/ai';


interface PostCreateProps {}

const PostCreate: FC<PostCreateProps> = () => {
	const { user } = useUser();
	const router = useRouter();

	if (!user) return null;

	return (
		<div className="flex items-center justify-between self-start p-4 rounded-2xl my-[-25px]">
			<button className="bg-primary text-white flex items-center px-4 py-2 rounded-lg">
				<AiOutlinePlus className="mr-2" />
				<p>Add Post</p>
			</button>
		</div>
	);
};

export default PostCreate;
