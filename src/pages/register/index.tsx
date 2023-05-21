import Link from "next/link";

function SignUpPage() {

    return (
        <main className="main-page items-center h-[calc(100vh-66px)]"  >
            <section className="items-center max-w-[40%] main-page-content bg-neutral-focus text-center">
            <h1 className="mb-5 text-3xl">Create Account</h1>
                <form className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                        <label className="label">
                            <span className="label-text text-lg">Display Name*: </span>
                        </label>
                        <input 
                        type='text' 
                        required
                        placeholder="John Doe" 
                        className="input input-bordered w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="label">
                            <span className="label-text text-lg">Email*: </span>
                        </label>
                        <input 
                        type='email' 
                        required
                        placeholder="JohnDoe@gmail.com" 
                        className="input input-bordered w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="label">
                            <span className="label-text text-lg">Profile Picture: </span>
                        </label>
                        <input 
                        type='file' 
                        required
                        accept=".jpeg, .jpg, .png"
                        placeholder="John Doe" 
                        className="file-input file-input-bordered w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="label">
                            <span className="label-text text-lg">Password*: </span>
                        </label>
                        <input 
                        required
                        type='password' 
                        placeholder="Your Password" 
                        className="input input-bordered w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="label">
                            <span className="label-text text-lg">Confirm Password*: </span>
                        </label>
                        <input 
                        required
                        type='password' 
                        placeholder="Your Password" 
                        className="input input-bordered w-full"
                        />
                    </div>
                    <span className="text-md ">
                        Already Have an Account?
                        <Link className="underline hover:no-underline" href="/login"> Login
                        </Link>
                    </span>
                    <button type='submit' className="btn btn-secondary">Create Account</button>
                </form>
            </section>
        </main>
    );
}

export default SignUpPage;