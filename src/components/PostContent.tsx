import { Post } from "@/interfaces/post";
import Link from "next/link";
import { FC } from "react";
import { MdModeEditOutline } from "react-icons/md";

interface PostContentProps {
    post: Post,
    isAdmin?: boolean
}

const PostContent: FC<PostContentProps> = ({ post, isAdmin }) => {
    const uploadDate = new Date(post.createdAt).toLocaleDateString('en-us',{
        weekday: "short",
        month: "short",
        day: "numeric",
    })
    
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
							{isAdmin && (
								<Link href={`/admin/${post._id}`}>
									<button className="btn btn-primary">
										<MdModeEditOutline size={20} />
									</button>
								</Link>
							)}
						</div>
						<h5 className="text-lg font-bold">{post.title}</h5>
					</div>
					{post.picture && (
						<figure>
							<img
								className="w-full aspect-auto max-h-[600px] object-contain max-w-full rounded-md"
								loading="lazy"
								src={post.picture}
								alt={post.title}
							/>
						</figure>
					)}
				</div>
			</>
		);
}

export default PostContent;