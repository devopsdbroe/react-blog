import React, { useState } from 'react';
import '../css/CreatePost.css';
import { db } from '../auth/firebase';
import { collection, addDoc, serverTimestamp } from '@firebase/firestore';

const CreatePost = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const addPost = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(db, 'posts'), {
				title,
				body,
				timestamp: serverTimestamp(),
			});
			setTitle('');
			setBody('');
		} catch (error) {
			console.error('Error adding post: ', error);
		}
	};

	return (
		<form onSubmit={addPost} className='create-post-form'>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Title'
				required
			/>
			<textarea
				value={body}
				onChange={(e) => setBody(e.target.value)}
				placeholder='Write your post...'
				required
			></textarea>
			<button type='submit'>Post</button>
		</form>
	);
};

export default CreatePost;
