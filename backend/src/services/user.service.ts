// src/services/user.service.ts
import config from '../core/config';
import { AppDataSource } from '../core/data-source';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';


export class UserServices {
  static async getAllUsers(): Promise<User[]> {
    return AppDataSource.manager.find(User);
  }

  static async getUserWithTokenById(id: number): Promise<{ user: User; token: string } | undefined> {
    const user = await AppDataSource.manager.findOne(User, { where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      type: user.role.name,
    };

    const token = jwt.sign(tokenPayload, config.jwt.key, { expiresIn: '1h' });

    return {user, token };
  }

  static async getUserById(id: number): Promise<User | undefined> {
    return AppDataSource.manager.findOne(User, { where: { id } });
  }

  static async createUser(userData: Partial<User>): Promise<User> {
    const role = await AppDataSource.manager.findOne(Role, {where: {id: userData.roleId}}); // roleId ile rolü bul
    if (!role) {
        throw new Error('Belirtilen roleId ile eşleşen rol bulunamadı.');
    }

    const newUser = AppDataSource.manager.create(User, {
        ...userData,
        password: userData.password,
        role: role // Kullanıcıya rolü ekle
    } as User);

    

    return AppDataSource.manager.save(newUser);
}



static async publicUserCreate(userData: Partial<User>): Promise<User> {
  const role = await AppDataSource.manager.findOne(Role, {where: {id: userData.roleId}}); // roleId ile rolü bul
  if (!role) {
      throw new Error('Belirtilen roleId ile eşleşen rol bulunamadı.');
  }

  const newUser = AppDataSource.manager.create(User, {
      ...userData,
      password: userData.password,
      role: role ,
  } as User);

  

  return AppDataSource.manager.save(newUser);
}

  static async updateUser(id: number, updatedData: Partial<User>): Promise<User | undefined> {
    await AppDataSource.manager.update(User, id, updatedData);
    return AppDataSource.manager.findOne(User, { where: { id } });
  }

  static async deleteUser(id: number): Promise<void> {
    await AppDataSource.manager.delete(User, id);
  }

  static async deactivateUser(id: number): Promise<User | undefined> {
    const user = await AppDataSource.manager.findOne(User, { where: { id } });

    if (user) {
      user.active = false;
      await AppDataSource.manager.save(user);
    }
    return user;
  }

  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await AppDataSource.manager.findOne(User, { where: { email }, relations: ['role']});

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      type: user.role.name,
    };

    const token = jwt.sign(tokenPayload, config.jwt.key, { expiresIn: '1h' });

    return { user, token };
  }
}
