import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const  users = (await User.all()).map((user) => user.serialize())
    if (users.length < 1) {
      return response.status(404).send({status: false, message: "No users found"})
    } else {
      // return response.status(200).send({ users: users, status: status })
      return users
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = (await User.findOrFail(params.id))
    // return response.status(200).send({user: user, status: true})
    return user
  }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    const user = await User.findOrFail(params.id)
    if (await bouncer.allows('deleteUser', user)) {
      user.delete()
      return response.status(204)
    }
    return response.status(403).send({status: false, message: "You are not authorized to delete"})
  }
}
