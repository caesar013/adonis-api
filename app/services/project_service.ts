import Project from '#models/project'
import { createProjectValidator, updateProjectValidator } from '#validators/project'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import ProjectRepository from '../repositories/project_repository.js'

@inject()
export default class ProjectService {
  constructor(
    private ctx: HttpContext,
    private projectRepository: ProjectRepository
  ) {}

  async getProjects() {
    const projects = await this.projectRepository.getProjects()
    return projects
  }

  async createProject() {
    const validated = await this.ctx.request.validateUsing(createProjectValidator)
    const project = await new Project().fill(validated).save()
    return this.ctx.response.status(201).send({ project: project, status: true })
  }

  async updateProject(id: number) {
    const validated = await this.ctx.request.validateUsing(updateProjectValidator)
    const project = await this.projectRepository.updateProject(id, validated)
    return project
  }

  async deleteProject(id: number) {
    const isDeleted = await this.projectRepository.deleteProject(id)
    if (!isDeleted) {
      return this.ctx.response.status(500)
    }
    return this.ctx.response.status(204)
  }
}
