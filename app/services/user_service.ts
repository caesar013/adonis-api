import User from '#models/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserService {
  constructor(private ctx: HttpContext) {}

  async getUsers() {
    const users = await User.all()
    if (users.length < 1) {
      return this.ctx.response.status(404).send({
        status: false,
        message: 'No users found',
      })
    } else {
      return users
    }
  }

  async deleteUser(id: number) {
    const user = await User.findOrFail(id)
    if (await this.ctx.bouncer.allows('deleteUser', user)) {
      user.delete()
      return true
    }
    return false
  }
}
