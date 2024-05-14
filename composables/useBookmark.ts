import { Post } from '@/service';

export const useBookmark = (id: string, options: Record<string, number> = { initialCount: 0 }) => {
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());
  const { initialCount } = options;

  const isBookmark = ref(false);
  const bookmarkCount = ref(initialCount);
  const postId = ref(id);

  const initBookmark = () => {
    if (!uid.value || !isAuthenticated.value) {
      isBookmark.value = false;
      return;
    }

    return Post.hasBookmark(uid.value, postId.value).then((result) => {
      isBookmark.value = result;
    });
  };

  const onToggleBookmark = () => {
    if (!uid.value || !isAuthenticated.value) {
      return alert('로그인이 필요합니다.');
    }

    if (isBookmark.value) {
      return Post.removeBookmark(uid.value, postId.value).then(() => {
        isBookmark.value = false;
        bookmarkCount.value -= 1;
      });
    }

    return Post.addBookmark(uid.value, postId.value).then(() => {
      isBookmark.value = true;
      bookmarkCount.value += 1;
    });
  };

  watch(
    isAuthenticated,
    () => {
      initBookmark();
    },
    {
      immediate: true
    }
  );

  return {
    isBookmark,
    bookmarkCount: readonly(bookmarkCount),
    updateBookmarkCount: (count: number) => (bookmarkCount.value = count),
    onToggleBookmark
  };
};
