import { getPosts } from "@/apis/posts.api";
import Navbar from "@/components/Navbar";





export default async function Home() {
	//const posts = await getPosts();
	sessionStorage.setItem('token', 'some value');

	return (
		<>
			<Navbar />

			<main className="h-screen bg-dark flex justify-center items-center">
				{/* {JSON.stringify(posts)} */}
				<div className="w-[60%] bg-dark-focus min-h-[500px] rounded-lg ">

				</div>
			</main>
		</>
	);
}
