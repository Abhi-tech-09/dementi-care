import React, { useState } from "react";
import "./CommentForm.css";
import { IPost } from "../../types/types";
import { useAuth } from "../../contexts/AuthContextProvider";
interface CommentFormProps {
  post: IPost;
  onSubmit: (
    userId: string,
    commentText: string,
    commentedAt: string,
    postId: string
  ) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ post, onSubmit }) => {
  const user = useAuth();

  const [commentText, setCommentText] = useState("");
  const [commentedAt, setCommentedAt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User : ");
    console.log(user);

    const currentUser =
      user && user.user ? user.user.email : "testUser@gmail.com";

    onSubmit(currentUser, commentText, commentedAt, post.id);
    setCommentText("");
    setCommentedAt("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Add your comment..."
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
          setCommentedAt(new Date().toLocaleString());
        }}
        required
      />
      <button className="add-comment-button" type="submit">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
