import AuthService from '#services/auth_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async login() {
    const response = await this.authService.login()
    return response
  }

  async logout() {
    const response = await this.authService.logout()
    return response
  }

  async register() {
    const response = await this.authService.register()
    return response
  }
}
