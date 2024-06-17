import { BaseEntity } from 'src/common/entities/base.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'students' })
export class StudentLesson extends BaseEntity {
  @Column({ nullable: true, type: 'boolean' })
  isJoinOff!: boolean;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Lesson)
  lesson: Lesson;
}
