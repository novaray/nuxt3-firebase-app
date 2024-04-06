import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile
} from '@firebase/auth';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import type { SignIn, SignUp } from '@/types/sign';

const DEFAULT_PHOTO_URL = 'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=';

export class Auth {
  static signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider).then(({ user }) => {
      return user;
    });
  }

  static logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  static signUpWithEmail({ email, password, nickname }: SignUp) {
    return createUserWithEmailAndPassword(getAuth(), email, password).then(({ user }) => {
      console.log(`user: ${user}`);
      return updateProfile(user, {
        displayName: nickname,
        photoURL: this.generateDefaultPhotoUrl(user.uid)
      });
    });
  }

  static generateDefaultPhotoUrl(uid: string) {
    return `${DEFAULT_PHOTO_URL}${uid}`;
  }

  static signInWithEmail({ email, password }: SignIn) {
    return signInWithEmailAndPassword(getAuth(), email, password).then(({ user }) => {
      return user;
    });
  }
}
