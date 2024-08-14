import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().optional().requiredIfExists('password'),
    password: vine.string().trim().optional().requiredIfExists('email'),
  })
)
