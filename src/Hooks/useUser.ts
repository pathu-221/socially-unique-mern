import { getUser } from "@/apis/user";
import { User } from "@/interfaces/user";
import { useState, useEffect } from "react";

export function useUser() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');

        if(!token) return

        const data = await getUser(token);

        console.log('in use user', data)
        setUser(data.data);

        
    }

    return user;
}