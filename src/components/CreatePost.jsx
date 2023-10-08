import React, { useState } from 'react';
import { addPost } from '../utils/firestoreOperations';
import '../css/CreatePost.css';

const CreatePost = () => {
	const [post, setPost] = useState({
		title: '',
		body: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setPost((prevPost) => ({ ...prevPost, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addPost(post);
			setPost({ title: '', body: '' });
		} catch (error) {
			console.error('Error adding post: ', error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='title'>Title: </label>
				<input
					type='text'
					placeholder='Title'
					id='title'
					name='title'
					value={post.title}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor='body'>Body: </label>
				<input
					type='text'
					placeholder='Write your post...'
					id='body'
					name='body'
					value={post.body}
					onChange={handleChange}
				/>
			</div>
			<button type='submit'>Post</button>
		</form>
	);
};

export default CreatePost;
