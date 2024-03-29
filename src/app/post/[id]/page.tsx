import { getPostbyId } from "@/apis/posts.api";
import Comments from "@/components/Comments/Comments";
import LikePost from "@/components/LikePost";
import PostImage from "@/components/PostImage";
import { Post } from "@/interfaces/post.interface";
import type { FC } from "react";
import type { Metadata } from "next";
import { getProfileImageUrl } from "@/common/getImageUrl";

interface PostPageProps {
	params: { id: string };
}

const PostPage: FC<PostPageProps> = async ({ params }) => {
	//const params = useSearchParams();
	const data = await getPostbyId(params.id);
	if (!data || !data.status)
		return (
			<div className="flex w-full items-start justify-start justify-self-start self-start bg-dark-focus p-4 rounded-2xl">
				<h1 className="text-xl">Something went wrong!</h1>
			</div>
		);

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
		<main className="flex xsm:h-screen xsm:w-screen md:main-page items-center justify-center p-4">
			<section className="w-full md:w-[60%] self-center p-2 lg:p-4 md:p-4 mt-[-60px] md:m-0 card shadow-xl bg-dark-focus min-h-[500px] rounded-2xl flex flex-col gap-2 ">
				{/** user profile */}
				<span className="flex gap-2.5 justify-between items-center max-w-full mb-3">
					<span className="flex gap-2.5 max-w-full">
						<img
							className="h-10 w-10 rounded-full"
							src={getProfileImageUrl(postContent.user.photoUrl)}
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
				<h1 className="text-2xl capitalize mb-2 font-monsterrat">
					{postContent.title}
				</h1>
				{postContent.picture && <PostImage images={postContent.picture} />}

				{/** post content */}
				{postContent.content && <p className="my-2">{postContent.content}</p>}
				<Comments postId={postContent._id} />
			</section>
		</main>
	);
};

export default PostPage;

export const fetchCache = "only-no-store";

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const data = await getPostbyId(params.id);
	const postData = data.data as Post;

	const picture = postData.picture
		? `${process.env.NEXT_PUBLIC_API_ADDRESS}/${postData?.picture[0]}`
		: "";

	return {
		// return your metadata here
		title: postData.title,
		twitter: {
			title: postData.title,
			description: postData.content || "",
			images: picture,
		},
		openGraph: {
			title: postData.title,
			description: postData.content || "",
			images: picture,
		},
	};
}
