<script setup lang="ts">
import { Post } from '@/service';

const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: []
});

const form = ref(getInitialForm());

const onHide = () => {
  form.value = getInitialForm();
};

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);
const onSubmit = () => {
  Post.createPost({
    ...form.value,
    uid: authStore.uid
  })
    .then((postId) => {
      console.log(`postId: ${postId}`);
      router.push(`/posts/${postId}`);
    })
    .catch((error) => {
      Notify.create({
        type: 'negative',
        message: ErrorMessages.getErrorMessage(error.code)
      });
    });
};
</script>

<template>
  <q-dialog
    v-bind="$attrs"
    persistent
    @hide="onHide"
  >
    <q-card :style="{ width: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close"
        />
      </q-toolbar>
      <q-separator />
      <AppsPostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
        :loading="loading"
        @submit="onSubmit"
      />
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
