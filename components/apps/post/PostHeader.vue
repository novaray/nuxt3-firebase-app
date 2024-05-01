<script setup lang="ts">
const modelValue = defineModel<string>({ required: true });
</script>

<template>
  <div class="flex items-center q-mb-lg">
    <div class="text-h5">커뮤니티 목록</div>
    <q-space />
    <q-tabs
      v-model="modelValue"
      narrow-indicator
      dense
    >
      <q-tab
        :ripple="false"
        label="최신순"
        name="createdAt"
      />
      <q-tab
        :ripple="false"
        label="조회순"
        name="readCount"
      />
      <q-tab
        :ripple="false"
        label="좋아요순"
        name="likeCount"
      />
    </q-tabs>
  </div>
</template>

<style scoped></style>
