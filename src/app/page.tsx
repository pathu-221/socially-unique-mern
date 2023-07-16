

import { getPosts } from "@/apis/posts.api";
import PostContent from "@/components/PostContent";
import { Post } from "@/interfaces/post.interface";
import Head from "next/head";

export default async function Home() {
	
	const data = await getPosts();

	if (!data.status) return <div> Error </div>
	
	const posts: Post[] = data.data;

	return (
		<>
			<main className="min-h-screen bg-dark flex flex-col gap-8 p-8 justify-center items-center">
				<Head>
					<title>Welcome</title>
				</Head>
				{posts && posts.map((post) => <PostContent post={post} />)}
			</main>
		</>
	);
}

export const fetchCache = 'only-no-store'