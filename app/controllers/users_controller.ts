import User from '#models/user'
import { createUserValidator } from '#validators/user'
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
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const validated = await request.validateUsing(createUserValidator)
    delete validated.password_confirmation
    if (validated?.email == null) {
      return response.status(400).send({ status: false, message: 'Validation Failed' })
    }
    const user = await new User().fill(validated).save()
    return response.status(201).send({ status: true, user: user })
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
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    user.delete()
    return response.status(204)
  }
}
