import {
	collection,
	addDoc,
	serverTimestamp,
	deleteDoc,
	doc,
} from '@firebase/firestore';
import { db } from '../auth/firebase';

export const addPost = async (postData) => {
	try {
		await addDoc(collection(db, 'posts'), {
			...postData,
			timestamp: serverTimestamp(),
		});
	} catch (error) {
		console.error('Error adding post: ', error);
		throw error;
	}
};

export const deletePost = async (postId) => {
	try {
		console.log('Deleting post with ID: ', postId);
		const postRef = doc(db, 'posts', postId);
		await deleteDoc(postRef);
	} catch (error) {
		console.error('Error deleting post: ', error);
		throw error;
	}
};

export const addComment = async (commentData) => {
	try {
		await addDoc(collection(db, 'comments'), {
			...commentData,
			timestamp: serverTimestamp(),
		});
	} catch (error) {
		console.error('Error adding comment: ', error);
		throw error;
	}
};
