"use client";

import { login } from "@/apis/auth.api";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Head from "next/head";
import LoginForm from "@/components/LoginForm";

function LoginPage() {
	const { user, refreshUser } = useUser();
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

			if (!data.status) return; //showToast("error", data.msg);

			//showToast("success", data.msg);

			if (data.data.access_token) {
				localStorage.setItem("token", data.data.access_token);

				await refreshUser();
				//router.push("/");
				window.location.reload();

				router.refresh();
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
		<main className="min-h-screen bg-dark flex flex-col gap-8 p-8 justify-center items-center">
			{" "}
			<Head>
				<title>Login</title>
			</Head>
			<LoginForm onChange={onChange} onSubmit={onSubmit} loading={loading} />
		</main>
	);
}

export default LoginPage;
