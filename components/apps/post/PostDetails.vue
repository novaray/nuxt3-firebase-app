<script setup lang="ts">
import { date } from 'quasar';
import type { PostData } from '~/types/post';

const { hasOwnContent } = useAuthStore();

const post = ref<PostData>();
const { getPostDetail, deletePost } = usePost();

const route = useRoute();
const { isLike, likeCount, updateLikeCount, onToggleLike } = useLike(route.params.id as string);
const { isBookmark, bookmarkCount, onToggleBookmark, updateBookmarkCount } = useBookmark(route.params.id as string);

getPostDetail().then((result) => {
  if (!result) {
    return;
  }

  post.value = result.post;
  updateLikeCount(result.post.likeCount);
  updateBookmarkCount(result.post.bookmarkCount);
});

const router = useRouter();
const onDeletePost = () => {
  if (!confirm('정말 삭제하시겠습니까?')) {
    return;
  }

  deletePost().then(() => {
    router.push('/');
  });
};
</script>

<template>
  <AppsBaseCard class="q-pa-lg">
    <div class="flex q-mb-md">
      <q-btn
        icon="sym_o_arrow_back"
        flat
        round
        dense
        color="grey"
        size="16px"
        @click="$router.back()"
      />
      <q-space />
      <q-btn
        :icon="isLike ? 'favorite' : 'sym_o_favorite'"
        flat
        round
        dense
        color="red"
        size="16px"
        @click="onToggleLike"
      />
      <q-btn
        :icon="isBookmark ? 'bookmark' : 'sym_o_bookmark'"
        flat
        round
        dense
        color="blue"
        size="16px"
        @click="onToggleBookmark"
      />
    </div>
    <div class="flex items-center">
      <q-avatar>
        <img
          src="https://cdn.quasar.dev/img/avatar.png"
          alt="user-avatar"
        />
      </q-avatar>
      <div class="q-ml-md">
        <div>짐코딩</div>
        <div class="text-grey-6">{{ date.formatDate(post?.createdAt, 'YYYY. MM. DD HH:mm:ss') }}</div>
      </div>
      <q-space />
      <q-btn
        v-if="hasOwnContent(post?.uid ?? '')"
        icon="more_horiz"
        round
        flat
      >
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item
              v-close-popup
              clickable
              :to="`/posts/${$route.params.id}/edit`"
            >
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="onDeletePost"
            >
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="q-mt-md text-h5 text-weight-bold">{{ post?.title }}</div>
    <div class="text-teal">
      <span
        v-for="tag in post?.tags ?? []"
        :key="tag"
      >
        #{{ tag }}&nbsp;
      </span>
      {{ post?.category }}
    </div>
    <div class="row items-center q-gutter-x-md q-mt-md justify-end">
      <AppsPostIcon
        name="sym_o_visibility"
        :label="post?.readCount ?? 0"
      />
      <AppsPostIcon
        name="sym_o_sms"
        :label="post?.commentCount ?? 0"
      />
      <AppsPostIcon
        name="sym_o_favorite"
        :label="likeCount"
      />
      <AppsPostIcon
        name="sym_o_bookmark"
        :label="bookmarkCount"
      />
    </div>
    <q-separator class="q-my-lg" />
    <TiptapViewer :content="post?.content" />
  </AppsBaseCard>
</template>

<style scoped lang="scss"></style>
