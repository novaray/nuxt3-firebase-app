<script setup lang="ts"></script>

<template>
  <AppsBaseCard>
    <q-card-section>
      <div class="text-h6">비밀번호 변경</div>
      <q-form class="q-gutter-y-md q-mt-md">
        <q-input
          type="password"
          label="새로운 비밀번호"
          outlined
          dense
        />
        <q-input
          type="password"
          label="새로운 비밀번호 확인"
          outlined
          dense
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
