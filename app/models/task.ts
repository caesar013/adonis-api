import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class Task extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true, serializeAs: 'task-id' })
  declare id: string

  @beforeCreate()
    static assignUuid(task: Task) {
      task.id = randomUUID()
  }

  @column({ serializeAs: 'name' })
  declare title: string

  @column()
  declare description: string

  @column({ serializeAs: 'project-id' })
  declare project_id: string

  @column({ serializeAs: 'user-id' })
  declare user_id: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
