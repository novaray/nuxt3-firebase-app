<script setup lang="ts">
definePageMeta({
  width: '800px'
});

const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: []
});

const form = ref(getInitialForm());
const loading = ref(false);

const { getPost, updatePost } = usePost();

const onSubmit = () => {
  if (!confirm('수정하시겠어요?')) {
    return;
  }

  loading.value = true;
  return updatePost(form.value).finally(() => {
    loading.value = false;
  });
};

getPost().then((data) => {
  form.value.title = data.title;
  form.value.category = data.category;
  form.value.content = data.content;
  form.value.tags = data.tags;
});
</script>

<template>
  <q-page padding>
    <AppsBaseCard>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>
      <q-separator />
      <AppsPostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
        :loading="loading"
        @submit="onSubmit"
      >
        <template #actions>
          <q-btn
            v-close-popup
            flat
            label="취소"
          />
          <q-btn
            type="submit"
            flat
            label="수정"
            color="primary"
            :loading="loading"
          />
        </template>
      </AppsPostForm>
    </AppsBaseCard>
  </q-page>
</template>

<style scoped></style>
