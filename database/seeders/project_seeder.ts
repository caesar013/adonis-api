import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ProjectFactory } from '#database/factories/project_factory'

export default class ProjectSeeder extends BaseSeeder {
  static environment = ['development', 'testing'];

  async run() {
    // Write your database queries inside the run method
    await ProjectFactory.createMany(5)
  }
}
