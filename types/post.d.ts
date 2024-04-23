export interface PostForm {
  title: string;
  category: string;
  content: string;
  tags: string[];
}

export interface CreatePostRequest extends PostForm {
  uid: string | null;
}
