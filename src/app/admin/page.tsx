"use client";

import { getUsersPost } from "@/apis/posts.api";
import PostContent from "@/components/PostContent";
import PostEditModal from "@/components/PostEditModal";
import withAuth from "@/components/WithAuth";
import useUser from "@/hooks/useUser";
import { Post } from "@/interfaces/post.interface";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Loading from "../loading";
import { useSearchParams } from "next/navigation";

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = ({}) => {
	const params = useSearchParams();
	const create = params.get("create");

	const [posts, setPosts] = useState<Post[]>();
	const { user } = useUser();
	const [isOpen, setIsOpen] = useState(create === "true" ? true : false);
	const [editPost, setEditPost] = useState<Post>();

	useEffect(() => {
		loadPosts();
	}, []);

	const loadPosts = async () => {
		const data = await getUsersPost();
		if (!data.status) return alert(data.msg);
		setPosts(data.data);
	};

	if (!posts) return <Loading />;

	return (
		<main className="min-h-screen bg-dark flex flex-col items-center justify-center">
			<title>{user?.username}</title>
			<section className="flex flex-col gap-8 p-8 justify-center items-center w-[60%]">
				{posts &&
					posts.map((post) => (
						<PostContent
							editPost={() => {
								setEditPost(post);
								setIsOpen(true);
							}}
							isAdmin={true}
							key={post._id}
							post={post}
						/>
					))}
			</section>
			{isOpen && (
				<PostEditModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					close={() => setIsOpen(false)}
					onUpdate={loadPosts}
					post={editPost}
				/>
			)}
		</main>
	);
};

export default withAuth(AdminPage);
export const fetchCache = "only-no-store";
