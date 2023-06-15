import { useUser } from "@/Hooks/useUser";
import { User } from "@/interfaces/user";
import { FC, useEffect, useState } from "react";
import { checkUsernameAvailability } from "@/apis/user";

interface UsernameFormProps {
    user: User
}
 
const UsernameForm: FC<UsernameFormProps> = ({ user }) => {

    const [username, setUsername] = useState('');

    useEffect(() => {

        const checkusername = setTimeout(async () => {
            if(!username.length) return 

            const data = await checkUsernameAvailability(username);
            
            console.log(data);
        }, (500));

        return () => clearTimeout(checkusername)
    }, [username])

    return (
      <main className="main-page items-center h-[calc(100vh-66px)]">
          <div className="flex flex-col items-center justify-center gap-3 bg-black p-5 rounded-lg">
            <img src={user.photoUrl} className="rounded-full w-28 h-28" />
            <h1 className="text-3xl font-semibold">Choose Username</h1>
            <input
            className="input w-80 input-bordered"
            placeholder="Choose Username"
            onChange={ (e) => setUsername( e.target.value )}
            />
            <button className="btn btn-secondary w-80">Save</button>
          </div>
      </main>
    );
}
 
export default UsernameForm;