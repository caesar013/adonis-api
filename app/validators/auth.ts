import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().optional().requiredIfExists('password'),
    password: vine.string().trim().optional().requiredIfExists('email'),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional().requiredIfExists('email'),
    email: vine.string().trim().email().optional().requiredIfExists('password'),
    password: vine.string().trim().confirmed().optional().requiredIfExists('email'),
  })
)
