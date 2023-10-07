import React, { useState } from 'react';

const CommentForm = ({ addComment }) => {
	const [comment, setComment] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		addComment(comment);
		setComment('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder='Add a comment'
			/>
			<button type='submit'>Submit</button>
		</form>
	);
};

export default CommentForm;
