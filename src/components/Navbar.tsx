"use client";

import useUser from "@/hooks/useUser";
import { GoHome } from "react-icons/go";
import type { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
	const { user, refreshUser } = useUser();
	const router = useRouter();

	return (
		<nav className="h-16 sticky top-0 left-0 w-full bg-dark-focus md:px-40 sm:px-14 z-10">
			<ul className="flex w-full h-full items-center justify-between text-lg">
				<li className="text-white link">
					<Link href={"/"} className="link">
						<span className="btn btn-primary btn-link btn-sm py-3 h-full">
							<GoHome color="white" size={25} />
						</span>
					</Link>
				</li>
				<span className="flex gap-6 items-center">
					<li>
						{user ? (
							<Link href={"/admin"} className="btn btn-ghost">
								Your Posts
							</Link>
						) : (
							<Link href={"/login"} className="btn btn-ghost">
								Login
							</Link>
						)}
					</li>
					<li>
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									<img
										src={
											user?.photoUrl ||
											"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
										}
										alt="user profile"
									/>
								</div>
							</label>
							{user && (
								<ul
									tabIndex={0}
									className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
								>
									<li>
										<p className="justify-between">Profile</p>
									</li>
									<li>
										<p>Settings</p>
									</li>
									<li
										onClick={async () => {
											localStorage.removeItem("token");
											router.push("/");
											window.location.reload();
										}}
									>
										<p>Logout</p>
									</li>
								</ul>
							)}
						</div>
					</li>
				</span>
			</ul>
		</nav>
	);
};

export default Navbar;
