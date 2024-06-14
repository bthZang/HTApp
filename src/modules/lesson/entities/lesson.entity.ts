import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'lessons' })
export class Lesson extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;

  @Column({ nullable: true, type: 'varchar' })
  description!: string; 

  @Column({ nullable: true, type: 'varchar' })
  videoUrl!: string;

  
}
