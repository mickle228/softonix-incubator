import { contactRouteNames } from '@/views/contacts/contacts.routes'
import { jobsRouteNames } from '@/views/job-openings/job-openings.routes'

export const routeNames = {
  ...contactRouteNames,
  ...jobsRouteNames
}
