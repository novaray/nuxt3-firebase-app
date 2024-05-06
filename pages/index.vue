<script setup lang="ts">
// const goPostDetails = async (id: number) => {
//   await navigateTo(`/posts/${id}`);
// };
import type { Directive } from 'vue';
import { Post } from '@/service';
import type { PostData } from '@/types/post';

const { category, sort, tags } = usePostQuery();

const posts = ref<PostData[]>([]);
const startPost = ref<PostData>();
const loadMore = ref(true);
const params = computed(() => ({
  category: category.value,
  tags: tags.value,
  sort: sort.value,
  limit: 5
}));

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

watch([() => params.value.category, () => params.value.tags, () => params.value.sort], () => {
  startPost.value = undefined;
  setPosts(params.value);
});

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};

const onCompleteRegistrationPost = () => {
  postDialog.value = false;
  startPost.value = undefined;
  setPosts(params.value);
};

const vIntersectionObserver: Directive = {
  beforeMount: (el, binding) => {
    const observer = new IntersectionObserver(binding.value);
    observer.observe(el);
  }
};

const handleIntersectionObserver = ([{ isIntersecting }]: [{ isIntersecting: boolean }]) => {
  if (isIntersecting && loadMore.value) {
    console.log('isIntersecting');
    onLoadMore();
  }
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
        v-model="category"
        class="col-grow"
      />
      <section class="col-7">
        <AppsPostHeader v-model="sort" />
        <AppsPostList :items="posts" />
        <div v-intersection-observer="handleIntersectionObserver"></div>
      </section>
      <AppsPostRightBar
        v-model:tags="tags"
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
