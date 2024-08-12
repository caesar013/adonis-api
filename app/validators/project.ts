import vine from '@vinejs/vine'

vine.convertEmptyStringsToNull = true
/**
 * Validator to validate the payload when creating
 * a new project.
 */
export const createProjectValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional().requiredIfExists('description'),
    description: vine.string().optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing project.
 */
export const updateProjectValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    description: vine.string().optional(),
  })
)
