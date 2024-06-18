import { BaseEntity } from 'src/common/entities/base.entity';
import { CommentEntity } from 'src/modules/comment/entities/comment.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { StudentLesson } from 'src/modules/student-lesson/entities/studentLesson.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'students' })
export class Student extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;

  @Column({ nullable: true, type: 'varchar' })
  photoUrl!: string;

  @Column({ nullable: true, type: 'varchar' })
  googleId!: string;

  @ManyToMany(() => CommentEntity, (comment) => comment.students)
  @JoinTable()
  comments: CommentEntity[];

  @OneToMany(() => StudentLesson, (studentLesson) => studentLesson.student, {
    cascade: true,
  })
  studentLessons: StudentLesson[];

  @ManyToMany(() => Lesson, (lesson) => lesson.savedStudents)
  @JoinColumn()
  savedLessons: Lesson[];
}
