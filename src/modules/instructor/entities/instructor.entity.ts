import { BaseEntity } from 'src/common/entities/base.entity';
import { Program } from 'src/modules/program/entities/program.entity';
import { CommentEntity } from 'src/modules/comment/entities/comment.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

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

  @OneToMany(() => Program, (program) => program.instructor, { cascade: true })
  programs: Program[];

  @ManyToMany(() => CommentEntity, (comment) => comment.instructors)
  @JoinTable()
  comments: CommentEntity[];
}
