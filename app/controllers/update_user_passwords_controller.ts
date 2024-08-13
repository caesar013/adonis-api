import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updatePasswordValidator } from '#validators/user'

export default class UpdateUserPasswordsController {
  async handle({ params, request }: HttpContext) {
    // Handle request
    const validated = await request.validateUsing(updatePasswordValidator)
    delete validated.old_password
    const user = (await User.findOrFail(params.id)).merge(validated).save()
    return user
  }
}
