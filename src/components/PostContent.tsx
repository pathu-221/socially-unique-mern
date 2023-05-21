

function PostContent() {
    return (
        <>
            <div className="card max-w-full bg-base-100 shadow-xl">
                <div className="card-body pb-3">
                    <div className="flex gap-3 items-center justify-start" >
                    <img className='rounded-full w-12 h-12' src="https://api.dicebear.com/6.x/fun-emoji/svg?seed=Kiki" />
                        <span className="flex flex-col gap-1">
                            <h2 className='card-title'>Hello There!</h2>
                            <h3>3 Dec 2022</h3>
                        </span>
                    </div>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
                <figure>
                    <img src="https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="unsplash" />
                </figure>
            </div>
        </>
    );
}

export default PostContent;