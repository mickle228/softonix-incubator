import { routeNames, router } from '@/router'

export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref(localStorage.getItem('si-token'))
  const refreshToken = ref(localStorage.getItem('ref-token'))

  function setToken (token: string) {
    accessToken.value = token
    localStorage.setItem('si-token', token)
  }
  function setRefreshToken (token: string) {
    refreshToken.value = token
    localStorage.setItem('ref-token', token)
  }

  function login (payload: ILoginRequest) {
    return authService.login(payload)
      .then((res) => {
        setToken(res.access_token)
        setRefreshToken(res.refresh_token)
      })
  }

  function logout () {
    localStorage.removeItem('si-token')
    localStorage.removeItem('ref-token')
    window.location.href = router.resolve(routeNames.login).href
  }

  function register (payload: { email: string; password: string }) {
    return authService.register(payload)
      .then((res) => {
        const token = res.access_token
        const refToken = res.refresh_token
        setToken(token)
        setRefreshToken(refToken)
        window.location.href = router.resolve(routeNames.contacts).href
      })
      .catch((error) => {
        console.error('Registration failed:', error)
      })
  }

  return {
    accessToken,
    refreshToken,
    login,
    logout,
    register,
    setToken,
    setRefreshToken
  }
})
