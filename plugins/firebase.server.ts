import { getApp, initializeApp } from 'firebase/app';

const createFirebaseApp = () => {
  const config = useRuntimeConfig();
  try {
    return getApp();
  } catch {
    const firebaseConfig = {
      apiKey: config.public.firebaseApiKey,
      authDomain: config.public.firebaseAuthDomain,
      projectId: config.public.firebaseProjectId,
      storageBucket: config.public.firebaseStorageBucket,
      messagingSenderId: config.public.firebaseMessagingSenderId,
      appId: config.public.firebaseAppId,
      measurementId: config.public.firebaseMeasurementId
    };

    return initializeApp(firebaseConfig);
  }
};

export default defineNuxtPlugin(() => {
  createFirebaseApp();
});
