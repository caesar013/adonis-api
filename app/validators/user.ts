import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new user.
 */
export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine.string().trim().email().unique(async (db, value) => {
      return await db.query().from('users').where('email', value).first() ? false : true
    }).optional().requiredIfExists('password'),
    password: vine.string().trim().confirmed().optional().requiredIfExists('email'),
    password_confirmation: vine.string().trim().sameAs('password').optional().requiredIfExists('password'),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing user.
 */
export const updateNameValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
  })
)

export const updateEmailValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().notSameAs('old_email').unique(async (db, value) => {
      return await db.query().from('users').where('email', value).first() ? false : true
    }).optional().requiredIfExists('old_email'),
    old_email: vine.string().trim().email().unique(async (db, value) => {
      return await db.query().from('users').where('email', value).first() ? true : false
    }).optional().requiredIfExists('email'),
  })
)

export const updatePasswordValidator = vine.compile(
  vine.object({
    old_password: vine.string().trim().optional().requiredIfExists('password'),
    password: vine.string().trim().confirmed().optional().requiredIfExists('old_password'),
  })
)

export const updateAvatarValidator = vine.compile(
  vine.object({
    avatar: vine.string().trim().optional(),
  })
)
