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
node 버전은 firebase에서 18을 권장하기에 18로 세팅한다.

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

## addDoc vs setDoc
`addDoc`는 `document`를 추가할 때 사용하며, `document`의 `id`는 자동으로 생성된다.  
`setDoc`는 `document`를 추가할 때 사용하며, `document`의 `id`를 직접 지정할 수 있다(자동으로도 생성 가능).  
또한, `setDoc`는 `document`가 이미 존재할 때, `document`를 업데이트할 때 사용한다(없으면 생성한다).

## firebase startAt, startAfter, endAt, endBefore
`startAt`은 해당 값 이상, `startAfter`는 해당 값 초과, `endAt`은 해당 값 이하, `endBefore`는 해당 값 미만을 의미한다.    

내림차순일 때 조심해야하는데,  
만약 데이터에서 조회수가 3, 2, 1있고 조회수 기준으로 내림차순이 적용되어있고, `endAt`을 2로 설정하면 3, 2가 조회된다.  
`endBefore`를 2로 설정하면 3만 조회된다.  
`startAt`을 2로 설정하면 2, 1이 조회되고, `startAfter`를 2로 설정하면 1만 조회된다.

## Cloud Functions
`cloud functions`는 서버리스 함수를 만들 수 있는 서비스이다.  
해당 기능을 사용하려면 구글 결제 정보를 등록해야 한다(무료 요금제로는 사용이 불가능).

다음 링크를 따라 설치를 진행했다.  
- https://firebase.google.com/docs/functions/get-started?hl=ko&gen=2nd#initialize-your-project

`firebase init` 명령어를 터미널에서 `firebase` 디렉토리 경로 안에서 실행을 했다.

설치할 때는 다음의 설정을 선택했다.
- Firestore
- Functions
- Hosting
- Storage
- Emulators: 에뮬레이터는 작성한 함수를 로컬에서 테스트할 수 있는 환경을 제공한다.

`Emulators` 셋업에서 선택한 항목은 다음과 같다.
- Firestore Emulator
- Functions Emulator
- Authentication Emulator
- Storage Emulator

그 외 항목들은 기본값으로 설정했다.  
추가로, firebase는 node환경이므로 `required`, `exports` 구문을 사용해야하므로, 해당 폴더내의 파일들은 `eslint`를 비활성화 해버렸다.  
물론, `package.json` 파일에서 `type`을 `module`로 설정하면 되지만 `node`환경을 좀 더 명확히 하고자 설정하지는 않았다.  

## firebase admin 인증
firebase 콘솔 설정에서 `서비스 계정`을 클릭하고, `새 비공개 키 생성`을 클릭한다.  
해당 파일은 `json` 파일로 다운로드 받는데, 해당 파일을 `functions` 폴더에 넣어두면 된다.

해당 파일은 노출되면 안 되므로 `.gitignore`에 추가해두었고,  
`firebase/functions/index.ts` 파일에서 `serviceAccountKey.json` 파일에 저장해 사용하고 있다.

## cloud functions 타입스크립트
`firebase/functions/package.json`파일에서 `main` 경로가 `lib/index.js`로 되어있는데,  
이게 자바스크립트로 설정했을 때의 경로가 그대로 적혀있는 줄 알고 `src/index.ts`파일로 수정했었다.  
실제로 에물레이터로 실행할 때도 타입 지정만 안 하면 실행도 잘 되길래 문제없는 줄 알았다.

그러나, 배포를 할 때 문제가 되었는데 계속 타입스크립트 파일을 인식 못해서 배포에 에러가 발생하는 것이었다.  
타입스크립트 파일을 빌드해서, 결과물로 나온 `lib/index.js`파일을 배포해야 되는 것이었다.  
즉, 다음의 순서를 따라야 한다.
1. 작성한 타입스크립트 파일을 빌드한다(`npm run build`(`tsc`)).
2. 빌드된 결과물을 배포한다.

이럴거면 처음 세팅할 때 타입스크립트말고 자바스크립트로 설정하는 것이 훨씬 편하지 않나라는 생각은 든다.

`firebase/functions/index.ts`을 처음 작성할 때 에뮬레이터에서 오류가 나서 타입지정을 빼버렸는데 다 이유가 있는 거였다.  
`//@ts-ignore`를 사용해서 타입지정 주석은 그냥 남겨두었다. -> 2024/05/23에 제거함.

