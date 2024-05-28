// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxtjs/algolia'],
  quasar: {
    plugins: ['Notify'],
    config: {
      notify: {
        position: 'top'
      }
    },
    extras: {
      fontIcons: ['material-symbols-outlined']
    }
  },
  algolia: {
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    instantSearch: { theme: 'algolia' }
  },
  buildDir: 'firebase/public',
  nitro: {
    preset: 'firebase',
    output: {
      dir: 'firebase/.output',
      serverDir: 'firebase/.output/server',
      publicDir: 'firebase/.output/public'
    },
    firebase: {
      nodeVersion: '18',
      gen: 2,
      httpsOptions: { region: 'asia-northeast3' }
    }
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
  }
});
