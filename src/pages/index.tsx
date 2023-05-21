import PostFeed from "@/components/PostFeed"

export default function Home() {
  return (
    <>
    <main className="flex items-center overflow-hidden justify-center">
      <div className="max-w-1/2 h-full bg-neutral-focus p-5 ">
        <PostFeed />
      </div>
    </main>
    </>
  )
}
