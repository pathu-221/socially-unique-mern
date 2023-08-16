import { getPostbyId } from "@/apis/posts.api";
import Comments from "@/components/Comments/Comments";
import LikePost from "@/components/LikePost";
import { Post } from "@/interfaces/post.interface";
import type { FC } from "react";

interface PostPageProps {
	params: { id: string };
}

const PostPage: FC<PostPageProps> = async ({ params }) => {
	//const params = useSearchParams();
	const data = await getPostbyId(params.id);
	if (!data.status) return <div>{data.msg}</div>;

	const postContent = data.data as Post;
	const unformattedDate = new Date(postContent.createdAt);
	const uploadDate = Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}).format(unformattedDate);

	return (
		<main className="min-h-screen bg-dark flex flex-col gap-8 p-8 justify-center items-center">
			<title>{postContent.title}</title>
			<section className="w-[60%] p-5 card shadow-xl bg-dark-focus min-h-[500px] rounded-2xl flex flex-col gap-2 ">
				{/** user profile */}
				<span className="flex gap-2.5 justify-between items-center max-w-full mb-3">
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

					<LikePost postId={postContent._id} />
				</span>
				<h1 className="text-3xl capitalize mb-4 font-monsterrat">
					{postContent.title}
				</h1>
				{postContent.picture && (
					<figure className="mb-3">
						<img
							src={`${process.env.NEXT_PUBLIC_API_ADDRESS}/${postContent.picture}`}
							alt={postContent.title}
							className="w-full h-auto rounded-2xl"
						/>
					</figure>
				)}

				{/** post content */}
				{postContent.content && <p className="my-2">{postContent.content}</p>}
				<Comments postId={postContent._id} />
			</section>
		</main>
	);
};

export default PostPage;

export const fetchCache = "only-no-store";
