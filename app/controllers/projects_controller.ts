import Project from '#models/project';
import type { HttpContext } from '@adonisjs/core/http';
import { createProjectValidator, updateProjectValidator } from '#validators/project';

export default class ProjectsController {
  /**
   * Display a list of resource
   */
  async index({response} : HttpContext) {
    const projects = (await Project.all()).map((project) => project.serialize())
    // const projects = await Project.all()
    const status = projects.length > 0 ? true : false
    if (status === false) {
      return response.status(204).send({ status: status, message: 'No projects found' })
    }
    return projects
    // return response.status(200).send({ projects: projects, status: status })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const validated = await request.validateUsing(createProjectValidator)
    const project = new Project().fill(validated).save()
    return project
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    return response.status(200).send({project: project, status: true})
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const validated = await request.validateUsing(updateProjectValidator)
    const project = (await Project.findOrFail(params.id)).merge(validated).save()
    return project
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    project.delete()
    return response.status(204)
  }
}
