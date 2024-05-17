import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../lib/DTO/lessons/lessons-entity';
import { Repository } from 'typeorm';
import { LessonDTO } from '../lib/DTO/lessons/lessonsDTO';
import { EvaluationDTO } from '../lib/DTO/evaluations/evaluationDTO';
import { Evaluation } from '../lib/DTO/evaluations/evaluation-entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private readonly LessonsRepository: Repository<Lesson>,
    @InjectRepository(Evaluation) private readonly EvaluationsRepository: Repository<Evaluation>,
    private readonly UsersService: UsersService
  ) {}



  async findLessons() {
    const lessons = await this.LessonsRepository.find({relations: ['evaluations', 'evaluations.user']})
    lessons.forEach((lesson) => {lesson.evaluations.forEach((evaluation) => {delete evaluation.user.password, delete evaluation.created_at})})
    return lessons
  }


  async createLesson(body: LessonDTO) {
    return this.LessonsRepository.save(body)
  }


  async evaluateStudent(id: number, body: EvaluationDTO) {
    const foundLesson = await this.LessonsRepository.findOneBy({id})
    if (!foundLesson) {
      throw new NotFoundException({message: `Занятие c ID ${id} не найдено`})
    }
    const foundUser = await this.UsersService.findUser(body.user_id)
    const newEvaluation = new Evaluation()
    newEvaluation.lesson = foundLesson
    newEvaluation.score = body.score
    newEvaluation.user = foundUser
    await this.EvaluationsRepository.save(newEvaluation)
    const responseObject = {
      id: newEvaluation.id,
      user_id: newEvaluation.user.id,
      score: newEvaluation.score
    }
    return responseObject
  }
}
