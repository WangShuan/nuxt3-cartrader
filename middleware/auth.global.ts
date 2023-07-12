export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.includes('account')) {
    const user = useSupabaseUser()

    if (!user.value) {
      return navigateTo('/')
    }
  }
})
