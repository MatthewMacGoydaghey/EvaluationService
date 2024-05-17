import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonDTO } from '../lib/DTO/lessons/lessonsDTO';
import { EvaluationDTO } from '../lib/DTO/evaluations/evaluationDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Lesson } from '../lib/DTO/lessons/lessons-entity';
import { Evaluation } from '../lib/DTO/evaluations/evaluation-entity';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly LessonsService: LessonsService
  ) {}


  @ApiOperation({summary: "Возвращает массив занятий"})
  @ApiResponse({status: 200})
  @Get()
  findLessons() {
    return this.LessonsService.findLessons()
  }


  @ApiOperation({summary: "Создаёт оценку"})
  @ApiResponse({status: 201})
  @Post(':id/evaluations')
  evaluateStudent(@Param('id') id: number, @Body() body: EvaluationDTO) {
    return this.LessonsService.evaluateStudent(id, body)
  }
  

  @ApiOperation({summary: "Создаёт занятие"})
  @ApiResponse({status: 201})
  @Post()
  createLesson(@Body() body: LessonDTO) {
    return this.LessonsService.createLesson(body)
  }

}
