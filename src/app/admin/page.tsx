"use client";

import { getUsersPost } from "@/apis/posts.api";
import PostContent from "@/components/PostContent";
import withAuth from "@/components/WithAuth";
import useUser from "@/hooks/useUser";
import { Post } from "@/interfaces/post.interface";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useState, useEffect } from "react";
import Loading from "../loading";

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = () => {
    const [posts, setPosts] = useState<Post[]>();
    const { user } = useUser();

	useEffect(() => {
		loadPosts();
	}, []);

	const loadPosts = async () => {
		const data = await getUsersPost();
		console.log({ data });
		if (!data.status) return alert(data.msg);
		setPosts(data.data);
    };
    
    if (!posts) return <Loading />
    
	return (
        <main className="min-h-screen bg-dark flex flex-col gap-8 p-8 justify-center items-center">
            <title>{ user?.username }</title>
            
			{posts && posts.map((post) => <PostContent isAdmin={ true} key={post._id} post={post} />)}
		</main>
	);
};

export default withAuth(AdminPage);
