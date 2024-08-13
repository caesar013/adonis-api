import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'

export default class TasksController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const tasks = await Task.all()
    if (tasks.length > 0) {
      return tasks
    } else {
      return response.status(204).send({ staus: false, message: 'No tasks found' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const validated = await request.validateUsing(createTaskValidator)
    if (validated?.title == null) {
      return response.status(400).send({ status: false, message: 'Validation Failed'})
    }
    const task = await new Task().fill(validated).save()
    return response.status(201).send({ task: task, status: true })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return Task.findOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const validated = await request.validateUsing(updateTaskValidator)
    const task = (await Task.findOrFail(params.id)).merge(validated).save()
    return task
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    task.delete()
    return response.status(204)
  }
}
