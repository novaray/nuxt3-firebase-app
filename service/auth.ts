import { GoogleAuthProvider } from '@firebase/auth';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';

export class Auth {
  static signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider).then((result) => {
      console.log(result.user);
    });
  }

  static logout() {
    const auth = getAuth();
    return signOut(auth);
  }
}
