"use client";

import useUser from "@/hooks/useUser";
import type { FC } from "react";
import { AiOutlineHeart } from "react-icons/ai";

interface LikePostProps {}

const LikePost: FC<LikePostProps> = () => {
	const user = useUser().user;

	return (
        <span>
            <AiOutlineHeart size={25}/>
        </span>
	);
};

export default LikePost;
