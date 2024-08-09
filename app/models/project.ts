import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Task from '#models/task'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Project extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true, serializeAs: 'project-id' })
  declare id: string

  @beforeCreate()
  static assignUuid(project: Project) {
    project.id = randomUUID()
    }

  @column({ serializeAs: 'name' })
  declare title: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @hasMany(() => Task, {
    foreignKey: 'project_id',
    localKey: 'id',
  })
    declare tasks: HasMany<typeof Task>
}
