/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ProjectsController from '#controllers/projects_controller'
import TasksController from '#controllers/tasks_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.resource('/projects', ProjectsController).apiOnly()
  router.resource('/users', UsersController).apiOnly()
  router.resource('/tasks', TasksController).apiOnly()
}).prefix('api')
