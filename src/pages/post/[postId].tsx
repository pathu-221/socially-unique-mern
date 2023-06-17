import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Post } from "@/interfaces/post";
import { getPostbyId } from "@/apis/posts";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<{
	post: Post | null;
}> = async ({ params }) => {
	let post = null;

	if (params && params.postId) {
		if (typeof params.postId === "string") {
			const data = await getPostbyId(params.postId);
			if (data.status === 1) {
				post = data.data;
			}
		}
	}

	return {
		props: {
			post,
		},
	};
};

function Post({
	post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	if (!post) return <p>Oops something went wrong!</p>;

	const uploadDate = new Date(post.createdAt).toLocaleDateString("en-us", {
		weekday: "short",
		month: "short",
		day: "numeric",
	});

	console.log({ post });
	return (
		<main className="main-page items-center  flex justify-center">
			<Head>
				<title>{post.title}</title>
			</Head>
			<div className=" main-page-content flex flex-col gap-5 py-5">
				{/** user profile data */}
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

				{/** post data */}
				<div className="flex flex-col gap-5">
					<h1 className="text-4xl capitalize">{post.title}</h1>
					<ReactMarkdown>{post.content}</ReactMarkdown>
					{post.picture && <img src={post.picture} />}
				</div>

				{/** comment section */}
                <div className="border-b pb-2 border-gray-400 flex items-start justify-between">Comments</div>
                <div className="flex flex-col gap-2">
                    <input
                        placeholder="Leave a comment!"
                        className="input input-bordered"
                    />
                </div>
			</div>
		</main>
	);
}

export default Post;
