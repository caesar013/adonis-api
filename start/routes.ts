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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.resource('/projects', ProjectsController).apiOnly()
  router.resource('/users', UsersController).apiOnly().except(['update'])
  router.resource('/tasks', TasksController).apiOnly()
}).prefix('api')
