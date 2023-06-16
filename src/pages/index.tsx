import PostFeed from "@/components/PostFeed"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getPosts } from "@/apis/posts";
import { Post } from "@/interfaces/post";
import { showToast } from "@/common/toast";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<{ posts: Post[] | null}> = async () => {

  let posts:Post[];

  try {
    
    const data = await getPosts();

    if (!data) throw new Error('Something went Wrong!');

    if(!data.status) throw new Error(data.msg);

    posts = data.data as Post[];

    return {
      props: {
        posts
      }
    }

  } catch (error) {
    console.error(error)

    return {
      props: {
        posts: null
      }
    }
  }
  
  
  
}


export default function Home({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if(!posts)
  return (
    <main className="main-page">
      <div className="main-page-content">
        <h1 className="text-3xl">Oops! Something Went Wrong</h1>
      </div>
    </main>
  )

  return (
    <>
    <main className="main-page">
      <Head>
        <title>Welcome</title>
      </Head>
      <div className="main-page-content">
        <PostFeed posts={posts} />
      </div>
    </main>
    </>
  )
}
