import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp
} from '@firebase/firestore';
import type { CommentData } from '@/types/comment';

export class Comment {
  static addComment(postId: string, data: any) {
    const db = getFirestore();

    return addDoc(collection(db, 'posts', postId, 'comments'), {
      ...data,
      createdAt: serverTimestamp()
    }).then((docRef) => {
      return docRef.id;
    });
  }

  static getComments(postId: string): Promise<CommentData[]> {
    const db = getFirestore();
    const q = query(collection(db, 'posts', postId, 'comments'), orderBy('createdAt', 'desc'));

    return getDocs(q).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt.toDate()
        } as CommentData;
      });
    });
  }

  static deleteComment(postId: string, commentId: string) {
    const db = getFirestore();
    return deleteDoc(doc(db, 'posts', postId, 'comments', commentId));
  }
}
