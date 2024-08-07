import factory from '@adonisjs/lucid/factories'
import Task from '#models/task'
import User from '#models/user'
import Project from '#models/project'

export const TaskFactory = factory
  .define(Task, async ({ faker }) => {
    const users = await User.all()
    const randomUser = users[faker.number.int({ min: 0, max: users.length - 1 })]
    const projects = await Project.all()
    const randomProject = projects[faker.number.int({ min: 0, max: projects.length - 1 })]
    return {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      project_id: randomProject.id,
      user_id: randomUser.id,
    }
  })
  .build()
