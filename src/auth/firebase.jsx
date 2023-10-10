import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCaqenwCKW06WHlDK9BK4V9nTZ0Zjm7fBo",
	authDomain: "react-blog-app-3caf6.firebaseapp.com",
	projectId: "react-blog-app-3caf6",
	storageBucket: "react-blog-app-3caf6.appspot.com",
	messagingSenderId: "138677906166",
	appId: "1:138677906166:web:e1a631b52068f3bab29ad7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
