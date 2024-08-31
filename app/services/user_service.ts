import User from '#models/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import UserRepository from '../repositories/user_repository.js'
import drive from '@adonisjs/drive/services/main'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

@inject()
export default class UserService {
  constructor(
    private ctx: HttpContext,
    private userRepository: UserRepository
  ) {}

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

  async updateName(id: number, name: string) {
    return this.userRepository.updateName(id, name)
  }

  async updateAvatar(id: number, avatar: any) {
    const user = await User.findOrFail(id)
    if (await this.ctx.bouncer.allows('editUser', user)) {
      if (user.avatar !== null) {
        await drive.use().delete(`uploads/${user.avatar}`)
      }
      await avatar.move(app.makePath('storage/uploads'), {
        name: `${cuid()}.${avatar.extname}`,
      })
      const response = await this.userRepository.updateAvatar(user, avatar.fileName)
      return response
    }
    return false
  }

  async updateEmail(id: number, email: string) {
    const user = await User.findOrFail(id)
    if (await this.ctx.bouncer.allows('editUser', user)) {
      return this.userRepository.updateEmail(user, email)
    }
    return false
  }

  async updatePassword(id: number, password: string) {
    const user = await User.findOrFail(id)
    if (await this.ctx.bouncer.allows('editUser', user)) {
      return this.userRepository.updatePassword(user, password)
    }
    return false
  }
}
