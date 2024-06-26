<script setup lang="ts">
import type { PostData, PostUser } from '@/types/post';
import { RelativeTimeFormat } from '@/utils/relativeTimeFormat';
import { User } from '@/service';

const props = withDefaults(defineProps<PostData>(), {
  readCount: 0,
  commentCount: 0,
  likeCount: 0,
  bookmarkCount: 0
});

const formattedCreatedAt = computed(() => RelativeTimeFormat.formatRelativeTime(props?.createdAt));

const {
  isLike,
  likeCount: activeLikeCount,
  onToggleLike
} = useLike(props.id, {
  initialCount: props.likeCount
});

const {
  isBookmark,
  bookmarkCount: activeBookmarkCount,
  onToggleBookmark
} = useBookmark(props.id, {
  initialCount: props.bookmarkCount
});

const postUser = ref<PostUser>();
const getUserById = () => {
  User.getUserById(props.uid)
    .then((user) => {
      if (!user) {
        return;
      }

      postUser.value = user;
    })
    .catch(useFireStoreError);
};
getUserById();
</script>

<template>
  <!-- q-item 컴포넌트는 기본적으로 div 태그이나, to props를 사용하면 a(앵커) 태그로 변환됨.-->
  <q-item
    class="bg-white q-pt-md"
    clickable
    :to="`/posts/${id}`"
  >
    <q-item-section
      avatar
      top
    >
      <q-avatar>
        <img
          :src="postUser?.photoURL ?? 'https://cdn.quasar.dev/img/boy-avatar.png'"
          alt=""
        />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span> {{ postUser?.displayName ?? '닉네임' }} </span>
        <span class="q-mx-xs">&middot;</span>
        <span>{{ formattedCreatedAt }}</span>
        <q-chip
          class="q-ml-sm"
          dense
          color="primary"
          text-color="white"
        >
          {{ category }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ title }}</div>
      <div class="text-primary text-caption">
        <span
          v-for="tag in tags"
          :key="tag"
          class="q-mr-sm"
        >
          #{{ tag }}&nbsp;
        </span>
      </div>
      <div
        class="text-grey-6 q-my-sm ellipsis-2-lines"
        v-html="content"
      />
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <AppsPostIcon
              name="sym_o_visibility"
              :label="readCount"
              tooltip="조회수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <AppsPostIcon
              name="sym_o_sms"
              :label="commentCount"
              tooltip="댓글수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              flat
              dense
              @click.prevent="onToggleLike"
            >
              <AppsPostIcon
                :name="isLike ? 'favorite' : 'sym_o_favorite'"
                :label="activeLikeCount"
                tooltip="좋아요"
              />
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              flat
              dense
              @click.prevent="onToggleBookmark"
            >
              <AppsPostIcon
                :name="isBookmark ? 'bookmark' : 'sym_o_bookmark'"
                :label="activeBookmarkCount"
                tooltip="북마크"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
