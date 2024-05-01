import { Post } from '@/service';
import type { PostForm } from '@/types/post';

export const usePost = () => {
  const route = useRoute();

  const getPost = () => {
    return Post.getPost(route.params.id as string)
      .then((data) => data)
      .catch((err) => {
        Notify.create({
          type: 'negative',
          message: ErrorMessages.getErrorMessage(err.code)
        });
      });
  };

  const updatePost = (form: PostForm) => {
    return Post.updatePost(route.params.id as string, form)
      .then(() => {
        Notify.create({
          type: 'positive',
          message: '수정이 완료되었습니다.'
        });
      })
      .catch((err) => {
        Notify.create({
          type: 'negative',
          message: ErrorMessages.getErrorMessage(err.code)
        });
      });
  };

  const deletePost = () => {
    return Post.deletePost(route.params.id as string)
      .then(() => {
        Notify.create({
          type: 'positive',
          message: '삭제가 완료되었습니다.'
        });
      })
      .catch((err) => {
        Notify.create({
          type: 'negative',
          message: ErrorMessages.getErrorMessage(err.code)
        });
      });
  };

  return {
    getPost,
    updatePost,
    deletePost
  };
};
