import React, { useState } from 'react';
import CommentForm from './CommentForm';
import '../css/Post.css';

const Post = ({ post }) => {
	const [comments, setComments] = useState([]);

	const addComment = (newComment) => {
		setComments((prevComments) => [newComment, ...prevComments]);
	};

	return (
		<div className='post'>
			<h2>{post.title}</h2>
			<p>{post.body}</p>
			<CommentForm addComment={addComment} />
			<ul>
				{comments.map((comment, index) => (
					<li key={index}>{comment}</li>
				))}
			</ul>
		</div>
	);
};

export default Post;
