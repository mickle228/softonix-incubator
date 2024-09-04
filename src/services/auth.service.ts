class AuthService {
  // auth/v1/token?grant_type=password
  login () {
    return useHttp.post('auth/v1/token?grant_type=password', { email: 'voolve@gmail.com', password: '11111111' })
  }

  // auth/v1/signup
  register () {
    return {}
  }

  // auth/v1/logout
  logout () {
    return {}
  }

  // auth/v1/token?grant_type=refresh_token / { refresh_token: "the-refresh-token" }
  refreshToken () {
    return ''
  }
}

export const authService = new AuthService()
