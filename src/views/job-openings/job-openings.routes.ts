import type { RouteRecordRaw } from 'vue-router'

import JobOpenings from './JobOpenings.vue'

export const jobsRouteNames = {
  jobs: 'jobs'
}

export const jobsRoutes: RouteRecordRaw[] = [
  {
    path: '/jobs',
    name: jobsRouteNames.jobs,
    component: JobOpenings
  }
]
