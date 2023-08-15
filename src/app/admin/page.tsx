"use client";

import { getUsersPost } from "@/apis/posts.api";
import { showToast } from "@/common/showToast";
import PostContent from "@/components/PostContent";
import PostEditModal from "@/components/PostEditModal";
import withAuth from "@/components/WithAuth";
import useUser from "@/hooks/useUser";
import { Post } from "@/interfaces/post.interface";
import { useSearchParams } from "next/navigation";
import type { FC } from "react";
import { useEffect, useState } from "react";
import Loading from "../loading";
import UsernameMoal from "@/components/UsernameModal";

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = ({}) => {
	const params = useSearchParams();
	const create = params.get("create");

	const [posts, setPosts] = useState<Post[]>();
	const { user } = useUser();
	const [isOpen, setIsOpen] = useState(create === "true" ? true : false);
	const [editPost, setEditPost] = useState<Post>();
	const [chooseUsernameModal, setChooseUsernameModal] = useState(false);

	useEffect(() => {
		loadPosts();
	}, []);

	const loadPosts = async () => {
		const data = await getUsersPost();
		if (!data.status) return showToast(data.msg, "error");
		setPosts(data.data);
	};

	if (!posts) return <Loading />;

	return (
		<main className="min-h-screen bg-dark flex flex-col items-center justify-start">
			<title>{user?.username}</title>
			<section className="flex flex-col gap-8 p-8 justify-center items-center w-[60%]">
				{!user?.username && (
					<>
						<div className="flex w-full items-center justify-center justify-self-start self-start bg-dark-focus p-4 rounded-2xl flex-col gap-4">
							<p className="text-2xl">You need to choose a username first!</p>
							<button
								onClick={() => setChooseUsernameModal(true)}
								className="btn btn-primary btn-sm"
							>
								Choose
							</button>
							<UsernameMoal
								isOpen={chooseUsernameModal}
								onClose={() => setChooseUsernameModal(false)}
							/>
						</div>
					</>
				)}
				{posts.length ? (
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
					))
				) : (
					<div className="flex w-full items-start justify-start justify-self-start self-start bg-dark-focus p-4 rounded-2xl">
						<h1 className="text-xl">You haven't posted yet</h1>
					</div>
				)}
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
