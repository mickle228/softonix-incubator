import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

export * from './route-names'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { accessToken, logout, getUser } = useAuthStore()

  if (!accessToken && to.meta.isProtected) {
    next(false)
    return logout()
  }

  if (accessToken) {
    await getUser()
  }

  next()
})
