<script setup lang="ts">
import { Comment } from '@/service';
import type { CommentData } from '@/types/comment';

interface Props {
  items: CommentData[];
  postId: string;
}
const props = defineProps<Props>();

interface Emits {
  (event: 'deleted'): void;
}
const emit = defineEmits<Emits>();

const onDeleteComment = (commentId: string) => {
  if (!confirm('정말 삭제하시겠습니까?')) {
    return;
  }

  return Comment.deleteComment(props.postId, commentId)
    .then(() => {
      Notify.create({
        type: 'positive',
        message: '댓글이 삭제되었습니다.'
      });
      emit('deleted');
    })
    .catch(useFireStoreError);
};
</script>

<template>
  <q-list
    class="q-mt-lg bg-white"
    bordered
    separator
  >
    <AppsCommentItem
      v-for="item in items"
      :key="item.id"
      v-bind="item"
      @delete="onDeleteComment"
    />
  </q-list>
</template>

<style scoped></style>
