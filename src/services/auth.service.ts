class AuthService {
  // auth/v1/token?grant_type=password
  login (payload: ILoginRequest) {
    return useHttp.post('auth/v1/token?grant_type=password', payload)
  }

  // POST: auth/v1/signup, Payload: { email: string, password: string }
  register (payload: { email: string; password: string }) {
    return useHttp.post('auth/v1/signup', payload)
  }

  // auth/v1/token?grant_type=refresh_token / { refresh_token: "the-refresh-token" }
  refreshToken (refreshToken: string) {
    return useHttp.post('auth/v1/token?grant_type=refresh_token', { refresh_token: refreshToken })
  }

  deleteTokens () {
    localStorage.removeItem('si-token')
    localStorage.removeItem('ref-token')
  }
}

export const authService = new AuthService()
