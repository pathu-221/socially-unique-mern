import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Post } from "@/interfaces/post";
import { useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Head from "next/head";
import Comments from "@/components/Comments";
import useUser from "@/Hooks/useUser";
import { useRouter } from "next/router";
import { getUsersPublicPost } from "@/apis/user";
import { User } from "@/interfaces/user";
import PostFeed from "@/components/PostFeed";

export const getServerSideProps: GetServerSideProps<{
	posts: Post[] | null;
	user: User;
}> = async ({ params, query }) => {
	let posts = null;
	let user = null;
	const currentUserId = Array.isArray(query?.currentUserId) ? query.currentUserId[0] : query?.currentUserId;

	if (params && params.userId) {
		if (typeof params.userId === "string") {
			const data = await getUsersPublicPost(params.userId, currentUserId);
			if (data && data.status === 1) {
				posts = data.data.posts;
				user = data.data.user;
			}
		}
	}

	return {
		props: {
			posts,
			user,
		},
	};
};

function Post({
	posts,
	user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	if (!posts) return <p>Oops something went wrong!</p>;

	const currentUser = useUser();
	const router = useRouter();

	useEffect(() => { 
		if (!router.query.currentUserId && currentUser && router.isReady) {
			router.replace({
				pathname: router.asPath,
				query: { currentUserId: currentUser._id },
			});
		} else {
			router.push(router.asPath);
		}
	}, [currentUser, router.isReady]);

	return (
		<main className="main-page items-center  flex justify-center">
			<Head>
				<title>{user.username}</title>
			</Head>
			<div className=" main-page-content flex flex-col gap-5 py-5">
				{/** user profile data */}
				<div className="flex gap-3 items-center justify-start">
					<img
						className="rounded-full w-12 h-12"
						src={user.photoUrl}
						alt={user.username}
					/>
					<span className="flex flex-col">
						<h2 className="card-title text-base">{user.username}</h2>
					</span>
				</div>

				<PostFeed posts={posts} />
			</div>
		</main>
	);
}

export default Post;
