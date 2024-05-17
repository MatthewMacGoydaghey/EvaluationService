import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Evaluation } from "../evaluations/evaluation-entity";


@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number

@Column()
name: string

@Column()
email: string

@Column()
password: string


@OneToMany(() => Evaluation, (evaluation) => evaluation.user)
evaluations: Evaluation[]
}