import {
	collection,
	addDoc,
	serverTimestamp,
	deleteDoc,
} from '@firebase/firestore';
import { db } from '../auth/firebase';

export const addPost = async (postData) => {
	try {
		await addDoc(collection(db, 'posts'), {
			...postData,
			timeStamp: serverTimestamp(),
		});
	} catch (error) {
		console.error('Error adding post: ', error);
		throw error;
	}
};

export const addComment = async (commentData) => {
	try {
		await addDoc(collection(db, 'comments'), {
			...commentData,
			timeStamp: serverTimestamp(),
		});
	} catch (error) {
		console.error('Error adding comment: ', error);
		throw error;
	}
};
