import { BaseEntity } from 'src/common/entities/base.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  content!: string;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Lesson)
  lesson: Lesson;
}
