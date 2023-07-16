import { getUser } from "@/apis/user.api";
import { User } from "@/interfaces/user.interface";
import { useEffect, useState } from "react";

export default function useUser() {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
        const data = await getUser();
        if (!data.status) return;
		setUser(data.data);
	};
	return user;
}
