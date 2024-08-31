import User from '#models/user'

export default class UserRepository {
  async updateName(id: number, name: string) {
    const user = await User.findOrFail(id)
    user.name = name ? name : user.name
    await user.save()
    return user
  }

  async updateAvatar(user: any, avatar: string) {
    user.avatar = avatar ? avatar : user.avatar
    await user.save()
    return user
  }

  async updateEmail(user: any, email: string) {
    user.email = email ? email : user.email
    await user.save()
    return user
  }

  async updatePassword(user: any, password: string) {
    user.password = password ? password : user.password
    await user.save()
    return user
  }
}
