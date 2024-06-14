import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'programs' })
export class Program extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;

  @Column({ nullable: true, type: 'varchar' })
  level!: string;

  @Column({ nullable: true, type: 'varchar' })
  category!: string;

  @Column({ nullable: true, type: 'varchar' })
  introduce!: string; //mo ta, gioi thieu khoa hoc

  @Column({ nullable: true, type: 'varchar' })
  goal!: string; //khoa hoc nay se day ve gi

  @Column({ nullable: true, type: 'varchar' })
  preparation!: string; //chuan bi gi truoc khi vao khoa hoc
}
