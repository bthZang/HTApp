import { BaseEntity } from 'src/common/entities/base.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { Program } from 'src/modules/program/entities/program.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'instructors' })
export class Instructor extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;

  @Column({ nullable: true, type: 'varchar' })
  username!: string;

  @Column({ nullable: true, type: 'varchar' })
  phone!: string;

  @Column({ nullable: true, type: 'varchar' })
  email!: string;

  @Column({ nullable: true, type: 'varchar' })
  password!: string;

  @Column({ nullable: true, type: 'varchar' })
  introduce!: string;

  @Column({ nullable: true, type: 'varchar' })
  prizes!: string;

  @Column({ nullable: true, type: 'varchar' })
  imageUrl!: string;

  @OneToMany(() => Program, (program) => program.instructor, { cascade: true })
  programs: Program[];

  @OneToMany(() => Lesson, (lesson) => lesson.instructor, { cascade: true })
  lessons: Lesson[];
}
