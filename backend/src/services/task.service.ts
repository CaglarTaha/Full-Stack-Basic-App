
import { AppDataSource } from '../core/data-source';
import { Task } from '../entity/task.entity';


export class TaskServices {

    static async getAllTask(): Promise<Task[]> {
        const TaskRepo = AppDataSource.manager.getRepository(Task); // AppDataSource.manager.getRepository kullan
        return await TaskRepo.find();
      }
  static async createTask(name: string , task: string): Promise<Task> {
    const taskRepository = AppDataSource.manager.getRepository(Task);
    const newTask = taskRepository.create({ name, task });
    return taskRepository.save(newTask);
  }

  static async getTaskById(id: number): Promise<Task | undefined> {
        return AppDataSource.manager.findOne(Task, { where: { id } });
      }


  static async updateTask(id: number, updatedData: Partial<Task>): Promise<Task | undefined> {
        await AppDataSource.manager.update(Task, id, updatedData);
        return AppDataSource.manager.findOne(Task, { where: { id } });
      }
  static async deleteTask(id: number): Promise<void> {
    const roleRepository = AppDataSource.manager.getRepository(Task);
    await roleRepository.delete(id);
  }
}
