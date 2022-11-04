# Section #6 - Vue.js part 2

### Goal
In this section we will continue developing our contacts application and take a look on a couple more Vue.js features 
like slots and custom v-model. We will also see how to connect vue-router for app navigation and pinia for state managing.


### Tech plan
- Install vue-router and connect it to our app
- Split the app by different pages
- Create a page for creating a new contact that later with be used to update it as well
- Create an input component with custom v-model.
- Create a button component
- Create a card component
- Connect pinia for state managing
- Rewrite logic using state manager
- App improvements
- **Home Work**: Create a simple todo app.

### Materials for the section
- **Read**: [Events with v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model)
- **Read**: [Computed Properties](https://vuejs.org/guide/essentials/computed.html#computed-properties)
- **Read**: [Slots](https://vuejs.org/guide/components/slots.html#slots)
- **Read**: [Vue Router](https://router.vuejs.org/)
- **Read**: [Pinia](https://pinia.vuejs.org/)
- **Practice**: Read all the sections above and try them on your own

### Video Material
[Youtube link](TBA)

### Section Playground
- Branch name: [`section-6-vue-part-2`](https://github.com/Softonix/softonix-incubator/tree/section-6-vue-part-2)
- Tag1: `#section-6-vue-part-2-start`
  - Represents an application from previous lecture with some optimization
- Tag2: `#section-6-vue-part-2-end`
  - Represents an extension to the app from previous lecture covered by tech plan. 

### Homework
This section includes homework. You need to fork this repo, finish homework in your repo, push your changes to origin and send URL with your forked repo and completed task to related person.
#### Create a simple todo app
  - It should contain two root pages:
    - A list where the list of todos is displayed
    - A page where you can create or update a todo
  - A list item should contain the following fields:
    - id: number
    - title: string
    - description: string
    - isDone: boolean

  - A list page should be split by 3 nested pages
    - All: where all todos are listed
    - Done: where only urgent todos are listed
    - In progress: where only undone todos are listed
  - All todos should be stored in some module of pinia store
  - A list page should contain a button to create a new todo. By clicking on it you should be redirected to the todo creation page.
  - There should be an edit and delete buttons and a checkbox to change isDone state on every todo item.
  - Edit button in the todo item should redirect you to the page where you can edit it.
  - The page for creating or editing a todo there should have the following:
    - a form with title, description, isDone(only when editing) fields 
    - a cancel button which just redirects you back to the list pge
    - a delete button which deletes a current todo and redirects you back to the list page.
    - a save button that saves a new or updates an existing todo
    - a save button should be disabled if either a title or a description field is empty.
  - There should be a guard that checks a todo id in the route params before entering the page for editing todo. If id doesn't exist in the list then you should not be allowed to enter the page and be redirected back to the list page.
