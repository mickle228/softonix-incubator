class ContactsService {
  // rest/v1/contacts
  getContacts () {
    return useHttp.get<IContact[]>('rest/v1/contacts')
  }

  // Method for admin only
  getAdminContacts () {
    return useHttp.get<IContact[]>('functions/v1/get-admin-contacts')
  }
}

export const contactsService = new ContactsService()
