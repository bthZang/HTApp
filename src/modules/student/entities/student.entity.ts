import { CommentEntity } from "src/modules/comment/entities/comment.entity";
import { Lesson } from "src/modules/lesson/entities/lesson.entity";
import { OfflineClass } from "src/modules/offline-class/entities/offline-class.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity({ name: 'students' })
export class Student {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;

  @ManyToMany(() => Lesson, (lesson) => lesson.students)
  @JoinTable()
  lessons: Lesson[];

  @ManyToMany(() => OfflineClass, (offlineClass) => offlineClass.students)
  @JoinTable()
  offlineClasses: OfflineClass[];

  @OneToMany(() => CommentEntity, (comment) => comment.student)
  comments: CommentEntity[];
}
