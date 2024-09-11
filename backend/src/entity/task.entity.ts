// src/entity/role.entity.ts
import { Entity, Column } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class Task extends Base {
  @Column()
  task: string
  @Column()
  name: string;
}
