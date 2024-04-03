import type { Auth } from '@firebase/auth';

declare module '#app' {
  interface NuxtApp {
    $auth: Auth;
  }
}
