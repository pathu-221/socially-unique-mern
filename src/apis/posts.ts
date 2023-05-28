import { Post } from "@/interfaces/post";

export async function getPosts(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/posts`);
        const data = await res.json();
        console.log({data});
        return data;

    } catch (error) {
        console.error(error);
        
    }
}