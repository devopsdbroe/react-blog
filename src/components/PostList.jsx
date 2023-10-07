import React, { useState, useEffect } from 'react';
import Post from './Post';
import { collection, query, orderBy, onSnapshot } from '@firebase/firestore';
import { db } from '../auth/firebase';
import '../css/PostList.css';

const PostList = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const fetchedPosts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setPosts(fetchedPosts);
			},
			(error) => {
				console.error('Error fetching posts: ', error);
			}
		);

		return () => unsubscribe();
	}, []);

	return (
		<div className='post-list'>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};

export default PostList;
