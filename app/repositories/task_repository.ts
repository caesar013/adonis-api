export default class TaskRepository {
  async updateTask(validated: any, task: any) {
    task.merge(validated).save()
    return task
  }

  async deleteTask(task: any) {
    task.delete()
    return true
  }
}
