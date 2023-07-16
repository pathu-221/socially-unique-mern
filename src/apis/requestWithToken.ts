
export async function requestWithToken(url: string, options?: RequestInit){

    const token = sessionStorage.getItem('token');
    if(!token ) return 

    const res = await fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            'authorization': `Bearer ${ token }`
        }
    });
    const data = await res.json();
    return data;
}