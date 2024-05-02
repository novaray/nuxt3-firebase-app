<script setup lang="ts">
// const goPostDetails = async (id: number) => {
//   await navigateTo(`/posts/${id}`);
// };
import { Post } from '@/service';
import type { PostData } from '~/types/post';

const posts = ref<PostData[]>([]);
const startPost = ref<PostData>();
const loadMore = ref(true);
const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
  limit: 2
});

const setPosts = (parameters: Record<string, any>) => {
  Post.getPosts(parameters)
    .then((res) => {
      if (startPost.value) {
        posts.value = posts.value.concat(res.items);
      } else {
        posts.value = res.items;
      }

      loadMore.value = res.items.length >= params.value.limit;
      startPost.value = res.lastItem;
    })
    .catch((err) => {
      console.error(err);
    });
};

watch(
  [() => params.value.category, () => params.value.tags, () => params.value.sort],
  () => {
    startPost.value = undefined;
    setPosts(params.value);
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
  startPost.value = undefined;
  setPosts(params.value);
};

const onLoadMore = () => {
  setPosts({
    ...params.value,
    start: startPost.value
  });
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
        <q-btn
          v-if="loadMore"
          class="full-width q-mt-md"
          label="더보기"
          outline
          @click="onLoadMore"
        />
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
