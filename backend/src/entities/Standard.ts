import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Student } from "./Student";

@Entity()
export class Standard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  standardName: string;

  @ManyToMany(() => Student, (student) => student.standards , {
    onDelete: "CASCADE",
  })
  students: Student[];

}
