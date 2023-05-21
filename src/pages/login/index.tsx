import Link from "next/link";

function LoginPage() {
    return (
        <main className="main-page items-center h-[calc(100vh-66px)]"  >
            <section className="items-center max-w-[40%] main-page-content bg-neutral-focus text-center">
                <h1 className="mb-5 text-3xl">Login</h1>
                <form className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <label className="label">
                            <span className="label-text text-xl">Email: </span>
                        </label>
                        <input 
                        type='email' 
                        placeholder="JohnDoe@gmail.com" 
                        className="input input-bordered w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="label">
                            <span className="label-text text-xl">Password: </span>
                        </label>
                        <input 
                        type='password' 
                        placeholder="Your Password" 
                        className="input input-bordered w-full"
                        />
                    </div>
                    <span className="text-md ">
                        Don't have an Account?
                        <Link className="underline hover:no-underline" href="/register"> Create Account
                        </Link>
                    </span>
                    <button type='submit' className="btn btn-secondary">Login</button>
                </form>
            </section>
        </main>
    );
}

export default LoginPage;