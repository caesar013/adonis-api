import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthService {
  constructor(private ctx: HttpContext) {}

  async login() {
    const validated = await this.ctx.request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(validated?.email ?? '', validated?.password ?? '')
    const token = await User.accessTokens.create(user)
    return { token, user }
  }

  async logout() {
    const user = this.ctx.auth.getUserOrFail()
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'Logged out successfully', success: true, data: user }
  }

  async register() {
    const validated = await this.ctx.request.validateUsing(registerValidator)
    const user = await User.create(validated)
    return { message: 'User created successfully', success: true, data: user }
  }
}
