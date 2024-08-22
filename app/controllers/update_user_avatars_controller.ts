import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateAvatarValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import drive from '@adonisjs/drive/services/main'

export default class UpdateUserAvatarsController {
  async handle({ params, request, bouncer }: HttpContext) {
    // Handle request
    const { avatar } = await request.validateUsing(updateAvatarValidator)
    // return avatar
    const user = await User.findOrFail(params.id)
    if (await bouncer.allows('editUser', user)) {
      if (user.avatar !== null) {
        await drive.use().delete(`uploads/${user.avatar}`)
      }
      await avatar.move(app.makePath('storage/uploads'), {
        name: `${cuid()}.${avatar.extname}`,
      })
      user.avatar = avatar.fileName!
      await user.save()
      return user
    }
  }
}
