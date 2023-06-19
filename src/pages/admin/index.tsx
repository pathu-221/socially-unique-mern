import useUser from "@/Hooks/useUser";
import { getUsersPost, newPost } from "@/apis/posts";
import { AiOutlinePlus } from "react-icons/ai";
import { showToast } from "@/common/toast";
import Modal from "@/components/Modal";
import PostFeed from "@/components/PostFeed";
import { Post } from "@/interfaces/post";
import { ChangeEvent, useEffect, useState } from "react";
import UsernameForm from "@/components/UsernameForm";
import withAuth from "@/components/withAuth";
import Head from "next/head";

function AdminPage() {
	const user = useUser();
	const [title, setTitle] = useState("");
	const [saving, setSaving] = useState(false);
	const [posts, setPosts] = useState<Post[] | undefined>();

	const isCurrentUser = user && user._id;

	const savePost = async () => {
		setSaving(true);
		const data = await newPost(title);

		if (!data.status) return showToast("error", data.msg);

		setTitle("");
		showToast("success", data.msg);
		fetchPosts();
		setSaving(false);
		
	};

	useEffect(() => {
		if (user) fetchPosts();
	}, [user]);

	const fetchPosts = async () => {
		const data = await getUsersPost();
		setPosts(data.data);
	};

	if (isCurrentUser && !user?.username) return <UsernameForm user={user} />;

	return (
		<div className="main-page">
			<Head>
				<title>Manage Your Posts</title>
			</Head>
			<div className="main-page-content flex flex-col gap-3">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-semibold">Manage Your Posts</h1>
					<label
						htmlFor="create-post-modal"
						className="btn btn-secondary flex aspect-square text-white"
					>
						<AiOutlinePlus size={40} color="#fff" />
					</label>
				</div>

				{posts && posts.length ? (
					<PostFeed posts={posts} isAdmin />
				) : (
					<h1>You Haven't Posted Yet</h1>
				)}

				<Modal id="create-post-modal">
					<div className="flex flex-col items-center justify-center gap-5">
						<h3 className="text-xl">Choose an interesting title</h3>
						<input
							className="input input-bordered w-full"
							placeholder="Title"
							type="text"
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setTitle(e.target.value);
							}}
							value={title}
						/>

						<div className="self-end flex gap-4">
							<label htmlFor="create-post-modal" className="btn btn-primary">
								close
							</label>
							<button
								className="btn btn-secondary"
								onClick={() => {
									savePost();
								}}
							>
								{saving ? "Saving.." : "Save"}
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	);
}

export default withAuth(AdminPage);
