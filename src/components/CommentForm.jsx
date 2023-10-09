import React, { useState } from "react";
import { addComment } from "../utils/firestoreOperations";

const CommentForm = ({ postId }) => {
	const [comment, setComment] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addComment({ comment, postId });
			setComment("");
		} catch (error) {
			console.error("Error adding comment: ", error);
			setError(error.message);
		}
	};

	return (
		<>
			{error && <p className="error">{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Add a comment"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default CommentForm;
