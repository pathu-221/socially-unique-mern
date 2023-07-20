import { getPostbyId } from "@/apis/posts.api";
import { Post } from "@/interfaces/post.interface";
import { useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";

interface PostPageProps {
	params: { id: string };
}

const PostPage: FC<PostPageProps> = async ({ params }) => {
	//const params = useSearchParams();
	const data = await getPostbyId(params.id);
	console.log({ params, data });

	if (!data.status) return <div>{data.msg}</div>;
	const postContent: Post = data.data;
	return (
		<main className="min-h-screen bg-dark flex flex-col gap-8 p-8 justify-center items-center">
			<section className="w-[60%] p-4 card shadow-xl bg-dark-focus min-h-[500px] rounded-2xl flex flex-col gap-2 "></section>
		</main>
	);
};

export default PostPage;
