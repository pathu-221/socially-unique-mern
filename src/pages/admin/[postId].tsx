import { getPostbyId } from '@/apis/posts';
import { showToast } from '@/common/toast';
import { Post } from '@/interfaces/post';
import { useRouter } from 'next/router';
import { useEffect, type FC, useState } from 'react';

interface AdminPostEditProps {}

const AdminPostEdit: FC<AdminPostEditProps> = () => {
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (!postId) router.replace('/');

        fetchPost(postId as string);
    }, []);


    const fetchPost = async (postId: string) => {

        const data = await getPostbyId(postId);        
        if (!data.status) showToast('error', data.msg)
        
        showToast('success', data.msg);

        setPost(data.data);


    }

    if(!post) return <p>Loading...</p>

    return (
			<main className="main-page">
				<div className="main-page-content flex flex-col gap-3">
					<input className="input input-bordered" disabled value={post.title} />
					<textarea
						value={post.content}
						className="textarea textarea-bordered h-32"
						placeholder="Content"
					/>
					<img src={post.picture} />
				</div>
			</main>
		);
}

export default AdminPostEdit;
