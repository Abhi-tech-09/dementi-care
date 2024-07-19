// src/services/apiService.ts
import axios from "axios";
import { IPost } from "../types/types";

const API_URL = "https://dementia-care-service-vhiugihsdq-ew.a.run.app/posts";
const POST_COMMENT_URL =
  "https://dementia-care-service-vhiugihsdq-ew.a.run.app/post/comment";
const POST_LIKE_URL =
  "https://dementia-care-service-vhiugihsdq-ew.a.run.app/post/like";

const POST_REPORT_URL =
  "https://dementia-care-service-vhiugihsdq-ew.a.run.app/post/report";

const DELETE_POST_URL =
  "https://dementia-care-service-vhiugihsdq-ew.a.run.app/post/delete";

export const POST_NEW_STORY_URL =
  "https://dementia-care-service-vhiugihsdq-ew.a.run.app/post";

export const fetchPosts = async (): Promise<IPost[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const postComments = async (payload: {
  userId: string;
  commentText: string;
  postId: string;
}): Promise<any> => {
  try {
    const response = await axios.post(POST_COMMENT_URL, payload);
    console.log("Comment Post log : ");
    console.log(response);
    return;
  } catch (error) {
    console.error("Error commenting posts:", error);
    throw error;
  }
};

export const likePost = async (payload: {
  isLike: boolean;
  postId: string;
}): Promise<any> => {
  try {
    const response = await axios.post(POST_LIKE_URL, payload);
    console.log(response);
    return;
  } catch (error) {
    console.error("Error liking posts:", error);
    throw error;
  }
};

export const reportPost = async (payload: {
  userId: string;
  postId: string;
}): Promise<any> => {
  try {
    const response = await axios.post(POST_REPORT_URL, payload);
    console.log(response);
    return;
  } catch (error) {
    console.error("Error liking posts:", error);
    throw error;
  }
};

export const deletePost = async (payload: {
  postId: string;
  userId: string;
}): Promise<any> => {
  try {
    const response = await axios.delete(
      `${DELETE_POST_URL}?postId=${payload.postId}&userId=${payload.userId}`
    );
    console.log(response);
    return;
  } catch (error) {
    console.error("Error delete post:", error);
    throw error;
  }
};

export const uploadPost = async (formData: FormData): Promise<any> => {
  try {
    const response = await axios.post(POST_NEW_STORY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return;
  } catch (error) {
    console.error("Error Uploading post: ", error);
    throw error;
  }
};
