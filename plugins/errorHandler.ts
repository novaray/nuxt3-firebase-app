export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.log('Nuxt plugin vueApp error handler');
    console.log('error: ', error);
    console.log('error: ', instance);
    console.log('error: ', info);
  };
});
