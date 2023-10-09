import React, { useState } from "react";
import { addComment } from "../utils/firestoreOperations";

const CommentForm = ({ postId }) => {
	const [text, setText] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addComment({ text, postId });
			setText("");
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
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default CommentForm;
