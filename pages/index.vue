<script setup lang="ts">
// const goPostDetails = async (id: number) => {
//   await navigateTo(`/posts/${id}`);
// };
import { Post } from '@/service';
import type { PostData } from '~/types/post';

const posts = ref<PostData[]>([]);
const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt'
});

const setPosts = () => {
  Post.getPosts(params.value)
    .then((res) => {
      posts.value = res;
    })
    .catch((err) => {
      console.error(err);
    });
};

watch(
  [() => params.value.category, () => params.value.tags, () => params.value.sort],
  () => {
    setPosts();
  },
  {
    immediate: true
  }
);

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};

const onCompleteRegistrationPost = () => {
  postDialog.value = false;
  setPosts();
};
</script>

<template>
  <q-page padding>
    <div class="row q-gutter-x-lg">
      <AppsPostLeftBar
        v-model="params.category"
        class="col-grow"
      />
      <section class="col-7">
        <AppsPostHeader v-model="params.sort" />
        <AppsPostList :items="posts" />
      </section>
      <AppsPostRightBar
        v-model:tags="params.tags"
        class="col-3"
        @open-write-dialog="openWriteDialog"
      />
    </div>
    <AppsPostWriteDialog
      v-model="postDialog"
      @complete="onCompleteRegistrationPost"
    />
  </q-page>
</template>

<style scoped></style>
