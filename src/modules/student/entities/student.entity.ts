import { CommentEntity } from 'src/modules/comment/entities/comment.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { StudentLesson } from 'src/student-lesson/entities/studentLesson.entity';

@Entity({ name: 'students' })
export class Student extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;

  @ManyToMany(() => Lesson, (lesson) => lesson.studentLessons)
  @JoinTable()
  lessons: Lesson[];

  @ManyToMany(() => CommentEntity, (comment) => comment.students)
  @JoinTable()
  comments: CommentEntity[];

  @OneToMany(() => StudentLesson, (studentLesson) => studentLesson.student, {
    cascade: true,
  })
  studentLessons: StudentLesson[];
}
