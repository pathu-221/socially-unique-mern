import { getUser } from "@/apis/user";
import { User } from "@/interfaces/user";
import { useState, useEffect } from "react";

function useUser() {

	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		const data = await getUser();

		if (data) {
			if (!data.status) throw new Error(data.msg);
			setUser(data.data);
		}
	};

	return user;
}

export default useUser;
