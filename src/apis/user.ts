import { requestWithToken } from "./requestWithToken";

export async function getUser() {
	const data = await requestWithToken(
		`${process.env.NEXT_PUBLIC_API_ADDRESS}/auth/authenticate`,
		{
			method: "GET",
			headers: {
				"content-type": "application/json",
			},
		}
	);

	return data;
}

export async function checkUsernameAvailability(username: string) {
	const data = await requestWithToken(
		`${process.env.NEXT_PUBLIC_API_ADDRESS}/user/username/${username}`
	);
	return data;
}

export async function saveUsername(username: string) {
	const data = await requestWithToken(
		`${process.env.NEXT_PUBLIC_API_ADDRESS}/user/username`,
		{
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ username }),
		}
	);

	return data;
}
