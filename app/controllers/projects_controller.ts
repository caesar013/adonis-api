import Project from '#models/project'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ProjectService from '#services/project_service'

@inject()
export default class ProjectsController {
  constructor(protected projectService: ProjectService) {}
  /**
   * Display a list of resource
   */
  @inject()
  async index() {
    return await this.projectService.getProjects()
  }

  /**
   * Handle form submission for the create action
   */
  async store() {
    return await this.projectService.createProject()
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    return response.status(200).send({ project: project, status: true })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params }: HttpContext) {
    return this.projectService.updateProject(params.id)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    return this.projectService.deleteProject(params.id)
  }
}
