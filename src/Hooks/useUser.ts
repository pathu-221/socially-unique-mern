import { getUser } from "@/apis/user";
import { User } from "@/interfaces/user";
import { useState, useEffect } from "react";
import useSWR from 'swr';

function useUser() {

  const [user, setUser] = useState<User>();

  const { data, isLoading } = useSWR<any>(
		`${process.env.NEXT_PUBLIC_API_ADDRESS}/auth/authenticate`,
		getUser
	);

  useEffect(() => {
    
    console.log({ data });

    if (!data) return 

    setUser(data.data);

  }, []);



  return {user, isLoading};
}

export default useUser;
