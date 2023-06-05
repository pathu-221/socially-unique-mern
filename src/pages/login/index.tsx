import { login } from "@/apis/auth";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/Hooks/useUser";
import Head from 'next/head';
import { showToast } from "@/common/toast";


function LoginPage() {

    const user = useUser();
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {
            setLoading(true);
            const data = await login(formData);
            setLoading(false);
            
            if(!data.status) return showToast('error', data.msg);

            showToast('success', data.msg);

            if (data.data.access_token) {
                localStorage.setItem('token', data.data.access_token);
                router.reload();
                router.push('/');
            }

        } catch (error) {

            console.error(error);
        }
    }

    useEffect(() => {
        if(user){
            router.push('/');
        }
    },[user])

    return (
        <main className="main-page items-center h-[calc(100vh-66px)]"  >
            <Head>
                <title>Login</title>
            </Head>
            <section className="items-center max-w-[40%] main-page-content bg-neutral-focus text-center">
                <h1 className="mb-5 text-3xl">Login</h1>
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <label className="label">
                            <span className="label-text text-xl">Email: </span>
                        </label>
                        <input 
                        required
                        type='email' 
                        name='email'
                        onChange={onChange}
                        placeholder="JohnDoe@gmail.com" 
                        className="input input-bordered w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="label">
                            <span className="label-text text-xl">Password: </span>
                        </label>
                        <input 
                        required
                        type='password' 
                        name='password'
                        onChange={onChange}
                        placeholder="Your Password" 
                        className="input input-bordered w-full"
                        />
                    </div>
                    <span className="text-md ">
                        Don't have an Account?
                        <Link className="underline hover:no-underline" href="/register"> Create Account
                        </Link>
                    </span>
                    <button 
                    disabled={loading}
                    type='submit' className="btn btn-secondary">
                        { loading ? 'Loading...' : 'Login' }
                    </button>
                </form>
            </section>
        </main>
    );
}

export default LoginPage;