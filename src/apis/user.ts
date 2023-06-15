import { requestWithToken } from "./requestWithToken";

export async function getUser (token: string) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/auth/authenticate`, {
        method: "GET",
        headers: {
            'content-type': "application/json",
            'authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();

    return data;

}

export async function checkUsernameAvailability(username: string) {
    const data = await requestWithToken(`${process.env.NEXT_PUBLIC_API_ADDRESS}/user/username/${username}`);
    return data;
}