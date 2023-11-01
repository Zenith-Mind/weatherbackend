import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class AdmincEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;
}
