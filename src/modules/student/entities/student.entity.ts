import { Column, Entity } from "typeorm";

@Entity({ name: 'students' })
export class Student {
  @Column({ nullable: true, type: 'varchar' })
  name!: string;
}
