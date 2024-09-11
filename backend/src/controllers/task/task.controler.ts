import { Request, Response } from 'express';
import { RoleService } from '../../services/role.service';
import { validate } from '../../utils/common.utils';
import { roleInputValidator, roleResponseValidator } from '../../validators/role.validator';
import { mapToRole } from '../../utils/role.utils';
import { taskInputValidator, taskResponseValidator } from '../../validators/task.validators';
import { TaskServices } from '../../services/task.service';
import { mapToTask } from '../../utils/task.utils';

export class TaskControler {
  static async createTask(req: Request, res: Response) {
      const {name,task} = validate(req.body, taskInputValidator);
      const newTask = await TaskServices.createTask(name,task);
      res.status(201).json(validate({data: mapToTask(newTask)},taskResponseValidator));
  }

  static async getAllTask(req: Request, res: Response) {
      const AllTask = await TaskServices.getAllTask();
      res.json(AllTask);
      res.status(500).json({ error: 'Internal Server Error' })
  }

  static async getTaskById(req: Request, res: Response) {
      const id = parseInt(req.params.id);
      const task = await TaskServices.getTaskById(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
  }


  static async updateTask(req: Request, res: Response) {
      const id = parseInt(req.params.id);
      const { name, task } = req.body;
      const updateTask = await  TaskServices.updateTask(id, { name,task });
      if (!updateTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(validate({data: mapToTask(updateTask)},taskResponseValidator));

  }

  static async deleteTask(req: Request, res: Response) {
      const id = parseInt(req.params.id);
      await TaskServices.deleteTask(id);
      res.status(204).send();
  }
}
