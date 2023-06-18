import PostFeed from "@/components/PostFeed"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getPosts } from "@/apis/posts";
import { Post } from "@/interfaces/post";
import Head from "next/head";
import useUser from "@/Hooks/useUser";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{ posts: Post[] | null}> = async ({ query }) => {

  let posts: Post[];
  const userId = Array.isArray(query?.userId) ? query.userId[0] : query?.userId;
  
  try {

    const data = await getPosts(userId);

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


  const router = useRouter();
  const user = useUser();


  useEffect(() => {

    if (!router.query.userId && user && router.isReady) {
      router.replace({
        pathname: '/',
        query: { userId: user._id }
      })
    } else if (!user) {
      router.push('/')
    }

  }, [user]);

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
