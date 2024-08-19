/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProjectsController = async () => await import('#controllers/projects_controller')
const TasksController = async () => await import('#controllers/tasks_controller')
const UsersController = async () => await import('#controllers/users_controller')
const UpdateUserNamesController = async () => await import('#controllers/update_user_names_controller')
const UpdateUserEmailsController = async () => await import('#controllers/update_user_emails_controller')
const UpdateUserPasswordsController = async () => await import('#controllers/update_user_passwords_controller')
const UpdateUserAvatarsController = async () => await import('#controllers/update_user_avatars_controller')
const AuthController = async () => await import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.resource('/projects', ProjectsController).apiOnly()
  router.resource('/users', UsersController).apiOnly().except(['update'])
  router.resource('/tasks', TasksController).apiOnly()
  router.patch('/users/:id/update-name', [UpdateUserNamesController]).use(middleware.auth({ guards: ['api'] }))
  router.patch('/users/:id/update-email', [UpdateUserEmailsController]).use(middleware.auth({ guards: ['api'] }))
  router.patch('/users/:id/update-password', [UpdateUserPasswordsController]).use(middleware.auth({ guards: ['api'] }))
  router.patch('/users/:id/update-avatar', [UpdateUserAvatarsController]).use(middleware.auth({ guards: ['api'] }))
  router.post('/login', [AuthController, 'login'])
  router.post('/logout', [AuthController,'logout']).use(middleware.auth({ guards: ['api'] }))
  router.post('/register', [AuthController, 'register'])
}).prefix('api')
