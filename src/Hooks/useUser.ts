import { getUser } from "@/apis/user";
import { User } from "@/interfaces/user";
import { useState, useEffect } from "react";
import useSWR from 'swr';

function useUser() {

  const [user, setUser] = useState<User>();

  const { data } = useSWR<any>(
		`${process.env.NEXT_PUBLIC_API_ADDRESS}/auth/authenticate`,
		getUser
	);

  useEffect(() => {
    
    if (!data) return 

    setUser(data.data);

  }, []);



  return user;
}

export default useUser;
