"use client";

import { login } from "@/apis/auth.api";
import { showToast } from "@/common/showToast";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { Metadata } from 'next';

function LoginPage() {
	const { user } = useUser();
	const router = useRouter();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);
			const data = await login(formData);
			setLoading(false);

			if (!data.status) return showToast(data.msg, "error");

			showToast(data.msg, "success");

			if (data.data.access_token) {
				localStorage.setItem("token", data.data.access_token);
				//router.push("/");
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (user) {
			router.push("/");
		}
	}, [user]);

	return (
		<main className="main-page gap-8 p-2 justify-center items-center md:p-8">
			<section className="login-register">
				<h1 className="mb-3 text-3xl">Login</h1>
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
		</main>
	);
}

export default LoginPage;

export const metadata: Metadata = { title: "Login"}