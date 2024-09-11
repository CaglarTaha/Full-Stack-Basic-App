import { Role } from '../entity/role.entity';
import { AppDataSource } from '../core/data-source';

export class RoleService {

    static async getAllRoles(): Promise<Role[]> {
        const RoleRepo = AppDataSource.manager.getRepository(Role); // AppDataSource.manager.getRepository kullan
        return await RoleRepo.find();
      }
  static async createRole(name: string): Promise<Role> {
    const roleRepository = AppDataSource.manager.getRepository(Role);
    const newRole = roleRepository.create({ name });
    return roleRepository.save(newRole);
  }

  static async getRoleById(id: number): Promise<Role | undefined> {
        return AppDataSource.manager.findOne(Role, { where: { id } });
      }


  static async updateRole(id: number, updatedData: Partial<Role>): Promise<Role | undefined> {
        await AppDataSource.manager.update(Role, id, updatedData);
        return AppDataSource.manager.findOne(Role, { where: { id } });
      }
  static async deleteRole(id: number): Promise<void> {
    const roleRepository = AppDataSource.manager.getRepository(Role);
    await roleRepository.delete(id);
  }
}
