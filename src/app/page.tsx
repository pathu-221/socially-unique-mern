import { getPosts } from "@/apis/posts.api";
import PostContent from "@/components/PostContent";
import PostCreate from "@/components/PostCreate";
import { Post } from "@/interfaces/post.interface";

export default async function Home() {
	const data = await getPosts();

	if (!data || !data.status) return <div> Error </div>;

	const posts: Post[] = data.data;

	return (
		<main className="min-h-screen bg-dark flex flex-col items-center justify-center">
			<title>Welcome</title>
			<section className="flex flex-col gap-8 p-8 justify-center items-center w-[60%]">
				<PostCreate />
				{posts && posts.map((post) => <PostContent post={post} />)}
			</section>
		</main>
	);
}

export const fetchCache = "only-no-store";
