import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  res: any;
}
