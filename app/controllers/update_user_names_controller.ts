import type { HttpContext } from '@adonisjs/core/http'
import { updateNameValidator } from '#validators/user'
import User from '#models/user'

export default class UpdateUserNamesController {
  async handle({ params, request }: HttpContext) {
    // Handle request
    const validated = await request.validateUsing(updateNameValidator)
    const user = (await User.findOrFail(params.id)).merge(validated).save()
    return user
  }
}
