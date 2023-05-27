

function PostContent() {
    return (
        <>
            <div className="card max-w-full bg-base-100 shadow-xl max-h-[520px]">
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
                    <img className="w-full object-cover max-h-full" 
                    loading="lazy"
                    src="https://source.unsplash.com/random/?city,night" alt="unsplash" />
                </figure>
            </div>
        </>
    );
}

export default PostContent;