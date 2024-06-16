import { BaseEntity } from 'src/common/entities/base.entity';
import { Instructor } from 'src/modules/instructor/entities/instructor.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  content!: string;

  @ManyToMany(() => Instructor, (instructor) => instructor.comments, {
    cascade: true,
  })
  instructors: Instructor[];

  @ManyToMany(() => Student, (student) => student.comments, { cascade: true })
  students: Student[];

  @ManyToOne(() => Lesson)
  lesson: Lesson;
}
