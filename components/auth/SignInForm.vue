<script setup lang="ts">
import { Auth } from '@/service/auth';
import type { SignIn } from '@/types/sign';

interface Emits {
  (event: 'changeView', view: string): void;
  (event: 'closeDialog'): void;
}
const emit = defineEmits<Emits>();

// 이메일 로그인
const form = ref<SignIn>({
  email: '',
  password: ''
});
// const loading = ref(false);
// const error = ref<any>('');

const { pending, error, execute, status } = useAsyncData('signIn', () => Auth.signInWithEmail(form.value), {
  immediate: false
});
const errorCode = computed(() => {
  if (error.value == null) {
    return '';
  }

  return error.value.cause?.code ?? '';
});

const onSubmitEmail = async () => {
  await execute();
  pending.value = true;
  if (status.value === 'success') {
    Notify.create({
      type: 'positive',
      message: '환영합니다!'
    });
    emit('closeDialog');
  } else if (status.value === 'error') {
    Notify.create({
      type: 'negative',
      message: ErrorMessages.getErrorMessage(error.value?.cause!.code)
    });
  }
};

// const onSubmitEmail = () => {
// loading.value = true;
// Auth.signInWithEmail(form.value)
//   .then(() => {
//     Notify.create({
//       type: 'positive',
//       message: '환영합니다!'
//     });
//     emit('closeDialog');
//   })
//   .catch((err) => {
//     error.value = err;
//     Notify.create({
//       type: 'negative',
//       message: ErrorMessages.getErrorMessage(err.code)
//     });
//   })
//   .finally(() => (loading.value = false));
// };

// 구글 로그인
const onClickSignInGoogle = () => {
  Auth.signInWithGoogle().then(() => {
    Notify.create({
      type: 'positive',
      message: '환영합니다! 🎉'
    });
    emit('closeDialog');
  });
};
</script>

<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <q-form
      class="q-gutter-y-md"
      @submit.prevent="onSubmitEmail"
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
        :rules="[ValidationRules.validateRequired]"
        type="password"
        placeholder="비밀번호"
        outlined
        dense
        hide-bottom-space
      />
      <DisplayError :code="errorCode" />
      <div>
        <q-btn
          type="submit"
          label="로그인하기"
          class="full-width"
          unelevated
          color="primary"
          :loading="!pending"
        />
        <div class="flex justify-between">
          <q-btn
            label="비밀번호 찾기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'AuthFindPasswordForm')"
          />
          <q-btn
            label="이메일 가입하기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'AuthSignUpForm')"
          />
        </div>
      </div>
      <q-separator />
      <q-btn
        label="구글 계정으로 로그인하기"
        class="full-width"
        unelevated
        color="primary"
        outline
        @click="onClickSignInGoogle"
      />
    </q-form>
  </div>
</template>

<style scoped></style>
