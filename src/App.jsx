import "./App.css";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

function App() {
	return (
		<div className="App">
			<h1>React Blog</h1>
			<CreatePost />
			<PostList />
		</div>
	);
}

export default App;
