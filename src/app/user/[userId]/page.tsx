import { getUsersPublicPost } from "@/apis/user.api";
import PostContent from "@/components/PostContent";
import { Post } from "@/interfaces/post.interface";
import type { FC } from "react";

interface UserProfilePageProps {
	params: { userId: string };
}

interface ProfilePageUser {
	_id: string;
	photoUrl: string;
	username: string;
}

async function getUsersPost(userId: string) {
	const data = await getUsersPublicPost(userId);
	return data;
}

const UserProfilePage: FC<UserProfilePageProps> = async ({ params }) => {
	const response = await getUsersPost(params.userId);
	console.log([response]);

	if (!response || !response.status)
		return (
			<div className="flex w-full items-start justify-start justify-self-start self-start bg-dark-focus p-4 rounded-2xl">
				<h1 className="text-xl">Something went wrong!!</h1>
			</div>
		);

	const user: ProfilePageUser = response.data.user;
	const posts: Post[] = response.data.posts;

	return (
		<main className="main-page">
			<section className="mt-3 items-center justify-center flex flex-col gap-2 rounded-2xl ">
				<img
					className="h-16 w-16 rounded-full"
					src={user.photoUrl}
					alt="user"
				/>
				<h4 className="text-xl">@{user.username}</h4>
			</section>
			<section className="main-page-content">
				{posts && posts.map((post) => <PostContent post={post} />)}
			</section>
		</main>
	);
};

export default UserProfilePage;
