import { Request, Response } from 'express';
import { RoleService } from '../../services/role.service';
import { validate } from '../../utils/common.utils';
import { roleInputValidator, roleResponseValidator } from '../../validators/role.validator';
import { mapToRole } from '../../utils/role.utils';

export class RoleController {
  static async createRole(req: Request, res: Response) {
      const {name} = validate(req.body, roleInputValidator);
      const newRole = await RoleService.createRole(name);
      res.status(201).json(validate({data: mapToRole(newRole)},roleResponseValidator));
  }

  static async getAllRoles(req: Request, res: Response) {
      const allRoles = await RoleService.getAllRoles();
      res.json(allRoles);
      res.status(500).json({ error: 'Internal Server Error' })
  }

  static async getRoleById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const role = await RoleService.getRoleById(id);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  static async updateRole(req: Request, res: Response) {
      const id = parseInt(req.params.id);
      // const data = validate(req.body, roleInputValidator);
      const { name } = req.body;
      const updatedRole = await RoleService.updateRole(id, { name });
      if (!updatedRole) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.json(validate({data: mapToRole(updatedRole)},roleResponseValidator));

  }

  static async deleteRole(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await RoleService.deleteRole(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
