export async function getUser (token: string) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/auth/authenticate`, {
        method: "GET",
        headers: {
            'content-type': "application/json",
            'auth-token': token
        }
    });
    const data = await res.json();

    return data;

}