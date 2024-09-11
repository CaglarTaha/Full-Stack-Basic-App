
import { Task } from '../entity/task.entity';
import { TaskOutput } from '../interfaces/task.interface';


export function mapToTask(task: Task): TaskOutput {
  return {
    id : task.id,
    name: task.name,
    task: task.task,
    createdAt: task.createDate,
    updatedAt: task.updateDate
  };
}

export function mapToTaskList(tasks: Task[]): TaskOutput[] {
  return tasks.map(task => mapToTask(task));
}
