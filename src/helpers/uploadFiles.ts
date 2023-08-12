import { UploadedFile } from "express-fileupload";
import { ObjectId } from "mongodb";

export function uploadPostPictures(
	files: UploadedFile,
	userId: string,
	postId: string 
) {
	const filePaths: string[] = [];
	let file: UploadedFile[];
	if (!Array.isArray(files)) {
		file = [files];
	} else file = files;

	file.map((f) => {
		const filePath = `uploads/${userId}/${postId}/${f.name}`;
		filePaths.push(filePath);
		f.mv(`public/${filePath}`);
	});
	return filePaths;
}
