import { BaseEntity } from "src/common/entities/base.entity";
import { CommentEntity } from "src/modules/comment/entities/comment.entity";
import { Program } from "src/modules/program/entities/program.entity";
import { Student } from "src/modules/student/entities/student.entity";
import { StudentLesson } from "src/student-lesson/entities/studentLesson.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'lessons' })
export class Lesson extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;

  @Column({ nullable: true, type: 'varchar' })
  description!: string;

  @Column({ nullable: true, type: 'varchar' })
  videoUrl!: string;

  @Column({ nullable: true, type: 'varchar' })
  address!: string; //for off class

  @Column({ nullable: true, type: 'timestamp without time zone' })
  startDate!: Date; //for off class

  @Column({ nullable: true, type: 'timestamp without time zone' })
  endDate!: Date; //for off class

  @ManyToOne(() => Program)
  program: Program;

  @ManyToMany(() => Student, (student) => student.lessons, { cascade: true })
  students: Student[];

  @OneToMany(() => CommentEntity, (comment) => comment.lesson, {
    cascade: true,
  })
  comments: CommentEntity[];

  @OneToMany(() => StudentLesson, (studentLesson) => studentLesson.lesson, {
    cascade: true,
  })
  studentLessons: StudentLesson[];
}
