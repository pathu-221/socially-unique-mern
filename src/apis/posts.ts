import { Post } from "@/interfaces/post";

export async function getPosts(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/posts`);

        const data = await res.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export async function getPostsbyId(id: string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/posts/${id}`);

        const data = await res.json();
        
        return data;

    } catch (error) {
        console.error(error);
    }
}