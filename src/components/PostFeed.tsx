import PostContent from "./PostContent";


function PostFeed() {
    return ( 
    <>
    <div className="flex flex-col gap-3">
        <PostContent />
        <PostContent />
        <PostContent />
    </div>
    </>
     );
}

export default PostFeed;