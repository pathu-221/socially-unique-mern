"use client";

import { Post } from "@/interfaces/post.interface";
import { useState } from "react";
import type { ChangeEvent, FC } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

interface PostEditModalProps {
	post?: Post;
}

const PostEditModal: FC<PostEditModalProps> = ({ post }) => {
	const [images, setImages] = useState<FileList | File[]>();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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

	return (
		<>
			<input
				type="checkbox"
				id={post?._id || "create-post"}
				className="modal-toggle"
			/>
			<div className="modal">
				<div className="modal-box w-[">
					<p className="font-bold text-lg mb-3">
						{post ? "Edit post" : "Create a post"}
					</p>
					<div className="flex flex-col gap-3">
						<input
							disabled={post ? true : false}
							placeholder="An interesting title"
							defaultValue={post?.title}
							className="input w-full input-bordered"
						/>
						<textarea
							rows={4}
							className="bg-dark-focus textarea textarea-bordered"
							value={post?.content}
							defaultValue={post?.content}
							placeholder="Text (optional)"
						/>
						{images && (
							<div className="flex flex-wrap max-w-full gap-2 pt-2">
								{Array.from(images).map((file, index) => (
									<div className="indicator" key={index}>
										<span
											className="indicator-item badge badge-primary rounded-full h-7 w-7 p-1 cursor-pointer hover:bg-blue-500"
											onClick={() => removeImage(file)}
										>
											<RxCross1 />
										</span>
										<img
											className="w-[140px] rounded-lg height-auto"
											src={URL.createObjectURL(file)}
											alt={`Image ${index}`}
										/>
									</div>
								))}
							</div>
						)}
						<div className="flex items-center justify-between">
							<label className="rounded-full cursor-pointer bg-dark py-1 px-2 text-sm ">
								<span className="flex items-center gap-2">
									<BsFillCameraFill size={15} />
									<p className="text-sm">Media</p>
								</span>
								<input
									multiple={true}
									onChange={onChange}
									accept="image/*"
									type="file"
									className="hidden"
								/>
							</label>

							<label className="flex items-center gap-3">
								<p className="text-sm">Published: </p>
								<input
									type="checkbox"
									className="toggle toggle-sm toggle-primary"
									checked={true}
								/>
							</label>
						</div>
					</div>

					<div className="modal-action my-2">
						<label
							htmlFor={post?._id || "create-post"}
							className="btn btn-sm "
							onClick={() => setImages(undefined)}
						>
							Close!
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostEditModal;
