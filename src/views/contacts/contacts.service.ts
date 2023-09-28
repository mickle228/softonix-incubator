class ContactsService {
  // rest/v1/contacts
  getContacts () {
    const authStore = useAuthStore()

    return useHttp.get<IContact[]>('rest/v1/contacts', { params: { user_id: `eq.${authStore.user?.id}` } })
  }
}

export const contactsService = new ContactsService()
