import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  constructor() {
    this.id = 0;
    this.value = "";
  }
}
