import PostFeed from "@/components/PostFeed"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getPosts } from "@/apis/posts";
import { Post } from "@/interfaces/post";
import { showToast } from "@/common/toast";

export const getServerSideProps: GetServerSideProps<{ posts: Post[] | null}> = async () => {
  const data = await getPosts();
  let posts = null;
  if(data){
     posts = data.data as Post[]
  }

  console.log({posts});
  return {
    props: {
      posts
    }
  }
}


export default function Home({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
    <main className="main-page">
      <div className="main-page-content">
        <PostFeed posts={posts} />
      </div>
    </main>
    </>
  )
}
