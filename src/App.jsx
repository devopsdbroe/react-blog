import { useState } from 'react';
import './App.css';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

function App() {
	const [posts, setPosts] = useState([]);

	const addPost = (newPost) => {
		setPosts((prevPosts) => [newPost, ...prevPosts]);
	};

	return (
		<div className='App'>
			<h1>React Blog</h1>
			<CreatePost addPost={addPost} />
			<PostList posts={posts} />
		</div>
	);
}

export default App;
