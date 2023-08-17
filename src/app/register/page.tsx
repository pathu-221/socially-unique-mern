"use client";

import { register } from "@/apis/auth.api";
import useUser from "@/hooks/useUser";
// import { showToast } from "@/common/toast";
import { showToast } from "@/common/showToast";
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

		if (!data.status) return showToast(data.msg, "error");
		else showToast(data.msg, "success");

		router.push("/login");
	};
	return (
		<main className="relative p-3 flex flex-col items-center justify-center h-screen overflow-hidden">
			<Head>
				<title>Register</title>
			</Head>
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
							<span className="text-base label-text">Profile</span>
						</label>
						<input
							type="file"
							name="email"
							onChange={handleFileChange}
							placeholder="Choose a profile picture"
							className="w-full file-input file-input-bordered"
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
					<div>
						<label className="label">
							<span className="text-base label-text">Password</span>
						</label>
						<input
							type="password"
							onChange={onChange}
							name="confirmPassword"
							placeholder="Confirm Password"
							className="w-full input input-bordered"
						/>
					</div>
					<span className="text-xs text-gray-400">
						Already have an account?{" "}
						<Link
							href={"/login"}
							className="600 hover:underline hover:text-blue-600"
						>
							{" "}
							Login
						</Link>
					</span>
					<div>
						<button className="btn btn-block btn-primary">
							{loading ? "Please wait..." : "Register"}
						</button>
					</div>
				</form>
			</section>
		</main>
	);
}

export default SignUpPage;
