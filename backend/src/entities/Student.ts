import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Studentprofile } from "./Studentprofile";
import { Parent } from "./Parent";
import { Standard } from "./Standard";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentName: string;

  @OneToOne(() => Studentprofile, (profile) => profile.student, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  profile: Studentprofile;

  @OneToMany(() => Parent, (parent) => parent.student, {
    cascade: true,
    eager: true,
  })
  parents: Parent[];

  @ManyToMany(() => Standard, (standard) => standard.students, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  standards: Standard[];
  
}
