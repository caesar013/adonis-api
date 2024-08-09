import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Project from '#models/project'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

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

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
    declare user: BelongsTo<typeof User>

  @belongsTo(() => Project, {
    foreignKey: 'project_id',
    localKey: 'id',
  })
  declare project: BelongsTo<typeof Project>

}
