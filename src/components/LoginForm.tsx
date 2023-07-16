'use client';

import type { FC, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

interface LoginFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	loading: boolean
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit, onChange, loading }) => {
    
    return (
        <section className="w-[60%] p-4 card shadow-xl bg-dark-focus rounded-2xl flex flex-col gap-2 ">
			<h1 className="mb-5 text-3xl">Login</h1>
			<form onSubmit={onSubmit} className="flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<label className="label">
						<span className="label-text text-xl">Email: </span>
					</label>
					<input
						required
						type="email"
						name="email"
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
						type="password"
						name="password"
						onChange={onChange}
						placeholder="Your Password"
						className="input input-bordered w-full"
					/>
				</div>
				<span className="text-md ">
					Don't have an Account?
					<Link className="underline hover:no-underline" href="/register">
						{" "}
						Create Account
					</Link>
				</span>
				<button disabled={loading} type="submit" className="btn btn-primary">
					{loading ? "Loading..." : "Login"}
				</button>
			</form>
		</section>
    );
}

export default LoginForm;
