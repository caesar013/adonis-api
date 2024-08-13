import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateEmailValidator } from '#validators/user'

export default class UpdateUserEmailsController {
  async handle({ params, request }: HttpContext) {
    // Handle request
    const validated = await request.validateUsing(updateEmailValidator)
    delete validated.old_email
    const user = (await User.findOrFail(params.id)).merge(validated).save()
    return user
  }
}
