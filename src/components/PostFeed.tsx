import { Post } from "@/interfaces/post";
import PostContent from "./PostContent";
import { FC } from "react";

interface PostFeedProps {
    posts: Post[] | null
}

const PostFeed: FC<PostFeedProps> = ( { posts }) => {
    return ( 
    <>
    <div className="flex flex-col gap-3">
      {
        posts && posts.map(( post ) => (
            <PostContent key={post._id} post={post}/>
        ))
      }
    </div>
    </>
     );
}

export default PostFeed;