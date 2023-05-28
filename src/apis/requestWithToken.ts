
export async function requestWithToken(url: string, options: RequestInit){

    const token = localStorage.getItem('token');
    if(!token ) return

    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'auth-token': token
        }
    });
    const data = await res.json();
    return data;
}