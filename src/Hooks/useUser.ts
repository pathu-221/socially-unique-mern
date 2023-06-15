import { getUser } from "@/apis/user";
import { User } from "@/interfaces/user";
import { useState, useEffect } from "react";

export function useUser() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await getUser();
    setUser(data.data);
  };

  return user;
}
