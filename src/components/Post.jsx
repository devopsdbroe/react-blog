import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import '../css/Post.css';
import {
	collection,
	query,
	where,
	orderBy,
	onSnapshot,
} from '@firebase/firestore';
import { db } from '../auth/firebase';

const Post = ({ post }) => {
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

	return (
		<div className='post'>
			<h2>{post.title}</h2>
			<p>{post.body}</p>
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
