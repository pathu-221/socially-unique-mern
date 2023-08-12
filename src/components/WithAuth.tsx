"use client";

import { getUser } from "@/apis/user.api";
import { useRouter } from "next/navigation";
import { ComponentType, FC, useEffect, useState } from "react";

const withAuth = (WrappedComponent: ComponentType<any>) => {
	const Wrapper: FC = (props) => {
		const router = useRouter();
		const [isAuthenticated, setIsAuthenticated] = useState(false);

		useEffect(() => {
			fetchUser();
		}, []);

		const fetchUser = async () => {
			try {
				const data = await getUser();

				if (!data) {
					router.push("/login");
				} else {
					setIsAuthenticated(true);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		return isAuthenticated ? <WrappedComponent {...props} /> : null;
	};

	return Wrapper;
};

export default withAuth;
