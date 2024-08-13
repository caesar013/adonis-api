import type { HttpContext } from '@adonisjs/core/http'
import { updateNameValidator } from '#validators/user'
import User from '#models/user'

export default class UpdateUserNamesController {
  async handle({ params, request, response }: HttpContext) {
    // Handle request
    const validated = await request.validateUsing(updateNameValidator)
    if (validated?.name == null) {
      return response.status(400).send({ status: false, message: 'Validation Failed' })
    }
    const user = (await User.findOrFail(params.id)).merge(validated).save()
    return user
  }
}
