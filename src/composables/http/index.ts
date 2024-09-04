import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    apikey: import.meta.env.VITE_API_KEY
  }
})

instance.interceptors.response.use(
  res => res
)

instance.interceptors.request.use(
  config => config
)

export const useHttp = instance
