<script setup lang="ts">
// const goPostDetails = async (id: number) => {
//   await navigateTo(`/posts/${id}`);
// };
import { Post } from '@/service';

const posts = ref<any[]>([]);

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};

onMounted(() => {
  Post.getPosts(undefined)
    .then((res) => {
      console.log(res);
      posts.value = res;
    })
    .catch((err) => {
      console.error(err);
    });
});
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
