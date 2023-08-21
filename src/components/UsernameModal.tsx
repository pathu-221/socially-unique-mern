"use client";

import { checkUsernameAvailability, saveUsername } from "@/apis/user.api";
import { getProfileImageUrl } from "@/common/getImageUrl";
import { showToast } from "@/common/showToast";
import Modal from "@/components/ReactResponsiveModal";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FC } from "react";

interface UsernameModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const UsernameModal: FC<UsernameModalProps> = ({ isOpen, onClose }) => {
	const { user } = useUser();
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [res, setRes] = useState<any>(null);
	const router = useRouter();

	const submitUsername = async () => {
		if (res.status === 1) {
			setLoading(true);
			const data = await saveUsername(username);

			if (data.status) {
				showToast(data.msg, "success");
				window.location.reload();
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

	return (
		<Modal
			styles={{
				modal: {
					padding: 0,
					backgroundColor: "#2F3B50",
					borderRadius: "12px",
				},
			}}
			closeOnEsc
			closeIcon={<></>}
			open={isOpen}
			onClose={onClose}
			center
		>
			<span className="flex gap-3 p-4 max-w-full min-w-screen md:min-w-[512px]">
				<img
					src={getProfileImageUrl(user?.photoUrl || "")}
					className="rounded-full h-12 aspect-square"
				/>
				<span className="flex-grow flex-col">
					<span className="flex items-start gap-3">
						<input
							placeholder="Choose a username"
							className="w-full cursor-pointer  hover:bg-gray-700 input input-bordered"
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

					{loading && <p className="text-sm text-blue-400 mt-3">Checking...</p>}
					{!loading && res && (
						<p
							className={`text-sm mt-3 ${
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

export default UsernameModal;
