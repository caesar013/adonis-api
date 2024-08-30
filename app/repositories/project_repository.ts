import { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { inject } from '@adonisjs/core'

@inject()
export default class ProjectRepository {
  constructor(private ctx: HttpContext) {}

  async getProjects() {
    // Fetch projects from the database
    const projects = await Project.all()
    const status = projects.length > 0 ? true : false
    if (status === false) {
      return this.ctx.response.status(204)
    }
    return projects
  }

  async updateProject(id: number, validated: object) {
    // Update a project in the database
    const project = await Project.findOrFail(id)
    await project.merge(validated).save()
    return project
  }

  async deleteProject(id: number) {
    // Delete a project from the database
    const project = await Project.findOrFail(id)
    await project.delete()
    if (project.$isDeleted !== true) {
      return false
    }
    return true
  }
}
