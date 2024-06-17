import { BaseEntity } from 'src/common/entities/base.entity';
import { Instructor } from 'src/modules/instructor/entities/instructor.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'programs' })
export class Program extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name!: string;

  @Column({ nullable: true, type: 'varchar' })
  level!: string; //enum

  @Column({ nullable: true, type: 'varchar' })
  category!: string;

  @Column({ nullable: true, type: 'varchar' })
  introduce!: string; //mo ta, gioi thieu khoa hoc

  @Column({ nullable: true, type: 'varchar' })
  goal!: string; //khoa hoc nay se day ve gi

  @Column({ nullable: true, type: 'varchar' })
  preparation!: string; //chuan bi gi truoc khi vao khoa hoc

  @OneToMany(() => Lesson, (lesson) => lesson.program, { cascade: true })
  lessons: Lesson[];

  @ManyToOne(() => Instructor)
  instructor: Instructor;

  @Column()
  instructorId: string;
}
