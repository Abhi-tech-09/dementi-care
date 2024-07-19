import React, { useState, useEffect } from "react";
import { cn } from "../utils/utils";
import Post from "../components/atoms/post";
import { deletePost, fetchPosts, uploadPost } from "../services/apiService";
import { IPost } from "../types/types";
import UploadSection from "../components/UploadSection";

interface IProps {}

const PostContainer: React.FC<IProps> = (props) => {
  const [postData, setPostData] = useState<IPost[]>([]);
  const [uploadSuccessStatus, setUploadSuccessStatus] =
    useState<boolean>(false);
  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPostData(fetchedPosts);
    } catch (error) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitUploadSection = (formData: FormData) => {
    setUploadingStatus(true);
    uploadPost(formData).then(() => {
      getPosts();
      setUploadSuccessStatus(true);
      setUploadingStatus(false);
    });
  };

  const deletePostRequest = (postId: string, userId: string) => {
    deletePost({ postId, userId }).then(() => {
      getPosts();
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div
      data-theme="forest"
      className="w-screen h-screen overflow-scroll box-border bg-slate-950"
    >
      <div className="m-auto w-[42.5rem] ">
        <div className="mt-6 h-full w-full pb-5 ">
          <div className="mt-4 h-full w-full ">
            <div className={cn("grid gap-2", "grid-cols-1")}>
              <div className="h-auto w-full rounded-md bg-slate-200 shadow dark:bg-neutral-800">
                <div className=" items-center space-x-2 p-2.5 px-4">
                  <UploadSection
                    uploadSuccessStatus={uploadSuccessStatus}
                    uploadingStatus={uploadingStatus}
                    onSubmitUploadSection={onSubmitUploadSection}
                  />
                </div>
              </div>

              {postData.length ? (
                postData.map((post, idx) => (
                  <Post key={idx} post={post} deletePost={deletePostRequest} />
                ))
              ) : (
                <p>No posts yet!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
