import { requestWithToken } from "./requestWithToken";

export async function getPosts(userId?: string) {
	try {
		const url = userId
			? `${process.env.NEXT_PUBLIC_API_ADDRESS}/posts/?userId=${userId}`
			: `${process.env.NEXT_PUBLIC_API_ADDRESS}/posts/`

		const res = await fetch(url);

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getPostbyId(id: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_ADDRESS}/posts/${id}`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
				},
			}
		);

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function newPost(title: string) {
	try {
		const data = await requestWithToken(
			`${process.env.NEXT_PUBLIC_API_ADDRESS}/posts`,
			{
				method: "POST",
				headers: {
					"content-type": "Application/json",
				},
				body: JSON.stringify({ title }),
			}
		);

		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function savePost(formData: any, postId: string) {
	try {
		const data = await requestWithToken(
			`${process.env.NEXT_PUBLIC_API_ADDRESS}/posts/${postId}`,
			{
				method: "PUT",
				body: formData,
			}
		);

		return data;
	} catch (error) {
		console.error(error);
	}
}
export async function deletePost(postId: string) {
	try {
		const data = await requestWithToken(
			`${process.env.NEXT_PUBLIC_API_ADDRESS}/posts/${postId}`,
			{
				method: "DELETE",
			}
		);

		return data;
	} catch (error) {
		console.error(error);
	}
}


export async function getUsersPost() {
	try {
		const data = await requestWithToken(
			`${process.env.NEXT_PUBLIC_API_ADDRESS}/posts/user`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
				},
			}
		);
		return data;
	} catch (error) {
		console.error(error);
	}
}
