import { Role } from '../entity/role.entity';
import { RoleOutput } from './role.interface';

interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

interface UserOutput {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleOutput;
  createdAt: Date;
  updatedAt: Date;
}

export { UserInput, UserOutput };
