"use client";

import { getPostbyId } from "@/apis/posts.api";
import { Post } from "@/interfaces/post.interface";
import { useState, useEffect, type FC } from "react";
import { RxCross1 } from "react-icons/rx";

interface AdminPostEditPageProps {
	params: { id: string };
}

const AdminPostEditPage: FC<AdminPostEditPageProps> = async ({ params }) => {
	const [postContent, setPostContent] = useState<Post>();

	useEffect(() => {
		getPostContent(params.id);
	}, []);

	const getPostContent = async (postId: string) => {
		const data = await getPostbyId(postId);
		if (!data.status) return;
		console.log(data);

		setPostContent(data.data[0]);
		return data.data;
	};

	if (!postContent) return <div>Loading...</div>;
	return (
		<main className="min-h-screen bg-dark flex flex-col gap-8 p-8 justify-center items-center">
			<section className="w-[60%] p-4 card shadow-xl bg-dark-focus min-h-[500px] rounded-2xl flex flex-col gap-2 ">
				<h1 className="text-2xl">Edit your post</h1>
				<div className="flex flex-col gap-1">
					<label className="text-xl" htmlFor="title">
						Title:{" "}
					</label>
					<input
						className="input input-bordered"
						value={postContent.title}
						disabled
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xl" htmlFor="title">
						Content:{" "}
					</label>
					<textarea
						className="textarea textarea-bordered"
						defaultValue={postContent.content}
						rows={5}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-xl" htmlFor="title">
						Picture:{" "}
					</label>
					<input type="file" className="file-input file-input-bordered" />
					{postContent.picture && (
						<div className="indicator max-w-full">
							<button className="indicator-item badge badge-primary h-8 w-8 rounded-full">
								<RxCross1 size={25} />
							</button>
							<img
								src={postContent.picture}
								alt={postContent.title}
								className="grid place-items-center w-full h-auto rounded-2xl"
							/>
						</div>
					)}
					<div className="flex justify-between items-center w-full py-2 gap-1">
						<label className="text-xl" htmlFor="title">
							Published:{" "}
						</label>
						<input
							className="toggle toggle-primary"
							type="checkbox"
							defaultChecked={postContent.published}
						/>
                    </div>
                    <button className="btn btn-primary text-white">Save</button>
				</div>
			</section>
		</main>
	);
};

export default AdminPostEditPage;
