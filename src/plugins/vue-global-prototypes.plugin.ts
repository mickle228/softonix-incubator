import type { Plugin } from 'vue'
import { routeNames } from '@/router/routeNames'

export const VueGlobalPrototypesPlugin: Plugin = {
  install: (app) => {
    app.config.globalProperties.$routeNames = routeNames
  }
}
