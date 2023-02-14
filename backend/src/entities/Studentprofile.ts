import { Entity, PrimaryGeneratedColumn, Column ,OneToOne} from "typeorm";
import { Student } from "./Student";

@Entity()
export class Studentprofile {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @OneToOne(() => Student, (student) => student.profile, { onDelete: "CASCADE" })
    student: Student;
}