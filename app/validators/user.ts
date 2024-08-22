import vine from '@vinejs/vine'

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
    }),
    old_email: vine.string().trim().email().unique(async (db, value) => {
      return await db.query().from('users').where('email', value).first() ? true : false
    }),
  })
)

export const updatePasswordValidator = vine.compile(
  vine.object({
    password: vine.string().trim().confirmed(),
  })
)

export const updateAvatarValidator = vine.compile(
  vine.object({
    avatar: vine.file({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png'],
    })
  })
)
