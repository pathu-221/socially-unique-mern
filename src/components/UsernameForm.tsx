import { saveUsername } from "@/apis/user";
import { User } from "@/interfaces/user";
import { FC, useEffect, useState } from "react";
import { checkUsernameAvailability } from "@/apis/user";
import { showToast } from "@/common/toast";
import { useRouter } from "next/router";

interface UsernameFormProps {
	user: User;
}

const UsernameForm: FC<UsernameFormProps> = ({ user }) => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [res, setRes] = useState<any>(null);

	const submitUsername = async () => {
        if (res.status === 1) {
            setLoading(true);
			const data = await saveUsername(username);

			if (data.status) {
				showToast("success", data.msg);
				router.reload();
			}
            else showToast("error", data.msg);
            
            setLoading(false);
		}
	};

	useEffect(() => {
		const checkusername = setTimeout(async () => {
            if (!username.length) {
                setRes(null);
                setLoading(false);
                return
            };

			setLoading(true);
			const data = await checkUsernameAvailability(username);
			setRes(data);
			setRes(data);

			setLoading(false);
			console.log(data);
		}, 500);

		return () => clearTimeout(checkusername);
	}, [username]);

	return (
		<main className="main-page items-center h-[calc(100vh-66px)]">
			<div className="flex flex-col items-center justify-center gap-5 bg-black p-5 rounded-lg">
				<img src={user.photoUrl} className="rounded-full w-28 h-28" />
				<div className="flex flex-col gap-3 text-center">
					<h1 className="text-3xl font-semibold">Choose Username</h1>
					<input
						className="input w-80 input-bordered"
						placeholder="Choose Username"
                        onChange={(e) => {
                            setLoading(true);
                            setUsername(e.target.value)
                        }}
					/>
					{username.length > 0 && res ? (
						<p
							className={`${
								res.status === 0 ? "text-red-600" : "text-green-600"
							} text-left`}
						>
							{res.msg}
						</p>
					) : (
						loading && <p className="text-left">Checking...</p>
					)}
				</div>

				<button
					disabled={loading || (res && !res.status)}
					onClick={() => {
						submitUsername();
						
					}}
					className="btn btn-secondary w-80"
				>
					Save
				</button>
			</div>
		</main>
	);
};

export default UsernameForm;
