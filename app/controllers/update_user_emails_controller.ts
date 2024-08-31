import type { HttpContext } from '@adonisjs/core/http'
import { updateEmailValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'

export default class UpdateUserEmailsController {
  @inject()
  async handle({ params, request, response }: HttpContext, userService: UserService) {
    // Handle request
    const validated = await request.validateUsing(updateEmailValidator)
    const res = await userService.updateEmail(params.id, validated.email)
    if (res) {
      return response
        .status(200)
        .send({ status: true, user: res, message: 'Email updated successfully' })
    }
    return response.status(403).send({ status: false, message: 'You are not authorized to edit' })
  }
}
