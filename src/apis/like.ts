import { requestWithToken } from "./requestWithToken";


export async function likePost(postId: string) {
    try {

        const data = await requestWithToken(`${process.env.NEXT_PUBLIC_API_ADDRESS}/like/${ postId }`, {
            method: "PUT", 
        })

        return data;
    } catch (error) {
        console.error(error);
    }
}