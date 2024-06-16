import { CommentEntity } from "src/modules/comment/entities/comment.entity";
import { Lesson } from "src/modules/lesson/entities/lesson.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from 'src/common/entities/base.entity';
import { Student } from "src/modules/student/entities/student.entity";

@Entity({ name: 'students' })
export class StudentLesson extends BaseEntity {
  @Column({ nullable: true, type: 'boolean' })
  isJoinOff!: boolean;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Lesson)
  lesson: Lesson;
}
