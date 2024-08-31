import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
import { inject } from '@adonisjs/core'
import TaskService from '#services/task_service'

@inject()
export default class TasksController {
  constructor(private taskService: TaskService) {}
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const res = await this.taskService.getTasks()
    if (res) {
      return response
        .status(200)
        .send({ tasks: res, status: true, message: 'Tasks retrieved successfully' })
    } else {
      return response.status(204)
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const validated = await request.validateUsing(createTaskValidator)
    const res = await this.taskService.createTask(validated, auth)
    if (!res) {
      return response.forbidden({ status: false, message: 'You are Not authorized' })
    }
    return res
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
  async update({ params, request, response }: HttpContext) {
    const validated = await request.validateUsing(updateTaskValidator)
    const res = await this.taskService.updateTask(validated, params.id)
    if (!res) {
      return response.forbidden({ status: false, message: 'You are Not authorized' })
    }
    return response
      .status(200)
      .send({ task: res, status: true, message: 'Task updated successfully' })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const res = this.taskService.deleteTask(params.id)
    if (!res) {
      return response.forbidden({ status: false, message: 'You are Not authorized' })
    }
    return response.status(204)
  }
}
