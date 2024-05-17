import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evaluation } from "../evaluations/evaluation-entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  code: string

  @OneToMany(() => Evaluation, (evaluation) => evaluation.lesson)
  evaluations: Evaluation[]
}