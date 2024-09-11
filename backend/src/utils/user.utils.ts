import { User } from '../entity/user.entity';
import { UserOutput } from '../interfaces/user.interface'; // UserOutput tipini içe aktar
import { mapToRole } from './role.utils';


export function mapToUser(user: User): UserOutput {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: mapToRole(user.role),
        createdAt: user.createDate,
        updatedAt: user.updateDate
    };
}

export function mapToUserList(users: User[]): UserOutput[] {
    return users.map(user => mapToUser(user));
}
