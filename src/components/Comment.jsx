import { deleteComment } from "../utils/firestoreOperations";

const comment = ({ comment, onDeleteComment }) => {
	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this comment?")) {
			try {
				await deleteComment(comment.id);
				onDeleteComment(comment.id);
				console.log("Comment deleted successfully!");
			} catch (error) {
				console.error("Error deleting comment: ", error);
			}
		}
	};

	return (
		<li>
			<p>{comment.text}</p>
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
};

export default comment;
