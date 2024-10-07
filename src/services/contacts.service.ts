class ContactsService {
  // rest/v1/contacts
  async getContacts () {
    return await useHttp.get<IContact[]>('rest/v1/contacts')
  }

  createContact (contact: { name: string; description: string }) {
    return useHttp.post<IContact>('rest/v1/contacts', contact)
  }

  updateContact (contact: { id?: number; name: string; description: string }) {
    return useHttp.patch<IContact>(`rest/v1/contacts?id=eq.${contact.id}`, contact)
  }

  deleteContact (contactId: number) {
    return useHttp.delete(`rest/v1/contacts?id=eq.${contactId}`)
  }
}

export const contactsService = new ContactsService()
