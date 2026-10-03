import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;
}
