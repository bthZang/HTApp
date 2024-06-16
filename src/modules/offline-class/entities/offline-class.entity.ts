import { Student } from "src/modules/student/entities/student.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity({ name: 'offlineClasses' })
export class OfflineClass {
  @Column({ nullable: true, type: 'varchar' })
  category!: string;

  @ManyToMany(() => Student, (student) => student.offlineClasses)
  students: Student[];
}
