import React from "react";
import "./Comment.css";
interface CommentProps {
  userId: string;
  commentText: string;
  commentedAt: string;
}

const Comment: React.FC<CommentProps> = ({
  userId,
  commentText,
  commentedAt,
}) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-header-author">{userId}</span>
        <span className="comment-header-date">{commentedAt}</span>
      </div>
      <div className="comment-text">{commentText}</div>
    </div>
  );
};

export default Comment;
