<script setup lang="ts">
import { Comment } from '@/service';
import type { CommentData } from '~/types/comment';

const isActive = ref(false);
const toggleActive = () => (isActive.value = !isActive.value);

const route = useRoute();

const comments = ref<CommentData[]>([]);
const commentTitle = computed(() => `댓글 ${comments.value.length}`);

const getComments = () => {
  Comment.getComments(route.params.id as string).then((commentsData) => {
    comments.value = commentsData;
  });
};

getComments();

const authStore = useAuthStore();
const message = ref('');
const addLoading = ref(false);
const onSubmitAddComment = () => {
  addLoading.value = true;
  Comment.addComment(route.params.id as string, {
    message: message.value,
    uid: authStore.uid
  })
    .then(() => {
      getComments();
      message.value = '';
    })
    .catch(useFireStoreError)
    .finally(() => {
      isActive.value = false;
      addLoading.value = false;
    });
};

const onDeletedComment = () => getComments();
</script>

<template>
  <div>
    <div class="text-subtitle1 text-weight-bold q-mb-lg">{{ commentTitle }}</div>

    <div v-show="isActive">
      <q-form @submit.prevent="onSubmitAddComment">
        <q-input
          v-model="message"
          type="textarea"
          outlined
          hide-bottom-space
          :rules="[ValidationRules.validateRequired]"
        />
        <div class="flex justify-end q-gutter-x-sm q-mt-sm">
          <q-btn
            label="취소"
            color="dark"
            unelevated
            @click="toggleActive"
          />
          <q-btn
            type="submit"
            label="등록"
            color="primary"
            unelevated
            :loading="addLoading"
          />
        </div>
      </q-form>
    </div>

    <AppsBaseCard
      v-show="!isActive"
      class="cursor-pointer"
      @click="toggleActive"
    >
      <q-card-section class="flex items-center">
        <q-avatar>
          <img
            src="https://cdn.quasar.dev/img/avatar.png"
            alt="user-avatar"
          />
        </q-avatar>
        <div class="text-grey-6 q-ml-md">댓글을 작성해보세요.</div>
      </q-card-section>
    </AppsBaseCard>

    <AppsCommentList
      :items="comments"
      :post-id="route.params.id as string"
      @deleted="onDeletedComment"
    />
  </div>
</template>

<style scoped></style>
