import { getPostsbyId } from "@/apis/posts";
import Modal from "@/components/Modal";
import PostFeed from "@/components/PostFeed";
import { Post } from "@/interfaces/post";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{ posts: Post[] | null}> = async ({ params }) => {


    let posts =  null;

    if(params && params.id){
        const data = await getPostsbyId(params.id as string);

        if(data.status === 1){
            posts = data.data;
        }
    }

    console.log({ posts });

    return {
        props: {
            posts
        }
    }

}


function AdminPage({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
                        <input className="input input-bordered w-full"  placeholder="Title"/>
                        
                        <div className="self-end flex gap-4">
                            <label htmlFor="create-post-modal" className="btn btn-primary">close</label>
                            <label htmlFor="create-post-modal" className="btn btn-secondary">save</label>
                        </div>
                    </div>
               </Modal>
            </div>
        </div>
    );
}

export default AdminPage;