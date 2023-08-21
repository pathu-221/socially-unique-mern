import { getPosts } from "@/apis/posts.api";
import PostContent from "@/components/PostContent";
import PostCreate from "@/components/PostCreate";
import { Post } from "@/interfaces/post.interface";
import { Metadata } from "next";
import Loading from "./loading";

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
		<main className="main-page">
			<section className="main-page-content">
				<PostCreate />
				{posts ? (
					posts.map((post) => <PostContent key={post._id} post={post} />)
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
	title: "Welcome",
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
