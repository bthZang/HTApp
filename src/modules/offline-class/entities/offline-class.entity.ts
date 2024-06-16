import { Student } from "src/modules/student/entities/student.entity";
import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from 'src/common/entities/base.entity';


@Entity({ name: 'offlineClasses' })
export class OfflineClass extends BaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  category!: string;

  @ManyToMany(() => Student, (student) => student.offlineClasses)
  students: Student[];
}
