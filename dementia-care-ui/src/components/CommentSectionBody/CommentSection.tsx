import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./CommentSection.css";
import { postComments } from "../../services/apiService";
import { IComment, IPost } from "../../types/types";

// interface CommentData {
//   userId: string;
//   commentText: string;
//   commentedAt: string;
//   postId: string;
// }

interface IProps {
  post: IPost;
}

const CommentSection: React.FC<IProps> = (props) => {
  const [comments, setComments] = useState<IComment[]>(props.post.comments);

  const addComment = (
    userId: string,
    commentText: string,
    commentedAt: string
  ) => {
    const postId = props.post.id;
    const newComment: IComment = { userId, commentText, commentedAt, postId };
    setComments([newComment, ...comments]);

    postComments({
      userId: userId,
      commentText: commentText,
      postId: postId,
    });
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <CommentForm post={props.post} onSubmit={addComment} />
      <div className="comment-list">
        {comments.map((comment, index) => (
          <Comment
            key={index}
            userId={comment.userId}
            commentText={comment.commentText}
            commentedAt={comment.commentedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
