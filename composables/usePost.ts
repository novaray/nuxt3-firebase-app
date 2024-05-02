import { Post } from '@/service';
import type { PostForm } from '@/types/post';

export const usePost = () => {
  const route = useRoute();

  const getPost = () => {
    return Post.getPost(route.params.id as string)
      .then((data) => data)
      .catch(useFireStoreError);
  };

  const updatePost = (form: PostForm) => {
    return Post.updatePost(route.params.id as string, form)
      .then(() => {
        Notify.create({
          type: 'positive',
          message: '수정이 완료되었습니다.'
        });
      })
      .catch(useFireStoreError);
  };

  const deletePost = () => {
    return Post.deletePost(route.params.id as string)
      .then(() => {
        Notify.create({
          type: 'positive',
          message: '삭제가 완료되었습니다.'
        });
      })
      .catch(useFireStoreError);
  };

  return {
    getPost,
    updatePost,
    deletePost
  };
};
