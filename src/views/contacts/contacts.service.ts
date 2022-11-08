// import type { IContact } from '@/types'

class ContactsService {
  // rest/v1/contacts
  getContacts () {
    // const { accessToken } = useAuthStore()
    // return useHttp.get<IContact[]>('rest/v1/contacts', { headers: { authorization: `Bearer ${accessToken}` } })
    //   .then(res => res.data)
    return []
  }
}

export const contactsService = new ContactsService()
