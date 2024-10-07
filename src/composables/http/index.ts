import axios from 'axios'
import { routeNames, router } from '@/router'

let isRefreshing = false
type TWaitList = () => void
const waitList: TWaitList[] = []

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    apikey: import.meta.env.VITE_API_KEY
  }
})

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('si-token')

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response.data,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const refreshToken = localStorage.getItem('ref-token')
          authService.deleteTokens()
          if (!refreshToken) throw new Error('No refresh token')

          const res = await authService.refreshToken(refreshToken)

          const authStore = useAuthStore()
          authStore.setToken(res.access_token)
          authStore.setRefreshToken(res.refresh_token)

          runAfterRefresh()

          originalRequest.headers.authorization = `Bearer ${res.access_token}`
          isRefreshing = false

          return instance(originalRequest)
        } catch (err) {
          authService.deleteTokens()
          isRefreshing = false
          router.push({
            name: routeNames.login,
            query: { SessionExpired: 'true' }
          })
          return Promise.reject(error)
        }
      }

      return new Promise((resolve) => {
        subscribeToWaitList(() => {
          resolve(instance(originalRequest))
        })
      })
    }

    return Promise.reject(error)
  }
)

const subscribeToWaitList = (cb: TWaitList): void => {
  waitList.push(cb)
}

const runAfterRefresh = (): void => {
  while (waitList.length) {
    const cb = waitList.pop()
    cb && cb()
  }
}

export const useHttp = instance
