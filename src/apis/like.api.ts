import { requestWithToken } from "./requestWithToken";

export async function getTotalLikes(postId: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_ADDRESS}/like/${postId}`,
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

export async function geLikedByUser(postId: string) {
	try {
		const res = await requestWithToken(
			`${process.env.NEXT_PUBLIC_API_ADDRESS}/like/${postId}/likedByUser`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
				},
			}
		);
		return res;
	} catch (error) {
		console.error(error);
	}
}

export async function likePost(postId: string) {
	try {
		const data = await requestWithToken(
			`${process.env.NEXT_PUBLIC_API_ADDRESS}/like/${postId}`,
			{
				method: "PUT",
			}
		);

		return data;
	} catch (error) {
		console.error(error);
	}
}
