export function getProfileImageUrl(url: string) {
	if (url.includes("uploads")) {
		return `${process.env.NEXT_PUBLIC_API_ADDRESS}/${url}`;
	}
	return url;
}
