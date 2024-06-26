import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Evaluation } from "../evaluations/evaluation-entity";


@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number

@Column({ width: 100 })
name: string

@Column({ width: 30 })
email: string

@Column({ width: 20 })
password: string


@OneToMany(() => Evaluation, (evaluation) => evaluation.user)
evaluations: Evaluation[]
}