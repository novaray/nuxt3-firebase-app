<script setup lang="ts"></script>

<template>
  <AppsBaseCard>
    <q-card-section>
      <div class="text-h6">프로필</div>
      <q-form class="q-gutter-y-md q-mt-md">
        <q-input
          label="닉네임"
          outlined
          dense
        />
        <q-input
          label="이메일"
          outlined
          dense
          readonly
        />
      </q-form>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-space />
      <q-btn
        label="저장하기"
        color="primary"
        flat
      />
    </q-card-actions>
  </AppsBaseCard>
</template>

<style scoped></style>
