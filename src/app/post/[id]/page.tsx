import { getPostbyId } from "@/apis/posts.api";
import Comments from "@/components/Comments";
import LikePost from "@/components/LikePost";
import { Post } from "@/interfaces/post.interface";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";
import Loading from "./loading";

interface PostPageProps {
	params: { id: string };
}

const PostPage: FC<PostPageProps> = async ({ params }) => {
	//const params = useSearchParams();
	const data = await getPostbyId(params.id);
	if (!data.status) return <div>{data.msg}</div>;

	const postContent = data.data[0] as Post;
	const unformattedDate = new Date(postContent.createdAt);
	const uploadDate = Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}).format(unformattedDate);

	console.log(postContent);

	return (
		<main className="min-h-screen bg-dark flex flex-col gap-8 p-8 justify-center items-center">
			<title>{postContent.title}</title>
			<section className="w-[60%] p-4 card shadow-xl bg-dark-focus min-h-[500px] rounded-2xl flex flex-col gap-2 ">
				{/** user profile */}
				<span className="flex gap-2.5 justify-between items-center max-w-full">
					<span className="flex gap-2.5 max-w-full">
						<img
							className="h-10 w-10 rounded-full"
							src={postContent.user.photoUrl}
							alt={postContent.title}
						/>
						<span className="flex flex-col">
							<p className="font-semibold text-[15px]">
								{postContent.user.username}
							</p>
							<p className="text-[12px]">{uploadDate}</p>
						</span>
					</span>
					<span className="mr-5 cursor-pointer flex flex-col gap-0 pt-4 items-center justify-center">
						<LikePost />
						{ postContent.likes }
					</span>
				</span>
				{/** post title */}
				<h1 className="text-xl capitalize my-3">{postContent.title}</h1>
				<figure>
					<img
						src={postContent.picture}
						alt={postContent.title}
						className="w-full h-auto rounded-2xl"
					/>
				</figure>
				<p className="my-2">{postContent.content}</p>
				<div className="border-b pb-2 border-gray-400 flex items-start justify-between mt-5">
					{`${postContent.comments} Comments`}
				</div>
				<Comments postId={postContent._id} />
			</section>
		</main>
	);
};

export default PostPage;

export const fetchCache = "only-no-store";
