import { getUser } from "@/apis/user";
import { User } from "@/interfaces/user";
import { useState, useEffect } from "react";

export function useUser() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const data = await getUser(token);
    setUser(data.data);
  };

  return user;
}
