<script setup lang="ts">
// const goPostDetails = async (id: number) => {
//   await navigateTo(`/posts/${id}`);
// };

const posts = Array.from({ length: 20 }, (_, index) => ({
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
  createTime: new Date()
}));

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};
</script>

<template>
  <q-page padding>
    <div class="row q-gutter-x-lg">
      <AppsPostLeftBar class="col-grow" />
      <section class="col-7">
        <AppsPostHeader />
        <AppsPostList :items="posts" />
      </section>
      <AppsPostRightBar
        class="col-3"
        @open-write-dialog="openWriteDialog"
      />
    </div>
    <AppsPostWriteDialog v-model="postDialog" />
  </q-page>
</template>

<style scoped></style>
