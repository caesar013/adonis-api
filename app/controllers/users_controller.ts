import User from '#models/user'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}
  /**
   * Display a list of resource
   */
  async index() {
    const users = await this.userService.getUsers()
    return users
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return user
  }

  /**
   * Delete record
   */
  async destroy({ response, params }: HttpContext) {
    const isDeleted = await this.userService.deleteUser(params.id)
    if (isDeleted) {
      return response.status(204)
    }
    return response.status(403).send({ status: false, message: 'You are not authorized to delete' })
  }
}
