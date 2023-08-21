import type { FC, FormEventHandler, ChangeEventHandler } from "react";
import type { ThreadComments } from "./Comments";

interface CommentFormProps {
	comment?: ThreadComments;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
	value?: string;
	saving?: boolean;
}

const CommentForm: FC<CommentFormProps> = ({
	comment,
	onSubmit,
	onChange,
	value,
	saving = false,
}) => {
	return (
		<div className="w-full">
			<form onSubmit={onSubmit} className="mb-2">
				<div className="py-2 px-4 mb-2 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
					<textarea
						id="comment"
						rows={4}
						className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
						placeholder="Write a comment..."
						required
						onChange={onChange}
						defaultValue={comment?.text}
						value={value}
					></textarea>
				</div>
				<button
					type="submit"
					className="btn btn-primary btn-sm text-white text-xs"
				>
					{saving ? "Saving..." : "Post comment"}
				</button>
			</form>
		</div>
	);
};

export default CommentForm;
