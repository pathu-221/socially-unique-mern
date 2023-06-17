import { getPostbyId, savePost } from "@/apis/posts";
import { showToast } from "@/common/toast";
import { Post } from "@/interfaces/post";
import { useRouter } from "next/router";
import { useEffect, type FC, useState, ChangeEvent, FormEvent } from "react";
import { RxCross1 } from "react-icons/rx";

interface PostEditForm {
	_id: string,
	title: string;
	content: string;
	picture: any;
	published: boolean;
}

interface AdminPostEditProps {}

const AdminPostEdit: FC<AdminPostEditProps> = () => {
	const router = useRouter();

	const postId = router.query.postId;
	const [saving, setSaving] = useState(false);
	const [pictures, setPictures] = useState<File | null>(null);

	const [post, setPost] = useState<PostEditForm>({
		_id: '',
		title: "",
		content: "",
		picture: "",
		published: false,
	});

	useEffect(() => {
		if (router.isReady) {
			if (!postId) router.replace("/");

			if (typeof postId === "string") {
				fetchPost(postId);
			}
		}
	}, [router.isReady]);

	const fetchPost = async (postId: string) => {
		const data = await getPostbyId(postId);
		const postData = data.data as Post;
		if (!data.status) showToast("error", data.msg);

		showToast("success", data.msg);
		setPost({
			_id: postData._id,
			title: postData.title,
			content: postData.content,
			picture: postData.picture,
			published: postData.published,
		});
	};

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setPost({
			...post,
			[e.target.name]: e.target.value,
		});
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setPost({
				...post,
				picture: URL.createObjectURL(e.target.files[0]),
			});

			setPictures(e.target.files[0]);
		}
	};

	const handleImageDelete = () => {
		setPost({ ...post, picture: null });
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const form = new FormData();
		form.append("content", post.content);
		form.append("published", JSON.stringify({ published: post.published }));
		
		if (pictures) {
			form.append('picture', pictures);
		}
		setSaving(true);
		const data = await savePost(form, post._id);
		setSaving(false);

		console.log({ data })

		if (!data.status) showToast("error", data.msg);
		else showToast("success", data.msg);
	};

	if (!post) return <p>Loading...</p>;

	return (
		<main className="main-page">
			<form
				className="main-page-content flex flex-col gap-3"
				onSubmit={onSubmit}
			>
				<h1 className="text-2xl">Edit Your Post: </h1>
				<div className="flex flex-col gap-2">
					<label className="text-xl" htmlFor="title">
						Title:{" "}
					</label>
					<input
						className="input input-bordered"
						disabled
						name="title"
						value={post.title}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-xl" htmlFor="title">
						Content:{" "}
					</label>
					<textarea
						value={post.content}
						name="content"
						onChange={onChange}
						className="textarea textarea-bordered h-32"
						placeholder="Content"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-xl" htmlFor="title">
						Choose a picture:{" "}
					</label>
					<input
						onChange={handleImageChange}
						type="file"
						key={post.picture}
						accept="image/jpg, image/png, image/jpeg"
						className="file-input w-full file-input-bordered"
					/>
				</div>
				{post.picture && (
					<div className="indicator max-w-full">
						<span className="indicator-item">
							<button
								onClick={handleImageDelete}
								className="rounded-full btn btn-secondary"
							>
								<RxCross1 />
							</button>
						</span>
						<div className="flex flex-col gap-5">
							<img className="max-w-100" src={post.picture} alt={post.title} />
						</div>
					</div>
				)}
				<div className="flex flex-col gap-2">
					<label className="cursor-pointer label">
						<span className="label-text text-lg">Publish</span>
						<input
							onChange={() => setPost({ ...post, published: !post.published })}
							type="checkbox"
							className="toggle toggle-secondary"
							checked={post.published}
						/>
					</label>
				</div>
				<button
					disabled={saving}
					type="submit" className="btn btn-secondary">
					{
						saving ? 'Saving...' : 'Save'
					}
				</button>
			</form>
		</main>
	);
};

export default AdminPostEdit;
