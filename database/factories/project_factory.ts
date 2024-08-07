import factory from '@adonisjs/lucid/factories'
import Project from '#models/project'

export const ProjectFactory = factory
  .define(Project, async ({ faker }) => {
    return {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
    }
  })
  .build()
