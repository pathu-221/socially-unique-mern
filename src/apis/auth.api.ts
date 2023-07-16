
export async function login(formData: { email: string, password: string }) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/auth/login`, {
        method: "POST",
        headers: { 
            'content-type': "application/json",
        },
        body: JSON.stringify(formData)
    });

    const data = await res.json();
    
    return data;
}


export async function logOut(){
    localStorage.clear();
}

export async function register(formData: any) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/auth/register`, {
            method: "POST",
            body: formData
        })
        
        const data = await res.json();
    
        return data;

    } catch (err){

        console.error(err);
    }
}