import { Post } from "@/interfaces/post";
import PostContent from "./PostContent";
import { FC } from "react";

interface PostFeedProps {
  posts: Post[] | null,
  isAdmin?: boolean
}

const PostFeed: FC<PostFeedProps> = ( { posts, isAdmin }) => {
    return ( 
    <>
    <div className="flex flex-col gap-3">
      {
        posts && posts.map(( post ) => (
            <PostContent isAdmin={isAdmin} key={post._id} post={post}/>
        ))
      }
    </div>
    </>
     );
}

export default PostFeed;