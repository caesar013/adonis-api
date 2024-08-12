/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ProjectsController = async () => await import('#controllers/projects_controller')
const TasksController = async () => await import('#controllers/tasks_controller')
const UsersController = async () => await import('#controllers/users_controller')
const UpdateUserNamesController = async () => await import('#controllers/update_user_names_controller')
const UpdateUserEmailsController = async () => await import('#controllers/update_user_emails_controller')
const UpdateUserPasswordsController = async () => await import('#controllers/update_user_passwords_controller')
const UpdateUserAvatarsController = async () => await import('#controllers/update_user_avatars_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.resource('/projects', ProjectsController).apiOnly()
  router.resource('/users', UsersController).apiOnly().except(['update'])
  router.resource('/tasks', TasksController).apiOnly()
  router.patch('/users/:id/update-name', [UpdateUserNamesController])
  router.patch('/users/:id/update-email', [UpdateUserEmailsController])
  router.patch('/users/:id/update-password', [UpdateUserPasswordsController])
  router.patch('/users/:id/update-avatar', [UpdateUserAvatarsController])
}).prefix('api')
