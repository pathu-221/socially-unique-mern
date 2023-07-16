"use client";

import useUser from "@/hooks/useUser";
import { register } from "@/apis/auth.api";
// import { showToast } from "@/common/toast";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

interface formFields {
	email: string;
	profile?: any | null;
	password: string;
	confirmPassword: string;
}

function SignUpPage() {
	const { user } = useUser();
	const formRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<formFields>({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const router = useRouter();

	useEffect(() => {
		console.log({ user });
		if (user) {
			router.push("/");
		}
	}, [user]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFormData({
				...formData,
				profile: e.target.files[0],
			});
		}
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = new FormData();
		form.append("email", formData.email);
		form.append("photo", formData.profile);
		form.append("password", formData.password);

		setLoading(true);
		const data = await register(form);
		setLoading(false);

		if (!data.status) return; //showToast("error", data.msg);
		//else showToast("success", data.msg);

		router.push("/login");
	};
	return (
		<main className="min-h-screen bg-dark flex flex-col gap-8 p-8 justify-center items-center">
			{" "}
			<title>Register</title>
			<section className="w-[60%] p-4 card shadow-xl bg-dark-focus rounded-2xl flex flex-col gap-2 ">
				<h1 className="mb-5 text-3xl">Create Account</h1>
				<form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-2">
					<div className="flex flex-col gap-2">
						<label className="label">
							<span className="label-text text-lg">Email*: </span>
						</label>
						<input
							type="email"
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
							type="file"
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
							type="password"
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
							type="password"
							placeholder="Your Password"
							className="input input-bordered w-full"
						/>
					</div>
					<span className="text-md ">
						Already Have an Account?
						<Link className="underline hover:no-underline" href="/login">
							{" "}
							Login
						</Link>
					</span>
					<button disabled={loading} type="submit" className="btn btn-primary">
						{loading ? "Saving..." : "Create Account"}
					</button>
				</form>
			</section>
		</main>
	);
}

export default SignUpPage;
