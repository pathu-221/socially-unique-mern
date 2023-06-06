import { getPostsbyId, newPost } from "@/apis/posts";
import { showToast } from "@/common/toast";
import Modal from "@/components/Modal";
import PostFeed from "@/components/PostFeed";
import { Post } from "@/interfaces/post";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export const getServerSideProps: GetServerSideProps<{ posts: Post[] | null}> = async ({ params }) => {


    let posts =  null;

    if(params && params.id){
        const data = await getPostsbyId(params.id as string);

        if(data.status === 1){
            posts = data.data;
        }
    }


    return {
        props: {
            posts
        }
    }

}


function AdminPage({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {


    const [title, setTitle] = useState('');
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const savePost = async () => {

        console.log({ title });
        setSaving(true);
        const data = await newPost(title);

        if(!data.status) return showToast('error', data.msg);

        setTitle('');
        showToast('success', data.msg);

        setSaving(false);

        router.replace(router.asPath);

    }
    

    return (  
        <div className="main-page">
            <div className="main-page-content flex flex-col gap-3">
                <label htmlFor="create-post-modal" className="btn btn-secondary">
                    New Post
                </label>
               { posts && posts.length ?  
               <PostFeed posts={posts}/> : <h1>You Haven't Posted Yet</h1> }

               <Modal id="create-post-modal">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <h3 className="text-xl">Choose an interesting title</h3>
                        <input className="input input-bordered w-full"  placeholder="Title"
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value)}}
                        value={title}
                        />
                        
                        <div className="self-end flex gap-4">
                            <label htmlFor="create-post-modal" className="btn btn-primary">close</label>
                            <button className="btn btn-secondary" onClick={() => { savePost() } }>
                                { saving ? "Saving.." : "Save"}
                            </button>
                        </div>
                    </div>
               </Modal>
            </div>
        </div>
    );
}

export default AdminPage;