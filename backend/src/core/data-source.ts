// src/core/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { Task } from '../entity/task.entity';



export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: parseInt(config.database.port, 10),
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: true,
  logging: false,
  entities: [User, Role,Task], // Add Member to the entities array
  migrations: [],
  subscribers: [],
});
