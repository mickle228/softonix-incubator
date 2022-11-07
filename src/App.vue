<template>
  <div class="max-w-[1440px] p-6">
    <h3 class="font-medium m-0">Contact list</h3>
    <div class="contact-list grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid gap-5 my-5">
      <div class="rounded-lg bg-white shadow relative">
        <div class="p-6 pb-2">
          <div class="flex">
            <div class="flex-grow text-sm truncate">
              <p class="font-medium">Esther Howard</p>
              <p class="text-gray mt-1 truncate">
                Forward Response Developer
              </p>
            </div>
            <img
              class="w-[40px] h-[40px] object-cover ml-2 rounded-full shrink-0"
              src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="contact-logo"
            >
          </div>
          <div class="flex justify-end mt-2 gap-2">
            <span class="text-blue-500 font-medium text-xs cursor-pointer hover:underline">Edit</span>
            <span class="text-red-500 font-medium text-xs cursor-pointer hover:underline">Delete</span>
          </div>
        </div>

        <div class="flex text-sm font-medium text-gray-dark border-t border-gray-ultra-light">
          <div class="flex items-center justify-center flex-1 py-4 cursor-pointer hover:text-gray">
            <svg class="h-5 w-5 text-gray-medium" x-description="Heroicon name: mini/envelope" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            <span class="ml-3">Email</span>
          </div>
          <div
            class="flex items-center justify-center flex-1 py-4 border-l
            border-gray-ultra-light cursor-pointer hover:text-gray"
          >
            <svg class="h-5 w-5 text-gray-medium" x-description="Heroicon name: mini/phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <!-- eslint-disable-next-line max-len -->
              <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
            </svg>
            <span class="ml-3">Call</span>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white shadow relative">
        <div class="p-6 pb-2">
          <div class="flex">
            <div class="flex-grow text-sm truncate">
              <p class="font-medium">Jane Cooper</p>
              <p class="text-gray mt-1 truncate">
                Regional Paradigm Technician Regional Paradigm Technician Regional Paradigm Technician
              </p>
            </div>
            <img
              class="w-[40px] h-[40px] object-cover ml-2 rounded-full shrink-0"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="contact-logo"
            >
          </div>
          <div class="flex justify-end mt-2 gap-2">
            <span class="text-blue-500 font-medium text-xs cursor-pointer hover:underline">Edit</span>
            <span class="text-red-500 font-medium text-xs cursor-pointer hover:underline">Delete</span>
          </div>
        </div>

        <div class="flex text-sm font-medium text-gray-dark border-t border-gray-ultra-light">
          <div class="flex items-center justify-center flex-1 py-4 cursor-pointer hover:text-gray">
            <svg class="h-5 w-5 text-gray-medium" x-description="Heroicon name: mini/envelope" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            <span class="ml-3">Email</span>
          </div>
          <div
            class="flex items-center justify-center flex-1 py-4 border-l
            border-gray-ultra-light cursor-pointer hover:text-gray"
          >
            <svg class="h-5 w-5 text-gray-medium" x-description="Heroicon name: mini/phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <!-- eslint-disable-next-line max-len -->
              <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
            </svg>
            <span class="ml-3">Call</span>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white shadow relative">
        <div class="p-6 pb-2">
          <div class="flex">
            <div class="flex-grow text-sm truncate">
              <p class="font-medium">Cody Fisher</p>
              <p class="text-gray mt-1 truncate">
                Product Directives Officer
              </p>
            </div>
            <img
              class="w-[40px] h-[40px] object-cover ml-2 rounded-full shrink-0"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="contact-logo"
            >
          </div>

          <div class="flex justify-end mt-2 gap-2">
            <span class="text-blue-500 font-medium text-xs cursor-pointer hover:underline">Edit</span>
            <span class="text-red-500 font-medium text-xs cursor-pointer hover:underline">Delete</span>
          </div>
        </div>

        <div class="flex text-sm font-medium text-gray-dark border-t border-gray-ultra-light">
          <div class="flex items-center justify-center flex-1 py-4 cursor-pointer hover:text-gray">
            <svg class="h-5 w-5 text-gray-medium" x-description="Heroicon name: mini/envelope" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            <span class="ml-3">Email</span>
          </div>
          <div
            class="flex items-center justify-center flex-1 py-4 border-l
            border-gray-ultra-light cursor-pointer hover:text-gray"
          >
            <svg class="h-5 w-5 text-gray-medium" x-description="Heroicon name: mini/phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <!-- eslint-disable-next-line max-len -->
              <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
            </svg>
            <span class="ml-3">Call</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
