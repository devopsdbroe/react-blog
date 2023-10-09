import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { deletePostAndComments } from "../utils/firestoreOperations";
import "../css/Post.css";
import {
	collection,
	query,
	where,
	orderBy,
	onSnapshot,
} from "@firebase/firestore";
import { db } from "../auth/firebase";

const Post = ({ post, onPostDeleted, onPostDeleteFailure }) => {
	const [comments, setComments] = useState([]);

	// useEffect to fetch comments from Firebase DB
	useEffect(() => {
		const q = query(
			collection(db, "comments"),
			where("postId", "==", post.id),
			orderBy("timestamp", "desc")
		);
		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const fetchedComments = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				console.log("Fetched comments: ", fetchedComments);
				setComments(fetchedComments);
			},
			(error) => {
				console.error("Error fetching comments: ", error);
			}
		);

		return () => unsubscribe();
	}, [post.id]);

	// Logic to delete post (and comments inside of post)
	const handleDeletePost = async () => {
		// Optimistically update UI to remove post
		onPostDeleted(post.id);

		try {
			await deletePostAndComments(post.id);
			console.log("Post and comments deleted successfully!");
		} catch (error) {
			console.error("Error deleting post and/or comments: ", error);
			alert("Sorry, we couldn't delete the post. Please try again later.");

			// Run in event that deletion fails
			onPostDeleteFailure(post);
		}
	};

	// Logic to rerender comments are a comment is deleted
	const handleDeleteComment = (commentId) => {
		setComments((prevComments) =>
			prevComments.filter((comment) => comment.id !== commentId)
		);
	};

	return (
		<div className="post">
			<h2>{post.title}</h2>
			<p>{post.body}</p>
			<button onClick={handleDeletePost}>Delete</button>
			<CommentForm postId={post.id} />
			<ul>
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						comment={comment}
						onDeleteComment={handleDeleteComment}
					/>
				))}
			</ul>
		</div>
	);
};

export default Post;
