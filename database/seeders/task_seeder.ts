import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TaskFactory } from '#database/factories/task_factory'

export default class TaskSeeder extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    // Write your database queries inside the run method
    await TaskFactory.createMany(5)
  }
}
