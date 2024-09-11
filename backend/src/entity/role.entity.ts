// src/entity/role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Base } from './base.entity';

@Entity()
export class Role extends Base {
  @Column()
  name: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