그리고,  
어떤 유저가 `package.json`의 `moduleResolution`까지 세팅을 해주어야 한다고 해서 세팅도 해주었다.

## cloud functions 배포 후 문제시 재배포 할 때
cloud functions를 배포하고, 제대로 배포가 안 되어 문제가 생긴 후 재배포할 때 다시 배포가 안 된다.  
문제가 생긴 함수를 덮어쓰는 기능이 없는 것인지는 모르겠지만, 삭제 후 다시 배포를 해야한다.

`firebase console`에서 함수를 삭제 못하고 `CLI`로 삭제를 해야한다.  
```shell
firebase functions:delete 함수이름
```

> https://firebase.google.com/docs/functions/manage-functions?gen=2nd&hl=ko#delete_functions

## firebase 설치 후 webstorm typescript 에러 해결
`firebase`를 설치하고, `webstorm`에서 타입스크립트 에러가 발생한다.  
`vue`파일 및 일반적인 타입스크립트 파일에서 모두 에러가 발생했다.

확인해보니,  
`firebase`에서 세팅된 타입스크립트와 `nuxt`에서 세팅된 타입스크립트 버전이 달라서 발생한 문제였다.  
`webstorm`에서 `firebase`의 타입스크립트 버전을 따라가게 세팅되어있어서 발생한 문제였다.  
- 늦게 설치된 타입스크립트 버전을 따라가나..?
  - firebase: 4.9.5
  - nuxt: 5.4.3

`Project Settings - Languages & Frameworks - TypeScript`에서 버전을 현 프로젝트 `node_modules`의 버전으로 변경해주면 된다. 

### 특정 함수만 배포하고 싶을 때 
```shell
firebase deploy --only functions:함수이름
```

## algolia
`algolia`는 검색엔진 서비스이다.  
`Nuxt`에서 설치가이드는 Vue 설치가이드와는 다르다. 공식 문서는 다음과 같다.
- https://algolia.nuxtjs.org/

설치 스크립트는 다음과 같다.
```shell
npm install @nuxtjs/algolia
```

설치 후에, algolia 세팅을 `nuxt.config.ts`파일에 설정해주어야 한다.  
`modules`에 설치한 `@nuxtjs/algolia`를 추가하고, `algolia` 객체를 추가해주면 된다.  
그 외 설정은 Vue InstantSearch에서 설정하는 것과 동일하기에 `algolia` 공식 문서를 보면 된다.  
> https://www.algolia.com/doc/api-reference/widgets/vue/

데모를 보고 참조하면서 개발하는 것이 좋을 듯 하다.  
> https://www.algolia.com/doc/guides/building-search-ui/resources/demos/vue/

데모에서 쓰인 위젯들은 다음 공식 문서에서 확인이 가능하다.
> https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/vue/

만약 데이터를 등록했는데 `algolia`에 데이터가 안 올라가면,  
`index` 콘솔에서 `Search API Logs` 탭을 확인해보면 어떤 문제가 있는지 확인할 수 있다.

### algolia 사용
현 프로젝트에서는 `posts` 데이터들을 `algolia`에 저장하고, 검색을 할 수 있도록 구성하였다.  
`postId`는 `algolia`에서 `objectID`로 된다.

`algolia`에서 검색 후 텍스트가 길면, `Configuration - Attributes to retrieve`에서 제거하고 가져올 수 있는데, 
`-`(마이너스) 키워드를 붙이고 제거하고 싶은 키워드를 입력하면 된다(ex_ `-content`).  
그러면 해당 키워드는 검색 결과에서 제외된다.

제한된 키워드를 설정하고, 그래도 데이터를 가져오고 싶다면, `Configuration - Snippeting` 설정에서 제한된 글자만큼 가져올 수 있다.  
이렇게 제한된 스니펫은 객체에 그대로 담겨져 오는 것이 아닌, `_snippetResult`로 담겨져 오게 된다. 내부 프로퍼티는 다음과 같다.
- `value`: 제한된 글자만큼 가져온 텍스트
- `matchLevel`: 일치하는 레벨
- `matchedWords`: 일치하는 단어

타이핑을 통해 검색을 할 때, 모든 항목의 데이터에 대해서 검색하면 비효율적이다.  
`algolia`에서는 `Configuration - searchableAttributes`를 설정해서 검색할 항목을 설정할 수 있다.  
예를 들어, 현 `search` 페이지에서는 카테고리에서는 왼쪽 사이드바에서 검색이 가능하니 `title`, `category`만 검색하도록 구성했다.

