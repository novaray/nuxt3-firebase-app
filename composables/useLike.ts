import { Post } from '@/service';

export const useLike = (id: string, options: Record<string, number> = { initialCount: 0 }) => {
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());
  const { initialCount } = options;

  const isLike = ref(false);
  const likeCount = ref(initialCount);
  const postId = ref(id);

  const initLike = () => {
    if (!uid.value || !isAuthenticated.value) {
      isLike.value = false;
      return;
    }

    return Post.hasLike(uid.value, postId.value).then((result) => {
      isLike.value = result;
    });
  };

  const onToggleLike = () => {
    if (!uid.value || !isAuthenticated.value) {
      return alert('로그인이 필요합니다.');
    }

    if (isLike.value) {
      return Post.removeLike(uid.value, postId.value).then(() => {
        isLike.value = false;
        likeCount.value -= 1;
      });
    }

    return Post.addLike(uid.value, postId.value).then(() => {
      isLike.value = true;
      likeCount.value += 1;
    });
  };

  watch(
    isAuthenticated,
    () => {
      initLike();
    },
    {
      immediate: true
    }
  );

  return {
    isLike,
    likeCount: readonly(likeCount),
    updateLikeCount: (count: number) => (likeCount.value = count),
    onToggleLike
  };
};
