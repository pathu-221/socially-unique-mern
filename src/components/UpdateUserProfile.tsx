"use client";
import { editProfileImage } from "@/apis/user.api";
import { ProfilePageUser } from "@/app/user/[userId]/page";
import { showToast } from "@/common/showToast";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FC } from "react";
import { AiFillCamera } from "react-icons/ai";

interface UpdateProfileImageProps {
	profileUser: ProfilePageUser;
}

const UpdateProfileImage: FC<UpdateProfileImageProps> = ({ profileUser }) => {
	const { user } = useUser();
	const router = useRouter();

	const onProfileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		console.log({ e });
		if (e.target.files) {
			console.log(Array.isArray(e.target.files));
			const profile: any = e.target.files[0];
			const formData = new FormData();
			formData.append("photo", profile);
			const response = await editProfileImage(formData);
			if (!response.status) return showToast(response.msg, "error");
			router.refresh();
		}
	};
	return (
		<div className="indicator relative">
			<img
				className="h-16 w-16 rounded-full"
				src={profileUser.photoUrl}
				alt="user"
			/>
			{user && user._id === profileUser._id && (
				<label className="absolute bottom-0 right-0 cursor-pointer">
					<AiFillCamera size={25} className="w-full h-full" />
					<input
						onChange={onProfileChange}
						hidden
						type="file"
						accept="images/*"
					/>
				</label>
			)}
		</div>
	);
};

export default UpdateProfileImage;
