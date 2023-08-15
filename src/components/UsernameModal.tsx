"use client";

import { checkUsernameAvailability, saveUsername } from "@/apis/user.api";
import { showToast } from "@/common/showToast";
import Modal from "@/components/ReactResponsiveModal";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import type { FC } from "react";

interface UsernameMoalProps {
	isOpen: boolean;
	onClose: () => void;
}

const UsernameMoal: FC<UsernameMoalProps> = ({ isOpen, onClose }) => {
	const { user } = useUser();
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [res, setRes] = useState<any>(null);

	const submitUsername = async () => {
		if (res.status === 1) {
			setLoading(true);
			const data = await saveUsername(username);

			if (data.status) {
				showToast(data.msg, "success");
				onClose();
			} else showToast(data.msg, "error");

			setLoading(false);
		}
	};

	useEffect(() => {
		const checkusername = setTimeout(async () => {
			if (!username.length) {
				setRes(null);
				setLoading(false);
				return;
			}

			setLoading(true);
			const data = await checkUsernameAvailability(username);
			setRes(data);
			setRes(data);

			console.log({ data });
			setLoading(false);
		}, 500);

		return () => clearTimeout(checkusername);
	}, [username]);

	if (!user) return showToast("how did you do that?", "error");

	return (
		<Modal
			styles={{
				modal: {
					margin: 0,
					padding: 0,
					backgroundColor: "#2F3B50",
					borderRadius: "12px",
					minWidth: "512px",
				},
			}}
			closeOnEsc
			closeIcon={<></>}
			open={isOpen}
			onClose={onClose}
			center
		>
			<span className="flex gap-3 p-4">
				<img src={user.photoUrl} className="rounded-full h-12 aspect-square" />
				<span className="flex-grow flex-col">
					<span className="flex items-start gap-3">
						<input
							placeholder="Choose a username"
							className="w-full cursor-pointer mb-3 hover:bg-gray-700 input input-bordered"
							onChange={(e) => setUsername(e.target.value)}
						/>
						<button
							disabled={loading}
							onClick={() => submitUsername()}
							className="btn btn-primary"
						>
							Submit
						</button>
					</span>

					{loading && <p className="text-sm text-blue-400">Checking...</p>}
					{!loading && res && (
						<p
							className={`text-sm ${
								!res.status ? "text-red-500" : "text-blue-500"
							}`}
						>
							{res.msg}
						</p>
					)}
				</span>
			</span>
		</Modal>
	);
};

export default UsernameMoal;
