import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from '@firebase/firestore';
import { db } from '../auth/firebase';

const CommentForm = ({ postId }) => {
	const [comment, setComment] = useState('');

	const addComment = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(db, 'comments'), {
				comment,
				postId,
				timestamp: serverTimestamp(),
			});
			setComment('');
		} catch (error) {
			console.error('Error adding comment: ', error);
		}
	};

	return (
		<form onSubmit={addComment}>
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
