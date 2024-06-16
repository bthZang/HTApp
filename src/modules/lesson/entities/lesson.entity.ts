import { BaseEntity } from "src/common/entities/base.entity";
import { CommentEntity } from "src/modules/comment/entities/comment.entity";
import { Program } from "src/modules/program/entities/program.entity";
import { Student } from "src/modules/student/entities/student.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";

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

  @ManyToMany(() => Student, (student) => student.lessons)
  students: Student[];

  @OneToMany(() => CommentEntity, (comment) => comment.lesson)
  comments: CommentEntity[];
}
