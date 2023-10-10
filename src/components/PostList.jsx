import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../auth/firebase";
import "../css/PostList.css";
import Post from "./Post";

const PostList = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
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
				console.error("Error fetching posts: ", error);
			}
		);

		return () => unsubscribe();
	}, []);

	// Logic to rerender post list after a post is deleted
	const handlePostDeleted = (deletedPostId) => {
		const updatedPosts = posts.filter((post) => post.id !== deletedPostId);
		setPosts(updatedPosts);
	};

	// Logic in event of post deletion failure - rerenders original list
	const handlePostDeleteFailure = (failedPost) => {
		setPosts((prevPosts) => [failedPost, ...prevPosts]);
	};

	return (
		<div className="post-list">
			{posts.map((post) => (
				<Post
					key={post.id}
					post={post}
					onPostDeleted={handlePostDeleted}
					onPostDeleteFailure={handlePostDeleteFailure}
				/>
			))}
		</div>
	);
};

export default PostList;
