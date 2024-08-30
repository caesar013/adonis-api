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
      return response.status(204)
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, bouncer, auth }: HttpContext) {
    const validated = await request.validateUsing(createTaskValidator)
    if (await bouncer.with('TaskPolicy').denies('create')) {
      return response.status(403).send({ status: false, message: 'Not authorized' })
    }
    const newValidated = Object.assign(validated, { user_id: auth.user?.id })
    const task = await new Task().fill(newValidated).save()
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
  async update({ params, request, response, bouncer }: HttpContext) {
    const validated = await request.validateUsing(updateTaskValidator)
    const task = await Task.findOrFail(params.id)
    if (await bouncer.with('TaskPolicy').denies('edit', task)) {
      return response.status(403).send({ status: false, message: 'Not authorized' })
    }
    task.merge(validated).save()
    return response
      .status(200)
      .send({ task: task, status: true, message: 'Task updated successfully' })
  }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    if (await bouncer.with('TaskPolicy').denies('delete', task)) {
      return response.status(403).send({ status: false, message: 'Not authorized' })
    }
    task.delete()
    return response.status(204)
  }
}
