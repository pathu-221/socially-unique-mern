import { useUser } from "@/Hooks/useUser";
import Link from "next/link";


function Navbar() {
    const user = useUser();
    
    return (
        <nav className="navbar bg-neutral lg:px-[110px]">
            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost normal-case text-xl">
                Home
                </Link>
            </div>
            <div className="flex-none gap-2">
            <div className="flex-1">
                {
                    user ? <Link href='/admin' className="btn btn-ghost normal-case text-xl">Your Posts</Link> : <Link href='/login' className="btn btn-ghost normal-case text-xl">Login</Link>
                }
            </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={ user?.photoUrl || "https://api.dicebear.com/6.x/fun-emoji/svg?seed=Kiki"} />
                        </div>
                    </label>
                    {
                        user &&
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;