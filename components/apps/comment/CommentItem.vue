<script setup lang="ts">
import { date } from 'quasar';
import type { CommentData } from '@/types/comment';
import { User } from '@/service';
import type { PostUser } from '@/types/post';
const props = defineProps<CommentData>();

interface Emits {
  (event: 'delete', id: string): void;
}
const emit = defineEmits<Emits>();

const { hasOwnContent } = useAuthStore();

const commentUser = ref<PostUser | null>(null);
const getUser = () => {
  User.getUserById(props.uid)
    .then((user) => {
      if (!user) {
        return;
      }

      commentUser.value = user;
    })
    .catch(useFireStoreError);
};
getUser();
</script>

<template>
  <q-item class="q-py-md">
    <q-item-section
      side
      top
    >
      <q-avatar size="md">
        <img
          :src="commentUser?.photoURL ?? 'https://cdn.quasar.dev/img/avatar.png'"
          alt="user-avatar"
        />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex text-caption">
        <span>{{ commentUser?.displayName ?? '닉네임' }}</span>
        <span class="q-mx-xs">&middot;</span>
        <span class="text-grey-6">{{ date.formatDate(createdAt, 'YYYY. MM. DD HH:mm:ss') }}</span>
      </div>
      <div class="q-mt-sm">
        {{ message }}
      </div>
    </q-item-section>
    <q-item-section
      v-if="hasOwnContent(uid)"
      side
      top
    >
      <q-btn
        flat
        color="grey"
        icon="sym_o_delete"
        round
        dense
        @click="emit('delete', id)"
      />
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
