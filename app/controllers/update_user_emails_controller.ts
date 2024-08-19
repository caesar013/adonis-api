import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateEmailValidator } from '#validators/user'

export default class UpdateUserEmailsController {
  async handle({ params, request, bouncer, response }: HttpContext) {
    // Handle request
    const validated = await request.validateUsing(updateEmailValidator)
    const user = await User.findOrFail(params.id)
    if (await bouncer.allows('editUser', user)) {
      user.email = validated?.email || user.email
      await user.save()
      return response.status(200).send({ status: true, user: user, message: 'Email updated successfully' })
    }
    return response.status(403).send({ status: false, message: 'You are not authorized to edit' })
  }
}
