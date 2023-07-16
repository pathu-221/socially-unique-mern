import { getPosts } from "@/apis/posts";

export default async function Home() {
	const posts = await getPosts();

	return <main>{JSON.stringify(posts)}</main>;
}
