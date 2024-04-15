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
