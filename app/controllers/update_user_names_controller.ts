import type { HttpContext } from '@adonisjs/core/http'
import { updateNameValidator } from '#validators/user'
import User from '#models/user'

export default class UpdateUserNamesController {
  async handle({ params, request, response, bouncer }: HttpContext) {
    // Handle request
    const validated = await request.validateUsing(updateNameValidator)
    const user = await User.findOrFail(params.id)
    if (await bouncer.allows('editUser', user)) {
      user.name = validated?.name ? validated.name : user.name
      await user.save()
      return response.status(200).send({ status: true, user: user, message: 'Name updated successfully' })
    }
    return response.status(403).send({ status: false, message: 'You are not authorized to edit' })
  }
}
