import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { deletePost } from '../utils/firestoreOperations';
import '../css/Post.css';
import {
	collection,
	query,
	where,
	orderBy,
	onSnapshot,
} from '@firebase/firestore';
import { db } from '../auth/firebase';

const Post = ({ post, onPostDeleted }) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const q = query(
			collection(db, 'comments'),
			where('postId', '==', post.id),
			orderBy('timestamp', 'desc')
		);
		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const fetchedComments = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				console.log('Fetched comments: ', fetchedComments);
				setComments(fetchedComments);
			},
			(error) => {
				console.error('Error fetching comments: ', error);
			}
		);

		return () => unsubscribe();
	}, [post.id]);

	const handleDelete = async (postId) => {
		try {
			await deletePost(postId);
			console.log('Post deleted successfully!');
			onPostDeleted(postId);
		} catch (error) {
			console.error('Error deleting post: ', error);
		}
	};

	return (
		<div className='post'>
			<h2>{post.title}</h2>
			<p>{post.body}</p>
			<button onClick={() => handleDelete(post.id)}>Delete</button>
			<CommentForm postId={post.id} />
			<ul>
				{comments.map((comment) => (
					<li key={comment.id}>{comment.comment}</li>
				))}
			</ul>
		</div>
	);
};

export default Post;
