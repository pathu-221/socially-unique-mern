
export async function requestWithToken(url: string, options?: RequestInit){

    const token = localStorage.getItem('token');
    if(!token ) throw new Error('Token Not Available!')

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