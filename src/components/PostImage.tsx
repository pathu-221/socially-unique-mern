import type { FC } from "react";
import LightGallery from "./LightGallery";

interface PostImageProps {
	images: string[];
}

const PostImage: FC<PostImageProps> = ({ images }) => {
	const classnames = "grid gap-3";

	switch (images.length) {
		case 1:
			classnames.concat("grid-cols-1 grid-rows-1");
			break;
		case 2:
			classnames.concat("grid-rows-2 grid-cols-1");
			break;
		case 3:
	}

	return (
		<span className="flex flex-col gap-3 relative">
			{images.length > 1 && (
				<span className="p-2 top-4 right-4 absolute rounded-full bg-black bg-opacity-30 text-xs text-white">
					{`1/${images.length}`}
				</span>
			)}
			<LightGallery elementClassNames="flex flex-col gap-3">
				{images.map((image, index) => (
					<a
						key={index}
						className={`${index > 0 ? "hidden" : ""}`}
						href={`${process.env.NEXT_PUBLIC_API_ADDRESS}/${image}`}
					>
						<img
							className="w-full rounded-2xl"
							src={`${process.env.NEXT_PUBLIC_API_ADDRESS}/${image}`}
							alt='post content'
						/>
					</a>
				))}
			</LightGallery>
		</span>
	);
};

export default PostImage;
