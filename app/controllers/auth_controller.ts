import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async login({ request }: HttpContext) {
    const validated = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(validated?.email ?? '', validated?.password ?? '')

    const token = await User.accessTokens.create(user)
    return token
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.ok({ message: 'Logged out successfully', success: true, data: user })
  }

  async register({ request, response }: HttpContext) {
    const validated = await request.validateUsing(registerValidator)

    const user = await User.create(validated)

    return response.created({ message: 'User created successfully', success: true, data: user })
  }
}
