import { inject } from '@adonisjs/core'
import TaskRepository from '../repositories/task_repository.js'
import Task from '#models/task'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private ctx: HttpContext
  ) {}

  async getTasks() {
    const tasks = await Task.all()
    if (tasks.length > 0) {
      return tasks
    }
    return false
  }

  async createTask(validated: any, auth: any) {
    if (await this.ctx.bouncer.with('TaskPolicy').denies('create')) {
      return false
    }
    const task = await auth.user?.related('tasks').create(validated)
    return task
  }

  async updateTask(validated: any, id: number) {
    const task = await Task.findOrFail(id)
    if (await this.ctx.bouncer.with('TaskPolicy').denies('edit', task)) {
      return false
    }
    return this.taskRepository.updateTask(validated, task)
  }

  async deleteTask(id: number) {
    const task = await Task.findOrFail(id)
    if (await this.ctx.bouncer.with('TaskPolicy').denies('delete', task)) {
      return false
    }
    return this.taskRepository.deleteTask(task)
  }
}
