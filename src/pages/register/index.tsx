import { register } from "@/apis/auth";
import Link from "next/link";
import { ChangeEvent, FormEvent, useRef, useState } from "react";


interface formFields {

    displayName: string;
    email: string;
    profile?: any | null;
    password: string;
    confirmPassword: string
}

function SignUpPage() {

    const formRef = useRef(null);
    const [formData, setFormData] = useState<formFields>({
        displayName: '', email: '', password: '', confirmPassword: '' 
    });


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            setFormData({
                ...formData,
                profile: e.target.files[0]
            });
        }
    
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData()
        form.append('displayName', formData.displayName);
        form.append('email', formData.email);
        form.append('profile', formData.profile);
        form.append('password', formData.password);

        const data = await register(form);
    } 
    return (
        <main className="main-page items-center h-[calc(100vh-66px)]"  >
            <section className="items-center max-w-[40%] main-page-content bg-neutral-focus text-center">
            <h1 className="mb-5 text-3xl">Create Account</h1>
                <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                        <label className="label">
                            <span className="label-text text-lg">Display Name*: </span>
                        </label>
                        <input 
                        type='text' 
                        name="displayName"
                        onChange={onChange}
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
                        name="email"
                        onChange={onChange}
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
                        onChange={handleFileChange}
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
                        name="password"
                        onChange={onChange}
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
                        name="confirmPassword"
                        onChange={onChange}
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