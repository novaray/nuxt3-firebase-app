import { doc, getDoc, getFirestore } from '@firebase/firestore';
import type { PostUser, RetrievePostUser } from '~/types/post';

export class User {
  static getUserById(id: string): Promise<null | PostUser> {
    const db = getFirestore();
    return getDoc(doc(db, 'users', id)).then((docSnap) => {
      if (!docSnap.exists()) {
        return null;
      }

      const data = docSnap.data() as RetrievePostUser;
      return {
        ...data,
        id,
        createdAt: data.createdAt.toDate()
      };
    });
  }
}
