import moment from "moment";
import React, { useState } from "react";
import { IPost } from "../../../types/types";
import CommentSection from "../../CommentSectionBody/CommentSection";
import "./index.css";
import { likePost, reportPost } from "../../../services/apiService";
import { useAuth } from "../../../contexts/AuthContextProvider";
interface IProps {
  post: IPost;
  deletePost: (postId: string, userId: string) => void;
}

const Post: React.FC<IProps> = (props) => {
  const { post, deletePost } = props;
  const user = useAuth();

  const [likeButtonStatus, setLikeButtonStatus] = useState<boolean>(true);
  const [reportButtonStatus, setReportButtonStatus] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount);

  const currentUser =
    user && user.user ? user.user.email : "testUser@gmail.com";

  const postTypeAfterSplit = post.postType && post.postType.split("/")[0];

  return (
    <div className="h-auto w-full rounded-md bg-slate-200 shadow dark:bg-neutral-800">
      <div className="flex items-center space-x-2 p-2.5 px-4">
        <div className="h-10 w-10">
          <img
            src={post.userId && "https://random.imagecdn.app/500/200"}
            className="h-full w-full rounded-full"
            alt="dp"
          />
        </div>
        <div className="flex flex-grow flex-col">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {post.userId && post.userId}
          </p>
          <div>
            <span className="text-xs font-thin text-gray-400">
              {moment(post.createdAt).fromNow()}
            </span>
            <span className="report-button">
              <button
                className={
                  !reportButtonStatus
                    ? "py-1.5 px-3 bg-red-400 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
                    : "py-1.5 px-3 bg-red-800 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
                }
                onClick={() => {
                  setReportButtonStatus(!reportButtonStatus);
                  reportPost({
                    userId: currentUser,
                    postId: post.id,
                  });
                }}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
                <span>{reportButtonStatus ? "Reported" : "Report"}</span>
              </button>
            </span>
            {currentUser === post.userId ? (
              <span className="delete-button">
                <button
                  className={
                    "py-1.5 px-3 bg-gray-400 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
                  }
                  onClick={() => {
                    deletePost(post.id, currentUser);
                  }}
                >
                  <svg
                    className="h-4 w-4 text-slate-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <polyline points="3 6 5 6 21 6" />{" "}
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
                    <line x1="10" y1="11" x2="10" y2="17" />{" "}
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </span>
            ) : null}
          </div>
        </div>
      </div>
      {post.contentText ? (
        <div className="mb-1">
          <p className="max-h-10 truncate px-3 text-sm text-gray-700 dark:text-gray-300">
            {post.contentText}
          </p>
        </div>
      ) : null}
      {post.contentMedia ? (
        postTypeAfterSplit === "image" ? (
          <div className="h-76 max-h-100 w-full">
            <img
              src={post.contentMedia}
              alt="postImage"
              className="h-76 max-h-100 w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-76 max-h-100 w-full">
            <video className="h-76 max-h-100 w-full object-cover" controls>
              <source src={post.contentMedia} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      ) : null}

      <div className="flex w-full flex-col space-y-2 p-2 px-4">
        <div className="flex items-center justify-between border-b border-gray-300 pb-2 text-sm dark:border-neutral-700">
          <div className="flex items-center">
            <button
              className={
                likeButtonStatus
                  ? "py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
                  : "py-1.5 px-3 bg-green-800 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
              }
              onClick={() => {
                likeButtonStatus
                  ? setLikeCount(likeCount + 1)
                  : setLikeCount(likeCount - 1);
                setLikeButtonStatus(!likeButtonStatus);
                likePost({
                  isLike: likeButtonStatus,
                  postId: post.id,
                });
              }}
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                ></path>
              </svg>
              <span>{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
      <CommentSection post={post} />
    </div>
  );
};

export default Post;
