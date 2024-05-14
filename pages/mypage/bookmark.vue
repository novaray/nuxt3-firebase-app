<script setup lang="ts">
import { Post } from '@/service';
import type { PostData } from '@/types/post';

const authStore = useAuthStore();

const posts = ref<PostData[]>([]);

const init = () => {
  if (!authStore.uid) {
    return;
  }

  Post.getUserBookmarks(authStore.uid).then((res) => {
    posts.value = res;
  });
};
init();
</script>

<template>
  <AppsPostList :items="posts" />
</template>

<style scoped></style>
