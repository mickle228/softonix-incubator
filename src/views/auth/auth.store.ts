export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref(localStorage.getItem('si-token'))
  const user = ref()

  function setToken (token: string) {
    accessToken.value = token
    localStorage.setItem('si-token', token)
  }

  function login () {
    return authService.login()
      .then(({ data }) => {
        setToken(data.access_token)
      })
  }

  return {
    accessToken,
    user,
    login
  }
})
