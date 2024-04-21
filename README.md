# Nuxt 3 Quasar app with TypeScript

## Build Setup

```shell
npm install
npm run dev
```

## 프로젝트 설명
해당 강의는 다음 강의를 보고 정리한 저장소이다.
- https://www.inflearn.com/course/vue3-firebase10-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0%EB%A7%8C%EB%93%A4%EA%B8%B0/dashboard

위 강의는 Vue3 기반으로 강의를 진행하지만, 학습할 때는 Nuxt3로 진행하였다.

## ESLint / Prettier 설정
```shell
npm i -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue eslint-plugin-nuxt @typescript-eslint/eslint-plugin @typescript-eslint/parser @nuxtjs/eslint-config-typescript
```

## quasar Module 설치
1. `nuxt-quasar-ui` 설치

```shell
npm install quasar @quasar/extras
npm install --save-dev nuxt-quasar-ui
```

## vue-use 관련
해당 강의는 Vue3 기반으로 강의를 진행하므로, store를 사용할 때 `vue-use`를 사용하였다.  
근데, Nuxt3에서는 `pinia-plugin-persistedstate`를 사용해서 store의 상태를 유지시킬 수 있으므로,  
`vue-use`를 사용하지 않고, `pinia-plugin-persistedstate`를 사용하였다.

기록해두는 건 좋을 것 같아 스토어를 `localStorage`에 저장할 땐, `useLocalStorage`함수를 사용하였다.
- https://vueuse.org/core/useLocalStorage/#uselocalstorage

```typescript
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

{
  user: useLocalStorage('user', null, { serializer: StorageSerializers.object })
}
```

### vue-use useAsyncState
해당 강의에서는 `useAsyncState`를 사용해서 비동기 호출 상태를 관리하였다.  
근데, Nuxt3에는 자체적으로 `useAsyncData` 컴포저블을 제공한다.

그렇기에 설치를 하지 않았고, `useAsyncData`를 사용하였다.  
또한, 둘이 비교를 해본 결과 거의 유사하다.

근데,  
`firebase` SDK를 사용할 땐 굳이 사용해야 하나 싶다. `SignInForm`에서 좀 사용해본 결과,  
이미 만들어진 SDK를 사용하면 억지로 `$fetch`든, `useAsyncData`든 사용하지 않고 자체적으로 관리하는 것이 유지보수 차원에서는 더 쉬워보인다.

간단하게 체험 정도로 좀 억지로 구성해본 거지만 다음과 같이 사용할 수 있다.
```typescript
const { pending, error, execute, status } = useAsyncData('signIn', () => Auth.signInWithEmail(form.value), {
  immediate: false
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
```
이미 `Auth.signInWithEmail`라고 관리되고 있는 `Util`로 감싸져 있는데, `useAsyncData`를 사용하면 또 감싸기에 불편해보인다.  
또한, `pending`값이 자동으로 값이 왔다갔다 하는 것이 아니라서 `pending`값을 직접 관리해야 한다.  
강의에서 사용하는 `useAsyncState`는 `isLoading`이라는 값을 아예 따로 내려보내줘서 괜찮아 보이긴한다.

다음과 같이,  
그냥 `Promise`를 쓰고, `loading`, `error`는 따로 관리하자. 
```typescript
const onSubmitEmail = () => {
loading.value = true;
Auth.signInWithEmail(form.value)
  .then(() => {
    Notify.create({
      type: 'positive',
      message: '환영합니다!'
    });
    emit('closeDialog');
  })
  .catch((err) => {
    error.value = err;
    Notify.create({
      type: 'negative',
      message: ErrorMessages.getErrorMessage(err.code)
    });
  })
  .finally(() => (loading.value = false));
};
```

## vue onErrorCaptured hook API
Vue3에서 `onErrorCaptured` hook API를 이용해서 전역 Vue 에러를 핸들링할 수 있다.  
Nuxt3에서는 `plugin`을 이용해서 전역 에러를 핸들링할 수 있다.
- plugins/errorHandler.ts

근데,  
`async/await`구문을 사용해서 함수가 에러를 발생시킬 때 에러가 집계되지만,  
`Promise`을 사용해서는 에러가 집계되지 않는다. `catch`절로 에러를 잡지 않더라도 말이다.

`async/await`구문을 사용할 때 `try/catch`절로 감싸지 않았는데 에러가 집계되는 반면,  
`catch`절로 감싸주지 않았으면 집계될 줄 알았는데 집계되지 않아서 신기했다.

평소하던대로 `error`가 발생하면 `util`이나 `composable`로 에러를 핸들링하는 것이 좋을 것 같다.

## firestore
`document`는 파이어베이스의 저장 단위이며, `collection`은 `document`의 묶음이다.  
`document`는 가볍게 저장해야 하는 데이터.

우리 프로젝트에선 다음과 같이 저장할 것이다.
- `posts/{postID}/comments/{commentID}`
- `likes/{userID_postID}`
- `users/{userID}/bookmarks/{bookmarkID}`
- `tags/{tagName}`
