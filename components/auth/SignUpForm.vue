<script setup lang="ts">
import { Notify } from 'quasar';
import { Auth } from '@/service';
import type { SignUp } from '@/types/sign';

interface Emits {
  (event: 'changeView', view: string): void;
  (event: 'closeDialog'): void;
}
const emit = defineEmits<Emits>();

const form = ref<SignUp>({
  email: '',
  password: ''
});
const passwordConfirm = ref('');

const onSubmit = () => {
  Auth.signUpWithEmail(form.value).then(() => {
    Notify.create({
      type: 'positive',
      message: '가입을 환영합니다! 🎉'
    });
    Notify.create({
      type: 'positive',
      message: '이메일에서 인증을 완료해주세요! 📧'
    });
    emit('closeDialog');
  });
};
</script>

<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form
      class="q-gutter-y-md"
      @submit.prevent="onSubmit"
    >
      <q-input
        v-model="form.email"
        :rules="[ValidationRules.validateRequired, ValidationRules.validateEmail]"
        placeholder="이메일"
        outlined
        dense
        hide-bottom-space
      />
      <q-input
        v-model="form.password"
        :rules="[ValidationRules.validateRequired, ValidationRules.validatePassword]"
        type="password"
        placeholder="비밀번호(문자, 숫자조합 8자 이상)"
        outlined
        dense
        hide-bottom-space
      />
      <q-input
        v-model="passwordConfirm"
        :rules="[
          ValidationRules.validateRequired,
          (value) => ValidationRules.validatePasswordConfirm(form.password, value)
        ]"
        type="password"
        placeholder="비밀번호 확인"
        outlined
        dense
        hide-bottom-space
      />
      <q-btn
        type="submit"
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
