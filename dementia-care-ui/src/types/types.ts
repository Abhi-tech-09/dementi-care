export type TPostView = "gridView" | "listView";

export interface IPost {
  id: string;
  userId: string;
  contentText?: string;
  contentMedia?: string;
  likeCount: number;
  report: string;
  postStatus: string;
  comments: IComment[];
  createdAt: Date;
  postType: string;
}

export interface IComment {
  userId: string;
  commentText: string;
  commentedAt: string;
  postId: string;
}

export interface ApiResponse {
  data: IPost[];
}
