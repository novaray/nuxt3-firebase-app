import type { Auth } from '@firebase/auth';
import type { FirebaseStorage } from '@firebase/storage-types';
import type { Firestore } from '@firebase/firestore';

declare module '#app' {
  interface NuxtApp {
    $auth: Auth;
    $db: Firestore;
    $storage: FirebaseStorage;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: Auth;
    $db: Firestore;
    $storage: FirebaseStorage;
  }
}

export {};
