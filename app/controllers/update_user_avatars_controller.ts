import type { HttpContext } from '@adonisjs/core/http'
import { updateAvatarValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'

export default class UpdateUserAvatarsController {
  @inject()
  async handle({ params, request, response }: HttpContext, userService: UserService) {
    // Handle request
    const { avatar } = await request.validateUsing(updateAvatarValidator)
    const res = await userService.updateAvatar(params.id, avatar)
    if (res) {
      return response
        .status(200)
        .send({ status: true, user: res, message: 'Avatar updated successfully' })
    }
    return response.status(403).send({ status: false, message: 'You are not authorized to edit' })
  }
}
