import type { User } from '@firebase/auth';

interface Auth {
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): Auth => ({
    user: null
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    uid(state): string | null {
      return state.user?.uid || null;
    }
  },
  actions: {
    setUser(user: User | null) {
      if (!user) {
        this.user = user;
        return;
      }

      if (this.user) {
        this.user = {
          ...this.user,
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified
        };
        return;
      }

      this.user = user;
    },
    hasOwnContent(contentUid: string) {
      if (!this.isAuthenticated) {
        return false;
      }

      return this.uid === contentUid;
    }
  },
  persist: true
});
