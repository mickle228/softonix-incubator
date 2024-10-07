import { defineStore } from 'pinia'
import { contactsService } from '@/services/contacts.service'

export const useContactsStore = defineStore('contactsStore', () => {
  const contacts = ref<IContact[]>([])

  const getContacts = () => {
    if (contacts.value.length) return

    return contactsService.getContacts()
      .then(res => {
        contacts.value = res
      })
  }

  async function addContact (contact: IContact) {
    try {
      await contactsService.createContact(contact)
      const data = await contactsService.getContacts()
      contacts.value = data
    } catch (error) {
      error.value = error.message
    }
  }

  async function updateContact (contact: IContact) {
    try {
      await contactsService.updateContact(contact)
      const currentIndex = contacts.value.findIndex(c => c.id === contact.id)
      contacts.value[currentIndex] = { ...contact }
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  async function deleteContact (contact: IContact) {
    try {
      const currentIndex = contacts.value.findIndex(c => c.id === contact.id)
      await contactsService.deleteContact(contact.id)
      contacts.value.splice(currentIndex, 1)
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  return {
    contacts,
    getContacts,
    addContact,
    deleteContact,
    updateContact
  }
})
