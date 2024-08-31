import type { HttpContext } from '@adonisjs/core/http'
import { updateNameValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'

@inject()
export default class UpdateUserNamesController {
  constructor(private userService: UserService) {}

  async handle({ params, request, response }: HttpContext) {
    // Handle request
    const validated = await request.validateUsing(updateNameValidator)
    const user = await this.userService.updateName(params.id, validated.name ?? '')
    if (user) {
      return response
        .status(200)
        .send({ status: true, user: user, message: 'Name updated successfully' })
    }
    return response.status(403).send({ status: false, message: 'You are not authorized to edit' })
  }
}
