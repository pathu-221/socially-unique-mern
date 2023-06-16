import useUser from "@/Hooks/useUser";
import { getUsersPost, newPost } from "@/apis/posts";
import { HiPlus } from "react-icons/hi";
import { showToast } from "@/common/toast";
import Modal from "@/components/Modal";
import PostFeed from "@/components/PostFeed";
import { Post } from "@/interfaces/post";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import UsernameForm from "@/components/UsernameForm";


export const getServerSideProps: GetServerSideProps<{
  posts: Post[] | null;
}> = async ({ params }) => {
  let posts = null;

  if (params && params.id) {
    const data = await getUsersPost();

    if (data.status === 1) {
      posts = data.data;
    }
  }

  return {
    props: {
      posts,
    },
  };
};

function AdminPage() {

  const {user, isLoading} = useUser();
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [posts, setPosts] = useState<Post[] | undefined>()

  const router = useRouter();
  const isCurrentUser = user && user._id;

  const savePost = async () => {

    setSaving(true);
    const data = await newPost(title);

    if (!data.status) return showToast("error", data.msg);

    setTitle("");
    showToast("success", data.msg);

    setSaving(false);

    router.replace(router.asPath);
  };

  useEffect(() => {

    if (user) fetchPosts();
    
  }, [user])

  const fetchPosts = async () => {
    const data = await getUsersPost();
    setPosts(data.data);
  }

 
  if (isCurrentUser && !user?.username) return <UsernameForm user={user} />;

  return (
		<div className="main-page">
			<div className="main-page-content flex flex-col gap-3">
				<div className="flex">
					{isCurrentUser && (
						<label
							htmlFor="create-post-modal"
							className="btn btn-secondary flex aspect-square text-white"
						>
							<HiPlus size={40} color="#fff" />
						</label>
					)}
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

export default AdminPage;
