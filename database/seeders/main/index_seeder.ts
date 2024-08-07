import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    if (
      // if the environment is not specified, run in all environments
      // if the environment is specified, run only in the specified environments
      !Seeder.default.environment ||
      (!Seeder.default.environment.includes('development') && app.inDev) ||
      (!Seeder.default.environment.includes('testing') && app.inTest)
    ) {
      return
    }

    // console.log('Not Seeding database')
    // console.log('Seeder: ', Seeder.default.name)
    // console.log('Seeder environment:', Seeder.default.environment)
    await new Seeder.default(this.client).run()
  }

  async run() {
    // Write your database queries inside the run method
    await this.seed(await import('#database/seeders/user_seeder'))
    await this.seed(await import('#database/seeders/project_seeder'))
    await this.seed(await import('#database/seeders/task_seeder'))
  }
}
