import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Facts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fact: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_on',
  })
  createdOn: Date;
}
