import { Post } from "@/interfaces/post";
import Link from "next/link";
import { FC } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FcLike } from 'react-icons/fc';
import { CiViewTimeline } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { likePost } from "@/apis/like";
import { useRouter } from "next/router";

interface PostContentProps {
	post: Post;
	isAdmin?: boolean;
}

const PostContent: FC<PostContentProps> = ({ post, isAdmin }) => {
	const router = useRouter();
	const uploadDate = new Date(post.createdAt).toLocaleDateString("en-us", {
		weekday: "short",
		month: "short",
		day: "numeric",
	});

	return (
		<>
			<div className="card max-w-full bg-base-100 shadow-xl">
				<div className="card-body p-3 pb-3">
					<div className="flex justify-between  gap-3 items-center">
						<div className="flex gap-3 items-center justify-start">
							<img
								className="rounded-full w-12 h-12"
								src={post.user.photoUrl}
								alt={post.user.username}
							/>
							<span className="flex flex-col">
								<h2 className="card-title text-base">{post.user.username}</h2>
								<h3 className="text-base">{uploadDate}</h3>
							</span>
						</div>
						{isAdmin ? (
							<Link href={`/admin/${post._id}`}>
								<button className="btn btn-primary">
									<MdModeEditOutline size={20} />
								</button>
							</Link>
						) : (
							<span
								className="mr-5 cursor-pointer flex flex-col gap-0 pt-4 items-center justify-center"
								onClick={async () => {
									await likePost(post._id);
									router.replace(router.asPath, undefined, { scroll: false });
								}}
							>
								{ post.likedByUser ? <FcLike size={24} />: <AiOutlineHeart size={24}/>}
								<p>{post.likes}</p>
							</span>
						)}
					</div>
					<h5 className="text-lg font-bold">{post.title}</h5>
				</div>
				{post.picture && (
					<figure>
						<img
							className="w-full aspect-auto max-h-[600px] object-contain max-w-full rounded-t-md"
							loading="lazy"
							src={post.picture}
							alt={post.title}
						/>
					</figure>
				)}
				<div className="flex justify-between items-center border-t border-gray-400">
					<Link
						className="flex cursor-pointer flex-1 justify-center items-center gap-2 hover:bg-neutral-focus py-3"
						href={`post/${post._id}`}
					>
						<CiViewTimeline />
						View
					</Link>
					<div className="flex flex-1 cursor-pointer justify-center gap-2 items-center hover:bg-neutral-focus py-3">
						<IoIosShareAlt />
						Share
					</div>
				</div>
			</div>
		</>
	);
};

export default PostContent;
