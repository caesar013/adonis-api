import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  public async login({ request }: HttpContext) {
    const validated = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(validated?.email ?? '', validated?.password ?? '')

    const token = await User.accessTokens.create(user)
    return token
  }

  public async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.ok({ message: 'Logged out successfully', success: true, data: user })
  }
}
