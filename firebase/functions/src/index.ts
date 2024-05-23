// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.

const functions = require('firebase-functions');

const { onDocumentCreated, onDocumentDeleted, FirestoreEvent } = require('firebase-functions/v2/firestore');

// The Firebase Admin SDK to access Firestore.
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');
const serviceAccount = require('../serviceAccountKey.json');
const { logger } = functions;

const { setGlobalOptions } = require('firebase-functions/v2');
setGlobalOptions({ maxInstances: 10 });

const app = initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore(app);
const region = 'asia-northeast3';

exports.onCreateBookmark = onDocumentCreated(
  {
    region,
    document: 'users/{uid}/bookmarks/{postId}' // bookmarkId가 postId이니 postId로 사용.
  },
  (event: typeof FirestoreEvent) => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      bookmarkCount: FieldValue.increment(1)
    });
  }
);

exports.onDeleteBookmark = onDocumentDeleted(
  {
    region,
    document: 'users/{uid}/bookmarks/{postId}'
  },
  (event: typeof FirestoreEvent) => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      bookmarkCount: FieldValue.increment(-1)
    });
  }
);

exports.onCreateComment = onDocumentCreated(
  {
    region,
    document: 'posts/{postId}/comments/{commentId}'
  },
  (event: typeof FirestoreEvent) => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      commentCount: FieldValue.increment(1)
    });
  }
);

exports.onDeleteComment = onDocumentDeleted(
  {
    region,
    document: 'posts/{postId}/comments/{commentId}'
  },
  (event: typeof FirestoreEvent) => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      commentCount: FieldValue.increment(-1)
    });
  }
);

exports.onCreateLike = onDocumentCreated(
  {
    region,
    document: 'post_likes/{id}'
  },
  (event: typeof FirestoreEvent) => {
    const snapshot = event.data;
    const data = snapshot.data();
    logger.log('data: ', data);
    db.doc(`posts/${data.postId}`).update({
      likeCount: FieldValue.increment(1)
    });
  }
);

exports.onDeleteLike = onDocumentDeleted(
  {
    region,
    document: 'post_likes/{id}'
  },
  (event: typeof FirestoreEvent) => {
    const snapshot = event.data;
    const data = snapshot.data();
    logger.log('data: ', data);
    db.doc(`posts/${data.postId}`).update({
      likeCount: FieldValue.increment(-1)
    });
  }
);

exports.onCreateUser = functions
  .region(region)
  .auth.user()
  .onCreate((user: any) => {
    logger.log(user);
    // providerData의 providerId가 password이면 다른 인증 체계(ex. google, ...etc)를 거치지 않은 직접 회원 가입한 경우.
    const isPasswordProvider = user.providerData.some((provider: any) => provider.providerId === 'password');
    const defaultPhotoUrl = `https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${user.uid}`;
    const displayName = isPasswordProvider ? user.email.split('@')[0] : user.displayName;

    const photoURL = isPasswordProvider ? defaultPhotoUrl : user.photoURL;

    return db.doc(`users/${user.uid}`).set({
      email: user.email,
      displayName,
      photoURL,
      createdAt: Timestamp.fromDate(new Date(user.metadata.creationTime))
    });
  });

exports.onDeleteUser = functions
  .region(region)
  .auth.user()
  .onDelete((user: any) => {
    logger.log(user);
    return db.doc(`users/${user.uid}`).delete();
  });
