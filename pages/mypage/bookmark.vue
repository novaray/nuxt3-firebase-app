<script setup lang="ts">
const posts = Array.from({ length: 3 }, (_, index) => ({
  id: 'A' + index,
  title: `Vue3 Firebase 강의 ${index}`,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam, animi at delectus distinctio eligendi eos exercitationem, harum illo itaque laborum minima nemo officiis reiciendis sit suscipit tenetur voluptates, voluptatum.',
  readCount: 1,
  commentCount: 2,
  likeCount: 3,
  bookmarkCount: 4,
  tags: ['html', 'css', 'javascript'],
  uid: 'uid',
  category: `카테고리 ${index}`,
  createdAt: new Date()
}));
</script>

<template>
  <AppsPostList :items="posts" />
</template>

<style scoped></style>
