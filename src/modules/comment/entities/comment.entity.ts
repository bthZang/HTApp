import { BaseEntity } from 'src/common/entities/base.entity';
import { Instructor } from 'src/modules/instructor/entities/instructor.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  content!: string;

  @ManyToOne(() => Instructor)
  instructor: Instructor;

  @ManyToOne(() => Student)
  student: Student;
}
