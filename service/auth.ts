import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile
} from '@firebase/auth';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import type { SignIn, SignUp } from '@/types/sign';
import { doc, getFirestore, updateDoc } from '@firebase/firestore';

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

  static signUpWithEmail({ email, password }: SignUp) {
    return createUserWithEmailAndPassword(getAuth(), email, password)
      .then(({ user }) => {
        return updateProfile(user, {
          displayName: email.split('@')[0],
          photoURL: this.generateDefaultPhotoUrl(user.uid)
        });
      })
      .then(this.sendVerificationEmail);
  }

  static generateDefaultPhotoUrl(uid: string) {
    return `${DEFAULT_PHOTO_URL}${uid}`;
  }

  static signInWithEmail({ email, password }: SignIn) {
    return signInWithEmailAndPassword(getAuth(), email, password).then(({ user }) => {
      return user;
    });
  }

  static sendPasswordReset(email: string) {
    return sendPasswordResetEmail(getAuth(), email).then(() => 'success');
  }

  static updateUserPassword(newPassword: string) {
    const user = getAuth().currentUser;
    if (user == null) {
      return Promise.reject(new Error('User is not signed in'));
    }

    return updatePassword(user, newPassword).then(() => 'success');
  }

  static sendVerificationEmail() {
    const user = getAuth().currentUser;
    if (user == null) {
      return Promise.reject(new Error('User is not signed in'));
    }

    return sendEmailVerification(user);
  }

  static updateUserProfile(displayName: string) {
    const user = getAuth().currentUser;
    if (user == null) {
      return Promise.reject(new Error('User is not signed in'));
    }

    return updateProfile(user, {
      displayName
    }).then(() => {
      const db = getFirestore();
      updateDoc(doc(db, 'users', user.uid), {
        displayName
      });
    });
  }

  static updateUserEmail(email: string) {
    const user = getAuth().currentUser;
    if (user == null) {
      return Promise.reject(new Error('User is not signed in'));
    }

    return updateEmail(user, email).then(() => {
      const db = getFirestore();
      updateDoc(doc(db, 'users', user.uid), {
        email
      });
    });
  }
}
