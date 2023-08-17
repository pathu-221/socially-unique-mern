"use client";

import { login } from "@/apis/auth.api";
import { showToast } from "@/common/showToast";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { Metadata } from "next";

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
		<main className="relative p-3 flex flex-col items-center justify-center h-screen overflow-hidden">
			<section className="w-full m-3 md:m-2 p-6 bg-dark-focus text-white border-t-4 border-primary rounded-2xl shadow-md border-top lg:max-w-lg">
				<h1 className="text-3xl font-semibold text-center text-gray-300">
					Login
				</h1>
				<form className="space-y-4" onSubmit={onSubmit}>
					<div>
						<label className="label">
							<span className="text-base label-text">Email</span>
						</label>
						<input
							type="email"
							required
							name="email"
							onChange={onChange}
							placeholder="Email Address"
							className="w-full input input-bordered"
						/>
					</div>
					<div>
						<label className="label">
							<span className="text-base label-text">Password</span>
						</label>
						<input
							type="password"
							onChange={onChange}
							name="password"
							placeholder="Enter Password"
							className="w-full input input-bordered"
						/>
					</div>
					<span className="text-xs text-gray-400">
						Dont have an account?{" "}
						<Link
							href={"/register"}
							className="600 hover:underline hover:text-blue-600"
						>
							{" "}
							Create Account
						</Link>
					</span>
					<div>
						<button className="btn btn-block btn-primary">
							{loading ? "Please wait..." : "Login"}
						</button>
					</div>
				</form>
			</section>
		</main>
	);
}

export default LoginPage;

export const metadata: Metadata = { title: "Login" };
