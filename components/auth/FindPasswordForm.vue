<script setup lang="ts">
defineEmits(['changeView']);
</script>

<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">비밀번호 찾기</div>
    <q-form class="q-gutter-y-md">
      <q-input
        placeholder="가입한 이메일"
        outlined
        dense
      />
      <q-btn
        label="확인"
        class="full-width"
        unelevated
        color="primary"
      />
      <q-separator />
      <q-btn
        label="로그인하기"
        class="full-width"
        unelevated
        flat
        @click="$emit('changeView', 'AuthSignInForm')"
      />
    </q-form>
  </div>
</template>

<style scoped></style>
