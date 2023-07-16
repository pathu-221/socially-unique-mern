

import { getPosts } from "@/apis/posts.api";

export default async function Home() {
	const posts = await getPosts();
	return (
		<>

			<main className="h-screen bg-dark flex justify-center items-center">
				{/* {JSON.stringify(posts)} */}
				<div className="w-[60%] bg-dark-focus min-h-[500px] rounded-lg ">

				</div>
			</main>
		</>
	);
}

export const fetchCache = 'only-no-store'