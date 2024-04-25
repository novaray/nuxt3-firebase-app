export interface PostForm {
  title: string;
  category: string;
  content: string;
  tags: string[];
}

export interface CreatePostRequest extends PostForm {
  uid: string | null;
}

export interface PostData extends PostForm {
  id: string;
  createdAt: Date;
  uid: string;
  readCount?: number;
  commentCount?: number;
  likeCount?: number;
  bookmarkCount?: number;
}
