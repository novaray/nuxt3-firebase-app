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
          email: user.email
        };
        return;
      }

      this.user = user;
    }
  }
});
