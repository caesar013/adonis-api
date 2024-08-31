import type { HttpContext } from '@adonisjs/core/http'
import { updatePasswordValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'

export default class UpdateUserPasswordsController {
  @inject()
  async handle({ params, request, response }: HttpContext, userService: UserService) {
    // Handle request
    const validated = await request.validateUsing(updatePasswordValidator)
    const res = await userService.updatePassword(params.id, validated.password)
    if (res) {
      return response
        .status(200)
        .send({ status: true, user: res, message: 'Password updated successfully' })
    }
    return response.status(403).send({ status: false, message: 'You are not authorized to edit' })
  }
}
