<script setup lang="ts">
defineEmits(['changeView']);
</script>

<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form class="q-gutter-y-md">
      <q-input
        placeholder="닉네임"
        outlined
        dense
      />
      <q-input
        placeholder="이메일"
        outlined
        dense
      />
      <q-input
        placeholder="비밀번호(문자, 숫자조합 8자 이상)"
        outlined
        dense
      />
      <q-btn
        label="가입하기"
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
