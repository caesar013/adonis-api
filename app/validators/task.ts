import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new task.
 */
export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional().requiredIfExists('description'),
    description: vine.string().optional(),
    project_id: vine.string().trim().uuid().optional().requiredIfExists('title'),
    user_id: vine.string().trim().uuid().optional().requiredIfExists('title'),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing task.
 */
export const updateTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional().requiredIfExists('description'),
    description: vine.string().trim().optional(),
    project_id: vine.string().trim().uuid().optional().requiredIfExists('title'),
    user_id: vine.string().trim().uuid().optional().requiredIfExists('title'),
  })
)
