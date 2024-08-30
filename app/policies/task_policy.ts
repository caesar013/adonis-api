import User from '#models/user'
import Task from '#models/task'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class TaskPolicy extends BasePolicy {
  create(user: User | null): AuthorizerResponse {
    return user !== null
  }

  edit(user: User, task: Task): AuthorizerResponse {
    return user.id === task.user_id
  }

  delete(user: User, task: Task): AuthorizerResponse {
    return user.id === task.user_id
  }
}
