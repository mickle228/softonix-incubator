import { contactsRoutesNames } from '@/views/contacts/contacts.routes'
import { authRoutesNames } from '@/views/auth/auth.routes'

export const routeNames = {
  rootPage: 'rootPage',
  ...contactsRoutesNames,
  ...authRoutesNames
}
