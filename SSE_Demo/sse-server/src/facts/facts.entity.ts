import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Facts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fact: string;
}
