import { Post } from "@/interfaces/post.interface";
import type { FC } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { BsChat, BsViewList } from "react-icons/bs";
import Link from "next/link";
import LightGallery from "./LightGallery";
import PostImage from "./PostImage";

interface PostContentProps {
	post: Post;
	isAdmin?: boolean;
	editPost?: Function;
}

const PostContent: FC<PostContentProps> = ({ post, isAdmin, editPost }) => {
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
		<div className="w-full p-4 card shadow-xl bg-dark-focus rounded-2xl flex flex-col gap-2  ">
			{/** card header */}
			<span className="flex gap-2.5 justify-between items-center max-w-full">
				<span className="flex gap-2.5 max-w-full">
					<Link href={`/user/${post.user._id}`}>
						<img
							className="h-10 w-10 rounded-full"
							src={post.user.photoUrl}
							alt={post.title}
						/>
					</Link>
					<span className="flex flex-col">
						<p className="font-semibold text-[15px]">{post.user.username}</p>
						<p className="text-[12px]">{uploadDate}</p>
					</span>
				</span>
				{isAdmin && editPost && (
					<span className="align-self-end ">
						{" "}
						<button
							onClick={() => editPost()}
							className="btn btn-link btn-ghost"
						>
							<MdModeEditOutline size={25} />
						</button>
					</span>
				)}
			</span>
			{/** post body */}
			<span className="text-[.9rem] py-4 gap-2 flex flex-col">
				<p>{post.title}</p>
				{post.picture && <PostImage images={post.picture} />}
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
