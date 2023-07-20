import { Post } from "@/interfaces/post.interface";
import type { FC } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { BsChat, BsViewList } from "react-icons/bs";
import Link from "next/link";

interface PostContentProps {
	post: Post;
	isAdmin?: boolean;
}

const PostContent: FC<PostContentProps> = ({ post, isAdmin }) => {
	const unformattedDate = new Date(post.createdAt);
	const uploadDate = Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}).format(unformattedDate);

	return (
		<div className="w-[60%] p-4 card shadow-xl bg-dark-focus min-h-[500px] rounded-2xl flex flex-col gap-2 ">
			{/** card header */}
			<span className="flex gap-2.5 justify-between items-center max-w-full">
				<span className="flex gap-2.5 max-w-full">
					<img
						className="h-10 w-10 rounded-full"
						src={post.user.photoUrl}
						alt={post.title}
					/>
					<span className="flex flex-col">
						<p className="font-semibold text-[15px]">{post.user.username}</p>
						<p className="text-[12px]">{uploadDate}</p>
					</span>
				</span>
				{isAdmin && (
					<span className="align-self-end mr-5">
						{" "}
						<Link
							className="btn btn-link btn-ghost"
							href={`/admin/${post._id}`}
						>
							<MdModeEditOutline size={25} />
						</Link>
					</span>
				)}
			</span>
			{/** post body */}
			<span className="text-[.9rem] py-4 gap-2 flex flex-col">
				<p>{post.content}</p>
				<img
					src={post.picture}
					alt={post.title}
					className="w-full h-auto rounded-2xl"
				/>
				{!isAdmin && (
					<div className="flex justify-between items-center w-full pt-3">
						<Link
							href={`/post/${post._id}`}
							className="flex self-start items-center gap-2"
						>
							<BsViewList size={20} />
							<p>View</p>
						</Link>
						<span className="flex gap-3 self-end items-center">
							<span className="flex gap-1 items-center">
								<AiOutlineHeart size={20} />
								<p>{post.likes}</p>
							</span>
							<span className="flex gap-1 items-center">
								<BsChat size={20} />
								<p>{post.comments}</p>
							</span>
						</span>
					</div>
				)}
			</span>
		</div>
	);
};

export default PostContent;
