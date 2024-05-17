import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "../lessons/lessons-entity";
import { User } from "../users/user-entity";
import { ApiProperty } from "@nestjs/swagger";

 
 @Entity()
 export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  score: number


  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Lesson)
  @JoinColumn()
  lesson: Lesson

  @ManyToOne(() => User)
  @JoinColumn()
  user: User
 }