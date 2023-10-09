import {
	collection,
	addDoc,
	serverTimestamp,
	deleteDoc,
	doc,
	query,
	where,
	getDocs,
} from "@firebase/firestore";
import { db } from "../auth/firebase";

export const addPost = async (postData) => {
	try {
		await addDoc(collection(db, "posts"), {
			...postData,
			timestamp: serverTimestamp(),
		});
	} catch (error) {
		console.error("Error adding post: ", error);
		throw error;
	}
};

export const deletePostAndComments = async (postId) => {
	try {
		const commentsCollection = collection(db, "comments");
		const q = query(commentsCollection, where("postId", "==", postId));
		const querySnapshot = await getDocs(q);

		for (const doc of querySnapshot.docs) {
			await deleteDoc(doc.ref);
		}

		const postRef = doc(db, "posts", postId);
		await deleteDoc(postRef);
	} catch (error) {
		console.error("Error deleting post and/or comments: ", error);
		throw error;
	}
};

export const addComment = async (commentData) => {
	try {
		await addDoc(collection(db, "comments"), {
			...commentData,
			timestamp: serverTimestamp(),
		});
	} catch (error) {
		console.error("Error adding comment: ", error);
		throw error;
	}
};

export const deleteComment = async (commentId) => {
	try {
		const commentRef = doc(db, "comments", commentId);
		await deleteDoc(commentRef);
	} catch (error) {
		console.error("Error deleting comment: ", error);
		throw error;
	}
};
