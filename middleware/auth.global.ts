export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = storeToRefs(useAuthStore());

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated.value) {
    return navigateTo('/');
  }
});