페이지네이션도 컴포넌트만 추가하면 자동으로 설정이된다.  
한 번에 가져올 개수는 대시보드에서도 설정이 가능하고 코드에서도 `AisConfigure` 컴포넌트를 이용해서 설정이 가능하다.  
대시보드에서는 `Configuration - Pagination`에서 설정이 가능하고, 코드에서는 `hitsPerPage.camel`를 설정하면 된다.

### algolia firebase
`firebase`에서 `algolia` 서드파티를 연동하려면 확장 툴을 깔아야 한다.  
해당 확장은 공짜로 제공해주지는 않고 최소 결제로 0.01달러부터 시작한다.

처음 확장 설치 후 `algolia`의 인덱스와 `firebase`의 `collection`을 연동하려면,  
`API Key`를 세팅해주어야 하는데, `algolia`에서 `API key`를 생성 후 연동해주면된다.  
연동 조건으로는 `firebase`에서는 다음과 같이 언급하고 있다.
- with “addObject”, “deleteObject”, “listIndexes”, “deleteIndex”, “editSettings”, and “settings” permissions. Do not use the Admin API key.

즉, `firebase`에서는 `Admin API key`를 사용하면 안되고, 언급한 권한을 가진 `API key`를 사용해서 붙여주면 된다.  
참고로 `algolia`의 무료 플랜은 `10kb`까지 가능하다.

## firebase hosting
Nuxt에서 제공하는 배포 문서는 다음과 같다.  
> https://nuxt.com/deploy/firebase

해당 프로젝트에서는 `firebase init`을 실행할 때 해당 프론젝트에 `hosting`을 다이렉트로 추가한 것이 아닌,  
firebase 관련 소스를 따로 `firebase` 폴더에 넣어두었다.

그렇기에 `nuxt.config.ts`에서 `nitro` 설정을 추가로 해주었는데,  
`preset`, `output`, `firebase`관련 설정을 해두었다.

내가 사용하고 있는 firebase는 2세데 이므로 `gen` 속성도 설정해두었다.
`region`을 따로 설정 안 하면 기본적으로, `us-central1`로 설정된다.  
따라서 서울 리전인 `asia-northeast3`로 설정해주었다.

배포할 때는, `functions`와 `hosting`만 배포하도록 다음 스크립트를 실행했다.
```shell
firebase deploy --only functions:server,hosting
```

### firebase hosting 트러블 슈팅

#### build
nuxt에서 `nuxi build`를 통해 빌드를 진행하면 `.output` 폴더가 생성된다.  
이것의 폴더 지정을 다음 `document`를 참조하여 설정했는데 정상적으로 output directory가 설정되지 않았다.  
> https://nuxt.com/docs/api/nuxt-config#builddir

알고보니, `.output`은 `nitro`의 영역이므로 `nitro`에 설정을 해주어야 한다.  
> https://nitro.unjs.io/config#output

#### hosting
가장 많이 헤맨 부분은 hosting 과정이었다.  
얼핏 여러 글들을 찾아본 결과, `.output/server` 폴더에서 `npm install`을 진행하라고 했는데 왜 설치해야되는지 몰랐다.  
`nuxt build`로 빌드를 진행하면 자동으로 `node_modules`가 생성되었기 때문이다.  
그러나, 혹시나 싶어서 `node_modules` 폴더를 지우고 `npm install`을 진행한 후, `hosting`을 진행했는데 정상적으로 배포가 되었다.

#### index.html
두 번째로는 `hosting`은 제대로 됐는데, `firebase`에서 기본적으로 제공하는 `index.html`, `404.html`때문에 웹페이지가 제대로 안 떴다.  
이것 때문에 실제로 구현한 웹앱의 index페이지가 아닌, firebase에서 제공하는 index페이지가 뜨는 것이었다.  
그래서 배포가 계속 실패한 줄 알았다.

근데, 혹시나 싶어서 다른 라우트로 접근해보니 제대로 배포가 된 것이었다.  
그래서 `firebase`에서 제공하는 `index.html` 및 `404.html`을 제거하고, 다시 배포를 진행해보니 정상적으로 index(home) view가 뜨는 것을 확인했다.

## 배포 사이트
- https://skkim-nuxt3-firebase-app.web.app/

참고) 닫혀 있을 수 있음.
- **2024/06/01 자로 닫음.**
