import { requestWithToken } from "./requestWithToken";


export async function getComments(postId: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/comments/${postId}`);

        const data = await res.json();
        return data;
        
    } catch (error) {
        console.error(error);
    }
}

export async function postComment(postId: string, formData: any) {
	try {
		const data = await requestWithToken(
            `${process.env.NEXT_PUBLIC_API_ADDRESS}/comments/${postId}`,
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
		);
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function editComment(commentId: string, formData: any) {
	try {
		const data = await requestWithToken(
            `${process.env.NEXT_PUBLIC_API_ADDRESS}/comments/${commentId}`,
            {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
		);
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteComment(commentId: string) {
	try {
		const data = await requestWithToken(
			`${process.env.NEXT_PUBLIC_API_ADDRESS}/comments/${commentId}`,
			{
				method: "DELETE",
				headers: {
					"content-type": "application/json",
				},
			}
		);
		return data;
	} catch (error) {
		console.error(error);
	}
}