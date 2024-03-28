<script setup lang="ts">
const isActive = ref(false);
const toggleActive = () => (isActive.value = !isActive.value);

const comments = ref([{ id: 1 }, { id: 2 }, { id: 3 }]);
</script>

<template>
  <div>
    <div class="text-subtitle1 text-weight-bold q-mb-lg">댓글 6</div>

    <div v-show="isActive">
      <q-input
        type="textarea"
        class="bg-white"
        outlined
      />
      <div class="flex justify-end q-gutter-x-sm q-mt-sm">
        <q-btn
          label="취소"
          color="dark"
          unelevated
          @click="toggleActive"
        />
        <q-btn
          label="등록"
          color="primary"
          unelevated
        />
      </div>
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

    <AppsCommentList :items="comments" />
  </div>
</template>

<style scoped></style>
