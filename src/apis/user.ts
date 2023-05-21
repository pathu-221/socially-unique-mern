export async function getUser (token:string) {

    const res = await fetch(`${process.env.API_ADDRESS}/auth/authenticate`);
    const data = await res.json();

    return data;

}