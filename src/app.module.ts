import { Module } from '@nestjs/common';
import { LessonsModule } from './lessons/lessons.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lib/DTO/lessons/lessons-entity';
import { Evaluation } from './lib/DTO/evaluations/evaluation-entity';
import { User } from './lib/DTO/users/user-entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Lesson, Evaluation],
    synchronize: true,
  }), LessonsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
