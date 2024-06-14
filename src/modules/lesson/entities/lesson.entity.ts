import { BaseEntity } from "src/common/entities/base.entity";
import { Program } from "src/modules/program/entities/program.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'lessons' })
export class Lesson extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;

  @Column({ nullable: true, type: 'varchar' })
  description!: string;

  @Column({ nullable: true, type: 'varchar' })
  videoUrl!: string;

  @ManyToOne(() => Program)
  program: Program;
}
