import Link from "next/link";
import { FC } from "react";

interface NotFoundPageProps {}

const NotFound: FC<NotFoundPageProps> = () => {
	return (
		<div className="w-full h-full flex items-center justify-center flex-col gap-5 p-10">
			<h1 className="font-bold text-3xl">
				Hello my friend, Looks like you are lost?
			</h1>
			<iframe
				src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
				frameBorder="0"
				className="aspect-[240/181] w-[600px]"
				allowFullScreen
			></iframe>
			<Link href="/">
				<button className="btn btn-primary">Back to Home</button>
			</Link>
		</div>
	);
};

export default NotFound;
