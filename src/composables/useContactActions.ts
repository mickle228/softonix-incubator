export function useContactActions (contact: IContact, emit: any) {
  const store = useContactsStore()
  const editMode = ref(false)
  const imageHasError = ref(false)

  const localContact = ref<Omit<IContact, 'id'>>({
    name: contact.name || '',
    description: contact.description || '',
    image: contact.image
  })

  const nameAbbrv = computed(() => {
    return contact.name.split(' ').reduce((acc, cur) => {
      if (acc.length < 2) {
        acc = acc.concat(cur[0])
      }
      return acc
    }, '')
  })

  watch(() => contact, (newContact) => {
    localContact.value = {
      name: newContact.name || '',
      description: newContact.description || '',
      image: newContact.image
    }
  }, { immediate: true, deep: true })

  async function triggerEditMode () {
    editMode.value = true
    const foundContact = store.contacts.find(c => c.id === contact.id)
    if (foundContact) {
      localContact.value = {
        name: foundContact.name || '',
        description: foundContact.description || '',
        image: foundContact.image
      }
    }
    await nextTick()
  }

  function onSave () {
    store.updateContact({ ...localContact.value, id: contact.id })
    editMode.value = false
    emit('save', localContact.value)
  }

  function cancelEdit () {
    editMode.value = false
  }

  function deleteContact () {
    store.deleteContact(contact)
    emit('delete', contact)
  }

  return {
    editMode,
    localContact,
    nameAbbrv,
    imageHasError,
    triggerEditMode,
    onSave,
    deleteContact,
    cancelEdit
  }
}
