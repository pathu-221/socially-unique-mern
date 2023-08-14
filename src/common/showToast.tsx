"use client";
import { toast, ToastOptions } from "react-toastify";

interface toastOptions extends ToastOptions {}

const toastOptions: toastOptions = {
	position: "top-center",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "dark",
};

type toastTypes = "info" | "success" | "warning" | "error";

export function showToast(msg: string, type: toastTypes) {
	switch (type) {
		case "info":
			return toast.info(msg);
		case "success":
			return toast.success(msg);
		case "warning":
			return toast.warning(msg);
		case "error":
			return toast.error(msg);
	}
}
