import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../lib/DTO/lessons/lessons-entity';
import { Evaluation } from '../lib/DTO/evaluations/evaluation-entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Evaluation]), UsersModule],
  controllers: [LessonsController],
  providers: [LessonsService]
})
export class LessonsModule {}
