import { Role } from '../entity/role.entity';
import { RoleOutput } from '../interfaces/role.interface';


export function mapToRole(role: Role): RoleOutput {
  return {
    id: role.id,
    name: role.name,
    createdAt: role.createDate,
    updatedAt:role.updateDate,
  };
}

export function mapToRoleList(roles: Role[]): RoleOutput[] {
  return roles.map(role => mapToRole(role));
}
