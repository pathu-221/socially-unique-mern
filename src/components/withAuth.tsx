import { getUser } from "@/apis/user";
import { useRouter } from "next/router";
import { ComponentType, FC, useEffect, useState } from "react";

const withAuth = (WrappedComponent: ComponentType) => {
	const Wrapper: FC = (props) => {
		const router = useRouter();
		const [isAuthenticated, setIsAuthenticated] = useState(false);

		useEffect(() => {
			fetchUser();
		}, []);

		const fetchUser = async () => {
			try {
				const data = await getUser(); // Assuming this function makes an API call to retrieve user data

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