import React, { useState } from 'react';
import '../css/CreatePost.css';

const CreatePost = ({ addPost }) => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		addPost({ id: Date.now(), title, body });
		setTitle('');
		setBody('');
	};

	return (
		<form onSubmit={handleSubmit} className='create-post-form'>
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
