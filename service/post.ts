import { addDoc, collection, getDocs, getFirestore, serverTimestamp } from '@firebase/firestore';
import type { CreatePostRequest } from '@/types/post';

export class Post {
  static createPost(data: CreatePostRequest) {
    const db = getFirestore();
    // id 지정, return이 void, 기존에 생성된 것이 있다면 덮어씌움.
    // return await setDoc(
    //   doc(db, 'posts', 'post-id'),
    //   {
    //     title: 'hello world'
    //     // ...data,
    //     // readCount: 0,
    //     // likeCount: 0,
    //     // commentCount: 0,
    //     // bookmarkCount: 0,
    //     // createdAt: serverTimestamp()
    //   },
    //   {
    //     merge: true // 기존에 생성된 것이 있다면 덮어씌움.
    //   }
    // );
    return addDoc(collection(db, 'posts'), {
      ...data,
      readCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      createdAt: serverTimestamp()
    }).then((docRef) => {
      return docRef.id;
    });
  }

  static getPosts(params: any) {
    const db = getFirestore();

    return getDocs(collection(db, 'posts')).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate()
      }));
    });
  }
}
