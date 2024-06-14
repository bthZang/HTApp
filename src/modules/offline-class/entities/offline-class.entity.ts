import { Column, Entity } from "typeorm";

@Entity({ name: 'offlineClasses' })
export class OfflineClass {
  @Column({ nullable: true, type: 'varchar' })
  category!: string;
}
