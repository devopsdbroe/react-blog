import React from "react";

const comment = ({ comment, onDeleteComment }) => {
	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this comment?")) {
			onDeleteComment(comment.id);
		}
	};

	return (
		<li>
			<p>{comment.comment}</p>
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
};

export default comment;
