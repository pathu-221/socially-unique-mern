"use client";

import { newPost, savePost } from "@/apis/posts.api";
import { Post } from "@/interfaces/post.interface";
import type { ChangeEvent, FC, FormEvent } from "react";
import { useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import Modal from "@/components/ReactResponsiveModal";

interface PostEditModalProps {
	post?: Post;
	onUpdate: () => Promise<void>;
	close: Function;
}

const PostEditModal: FC<PostEditModalProps> = ({ post, onUpdate, close }) => {
	const [images, setImages] = useState<FileList | File[]>();
	console.log({ post });

	const [postFormValue, setPostFormValue] = useState({
		title: post?.title || "",
		content: post?.content || "",
		published: post ? post.published : true,
		picture: post?.picture,
	});
	const [saving, setSaving] = useState(false);

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setPostFormValue({
			...postFormValue,
			[e.target.name]: e.target.value,
		});
	};

	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImages(e.target.files);
		}
		console.log({ files: e.target.files });
	};

	const removeImage = (imageToRemove: File) => {
		if (!images) return;

		const newImages = Array.from(images).filter(
			(image) => image !== imageToRemove
		);
		setImages(newImages.length > 0 ? newImages : undefined);
	};

	const removeExistingImage = () => {
		setPostFormValue({
			...postFormValue,
			picture: undefined,
		});
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		if (postFormValue.picture) {
			formData.append("picture", JSON.stringify(post?.picture));
		}
		formData.append("content", postFormValue.content);
		formData.append(
			"published",
			JSON.stringify({ published: postFormValue.published })
		);
		if (images) {
			for (const image of images) {
				console.log({ image });
				formData.append("pictures", image);
			}
		}
		setSaving(true);
		const response = post
			? await savePost(formData, post._id)
			: await newPost("egample");

		console.log({ response });
		await onUpdate();
		setSaving(false);
		close();

		if (!response.status) return;
	};

	return (
		<form onSubmit={onSubmit} className="rounded-xl p-5">
			<p className="font-bold text-lg mb-3">
				{post ? "Edit post" : "Create a post"}
			</p>
			<div className="flex flex-col gap-3">
				<input
					disabled={post ? true : false}
					placeholder="An interesting title"
					value={postFormValue.title}
					onChange={onChange}
					name="title"
					className="input w-full input-bordered"
				/>
				<textarea
					rows={4}
					name="content"
					onChange={onChange}
					className="bg-dark-focus textarea textarea-bordered"
					value={postFormValue.content}
					placeholder="Text (optional)"
				/>
				<div className="flex flex-wrap max-w-full gap-2 pt-1">
					{postFormValue.picture && (
						<div className="indicator">
							<span
								className="indicator-item badge badge-primary rounded-full h-7 w-7 p-1 cursor-pointer hover:bg-blue-500"
								onClick={() => removeExistingImage()}
							>
								<RxCross1 />
							</span>
							<img
								className="w-[140px] h-20 rounded-lg height-auto"
								src={`${process.env.NEXT_PUBLIC_API_ADDRESS}/${postFormValue.picture[0]}`}
								alt={`Image ${post?.title}`}
							/>
						</div>
					)}
					{images &&
						Array.from(images).map((file, index) => (
							<div className="indicator" key={index}>
								<span
									className="indicator-item badge badge-primary rounded-full h-7 w-7 p-1 cursor-pointer hover:bg-blue-500"
									onClick={() => removeImage(file)}
								>
									<RxCross1 />
								</span>
								<img
									className="w-[140px] h-20 rounded-lg height-auto"
									src={URL.createObjectURL(file)}
									alt={`Image ${index}`}
								/>
							</div>
						))}
				</div>

				<div className="flex items-center justify-between">
					<label className="rounded-full cursor-pointer bg-dark-focus py-1 px-2 text-sm bg-opacity-40">
						<span className="flex items-center gap-2">
							<BsFillCameraFill size={15} />
							<p className="text-sm">Media</p>
						</span>
						<input
							//multiple={true}
							onChange={onFileChange}
							accept="image/*"
							type="file"
							className="hidden"
						/>
					</label>

					<label className="flex items-center gap-3">
						<p className="text-sm">Published: </p>
						<input
							name="published"
							type="checkbox"
							onChange={() =>
								setPostFormValue({
									...postFormValue,
									published: !postFormValue.published,
								})
							}
							className="toggle toggle-sm toggle-primary"
							checked={post ? postFormValue.published : true}
						/>
					</label>
				</div>
			</div>

			<div className="modal-action my-2">
				<button className="btn btn-sm btn-primary">
					{saving ? "Saving..." : "Save"}
				</button>
			</div>
		</form>
	);
};

export default PostEditModal;
