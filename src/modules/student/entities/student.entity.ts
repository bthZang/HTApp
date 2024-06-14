import { CommentEntity } from "src/modules/comment/entities/comment.entity";
import { Program } from "src/modules/program/entities/program.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity({ name: 'students' })
export class Student {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;

  @ManyToMany(() => Program, (program) => program.students)
  @JoinTable()
  programs: Program[];

  @OneToMany(() => CommentEntity, (comment) => comment.student)
  comments: CommentEntity[];
}
