import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateAvatarValidator } from '#validators/user'


export default class UpdateUserAvatarsController {
  async handle({ params, request, response }: HttpContext) {
    // Handle request
    const validated = await request.validateUsing(updateAvatarValidator)
    if (validated?.avatar == null) {
      return response.status(400).send({ status: false, message: 'Validation Failed' })
    }
    const user = (await User.findOrFail(params.id)).merge(validated).save()
    return user
  }
}
