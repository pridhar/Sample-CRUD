import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parentName: string;

  @ManyToOne(() => Student, (student) => student.parents, {
    onDelete: "CASCADE",
  })
  student: Student;
}
