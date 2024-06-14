import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity{
  @Column({ nullable: true, type: 'varchar' })
  content!: string;
}
