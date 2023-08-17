import { getPosts } from "@/apis/posts.api";
import PostContent from "@/components/PostContent";
import PostCreate from "@/components/PostCreate";
import { Post } from "@/interfaces/post.interface";
import { Metadata } from "next";

export default async function Home() {
	const data = await getPosts();

	if (!data || !data.status)
		return (
			<div className="flex w-full items-start justify-start justify-self-start self-start bg-dark-focus p-4 rounded-2xl">
				<h1 className="text-xl">Something went wrong!</h1>
			</div>
		);

	const posts: Post[] = data.data;

	return (
		<main className="min-h-screen bg-dark flex flex-col items-center justify-start">
			<title>Welcome</title>
			<meta
				name="description"
				content="Welcome to Our Social Network - Connect with Friends, Share Photos, and More!"
			/>
			<meta
				name="keywords"
				content="social network, friends, connect, photos, community"
			/>
			<meta name="author" content="Pratham Aggarwal" />
			<meta property="og:title" content="Socially unique" />
			<meta
				property="og:description"
				content="Connect with friends, share photos, and stay updated on what matters to you. Join our community now!"
			/>

			<section className="flex flex-col gap-8 p-8 justify-center items-center w-[60%]">
				<PostCreate />
				{posts ? (
					posts.map((post) => <PostContent post={post} />)
				) : (
					<div className="flex w-full items-start justify-start justify-self-start self-start bg-dark-focus p-4 rounded-2xl">
						<h1 className="text-xl">Sorry, no posts to show</h1>
					</div>
				)}
			</section>
		</main>
	);
}

export const fetchCache = "only-no-store";

export const metadata: Metadata = {
	twitter: {
		title: "Socially Unique",
		description:
			"Welcome to Our Social Network - Connect with Friends, Share Photos, and More!",
	},
	openGraph: {
		title: "Socially Unique",
		description:
			"Welcome to Our Social Network - Connect with Friends, Share Photos, and More!",
	},
};
